package com.augurit.asip.watermap.domain.layerEdit;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DataTime {
	private Date tm;
	private String tmData;
	private Float rz;//最新数据
	private Float z;
	private Float drp;//雨量的数据
	private Float hjwd;//环境温度
	private Float ad;//氨氮
	private Float zl;//总磷
	private Float hxqyl;//化学含氧量
	private Float rjy;//溶解氧
	private Float tmd;//透明度
	private Float szzs;//水质指数
	private Float zd;//总氮
	private Float codcr;//含氧量
	private Float ph;//ph值
	private Float xfw;//悬浮物
	private Float sll;//水流量
	private Float yhhydw;//氧化还原电位
	private Float sd;//湿度
	private String jcny;
	private String fsltdz;
	
	
	public Float getHjwd() {
		return hjwd;
	}
	public void setHjwd(Float hjwd) {
		this.hjwd = hjwd;
	}
	public Float getYhhydw() {
		return yhhydw;
	}
	public void setYhhydw(Float yhhydw) {
		this.yhhydw = yhhydw;
	}
	public Float getSd() {
		return sd;
	}
	public void setSd(Float sd) {
		this.sd = sd;
	}
	public Float getZ() {
		return z;
	}
	public void setZ(Float z) {
		this.z = z;
	}
	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public Date getTm() {
		return tm;
	}
	public void setTm(Date tm) {
		this.tm = tm;
		this.tmData = formatter.format(tm);
	}
	public String getTmData() {
		return tmData;
	}
	public void setTmData(String tmData) {
		this.tmData = tmData;
	}
	public Float getRz() {
		return rz;
	}
	public void setRz(Float rz) {
		this.rz = rz;
	}
	public Float getDrp() {
		return drp;
	}
	public void setDrp(Float drp) {
		this.drp = drp;
	}
	public Float getAd() {
		return ad;
	}
	public void setAd(Float ad) {
		this.ad = ad;
	}
	public Float getZl() {
		return zl;
	}
	public void setZl(Float zl) {
		this.zl = zl;
	}
	public Float getHxqyl() {
		return hxqyl;
	}
	public void setHxqyl(Float hxqyl) {
		this.hxqyl = hxqyl;
	}
	public Float getRjy() {
		return rjy;
	}
	public void setRjy(Float rjy) {
		this.rjy = rjy;
	}
	public Float getTmd() {
		return tmd;
	}
	public void setTmd(Float tmd) {
		this.tmd = tmd;
	}
	public Float getSzzs() {
		return szzs;
	}
	public void setSzzs(Float szzs) {
		this.szzs = szzs;
	}
	public Float getZd() {
		return zd;
	}
	public void setZd(Float zd) {
		this.zd = zd;
	}
	public Float getCodcr() {
		return codcr;
	}
	public void setCodcr(Float codcr) {
		this.codcr = codcr;
	}
	public Float getPh() {
		return ph;
	}
	public void setPh(Float ph) {
		this.ph = ph;
	}
	public Float getXfw() {
		return xfw;
	}
	public void setXfw(Float xfw) {
		this.xfw = xfw;
	}
	public Float getSll() {
		return sll;
	}
	public void setSll(Float sll) {
		this.sll = sll;
	}
	public String getJcny() {
		return jcny;
	}
	public void setJcny(String jcny) {
		this.jcny = jcny;
	}
	public String getFsltdz() {
		return fsltdz;
	}
	public void setFsltdz(String fsltdz) {
		this.fsltdz = fsltdz;
	}

}
