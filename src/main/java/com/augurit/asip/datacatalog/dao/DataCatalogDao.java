package com.augurit.asip.datacatalog.dao;

import com.common.dbcp.DBHelper;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/11/1.
 */

@Repository
public class DataCatalogDao {

    public List<Map> listDataByPage(Object page) throws Exception {
        String sql1 = "select t.* from wrp_rvr_bsin t";
        String sql = "select * from ag_demo";
       // List<Map> list = DBHelper.findPage("spring.datasource",page, sql, null);
        //DBHelper.find("river.datasource", sql, null);

        List<Map> list = DBHelper.find("spring.datasource",sql, null);

         List<Map> list2 = DBHelper.find("spring.datasource", sql1, null);
        //Pager e = PageUtil.initPager(page);
        return list;
    }
    //获取 元数据库 的表记录
    public List<Map> listMetaData_DB() throws Exception {
        String sql = "select * from WA_METADATA_DB ";
        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        
      //  String sql = "select * from WRP_RVR_BSIN";
      //  List<Map> list = DBHelper.find("spring.datasource", sql, null);

        //Pager e = PageUtil.initPager(page);
        return list;
    }
    //获取 表名字 ， 根据 tableId
    public String getTableNameByTableid(String tableId) throws Exception {
        String sql = "select * from WA_METADATA_TABLE where id='" + tableId + "'";
        Map map = DBHelper.findFirst("spring.datasource", sql, null);
        return String.valueOf(map.get("name"));
    }

    //获取 元数据表WA_METADATA_TABLE  的表记录
    public List<Map> listMetaData_TABLE() throws Exception {
        String sql = "select * from WA_METADATA_TABLE ";

        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        //Pager e = PageUtil.initPager(page);
        return list;
    }

    //根据 tableID，  从WA_METADATA_FIELD表 获取记录，如 字段名、 类型等
    public List<Map> listMETADATA_FIELD(String tableID) throws Exception {
        String sql = "select * from WA_METADATA_FIELD where TABLEID='" + tableID +"' order by id";

        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        //Pager e = PageUtil.initPager(page);
        return list;
    }

    // 分页 获取 表的记录
    public List<Map> listFromTable(String tablename, int page, int rows) {
       // String sql = "select * from  " + tablename;
        int start = (page-1) * rows+1;
        int end = page * rows;
        String sql = "select a1.* from (select t.*, rownum rn from " + tablename + " t) a1 where rn between "
                     + start + " and "  + end;

        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        //Pager e = PageUtil.initPager(page);
        return list;
    }

    //获取 表的记录 总行数
    public int getTotalLineCount(String tablename) {
        String sql = "select count(1) totalline from " +  tablename;
        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        //Pager e = PageUtil.initPager(page);
        Map map = list.get(0);
        return  Integer.parseInt(String.valueOf(map.get("totalline"))) ;
    }
    //获取临时表的 某用户的 数据列表 所有数据
    public List<Map> listChangeData_fromTempTable(String tempTableName, String loginName) {
        String sql = "select * from " + tempTableName + " where loginname='" + loginName + "'";
        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        return list;
    }
    //获取临时表的 某用户的 数据列表 分页
    public List<Map> listChangeDataFromTEMPTable(String tablename, String loginName, int page, int rows) {
        int start = (page-1) * rows+1;
        int end = page * rows;
        String sql = "select a1.* from (select t.*, rownum rn from " + tablename + " t  where loginname='"
                + loginName + "') a1 where rn between "
                + start + " and "  + end;

        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        //Pager e = PageUtil.initPager(page);
        return list;
    }

    public List<Map> getOldDataFromBaseTable(String tableName, String keyfield, String keyfieldval) {
        String sql = "select * from " + tableName + " where " + keyfield + "='" + keyfieldval + "'";
        System.out.println(sql);
        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        //Pager e = PageUtil.initPager(page);
        return list;
    }
    /**
     * 查询修改数据总数
     * @param tablename
     * @return
     */
	public int getTotalLineCountFromJSON(String tblName) {
		String sql = "select count(1) totalline from  WA_METADATA_MODIFY where table_name='"+tblName+"' and is_modi='0' ";
        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        //Pager e = PageUtil.initPager(page);
        Map map = list.get(0);
        return  Integer.parseInt(String.valueOf(map.get("totalline"))) ;
	}
	
	/**
	 * 查询修改数据
	 * @param tblName
	 * @param loginName
	 * @param page
	 * @param rows
	 * @return
	 */
	public List<Map> listChangeDataFromJSON(String tblName, String loginName,int page, int rows) {
		List<Map> result=new ArrayList<Map>();
		int start = (page-1) * rows+1;
        int end = page * rows;
        String sql = "select a1.* from (select t.modi_value, rownum rn from WA_METADATA_MODIFY t  where t.table_name='"+tblName+"' and t.is_modi='0') a1 where rn between "
                + start + " and "  + end;

        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        if(list!=null&&list.size()>0){
        	for(int i=0;i<list.size();i++){
        		JSONObject obj=JSONObject.fromObject(list.get(i).get("modi_value"));
            	Map<String,Object> map=new HashMap<String,Object>();
            	Iterator iterator = obj.keys();  
            	while(iterator.hasNext()){  
            		String key = (String) iterator.next();  
            		String val=obj.getString(key);
            		map.put(key.toLowerCase(), val);
            	}
            	result.add(map);
            }
        }
        //Pager e = PageUtil.initPager(page);
        return result;
	}
	
	/**
	 * 导出excel
	 * @param tableName
	 * @param loginName
	 * @return
	 */
	public List<Map> listChangeData_fromJSON(String tableName, String loginName) {
		List<Map> result=new ArrayList<Map>();
		String sql = "select modi_value from WA_METADATA_MODIFY where table_name='"+tableName+"' and is_modi='0'  ";
        List<Map> list = DBHelper.find("spring.datasource", sql, null);
        if(list!=null&&list.size()>0){
        	for(int i=0;i<list.size();i++){
        		JSONObject obj=JSONObject.fromObject(list.get(i).get("modi_value"));
            	Map<String,Object> map=new HashMap<String,Object>();
            	Iterator iterator = obj.keys();  
            	while(iterator.hasNext()){  
            		String key = (String) iterator.next();  
            		String val=obj.getString(key);
            		map.put(key.toLowerCase(), val);
            	}
            	result.add(map);
            }
        }
       
        return result;
	}
}
