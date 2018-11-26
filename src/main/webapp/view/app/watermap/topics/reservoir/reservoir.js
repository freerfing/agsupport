/**
 * Created by hzp on 2017-07-20.
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "highcharts", "tabs", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager, highcharts, tabs) {
        var panalObj;
        var featureList;//加载列表所生成的点列表
        var lastLoactePoint;//上一个定位点
        var agcomMap;
        var map;//地图对象
        var pointObj;
        var features; //所有要素对象
        var Reservoir = {
            init: function () {
                var that = this;
                composition.addBindingHandler("reservoirInitHandler", {
                    init: function (dom) {
                        var param = modal._$_param;
                        // that.isMaxShow = false;
                        // panalObj = panal.getPanalByElement(dom);
                        // panalObj.settings.onMaxShow = function () {
                        //     that.isMaxShow = !that.isMaxShow;
                        if (param.isMaxShow) {
                            $('#reservoir-flow-chart-b').show();
                            $('#reservoir-flow-chart').hide();
                        } else {
                            $('#reservoir-flow-chart-b').hide();
                            $('#reservoir-flow-chart').show();
                        }
                        // };
                        // panalObj.settings.onClose = function(){
                        //     if(pointObj){
                        //         for(var i in pointObj){
                        //             map.removeLayer(pointObj[i]);
                        //         }
                        //     }
                        // }
                        that.renderUI();
                        that.bindUI();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                var that = this;
                that.initPage(modal);
                that.initTableColumns();
                that.initEvent();
                that.getListData();
            },
            initPage: function (modal) {
                // this._url = param.url;
                // this._displayType = param.displayType;
                // this._groupName = param.groupName;
                // this._param = param.queryParam;
                this.originalCurPage = 1;
                this.originalPerPageCount = 10;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                // this._httpType = param.httpType;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
            },
            initTableColumns: function () {
                var that = this;
                var columns = [
                    {
                        id: "sx",
                        text: "市县",
                        datafield: "sx",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    },
                    {
                        id: "zm",
                        text: "站名",
                        datafield: "zm",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    },
                    {
                        id: "zl",
                        text: "站类(报汛项目)",
                        datafield: "zl",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                            var data = this.owner.host.jqxGrid('getrowdata', row);
                            var $cellHtml = $(defaulthtml);
                            if (parseFloat(data.sw) >= parseFloat(data.jjsw))
                                $cellHtml.css('color', 'red');
                            var newVal;
                            switch (value) {
                                case '1':
                                    newVal = "小一型";
                                    break;
                                case '2':
                                    newVal = "小二型";
                                    break;
                                case '3':
                                    newVal = "中型";
                                    break;
                                default:
                                    newVal = "大型";
                                    break;
                            }
                            $cellHtml.text(newVal);
                            return $cellHtml[0].outerHTML;
                        }
                    }, {
                        id: "zryl",
                        text: "昨日雨量",
                        columngroup: "rainfall",
                        datafield: "zryl",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "bszxz",
                        text: "8时-现在",
                        columngroup: "rainfall",
                        datafield: "bszxz",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "qyxx",
                        text: "前一小时",
                        columngroup: "rainfall",
                        datafield: "qyxx",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "jyxx",
                        text: "近一小时",
                        columngroup: "rainfall",
                        // datafield: "jyxx",
                        datafield: "drp",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "bssw",
                        text: "8时水位",
                        columngroup: "waterInfo",
                        datafield: "bssw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "sbsj",
                        text: "上报时间",
                        columngroup: "waterInfo",
                        datafield: "sbsj",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "sw",
                        text: "水位(m)",
                        columngroup: "waterInfo",
                        datafield: "sw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.waterLevelFormatter
                    }, {
                        id: "kr",
                        text: "库容(百万方)",
                        columngroup: "waterInfo",
                        datafield: "kr",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "jjsw",
                        text: "警戒水位",
                        columngroup: "waterFeature",
                        datafield: "jjsw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "bzsw",
                        text: "保证水位",
                        columngroup: "waterFeature",
                        datafield: "bzsw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "xxsw",
                        text: "汛限水位",
                        columngroup: "waterFeature",
                        datafield: "xxsw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "zcsw",
                        text: "正常水位",
                        columngroup: "waterFeature",
                        datafield: "zcsw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }
                ];

                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield, type: 'string'});
                }
                that.gridDataSourceBig = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var columnsDisplay = columns;

                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSourceBig);
                $("#reserviorList-b").jqxGrid({
                    width: $(window).width() * 0.96,
                    height: "99%",
                    source: dataAdapter,
                    // theme: 'energyblue',
                    rowsheight: 35,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columnsDisplay,
                    columngroups: [
                        {text: "降雨量", align: "center", name: "rainfall"},
                        {text: "水位信息", align: "center", name: "waterInfo"},
                        {text: "特征水位(m)", align: "center", name: "waterFeature"}
                    ]
                });

                columns = [
                    {
                        id: "zm",
                        text: "站名",
                        datafield: "zm",
                        width: 100,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "sw",
                        text: "水位(m)",
                        datafield: "sw",
                        width: 100,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.waterLevelFormatter
                    }, {
                        id: "jjsw",
                        text: "警戒水位",
                        datafield: "jjsw",
                        width: 70,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "locateIcon",
                        text: "",
                        datafield: "locateIcon",
                        width: 50,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.locateIconFormatter
                    }
                ];

                datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield, type: 'string'});
                }
                that.gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };

                dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#reserviorList").jqxGrid({
                    width: 340,
                    height: "100%",
                    source: dataAdapter,
                    // theme: 'energyblue',
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columns
                });
                //为小页面的表格增加一个行单击事件
                $('#reserviorList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    var id = dataObj.rowId;//暂时用rowId
                    var currentFeature = pointObj["feature_"+id];
                    currentFeature.style = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/info_locat.gif","iconSize":[16,16]};
                    map._mapInterface.layerLocate(currentFeature, that.callbackRestoreStyle);
                    openPanal(dataObj.sbsj, dataObj.zm);
                });
            },
            loadReservoirList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;

                this.gridDataSource.localdata = tableData;
                $("#reserviorList").jqxGrid({
                    source: this.gridDataSource
                });

                this.gridDataSourceBig.localdata = tableData;
                $("#reserviorList-b").jqxGrid({
                    source: this.gridDataSourceBig
                });
            },
            getListData: function () {
                var that = this;
                var h = http.getInstance("/subject/listReservoirPage", {
                    type: "post"
                });
                var requestParams = that._param;
                requestParams.zm = $('#reservoirName').val();
                requestParams.xzq = $('#district').val();
                requestParams.skgn = $('#reservoirFun').val();

                var chk_value = new Array();
                $('input[name="reservoir_Fruit"]:checked').each(function () {
                    chk_value.push($(this).val());
                });

                requestParams.zl = chk_value.toString();

                that.zm = $('#reservoirName').val();
                that.xzq = $('#district').val();
                that.skgn = $('#reservoirFun').val();
                that.zl = chk_value.toString();

                $('#reservoirName-b').val(that.zm);
                $('#district-b').val(that.xzq);
                $('#reservoirFun-b').val(that.skgn);

                $('input[name="reservoir_Fruit_b"]').each(function () {
                    $(this).removeAttr('checked');
                    var s = $(this).val();
                    if (that.zl.indexOf(s) > -1)
                        $(this).prop('checked', 'true');
                });

                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    that._data = data;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };
                    that.setListData();
                    //先清除上一次查询地图上面的所有点
                    // if(pointObj){
                    //     for(var i in pointObj){
                    //         map.removeLayer(pointObj[i]);
                    //     }
                    // }

                    //先清除上一次查询地图上面的所有点
                    if(auGurit.global.mapLayers["水库"]) {
                        var prePointObject = auGurit.global.mapLayers["水库"];
                        if (prePointObject) {
                            for (var i in prePointObject) {
                                map.removeLayer(prePointObject[i]);
                            }
                        }     
                    }

                    that.addFeatures(result.list);

                    auGurit.global.mapLayers["水库"] = pointObj;

                });
            },
            addFeatures:function(data){
                var that = this;
                map = $("#desktop-main-map")[0].contentWindow.map;
                var features = {};
                for(var i=0;i<data.length;i++){
                    var feature = {};
                    feature.geometry = "POINT ("+data[i].x+" "+data[i].y+")";
                    feature.properties = data[i];
                    feature.style = that.locationStyle(data[i]);
                    feature.styleSelected = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/info_locat.gif","iconSize":[16,16]};
                    feature.tipContent = data[i].zm;
                    //暂时用rowId
                    features["feature_"+data[i].rowId] = feature;
                };
                //定位
                pointObj = map._mapInterface.addFeature(features,function(params){
                    that.callbackRestoreStyle(params);
                    var param = params.features.properties;
                    openPanal(param.sbsj, param.zm);
                });
                auGurit.global.topicsFeatures.push(pointObj);
            },
            //回调还原非选中点的样式
            callbackRestoreStyle: function (data) {
                for(var i in pointObj) {
                    if(pointObj[i] != data) {
                        var otherLocateFeature = pointObj[i];
                        otherLocateFeature.style = Reservoir.locationStyle(pointObj[i].features.properties);
                        map._mapInterface.setFeatureStyle(otherLocateFeature);
                    }
                }
            },
            //根据降水位不同在确定地图上面定位的点的样式
            locationStyle: function (rowData) {
                var style;
                if (rowData.sw >= rowData.jjsw) {//超警戒
                    style = {
                        iconUrl: auGurit.global.rootPath + '/view/app/common/reservior/cjjx.png',
                        iconSize: [16, 16]
                    };
                } else if (rowData.ksss == 4) {//落
                    style = {
                        iconUrl: auGurit.global.rootPath + '/view/app/common/reservior/shuiweijiang.png',
                        iconSize: [16, 16]
                    };
                } else if (rowData.ksss == 5) {//涨
                    style = {
                        iconUrl: auGurit.global.rootPath + '/view/app/common/reservior/shuiweizhang.png',
                        iconSize: [16, 16]
                    };
                } else {//平
                    style = {
                        iconUrl: auGurit.global.rootPath + '/view/app/common/reservior/shuiweiping.png',
                        iconSize: [16, 16]
                    };
                }
                return style;
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (that._data && that._pageInfo.totalPage >= 1) {
                    $(".list-datagroup-pager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $(".list-datagroup-pager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                $('#reservoirName').val(that.zm);
                                $('#district').val(that.xzq);
                                $('#reservoirFun').val(that.skgn);

                                $('input[name="reservoir_Fruit"]').each(function () {
                                    $(this).removeAttr('checked');
                                    var s = $(this).val();
                                    if (that.zl.indexOf(s) > -1)
                                        $(this).prop('checked', 'true');
                                });

                                that.getListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    $(".list-datagroup-pager").css("display", "none");
                    $(".list-datagroup-content").css("bottom", 0);
                }
                that.loadReservoirList();
            },
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
                $('#district').val('');
                $('#reservoirName').val('');
                $('#reservoirFun').val('');
                $('input[name="reservoir_Fruit"]').prop('checked', true);
                $('#district-b').val('');
                $('#reservoirName-b').val('');
                $('#reservoirFun-b').val('');
                $('input[name="reservoir_Fruit_b"]').prop('checked', true);
            },
            initEvent: function () {
                $('#district').change(function () {
                    $('#district-b').val($(this).val());
                });
                $('#reservoirName').change(function () {
                    $('#reservoirName-b').val($(this).val());
                });
                $('#reservoirFun').change(function () {
                    $('#reservoirFun-b').val($(this).val());
                });
                $("input[name='reservoir_Fruit']").change(function () {
                    var chk_value = new Array();
                    $('input[name="reservoir_Fruit"]:checked').each(function () {
                        chk_value.push($(this).val());
                    });
                    var chk_value_str = chk_value.toString();
                    $('input[name="reservoir_Fruit_b"]').each(function () {
                        $(this).removeAttr('checked');
                        var s = $(this).val();
                        if (chk_value_str.indexOf(s) > -1)
                            $(this).prop('checked', 'true');
                    });
                });

                $('#district-b').change(function () {
                    $('#district').val($(this).val());
                });
                $('#reservoirName-b').change(function () {
                    $('#reservoirName').val($(this).val());
                });
                $('#reservoirFun-b').change(function () {
                    $('#reservoirFun').val($(this).val());
                });
                $("input[name='reservoir_Fruit_b']").change(function () {
                    var chk_value = new Array();
                    $('input[name="reservoir_Fruit_b"]:checked').each(function () {
                        chk_value.push($(this).val());
                    });
                    var chk_value_str = chk_value.toString();
                    $('input[name="reservoir_Fruit"]').each(function () {
                        $(this).removeAttr('checked');
                        var s = $(this).val();
                        if (chk_value_str.indexOf(s) > -1)
                            $(this).prop('checked', 'true');
                    });
                });
            },
            colorTurnToRedFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                if (parseFloat(data.sw) >= parseFloat(data.jjsw))
                    $cellHtml.css('color', 'red');
                return $cellHtml[0].outerHTML;
            },
            waterLevelFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                var $icon;
                var $font = $('<div class="reservoir_font">' + $cellHtml.text() + '</div>');
                if (parseFloat(data.sw) >= parseFloat(data.jjsw)) {
                    $cellHtml.css('color', 'red');
                    switch (data.ksss) {
                        case '4':
                            $icon = $('<div class="reservoir_icon_down_red"></div>');
                            break;
                        case '5':
                            $icon = $('<div class="reservoir_icon_up_red"></div>');
                            break;
                        default:
                            $icon = $('<div class="reservoir_icon_same_red"></div>');
                            break;
                    }
                } else {
                    switch (data.ksss) {
                        case '4':
                            $icon = $('<div class="reservoir_icon_down_blue"></div>');
                            break;
                        case '5':
                            $icon = $('<div class="reservoir_icon_up_blue"></div>');
                            break;
                        default:
                            $icon = $('<div class="reservoir_icon_same_blue"></div>');
                            break;
                    }
                }
                $cellHtml.empty();
                $cellHtml.append($font);
                $cellHtml.append($icon);
                return $cellHtml[0].outerHTML;
            },
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="reservoir_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            }
        }

        var modal = {
            clickSearchBtn: $.proxy(Reservoir.clickSearchBtn, Reservoir),
            clickResetBtn: $.proxy(Reservoir.clickResetBtn, Reservoir)
        };

        //画出所有要素以后所返回的对应的地图对象
        function getFeatureList(features) {
            featureList = features;
        }

        //点定位callback
        function getLocatedPoint(point) {
            lastLoactePoint = point;
        }

        function openPanal(sbsj, zm) {
            var radio = 0.98;
            var height = Math.ceil($("#desktop-map").height() * radio) - 8;
            var top = 75;
            var left = 41;
            var title = zm;
            common.openDialogPanal("view/app/watermap/reservoir/reservoirWin", title, {
                sbsj: sbsj, zm: zm
            }, 500, 480,top,left);
        }
        Reservoir.init();
        return modal;
    });