<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>一体化平台后台管理</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=11;IE=10;IE=9;IE=8; IE=EDGE" />
    <link rel="stylesheet" type="text/css" href="../lib/layui/css/layui.css" />
    <link rel="stylesheet" type="text/css" href="../styles/main.css" />
    <script src="../lib/layui/layui.js"></script>
</head>
<body class="layui-container">
    <!-- 侧边菜单 -->
    <div class="layui-side layui-side-menu">
        <div class="layui-side-scroll">
            <ul class="layui-nav layui-nav-tree" id="layui-side-menu" lay-filter="layui-side-menu-filter">
                <li data-name="user-center" class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;" lay-tips="用户中心" lay-direction="2">
                        <i class="layui-icon layui-icon-user"></i>
                        <cite>用户中心</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd data-name="user-org">
                            <a lay-href="../user/index.do" class="layui-this">用户机构</a>
                        </dd>
                        <dd data-name="role">
                            <a lay-href="../role/index.do">角色管理</a>
                        </dd>
                    </dl>
                </li>
                <li data-name="resource-center" class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;" lay-tips="资源中心" lay-direction="2">
                        <i class="layui-icon layui-icon-app"></i>
                        <cite>资源中心</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd data-name="map">
                            <a lay-href="../map/index.do">地图资源</a>
                        </dd>
                        <dd data-name="dataService">
                            <a lay-href="../dataService/index.do">数据资源</a>
                        </dd>
                        <dd data-name="document">
                            <a lay-href="../document/index.do">文档资源</a>
                        </dd>
                        <dd data-name="app">
                            <a lay-href="../app/index.do">业务应用</a>
                        </dd>
                    </dl>
                </li>
                <li data-name="settings" class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;" lay-tips="系统管理" lay-direction="2">
                        <i class="layui-icon layui-icon-set"></i>
                        <cite>系统管理</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd data-name="menu">
                            <a lay-href="../menu/index.do">菜单管理</a>
                        </dd>
                        <dd data-name="sysLog">
                            <a lay-href="../sysLog/index.do">系统日志</a>
                        </dd>
                        <dd data-name="resLog">
                            <a lay-href="../resLog/index.do">服务访问</a>
                        </dd>
                        <dd data-name="dictionary">
                            <a lay-href="../dictionary/index.do">数据字典</a>
                        </dd>
                    </dl>
                </li>
                <li data-name="data-manager" class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;" lay-tips="数据维护" lay-direction="2">
                        <i class="layui-icon layui-icon-util"></i>
                        <cite>数据维护</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd data-name="metaData">
                            <a lay-href="../metaData/index.do">元数据管理</a>
                        </dd>
                        <dd data-name="tableRows">
                            <a lay-href="../tableRows/index.do">数据目录管理</a>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>

    <!-- 页面标签 -->
    <div class="layadmin-pagetabs" id="LAY_app_tabs">
        <div class="layui-icon layadmin-tabs-control layui-icon-prev" layadmin-event="leftPage"></div>
        <div class="layui-icon layadmin-tabs-control layui-icon-next" layadmin-event="rightPage"></div>
        <div class="layui-icon layadmin-tabs-control layui-icon-down">
            <ul class="layui-nav layadmin-tabs-select" lay-filter="layadmin-pagetabs-nav">
                <li class="layui-nav-item" lay-unselect>
                    <a href="javascript:;"></a>
                    <dl class="layui-nav-child layui-anim-fadein">
                        <dd layadmin-event="closeThisTabs"><a href="javascript:;">关闭当前标签页</a></dd>
                        <dd layadmin-event="closeOtherTabs"><a href="javascript:;">关闭其它标签页</a></dd>
                        <dd layadmin-event="closeAllTabs"><a href="javascript:;">关闭全部标签页</a></dd>
                    </dl>
                </li>
            </ul>
        </div>
        <div class="layui-tab" lay-unauto lay-allowClose="true" lay-filter="layadmin-layout-tabs">
            <ul class="layui-tab-title" id="LAY_app_tabsheader">
                <li lay-id="home/console.html">
                    <i class="layui-icon layui-icon-home"></i>
                </li>
            </ul>
        </div>
    </div>

<script>
    layui.config({ base: '../lib/layui/extend/' }).use(['layer', 'table', 'form', 'element'], function(layer, table, form, element) {

    });
</script>
</body>
</html>