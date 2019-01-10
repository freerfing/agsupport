package com.augurit.gzsw.base.data.metadata.service;

import com.augurit.gzsw.domain.MetadataDB;

import java.util.List;

/**
 * <b><code>MetadataDBService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/8 18:12.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public interface MetadataDBService {

    MetadataDB selectById(String id) throws Exception;

    List<MetadataDB> listOrByName(String name)throws Exception;

    int updateById(MetadataDB metadataDB) throws Exception;

    int insert(MetadataDB metadataDB) throws Exception;

    int deleteByIds(List<String> ids) throws Exception;
}
