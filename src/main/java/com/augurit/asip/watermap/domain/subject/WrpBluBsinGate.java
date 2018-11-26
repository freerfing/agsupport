package com.augurit.asip.watermap.domain.subject;

/**
 * 水闸参数
 * 
 * @author czz825
 *
 */
public class WrpBluBsinGate {
	
	
	
	public String getSlcd() {
		return slcd;
	}
	public void setSlcd(String slcd) {
		this.slcd = slcd;
	}
	public String getSlnm() {
		return slnm;
	}
	public void setSlnm(String slnm) {
		this.slnm = slnm;
	}
	public String getSlcdnm() {
		return slcdnm;
	}
	public void setSlcdnm(String slcdnm) {
		this.slcdnm = slcdnm;
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
	
	String slcd = ""; //水闸编号
	String slnm = ""; //水闸名称
	String slcdnm = ""; //水闸编号名称
	String xzq = ""; //行政区
	

	Integer objectid = 0; //主键
	
}
