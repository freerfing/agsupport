define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts"],
    function ($, app, composition, ko, common, http, panal, pager, echarts) {
        var isMapLocClick = false;//定位图标点击状态
        var isListItemClick = false;//列表项点击状态
        var prevGraphic;//被点击的定位图标对应的graphic
        var graphicsLayerPoint;//地图定位点图层
        var infoWindowHideHandler;
        var infoListMap = {}; //房屋编码和人员信息键值对
        var myChart = null;
        var flag;
        var topicDataArray = new Array();
        var moreTopic_data;
        var Topic = {
            init: function () {
                var that = this;
                composition.addBindingHandler("topicInitHandler", {
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
                topicDataArray = new Array();
                var getMenuService = http.getInstance("data/topics/topics.json")
                getMenuService.ajax().then(function (data) {
                    that.data = data.topic;
                    modal.topicList(that.data);
                    //data.topic.length>0&&modal.clickSubTopic(data.topic[0].subtopic[1]);
                });
            },
            bindUI: function () {
                var that = this;
                $("#moretopic").hover(function (event) {
                    $(this).stop(true, true).show();
                }, function () {
                    $(this).stop(true, true).slideUp(200);
                });
            },
            closepanel: function () {
                topicDataArray = new Array();
                auGurit.global.utlPanal.close();
                var modal_all_data = JSON.parse(JSON.stringify(modal.topicList()));
                for (var i = 0; i < modal_all_data.length; i++) {
                    var modal_subtopic_data = modal_all_data[i].subtopic;
                    for (var j = 0; j < modal_subtopic_data.length; j++) {
                        if (modal_subtopic_data[j].hover == true) {
                            ((modal_all_data[i]).subtopic)[j].hover = false;
                        }
                    }
                }
                auGurit.global.topicModal.topicList(modal_all_data);
            },
            showdiv: function (item) {
                var that = this;
                var e = window.event;
                var ex = e.pageX - e.offsetX;
                var ey = e.pageY - e.offsetY;
                var topicid = item.id;
                var param = {};
                param.ey = ey;
                param.ex = ex;
                param.topicid = topicid;
                var leftmodaltopic = modal.topicList();
                for (var i = 0; i < leftmodaltopic.length; i++) {
                    if (leftmodaltopic[i].id == topicid) {
                        auGurit.global.leftHover = leftmodaltopic[i];
                    }
                }
                app.setRoot("view/app/watermap/topics/moretopic/moretopic", null, "moretopic", param);
                $('#moretopic').stop(true, true).slideDown(200);
            },
            hidediv: function () {
                $('#moretopic').stop(true, true).slideUp(200);
            },
            clickSubTopic: function (item) {
                var that = this;
                //var topic_data = that.data;
                var topic_data = modal.topicList();
                var t = (item.id).split("-");
                var firstTopicId = t[0] + "-" + t[1];
                //实现可多选择专题
                for (var i = 0; i < topic_data.length; i++) {
                    if (topic_data[i].id == firstTopicId) {
                        var subtopicData = topic_data[i].subtopic;
                        for (var j = 0; j < subtopicData.length; j++) {
                            if (subtopicData[j].id == item.id) {
                                if (item.hover) {
                                    (topic_data[i].subtopic)[j].hover = false;
                                    //清除数组中的topic对象
                                    that.removeExistElement(topicDataArray, item);
                                } else {
                                    (topic_data[i].subtopic)[j].hover = true;
                                    topicDataArray.push(item);
                                }
                            }
                        }
                    }
                }
                //切换一下地址指向
                var topic_data_hover = JSON.parse(JSON.stringify(topic_data));
                modal.topicList(topic_data_hover);
                if (auGurit.global.mapUtil) {
                    // auGurit.global.mapUtil.clearMap();
                }
                if (auGurit.global.utlBar) {
                    auGurit.global.utlBar = false;
                    $("#smainPanel").animate({
                        width: "hide",
                        paddingLeft: "hide",
                        paddingRight: "hide",
                        marginLeft: "hide",
                        marginRight: "hide"
                    }, 300);
                    setTimeout(function () {
                        $(".desktop-map").css("left", 40);
                        $("#sidebar a").removeClass("hover");
                    }, 300);
                }

                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2) + 8;
                var right = 5;
                if (item.title == "水库") {
                    //this.openWidgetPanal("view/app/common/list",item.title,{},350,height,top,right,true,true,false);
                    this.openWidgetPanal("view/app/watermap/reservoir/reservoir", item.title, {}, 350, height, top, null, right, true, true, false);
                } else if (item.title == "排水管网") {
                    // this.openWidgetPanal("view/app/watermap/topic/drainagenetwork/drainagenetwork",item.title,{},340,height,top,null,right,false,true,true);
                } else if (item.title == "雨量站") {
                    // this.openWidgetPanal("view/app/watermap/rainFallStation/rainFallStation",item.title,{},340,height,top,null,right,false,true,true);
                } else if (item.title == "泵站") {
                    this.openWidgetPanal("view/app/watermap/topic/pumpstation/pumpstation", item.title, {}, 340, height, top, null, right, false, true, true);
                } else if (item.title == "水质监测点") {
                    this.openWidgetPanal("view/app/watermap/topic/waterquality/waterquality", item.title, {}, 340, height, top, null, right, false, true, true);
                } else if (item.title == "易涝点") {
                    this.openWidgetPanal("view/app/watermap/topic/floodPoint/floodPoint", item.title, {}, 340, height, top, null, right, false, true, true);
                } else if (item.title == "黑臭水体") {
                    this.openWidgetPanal("view/app/watermap/topic/blacksmellywater/blacksmellywater", item.title, {}, 340, height, top, null, right, false, true, true);
                } else if (item.title == "河涌视频") {
                    this.openWidgetPanal("view/app/watermap/topic/creekvideo/creekvideo", item.title, {}, 340, height, top, null, right, false, true, true);
                } else if (item.title == "卫星云图") {
                    this.openWidgetPanal("view/app/watermap/topic/cloudchart/cloudchart", item.title, {}, document.documentElement.clientWidth - 42, height, top, 41, null, false, true, true);
                } else if (item.title == "气象雷达") {
                    this.openWidgetPanal("view/app/watermap/topic/weatherradar/weatherradar", item.title, {}, document.documentElement.clientWidth - 42, height, top, 41, null, false, true, true);
                } else if (item.title == "台风路径") {
                    this.openWidgetPanal("view/app/watermap/topic/typhoontrack/typhoontrack", item.title, {}, document.documentElement.clientWidth - 42, height, top, 41, null, false, true, true);
                } else if (item.title == "污水处理厂") {
                    this.openWidgetPanal("view/app/watermap/topic/wastewaterplant/wastewaterplant", item.title, {}, 340, height, top, null, right, false, true, true);
                } else if (item.title == "闸站") {
                    this.openWidgetPanal("view/app/watermap/topic/wasstation/wasstation", item.title, {}, 340, height, top, null, right, false, true, true);
                } else if (item.title == "三防应急") {
                    var doc = $("#desktop-main-map").contents().find("#agcom_2dmap").contents();
                    var node = doc.find("#dragPanel_widgetID_ag-layerTree  li[dirlayerid='16e1588f-ddb2-42a6-87ea-c9918510706a'").find(".layer");
                    $(node).click();
                } else if (item.title == "墒情测站") {
                    this.openWidgetPanal("view/app/watermap/topic/moisture/moistureStation", item.title, {}, 350, height, top, null, right, true, true, false);
                } else if (item.title == "咸情测站") {
                    this.openWidgetPanal("view/app/watermap/topic/saltyStation/saltyStation", item.title, {}, 350, height, top, null, right, true, true, false);
                } else if (item.title == "综合旱情测站") {
                    this.openWidgetPanal("view/app/watermap/topic/zhhq/zhhqStation", item.title, {}, 350, height, top, null, right, true, true, false);
                } else if (item.title == "水文遥测站") {
                    this.openWidgetPanal("view/app/watermap/topic/waterremotedetect/waterremotedetect", item.title, {}, 340, height, top, null, right, true, true, false);
                } else if (item.title == "智能水网站点") {
                    this.openWidgetPanal("view/app/watermap/topic/smartwaternet/smartwaternet", item.title, {}, 350, height, top, null, right, true, true, false);
                }

                var topicsTitle = '';
                // for (var i = topicDataArray.length - 1; i >= 0; i--) {
                // 	var topicData = topicDataArray[i];
                // 	topicsTitle = i == topicDataArray.length - 1 ? topicData.title : topicsTitle + '-' + topicData.title;
                // }

                if (auGurit.global.utlPanal)
                    auGurit.global.utlPanal.close();
                if (topicDataArray && topicDataArray.length > 0)
                    this.openWidgetPanal("view/app/watermap/topics/topicPanel", topicsTitle, {topicDataArray: topicDataArray}, 350, height, top, null, right, true, true, false);

            },
            openWidgetPanal: function (url, title, param, width, height, top, left, right, maxBtn, resizable, draggable, switchBtn, multiId) {
                var settings = {
                    width: width || 360,
                    height: height || $(".desktop-map").height(),
                    resizable: resizable,
                    draggable: draggable,
                    minBtn: false,
                    maxBtn: maxBtn,
                    closeBtn: true,
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
                    closeOther: true
                };
                var p = panal.getInstance(url, settings, param);
                auGurit.global.utlPanal = p;
                //this.resizeMap("left",width);
            },
            //清除数组中已存在的topic对象
            removeExistElement: function (array, obj) {
                for (i in array) {
                    if (array[i].id == obj.id)
                        array.splice(i, 1);
                }
            }
        }
        var modal = {
            topicList: ko.observableArray(),
            clickSubTopic: $.proxy(Topic.clickSubTopic, Topic),
            closepanel: $.proxy(Topic.closepanel, Topic),
            showdiv: $.proxy(Topic.showdiv, Topic),
            hidediv: $.proxy(Topic.hidediv, Topic)
        };
        auGurit.global.topicModal = modal;
        auGurit.global.topicsFeatures = [];

        Topic.init();
        return modal;
    });