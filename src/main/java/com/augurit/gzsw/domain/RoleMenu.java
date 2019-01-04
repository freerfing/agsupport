package com.augurit.gzsw.domain;

/**
 * <b><code>RoleMenu</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/3 15:19.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
public class RoleMenu {

    private String id;
    private String roleId;
    private String menuId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }
}
