define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http","mapUtils","jqxgrid.selection"],
    function ($, app, composition, ko, common, http,mapUtils) {
        var curPanal;
        var map=$("#desktop-main-map")[0].contentWindow.map;//地图对象;
        var MapToolBar = {
            init: function () {
                var that = this;
                composition.addBindingHandler("downReportInitHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                        $(dom).click(function () {
                        });
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                $(".down_btn").mouseover(function () {
                    $("#downtool").show();
                });
                $(".sub_map_down").mouseleave(function () {
                    $("#downtool").hide();
                });
            },
            // 查询
            xiazai: function () {
            	layer.open({
					type: 2,
					content: ["/awater/view/app/toolbar/downReport/listReport.html"],
					shadeClose: true,
					title: '文档下载',
					area: ['80%', '500px']
				}); 
            }
        };

        var modal = {
        	xiazai: $.proxy(MapToolBar.xiazai, MapToolBar)
        };

        MapToolBar.init();
        return modal;
    });