define(["jquery", "durandal/app", "durandal/system", "durandal/composition", "durandal/activator", "knockout", "i18nCommon", "common", "http", "panal", "mapUtils", "fakeloader", "bootstrap", "metisMenu"],
    function ($, app, system, composition, activator, ko, i18n, common, http, panal, mapUtils) {
        var desktopMapClickHandler;
        var currentBar = true;//当前专题面板
        var thematicMap = {};//专题名称与专题layer的映射
        var maxDisplayNum = 10;
        var appId;
        var curPanal;
        var menuList = [];
        var curSubItem = null;
        var metadata = {};
        var Desktop = {
            init: function () {
                var that = this;
                this.identifyFlag = false;//属性查看是否开启
                composition.addBindingHandler("initDesktopHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                        that.getUserName();
                        $(dom).click(function () {
                            
                        });
                        // 设置全局，主要是给首页调用
                        window.openAuditPanalInHomePage = function (title, servId, servName, applyingLoginName, sucessCallback) {
                            var top = 90;
                            var left = (window.screen.width - 800) / 2; //获得窗口的水平位置;
                            common.openDialogPanal("view/app/watermap/topic/resource/approvallist2", title, {
                                serviceId: servId,
                                servName: servName,
                                applyingLoginName: applyingLoginName,
                                parentPage: sucessCallback
                            }, 800, 560, top, left);
                        }
                    }
                });
            },
            //获取用户名
            getUserName: function () {
                var rootPath = auGurit.global.rootPath;
                var ip = rootPath.substring(0, rootPath.lastIndexOf("/", rootPath.length - 2));
                $.ajax({
                    url: ip + agsupportName + "/agsupport/user/getUserByName/" + loginName,
                    type: "get",
                    dataType: "text",
                    success: function (userName) {
                        $("#userName").text(userName);
                    },
                    error: function () {
                    }
                });
            },
            renderUI: function () {
                var that = this;
                var getMenuService = http.getInstance("data/menu/menu.json");
                getMenuService.ajax().then(function (data) {
                    var i = 0;
                    var j = 0;
                    //管理员有全部权限
                    if (loginName == "agcomadmin" || loginName.indexOf("sptest") > -1) {
                        for (i = 0; i < data.menu.length; i++) {
                            data.menu[i].selected = true;
                            data.menu[i].enabled = true;
                            if (data.menu[i].submenu) {
                                for (j = 0; j < data.menu[i].submenu.length; j++) {
                                    data.menu[i].submenu[j].selected = true;
                                    data.menu[i].submenu[j].enabled = true;
                                }
                            }
                        }
                    } else {
                        $("#godlamp").hide();
                    }
                    modal.menuList(data.menu);
                    //自动选中
                    for (i = 0; i < data.menu.length; i++) {
                        if (data.menu[i].enabled && data.menu[i].selected) {
                            modal.menuLevelOne(data.menu[i]);
                            break;
                        }
                    }
                });
                //地图
                var mapFrame = $("#desktop-main-map");
                mapFrame.on("load", function () {
                });
                $("#widgets_toolbar").css("left", mapFrame.width() / 2 - 103);
                //页面窗口大小变化时地图大小自适应
                $(window).on("resize", function () {
                    mapFrame.contents().find("#map").width(mapFrame.width());
                    mapFrame.contents().find("#map").height(mapFrame.height());
                });
                mapFrame.attr("src", "2928fb1530e31028/augurit/com/sc/agcom.jsp");
                
            },

            bindUI: function () {
                var that = this;
                $("#sidebar").click(function () {
                    if (auGurit.global.utlBar) {
                        that.hideUtlBar();
                    } else {
                        that.showUtlBar();
                    }
                });
                $('.label_btn').hover(function () {
                    var top = $('#widgets_toolbar').css('top');
                    var left = $('#widgets_toolbar').css('left');
                    top = top.replace('px', '');
                    left = left.replace('px', '');
                    left = parseInt(left) + 82;
                    top = parseInt(top) + 41;
                    $toolbarLegend = $('<div id="toolbar_legend" style="left:' + left + 'px;top:' + top + 'px"></div>');
                    $toolbarLegend.append('<div class="legend-all">' +
                        '<div class="legend-line">' +
                        '<div class="legend-icon legend-icon-shuiku"></div>' +
                        '<span>水库</span></div>' +
                        '<div class="legend-line">' +
                        '<div class="legend-icon legend-icon-difang"></div>' +
                        '<span>提防</span></div>' +
                        '<div class="legend-line">' +
                        '<div class="legend-icon legend-icon-shuizha"></div>' +
                        '<span>水闸</span></div>' +
                        '<div class="legend-line">' +
                        '<div class="legend-icon legend-icon-bengzhan"></div>' +
                        '<span>泵站</span></div>' +
                        '<div class="legend-line">' +
                        '<div class="legend-icon legend-icon-shuiweizhang"></div>' +
                        '<span>水位(涨)</span></div>' +
                        '<div class="legend-line">' +
                        '<div class="legend-icon legend-icon-shuiweiping"></div>' +
                        '<span>水位(平)</span></div>' +
                        '<div class="legend-line">' +
                        '<div class="legend-icon legend-icon-shuiweijiang"></div>' +
                        '<span>水位(降)</span></div>' +
                        '<div class="legend-line">' +
                        '<div class="legend-icon legend-icon-normal"></div>' +
                        '<span>正常</span></div>' +
                        '<div class="legend-line">' +
                        '<div class="legend-icon legend-icon-cjjx"></div>' +
                        '<span>超警戒线</span></div></div>');
                    $('#side').append($toolbarLegend);
                }, function () {
                    $('#toolbar_legend').remove();
                });
                that.showLayerBtnContent();
                that.layerIdentify();
            },
            //一级菜单
            menuLevelOne: function (item) {
                var that = this;
                $("#sw-desktop-top-menu li[name='" + item.id + "']").addClass('hover').siblings().removeClass('hover');
                that.hideUtlBar();
                if (item.id == "level-1") {
                    setTimeout(function () {
                        that.homeItemClick();//首页
                    }, 100);
                } else if (item.id == "level-2") {
                    setTimeout(function () {
                        that.pageItemClick();//水务综合信息一览
                    }, 100);
                } else if (item.id == "level-3") {//服务资源
                    $("#home-container").hide();
                    $("#more-page-container").hide();
                    $("#page-container").hide();
                    $("#resource-container").hide();
                    $("#operation-container").hide();
                    $("#smainPanel").hide();//标签的面板
                    $("#sidebar").hide();//控制隐藏显示标签面板的图标
                    $("#widgets_toolbar").show();
                    $("#userCenter-container").hide();
                    $("#mainnav-menu").css('top', 0);
                    modal.subMenuList(item.submenu);
                    item.submenu.length > 0 && modal.clickSubItem(item.submenu[0]);
                } else if (item.id == "level-5") {
                    setTimeout(function () {//运维管理
                        $(".map-container").hide();
                        $("#home-container").hide();
                        $("#page-container").hide();
                        $("#resource-container").hide();
                        $("#more-page-container").hide();
                        $('#operation-container').html("<iframe src='/agsupport/?top=false&ti=" + new Date().getTime()
                            + "' " + "style='width:100%;height:100%;'></iframe>");
                        $("#operation-container").show();
                        $("#userCenter-container").hide();
                    }, 100);
                } else if (item.id == "level-6") {
                    window.open(agsupportUrl + '/swuser/userIndex.do');
                } else { //水务一张图
                    that.browserCheck();
                    $("#sidebar").show();//控制隐藏显示标签面板的图标
                    $("#mainnav-menu").css('top', 35);
                    $(".map-container").show();
                    $("#home-container").hide();
                    $("#more-page-container").hide();
                    $("#page-container").hide();
                    $("#widgets_toolbar").show();
                    $("#resource-container").hide();
                    $("#operation-container").hide();
                    $("#userCenter-container").hide();
                    modal.subMenuList(item.submenu);
                    //自动选中
                    for (var i = 0; i < item.submenu.length; i++) {
                        if (item.submenu[i].enabled && item.submenu[i].selected) {
                            modal.clickSubItem(item.submenu[i]);
                            break;
                        }
                    }
                    if (!$(".layer-panel").length) {
                        system.acquire("view/app/watermap/river/riverStation").fail(function (err) {
                            console.info(err);
                        });
                    }
                }
                if (auGurit.global.utlPanal) {
                    auGurit.global.utlPanal.close();
                }
                
            },
            homeItemClick: function () {
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio);
                var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2);
                var left = 5;
                $(".map-container").hide();
                $("#page-container").hide();
                $("#resource-container").hide();
                $("#operation-container").hide();
                $("#more-page-container").hide();
                $("#home-container").show();
                $("#userCenter-container").hide();
                app.setRoot("view/app/home/home", null, "home-container");
                if (auGurit.global.utlPanal) {
                    auGurit.global.utlPanal.close();
                }
            },

            pageItemClick: function () {
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio);
                var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2);
                var left = 5;
                $(".map-container").hide();
                $("#resource-container").hide();
                $("#operation-container").hide();
                $("#page-container").show();
                $("#home-container").hide();
                $("#more-page-container").hide();
                $("#userCenter-container").hide();
                app.setRoot("view/app/home/pageContainer", null, "page-container");
                if (auGurit.global.utlPanal) {
                    auGurit.global.utlPanal.close();
                }
            },
            //打开 服务资源 页面
            resourceItemClick: function (itemId) {
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio);
                var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2);
                var left = 50;
                $("#resource-container").show();
                $("#resource-container").css("left", 40);//设置距离左边40px
                if (itemId == 'level-3-1')
                    app.setRoot("view/app/watermap/topic/resource/rescenter", null, "resource-container");
                if (itemId == 'level-3-2')
                    app.setRoot("view/app/serviceresource/datamanage/rescenter", null, "resource-container");
                if (itemId == 'level-3-3')
                    app.setRoot("view/app/serviceresource/dataservice/rescenter", null, "resource-container");
                if (auGurit.global.utlPanal) {
                    auGurit.global.utlPanal.close();
                }
            },
            //点击左侧菜单
            clickSubItem: function (item) {
                var that = this;
                $("#mainnav-menu li").removeClass("hover");
                $("#mainnav-menu>li[name='" + item.id + "']").addClass("hover");
                if (item.id == "level-3-1") {
                    that.hideUtlBar();
                    that.resourceItemClick(item.id);//打开 服务资源 页面
                    return;
                } else if (item.id == "level-3-2") {
                    that.hideUtlBar();
                    that.resourceItemClick(item.id);//打开 服务资源 页面
                    return;
                } else if (item.id == "level-3-3") {
                    that.hideUtlBar();
                    that.resourceItemClick(item.id);//打开 服务资源 页面
                    return;
                }
                if (!curSubItem || curSubItem.id != item.id) {
                    if (auGurit.global.utlPanal)
                        auGurit.global.utlPanal.close();
                    that.showUtlBar();
                } else {
                    if (auGurit.global.utlBar) {
                        that.hideUtlBar();
                    } else {
                        that.showUtlBar();
                    }
                }
                
                //清除共享工具条图层
                if(auGurit.global.shareSelectLayers){
                    var map = $("#desktop-main-map")[0].contentWindow.map;
                    map._mapInterface.layerFeature.clearLayers();
                    for (var l = 0; l < auGurit.global.shareSelectLayers.length; l++) {
                        layerObj = auGurit.global.shareMapLayers[auGurit.global.shareSelectLayers[l].title];
                        if (layerObj)
                            map.removeLayer(layerObj);
                        auGurit.global.shareMapLayers[auGurit.global.shareSelectLayers[l].title] = null;
                        auGurit.global.shareSelectLayers.splice(l, 1);
                        l--;
                    }
                    //回收共享工具条面板
                    $("#collapse-div").trigger('click');
                    //回复默认状态
                    $("li[class='activated']").each(function(i,elem){
                        $(this).data("status","close");
                        $(this).removeClass("activated");
                    })                   
                }
                if (curSubItem != item) {
                    //清空所有标注
                    var map = $("#desktop-main-map")[0].contentWindow.map;
                    map._mapInterface.layerFeature.clearLayers();
                    //清除所有矢量图层
                    if (auGurit.global.selectSubject) {
                        for (var l = 0; l < auGurit.global.selectSubject.length; l++) {
                            layerObj = auGurit.global.mapLayers[auGurit.global.selectSubject[l].title];
                            if (layerObj)
                                map.removeLayer(layerObj);
                            auGurit.global.mapLayers[auGurit.global.selectSubject[l].title] = null;
                            auGurit.global.selectSubject.splice(l, 1);
                            l--;
                        }
                    }
                    if (auGurit.global.mapLayers) {
                        for (var title in auGurit.global.mapLayers) {
                            var pointObject = auGurit.global.mapLayers[title];
                            if (pointObject)
                                map.removeLayer(pointObject);
                        }
                    }
                }
                curSubItem = item;
                system.acquire("view/app/watermap/" + item.id + "/" + item.id).then(function (module) {
                    var model = system.resolveObject(module);
                    if (item.hasMap) {
                        modal.smainPanel(model);
                    } else {
                        // modal.indexPanel(model);
                    }
                }).fail(function (err) {
                    console.error(item.id + "加载失败！");
                    console.info(err);
                });
            },
            browserCheck: function () {
                if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    var ua = navigator.userAgent.toLocaleLowerCase();
                    var browserVersion = ua.match(/msie([^\;]+)/);
                    if (browserVersion && browserVersion[1] < 9) {
                        alert("请采用IE11及以上或者谷歌Chrome浏览器。");
                    }
                }
            },
            hideUtlBar: function () {
                if (auGurit.global.utlBar) {
                    auGurit.global.utlBar = false;
                    if (auGurit.global.utlPanal && auGurit.global.utlPanal.settings.left) {
                        var setting = {
                            width: document.documentElement.clientWidth - 40,
                            height: document.documentElement.clientHeight - 74,
                            top: 74,
                            left: 40,
                            right: null,
                            bottom: null
                        };
                        auGurit.global.utlPanal.resize(setting);
                    }
                    if (auGurit.global.secondUtlPanal && auGurit.global.secondUtlPanal.settings.left) {
                        var setting = {
                            width: auGurit.global.secondUtlPanal.settings.width,
                            height: auGurit.global.secondUtlPanal.settings.height,
                            top: 74,
                            left: 40,
                            right: null,
                            bottom: null
                        };
                        auGurit.global.secondUtlPanal.resize(setting);
                    }
                    $("#smainPanel").animate({
                        width: "hide",
                        paddingLeft: "hide",
                        paddingRight: "hide",
                        marginLeft: "hide",
                        marginRight: "hide"
                    }, 300);
                    setTimeout(function () {
                        $(".desktop-map").css("bottom", 1);//用于重新激活CSS
                        $("#sidebar a").removeClass("hover");
                    }, 300);
                }
            },
            showUtlBar: function () {
                if (!auGurit.global.utlBar) {
                    auGurit.global.utlBar = true;
                    if (auGurit.global.utlPanal && auGurit.global.utlPanal.settings.left) {
                        var setting = {
                            width: document.documentElement.clientWidth - 304,
                            height: document.documentElement.clientHeight - 74,
                            top: 74,
                            left: 304,
                            right: null,
                            bottom: null
                        };
                        auGurit.global.utlPanal.resize(setting);
                    }
                    if (auGurit.global.secondUtlPanal && auGurit.global.secondUtlPanal.settings.left) {
                        var setting = {
                            width: auGurit.global.secondUtlPanal.settings.width,
                            height: auGurit.global.secondUtlPanal.settings.height,
                            top: 74,
                            left: 304,
                            right: null,
                            bottom: null
                        };
                        auGurit.global.secondUtlPanal.resize(setting);
                    }
                    $("#smainPanel").animate({
                        width: "show",
                        paddingLeft: "show",
                        paddingRight: "show",
                        marginLeft: "show",
                        marginRight: "show"
                    }, 300);
                    setTimeout(function () {
                        $(".desktop-map").css("bottom", 1);//用于重新激活CSS
                        $("#sidebar a").addClass("hover");
                    }, 300);
                }
            },
            //打开各功能的信息面板时，修改地图宽度
            resizeMap: function (direction, pixel) {

            },
            //点击退出按钮
            clickQuitBtn: function () {
                var href = auGurit.global.rootPath + 'logoutByCas';
                location.href = href;
            },
            //点击用户名
            clickUserNameBtn: function () {
                common.openDialogPanal("view/desktop/changeInfo", "修改用户", {
                    loginName: loginName
                }, "500px", "500px", "100px", "36%");
            },
            //展示工具条上图层按钮的内容
            showLayerBtnContent: function () {
                app.setRoot("view/app/toolbar/layerbtn", null, "toolbar_layer_btn_li");
                app.setRoot("view/app/toolbar/maptool/maptool", null, "tool_btn");
                $("#tool_curtain_btn").click(function () {
                    var map = $("#desktop-main-map")[0].contentWindow.map;
                    var currentLayerDirLayerID = map._mapInterface._CurrentBaseLayerID ? map._mapInterface._CurrentBaseLayerID : "5b255031-c651-4e41-aa50-1bac2620adb8"; // 当前底图的DirLayerID
                    var leftLayerDirLayerID = "5b255031-c651-4e41-aa50-1bac2620adb8"; // 水务局矢量(新)的DirLayerID
                    var rightLayerDirLayerID = "b7dffc20-1202-48fa-a6fc-620bf2791443"; // 水务局影像DirLayerID
                    map._mapInterface.addCurtainControl(currentLayerDirLayerID, leftLayerDirLayerID, rightLayerDirLayerID);
                });
            },
            layerIdentify: function () {
                var _this = this;
                $("#tool_identify_btn").click(function () {
                    _this.hideUtlBar();
                    var map = $("#desktop-main-map")[0].contentWindow.map;
                    $(map._container).css('cursor', 'url(' + auGurit.global.rootPath + '/style/asip/common/css/images/resource/identify_pointer.png),auto');
                    if (!_this.identifyFlag) {
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
                                    var dirLayerId = auGurit.global.selectSubject[j].obj["dirLayerId"];
                                    var sttp = auGurit.global.selectSubject[j].obj["sttp"];
                                    if (dirLayerId) {
                                        _this.IdentifyByDirLayerId(evt.latlng, {
                                            dirLayerId: dirLayerId,
                                            sttp: sttp
                                        }, j);
                                    }
                                })(j);
                            }
                        });
                        _this.identifyFlag = true;
                    } else {
                        map.off('click');
                        map._mapInterface.layerFeature.clearLayers();
                        $(map._container).css('cursor', '-webkit-grab');
                        _this.identifyFlag = false;
                    }
                });
            },
            IdentifyByDirLayerId: function (latlng, option, j) {
                var map = $("#desktop-main-map")[0].contentWindow.map;
                var _this = this;
                map._mapInterface._Identify(latlng, option.dirLayerId, function (data) {
                    if (data && data.length > 0) {
                        var flag = 0;
                        var title = auGurit.global.selectSubject[j].title;
                        var identifyLayer = [];
                        for (var k in data) {
                            flag++;
                            var layer = map._mapInterface.wktToLayer({
                                geometry: data[k].geometry,
                                type: "Feature"
                            });
                            mapUtils.setLayerStyle(layer, 0);
                            layer.on("click", function (e) {
                                map._mapInterface.layerFeature.eachLayer(function (layer_) {
                                    mapUtils.setLayerStyle(layer_, 0);
                                });
                                mapUtils.setLayerStyle(map._mapInterface.layerFeature.getLayer(this._leaflet_id), 1);
                            });
                            map._mapInterface.layerFeature.addLayer(layer);
                            _this.queryProperties(option.sttp != null ? {
                                projectID: data[k].projectID,
                                title: title,
                                sttp: option.sttp
                            } : {
                                projectID: data[k].projectID,
                                title: title
                            }, layer);
                            identifyLayer.push({
                                layer: layer,
                                name: data[k][auGurit.global.selectSubject[j].obj["annoFieldCN"]]
                            });
                            if (flag === 3) {//每个图层最多显示3条结果
                                break;
                            }
                        }
                        _this.identifyFeature.push({
                            layer: identifyLayer,
                            type: title
                        });
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
                            if ($panel) {
                                $panel.hide();
                            }
                        }
                    } else {
                        var $panel = $("[panal-id='view/app/watermap/river/identifyLayers/identifyLayersPanel']");
                        if ($panel) {
                            $panel.hide();
                        }
                    }
                }
            },
            queryProperties: function (option, layer) {
                var _this = this;
                var field, url, url2, url3, url4;
                switch (option.title) {
                    case "35条黑臭河涌":
                    case "187条黑臭河涌":
                    case "河流": {
                        field = "rvcd";
                        url = "tempTable/layerEdit/getRiverByRVCD/";
                        url2 = auGurit.global.rootPath + "tempTable/layerEdit/saveRiver";
                        url3 = auGurit.global.rootPath + "subject/getriverbyid/" + option.projectID;
                        url4 = "metadata/getFieldsByTableName/WRP_RVR_BSIN";
                        break;
                    }
                    case "湖泊": {
                        field = "lkcd";
                        url = "tempTable/layerEdit/getLakeByLKCD/";
                        url2 = auGurit.global.rootPath + "tempTable/layerEdit/saveLake";
                        url3 = auGurit.global.rootPath + "subject/getlakebyid/" + option.projectID;
                        url4 = "metadata/getFieldsByTableName/WRP_LAK_BSIN";
                        break;
                    }
                    case "水库": {
                        field = "rscd";
                        url = "tempTable/layerEdit/getReservoirByRSCD/";
                        url2 = auGurit.global.rootPath + "tempTable/layerEdit/saveReservoir";
                        url3 = auGurit.global.rootPath + "subject/getresbyid/" + option.projectID;
                        url4 = "metadata/getFieldsByTableName/WRP_RSR_BSIN";
                        break;
                    }
                    case "泵站": {
                        field = "idstcd";
                        url = "tempTable/layerEdit/getPumpsByIDSTCD/";
                        url2 = auGurit.global.rootPath + "tempTable/layerEdit/updatePumpsData";
                        url3 = auGurit.global.rootPath + "subject/getpumpbyid/" + option.projectID;
                        url4 = "metadata/getFieldsByTableName/WRP_IDS_BSIN";
                        break;
                    }
                    case "污水处理厂水质监测站":
                    case "河涌水质监测站": {
                        field = "stcd";
                        url = "tempTable/layerEdit/getWaterQualityBySTCD/" + option.sttp + "/";
                        url2 = auGurit.global.rootPath + "tempTable/layerEdit/updateWaterQuality";
                        url3 = auGurit.global.rootPath + "subject/getWaterQualityBySTCD/" + option.sttp + "/" + option.projectID;
                        url4 = "metadata/getFieldsByTableName/WQ_WQSINF_B";
                        break;
                    }
                    case "堤防": {
                        field = "lvcd";
                        url = "tempTable/layerEdit/getDikeByLVCD/";
                        url2 = auGurit.global.rootPath + "tempTable/layerEdit/saveDike";
                        url3 = auGurit.global.rootPath + "subject/getdikebyid/" + option.projectID;
                        url4 = "metadata/getFieldsByTableName/WRP_LEV_BSIN";
                        break;
                    }
                    case "河道水文站":
                    case "雨量站":
                    case "堰闸水文站":
                    case "污水干管监测站":
                    case "积水监测点":
                    case "排水泵监测站":
                    case "水库水文站": {
                        field = "stcd";
                        url = "tempTable/layerEdit/getStationByStcdAndSttp/" + option.sttp + "/";
                        url2 = auGurit.global.rootPath + "tempTable/layerEdit/updateStation";
                        url3 = auGurit.global.rootPath + "subject/getStationByStcdAndSttp/" + option.sttp + "/" + option.projectID;
                        url4 = "metadata/getFieldsByTableName/ST_STBPRP_B";
                        break;
                    }
                    default: {
                        field = "slcd";
                        url = "tempTable/layerEdit/getGatesBySLCD/";
                        url2 = auGurit.global.rootPath + "tempTable/layerEdit/updateGatesData";
                        url3 = auGurit.global.rootPath + "subject/getgatebyid/" + option.projectID;
                        url4 = "metadata/getFieldsByTableName/WRP_SLU_BSIN";
                        break;
                    }
                }
                $.post(url3, function (data) {
                    data = JSON.parse(data);
                    if (data.success) {
                        $.ajax({
                            url: auGurit.global.rootPath + url4, // 请求元数据
                            type: 'get',
                            success: function (r) {
                                metadata = JSON.parse(r);
                                option._leaflet_id = layer._leaflet_id;
                                option.content = metadata.content;
                                layer.bindPopup(mapUtils.createPopup({
                                    "content": metadata.content,
                                    "obj": data.content,
                                    "title": option.title,
                                    "leaflet_id": layer._leaflet_id
                                }), {minWidth: "430px"});
                                if (!(option.title == "35条黑臭河涌" || option.title == "187条黑臭河涌")) {
                                    var _popupEvent = function () {
                                        mapUtils.popupEvent({
                                            "content": option.content,
                                            "field": field,
                                            "url": url,
                                            "url2": url2
                                        });
                                    };
                                    _popupEvent();
                                    layer.getPopup().on('add', function (e) {
                                        _popupEvent();
                                    });
                                }
                            },
                            error: function () {
                                alert("信息获取失败");
                            }
                        });
                    }
                });
            },
            openPanal: function (url, title, param, width, height, top, left, right, maxBtn, resizable, draggable, switchBtn, multiId) {
                common.openDialogPanal(url, title, {}, width, height, top, left);
            },
            identifyPanel: function () {
                common.openDialogPanal("view/app/watermap/river/identifyLayers/identifyLayersPanel", "查询结果", this.identifyFeature, "280px", "315px", "100px", "50px");
            }
        };

        var modal = {
            menuList: ko.observableArray(),
            menuLevelOne: $.proxy(Desktop.menuLevelOne, Desktop),
            subMenuList: ko.observableArray(),
            clickSubItem: $.proxy(Desktop.clickSubItem, Desktop),
            smainPanel: activator.create(),
            clickQuitBtn: $.proxy(Desktop.clickQuitBtn, Desktop),
            clickUserNameBtn: $.proxy(Desktop.clickUserNameBtn, Desktop)
        };

        Desktop.init();
        return modal;
    });