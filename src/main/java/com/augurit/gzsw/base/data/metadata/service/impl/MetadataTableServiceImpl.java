package com.augurit.gzsw.base.data.metadata.service.impl;

import com.augurit.gzsw.base.data.metadata.mapper.MetadataFieldMapper;
import com.augurit.gzsw.base.data.metadata.mapper.MetadataTableMapper;
import com.augurit.gzsw.base.data.metadata.service.MetadataTableService;
import com.augurit.gzsw.domain.MetadataTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * <b><code>MetadataTableServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 16:53.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class MetadataTableServiceImpl implements MetadataTableService {
    @Autowired
    private MetadataTableMapper metadataTableMapper;

    @Autowired
    private MetadataFieldMapper metadataFieldMapper;

    @Override
    public MetadataTable selectById(String id) throws Exception {
        List<MetadataTable> metadataTables = metadataTableMapper.selectById(id);
        if (CollectionUtils.isEmpty(metadataTables)){
            return null;
        }
        return metadataTables.get(0);
    }

    @Override
    public List<MetadataTable> listByDatabaseIdOrName(String databaseId,String name) throws Exception {
        return metadataTableMapper.listByDatabaseIdOrName(databaseId,name);
    }

    @Override
    public int updateById(MetadataTable metadataTable) throws Exception {
        return metadataTableMapper.updateById(metadataTable);
    }

    @Override
    public int insert(MetadataTable metadataTable) throws Exception {
        return metadataTableMapper.insert(metadataTable);
    }

    @Override
    public int deleteByIds(List<String> ids) throws Exception {
        if (CollectionUtils.isEmpty(ids)){
            return 0;
        }
        return metadataTableMapper.deleteByIds(ids);
    }

    @Override
    public int deleteByDBIds(List<String> dbIds) throws Exception {

        if (CollectionUtils.isEmpty(dbIds)){
            return 0;
        }
        return  metadataTableMapper.deleteByDBIds(dbIds);

    }
}
