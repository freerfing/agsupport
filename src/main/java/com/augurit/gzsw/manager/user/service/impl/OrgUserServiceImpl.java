package com.augurit.gzsw.manager.user.service.impl;

import com.augurit.gzsw.domain.OrgUser;
import com.augurit.gzsw.manager.user.mapper.OrgUserMapper;
import com.augurit.gzsw.manager.user.service.OrgUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * <b><code>OrgUserServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/25 17:31.
 *
 * @author zyg
 *
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class OrgUserServiceImpl implements OrgUserService {

    @Autowired
    private OrgUserMapper orgUserMapper;

    @Override
    public List<OrgUser> selectByOrgId(String orgId)throws Exception  {
        return orgUserMapper.selectByOrgId(orgId);
    }

    @Override
    public List<String> listUserId(List orgIds) throws Exception {
        return orgUserMapper.listUserId(orgIds);
    }

    @Transactional
    @Override
    public int deleteByOrgIdAndUserId(String orgId, String userId)throws Exception  {
       return orgUserMapper.deleteByOrgIdAndUserId(orgId,userId );
    }

    @Transactional
    @Override
    public int insert(OrgUser orgUser)throws Exception  {
        return orgUserMapper.insert(orgUser);
    }

    @Transactional
    @Override
    public int update(OrgUser orgUser, String newOrgId)throws Exception  {
        return orgUserMapper.update(orgUser,newOrgId );
    }

    @Transactional
    @Override
    public int updateDisporder(String orgId, String fromUserId, String toUserId) throws Exception {
        if (StringUtils.isEmpty(fromUserId) || StringUtils.isEmpty(toUserId)) {
            return 0;
        }
        //根据用户机构查询已按照disporder排序的用户
        List<OrgUser> orgUsers = orgUserMapper.selectByOrgId(orgId);
        //被移动用户原本的排名
        int fromDisporder = 0;
        //目标位置的用户原本的排名
        int toDisporder = 0;
        //被移动用户在orgUsers中的位置
        int from = 0;
        //目标用户在orgUsers中的为位置
        int to = 0;
        //记录遍历orgUsers时的位置
        int num = 0;
        if (CollectionUtils.isEmpty(orgUsers)) {
            return 0;
        }
        //for循环查找用户信息并记录
        for (OrgUser orgUser : orgUsers){
            if(orgUser.getUserId().equals(fromUserId)){
                fromDisporder = orgUser.getDisporder();
                from = num;
            }
            if (orgUser.getUserId().equals(toUserId)) {
                toDisporder = orgUser.getDisporder();
                to = num;
            }
            if (fromDisporder != 0 && toDisporder != 0){
                break;
            }
            num ++;
        }
        //用来存放需要更改disporder的orgUser对象
        List<OrgUser> targetList = new ArrayList<>();
        if (fromDisporder>toDisporder){
            /*
            fromDisporder>toDisporder时，是disporder大的用户往disporder小的位置移动，
            所以fromDisporder前的用户都往后移动，即与后面的用户交换排名
             */
            for (int i = to;i<from;i++) {
                OrgUser orgUser = orgUsers.get(i);
                orgUser.setDisporder(orgUsers.get(i + 1).getDisporder());
                targetList.add(orgUser);
            }
            OrgUser fromOrgUser = orgUsers.get(from);
            fromOrgUser.setDisporder(toDisporder);
            targetList.add(fromOrgUser);
        }else if (fromDisporder<toDisporder){
            /*
            fromDisporder<toDisporder时，是disporder小的用户往disporder大的位置移动，
            所以toDisporder前的用户都往前移动，即与前面的用户交换排名
             */
            for (int i=to;i>from;i--){
                OrgUser orgUser = orgUsers.get(i);
                orgUser.setDisporder(orgUsers.get(i-1).getDisporder());
                targetList.add(orgUser);
            }
            OrgUser fromOrgUser = orgUsers.get(from);
            fromOrgUser.setDisporder(toDisporder);
            targetList.add(fromOrgUser);
        }
        //更新排名
        for (OrgUser orgUser : targetList){
            orgUserMapper.update(orgUser,null);
        }
        return targetList.size();
    }


}
