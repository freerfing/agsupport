package com.augurit.gzsw.base.data.dic.mapper;

import com.augurit.gzsw.domain.DataDic;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>DataDicMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/8 11:40.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface DataDicMapper {

    List<DataDic> listByPidOrIdOrName(@Param("pid") String pid,@Param("id") String id,@Param("name") String name)throws Exception;

    int insert(DataDic dataDic)throws Exception;

    int updateById(DataDic dataDic)throws Exception;

    int deleteByIds(@Param("ids") List<String> ids)throws Exception;
}
