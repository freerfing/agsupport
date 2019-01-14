package com.augurit.gzsw.base.role.service.impl;

import com.augurit.gzsw.base.role.mapper.RoleMenuMapper;
import com.augurit.gzsw.base.role.service.RoleMenuService;
import com.augurit.gzsw.domain.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <b><code>RoleMenuServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/3 15:55.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class RoleMenuServiceImpl implements RoleMenuService {

    @Autowired
    private RoleMenuMapper roleMenuMapper;

    @Override
    public List<Menu> listMenuByRoleIdOrMenuName(String roleId, String menuName) throws Exception {

        List<Menu> menus = roleMenuMapper.listMenuByRoleIdOrMenuName(roleId, menuName);
        return menus;
    }

    @Override
    public int bindRoleMenu(String roleId, List<String> menuIds) throws Exception {

        return roleMenuMapper.bindRoleMenu(roleId, menuIds);
    }

    @Override
    public int releaseRoleMenu(List<String> roleIds, List<String> menuIds) throws Exception {

        return roleMenuMapper.releaseRoleMenu(roleIds, menuIds);
    }
}
