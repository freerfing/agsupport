package com.augurit.gzsw.base.role.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.base.role.service.IRole;
import com.augurit.gzsw.domain.Role;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping({"/role"})
public class RoleController {

	@Autowired
	private IRole irole;

	@RequestMapping({"/index.do"})
	public ModelAndView index() throws Exception {
		return new ModelAndView("/role/index");
	}

	@RequestMapping("/listRoles")
	public ApiResponse<List> listRoles() throws Exception {
		List<Role> roles = irole.listRoles();
		return new ApiResponse<>(roles);
	}

	@RequestMapping("/saveRole")
	public ApiResponse<Object> saveRole(Role role) throws Exception {
		role.setId(DefaultIdGenerator.getIdForStr());
		irole.saveRole(role);
		return new ApiResponse<>(null);
	}

	@RequestMapping("/updateRole")
	public ApiResponse<Object> updateRole(Role role) throws Exception {
		irole.updateRole(role);
		return new ApiResponse<>(null);
	}

	@RequestMapping("/delRoles")
	public ApiResponse<Object> delRoles(String id) throws Exception {
		irole.delRoles(Lists.newArrayList(id.split(",")));
		return new ApiResponse<>(null);
	}
}
