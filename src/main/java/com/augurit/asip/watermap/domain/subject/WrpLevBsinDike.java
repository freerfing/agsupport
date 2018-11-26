package com.augurit.asip.watermap.domain.subject;

/**
 * 堤防参数
 * 
 * @author czz825
 *
 */
public class WrpLevBsinDike {
	
	
	
	public String getLvcd() {
		return lvcd;
	}
	public void setLvcd(String lvcd) {
		this.lvcd = lvcd;
	}
	public String getLvnm() {
		return lvnm;
	}
	public void setLvnm(String lvnm) {
		this.lvnm = lvnm;
	}
	public Integer getObjectid() {
		return objectid;
	}
	public void setObjectid(Integer objectid) {
		this.objectid = objectid;
	}
	public String getLvcdnm() {
		return lvcdnm;
	}
	public void setLvcdnm(String lvcdnm) {
		this.lvcdnm = lvcdnm;
	}	
	
	String lvcd = ""; //提防编号
	String lvnm = ""; //提防编码
	String lvcdnm = ""; //提防编号名称


	Integer objectid = 0; //主键
	
}
