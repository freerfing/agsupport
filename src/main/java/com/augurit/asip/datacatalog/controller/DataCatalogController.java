package com.augurit.asip.datacatalog.controller;

import com.augurit.agcloud.frame.json.JsonUtils;
import com.augurit.agcom.common.CasLoginHelpClient;
import com.augurit.asip.datacatalog.service.DataCatalogService;
import com.augurit.asip.datacatalog.util.TreeNode;

import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/11/1.
 */

@RestController
@RequestMapping("/datacatalog")
public class DataCatalogController {
    private static Logger logger = LoggerFactory.getLogger(DataCatalogController.class);

    @Autowired
    private DataCatalogService dataCatalogService;

    @RequestMapping("/index.do")
    public ModelAndView index(HttpServletRequest request, Model model) throws Exception {
        /*
        String loginName = CasLoginHelpClient.getLoginName(request);
        AgUser agUser = this.iAgUser.findUserByName(loginName);
        boolean imp = false;
        if (agUser != null) {
            AgFunc agFunc = this.iAgFunc.findImpFuncByUser(agUser.getId());
            if (agFunc != null) imp = true;
        }
        List<Map> listMap =  dataCatalogDao.listDataByPage(null);

        model.addAttribute("imp", Boolean.valueOf(imp));
        */
        return new ModelAndView("catalog/datacatalog/catalogIndex");
    }

    @RequestMapping("/getChangeData/{tableID}")
    public ModelAndView getChangeData(@PathVariable("tableID") String tableID, Model model) throws Exception {

        model.addAttribute("tableid", tableID);
        return new ModelAndView("catalog/datacatalog/exportchangedata");
    }

    @RequestMapping("/exporttoexcel/{tableID}")
    public void exportToExcel(HttpServletRequest request, HttpServletResponse response, @PathVariable("tableID") String tableID) throws Exception {
        //List<Map> list = dataCatalogService.listMetaTableField_Def(tableID);

        String excelName = "datafile";

        String excelFileName = excelName + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())  + ".xls";
        String loginName = CasLoginHelpClient.getLoginName(request);

        String tableName = dataCatalogService.getTableNameByTableid(tableID);

        List<Map> listFieldDef = dataCatalogService.listMetaTableField_Def(tableID);

        // List<Map> listChangeData_fromTempTable = dataCatalogService.listChangeData_fromTempTable(tableName+"_TEMP", loginName);
        List<Map> listChangeData_fromTempTable = dataCatalogService.listChangeData_fromJSON(tableName, loginName);


        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(excelName);

        //表头
        HSSFRow row = sheet.createRow(0);
        List<String> listTitleName = new ArrayList<>();
        //最后一个不要， '编辑状态'
        for (int j = 0; j < listFieldDef.size()-1; j++) {
            Map map = listFieldDef.get(j);
            //暂存 英文字段 名称
            listTitleName.add(String.valueOf(map.get("name")));
            HSSFCell cell = row.createCell(j);
            cell.setCellValue(String.valueOf(map.get("cname")));
        }

        //表内容
        int iRow = 0;
        for (Map mapT: listChangeData_fromTempTable) {
            iRow++;
            HSSFRow rowT = sheet.createRow(iRow);
            for (int k=0; k<listTitleName.size(); k++) {            	
                HSSFCell cellT = rowT.createCell(k);
                // 判断数据字典
                for(int n=0;n<listFieldDef.size();n++){
                	if(listTitleName.get(k).toLowerCase().equals(listFieldDef.get(n).get("name").toString().toLowerCase())){
                		if(listFieldDef.get(n).get("dd")!=null&&!"".equals(listFieldDef.get(n).get("name"))){
                			String json=listFieldDef.get(n).get("dd").toString();
                			JSONObject obj=JSONObject.fromObject(json);
                			cellT.setCellValue( String.valueOf(obj.get(mapT.get(listTitleName.get(k).toLowerCase()))) );		
                			
                		}else{
                			cellT.setCellValue( String.valueOf(   mapT.get(listTitleName.get(k).toLowerCase())   ) );
                		}
                		break;
                	}
                }
                
            }
        }

        String encoding = "utf-8";    // 获取浏览器类型
        String userAgent = request.getHeader("user-agent");
        if (userAgent.toLowerCase().indexOf("msie") != -1)
        {        encoding = "gbk";    }
        String fileName= excelFileName.substring(0,excelFileName.indexOf(".")) ;
        fileName = new String(fileName.getBytes(encoding), "iso8859-1");

        response.setContentType("application/vnd.ms-excel");
        // response.setContentType("application/x-msdownload");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xls");
        OutputStream ouputStream = response.getOutputStream();

        workbook.write(ouputStream);
        ouputStream.flush();
        ouputStream.close();
        workbook.close();

    }


    @RequestMapping({"/tree"})
    public String tree() throws Exception {
        List<TreeNode> trees = dataCatalogService.getMetaDataDBTableTree();

        return JsonUtils.toJson(trees);
    }


    @RequestMapping("/listfromtable/{tablename}")
    public String listFromTable(@PathVariable("tablename") String tablename, int page, int rows) throws Exception {
        String retStr = dataCatalogService.listFromTable(tablename, page, rows);

        return retStr;
    }

    @RequestMapping("/listChangeDatafromTemptable/{tableId}")
    public String listChangeDatafromTemptable(@PathVariable("tableId") String tableId, HttpServletRequest request, int page, int rows) throws Exception {
        String tableName = dataCatalogService.getTableNameByTableid(tableId) + "_temp";
        String loginName = CasLoginHelpClient.getLoginName(request);
        String tblName = dataCatalogService.getTableNameByTableid(tableId);
        
        // String retStr = dataCatalogService.listChangeDataFromTEMPTable(tableName, loginName, page, rows);
        String retStr=dataCatalogService.listChangeDataFromJSON(tblName, loginName, page, rows);
        return retStr;
    }

    @RequestMapping("/listFieldDefFromTbl/{tableID}")
    public String listFieldDefFromTbl(@PathVariable("tableID") String tableID) throws Exception {
        List<Map> list = dataCatalogService.listMetaTableField_Def(tableID);

        return JsonUtils.toJson(list);
    }

    @RequestMapping("/getOldDataFromBaseTable")
    public String listFieldDefFromTbl(HttpServletRequest request, String keyfield, String tableid, String keyfieldval) throws Exception {
        String tableName = dataCatalogService.getTableNameByTableid(tableid);

        List<Map> list = dataCatalogService.getOldDataFromBaseTable(tableName, keyfield, keyfieldval);
        System.out.println(JsonUtils.toJson(list));
        return JsonUtils.toJson(list);
    }


}
