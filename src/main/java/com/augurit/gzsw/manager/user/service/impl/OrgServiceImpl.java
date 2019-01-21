package com.augurit.gzsw.manager.user.service.impl;

import com.augurit.gzsw.domain.Node;
import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.Tree;
import com.augurit.gzsw.manager.user.mapper.OrgMapper;
import com.augurit.gzsw.manager.user.service.OrgService;
import com.google.common.base.Strings;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;
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
    public List<Org> listMineAndDescends(String id) throws Exception {
        return orgMapper.listMineAndDescends(id);
    }

    @Override
    public List<Org> listOrgs() throws Exception {
        return orgMapper.listOrgs();
    }

    @Override
    public List<Org> listOrgsByUserId(String userId) throws Exception {
        return orgMapper.listOrgsByUserId(userId);
    }

    @Override
    public void saveOrg(Org org) throws Exception {
        orgMapper.saveOrg(org);
    }

    @Override
    public void updOrg(Org org) throws Exception {
        orgMapper.updOrg(org);
    }

    @Override
    public void delOrgs(String id) throws Exception {
        if(Strings.isNullOrEmpty(id)) {
            return;
        }

        List<Org> orgs = orgMapper.listMineAndDescends(id);
        List<String> ids = Lists.newArrayList();
        for(Org org : orgs) {
            ids.add(org.getId());
        }
        orgMapper.delOrgs(ids);
    }
}
