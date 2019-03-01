package com.augurit.gzsw.manager.user.service;

import com.augurit.gzsw.domain.UserLock;

import java.util.List;

public interface IUserLock {
	List<UserLock> listUserLock(String userName) throws Exception;
	UserLock getUserLock(UserLock userLock) throws Exception;
	void saveUserLock(UserLock userLock) throws Exception;
	void updateUserLock(String id, String isLock, String lockEndTime, int failLoginTimes) throws Exception;
	void unlockBatchUsers(String[] ids, String isLock, String lockEndTime) throws Exception;
	void delUserLock(String id) throws Exception;
}
