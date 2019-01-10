package com.augurit.gzsw.domain;

/**
 * <b><code>DataDic</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/8 11:24.
 *
 * @author zyg
 *
 * @since awater ${PROJECT_VERSION}
 */
public class DataDic {

    private String id;
    private String name;
    private String value;
    private String pid;
    private String xpath;
    private int dispOrder;
    private String note;

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

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getXpath() {
        return xpath;
    }

    public void setXpath(String xpath) {
        this.xpath = xpath;
    }

    public int getDispOrder() {
        return dispOrder;
    }

    public void setDispOrder(int dispOrder) {
        this.dispOrder = dispOrder;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
