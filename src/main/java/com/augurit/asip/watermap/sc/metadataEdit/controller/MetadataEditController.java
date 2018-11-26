package com.augurit.asip.watermap.sc.metadataEdit.controller;

import com.augurit.agcloud.frame.json.JsonUtils;
import com.augurit.agcloud.frame.ui.result.ContentResultForm;
import com.augurit.agcloud.frame.ui.result.ResultForm;
import com.augurit.agcom.common.CasLoginHelpClient;
import com.augurit.asip.watermap.domain.metadataEdit.WaMetadataModify;
import com.augurit.asip.watermap.sc.metadataEdit.service.IMetadataEdit;
import com.common.util.Common;
import com.github.pagehelper.StringUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by czh on 2017-12-20.
 */
@RestController
@RequestMapping({"/metadataEdit"})
public class MetadataEditController {

    @Autowired
    private IMetadataEdit iMetadata;

    /**
     * 查询源数据
     *
     * @param tableName
     * @param priField
     * @param priValue
     * @return
     */
    @RequestMapping("/findMetadata/{tableName}/{priField}/{priValue}")
    public String findMetadata(@PathVariable String tableName, @PathVariable String priField, @PathVariable String priValue) {
        try {
            if (Common.isCheckNull(tableName) || Common.isCheckNull(priField) || Common.isCheckNull(priValue))
                return null;
            WaMetadataModify maMetadataModify = new WaMetadataModify();
            maMetadataModify.setTableName(tableName);
            maMetadataModify.setPriField(priField);
            maMetadataModify.setPriValue(priValue);
            List list = iMetadata.findMetadata(maMetadataModify);
            return JsonUtils.toJson(new ContentResultForm<>(true, list.size() > 0 ? list.get(0) : null, "查询成功"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false));
    }

    /**
     * 源数据修改和添加
     *
     * @param maMetadataModify
     * @return
     */
    @RequestMapping("/saveMetadata")
    public String saveMetadata(HttpServletRequest request,WaMetadataModify maMetadataModify) {
        try {
            if (Common.isCheckNull(maMetadataModify)) return null;
            
            // 判断账号级别
            String loginName = CasLoginHelpClient.getLoginName(request);
            List<Map> list = iMetadata.listAuthorSQL(loginName);
            maMetadataModify.setIsModi("-1");
            if (list != null && list.size() > 0) {
                for(int i=0;i<list.size();i++){
                	if("局机关".equals(list.get(i).get("xpath").toString().split("/")[2])){
                        maMetadataModify.setIsModi("0");
                	}else if("各区水务部门".equals(list.get(i).get("xpath").toString().split("/")[2])){
                        maMetadataModify.setIsModi("-1");
                	}else{
                		maMetadataModify.setIsModi("-1");
                	}
                }
            }
            
            maMetadataModify.setLastUpdate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
            if (StringUtil.isEmpty(maMetadataModify.getId())) {
                maMetadataModify.setId(UUID.randomUUID().toString());
                maMetadataModify.setOperaName(loginName);
                iMetadata.saveMetadata(maMetadataModify);
            } else {
            	maMetadataModify.setOperaName(loginName);
                iMetadata.updateMetadata(maMetadataModify);
            }
            return JsonUtils.toJson(new ContentResultForm<>(true, maMetadataModify.getId(), "查询成功"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "保存失败！"));
    }

}
