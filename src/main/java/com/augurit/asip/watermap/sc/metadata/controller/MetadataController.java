package com.augurit.asip.watermap.sc.metadata.controller;

import com.augurit.agcloud.frame.json.JsonUtils;
import com.augurit.agcloud.frame.ui.result.ContentResultForm;
import com.augurit.asip.watermap.domain.metadata.WaMetadataField;
import com.augurit.asip.watermap.sc.metadata.service.IMetadata;
import com.common.util.Common;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/metadata"})
public class MetadataController {

    @Autowired
    private IMetadata iMetadata;

    @RequestMapping({"/getFieldsByTableName/{tableName}"})
    public String getFieldsByTableName(@PathVariable String tableName) throws Exception {
        String result = null;
        try {
            if (Common.isCheckNull(tableName)) return null;
            Map<String, WaMetadataField> map = new LinkedHashMap<>();
            List<WaMetadataField> list = iMetadata.getFieldsByTableName(tableName);
            for (int i = 0; i < list.size(); i++) {
                WaMetadataField field = list.get(i);
                map.put(field.getNAME(), field);
            }
            result = JsonUtils.toJson(new ContentResultForm<>(true, map, "查询成功"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
