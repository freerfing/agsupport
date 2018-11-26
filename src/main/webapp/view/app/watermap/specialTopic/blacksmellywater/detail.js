define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "echarts3_6_2", "tabs"],
    function ($, app, composition, ko, common, http, panal, echarts, tabs) {
        var Detail = {
            init: function () {
                var that = this;
                composition.addBindingHandler("homeInitHandler", {
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
                    id: "omInfo",
                    title: "详情",
                    content: "<div id='detail' style='height: 100%;width: 100%'></div>",
                    selected: true
                }], {
                    replace: $("#blacksmellywaterDetail"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '100%',
                    width: '100%'
                });
            },
            loadData: function(data) {
                var div1 = '<div style="margin-top:15px; width:95%; text-align: left;">';
                var div2 = '</div>';
                var content='';
                if(data.hasOwnProperty('村')) {
                    content = getVillage(data);
                }else if(data.hasOwnProperty('项目名称')) {
                    content = getProject(data);
                }else
                    content = getRiver(data);

                $("#detail").append(div1+content+div2);
            }
        };
        function getVillage(data) {
            var content = '<div class="basic-info-row">'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">村名：</div>'+
                '<div class="basic-info-cell-content">'+data.村+'</div>'+
                '</div>'+
                '</div>'+
                '<div class="basic-info-row">'+
                '<div class="basic-info-cell" style="width: 100%">'+
                '<div class="basic-info-cell-header">地址：</div>'+
                '<div class="basic-info-cell-content">'+data.地址+'</div>'+
                '</div>'+
                '</div>'+
                '<div class="basic-info-row">'+
                '<div class="basic-info-cell" style="width: 100%">'+
                '<div class="basic-info-cell-header">其他：</div>'+
                '<div class="basic-info-cell-content">'+data.其他+'</div>'+
                '</div>'+
                '</div>';
            return content;
        }

        function getProject(data) {
            var content = '<div class="basic-info-row">'+
                '<div class="basic-info-cell" style="width: 100%">'+
                '<div class="basic-info-cell-header">项目名称：</div>'+
                '<div class="basic-info-cell-content">'+data.项目名称+'</div>'+
                '</div>'+
                '</div>'+
                '<div class="basic-info-row">'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">更新类型：</div>'+
                '<div class="basic-info-cell-content">'+data.更新类型+'</div>'+
                '</div>'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">更新方式：</div>'+
                '<div class="basic-info-cell-content">'+data.更新方式+'</div>'+
                '</div>'+
                '</div>'+
                '<div class="basic-info-row">'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">行政区域：</div>'+
                '<div class="basic-info-cell-content">'+data.行政区域+'</div>'+
                '</div>'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">改造主体：</div>'+
                '<div class="basic-info-cell-content">'+data.改造主体+'</div>'+
                '</div>'+
                '</div>'+
                '<div class="basic-info-row">'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">更新面积：</div>'+
                '<div class="basic-info-cell-content">'+data.更新面积+'</div>'+
                '</div>'+
                '</div>';
            return content;
        }

        function getRiver(data) {
            var content = '<div class="basic-info-row">'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">河涌名称：</div>'+
                '<div class="basic-info-cell-content">'+data.HCMC+'</div>'+
                '</div>'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header"></div>'+
                '<div class="basic-info-cell-content"></div>'+
                '</div>'+
                '</div>'+
                '<div class="basic-info-row">'+
                '<div class="basic-info-cell" style="width: 100%">'+
                '<div class="basic-info-cell-header">河涌功能：</div>'+
                '<div class="basic-info-cell-content">'+data.HCGN+'</div>'+
                '</div>'+
                '</div>'+
                '<div class="basic-info-row">'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">所在行政区：</div>'+
                '<div class="basic-info-cell-content">'+data.XZQ+'</div>'+
                '</div>'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">河涌长度：</div>'+
                '<div class="basic-info-cell-content">'+data.HCCD+'</div>'+
                '</div>'+
                '</div>'+
                '<div class="basic-info-row">'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">流域面积：</div>'+
                '<div class="basic-info-cell-content">'+data.LYMJ+'</div>'+
                '</div>'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">水面面积：</div>'+
                '<div class="basic-info-cell-content">'+data.SMMJ+'</div>'+
                '</div>'+
                '</div>'+
                '<div class="basic-info-row">'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">设计防洪标准：</div>'+
                '<div class="basic-info-cell-content">'+data.SJFHBZ+'</div>'+
                '</div>'+
                '<div class="basic-info-cell">'+
                '<div class="basic-info-cell-header">所在流域：</div>'+
                '<div class="basic-info-cell-content">'+data.SZLY+'</div>'+
                '</div>'+
                '</div>';
            return content;
        }
        var modal = {};

        Detail.init();
        return modal;
    });