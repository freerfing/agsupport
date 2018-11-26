package com.augurit.asip.watermap.domain.subject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 湖泊实体类
 * Created by czh on 2017-11-08.
 */
public class WrpLakBsin {

    private String shape;
    private String lkcd;
    private String lknm;
    private String mnun;
    private String cmun;
    private String lc;
    private String hccl;
    private String ctcd;
    private String rvcd;
    private Long hgstlv;
    private Long maxst;
    private Long maxstar;
    private Long nrrgstlv;
    private Long minrgstlv;
    private Long rgstvl;
    private String dtpl;
    private String lkov;
    private Date dtupdt;
    private String xzq;
    private String szhl;
    private String ssplp;
    private Long jymj;
    private Float smmj;
    private Integer sjhsbz;
    private Long sjhssw;
    private Long jgsw;
    private Float zdmj;
    private String gm;
    private Date jcsj;
    private String remark;
    private String xgr;
    private String xgbm;
    private String szlymc;
    private Date xgrq;
    private String alias;
    private String jhhl;
    private String szhldm;
    private String hzlake;
    private String editstatus;


    public String getShape() {
        return shape;
    }

    public void setShape(String shape) {
        this.shape = shape;
    }

    public String getLkcd() {
        return lkcd;
    }

    public void setLkcd(String lkcd) {
        this.lkcd = lkcd;
    }

    public String getLknm() {
        return lknm;
    }

    public void setLknm(String lknm) {
        this.lknm = lknm;
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

    public String getLc() {
        return lc;
    }

    public void setLc(String lc) {
        this.lc = lc;
    }

    public String getHccl() {
        return hccl;
    }

    public void setHccl(String hccl) {
        this.hccl = hccl;
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

    public Long getHgstlv() {
        return hgstlv;
    }

    public void setHgstlv(Long hgstlv) {
        this.hgstlv = hgstlv;
    }

    public Long getMaxst() {
        return maxst;
    }

    public void setMaxst(Long maxst) {
        this.maxst = maxst;
    }

    public Long getMaxstar() {
        return maxstar;
    }

    public void setMaxstar(Long maxstar) {
        this.maxstar = maxstar;
    }

    public Long getNrrgstlv() {
        return nrrgstlv;
    }

    public void setNrrgstlv(Long nrrgstlv) {
        this.nrrgstlv = nrrgstlv;
    }

    public Long getMinrgstlv() {
        return minrgstlv;
    }

    public void setMinrgstlv(Long minrgstlv) {
        this.minrgstlv = minrgstlv;
    }

    public Long getRgstvl() {
        return rgstvl;
    }

    public void setRgstvl(Long rgstvl) {
        this.rgstvl = rgstvl;
    }

    public String getDtpl() {
        return dtpl;
    }

    public void setDtpl(String dtpl) {
        this.dtpl = dtpl;
    }

    public String getLkov() {
        return lkov;
    }

    public void setLkov(String lkov) {
        this.lkov = lkov;
    }

    public Date getDtupdt() {
        return dtupdt;
    }

    public void setDtupdt(Date dtupdt) {
        this.dtupdt = dtupdt;
    }

    public String getXzq() {
        return xzq;
    }

    public void setXzq(String xzq) {
        this.xzq = xzq;
    }

    public String getSzhl() {
        return szhl;
    }

    public void setSzhl(String szhl) {
        this.szhl = szhl;
    }

    public String getSsplp() {
        return ssplp;
    }

    public void setSsplp(String ssplp) {
        this.ssplp = ssplp;
    }

    public Long getJymj() {
        return jymj;
    }

    public void setJymj(Long jymj) {
        this.jymj = jymj;
    }

    public Float getSmmj() {
        return smmj;
    }

    public void setSmmj(Float smmj) {
        this.smmj = smmj;
    }

    public Integer getSjhsbz() {
        return sjhsbz;
    }

    public void setSjhsbz(Integer sjhsbz) {
        this.sjhsbz = sjhsbz;
    }

    public Long getSjhssw() {
        return sjhssw;
    }

    public void setSjhssw(Long sjhssw) {
        this.sjhssw = sjhssw;
    }

    public Long getJgsw() {
        return jgsw;
    }

    public void setJgsw(Long jgsw) {
        this.jgsw = jgsw;
    }

    public Float getZdmj() {
        return zdmj;
    }

    public void setZdmj(Float zdmj) {
        this.zdmj = zdmj;
    }

    public String getGm() {
        return gm;
    }

    public void setGm(String gm) {
        this.gm = gm;
    }

    public Date getJcsj() {
        return jcsj;
    }

    public void setJcsj(String jcsj) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            if (jcsj.equals("")) {
                this.jcsj = null;
            } else {
                this.jcsj = formatter.parse(jcsj);
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

    public String getXgr() {
        return xgr;
    }

    public void setXgrq(String xgrq) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            if (xgrq.equals("")) {
                this.xgrq = null;
            } else {
                this.xgrq = formatter.parse(xgrq);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public String getXgbm() {
        return xgbm;
    }

    public void setXgbm(String xgbm) {
        this.xgbm = xgbm;
    }

    public String getSzlymc() {
        return szlymc;
    }

    public void setSzlymc(String szlymc) {
        this.szlymc = szlymc;
    }

    public Date getXgrq() {
        return xgrq;
    }

    public void setXgrq(Date xgrq) {
        this.xgrq = xgrq;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getJhhl() {
        return jhhl;
    }

    public void setJhhl(String jhhl) {
        this.jhhl = jhhl;
    }

    public String getSzhldm() {
        return szhldm;
    }

    public void setSzhldm(String szhldm) {
        this.szhldm = szhldm;
    }

    public String getHzlake() {
        return hzlake;
    }

    public void setHzlake(String hzlake) {
        this.hzlake = hzlake;
    }

    public String getEditstatus() {
        return editstatus;
    }

    public void setEditstatus(String editstatus) {
        this.editstatus = editstatus;
    }
}
