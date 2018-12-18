package com.augurit.gzsw.map.menu.service.impl;

import com.augurit.gzsw.domain.SubmenuItemRef;
import com.augurit.gzsw.map.menu.mapper.SubmenuItemRefMapper;
import com.augurit.gzsw.map.menu.service.ISubmenuItemRef;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmenuItemRefImpl implements ISubmenuItemRef {

	@Autowired
	private SubmenuItemRefMapper refMapper;

	@Override
	public List<SubmenuItemRef> listRefs(String submenuId, String submenuItemId) throws Exception {
		return refMapper.listRefs(submenuId, submenuItemId);
	}
}
