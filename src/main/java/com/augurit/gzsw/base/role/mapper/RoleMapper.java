package com.augurit.gzsw.base.role.mapper;

import com.augurit.gzsw.domain.Role;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Mapper
public interface RoleMapper {
	List<Role> listRoles() throws Exception;
	List<Role> listRolesByName(@RequestParam("name") String name) throws Exception;
	void saveRole(Role role) throws Exception;
	void updateRole(Role role) throws Exception;
	void delRoles(List<String> ids) throws Exception;
}
