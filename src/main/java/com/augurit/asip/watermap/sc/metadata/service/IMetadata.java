package com.augurit.asip.watermap.sc.metadata.service;

import com.augurit.asip.watermap.domain.metadata.WaMetadataField;

import java.util.List;

public interface IMetadata {
    List<WaMetadataField> getFieldsByTableName(String tableName) throws Exception;
}
