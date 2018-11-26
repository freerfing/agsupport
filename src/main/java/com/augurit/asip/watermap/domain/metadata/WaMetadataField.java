package com.augurit.asip.watermap.domain.metadata;

/**
 * 元数据字段表实体
 */
public class WaMetadataField {
    private String ID;           //
    private String NAME;         //
    private String CNAME;        //
    private String DESCRIPTION;  //
    private String TYPE;         //
    private String TABLEID;      //
    private String CONSTRAINT;   //
    private String UNIT;         //
    private String DD;           //
    private String EDITABLE;     //
    private String VISIBLE;      //
    private String dispsort;
    private String prikey;

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getNAME() {
        return NAME;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public String getCNAME() {
        return CNAME;
    }

    public void setCNAME(String CNAME) {
        this.CNAME = CNAME;
    }

    public String getDESCRIPTION() {
        return DESCRIPTION;
    }

    public void setDESCRIPTION(String DESCRIPTION) {
        this.DESCRIPTION = DESCRIPTION;
    }

    public String getTYPE() {
        return TYPE;
    }

    public void setTYPE(String TYPE) {
        this.TYPE = TYPE;
    }

    public String getTABLEID() {
        return TABLEID;
    }

    public void setTABLEID(String TABLEID) {
        this.TABLEID = TABLEID;
    }

    public String getCONSTRAINT() {
        return CONSTRAINT;
    }

    public void setCONSTRAINT(String CONSTRAINT) {
        this.CONSTRAINT = CONSTRAINT;
    }

    public String getUNIT() {
        return UNIT;
    }

    public void setUNIT(String UNIT) {
        this.UNIT = UNIT;
    }

    public String getDD() {
        return DD;
    }

    public void setDD(String DD) {
        this.DD = DD;
    }

    public String getEDITABLE() {
        return EDITABLE;
    }

    public void setEDITABLE(String EDITABLE) {
        this.EDITABLE = EDITABLE;
    }

    public String getVISIBLE() {
        return VISIBLE;
    }

    public void setVISIBLE(String VISIBLE) {
        this.VISIBLE = VISIBLE;
    }

    public String getDispsort() {
        return dispsort;
    }

    public void setDispsort(String dispsort) {
        this.dispsort = dispsort;
    }

    public String getPrikey() {
        return prikey;
    }

    public void setPrikey(String prikey) {
        this.prikey = prikey;
    }
}
