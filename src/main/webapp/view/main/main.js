/** require对js模块儿的配置 **/
require.config({
    waitSeconds: 0,//默认7s加载超时,0无限等待
    /** lib库的根目录 **/
    baseUrl: auGurit.global.rootPath || "./",
    /** 如果调试，地址上加上时间戳 **/
    urlArgs: auGurit.global.debug ? "bust=" + (new Date()).getTime() : "",
    /** 这里只写系统公用模块儿，页面模块需要在数据库中配置 **/
    paths: {
        text: "lib/3rdparty/require/text-2.0.12",
        jquery: "lib/3rdparty/jquery/jquery/jquery-1.9.1.min" + window.auGurit.global.scriptVersion,
        layer: "lib/3rdparty/layer/layer",
        knockout: "lib/3rdparty/knockout/knockout-3.2.0" + window.auGurit.global.scriptVersion,
        durandal: "lib/3rdparty/durandal/2.1.0/js",
        plugins: "lib/3rdparty/durandal/2.1.0/js/plugins",
        transitions: "lib/3rdparty/durandal/2.1.0/js/transitions",
        bootstrap: "lib/3rdparty/bootstrap/js/bootstrap",
        bootstrapTable: "view/app/watermap/specialTopic/gzSxYzt/plugins/bootstrap-table/bootstrap-table.min",
        bootstrapTableZhCN: "view/app/watermap/specialTopic/gzSxYzt/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min",
        metisMenu: "lib/3rdparty/metisMenu/metisMenu",
        domReady: "lib/3rdparty/require/domready-2.0.1",
        css: "lib/3rdparty/require/css-0.1.2",
        ui: "lib/3rdparty/jquery/ui/jquery-ui" + window.auGurit.global.scriptVersion,
        spinner: "lib/3rdparty/jquery/spinner/jquery.spinner",
        resizable: "lib/3rdparty/jquery/easyui-resizable/resizable-1.4.1",
        draggable: "lib/3rdparty/jquery/easyui-draggable/draggable-1.4.1",
        droppable: "lib/3rdparty/jquery/easyui-droppable/droppable-1.4.1",
        datalist: "lib/3rdparty/jquery/easyui-datalist/jquery.datalist",
        fakeloader: "lib/3rdparty/jquery/loader/fakeLoader",
        tree: "lib/3rdparty/jquery/easyui-tree/tree-1.4.1",
        parser: "lib/3rdparty/jquery/easyui-parser/parser-1.4.1",
        combotree: "lib/3rdparty/jquery/easyui-combotree/combotree",
        combo: "lib/3rdparty/jquery/easyui-combo/combo",
        panel: "lib/3rdparty/jquery/easyui-panel/panel",
        textbox: "lib/3rdparty/jquery/easyui-textbox/textbox",
        validatebox: "lib/3rdparty/jquery/easyui-validatebox/validatebox",
        textbox: "lib/3rdparty/jquery/easyui-textbox/textbox",
        linkbutton: "lib/3rdparty/jquery/easyui-linkbutton/linkbutton",
        tooltip: "lib/3rdparty/jquery/easyui-tooltip/tooltip",
        ajaxupload: "lib/3rdparty/jquery/ajaxupload/ajaxupload",
        autocomplete: "lib/3rdparty/jquery/autocomplete/autocomplete-1.1",
        selectize: "lib/3rdparty/jquery/selectize/selectize-0.11.2" + window.auGurit.global.scriptVersion,
        jgestures: "lib/3rdparty/jquery/jgestures/jgestures-0.90.1" + window.auGurit.global.scriptVersion,
        WdatePicker: "lib/3rdparty/My97DatePicker/WdatePicker",
        CKEDITOR: "lib/3rdparty/ckeditor/ckeditor",
        slickGrid: "lib/3rdparty/jquery/slickgrid/slick.grid-2.1.0",
        mousewheel: "lib/3rdparty/jquery/mousewheel/mousewheel-3.1.12" + window.auGurit.global.scriptVersion,
        cookie: "lib/3rdparty/jquery/cookie/cookie-1.4.1",
        highcharts: "lib/3rdparty/highcharts/highcharts-4.0.4" + window.auGurit.global.scriptVersion,
        highcharts3d: "lib/3rdparty/highcharts/highcharts-3d-4.0.4" + window.auGurit.global.scriptVersion,
        highchartsMore: "lib/3rdparty/highcharts/highcharts-more-4.0.4" + window.auGurit.global.scriptVersion,
        snap: "lib/3rdparty/svg/snap.svg",
        snapSvg: "lib/3rdparty/snap/snap",
        JsonData: "lib/3rdparty/snap/flowJsonData",
        html5mediaSupport: "lib/3rdparty/html5/html5media.min",
        html5media: "lib/3rdparty/html5/media-2.1.1",
        media: "lib/3rdparty/jquery/media/media-0.92",
        kalendae: "lib/3rdparty/kalendae/kalendae",
        panal: "lib/asip/panal/panal",
        panalPop: "lib/asip/panal/panalPop",
        mapUtils: "lib/asip/agcom/mapUtils",
        panalManager: "lib/asip/panal/panalmanager",
        popup: "lib/asip/panal/popup",
        box: "lib/asip/box/box",
        tabs: "lib/asip/tabs/tabs",
        menu: "lib/asip/menu/menu",
        menuX: "lib/asip/menu/menu-x",
        menuY: "lib/asip/menu/menu-y",
        i18nCommon: "lib/asip/common/i18n",
        core: "lib/asip/utils/core",
        win: "lib/asip/window/window",
        http: "lib/asip/utils/http",
        animateLoad: "lib/asip/utils/animate_load",//maxt水位变化动画效果
        pager: "lib/asip/utils/pager",
        validate: "lib/asip/utils/validate",
        audio: "lib/asip/html5/audio",
        video: "lib/asip/html5/video",
        mask: "lib/asip/plugin/mask",
        partShow: "lib/asip/plugin/partshow",
        socket: "lib/asip/html5/socket",
        string: "lib/asip/utils/string",
        cache: "lib/asip/utils/cache",
        mobileStyle: "view/mobile/style",
        date: "lib/asip/utils/date",
        phrase: "view/utils/phrase",
        constCommon: "lib/asip/common/const",
        tip: "lib/asip/utils/tip",
        tiptool: "lib/asip/utils/tiptool",
        nav: "lib/3rdparty/jquery/nav/nav",
        iviewer: "lib/3rdparty/jquery/iviewer/jquery.iviewer",
        jqxcore: "lib/3rdparty/jquery/jqxgrid/jqxcore",
        jqxdata: "lib/3rdparty/jquery/jqxgrid/jqxdata",
        jqxgrid: "lib/3rdparty/jquery/jqxgrid/jqxgrid",
        jqxmenu: "lib/3rdparty/jquery/jqxgrid/jqxmenu",
        "jqxgrid.selection": "lib/3rdparty/jquery/jqxgrid/jqxgrid.selection",
        "jqxgrid.columnsresize": "lib/3rdparty/jquery/jqxgrid/jqxgrid.columnsresize",
        "jqxgrid.jqxlistbox": "lib/3rdparty/jquery/jqxgrid/jqxgrid.jqxlistbox",
        "jqxgrid.jqxdropdownlist": "lib/3rdparty/jquery/jqxgrid/jqxgrid.jqxdropdownlist",
        "jqxgrid.pager": "lib/3rdparty/jquery/jqxgrid/jqxgrid.pager",
        "jqxgrid.sort": "lib/3rdparty/jquery/jqxgrid/jqxgrid.sort",
        jqxbuttons: "lib/3rdparty/jquery/jqxgrid/jqxbuttons",
        jqxscrollbar: "lib/3rdparty/jquery/jqxgrid/jqxscrollbar",
        simpleCanleder: "lib/3rdparty/jquery/jquery_yearmonth/jquery_yearmonth",
        echarts: "lib/3rdparty/echarts/js/echarts-all",
        echarts3_6_2: "lib/3rdparty/echarts3.6.2/js/echarts3.6.2",
        echarts3_8_4: "lib/3rdparty/echarts3.8.4/js/echarts3.8.4",
        common: "view/common",
        marquee: "lib/3rdparty/jquery/marquee/marquee",
        swfobject: "lib/3rdparty/swf/swfobject",
        echartsWidget: "lib/3rdparty/echarts/js/EchartsWidget",
        easyui: "lib/3rdparty/jquery/easyui/jquery.easyui.min",
        zrender: "lib/3rdparty/zrender-2.1.0/zrender",
        watertype: "lib/asip/watercellrenderer",
        chromeTabs: "lib/3rdparty/chrome-tabs/js/chrome-tabs",
        md5: "lib/asip/md5/md5",
        // ueditor框架引入
        ueditorConfig: "lib/3rdparty/ueditor1.4.3/ueditor.config",
        ueditor: "lib/3rdparty/ueditor1.4.3/ueditor.all",
        ueditorZhCn: "lib/3rdparty/ueditor1.4.3/lang/zh-cn/zh-cn",
        zeroclipboard: "lib/3rdparty/ueditor1.4.3/third-party/zeroclipboard/ZeroClipboard",
        xss: "lib/3rdparty/ueditor1.4.3/xss",
        slide: "lib/3rdparty/slide/jquery.SuperSlide2.1.2"
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
        },
        resizable: {
            deps: ["jquery", "parser"],
            exports: "$.fn.resizable"
        },
        draggable: {
            deps: ["jquery", "parser"],
            exports: "$.fn.draggable"
        },
        droppable: {
            deps: ["jquery", "parser"],
            exports: "$.fn.draggable"
        },
        tree: {
            deps: ["jquery", "draggable", "droppable", "parser", "css!lib/3rdparty/jquery/easyui-tree/tree-1.4.1"],
            exports: "$.fn.tree"
        },
        spinner: {
            deps: ["css!lib/3rdparty/jquery/spinner/jquery.spinner"],
            exports: "$.fn.spinner"
        },
        iviewer: {
            deps: ["jquery", "mousewheel", "ui", "css!lib/3rdparty/jquery/iviewer/jquery.iviewer"],
            exports: "$.fn.iviewer"
        },
        combotree: {
            deps: ["jquery", "combo", "tree", "parser"],
            exports: "$.fn.combotree"
        },
        combo: {
            deps: ["jquery", "panel", "textbox", "parser"],
            exports: "$.fn.combo"
        },
        panel: {
            deps: ["css!lib/3rdparty/jquery/easyui-panel/panel"]
        },
        textbox: {
            deps: ["jquery", "validatebox", "linkbutton", "parser"],
            exports: "$.fn.textbox"
        },
        validatebox: {
            deps: ["jquery", "tooltip", "parser"],
            exports: "$.fn.validatebox"
        },
        parser: {
            deps: ["jquery"],
            exports: "$.fn.parser"
        },
        autocomplete: {
            deps: ["jquery", "css!lib/3rdparty/jquery/autocomplete/autocomplete-1.1"],
            exports: "$.fn.autocomplete"
        },
        jgestures: {
            deps: ["jquery"],
            exports: "$"
        },
        WdatePicker: {
            exports: "WdatePicker"
        },
        CKEDITOR: {
            exports: "CKEDITOR"
        },
        slickGrid: {
            deps: ["jquery",
                "lib/3rdparty/jquery/slickgrid/jquery.event.drag-2.2",
                "lib/3rdparty/jquery/slickgrid/jquery.event.drop-2.2",
                "lib/3rdparty/jquery/slickgrid/slick.core",
                "lib/3rdparty/jquery/slickgrid/slick.formatters",
                "lib/3rdparty/jquery/slickgrid/slick.editors",
                "lib/3rdparty/jquery/slickgrid/plugins/slick.autotooltips",
                "lib/3rdparty/jquery/slickgrid/plugins/slick.rowselectionmodel",
                "lib/3rdparty/jquery/slickgrid/plugins/slick.cellselectionmodel",
                "lib/3rdparty/jquery/slickgrid/plugins/slick.cellrangedecorator",
                "lib/3rdparty/jquery/slickgrid/plugins/slick.cellrangeselector",
                "lib/3rdparty/jquery/slickgrid/plugins/slick.checkboxselectcolumn",
                "lib/3rdparty/jquery/slickgrid/plugins/slick.radioselectcolumn",
                "css!lib/3rdparty/jquery/slickgrid/slick.grid-2.1.0",
                "css!lib/3rdparty/jquery/slickgrid/smoothness/jquery-ui-1.8.16.custom",
                "css!lib/3rdparty/jquery/slickgrid/slick-default-theme"],
            exports: "Slick"
        },
        highcharts: {
            deps: ["jquery"],
            exports: "$.fn.highcharts"
        },
        highcharts3d: {
            deps: ["highcharts"]
        },
        highchartsMore: {
            deps: ["highcharts"]
        },
        snap: {
            exports: "Snap"
        },
        kalendae: {
            deps: ["css!lib/3rdparty/kalendae/kalendae"],
            exports: "$.fn.kalendae"
        },
        snapSvg: {
            deps: ["jquery"],
            exports: "Snap"
        },
        JsonData: {},
        html5media: {
            deps: ["jquery"]
        },
        media: {
            deps: ["jquery"],
            exports: "$.fn.media"
        },
        nav: {
            deps: ["jquery",
                "css!lib/3rdparty/jquery/nav/nav"],
            exports: "$.fn.nav"
        },
        echarts: {
            exports: "echarts"
        },
        jqxcore: {
            exports: "$",
            deps: ["jquery"]
        },
        jqxdata: {
            exports: "$",
            deps: ["jquery", "jqxcore"]
        },
        simpleCanleder: {
            exports: "$",
            deps: ["jquery", "css!lib/3rdparty/jquery/jquery_yearmonth/jquery_yearmonth"]
        },
        metisMenu: {
            deps: ["jquery", "css!lib/3rdparty/metisMenu/metisMenu.css"],
            exports: "$.fn.metisMenu"
        },
        jqxgrid: {
            exports: "$",
            deps: ["jquery", "jqxdata", "jqxscrollbar",
                "lib/3rdparty/jquery/jqxgrid/generatedata",
                "css!lib/3rdparty/jquery/jqxgrid/css/jqx.base",
                "css!lib/3rdparty/jquery/jqxgrid/css/jqx.energyblue"
            ]
        },
        "jqxgrid.selection": {
            exports: "$",
            deps: ["jquery", "jqxgrid"]
        },
        "jqxgrid.columnsresize": {
            exports: "$",
            deps: ["jquery", "jqxgrid"]
        },
        "jqxgrid.jqxlistbox": {
            exports: "$",
            deps: ["jquery", "jqxgrid"]
        },
        "jqxgrid.jqxdropdownlist": {
            exports: "$",
            deps: ["jquery", "jqxgrid", "jqxgrid.jqxlistbox"]
        },
        "jqxgrid.pager": {
            exports: "$",
            deps: ["jquery", "jqxgrid", "jqxgrid.jqxdropdownlist"]
        },
        "jqxgrid.sort": {
            exports: "$",
            deps: ["jquery", "jqxgrid", "jqxgrid.jqxdropdownlist", "jqxmenu"]
        },
        jqxmenu: {
            exports: "$",
            deps: ["jquery", "jqxcore"]
        },
        jqxbuttons: {
            exports: "$",
            deps: ["jquery", "jqxcore"]
        },
        jqxscrollbar: {
            exports: "$",
            deps: ["jquery", "jqxbuttons"]
        },
        marquee: {
            exports: "$.fn.marquee",
            deps: ["jquery"]
        },
        chromeTabs: {
            exports: "chromeTabs",
            deps: [
                "jquery",
                "ui",
                "css!lib/3rdparty/chrome-tabs/css/chrome-tabs.css"
            ]
        },
        ueditor: {
            deps: [
                "zeroclipboard",
                "ueditorConfig",
                "css!lib/3rdparty/ueditor1.4.3/themes/default/css/ueditor"
            ],
            init: function (ZeroClipboard) {
                //导出到全局变量，供ueditor使用
                window.ZeroClipboard = ZeroClipboard;
            }
        },
        ueditorZhCn: {
            deps: [
                "ueditor"
            ]
        }
    }
});
window.interactVar = {};//初始化全局交互式变量
/** 全局错误处理 **/
requirejs.onError = function (error) {
    if (auGurit.global.debug) {
        alert(error);
    } else {
        alert("发生错误，请联系管理员！");
    }
};
define(["durandal/system", "durandal/app", "durandal/viewLocator", "i18nCommon", "css!style/asip/" + auGurit.global.style + "/main.css"], function (system, app, viewLocator, i18n) {

    //可以调试
    system.debug(true);
    //设定应用标题
    app.title = i18n.textSystemTitle;
    //启动应用
    app.start().then(function () {

        viewLocator.useConvention();
        //app.setRoot("view/login/login", null, "application-main");
       app.setRoot("view/desktop/desktop", null, "application-main");
    });
});