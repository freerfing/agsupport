package com.augurit.asip.datacatalog.service;



import com.augurit.asip.datacatalog.util.TreeNode;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/11/2.
 */
public interface DataCatalogService {
    //构建 树
    List<TreeNode> getMetaDataDBTableTree() throws Exception;
    //分页 获取记录
    String listFromTable(String tablename, int page, int rows) throws Exception;

    List<Map> listMetaTableField_Def(String tableID) throws Exception;

    String getTableNameByTableid(String tableId) throws Exception;

    //从Temp表中，获取数据
    List<Map> listChangeData_fromTempTable(String tempTable, String loginName) throws Exception;

    //从Temp表中，获取数据, 分页
    String listChangeDataFromTEMPTable(String tablename, String loginName, int page, int rows) throws Exception;

    List<Map> getOldDataFromBaseTable(String tableName, String keyfield, String keyfieldval) throws Exception;
    // 修改数据
	String listChangeDataFromJSON(String tableName, String loginName, int page,int rows);
	// 导出excel
	List<Map> listChangeData_fromJSON(String tableName, String loginName);
}
