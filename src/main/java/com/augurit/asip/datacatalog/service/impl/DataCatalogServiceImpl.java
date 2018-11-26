package com.augurit.asip.datacatalog.service.impl;


import com.augurit.asip.datacatalog.dao.DataCatalogDao;
import com.augurit.asip.datacatalog.service.DataCatalogService;
import com.augurit.asip.datacatalog.util.TreeNode;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/11/2.
 */
//@Transactional
@Service
public class DataCatalogServiceImpl implements DataCatalogService {
    @Autowired
    private DataCatalogDao dataCatalogDao;

    @Override
    public List<TreeNode> getMetaDataDBTableTree() throws Exception {

        List<Map>  listDb = dataCatalogDao.listMetaData_DB();
        List<Map>  listTable = dataCatalogDao.listMetaData_TABLE();

        List<TreeNode> listTreeNode = new ArrayList<>();
        TreeNode treeNodeDb = null;

        if (listDb!=null && listDb.size()>0) {
            for (Map mapDb: listDb) {
                String idInDb = String.valueOf(mapDb.get("ID"));

                treeNodeDb = new TreeNode();
                treeNodeDb.setId(idInDb);
                treeNodeDb.setText(String.valueOf(mapDb.get("CNAME")));
                    Map<String, String> mapAttr = new HashMap<>();
                    mapAttr.put("NAME", String.valueOf(mapDb.get("NAME")));
                treeNodeDb.setAttributes(mapAttr);
                treeNodeDb.setTflag("db");
                treeNodeDb.setIconCls("icon-folder");

                if (listTable!=null && listTable.size()>0) {
                   // List<TreeNode> listChildren = null;
                    List<TreeNode> listChildren = new ArrayList<>();
                    for (Map mapTable: listTable) {
                         //Table的DATABASEID  =  id of DB
                        if ( idInDb.equals(String.valueOf(mapTable.get("DATABASEID"))) ){
                           // if (listChildren == null) {
                          //      listChildren = new ArrayList<>();

                                TreeNode treeNodeTable = new TreeNode();
                                treeNodeTable.setId(String.valueOf(mapTable.get("ID")));
                                treeNodeTable.setText(String.valueOf(mapTable.get("CNAME")));
                                    Map<String, String> mapAttrTable = new HashMap<>();
                                    mapAttrTable.put("NAME", String.valueOf(mapTable.get("NAME")));
                                    mapAttrTable.put("TABLEID", String.valueOf(mapTable.get("ID")));
                                treeNodeTable.setAttributes(mapAttrTable);
                                treeNodeTable.setTflag("table");

                                listChildren.add(treeNodeTable);
                            //}
                        }
                    }// for (Map mapTable: listTable)

                    treeNodeDb.setChildren(listChildren);

                }//if (listTABLE!=null && listTABLE.size()>0) {

                //DB 里的每条记录 加入 list
                listTreeNode.add(treeNodeDb);

            }//for (Map mapDb: listDb) {

        }// if (listDb!=null && listDb.size()>0) {

        return listTreeNode;
    }

    @Override
    public String listFromTable(String tablename, int page, int rows) throws Exception {
        List<Map>  listTable = dataCatalogDao.listFromTable(tablename, page, rows);

        int iCount =  dataCatalogDao.getTotalLineCount(tablename);;
        String str = "{\"rows\":" + JSONArray.fromObject(listTable).toString() + ",\"total\":"
                     + iCount + "}";
        return str;
    }

    @Override
    public String listChangeDataFromTEMPTable(String tablename, String loginName, int page, int rows) throws Exception {
        List<Map>  listTable = dataCatalogDao.listChangeDataFromTEMPTable(tablename, loginName, page, rows);

        int iCount =  dataCatalogDao.getTotalLineCount(tablename);;
        String str = "{\"rows\":" + JSONArray.fromObject(listTable).toString() + ",\"total\":"
                + iCount + "}";
        return str;
    }

    @Override
    public List<Map> listMetaTableField_Def(String tableID) throws Exception {
        List<Map>  listTable = dataCatalogDao.listMETADATA_FIELD(tableID);
        return listTable;
    }

    @Override
    public String getTableNameByTableid(String tableId) throws Exception {
        return dataCatalogDao.getTableNameByTableid(tableId);
    }

    @Override
    public List<Map> listChangeData_fromTempTable(String tempTableName, String loginName) throws Exception{
        List<Map>  listTable = dataCatalogDao.listChangeData_fromTempTable(tempTableName, loginName);
        return listTable;
    }

    @Override
    public List<Map> getOldDataFromBaseTable(String tableName, String keyfield, String keyfieldval) throws Exception {
        List<Map>  list = dataCatalogDao.getOldDataFromBaseTable(tableName, keyfield, keyfieldval);
        return list;
    }

    /**
     * 修改数据
     */
	@Override
	public String listChangeDataFromJSON(String tblName, String loginName,int page, int rows) {
		List<Map>  listTable = dataCatalogDao.listChangeDataFromJSON(tblName, loginName, page, rows);

        int iCount =  dataCatalogDao.getTotalLineCountFromJSON(tblName);
        String str = "{\"rows\":" + JSONArray.fromObject(listTable).toString() + ",\"total\":"
                + iCount + "}";
        return str;
	}

	/**
	 * 导出excel
	 */
	@Override
	public List<Map> listChangeData_fromJSON(String tableName, String loginName) {
		List<Map>  listTable = dataCatalogDao.listChangeData_fromJSON(tableName, loginName);
        return listTable;
	}

}
