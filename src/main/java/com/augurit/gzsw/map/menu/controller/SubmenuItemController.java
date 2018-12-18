package com.augurit.gzsw.map.menu.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.domain.SubmenuItemRef;
import com.augurit.gzsw.map.menu.service.ISubmenuItemRef;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/map/submenu"})
public class SubmenuItemController {

	@Autowired
	private ISubmenuItemRef ref;

	@RequestMapping(value = "/listItemRef")
	public ApiResponse<List> listItemRef(String submenuId, String submenuItemId) throws Exception {
		List<SubmenuItemRef> refs = ref.listRefs(submenuId, submenuItemId);
		return new ApiResponse<>(refs);
	}

}
