package com.augurit.gzsw.map.menu.mapper;

import com.augurit.gzsw.domain.SubmenuItemRef;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SubmenuItemRefMapper {
	List<SubmenuItemRef> listRefs(String subMenuId, String subMenuItemId) throws Exception;
}
