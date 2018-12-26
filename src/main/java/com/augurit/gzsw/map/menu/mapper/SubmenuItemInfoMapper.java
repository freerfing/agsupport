package com.augurit.gzsw.map.menu.mapper;

import com.augurit.gzsw.domain.SubmenuItemInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SubmenuItemInfoMapper {
	List<SubmenuItemInfo> listItemInfos(@Param("subMenuItemIds") List<String> subMenuItemIds) throws Exception;
	void saveItemInfo(SubmenuItemInfo ref) throws Exception;
	void updItemInfo(SubmenuItemInfo ref) throws Exception;
	void delItemInfo(@Param("ids") List<String> ids) throws Exception;
}
