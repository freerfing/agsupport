<!-- 排水设施巡查成果面板 -->
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
        var title;
        var Inspection = {
            init: function () {
                var that = this;
                composition.addBindingHandler("inspectionInitHandler", {
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
                var jqHeight = $(".app-panal-content").height() - 96;
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
                $("#inspectionList").jqxGrid({
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
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "projectid",
                        "id": "projectid",
                        "order": 1,
                        "text": "主键ID",
                        "width": "155",
                        hidden: true
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "mark_pid",
                        "id": "mark_pid",
                        "order": 2,
                        "text": "标识人ID",
                        "width": "155"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "mark_perso",
                        "id": "mark_perso",
                        "order": 3,
                        "text": "标识人名称",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "mark_time",
                        "id": "mark_time",
                        "order": 4,
                        "text": "标识时间",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "desription",
                        "id": "desription",
                        "order": 5,
                        "text": "标识描述",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "report_typ",
                        "id": "report_typ",
                        "order": 6,
                        "text": "标识类型",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "correct_ty",
                        "id": "correct_ty",
                        "order": 7,
                        "text": "设施纠错种类",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "attr_one",
                        "id": "attr_one",
                        "order": 8,
                        "text": "设施核心属性1",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "attr_two",
                        "id": "attr_two",
                        "order": 9,
                        "text": "设施核心属性2",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "attr_three",
                        "id": "attr_three",
                        "order": 10,
                        "text": "设施核心属性3",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "attr_four",
                        "id": "attr_four",
                        "order": 11,
                        "text": "设施核心属性4",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "attr_five",
                        "id": "attr_five",
                        "order": 12,
                        "text": "设施核心属性5",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "road",
                        "id": "road",
                        "order": 13,
                        "text": "所属道路",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "addr",
                        "id": "addr",
                        "order": 14,
                        "text": "标识地址",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "x",
                        "id": "x",
                        "order": 15,
                        "text": "X坐标",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "y",
                        "id": "y",
                        "order": 16,
                        "text": "Y坐标",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "layer_name",
                        "id": "layer_name",
                        "order": 17,
                        "text": "设施所在图层名称",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "us_id",
                        "id": "us_id",
                        "order": 18,
                        "text": "设施编号",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "team_org_i",
                        "id": "team_org_i",
                        "order": 19,
                        "text": "队/班组ID",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "team_org_n",
                        "id": "team_org_n",
                        "order": 20,
                        "text": "队/班组名称",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "direct_org",
                        "id": "direct_org",
                        "order": 21,
                        "text": "直属机构ID",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "direct_o_1",
                        "id": "direct_o_1",
                        "order": 22,
                        "text": "直属机构名称",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "supervise_",
                        "id": "supervise_",
                        "order": 23,
                        "text": "监管单位ID",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "supervise1",
                        "id": "supervise1",
                        "order": 24,
                        "text": "监管单位名称",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "parent_org",
                        "id": "parent_org",
                        "order": 25,
                        "text": "业主方机构ID",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "parent_o_1",
                        "id": "parent_o_1",
                        "order": 26,
                        "text": "业主方名称",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "check_stat",
                        "id": "check_stat",
                        "order": 27,
                        "text": "审核人",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "check_pers",
                        "id": "check_pers",
                        "order": 28,
                        "text": "核稿人",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "check_pe_1",
                        "id": "check_pe_1",
                        "order": 29,
                        "text": "审核人",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "check_time",
                        "id": "check_time",
                        "order": 30,
                        "text": "审核时间",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "check_desr",
                        "id": "check_desr",
                        "order": 31,
                        "text": "审核描述",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "check_type",
                        "id": "check_type",
                        "order": 32,
                        "text": "审核类型",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "mark_id",
                        "id": "mark_id",
                        "order": 33,
                        "text": "上报表id",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "origin_add",
                        "id": "origin_add",
                        "order": 34,
                        "text": "原设施地址",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "origin_roa",
                        "id": "origin_roa",
                        "order": 35,
                        "text": "原设施所在道路",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "orgin_x",
                        "id": "orgin_x",
                        "order": 36,
                        "text": "原设施X坐标",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "orgin_y",
                        "id": "orgin_y",
                        "order": 37,
                        "text": "原设施Y坐标",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "origin_att",
                        "id": "origin_att",
                        "order": 38,
                        "text": "原设施地址",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "origin_a_1",
                        "id": "origin_a_1",
                        "order": 39,
                        "text": "原设施基础属性1",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "origin_a_2",
                        "id": "origin_a_2",
                        "order": 40,
                        "text": "原设施基础属性2",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "origin_a_3",
                        "id": "origin_a_3",
                        "order": 41,
                        "text": "原设施基础属性3",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "origin_a_4",
                        "id": "origin_a_4",
                        "order": 42,
                        "text": "原设施基础属性4",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "user_addr",
                        "id": "user_addr",
                        "order": 43,
                        "text": "上报人地址",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "user_x",
                        "id": "user_x",
                        "order": 44,
                        "text": "上报人X坐标",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "user_y",
                        "id": "user_y",
                        "order": 45,
                        "text": "上报人Y坐标",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "user_id",
                        "id": "user_id",
                        "order": 46,
                        "text": "用户ID",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "update_tim",
                        "id": "update_tim",
                        "order": 47,
                        "text": "修改时间",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "pcode",
                        "id": "pcode",
                        "order": 48,
                        "text": "问题大类",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "child_code",
                        "id": "child_code",
                        "order": 49,
                        "text": "问题小类",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "city_villa",
                        "id": "city_villa",
                        "order": 50,
                        "text": "删除人所在村",
                        "width": "100"
                    },
                    {
                        "align": "center",
                        "cellsalign": "center",
                        "cellsrenderer": null,
                        "datafield": "psh",
                        "id": "psh",
                        "order": 51,
                        "text": "排水户",
                        "width": "100"
                    }
                ];

                w.queryMetadata("PS_REPORTN", function (columnsInfo, prikey, _metadata) {
                    that.initLayout();
                    $('#inspectionList').on('rowclick', function (event) {
                        var dataObj = event.args.row.bounddata;
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "PS_REPORTN",
                            params: {
                                "prikeyName": "projectid",
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
                requestParams.rvcdnm = modal.search().rvcdnm();
                requestParams.curPage = currentPage || 1;
                requestParams.perPageCount = 80;
                var url = auGurit.global.rootPath + "/subject/listInspection";
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
                    $("#inspectionPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#inspectionPager"),
                            changeHandler: function () {
                                that.getListData(that._pager._pageInfo.currentPage);
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                }

                that.gridDataSource.localdata = that._data;
                $("#inspectionList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            clickSearchBtn: function () {
                var that = this;
                that.getListData();
            },
            clickResetBtn: function () {
                modal.search().rvcdnm("");
                this.getListData();
            },
            addDynamicMapLayer: function () {
                title = modal._$_param.title;
                var zoom = (map.getZoom() > 7 ? map.getZoom() : 8);
                map._mapInterface.addDynamicMapLayer(auGurit.global.mapTopLayers[title]["serviceUrl"], auGurit.global.mapTopLayers[title]["layerTable"], function (layer) {
                    auGurit.global.mapLayers[title] = layer;
                }, { zoom:  zoom });
            }
        };

        var modal = {
            IsMax: ko.observable(false),
            search: ko.observable({
                rvcdnm: ko.observable(""),
            }),
            clickSearchBtn: $.proxy(Inspection.clickSearchBtn, Inspection),
            clickResetBtn: $.proxy(Inspection.clickResetBtn, Inspection),
        };


        Inspection.init();
        return modal;
    });