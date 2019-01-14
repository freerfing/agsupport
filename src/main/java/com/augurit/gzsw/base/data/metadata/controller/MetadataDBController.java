package com.augurit.gzsw.base.data.metadata.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.base.data.metadata.service.MetadataDBService;
import com.augurit.gzsw.base.data.metadata.service.MetadataFieldService;
import com.augurit.gzsw.base.data.metadata.service.MetadataTableService;
import com.augurit.gzsw.domain.MetadataDB;
import com.augurit.gzsw.domain.MetadataTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * <b><code>MetadataController</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 9:22.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@RestController
@RequestMapping("/metadata/db")
public class MetadataDBController {

    @Autowired
    private MetadataDBService metadataDBService;
    @Autowired
    private MetadataTableService metadataTableService;
    @Autowired
    private MetadataFieldService metadataFieldService;

    @RequestMapping("listById")
    public ApiResponse selectById(String id)throws Exception{

        MetadataDB metadataDB = metadataDBService.selectById(id);
        return new ApiResponse(metadataDB);
    }

    @RequestMapping("list")
    public ApiResponse listOrByName(String name) throws Exception{
        List<MetadataDB> metadataDBList = metadataDBService.listOrByName(name);
        return new ApiResponse(metadataDBList);
    }

    @Transactional
    @RequestMapping("save")
    public ApiResponse insert(MetadataDB metadataDB)throws Exception{

        metadataDB.setId(DefaultIdGenerator.getIdForStr());
        Date date = new Date();
        metadataDB.setCreateTime(date);
        metadataDB.setModifyTime(date);
        int success = metadataDBService.insert(metadataDB);
        return new ApiResponse(success);
    }

    @Transactional
    @RequestMapping("update")
    public ApiResponse updateById(MetadataDB metadataDB) throws Exception{

        metadataDB.setModifyTime(new Date());
        int success = metadataDBService.updateById(metadataDB);
        return new ApiResponse(success);
    }

    @Transactional
    @RequestMapping("delete")
    public ApiResponse deleteByIds(@RequestParam("ids") List<String> ids) throws Exception{

        List<MetadataTable> metadataTables = new ArrayList<>();
        for (String dbId : ids){
            metadataTables.addAll(metadataTableService.listByDatabaseIdOrName(dbId,null));
        }
        List<String> tableIds = new ArrayList<>();
        for (MetadataTable metadataTable : metadataTables){
            tableIds.add(metadataTable.getId());
        }
        int db_success = metadataDBService.deleteByIds(ids);
        int table_success = metadataTableService.deleteByDBIds(ids);
        int field_success = metadataFieldService.deleteByTableIds(tableIds);
        return new ApiResponse(db_success+table_success+field_success);
    }
}
