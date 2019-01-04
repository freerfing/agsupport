package com.augurit.gzsw.manager.user.service.impl;

import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.domain.Org;
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


    @Override
    public List<Org> listOrgs() {
        List<Org> orgs = orgMapper.listOrgs();
        return orgs;
    }

    @Override
    public List<Org> listChildOrgsById(String id, boolean contain) {
        List<Org> orgs = orgMapper.listChildOrgsById(id, contain);
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
        org.setId(DefaultIdGenerator.getIdForStr());
        return orgMapper.insert(org);
    }

    @Transactional
    @Override
    public int updateById(Org org) {
        return orgMapper.updateById(org);
    }

    @Transactional
    @Override
    public int deleteSelfAndChildById(String id) {
        List<String> ids = new ArrayList<>();
        ids.add(id);
        List<Org> orgs = orgMapper.listChildOrgsById(id, true);
        if (!CollectionUtils.isEmpty(orgs)){
            for (Org org : orgs){
                ids.add(org.getId());
            }
        }
        int success = orgMapper.deleteByIds(ids);
        return success;
    }


}
