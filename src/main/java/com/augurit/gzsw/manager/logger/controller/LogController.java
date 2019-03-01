package com.augurit.gzsw.manager.logger.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.RespCodeMsgDepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/manager/logger")
public class LogController {
	@RequestMapping("/log")
	public ApiResponse log() throws Exception {
		System.out.println("日志记录。。");
		return new ApiResponse(RespCodeMsgDepository.SUCCESS, null);
	}
}
