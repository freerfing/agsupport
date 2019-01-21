package com.augurit.gzsw.manager.user.controller;

import com.augurit.gzsw.ApiResponse;
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
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public ApiResponse listOrgUsers() throws Exception {

        List<Org> orgs = orgService.listOrgs();
        List<Node> roots = Lists.newArrayList();
        List<Org> willRemoved = Lists.newArrayList();
        for (Org org : orgs) {
            if (StringUtils.isEmpty(org.getPid())) {
                willRemoved.add(org);
                roots.add(new Node(org));
            }
        }
        orgs.removeAll(willRemoved);
        willRemoved.clear();

        for (Node root : roots) {
            traverse(root, orgs);
        }

        return new ApiResponse(roots);
    }

    /**
     * 根据orgId与username查询用户，并设置用户在orgId下对应的机构列表
     *
     * @param orgId    orgId是必须的,查询机构下的用户，不重复
     * @param userName username是在该orgId对应机构下查询该用户信息,可为空，为空查找机构下的用户（用户名或登录名的模糊查找）
     * @param page
     * @param limit
     * @return
     * @throws Exception
     */
    @RequestMapping("/listUsers")
    public ApiResponse listUsersByOrgIdAndName(String orgId, String userName, int page, int limit) throws Exception {

        List<Org> orgs = orgService.listMineAndDescends(orgId);
        List<String> orgIds = orgs.stream().map(Org::getId).collect(Collectors.toList());
        PageHelper.startPage(page, limit);
        //获取不重复用户
        List<User> users = userService.listUsers(orgIds, userName);
        for (User user : users) {
            List<Org> orgList = orgService.listOrgsByUserId(user.getUserId());
            for (Org org : orgList) {
                if (orgIds.contains(org.getId())) {
                    List<Org> containOrgs = user.getOrgs();
                    if (CollectionUtils.isEmpty(containOrgs)) {
                        containOrgs = new ArrayList<>();
                        containOrgs.add(org);
                    } else {
                        containOrgs.add(org);
                    }
                    user.setOrgs(containOrgs);
                }
            }
        }
        PageInfo info = new PageInfo(users);
        return new ApiResponse(info);
    }

    @RequestMapping("insert")
    public ApiResponse insert(User user, String orgId) throws Exception {

        int success = userService.insert(user, orgId);
        return new ApiResponse(success);
    }

    /**
     * 修改用户信息
     *
     * @param user
     * @param newOrgId 可以为空，为空时表示不修改机构编码
     * @return
     * @throws Exception
     */
    @RequestMapping("update")
    public ApiResponse update(User user, String oldOrgId, String newOrgId) throws Exception {
        int success = userService.update(user, oldOrgId, newOrgId);
        return new ApiResponse(success);
    }

    /**
     * @param orgId      用户所属组织机构id
     * @param fromUserId 被移动的用户id
     * @param toUserId   目标位置用户的id
     * @return
     * @throws JsonProcessingException
     */
//    修改顺序
    @RequestMapping("updateDisporder")
    public ApiResponse updateDisporder(String orgId, String fromUserId, String toUserId) throws Exception {
        int success = orgUserService.updateDisporder(orgId, fromUserId, toUserId);
        return new ApiResponse(success);
    }

    //    根据orgId与userId删除用户关系，如何userId为空，则移除orgId对应的所有用户，如果不为空，则删除该关系
    @RequestMapping("delete")
    public ApiResponse delete(String orgId, String userId) throws Exception {
        int success = userService.delete(orgId, userId);
        return new ApiResponse(success);
    }

    private void traverse(Node parent, List<Org> orgs) throws Exception {
        List<Node> children = Lists.newArrayList();

        if ("1".equals(parent.getType())) {
            List<Org> willRemoved = Lists.newArrayList();
            for (Org org : orgs) {
                if (parent.getId().equals(org.getPid())) {
                    Node child = new Node(org);
                    children.add(child);
                    willRemoved.add(org);
                }
            }

            orgs.removeAll(willRemoved);
            for (Node child : children) {
                traverse(child, orgs);
            }

            if (CollectionUtils.isEmpty(children)) {
                List<String> orgIds = new ArrayList<>();
                orgIds.add(parent.getId());
                List<User> users = userService.listUsers(orgIds, null);
                if (!CollectionUtils.isEmpty(users)) {
                    for (User user : users) {
                        if ("1".equals(user.getActive())) {// 有效用户才加入到列表中
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
