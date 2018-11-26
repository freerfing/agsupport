package com.augurit.asip.watermap.sc.subject.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import com.augurit.asip.watermap.domain.subject.*;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.augurit.agcloud.frame.json.JsonMapper;
import com.augurit.agcloud.frame.json.JsonUtils;
import com.augurit.agcloud.frame.ui.result.ContentResultForm;
import com.augurit.agcloud.frame.ui.result.ResultForm;
import com.augurit.asip.watermap.domain.layerEdit.BlackSmellCount;
import com.augurit.asip.watermap.domain.layerEdit.Huanbao;
import com.augurit.asip.watermap.domain.layerEdit.StFactory;
import com.augurit.asip.watermap.domain.layerEdit.StRealtimeDate;
import com.augurit.asip.watermap.domain.layerEdit.StWeather;
import com.augurit.asip.watermap.sc.subject.service.ISubject;
import com.common.util.Common;
import com.common.util.page.Pager;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.StringUtil;
@RestController
@RequestMapping({"/subject"})
public class SubjectController {
    private static Logger logger = LoggerFactory.getLogger(SubjectController.class);
    @Autowired
    private ISubject iSubject;

    /**
     * 查询实时雨量大于50的雨量站
     *
     * @param
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listYLByTime"})
    public List<StRealtimeDate> listYLByTime(String startTime,String endTime) throws Exception {
        List<StRealtimeDate> list= iSubject.listYLByTime(startTime,endTime);
        return list;
    }

    /**
     * 分页查询河道信息，并返回ContentResultForm对象
     *
     * @param stRiverR
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listStRiverRPage"})
    public String listStRiverRPage(StRiverR stRiverR, int curPage, int perPageCount) throws Exception {
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", stRiverR);
        Page page = new Page(curPage, perPageCount);
        PageInfo<Map> pageDate = iSubject.listStRiverRPage(stRiverR, page);
        return JsonUtils.toJson(new ContentResultForm<PageInfo<Map>>(true, pageDate, "分页查询成功"));
    }

    /**
     * 分页查询水库水情列表(带上测站x,y)
     *
     * @param request
     * @param curPage      页码
     * @param perPageCount 页长
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listReservoirPage"})
    public String listReservoirPage(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listReservoirPage(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 查询一个水库信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listinfoReservoir"})
    public String listinfoReservoir(Integer id) throws Exception {
        if (id != null) {
            logger.debug("根据ID获取Reservoir对象，ID为：{}", id);
            return JsonUtils.toJson(new ContentResultForm<Map>(true, iSubject.getReservoirById(id), "true"));
        } else {
            logger.debug("构建新的Reservoir对象");
            return JsonUtils.toJson(new ContentResultForm<Reservoir>(true, new Reservoir(), "false"));
        }
    }

    /**
     * 分页查询雨情列表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listStPptnRPage"})
    public String listStPptnRPage(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listStPptnRPage(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 根据id获取一条雨情信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listinfoStPptnR"})
    public String listinfoStPptnR(Integer id) throws Exception {
        if (id != null) {
            logger.debug("根据ID获取StPptnR对象，ID为：{}", id);
            return JsonUtils.toJson(new ContentResultForm<Map<String, Object>>(true, iSubject.getStPptnRById(id), "true"));
        } else {
            logger.debug("构建新的StPptnR对象");
            return JsonUtils.toJson(new ContentResultForm<StPptnR>(true, new StPptnR(), "false"));
        }
    }

    /**
     * 查询过去一周的水库水位情况
     *
     * @param sbsj 上报时间
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryLastweekWaterStage"})
    public String queryLastweekWaterStage(String sbsj, String zm) throws Exception {
        List<Map> list = iSubject.queryLastweekWaterStage(sbsj, zm);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 查询测站点近五天的降雨情况
     *
     * @param tm   日期
     * @param stcd 测站编码
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryRecentRainfall"})
    public String queryRecentRainfall(String tm, String stcd) throws Exception {
        List<Map> list = iSubject.queryRecentRainfall(tm, stcd);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 查询各雨量范围的记录的条数
     *
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryRainfallRecordNum"})
    public String queryRainfallRecordNum(HttpServletRequest request) throws Exception {
        Map<String, Object> map = iSubject.queryRainfallRecordNum(request);
        return JsonUtils.toJson(new ContentResultForm<Map<String, Object>>(true, map, "查询成功"));
    }

    /**
     * 查询一天24小时的雨量
     *
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryRainfallOneDay"})
    public String queryRainfallOneDay(String tm, String stcd) throws Exception {
        List<Map<String, Object>> list = iSubject.queryRainfallOneDay(tm, stcd);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 查询一个时间段的雨量
     *
     * @param tm_s
     * @param tm_e
     * @param stcd
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryRainfallOneTime"})
    public String queryRainfallOneTime(String tm_s, String tm_e, String stcd) throws Exception {
        List<Map<String, Object>> list = iSubject.queryRainfallOneTime(tm_s, tm_e, stcd);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 查看时段水库水位情况
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryReservoirPeriod"})
    public String queryReservoirPeriod(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> list = iSubject.queryReservoirPeriod(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 分页查询设施表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryPsStbprpPage"})
    public String queryPsStbprpPage(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.queryPsStbprpPage(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 查询过去一周的水库水位情况
     *
     * @param stcd
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryPumpDetail"})
    public String queryPumpDetail(String stcd) throws Exception {
        List<Map<String, Object>> list = iSubject.queryPumpDetail(stcd);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 分页查询水闸设施表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryPsStbprpWasPage"})
    public String queryPsStbprpWasPage(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.queryPsStbprpWasPage(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 查询水闸详情
     *
     * @param stcd
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryWasDetail"})
    public String queryWasDetail(String stcd) throws Exception {
        List<Map<String, Object>> list = iSubject.queryWasDetail(stcd);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 查看水闸历史水位
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryWasHist"})
    public String queryWasHist(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> list = iSubject.queryWasHist(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    @RequestMapping({"/waterremotedetect"})
    public String waterremotedetect(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.waterremotedetect(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    @RequestMapping({"/smartwaternet"})
    public String smartwaternet(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.smartwaternet(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 分页查询排水管网信息列表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listStConduitchB"})
    public String listStConduitchB(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listStConduitchB(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 查询一天管网的 流速 和 水位
     *
     * @param stcd 测站编号
     * @param tm   时间
     * @return
     * @throws Exception
     */
    @RequestMapping({"/queryDrainageDetailDay"})
    public String queryDrainageDetailDay(String stcd, String tm) throws Exception {
        List<Map<String, Object>> list = iSubject.queryDrainageDetailDay(stcd, tm);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 获取排水管网历史数据 maxt
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getDrainageHis"})
    public String getDrainageHis(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> pageData = iSubject.getDrainageHis(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "查询成功"));
    }

    /**
     * 分页查询积水点列表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getFloodPointList"})
    public String getFloodPointList(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.getFloodPointList(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 获取积水点历史数据
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getFloodPointHis"})
    public String getFloodPointHis(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> pageData = iSubject.getFloodPointHis(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "查询成功"));
    }

    /**
     * 分页获取墒情站列表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getMoistureList"})
    public String getMoistureList(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.getMoistureList(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 分页查询排水渠列表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getdrainageCanalList"})
    public String getdrainageCanalList(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.getdrainageCanalList(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 获取排水渠历史数据
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getdrainageCanalHis"})
    public String getdrainageCanalHis(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> pageData = iSubject.getdrainageCanalHis(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "查询成功"));
    }

    /**
     * 分页查询河流列表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getRiverList"})
    public String getRiverList(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.getRiverList(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 获取河流历史数据
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getRiverHis"})
    public String getRiverHis(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> pageData = iSubject.getRiverHis(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "查询成功"));
    }

    /**
     * 分页查询拦河坝列表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getWeirList"})
    public String getWeirList(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.getWeirList(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 分页查询污水处理厂列表--实时
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listWasteWaterPlant"})
    public String listWasteWaterPlant(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listWasteWaterPlant(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }
    /**
     * 分页查询污水处理厂列表--日均
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listWasteWaterPlantDay"})
    public String listWasteWaterPlantDay(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listWasteWaterPlantDay(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }
    /**
     * 分页查询黑臭水体列表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getBlackSmellyWaterList"})
    public String getBlackSmellyWaterList(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.getBlackSmellyWaterList(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 查看拦河坝历史水位
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/queryWeirHist")
    public String queryWeirHist(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> list = iSubject.queryWeirHist(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 查看泵站站上站下历史水位
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/queryPumpHist")
    public String queryPumpHist(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> list = iSubject.queryPumpHist(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 查看黑臭水体历史监测项
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/queryItemHis")
    public String queryItemHis(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> list = iSubject.queryItemHis(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 查看黑臭水体、污水处理厂 历史监测项
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/queryAllItemHis")
    public String queryAllItemHis(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> list = iSubject.queryAllItemHis(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }

    /**
     * 查看 污水处理厂 日均监测项
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/queryAllItemHisDay")
    public String queryAllItemHisDay(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> list = iSubject.queryAllItemHisDay(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }
    /**
     * 分页查询河道信息，并返回ContentResultForm对象
     *
     * @param projectId
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getriverbyid/{projectId}"})
    public String getRiverById(@PathVariable("projectId") String projectId) throws Exception {
        SlgRv slgRv = new SlgRv();

        slgRv.setRvcd(projectId);
        Pager pager = new Pager(1, 1);
        pager = iSubject.listRiversPage(slgRv, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", slgRv);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager.getPageSize() != 0 ? pager.getContent().get(0) : null, "查询成功"));
    }

    /**
     * 分页查询水闸信息，并返回ContentResultForm对象
     *
     * @param projectId
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getgatebyid/{projectId}"})
    public String getGateById(@PathVariable("projectId") String projectId) throws Exception {
        WrpBluBsinGate wrpBluBsinGate = new WrpBluBsinGate();

        wrpBluBsinGate.setSlcd(projectId);
        Pager pager = new Pager(1, 1);
        pager = iSubject.listGatesPage(wrpBluBsinGate, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", wrpBluBsinGate);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager.getPageSize() != 0 ? pager.getContent().get(0) : null, "查询成功"));
    }


    /**
     * 分页查询泵站信息，并返回ContentResultForm对象
     *
     * @param projectId
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getpumpbyid/{projectId}"})
    public String listPumps(@PathVariable("projectId") String projectId) throws Exception {
        WrpIdsBsinPump wrpIdsBsinPump = new WrpIdsBsinPump();

        wrpIdsBsinPump.setIdstcd(projectId);
        Pager pager = new Pager(1, 1);
        pager = iSubject.listPumpsPage(wrpIdsBsinPump, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", wrpIdsBsinPump);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager.getPageSize() != 0 ? pager.getContent().get(0) : null, "查询成功"));
    }


    /**
     * 分页查询湖泊信息，并返回ContentResultForm对象
     *
     * @param projectId
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getlakebyid/{projectId}"})
    public String getLakeById(@PathVariable("projectId") String projectId) throws Exception {
        SlgLake slgLake = new SlgLake();
        slgLake.setLkcd(projectId);
        Pager pager = new Pager(1, 1);
        pager = iSubject.listLakesPage(slgLake, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", slgLake);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager.getPageSize() != 0 ? pager.getContent().get(0) : null, "查询成功"));
    }


    /**
     * 分页查询堤防信息，并返回ContentResultForm对象
     *
     * @param projectId
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getdikebyid/{projectId}"})
    public String getDikeById(@PathVariable("projectId") String projectId) throws Exception {
        WrpLevBsinDike wrpLevBsinDike = new WrpLevBsinDike();

        wrpLevBsinDike.setLvcd(projectId);
        Pager pager = new Pager(1, 1);
        pager = iSubject.listDikesPage(wrpLevBsinDike, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", wrpLevBsinDike);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager.getPageSize() != 0 ? pager.getContent().get(0) : null, "查询成功"));
    }

    /**
     * 分页查询水库信息，并返回ContentResultForm对象
     *
     * @param projectId
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getresbyid/{projectId}"})
    public String getResById(@PathVariable("projectId") String projectId) throws Exception {
        WrpRsrBsinRes wrpRsrBsinRes = new WrpRsrBsinRes();
        wrpRsrBsinRes.setRscd(projectId);
        Pager pager = new Pager(1, 1);
        pager = iSubject.listRessPage(wrpRsrBsinRes, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", wrpRsrBsinRes);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager.getPageSize() != 0 ? pager.getContent().get(0) : null, "查询成功"));
    }


    /**
     * 分页查询实时水情（遥测站）列表
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getRealtimeWaterList"})
    public String getRealtimeWaterList(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.getRealtimeWaterList(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 获取实时水情（遥测站）历史数据
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getRealtimeWaterHis"})
    public String getRealtimeWaterHis(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> pageData = iSubject.getRealtimeWaterHis(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "查询成功"));
    }


    /**
     * 分页查询环保局水质公示
     *
     * @param request
     * @param curPage
     * @param perPageCount
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getHuanbaoList"})
    public String getHuanbaoList(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.getHuanbaoList(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 环保局水质公示-近六个月趋势
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/getHuanbao6MonthHis"})
    public String getHuanbao6MonthHis(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> pageData = iSubject.getHuanbao6MonthHis(request);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "查询成功"));
    }


    /**
     * 分页查询河道信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listrivers"})
    public String listRivers(HttpServletRequest request) throws Exception {
        SlgRv slgRv = new SlgRv();
        String rvcdnm = request.getParameter("rvcdnm");
        String rvcd = request.getParameter("rvcd");
        String rvnm = request.getParameter("rvnm");
        String xzq = request.getParameter("xzq");
        String sslymc = request.getParameter("sslymc");
        String rvlen = request.getParameter("rvlen");
        String rvlen1 = request.getParameter("rvlen1");
        String rvlen2 = request.getParameter("rvlen2");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        //        Page page = new Page(curPage, perPageCount);
        //        page.setCountSignal(true);
        Pager pager = new Pager(curPage, perPageCount);

        if (rvcdnm == null || rvcdnm.isEmpty())
            rvcdnm = "";
        if (rvcd == null || rvcd.isEmpty())
            rvcd = "";
        if (rvnm == null || rvnm.isEmpty())
            rvnm = "";
        if (xzq == null || xzq.isEmpty())
            xzq = "";
        if (sslymc == null || sslymc.isEmpty())
            sslymc = "";
        if (rvlen == null || rvlen.isEmpty())
            rvlen = "";
        if (rvlen1 == null || rvlen1.isEmpty())
            rvlen1 = "";
        if (rvlen2 == null || rvlen2.isEmpty())
            rvlen2 = "";


        slgRv.setRvcd(rvcd);
        slgRv.setRvnm(rvnm);
        slgRv.setXzq(xzq);
        slgRv.setSslymc(sslymc);
        slgRv.setRvlen(rvlen);
        slgRv.setRvcdnm(rvcdnm);
        slgRv.setRvlen1(rvlen1);
        slgRv.setRvlen2(rvlen2);


        pager = iSubject.listRiversPage(slgRv, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", slgRv);
        //return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "分页查询成功"));
    }

    /**
     * 分页查询35条黑臭河涌信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listrivers_35"})
    public String listRivers_35(HttpServletRequest request) throws Exception {
        SlgRv slgRv = new SlgRv();
        String rvcdnm = request.getParameter("rvcdnm");
        String rvcd = request.getParameter("rvcd");
        String rvnm = request.getParameter("rvnm");
        String xzq = request.getParameter("xzq");
        String sslymc = request.getParameter("sslymc");
        String rvlen = request.getParameter("rvlen");
        String rvlen1 = request.getParameter("rvlen1");
        String rvlen2 = request.getParameter("rvlen2");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        //        Page page = new Page(curPage, perPageCount);
        //        page.setCountSignal(true);
        Pager pager = new Pager(curPage, perPageCount);

        if (rvcdnm == null || rvcdnm.isEmpty())
            rvcdnm = "";
        if (rvcd == null || rvcd.isEmpty())
            rvcd = "";
        if (rvnm == null || rvnm.isEmpty())
            rvnm = "";
        if (xzq == null || xzq.isEmpty())
            xzq = "";
        if (sslymc == null || sslymc.isEmpty())
            sslymc = "";
        if (rvlen == null || rvlen.isEmpty())
            rvlen = "";
        if (rvlen1 == null || rvlen1.isEmpty())
            rvlen1 = "";
        if (rvlen2 == null || rvlen2.isEmpty())
            rvlen2 = "";
        slgRv.setRvcd(rvcd);
        slgRv.setRvnm(rvnm);
        slgRv.setXzq(xzq);
        slgRv.setSslymc(sslymc);
        slgRv.setRvlen(rvlen);
        slgRv.setRvcdnm(rvcdnm);
        slgRv.setRvlen1(rvlen1);
        slgRv.setRvlen2(rvlen2);
        pager = iSubject.listRiversPage_35(slgRv, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", slgRv);

        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "分页查询成功"));
    }
    /**
     * 分页查询187条黑臭河涌信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listrivers_152"})
    public String listRivers_152(HttpServletRequest request) throws Exception {
        SlgRv slgRv = new SlgRv();
        String rvcdnm = request.getParameter("rvcdnm");
        String rvcd = request.getParameter("rvcd");
        String rvnm = request.getParameter("rvnm");
        String xzq = request.getParameter("xzq");
        String sslymc = request.getParameter("sslymc");
        String rvlen = request.getParameter("rvlen");
        String rvlen1 = request.getParameter("rvlen1");
        String rvlen2 = request.getParameter("rvlen2");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (rvcdnm == null || rvcdnm.isEmpty())
            rvcdnm = "";
        if (rvcd == null || rvcd.isEmpty())
            rvcd = "";
        if (rvnm == null || rvnm.isEmpty())
            rvnm = "";
        if (xzq == null || xzq.isEmpty())
            xzq = "";
        if (sslymc == null || sslymc.isEmpty())
            sslymc = "";
        if (rvlen == null || rvlen.isEmpty())
            rvlen = "";
        if (rvlen1 == null || rvlen1.isEmpty())
            rvlen1 = "";
        if (rvlen2 == null || rvlen2.isEmpty())
            rvlen2 = "";
        slgRv.setRvcd(rvcd);
        slgRv.setRvnm(rvnm);
        slgRv.setXzq(xzq);
        slgRv.setSslymc(sslymc);
        slgRv.setRvlen(rvlen);
        slgRv.setRvcdnm(rvcdnm);
        slgRv.setRvlen1(rvlen1);
        slgRv.setRvlen2(rvlen2);
        pager = iSubject.listRiversPage_152(slgRv, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", slgRv);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "分页查询成功"));
    }

    /**
     * 分页查询187条黑臭河涌信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listrivers_187"})
    public String listRivers_187(HttpServletRequest request) throws Exception {
        SlgRv slgRv = new SlgRv();
        String rvcdnm = request.getParameter("rvcdnm");
        String rvcd = request.getParameter("rvcd");
        String rvnm = request.getParameter("rvnm");
        String xzq = request.getParameter("xzq");
        String sslymc = request.getParameter("sslymc");
        String rvlen = request.getParameter("rvlen");
        String rvlen1 = request.getParameter("rvlen1");
        String rvlen2 = request.getParameter("rvlen2");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        //        Page page = new Page(curPage, perPageCount);
        //        page.setCountSignal(true);
        Pager pager = new Pager(curPage, perPageCount);

        if (rvcdnm == null || rvcdnm.isEmpty())
            rvcdnm = "";
        if (rvcd == null || rvcd.isEmpty())
            rvcd = "";
        if (rvnm == null || rvnm.isEmpty())
            rvnm = "";
        if (xzq == null || xzq.isEmpty())
            xzq = "";
        if (sslymc == null || sslymc.isEmpty())
            sslymc = "";
        if (rvlen == null || rvlen.isEmpty())
            rvlen = "";
        if (rvlen1 == null || rvlen1.isEmpty())
            rvlen1 = "";
        if (rvlen2 == null || rvlen2.isEmpty())
            rvlen2 = "";
        slgRv.setRvcd(rvcd);
        slgRv.setRvnm(rvnm);
        slgRv.setXzq(xzq);
        slgRv.setSslymc(sslymc);
        slgRv.setRvlen(rvlen);
        slgRv.setRvcdnm(rvcdnm);
        slgRv.setRvlen1(rvlen1);
        slgRv.setRvlen2(rvlen2);
        pager = iSubject.listRiversPage_187(slgRv, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", slgRv);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "分页查询成功"));
    }

    /**
     * 分页查询水闸信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listgates"})
    public String listGates(HttpServletRequest request) throws Exception {
        WrpBluBsinGate wrpBluBsinGate = new WrpBluBsinGate();
        String slcdnm = request.getParameter("slcdnm");
        String slcd = request.getParameter("slcd");
        String slnm = request.getParameter("slnm");
        String xzq = request.getParameter("xzq");
        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");

        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (slcdnm == null || slcdnm.isEmpty())
            slcdnm = "";
        if (slcd == null || slcd.isEmpty())
            slcd = "";
        if (slnm == null || slnm.isEmpty())
            slnm = "";
        if (xzq == null || xzq.isEmpty())
            xzq = "";

        wrpBluBsinGate.setSlcd(slcd);
        wrpBluBsinGate.setSlnm(slnm);
        wrpBluBsinGate.setXzq(xzq);
        wrpBluBsinGate.setSlcdnm(slcdnm);


        pager = iSubject.listGatesPage(wrpBluBsinGate, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", wrpBluBsinGate);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }


    /**
     * 分页查询泵站信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listpumps"})
    public String listPumps(HttpServletRequest request) throws Exception {
        WrpIdsBsinPump wrpIdsBsinPump = new WrpIdsBsinPump();
        String idstcd = request.getParameter("idstcd");
        String idstnm = request.getParameter("idstnm");
        String idstcdnm = request.getParameter("idstcdnm");
        String xzq = request.getParameter("xzq");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (idstcd == null || idstcd.isEmpty())
            idstcd = "";
        if (idstnm == null || idstnm.isEmpty())
            idstnm = "";
        if (idstcdnm == null || idstcdnm.isEmpty())
            idstcdnm = "";
        if (xzq == null || xzq.isEmpty())
            xzq = "";

        wrpIdsBsinPump.setIdstcd(idstcd);
        wrpIdsBsinPump.setIdstnm(idstnm);
        wrpIdsBsinPump.setXzq(xzq);
        wrpIdsBsinPump.setIdstcdnm(idstcdnm);

        pager = iSubject.listPumpsPage(wrpIdsBsinPump, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", wrpIdsBsinPump);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }


    /**
     * 分页查询湖泊信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listlakes"})
    public String listLakes(HttpServletRequest request) throws Exception {
        SlgLake slgLake = new SlgLake();
        String lkcdnm = request.getParameter("lkcdnm");
        String lkcd = request.getParameter("lkcd");
        String lknm = request.getParameter("lknm");
        String xzq = request.getParameter("xzq");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);


        if (lkcdnm == null || lkcdnm.isEmpty())
            lkcdnm = "";
        if (lkcd == null || lkcd.isEmpty())
            lkcd = "";
        if (lknm == null || lknm.isEmpty())
            lknm = "";
        if (xzq == null || xzq.isEmpty())
            xzq = "";

        slgLake.setLkcdnm(lkcdnm);
        slgLake.setLkcd(lkcd);
        slgLake.setLknm(lknm);
        slgLake.setXzq(xzq);

        pager = iSubject.listLakesPage(slgLake, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", slgLake);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }


    /**
     * 分页查询堤防信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listdikes"})
    public String listDikes(HttpServletRequest request) throws Exception {
        WrpLevBsinDike wrpLevBsinDike = new WrpLevBsinDike();
        String lvcdnm = request.getParameter("lvcdnm");
        String lvcd = request.getParameter("lvcd");
        String lvnm = request.getParameter("lvnm");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (lvcdnm == null || lvcdnm.isEmpty())
            lvcdnm = "";
        if (lvcd == null || lvcd.isEmpty())
            lvcd = "";
        if (lvnm == null || lvnm.isEmpty())
            lvnm = "";

        wrpLevBsinDike.setLvcdnm(lvcdnm);
        wrpLevBsinDike.setLvcd(lvcd);
        wrpLevBsinDike.setLvnm(lvnm);

        pager = iSubject.listDikesPage(wrpLevBsinDike, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", wrpLevBsinDike);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }

    /**
     * 分页查询水库信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listress"})
    public String listRess(HttpServletRequest request) throws Exception {
        WrpRsrBsinRes wrpRsrBsinRes = new WrpRsrBsinRes();

        String rscdnm = request.getParameter("rscdnm");
        String rscd = request.getParameter("rscd");
        String rsnm = request.getParameter("rsnm");
        String xzq = request.getParameter("xzq");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (rscdnm == null || rscdnm.isEmpty())
            rscdnm = "";
        if (rscd == null || rscd.isEmpty())
            rscd = "";
        if (rsnm == null || rsnm.isEmpty())
            rsnm = "";
        if (xzq == null || xzq.isEmpty())
            xzq = "";

        wrpRsrBsinRes.setRscd(rscd);
        wrpRsrBsinRes.setRsnm(rsnm);
        wrpRsrBsinRes.setXzq(xzq);
        wrpRsrBsinRes.setRscdnm(rscdnm);

        pager = iSubject.listRessPage(wrpRsrBsinRes, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", wrpRsrBsinRes);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }


    /**
     * 分页查询水库信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listwqsinfb"})
    public String listWqsinfBPage(HttpServletRequest request) throws Exception {
        WqWqsinfB wqWqsinfB = new WqWqsinfB();

        String stcdnm = request.getParameter("stcdnm");
        String stcd = request.getParameter("stcd");
        String stnm = request.getParameter("stnm");
        String sttp = request.getParameter("sttp");
        String addvcd = request.getParameter("addvcd");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (stcdnm == null || stcdnm.isEmpty())
            stcdnm = "";
        if (stcd == null || stcd.isEmpty())
            stcd = "";
        if (stnm == null || stnm.isEmpty())
            stnm = "";
        if (sttp == null || sttp.isEmpty())
            sttp = "";
        if (addvcd == null || addvcd.isEmpty())
            addvcd = "";

        wqWqsinfB.setStcd(stcd);
        wqWqsinfB.setStnm(stnm);
        wqWqsinfB.setSttp(sttp);
        wqWqsinfB.setAddvcd(addvcd);
        wqWqsinfB.setStcdnm(stcdnm);

        pager = iSubject.listWqsinfBPage(wqWqsinfB, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", wqWqsinfB);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }


    /**
     * 分页查询水库信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listststbprpb"})
    public String listStStbprpBPage(HttpServletRequest request) throws Exception {
        StStbprpB stStbprpB = new StStbprpB();

        String stcdnm = request.getParameter("stcdnm");
        String stcd = request.getParameter("stcd");
        String stnm = request.getParameter("stnm");
        String sttp = request.getParameter("sttp");
        String addvcd = request.getParameter("addvcd");
        String usfl = request.getParameter("usfl");

        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");
        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (stcdnm == null || stcdnm.isEmpty())
            stcdnm = "";
        if (stcd == null || stcd.isEmpty())
            stcd = "";
        if (stnm == null || stnm.isEmpty())
            stnm = "";
        if (sttp == null || sttp.isEmpty())
            sttp = "";
        if (addvcd == null || addvcd.isEmpty())
            addvcd = "";
        if (usfl == null || usfl.isEmpty())
        	usfl = "";

        stStbprpB.setStcd(stcd);
        stStbprpB.setStnm(stnm);
        stStbprpB.setStcdnm(stcdnm);
        stStbprpB.setAddvcd(addvcd);
        stStbprpB.setSttp(sttp);
        stStbprpB.setUsfl(usfl);

        pager = iSubject.listStStbprpBPage(stStbprpB, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", stStbprpB);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }


    @RequestMapping({"/updateRiverData"})
    public String updateRiverData(WrpRvrBsin rvrBsin) throws Exception {
        try {
            if (StringUtil.isEmpty(rvrBsin.getRvcd()))
                return JsonUtils.toJson(new ResultForm(false, "河流编码为空！"));
            rvrBsin.setDtupdt(new Date(new Timestamp(new Date().getTime()).getTime()));
            iSubject.updateRiverData(rvrBsin);
            return JsonUtils.toJson(new ResultForm(true));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "修改失败！"));
    }

    @RequestMapping({"/updateLakeData"})
    public String updateLakeData(WrpLakBsin lakBsin) throws Exception {
        try {
            if (StringUtil.isEmpty(lakBsin.getLkcd()))
                return JsonUtils.toJson(new ResultForm(false, "湖泊编码为空！"));
            lakBsin.setDtupdt(new Date(new Timestamp(new Date().getTime()).getTime()));
            iSubject.updateLakeData(lakBsin);
            return JsonUtils.toJson(new ResultForm(true));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "修改失败！"));
    }

    @RequestMapping({"/updateRessData"})
    public String updateRessData(WrpRsrBsin rsrBsin) throws Exception {
        try {
            if (StringUtil.isEmpty(rsrBsin.getRscd()))
                return JsonUtils.toJson(new ResultForm(false, "水库编码为空！"));
            rsrBsin.setDtupdt(new Date(new Timestamp(new Date().getTime()).getTime()));
            iSubject.updateRessData(rsrBsin);
            return JsonUtils.toJson(new ResultForm(true));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "修改失败！"));

    }

    @RequestMapping({"/updateGatesData"})
    public String updateGatesData(WrpSluBsin sluBsin) throws Exception {
        try {
            if (StringUtil.isEmpty(sluBsin.getSlcd()))
                return JsonUtils.toJson(new ResultForm(false, "水闸编码为空！"));
            sluBsin.setDtupdt(new Date(new Timestamp(new Date().getTime()).getTime()));
            iSubject.updateGatesData(sluBsin);
            return JsonUtils.toJson(new ResultForm(true));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "修改失败！"));

    }

    @RequestMapping({"/updatePumpsData"})
    public String updatePumpsData(WrpIdsBsin idsBsin) throws Exception {
        try {
            if (StringUtil.isEmpty(idsBsin.getIdstcd()))
                return JsonUtils.toJson(new ResultForm(false, "泵站编码为空！"));
            idsBsin.setDtupdt(new Date(new Timestamp(new Date().getTime()).getTime()));
            iSubject.updatePumpsData(idsBsin);
            return JsonUtils.toJson(new ResultForm(true));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "修改失败！"));

    }

    @RequestMapping({"/getGatesById/{Id}"})
    public String getGatesById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List<WrpSluBsin> list = iSubject.getGatesById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/getPumpsById/{Id}"})
    public String getPumpsById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List<WrpIdsBsin> list = iSubject.getPumpsById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    /**
     * @param wqWqsinfB 水质监测站保存和修改
     */
    @RequestMapping({"/updateWaterQuality"})
    public String updateWaterQuality(WqWqsinfB wqWqsinfB) throws Exception {
        String result = null;
        try {
            if (StringUtils.isEmpty(wqWqsinfB.getStcd())) {
                return JsonUtils.toJson(new ResultForm(false, wqWqsinfB.getSttp().equals("FQ") ? "污水处理厂水质监测站编码为空" : "河涌水质监测站编码为空"));
            }
            iSubject.updateWaterQuality(wqWqsinfB);
            return JsonUtils.toJson(new ResultForm(true));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "保存失败！"));
    }

    /**
     * @param Id
     * @param sttp 水质监测站查询
     */
    @RequestMapping({"/getWaterQualityBySTCD/{sttp}/{Id}"})
    public String getWaterQualityBySTCD(@PathVariable String sttp, @PathVariable String Id) {
        try {
            if (Common.isCheckNull(Id) || Common.isCheckNull(sttp)) return null;
            List<WqWqsinfB> list = iSubject.getWaterQualityById(Id, sttp);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    /**
     * 从测站基础信息表临时表获取记录
     */
    @RequestMapping({"/getStationByStcdAndSttp/{sttp}/{stcd}"})
    public String getStationBySTCD(@PathVariable String sttp, @PathVariable String stcd) {
        try {
            if (Common.isCheckNull(stcd)) return null;
            List<StStbprpB> list = iSubject.getStationByStcdAndSttp(stcd, sttp);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    /**
     * 保存或修改测站基础信息表临时表
     */
    @RequestMapping({"/updateStation"})
    public String updateStation(StStbprpB stStbprpB) throws Exception {
        String result = null;
        try {
            if (StringUtils.isEmpty(stStbprpB.getStcd())) {
                String message = "";
                switch (stStbprpB.getSttp()) {
                    case "ZZ":
                        message = "河道水文站编码为空!";
                        break;
                    case "RR":
                        message = "水库水文站编码为空!";
                        break;
                    case "PP":
                        message = "雨量站编码为空!";
                        break;
                    case "DD":
                        message = "堰闸水文站编码为空!";
                        break;
                    case "UP":
                        message = "污水干管监测站编码为空!";
                        break;
                    case "WL":
                        message = "积水监测点编码为空!";
                        break;
                    case "DP":
                        message = "排水泵监测站编码为空!";
                        break;
                }
                return JsonUtils.toJson(new ResultForm(false, message));
            }
            stStbprpB.setModitime(new Date(new Timestamp(new Date().getTime()).getTime()));
            iSubject.updateStation(stStbprpB);
            return JsonUtils.toJson(new ResultForm(true));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "保存失败！"));
    }

    /**
     * 修改和新增堤防信息
     *
     * @param wrpLevBsin
     * @return
     * @throws Exception
     */
    @RequestMapping({"/updateDikeData"})
    public String updateDikeData(WrpLevBsin wrpLevBsin) throws Exception {
        try {
            if (StringUtil.isEmpty(wrpLevBsin.getLvcd()))
                return JsonUtils.toJson(new ResultForm(false, "堤防编码为空！"));
            wrpLevBsin.setDtupdt(new Date(new Timestamp(new Date().getTime()).getTime()));
            iSubject.updateDike(wrpLevBsin);
            return JsonUtils.toJson(new ResultForm(true));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "修改失败！"));
    }

    /**
     * 水务综合信息,获取每个测站最新的数据用来展示
     *
     * @return
     */
    @RequestMapping({"/getAwaterallList"})
    public String getAwaterallList(StRealtimeDate stRealtimeDate) {
        List<StRealtimeDate> noticeList = iSubject.findAllList(stRealtimeDate);
        int allCount = iSubject.getDePlusCount(stRealtimeDate);//获取全部数据量
        stRealtimeDate.setDeplus((float) 0);
        int deplusCount = iSubject.getDePlusCount(stRealtimeDate);//获取超限数据量
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("list", noticeList);
        jsonObj.put("deplusCount", deplusCount);
        jsonObj.put("allCount", allCount);
        return jsonObj.toString();
    }

    /**
     * 水务综合信息,获取每个测站最新雨量数据用来展示
     * @return
     */
    @RequestMapping({"/getStPptnList"})
	public String getPptnList(){
         List<StRealtimeDate> noticeList=iSubject.getStPptnList();
         JSONObject jsonObj = new JSONObject();
         jsonObj.put("list", noticeList);
         return jsonObj.toString();
	}

    @RequestMapping({"/getStPptnListJSON"})
    public  List<StRealtimeDate> getStPptnListJSON(){
        List<StRealtimeDate> realTimeList=iSubject.getStPptnList();
        return realTimeList;
    }
    /**
     * 水务综合信息,获取水库最新的实时数据
     */
    @RequestMapping({"/getStRsvrList"})
   	public String getRsvrList(StRealtimeDate stRealtimeDate){
    	//查找重要水库的话,需要加入重要水库的编码
        List<StRealtimeDate> noticeList=iSubject.getStRsvrList(stRealtimeDate);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("list", noticeList);
        return jsonObj.toString();
   	}
    /**
     * 水务综合信息,获取河道最新的实时数据
     */
    @RequestMapping({"/getStRiverList"})
   	public String getRiverList(){
            List<StRealtimeDate> noticeList=iSubject.getStRiverList();
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("list", noticeList);
            return jsonObj.toString();
   	}
    /**
     * 水务综合信息,获取每个测站最新的数据用来展示
     *
     * @return
     */
    @RequestMapping({"/findHist"})
    public String findHist(StRealtimeDate stRealtimeDate, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "50") int rows) {
        List<StRealtimeDate> notice = iSubject.findAllHistListByPage(stRealtimeDate, page, rows);
        List<StRealtimeDate> noticeList = iSubject.findHistList(stRealtimeDate);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("rows", notice);
        jsonObj.put("total", noticeList.get(0).getTatol());
        return jsonObj.toString();
    }

    /**
     * 监测点的数据根据选择时间查询所有当天的数据
     * BHS
     * @return
     */
    @RequestMapping({"/findHistChrats"})
    public String findHistChrats(StRealtimeDate stRealtimeDate) {
        List<StRealtimeDate> notice = iSubject.findAllHistListByPageChartS(stRealtimeDate);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("rows", notice);
        return jsonObj.toString();
    }

    /**
     * 获取区级下面的全部测站
     * @param stRealtimeDate
     * @return
     */
    @RequestMapping({"/getCharQM"})
    public List<StRealtimeDate> getCharQM(StRealtimeDate stRealtimeDate){
    	 List<StRealtimeDate> notice = iSubject.getCharQM(stRealtimeDate);
    	 return notice;
    }
    /**
     * 获取环保局里面的数据
     * @param stRealtimeDate
     * @return
     */
    @RequestMapping({"/getHongChongEcharts"})
    public List<StRealtimeDate> getHongChongEcharts(StRealtimeDate stRealtimeDate){
    	 List<StRealtimeDate> notice = iSubject.getHongChongEcharts(stRealtimeDate);
    	 return notice;
    }
    /**
     * 获取污水厂进出口的数据
     * @param stFactory
     * @return
     */
    @RequestMapping({"/getWuShuiEcharts"})
    public List<StFactory> getWuShuiEcharts(StFactory stFactory){
    	 List<StFactory> notice = iSubject.getWuShuiEcharts(stFactory);
    	 return notice;
    }

    /**
     * 水务综合信息,获取每个测站最新的数据用来展示
     *
     * @return
     */
    @RequestMapping({"/findList"})
    public String findList(StRealtimeDate stRealtimeDate, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "50") int rows) {
        List<StRealtimeDate> notice = iSubject.findAllListByPage(stRealtimeDate, page, rows);
        List<StRealtimeDate> noticeList = iSubject.findAllList(stRealtimeDate);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("rows", notice);
        jsonObj.put("total", noticeList.size());
        return jsonObj.toString();
    }

    /**
     * 河涌水质的历史数据
     * bhs
     * @param huanbao
     * @param page
     * @param rows
     * @return
     */
    @RequestMapping({"/findHistSZ"})
    public String findHistSZ(Huanbao huanbao, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "50") int rows) {
        List<Huanbao> notice = iSubject.findAllListSZByPage(huanbao, page, rows);
        List<Huanbao> noticeList = iSubject.findAllSZList(huanbao);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("rows", notice);
        jsonObj.put("total", noticeList.size());
        return jsonObj.toString();
    }

    /**
     * 污水处理厂的历史数据
     * bhs
     * @param stFactory
     * @param page
     * @param rows
     * @return
     */
    @RequestMapping({"/findHistWSCL"})
    public String findHistWSCL(StFactory stFactory, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "50") int rows) {
        List<StFactory> notice = iSubject.findAllListWSCLCByPage(stFactory, page, rows);
        List<StFactory> noticeList = iSubject.findAllWSCLCList(stFactory);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("rows", notice);
        jsonObj.put("total", noticeList.size());
        return jsonObj.toString();
    }

    /**
     * 监测点的数据根据选择时间查询所有当天的数据 水质河涌
     * BHS
     * @return
     */
    @RequestMapping({"/findHistChratsSZ"})
    public String findHistChratsSZ(Huanbao huanbao) {
        //List<Huanbao> notice = iSubject.findAllListSZByPage(huanbao, page, rows);
        List<Huanbao> notice = iSubject.findAllHistListByPageChartSSZ(huanbao);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("rows", notice);
        return jsonObj.toString();
    }

    /**
     * 监测点的数据根据选择时间查询所有当天的数据 水质河涌
     * BHS
     * @return
     */
    @RequestMapping({"/findHistChratsWSCLC"})
    public String findHistChratsWSCLC(StFactory stFactory) {
        List<StFactory> notice = iSubject.findAllHistListByPageChartSWSCLC(stFactory);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("rows", notice);
        return jsonObj.toString();
    }

    /**
     * @author bhs
     * 拼接json树
     */
    @RequestMapping({"/getZuiGaoTreeJson"})
    public String getZuiGaoTreeJson(StRealtimeDate stRealtimeDate, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int rows) {
        // String treeJson = iSubject.getInputFull(stRealtimeDate);
        //return  JsonUtils.toJson(treeJson);
    	String treeJson=iSubject.getTreeJson(stRealtimeDate);
        return treeJson;
    }

    /**
     * @author bhs 水质河涌
     * 拼接json树
     */
    @RequestMapping({"/getZuiGaoTreeJsonSZ"})
    public String getZuiGaoTreeJsonSZ(Huanbao huanbao, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int rows) {
        // String treeJson = iSubject.getInputFullSZ(huanbao);
    	String treeJson = iSubject.getTreeJsonSZ(huanbao);
        return treeJson;
    }

    /**
     * @author bhs 污水处理厂
     * 拼接json树
     */
    @RequestMapping({"/getZuiGaoTreeJsonWSCLC"})
    public String getZuiGaoTreeJsonWSCLC(StFactory stFactory, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int rows) {
        // String treeJson = iSubject.getInputFullWSCLC(stFactory);
    	String treeJson = iSubject.getTreeJsonWSCLC(stFactory);
        return treeJson;
    }

    /**
     * 获取天气预报数据,去气象局抓取
     *
     * @return
     */
    @RequestMapping({"/getWeather"})
    public String getWeather() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String data = sdf.format(new Date());
        int count = iSubject.getWeatherCount(data);//判断数据库中是否存在今天的天气预报
        String content = "";
        if (StringUtils.isNotEmpty(count + "") && count > 0) {
            content = iSubject.getWeather(data);//如果数据库中查出来存在这些数据,就去出具苦衷查找
        } else {
            String tqyb = "http://www.tqyb.com.cn/data/link-gzbaogao/index.html";
            URL postUrl = new URL(tqyb);
            HttpURLConnection connection = (HttpURLConnection) postUrl.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            //从远程获取返回的数据流
            InputStream in = connection.getInputStream();
            BufferedReader read = new BufferedReader(new InputStreamReader(in, "UTF-8"));
            String line;//循环读取
            while ((line = read.readLine()) != null) {
                content += line;
            }
            // content = content.replaceAll("[^0-9\\u4e00-\\u9fa5]", "");
            content = content.replaceAll("</?[^>]+>", "");
            String title = content.substring(6, content.lastIndexOf("摘要"));
            content = content.substring(content.lastIndexOf("摘要") + 3, content.lastIndexOf("一、"));
            try {
                iSubject.saveStWeather(new StWeather(sdf.parse(sdf.format(new Date())), content, title));
            } catch(Exception e) {
                logger.error("插入数据失败...", e);
            }
        }
        JSONObject obj = new JSONObject();
        obj.put("date", new Date());
        obj.put("content", content);
        return obj.toString();
    }

    /**
     * 环保局河涌水质,获取每个测站最新的数据用来展示
     *
     * @return
     */
    @RequestMapping({"/getHechongList"})
    public String getHechongList() {
        List<Huanbao> hechongList = iSubject.findHechongList();
        int allCount = iSubject.getHechongCount();//获取全部河涌数据量
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("list", hechongList);
        jsonObj.put("allCount", allCount);
        return jsonObj.toString();
    }

    /**
     * 环保局河涌水质,获取每个测站最新的数据用来展示
     *bhs 弹出层的分页用的 @author bhs
     * @return
     */
    @RequestMapping({"/findListHechong"})
    public String findListHechong(Huanbao huanbao, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "50") int rows) {
        List<Huanbao> notice = iSubject.findListHechongPage(huanbao, page, rows);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("rows", notice);
        jsonObj.put("total", notice.size());
        return jsonObj.toString();
    }

    /**
     * 污水处理厂的数据用来展示
     *bhs 弹出层的分页用的 @author bhs
     * @return
     */
    @RequestMapping({"/StFactoryRealList"})
    public String StFactoryRealList(StFactory stFactory, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "50") int rows) {
        List<StFactory> notice = iSubject.findStFactoryRealPage(stFactory, page, rows);
        List<StFactory> noticeTotal = iSubject.findStFactoryRealPageAll(stFactory);
        /*JSONObject jsonObj = new JSONObject();
        List<StFactory> stFactoryList = new ArrayList<StFactory>();
        if (StringUtils.isNotEmpty(stFactory.getSttp())) {
            //进水口的数据,调用同一个方法
            stFactory.setSttp("JSK");
            stFactoryList = iSubject.findStFactoryList(stFactory);//进水口的List;
            jsonObj.put("jskList", stFactoryList);
            //出水口的数据
            stFactory.setSttp("CSK");
            stFactoryList = iSubject.findStFactoryList(stFactory);//进水口的List;
            jsonObj.put("cskList", stFactoryList);
        } else {
            stFactoryList = iSubject.findStFactoryList(stFactory);
            int allCount = iSubject.getStFactoryCount();//获取全部污水处理厂数据量
            jsonObj.put("list", stFactoryList);
            jsonObj.put("allCount", allCount);
        }
        return jsonObj.toString();*/
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("rows", notice);
        jsonObj.put("total", noticeTotal.size());
        return jsonObj.toString();
    }

    /**
     * 获取每个污水处理厂最新的数据用来展示
     *
     * @return
     */
    @RequestMapping({"/findStFactoryList"})
    public String findStFactoryList(StFactory stFactory) {
        JSONObject jsonObj = new JSONObject();
        List<StFactory> stFactoryList = new ArrayList<StFactory>();
        if (StringUtils.isNotEmpty(stFactory.getSttp())) {
            //进水口的数据,调用同一个方法
            stFactory.setSttp("JSK");
            stFactoryList = iSubject.findStFactoryList(stFactory);//进水口的List;
            jsonObj.put("jskList", stFactoryList);
            //出水口的数据
            stFactory.setSttp("CSK");
            stFactoryList = iSubject.findStFactoryList(stFactory);//进水口的List;
            jsonObj.put("cskList", stFactoryList);
        } else {
            stFactoryList = iSubject.findStFactoryList(stFactory);
            int allCount = iSubject.getStFactoryCount();//获取全部污水处理厂数据量
            jsonObj.put("list", stFactoryList);
            jsonObj.put("allCount", allCount);
        }
        return jsonObj.toString();
    }
    
    /**
     * 获取出水口最新的数据用来展示
     *
     * @return
     */
    @RequestMapping({"/findBlackSmellyList"})
    public String findBlackSmellyList() {
        JSONObject jsonObj = new JSONObject();
        List<StFactory> stFactoryList = new ArrayList<StFactory>();
        stFactoryList = iSubject.findBlackSmellyList();
        int allCount = stFactoryList.size();
        jsonObj.put("list", stFactoryList);
        jsonObj.put("allCount", allCount);
        return jsonObj.toString();
    }

    /**
     * 雨水口
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listpscombzy"})
    public String listPsCombZyPage(HttpServletRequest request) throws Exception {
        PsCombZy psCombZy = new PsCombZy();
        String UsidAndName = request.getParameter("UsidAndName");
        String Usid = request.getParameter("Usid");
        String Name = request.getParameter("Name");
        String District = request.getParameter("District");
        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");

        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (UsidAndName == null || UsidAndName.isEmpty())
            UsidAndName = "";
        if (Usid == null || Usid.isEmpty())
            Usid = "";
        if (Name == null || Name.isEmpty())
            Name = "";
        if (District == null || District.isEmpty())
            District = "";

        psCombZy.setUsidAndName(UsidAndName);
        psCombZy.setUsid(Usid);
        psCombZy.setName(Name);
        psCombZy.setDistrict(District);


        pager = iSubject.listPsCombZyPage(psCombZy, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", psCombZy);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }

    /**
     * 分页查询水闸信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listpsdraingatezy"})
    public String listPsDraingateZyPage(HttpServletRequest request) throws Exception {
        PsDraingateZy psDraingateZy = new PsDraingateZy();
        String UsidAndName = request.getParameter("UsidAndName");
        String Usid = request.getParameter("Usid");
        String Name = request.getParameter("Name");
        String District = request.getParameter("District");
        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");

        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (UsidAndName == null || UsidAndName.isEmpty())
            UsidAndName = "";
        if (Usid == null || Usid.isEmpty())
            Usid = "";
        if (Name == null || Name.isEmpty())
            Name = "";
        if (District == null || District.isEmpty())
            District = "";

        psDraingateZy.setUsidAndName(UsidAndName);
        psDraingateZy.setUsid(Usid);
        psDraingateZy.setName(Name);
        psDraingateZy.setDistrict(District);


        pager = iSubject.listPsDraingateZyPage(psDraingateZy, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", psDraingateZy);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }

    /**
     * 分页查询水闸信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listpspipezy"})
    public String listPsPipeZyPage(HttpServletRequest request) throws Exception {
        PsPipeZy psPipeZy = new PsPipeZy();
        String UsidAndName = request.getParameter("UsidAndName");
        String UsidAndAddr = request.getParameter("UsidAndAddr");
        String Usid = request.getParameter("Usid");
        String Name = request.getParameter("Name");
        String Addr = request.getParameter("Addr");
        String District = request.getParameter("District");
        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");

        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (UsidAndName == null || UsidAndName.isEmpty())
            UsidAndName = "";
        if (Usid == null || Usid.isEmpty())
            Usid = "";
        if (Name == null || Name.isEmpty())
            Name = "";
        if (District == null || District.isEmpty())
            District = "";
        if (UsidAndAddr == null || UsidAndAddr.isEmpty())
            UsidAndAddr = "";
        if (Addr == null || Addr.isEmpty())
            Addr = "";

        psPipeZy.setUsidAndName(UsidAndName);
        psPipeZy.setUsid(Usid);
        psPipeZy.setName(Name);
        psPipeZy.setDistrict(District);
        psPipeZy.setUsidAndAddr(UsidAndAddr);
        psPipeZy.setAddr(Addr);

        pager = iSubject.listPsPipeZyPage(psPipeZy, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", psPipeZy);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }

    /**
     * 分页查询水闸信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listpspumpingstationzy"})
    public String listPsPumpingStationZyPage(HttpServletRequest request) throws Exception {
        PsPumpingStationZy psPumpingStationZy = new PsPumpingStationZy();
        String UsidAndName = request.getParameter("UsidAndName");
        String Usid = request.getParameter("Usid");
        String Name = request.getParameter("Name");
        String District = request.getParameter("District");
        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");

        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (UsidAndName == null || UsidAndName.isEmpty())
            UsidAndName = "";
        if (Usid == null || Usid.isEmpty())
            Usid = "";
        if (Name == null || Name.isEmpty())
            Name = "";
        if (District == null || District.isEmpty())
            District = "";

        psPumpingStationZy.setUsidAndName(UsidAndName);
        psPumpingStationZy.setUsid(Usid);
        psPumpingStationZy.setName(Name);
        psPumpingStationZy.setDistrict(District);


        pager = iSubject.listPsPumpingStationZyPage(psPumpingStationZy, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", psPumpingStationZy);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }


    /**
     * 分页查询水闸信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listpspmzy"})
    public String listPsPmZyPage(HttpServletRequest request) throws Exception {
        PsPmZy psPmZy = new PsPmZy();
        String UsidAndName = request.getParameter("UsidAndName");
        String Usid = request.getParameter("Usid");
        String Name = request.getParameter("Name");
        String District = request.getParameter("District");
        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");

        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (UsidAndName == null || UsidAndName.isEmpty())
            UsidAndName = "";
        if (Usid == null || Usid.isEmpty())
            Usid = "";
        if (Name == null || Name.isEmpty())
            Name = "";
        if (District == null || District.isEmpty())
            District = "";

        psPmZy.setUsidAndName(UsidAndName);
        psPmZy.setUsid(Usid);
        psPmZy.setName(Name);
        psPmZy.setDistrict(District);


        pager = iSubject.listPsPmZyPage(psPmZy, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", psPmZy);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }

    /**
     * 分页查询水闸信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listpssewagefarmzy"})
    public String listPsSewagefarmZyPage(HttpServletRequest request) throws Exception {
        PsSewagefarmZy psSewagefarmZy = new PsSewagefarmZy();
        String UsidAndName = request.getParameter("UsidAndName");
        String Usid = request.getParameter("Usid");
        String Name = request.getParameter("Name");
        String District = request.getParameter("District");
        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");

        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (UsidAndName == null || UsidAndName.isEmpty())
            UsidAndName = "";
        if (Usid == null || Usid.isEmpty())
            Usid = "";
        if (Name == null || Name.isEmpty())
            Name = "";
        if (District == null || District.isEmpty())
            District = "";

        psSewagefarmZy.setUsidAndName(UsidAndName);
        psSewagefarmZy.setUsid(Usid);
        psSewagefarmZy.setName(Name);
        psSewagefarmZy.setDistrict(District);


        pager = iSubject.listPsSewagefarmZyPage(psSewagefarmZy, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", psSewagefarmZy);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }

    /**
     * 分页查询水闸信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listpsspoutzy"})
    public String listPsSpoutZyPage(HttpServletRequest request) throws Exception {
        PsSpoutZy psSpoutZy = new PsSpoutZy();
        String UsidAndName = request.getParameter("UsidAndName");
        String UsidAndAddr = request.getParameter("UsidAndAddr");
        String Usid = request.getParameter("Usid");
        String Name = request.getParameter("Name");
        String Addr = request.getParameter("Addr");
        String District = request.getParameter("District");
        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");

        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (UsidAndName == null || UsidAndName.isEmpty())
            UsidAndName = "";
        if (Usid == null || Usid.isEmpty())
            Usid = "";
        if (Name == null || Name.isEmpty())
            Name = "";
        if (District == null || District.isEmpty())
            District = "";
        if (UsidAndAddr == null || UsidAndAddr.isEmpty())
            UsidAndAddr = "";
        if (Addr == null || Addr.isEmpty())
            Addr = "";

        psSpoutZy.setUsidAndName(UsidAndName);
        psSpoutZy.setUsidAndAddr(UsidAndAddr);
        psSpoutZy.setUsid(Usid);
        psSpoutZy.setName(Name);
        psSpoutZy.setDistrict(District);
        psSpoutZy.setAddr(Addr);

        pager = iSubject.listPsSpoutZyPage(psSpoutZy, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", psSpoutZy);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }

    /**
     * 分页查询水闸信息，并返回ContentResultForm对象
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping({"/listpswellzy"})
    public String listPsWellZyPage(HttpServletRequest request) throws Exception {
        PsWellZy psWellZy = new PsWellZy();
        String UsidAndName = request.getParameter("UsidAndName");
        String Usid = request.getParameter("Usid");
        String Name = request.getParameter("Name");
        String District = request.getParameter("District");
        String curPageStr = request.getParameter("curPage");
        String perPageCountStr = request.getParameter("perPageCount");

        int curPage = 0, perPageCount = 9999;
        if (curPageStr == null || curPageStr.isEmpty()) {
            curPageStr = "1";
        }

        if (perPageCountStr == null || perPageCountStr.isEmpty()) {
            perPageCountStr = "9999";
        }

        curPage = Integer.parseInt(curPageStr);
        perPageCount = Integer.parseInt(perPageCountStr);
        Pager pager = new Pager(curPage, perPageCount);

        if (UsidAndName == null || UsidAndName.isEmpty())
            UsidAndName = "";
        if (Usid == null || Usid.isEmpty())
            Usid = "";
        if (Name == null || Name.isEmpty())
            Name = "";
        if (District == null || District.isEmpty())
            District = "";

        psWellZy.setUsidAndName(UsidAndName);
        psWellZy.setUsid(Usid);
        psWellZy.setName(Name);
        psWellZy.setDistrict(District);


        pager = iSubject.listPsWellZyPage(psWellZy, pager);
        logger.debug("分页查询，过滤条件为{}，查询关键字为{}", psWellZy);
        return JsonUtils.toJson(new ContentResultForm<>(true, pager, "查询成功"));
    }

    @RequestMapping({"/getCombById/{Id}"})
    public String getCombById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List list = iSubject.getCombById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/getDraingateById/{Id}"})
    public String getDraingateById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List list = iSubject.getDraingateById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/getPipeById/{Id}"})
    public String getPipeById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List list = iSubject.getPipeById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/getPmById/{Id}"})
    public String getPmById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List list = iSubject.getPmById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/getPumpingStationById/{Id}"})
    public String getPumpingStationById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List list = iSubject.getPumpingStationById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/getSewagefarmById/{Id}"})
    public String getSewagefarmById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List list = iSubject.getSewagefarmById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/getSpoutById/{Id}"})
    public String getSpoutById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List list = iSubject.getSpoutById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/getWellById/{Id}"})
    public String getWellById(@PathVariable String Id) throws Exception {
        try {
            if (Common.isCheckNull(Id)) return null;
            List list = iSubject.getWellById(Id);
            Map map = new HashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", list != null && list.size() > 0 ? list.get(0) : null);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }
    @RequestMapping({"/getBlackSmellCount"})
    public String getBlackSmellCount(BlackSmellCount blackSmellCount) {
        List<BlackSmellCount> bsc = iSubject.getBlackSmellCount(blackSmellCount);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("list", bsc);
        return jsonObj.toString();
    }
    @RequestMapping({"/queryRainfallOneTimes"})
    public String queryRainfallOneTimes(StRealtimeDate stRealtimeDate) {
        List<Map<String, Object>> list = iSubject.queryRainfallOneTime(stRealtimeDate.getSearchStrat(), stRealtimeDate.getSearchEnd(), stRealtimeDate.getStcd());
        return JsonUtils.toJson(new ContentResultForm<>(true, list, "查询成功"));
    }
    @RequestMapping({"/getNewPptnData"})
    public List<StRealtimeDate> getNewPptnData(StRealtimeDate stRealtimeDate) {
    	List<StRealtimeDate> dataList  = iSubject.getNewPptnData(stRealtimeDate);
    	return dataList;
    }
    
    /**
     * 视频监控点
     * @return
     */
    @RequestMapping("/queryVideoPage")
    public String queryVideoPage(HttpServletRequest request, int curPage, int perPageCount) throws Exception {
    	Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.queryVideoPage(request, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
        
    }

    /**
     * 流域图列表信息查询
     * @return
     * @throws Exception
     */
    @RequestMapping("/listDrainageBasin")
    public String listDrainageBasin(HttpServletRequest req, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listDrainageBasin(req, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    /**
     * 流域图信息查询
     * @return
     * @throws Exception
     */
    @RequestMapping("/getDrainageBasin/{objectid}")
    public String getDrainageBasin(@PathVariable int objectid) throws Exception {
        try {
            if (Common.isCheckNull(objectid)) return null;
            Map<String, Object> drainageBasin = iSubject.getDrainageBasin(objectid);
            Map map = new LinkedHashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", drainageBasin);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/listIrrigate"})
    public String listIrrigate(String stcdnm, String sdate, String date, int curPage, int perPageCount) throws Exception {
        Page page = new Page(curPage, perPageCount);
        PageInfo<Irrigate> pageDate = iSubject.listIrrigate(stcdnm, sdate, date, page);
        return JsonUtils.toJson(new ContentResultForm<PageInfo<Irrigate>>(true, pageDate, "分页查询成功"));
    }

    @RequestMapping({"/listIrrigateInfo"})
    public String listIrrigateInfo(String stcdnm, int curPage, int perPageCount) throws Exception {
        Page page = new Page(curPage, perPageCount);
        PageInfo<Irrigate> pageDate = iSubject.listIrrigateInfo(stcdnm, page);
        return JsonUtils.toJson(new ContentResultForm<PageInfo<Irrigate>>(true, pageDate, "分页查询成功"));
    }

    @RequestMapping("/getIrrigateInfo/{stcd}")
    public String getIrrigateInfo(@PathVariable String stcd) throws Exception {
        try {
            if (Common.isCheckNull(stcd)) return null;
            Map<String, Object> drainageBasin = iSubject.getIrrigateInfo(stcd);
            Map map = new LinkedHashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", drainageBasin);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping({"/listXZQH"})
    public String listXZQH(String name, String xzq, String lvs, int curPage, int perPageCount) throws Exception {
        Page page = new Page(curPage, perPageCount);

        List<Integer> lvList = null;
        if(StringUtils.isNotEmpty(lvs)) {
            lvList = new ArrayList<>();
            for(String lv : lvs.split(",")) {
                lvList.add(Integer.parseInt(lv));
            }
        }
        PageInfo<XZQH> xzqhs = iSubject.listXZQH(name, xzq, lvList, page);
        return JsonUtils.toJson(new ContentResultForm(true, xzqhs, "分页查询成功"));
    }

    @RequestMapping("/getXZQH/{id}")
    public String getXZQH(@PathVariable String id) throws Exception {
        try {
            if (Common.isCheckNull(id)) return null;
            Map<String, Object> xzqh = iSubject.getXZQH(id);
            Map map = new LinkedHashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", xzqh);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping("/listInspection")
    public String listInspection(HttpServletRequest req, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listInspection(req, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    @RequestMapping("/getInspection/{projectid}")
    public String getInspection(@PathVariable String projectid) throws Exception {
        try {
            if (Common.isCheckNull(projectid)) return null;
            Map<String, Object> inspection = iSubject.getInspection(projectid);
            Map map = new LinkedHashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", inspection);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping("/listWell")
    public String listWell(HttpServletRequest req, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listWell(req, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    @RequestMapping("/getWell/{objectid}")
    public String getWell(@PathVariable int objectid) throws Exception {
        try {
            if (Common.isCheckNull(objectid)) return null;
            Map<String, Object> well = iSubject.getWell(objectid);
            Map map = new LinkedHashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", well);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping("/listFacility")
    public String listFacility(HttpServletRequest req, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listFacility(req, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    @RequestMapping("/getFacility/{objectid}")
    public String getFacility(@PathVariable int objectid) throws Exception {
        try {
            if (Common.isCheckNull(objectid)) return null;
            Map<String, Object> facility = iSubject.getFacility(objectid);
            Map map = new LinkedHashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", facility);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    // 供水管网水质信息列表查询
    @RequestMapping({"/listXwater"})
    public String listXwater(String stcdnm, String sdate, String date, int curPage, int perPageCount) throws Exception {
        Page page = new Page(curPage, perPageCount);
        PageInfo<Xwater> pageDate = iSubject.listXwater(stcdnm, sdate, date, page);
        return JsonUtils.toJson(new ContentResultForm<PageInfo<Xwater>>(true, pageDate, "分页查询成功"));
    }

    // 有毒气体信息列表查询
    @RequestMapping({"/listXgas"})
    public String listXgas(String stcdnm, String sdate, String date, int curPage, int perPageCount) throws Exception {
        Page page = new Page(curPage, perPageCount);
        PageInfo<Xgas> pageDate = iSubject.listXgas(stcdnm, sdate, date, page);
        return JsonUtils.toJson(new ContentResultForm<PageInfo<Xgas>>(true, pageDate, "分页查询成功"));
    }

    @RequestMapping("/getXwaterDevInfo/{id}")
    public String getXwaterDevInfo(@PathVariable Integer id) throws Exception {
        try {
            if (Common.isCheckNull(id)) return null;
            Map<String, Object> xwaterDevInfo = iSubject.getXwaterDevInfo(id);
            Map map = new LinkedHashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", xwaterDevInfo);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    @RequestMapping("/getXgasDevInfo/{devid}")
    public String getXgasDevInfo(@PathVariable String devid) throws Exception {
        try {
            if (Common.isCheckNull(devid)) return null;
            Map<String, Object> xgasDevInfo = iSubject.getXgasDevInfo(devid);
            Map map = new LinkedHashMap();
            map.put("success", true);
            map.put("message", "查询成功");
            map.put("content", xgasDevInfo);
            JsonMapper mapper = new JsonMapper(JsonInclude.Include.ALWAYS); //  返回所有字段(包括null)
            return mapper.toJson(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonUtils.toJson(new ResultForm(false, "查询失败！"));
    }

    // 供水管网水质信息列表查询  监测点
    @RequestMapping({"/listDevWater"})
    public String listDevWater(HttpServletRequest req, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listDevWater(req, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }

    // 有毒气体  监测点
    @RequestMapping({"/listToxicWater"})
    public String listToxicWater(HttpServletRequest req, int curPage, int perPageCount) throws Exception {
        Page<Map<String, Object>> page = new Page<Map<String, Object>>(curPage, perPageCount);
        PageInfo<Map<String, Object>> pageData = iSubject.listToxicWater(req, page);
        return JsonUtils.toJson(new ContentResultForm<>(true, pageData, "分页查询成功"));
    }
}
