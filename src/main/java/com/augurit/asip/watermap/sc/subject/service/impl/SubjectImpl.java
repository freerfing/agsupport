package com.augurit.asip.watermap.sc.subject.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.augurit.asip.watermap.domain.subject.*;
import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.augurit.agcloud.frame.ui.pager.PageHelper;
import com.augurit.asip.common.util.MapToLowerCaseConvert;
import com.augurit.asip.watermap.domain.layerEdit.BlackSmellCount;
import com.augurit.asip.watermap.domain.layerEdit.Huanbao;
import com.augurit.asip.watermap.domain.layerEdit.StFactory;
import com.augurit.asip.watermap.domain.layerEdit.StRealtimeDate;
import com.augurit.asip.watermap.domain.layerEdit.StWeather;
import com.augurit.asip.watermap.mapper.SubjectMapper;
import com.augurit.asip.watermap.sc.base.ImportantUtil;
import com.augurit.asip.watermap.sc.subject.dao.SubjectDao;
import com.augurit.asip.watermap.sc.subject.form.TreeNode;
import com.augurit.asip.watermap.sc.subject.service.ISubject;
import com.common.util.Common;
import com.common.util.page.Pager;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;


@Service
public class SubjectImpl implements ISubject {

    private static Logger logger = LoggerFactory.getLogger(SubjectImpl.class);
    @Autowired
    private SubjectMapper subjectMapper;
    @Resource
    private SubjectDao subjectDao;

    /**
     * 分页查询河道信息
     */
    @Override
    public PageInfo<Map> listStRiverRPage(StRiverR stRiverR, Page page) throws Exception {
        PageHelper.startPage(page);
        //List<StRiverR> list = subjectMapper.listStRiverRPage(stRiverR);
        List<Map> list = subjectDao.listStRiverRPage(page);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map>(list);
    }

    /**
     * 查询水库水情数据列表(带分页)
     *
     * @return
     * @throws Exception
     */
    @Override
    public PageInfo<Map<String, Object>> listReservoirPage(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String date = request.getParameter("date");
        paramMap.put("date", date);
        String sdate = request.getParameter("sdate");
        paramMap.put("sdate", sdate);
        String stnm = request.getParameter("stnm");
        paramMap.put("stnm", stnm);
        String xzq = request.getParameter("xzq");
        paramMap.put("xzq", xzq);
        String rsvrtps = request.getParameter("rsvrtpList");//等级
        paramMap.put("rsvrtps", "".equals(rsvrtps)?"99":rsvrtps);


        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listReservoirPage(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 根据id获取水库信息
     */
    @Override
    public Map getReservoirById(Integer id) throws Exception {

        //return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.getReservoirById(id));//mybatis不会查出为null的值
        return subjectDao.getReservoirById(id);
    }

    /**
     * 分页查询雨情列表
     */
    @Override
    public PageInfo<Map<String, Object>> listStPptnRPage(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String stsys = request.getParameter("stsys");
        String stsysArr = request.getParameter("stsysArr");
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        String xzq = request.getParameter("xzq");
        String rainfall = request.getParameter("rainfall");
        List<Map<String, Object>> rainfallList = new ArrayList<Map<String, Object>>();
        if (rainfall != null && !"".equals(rainfall)) {
            String[] rainfallArr = rainfall.split(",");
            for (String rf : rainfallArr) {
                String[] rfArr = rf.split("-");//0-0.1
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("start", Double.valueOf(rfArr[0]));
                map.put("end", Double.valueOf(rfArr[1]));
                rainfallList.add(map);
            }
        }else{
            rainfallList=null;
        }
        List<String> stsysList = new ArrayList<String>();
        if (stsysArr != null && !"".equals(stsysArr) ) {
            if(stsysArr.contains(",")){
                for (String rf : stsysArr.split(",")) {
                    stsysList.add(rf);
                }
            }else{
                stsysList.add(stsysArr);
            }
        } else if (null == stsys||stsys.equals("")) {
            stsysList.add("查不到");
        }
        paramMap.put("stsys", stsys);
        paramMap.put("stnm", stnm);
        paramMap.put("stsysList", stsysList);

        paramMap.put("startTime", startTime);
        paramMap.put("endTime", endTime);

        paramMap.put("xzq", xzq);
        paramMap.put("rainfallList", rainfallList);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listStPptnRPage(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 根据id获取降雨量信息
     */
    @Override
    public Map<String, Object> getStPptnRById(Integer id) throws Exception {
        //Map<String, Object> mapStPptnR = subjectMapper.getStPptnRById(id);
        Map<String, Object> mapStPptnR = subjectDao.getStPptnRById(id);
        //return MapToLowerCaseConvert.mapToLowerCase(mapStPptnR);
        return mapStPptnR;
    }

    /**
     * 查询过去一周的水库水位情况
     */
    @Override
    public List<Map> queryLastweekWaterStage(String sbsj, String zm) throws Exception {
        Map<String, Object> pmap = new HashMap<String, Object>();
        List<String> dateList = new ArrayList<String>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date currDate = sdf.parse(sbsj);
        int period = 7;//过去一周
        for (int i = 0; i < period; i++) {
            Date date = getDateBefore(currDate, i);
            String dateStr = sdf.format(date);
            dateList.add(dateStr);
        }
        pmap.put("zm", zm);
        pmap.put("dateList", dateList);
        //List<Map> resultList = subjectMapper.queryLastweekWaterStage(pmap);
        List<Map> resultList = subjectDao.queryLastweekWaterStage(pmap);
        //return MapToLowerCaseConvert.mapToLowerCase(resultList);
        return resultList;
    }

    /**
     * 获取前几天的日期
     *
     * @param d   日期
     * @param day 前几天
     * @return
     */
    public static Date getDateBefore(Date d, int day) {
        Calendar now = Calendar.getInstance();
        now.setTime(d);
        now.set(Calendar.DATE, now.get(Calendar.DATE) - day);
        return now.getTime();
    }

    /**
     * 查询测站点近五天的降雨情况
     */
    @Override
    public List<Map> queryRecentRainfall(String tm, String stcd) throws Exception {
        Map<String, Object> pmap = new HashMap<String, Object>();
        List<String> dateList = new ArrayList<String>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date currDate = sdf.parse(tm);
        int period = 5;//近5天
        for (int i = 0; i < period; i++) {
            Date date = getDateBefore(currDate, i);
            String dateStr = sdf.format(date);
            dateList.add(dateStr);
        }
        pmap.put("stcd", stcd);
        pmap.put("dateList", dateList);
        //List<Map> resultList = subjectMapper.queryRecentRainfall(pmap);
        List<Map> resultList = subjectDao.queryRecentRainfall(pmap);
        //return MapToLowerCaseConvert.mapToLowerCase(resultList);
        return resultList;
    }

    /**
     * 查询各雨量范围的记录的条数
     */
    @Override
    public Map<String, Object> queryRainfallRecordNum(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        String fw = request.getParameter("fw");
        String ly = request.getParameter("ly");
        paramMap.put("startTime", startTime);
        paramMap.put("endTime", endTime);
        paramMap.put("fw", fw);
        paramMap.put("ly", ly);
        Map<String, Object> resultMap = subjectMapper.queryRainfallRecordNum(paramMap);
        return MapToLowerCaseConvert.mapToLowerCase(resultMap);
    }

    /**
     * 查询一天24小时的雨量
     */
    @Override
    public List<Map<String, Object>> queryRainfallOneDay(String tm, String stcd) throws Exception {
        Map<String, Object> pmap = new HashMap<String, Object>();
        List<Date> hourList = new ArrayList<Date>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date currTime = sdf.parse(tm);
        Calendar now = Calendar.getInstance();
        now.setTime(currTime);
        now.add(Calendar.DATE, -1);
        now.set(Calendar.HOUR_OF_DAY, 8);
        currTime = now.getTime();
        for (int d = 0; d < 24; d++) {
            Date date = getOneDayHour(currTime, d);
            hourList.add(date);
        }
        pmap.put("stcd", stcd);
        pmap.put("hourList", hourList);
        List<Map<String, Object>> list = subjectMapper.queryRainfallOneDay(pmap);
        list = MapToLowerCaseConvert.mapToLowerCase(list);
        //计算累加的时段降雨量
        double sum = 0;
        for (int i = 0; i < list.size(); i++) {
            sum += Double.valueOf(String.valueOf(list.get(i).get("drp")));
            list.get(i).put("drpSum", sum);
        }
        return list;
    }

    /**
     * 查询一个时间段的雨量
     */
    public List<Map<String, Object>> queryRainfallOneTime(String tm_s, String tm_e, String stcd){
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try {
			Map<String, Object> pmap = new HashMap<>();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			if (tm_s != null && tm_s.length() > 0) {
			    Date startTime = sdf.parse(tm_s);
			    pmap.put("startTime", startTime);
			}
			if (tm_e != null && tm_e.length() > 0) {
			    Date endTime = sdf.parse(tm_e);
			    pmap.put("endTime", endTime);
			}
			pmap.put("stcd", stcd);
			list = subjectMapper.queryRainfallOneTime(pmap);
			list = MapToLowerCaseConvert.mapToLowerCase(list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
        return list;
    }

    /**
     * 获取当前日期的时间点（小时）
     *
     * @param d
     * @param hour
     * @return
     */
    public static Date getOneDayHour(Date d, int hour) {
        Calendar now = Calendar.getInstance();
        now.setTime(d);
        now.set(Calendar.HOUR_OF_DAY, now.get(Calendar.HOUR_OF_DAY) + hour);
        return now.getTime();
    }

    /**
     * 查看时段水库水位情况
     */
    @Override
    public List<Map<String, Object>> queryReservoirPeriod(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.queryReservoirPeriod(paramMap));

    }

    /**
     * 分页查询设施表
     */
    @Override
    public PageInfo<Map<String, Object>> queryPsStbprpPage(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String sttp = request.getParameter("sttp");
        String xzq = request.getParameter("xzq");
        String sdate = request.getParameter("sdate");
        paramMap.put("sdate", sdate);
        String date = request.getParameter("date");
        paramMap.put("date", date);
        paramMap.put("stnm", stnm);
        paramMap.put("sttp", sttp);
        paramMap.put("xzq", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.queryPsStbprpPage(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /*
     * 查询泵站实时闸前闸后水位
     */
    @Override
    public List<Map<String, Object>> queryPumpDetail(String stcd)
            throws Exception {
        // TODO Auto-generated method stub
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.queryPumpDetail(stcd));
    }



    /**
     * 分页查询水闸设施表
     *
     * @param request
     * @param page
     * @return
     * @throws Exception
     */
    @Override
    public PageInfo<Map<String, Object>> queryPsStbprpWasPage(
            HttpServletRequest request, Page<Map<String, Object>> page)
            throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String xzq = request.getParameter("xzq");
        String sdate = request.getParameter("sdate");
        paramMap.put("sdate", sdate);

        String date = request.getParameter("date");
        paramMap.put("date", date);

        paramMap.put("stnm", stnm);
        paramMap.put("xzq", xzq);


        String stsyss = request.getParameter("stsysList");//
        List stsysList = new ArrayList();
        if (null != stsyss && stsyss.contains(",")) {//包含，都是全部的
            String[] arr = stsyss.split(",");
            if (arr.length != 3) {
                for (String i : arr) {
                    stsysList.add(i);
                }
            }
        } else if (null == stsyss||stsyss.equals("")) {
            stsysList.add("查不到");
        } else {
            stsysList.add(stsyss);
        }
        paramMap.put("stsysList", stsysList);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.queryPsStbprpWasPage(paramMap);
        logger.debug("成功执行分页查询\r"+list.toString());
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 查询泵站实时闸前闸后水位
     */
    @Override
    public List<Map<String, Object>> queryWasDetail(String stcd)
            throws Exception {
        // TODO Auto-generated method stub
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.queryWasDetail(stcd));
    }

    /**
     * 查询泵站历史闸前闸后水位
     */
    @Override
    public List<Map<String, Object>> queryWasHist(HttpServletRequest request)
            throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.queryWasHist(paramMap));
    }

    @Override
    public PageInfo<Map<String, Object>> waterremotedetect(
            HttpServletRequest request, Page<Map<String, Object>> page)
            throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String sttp = request.getParameter("czmc");
        String xzq = request.getParameter("xzq");
        paramMap.put("sttp", sttp);
        paramMap.put("addvcd", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.querywaterremotedetectDetail(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    @Override
    public PageInfo<Map<String, Object>> smartwaternet(
            HttpServletRequest request, Page<Map<String, Object>> page) {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String sttp = request.getParameter("czmc");
        String xzq = request.getParameter("xzq");
        paramMap.put("sttp", sttp);
        paramMap.put("addvcd", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.smartwaternet(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 分页查询排水管网信息列表
     */
    @Override
    public PageInfo<Map<String, Object>> listStConduitchB(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String xzq = request.getParameter("xzq");
        String date = request.getParameter("date");
        paramMap.put("date", date);
        String sdate = request.getParameter("sdate");
        paramMap.put("sdate", sdate);
        paramMap.put("stnm", stnm);
        paramMap.put("xzq", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listStConduitchB(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 查询一天管网的 流速 和 水位
     */
    @Override
    public List<Map<String, Object>> queryDrainageDetailDay(String stcd, String tm) throws Exception {
        Map<String, Object> pmap = new HashMap<String, Object>();
        List<Date> hourList = new ArrayList<Date>();
        pmap.put("stcd", stcd);
        pmap.put("date", tm);
        List<Map<String, Object>> list = subjectMapper.queryDrainageDetailDay(pmap);
        list = MapToLowerCaseConvert.mapToLowerCase(list);
        return list;
    }

    /**
     * 获取排水管网历史数据 maxt
     */
    @Override
    public List<Map<String, Object>> getDrainageHis(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.getDrainageHis(paramMap));

    }

    /**
     * 分页查询积水点列表
     */
    @Override
    public PageInfo<Map<String, Object>> getFloodPointList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String endDateStr = request.getParameter("endTime");

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (endDateStr != null && endDateStr.length() > 0) {
            Date endDate = sdf.parse(endDateStr);
            paramMap.put("endDate", endDate);
            Calendar c = Calendar.getInstance();
            c.setTime(endDate);
            int day = c.get(Calendar.DATE);
            c.set(Calendar.DATE, day - 1);
            Date startDate = c.getTime();
            paramMap.put("startDate", startDate);
        }

        String xzq = request.getParameter("xzq");
        String tj = request.getParameter("tj");
        paramMap.put("stnm", stnm);
        paramMap.put("xzq", xzq);
        paramMap.put("tjStr", tj);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.getFloodPointList(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 获取积水点历史数据
     */
    @Override
    public List<Map<String, Object>> getFloodPointHis(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.getFloodPointHis(paramMap));

    }

    /**
     * 分页获取墒情站列表
     */
    @Override
    public PageInfo<Map<String, Object>> getMoistureList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String xzq = request.getParameter("xzq");
        paramMap.put("stnm", stnm);
        paramMap.put("addvcd", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.getMoistureList(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 分页查询排水渠列表
     */
    @Override
    public PageInfo<Map<String, Object>> getdrainageCanalList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String xzq = request.getParameter("xzq");
        paramMap.put("stnm", stnm);
        paramMap.put("addvcd", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.getdrainageCanalList(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 获取排水渠历史数据
     */
    @Override
    public List<Map<String, Object>> getdrainageCanalHis(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.getdrainageCanalHis(paramMap));

    }

    /**
     * 分页查询河道列表
     */
    @Override
    public PageInfo<Map<String, Object>> getRiverList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        paramMap.put("stnm", stnm);
        String xzq = request.getParameter("xzq");
        paramMap.put("xzq", xzq);
        String date = request.getParameter("date");
        paramMap.put("date", date);
        String sdate = request.getParameter("sdate");
        paramMap.put("sdate", sdate);
        String stsyss = request.getParameter("stsysList");//
        List stsysList = new ArrayList();
        if (null != stsyss && stsyss.contains(",")) {//包含，都是全部的
            String[] arr = stsyss.split(",");
            if (arr.length != 3) {
                for (String i : arr) {
                    stsysList.add(i);
                }
            }
        } else if (null == stsyss||stsyss.equals("")) {
            stsysList.add("查不到");
        } else {
            stsysList.add(stsyss);
        }
        paramMap.put("stsysList", stsysList);
        String states = request.getParameter("stateNormalList");//状态
        String state = "";
        if (null != states && states.contains(",")) {//包含，都是全部的
            state = null;
        } else {
            state = states;
        }
        paramMap.put("state", state);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.getRiverList(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 获取河流历史数据
     */
    @Override
    public List<Map<String, Object>> getRiverHis(HttpServletRequest request) throws Exception {
        Map<String, Object> pmap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        pmap.put("stcd", stcd);
        pmap.put("fromDate", fromDate);
        pmap.put("toDate", toDate);
        List<Map<String, Object>> list = subjectMapper.getRiverHis(pmap);
        list = MapToLowerCaseConvert.mapToLowerCase(list);
        return list;
    }

    /**
     * 分页查询拦河坝列表
     */
    @Override
    public PageInfo<Map<String, Object>> getWeirList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        paramMap.put("stnm", stnm);
        String xzq = request.getParameter("xzq");
        paramMap.put("xzq", xzq);
        String date = request.getParameter("date");
        paramMap.put("date", date);
        String sdate = request.getParameter("sdate");
        paramMap.put("sdate", sdate);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.getWeirList(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 分页查询污水处理厂列表--实时
     */
    @Override
    public PageInfo<Map<String, Object>> listWasteWaterPlant(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String date = request.getParameter("date");
        String sdate = request.getParameter("sdate");
        String xzq = request.getParameter("xzq");
        String typeStr=request.getParameter("type");//进出口类型

        List typeList = new ArrayList();
        if (null != typeStr && typeStr.contains(",")) {
            String[] arr = typeStr.split(",");
            if (arr.length != 2) {
                for (String i : arr) {
                    typeList.add(i);
                }
            }
        } else if (null != typeStr&&!"".equals(typeStr)) {
            typeList.add(typeStr);
        } else {
            typeList.add("找不到");
        }

        paramMap.put("typeList", typeList);
        paramMap.put("stnm", stnm);
        paramMap.put("sdate", sdate);
        paramMap.put("date", date);
        paramMap.put("xzq", xzq);

        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listWasteWaterPlant(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }
    /**
     * 分页查询污水处理厂列表--日均
     */
    @Override
    public PageInfo<Map<String, Object>> listWasteWaterPlantDay(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String date = request.getParameter("date");
        String sdate = request.getParameter("sdate");
        String xzq = request.getParameter("xzq");
        String typeStr=request.getParameter("type");//进出口类型

        List typeList = new ArrayList();
        if (null != typeStr && typeStr.contains(",")) {
            String[] arr = typeStr.split(",");
            if (arr.length != 2) {
                for (String i : arr) {
                    typeList.add(i);
                }
            }
        } else if (null != typeStr&&!"".equals(typeStr)) {
            typeList.add(typeStr);
        } else {
            typeList.add("找不到");
        }

        paramMap.put("typeList", typeList);
        paramMap.put("stnm", stnm);
        paramMap.put("date", date);
        paramMap.put("sdate",sdate);
        paramMap.put("xzq", xzq);

        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listWasteWaterPlantDay(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }
    /**
     * 分页查询黑臭水体列表
     */
    @Override
    public PageInfo<Map<String, Object>> getBlackSmellyWaterList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        paramMap.put("stnm", stnm);

        String xzq = request.getParameter("xzq");
        paramMap.put("xzq", xzq);
        String blackLevelList=request.getParameter("blackLevel");//进出口类型
        paramMap.put("blackLevelList","".equals(blackLevelList)?"99":blackLevelList);

        String date = request.getParameter("date");
        paramMap.put("date", date);
        String sdate = request.getParameter("sdate");
        paramMap.put("sdate", sdate);

        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.getBlackSmellyWaterList(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    /**
     * 查询拦河坝历史闸前闸后水位
     */
    @Override
    public List<Map<String, Object>> queryWeirHist(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.queryWeirHist(paramMap));
    }

    /**
     * 查看泵站站上站下历史水位
     */
    @Override
    public List<Map<String, Object>> queryPumpHist(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.queryPumpHist(paramMap));
    }

    /**
     * 查看黑臭水体历史监测项
     */
    @Override
    public List<Map<String, Object>> queryItemHis(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        String field = request.getParameter("field");
        String tableName = request.getParameter("tableName");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        paramMap.put("field", field);
        paramMap.put("tableName", tableName);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.queryItemHis(paramMap));
    }

    /**
     * 查看黑臭水体、污水处理厂 历史监测项  maxt
     */
    @Override
    public List<Map<String, Object>> queryAllItemHis(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.queryAllItemHis(paramMap));
    }
    /**
     * 查看 污水处理厂 历史监测项  日均值
     * @param request
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> queryAllItemHisDay(HttpServletRequest request) throws Exception {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        paramMap.put("stcd", stcd);
        paramMap.put("fromDate", fromDate);
        paramMap.put("toDate", toDate);
        return MapToLowerCaseConvert.mapToLowerCase(subjectMapper.queryAllItemHisDay(paramMap));
    }    /**
     * 查询河涌
     */
    @Override
    public Pager listRiversPage(SlgRv slgRv, Pager pager) throws Exception {

        List<Map> list = subjectDao.listRiversPage(slgRv, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    /**
     * 查询35条黑臭河涌
     */
    @Override
    public Pager listRiversPage_35(SlgRv slgRv, Pager pager) throws Exception {
        List<Map> list = subjectDao.listRiversPage_35(slgRv, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");
        return new Pager(list, pager);
    }
    /**
     * 查询152条黑臭河涌
     */
    @Override
    public Pager listRiversPage_152(SlgRv slgRv, Pager pager) throws Exception {
        List<Map> list = subjectDao.listRiversPage_152(slgRv, pager);
        logger.debug("成功执行分页查询");
        return new Pager(list, pager);
    }
    /**
     * 查询187条黑臭河涌
     */
    @Override
    public Pager listRiversPage_187(SlgRv slgRv, Pager pager) throws Exception {
        List<Map> list = subjectDao.listRiversPage_187(slgRv, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");
        return new Pager(list, pager);
    }

    @Override
    public PageInfo<Map<String, Object>> getRealtimeWaterList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String xzq = request.getParameter("xzq");
        String date = request.getParameter("date");
        String sdate = request.getParameter("sdate");
        paramMap.put("sdate", sdate);
        paramMap.put("date", date);
        paramMap.put("stnm", stnm);
        paramMap.put("xzq", xzq);

        String wptns = request.getParameter("wptnList");//涨平落
        List wptnList = new ArrayList();
        if (null != wptns && wptns.contains(",")) {
            String[] arr = wptns.split(",");
            if (arr.length != 3) {
                for (String i : arr) {
                    wptnList.add(i);
                }
            }else{
                wptnList=null;
            }
        } else {
            wptnList.add(wptns);
        }
        paramMap.put("wptnList", wptnList);
        String sttps = request.getParameter("sttpList");//站类
        String sttp = "";
        if (null != sttps && sttps.contains(",")) {//包含，都是全部的
            sttp = null;
        } else {
            sttp = sttps;
        }
        paramMap.put("sttp", sttp);
        String states = request.getParameter("stateNormalList");//状态
        String state = "";

        if (null != states && states.contains(",")) {//包含，都是全部的
            state = null;
        } else {
            state = states;
        }
        paramMap.put("state", state);
        String stsyss = request.getParameter("stsysList");//
        String stsys = "";
        if (null != stsyss && stsyss.contains(",")) {//包含，都是全部的
            stsys = null;
        } else {
            stsys = stsyss;
        }
        paramMap.put("stsys", stsys);

        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.getRealtimeWaterList(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    @Override
    public List<Map<String, Object>> getRealtimeWaterHis(HttpServletRequest request) throws Exception {
        Map<String, Object> pmap = new HashMap<String, Object>();
        String stcd = request.getParameter("stcd");
        String fromDate = request.getParameter("fromDate");
        String toDate = request.getParameter("toDate");
        pmap.put("stcd", stcd);
        pmap.put("fromDate", fromDate);
        pmap.put("toDate", toDate);
        List<Map<String, Object>> list = subjectMapper.getRealtimeWaterHis(pmap);
        list = MapToLowerCaseConvert.mapToLowerCase(list);
        return list;
    }

    @Override
    public PageInfo<Map<String, Object>> getHuanbaoList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();

        String stnm = request.getParameter("stnm");
        String date= request.getParameter("date");//日期
        String xzq = request.getParameter("xzq");//行政区
        String szlb= request.getParameter("szlb");//水质类别


        paramMap.put("stnm", stnm);
        paramMap.put("date", date);
        paramMap.put("xzq", xzq);
        paramMap.put("szlb", szlb);

        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.getHuanbaoList(paramMap);
        logger.debug("成功执行分页查询");
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    @Override
    public List<Map<String, Object>> getHuanbao6MonthHis(HttpServletRequest request) throws Exception {
        Map<String, Object> pmap = new HashMap<String, Object>();
        String hcmc = request.getParameter("hcmc");
        pmap.put("hcmc", hcmc);
        String date = request.getParameter("date");
        pmap.put("date", date);
        List<Map<String, Object>> list = subjectMapper.getHuanbao6MonthHis(pmap);
        list = MapToLowerCaseConvert.mapToLowerCase(list);
        return list;
    }

    @Override
    public Pager listGatesPage(WrpBluBsinGate wrpBluBsinGate, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listGatesPage(wrpBluBsinGate, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listPumpsPage(WrpIdsBsinPump wrpIdsBsinPump, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listPumpsPage(wrpIdsBsinPump, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listLakesPage(SlgLake slgLake, Pager pager) throws Exception {

        List<Map> list = subjectDao.listLakesPage(slgLake, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listDikesPage(WrpLevBsinDike wrpLevBsinDike, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listDikesPage(wrpLevBsinDike, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listRessPage(WrpRsrBsinRes wrpRsrBsinRes, Pager pager) throws Exception {

        List<Map> list = subjectDao.listRessPage(wrpRsrBsinRes, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public void updateRiverData(WrpRvrBsin rvrBsin) throws Exception {
        try {
            if (!Common.isCheckNull(rvrBsin))
                subjectDao.updateRiverData(rvrBsin);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateLakeData(WrpLakBsin lakBsin) throws Exception {
        try {
            if (!Common.isCheckNull(lakBsin))
                subjectDao.updateLakeData(lakBsin);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateRessData(WrpRsrBsin rsrBsin) throws Exception {
        try {
            if (!Common.isCheckNull(rsrBsin))
                subjectDao.updateRessData(rsrBsin);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateGatesData(WrpSluBsin sluBsin) throws Exception {
        try {
            if (!Common.isCheckNull(sluBsin))
                subjectDao.updateGatesData(sluBsin);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updatePumpsData(WrpIdsBsin idsBsin) throws Exception {
        try {
            if (!Common.isCheckNull(idsBsin))
                subjectDao.updatePumpsData(idsBsin);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<WrpSluBsin> getGatesById(String Id) throws Exception {
        List<WrpSluBsin> list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getGatesById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List<WrpIdsBsin> getPumpsById(String Id) throws Exception {
        List<WrpIdsBsin> list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getPumpsById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public void updateWaterQuality(WqWqsinfB wqWqsinfB) throws Exception {
        try {
            if (!Common.isCheckNull(wqWqsinfB))
                subjectDao.updateWaterQuality(wqWqsinfB);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public List<WqWqsinfB> getWaterQualityById(String Id, String type) {
        List<WqWqsinfB> list = null;
        try {
            if (Common.isCheckNull(Id) || Common.isCheckNull(type)) return null;
            list = subjectDao.getWaterQualityById(Id, type);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List<StStbprpB> getStationByStcdAndSttp(String stcd, String sttp) throws Exception {
        List<StStbprpB> list = null;
        try {
            if (Common.isCheckNull(stcd)) return null;
            list = subjectDao.getStationByStcdAndSttp(stcd, sttp);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public void updateStation(StStbprpB StStbprpB) {
        try {
            if (!Common.isCheckNull(StStbprpB))
                subjectDao.updateStation(StStbprpB);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<WrpLevBsin> getDikeById(String Id) {
        List<WrpLevBsin> list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getDikeById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public void updateDike(WrpLevBsin wrpLevBsin) throws Exception {
        try {
            if (!Common.isCheckNull(wrpLevBsin))
                subjectDao.updateDike(wrpLevBsin);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Pager listWqsinfBPage(WqWqsinfB wqWqsinfB, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listWqsinfBPage(wqWqsinfB, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);

    }

    @Override
    public Pager listStStbprpBPage(StStbprpB stStbprpB, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listStStbprpBPage(stStbprpB, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);

    }

    @Override
    public List<StRealtimeDate> findAllList(StRealtimeDate stRealtimeDate) {
        // TODO Auto-generated method stub
        return subjectMapper.findAllList(stRealtimeDate);
    }

    /**
     * 河涌水质的历史数据   总条数
     * bhs
     * @param huanbao
     * @return
     */
    @Override
    public List<Huanbao> findAllSZList(Huanbao huanbao) {
        return subjectMapper.findAllSZList(huanbao);
    }

    /**
     * 监测点的数据根据选择时间查询所有当天的数据 水质河涌
     * BHS
     * @return
     */
    @Override
    public List<Huanbao> findAllHistListByPageChartSSZ(Huanbao huanbao) {
        Map map = new HashMap<>();
        map.put("huanbao", huanbao);
        return subjectMapper.findAllHistListByPageChartSSZ(map);
    }

    @Override
    public List<StRealtimeDate> findHistList(StRealtimeDate stRealtimeDate) {
        return subjectMapper.findHistList(stRealtimeDate);
    }

    @Override
    public String getInputFull(StRealtimeDate stRealtimeDate) {
        return getZuiGaoTreeJson(stRealtimeDate);
    }

    @Override
    public String getInputFullSZ(Huanbao huanbao) {
        return getZuiGaoTreeJsonSZ(huanbao);
    }

    /**
     * @author bhs 污水处理厂
     * 拼接json树
     */
    @Override
    public String getInputFullWSCLC(StFactory stFactory) {
        return getZuiGaoTreeJsonWSCLC(stFactory);
    }



    public String getZuiGaoTreeJson(StRealtimeDate stRealtimeDate) {
        String treeJson = "[" + huoQuTree(stRealtimeDate) + "]";
        return treeJson.toString();
    }
    public String getZuiGaoTreeJsonSZ(Huanbao huanbao) {
        String treeJson = "[" + huoQuSZTree(huanbao) + "]";
        return treeJson.toString();
    }
    public String getZuiGaoTreeJsonWSCLC(StFactory stFactory) {
        String treeJson = "[" + huoQuWSCLCTree(stFactory) + "]";
        return treeJson.toString();
    }


    public String huoQuWSCLCTree(StFactory stFactory) {
       // List<StFactory> list = subjectMapper.huoQuWSCLCXZTree(stFactory);//先查询出所有的行政区域
        List<String> list = Arrays.asList("海珠区","天河区","黄埔区","白云区","荔湾区","越秀区","番禺区","花都区","南沙区","增城区","从化区");
        String strJson ="";
        String addvcd = "";
        for (int i = 0; i < list.size(); i++) {//取出分类查询出相关的区域有的水库
            String children ="";
            addvcd = list.get(i);
            StFactory stfactoryDate = new StFactory();
            stfactoryDate.setAddvcd(addvcd);
            stfactoryDate.setSttp(stFactory.getSttp());
            List<StFactory> listChildren = subjectMapper.findChildWSCLC(stfactoryDate);
            if(listChildren.size()>0){
            	children ="[";
            }
            for (int j = 0; j < listChildren.size(); j++) {
                String stnm = listChildren.get(j).getStnm();
                children = children+"{ \"id\":\"" + stnm + "\", \"pid\":\"" + addvcd + "\", \"text\":\"" + stnm + "\" },";
            }
            if(listChildren.size()>0){
            	children=children.substring(0,children.length()-1)+"]";
            }
            if(listChildren.size()>0){
            	strJson = strJson+"{ \"id\":\"" + addvcd + "\", \"state\": \"closed\",\"pid\":-1, \"text\":\"" + addvcd + "\",\"children\":" + children + "},";
            }else{
            	strJson =strJson+"{ \"id\":\"" + addvcd + "\",\"isParent\": true,\"pid\":-1,\"iconCls\": \"icon-folder\", \"text\":\"" + addvcd + "\"},";
            }
        }
        strJson = strJson.substring(0,strJson.length()-1);
        return "["+strJson+"]";
    }


    //查询出行政区域 再通过行政区域查询
    public String huoQuSZTree(Huanbao huanbao) {
        //List<StRealtimeDate> list = subjectMapper.getAddvcd(timeDate);
    	List<String> list = Arrays.asList("天河区","荔湾区","越秀区","黄埔区","白云区","番禺区","花都区","南沙区","增城区","从化区","海珠区");
        StringBuffer strJson = new StringBuffer();
        strJson.append("[");
        String ssxzq = "";
        for (int i = 0; i < list.size(); i++) {//取出分类查询出相关的区域有的水库
            StringBuffer children = new StringBuffer();
            children.append("[");
            ssxzq = list.get(i);
            Huanbao huanbaoDate = new Huanbao();
            huanbaoDate.setSsxzq(ssxzq);
            List<Huanbao> listChildren = subjectMapper.findChildSZ(huanbaoDate);
            if (listChildren.size() == 0) {
                children.append("{ \"id\":\"" + ssxzq + "\", \"pid\":\"" + ssxzq + "\", \"text\":\"" + ssxzq + "\" }");
            }
            if (listChildren.size() == 1) {
                for (int j = 0; j < listChildren.size(); j++) {
                    String hcmc = listChildren.get(j).getHcmc();
                    children.append("{ \"id\":\"" + hcmc + "\", \"pid\":\"" + ssxzq + "\", \"text\":\"" + hcmc + "\" }");
                }
            }
            if (listChildren.size() > 1) {
                for (int j = 0; j < listChildren.size(); j++) {
                    String hcmc = listChildren.get(j).getHcmc();
                    if (j == 0) {
                        children.append("{ \"id\":\"" + hcmc + "\", \"pid\":\"" + ssxzq + "\", \"text\":\"" + hcmc + "\" }");
                    } else {
                        children.append(",{ \"id\":\"" + hcmc + "\", \"pid\":\"" + ssxzq + "\", \"text\":\"" + hcmc + "\" }");
                    }
                }
            }
            children.append("]");
            if (i == 0) {
                strJson.append("{ \"id\":\"" + ssxzq + "\", \"state\": \"closed\",\"pid\":-1, \"text\":\"" + ssxzq + "\",\"children\":" + children + "}");
            } else {
                strJson.append(",{ \"id\":\"" + ssxzq + "\", \"state\": \"closed\",\"pid\":-1, \"text\":\"" + ssxzq + "\",\"children\":" + children + "}");
            }
        }
        strJson.append("]");
        return strJson.toString();
    }
    //查询出行政区域 再通过行政区域查询   相关区域的水库
    public String huoQuTree(StRealtimeDate timeDate) {
        List<String> list = Arrays.asList("天河区","荔湾区","越秀区","黄埔区","白云区","番禺区","花都区","南沙区","增城区","从化区","海珠区");
        String strJson ="";
        String addvcd = "";
        for (int i = 0; i < list.size(); i++) {//取出分类查询出相关的区域有的水库
        	addvcd = list.get(i);
        	String children ="";
            StRealtimeDate stRealtimeDate = new StRealtimeDate();
            stRealtimeDate.setAddvcd(addvcd);
            stRealtimeDate.setHistTbleName(timeDate.getHistTbleName());
            List<StRealtimeDate> listChildren = subjectMapper.findChild(stRealtimeDate);
            if(listChildren.size()>0){
            	children ="[";
            }
            for (int j = 0; j < listChildren.size(); j++) {
                String stnm = listChildren.get(j).getStnm();
                String stcd = listChildren.get(j).getStcd();
                children = children+"{ \"id\":\"" + stnm + "\", \"pid\":\"" + addvcd + "\", \"text\":\"" + stnm+"&&" +stcd+ "\" },";
            }
            if(listChildren.size()>0){
            	children=children.substring(0,children.length()-1)+"]";
            }
            if(listChildren.size()>0){
            	strJson = strJson+"{ \"id\":\"" + addvcd + "\", \"state\": \"closed\",\"pid\":-1, \"text\":\"" + addvcd + "\",\"children\":" + children + "},";
            }else{
            	strJson =strJson+"{ \"id\":\"" + addvcd + "\",\"isParent\": true,\"pid\":-1,\"iconCls\": \"icon-folder\", \"text\":\"" + addvcd + "\"},";
            }
        }
        strJson = strJson.substring(0,strJson.length()-1);
        return "["+strJson+"]";
    }


    @Override
    public int getDePlusCount(StRealtimeDate stRealtimeDate) {
        // TODO Auto-generated method stub
        return subjectMapper.getDePlusCount(stRealtimeDate);
    }

    @Override
    public Pager listPsCombZyPage(PsCombZy psCombZy, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listPsCombZyPage(psCombZy, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listPsDraingateZyPage(PsDraingateZy psDraingateZy, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listPsDraingateZyPage(psDraingateZy, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listPsPipeZyPage(PsPipeZy psPipeZy, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listPsPipeZyPage(psPipeZy, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listPsPumpingStationZyPage(
            PsPumpingStationZy psPumpingStationZy, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listPsPumpingStationZyPage(psPumpingStationZy, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listPsPmZyPage(PsPmZy psPmZy, Pager pager) throws Exception {

        List<Map> list = subjectDao.listPsPmZyPage(psPmZy, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listPsSewagefarmZyPage(PsSewagefarmZy psSewagefarmZy,
                                        Pager pager) throws Exception {

        List<Map> list = subjectDao.listPsSewagefarmZyPage(psSewagefarmZy, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listPsSpoutZyPage(PsSpoutZy psSpoutZy, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listPsSpoutZyPage(psSpoutZy, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }

    @Override
    public Pager listPsWellZyPage(PsWellZy psWellZy, Pager pager)
            throws Exception {

        List<Map> list = subjectDao.listPsWellZyPage(psWellZy, pager);
        System.out.println(list);
        logger.debug("成功执行分页查询");

        return new Pager(list, pager);
    }


    @Override
    public int getHechongCount() {
        // TODO Auto-generated method stub
        return subjectMapper.getHechongCount();
    }

    @Override
    public List<Huanbao> findHechongList() {
        // TODO Auto-generated method stub
        return subjectMapper.findHechongList();
    }


    @Override
    public int getWeatherCount(String data) {
        // TODO Auto-generated method stub
        return subjectMapper.getWeatherCount(data);
    }

    @Override
    public String getWeather(String data) {
        // TODO Auto-generated method stub
        return subjectMapper.getWeather(data);
    }

    @Override
    public void saveStWeather(StWeather stWeather) {
        subjectMapper.saveStWeather(stWeather);
    }

    @Override
    public List<StFactory> findStFactoryList(StFactory stFactory) {
        // TODO Auto-generated method stub
        return subjectMapper.findStFactoryList(stFactory);
    }

    @Override
    public int getStFactoryCount() {
        // TODO Auto-generated method stub
        return subjectMapper.getStFactoryCount();
    }

    @Override
    public List<StRealtimeDate> findAllListByPage(StRealtimeDate stRealtimeDate, int page, int rows) {
        Map map = new HashMap<>();
        map.put("page", page);
        map.put("rows", rows);
        map.put("stRealtimeDate", stRealtimeDate);
        return subjectMapper.findAllListByPage(map);
    }

    @Override
    public List<StRealtimeDate> findAllHistListByPage(StRealtimeDate stRealtimeDate, int page, int rows) {
        Map map = new HashMap<>();
        map.put("page", page);
        map.put("rows", rows);
        map.put("stRealtimeDate", stRealtimeDate);
        return subjectMapper.findAllHistListByPage(map);
    }

    @Override
    public List<Huanbao> findAllListSZByPage(Huanbao huanbao, int page, int rows) {
        Map map = new HashMap<>();
        map.put("page", page);
        map.put("rows", rows);
        map.put("huanbao", huanbao);
        return subjectMapper.findAllListSZByPage(map);
    }

    @Override
    public List<StFactory> findAllListWSCLCByPage(StFactory stFactory, int page, int rows) {
        Map map = new HashMap<>();
        map.put("page", page);
        map.put("rows", rows);
        map.put("stFactory", stFactory);
        return subjectMapper.findAllListWSCLCByPage(map);
    }

    /**
     * 污水处理厂的历史数据   总条数
     * bhs
     * @param stFactory
     * @return
     */
    @Override
    public List<StFactory> findAllWSCLCList(StFactory stFactory) {
        return subjectMapper.findAllWSCLCList(stFactory);
    }

    @Override
    public List<StFactory> findAllHistListByPageChartSWSCLC(StFactory stFactory) {
        Map map = new HashMap<>();
        map.put("stFactory", stFactory);
        return subjectMapper.findAllHistListByPageChartSWSCLC(map);
    }

    /**
     * echarts图表信息
     * @param stRealtimeDate
     * @return
     */
    @Override
    public List<StRealtimeDate> findAllHistListByPageChartS(StRealtimeDate stRealtimeDate) {
        Map map = new HashMap<>();
        map.put("stRealtimeDate", stRealtimeDate);
        return subjectMapper.findAllHistListByPageChartS(map);
    }

    /**
     * 环保局河涌水质,获取每个测站最新的数据用来展示
     *bhs 弹出层的分页用的 @author bhs
     * @return
     */
    @Override
    public List<Huanbao> findListHechongPage(Huanbao huanbao, int page, int rows) {
        Map map = new HashMap<>();
        map.put("page", page);
        map.put("rows", rows);
        map.put("huanbao", huanbao);
        return subjectMapper.findListHechongPage(map);
    }

    @Override
    public List<StRealtimeDate> getStPptnList() {
        return subjectMapper.getStPptnList();
    }

    @Override
    public List<StRealtimeDate> listYLByTime(String startTime,String endTime) {
        return subjectMapper.listYLByTime(startTime,endTime);
    }

    @Override
    public List<StRealtimeDate> getStRsvrList(StRealtimeDate stRealtimeDate) {
        // TODO Auto-generated method stub
    	stRealtimeDate.setStcd(ImportantUtil.importantReservoir);
    	System.out.println(stRealtimeDate.getStcd());
        return subjectMapper.getStRsvrList(stRealtimeDate);
    }

    @Override
    public List<StRealtimeDate> getStRiverList() {
        // TODO Auto-generated method stub
    	StRealtimeDate stRealtimeDate = new StRealtimeDate();
    	stRealtimeDate.setStcd(ImportantUtil.importantRiver);
    	System.out.println(stRealtimeDate.getStcd());
        return subjectMapper.getStRiverList(stRealtimeDate);
    }

    @Override
    public List getCombById(String Id) throws Exception {
        List list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getCombById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List getDraingateById(String Id) throws Exception {
        List list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getDraingateById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List getPipeById(String Id) throws Exception {
        List list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getPipeById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List getPmById(String Id) throws Exception {
        List list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getPmById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }


    @Override
    public List getPumpingStationById(String Id) throws Exception {
        List list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getPumpingStationById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }


    @Override
    public List getSewagefarmById(String Id) throws Exception {
        List list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getSewagefarmById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List getSpoutById(String Id) throws Exception {
        List list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getSpoutById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List getWellById(String Id) throws Exception {
        List list = null;
        try {
            if (Common.isCheckNull(Id)) return null;
            list = subjectDao.getWellById(Id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    /**
     * 污水处理厂的数据用来展示
     *bhs 弹出层的分页用的 @author bhs
     * @return
     */
    @Override
    public List<StFactory> findStFactoryRealPage(StFactory stFactory, int page, int rows){
        Map map = new HashMap<>();
        map.put("page", page);
        map.put("rows", rows);
        map.put("stFactory", stFactory);
        // return subjectMapper.findStFactoryRealPage(map);
        return subjectMapper.findStFactoryRealPageNew(map);
    }

    /**
     * 污水处理厂的实时数据   总条数
     * bhs
     * @param stFactory
     * @return
     */
    @Override
    public List<StFactory> findStFactoryRealList(StFactory stFactory) {
        return subjectMapper.findAllRealWSCLCList(stFactory);
    }

	@Override
	public List<BlackSmellCount> getBlackSmellCount(BlackSmellCount blackSmellCount) {
		// TODO Auto-generated method stub
		return subjectMapper.getBlackSmellCount(blackSmellCount);
	}
	@Override
	public List<StRealtimeDate> getCharQM(StRealtimeDate stRealtimeDate) {
		List<StRealtimeDate> listChildren = subjectMapper.findChild(stRealtimeDate);
		for (StRealtimeDate s : listChildren) {
			stRealtimeDate.setStnm(s.getStnm());
			s.setDataList(subjectMapper.getDataTime(stRealtimeDate));
		}
		return listChildren;
	}
	@Override
	public List<StRealtimeDate> getHongChongEcharts(StRealtimeDate stRealtimeDate) {
		String hcmc = stRealtimeDate.getStnm();//如果有数据就说明是查询单条数据的.没数据就是按区来查询数据的,
		System.out.println("-------------------------------------------------"+hcmc);
		List<StRealtimeDate> listChildren = new ArrayList<StRealtimeDate>();
		if(StringUtils.isBlank(hcmc)){
			listChildren = subjectMapper.getHongChongEcharts(stRealtimeDate);
			for (StRealtimeDate s : listChildren) {
				stRealtimeDate.setStnm(s.getStnm());
				s.setDataList(subjectMapper.getHechongDataTime(stRealtimeDate));
			}
		}else{
			stRealtimeDate.setDataList(subjectMapper.getHechongDataTime(stRealtimeDate));
			listChildren.add(stRealtimeDate);
		}
		return listChildren;
	}

	@Override
	public List<StFactory> getWuShuiEcharts(StFactory stFactory) {
		 List<StFactory> listChildren = new ArrayList<StFactory>();
			if(null!=stFactory){
				String type = stFactory.getType();
				 //如果名称存在,说明只是查询一条了记录.不存在则是按区来查询下面的污水
				 if(StringUtils.isNotEmpty(stFactory.getStnm())){
					 if(type.equals("ad") || type.equals("zl")|| type.equals("zd")|| type.equals("CODcr")){
						 System.out.println(stFactory.getAddvcd()+"--"+stFactory.getStnm()+"--"+stFactory.getSearchStrat()+"---999999999");
						 stFactory.setDataList(subjectMapper.getWndList(stFactory));
					 }else if(type.equals("ph") || type.equals("xfw")|| type.equals("hjwd")|| type.equals("tmd")|| type.equals("sd")|| type.equals("yhhydw")){
						 stFactory.setDataList(subjectMapper.getWpdList(stFactory));
					 }else{
						 stFactory.setDataList(subjectMapper.getWhdList(stFactory));
					 }
					 listChildren.add(stFactory);
				 }else{
					 	 listChildren = subjectMapper.getWwbName(stFactory);
					 listChildren = subjectMapper.getWwbName(stFactory);
						 for (StFactory stFty : listChildren) {
							 stFactory.setStnm(stFty.getStnm());
						//获取氨氮,总磷,总氮,含氧量得到接口
							if(type.equals("ad") || type.equals("zl")|| type.equals("zd")|| type.equals("CODcr")){
									System.out.println(stFactory.getAddvcd()+"--"+stFactory.getStnm()+"--"+stFactory.getSearchStrat()+"---777777");
									stFty.setDataList(subjectMapper.getWndList(stFactory));
							}else if(type.equals("ph") || type.equals("xfw")|| type.equals("hjwd")|| type.equals("tmd")|| type.equals("sd")|| type.equals("yhhydw")){
								//获取悬浮物,PH值的接口
									stFactory.setStnm(stFty.getStnm());
									System.out.println(stFactory.getAddvcd()+"--"+stFactory.getStnm()+"--"+stFactory.getSearchStrat()+"---777777");
									stFty.setDataList(subjectMapper.getWpdList(stFactory));
							}else{
								//获取悬浮物,水流量的接口
									stFactory.setStnm(stFty.getStnm());
									System.out.println(stFactory.getAddvcd()+"--"+stFactory.getStnm()+"--"+stFactory.getSearchStrat()+"---777777");
									stFty.setDataList(subjectMapper.getWhdList(stFactory));
							}
					 }
				 }
			}
			return listChildren;
	}

	@Override
	public List<StFactory> findBlackSmellyList() {
		// TODO Auto-generated method stub
		return subjectMapper.findBlackSmellyList();
	}

	@Override
	public List<StRealtimeDate> getNewPptnData(StRealtimeDate stRealtimeDate) {
		// TODO Auto-generated method stub
		return subjectMapper.getNewPptnData(stRealtimeDate);
	}

	@Override
	public List<StFactory> findStFactoryRealPageAll(StFactory stFactory) {
		Map map = new HashMap<>();
        map.put("stFactory", stFactory);
        return subjectMapper.findStFactoryRealPageNewAll(map);
	}

	/**
	 * 获取区与类型的树
	 */
	@Override
	public String getTreeJson(StRealtimeDate stRealtimeDate) {
		List<String> list = Arrays.asList("天河区","荔湾区","越秀区","黄埔区","白云区","番禺区","花都区","南沙区","增城区","从化区","海珠区");
		List<StRealtimeDate> listChildren = subjectMapper.findChild(stRealtimeDate);
		List one=new ArrayList();
		List to=new ArrayList();		
		for(String area:list){
			TreeNode top=new TreeNode();
			top.setId(area);
			top.setPid("-1");				
			top.setText(area);			
			List<TreeNode> child=new ArrayList<TreeNode>();
			boolean flag=false;
			for(StRealtimeDate s:listChildren){
				if(area.equals(s.getAddvcd())){					
					TreeNode ch=new TreeNode();
					ch.setId(s.getStnm());
					ch.setPid(area);
					ch.setText(s.getStnm()+"&&"+s.getStcd());
					child.add(ch);
					flag=true;
				}
			}
			if(flag){
				top.setState("closed");
				top.setChildren(child);
			}else{
				top.setIsParent("true");	
				top.setIconCls("icon-folder"); // 文件夹
			}			
			to.add(top);
		}
		one.add(to);
		return JSONArray.fromObject(one).toString();
	}

	/**
	 * 获取区与类型的树
	 */
	@Override
	public String getTreeJsonSZ(Huanbao huanbao) {
		List<String> list = Arrays.asList("天河区","荔湾区","越秀区","黄埔区","白云区","番禺区","花都区","南沙区","增城区","从化区","海珠区");
		Huanbao huanbaoDate = new Huanbao();
		List<Huanbao> listChildren =subjectMapper.findChildSZ(huanbaoDate);
		List one=new ArrayList();
		List to=new ArrayList();		
		for(String area:list){
			TreeNode top=new TreeNode();
			top.setId(area);
			top.setPid("-1");				
			top.setText(area);			
			List<TreeNode> child=new ArrayList<TreeNode>();
			boolean flag=false;
			for(Huanbao s:listChildren){
				if(area.equals(s.getSsxzq())){					
					TreeNode ch=new TreeNode();
					ch.setId(s.getHcmc());
					ch.setPid(area);
					ch.setText(s.getHcmc());
					child.add(ch);
					flag=true;
				}
			}
			if(flag){
				top.setState("closed");
				top.setChildren(child);
			}else{
				top.setIsParent("true");	
				top.setIconCls("icon-folder"); // 文件夹
			}			
			to.add(top);
		}
		one.add(to);
		return JSONArray.fromObject(one).toString();
	}

	/**
	 * 获取区与类型的树
	 */
	@Override
	public String getTreeJsonWSCLC(StFactory stFactory) {
		List<String> list = Arrays.asList("天河区","荔湾区","越秀区","黄埔区","白云区","番禺区","花都区","南沙区","增城区","从化区","海珠区");
		StFactory stfactoryDate = new StFactory();
        stfactoryDate.setSttp(stFactory.getSttp());
        List<StFactory> listChildren = subjectMapper.findChildWSCLC(stfactoryDate);
		List one=new ArrayList();
		List to=new ArrayList();		
		for(String area:list){
			TreeNode top=new TreeNode();
			top.setId(area);
			top.setPid("-1");				
			top.setText(area);			
			List<TreeNode> child=new ArrayList<TreeNode>();
			boolean flag=false;
			for(StFactory s:listChildren){
				if(area.equals(s.getAddvcd())){					
					TreeNode ch=new TreeNode();
					ch.setId(s.getStnm());
					ch.setPid(area);
					ch.setText(s.getStnm());
					child.add(ch);
					flag=true;
				}
			}
			if(flag){
				top.setState("closed");
				top.setChildren(child);
			}else{
				top.setIsParent("true");	
				top.setIconCls("icon-folder"); // 文件夹
			}			
			to.add(top);
		}
		one.add(to);
		return JSONArray.fromObject(one).toString();
	}

	/**
	 * 视频监控点
	 */
	@Override
	public PageInfo<Map<String, Object>> queryVideoPage(HttpServletRequest request, Page<Map<String, Object>> page) {
		PageHelper.startPage(page);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String mc = request.getParameter("mc");

        paramMap.put("mc", mc);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.queryVideo(paramMap);
        logger.debug("成功执行分页查询\r"+list.toString());
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
	}

    @Override
    public PageInfo<Map<String, Object>> listDrainageBasin(HttpServletRequest request, Page<Map<String, Object>> page) {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new LinkedHashMap<String, Object>();
        String rvcdnm = request.getParameter("rvcdnm");

        paramMap.put("rvcdnm", rvcdnm);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listDrainageBasin(paramMap);
        logger.debug("成功执行分页查询\r"+list.toString());
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase(list, list.getPageNum()));
    }

    @Override
    public Map<String, Object> getDrainageBasin(int objectid) {
        return subjectMapper.getDrainageBasin(objectid);
    }

    @Override
    public PageInfo<Irrigate> listIrrigate(String stcdnm, String sdate, String date, Page page) {
        PageHelper.startPage(page);
        Page<Irrigate> list = subjectMapper.listIrrigate(stcdnm, sdate, date);
        return new PageInfo<Irrigate>(list);
    }

    @Override
    public PageInfo<Irrigate> listIrrigateInfo(String stcdnm, Page page) {
        PageHelper.startPage(page);
        Page<Irrigate> list = subjectMapper.listIrrigateInfo(stcdnm);
        return new PageInfo<Irrigate>(list);
    }

    @Override
    public Map<String, Object> getIrrigateInfo(String stcd) {
        return subjectMapper.getIrrigateInfo(stcd);
    }

    @Override
    public PageInfo<XZQH> listXZQH(String name, String xzq, List<Integer> lvs, Page page) {
        PageHelper.startPage(page);
        Page<XZQH> list = subjectMapper.listXZQH(name, xzq, lvs);
        return new PageInfo<XZQH>(list);
    }

    @Override
    public Map<String, Object> getXZQH(String id) {
        return subjectMapper.getXZQH(id);
    }

    @Override
    public PageInfo<Map<String, Object>> listInspection(HttpServletRequest request, Page<Map<String, Object>> page) {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new LinkedHashMap<String, Object>();
        String layerName = request.getParameter("layerName");
        String unitVal = request.getParameter("unitVal");

        paramMap.put("layerName", layerName);
        paramMap.put("unitVal", unitVal);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listInspection(paramMap);
        logger.debug("成功执行分页查询\r"+list.toString());
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase2(list, list.getPageNum()));
    }

    @Override
    public Map<String, Object> getInspection(String projectid) {
        return subjectMapper.getInspection(projectid);
    }

    @Override
    public PageInfo<Map<String, Object>> listWell(HttpServletRequest request, Page<Map<String, Object>> page) {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new LinkedHashMap<String, Object>();
        String xzq = request.getParameter("xzq");

        paramMap.put("xzq", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listWell(paramMap);
        logger.debug("成功执行分页查询\r"+list.toString());
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase2(list, list.getPageNum()));
    }

    @Override
    public Map<String, Object> getWell(int objectid) {
        return subjectMapper.getWell(objectid);
    }

    @Override
    public PageInfo<Map<String, Object>> listFacility(HttpServletRequest request, Page<Map<String, Object>> page) {
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new LinkedHashMap<String, Object>();
        String xzq = request.getParameter("xzq");

        paramMap.put("xzq", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listFacility(paramMap);
        logger.debug("成功执行分页查询\r"+list.toString());
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase2(list, list.getPageNum()));
    }

    @Override
    public Map<String, Object> getFacility(int objectid) {
        return subjectMapper.getFacility(objectid);
    }

    @Override
    public PageInfo<Xwater> listXwater(String stcdnm, String sdate, String date, Page page) {
        PageHelper.startPage(page);
        Page<Xwater> list = subjectMapper.listXwater(stcdnm, sdate, date);
        return new PageInfo<Xwater>(list);
    }

    @Override
    public PageInfo<Xgas> listXgas(String stcdnm, String sdate, String date, Page page) {
        PageHelper.startPage(page);
        Page<Xgas> list = subjectMapper.listXgas(stcdnm, sdate, date);
        return new PageInfo<Xgas>(list);
    }

    @Override
    public PageInfo<Map<String, Object>> listDevWater(HttpServletRequest request,Page<Map<String, Object>> page){
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new LinkedHashMap<String, Object>();
        String nickname = request.getParameter("nickname");
        String xzq = request.getParameter("xzq");
        paramMap.put("nickname", nickname);
        paramMap.put("xzq", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listDevWater(paramMap);
        logger.debug("成功执行分页查询\r"+list.toString());
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase2(list, list.getPageNum()));
    }

    @Override
    public PageInfo<Map<String, Object>> listToxicWater(HttpServletRequest request,Page<Map<String, Object>> page){
        PageHelper.startPage(page);
        Map<String, Object> paramMap = new LinkedHashMap<String, Object>();
        String stnm = request.getParameter("stnm");
        String xzq = request.getParameter("xzq");
        paramMap.put("stnm", stnm);
        paramMap.put("xzq", xzq);
        Page<Map<String, Object>> list = (Page<Map<String, Object>>) subjectMapper.listToxicWater(paramMap);
        logger.debug("成功执行分页查询\r"+list.toString());
        return new PageInfo<Map<String, Object>>(MapToLowerCaseConvert.mapToLowerCase2(list, list.getPageNum()));
    }


    @Override
    public Map<String, Object> getXwaterDevInfo(Integer id) {
        return subjectMapper.getXwaterDevInfo(id);
    }

    @Override
    public Map<String, Object> getXgasDevInfo(String devid) {
        return subjectMapper.getXgasDevInfo(devid);
    }

}
