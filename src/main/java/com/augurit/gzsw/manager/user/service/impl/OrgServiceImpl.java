package com.augurit.gzsw.manager.user.service.impl;

import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.Tree;
import com.augurit.gzsw.manager.user.mapper.OrgMapper;
import com.augurit.gzsw.manager.user.service.OrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * <b><code>OrgUserServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/19 15:08.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class OrgServiceImpl implements OrgService {
    @Autowired
    private OrgMapper orgMapper;

    /*
    递归列出该及目录下的所有子目录
     */
    @Override
    public List<Tree> listAllSubOrgsByOrgCode(String orgCode){
        List<Org> orgs = orgMapper.listSubOrgsByOrgCode(orgCode);
        if(CollectionUtils.isEmpty(orgs)){
            return null;
        }
        List<Tree> list = new ArrayList<>();
        for (Org org : orgs){
            Tree<Org> tree = new Tree();
            tree.setSelf(org);
            tree.setChildren(listAllSubOrgsByOrgCode(org.getOrgCode()));
            list.add(tree);
        }
        System.out.println(list);
        return list;
    }

    /*
    仅仅该级目录下的子目录
     */
    @Override
    public List<Org> listSubOrgsByOrgCode(String orgCode) {
        List<Org> orgs = orgMapper.listSubOrgsByOrgCode(orgCode);
        return orgs;
    }

    @Override
    public Org selectById(String id) {
        List<Org> orgs = orgMapper.selectById(id);
        if (!CollectionUtils.isEmpty(orgs)){
            return orgs.get(0);
        }
        return null;
    }


    @Transactional
    @Override
    public int inert(Org org) {
        return orgMapper.insert(org);
    }
    @Transactional
    @Override
    public int updateById(Org org) {
        return orgMapper.updateById(org);
    }

    @Transactional
    @Override
    public int deleteSelfAndSubById(String id) {
        List<String> ids = findSelfAndSubById(id);
        int success = orgMapper.deleteByIds(ids);
        return success;
    }

    private List<String> findSelfAndSubById(String id){
        List<Org> orgs = orgMapper.selectById(id);
        if (CollectionUtils.isEmpty(orgs)){
            return null;
        }
        List<String> ids = new ArrayList<>();
        for (Org org : orgs){
            ids.add(org.getId());
            List<Org> subOrgs = orgMapper.listSubOrgsByOrgCode(org.getOrgCode());
            for (Org org1 : subOrgs){
                //递归调用添加
                ids.addAll(findSelfAndSubById(org1.getId()));
            }
        }
        return ids;
    }

}
