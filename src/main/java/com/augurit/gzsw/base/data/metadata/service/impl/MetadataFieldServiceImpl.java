package com.augurit.gzsw.base.data.metadata.service.impl;

import com.augurit.gzsw.base.data.metadata.mapper.MetadataFieldMapper;
import com.augurit.gzsw.base.data.metadata.service.MetadataFieldService;
import com.augurit.gzsw.domain.MetadataField;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * <b><code>MetadataFieldServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 16:58.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class MetadataFieldServiceImpl implements MetadataFieldService {

    @Autowired
    private MetadataFieldMapper metadataFieldMapper;

    @Override
    public MetadataField selectById(String id) throws Exception {
        List<MetadataField> metadataFields = metadataFieldMapper.selectById(id);
        if (CollectionUtils.isEmpty(metadataFields)){
            return null;
        }
        return metadataFields.get(0);
    }

    @Override
    public List<MetadataField> listByTableIdOrName(String tableId,String name) throws Exception {
        return metadataFieldMapper.listByTableIdOrName(tableId,name);
    }

    @Override
    public int updateById(MetadataField metadataField) throws Exception {
        return metadataFieldMapper.updateById(metadataField);
    }

    @Override
    public int insert(MetadataField metadataField) throws Exception {
        return metadataFieldMapper.insert(metadataField);
    }

    @Override
    public int deleteByIds(List<String> ids) throws Exception {
        if (CollectionUtils.isEmpty(ids)){
            return 0;
        }
        return metadataFieldMapper.deleteByIds(ids);
    }

    @Override
    public int deleteByTableIds(List<String> tableIds) throws Exception {
        if (CollectionUtils.isEmpty(tableIds)){
            return 0;
        }
        return metadataFieldMapper.deleteByTableIds(tableIds);
    }
}
