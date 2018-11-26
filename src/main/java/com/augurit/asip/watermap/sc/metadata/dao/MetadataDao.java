package com.augurit.asip.watermap.sc.metadata.dao;

import com.augurit.asip.watermap.domain.metadata.WaMetadataField;
import com.common.dbcp.DBHelper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MetadataDao {

    /**
     * 根据表名从元数据表获取字段信息
     * @param tableName 表名
     * @return List<WaMetadataField>
     */
    public List<WaMetadataField> getFieldsByTableName(String tableName) {
        String sql = "SELECT m.* FROM WA_METADATA_TABLE t,WA_METADATA_FIELD m where t.NAME = ? and t.ID=m.TABLEID order by m.dispsort asc";
        List<Object> values = new ArrayList<Object>();
        values.add(tableName);
        return DBHelper.find("spring.datasource", WaMetadataField.class, sql, values);
    }
}
