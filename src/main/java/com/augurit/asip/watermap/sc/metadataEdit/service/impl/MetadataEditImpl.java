package com.augurit.asip.watermap.sc.metadataEdit.service.impl;

import com.augurit.asip.watermap.domain.metadataEdit.WaMetadataModify;
import com.augurit.asip.watermap.mapper.MetadataEditMapper;
import com.augurit.asip.watermap.sc.metadataEdit.service.IMetadataEdit;
import com.common.dbcp.DBHelper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by czh on 2017-12-20.  
 */
@Service
public class MetadataEditImpl implements IMetadataEdit {

    private static Logger logger = LoggerFactory.getLogger(MetadataEditImpl.class);

    @Autowired
    private MetadataEditMapper metadataEditMapper;

    @Override
    public List findMetadata(WaMetadataModify maMetadataModify) throws Exception {
        return metadataEditMapper.findMetadata(maMetadataModify);
    }

    @Override
    public void updateMetadata(WaMetadataModify maMetadataModify) throws Exception {
        metadataEditMapper.updateMetadata(maMetadataModify);
    }

    @Override
    public void saveMetadata(WaMetadataModify maMetadataModify) throws Exception {
        metadataEditMapper.saveMetadata(maMetadataModify);
    }

	@Override
	public List<Map> listAuthorSQL(String loginName) {
		String sq = " select * from ag_org WHERE id in(select org_id from ag_org_user where user_id=(select id from ag_user where login_name='"+loginName+"' ) ) ";
        List<Map> list = DBHelper.find("mysql.datasource", sq, null);
        return list;
	}
}
