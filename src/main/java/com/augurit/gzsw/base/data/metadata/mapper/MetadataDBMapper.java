package com.augurit.gzsw.base.data.metadata.mapper;

import com.augurit.gzsw.domain.MetadataDB;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.tomcat.util.descriptor.web.WebXml;

import java.util.List;

/**
 * <b><code>MetadataDBMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/8 18:00.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface MetadataDBMapper {

    List<MetadataDB> selectById(String id) throws Exception;

    List<MetadataDB> listOrByName(@Param("name")String name)throws Exception;

    int updateById(MetadataDB metadataDB) throws Exception;

    int insert(MetadataDB metadataDB) throws Exception;

    int deleteByIds(@Param("ids") List<String> ids) throws Exception;
}
