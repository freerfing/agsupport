package com.augurit.gzsw.manager.user.controller;

import com.augurit.gzsw.ApiResponse;
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

    /*
    根据当前id列出所有的子机构组织
     */
    @RequestMapping("listOrgs")
    public ApiResponse listOrgsById(String id)throws Exception{
        String orgCode = null;
        //如果id不为空，则列出该id所在机构的子机构组织
        if (!StringUtils.isEmpty(id)){
            Org org = orgService.selectById(id);
            if (null != org ){
                orgCode = org.getOrgCode();
            }
        }
        //如果id为空，则列出所有的机构组织
        List<Tree> treeList = orgService.listAllSubOrgsByOrgCode(orgCode);
        return new ApiResponse<>(treeList);
    }

    @RequestMapping("listOrg")
    public ApiResponse listOrg()throws Exception{
        List<Node> orgs = orgService.listOrg();
        return new ApiResponse<>(orgs);
    }

    //根据id查询当前机构信息
    @RequestMapping("search")
    public ApiResponse select(String id)throws Exception{
        Org org = orgService.selectById(id);
        return new ApiResponse(org);
    }
    //新建机构
    @RequestMapping("insertOrg")
    public ApiResponse insert(Org org)throws Exception{
        org.setId(UUID.randomUUID().toString());
        org.setOrgCode(UUID.randomUUID().toString());
        int success = orgService.inert(org);
        return new ApiResponse(success);
    }

    @RequestMapping("update")
    public ApiResponse updateById(Org org)throws Exception{
        int success = orgService.updateById(org);
        return new ApiResponse(success);
    }

    //删除当前id所在机构及其所有子机构
    @RequestMapping("delete")
    public ApiResponse deleteSelfAndSubById(String id)throws Exception{
        if (null == id || "".equals(id)) {
            return new ApiResponse(RespCodeMsgDepository.REQUEST_PARAMS_DATA_ERROR,"参数不能为空");
        }
        int success = orgService.deleteSelfAndSubById(id);
        return new ApiResponse(success);
    }

}
