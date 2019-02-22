package com.augurit.gzsw.manager.user.service;

import com.augurit.gzsw.domain.User;
import java.util.List;

/**
 * <b><code>UserService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/21 17:30.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public interface UserService {

    List<User> listUsers(List<String> orgIds,String userName) throws Exception;

    User getUser(String id, String loginName, String tel) throws Exception;

    int insert(User user,String orgId) throws Exception;

    int update(User user,String oldOrgId,String newOrgId) throws Exception;

    int delete(String orgId,String userId) throws Exception;
}
