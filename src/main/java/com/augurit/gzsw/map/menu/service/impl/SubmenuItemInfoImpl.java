package com.augurit.gzsw.map.menu.service.impl;

import com.augurit.gzsw.domain.SubmenuItemInfo;
import com.augurit.gzsw.map.menu.mapper.SubmenuItemInfoMapper;
import com.augurit.gzsw.map.menu.service.ISubmenuItemInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmenuItemInfoImpl implements ISubmenuItemInfo {

	@Autowired
	private SubmenuItemInfoMapper infoMapper;

	@Override
	public List<SubmenuItemInfo> listItemInfos(List<String> submenuItemIds) throws Exception {
		return infoMapper.listItemInfos(submenuItemIds);
	}

	@Override
	public void saveItemInfo(SubmenuItemInfo ref) throws Exception {
		infoMapper.saveItemInfo(ref);
	}

	@Override
	public void updItemInfo(SubmenuItemInfo ref) throws Exception {
		infoMapper.updItemInfo(ref);
	}

	@Override
	public void delItemInfo(List<String> ids) throws Exception {
		infoMapper.delItemInfo(ids);
	}
}
