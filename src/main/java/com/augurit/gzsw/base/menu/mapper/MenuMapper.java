package com.augurit.gzsw.base.menu.mapper;

import com.augurit.gzsw.domain.Menu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MenuMapper {
	List<Menu> listMenus(@Param("roleId") String roleId) throws Exception;
	//void saveMenu(Menu menu) throws Exception;
	//void updateMenu(Menu menu) throws Exception;
	//void delMenu(@Param("id") String id) throws Exception;
}
