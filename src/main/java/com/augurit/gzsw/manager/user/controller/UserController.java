package com.augurit.gzsw.manager.user.controller;

import com.augurit.gzsw.ApiException;
import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.RespCodeMsgDepository;
import com.augurit.gzsw.base.role.service.IRole;
import com.augurit.gzsw.base.role.service.UserRoleService;
import com.augurit.gzsw.domain.Node;
import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.User;
import com.augurit.gzsw.manager.user.service.OrgService;
import com.augurit.gzsw.manager.user.service.OrgUserService;
import com.augurit.gzsw.manager.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

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
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private OrgService orgService;

    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private OrgUserService orgUserService;

    @RequestMapping({"/index.do"})
    public ModelAndView index() throws Exception {
        return new ModelAndView("/client/index");
    }

    @RequestMapping("/listOrgUsers")
    public ApiResponse listOrgUsers(String roleId) throws Exception {
        if(StringUtils.isBlank(roleId)) {
            log.error("角色ID不能为空");
            throw new ApiException(RespCodeMsgDepository.REQUEST_PARAMS_DATA_ERROR, null);
        }

        List<Org> orgs = orgService.listOrgs();
        List<Node> roots = Lists.newArrayList();
        List<Org> willRemoved = Lists.newArrayList();
        for(Org org : orgs) {
            if(StringUtils.isEmpty(org.getPid())) {
                willRemoved.add(org);
                roots.add(new Node(org));
            }
        }
        orgs.removeAll(willRemoved);
        willRemoved.clear();

        for(Node root : roots) {
            traverse(root, orgs);
        }

        return new ApiResponse(roots);
    }

    /**
     * 根据orgId与username或者loginname查询用户
     * @param orgId orgId是必须的,查询机构下的用户
     * @param userName username是在该orgId对应机构下查询该用户信息,可为空，为空查找机构下的用户（用户名或登录名的模糊查找）
     * @param contain false为值列出当前机构下的用户，true除了当前机构下的用户还列出子机构用户
     * @param page
     * @param limit
     * @return
     * @throws Exception
     */
    @RequestMapping("/listUsers")
    public ApiResponse listUsersByOrgIdAndName(String orgId, String userName, boolean contain, int page, int limit) throws Exception{
        PageHelper.startPage(page, limit);
        List<User> users = userService.listUsersByOrgIdAndName(orgId, userName, contain);
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

    private void traverse(Node parent, List<Org> orgs) throws Exception {
        List<Node> children = Lists.newArrayList();

        if("1".equals(parent.getType())) {
            List<Org> willRemoved = Lists.newArrayList();
            for(Org org : orgs) {
                if(parent.getId().equals(org.getPid())) {
                    Node child = new Node(org);
                    children.add(child);
                    willRemoved.add(org);
                }
            }

            orgs.removeAll(willRemoved);
            for(Node child : children) {
                traverse(child, orgs);
            }

            if(CollectionUtils.isEmpty(children)) {
                List<User> users = userService.listUsersByOrgIdAndName(parent.getId(), null, false);
                if(!CollectionUtils.isEmpty(users)) {
                    for(User user : users) {
                        if("1".equals(user.getActive())) {// 有效用户才加入到列表中
                            Node child = new Node(user);
                            children.add(child);
                        }
                    }
                }
            }

            parent.setChildren(children);
        }
    }

}
