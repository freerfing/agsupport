package com.augurit.asip.watermap.domain.subject;

import java.util.Date;

/**
 * 水库信息实体类
 * @author hzy
 *
 */
public class Reservoir {

	private String sx;	//		县市
	private String zm;	//		站名
	private String zl;	//		站类(报汛项目)
	private String zryl;	//		昨日雨量(mm)
	private String bszxz;	//		8时-现在(mm)
	private String qyxx;	//		前一小时(mm)
	private String jyxx;	//		近一小时(mm)
	private String bssw;	//		8时水位(mm)
	private Date sbsj;	//			上报时间
	private String sw;	//		水位(m)
	private String kr;	//		库容(百万方)
	private String jjsw;	//		警戒水位(m)
	private String bzsw;	//		保证水位(m)
	private String xxsw;//		汛限水位(m)
	private String zcsw;	//		正常水位(m)
	private String xzq;	//		行政区
	private String skgn;	//		水库功能
	private Integer id;	//			主键
	private String czbm;	//		测站编码
	private String ksss;	//库水水势
	
	public String getSx() {
		return sx;
	}
	public void setSx(String sx) {
		this.sx = sx;
	}
	public String getZm() {
		return zm;
	}
	public void setZm(String zm) {
		this.zm = zm;
	}
	public String getZl() {
		return zl;
	}
	public void setZl(String zl) {
		this.zl = zl;
	}
	public String getZryl() {
		return zryl;
	}
	public void setZryl(String zryl) {
		this.zryl = zryl;
	}
	public String getBszxz() {
		return bszxz;
	}
	public void setBszxz(String bszxz) {
		this.bszxz = bszxz;
	}
	public String getQyxx() {
		return qyxx;
	}
	public void setQyxx(String qyxx) {
		this.qyxx = qyxx;
	}
	public String getJyxx() {
		return jyxx;
	}
	public void setJyxx(String jyxx) {
		this.jyxx = jyxx;
	}
	public String getBssw() {
		return bssw;
	}
	public void setBssw(String bssw) {
		this.bssw = bssw;
	}
	public Date getSbsj() {
		return sbsj;
	}
	public void setSbsj(Date sbsj) {
		this.sbsj = sbsj;
	}
	public String getSw() {
		return sw;
	}
	public void setSw(String sw) {
		this.sw = sw;
	}
	public String getKr() {
		return kr;
	}
	public void setKr(String kr) {
		this.kr = kr;
	}
	public String getJjsw() {
		return jjsw;
	}
	public void setJjsw(String jjsw) {
		this.jjsw = jjsw;
	}
	public String getBzsw() {
		return bzsw;
	}
	public void setBzsw(String bzsw) {
		this.bzsw = bzsw;
	}
	public String getXxsw() {
		return xxsw;
	}
	public void setXxsw(String xxsw) {
		this.xxsw = xxsw;
	}
	public String getZcsw() {
		return zcsw;
	}
	public void setZcsw(String zcsw) {
		this.zcsw = zcsw;
	}
	public String getXzq() {
		return xzq;
	}
	public void setXzq(String xzq) {
		this.xzq = xzq;
	}
	public String getSkgn() {
		return skgn;
	}
	public void setSkgn(String skgn) {
		this.skgn = skgn;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCzbm() {
		return czbm;
	}
	public void setCzbm(String czbm) {
		this.czbm = czbm;
	}
	public String getKsss() {
		return ksss;
	}
	public void setKsss(String ksss) {
		this.ksss = ksss;
	}
	
}
