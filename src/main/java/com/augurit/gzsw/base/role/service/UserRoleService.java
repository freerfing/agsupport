package com.augurit.gzsw.base.role.service;

import com.augurit.gzsw.domain.UserRole;

import java.util.List;

/**
 * <b><code>UserRoleService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/26 16:28.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public interface UserRoleService {

    //如果userName为空查询roleId对应的所有用户信息
    List listByRoleIdOrUserName(String roleId,String userName) throws Exception;
    List<String> listUserIds(String roleId) throws Exception;
    int deleteByRoleIdsAndUserIds(List<String> roleIds,List<String> userIds) throws Exception;

    int insertByRoleIdsAndUserIds(List<String> roleIds,List<String> userIds) throws Exception;
}
