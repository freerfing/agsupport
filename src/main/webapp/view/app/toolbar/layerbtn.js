define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "slide"],
    function ($, app, composition, ko, common, http, slide) {
        var curPanal;
        var map;
        var Layerbtn = {
            init: function () {
                var that = this;
                composition.addBindingHandler("layerbtnInitHandler", {
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
                $(".layer_btn").mouseover(function () {
                    $("#toolbar_layer").show();
                });
                $(".toolbar_layer_btn_li").mouseleave(function () {
                    $("#toolbar_layer").hide();
                });
                $(".radio_map .radio_map_div").mouseover(function (e) {
                    $(e.currentTarget).addClass("selected");
                    $(e.currentTarget).children("div").addClass("selected")
                }).mouseout(function (e) {
                    $(e.currentTarget).removeClass("selected");
                    $(e.currentTarget).children("div").removeClass("selected");
                });
                $(".radio_map .radio_map_div").click(function (e) {
                    var $this = $(e.currentTarget);
                    if (!$this.hasClass("selectedByClick")) {
                        $this.addClass("selectedByClick").siblings().removeClass("selectedByClick");
                        $this.children("div").addClass("selectedByClick").end().siblings().children("div").removeClass("selectedByClick");
                    }
                });
            },
            //切换水务局矢量图
            switch_swj_vector: function () {
                this.removeCurtainControl();
                $('#radio_map a').removeClass("hover");
                $('#shiliang').addClass("hover");
                if (!map)
                    map = $("#desktop-main-map")[0].contentWindow.map;
                var layerInfo = {
                    selectedLayer: ['5b255031-c651-4e41-aa50-1bac2620adb8'],
                    layers: ['5b255031-c651-4e41-aa50-1bac2620adb8', '0a0036ad-815f-4f16-a97b-70578f3a696e', '14b7463c-bcf5-488b-8a9e-88957d91711a', '9ecbc9be-d7c5-4608-aebf-51b960da58b9', '0980672d-aac7-4a2a-ad0e-c51e969d4bab', 'b7dffc20-1202-48fa-a6fc-620bf2791443', '19e943ca-40ea-45b2-8624-05ee88c26994','0f0f58f8-41b2-43c2-8200-642fe28dee30','86780380-f255-4777-9946-3287b4b6ec89']
                };
                map._mapInterface.changeBaseLayer(layerInfo);
                map._mapInterface._CurrentBaseLayerID = layerInfo.selectedLayer;
                this.hideTimeAxis();
            },
            //切换国规委矢量图
            switch_ggw_vector: function () {
                this.removeCurtainControl();
                $('#radio_map a').removeClass("hover");
                $('#shiliang').addClass("hover");
                if (!map)
                    map = $("#desktop-main-map")[0].contentWindow.map;
                var layerInfo = {
                    selectedLayer: ['0a0036ad-815f-4f16-a97b-70578f3a696e'],
                    layers: ['5b255031-c651-4e41-aa50-1bac2620adb8', '0a0036ad-815f-4f16-a97b-70578f3a696e', '14b7463c-bcf5-488b-8a9e-88957d91711a', '9ecbc9be-d7c5-4608-aebf-51b960da58b9', '0980672d-aac7-4a2a-ad0e-c51e969d4bab', 'b7dffc20-1202-48fa-a6fc-620bf2791443', '19e943ca-40ea-45b2-8624-05ee88c26994','0f0f58f8-41b2-43c2-8200-642fe28dee30','86780380-f255-4777-9946-3287b4b6ec89']
                };
                map._mapInterface.changeBaseLayer(layerInfo);
                map._mapInterface._CurrentBaseLayerID = layerInfo.selectedLayer;
                this.hideTimeAxis();
            },
            //切换国规委卫星影像
            switch_ggw_striograph: function () {
                this.removeCurtainControl();
                $('#radio_map a').removeClass("hover");
                $('#ggw_yingxiang').addClass("hover");
                if (!map)
                    map = $("#desktop-main-map")[0].contentWindow.map;
                var layerInfo = {
                    selectedLayer: ['0980672d-aac7-4a2a-ad0e-c51e969d4bab'],
                    layers: ['5b255031-c651-4e41-aa50-1bac2620adb8', '0a0036ad-815f-4f16-a97b-70578f3a696e', '14b7463c-bcf5-488b-8a9e-88957d91711a', '9ecbc9be-d7c5-4608-aebf-51b960da58b9', '0980672d-aac7-4a2a-ad0e-c51e969d4bab', 'b7dffc20-1202-48fa-a6fc-620bf2791443', '19e943ca-40ea-45b2-8624-05ee88c26994','0f0f58f8-41b2-43c2-8200-642fe28dee30','86780380-f255-4777-9946-3287b4b6ec89']
                };
                map._mapInterface.changeBaseLayer(layerInfo, true);
                map._mapInterface._CurrentBaseLayerID = layerInfo.selectedLayer;
                this.hideTimeAxis();
            },
            //切换水务局卫星影像
            switch_swj_striograph: function () {
                this.removeCurtainControl();
                $('#radio_map a').removeClass("hover");
                $('#swj_yingxiang').addClass("hover");
                if (!map)
                    map = $("#desktop-main-map")[0].contentWindow.map;
                var layerInfo = {
                    selectedLayer: ['b7dffc20-1202-48fa-a6fc-620bf2791443'],
                    layers: ['5b255031-c651-4e41-aa50-1bac2620adb8', '0a0036ad-815f-4f16-a97b-70578f3a696e', '14b7463c-bcf5-488b-8a9e-88957d91711a', '9ecbc9be-d7c5-4608-aebf-51b960da58b9', '0980672d-aac7-4a2a-ad0e-c51e969d4bab', 'b7dffc20-1202-48fa-a6fc-620bf2791443', '19e943ca-40ea-45b2-8624-05ee88c26994','0f0f58f8-41b2-43c2-8200-642fe28dee30','86780380-f255-4777-9946-3287b4b6ec89']
                };
                var $desktopMap = $($("#desktop-main-map").contents()[0]);
                var len = $desktopMap.find(".parHd li").length;
                if (len > 0) {
                    var $li = $desktopMap.find(".parHd li[id='b7dffc20-1202-48fa-a6fc-620bf2791443']");
                    $li.siblings().removeClass('act');
                    $li.addClass('act');
                } else {
                    var $div = $desktopMap.find(".parHd.clearfix");
                    $div.empty();
                    var html = "<ul>";
                    var _layerInfo = [{name: "2014年广州影像图", id: "noLayerId"}, {
                        name: "2015年广州影像图",
                        id: "b7dffc20-1202-48fa-a6fc-620bf2791443"
                    }, {name: "2016年广州影像图", id: "86780380-f255-4777-9946-3287b4b6ec89"}, {
                        name: "2017年广州影像图",
                        id: "0f0f58f8-41b2-43c2-8200-642fe28dee30"
                    }];
                    for (var i in _layerInfo) {
                        if (_layerInfo[i].id == "b7dffc20-1202-48fa-a6fc-620bf2791443") {
                            html += "<li class='act' id='" + _layerInfo[i].id + "'><span></span>" + _layerInfo[i].name + "</li>";
                        } else {
                            html += "<li id='" + _layerInfo[i].id + "'><span></span>" + _layerInfo[i].name + "</li>";
                        }
                    }
                    html = html + "</ul>";
                    $div.append(html);
                    $desktopMap.find(".parHd").slide({
                        mainCell: "ul",
                        vis: $desktopMap.find(".parHd li").length,
                        effect: "leftLoop",
                        defaultPlay: false
                    });
                    $desktopMap.find(".event_box").css("left", $("#widgets_toolbar").width() / 2.0 + parseInt($("#widgets_toolbar").css("left")) - $desktopMap.find(".event_box").width() / 2.0 + "px");
                    $desktopMap.find(".parHd li span").on("click", function () {
                        $(this).parent().siblings().removeClass('act');
                        $(this).parent().addClass("act");
                        var Info = {
                            selectedLayer: [$(this).parent().attr("id")],
                            layers: ['5b255031-c651-4e41-aa50-1bac2620adb8', '0a0036ad-815f-4f16-a97b-70578f3a696e', '14b7463c-bcf5-488b-8a9e-88957d91711a', '9ecbc9be-d7c5-4608-aebf-51b960da58b9', '0980672d-aac7-4a2a-ad0e-c51e969d4bab', 'b7dffc20-1202-48fa-a6fc-620bf2791443', '19e943ca-40ea-45b2-8624-05ee88c26994','0f0f58f8-41b2-43c2-8200-642fe28dee30','86780380-f255-4777-9946-3287b4b6ec89']
                        };
                        map._mapInterface.changeBaseLayer(Info);
                    });
                }
                $desktopMap.find(".event_box").show();
                map._mapInterface.changeBaseLayer(layerInfo);
                map._mapInterface._CurrentBaseLayerID = layerInfo.selectedLayer;
            },
            //切换dem图
            switch_dem: function () {
                this.removeCurtainControl();
                $('#radio_map a').removeClass("hover");
                $('#dem').addClass("hover");
                if (!map)
                    map = $("#desktop-main-map")[0].contentWindow.map;
                var layerInfo = {
                    selectedLayer: ['14b7463c-bcf5-488b-8a9e-88957d91711a'],
                    layers: ['5b255031-c651-4e41-aa50-1bac2620adb8', '0a0036ad-815f-4f16-a97b-70578f3a696e', '14b7463c-bcf5-488b-8a9e-88957d91711a', '9ecbc9be-d7c5-4608-aebf-51b960da58b9', '0980672d-aac7-4a2a-ad0e-c51e969d4bab', 'b7dffc20-1202-48fa-a6fc-620bf2791443', '19e943ca-40ea-45b2-8624-05ee88c26994','0f0f58f8-41b2-43c2-8200-642fe28dee30','86780380-f255-4777-9946-3287b4b6ec89']
                };
                map._mapInterface.changeBaseLayer(layerInfo);
                map._mapInterface._CurrentBaseLayerID = layerInfo.selectedLayer;
                this.hideTimeAxis();
            },
            //切换简单配图
            switch_simple: function () {
                this.removeCurtainControl();
                $('#radio_map a').removeClass("hover");
                $('#dem').addClass("hover");
                if (!map)
                    map = $("#desktop-main-map")[0].contentWindow.map;
                var layerInfo = {
                    selectedLayer: ['19e943ca-40ea-45b2-8624-05ee88c26994'],
                    layers: ['5b255031-c651-4e41-aa50-1bac2620adb8', '0a0036ad-815f-4f16-a97b-70578f3a696e', '14b7463c-bcf5-488b-8a9e-88957d91711a', '9ecbc9be-d7c5-4608-aebf-51b960da58b9', '0980672d-aac7-4a2a-ad0e-c51e969d4bab', 'b7dffc20-1202-48fa-a6fc-620bf2791443', '19e943ca-40ea-45b2-8624-05ee88c26994','0f0f58f8-41b2-43c2-8200-642fe28dee30','86780380-f255-4777-9946-3287b4b6ec89']
                };
                map._mapInterface.changeBaseLayer(layerInfo);
                map._mapInterface._CurrentBaseLayerID = layerInfo.selectedLayer;
                this.hideTimeAxis();
            },
            switch_4biao4shi_2017: function () {
                this.removeCurtainControl();
                $('#radio_map a').removeClass("hover");
                $('#dem').addClass("hover");
                if (!map)
                    map = $("#desktop-main-map")[0].contentWindow.map;
                var layerInfo = {
                    selectedLayer: ['0f0f58f8-41b2-43c2-8200-642fe28dee30'],
                    layers: ['5b255031-c651-4e41-aa50-1bac2620adb8', '0a0036ad-815f-4f16-a97b-70578f3a696e', '14b7463c-bcf5-488b-8a9e-88957d91711a', '9ecbc9be-d7c5-4608-aebf-51b960da58b9', '0980672d-aac7-4a2a-ad0e-c51e969d4bab', 'b7dffc20-1202-48fa-a6fc-620bf2791443', '19e943ca-40ea-45b2-8624-05ee88c26994','0f0f58f8-41b2-43c2-8200-642fe28dee30','86780380-f255-4777-9946-3287b4b6ec89']
                };
                map._mapInterface.changeBaseLayer(layerInfo);
                map._mapInterface._CurrentBaseLayerID = layerInfo.selectedLayer;
                this.hideTimeAxis();
            },
			switch_4biao4shi_2016: function () {
				this.removeCurtainControl();
				$('#radio_map a').removeClass("hover");
				$('#dem').addClass("hover");
				if (!map)
					map = $("#desktop-main-map")[0].contentWindow.map;
				var layerInfo = {
					selectedLayer: ['86780380-f255-4777-9946-3287b4b6ec89'],
					layers: ['5b255031-c651-4e41-aa50-1bac2620adb8', '0a0036ad-815f-4f16-a97b-70578f3a696e', '14b7463c-bcf5-488b-8a9e-88957d91711a', '9ecbc9be-d7c5-4608-aebf-51b960da58b9', '0980672d-aac7-4a2a-ad0e-c51e969d4bab', 'b7dffc20-1202-48fa-a6fc-620bf2791443', '19e943ca-40ea-45b2-8624-05ee88c26994','0f0f58f8-41b2-43c2-8200-642fe28dee30','86780380-f255-4777-9946-3287b4b6ec89']
				};
				map._mapInterface.changeBaseLayer(layerInfo);
				map._mapInterface._CurrentBaseLayerID = layerInfo.selectedLayer;
				this.hideTimeAxis();
			},
            removeCurtainControl: function () {
                var map = $("#desktop-main-map")[0].contentWindow.map;
                if (map._controls._CurtainControl != null) {
                    $("#tool_curtain_btn").click();
                }
            },
            hideTimeAxis: function () {
                $($("#desktop-main-map").contents()[0]).find(".event_box").hide();
            }
        };

        var modal = {
            switch_swj_vector: $.proxy(Layerbtn.switch_swj_vector, Layerbtn),
            switch_ggw_vector: $.proxy(Layerbtn.switch_ggw_vector, Layerbtn),
            switch_ggw_striograph: $.proxy(Layerbtn.switch_ggw_striograph, Layerbtn),
            switch_swj_striograph: $.proxy(Layerbtn.switch_swj_striograph, Layerbtn),
            switch_dem: $.proxy(Layerbtn.switch_dem, Layerbtn),
            switch_simple: $.proxy(Layerbtn.switch_simple, Layerbtn),
            switch_4biao4shi_2017: $.proxy(Layerbtn.switch_4biao4shi_2017, Layerbtn),
            switch_4biao4shi_2016: $.proxy(Layerbtn.switch_4biao4shi_2016, Layerbtn),
        };

        Layerbtn.init();
        return modal;
    });