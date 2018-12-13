package com.augurit.gzsw;

import com.google.common.base.Strings;

import javax.validation.constraints.NotNull;

public class ApiException extends RuntimeException {
	private RespCodeMsgDepository depository;

	public ApiException(@NotNull RespCodeMsgDepository depository, Exception parent) {
		super(Strings.nullToEmpty(depository.getMsg()));
		this.depository = depository;
	}

	public RespCodeMsgDepository getDepository() {
		return depository;
	}

	public void setDepository(RespCodeMsgDepository depository) {
		this.depository = depository;
	}
}
