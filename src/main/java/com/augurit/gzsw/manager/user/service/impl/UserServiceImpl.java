package com.augurit.gzsw.manager.user.service.impl;

import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.OrgUser;
import com.augurit.gzsw.domain.User;
import com.augurit.gzsw.manager.user.mapper.UserMapper;
import com.augurit.gzsw.manager.user.service.OrgService;
import com.augurit.gzsw.manager.user.service.OrgUserService;
import com.augurit.gzsw.manager.user.service.UserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * <b><code>UserServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/21 17:30.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private OrgService orgService;

    @Autowired
    private OrgUserService orgUserService;

    @Override
    public Object listUsersByOrgIdOrName(String orgId,String userName,boolean contain,int pageNum,int pageSize) {
        List<String> orgIds = new ArrayList<>();
        orgIds.add(orgId);
        //如果contain为true则列出所有的子机构下的用户，否则只列出当前机构下的用户
        if (contain) {
            List<Org> orgs = orgService.listChildOrgsById(orgId, true);
            if (!CollectionUtils.isEmpty(orgs)) {
                for (Org org : orgs) {
                    orgIds.add(org.getId());
                }
            }
        }
        //如果机构数目大于1，则分页，否则不分页
        if (orgIds.size() > 1) {
            PageHelper.startPage(pageNum, pageSize);
            List<User> users = userMapper.listUsersByOrgIdsOrName(orgIds, userName);
            PageInfo info = new PageInfo(users);
            return info;
        }
        return userMapper.listUsersByOrgIdsOrName(orgIds, userName);
    }

    @Transactional
    @Override
    public int insert(User user) {
        user.setUserId(UUID.randomUUID().toString());
        userMapper.insert(user);
        OrgUser orgUser = new OrgUser();
        orgUser.setOrgId(user.getOrgId());
        orgUser.setUserId(user.getUserId());
        //设置排名，查询该机构下多少个用户，按顺序排名
        List<OrgUser> orgUserList = orgUserService.listByOrgId(user.getOrgId());
        if (CollectionUtils.isEmpty(orgUserList)){
            orgUser.setDisporder(1);
        }
        orgUser.setDisporder(orgUserList.size()+1);
        return orgUserService.insert(orgUser);
    }

    @Transactional
    @Override
    public int update(User user,String newOrgId)  {
        int success = userMapper.update(user);
        //如果newOrgId为空，则不更新机构编码
        if (!StringUtils.isEmpty(newOrgId) && !user.getOrgId().equals(newOrgId)){
            OrgUser orgUser = new OrgUser();
            orgUser.setOrgId(user.getOrgId());
            orgUser.setUserId(user.getUserId());
            //设置排名，查询该机构下多少个用户，按顺序排名
            List<OrgUser> orgUserList = orgUserService.listByOrgId(newOrgId);
            if (CollectionUtils.isEmpty(orgUserList)){
                orgUser.setDisporder(1);
            }
            //因为用户移到其他机构下，所以排名列在最后
            orgUser.setDisporder(orgUserList.size()+1);
            orgUserService.update(orgUser,newOrgId);
        }
        return success;
    }

    @Transactional
    @Override
    public int deleteByOrgIdOrUserId(String orgId, String userId) {
        return orgUserService.deleteByOrgIdOrUserId(orgId,userId);
    }


}
