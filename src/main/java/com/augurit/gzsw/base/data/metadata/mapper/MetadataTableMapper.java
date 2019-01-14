package com.augurit.gzsw.base.data.metadata.mapper;

import com.augurit.gzsw.domain.MetadataTable;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>MetadataTableMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 15:11.
 *
 * @author zyg
 *
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface MetadataTableMapper {

    List<MetadataTable> selectById(String id) throws Exception;

    List<MetadataTable> listByDatabaseIdOrName(@Param("databaseId") String databaseId,@Param("name") String name)throws Exception;

    int updateById(MetadataTable metadataTable) throws Exception;

    int insert(MetadataTable metadataTable) throws Exception;

    int deleteByIds(@Param("ids") List<String> ids) throws Exception;

    int deleteByDBIds(@Param("dbIds") List<String> dbIds) throws Exception;
 }
