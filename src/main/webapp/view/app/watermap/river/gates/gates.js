/**
 * Created by CZZ on 2017-10-23.
 * 水闸面板
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
	var title;	
        var gates = {
            init: function () {
                var that = this;
                composition.addBindingHandler("gatesInitHandler", {
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
                var jqHeight = $(".app-panal-content").height() - 27 * (panalObj.getSizeState() == "max" ? 4 : 5) - 50;
                $("#gatesList").jqxGrid({
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
                $("#gatesList").jqxGrid({
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
                w.queryMetadata("WRP_SLU_BSIN", function (columnsInfo, prikey, _metadata) {
                    
                    //console.log(columnsInfo);

                    var normalColumns = [];
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"slcd",
                        id:"slcd",
                        order:1,
                        text:"水闸代码",
                        width:"120"
                    });
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"slnm",
                        id:"slnm",
                        order:1,
                        text:"水闸名称",
                        width:"130"
                    });                    
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"prsc",
                        id:"prsc",
                        order:1,
                        text:"工程规模",
                        width:"65"
                    });

                    that._normalColumns = normalColumns;
                    that._columns = columnsInfo;
                    that.initLayout();
                    metadata = _metadata;   //  保存源数据
                    $('#gatesList').on('rowclick', function (event) {
                        var dataObj = event.args.row.bounddata;
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "WRP_SLU_BSIN",
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
                    requestParams.slcd = modal.search().slcd();
                    requestParams.slnm = modal.search().slnm();
                    requestParams.xzq = modal.search().xzq();
                } else {
                    requestParams.slcdnm = modal.search().slcdnm();
                    requestParams.xzq = modal.search().xzq();
                }
                requestParams.curPage = currentPage || 1;
                requestParams.perPageCount = 30;
                var url = auGurit.global.rootPath + "/subject/listgates";
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
                            parent: $("#gatesPager"),
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

                modal.search().slcdnm("");
                modal.search().slcd("");
                modal.search().slnm("");
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
                slcdnm: ko.observable(""),
                slcd: ko.observable(""),
                slnm: ko.observable(""),
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
            clickSearchBtn: $.proxy(gates.clickSearchBtn, gates),
            clickResetBtn: $.proxy(gates.clickResetBtn, gates)
        };
        gates.init();
        return modal;
    });