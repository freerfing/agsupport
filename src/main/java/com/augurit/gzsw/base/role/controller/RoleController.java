package com.augurit.gzsw.base.role.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.base.role.service.IRole;
import com.augurit.gzsw.domain.Role;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	//当name为空时，查询所有的角色，否则根据name进行模糊查询
	@RequestMapping("/listRoles")
	public ApiResponse<List> listRolesOrByName(@RequestParam(defaultValue = "") String name) throws Exception {
		List<Role> roles = null;
		if (StringUtils.isEmpty(name)) {
			roles = irole.listRoles();
		}else {
			roles = irole.listRolesByName(name);
		}
		return new ApiResponse<>(roles);
	}


	@RequestMapping("/saveRole")
	public ApiResponse<Object> saveRole(Role role) throws Exception {
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
