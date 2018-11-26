package com.augurit.agcloud.spatial.controller;

import com.augurit.agcloud.spatial.domain.Pipe;
import com.augurit.agcloud.spatial.dao.PipeMapper;
import com.augurit.agcloud.spatial.service.PipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pipe")
public class PipeStatistController {
    @Autowired
    PipeService pipeService;

    @RequestMapping("/xzqtj")
    public List<Pipe> xzqtj(){//按行政区统计
        return pipeService.xzqtj();
    }

    @RequestMapping("/lxtj")
    public List<Pipe> lxtj(){//按类型统计
        return pipeService.lxtj();
    }

    @RequestMapping("/xzqlxtj")
    public List<Pipe> xzqlxtj(){//按行政区及类型统计
        return pipeService.xzqlxtj();
    }
}
