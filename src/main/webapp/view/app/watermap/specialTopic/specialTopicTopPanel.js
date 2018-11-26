/**
 * Created by czz on 2017-08-11.
 * 查询面板
 *
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "box"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, box) {

        var parentPage;

        var info = {

            init: function () {
                var that = this;
                composition.addBindingHandler("topSpecialTopicPanelInitHandler", {
                    init: function (dom) {

                        that.renderUI();
                        that.bindUI();

                    },
                    update: function () {


                    }
                });
            },
            renderUI: function () {

                if (!auGurit.global.mapTopLayers) {
                    auGurit.global.mapTopLayers = {};
                }

                var that = this;
                var url = "data/specialTopic/specialTopic.json";
                var getMenuService = http.getInstance(url)
                getMenuService.ajax().then(function (data) {
                    modal.topicList(data.topic);
                    var rootArr = data.topic;
                    var i = 0;
                    var j = 0;
                    for (i = 0; i < rootArr.length; i++) {
                        var tmpArr = rootArr[i];
                        for (j = 0; j < tmpArr.subtopic.length; j++) {
                            auGurit.global.mapTopLayers[tmpArr.subtopic[j]["title"]] = {
                                serviceUrl: tmpArr.subtopic[j]["serviceUrl"],
                                layerTable: tmpArr.subtopic[j]["layerTable"],
                                dirLayerId: tmpArr.subtopic[j]["dirLayerId"],
                                annoFieldCN: tmpArr.subtopic[j]["annoFieldCN"],
                                sttp: typeof (tmpArr.subtopic[j]["sttp"]) != "undefined" ? tmpArr.subtopic[j]["sttp"] : null
                            }
                        }
                    }

                });


                //var height = Math.ceil($("#desktop-map").height() * 0.98) - $("#chooseRiverTab").height() - 120;
                var height = $(".app-panal").height() - $("#chooseRiverTab").height() - 25;
                modal.height(height);
                //console.log("xxxxxxxxxxx");
                //console.log(height);
                //console.log($(".app-panal").length);
                //$(".rPanel").height(height);

            },
            bindUI: function () {
                var that = this;
            },
            showPanel: function (panelId) {

                //var height = Math.ceil($("#desktop-map").height() * 0.98) - $("#chooseRiverTab").height() - 120;
                var height = $(".app-panal").height() - $("#chooseRiverTab").height() - 25;
                modal.height(height);
                //$(".rPanel").height(height);
                $(".rPanel").hide();
                $("#" + panelId).toggle();

            }

        }

        var modal =
        {

            topicList: ko.observableArray(),
            height: ko.observable(),
            showPanel: $.proxy(info.showPanel, info)
        };

        info.init();
        return modal;
    });