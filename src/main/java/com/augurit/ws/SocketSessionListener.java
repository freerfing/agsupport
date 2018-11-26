package com.augurit.ws;


import org.jasig.cas.client.validation.AssertionImpl;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
@WebListener
public class SocketSessionListener implements HttpSessionListener {
    @Override
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {
//        System.out.println("-----------------------------------create-----------------------------------"+httpSessionEvent.getSession().getId());
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
//        System.out.println("-----------------------------------destory-----------------------------------"+httpSessionEvent.getSession().getId());
        HttpSession httpSession=httpSessionEvent.getSession();
        String userName=((AssertionImpl) httpSession.getAttribute("_const_cas_assertion_")).getPrincipal().getName();
        LoginSocket.socketMap.get(userName).remove(httpSession.getId());
//        System.out.println("移除"+userName+"->"+httpSession.getId());
    }
}
