package com.augurit.gzsw;

import java.util.List;

import org.apache.catalina.connector.Connector;
import org.apache.coyote.http11.Http11NioProtocol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@SpringBootApplication(
		exclude = {MongoAutoConfiguration.class}
)
@EnableWebMvc
@EnableScheduling
@EnableAsync
@ServletComponentScan
public class App extends WebMvcConfigurerAdapter {

	@Autowired
	private HttpMessageConverters messageConverters;

	private static Logger logger = LoggerFactory.getLogger(App.class);

	@Value("${server.port}")
	private int tomcatPort;

	public App() {}

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		logger.debug("初始化 EasyUI 分页请求参数处理器");
		//argumentResolvers.add(new EasyuiPageArgumentResolver());
	}

	public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
		logger.debug("注册统一的异常处理Bean");
		//exceptionResolvers.add(this.registerExceptionResolver());
	}

	@Bean
	public InternalResourceViewResolver initInternalResourceViewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setPrefix("/WEB-INF/ui-jsp/");
		resolver.setSuffix(".jsp");
		return resolver;
	}

	@Bean
	public DefaultAdvisorAutoProxyCreator initDefaultAdvisorAutoProxyCreator() {
		DefaultAdvisorAutoProxyCreator daap = new DefaultAdvisorAutoProxyCreator();
		daap.setProxyTargetClass(true);
		return daap;
	}

	@Bean
	public EmbeddedServletContainerFactory initEmbeddedServletContainerFactory() {
		TomcatEmbeddedServletContainerFactory tomcatFactory = new TomcatEmbeddedServletContainerFactory();
		tomcatFactory.setPort(this.tomcatPort);
		tomcatFactory.addConnectorCustomizers(new TomcatConnectorCustomizer[]{new App.MyTomcatConnectorCustomizer()});
		return tomcatFactory;
	}

	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		converters.addAll(this.messageConverters.getConverters());
	}

	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.do");
		registry.setOrder(-2147483648);
		super.addViewControllers(registry);
	}

	class MyTomcatConnectorCustomizer implements TomcatConnectorCustomizer {
		MyTomcatConnectorCustomizer() {
		}

		public void customize(Connector connector) {
			Http11NioProtocol protocol = (Http11NioProtocol)connector.getProtocolHandler();
			protocol.setMaxConnections(500);
			protocol.setMaxThreads(500);
			protocol.setConnectionTimeout(30000);
		}
	}
}
