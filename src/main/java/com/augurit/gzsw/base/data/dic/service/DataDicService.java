package com.augurit.gzsw.base.data.dic.service;

import com.augurit.gzsw.domain.DataDic;

import java.util.List;

/**
 * <b><code>DataDicService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/8 14:50.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public interface DataDicService {

    List<DataDic> listByPidOrIdOrName(String pid,String id,String name) throws Exception;

    int insert(DataDic dataDic) throws Exception;

    int updateById(DataDic dataDic)throws Exception;

    int deleteByIds(List<String> ids)throws Exception;
}
