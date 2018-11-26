package com.augurit.asip.watermap.domain.layerEdit;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

/**
 * 污水处理厂进出口信息
 * @author huangzhonggan
 *
 */
public class StFactory {
	private String stnm;//名称
	private String stcd;//测站编码
	private String addvcd;//区域
	private Date spt;//监测时间 
	private Float nh3n;//氨氮
	private Float tp;//总磷 
	private Float dox;//溶解氧
	private Float redox;//氧化还原电位
	private Float envt;//环境温度
	private Float humid;//湿度
	private Float clar_ity;//透明度
	private Float tn;//总氮
	private Float ph;//pH值 
	private Float ss;//悬浮物 
	private Float q2;//水流量 
	private Float codcr;//化学需氧量 
	private String water_quality;//水质级别
	private String black_Smelly;//水质黑臭级别
	private String sptDate;
	private String sttp;
	private String searchStrat ;
	private String searchEnd;
	private String startTime;
	private String endTime;
	private  String timeDate;
	private String type;
	private List<DataTime> dataList;
	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	
	public String getWater_quality() {
		return water_quality;
	}
	public void setWater_quality(String water_quality) {
		this.water_quality = water_quality;
	}
	public String getBlack_Smelly() {
		return black_Smelly;
	}
	public void setBlack_Smelly(String black_Smelly) {
		this.black_Smelly = black_Smelly;
	}
	public Float getDox() {
		return dox;
	}
	public void setDox(Float dox) {
		this.dox = dox;
	}
	public Float getRedox() {
		return redox;
	}
	public void setRedox(Float redox) {
		this.redox = redox;
	}
	public Float getEnvt() {
		return envt;
	}
	public void setEnvt(Float envt) {
		this.envt = envt;
	}
	public Float getHumid() {
		return humid;
	}
	public void setHumid(Float humid) {
		this.humid = humid;
	}
	public Float getClar_ity() {
		return clar_ity;
	}
	public void setClar_ity(Float clar_ity) {
		this.clar_ity = clar_ity;
	}
	public SimpleDateFormat getDf() {
		return df;
	}
	public void setDf(SimpleDateFormat df) {
		this.df = df;
	}
	public String getStnm() {
		return stnm;
	}
	public void setStnm(String stnm) {
		this.stnm = stnm;
	}
	public String getStcd() {
		return stcd;
	}
	public void setStcd(String stcd) {
		this.stcd = stcd;
	}
	public String getAddvcd() {
		return addvcd;
	}
	public void setAddvcd(String addvcd) {
		if(StringUtils.isNotBlank(addvcd)){
			if(addvcd.equals("440103")){
				addvcd = "荔湾区";
			}else if(addvcd.equals("440104")){
				addvcd = "越秀区";
			}else if(addvcd.equals("440105")){
				addvcd = "海珠区";
			}else if(addvcd.equals("440106")){
				addvcd = "天河区";
			}else if(addvcd.equals("440111")){
				addvcd = "白云区";
			}else if(addvcd.equals("440112")){
				addvcd = "黄埔区";
			}else if(addvcd.equals("440113")){
				addvcd = "番禺区";
			}else if(addvcd.equals("440114")){
				addvcd = "花都区";
			}else if(addvcd.equals("440115")){
				addvcd = "南沙区";
			}else if(addvcd.equals("440183")){
				addvcd = "增城区";
			}else if(addvcd.equals("440184")){
				addvcd = "从化区";
			}
		}
		this.addvcd = addvcd;
	}
	public Date getSpt() {
		return spt;
	}
	public void setSpt(Date spt) {
		this.sptDate= df.format(spt);
		this.spt = spt;
	}
	public Float getNh3n() {
		return nh3n;
	}
	public void setNh3n(Float nh3n) {
		this.nh3n = nh3n;
	}
	public Float getTp() {
		return tp;
	}
	public void setTp(Float tp) {
		this.tp = tp;
	}
	public Float getTn() {
		return tn;
	}
	public void setTn(Float tn) {
		this.tn = tn;
	}
	public Float getPh() {
		return ph;
	}
	public void setPh(Float ph) {
		this.ph = ph;
	}
	public Float getSs() {
		return ss;
	}
	public void setSs(Float ss) {
		this.ss = ss;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Float getQ2() {
		return q2;
	}
	public String getSptDate() {
		return sptDate;
	}
	public void setSptDate(String sptDate) {
		this.sptDate = sptDate;
	}
	public void setQ2(Float q2) {
		this.q2 = q2;
	}
	public Float getCodcr() {
		return codcr;
	}
	public void setCodcr(Float codcr) {
		this.codcr = codcr;
	}
	public String getSttp() {
		return sttp;
	}
	public void setSttp(String sttp) {
		this.sttp = sttp;
	}


	public String getSearchStrat() {
		return searchStrat;
	}

	public void setSearchStrat(String searchStrat) {
		this.searchStrat = searchStrat;
	}

	public String getSearchEnd() {
		return searchEnd;
	}

	public void setSearchEnd(String searchEnd) {
		this.searchEnd = searchEnd;
	}


	public String getTimeDate() {
		return timeDate;
	}

	public void setTimeDate(String timeDate) {
		this.timeDate = timeDate;
	}
	public List<DataTime> getDataList() {
		return dataList;
	}
	public void setDataList(List<DataTime> dataList) {
		this.dataList = dataList;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
}
