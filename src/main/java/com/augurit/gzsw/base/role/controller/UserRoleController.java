package com.augurit.gzsw.base.role.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.base.role.service.UserRoleService;
import com.augurit.gzsw.domain.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <b><code>UserRoleController</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/26 16:32.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */

@RestController
@RequestMapping("/role")
public class UserRoleController {

    @Autowired
    private UserRoleService userRoleService;

    //如果userName为空则查询roleId对应的所有用户信息，否则根据roleId与userName进行模糊查询
    @RequestMapping("listUsers")
    public ApiResponse listByRoleIdOrUserName (@RequestParam String roleId,String userName)throws Exception{
        List list = userRoleService.listByRoleIdOrUserName(roleId, userName);
        return new ApiResponse(list);
    }

    //解除用户角色绑定
    @RequestMapping("releaseRoleBind")
    public ApiResponse deleteByRoleIdAndUserIds(@RequestParam("roleIds") List<String> roleIds,@RequestParam("userIds") List<String> userIds) throws Exception {
        int success = userRoleService.deleteByRoleIdsAndUserIds(roleIds, userIds);
        return new ApiResponse(success);
    }

    //角色用户绑定
    @RequestMapping("createRoleBind")
    public ApiResponse insertByRoleIdAndUserIds(@RequestParam("roleIds")List<String> roleIds,@RequestParam("userIds")List<String> userIds)throws Exception{
        int success = userRoleService.insertByRoleIdsAndUserIds(roleIds, userIds);
        return new ApiResponse(success);
    }
}
