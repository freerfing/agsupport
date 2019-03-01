package com.augurit.gzsw.manager.user.mapper;

import com.augurit.gzsw.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>UserMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2018/12/20 15:27.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface UserMapper {

    User getUserByUserName(String userName) throws Exception;

    List<User> listUsersByIds(@Param("ids")List<String> ids);

    int update(User user);

    int insert(User user);

    List<User> listUsers(@Param("orgIds") List<String> orgIds,@Param("userName") String userName);

    User getUser(@Param("id") String id, @Param("loginName") String loginName, @Param("tel") String tel) throws Exception;
}
