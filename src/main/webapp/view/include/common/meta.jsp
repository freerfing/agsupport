<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
<meta http-equiv="Cache-Control" content="no-store"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<!-- 支持移动web  -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- 公有样式  -->
<link rel="shortcut icon" href="favicon.ico">
<link rel="stylesheet" href="<c:url value='/lib/3rdparty/bootstrap/css/bootstrap.min.css'/>"/>
<link rel="stylesheet" href="<c:url value='/lib/3rdparty/durandal/2.1.0/css/durandal.css'/>"/>
<link rel="stylesheet" href="<c:url value='/style/asip/common/main.css'/>"/>
<%
  //Forces caches to obtain a new copy of the page from the origin server  response.setHeader("Pragma","No-cache");
  response.setHeader("Cache-Control","no-cache");
  //Directs caches not to store the page under any circumstance
  response.setHeader("Cache-Control","no-store");
  //Causes the proxy cache to see the page as "stale"
  response.setDateHeader("Expires", 0);
  //HTTP 1.0 backward compatibility
  response.setHeader("Pragma","no-cache");
%>
