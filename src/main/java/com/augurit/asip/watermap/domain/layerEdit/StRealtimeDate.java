package com.augurit.asip.watermap.domain.layerEdit;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 实时的数据,存储最新的数据.
 * @author Administrator
 *
 */
public class StRealtimeDate {
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
	private Date tm;
	private Float newdata;//最新数据
	private String stcd;//测站编码
	private Float fsltdz;//汛限值
	private String sttp;//类型
	private String stnm;
	private Float lastTimeMaxData;//上次超过警戒线的积水深度
	private Date lastTime;//上次积水
	private Float maxData;//历史最深积水
	private String addvcd;
	private Float rz;//这是水库水位
	private Float z;//这是江河水位
	private Float drp;//雨量数据值
	private String histTbleName;//历史数据表名称
	private String wptn;//看水情的涨势,落4,涨5,平 6
	private Float x;
	private Float y;
	protected Float sumData;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Timestamp time;
	private int tatol;
	//用来查询历史表数据的时间字段
	private String  searchStrat;
	private String searchEnd;

	private String timeDate;//当前时间
	private String searchStratPuctureT;//时间查询一天的信息
	private List<DataTime> dataList;
	
	public List<DataTime> getDataList() {
		return dataList;
	}
	public void setDataList(List<DataTime> dataList) {
		this.dataList = dataList;
	}
	public String getWptn() {
		return wptn;
	}
	public void setWptn(String wptn) {
		this.wptn = wptn;
	}
	public String getStnm() {
		return stnm;
	}
	public void setStnm(String stnm) {
		this.stnm = stnm;
	}
	public Date getTm() {
		return tm;
	}
	public void setTm(Date tm) {
		this.tm = tm;
	}
	public Float getNewdata() {
		return newdata;
	}
	public void setNewdata(Float newdata) {
		this.newdata = newdata;
	}
	public String getStcd() {
		return stcd;
	}
	public void setStcd(String stcd) {
		this.stcd = stcd;
	}
	public Float getFsltdz() {
		return fsltdz;
	}
	public void setFsltdz(Float fsltdz) {
		this.fsltdz = fsltdz;
	}
	public String getSttp() {
		return sttp;
	}
	public void setSttp(String sttp) {
		this.sttp = sttp;
	}
	public Float getOlddata() {
		return olddata;
	}
	public void setOlddata(Float olddata) {
		this.olddata = olddata;
	}
	public Float getDeplus() {
		return deplus;
	}
	public void setDeplus(Float deplus) {
		this.deplus = deplus;
	}
	private Float olddata;
	private Float deplus;
	public Float getLastTimeMaxData() {
		return lastTimeMaxData;
	}
	public void setLastTimeMaxData(Float lastTimeMaxData) {
		this.lastTimeMaxData = lastTimeMaxData;
	}
	public Date getLastTime() {
		return lastTime;
	}
	public void setLastTime(Date lastTime) {
		this.lastTime = lastTime;
	}
	public Float getMaxData() {
		return maxData;
	}
	public void setMaxData(Float maxData) {
		this.maxData = maxData;
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

	public Float getRz() {
		return rz;
	}

	public void setRz(Float rz) {
		this.rz = rz;
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
		this.searchEnd =searchEnd;
	}


	public String getHistTbleName() {
		return histTbleName;
	}

	public void setHistTbleName(String histTbleName) {
		this.histTbleName = histTbleName;
	}

	public Float getZ() {
		return z;
	}

	public void setZ(Float z) {
		this.z = z;
	}

	public Float getDrp() {
		return drp;
	}

	public void setDrp(Float drp) {
		this.drp = drp;
	}


	public String getTimeDate() {
		return timeDate;
	}

	public void setTimeDate(String timeDate) {
		this.timeDate = timeDate;
	}

	public String getSearchStratPuctureT() {
		return searchStratPuctureT;
	}

	public void setSearchStratPuctureT(String searchStratPuctureT) {
		this.searchStratPuctureT = searchStratPuctureT;
	}


	public int getTatol() {
		return tatol;
	}

	public void setTatol(int tatol) {
		this.tatol = tatol;
	}
	public Float getX() {
		return x;
	}
	public void setX(Float x) {
		this.x = x;
	}
	public Float getY() {
		return y;
	}
	public void setY(Float y) {
		this.y = y;
	}
	public Timestamp getTime() {
		return time;
	}
	public void setTime(Timestamp time) {
		this.time = time;
	}
	public Float getSumData() {
		return sumData;
	}
	public void setSumData(Float sumData) {
		this.sumData = sumData;
	}
}
