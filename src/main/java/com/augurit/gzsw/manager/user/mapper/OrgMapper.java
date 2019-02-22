package com.augurit.gzsw.manager.user.mapper;

import com.augurit.gzsw.domain.Node;
import com.augurit.gzsw.domain.Org;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>OrgUserMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/19 15:26.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface OrgMapper {
    List<Org> listOrgs() throws Exception;
    List<Org> listOrgsByUserId(String userId) throws Exception;
    List<Org> listMineAndDescends(@Param("id") String id) throws Exception;
    void saveOrg(Org org) throws Exception;
    void updOrg(Org org) throws Exception;
    void delOrgs(@Param("ids") List<String> ids) throws Exception;
}
