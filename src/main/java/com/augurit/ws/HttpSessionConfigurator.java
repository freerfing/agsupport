package com.augurit.ws;

import com.augurit.agcom.common.CasLoginHelpClient;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;
import javax.websocket.server.ServerEndpointConfig.Configurator;
/*
 * 用于在websocket中获取HttpSession,将HttpSession放到userProperties中
 *
 */
public class HttpSessionConfigurator extends Configurator {

    @Override
    public void modifyHandshake(ServerEndpointConfig sec,HandshakeRequest request, HandshakeResponse response) {
        HttpSession httpSession=(HttpSession) request.getHttpSession();

        if(httpSession!=null)
            sec.getUserProperties().put("HttpSession",httpSession);
    }

}