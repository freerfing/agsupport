package com.augurit.asip.watermap.sc.base.service;

import com.augurit.asip.watermap.domain.Menu;

import java.util.List;

public interface IMenu {
    List<Menu> listMenus(String roleId) throws Exception;
    void saveMenu(Menu menu) throws Exception;
    void updateMenu(Menu menu) throws Exception;
    void delMenu(String id) throws Exception;
}
