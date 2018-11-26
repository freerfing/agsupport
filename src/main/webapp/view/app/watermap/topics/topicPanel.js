define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "tabs", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, tabs) {
        var curPanal;
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;
        var curTabId = null;
        var Topicpanel = {
            init: function () {
                var that = this;
                composition.addBindingHandler("topicPanelInitHandler", {
                    init: function (dom) {
                        that.isMaxShow = false;
                        panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onClose = function () {
                            curTabId = null;
                            var eventTarget = window.event.currentTarget;
                            //是否点击关闭窗口按钮
                            if (eventTarget.className == 'app-panal-head-button-btn app-panal-head-button-btn-close') {
                                while (panalObj.param.topicDataArray.length > 0) {
                                    panalObj.param.topicDataArray.pop(panalObj.param.topicDataArray[0]);
                                }
                                var modal_all_data = JSON.parse(JSON.stringify(auGurit.global.topicModal.topicList()));
                                for (var i = 0; i < modal_all_data.length; i++) {
                                    var modal_subtopic_data = modal_all_data[i].subtopic;
                                    for (var j = 0; j < modal_subtopic_data.length; j++) {
                                        if (modal_subtopic_data[j].hover == true) {
                                            ((modal_all_data[i]).subtopic)[j].hover = false;
                                        }
                                    }
                                }
                                auGurit.global.topicModal.topicList(modal_all_data);
                            }
                            var features_list = auGurit.global.topicsFeatures;
                            if(eventTarget.innerText =='清除所选' || eventTarget.className == 'app-panal-head-button-btn app-panal-head-button-btn-close' || eventTarget.className == 'hover'){
                                if(features_list != null && features_list != undefined && features_list.length > 0){
                                    for(var i=0;i<features_list.length;i++){
                                        var pointObjs = features_list[i];
                                        if(pointObjs){
                                            for(var j in pointObjs){
                                                map.removeLayer(pointObjs[j]);
                                            }
                                        }
                                    }
                                    auGurit.global.topicsFeatures = [];
                                }
                            }
                        };
                        panalObj.settings.onMaxShow = function () {
                            that.isMaxShow = !that.isMaxShow;
                            if (that.isMaxShow) { //最大化
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
                            }
                            if (curTabId == "topic-1-2") {
                                if (that.isMaxShow) {
                                    $('#reservoir-flow-chart-b').show();
                                    $('#reservoir-flow-chart').hide();
                                } else {
                                    $('#reservoir-flow-chart-b').hide();
                                    $('#reservoir-flow-chart').show();
                                }
                            }
                        };
                        var topicDataArray = panalObj.param.topicDataArray;
                        that.renderUI(topicDataArray);
                        that.bindUI();
                        $(dom).click(function () {
                        });
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function (topicDataArray) {
                var that = this;
                that.loadTopicTabs(topicDataArray);
            },
            bindUI: function () {
                var that = this;
            },
            loadTopicTabs: function (topicDataArray) {
                var that = this;
                var tabArr = new Array();
                if (topicDataArray && topicDataArray.length > 0) {
                    for (var i = topicDataArray.length - 1; i >= 0; i--) {
                        var topicData = topicDataArray[i];
                        var tab = {};
                        tab.id = topicData.id;
                        tab.title = topicData.title;
                        tab.selected = i == topicDataArray.length - 1;
                        tabArr.push(tab);
                    }
                }
                var t = tabs.getInstance(tabArr, {
                    replace: $("#topic_tabs"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                        if (!curTabId || curTabId != tabId) {
                            var data;
                            for (var i = 0; i < topicDataArray.length; i++) {
                                var topicData = topicDataArray[i];
                                if (tabId == topicData.id) {
                                    data = topicData;
                                    break;
                                }
                            }
                            var param = {isMaxShow: that.isMaxShow};
                            app.setRoot(data.view, null, "topic_content", param);
                            curTabId = tabId;
                        }
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '25px',
                    width: '100%'
                });
            }
        };

        var modal = {};

        Topicpanel.init();
        return modal;
    });