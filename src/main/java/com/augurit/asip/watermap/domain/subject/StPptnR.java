package com.augurit.asip.watermap.domain.subject;

import java.util.Date;

/**
 * Created by ac on 2017-07-20.
 *
 * 降水量表实体（雨情）
 */
public class StPptnR {

    /**
     * 编码(主键)
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
     * 时段降水量
     */
    private String drp;

    /**
     * 时段长
     */
    private String intv;

    /**
     * 降水历时
     */
    private String pdr;

    /**
     * 日降水量
     */
    private String dyp;

    /**
     * 天气状况
     */
    private String wth;

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

    public String getDrp() {
        return drp;
    }

    public void setDrp(String drp) {
        this.drp = drp;
    }

    public String getIntv() {
        return intv;
    }

    public void setIntv(String intv) {
        this.intv = intv;
    }

    public String getPdr() {
        return pdr;
    }

    public void setPdr(String pdr) {
        this.pdr = pdr;
    }

    public String getDyp() {
        return dyp;
    }

    public void setDyp(String dyp) {
        this.dyp = dyp;
    }

    public String getWth() {
        return wth;
    }

    public void setWth(String wth) {
        this.wth = wth;
    }
}
