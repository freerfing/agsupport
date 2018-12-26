package com.augurit.gzsw.manager.user.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.domain.User;
import com.augurit.gzsw.manager.user.service.OrgService;
import com.augurit.gzsw.manager.user.service.OrgUserService;
import com.augurit.gzsw.manager.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <b><code>UserController</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/21 17:32.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@RestController
@RequestMapping("/manager/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private OrgService orgService;

    @Autowired
    private OrgUserService orgUserService;

    /**
     * 根据orgId与username或者loginname查询用户
     * @param orgId orgId是必须的,查询机构下的用户
     * @param userName username是在该orgId对应机构下查询该用户信息,可为空，为空查找机构下的用户（用户名或登录名的模糊查找）
     * @param contain false为值列出当前机构下的用户，true除了当前机构下的用户还列出子机构用户
     * @param pageNum
     * @param pageSize
     * @return
     * @throws Exception
     */
    @RequestMapping("listUsers")
    public ApiResponse listUsersByOrgIdAndName(@RequestParam(required = true) String orgId,String userName,boolean contain, @RequestParam(defaultValue = "1") int pageNum, @RequestParam(defaultValue = "20") int pageSize)
            throws Exception{
        PageHelper.startPage(pageNum, pageSize);
        List<User> users = userService.listUsersByOrgIdAndName(orgId,userName,contain);
        PageInfo info = new PageInfo(users);
        return new ApiResponse(info);
    }

    @RequestMapping("insert")
    public ApiResponse insert(User user)throws Exception{

        int success = userService.insert(user);
        return new ApiResponse(success);
    }

    /**
     * 修改用户信息
     * @param user
     * @param newOrgId 可以为空，为空时表示不修改机构编码
     * @return
     * @throws Exception
     */
    @RequestMapping("update")
    public ApiResponse update(User user,String newOrgId)throws Exception{
        int success = userService.update(user,newOrgId);
        return new ApiResponse(success);
    }

    /**
     * @param orgId 用户所属组织机构id
     * @param fromUserId  被移动的用户id
     * @param toUserId 目标位置用户的id
     * @return
     * @throws JsonProcessingException
     */
//    修改顺序
    @RequestMapping("updateDisporder")
    public ApiResponse updateDisporder(String orgId,String fromUserId,String toUserId) throws JsonProcessingException {
        int success = orgUserService.updateDisporder(orgId, fromUserId, toUserId);
        return new ApiResponse(success);
    }

//    根据orgId与userId删除用户关系，如何userId为空，则移除orgId对应的所有用户，如果不为空，则删除该关系
    @RequestMapping("delete")
    public ApiResponse delete(String orgId,String userId)throws Exception{
        int success = userService.delete(orgId,userId);
        return new ApiResponse(success);
    }


}
