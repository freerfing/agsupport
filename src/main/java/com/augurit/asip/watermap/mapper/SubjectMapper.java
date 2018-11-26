package com.augurit.asip.watermap.mapper;

import java.util.List;
import java.util.Map;

import com.augurit.asip.watermap.domain.subject.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.augurit.asip.watermap.domain.layerEdit.BlackSmellCount;
import com.augurit.asip.watermap.domain.layerEdit.DataTime;
import com.augurit.asip.watermap.domain.layerEdit.Huanbao;
import com.augurit.asip.watermap.domain.layerEdit.StFactory;
import com.augurit.asip.watermap.domain.layerEdit.StRealtimeDate;
import com.augurit.asip.watermap.domain.layerEdit.StWeather;
import com.github.pagehelper.Page;

/**
 * Created by ac on 2017-07-20.
 */
@Mapper
public interface SubjectMapper {

    /**
     * 根据序列名获取当前序列号
     *
     * @param seqName
     * @return
     * @throws Exception
     */
    @Select("select ${seqName}.currval from dual")
    Integer getSeqBySeqName(String seqName) throws Exception;

    List<StRiverR> listStRiverRPage(StRiverR stRiverR) throws Exception;

    /**
     * 分页查询水库水情列表(带上测站x,y)
     */
    List<Map<String, Object>> listReservoirPage(Map<String, Object> map) throws Exception;

    /**
     * 根据id获取水库信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    Map getReservoirById(@Param("id") Integer id) throws Exception;

    /**
     * 分页查询雨情列表
     *
     * @param map
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> listStPptnRPage(Map<String, Object> map) throws Exception;

    /**
     * 根据id查询一条降雨量信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    Map<String, Object> getStPptnRById(@Param("id") Integer id) throws Exception;

    /**
     * 查询过去一周的水库水位情况
     *
     * @param map
     * @return
     * @throws Exception
     */
    List<Map> queryLastweekWaterStage(Map<String, Object> map) throws Exception;

    /**
     * 查询测站点近五天的降雨情况
     *
     * @param map
     * @return
     * @throws Exception
     */
    List<Map> queryRecentRainfall(Map<String, Object> map) throws Exception;

    /**
     * 查询各雨量范围的记录的条数
     *
     * @param map
     * @return
     * @throws Exception
     */
    Map<String, Object> queryRainfallRecordNum(Map<String, Object> map) throws Exception;

    /**
     * 查询一天24小时的雨量
     *
     * @param map
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryRainfallOneDay(Map<String, Object> map) throws Exception;

    /**
     * 查询一个时间段的雨量
     *
     * @param map
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryRainfallOneTime(Map<String, Object> map) throws Exception;

    /**
     * 查看时段水库水位情况
     *
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryReservoirPeriod(Map<String, Object> map) throws Exception;

    /**
     * 分页查询设施表
     *
     * @param map
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryFacilities(Map<String, Object> map) throws Exception;

    /**
     * 查看时段水库水位情况
     *
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryPumpDetail(@Param("stcd") String stcd) throws Exception;

    /**
     * 分页查询堰闸列表
     *
     * @param map
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryPsStbprpWasPage(Map<String, Object> map) throws Exception;
    /**
     * 分页查询泵站列表
     *
     * @param map
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryPsStbprpPage(Map<String, Object> map) throws Exception;
    /**
     * 查看实时水闸水位情况
     *
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryWasDetail(@Param("stcd") String stcd) throws Exception;

    /**
     * 查看历史水闸水位情况
     *
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryWasHist(Map<String, Object> map) throws Exception;

    /**
     * 分页查询水文遥测表
     *
     * @param map
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> querywaterremotedetectDetail(Map<String, Object> map) throws Exception;

    /**
     * 分页查询智能水网站表
     *
     * @return
     * @throws Exception
     */
    Page<Map<String, Object>> smartwaternet(Map<String, Object> paramMap);

    /**
     * 分页查询排水管网信息列表
     */
    List<Map<String, Object>> listStConduitchB(Map<String, Object> map) throws Exception;

    /**
     * 查询一天管网的 流速 和 水位
     */
    List<Map<String, Object>> queryDrainageDetailDay(Map<String, Object> map) throws Exception;

    /**
     * 获取排水管网历史数据 maxt
     */
    List<Map<String, Object>> getDrainageHis(Map<String, Object> map) throws Exception;

    /**
     * 分页查询积水点列表
     */
    List<Map<String, Object>> getFloodPointList(Map<String, Object> map) throws Exception;

    /**
     * 获取积水点历史数据
     */
    List<Map<String, Object>> getFloodPointHis(Map<String, Object> map) throws Exception;

    /**
     * 分页获取墒情站列表
     */
    List<Map<String, Object>> getMoistureList(Map<String, Object> map) throws Exception;

    /**
     * 分页查询排水渠列表
     */
    List<Map<String, Object>> getdrainageCanalList(Map<String, Object> map) throws Exception;

    /**
     * 获取排水渠历史数据
     */
    List<Map<String, Object>> getdrainageCanalHis(Map<String, Object> map) throws Exception;

    /**
     * 分页查询河流列表
     */
    List<Map<String, Object>> getRiverList(Map<String, Object> map) throws Exception;

    /**
     * 获取河流历史数据
     */
    List<Map<String, Object>> getRiverHis(Map<String, Object> map) throws Exception;

    /**
     * 分页查询拦河坝列表
     */
    List<Map<String, Object>> getWeirList(Map<String, Object> map) throws Exception;

    /**
     * 分页查询黑臭水体列表
     */
    List<Map<String, Object>> getBlackSmellyWaterList(Map<String, Object> map) throws Exception;
     /**
     * 分页查询污水处理厂列表--实时
     */
    List<Map<String, Object>> listWasteWaterPlant(Map<String, Object> map) throws Exception;
    /**
     * 分页查询污水处理厂列表--日均
     */
    List<Map<String, Object>> listWasteWaterPlantDay(Map<String, Object> map) throws Exception;

    /**
     * 查看拦河坝历史水闸水位情况
     *
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryWeirHist(Map<String, Object> map) throws Exception;

    /**
     * 查看泵站站上站下历史水位
     *
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryPumpHist(Map<String, Object> map) throws Exception;

    /**
     * 查看黑臭水体历史监测项
     *
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryItemHis(Map<String, Object> map) throws Exception;

    /**
     *  查看黑臭水体、污水处理厂 历史监测项  maxt
     *
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> queryAllItemHis(Map<String, Object> map) throws Exception;
    List<Map<String, Object>> queryAllItemHisDay(Map<String, Object> paramMap) throws Exception;
    /**
     * 分页查询实时水情（遥测站）列表
     */
    List<Map<String, Object>> getRealtimeWaterList(Map<String, Object> map) throws Exception;

    /**
     * 获取实时水情（遥测站）历史数据
     */
    List<Map<String, Object>> getRealtimeWaterHis(Map<String, Object> map) throws Exception;

    /**
     * 分页查询环保局水质公示
     */
    List<Map<String, Object>> getHuanbaoList(Map<String, Object> map) throws Exception;
    /**
     * 环保局水质公示-近六个月趋势
     */
    List<Map<String, Object>> getHuanbao6MonthHis(Map<String, Object> map) throws Exception;
    /**
     * 获取各测站的实时数据
     */
	List<StRealtimeDate> findAllList(StRealtimeDate stRealtimeDate);

	int getDePlusCount(StRealtimeDate stRealtimeDate);
	/**
	 * 获取河涌的水质数据
	 */
    List<Huanbao> findHechongList();
	
    int getHechongCount();
    
	String getAreaName(String stcd);

	int getWeatherCount(String data);


    List<StRealtimeDate> getAddvcd(StRealtimeDate timeDate);

    List<StRealtimeDate> findChild(StRealtimeDate stRealtimeDate);
    List<StRealtimeDate> getHongChongEcharts(StRealtimeDate stRealtimeDate);

    List<StRealtimeDate> findHistList(StRealtimeDate stRealtimeDate);

	String getWeather(String data);

	void saveStWeather(StWeather stWeather);
	 /**
     * 获取污水处理厂进出口数据
     */
    List<StFactory> findStFactoryList(StFactory stFactory);
    
    List<StFactory> findBlackSmellyList();
	
    int getStFactoryCount();

    List<StRealtimeDate> findAllListByPage(Map<String, Object> map);

    List<StRealtimeDate> findAllHistListByPage(Map<String, Object> map);
    /**
   	 * 获取雨量的实时数据
   	 * @return
   	 */
   	List<StRealtimeDate> getStPptnList();
   	/**
   	 * 获取水库的实时数据
   	 * @return
   	 */
   	List<StRealtimeDate> getStRsvrList(StRealtimeDate stRealtimeDate);
   	/**
   	 * 获取江河的实时数据
   	 * @return
   	 */
   	List<StRealtimeDate> getStRiverList(StRealtimeDate stRealtimeDate);

    List<StRealtimeDate> findAllHistListByPageChartS(Map map);


    /**
     * 环保局河涌水质,获取每个测站最新的数据用来展示  实时
     *bhs 弹出层的分页用的 @author bhs
     * @return
     */
    List<Huanbao> findListHechongPage(Map<String, Object> map);

    /**
     * 获取水质选择的行政树形图
     * bhs
     * @param huanbao
     * @return
     */
    List<Huanbao> huoQuSZXZTree(Huanbao huanbao);

    /**
     * 获取水质选择的行政树形图 子选项
     * bhs
     * @return
     */
    List<Huanbao> findChildSZ(Huanbao huanbaoDate);

    /**
     * 河涌水质的历史数据
     * bhs 分页查询
     * @param map
     * @return
     */
    List<Huanbao> findAllListSZByPage(Map<String, Object> map);

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
    List<Huanbao> findAllHistListByPageChartSSZ(Map<String, Object> map);

    /**
     * 污水处理厂的数据用来展示
     *bhs 弹出层的分页用的 @author bhs
     * @return
     */
    List<StFactory> findStFactoryRealPage(Map<String, Object> map);


    /**
     * 污水处理厂的实时数据   总条数
     * bhs
     * @param stFactory
     * @return
     */
    List<StFactory> findAllRealWSCLCList(StFactory stFactory);

    List<StFactory> huoQuWSCLCXZTree(StFactory stFactory);

    List<StFactory> findChildWSCLC(StFactory stFactory);

    /**
     * 污水处理厂的历史数据
     * bhs
     * @return
     */
    List<StFactory> findAllListWSCLCByPage(Map<String, Object> map);

    List<StFactory> findAllWSCLCList(StFactory stFactory);

    List<StFactory> findAllHistListByPageChartSWSCLC(Map<String, Object> map);
    /**
     * 黑臭水体的黑臭程度及数量
     * @param blackSmellCount
     * @return
     */
    List<BlackSmellCount> getBlackSmellCount(BlackSmellCount blackSmellCount);

	List<DataTime> getDataTime(StRealtimeDate stRealtimeDate);
	List<DataTime> getHechongDataTime(StRealtimeDate stRealtimeDate);

	/**
	 * 获取氨氮,总磷,总氮,含氧量的
	 * @param stFty
	 * @return
	 */
	List<DataTime> getWndList(StFactory stFactory);
	/**
	 * 获取PH,悬浮物的
	 * @param stFactory
	 * @return
	 */
	List<DataTime> getWpdList(StFactory stFactory);
	/**
	 * 获取水流量的
	 * @param stFactory
	 * @return
	 */
	List<DataTime> getWhdList(StFactory stFactory);

	List<StFactory> getWwbName(StFactory stFactory);

    List<StRealtimeDate> listYLByTime(@Param("start") String startTime,@Param("end") String endTime);

	List<StRealtimeDate> getNewPptnData(StRealtimeDate stRealtimeDate);

	List<StFactory> findStFactoryRealPageNew(Map<String, Object> map);

	List<StFactory> findStFactoryRealPageNewAll(Map<String, Object> map);

	Page<Map<String, Object>> queryVideo(Map<String, Object> paramMap);

	Page<Map<String, Object>> listDrainageBasin(Map<String, Object> paramMap);

	Map<String, Object> getDrainageBasin(@Param("objectid") int objectid);

    Page<Irrigate> listIrrigate(@Param("stcdnm") String stcdnm, @Param("sdate") String sdate, @Param("date") String date);
    Page<Irrigate> listIrrigateInfo(@Param("stcdnm") String stcdnm);
    Map<String, Object> getIrrigateInfo(@Param("stcd") String stcd);

	Map<String,Object> getXZQH(@Param("id") String id);

	Page<XZQH> listXZQH(@Param("name") String name, @Param("xzq") String xzq, @Param("lvs") List<Integer> lvs);

    Page<Map<String, Object>> listInspection(Map<String, Object> paramMap);

    Map<String, Object> getInspection(@Param("projectid") String projectid);

    Page<Map<String, Object>> listWell(Map<String, Object> paramMap);

    Map<String, Object> getWell(@Param("objectid") int objectid);

    Page<Map<String, Object>> listFacility(Map<String, Object> paramMap);

    Map<String, Object> getFacility(@Param("objectid") int objectid);

    Page<Xwater> listXwater(@Param("stcdnm") String stcdnm, @Param("sdate") String sdate, @Param("date") String date);
    Page<Xgas> listXgas(@Param("stcdnm") String stcdnm, @Param("sdate") String sdate, @Param("date") String date);

    Page<Map<String, Object>> listDevWater(Map<String, Object> paramMap);
    Page<Map<String, Object>> listToxicWater(Map<String, Object> paramMap);


	Map<String,Object> getXwaterDevInfo(@Param("id") Integer id);
	Map<String,Object> getXgasDevInfo(@Param("devid") String devid);

}
