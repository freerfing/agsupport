package com.augurit.gzsw.base.data.metadata.service;

import com.augurit.gzsw.domain.MetadataField;

import java.util.List;

/**
 * <b><code>MetadataFieldService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 16:52.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public interface MetadataFieldService {

    MetadataField selectById(String id) throws Exception;

    List<MetadataField> listByTableIdOrName(String tableId,String name)throws Exception;

    int updateById(MetadataField metadataField) throws Exception;

    int insert(MetadataField metadataField) throws Exception;

    int deleteByIds(List<String> ids) throws Exception;

    int deleteByTableIds(List<String> tableIds) throws Exception;

}
