/**
 * Created by CZZ on 2017-10-23.
 * 泵站面板
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
	    var title;
        var pumps = {
            init: function () {
                var that = this;
                composition.addBindingHandler("pumpsInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        that.renderUI();
                        that.bindUI();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
                var that = this;
                var runId = modal._$_param.panelId;
                title = modal._$_param.title;
                panalObj.addEvent(runId, "onMinShow", function (e) {
                    that.initLayout();
                });
                panalObj.addEvent(runId, "onMaxShow", function (e) {
                    that.initLayout();
                });
            },
            bindUI: function () {
                var that = this;
                that.initPage(modal);
                that.initTableColumns();
                that.addTiledMapLayer();
            },
            initLayout: function () {
                var that = this;
                modal.IsMax(panalObj.getSizeState() == "max");
                var jqHeight = $(".app-panal-content").height() - 27 * (panalObj.getSizeState() == "max" ?  4 : 5) - 50;
                $("#pumpsList").jqxGrid({
                    height: jqHeight
                });
                var columns = panalObj.getSizeState() == "max" ? that._columns : that._normalColumns;
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({
                        name: columns[i].datafield,
                        type: 'string'
                    });
                }
                gridDataSource = {
                    localdata: that._data || [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
                $("#pumpsList").jqxGrid({
                    width: '100%',
                    height: jqHeight,
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    columns: columns
                });
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
                this._data = [];
                this._columns = [];
                this._normalColumns = [];
            },

            initTableColumns: function () {
                var that = this;
                w.queryMetadata("WRP_IDS_BSIN", function (columnsInfo, prikey, _metadata) {

                    //console.log(columnsInfo);

                    var normalColumns = [];
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"idstcd",
                        id:"idstcd",
                        order:1,
                        text:"机电排灌站代码",
                        width:"120"
                    });
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"idstnm",
                        id:"idstnm",
                        order:1,
                        text:"机电排灌站名称",
                        width:"130"
                    });                    
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"bzjb",
                        id:"bzjb",
                        order:1,
                        text:"泵站级别",
                        width:"65"
                    });

                    that._normalColumns = normalColumns;

                    that._columns = columnsInfo;
                    that.initLayout();
	                   metadata = _metadata;   //  保存源数据
                    $('#pumpsList').on('rowclick', function (event) {
                        var dataObj = event.args.row.bounddata;
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "WRP_IDS_BSIN",
                            params: {
                                "prikey": prikey,
                                "row": dataObj,
                            },
                            metadata: metadata,
                            title: title,
                            isPoint: "true"
                        }
                        var $panel = $("[panal-id='view/app/watermap/river/identifyLayers/identifyLayersPanel']");
                        if ($panel) {
                            $panel.hide();
                        }
                        mapUtils.queryLayer(layer);
                    });
                    that.getListData();
                });
            },

            getListData: function (currentPage) {
                var that = this;
                var requestParams = {};
                if (panalObj.getSizeState() == "max") {
                    requestParams.idstcd = modal.search().idstcd();
                    requestParams.idstnm = modal.search().idstnm();
                    requestParams.xzq = modal.search().xzq();
                } else {
                    requestParams.idstcdnm = modal.search().idstcdnm();
                    requestParams.xzq = modal.search().xzq();
                }
                requestParams.curPage = currentPage || 1;
                requestParams.perPageCount = 30;
                var url = auGurit.global.rootPath + "/subject/listpumps";
                $.ajax({
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    url: url,
                    data: requestParams,
                    success: function (result, textStatus, jqXHR) {
                        if (result && result.success && (result.success === true || result.success === "true")) {
                            var data = result.content;
                            that._data = data.content;
                            that._pageInfo = {
                                totalPage: data.totalPages,
                                currentPage: data.pageNum,
                                currentRecord: Math.min(data.pageSize, (data.totalElements - data.pageSize * (data.pageNum - 1))),
                                totalRecord: data.totalElements
                            };
                            that.initLayout();
                            that.setListData();
                        } else {
                            console.error("查询出错" + url + " \n" + data);
                        }
                    }
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
                            parent: $("#pumpsPager"),
                            changeHandler: function () {
                                that.getListData(that._pager._pageInfo.currentPage);
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    that._pageInfo = {
                        totalPage: 1,
                        currentPage: 1,
                        currentRecord: 0,
                        totalRecord: 0
                    };
                    that._pager.setPageInfo(that._pageInfo);
                }
            },
            legendFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="reservoir_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            clickSearchBtn: function () {
                var that = this;
                that.getListData();
            },
            clickResetBtn: function () {

                modal.search().idstcdnm("");
                modal.search().idstcd("");
                modal.search().idstnm("");
                modal.search().xzq("");

                this.getListData();
            },
            addTiledMapLayer: function () {
                map._mapInterface.addTiledMapLayer(auGurit.global.mapTopLayers[title]["serviceUrl"], function (layer) {
                    auGurit.global.mapLayers[title] = layer;
                });
            }
        }

        var modal = {
            IsMax: ko.observable(false),
            search: ko.observable({
                idstcdnm: ko.observable(""),
                idstcd: ko.observable(""),
                idstnm: ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([{text: "全部", value: ""}, {text: "白云区", value: "白云区"}, {
                    text: "从化区",
                    value: "从化区"
                }, {text: "番禺区", value: "番禺区"}, {text: "海珠区", value: "海珠区"}, {text: "花都区", value: "花都区"}, {
                    text: "黄埔区",
                    value: "黄埔区"
                }, {text: "荔湾区", value: "荔湾区"}, {text: "花都区", value: "花都区"}, {text: "南沙区", value: "南沙区"}, {
                    text: "天河区",
                    value: "天河区"
                }, {text: "越秀区", value: "越秀区"}, {text: "增城区", value: "增城区"}])
            }),
            clickSearchBtn: $.proxy(pumps.clickSearchBtn, pumps),
            clickResetBtn: $.proxy(pumps.clickResetBtn, pumps)
        };

        pumps.init();
        return modal;
    });