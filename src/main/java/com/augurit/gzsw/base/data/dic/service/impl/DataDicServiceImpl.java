package com.augurit.gzsw.base.data.dic.service.impl;

import com.augurit.gzsw.base.data.dic.mapper.DataDicMapper;
import com.augurit.gzsw.base.data.dic.service.DataDicService;
import com.augurit.gzsw.domain.DataDic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <b><code>DataDicServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/8 14:50.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class DataDicServiceImpl implements DataDicService {

    @Autowired
    private DataDicMapper dataDicMapper;

    @Override
    public List<DataDic> listByPidOrIdOrName(String pid,String id,String name) throws Exception{
        List<DataDic> dataDics = dataDicMapper.listByPidOrIdOrName(pid,id,name);
        return dataDics;
    }

    @Override
    public int insert(DataDic dataDic) throws Exception {
        return dataDicMapper.insert(dataDic);
    }

    @Override
    public int updateById(DataDic dataDic)throws Exception {
        return dataDicMapper.updateById(dataDic);
    }

    @Override
    public int deleteByIds(List<String> ids) throws Exception{
        return dataDicMapper.deleteByIds(ids);
    }
}
