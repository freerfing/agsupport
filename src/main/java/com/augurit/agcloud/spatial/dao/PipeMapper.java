package com.augurit.agcloud.spatial.dao;

import com.augurit.agcloud.spatial.domain.Pipe;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
public interface PipeMapper {

    public String xzqtjSql="select sum(length) length,district from(select sum(length) length,district from PS_PIPE_ZY where district is not null group by district union all select sum(length) length,district from PS_CANAL_ZY where district is not null group by district) a  group by a.district";

    @Select(xzqtjSql)
    public List<Pipe> xzqtj();

    public String lxtjSql="select sum(length) length,sort from(select sum(length) length,sort from PS_PIPE_ZY where district is not null group by sort union all select sum(length) length,sort from PS_CANAL_ZY where district is not null   group by sort) a  group by a.sort";

    @Select(lxtjSql)
    public List< Pipe> lxtj();

    public String xzqlxtjSql="select sum(length) length,district,sort from(select sum(length) length,district,sort from ps_pipe_zy where district is not null  group by district,sort  union all select sum(length) length,district,sort from ps_canal_zy where district is not null group by district,sort) a group by district,sort";

    @Select(xzqlxtjSql)
    List<Pipe> xzqlxtj();

}

