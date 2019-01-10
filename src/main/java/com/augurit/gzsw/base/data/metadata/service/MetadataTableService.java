package com.augurit.gzsw.base.data.metadata.service;

import com.augurit.gzsw.domain.MetadataTable;

import java.util.List;

/**
 * <b><code>MetadataTableService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 16:50.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public interface MetadataTableService {
    MetadataTable selectById(String id) throws Exception;

    List<MetadataTable> listByDatabaseIdOrName(String databaseId,String name)throws Exception;

    int updateById(MetadataTable metadataTable) throws Exception;

    int insert(MetadataTable metadataTable) throws Exception;

    int deleteByIds(List<String> ids) throws Exception;

    int deleteByDBIds(List<String> dbIds) throws Exception;
}
