package com.augurit.gzsw.manager.user.service;

import com.augurit.gzsw.domain.Node;
import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.Tree;

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
    List<Tree> listAllSubOrgsByOrgCode(String orgCode);

    List<Org> listSubOrgsByOrgCode(String orgCode);

    Org selectById(String id);

    int inert(Org org);

    int updateById(Org org);

    int deleteSelfAndSubById(String id);

	List<Node> listOrg() throws Exception;
}
