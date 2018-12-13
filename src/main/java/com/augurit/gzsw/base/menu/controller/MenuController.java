package com.augurit.gzsw.base.menu.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.domain.Menu;
import com.augurit.gzsw.base.menu.service.IMenu;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/menu"})
public class MenuController {
	private static Logger log = LoggerFactory.getLogger(MenuController.class);

	@Autowired
	private IMenu iMenu;

	@RequestMapping(value = "/listMenus")
	public ApiResponse<PageInfo> listMenus() throws Exception {
		PageHelper.startPage(1, 7);
		List<Menu> menus = iMenu.listMenus(null);
		// 获取分页信息
		PageInfo<Menu> pages = new PageInfo<>(menus);
		System.out.println(pages.getTotal());
		return new ApiResponse<>(pages);
	}
}
