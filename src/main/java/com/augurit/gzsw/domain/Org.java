package com.augurit.gzsw.domain;

/**
 * <b><code>Org</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/19 15:13.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public class Org {
    private String id;
    private String name;
    private String orgCode;
    private String parentOrgCode;
    private String xpath;
    private int disporder;

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

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getParentOrgCode() {
        return parentOrgCode;
    }

    public void setParentOrgCode(String parentOrgCode) {
        this.parentOrgCode = parentOrgCode;
    }

    public String getXpath() {
        return xpath;
    }

    public void setXpath(String xpath) {
        this.xpath = xpath;
    }

    public int getDisporder() {
        return disporder;
    }

    public void setDisporder(int dispOrder) {
        this.disporder = disporder;
    }
}
