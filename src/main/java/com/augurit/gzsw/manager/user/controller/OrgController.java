package com.augurit.gzsw.manager.user.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.domain.Org;
import com.augurit.gzsw.manager.user.service.OrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


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


    @RequestMapping("listOrgs")
    public ApiResponse listOrgsById()throws Exception{

        List<Org> orgs = orgService.listOrgs();
        return new ApiResponse<>(orgs);
    }

    @RequestMapping("listChildOrgs")
    public ApiResponse listChildOrgsById(@RequestParam String id, boolean contain){
        List<Org> orgs = orgService.listChildOrgsById(id, contain);
        return new ApiResponse(orgs);
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
    public ApiResponse deleteSelfAndChildById(String id)throws Exception{

        int success = orgService.deleteSelfAndChildById(id);
        return new ApiResponse(success);
    }

}
