<%@ page import="com.augurit.agcom.common.CasLoginHelpClient" %>
<%@ page import="com.common.util.ConfigProperties" %>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/view/include/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="bookmark" href="/favicon.ico" type="image/x-icon"　/>
    <meta http-equiv="X-UA-Compatible" content="IE=11;IE=10;IE=9;IE=8; IE=EDGE" />
    <%@ include file="/view/include/common/meta.jsp"%>
    <%@ include file="/view/include/common/bootstrap.jsp"%>
    <script src="<c:url value='/lib/3rdparty/index/index.js'/>" ></script>
</head>
<body class="app-body-container">
<div id="application-main">
    <div class="splash">
        <div class="message">
        </div>
        <i class="icon-spinner icon-2x icon-spin active"></i>
    </div>
</div>
</body>
<%
    String agsupportUrl = ConfigProperties.getByKey("agsupport.url");
    String agsupportName = agsupportUrl.substring(agsupportUrl.lastIndexOf("/"));
%>
<script type="text/javascript">
    var loginName = "${CasLoginHelpClient.getLoginName(pageContext.request)}";
    var agsupportName = "<%=agsupportName%>";
    var agsupportUrl = "<%=agsupportUrl%>";
</script>
</html>