package com.augurit.gzsw.base.menu.mapper;

import com.augurit.gzsw.domain.Menu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MenuMapper {
	List<Menu> listMenus(@Param("roleId") String roleId) throws Exception;
	List<Menu> listChildMenus(@Param("parentId") String parentId, @Param("isCascade") boolean isCascade) throws Exception;
	void saveMenu(Menu menu) throws Exception;
	void updateMenu(Menu menu) throws Exception;
	void delMenus(@Param("ids") List<String> ids) throws Exception;
	Integer getMaxDispOrder() throws Exception;
	Menu getMenuById(@Param("id") String id) throws Exception;
}
