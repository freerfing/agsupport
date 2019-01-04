package com.augurit.gzsw.base.role.mapper;

import com.augurit.gzsw.domain.Role;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RoleMapper {
	List<Role> listRoles() throws Exception;
	void saveRole(Role role) throws Exception;
	void updateRole(Role role) throws Exception;
	void delRoles(@Param("ids") List<String> ids) throws Exception;
}
