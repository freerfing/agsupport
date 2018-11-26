package com.augurit.asip.watermap.domain.subject;

import java.util.Date;
/**
 * 河道水情实体类
 * @author Augurit
 *
 */
public class StRiverR {
	/**
	 * 主键
	 */
	private String id;	
	
	/**
	 * 测站编码
	 */
	private String stcd;
	
	/**
	 * 时间
	 */
	private Date tm;
	
	/**
	 * 水位
	 */
	private String z;
	
	/**
	 * 流量
	 */
	private String q;
	
	/**
	 * 断面过水面积
	 */
	private String xsa;
	
	/**
	 * 断面平均流速
	 */
	private String xsavv;
	
	/**
	 * 断面最大流量
	 */
	private String xsmxv;
	
	/**
	 * 河水特征
	 */
	private String flwchrcd;
	
	/**
	 * 水势
	 */
	private String wptn;
	
	/**
	 * 测流方法
	 */
	private String msqmt;
	
	/**
	 * 测积方法
	 */
	private String msamt;
	
	/**
	 * 测速方法
	 */
	private String msvmt;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getStcd() {
		return stcd;
	}
	public void setStcd(String stcd) {
		this.stcd = stcd;
	}
	public Date getTm() {
		return tm;
	}
	public void setTm(Date tm) {
		this.tm = tm;
	}
	public String getZ() {
		return z;
	}
	public void setZ(String z) {
		this.z = z;
	}
	public String getQ() {
		return q;
	}
	public void setQ(String q) {
		this.q = q;
	}
	public String getXsa() {
		return xsa;
	}
	public void setXsa(String xsa) {
		this.xsa = xsa;
	}
	public String getXsavv() {
		return xsavv;
	}
	public void setXsavv(String xsavv) {
		this.xsavv = xsavv;
	}
	public String getXsmxv() {
		return xsmxv;
	}
	public void setXsmxv(String xsmxv) {
		this.xsmxv = xsmxv;
	}
	public String getFlwchrcd() {
		return flwchrcd;
	}
	public void setFlwchrcd(String flwchrcd) {
		this.flwchrcd = flwchrcd;
	}
	public String getWptn() {
		return wptn;
	}
	public void setWptn(String wptn) {
		this.wptn = wptn;
	}
	public String getMsqmt() {
		return msqmt;
	}
	public void setMsqmt(String msqmt) {
		this.msqmt = msqmt;
	}
	public String getMsamt() {
		return msamt;
	}
	public void setMsamt(String msamt) {
		this.msamt = msamt;
	}
	public String getMsvmt() {
		return msvmt;
	}
	public void setMsvmt(String msvmt) {
		this.msvmt = msvmt;
	}
}
