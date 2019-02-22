package com.augurit.gzsw.base.index.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.base.menu.service.IMenu;
import com.augurit.gzsw.domain.Menu;
import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.User;
import com.augurit.gzsw.manager.user.service.UserService;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@Controller
public class IndexController {
	@Autowired
	private UserService userService;

	@Autowired
	private IMenu imenu;

	@RequestMapping({"/index.do"})
	public ModelAndView index() throws Exception {
		return new ModelAndView("/client/index");
	}

	// 获取登录用户环境相关信息
	@RequestMapping({"/getUserSettings"})
	@ResponseBody
	public ApiResponse<Map> getUserSettings() throws Exception {
		// TODO 获取登录用户信息
		// 强制切换成超级管理员账号角色
		String userId = "a2e30447-779d-494f-a764-64894b6b528e", roleId = "1";
		User loginUser = userService.getUser(userId, null, null);
		loginUser.setPassword(null);

		Map<String, Object> settings = Maps.newHashMap();
		settings.put("coor", "WGS84");
		settings.put("theme", "common");
		settings.put("mapSubMenuDisplayMode", "hover");
		settings.put("baseMap", "http://10.194.170.121/arcgis/rest/services/WGS84/base_image_qp/MapServer");

		List<Menu> menus = imenu.listMenus(roleId);
		List<Menu> rootMenus = Lists.newArrayList();
		for(Menu menu : menus) {
			if(StringUtils.isEmpty(menu.getPid())) {
				rootMenus.add(menu);
			}
		}

		for(Menu root : rootMenus) {
			traverse(root, menus);
		}

		Map<String, Object> map = Maps.newHashMap();
		map.put("loginUser", loginUser);
		map.put("settings", settings);
		map.put("menus", rootMenus);
		
		return new ApiResponse<>(map);
	}

	private void traverse(Menu parent, List<Menu> menus) throws Exception {
		List<Menu> children = Lists.newArrayList();

		List<Menu> willRemoved = Lists.newArrayList();
		for(Menu menu : menus) {
			if(parent.getId().equals(menu.getPid())) {
				children.add(menu);
				willRemoved.add(menu);
			}
		}

		menus.removeAll(willRemoved);
		for(Menu child : children) {
			traverse(child, menus);
		}

		parent.setChildren(children);
	}
}
