package com.augurit.gzsw.domain;

/**
 * <b><code>OrgUser</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/20 10:05.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public class OrgUser {
    private String OrgId;
    private String userId;
    private Integer disporder;

    public String getOrgId() {
        return OrgId;
    }

    public void setOrgId(String orgId) {
        OrgId = orgId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getDisporder() {
        return disporder;
    }

    public void setDisporder(Integer disporder) {
        this.disporder = disporder;
    }
}
