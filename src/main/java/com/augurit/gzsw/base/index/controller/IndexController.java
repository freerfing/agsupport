package com.augurit.gzsw.base.index.controller;

import com.augurit.gzsw.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {

	@RequestMapping({"/index.do"})
	public ModelAndView index() throws Exception {
		return new ModelAndView("/client/index");
	}

	// 获取登录用户环境相关信息
	@RequestMapping({"/getUserSettings"})
	@ResponseBody
	public ApiResponse<String> getUserSettings() throws Exception {
		// TODO 获取登录用户信息
		return new ApiResponse<>(null);
	}
}
