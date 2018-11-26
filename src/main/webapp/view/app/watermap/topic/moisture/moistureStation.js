define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "highcharts", "tabs", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager, highcharts, tabs) {
        var panalObj;
        var featureList;//加载列表所生成的点列表
        var lastLoactePoint;//上一个定位点
        var map;//地图对象
        var pointObj;
        var features; //所有要素对象
        var xzqList={};
        var Moisture = {
            init: function () {
                var that = this;
                composition.addBindingHandler("moistureInitHandler", {
                    init: function (dom) {
                        that.isMaxShow = false;
                        panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onMaxShow = function () {
                            that.isMaxShow = !that.isMaxShow;
                            if (that.isMaxShow) {
                                $('#reservoir-flow-chart-b').show();
                                $('#reservoir-flow-chart').hide();
                            } else {
                                $('#reservoir-flow-chart-b').hide();
                                $('#reservoir-flow-chart').show();
                            }
                        };
                        panalObj.settings.onClose = function () {
                            if (auGurit.global.secondUtlPanal)
                                auGurit.global.secondUtlPanal.close();
                            // if (pointObj) {
                            //     for (var i in pointObj) {
                            //         map.removeLayer(pointObj[i]);
                            //     }
                            // }
                        }
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
                map = $("#desktop-main-map")[0].contentWindow.map;
                //行政区下拉框
                var h = http.getInstance("data/district.json");
                h.ajax().then(function (result) {
                    $.each(result, function (i, item) {
                        $("#district").append("<option value='" + item.id + "'>" + item.name + "</option>");
                        xzqList[item.id]=item.name;
                    })
                });
                that.initPage(modal);
                that.initTableColumns();
                that.initEvent();
                that.getListData();
            },
            initPage: function (modal) {
                this.originalCurPage = 1;
                this.originalPerPageCount = 10;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
            },
            initTableColumns: function () {
                var that = this;
                var columns = [
                    {
                        id: "zm",
                        text: "站点",
                        datafield: "stnm",
                        width: ($(window).width()) * 0.1 + "px",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
                        id: "tencm",
                        text: "10cm",
                        columngroup: "waters",
                        datafield: "slm10",
                        width: ($(window).width()) * 0.1 + "px",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "twencm",
                        text: "20cm",
                        columngroup: "waters",
                        datafield: "slm20",
                        width: ($(window).width()) * 0.1 + "px",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "fortencm",
                        text: "40cm",
                        columngroup: "waters",
                        datafield: "slm40",
                        width: ($(window).width()) * 0.1 + "px",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "water",
                        text: "今日雨量[mm]",
                        datafield: "water",
                        width: ($(window).width()) * 0.1 + "px",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "address",
                        text: "所在地",
                        datafield: "stlc",
                        width: ($(window).width()) * 0.3 + "px",
                        align: "center",
                        cellsalign: "center"
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
                $("#moistureList-b").jqxGrid({
                    width: $(window).width() * 0.96,
                    height: "100%",
                    source: dataAdapter,
                    // theme: 'energyblue',
                    rowsheight: 35,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columnsDisplay,
                    columngroups: [
                        {text: "土壤含水率（%）", align: "center", name: "waters"}
                    ]
                });

                columns = [
                    {
                        id: "zm",
                        text: "站点",
                        datafield: "stnm",
                        width: '40%',
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "xzq",
                        text: "行政区",
                        datafield: "addvcd",
                        width: '40%',
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.xzqFormatter
                    }, {
                        id: "locateIcon",
                        text: "",
                        datafield: "locateIcon",
                        width: '20%',
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
                $("#moistureList").jqxGrid({
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
                $('#moistureList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    var id = dataObj.rowId;//暂时用rowId
                    var currentFeature = pointObj["feature_" + id];
                    currentFeature.style = {
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [16, 16]
                    };
                    map._mapInterface.layerLocate(currentFeature, Moisture.openPanal);
                });
            },
            loadReservoirList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;

                this.gridDataSource.localdata = tableData;
                $("#moistureList").jqxGrid({
                    source: this.gridDataSource
                });

                this.gridDataSourceBig.localdata = tableData;
                $("#moistureList-b").jqxGrid({
                    source: this.gridDataSourceBig
                });
            },
            getListData: function () {
                var that = this;
                var requestParams = that._param;
                requestParams.stnm = $('#moistureName').val();
                requestParams.xzq = $('#district').val();
                //同步两个页面的查询参数
                that.stnm = $('#moistureName').val();
                that.xzq = $('#district').val();
                $('#moistureName-b').val(that.zm);
                $('#district-b').val(that.xzq);

                var h = http.getInstance("subject/getMoistureList", {type: "post"});
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    that._data = data;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };

                    //先清除上一次查询地图上面的所有点
                    if(auGurit.global.mapLayers["墒情测站"]) {
                        var prePointObject = auGurit.global.mapLayers["墒情测站"];
                        if (prePointObject) {
                            for (var i in prePointObject) {
                                map.removeLayer(prePointObject[i]);
                            }
                        }     
                    }

                    that.setListData();
                    //先清除上一次查询地图上面的所有点
                    // if (pointObj) {
                    //     for (var i in pointObj) {
                    //         map.removeLayer(pointObj[i]);
                    //     }
                    // }
                    that.addFeatures(result.list);

                    auGurit.global.mapLayers["墒情测站"] = pointObj;
                });
            },
            addFeatures: function (data) {
                var that = this;
                var features = {};
                for (var i = 0; i < data.length; i++) {
                    var feature = {};
                    feature.geometry = "POINT (" + data[i].lgtd + " " + data[i].lttd + ")";
                    feature.properties = data[i];
                    var style = {
                        iconUrl: auGurit.global.rootPath + "/style/asip/common/css/images/icon/shangqing.png",
                        iconSize: [20, 20]
                    };
                    feature.styleSelected = {
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [20, 20]
                    };
                    feature.tipContent = data[i].stnm;
                    feature.style = style;
                    //暂时用rowId
                    features["feature_" + data[i].rowId] = feature;
                }
                ;
                //定位
                pointObj = map._mapInterface.addFeature(features, Moisture.openPanal);
            },
            //根据降水位不同在确定地图上面定位的点的样式
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
                                $('#moistureName').val(that.zm);
                                $('#district').val(that.xzq);
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
                $('#moistureName').val('');
                $('#district-b').val('');
                $('#moistureName-b').val('');
            },
            initEvent: function () {
                $('#district').change(function () {
                    $('#district-b').val($(this).val());
                });
                $('#moistureName').change(function () {
                    $('#moistureName-b').val($(this).val());
                });

                $('#district-b').change(function () {
                    $('#district').val($(this).val());
                });
                $('#moistureName-b').change(function () {
                    $('#moistureName').val($(this).val());
                });
            },
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="reservoir_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            openPanal: function (data) {
                //还原其他图标图标
                for (var i in pointObj) {
                    if (pointObj[i] != data) {
                        var otherLocateFeature = pointObj[i];
                        otherLocateFeature.style = {
                            "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/shangqing.png",
                            "iconSize": [20, 20]
                        };
                        map._mapInterface.setFeatureStyle(otherLocateFeature);
                    }
                }
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                var top = data.containerPoint.y;
                var left = data.containerPoint.x;
                var title = data.features.properties.stnm;
                common.openDialogPanal("view/app/watermap/topic/moisture/moistureDetail", title, data.features.properties, 600, 450, 75, 41);
            },
            xzqFormatter:function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div>'+xzqList[value]+'</div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            }
        };

        var modal = {
            clickSearchBtn: $.proxy(Moisture.clickSearchBtn, Moisture),
            clickResetBtn: $.proxy(Moisture.clickResetBtn, Moisture)
        };

        //画出所有要素以后所返回的对应的地图对象
        function getFeatureList(features) {
            featureList = features;
        }

        //点定位callback
        function getLocatedPoint(point) {
            lastLoactePoint = point;
        }

        Moisture.init();
        return modal;
    });