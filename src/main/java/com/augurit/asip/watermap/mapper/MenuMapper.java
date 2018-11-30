package com.augurit.asip.watermap.mapper;

import com.augurit.asip.watermap.domain.Menu;

import java.util.List;

public interface MenuMapper {
    List<Menu> listMenus(String roleId) throws Exception;
    void saveMenu(Menu menu) throws Exception;
    void updateMenu(Menu menu) throws Exception;
    void delMenu(String id) throws Exception;
}
