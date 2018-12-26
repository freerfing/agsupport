package com.augurit.gzsw.base.menu.service;

import com.augurit.gzsw.domain.Menu;

import java.util.List;

public interface IMenu {
	List<Menu> listMenus(String roleId) throws Exception;
	void saveMenu(Menu menu) throws Exception;
	void updateMenu(Menu menu) throws Exception;
	void delMenus(List<String> ids) throws Exception;
	List<Menu> listChildMenus(String parentId, boolean isCascade) throws Exception;
}
