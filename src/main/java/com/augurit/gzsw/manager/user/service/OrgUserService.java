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

    List<OrgUser> selectByOrgId(String orgId);

    int deleteByOrgIdAndUserId(String orgId,String userId);

    int insert(OrgUser orgUser);

    int update(OrgUser orgUser,String newOrgId);

    int updateDisporder(String orgId,String fromUserId,String toUserId);
}
