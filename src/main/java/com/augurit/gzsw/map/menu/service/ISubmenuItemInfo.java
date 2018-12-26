package com.augurit.gzsw.map.menu.service;

import com.augurit.gzsw.domain.SubmenuItemInfo;

import java.util.List;

public interface ISubmenuItemInfo {
	List<SubmenuItemInfo> listItemInfos(List<String> subMenuItemId) throws Exception;
	void saveItemInfo(SubmenuItemInfo ref) throws Exception;
	void updItemInfo(SubmenuItemInfo ref) throws Exception;
	void delItemInfo(List<String> ids) throws Exception;
}
