<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="java.util.Date" %>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="com.augurit.agcloud.frame.config.AgCloudConfig" %>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<%
    //获取平台配置
    ServletContext context = request.getSession().getServletContext();
    ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(context);
    AgCloudConfig agCloudConfig = (AgCloudConfig)ctx.getBean(AgCloudConfig.NAME);

    //是否调试模式运行
    boolean isDebugModeValue = agCloudConfig.isDebugMode();
    String isDebugMode = isDebugModeValue ? "date="+new Date().getTime() : "1=1";
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path;
%>

<!-- JS全局变量 -->
<script type="text/javascript">
    var ctx = "${pageContext.request.contextPath}";
    var basePath = '<%=basePath%>';
</script>

