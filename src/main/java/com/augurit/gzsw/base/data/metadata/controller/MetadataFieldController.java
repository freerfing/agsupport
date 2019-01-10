package com.augurit.gzsw.base.data.metadata.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.base.data.metadata.service.MetadataFieldService;
import com.augurit.gzsw.domain.MetadataField;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <b><code>MetadataFieldController</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 17:14.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@RestController
@RequestMapping("/metadata/field")
public class MetadataFieldController {

    @Autowired
    private MetadataFieldService metadataFieldService;

    @RequestMapping("listById")
    public ApiResponse selectById(String id)throws Exception{

        MetadataField metadataField = metadataFieldService.selectById(id);
        return new ApiResponse(metadataField);
    }

    @RequestMapping("list")
    public ApiResponse listByDatabaseIdOrName(@RequestParam String tableId,String name) throws Exception{
        List<MetadataField> metadataFieldList = metadataFieldService.listByTableIdOrName(tableId,name);
        return new ApiResponse(metadataFieldList);
    }

    @Transactional
    @RequestMapping("save")
    public ApiResponse insert(MetadataField metadataField)throws Exception{

        metadataField.setId(DefaultIdGenerator.getIdForStr());
        int success = metadataFieldService.insert(metadataField);
        return new ApiResponse(success);
    }

    @Transactional
    @RequestMapping("update")
    public ApiResponse updateById(MetadataField metadataField) throws Exception{

        int success = metadataFieldService.updateById(metadataField);
        return new ApiResponse(success);
    }

    @Transactional
    @RequestMapping("delete")
    public ApiResponse deleteByIds(@RequestParam("ids") List<String> ids) throws Exception{

        int success = metadataFieldService.deleteByIds(ids);
        return new ApiResponse(success);
    }

}
