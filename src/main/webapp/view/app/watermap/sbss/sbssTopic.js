define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "mapUtils"],
    function ($, app, composition, ko, common, http, panal, pager, echarts,mapUtils) {
        var isMapLocClick = false;//定位图标点击状态
        var isListItemClick = false;//列表项点击状态
        var prevGraphic;//被点击的定位图标对应的graphic
        var graphicsLayerPoint;//地图定位点图层
        var infoWindowHideHandler;
        var infoListMap = {}; //房屋编码和人员信息键值对
        var myChart = null;
        var parent = null;
        var flag;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var Topic = {
            init: function () {
                var that = this;
                composition.addBindingHandler("specialTopicInitHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
                var that = this;
                var menuId = modal._$_param.menu.id;
                parent = modal._$_param.parent;
                var rootPath = auGurit.global.rootPath;
                var ip = rootPath.substring(0, rootPath.lastIndexOf("/", rootPath.length - 2));

                if (!auGurit.global.mapTopLayers) {
                    auGurit.global.mapTopLayers = [];
                }

                var url = "data/sbssTopic/sbssTopic.json";
                var getMenuService=http.getInstance(url)
                getMenuService.ajax().then(function(data){

                    var url2 = ip + agsupportName + "/agsupport/menu/getMenuByPidAndLoginName/" + menuId + "/" + loginName;
                    $.ajax({
                        type: 'POST',
                        contentType: "application/x-www-form-urlencoded",
                        dataType: "json",
                        url: url2,
                        data: { },
                        success: function (result, textStatus, jqXHR) {

                            if (result && result.success && (result.success === true || result.success === "true") && result.content)
                            {
                                var result = result.content;
                                var topic = rootArr = data.topic;
                                var i = 0;
                                var j = 0;
                                var menuList = [];
                                if(result){
                                    for(i = 0; i < result.length; i++) {
                                        for(j = 0; j < topic.length; j++) {
                                            if(topic[j].id == result[i].url) {
                                                topic[j].text = result[i].name;
                                                menuList.push(topic[j]);
                                                break;
                                            }
                                        }
                                        if(j == topic.length)
                                        {
                                            menuList.push({

                                                id : result[i].id,
                                                text : result[i].name,
                                                title : result[i].name
                                            });
                                        }
                                    }
                                }
                                for (i = 0; i < rootArr.length; i++) {
                                    var tmpArr = rootArr[i];
                                    for (j = 0; j < tmpArr.subtopic.length; j++) {
                                        auGurit.global.mapTopLayers[tmpArr.subtopic[j]["title"]] = {
                                            serviceUrl: tmpArr.subtopic[j]["serviceUrl"],
                                            layerTable: tmpArr.subtopic[j]["layerTable"],
                                            dirLayerId: tmpArr.subtopic[j]["dirLayerId"]
                                        }
                                    }
                                    ;
                                }
                                ;

                            }


                            modal.topicList(menuList);
                        }
                    });
                    
                });


            },
            bindUI: function () {
                var that = this;
                parent.setCurrentPage(modal._$_param.menu.id, that);
            },
            closepanel: function () {
                
                parent.closepanel();
                return;

                if(auGurit.global.utlPanal)
                    auGurit.global.utlPanal.close();
                parent.showTipBar(false);
                $(".nr_sd a").removeClass("hover");
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2) + 8;
                var right = 5;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                for (var l = 0; l < auGurit.global.selectSubject.length; l++) {
                    map._mapInterface.layerFeature.clearLayers();
                    mapUtils.removeGlobalMapLayers(auGurit.global.selectSubject[l].title);
                    auGurit.global.selectSubject.splice(l, 1);
                    l--;
                }
            },
            clearClient: function(item)
            {
                var that = this;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                //反选
                $(".nr_sd>a[name='" + item.id + "']").removeClass("hover");
                for (var l in auGurit.global.selectSubject) {
                    if (auGurit.global.selectSubject[l].title == item.title) {
                        map._mapInterface.layerFeature.clearLayers();
                        mapUtils.removeGlobalMapLayers(item.title);   
                        auGurit.global.selectSubject.splice(l, 1);
                    }
                }
                
            },
            clickSubTopic: function (item) {
                var that = this;

                if (!item.enabled)
                    return;


                if (!auGurit.global.mapLayers) {
                    auGurit.global.mapLayers = {};
                }

                item.maptool = modal._$_param.parent;

                if ($(".nr_sd>a[name='" + item.id + "']").hasClass("hover")) {
                    //关闭选项卡
                    // var pl = window.pl;
                    // if(pl) {
                    //     pl.tabClose(item.title);
                    // }
                    that.clearClient(item);
                }
                else {
                    //选中
                    $(".nr_sd>a[name='" + item.id + "']").addClass("hover");
                    var gotoUrl = item.viewUrl;
                    // var tabsArray = [];
                    // var radio = 0.98;
                    // var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                    // var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2) + 8;
                    // var right = 5;

                    if (!auGurit.global.selectSubject) {
                        auGurit.global.selectSubject = [];
                    }
                    if (auGurit.global.mapTopLayers[item.title]) {
                        auGurit.global.selectSubject.push({
                            title: item.title,
                            obj: auGurit.global.mapTopLayers[item.title]
                        });
                    }

                    that.addDynamicMapLayer(item.title);
                    // if ($("#chooseRiverTab").length == 0) {
                    //     var pl = parent.openWidgetTabPanal("", "面板", {}, 340, height, top, null, right, false, true, true, false, false);
                    //     pl.addTab(item.title, gotoUrl, item);
                    //     window.pl = pl;
                    // }
                    // else {
                    //     var pl = window.pl;
                    //     pl.addTab(item.title, gotoUrl, item);
                    // }

                }
            },
            openWidgetTabPanal: function (url, title, param, width, height, top, left, right, maxBtn, resizable, draggable, switchBtn, multiId) {
                var that = this;
                var settings = {
                    width: width || 360,
                    height: height || $(".desktop-map").height(),
                    resizable: false,
                    draggable: draggable,
                    minBtn: true,
                    maxBtn: true,
                    closeBtn: false,
                    statBtn: switchBtn,
                    detailBtn: switchBtn,
                    multi: multiId,
                    multiId: multiId,
                    titleShow: true,
                    title: title,
                    panalListTitle: "",   //在桌面的面板列表上显示的标题
                    top: top,
                    left: left,
                    right: right,
                    mouseoutClose: false, //鼠标移出即关闭
                    pointShow: false,     //面板是否带有指示角
                    pointBorder: "right",  //left/right/top/bottom
                    pointPosition: 0,    //距离顶点的位置,从左边到右或者从上到下的距离
                    modal: false,         //是否模态
                    closeOther: true,
                    onTabClose: function (tab) {

                        that.clearClient(tab.data.params);
                    }
                };
                var p = panal.getTabInstance(settings);
                auGurit.global.utlPanal = p;

                //缩小事件
                p.settings.onMinShow = function(e){

                    if (p.getSizeState() == "min") {

                        var radio = 0.98;
                        var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                        var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2) + 8;
                        var left = document.documentElement.clientWidth - 350;
                        p.moveTo(top, left);
                        $(".MaxPanel").hide();
                        $(".NormalPanel").show();
                    } else {
                        $(".app-panal").css({
                            "height": document.documentElement.clientHeight - 100
                        });
                        $(".app-panal-content").css({
                            "height": document.documentElement.clientHeight - 130
                        });
                        $(".MaxPanel").hide();
                        $(".NormalPanel").show();
                    }
                };

                //放大事件
                p.settings.onMaxShow = function (e) {
                    if (p.getSizeState() == "max") {
                        var panelHeight = $("#desktop-map").height() / 2;
                        $(".app-panal").css({
                            "height": panelHeight
                        });
                        $(".app-panal-content").css({
                            "height": panelHeight - 30
                        });
                        var radio = 0.98;
                        var smainPanelWidth = $("#smainPanel").is(":hidden") ? 0 : $("#smainPanel").width();
                        var left = $("#side").width() + smainPanelWidth + 50;
                        var top = document.documentElement.clientHeight - $(".app-panal").height() - 20;
                        p.moveTo(top, left);
                        var w = $("#desktop-map").width() - smainPanelWidth - 70;
                        $(".app-panal").width(w);
                        $(".app-panal-content").width(w - 10);
                        p.updateLayout();
                        $(".MaxPanel").show();
                        $(".NormalPanel").hide();
                    } else {
                        $(".app-panal").css({
                            "height": document.documentElement.clientHeight - 100
                        });
                        $(".app-panal-content").css({
                            "height": document.documentElement.clientHeight - 130
                        });
                        $(".MaxPanel").hide();
                        $(".NormalPanel").show();
                    }
                };
                return p;
            },
            dispose: function() {
                try {
                    this.closepanel();  
                }catch(e) {
                    console.error(e);
                }
            },
            showDataExplain:function (item) {
                // console.log(item);
                app.setRoot('view/app/watermap/topic/dataExplain',null,'dataExplain',{
                    "id":item.id
                });
            },
            hideDataExplain:function () {
                /* $('#dataExplain').css("display","block");*/
                app.setRoot(null,null,'dataExplain');
            },
            addDynamicMapLayer: function (title) { 
            	var zoom = 7;
                // 门牌缩放级别
            	if(title=="广州地名地址（不包含从化增城）"||title=="门牌"||title=="网格"||title=="道路"||title=="建筑物编码"||title=="建筑物实体"){
            	    zoom = map.getZoom() > 7 ? map.getZoom() : 8;
            	    map._mapInterface.addDynamicMapLayer(auGurit.global.mapTopLayers[title]["serviceUrl"], auGurit.global.mapTopLayers[title]["layerTable"], function (layer) {
                        auGurit.global.mapLayers[title] = layer;
                    },{zoom: zoom});
            	}else if(title=="兴趣点"){
					zoom = map.getZoom() > 8 ? map.getZoom() : 9;
            	    map._mapInterface.addDynamicMapLayer(auGurit.global.mapTopLayers[title]["serviceUrl"], auGurit.global.mapTopLayers[title]["layerTable"], function (layer) {
                        auGurit.global.mapLayers[title] = layer;
                    },{zoom:zoom});
            	}else{
					zoom = map.getZoom() > 6 ? map.getZoom() : 7;
            		map._mapInterface.addDynamicMapLayer(auGurit.global.mapTopLayers[title]["serviceUrl"], auGurit.global.mapTopLayers[title]["layerTable"], function (layer) {
                        auGurit.global.mapLayers[title] = layer;
                    },{zoom:zoom});
            	}                
            }
        };
        var modal = {
            topicList: ko.observableArray(),
            clickSubTopic: $.proxy(Topic.clickSubTopic, Topic),
            showDataExplain:$.proxy(Topic.showDataExplain, Topic),
            hideDataExplain:$.proxy(Topic.hideDataExplain, Topic),
			toggleSubTopic: function(topic) {
				$('#mainnav-topic-' + topic.id).toggle('slow');
				var menu = $('#topic_display_' + topic.id);
				if(menu.hasClass('topic_display_hover')) {
					menu.removeClass('topic_display_hover');
				} else {
					menu.addClass('topic_display_hover');
				}
				return false;
			},
            closepanel: $.proxy(Topic.closepanel, Topic)
        };
        auGurit.global.topicModal = modal;
        Topic.init();
        return modal;
    });