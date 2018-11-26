define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "mapUtils"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, mapUtils) {
        var isMapLocClick = false;//定位图标点击状态
        var isListItemClick = false;//列表项点击状态
        var prevGraphic;//被点击的定位图标对应的graphic
        var graphicsLayerPoint;//地图定位点图层
        var infoWindowHideHandler;
        var infoListMap = {}; //房屋编码和人员信息键值对
        var myChart = null;
        var parent = null;
        var flag;
        var preTitle = "";
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
                var menuId = modal._$_param.menu.id;
                parent = modal._$_param.parent;
                var rootPath = auGurit.global.rootPath;
                var ip = rootPath.substring(0, rootPath.lastIndexOf("/", rootPath.length - 2));

                var url = "data/topic/topic.json";
                var getMenuService = http.getInstance(url)
                getMenuService.ajax().then(function (data) {

                    var url2 = ip + agsupportName + "/agsupport/menu/getMenuByPidAndLoginName/" + menuId + "/" + loginName;
                    $.ajax({
                        type: 'POST',
                        contentType: "application/x-www-form-urlencoded",
                        dataType: "json",
                        url: url2,
                        data: {},
                        success: function (result, textStatus, jqXHR) {
                            if (result && result.success && (result.success === true || result.success === "true") && result.content) {
                                var result = result.content;
                                var topic = data.topic;
                                var i = 0;
                                var j = 0;
                                var menuList = [];
                                if (result) {
                                    for (i = 0; i < result.length; i++) {
                                        for (j = 0; j < topic.length; j++) {
                                            if (topic[j].id == result[i].url) {
                                                topic[j].text = result[i].name;
                                                menuList.push(topic[j]);
                                                break;
                                            }
                                        }
                                        if (j == topic.length) {
                                            menuList.push({
                                                id: result[i].id,
                                                text: result[i].name,
                                                title: result[i].name
                                            });
                                        }
                                    }
                                }

                                // 排除“水质信息”与“水质信息（公开）”共存菜单项
                                var wqPublicIndex, isContainedWqMenu = false, isContainedWqPublicMenu = false;
                                for(var k=0; k<menuList.length; k++) {
                                    if(menuList[k].id === 'topic-14') {
                                        isContainedWqMenu = true;
                                        continue;
                                    }
                                    if(menuList[k].id === 'topic-20') {
                                        wqPublicIndex = k;
                                        isContainedWqPublicMenu = true;
                                        if(isContainedWqMenu) {
                                            break;
                                        }
                                    }
                                }
                                if(isContainedWqPublicMenu && isContainedWqMenu) {
                                    menuList.splice(wqPublicIndex, 1);
                                }

                                modal.topicList(menuList);
                            }
                        }
                    });

                });
            },
            bindUI: function () {
                var that = this;
                modal._$_param.parent.setCurrentPage(modal._$_param.menu.id, that);
            },
            closepanel: function () {
                parent.closepanel();
            },
            clickSubTopic: function (item) {
                var that = this;

                item.maptool = modal._$_param.parent;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                if (!item.enabled)
                    return;

                if (!auGurit.global.mapLayers) {
                    auGurit.global.mapLayers = {};
                }
                if ($(".nr_sd>a[name='" + item.id + "']").hasClass("hover")) {
                    if (item.viewOpenType == 1) {
                        return;
                    } else {
                        var pl = window.pl;
                        if (pl) {
                            pl.tabClose(item.title);
                            mapUtils.removeGlobalMapLayers(item.title);
                        }
                    }

                } else {

                    if (!auGurit.global.selectSubject) {
                        auGurit.global.selectSubject = [];
                    }

                    //增加服务图层
                    if (item.serviceUrl && item.serviceUrl != '') {
                        var layerTable = [parseInt(item.layerTable)];
                        auGurit.global.mapTopLayers[item.title] = {
                            serviceUrl: item.serviceUrl,
                            layerTable: layerTable,
                            dirLayerId: item.dirLayerId,
                            annoFieldCN: item.annoFieldCN,
                            sttp: typeof (item.sttp) != "undefined" ? item.sttp : null,
                            isCheck: typeof (item.isCheck) != "undefined" ? item.isCheck : null
                        }

                    }

                    //选中
                    that.hoversubtopic = item.id;
                    auGurit.global.hoversubtopic = item.id;
                    //选中
                    $(".nr_sd>a[name='" + item.id + "']").addClass("hover");
                    var radio = 0.98;
                    var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                    var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2) + 8;
                    var right = 5;
                    var gotoUrl = "";
                    gotoUrl = item.viewUrl;

                    if (item.viewOpenType == 1) {
                        this.openPanal(gotoUrl, item.title, item, document.documentElement.clientWidth - 42, height, top, 41, null, false, false, false, item.id);
                    }
                    else {
                        auGurit.global.selectSubject.push({
                            title: item.title
                        });
                        if ($("#chooseRiverTab").length == 0) {
                            var pl = parent.openWidgetTabPanal("", "面板", {}, 340, height, top, null, right, false, true, true, false, false);
                            pl.addTab(item.title, gotoUrl, item);
                            window.pl = pl;
                        } else {
                            var pl = window.pl;
                            pl.addTab(item.title, gotoUrl, item);
                        }

                    }

                }

            },
            openPanal: function (url, title, param, width, height, top, left, right, maxBtn, resizable, draggable, switchBtn, multiId) {
                common.openDialogPanal(url, title, param, width, height, top, left);
            },
            dispose: function () {

                try {
                    //console.log("清空监测监控");
                    this.closepanel();
                }
                catch (e) {
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
            }


        }


        var modal = {
            topicList: ko.observableArray(),
            clickSubTopic: $.proxy(Topic.clickSubTopic, Topic),
            closepanel: $.proxy(Topic.closepanel, Topic),
            showDataExplain:$.proxy(Topic.showDataExplain, Topic),
            hideDataExplain:$.proxy(Topic.hideDataExplain, Topic),
			//topicDisplay: ko.observable('&#8743;'),
			toggleSubTopic: function(topic, event) {
                $('#mainnav-topic-' + topic.id).toggle('slow');
				var menu = $('#topic_display_' + topic.id);
				if(menu.hasClass('topic_display_hover')) {
					menu.removeClass('topic_display_hover');
				} else {
					menu.addClass('topic_display_hover');
				}
                return false;
            }
        };
        auGurit.global.topicModal = modal;
        Topic.init();
        return modal;
    });