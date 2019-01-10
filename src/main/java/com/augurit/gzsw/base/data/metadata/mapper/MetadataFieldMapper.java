package com.augurit.gzsw.base.data.metadata.mapper;

import com.augurit.gzsw.domain.MetadataField;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>MetadataFieldMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/9 15:11.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface MetadataFieldMapper {

    List<MetadataField> selectById(String id) throws Exception;

    List<MetadataField> listByTableIdOrName(@Param("tableId") String tableId,@Param("name") String name) throws Exception;

    int updateById(MetadataField metadataField) throws Exception;

    int insert(MetadataField metadataField) throws Exception;

    int deleteByIds(@Param("ids") List<String> ids) throws Exception;

    int deleteByTableIds(@Param("tableIds") List<String> tableIds) throws Exception;
}
