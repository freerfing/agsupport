package com.augurit.asip.watermap.domain.layerEdit;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Huanbao {
	private String hcmc;
	private String ssxzq;
	private String ad;
	private String zl;
	private String hxqyl;
	private String rjy;
	private String tmd;
	private String szzs;
	private String szlb;
	private String sfhc;
	private String jcny;
	private String lastupdated;
	private String searchStrat;
	private String searchEnd;
	private Date s_last_updated;
	  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
	public String getHcmc() {
		return hcmc;
	}
	public void setHcmc(String hcmc) {
		this.hcmc = hcmc;
	}
	public String getSsxzq() {
		return ssxzq;
	}
	public void setSsxzq(String ssxzq) {//从化存在数据库中的就是从化区,所以不用转.
		if(ssxzq.equals("越秀")){
			ssxzq = "越秀区";
		}else if(ssxzq.equals("天河")){
			ssxzq="天河区";
		}else if(ssxzq.equals("黄埔")){
			ssxzq="黄埔区";
		}else if(ssxzq.equals("白云") || ssxzq.equals("花都-白云")){
			ssxzq="白云区";
		}else if(ssxzq.equals("增城")){
			ssxzq="增城区";
		}else if(ssxzq.equals("荔湾")){
			ssxzq="荔湾区";
		}else if(ssxzq.equals("番禺")){
			ssxzq="番禺区";
		}else if(ssxzq.equals("南沙")){
			ssxzq="南沙区";
		}else if(ssxzq.equals("花都")){
			ssxzq="花都区";
		}else if(ssxzq.equals("海珠")){
			ssxzq="海珠区";
		}
		this.ssxzq = ssxzq;
	}
	public String getAd() {
		return ad;
	}
	public void setAd(String ad) {
		this.ad = ad;
	}
	public String getZl() {
		return zl;
	}
	public void setZl(String zl) {
		this.zl = zl;
	}
	
	public String getHxqyl() {
		return hxqyl;
	}
	public void setHxqyl(String hxqyl) {
		this.hxqyl = hxqyl;
	}
	public String getRjy() {
		return rjy;
	}
	public void setRjy(String rjy) {
		this.rjy = rjy;
	}
	public String getTmd() {
		return tmd;
	}
	public void setTmd(String tmd) {
		this.tmd = tmd;
	}
	public String getSzzs() {
		return szzs;
	}
	public void setSzzs(String szzs) {
		this.szzs = szzs;
	}
	public String getSzlb() {
		return szlb;
	}
	public void setSzlb(String szlb) {
		this.szlb = szlb;
	}
	public String getSfhc() {
		return sfhc;
	}
	public void setSfhc(String sfhc) {
		this.sfhc = sfhc;
	}
	public String getJcny() {
		return jcny;
	}
	public void setJcny(String jcny) {
		this.jcny = jcny;
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

	public String getLastupdated() {
		return lastupdated;
	}

	public void setLastupdated(String lastupdated) {
		this.lastupdated = lastupdated;
	}


	public Date getS_last_updated() {
		return s_last_updated;
	}

	public void setS_last_updated(Date s_last_updated) {
		this.s_last_updated = s_last_updated;
	}
}
