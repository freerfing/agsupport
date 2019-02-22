package com.augurit.gzsw.manager.user.service;

import com.augurit.gzsw.domain.OrgUser;

import java.util.List;

/**
 * <b><code>OrgUserService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/25 17:31.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public interface OrgUserService {

    List<OrgUser> selectByOrgId(String orgId)throws Exception;

    List<String> listUserId(List<String> orgIds) throws Exception;

    int deleteByOrgIdAndUserId(String orgId,String userId)throws Exception;

    int insert(OrgUser orgUser)throws Exception;

    int update(OrgUser orgUser, String newOrgId)throws Exception;

    int updateDisporder(String orgId,String fromUserId,String toUserId)throws Exception;
}
