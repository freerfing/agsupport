package com.augurit.gzsw.base.role.service.impl;

import com.augurit.gzsw.base.role.mapper.RoleMapper;
import com.augurit.gzsw.base.role.service.IRole;
import com.augurit.gzsw.domain.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	public List<Role> listRolesByName(String name) throws Exception{
		System.out.println(name);
		return roleMapper.listRolesByName(name);
	}

	@Transactional
	@Override
	public void saveRole(Role role) throws Exception {
		roleMapper.saveRole(role);
	}

	@Transactional
	@Override
	public void updateRole(Role role) throws Exception {
		roleMapper.updateRole(role);
	}

	@Transactional
	@Override
	public void delRoles(List<String> ids) throws Exception {
		roleMapper.delRoles(ids);
	}
}
