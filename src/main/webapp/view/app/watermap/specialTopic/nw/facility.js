define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
        var title;
        var Facility = {
            init: function () {
                var that = this;
                composition.addBindingHandler("facilityInitHandler", {
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
                $("#facilityList").jqxGrid({
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
                this.originalPerPageCount = 80;
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
                        "id": "cmb_name",
                        "text": "设施名称",
                        "datafield": "cmb_name",
                        "width": "300",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 1
                    },
                    {
                        "id": "addr",
                        "text": "设施位置",
                        "datafield": "addr",
                        "width": "480",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 2
                    },
                    {
                        "id": "cmb_standa",
                        "text": "设计出水标准",
                        "datafield": "cmb_standa",
                        "width": "420",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 3
                    },
                    {
                        "id": "cmb_des_wa",
                        "text": "设计处理水量",
                        "datafield": "cmb_des_wa",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 4
                    },
                    {
                        "id": "cmb_cov_ar",
                        "text": "占地面积",
                        "datafield": "cmb_cov_ar",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 5
                    },
                    {
                        "id": "cmb_is_dyn",
                        "text": "有无动力",
                        "datafield": "cmb_is_dyn",
                        "width": "65",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 6
                    },
                    {
                        "id": "cmb_treat_",
                        "text": "处理工艺",
                        "datafield": "cmb_treat_",
                        "width": "200",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 7
                    },
                    {
                        "id": "cmb_run_ti",
                        "text": "投入运行时间",
                        "datafield": "cmb_run_ti",
                        "width": "160",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 8
                    },
                    {
                        "id": "cmb_ma_uni",
                        "text": "维管单位",
                        "datafield": "cmb_ma_uni",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 9
                    },
                    {
                        "id": "cmb_ma_u_1",
                        "text": "维管单位责任人",
                        "datafield": "cmb_ma_u_1",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 10
                    },
                    {
                        "id": "cmb_ma_u_2",
                        "text": "维管单位责任人电话",
                        "datafield": "cmb_ma_u_2",
                        "width": "150",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 11
                    },
                    {
                        "id": "cmb_vill_p",
                        "text": "村委责任人",
                        "datafield": "cmb_vill_p",
                        "width": "80",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 12
                    },
                    {
                        "id": "cmb_vill_1",
                        "text": "村委责任人电话",
                        "datafield": "cmb_vill_1",
                        "width": "120",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 13
                    },
                    {
                        "id": "cmb_street",
                        "text": "街道办责任人",
                        "datafield": "cmb_street",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 14
                    },
                    {
                        "id": "cmb_stre_1",
                        "text": "街道办责任人电话",
                        "datafield": "cmb_stre_1",
                        "width": "120",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 15
                    },
                    {
                        "id": "desription",
                        "text": "上报说明",
                        "datafield": "desription",
                        "width": "420",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 16
                    },
                    {
                        "id": "parent_o_1",
                        "text": "上报单位名称集合",
                        "datafield": "parent_o_1",
                        "width": "200",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 17
                    },
                    {
                        "id": "mark_per_1",
                        "text": "上报人名",
                        "datafield": "mark_per_1",
                        "width": "120",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 18
                    },
                    {
                        "id": "mark_perso",
                        "text": "上报人手机号",
                        "datafield": "mark_perso",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 19
                    },
                    {
                        "id": "road",
                        "text": "所在道路",
                        "datafield": "road",
                        "width": "220",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 20
                    },
                    {
                        "id": "current_vi",
                        "text": "所在行政村",
                        "datafield": "current_vi",
                        "width": "200",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 21
                    },
                    {
                        "id": "current_to",
                        "text": "所在镇（街）",
                        "datafield": "current_to",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 22
                    },
                    {
                        "id": "current_ar",
                        "text": "所在区",
                        "datafield": "current_ar",
                        "width": "100",
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "order": 23
                    }
                ];

                w.queryMetadata("NW_FACILITIESPOINT", function (columnsInfo, prikey, _metadata) {
                    console.log(JSON.stringify(columnsInfo));
                    that.initLayout();
                    $('#facilityList').on('rowclick', function (event) {
                        var dataObj = event.args.row.bounddata;
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "NW_FACILITIESPOINT",
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
                requestParams.rvcdnm = modal.search().rvcdnm();
                requestParams.curPage = currentPage || 1;
                requestParams.perPageCount = 80;
                var url = auGurit.global.rootPath + "/subject/listFacility";
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
                    $("#facilityPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#facilityPager"),
                            changeHandler: function () {
                                that.getListData(that._pager._pageInfo.currentPage);
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                }

                that.gridDataSource.localdata = that._data;
                $("#facilityList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            clickXZQBtn: function () {
                var that = this;
                that.getListData();
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
            clickXZQBtn: $.proxy(Facility.clickXZQBtn, Facility),
            clickSearchBtn: $.proxy(Facility.clickSearchBtn, Facility),
            clickResetBtn: $.proxy(Facility.clickResetBtn, Facility),
        };


        Facility.init();
        return modal;
    });