package com.augurit.gzsw.base.role.mapper;

import com.augurit.gzsw.domain.Menu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>RoleMenuMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/3 15:29.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface RoleMenuMapper {

    //根据roleId 和 menuName进行查询，menuName可为空
    List<Menu> listMenuByRoleIdOrMenuName(@Param("roleId") String roleId, @Param("menuName") String menuName)throws Exception;

    int bindRoleMenu(@Param("roleIds") List<String> roleIds,@Param("menuIds") List<String> menuIds)throws Exception;

    int releaseRoleMenu(@Param("roleIds") List<String> roleIds,@Param("menuIds") List<String>menuIds) throws Exception;
}
