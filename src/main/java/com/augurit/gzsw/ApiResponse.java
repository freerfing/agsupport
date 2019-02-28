package com.augurit.gzsw;

public class ApiResponse<T> {
	private String code = "200";
	private String msg = "响应成功";
	private T content;

	public ApiResponse(T content) {
		this.content = content;
	}

	public ApiResponse(RespCodeMsgDepository depository) {
		this.code = depository.getCode();
		this.msg = depository.getMsg();
	}

	public ApiResponse(RespCodeMsgDepository depository, T content) {
		this.code = depository.getCode();
		this.msg = depository.getMsg();
		this.content = content;
	}

	public ApiResponse(String code, String msg, T content) {
		this.code = code;
		this.msg = msg;
		this.content = content;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public T getContent() {
		return content;
	}

	public void setContent(T content) {
		this.content = content;
	}
}
