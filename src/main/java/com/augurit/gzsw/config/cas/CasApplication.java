package com.augurit.gzsw.config.cas;

import org.jasig.cas.client.authentication.AuthenticationFilter;
import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.session.SingleSignOutHttpSessionListener;
import org.jasig.cas.client.util.AssertionThreadLocalFilter;
import org.jasig.cas.client.util.HttpServletRequestWrapperFilter;
import org.jasig.cas.client.validation.Cas20ProxyReceivingTicketValidationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.embedded.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CasApplication {

	@Value(value = "${server.cas-server-validate-url}")
	private String casServerValidateUrl;

	@Value(value = "${server.cas-client-domain}")
	private String clientServName;

	@Bean
	public FilterRegistrationBean initFilterRegistrationBean1() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new SingleSignOutFilter());
		registration.addUrlPatterns(new String[]{"/*"});
		registration.setName("CAS Single Sign Out Filter");
		registration.setOrder(11);
		return registration;
	}

	@Bean
	public ServletListenerRegistrationBean initServletListenerRegistrationBean() {
		ServletListenerRegistrationBean registration = new ServletListenerRegistrationBean();
		SingleSignOutHttpSessionListener singleSignOutHttpSessionListener = new SingleSignOutHttpSessionListener();
		registration.setListener(singleSignOutHttpSessionListener);
		return registration;
	}

	@Bean
	public FilterRegistrationBean initFilterRegistrationBean2() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new Cas20ProxyReceivingTicketValidationFilter());
		registration.addUrlPatterns(new String[]{"/*"});
		registration.addInitParameter("casServerUrlPrefix", this.casServerValidateUrl);
		registration.addInitParameter("serverName", this.clientServName);
		registration.addInitParameter("useSession", "true");
		registration.addInitParameter("exceptionOnValidationFailure", "false");
		registration.addInitParameter("redirectAfterValidation", "true");
		registration.setName("CAS Validation Filter");
		registration.setOrder(12);
		return registration;
	}

	@Bean
	public FilterRegistrationBean initFilterRegistrationBean3() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new AuthenticationFilter());
		registration.addUrlPatterns(new String[] {"/*"});
		registration.addInitParameter("casServerLoginUrl", this.casServerValidateUrl + "/login");
		registration.addInitParameter("casServerLogoutUrl", this.casServerValidateUrl + "/logout");
		// lib路径下都是第三方前端包
		registration.addInitParameter("casIgnoreUrls", "/lib/,getLoginUser,checkLogin");
		registration.addInitParameter("serverName", this.clientServName);
		registration.setName("CAS Authentication Filter");
		registration.setOrder(13);
		return registration;
	}

	@Bean
	public FilterRegistrationBean initFilterRegistrationBean4() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new HttpServletRequestWrapperFilter());
		registration.addUrlPatterns(new String[]{"/*"});
		registration.setName("CAS HttpServletRequest Wrapper Filter");
		registration.setOrder(14);
		return registration;
	}

	@Bean
	public FilterRegistrationBean initFilterRegistrationBean5() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new AssertionThreadLocalFilter());
		registration.addUrlPatterns(new String[]{"/*"});
		registration.setName("CAS Assertion Thread Local Filter");
		registration.setOrder(15);
		return registration;
	}
}
