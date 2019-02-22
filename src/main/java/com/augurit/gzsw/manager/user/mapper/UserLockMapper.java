package com.augurit.gzsw.manager.user.mapper;

import com.augurit.gzsw.domain.UserLock;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserLockMapper {
    List<UserLock> listUserLock(@Param("userName") String userName) throws Exception;
    // 通过id、登录名、手机号获取最新记录
    UserLock getUserLock(@Param("userLock") UserLock userLock) throws Exception;
    void saveUserLock(@Param("userLock") UserLock userLock) throws Exception;
    void updateUserLock(@Param("id") String id, @Param("isLock") String isLock, @Param("lockEndTime") String lockEndTime, @Param("failLoginTimes") int failLoginTimes) throws Exception;
    void unlockBatchUsers(@Param("ids") String[] ids, @Param("isLock") String isLock, @Param("lockEndTime") String lockEndTime) throws Exception;
    void delUserLock(@Param("id") String id) throws Exception;
}
