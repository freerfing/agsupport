package com.augurit.gzsw.base.role.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.base.role.service.RoleMenuService;
import com.augurit.gzsw.domain.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <b><code>RoleMenuController</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/3 16:18.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@RestController
@RequestMapping("/roleMenu")
public class RoleMenuController {

    @Autowired
    private RoleMenuService roleMenuService;

    //根据roleId与menuName进行查询，menuName可为空
    @RequestMapping("listMenus")
    public ApiResponse listMenuByRoleIdOrMenuName(@RequestParam String roleId,String menuName)throws Exception{

        List<Menu> menus = roleMenuService.listMenuByRoleIdOrMenuName(roleId, menuName);
        return new ApiResponse<>(menus);
    }

    //根据角色集合roleIds与菜单集合menuIds进行绑定，不可为空(菜单授权)
    @Transactional
    @RequestMapping("bindRoleMenu")
    public ApiResponse bindRoleMenu(String roleId, @RequestParam(value = "menuIds") List<String> menuIds) throws Exception{

        int success = roleMenuService.bindRoleMenu(roleId, menuIds);
        return new ApiResponse(success);
    }

    //根据角色集合roleIds与菜单集合menuIds解除绑定，不可为空（移除菜单绑定）
    @Transactional
    @RequestMapping("releaseRoleMenu")
    public ApiResponse releaseRoleMenu(@RequestParam(value = "roleIds")List<String> roleIds,@RequestParam(value = "menuIds")List<String> menuIds) throws Exception{

        int success = roleMenuService.releaseRoleMenu(roleIds, menuIds);
        return new ApiResponse(success);
    }
}
