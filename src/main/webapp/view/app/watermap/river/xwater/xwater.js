/**
 * Created by CZZ on 2017-10-23.
 * 积水监测点面板
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
        var title;
        var xWater = {
            init: function () {
                var that = this;
                composition.addBindingHandler("xWaterInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        //that.getListData();
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
                var columns = that._columns;
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
                $("#xWaterList").jqxGrid({
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
                that._columns = [
                    {
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"nickname",
                        id:"nickname",
                        order:1,
                        text:"测站名称",
                        width:"200"
                    },
                    {
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"district",
                        id:"district",
                        order:5,
                        text:"区县",
                        width:"120"
                    },
                    {
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"streets",
                        id:"streets",
                        order:6,
                        text:"街道",
                        width:"240"
                    },
                    {
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"position",
                        id:"position",
                        order:7,
                        text:"位置描述",
                        width:"300"
                    },
					{
						align:"center",
						cellsalign:"center",
						cellsrenderer:null,
						datafield:"mttp",
						id:"mttp",
						order:2,
						text:"监测类型",
						width:"100"
					},
					{
						align:"center",
						cellsalign:"center",
						cellsrenderer:null,
						datafield:"mtpm",
						id:"mtpm",
						order:3,
						text:"监测参数",
						width:"660"
					},
					{
						align:"center",
						cellsalign:"center",
						cellsrenderer:null,
						datafield:"sspro",
						id:"sspro",
						order:4,
						text:"所属项目",
						width:"760"
					}
                ];
                w.queryMetadata("DEV_WATER",function (columnsInfo, prikey, _metadata) {   // "DEV_WATER", 表要先在后台注册才能使用
                    that.initLayout();
		            metadata = _metadata;   //  保存源数据
                   $('#xWaterList').on('rowclick', function (event) {
                       // console.log(event);
                       var dataObj = event.args.row.bounddata;
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "DEV_WATER",
                            params: {
                                "prikey": prikey,
                                "row": dataObj,
                            },
                            metadata: metadata,
							isCheck: auGurit.global.mapTopLayers[title]["isCheck"],
                            title: title,
                            isPoint: "true"
                        };
                        mapUtils.queryLayer(layer);
                    });
                    that.getListData();
                });
            },

            getListData: function (currentPage) {
                var that = this;
                // var requestParams = that._param;
                var requestParams = {};
                requestParams.nickname =modal.search().nickname();
                requestParams.xzq =modal.search().xzq();
                // requestParams.curPage = 1;
                // requestParams.perPageCount =30;
                 requestParams.curPage = currentPage || 1;
                 requestParams.perPageCount = 30;
                 var url = auGurit.global.rootPath + "subject/listDevWater";
                 $.ajax({
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    url: url,
                    data: requestParams,
                    success: function (result) {   //, textStatus, jqXHR
                        console.log(result);
                       if (result && result.success && (result.success === true || result.success === "true")) {
                           console.log(result);
                           var data = result.content;
                            that._data = data.list;
                            that._pageInfo = {
                                totalPage: data.pages,
                                currentPage: data.pageNum,
                                currentRecord: Math.min(data.pageSize, (data.total - data.pageSize * (data.pageNum - 1))),
                                totalRecord: data.total
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
                            parent: $("#xWaterListPager"),
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
                nickname: ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([
                    { text: "全部", value: "" },
                    { text: "白云区", value: "白云区" },
                    { text: "从化区", value: "从化区" },
                    { text: "番禺区", value: "番禺区" },
                    { text: "海珠区", value: "海珠区" },
                    { text: "花都区", value: "花都区" },
                    { text: "黄埔区", value: "黄埔区" },
                    { text: "荔湾区", value: "荔湾区" },
                    { text: "南沙区", value: "南沙区" },
                    { text: "天河区", value: "天河区" },
                    { text: "越秀区", value: "越秀区" },
                    { text: "增城区", value: "增城区" }
                ])
            }),
            clickSearchBtn: $.proxy(xWater.clickSearchBtn, xWater),
            clickResetBtn: $.proxy(xWater.clickResetBtn, xWater)
        };
        xWater.init();
        return modal;
    });