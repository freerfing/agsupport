package com.augurit.agcom.sc.index.controller;

import com.augurit.agcom.common.CasLoginHelpClient;
import com.augurit.agcom.sc.index.service.IIndex;
import com.common.util.Common;
import com.common.util.ConfigProperties;
import com.common.util.HttpRequester;
import eu.bitwalker.useragentutils.UserAgent;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class IndexController {

    @Autowired
    private IIndex iIndex;

    @RequestMapping({"/index.do"})
    public ModelAndView index(Model model, HttpServletRequest request) {
//        List<Menu> menus = this.iIndex.getIndexMenu();
//        model.addAttribute("menus", menus);
//        OmQcAuth.getInstance().init(request);

        return new ModelAndView("/asip/index");
    }

    @RequestMapping({"/logoutByCas.do"})
    public void logoutByCas(HttpServletRequest request, HttpServletResponse response) {
        String loginName = CasLoginHelpClient.getLoginName(request);
        request.getSession().removeAttribute("_const_cas_assertion_");
        String path = request.getContextPath();
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
        log(request,loginName);
        try {
            String url = CasLoginHelpClient.getCasServerLogoutUrl() + "?service=" + basePath;
            response.sendRedirect(url + "&t=" + (new Date()).getTime());
        } catch (IOException var6) {
            var6.printStackTrace();
        }

    }
    public void log(HttpServletRequest request,String loginName){
        UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
        String ip = Common.getIpAddr(request);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("loginName", loginName);
        jsonObject.put("sysName", "awater");
        jsonObject.put("ipAddress", ip);
        jsonObject.put("funcName", "登出系统");
        jsonObject.put("browser", userAgent.getBrowser().getName());

        Map<String, String> params = new HashMap<String, String>();

        String url = ConfigProperties.getByKey("agsupport.url") + "/agsupport/log/info";
        HttpRequester httpRequester = new HttpRequester();
        try {
            jsonObject.put("operResult", "成功");
            params.put("json",jsonObject.toString());
            httpRequester.sendPost(url, params);
        } catch (IOException e1) {
            jsonObject.put("operResult", "失败");
            try {
                params.put("json",jsonObject.toString());
                httpRequester.sendPost(url, params);
            }catch(IOException e2){
                e2.printStackTrace();
            }
            e1.printStackTrace();
        }
    }
}



/* Location:           D:\code\svn\agcloud\agsupport_5.0\src\lib\agsupport-5.0.jar

 * Qualified Name:     com.augurit.agcom.sc.index.controller.IndexController

 * JD-Core Version:    0.7.0.1

 */