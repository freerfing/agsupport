/**
 * 发布版入口js
 * Created by 陈泽浩 on 2017-06-27.
 */
requirejs.config({
    baseUrl: "./"
});

var AG = {};

var map,
    cumstomColor, //保存当前配色
    widgets = {}, //微件信息
    hotPlugWidgets = {}, //可热插拔的微件
    widgetsStatus = {}, //微件使用状态
    widgetsIDs_bar = [],  //记录工具栏内包含的widgets（new）
    widgetsIDs_div_ = [], //记录当前工具框内包含的widgets
    widgetsIDs_div = [],  //记录更新后工具框内包含的widgets（new）
    widgetsNum_div = 12;//工具框中一个版面放置的微件个数

$(window).resize(function () {
    require(["MapInit"], function (MapInit) {
        //页面调整
        MapInit.adjustPage();
        //微件调整
        MapInit.adjustWidgets();
    });
});

$(document).ready(function () {
    require(["MapInit"], function (MapInit) {
        $(window).resize();
        //从导出json文件获取当前用户功能
        $.post("../resource/data.json", function (data) {
            var obj = data;
            widgets = obj.widget;

            // 颜色
            var colorType = obj.theme.css;
            if (colorType) {
                $("#tab1 .color .color_" + colorType).addClass("selected");
            } else {
                $("#tab1 .colorHide").hide();
            }
            cumstomColor = "color_" + (colorType ? colorType : "darkBlue");
            $("body .systemcolor").addClass(cumstomColor).attr("cumstomColor", cumstomColor);
            $("body .systemcolorDiv").addClass("div_" + cumstomColor);

            // 布局
            var layoutType = obj.theme.layoutclass;
            if (layoutType) {
                $("#tab1 .layout ." + layoutType).addClass("selected");
            } else {
                $("#tab1 .layoutHide").hide();
            }
            var cumstomLayout = layoutType ? layoutType : "composition";
            if (cumstomLayout == "independent" || cumstomLayout == "nothing") {
                MapInit.createWidgets_independent();
                if (cumstomLayout == "nothing") {
                    $("#dragPanel_toolbar").hide();
                }
            } else {
                MapInit.createWidgets_composition();
            }

            //调整页面
            MapInit.adjustPage();

            //初始化地图
            MapInit.initMap();

        });
        //表格显示隐藏按钮
        $("#tableDivVisible").on("click", function () {
            var $i = $(this).children();
            if ($i.hasClass("fa-angle-up")) {
                $i.removeClass("fa-angle-up").addClass("fa-angle-down").parent().css("bottom", "344px");
                $("#tableDiv").show();
                $(window).resize();
            } else {
                $i.removeClass("fa-angle-down").addClass("fa-angle-up").parent().css("bottom", "1px");
                $("#tableDiv").hide();
                $(window).resize();
            }
        });

        $('body').on('click', "#moreWidgets .moreWidgetsContent .w", function () {
            console.info("2");
        });
    });

    //  加载构建配置页面
    $("#example-navbar-collapse a").click(function () {
        var h = $(this).attr("href");
        if (h == "#tab4") {
            require(["Structure"], function (Structure) {
                Structure.initStructureConfig();
            });
        }
    });

});

AG.packDelFlag;//删除标识


