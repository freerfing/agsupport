package com.augurit.asip.watermap.domain.subject;

/**
 * 湖泊参数
 * 
 * @author czz825
 *
 */
public class SlgLake {
	
	
	
	public String getLkcd() {
		return lkcd;
	}
	public void setLkcd(String lkcd) {
		this.lkcd = lkcd;
	}
	public String getLknm() {
		return lknm;
	}
	public void setLknm(String lknm) {
		this.lknm = lknm;
	}
	
	public String getLkcdnm() {
		return lkcdnm;
	}
	public void setLkcdnm(String lkcdnm) {
		this.lkcdnm = lkcdnm;
	}
	public Integer getObjectid() {
		return objectid;
	}
	public void setObjectid(Integer objectid) {
		this.objectid = objectid;
	}	
	public String getXzq() {
		return xzq;
	}
	public void setXzq(String xzq) {
		this.xzq = xzq;
	}	

	String lkcd = ""; //湖泊编号
	String lknm = ""; //湖泊名称
	String lkcdnm = ""; //湖泊编号名称
	String xzq = ""; //行政区

	Integer objectid = 0; //主键
}
