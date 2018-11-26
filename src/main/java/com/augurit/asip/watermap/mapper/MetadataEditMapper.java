package com.augurit.asip.watermap.mapper;

import com.augurit.asip.watermap.domain.metadataEdit.WaMetadataModify;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by czh on 2017-12-20.
 */
@Mapper
public interface MetadataEditMapper {

    public List findMetadata(@Param("maMetadataModify") WaMetadataModify maMetadataModify) throws Exception;

    public void updateMetadata(@Param("maMetadataModify") WaMetadataModify maMetadataModify) throws Exception;

    public void saveMetadata(@Param("maMetadataModify") WaMetadataModify maMetadataModify) throws Exception;
}
