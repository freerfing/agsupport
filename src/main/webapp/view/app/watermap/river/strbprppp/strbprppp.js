/**
 * Created by CZZ on 2017-10-23.
 * 雨量站面板
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
        var title;
        var rivers = {
            init: function () {
                var that = this;
                composition.addBindingHandler("strbprpppInitHandler", {
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
                that.addDynamicMapLayer();
            },
            initLayout: function () {
                var that = this;
                modal.IsMax(panalObj.getSizeState() == "max");
                var jqHeight = $(".app-panal-content").height() - 27 * (panalObj.getSizeState() == "max" ? 4 : 5) - 50;
                var columns = panalObj.getSizeState() == "max" ? that._columns : that._normalColumns;//that._columns.slice(0, 2)
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({
                        name: columns[i].datafield,
                        type: 'string'
                    });
                }
                datadatafields.push({
                    id:"stlc",
                    name:"stlc",
                    type: 'string'
                });
                gridDataSource = {
                    localdata: that._data || [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
                $("#strbprpppList").jqxGrid({
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
                this._columns = [];
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
                this._data = [];
            },
            initTableColumns: function () {
                var that = this;
                w.queryMetadata("ST_STBPRP_B", function (columnsInfo, prikey, _metadata) {
                    var normalColumns = [];
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"stcd",
                        id:"stcd",
                        order:1,
                        text:"测站编码",
                        width:"90"
                    });
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"stnm",
                        id:"stnm",
                        order:1,
                        text:"测站名称",
                        width:"90"
                    });
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"stlc",
                        id:"stlc",
                        order:1,
                        text:"站址",
                        width:"200"
                    });
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"stsys",
                        id:"stsys",
                        order:1,
                        text:"测站所属系统名称",
                        width:"120"
                    });
                    that._normalColumns = normalColumns;
                    that._columns = columnsInfo;
                    that.initLayout();
                    metadata = _metadata;   //  保存源数据
                    $('#strbprpppList').on('rowclick', function (event) {
                        var dataObj = event.args.row.bounddata;
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "ST_STBPRP_B",
                            params: {
                                "prikey": prikey,
                                "row": dataObj
                            },
                            metadata: metadata,
                            title: title,
                            isPoint: "true"
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
                    requestParams.sttp = "PP";
                    requestParams.stcd = modal.search().stcd();
                    requestParams.stnm = modal.search().stnm();
                    requestParams.addvcd = modal.search().xzq();
                }
                else {
                    requestParams.sttp = "PP";
                    requestParams.stcdnm = modal.search().stcdnm();
                    requestParams.addvcd = modal.search().xzq();
                }
                requestParams.curPage = currentPage || 1;
                requestParams.perPageCount = 30;
                var url = auGurit.global.rootPath + "/subject/listststbprpb";
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
                            parent: $("#strbprpppPager"),
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
            clickSearchBtn: function () {
                var that = this;
                that.getListData();
            },
            clickResetBtn: function () {
                modal.search().stcdnm("");
                modal.search().stcd("");
                modal.search().stnm("");
                modal.search().xzq("");

                this.getListData();
            },
            addDynamicMapLayer: function () {
                map._mapInterface.addDynamicMapLayer(auGurit.global.mapTopLayers[title]["serviceUrl"], auGurit.global.mapTopLayers[title]["layerTable"], function (layer) {
                    auGurit.global.mapLayers[title] = layer;
                });
            }
        }

        var modal = {
            IsMax: ko.observable(false),
            search: ko.observable({
                stcdnm: ko.observable(""),
                stcd: ko.observable(""),
                stnm: ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([{text: "全部", value: ""}, {text: "白云区", value: "440111"}, {
                    text: "从化区",
                    value: "440184"
                }, {text: "番禺区", value: "440113"}, {text: "海珠区", value: "440105"}, {
                    text: "花都区",
                    value: "440114"
                }, {text: "黄埔区", value: "440112"}, {text: "荔湾区", value: "440103"}, {
                    text: "花都区",
                    value: "440114"
                }, {text: "南沙区", value: "440115"}, {text: "天河区", value: "440106"}, {
                    text: "越秀区",
                    value: "440104"
                }, {text: "增城区", value: "440183"}])
            }),
            clickSearchBtn: $.proxy(rivers.clickSearchBtn, rivers),
            clickResetBtn: $.proxy(rivers.clickResetBtn, rivers)
        };
        rivers.init();
        return modal;
    });