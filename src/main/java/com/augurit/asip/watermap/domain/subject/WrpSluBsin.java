package com.augurit.asip.watermap.domain.subject;

import com.common.util.Common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by czh on 2017-11-13.
 * 水闸实体类
 */
public class WrpSluBsin {

    private String slcd;
    private String slnm;
    private String alias;
    private String sltp;
    private String prst;
    private String prsc;
    private String prgr;
    private String mnblgr;
    private String mnun;
    private String cmun;
    private String blsys;
    private String addvcd;
    private String vltw;
    private String ctcd;
    private String rvcd;
    private String prps;
    private Float eslg;
    private Float nrlt;
    private String qmtpkaclt;
    private Integer bsssin;
    private Integer freqin;
    private Float maxlcfl;
    private String dtpl;
    private String slov;
    private Date dtupdt;
    private Date jcsj;
    private String sjfhbz;
    private String sjplbz;
    private String ssplp;
    private String szhl;
    private String szlym;
    private String xgbm;
    private String xgr;
    private Date xgrq;
    private String ydgc;
    private Float zdgc;
    private Float zksl;
    private Float zkzjk;
    private Integer xsjb;
    private String szlx;
    private String szjb;
    private String xzq;
    private String gcxt;
    private String remark;


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

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getSltp() {
        return sltp;
    }

    public void setSltp(String sltp) {
        this.sltp = sltp;
    }

    public String getPrst() {
        return prst;
    }

    public void setPrst(String prst) {
        this.prst = prst;
    }

    public String getPrsc() {
        return prsc;
    }

    public void setPrsc(String prsc) {
        this.prsc = prsc;
    }

    public String getPrgr() {
        return prgr;
    }

    public void setPrgr(String prgr) {
        this.prgr = prgr;
    }

    public String getMnblgr() {
        return mnblgr;
    }

    public void setMnblgr(String mnblgr) {
        this.mnblgr = mnblgr;
    }

    public String getMnun() {
        return mnun;
    }

    public void setMnun(String mnun) {
        this.mnun = mnun;
    }

    public String getCmun() {
        return cmun;
    }

    public void setCmun(String cmun) {
        this.cmun = cmun;
    }

    public String getBlsys() {
        return blsys;
    }

    public void setBlsys(String blsys) {
        this.blsys = blsys;
    }

    public String getAddvcd() {
        return addvcd;
    }

    public void setAddvcd(String addvcd) {
        this.addvcd = addvcd;
    }

    public String getVltw() {
        return vltw;
    }

    public void setVltw(String vltw) {
        this.vltw = vltw;
    }

    public String getCtcd() {
        return ctcd;
    }

    public void setCtcd(String ctcd) {
        this.ctcd = ctcd;
    }

    public String getRvcd() {
        return rvcd;
    }

    public void setRvcd(String rvcd) {
        this.rvcd = rvcd;
    }

    public String getPrps() {
        return prps;
    }

    public void setPrps(String prps) {
        this.prps = prps;
    }

    public Float getEslg() {
        return eslg;
    }

    public void setEslg(Float eslg) {
        this.eslg = eslg;
    }

    public Float getNrlt() {
        return nrlt;
    }

    public void setNrlt(Float nrlt) {
        this.nrlt = nrlt;
    }

    public String getQmtpkaclt() {
        return qmtpkaclt;
    }

    public void setQmtpkaclt(String qmtpkaclt) {
        this.qmtpkaclt = qmtpkaclt;
    }

    public Integer getBsssin() {
        return bsssin;
    }

    public void setBsssin(Integer bsssin) {
        this.bsssin = bsssin;
    }

    public Integer getFreqin() {
        return freqin;
    }

    public void setFreqin(Integer freqin) {
        this.freqin = freqin;
    }

    public Float getMaxlcfl() {
        return maxlcfl;
    }

    public void setMaxlcfl(Float maxlcfl) {
        this.maxlcfl = maxlcfl;
    }

    public String getDtpl() {
        return dtpl;
    }

    public void setDtpl(String dtpl) {
        this.dtpl = dtpl;
    }

    public String getSlov() {
        return slov;
    }

    public void setSlov(String slov) {
        this.slov = slov;
    }

    public Date getDtupdt() {
        return dtupdt;
    }

    public void setDtupdt(Date dtupdt) {
        this.dtupdt = dtupdt;
    }

    public Date getJcsj() {
        return jcsj;
    }

    public void setJcsj(String jcsj) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            if (Common.isCheckNull(jcsj) && jcsj.equals("")) {
                this.jcsj = null;
            } else {
                this.jcsj = formatter.parse(jcsj);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public String getSjfhbz() {
        return sjfhbz;
    }

    public void setSjfhbz(String sjfhbz) {
        this.sjfhbz = sjfhbz;
    }

    public String getSjplbz() {
        return sjplbz;
    }

    public void setSjplbz(String sjplbz) {
        this.sjplbz = sjplbz;
    }

    public String getSsplp() {
        return ssplp;
    }

    public void setSsplp(String ssplp) {
        this.ssplp = ssplp;
    }

    public String getSzhl() {
        return szhl;
    }

    public void setSzhl(String szhl) {
        this.szhl = szhl;
    }

    public String getSzlym() {
        return szlym;
    }

    public void setSzlym(String szlym) {
        this.szlym = szlym;
    }

    public String getXgbm() {
        return xgbm;
    }

    public void setXgbm(String xgbm) {
        this.xgbm = xgbm;
    }

    public String getXgr() {
        return xgr;
    }

    public void setXgr(String xgr) {
        this.xgr = xgr;
    }

    public Date getXgrq() {
        return xgrq;
    }

    public void setXgrq(String xgrq) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            if (Common.isCheckNull(xgrq) && xgrq.equals("")) {
                this.xgrq = null;
            } else {
                this.xgrq = formatter.parse(xgrq);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public String getYdgc() {
        return ydgc;
    }

    public void setYdgc(String ydgc) {
        this.ydgc = ydgc;
    }

    public Float getZdgc() {
        return zdgc;
    }

    public void setZdgc(Float zdgc) {
        this.zdgc = zdgc;
    }

    public Float getZksl() {
        return zksl;
    }

    public void setZksl(Float zksl) {
        this.zksl = zksl;
    }

    public Float getZkzjk() {
        return zkzjk;
    }

    public void setZkzjk(Float zkzjk) {
        this.zkzjk = zkzjk;
    }

    public Integer getXsjb() {
        return xsjb;
    }

    public void setXsjb(Integer xsjb) {
        this.xsjb = xsjb;
    }

    public String getSzlx() {
        return szlx;
    }

    public void setSzlx(String szlx) {
        this.szlx = szlx;
    }

    public String getSzjb() {
        return szjb;
    }

    public void setSzjb(String szjb) {
        this.szjb = szjb;
    }

    public String getXzq() {
        return xzq;
    }

    public void setXzq(String xzq) {
        this.xzq = xzq;
    }

    public String getGcxt() {
        return gcxt;
    }

    public void setGcxt(String gcxt) {
        this.gcxt = gcxt;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
