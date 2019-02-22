package com.augurit.gzsw.manager.user.service;

import com.augurit.gzsw.domain.User;
import com.fasterxml.jackson.core.JsonProcessingException;

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
    List<User> listUsersByOrgIdAndName(String orgId, String userName, boolean contain) throws Exception;

    User getUser(String id, String loginName, String tel) throws Exception;

    int insert(User user) throws Exception;

    int update(User user,String newOrgId) throws Exception;

    int delete(String orgId,String userId) throws Exception;
}
