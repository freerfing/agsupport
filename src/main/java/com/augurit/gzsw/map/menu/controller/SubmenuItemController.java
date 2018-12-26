package com.augurit.gzsw.map.menu.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.base.menu.service.IMenu;
import com.augurit.gzsw.domain.Menu;
import com.augurit.gzsw.domain.SubmenuItemInfo;
import com.augurit.gzsw.map.menu.service.ISubmenuItemInfo;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/map/submenu"})
public class SubmenuItemController {

	@Autowired
	private ISubmenuItemInfo iItemInfo;

	@Autowired
	private IMenu imenu;

	@RequestMapping(value = "/listItemInfo")
	public ApiResponse<List> listItemInfo(String submenuId, String submenuItemId) throws Exception {
		List<String> submenuItemIds = null;

		if(Strings.isNullOrEmpty(submenuItemId)) {
			// 子菜单项ID为空，默认子菜单查询的所有的子菜单项ID
			if(!Strings.isNullOrEmpty(submenuId)) {
				List<Menu> subMenuItems = imenu.listChildMenus(submenuId, false);
				if(CollectionUtils.isEmpty(subMenuItems)) {
					return new ApiResponse<>(subMenuItems);
				} else {
					for(Menu menu : subMenuItems) {
						submenuItemIds.add(menu.getId());
					}
				}
			}
		} else {
			submenuItemIds = Lists.newArrayList(submenuItemId);
		}

		List<SubmenuItemInfo> refs = iItemInfo.listItemInfos(submenuItemIds);
		return new ApiResponse<>(refs);
	}

	@RequestMapping(value = "/saveItemInfo")
	public ApiResponse<Object> saveItemInfo(SubmenuItemInfo ref) throws Exception {
		if(Strings.isNullOrEmpty(ref.getId())) {
			ref.setId(DefaultIdGenerator.getIdForStr());
			iItemInfo.saveItemInfo(ref);
		} else {
			iItemInfo.updItemInfo(ref);
		}

		return new ApiResponse<Object>(null);
	}

	@RequestMapping(value = "/delItemInfo")
	public ApiResponse<Object> delItemInfo(String id) throws Exception {
		List<String> ids = Lists.newArrayList(id.split(","));
		iItemInfo.delItemInfo(ids);
		return new ApiResponse<Object>(null);
	}
}
