package com.augurit.asip.watermap.domain.subject;

/**
 * 河流参数
 * 
 * @author czz825
 *
 */
public class SlgRv {
	
	
	public String getRvcd() {
		return rvcd;
	}
	public void setRvcd(String rvcd) {
		this.rvcd = rvcd;
	}
	public String getRvnm() {
		return rvnm;
	}
	public void setRvnm(String rvnm) {
		this.rvnm = rvnm;
	}
	
	public String getRvcdnm() {
		return rvcdnm;
	}
	public void setRvcdnm(String rvcdnm) {
		this.rvcdnm = rvcdnm;
	}
	public String getXzq() {
		return xzq;
	}
	public void setXzq(String xzq) {
		this.xzq = xzq;
	}
	public String getSslymc() {
		return sslymc;
	}
	public void setSslymc(String sslymc) {
		this.sslymc = sslymc;
	}
	public String getRvlen() {
		return rvlen;
	}
	public void setRvlen(String rvlen) {
		this.rvlen = rvlen;
	}
	public String getRvlen1() {
		return rvlen1;
	}
	public void setRvlen1(String rvlen1) {
		this.rvlen1 = rvlen1;
	}
	public String getRvlen2() {
		return rvlen2;
	}
	public void setRvlen2(String rvlen2) {
		this.rvlen2 = rvlen2;
	}
	public Integer getObjectid() {
		return objectid;
	}
	public void setObjectid(Integer objectid) {
		this.objectid = objectid;
	}
	
	String rvcd = ""; //河涌编号
	String rvnm = ""; //河涌名称
	String xzq = ""; //所属行政区
	String sslymc = ""; //所属流域
	String rvlen = ""; //河流长度
	
	String rvcdnm = ""; //河涌编号名称	
	String rvlen1 = ""; //河流长度开始
	String rvlen2 = ""; //河流长度结束
	
	Integer objectid = 0; //主键


	
}
