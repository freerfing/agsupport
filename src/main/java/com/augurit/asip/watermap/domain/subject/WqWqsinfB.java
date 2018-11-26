package com.augurit.asip.watermap.domain.subject;

import com.common.util.Common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by czh on 2017-11-15.
 * 水质监测站表实体类(污水处理厂水质监测站、河涌水质监测站)
 **/
public class WqWqsinfB {

    private String stcd;
    private String stnm;
    private String stgrd;
    private String sttp;
    private String bsnm;
    private String hnnm;
    private String rvnm;
    private Float lgtd;
    private Float lttd;
    private Float coox;
    private Float cooy;
    private String stlc;
    private String addvcd;
    private String wrrcd;
    private String wfrcd;
    private String adag;
    private String mnag;
    private Integer mnfrq;
    private Integer atmn;
    private Date esstym;
    private Date wdstym;
    private String nt;
    private String atid;
    private String stcdnm;

    public String getStcdnm() {
		return stcdnm;
	}

	public void setStcdnm(String stcdnm) {
		this.stcdnm = stcdnm;
	}

	public String getStcd() {
        return stcd;
    }

    public void setStcd(String stcd) {
        this.stcd = stcd;
    }

    public String getStnm() {
        return stnm;
    }

    public void setStnm(String stnm) {
        this.stnm = stnm;
    }

    public String getStgrd() {
        return stgrd;
    }

    public void setStgrd(String stgrd) {
        this.stgrd = stgrd;
    }

    public String getSttp() {
        return sttp;
    }

    public void setSttp(String sttp) {
        this.sttp = sttp;
    }

    public String getBsnm() {
        return bsnm;
    }

    public void setBsnm(String bsnm) {
        this.bsnm = bsnm;
    }

    public String getHnnm() {
        return hnnm;
    }

    public void setHnnm(String hnnm) {
        this.hnnm = hnnm;
    }

    public String getRvnm() {
        return rvnm;
    }

    public void setRvnm(String rvnm) {
        this.rvnm = rvnm;
    }

    public Float getLgtd() {
        return lgtd;
    }

    public void setLgtd(Float lgtd) {
        this.lgtd = lgtd;
    }

    public Float getLttd() {
        return lttd;
    }

    public void setLttd(Float lttd) {
        this.lttd = lttd;
    }

    public Float getCoox() {
        return coox;
    }

    public void setCoox(Float coox) {
        this.coox = coox;
    }

    public Float getCooy() {
        return cooy;
    }

    public void setCooy(Float cooy) {
        this.cooy = cooy;
    }

    public String getStlc() {
        return stlc;
    }

    public void setStlc(String stlc) {
        this.stlc = stlc;
    }

    public String getAddvcd() {
        return addvcd;
    }

    public void setAddvcd(String addvcd) {
        this.addvcd = addvcd;
    }

    public String getWrrcd() {
        return wrrcd;
    }

    public void setWrrcd(String wrrcd) {
        this.wrrcd = wrrcd;
    }

    public String getWfrcd() {
        return wfrcd;
    }

    public void setWfrcd(String wfrcd) {
        this.wfrcd = wfrcd;
    }

    public String getAdag() {
        return adag;
    }

    public void setAdag(String adag) {
        this.adag = adag;
    }

    public String getMnag() {
        return mnag;
    }

    public void setMnag(String mnag) {
        this.mnag = mnag;
    }

    public Integer getMnfrq() {
        return mnfrq;
    }

    public void setMnfrq(Integer mnfrq) {
        this.mnfrq = mnfrq;
    }

    public Integer getAtmn() {
        return atmn;
    }

    public void setAtmn(Integer atmn) {
        this.atmn = atmn;
    }

    public Date getEsstym() {
        return esstym;
    }

    public void setEsstym(String esstym) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            if (Common.isCheckNull(esstym) && esstym.equals("")) {
                this.esstym = null;
            } else {
                this.esstym = formatter.parse(esstym);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public Date getWdstym() {
        return wdstym;
    }

    public void setWdstym(String wdstym) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            if (Common.isCheckNull(wdstym) && wdstym.equals("")) {
                this.wdstym = null;
            } else {
                this.wdstym = formatter.parse(wdstym);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public String getNt() {
        return nt;
    }

    public void setNt(String nt) {
        this.nt = nt;
    }

    public String getAtid() {
        return atid;
    }

    public void setAtid(String atid) {
        this.atid = atid;
    }
}
