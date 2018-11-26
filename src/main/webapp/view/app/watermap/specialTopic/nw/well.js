define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
        var title;
        var Well = {
            init: function () {
                var that = this;
                composition.addBindingHandler("wellInitHandler", {
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
                var jqHeight = $(".app-panal-content").height() - 150;
                var jqWidth = panalObj.getSizeState() == "max" ? $(".app-panal-content").width() - 300 : '100%';
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
                $("#wellList").jqxGrid({
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
                that._columns = [
                    {
                        "id": "yj_attr_tw",
                        "text": "雨污类别",
                        "datafield": "yj_attr_tw",
                        "width": "80",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 1
                    },
                    {
                        "id": "yj_comb",
                        "text": "所属设施点",
                        "datafield": "yj_comb",
                        "width": "300",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 2
                    },
                    {
                        "id": "yj_attr_th",
                        "text": "井盖材质",
                        "datafield": "yj_attr_th",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 3
                    },
                    {
                        "id": "yj_attr_on",
                        "text": "特征",
                        "datafield": "yj_attr_on",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 4
                    },
                    {
                        "id": "yj_attr_fo",
                        "text": "维管单位",
                        "datafield": "yj_attr_fo",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 5
                    },
                    {
                        "id": "yj_attr_fi",
                        "text": "已挂牌编号",
                        "datafield": "yj_attr_fi",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 6
                    },
                    {
                        "id": "desription",
                        "text": "上报说明",
                        "datafield": "desription",
                        "width": "200",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 7
                    },
                    {
                        "id": "parent_o_1",
                        "text": "上报单位名称集合",
                        "datafield": "parent_o_1",
                        "width": "300",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 8
                    },
                    {
                        "id": "mark_per_1",
                        "text": "上报人名",
                        "datafield": "mark_per_1",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 9
                    },
                    {
                        "id": "mark_perso",
                        "text": "上报人电话",
                        "datafield": "mark_perso",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 10
                    },
                    {
                        "id": "addr",
                        "text": "设施位置",
                        "datafield": "addr",
                        "width": "480",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 11
                    },
                    {
                        "id": "road",
                        "text": "所在道路",
                        "datafield": "road",
                        "width": "220",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 13
                    },
                    {
                        "id": "current_to",
                        "text": "所在镇（街）",
                        "datafield": "current_to",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 14
                    },
                    {
                        "id": "current_ar",
                        "text": "所在区",
                        "datafield": "current_ar",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 12
                    }
                ];

                w.queryMetadata("NW_WELL", function (columnsInfo, prikey, _metadata) {
                    that.initLayout();
                    $('#wellList').on('rowclick', function (event) {
                        var dataObj = event.args.row.bounddata;
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "NW_WELL",
                            params: {
                                "prikeyName": "objectid",
                                "prikey": prikey,
                                "row": dataObj
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
                requestParams.xzq = modal.search().xzq();
                requestParams.curPage = currentPage || 1;
                requestParams.perPageCount = 80;
                var url = auGurit.global.rootPath + "/subject/listWell";
                $.ajax({
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    url: url,
                    data: requestParams,
                    success: function (result, textStatus, jqXHR) {
                        if (result && result.success && (result.success === true || result.success === "true")) {
                            var data = result.content;
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
                    $("#wellPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#wellPager"),
                            changeHandler: function () {
                                that.getListData(that._pager._pageInfo.currentPage);
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                }

                that.gridDataSource.localdata = that._data;
                $("#wellList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            clickSearchBtn: function () {
                var that = this;
                that.getListData();
            },
            clickResetBtn: function () {
                modal.search().rvcdnm("");
                modal.search().xzq("");
                this.getListData();
            },
            clickXZQBtn: function () {
                var that = this;
                that.getListData();
            },
            addDynamicMapLayer: function () {
                title = modal._$_param.title;
                map._mapInterface.addDynamicMapLayer(auGurit.global.mapTopLayers[title]["serviceUrl"], auGurit.global.mapTopLayers[title]["layerTable"], function (layer) {
                    auGurit.global.mapLayers[title] = layer;
                });
            }
        };

        var modal = {
            IsMax: ko.observable(false),
            search: ko.observable({
                rvcdnm: ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([
                    {"value":"","title":"全部"},
                    {"value":440103,"title":"荔湾区"},
                    {"value":440104,"title":"越秀区"},
                    {"value":440105,"title":"海珠区"},
                    {"value":440106,"title":"天河区"},
                    {"value":440111,"title":"白云区"},
                    {"value":440112,"title":"黄埔区"},
                    {"value":440113,"title":"番禺区"},
                    {"value":440114,"title":"花都区"},
                    {"value":440115,"title":"南沙区"},
                    {"value":440116,"title":"萝岗区"},
                    {"value":440118,"title":"增城区"},
                    {"value":440117,"title":"从化区"}
                ])
            }),
            clickXZQBtn: $.proxy(Well.clickXZQBtn, Well),
            clickSearchBtn: $.proxy(Well.clickSearchBtn, Well),
            clickResetBtn: $.proxy(Well.clickResetBtn, Well),
        };


        Well.init();
        return modal;
    });