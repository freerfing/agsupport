define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "jqxgrid.selection", "WdatePicker"],
    function ($, app, composition, ko, common, http, panal, pager) {
        var lastLocatedPoint;//上一个定位点
        var map;//地图对象
        var features;
        var panalObj;
        var drainageCanal = {
            init: function () {
                var that = this;
                composition.addBindingHandler("drainageCanalInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onMaxShow = function () {
                        };
                        panalObj.settings.onClose = function () {
                            if (auGurit.global.secondUtlPanal)
                                auGurit.global.secondUtlPanal.close();
                            if (features) {
                                for (var i in features) {
                                    map.removeLayer((features)[i]);
                                }
                            }
                        }
                        that.bindUI();
                        that.renderUI();
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
                    })
                });
                that.initPage(modal);
                that.initTableColumns();
                that.getListData();
            },
            initPage: function (modal) {
                this.originalCurPage = 1;
                this.originalPerPageCount = 20;
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
                        id: "drainageCanalNameStr",
                        text: "排水渠名称",
                        datafield: "stnm",
                        width: "40%",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
                        id: "waterDepth",
                        text: "水深(m)",
                        datafield: "z",
                        width: "40%",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.waterDepthFormatter
                    },
                    {
                        id: "locateIcon",
                        text: "",
                        datafield: "locateIcon",
                        width: "20%",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.locateIconFormatter
                    }
                ];
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({
                        name: columns[i].datafield,
                        type: 'string'
                    });
                }
                that.gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#drainageCanalList").jqxGrid({
                    width: '100%',
                    height: "100%",
                    source: dataAdapter,
                    //theme: 'energyblue',
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columns
                });
                $('#drainageCanalList').on('cellclick', function (event) {
                    if (event.args.datafield == 'locateIcon') {
                        var dataObj = event.args.row.bounddata;
                        that.openPanel(dataObj);
                        //点击的行主键
                        var id = dataObj.rowId;
                        var currentFeature = features["feature_" + id];
                        currentFeature.style = currentFeature.features.styleSelected;
                        map._mapInterface.layerLocate(currentFeature, that.resetFeatureStyle);
                    }
                });
            },
            loadrainageCanalList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;
                this.gridDataSource.localdata = tableData;
                $("#drainageCanalList").jqxGrid({
                    source: this.gridDataSource
                });
            },
            waterDepthFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var text;
                if (value == '')
                    text = 0;
                else
                    text = $cellHtml.text()
                var $font = $('<div class="reservoir_font">' + text + '</div>');

                $cellHtml.empty();
                $cellHtml.append($font);
                return $cellHtml[0].outerHTML;
            },
            getListData: function () {
                var that = this;
                //清除之前的feature
                if (features) {
                    for (var i in features) {
                        map.removeLayer(features[i]);
                    }
                }
                var h = http.getInstance("subject/getdrainageCanalList", {type: "post"});
                var requestParams = that._param;
                requestParams.stnm = $('#drainageCanalName').val();
                requestParams.xzq = $('#district').val();
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
                    if (result.list)
                        that.addFeatures(result.list);
                });
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
                                that.getListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    $(".list-datagroup-pager").css("display", "none");
                    $(".list-datagroup-content").css("bottom", 0);
                }
                that.loadrainageCanalList();
            },
            addFeatures: function (data) {
                var that = this;

                var featureList = {};
                for (var i = 0; i < data.length; i++) {
                    var feature = {};
                    feature.geometry = "POINT (" + data[i].lgtd + " " + data[i].lttd + ")";
                    feature.properties = data[i];
                    feature.style = {
                        iconUrl: auGurit.global.rootPath + "/style/asip/common/css/images/icon/point_15px_jsd.png",
                        iconSize: [20, 20]
                    };
                    feature.styleSelected = {
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [20, 20]
                    };
                    feature.tipContent = data[i].stnm;
                    featureList["feature_" + data[i].rowId] = feature;
                }
                features = map._mapInterface.addFeature(featureList, function (selectedFeature) {
                    that.resetFeatureStyle(selectedFeature);
                    that.openPanel(selectedFeature.features.properties);
                });
            },
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
                $('#district').val('');
                $('#drainageCanalName').val('');
            },
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="reservoir_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            resetFeatureStyle: function (selectedFeature) {
                if (lastLocatedPoint && lastLocatedPoint != selectedFeature) {
                    lastLocatedPoint.style = lastLocatedPoint.features.style;
                    map._mapInterface.setFeatureStyle(lastLocatedPoint);
                }
                lastLocatedPoint = selectedFeature;
            },
            openPanel: function (data) {
                var top = 75;
                var left = 41;
                var title = data.stnm;
                common.openDialogPanal("view/app/watermap/topic/drainageCanal/drainageCanalWin", title, data, 520, 470, top, left);
            }
        }

        var modal = {
            clickSearchBtn: $.proxy(drainageCanal.clickSearchBtn, drainageCanal),
            clickResetBtn: $.proxy(drainageCanal.clickResetBtn, drainageCanal)
        };

        drainageCanal.init();
        return modal;
    });

