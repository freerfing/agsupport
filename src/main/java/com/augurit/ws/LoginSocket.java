package com.augurit.ws;


import com.augurit.agcom.common.CasLoginHelpClient;
import org.jasig.cas.client.validation.AssertionImpl;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

/**
 * @ServerEndpoint 注解是一个类层次的注解，它的功能主要是将目前的类定义成一个websocket服务器端,
 * 注解的值将被用于监听用户连接的终端访问URL地址,客户端可以通过这个URL来连接到WebSocket服务器端
 */
@ServerEndpoint(value = "/ws/loginSocket", configurator = HttpSessionConfigurator.class)
@Component
public class LoginSocket {
    public static HashMap<String, HashMap<String, HashMap<String, Session>>> socketMap = new HashMap<String, HashMap<String, HashMap<String, Session>>>();
    private Session session;
    private HttpSession httpSession;
    private String userName;

    /**
     *
     *
     */
    @OnOpen
    public void onOpen(Session session) {
        HttpSession httpSession = (HttpSession) session.getUserProperties().get("HttpSession");
        this.session = session;
        this.httpSession = httpSession;
        String userName = ((AssertionImpl) httpSession.getAttribute("_const_cas_assertion_")).getPrincipal().getName();
        if (userName != null) {
            this.userName = userName;
            HashMap<String, HashMap<String, Session>> userMap = socketMap.get(userName);
            if (userMap == null) {//用户没有登录过
                userMap = new HashMap<String, HashMap<String, Session>>();
                socketMap.put(userName, userMap);
            }
            HashMap<String, Session> httpSessionMap = userMap.get(httpSession.getId());
            if (httpSessionMap == null) {//sessionid不存在,则创建新的
                if (userMap.size() > 0) {
                    logoutByWebSocket(userMap);
                } else {
//                    System.out.println("直接新增sessionid----------------------------------------");
                }
                httpSessionMap = new HashMap<String, Session>();
                userMap.put(httpSession.getId(), httpSessionMap);
            }
            httpSessionMap.put(session.getId(), session);
//            System.out.println("添加websocket:" + userName + "(" + userMap.size() + ")" + "->" + httpSession.getId() + "->" + session.getId());
        }
    }

    /**
     * 将已登录的页面退出
     *
     * @param
     */
    public void logoutByWebSocket(HashMap<String, HashMap<String, Session>> userMap) {
        for (String httpsessionid : userMap.keySet()) {
            HashMap<String, Session> httpSessionMap = userMap.get(httpsessionid);
            for (String sessionid : httpSessionMap.keySet()) {
                Session session = httpSessionMap.get(sessionid);
                try {
                    System.out.println("退出" + session.getId());
                    session.getBasicRemote().sendText("退出");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session) {
        if (userName == null) return;//解决直接刷新index.html
        if (socketMap.get(userName).get(httpSession.getId()) == null) return;
        socketMap.get(userName).get(httpSession.getId()).remove(session.getId());
        if (socketMap.get(userName).get(httpSession.getId()).size() == 0)
            socketMap.get(userName).remove(httpSession.getId());
        System.out.println("移除websocket:" + userName + "->" + httpSession.getId() + "->" + session.getId());
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
    @OnMessage
    public void onMessage(String message, Session session) {

    }

    /**
     * 发生错误时调用
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("发生错误");
        error.printStackTrace();
    }
}