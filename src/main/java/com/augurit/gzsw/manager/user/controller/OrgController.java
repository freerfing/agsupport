package com.augurit.gzsw.manager.user.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.RespCodeMsgDepository;
import com.augurit.gzsw.domain.Node;
import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.domain.Tree;
import com.augurit.gzsw.manager.user.service.OrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;


/**
 * <b><code>OrgUserController</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/19 15:01.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@RestController
@RequestMapping("/manager/org")
public class OrgController {

    @Autowired
    private OrgService orgService;

    @RequestMapping("/listOrgs")
    public ApiResponse listOrgs() throws Exception{
        List<Org> orgs = orgService.listOrgs();
        return new ApiResponse<>(orgs);
    }

    //新建机构
    @RequestMapping("/saveOrg")
    public ApiResponse saveOrg(Org org)throws Exception{
        org.setId(DefaultIdGenerator.getIdForStr());
        orgService.saveOrg(org);
        return new ApiResponse(null);
    }

    @RequestMapping("/updOrg")
    public ApiResponse updOrg(Org org) throws Exception{
        orgService.updOrg(org);
        return new ApiResponse(null);
    }

    //删除当前id所在机构及其所有子机构
    @RequestMapping("/delOrgs")
    public ApiResponse delOrgs(String id) throws Exception{
        orgService.delOrgs(id);
        return new ApiResponse(null);
    }

}
