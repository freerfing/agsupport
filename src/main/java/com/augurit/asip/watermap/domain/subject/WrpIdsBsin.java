package com.augurit.asip.watermap.domain.subject;

import com.common.util.Common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2017-11-13.
 * 泵站实体类
 */
public class WrpIdsBsin {

    private String idstcd;
    private String idstnm;
    private String idsttp;
    private String mnun;
    private String cmun;
    private String addvcd;
    private String vltw;
    private String ctcd;
    private String rvcd;
    private Float eslg;
    private Float nrlt;
    private String mnus;
    private Float inpw;
    private Float inflw;
    private Integer unam;
    private String pmtp;
    private Float drar;
    private Float irar;
    private Float pmdsdlhd;
    private String cpyr;
    private String idstov;
    private Date dtupdt;
    private Integer xsjb;
    private String bzjb;
    private String gcdb;
    private String szhl;
    private String sjplbz;
    private String ssplp;
    private String szlymc;
    private String gcxt;
    private String xzq;
    private Date jcsj;
    private String xgr;
    private String xgbm;
    private Date xgrq;
    private String remark;


    public String getIdstcd() {
        return idstcd;
    }

    public void setIdstcd(String idstcd) {
        this.idstcd = idstcd;
    }

    public String getIdstnm() {
        return idstnm;
    }

    public void setIdstnm(String idstnm) {
        this.idstnm = idstnm;
    }

    public String getIdsttp() {
        return idsttp;
    }

    public void setIdsttp(String idsttp) {
        this.idsttp = idsttp;
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

    public String getMnus() {
        return mnus;
    }

    public void setMnus(String mnus) {
        this.mnus = mnus;
    }

    public Float getInpw() {
        return inpw;
    }

    public void setInpw(Float inpw) {
        this.inpw = inpw;
    }

    public Float getInflw() {
        return inflw;
    }

    public void setInflw(Float inflw) {
        this.inflw = inflw;
    }

    public Integer getUnam() {
        return unam;
    }

    public void setUnam(Integer unam) {
        this.unam = unam;
    }

    public String getPmtp() {
        return pmtp;
    }

    public void setPmtp(String pmtp) {
        this.pmtp = pmtp;
    }

    public Float getDrar() {
        return drar;
    }

    public void setDrar(Float drar) {
        this.drar = drar;
    }

    public Float getIrar() {
        return irar;
    }

    public void setIrar(Float irar) {
        this.irar = irar;
    }

    public Float getPmdsdlhd() {
        return pmdsdlhd;
    }

    public void setPmdsdlhd(Float pmdsdlhd) {
        this.pmdsdlhd = pmdsdlhd;
    }

    public String getCpyr() {
        return cpyr;
    }

    public void setCpyr(String cpyr) {
        this.cpyr = cpyr;
    }

    public String getIdstov() {
        return idstov;
    }

    public void setIdstov(String idstov) {
        this.idstov = idstov;
    }

    public Date getDtupdt() {
        return dtupdt;
    }

    public void setDtupdt(Date dtupdt) {
        this.dtupdt = dtupdt;
    }

    public Integer getXsjb() {
        return xsjb;
    }

    public void setXsjb(Integer xsjb) {
        this.xsjb = xsjb;
    }

    public String getBzjb() {
        return bzjb;
    }

    public void setBzjb(String bzjb) {
        this.bzjb = bzjb;
    }

    public String getGcdb() {
        return gcdb;
    }

    public void setGcdb(String gcdb) {
        this.gcdb = gcdb;
    }

    public String getSzhl() {
        return szhl;
    }

    public void setSzhl(String szhl) {
        this.szhl = szhl;
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

    public String getSzlymc() {
        return szlymc;
    }

    public void setSzlymc(String szlymc) {
        this.szlymc = szlymc;
    }

    public String getGcxt() {
        return gcxt;
    }

    public void setGcxt(String gcxt) {
        this.gcxt = gcxt;
    }

    public String getXzq() {
        return xzq;
    }

    public void setXzq(String xzq) {
        this.xzq = xzq;
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

    public String getXgr() {
        return xgr;
    }

    public void setXgr(String xgr) {
        this.xgr = xgr;
    }

    public String getXgbm() {
        return xgbm;
    }

    public void setXgbm(String xgbm) {
        this.xgbm = xgbm;
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

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
