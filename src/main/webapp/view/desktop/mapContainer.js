/*
 水务一张图
 */
define(["jquery", "durandal/app", "durandal/system", "durandal/composition", "durandal/activator", "knockout", "i18nCommon", "common", "http", "panal", "mapUtils", "layer", "fakeloader", "bootstrap", "metisMenu"],
    function ($, app, system, composition, activator, ko, i18n, common, http, panal, mapUtils, layer) {
        var currentPage = null;
        var loadingHander = null;
        var commonParams;   //  公共参数对象
        var Container = {
            init: function () {
                var that = this;
                composition.addBindingHandler("initMapHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                    }
                });
            },
            renderUI: function () {
                var that = this;
                that.browserCheck();// 浏览器版本检查
                loadingHander = layer.msg('正在载入，请稍候 ......', {
                    icon: 16,
                    anim: -1,
                    time: 800000,// 800S关闭
                    fixed: false
                });

                //加载地图
                var mapFrame = $("#desktop-main-map");
                mapFrame.on("load", function () {
                    //菜单加载
                    app.setRoot("view/desktop/sideContainer", null, "desktop-map-side", {
                        parent: that,
                        menu: modal._$_param.menu
                    })

                    //地图工具条加载
                    modal.toolbarVisible(true);
                    //地图参数初始化
                    if (!auGurit.global.mapLayers) {
                        auGurit.global.mapLayers = {};
                    }
                    if (!auGurit.global.mapTopLayers) {
                        auGurit.global.mapTopLayers = {};
                    }
                    if (!auGurit.global.selectSubject) {
                        auGurit.global.selectSubject = [];
                    }
                    that.showLayerBtnContent();
                    that.layerIdentify();
                    // //关联信息 原来共享信息条
                    // that.layerInfo();
                    //工具栏位置
                    $("#widgets_toolbar").css("left", mapFrame.width() / 2 - 60);

                    //关闭loading
                    layer.close(loadingHander);
                    loadingHander = null;
                });
                //页面窗口大小变化时地图大小自适应
                $(window).on("resize", function () {
                    mapFrame.contents().find("#map").width(mapFrame.width());
                    mapFrame.contents().find("#map").height(mapFrame.height());
                });
                mapFrame.attr("src", "2928fb1530e31028/augurit/com/sc/agcom.jsp");
            },
            bindUI: function () {
                var that = this;
                modal._$_param.parent.setCurrentPage(modal._$_param.menu.id, that);
            },
            //浏览器检查
            browserCheck: function () {
                if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    var ua = navigator.userAgent.toLocaleLowerCase();
                    var browserVersion = ua.match(/msie([^\;]+)/);
                    if (browserVersion && browserVersion[1] < 9) {
                        alert("请采用IE11及以上或者谷歌Chrome浏览器。");
                    }
                }
            },
            dispose: function () {
                if (loadingHander) {
                    layer.close(loadingHander);
                    loadingHander = null;
                }
                if (currentPage != null && currentPage.dispose)
                    currentPage.dispose();
            },
            //展示工具条上图层按钮的内容
            showLayerBtnContent: function () {
                app.setRoot("view/app/toolbar/layerbtn", null, "toolbar_layer_btn_li");
                app.setRoot("view/app/toolbar/maptool/maptool", null, "tool_btn");
                app.setRoot("view/app/toolbar/infoTool/infoTool", null, "tool_btn_info");
                app.setRoot("view/app/toolbar/spaceQuery/spaceQuery", null, "tool_btn_space");
                app.setRoot("view/app/toolbar/downReport/downReport", null, "tool_btn_report");

                $("#tool_curtain_btn").click(function () {
                    var map = $("#desktop-main-map")[0].contentWindow.map;
                    var currentLayerDirLayerID = map._mapInterface._CurrentBaseLayerID ? map._mapInterface._CurrentBaseLayerID : "5b255031-c651-4e41-aa50-1bac2620adb8"; // 当前底图的DirLayerID
                    var leftLayerDirLayerID = "5b255031-c651-4e41-aa50-1bac2620adb8"; // 水务局矢量(新)的DirLayerID
                    var rightLayerDirLayerID = "b7dffc20-1202-48fa-a6fc-620bf2791443"; // 水务局影像DirLayerID
                    map._mapInterface.addCurtainControl(currentLayerDirLayerID, leftLayerDirLayerID, rightLayerDirLayerID);
                });
            },
            layerInfo: function () {
                //共享 关联信息              
                system.acquire("view/app/watermap/river/relevantInfo").fail(function (err) {
                    console.info(err);
                });
                $("#tool_btn_info").click(function () {
                    $info = $("#panel-div");

                    $info.toggle();
                    if ($info.is(":visible")) {
                        $("#tool_btn_info").addClass("active");
                    } else {
                        $("#tool_btn_info").removeClass("active");
                        if ($("#layer-subpanel").length)
                            $("#layer-subpanel").remove();
                    }
                });
            },
            layerIdentify: function () {
                var _this = this;
                $("#tool_identify_btn").click(function () {
                    //currentPage.showUtlBar(false);
                    var map = $("#desktop-main-map")[0].contentWindow.map;
                    // $(map._container).css('cursor', 'url(' + auGurit.global.rootPath + '/style/asip/common/css/images/resource/identify_pointer.png),auto');
                    map.off("click");
                    map.on("click", function (evt) {
                        if (!(auGurit.global.selectSubject && auGurit.global.selectSubject.length > 0)) {
                            alert("当前地图没有可查询的底图服务！");
                            return;
                        }
                        _this.identifyFeature = [];
                        _this.squences = [];//存储squence,用来检查整个循环是否执行完成
                        map._mapInterface.layerFeature.clearLayers();
                        for (var j in auGurit.global.selectSubject) {
                            (function (j) {
                                var _selectSubject = auGurit.global.selectSubject[j];
                                var dirLayerId = _selectSubject.obj["dirLayerId"];
                                if (dirLayerId) {
                                    _this.IdentifyByDirLayerId(evt.latlng, {
                                        dirLayerId: dirLayerId,
                                        sttp: _selectSubject.obj["sttp"],
                                        url: _selectSubject.obj["url"],
                                        isCheck: _selectSubject.obj["isCheck"],
                                        title: _selectSubject.title,
                                        field: _selectSubject.obj["field"],
                                        meta_url: _selectSubject.obj["meta_url"]
                                    }, j);
                                }
                            })(j)
                        }
                    });
                });
            },
            IdentifyByDirLayerId: function (latlng, option, j) {
                var _this = this, url;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                map._mapInterface._Identify(latlng, option.dirLayerId, function (data) {
                    if (data && data.length > 0) {
                        var flag = 0, identifyLayer = [], metadata = null;
                        for (var k in data) {
                            flag++;
                            var layer = _this.addLayer(data[k].geometry);
                            if (option.sttp)
                                url = option.url + option.sttp + "/" + data[k].projectID;
                            else if(option.url === '/subject/getIrrigateInfo')
                                url = option.url + "/" + data[k].STCD;
                            else
                                url = option.url + "/" + (data[k].projectID || data[k].PROJECTID  || data[k].objectid);
                            var newOpt = $.extend({}, option, {
                                url: url,
                                content: metadata
                            });
                            _this.queryProperties(newOpt, layer, function (data) {
                                if (data)
                                    metadata = data;
                            });
                            identifyLayer.push({
                                layer: layer,
                                name: data[k][auGurit.global.selectSubject[j].obj["annoFieldCN"]]
                            });
                            if (flag === 3) {//每个图层最多显示3条结果
                                break;
                            }
                        }
                        _this.identifyFeature.push({layer: identifyLayer, type: option.title});
                    }
                    _this.squences.push(j);
                    _this.showPopup();
                });
            },
            showPopup: function () {
                var _this = this;
                if (_this.squences.length === auGurit.global.selectSubject.length) {//循环完毕
                    if (_this.identifyFeature.length > 0) {
                        var layer = _this.identifyFeature[0].layer[0].layer;
                        mapUtils.setLayerStyle(layer, 1);
                        var hander = setInterval(function () {
                            if (layer.getPopup()) {
                                layer.openPopup();
                                window.clearInterval(hander);
                            }
                        }, 50);
                        if (_this.identifyFeature.length > 1 || _this.identifyFeature[0].layer.length > 1) {
                            _this.identifyPanel();
                        } else if (_this.identifyFeature.length == 1 && _this.identifyFeature[0].layer.length == 1) {
                            var $panel = $("[panal-id='view/app/watermap/river/identifyLayers/identifyLayersPanel']");
                            if ($panel)
                                $panel.hide();
                        }
                    } else {
                        var $panel = $("[panal-id='view/app/watermap/river/identifyLayers/identifyLayersPanel']");
                        if ($panel)
                            $panel.hide();
                    }
                }
            },
            queryProperties: function (option, layer, callback) {
                var _this = this;
                $.post(auGurit.global.rootPath + option.url, function (data) {
                    data = JSON.parse(data);
                    if (data.success) {
                        option.obj = data.content;
                        if (option.content) {
                            _this._createPopup(option, layer);
                            callback(null);
                        } else {
                            $.get(auGurit.global.rootPath + option.meta_url, function (r) {
                                var metadata = JSON.parse(r);
                                option["content"] = metadata.content;
                                if (metadata.success) {
                                    _this._createPopup(option, layer);
                                    callback(metadata.content);
                                } else
                                    alert("获取源数据失败");
                            });
                        }
                    } else
                        alert("获取属性数据失败");
                });
            },
            _createPopup: function (option, layer) {
                if (option.isCheck && option.isCheck === "false") {
                    mapUtils._createPopup(option, layer);  //  不需要编辑
                } else {
                    option.leaflet_id = layer._leaflet_id;
                    option.tableName = option.meta_url.substring(option.meta_url.lastIndexOf("/")).replace("/", "");
                    mapUtils.createPopup(option, layer);  //  需要编辑
                }
            },
            addLayer: function (geometry) {
                var map = $("#desktop-main-map")[0].contentWindow.map;
                var layer = map._mapInterface.wktToLayer({geometry: geometry, type: "Feature"});
                mapUtils.setLayerStyle(layer, 0);
                layer.on("click", function (e) {
                    //  图层正选和反选样式切换
                    map._mapInterface.layerFeature.eachLayer(function (layer_) {
                        mapUtils.setLayerStyle(layer_, 0);
                    });
                    mapUtils.setLayerStyle(map._mapInterface.layerFeature.getLayer(this._leaflet_id), 1);
                });
                map._mapInterface.layerFeature.addLayer(layer);
                return layer;
            },
            openPanal: function (url, title, param, width, height, top, left, right, maxBtn, resizable, draggable, switchBtn, multiId) {
                common.openDialogPanal(url, title, {}, width, height, top, left);
            },
            identifyPanel: function () {
                common.openDialogPanal("view/app/watermap/river/identifyLayers/identifyLayersPanel", "查询结果", this.identifyFeature, "280px", "315px", "100px", "50px");
            },
            //设置当前对象
            setCurrentPage: function (item) {
                currentPage = item;
            }
        };
        var modal = {
            toolbarVisible: ko.observable(false)
        };
        Container.init();
        return modal;
    });