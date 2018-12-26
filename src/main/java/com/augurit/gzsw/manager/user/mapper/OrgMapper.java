package com.augurit.gzsw.manager.user.mapper;

import com.augurit.gzsw.domain.Org;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>OrgUserMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/19 15:26.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface OrgMapper {
    List<Org> listSubOrgsByOrgCode(@Param("orgCode")String orgCode);

    List<Org> selectById(@Param("id") String id);

    int insert(Org org);

    int updateById(Org org);

    int deleteByIds(List ids);

}
