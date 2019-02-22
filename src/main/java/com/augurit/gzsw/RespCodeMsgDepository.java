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
	USER_LOGIN_FAIL_1("008", "您提供的凭证有误"),
	USER_LOGIN_FAIL_2("009", "登录失败，还剩3次锁定账户"),
	USER_LOGIN_FAIL_3("010", "登录失败，还剩2次锁定账户"),
	USER_LOGIN_FAIL_4("011", "登录失败，还剩1次锁定账户"),
	USER_LOGIN_FAIL_5("012", "账户已锁，请联系管理员"),
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

	public static RespCodeMsgDepository getLoginFailInstance(int loginFailTimes) {
		switch (loginFailTimes) {
			case 1: return USER_LOGIN_FAIL_1;
			case 2: return USER_LOGIN_FAIL_2;
			case 3: return USER_LOGIN_FAIL_3;
			case 4: return USER_LOGIN_FAIL_4;
			case 5: return USER_LOGIN_FAIL_5;
			default: return null;
		}
	}
}
