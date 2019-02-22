package com.augurit.gzsw.manager.user.service.impl;

import com.augurit.gzsw.domain.UserLock;
import com.augurit.gzsw.manager.user.mapper.UserLockMapper;
import com.augurit.gzsw.manager.user.service.IUserLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserLockImpl implements IUserLock {

	@Autowired
	private UserLockMapper userLockMapper;

	@Override
	public List<UserLock> listUserLock(String userName) throws Exception {
		return userLockMapper.listUserLock(userName);
	}

	@Override
	public UserLock getUserLock(UserLock userLock) throws Exception {
		return userLockMapper.getUserLock(userLock);
	}

	@Override
	public void saveUserLock(UserLock userLock) throws Exception {
		userLockMapper.saveUserLock(userLock);
	}

	@Override
	public void updateUserLock(String id, String isLock, String lockEndTime, int failLoginTimes) throws Exception {
		userLockMapper.updateUserLock(id, isLock, lockEndTime, failLoginTimes);
	}

	@Override
	public void unlockBatchUsers(String[] ids, String isLock, String lockEndTime) throws Exception {
		userLockMapper.unlockBatchUsers(ids, isLock, lockEndTime);
	}

	@Override
	public void delUserLock(String id) throws Exception {
		userLockMapper.delUserLock(id);
	}
}
