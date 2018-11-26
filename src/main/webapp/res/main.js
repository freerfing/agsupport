/** require对js模块儿的配置 **/
require.config({
    waitSeconds: 0,//默认7s加载超时,0无限等待
    baseUrl: "../",
    /** 这里只写系统公用模块儿，页面模块需要在数据库中配置 **/
    paths: {
        text: "lib/3rdparty/require/text-2.0.12",
        jquery: "lib/3rdparty/jquery/jquery/jquery-1.9.1.min",
        layer: "lib/3rdparty/layer/layer",
        knockout: "lib/3rdparty/knockout/knockout-3.2.0",
        durandal: "lib/3rdparty/durandal/2.1.0/js",
        bootstrap: "lib/3rdparty/bootstrap/js/bootstrap",
        bootstrapTable: "view/app/watermap/specialTopic/gzSxYzt/plugins/bootstrap-table/bootstrap-table.min",
        bootstrapTableZhCN: "view/app/watermap/specialTopic/gzSxYzt/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min",
        domReady: "lib/3rdparty/require/domready-2.0.1",
        css: "lib/3rdparty/require/css-0.1.2"
    },
    shim: {
        layer: {
            deps: ["css!lib/3rdparty/layer/skin/default/layer"]
        },
        bootstrap: {
            deps: ["jquery",
                "css!lib/3rdparty/bootstrap-treeview-1.2.0/dist/bootstrap-treeview.min",
                "lib/3rdparty/bootstrap-treeview-1.2.0/dist/bootstrap-treeview.min"
            ],
            exports: "$"
        },
        bootstrapTable: {
            deps: ["bootstrap",
                "css!view/app/watermap/specialTopic/gzSxYzt/plugins/bootstrap-table/bootstrap-table.min"
            ]
        },
        bootstrapTableZhCN: {
            deps: ["bootstrapTable"]
        }
    }
});

define(["durandal/system", "durandal/app", "durandal/viewLocator", "css!style/asip/custom/main.css"], function (system, app, viewLocator) {
    //可以调试
    system.debug(true);
    //设定应用标题
    app.title = '资源目录一览';
    //启动应用
    app.start().then(function () {
        viewLocator.useConvention();
        app.setRoot("res/index", null, "application-main");
    });
});