package com.augurit.gzsw.base.data.metadata.service.impl;

import com.augurit.gzsw.base.data.metadata.mapper.MetadataDBMapper;
import com.augurit.gzsw.base.data.metadata.mapper.MetadataTableMapper;
import com.augurit.gzsw.base.data.metadata.service.MetadataDBService;
import com.augurit.gzsw.domain.MetadataDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * <b><code>MetadataDBServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/8 18:13.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class MetadataDBServiceImpl implements MetadataDBService {

    @Autowired
    private MetadataDBMapper metadataDBMapper;

    @Autowired
    private MetadataTableMapper metadataTableMapper;

    @Override
    public MetadataDB selectById(String id) throws Exception {
        List<MetadataDB> metadataDBS = metadataDBMapper.selectById(id);
        if (CollectionUtils.isEmpty(metadataDBS)){
            return null;
        }
        return metadataDBS.get(0);
    }

    @Override
    public List<MetadataDB> listOrByName(String name) throws Exception {
        List<MetadataDB> metadataDBList = metadataDBMapper.listOrByName(name);
        return metadataDBList;
    }

    @Override
    public int updateById(MetadataDB metadataDB) throws Exception {
        return metadataDBMapper.updateById(metadataDB);
    }

    @Override
    public int insert(MetadataDB metadataDB) throws Exception {
        return metadataDBMapper.insert(metadataDB);
    }

    @Override
    public int deleteByIds(List<String> ids) throws Exception {
        if (CollectionUtils.isEmpty(ids)){
            return 0;
        }
        return metadataDBMapper.deleteByIds(ids);
    }
}
