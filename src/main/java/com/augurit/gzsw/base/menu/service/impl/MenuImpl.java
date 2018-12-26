package com.augurit.gzsw.base.menu.service.impl;

import com.augurit.gzsw.ApiException;
import com.augurit.gzsw.RespCodeMsgDepository;
import com.augurit.gzsw.domain.Menu;
import com.augurit.gzsw.base.menu.mapper.MenuMapper;
import com.augurit.gzsw.base.menu.service.IMenu;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
		if(menu.getDispOrder() == null) {
			menu.setDispOrder(getMaxDispOrder());
		}

		if(!Strings.isNullOrEmpty(menu.getPid()) && Strings.isNullOrEmpty(menu.getPath())) {
			Menu parent = getMenuById(menu.getPid());
			if(parent != null) {
				menu.setPath(parent.getPath() + "/" + menu.getName());
			}
		}

		menuMapper.saveMenu(menu);
	}

	@Override
	public void updateMenu(Menu menu) throws Exception {
		menuMapper.updateMenu(menu);
	}

	@Transactional
	@Override
	public void delMenus(List<String> ids) throws Exception {
		// 级联删除选中菜单的子代节点
		for(String id : ids) {
			List<String> descendantIds = Lists.newArrayList();
			List<Menu> descendants = menuMapper.listChildMenus(id, true);
			descendants.forEach((menu) -> descendantIds.add(menu.getId()));
			if(descendantIds.size() > 0) {
				menuMapper.delMenus(descendantIds);
			}
		}

		menuMapper.delMenus(ids);
	}

	@Override
	public List<Menu> listChildMenus(String parentId, boolean isCascade) throws Exception {
		return menuMapper.listChildMenus(parentId, isCascade);
	}

	private synchronized int getMaxDispOrder() throws Exception {
		Integer maxDispOrder = menuMapper.getMaxDispOrder();
		if(maxDispOrder == null) {
			throw new ApiException(RespCodeMsgDepository.SERVER_INTERNAL_ERROR, null);
		}

		return maxDispOrder.intValue() + 1;
	}

	private Menu getMenuById(String id) throws Exception {
		return menuMapper.getMenuById(id);
	}
}
