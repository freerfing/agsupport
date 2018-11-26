package com.augurit.asip.watermap.sc.subject.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.augurit.asip.watermap.domain.layerEdit.BlackSmellCount;
import com.augurit.asip.watermap.domain.layerEdit.Huanbao;
import com.augurit.asip.watermap.domain.layerEdit.StFactory;
import com.augurit.asip.watermap.domain.layerEdit.StRealtimeDate;
import com.augurit.asip.watermap.domain.layerEdit.StWeather;
import com.augurit.asip.watermap.domain.subject.*;
import com.common.util.page.Pager;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

public interface ISubject {

    /**
     * 分页查询河道信息
     *
     * @param stRiverR
     * @param page
     * @return
     * @throws Exception
     */
    PageInfo<Map> listStRiverRPage(StRiverR stRiverR, Page page) throws Exception;

    /**
     * 查询水库水情数据列表(带分页)
     *
     * @return
     * @throws Exception
     */
    PageInfo<Map<String, Object>> listReservoirPage(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 根据id查询一个水库信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    Map getReservoirById(Integer id) throws Exception;

    /**
     * 分页查询雨情列表
     *
     * @param request
     * @param page
     * @return
     * @throws Exception
     */
    PageInfo<Map<String, Object>> listStPptnRPage(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 根据id查询一条降雨量信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    Map<String, Object> getStPptnRById(Integer id) throws Exception;

    /**
     * 查询过去一周的水库水位情况
     *
     * @param sbsj
     * @return
     * @throws Exception
     */
    List<Map> queryLastweekWaterStage(String sbsj, String zm) throws Exception;

    /**
     * 查询测站点近五天的降雨情况
     *
     * @param tm
     * @param stcd
     * @return
     * @throws Exception
     */
    List<Map> queryRecentRainfall(String tm, String stcd) throws Exception;

    /**
     * 查询各雨量范围的记录的条数
     *
     * @param request
     * @return
     * @throws Exception
     */
    Map<String, Object> queryRainfallRecordNum(HttpServletRequest request) throws Exception;

    /**
     * 查询一天24小时的雨量
     *
     * @param tm
     * @param stcd
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryRainfallOneDay(String tm, String stcd) throws Exception;

    /**
     * 查询一个时间段的雨量
     *
     * @param tm_s
     * @param tm_e
     * @param stcd
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryRainfallOneTime(String tm_s, String tm_e, String stcd) ;

    /**
     * 查看时段水库水位情况
     *
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryReservoirPeriod(HttpServletRequest request) throws Exception;

    /**
     * 分页查询设施表
     */
    PageInfo<Map<String, Object>> queryPsStbprpPage(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 查看泵站实时水位
     *
     * @param stcd
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryPumpDetail(String stcd) throws Exception;

    /**
     * 分页查询水闸设施表
     */
    PageInfo<Map<String, Object>> queryPsStbprpWasPage(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 查看水闸实时水位
     *
     * @param stcd
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryWasDetail(String stcd) throws Exception;

    /**
     * 查看水闸历史水位
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryWasHist(HttpServletRequest request) throws Exception;


    /**
     * 分页查询水文遥测站表
     */
    PageInfo<Map<String, Object>> waterremotedetect(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 分页查询智能水网站表
     */
    PageInfo<Map<String, Object>> smartwaternet(HttpServletRequest request,
                                                Page<Map<String, Object>> page);

    /**
     * 分页查询排水管网信息列表
     */
    PageInfo<Map<String, Object>> listStConduitchB(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 查询一天管网的 流速 和 水位
     */
    List<Map<String, Object>> queryDrainageDetailDay(String stcd, String tm) throws Exception;

    /**
     * 获取排水管网历史数据 maxt
     */
    List<Map<String, Object>> getDrainageHis(HttpServletRequest request) throws Exception;

    /**
     * 分页查询积水点列表
     */
    PageInfo<Map<String, Object>> getFloodPointList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 获取积水点历史数据
     */
    List<Map<String, Object>> getFloodPointHis(HttpServletRequest request) throws Exception;

    /**
     * 分页获取墒情站列表
     */
    PageInfo<Map<String, Object>> getMoistureList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 分页查询排水渠列表
     */
    PageInfo<Map<String, Object>> getdrainageCanalList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 获取排水渠历史数据
     */
    List<Map<String, Object>> getdrainageCanalHis(HttpServletRequest request) throws Exception;

    /**
     * 分页查询河流列表
     */
    PageInfo<Map<String, Object>> getRiverList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 获取河流历史数据
     */
    List<Map<String, Object>> getRiverHis(HttpServletRequest request) throws Exception;

    /**
     * 分页查询拦河坝列表
     */
    PageInfo<Map<String, Object>> getWeirList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 分页查询污水处理厂列表 实时
     */
    PageInfo<Map<String, Object>> listWasteWaterPlant(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;
    /**
     * 分页查询污水处理厂列表 日均
     * */
    PageInfo<Map<String,Object>> listWasteWaterPlantDay(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;
    /**
     * 分页查询黑臭水体列表
     */
    PageInfo<Map<String, Object>> getBlackSmellyWaterList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 查看水闸历史水位
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryWeirHist(HttpServletRequest request) throws Exception;

    /**
     * 查看泵站站上站下历史水位
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryPumpHist(HttpServletRequest request) throws Exception;

    /**
     * 查看黑臭水体历史监测项
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryItemHis(HttpServletRequest request) throws Exception;

    /**
     * 查看黑臭水体、污水处理厂 历史监测项  maxt
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryAllItemHis(HttpServletRequest request) throws Exception;
    /**
     * 查看 污水处理厂 历史监测项  日均值
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<Map<String,Object>> queryAllItemHisDay(HttpServletRequest request) throws Exception;
    /**
     * 查看河流
     *
     * @return
     * @throws Exception
     */
    Pager listRiversPage(SlgRv slgRv, Pager pager) throws Exception;

    /**
     * 查看35条黑臭河涌
     *
     * @return
     * @throws Exception
     */
    Pager listRiversPage_35(SlgRv slgRv, Pager pager) throws Exception;
    /**
     * 查看152条黑臭河涌
     *
     * @return
     * @throws Exception
     */
    Pager listRiversPage_152(SlgRv slgRv, Pager pager) throws Exception;
    /**
     * 查看187条黑臭河涌
     *
     * @return
     * @throws Exception
     */
    Pager listRiversPage_187(SlgRv slgRv, Pager pager) throws Exception;

    /**
     * 查看水闸
     *
     * @return
     * @throws Exception
     */
    Pager listGatesPage(WrpBluBsinGate wrpBluBsinGate, Pager pager) throws Exception;


    /**
     * 查看泵站
     *
     * @return
     * @throws Exception
     */
    Pager listPumpsPage(WrpIdsBsinPump wrpIdsBsinPump, Pager pager) throws Exception;

    /**
     * 查看湖泊
     *
     * @param slgLake
     * @return
     * @throws Exception
     */
    Pager listLakesPage(SlgLake slgLake, Pager pager) throws Exception;

    /**
     * 查看堤防
     *
     * @return
     * @throws Exception
     */
    Pager listDikesPage(WrpLevBsinDike wrpLevBsinDike, Pager pager) throws Exception;

    /**
     * 查看水库
     *
     * @return
     * @throws Exception
     */
    Pager listRessPage(WrpRsrBsinRes wrpRsrBsinRes, Pager pager) throws Exception;

    /**
     * 分页查询实时水情（遥测站）列表
     */
    PageInfo<Map<String, Object>> getRealtimeWaterList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 获取实时水情（遥测站）历史数据
     */
    List<Map<String, Object>> getRealtimeWaterHis(HttpServletRequest request) throws Exception;

    /**
     * 分页查询环保局水质公示
     */
    PageInfo<Map<String, Object>> getHuanbaoList(HttpServletRequest request, Page<Map<String, Object>> page) throws Exception;

    /**
     * 环保局水质公示-近六个月趋势
     */
    List<Map<String, Object>> getHuanbao6MonthHis(HttpServletRequest request) throws Exception;

    /**
     * 水质监测站
     *
     * @param wqWqsinfB
     * @return
     * @throws Exception
     */
    Pager listWqsinfBPage(WqWqsinfB wqWqsinfB, Pager pager) throws Exception;

    /**
     * 测站点分页
     */
    Pager listStStbprpBPage(StStbprpB stStbprpB, Pager pager) throws Exception;

    public void updateRiverData(WrpRvrBsin rvrBsin) throws Exception;

    public void updateLakeData(WrpLakBsin lakBsin) throws Exception;

    public void updateRessData(WrpRsrBsin rsrBsin) throws Exception;

    public void updateGatesData(WrpSluBsin sluBsin) throws Exception;

    public void updatePumpsData(WrpIdsBsin idsBsin) throws Exception;

    public List<WrpSluBsin> getGatesById(String Id) throws Exception;

    public List<WrpIdsBsin> getPumpsById(String Id) throws Exception;

    public void updateWaterQuality(WqWqsinfB wqWqsinfB) throws Exception;

    public List<WqWqsinfB> getWaterQualityById(String Id, String type) throws Exception;

    List<StStbprpB> getStationByStcdAndSttp(String stcd, String sttp) throws Exception;

    void updateStation(StStbprpB stStbprpB);

    public List<WrpLevBsin> getDikeById(String Id);

    public void updateDike(WrpLevBsin wrpLevBsin) throws Exception;

    public List<StRealtimeDate> findAllList(StRealtimeDate stRealtimeDate);

    public int getDePlusCount(StRealtimeDate stRealtimeDate);

    public List<Huanbao> findHechongList();

    public int getHechongCount();

    /**
     * 雨水口
     *
     * @return
     * @throws Exception
     */
    Pager listPsCombZyPage(PsCombZy psCombZy, Pager pager) throws Exception;

    /**
     * 水闸
     *
     * @return
     * @throws Exception
     */
    Pager listPsDraingateZyPage(PsDraingateZy psDraingateZy, Pager pager) throws Exception;

    /**
     * 查看河流
     *
     * @return
     * @throws Exception
     */
    Pager listPsPipeZyPage(PsPipeZy psPipeZy, Pager pager) throws Exception;

    /**
     * 查看河流
     *
     * @return
     * @throws Exception
     */
    Pager listPsPumpingStationZyPage(PsPumpingStationZy psPumpingStationZy, Pager pager) throws Exception;

    /**
     * 查看河流
     *
     * @return
     * @throws Exception
     */
    Pager listPsPmZyPage(PsPmZy psPmZy, Pager pager) throws Exception;

    /**
     * 污水处理厂
     *
     * @return
     * @throws Exception
     */
    Pager listPsSewagefarmZyPage(PsSewagefarmZy psSewagefarmZy, Pager pager) throws Exception;

    /**
     * 排放口
     *
     * @return
     * @throws Exception
     */
    Pager listPsSpoutZyPage(PsSpoutZy psSpoutZy, Pager pager) throws Exception;

    /**
     * 排放口
     *
     * @return
     * @throws Exception
     */

    Pager listPsWellZyPage(PsWellZy psWellZy, Pager pager) throws Exception;


    public String getInputFull(StRealtimeDate stRealtimeDate);

    public List<StRealtimeDate> findHistList(StRealtimeDate stRealtimeDate);


    int getWeatherCount(String data);

    String getWeather(String data);

    void saveStWeather(StWeather stWeather);

    public List<StFactory> findStFactoryList(StFactory stFactory);
    
    public List<StFactory> findBlackSmellyList();

    public int getStFactoryCount();

    List<StRealtimeDate> findAllListByPage(StRealtimeDate stRealtimeDate, int page, int rows);

    List<StRealtimeDate> findAllHistListByPage(StRealtimeDate stRealtimeDate, int page, int rows);

    /**
     * 获取雨量的实时数据
     *
     * @return
     */
    List<StRealtimeDate> getStPptnList();
    /**
     * 获取雨量的实时数据大于50的站点
     *
     * @return
     */
    List<StRealtimeDate> listYLByTime(String startTime,String endTime);
    /**
     * 获取水库的实时数据
     *
     * @return
     */
    List<StRealtimeDate> getStRsvrList(StRealtimeDate stRealtimeDate);

    /**
     * 获取江河的实时数据
     *
     * @return
     */
    List<StRealtimeDate> getStRiverList();

    public List getCombById(String Id) throws Exception;

    public List getDraingateById(String Id) throws Exception;

    public List getPipeById(String Id) throws Exception;

    public List getPmById(String Id) throws Exception;

    public List getPumpingStationById(String Id) throws Exception;

    public List getSewagefarmById(String Id) throws Exception;

    public List getSpoutById(String Id) throws Exception;

    public List getWellById(String Id) throws Exception;


    /**
     * echarts展示图标信息的
     * @param stRealtimeDate
     * @return
     */
    List<StRealtimeDate> findAllHistListByPageChartS(StRealtimeDate stRealtimeDate);

    /**
     * 环保局河涌水质,获取每个测站最新的数据用来展示
     *bhs 弹出层的分页用的 @author bhs
     * @return
     */
    List<Huanbao> findListHechongPage(Huanbao huanbao, int page, int rows);

    /**
     * @author bhs
     * 显示相关水质的树形图
     * @param huanbao
     * @return
     */
    String getInputFullSZ(Huanbao huanbao);

    /**
     * 河涌水质的历史数据
     * bhs 分页
     * @param huanbao
     * @param page
     * @param rows
     * @return
     */
    List<Huanbao> findAllListSZByPage(Huanbao huanbao, int page, int rows);

    /**
     * 河涌水质的历史数据   总条数
     * bhs
     * @param huanbao
     * @return
     */
    List<Huanbao> findAllSZList(Huanbao huanbao);

    /**
     * 监测点的数据根据选择时间查询所有当天的数据 水质河涌
     * BHS
     * @return
     */
    List<Huanbao> findAllHistListByPageChartSSZ(Huanbao huanbao);

    /**
     * 污水处理厂的数据用来展示
     *bhs 弹出层的分页用的 @author bhs
     * @return
     */
    List<StFactory> findStFactoryRealPage(StFactory stFactory, int page, int rows);

    List<StFactory> findStFactoryRealList(StFactory stFactory);

    /**
     * @author bhs 污水处理厂
     * 拼接json树
     */
    String getInputFullWSCLC(StFactory stfactory);

    /**
     * 污水处理厂的历史数据
     * bhs
     * @param stFactory
     * @param page
     * @param rows
     * @return
     */
    List<StFactory> findAllListWSCLCByPage(StFactory stFactory, int page, int rows);

    List<StFactory> findAllWSCLCList(StFactory stFactory);

    List<StFactory> findAllHistListByPageChartSWSCLC(StFactory stFactory);
    /**
     * 黑臭水体的黑臭程度及数量
     * @param blackSmellCount
     * @return
     */
    List<BlackSmellCount> getBlackSmellCount(BlackSmellCount blackSmellCount);

	List<StRealtimeDate> getCharQM(StRealtimeDate stRealtimeDate);
	List<StRealtimeDate> getHongChongEcharts(StRealtimeDate stRealtimeDate);

	List<StFactory> getWuShuiEcharts(StFactory stFactory);

	List<StRealtimeDate> getNewPptnData(StRealtimeDate stRealtimeDate);

	List<StFactory> findStFactoryRealPageAll(StFactory stFactory);

	String getTreeJson(StRealtimeDate stRealtimeDate);

	String getTreeJsonSZ(Huanbao huanbao);

	String getTreeJsonWSCLC(StFactory stFactory);

	PageInfo<Map<String, Object>> queryVideoPage(HttpServletRequest request,Page<Map<String, Object>> page);

    PageInfo<Map<String, Object>> listDrainageBasin(HttpServletRequest request,Page<Map<String, Object>> page);

    Map<String, Object> getDrainageBasin(int objectid);

    PageInfo<Irrigate> listIrrigate(String stcdnm, String sdate, String date, Page page);
    PageInfo<Irrigate> listIrrigateInfo(String stcdnm, Page page);
    Map<String, Object> getIrrigateInfo(String stcd);

	PageInfo<XZQH> listXZQH(String name, String xzq, List<Integer> lvs, Page page);

    Map<String,Object> getXZQH(String id);

    PageInfo<Map<String, Object>> listInspection(HttpServletRequest request,Page<Map<String, Object>> page);
    Map<String, Object> getInspection(String projectid);
    PageInfo<Map<String, Object>> listWell(HttpServletRequest request,Page<Map<String, Object>> page);
    Map<String, Object> getWell(int objectid);
    PageInfo<Map<String, Object>> listFacility(HttpServletRequest request,Page<Map<String, Object>> page);
    Map<String, Object> getFacility(int objectid);

    // 供水管网水质信息列表查询
    PageInfo<Xwater> listXwater(String stcdnm, String sdate, String date, Page page);
    PageInfo<Xgas> listXgas(String stcdnm, String sdate, String date, Page page);

    PageInfo<Map<String, Object>> listDevWater(HttpServletRequest request,Page<Map<String, Object>> page);
    PageInfo<Map<String, Object>> listToxicWater(HttpServletRequest request,Page<Map<String, Object>> page);

	Map<String,Object> getXwaterDevInfo(Integer id);
	Map<String,Object> getXgasDevInfo(String devid);
}
