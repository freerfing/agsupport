package com.augurit.gzsw.manager.user.service;

import com.augurit.gzsw.domain.Node;
import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.Tree;
import org.aspectj.weaver.ast.Or;

import java.util.List;

/**
 * <b><code>OrgUserService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/19 15:08.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public interface OrgService {
    List<Org> listMineAndDescends(String id) throws Exception;
    List<Org> listOrgs() throws Exception;
    List<Org> listOrgsByUserId(String userId) throws Exception;
    void saveOrg(Org org) throws Exception;
    void updOrg(Org org) throws Exception;
    void delOrgs(String id) throws Exception;
}
