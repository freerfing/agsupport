package com.augurit.gzsw.base.menu.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.domain.Menu;
import com.augurit.gzsw.base.menu.service.IMenu;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping({"/menu"})
public class MenuController {
	private static Logger log = LoggerFactory.getLogger(MenuController.class);

	@Autowired
	private IMenu iMenu;

	@RequestMapping({"/index.do"})
	public ModelAndView index() throws Exception {
		return new ModelAndView("/menu/index");
	}

	@RequestMapping(value = "/listMenus")
	public ApiResponse<List> listMenus(String roleId) throws Exception {
		List<Menu> menus = iMenu.listMenus(roleId);
		return new ApiResponse<>(menus);
	}

	@RequestMapping(value = "/delMenus")
	public ApiResponse<Object> delMenus(String id) throws Exception {
		List<String> ids = Lists.newArrayList(id.split(","));
		iMenu.delMenus(ids);
		return new ApiResponse<Object>(null);
	}

	@RequestMapping(value = "/saveMenu")
	public ApiResponse<Object> saveMenu(Menu menu) throws Exception {
		if(Strings.isNullOrEmpty(menu.getId())) {
			menu.setId(DefaultIdGenerator.getIdForStr());
			if(Strings.isNullOrEmpty(menu.getPid())) {
				menu.setPath("/" + menu.getName());
			}

			if(Strings.isNullOrEmpty(menu.getIsDisplay())) {
				menu.setIsDisplay("0");// 默认隐藏
			}
			iMenu.saveMenu(menu);
		} else {
			iMenu.updateMenu(menu);
		}

		return new ApiResponse<Object>(null);
	}
}
