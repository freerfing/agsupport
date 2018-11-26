<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ include file="meta.jsp" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script type="text/javascript">var ctx = "${ctx}";</script>

<script src="${ctx}/lib/3rdparty/jquery-easyui/jquery.min.js" type="text/javascript"></script>
<script src="${ctx}/lib/3rdparty/jquery-easyui/jquery.easyui.min.js" type="text/javascript"></script>
<link href="${ctx}/lib/3rdparty/jquery-easyui/themes/icon-ex.css" type="text/css" rel="stylesheet"/> <!-- 已涵盖同主题的EASYUI图标 -->
<script src="${ctx}/lib/3rdparty/jquery-easyui/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>

<!-- AgCloud -->
<link href="${ctx}/view/catalog/agcloud/themes/gray/theme.css" type="text/css" rel="stylesheet"/> <!-- 已涵盖同主题的EASYUI样式 -->
<script src="${ctx}/view/catalog/agcloud/js-tool/common.js" type="text/javascript"></script>

<script type="text/javascript" src="${ctx}/view/catalog/agcom/frame/js-lib/jquery-easyui-ext/jquery.json.js"></script>
<!-- <script type="text/javascript" src="${ctx}//agcom/frame/js-lib/waitbar/waitbar.js"></script> -->
<script type="text/javascript" src="${ctx}/view/catalog/agcom/frame/js-tool/common.js"></script>
<script type="text/javascript" src="${ctx}/view/catalog/agcom/frame/js-tool/datagrid.js"></script>
<script type="text/javascript" src="${ctx}/view/catalog/agcom/frame/js-tool/datagridExt.js"></script>

<style type="text/css">* {font-family: Arial,'Microsoft YaHei';font-size:14px;}</style>
<%--String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();--%>
<script type="text/javascript">$.ajaxSetup({cache: false});</script>
<script type="text/javascript">function using(name, callback) {var interval = window.setInterval(function() {if(jQuery){window.clearInterval(interval);if (typeof(name)=='function') {name();} else {if (callback) callback();}}}, 100);};</script>

<script type="text/javascript">if ($.fn.datagrid){$.fn.datagrid.defaults.pageList = [10,20,30,40,50,100];}//设置datagrid的分页参数</script>
<script type="text/javascript">    //easyui验证扩展
$.extend($.fn.validatebox.defaults.rules, {
    intOrFloat: {// 验证整数或小数
        validator: function (value) {
            //return  /^[-]?\d+.?[0-9]+\,\[-]?d+.?[0-9]+$/.test(value);
            //return  /^[-+]?\d+(\.\d+)+\,\[-+]?\d+(\.\d+)?$/.test(value);
            return /^[-\+]?\d+(\.\d+)?\,[-\+]?\d+(\.\d+)?$/.test(value);
        },
        message: '请输入一组坐标，并确保格式正确'
    },
    int: {// 验证整数
        validator: function (value) {
            return /^[0-9]*$/.test(value);
        },
        message: '请输入数字'
    },
    equalTo: {//验证两次密码输入
        validator: function (value, param) {
            if ($("#" + param[0]).val() != "" && value != "") {
                return $("#" + param[0]).val() == value;
            } else {
                return true;
            }
        },
        message: '两次输入的密码不一致！'
    },
    notNull: {//验证不全为空格
        validator: function (value) {
            return /\s*\S+/.test(value);
        },
        message: '输入不能为空'
    },
    loginName: {//验证用户名
        validator: function (value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(value);
        },
        message: '用户名格式（字母开头，允许3-16字节，允许字母数字下划线）'
    },
    password: {//验证密码
        validator: function (value) {
            return /^[a-zA-Z0-9_]{6,14}$/.test(value);
        },
        message: '密码格式（允许6-14个字符，支持数字字母和下划线）'
    }
});

//ajax加载动画全局配置
$.ajaxSetup({
    beforeSend: function () {//ajax请求之前
        ajaxLoad_allow = true;
        setTimeout(function() {
            ajaxLoading();
        }, 2000);
    },
    complete: function () {//ajax请求结束
        ajaxLoadEnd();
    }
});
</script>
