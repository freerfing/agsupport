<!-- 中型灌区监测点面板 -->
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
        var title;
        var IrrigateInfo = {
            init: function () {
                var that = this;
                composition.addBindingHandler("irrigateInfoInitHandler", {
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
                that.addDynamicMapLayer();
                that.initTableData();
            },
            initLayout: function () {
                var that = this;
                modal.IsMax(panalObj.getSizeState() == "max");
                var jqHeight = $(".app-panal-content").height() - 154;
                var jqWidth = panalObj.getSizeState() == "max" ? $(".app-panal-content").width() - 36 : '100%';
                var columns = that._columns;
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({
                        name: columns[i].datafield,
                        type: 'string'
                    });
                }
                that.gridDataSource = {
                    localdata: that._data || [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#irrigateInfos").jqxGrid({
                    width: jqWidth,
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
                this._columns = [];
                this._data = [];
            },

            initTableData: function () {
                var that = this;
                that._columns = [{
                    align:"center",
                    cellsalign:"center",
                    datafield:"stcd",
                    id:"stcd",
                    order:1,
                    text:"测站ID",
                    width:130,
                    hidden: true
                }, {
                    align:"center",
                    cellsalign:"center",
                    datafield:"stname",
                    id:"stname",
                    order:2,
                    text:"测站名称",
                    width:240
                }, {
                    align:"center",
                    cellsalign:"center",
                    datafield:"buildTime",
                    id:"buildTime",
                    order:7,
                    text:"修建时间",
                    width:180,
                    type: 'string'
                }, {
                    align:"center",
                    cellsalign:"center",
                    datafield:"modTime",
                    id:"modTime",
                    order:8,
                    text:"修改时间",
                    width:180,
                    type: 'string'
                }, {
                    align:"center",
                    cellsalign:"center",
                    datafield:"waterC",
                    id:"waterC",
                    order:9,
                    text:"水位计数量",
                    width:80,
                    type: 'string'
                }, {
                    align:"center",
                    cellsalign:"center",
                    datafield:"flowC",
                    id:"flowC",
                    order:10,
                    text:"流量计数量",
                    width:80,
                    type: 'string'
                }, {
                    align:"center",
                    cellsalign:"center",
                    datafield:"lvC",
                    id:"lvC",
                    order:11,
                    text:"流速计数量",
                    width:80,
                    type: 'string'
                }, {
                    align:"center",
                    cellsalign:"center",
                    datafield:"gateC",
                    id:"gateC",
                    order:12,
                    text:"闸位计数量",
                    width:80,
                    type: 'string'
                }];

                w.queryMetadata("TB_B_RTU", function (columnsInfo, prikey, _metadata) {
                    that.initLayout();
                    $('#irrigateInfos').on('rowclick', function (event) {
                        var dataObj = event.args.row.bounddata;
                        dataObj.coox = dataObj.x;
                        dataObj.cooy = dataObj.y;
                        dataObj.build_time = dataObj.buildTime;
                        dataObj.mod_time = dataObj.modTime;
                        dataObj.water_c = dataObj.waterC;
                        dataObj.flow_c = dataObj.flowC;
                        dataObj.lv_c = dataObj.lvC;
                        dataObj.gate_c = dataObj.gateC;
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "TB_B_RTU",
                            params: {
                                "prikeyName": "stcd",
                                "prikey": prikey,
                                "row": dataObj,
                            },
                            metadata: _metadata,
                            title: title,
                            isPoint: "true",
                            isCheck: auGurit.global.mapTopLayers[title]["isCheck"],
                            isSort: true
                        };

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
                requestParams.stcdnm = modal.search().stcdnm();
                requestParams.curPage = currentPage || 1;
                requestParams.perPageCount = 80;
                var url = auGurit.global.rootPath + "/subject/listIrrigateInfo";
                $.ajax({
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    url: url,
                    data: requestParams,
                    success: function (result, textStatus, jqXHR) {
                        if (result && result.success && (result.success === true || result.success === "true")) {
                            var data = result.content, i;
                            if(data.list) {
								for(i=0; i<data.list.length; i++) {
								    data.list[i].projectID = data.list[i].stcd;
								}
                            }
                            that._data = data.list;
                            that._pageInfo = {
                                totalPage: data.pages,
                                currentPage: data.pageNum,
                                currentRecord: Math.min(data.pageSize, (data.total - data.pageSize * (data.pageNum - 1))),
                                totalRecord: data.total
                            };
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
                    $("#irrigateInfoPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#irrigateInfoPager"),
                            changeHandler: function () {
                                that.getListData(that._pager._pageInfo.currentPage);
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                }

                that.gridDataSource.localdata = that._data;
                $("#irrigateInfos").jqxGrid({
                    source: that.gridDataSource
                });
            },
            clickSearchBtn: function () {
                var that = this;
                that.getListData();
            },
            clickResetBtn: function () {
                modal.search().stcdnm("");
                this.getListData();
            },
            addDynamicMapLayer: function () {
                title = modal._$_param.title;
                map._mapInterface.addDynamicMapLayer(auGurit.global.mapTopLayers[title]["serviceUrl"], auGurit.global.mapTopLayers[title]["layerTable"], function (layer) {
                    auGurit.global.mapLayers[title] = layer;
                }, { opacity: 0.7 });
            }
        };

        var modal = {
            IsMax: ko.observable(false),
            search: ko.observable({
                stcdnm: ko.observable(""),
            }),
            clickSearchBtn: $.proxy(IrrigateInfo.clickSearchBtn, IrrigateInfo),
            clickResetBtn: $.proxy(IrrigateInfo.clickResetBtn, IrrigateInfo),
        };


        IrrigateInfo.init();
        return modal;
    });