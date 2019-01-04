package com.augurit.gzsw.base.role.service;

import com.augurit.gzsw.domain.Menu;

import java.util.List;

/**
 * <b><code>RoleMenuService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/3 15:52.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public interface RoleMenuService {

    List<Menu> listMenuByRoleIdOrMenuName(String roleId,String menuName) throws Exception;

    int bindRoleMenu(List<String> roleIds,List<String> menuIds) throws Exception;

    int releaseRoleMenu(List<String> roleIds,List<String> menuIds) throws Exception;
}
