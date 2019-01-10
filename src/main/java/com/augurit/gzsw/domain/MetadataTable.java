package com.augurit.gzsw.domain;

import java.util.Date;

/**
 * <b><code>MetadataTable</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 14:58.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public class MetadataTable {

    private String id;
    private String name;
    private String cname;
    private String databaseId;
    private Date modifyTime;
    private String priId;
    private String dirLayerId;
    private String distField;
    private String layerConfig;
    private String searchField;
    private String groupField;
    private String sumField;
    private String fieldUnit;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getDatabaseId() {
        return databaseId;
    }

    public void setDatabaseId(String databaseId) {
        this.databaseId = databaseId;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    public String getPriId() {
        return priId;
    }

    public void setPriId(String priId) {
        this.priId = priId;
    }

    public String getDirLayerId() {
        return dirLayerId;
    }

    public void setDirLayerId(String dirLayerId) {
        this.dirLayerId = dirLayerId;
    }

    public String getDistField() {
        return distField;
    }

    public void setDistField(String distField) {
        this.distField = distField;
    }

    public String getLayerConfig() {
        return layerConfig;
    }

    public void setLayerConfig(String layerConfig) {
        this.layerConfig = layerConfig;
    }

    public String getSearchField() {
        return searchField;
    }

    public void setSearchField(String searchField) {
        this.searchField = searchField;
    }

    public String getGroupField() {
        return groupField;
    }

    public void setGroupField(String groupField) {
        this.groupField = groupField;
    }

    public String getSumField() {
        return sumField;
    }

    public void setSumField(String sumField) {
        this.sumField = sumField;
    }

    public String getFieldUnit() {
        return fieldUnit;
    }

    public void setFieldUnit(String fieldUnit) {
        this.fieldUnit = fieldUnit;
    }
}
