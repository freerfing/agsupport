package com.augurit.gzsw;

public enum RespCodeMsgDepository {
	SUCCESS("200", "响应成功"),
	SERVER_INTERNAL_ERROR("500", "服务器内部系统错误"),
	SERVER_404_ERROR("404", "资源未找到"),
	REQUEST_PARAMS_DATA_ERROR("001", "请求参数错误"),
	USER_LOGIN_ERROR("002", "用户登录失败"),
	USER_NOT_FOUND("003", "用户不存在"),
	USER_LOGOUT_FAIL("004", "用户退出失败"),
	TOKEN_INVALID("005", "token无效"),
	LACK_PRIVILEGIER("006", "用户权限不够"),
	FILE_NOT_EXISTS("007", "文件不存在"),
	SMS_SEND_FAIL("008", "短信发送失败"),
	SMS_SEND_HAS_FAIL("009", "短信部分失败"),
	SMS_KEEP_FAIL("010", "短信保存失败"),
	;

	private final String code;
	private final String msg;

	RespCodeMsgDepository(String code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	public String getCode() {
		return code;
	}

	public String getMsg() {
		return msg;
	}
}
