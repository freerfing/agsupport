<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<%@ include file="config.jsp" %>
<%@ include file="../../awater/include.jsp" %>
<html>
<%
    if (isCheckNull(loginName)) loginName = "agcomadmin";// agcomadmin、gtj、aosadmin、layertree
    String userId = getUserId(loginName);
    String userName = getUserName(loginName);
%>
<script type="text/javascript">
    var agsupportURL = '../../../proxy.jsp?<%=agsupportUrl%>';
    var basePath = '<%=basePath%>'; //全局变量
    var userId = '<%=userId%>';
    var userName = '<%=userName%>';
    var browserIp ='<%=browserIp%>';
</script>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="<%=basePath%>/agcom/resources/images/favicon.ico">
    <link rel="stylesheet" href="<%=basePath%>/agcom/resources/lib/js/jquery-ui-1.12.1/jquery-ui.min.css">
    <link rel="stylesheet" href="<%=basePath%>/agcloud/frame/js-lib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="<%=basePath%>/agcom/resources/lib/js/bootstrap-table-develop/dist/bootstrap-table.min.css">
    <link rel="stylesheet" href="<%=basePath%>/agcom/resources/lib/js/bootstrap-switch-master/dist/css/bootstrap-switch.min.css">
    <link rel="stylesheet" href="<%=basePath%>/agcom/resources/lib/css/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<%=basePath%>/agcom/resources/lib/css/awesome-bootstrap-checkbox-master/build.css">
    <link rel="stylesheet" href="<%=basePath%>/agcom/resources/css/font-ag/iconfont.css">
    <link rel="stylesheet" href="<%=basePath%>/agcom/resources/css/main.css">
    <link rel="stylesheet" href="<%=basePath%>/agcom/resources/css/config.css">
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/jquery/jquery-3.1.1.min.js"></script>

    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcloud/frame/js-lib/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/bootstrap-switch-master/dist/js/bootstrap-switch.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/bootbox.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/jquery.contextify.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/xml2json/jquery.xml2json.js"></script>
    <%--<script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/bootstrap-select-1.12.2/dist/js/bootstrap-select.min.js"></script>--%>

    <%--美化滚动条插件--%>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/jQueryNicescroll/js/jquery.nicescroll.js"></script>

    <%--bootstrap-table(start)--%>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/bootstrap-table-develop/dist/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/bootstrap-table-develop/dist/bootstrap-table-zh-CN.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/bootstrap-table-develop/dist/extensions/export/bootstrap-table-export.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/tableExport.jquery.plugin-master/libs/jsPDF/jspdf.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/tableExport.jquery.plugin-master/libs/jsPDF-AutoTable/jspdf.plugin.autotable.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/tableExport.jquery.plugin-master/libs/html2canvas/html2canvas.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/resources/lib/js/tableExport.jquery.plugin-master/tableExport.min.js"></script>
    <%--bootstrap-table(end)--%>

    <%--百度查询插件--%>
    <script type="text/javascript" src="<%=basePath%>/agcom/gis/2dmap/lib/ag-leaflet/plugins/baiduAPI/js/getscript.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/gis/2dmap/augurit/com/js/common.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/gis/2dmap/lib/leaflet/plugins/terraformer/terraformer.js"></script>
    <script type="text/javascript" src="<%=basePath%>/agcom/gis/2dmap/lib/leaflet/plugins/terraformer/terraformer-wkt-parser.js"></script>
</head>
</html>