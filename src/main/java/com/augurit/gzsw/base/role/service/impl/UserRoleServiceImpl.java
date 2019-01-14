package com.augurit.gzsw.base.role.service.impl;

import com.augurit.gzsw.base.role.mapper.UserRoleMapper;
import com.augurit.gzsw.base.role.service.UserRoleService;
import com.augurit.gzsw.domain.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <b><code>UserRoleServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/26 16:29.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class UserRoleServiceImpl implements UserRoleService {

    @Autowired
    private UserRoleMapper userRoleMapper;


    @Override
    public List listByRoleIdOrUserName(String roleId, String userName) throws Exception {
        return userRoleMapper.listByRoleIdOrUserName(roleId, userName);
    }

    @Override
    public List<String> listUserIds(String roleId) throws Exception {
        return userRoleMapper.listUserIds(roleId);
    }

    @Transactional
    @Override
    public int deleteByRoleIdsAndUserIds(List<String> roleIds, List<String> userIds) throws Exception {
        return userRoleMapper.deleteByRoleIdsAndUserIds(roleIds,userIds);
    }

    @Transactional
    @Override
    public int insertByRoleIdsAndUserIds(List<String> roleIds, List<String> userIds) throws Exception {
        int success = userRoleMapper.insertByRoleIdsAndUserIds(roleIds, userIds);
        return success;
    }
}
