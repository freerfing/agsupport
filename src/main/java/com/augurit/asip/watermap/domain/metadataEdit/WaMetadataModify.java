package com.augurit.asip.watermap.domain.metadataEdit;

/**
 * 源数据实体类
 * Created by czh on 2017-12-20.
 */
public class WaMetadataModify {

    private String id;
    private String tableName;
    private String priField;
    private String priValue;
    private String fieldDescription;
    private String origValue;
    private String modiValue;
    private String remark;
    private String isModi;
    private String isDel;
    private String isAdd;
    private String lastUpdate;
    private String operaName; // 操作人

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getPriField() {
        return priField;
    }

    public void setPriField(String priField) {
        this.priField = priField;
    }

    public String getPriValue() {
        return priValue;
    }

    public void setPriValue(String priValue) {
        this.priValue = priValue;
    }

    public String getFieldDescription() {
        return fieldDescription;
    }

    public void setFieldDescription(String fieldDescription) {
        this.fieldDescription = fieldDescription;
    }

    public String getOrigValue() {
        return origValue;
    }

    public void setOrigValue(String origValue) {
        this.origValue = origValue;
    }

    public String getModiValue() {
        return modiValue;
    }

    public void setModiValue(String modiValue) {
        this.modiValue = modiValue;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getIsModi() {
        return isModi;
    }

    public void setIsModi(String isModi) {
        this.isModi = isModi;
    }

    public String getIsDel() {
        return isDel;
    }

    public void setIsDel(String isDel) {
        this.isDel = isDel;
    }

    public String getIsAdd() {
        return isAdd;
    }

    public void setIsAdd(String isAdd) {
        this.isAdd = isAdd;
    }

    public String getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

	public String getOperaName() {
		return operaName;
	}

	public void setOperaName(String operaName) {
		this.operaName = operaName;
	}
}
