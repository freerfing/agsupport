package com.augurit.gzsw.domain;

import com.google.common.base.Strings;
import com.google.common.collect.Collections2;
import org.apache.commons.collections.CollectionUtils;

public class UserLock {
	private String id;
	private String loginName;
	private String userName;
	private String mobile;
	private String qq;
	private String isLock;
	private String lockStartTime;
	private String lockEndTime;
	private String orgPath;
	private int failLoginTimes;

	public UserLock() {}

	public UserLock(User user) {
		if(user != null) {
			this.id = user.getUserId();
			this.loginName = user.getLoginName();
			this.userName = user.getUserName();
			this.mobile = user.getTel();
			this.qq = user.getQq();
			if(CollectionUtils.isNotEmpty(user.getOrgs())) {
				StringBuilder buf = new StringBuilder();
				for(Org org : user.getOrgs()) {
					if(!Strings.isNullOrEmpty(org.getName())) {
						buf.append(org.getName() + ",");
					}
				}

				String orgPaths = buf.toString();
				if(!Strings.isNullOrEmpty(orgPaths) && orgPaths.length() > 1) {
					this.orgPath = orgPaths.substring(0, orgPaths.length() - 1);
				}
			}

		}
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getIsLock() {
		return isLock;
	}

	public void setIsLock(String isLock) {
		this.isLock = isLock;
	}

	public String getLockStartTime() {
		return lockStartTime;
	}

	public void setLockStartTime(String lockStartTime) {
		this.lockStartTime = lockStartTime;
	}

	public String getLockEndTime() {
		return lockEndTime;
	}

	public void setLockEndTime(String lockEndTime) {
		this.lockEndTime = lockEndTime;
	}

	public String getOrgPath() {
		return orgPath;
	}

	public void setOrgPath(String orgPath) {
		this.orgPath = orgPath;
	}

	public int getFailLoginTimes() {
		return failLoginTimes;
	}

	public void setFailLoginTimes(int failLoginTimes) {
		this.failLoginTimes = failLoginTimes;
	}
}
