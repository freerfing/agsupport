package com.augurit.gzsw.base.data.dic.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.base.data.dic.service.DataDicService;
import com.augurit.gzsw.domain.DataDic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <b><code>DataDicController</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/1/8 14:55.
 *
 * @author zyg
 * @since awater ${PROJECT_VERSION}
 */
@RestController
@RequestMapping("/dic")
public class DataDicController {

    @Autowired
    private DataDicService dataDicService;


    /**
     * @param pid 父编码 默认查询为root
     * @param id  编码，可为空
     * @param name 编码名称，可为空
     *  根据pid，id，name查询，默认只根据pid查询，name是模糊查询
     *             1.根据pid查询 默认为root
     *             2.pid 与 id 搭配查询
     *             3.pid 与 name 搭配查询
     *             4.pid 与 id 与 name 搭配查询
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("list")
    public ApiResponse listByPidOrIdOrName(@RequestParam(defaultValue = "root") String pid,String id,String name)throws Exception{
        List<DataDic> dataDics = dataDicService.listByPidOrIdOrName(pid,id,name);
        return new ApiResponse(dataDics);
    }

    @Transactional
    @RequestMapping("save")
    public ApiResponse insert(DataDic dataDic) throws Exception{
        int success = dataDicService.insert(dataDic);
        return new ApiResponse(success);
    }

    @Transactional
    @RequestMapping("update")
    public ApiResponse updateById(DataDic dataDic)throws Exception{
        int success = dataDicService.updateById(dataDic);
        return new ApiResponse(success);
    }

    //批量删除，同时也删除其子节点
    @Transactional
    @RequestMapping("delete")
    public ApiResponse deleteByIds(@RequestParam("ids") List<String> ids)throws Exception{
        int success = dataDicService.deleteByIds(ids);
        return new ApiResponse(success);
    }
}
