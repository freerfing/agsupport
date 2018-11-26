define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
        var title;
        var PsWellZy = {
            init: function () {
                var that = this;
                composition.addBindingHandler("psWellZyInitHandler", {
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
                $("#psWellZyList").jqxGrid({
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
						"datafield": "attr_four",
						"id": "attr_four",
						"order": 2,
						"text": "权属单位",
						"width": "200"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "attr_two",
						"id": "attr_two",
						"order": 7,
						"text": "雨污类别",
						"width": "100"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "addr",
						"id": "addr",
						"order": 4,
						"text": "设施位置",
						"width": "460"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "road",
						"id": "road",
						"order": 5,
						"text": "所属道路",
						"width": "160"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "attr_one",
						"id": "attr_one",
						"order": 6,
						"text": "窨井类型",
						"width": "100"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "attr_three",
						"id": "attr_three",
						"order": 8,
						"text": "井盖材质",
						"width": "100"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "attr_five",
						"id": "attr_five",
						"order": 9,
						"text": "已挂牌编号",
						"width": "100"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "desription",
						"id": "desription",
						"order": 11,
						"text": "上报说明",
						"width": "300"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "mark_perso",
						"id": "mark_perso",
						"order": 12,
						"text": "上报人",
						"width": "100"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "parent_o_1",
						"id": "parent_o_1",
						"order": 15,
						"text": "上报单位",
						"width": "300"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "mark_time",
						"id": "mark_time",
						"order": 16,
						"text": "上报时间",
						"width": "160"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "check_desr",
						"id": "check_desr",
						"order": 17,
						"text": "审核描述",
						"width": "200"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "check_pe_1",
						"id": "check_pe_1",
						"order": 19,
						"text": "审核人",
						"width": "100"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "check_time",
						"id": "check_time",
						"order": 20,
						"text": "审核时间",
						"width": "160"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "origin_add",
						"id": "origin_add",
						"order": 21,
						"text": "原设施地址",
						"width": "460"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "origin_roa",
						"id": "origin_roa",
						"order": 22,
						"text": "原设施所在道路",
						"width": "160"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "origin_att",
						"id": "origin_att",
						"order": 23,
						"text": "原窨井类型",
						"width": "100"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "origin_a_1",
						"id": "origin_a_1",
						"order": 24,
						"text": "原雨污类别",
						"width": "100"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "origin_a_2",
						"id": "origin_a_2",
						"order": 25,
						"text": "原井盖材质",
						"width": "100"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "origin_a_3",
						"id": "origin_a_3",
						"order": 26,
						"text": "原权属单位",
						"width": "200"
					},
					{
						"align": "center",
						"cellsalign": "center",
						"cellsrenderer": null,
						"datafield": "origin_a_4",
						"id": "origin_a_4",
						"order": 27,
						"text": "原已挂牌编号",
						"width": "100"
					}
				];

                w.queryMetadata("PS_REPORTN_JJ", function (columnsInfo, prikey, _metadata) {
                    that.initLayout();
                    $('#psWellZyList').on('rowclick', function (event) {
                        var dataObj = event.args.row.bounddata;
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "PS_REPORTN_JJ",
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
                requestParams.unitVal = modal.search().unitVal();
                requestParams.curPage = currentPage || 1;
                requestParams.perPageCount = 80;
				requestParams.layerName = '窨井';
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
                    $("#psWellZyPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#psWellZyPager"),
                            changeHandler: function () {
                                that.getListData(that._pager._pageInfo.currentPage);
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                }

                that.gridDataSource.localdata = that._data;
                $("#psWellZyList").jqxGrid({
                    source: that.gridDataSource
                });
            },
			clickUnitBtn: function () {
				var that = this;
				that.getListData();
			},
            clickSearchBtn: function () {
                var that = this;
                that.getListData();
            },
            clickResetBtn: function () {
                modal.search().rvcdnm("");
                modal.search().unitVal("");
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
				unitVal: ko.observable(""),
				units: ko.observableArray([
					{ text: "全部", value: "" },
					{ text: "天河软件园管委会", value: "天河软件园管委会" },
					{ text: "番禺区水务局", value: "番禺区水务局" },
					{ text: "增城区水务局", value: "增城区水务局" },
					{ text: "花都区水务局", value: "花都区水务局" },
					{ text: "从化区水务局", value: "从化区水务局" },
					{ text: "白云区水务局", value: "白云区水务局" },
					{ text: "南沙区环保水务局", value: "南沙区环保水务局" },
					{ text: "荔湾区水务和农业局", value: "荔湾区水务和农业局" },
					{ text: "黄埔区水务局", value: "黄埔区水务局" },
					{ text: "广州市净水有限公司", value: "广州市净水有限公司" },
					{ text: "海珠区住房和建设水务局", value: "海珠区住房和建设水务局" },
					{ text: "越秀区建设和水务局", value: "越秀区建设和水务局" },
					{ text: "广州市花都净水有限公司", value: "广州市花都净水有限公司" },
					{ text: "天河区住房和建设水务局", value: "天河区住房和建设水务局" },
					{ text: "天河区住房和建设水务", value: "天河区住房和建设水务" },
					{ text: "白云区住房和建设水务局", value: "白云区住房和建设水务局" }
				])
            }),
            clickSearchBtn: $.proxy(PsWellZy.clickSearchBtn, PsWellZy),
			clickUnitBtn: $.proxy(PsWellZy.clickUnitBtn, PsWellZy),
            clickResetBtn: $.proxy(PsWellZy.clickResetBtn, PsWellZy),
        };


        PsWellZy.init();
        return modal;
    });