package com.augurit.gzsw.base.menu.service.impl;

import com.augurit.gzsw.domain.Menu;
import com.augurit.gzsw.base.menu.mapper.MenuMapper;
import com.augurit.gzsw.base.menu.service.IMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuImpl implements IMenu {

	@Autowired
	private MenuMapper menuMapper;

	@Override
	public List<Menu> listMenus(String roleId) throws Exception {
		return menuMapper.listMenus(roleId);
	}

	@Override
	public void saveMenu(Menu menu) throws Exception {

	}

	@Override
	public void updateMenu(Menu menu) throws Exception {

	}

	@Override
	public void delMenu(String id) throws Exception {

	}
}
