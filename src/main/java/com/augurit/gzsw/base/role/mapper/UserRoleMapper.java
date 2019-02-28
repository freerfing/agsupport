package com.augurit.gzsw.base.role.mapper;

import com.augurit.gzsw.domain.UserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>UserRoleMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/26 16:24.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface UserRoleMapper {

    List listByRoleIdOrUserName(@Param("roleId") String roleId, @Param("userName") String userName)throws Exception;
    List listUserIds(@Param("roleId") String roleId) throws Exception;
    List listByUserId(String userId)throws Exception;
    int deleteByRoleIdsAndUserIds(@Param("roleIds") List<String> roleIds,@Param("userIds") List<String> userIds)throws Exception;
    int insertByRoleIdsAndUserIds(@Param("roleIds") List<String> roleIds,@Param("userIds") List<String> userIds)throws Exception;
}
