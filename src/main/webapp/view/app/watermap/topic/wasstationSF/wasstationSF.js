define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager, echarts) {
        var features;
        var panalObj;
        var map;
        var lastLocatedPoint;
        var PumpstationSF = {
            init: function () {
                var that = this;
                composition.addBindingHandler("wasstationSFInitHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                        panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onClose = function () {
                            if (auGurit.global.secondUtlPanal)
                                auGurit.global.secondUtlPanal.close();
                            // if (features) {
                            //     for (var i in features) {
                            //         map.removeLayer(features[i]);
                            //     }
                            // }
                        }
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                var that = this;
                //行政区下拉框
                var h = http.getInstance("data/district.json");
                h.ajax().then(function (result) {
                    $.each(result, function (i, item) {
                        $("#district").append("<option value='" + item.id + "'>" + item.name + "</option>");
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
                        id: "stnm",
                        text: "站名",
                        datafield: "stnm",
                        width: 140,
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "usfl",
                        text: "状态",
                        datafield: "usfl",
                        width: 140,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.statusFormatter
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
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield, type: 'string'});
                }
                that.gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#pumpStationList").jqxGrid({
                    width: 340,
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columns
                });
                //为表格增加一个cell单击事件,只对定位图标的cell有效
                $('#pumpStationList').on('cellclick', function (event) {
                    if (event.args.datafield == 'locateIcon') {
                        var dataObj = event.args.row.bounddata;
                        openPanel(dataObj.stcd, dataObj.stnm);
                        //点击的行主键
                        var id = dataObj.rowId;
                        var currentFeature = features["feature_" + id];
                        currentFeature.style = currentFeature.features.styleSelected;
                        map._mapInterface.layerLocate(currentFeature, that.resetFeatureStyle);
                    }
                });
            },
            initEvent: function () {
                // //checkbox状态改变事件
                // $("input[name='pumpStation_state']").change(function () {
                //     var chk_value = new Array();
                //     $('input[name="pumpStation_state"]:checked').each(function () {
                //         chk_value.push($(this).val());
                //     });
                //     var chk_value_str = chk_value.toString();
                //     $('input[name="pumpStation_state"]').each(function () {
                //         $(this).removeAttr('checked');
                //         var s = $(this).val();
                //         if (chk_value_str.indexOf(s) > -1)
                //             $(this).prop('checked', 'true');
                //     });
                // });
            },
            getListData: function () {
                var that = this;
                //清除之前的feature
                // if (features) {
                //     for (var i in features) {
                //         map.removeLayer(features[i]);
                //     }
                // }

                var h = http.getInstance("/subject/queryPsStbprpWasPage", {
                    type: "post"
                });
                var requestParams = that._param;
                requestParams.stnm = $('#pumpStationName').val();
                requestParams.xzq = $('#district').val();
                requestParams.stsys = "'智能水网','水文遥测'";
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                var chk_value = new Array();
                $('input[name="pumpStation_state"]:checked').each(function () {
                    chk_value.push($(this).val());
                });
                requestParams.tj = chk_value.toString();
                that.tj = requestParams.tj;
                that.stnm = requestParams.stnm;
                that.xzq = requestParams.xzq;

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
                    if(auGurit.global.mapLayers["水闸"]) {
                        var prePointObject = auGurit.global.mapLayers["水闸"];
                        if (prePointObject) {
                            for (var i in prePointObject) {
                                map.removeLayer(prePointObject[i]);
                            }
                        }     
                    }

                    that.setListData();
                    if (result.list)
                        that.addFeatures(result.list);

                    auGurit.global.mapLayers["水闸"] = features;

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
                                $('#reservoirName').val(that.stnm);
                                $('#district').val(that.xzq);

                                $('input[name="pumpStation_state"]').each(function () {
                                    $(this).removeAttr('checked');
                                    var s = $(this).val();
                                    if (that.tj.indexOf(s) > -1)
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
                that.loadPumpStationList();
            },
            addFeatures: function (data) {
                var that = this;
                map = $("#desktop-main-map")[0].contentWindow.map;
                var featureList = {};
                for (var i = 0; i < data.length; i++) {
                    var feature = {};
                    feature.geometry = "POINT (" + data[i].lgtd + " " + data[i].lttd + ")";
                    feature.properties = data[i];
                    feature.style = {
                        iconUrl: auGurit.global.rootPath + 'style/asip/common/css/images/icon/shuizha.png',
                        iconSize: [16, 16]
                    };
                    feature.styleSelected = {
                        "iconUrl": auGurit.global.rootPath + "style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [20, 20]
                    };
                    feature.tipContent = data[i].stnm;
                    featureList["feature_" + data[i].rowId] = feature;
                }

                features = map._mapInterface.addFeature(featureList, function (selectedFeature) {
                    var param = selectedFeature.features.properties;
                    that.resetFeatureStyle(selectedFeature);
                    openPanel(param.stcd, param.stnm)
                });
            },
            loadPumpStationList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;

                this.gridDataSource.localdata = tableData;
                $("#pumpStationList").jqxGrid({
                    source: this.gridDataSource
                });
            },
            statusFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var status = '';
                var $cellHtml = $(defaulthtml)
                switch (value) {
                    case '1':
                        status = '运行';
                        break;
                    case '2':
                        status = '废弃';
                        break;
                    case '3':
                        status = '在建';
                        break;
                    case '4':
                        status = '规划';
                        break;
                    default:
                        break;
                }
                $cellHtml.empty();
                $cellHtml.text(status);
                return $cellHtml[0].outerHTML;
            },
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="reservoir_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
                $('#district').val('');
                $('#pumpStationName').val('');
                $('input[name="pumpStation_state"]').prop('checked', true);
            },
            resetFeatureStyle: function (selectedFeature) {
                if (lastLocatedPoint && lastLocatedPoint != selectedFeature) {
                    lastLocatedPoint.style = {
                        "iconUrl": auGurit.global.rootPath + "style/asip/common/css/images/icon/shuizha.png",
                        "iconSize": [20, 20]
                    };
                    map._mapInterface.setFeatureStyle(lastLocatedPoint);
                }
                lastLocatedPoint = selectedFeature;
            }
        }

        var modal = {
            clickSearchBtn: $.proxy(PumpstationSF.clickSearchBtn, PumpstationSF),
            clickResetBtn: $.proxy(PumpstationSF.clickResetBtn, PumpstationSF)
        };

        function openPanel(stcd, stnm) {
            var top = 75;
            var left = 41;
            var title = stnm;
            common.openDialogPanal("view/app/watermap/topic/wasstationSF/wasSFDetail", title, {
                stcd: stcd, stnm: stnm
            }, 500, 480, top, left);
        }

        PumpstationSF.init();
        return modal;
    });