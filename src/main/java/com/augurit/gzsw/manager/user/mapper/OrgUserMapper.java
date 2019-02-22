package com.augurit.gzsw.manager.user.mapper;

import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.OrgUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>OrgUserMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/24 17:46.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface OrgUserMapper {
    List<OrgUser> selectByOrgId(String orgId)throws Exception;

    List<String> listUserId(@Param("orgIds") List<String> orgIds) throws Exception;

    int deleteByOrgIdAndUserId(@Param(value = "orgId") String orgId, @Param(value = "userId") String userId)throws Exception;

    int insert(OrgUser orgUser)throws Exception;

    int update(@Param("orgUser") OrgUser orgUser,@Param(value = "newOrgId") String newOrgId)throws Exception;
}
