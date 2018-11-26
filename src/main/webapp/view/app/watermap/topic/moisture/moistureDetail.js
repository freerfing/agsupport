define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "highcharts", "tabs", "echarts"],
    function ($, app, composition, ko, common, http, panal, highcharts, tabs, echarts) {
        var myChart = null;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("moistureInitHandler1", {
                    init: function (dom) {
                        var panalObj = panal.getPanalByElement(dom);
                        that.renderUI();
                        that.bindUI();
                        that.loadData(panalObj.param);
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                var that = this;
                that.loadTabs();
            },
            loadTabs: function () {
                var t = tabs.getInstance([{
                    id: "baseInfo",
                    title: "详情",
                    content: "<div id='detail' style='height: 100%;width: 100%'></div>",
                    selected: true
                }], {
                    replace: $("#moistureDetail"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '100%',
                    width: '100%'
                });
            },
            loadData: function (rowData) {
                var rain = rowData.water ? rowData.water : '';
                var xzq = rowData.addvccd ? rowData.addvccd : '';
                var div1 = '<div style="margin-top:15px; width:95%; text-align: left;">';
                var div2 = '</div>';
                var content = '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">站点名称：</div>' +
                    '<div class="basic-info-cell-content">' + rowData.stnm + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">行政区域：</div>' +
                    '<div class="basic-info-cell-content">' + xzq + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header"><div style="text-align:center">土壤含水率（%）</div></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div style="float: left; width: 30%; line-height: 28px;">' +
                    '<div style="float: left;">10cm：</div>' +
                    '<div style="float: left;">' + rowData.slm10 + '</div>' +
                    '</div>' +
                    '<div style="float: left; width: 30%; line-height: 28px;">' +
                    '<div style="float: left;">20cm：</div>' +
                    '<div style="float: left;">' + rowData.slm20 + '</div>' +
                    '</div>' +
                    '<div style="float: left; width: 30%; line-height: 28px;">' +
                    '<div style="float: left;">40cm：</div>' +
                    '<div style="float: left;">' + rowData.slm40 + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">今日雨量[mm]：</div>' +
                    '<div class="basic-info-cell-content">' + rain + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">所在地：</div>' +
                    '<div class="basic-info-cell-content">' + rowData.stlc + '</div>' +
                    '</div>' +
                    '</div>';
                $("#detail").append(div1 + content + div2);
            }
        };
        var modal = {};

        List.init();
        return modal;
    });