package com.augurit.gzsw.base.role.service;

import com.augurit.gzsw.domain.Role;

import java.util.List;

public interface IRole {
	List<Role> listRoles() throws Exception;
	void saveRole(Role role) throws Exception;
	void updateRole(Role role) throws Exception;
	void delRoles(List<String> ids) throws Exception;
}
