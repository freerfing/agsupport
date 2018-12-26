package com.augurit.gzsw.base.role.service.impl;

import com.augurit.gzsw.base.role.mapper.RoleMapper;
import com.augurit.gzsw.base.role.service.IRole;
import com.augurit.gzsw.domain.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleImpl implements IRole {

	@Autowired
	private RoleMapper roleMapper;

	@Override
	public List<Role> listRoles() throws Exception {
		return roleMapper.listRoles();
	}

	@Override
	public void saveRole(Role role) throws Exception {
		roleMapper.saveRole(role);
	}

	@Override
	public void updateRole(Role role) throws Exception {
		roleMapper.updateRole(role);
	}

	@Override
	public void delRoles(List<String> ids) throws Exception {
		roleMapper.delRoles(ids);
	}
}
