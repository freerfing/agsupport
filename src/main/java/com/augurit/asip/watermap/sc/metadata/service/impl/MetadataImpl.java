package com.augurit.asip.watermap.sc.metadata.service.impl;

import com.augurit.asip.watermap.domain.metadata.WaMetadataField;
import com.augurit.asip.watermap.sc.metadata.dao.MetadataDao;
import com.augurit.asip.watermap.sc.metadata.service.IMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetadataImpl implements IMetadata {

    @Autowired
    private MetadataDao metadataDao;

    @Override
    public List<WaMetadataField> getFieldsByTableName(String tableName) throws Exception {
        return metadataDao.getFieldsByTableName(tableName);
    }
}
