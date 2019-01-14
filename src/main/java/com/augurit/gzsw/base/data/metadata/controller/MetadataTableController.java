package com.augurit.gzsw.base.data.metadata.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.base.data.metadata.service.MetadataFieldService;
import com.augurit.gzsw.base.data.metadata.service.MetadataTableService;
import com.augurit.gzsw.domain.MetadataTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * <b><code>MetadataTableController</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 17:08.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */

@RestController
@RequestMapping("/metadata/table")
public class MetadataTableController {
    @Autowired
    private MetadataTableService metadataTableService;

    @Autowired
    private MetadataFieldService metadataFieldService;

    @RequestMapping("listById")
    public ApiResponse selectById(String id)throws Exception{

        MetadataTable metadataTable = metadataTableService.selectById(id);
        return new ApiResponse(metadataTable);
    }

    @RequestMapping("list")
    public ApiResponse listByDatabaseIdOrName(@RequestParam String databaseId,String name) throws Exception{
        List<MetadataTable> metadataTableList = metadataTableService.listByDatabaseIdOrName(databaseId,name);
        return new ApiResponse(metadataTableList);
    }

    @Transactional
    @RequestMapping("save")
    public ApiResponse insert(MetadataTable metadataTable)throws Exception{

        metadataTable.setId(DefaultIdGenerator.getIdForStr());
        metadataTable.setModifyTime(new Date());
        int success = metadataTableService.insert(metadataTable);
        return new ApiResponse(success);
    }

    @Transactional
    @RequestMapping("update")
    public ApiResponse updateById(MetadataTable metadataTable) throws Exception{

        metadataTable.setModifyTime(new Date());
        int success = metadataTableService.updateById(metadataTable);
        return new ApiResponse(success);
    }

    @Transactional
    @RequestMapping("delete")
    public ApiResponse deleteByIds(@RequestParam("ids") List<String> ids) throws Exception{

        int table_success = metadataTableService.deleteByIds(ids);
        int field_success = metadataFieldService.deleteByTableIds(ids);
        return new ApiResponse(table_success+field_success);
    }

}
