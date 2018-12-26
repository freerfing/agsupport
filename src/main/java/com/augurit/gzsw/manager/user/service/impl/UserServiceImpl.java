package com.augurit.gzsw.manager.user.service.impl;

import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.OrgUser;
import com.augurit.gzsw.domain.User;
import com.augurit.gzsw.manager.user.mapper.UserMapper;
import com.augurit.gzsw.manager.user.service.OrgService;
import com.augurit.gzsw.manager.user.service.OrgUserService;
import com.augurit.gzsw.manager.user.service.UserService;
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
    public List<User> listUsersByOrgIdAndName(String orgId,String userName,boolean contain) {
        //为true，列出该机构下的用户及所有子机构下的用户，否则只列出当前目录下的用户
        if (contain){
            List<User> users = listAllSubUsersByOrgIdAndName(orgId,userName);
            return users;
        }else{
            return userMapper.listUsersByOrgIdAndName(orgId,userName);
        }

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
        List<OrgUser> orgUserList = orgUserService.selectByOrgId(user.getOrgId());
        if (CollectionUtils.isEmpty(orgUserList)){
            orgUser.setDisporder(1);
        }
        orgUser.setDisporder(orgUserList.size());
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
            List<OrgUser> orgUserList = orgUserService.selectByOrgId(newOrgId);
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
    public int delete(String orgId, String userId) {
        return orgUserService.deleteByOrgIdAndUserId(orgId,userId);
    }

    private List<User> listAllSubUsersByOrgIdAndName(String orgId,String userName){
        Org org = orgService.selectById(orgId);
        if (null == org){
            return null;
        }
        List userList = new ArrayList();
        User user = new User();
        user.setOrgId(org.getId());
        List<User> users = userMapper.listUsersByOrgIdAndName(orgId,userName);
        userList.addAll(users);
        List<Org> orgs = orgService.listSubOrgsByOrgCode(org.getOrgCode());
        if (null == orgs){
            return userList;
        }
        for (Org org1 : orgs){
            userList.addAll(listAllSubUsersByOrgIdAndName(org1.getId(),userName));
        }
        return userList;
    }

}
