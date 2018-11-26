package com.augurit.asip.watermap.sc.res.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/res")
@RestController
public class ResContorlller {
    @RequestMapping({"/index.do"})
    public ModelAndView index() throws Exception {
        return new ModelAndView("/res/index");
    }
}
