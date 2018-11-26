package com.augurit.asip.watermap.sc.metadataEdit.service;

import com.augurit.asip.watermap.domain.metadataEdit.WaMetadataModify;

import java.util.List;
import java.util.Map;

/**
 * Created by czh on 2017-12-20.
 */
public interface IMetadataEdit {

    public List findMetadata(WaMetadataModify maMetadataModify) throws Exception;

    public void updateMetadata(WaMetadataModify maMetadataModify) throws Exception;

    public void saveMetadata(WaMetadataModify maMetadataModify) throws Exception;

	public List<Map> listAuthorSQL(String loginName);

}
