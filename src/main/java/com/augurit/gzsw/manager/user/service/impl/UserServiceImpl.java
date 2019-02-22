package com.augurit.gzsw.manager.user.service.impl;

import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.OrgUser;
import com.augurit.gzsw.domain.User;
import com.augurit.gzsw.manager.user.mapper.OrgMapper;
import com.augurit.gzsw.manager.user.mapper.OrgUserMapper;
import com.augurit.gzsw.manager.user.mapper.UserMapper;
import com.augurit.gzsw.manager.user.service.OrgUserService;
import com.augurit.gzsw.manager.user.service.UserService;
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

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
    private OrgUserMapper orgUserMapper;

    @Override
    public List<User> listUsers(List<String> orgIds, String userName) throws Exception {
        return userMapper.listUsers(orgIds,userName);
    }

    @Transactional
    @Override
    public int insert(User user,String orgId) throws Exception {
        user.setUserId(DefaultIdGenerator.getIdForStr());
        userMapper.insert(user);
        OrgUser orgUser = new OrgUser();
        orgUser.setOrgId(orgId);
        orgUser.setUserId(user.getUserId());
        //设置排名，查询该机构下多少个用户，按顺序排名
        List<OrgUser> orgUserList = orgUserMapper.selectByOrgId(orgId);
        if (CollectionUtils.isEmpty(orgUserList)){
            orgUser.setDisporder(1);
        }
        orgUser.setDisporder(orgUserList.size());
        return orgUserMapper.insert(orgUser);
    }

    @Transactional
    @Override
    public int update(User user,String oldOrgId,String newOrgId) throws Exception  {
        int success = userMapper.update(user);
        //如果newOrgId为空，则不更新机构编码
        if (!StringUtils.isEmpty(newOrgId) && !oldOrgId.equals(newOrgId)){
            OrgUser orgUser = new OrgUser();
            orgUser.setOrgId(oldOrgId);
            orgUser.setUserId(user.getUserId());
            //设置排名，查询该机构下多少个用户，按顺序排名
            List<OrgUser> orgUserList = orgUserMapper.selectByOrgId(newOrgId);
            if (CollectionUtils.isEmpty(orgUserList)){
                orgUser.setDisporder(1);
            }
            //因为用户移到其他机构下，所以排名列在最后
            orgUser.setDisporder(orgUserList.size()+1);
            orgUserMapper.update(orgUser,newOrgId);
        }
        return success;
    }

    @Override
    public User getUser(String id, String loginName, String tel) throws Exception  {
        return userMapper.getUser(id, loginName, tel);
    }

    @Transactional
    @Override
    public int delete(String orgId, String userId) throws Exception {
        return orgUserMapper.deleteByOrgIdAndUserId(orgId,userId);
    }


}
