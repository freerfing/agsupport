package com.augurit.gzsw.map.menu.service;

import com.augurit.gzsw.domain.SubmenuItemRef;

import java.util.List;

public interface ISubmenuItemRef {
	List<SubmenuItemRef> listRefs(String subMenuId, String subMenuItemId) throws Exception;
}
