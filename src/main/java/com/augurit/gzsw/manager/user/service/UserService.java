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
    List<User> listUsersByOrgIdAndName(String orgId,String userName,boolean contain);

    int insert(User user) throws JsonProcessingException;

    int update(User user,String newOrgId) throws JsonProcessingException;

    int delete(String orgId,String userId);
}
