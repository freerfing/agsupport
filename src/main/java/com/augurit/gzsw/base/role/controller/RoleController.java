package com.augurit.gzsw.base.role.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.base.menu.service.IMenu;
import com.augurit.gzsw.base.role.service.IRole;
import com.augurit.gzsw.base.role.service.RoleMenuService;
import com.augurit.gzsw.domain.Menu;
import com.augurit.gzsw.domain.Role;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/role"})
public class RoleController {

	@Autowired
	private IRole irole;

	@Autowired
	private IMenu imenu;

	@Autowired
	private RoleMenuService iroleMenu;

	@RequestMapping({"/index.do"})
	public ModelAndView index() throws Exception {
		return new ModelAndView("/role/index");
	}

	@RequestMapping("/listRoles")
	public ApiResponse<List> listRoles() throws Exception {
		List<Role> roles = irole.listRoles();
		return new ApiResponse<>(roles);
	}

	@RequestMapping("/saveRole")
	public ApiResponse<Object> saveRole(Role role) throws Exception {
		role.setId(DefaultIdGenerator.getIdForStr());
		irole.saveRole(role);
		return new ApiResponse<>(null);
	}

	@RequestMapping("/updateRole")
	public ApiResponse<Object> updateRole(Role role) throws Exception {
		irole.updateRole(role);
		return new ApiResponse<>(null);
	}

	@RequestMapping("/delRoles")
	public ApiResponse<Object> delRoles(String id) throws Exception {
		irole.delRoles(Lists.newArrayList(id.split(",")));
		return new ApiResponse<>(null);
	}

	@RequestMapping("/listMenuCheckStatus")
	public ApiResponse<List> listMenuCheckStatus(String roleId) throws Exception {
		List<Menu> menus = imenu.listMenus(null);
		List<Menu> authorizedMenus = iroleMenu.listMenuByRoleIdOrMenuName(roleId, null);
		List<Map<String, Object>> ret = Lists.newArrayList();
		for(Menu menu : authorizedMenus) {
			Map<String, Object> map = Maps.newHashMap();
			map.put("checkedStatus", getCheckedStatus(menu, authorizedMenus, menus));
			map.put("val", menu.getId());
			ret.add(map);
		}

		return new ApiResponse<>(ret);
	}

	@RequestMapping("/bindRoleMenu")
	public ApiResponse bindRoleMenu(String roleId, String menuIds) throws Exception{

		int success = iroleMenu.bindRoleMenu(roleId, Lists.newArrayList(menuIds.split(",")));
		return new ApiResponse(success);
	}

	private String getCheckedStatus(Menu menu, List<Menu> authorizedMenus, List<Menu> menus) {
		List<Menu> childMenus = Lists.newArrayList();
		for(Menu m : menus) {
			if(menu.getId().equals(m.getPid())) {
				childMenus.add(m);
			}
		}

		// 叶子节点
		if(CollectionUtils.isEmpty(childMenus)) {
			return "1";
		}

		for(Menu m : childMenus) {
			if(!authorizedMenus.contains(m)) {
				return "2";
			}
		}

		for(Menu m : childMenus) {
			if(!"1".equals(getCheckedStatus(m, authorizedMenus, menus))) {
				return "2";
			}
		}

		return "1";
	}
}
