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
    List<User> listUsersByOrgIdAndName(@Param("orgId") String orgId,@Param("userName") String userName);

    int update(User user);

    int insert(User user);

}
