package com.augurit.asip.watermap.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//@WebFilter(filterName = "SecurityFilter", urlPatterns = "/*")
public class SecurityFilter implements Filter {
	@Override
	public void init(FilterConfig config) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
		doChain((HttpServletRequest) req, (HttpServletResponse) resp, chain);
	}

	@Override
	public void destroy() {

	}

	private void doChain(HttpServletRequest req, HttpServletResponse resp, FilterChain chain) throws IOException, ServletException {
		String referer = req.getHeader("referer");
		if (referer == null || !referer.contains(req.getServerName())) {
			// 放行一些非浏览器请求
			String path = req.getServletPath();
			if(path.equals("/") || path.startsWith("/ws") || path.startsWith("/index.do") || path.startsWith("/spa.html")) {
				chain.doFilter(req, resp);
			} else {
				resp.setStatus(400);
			}
		} else {
			chain.doFilter(req, resp);
		}
	}
}