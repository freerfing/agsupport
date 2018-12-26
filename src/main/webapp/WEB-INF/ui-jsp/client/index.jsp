<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>广州水务一体化平台</title>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="bookmark" href="/favicon.ico" type="image/x-icon" />
    <meta http-equiv="X-UA-Compatible" content="IE=11;IE=10;IE=9;IE=8; IE=EDGE" />
    <link rel="stylesheet" type="text/css" href="styles/main.css" />
    <link rel="stylesheet" type="text/css" href="styles/common/theme.css" />
    <script>
		// 定义整个应用项目的全局变量
		var map, awater = {
			loginUserSettingsUrl: 'http://127.0.0.1/awater/data/userSettings.json',
			loginUser: {
				id: '',
				loginName: '',
				userName: '',
				mobile: '',
				orgs: []
			},
			menus: [],
            // 当前显示菜单的菜单信息，方便子模块直接去拿
            currentMenu: {},
			settings: {
			    serverUrl: 'http://127.0.0.1/awater',
				theme: 'common',
				mapSubMenuDisplayMode: "hover",
				baseMap: ""
		    }
		};

    </script>
    <link rel="stylesheet" type="text/css" href="lib/arcgis3.26/esri/css/esri.css" />
    <%--<script src="lib/arcgis3.26/init.js"></script>--%>
    <%--<script src="components/main.js"></script>--%>
    <script data-main="./components/config.js" src="./lib/require/require.js"></script>
</head>
<body>
    <div id="app-container" style="width: 100%; height: 100%;"></div>
</body>
</html>