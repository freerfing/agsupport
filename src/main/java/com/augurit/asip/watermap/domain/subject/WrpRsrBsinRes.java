package com.augurit.asip.watermap.domain.subject;

/**
 * 水库参数
 * 
 * @author czz825
 *
 */
public class WrpRsrBsinRes {
	
	
	public String getRscd() {
		return rscd;
	}
	public void setRscd(String rscd) {
		this.rscd = rscd;
	}
	public String getRsnm() {
		return rsnm;
	}
	public void setRsnm(String rsnm) {
		this.rsnm = rsnm;
	}
	public String getRscdnm() {
		return rscdnm;
	}
	public void setRscdnm(String rscdnm) {
		this.rscdnm = rscdnm;
	}
	public String getAddvcd() {
		return addvcd;
	}
	public void setAddvcd(String addvcd) {
		this.addvcd = addvcd;
	}
	public String getXzq() {
		return xzq;
	}
	public void setXzq(String xzq) {
		this.xzq = xzq;
	}	
	
	String rscd = ""; //水库编号
	String rsnm = ""; //水库编码
	String rscdnm = ""; //水库编号编码
	String addvcd = ""; //行政区域;
	String xzq = ""; //行政区域;
//	Integer objectid = 0; //主键
	
}
