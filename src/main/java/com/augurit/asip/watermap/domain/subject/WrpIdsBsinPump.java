package com.augurit.asip.watermap.domain.subject;

/**
 * 泵站参数
 * 
 * @author czz825
 *
 */
public class WrpIdsBsinPump {
	
	
	
	public String getIdstcd() {
		return idstcd;
	}
	public void setIdstcd(String idstcd) {
		this.idstcd = idstcd;
	}
	public String getIdstnm() {
		return idstnm;
	}
	public void setIdstnm(String idstnm) {
		this.idstnm = idstnm;
	}
	public String getIdstcdnm() {
		return idstcdnm;
	}
	public void setIdstcdnm(String idstcdnm) {
		this.idstcdnm = idstcdnm;
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
	
	String idstcd = ""; //泵站编号
	String idstnm = ""; //泵站姓名
	String idstcdnm = ""; //泵站编号姓名
	String xzq = ""; //行政区



	Integer objectid = 0; //主键
}
