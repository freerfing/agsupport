package com.augurit.agcloud.spatial.service;

import com.augurit.agcloud.spatial.dao.PipeMapper;
import com.augurit.agcloud.spatial.domain.Pipe;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PipeService {

    @Autowired
    PipeMapper pipeMapper;

    public List<Pipe> xzqtj(){
        return pipeMapper.xzqtj();
    }

    public List<Pipe> lxtj() {
        return pipeMapper.lxtj();
    }

    public List<Pipe> xzqlxtj() {
        return pipeMapper.xzqlxtj();
    }
}
