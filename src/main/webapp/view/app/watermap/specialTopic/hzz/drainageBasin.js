<!-- 流域图面板 -->
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
	    var title;
        var draingeBasin = {
            init: function () {
                var that = this;
                composition.addBindingHandler("draingeBasinInitHandler", {
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
                var jqHeight = $(".app-panal-content").height() - 100;
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
                $("#draingBasinList").jqxGrid({
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
					datafield:"ctnm",
					id:"ctnm",
					order:1,
					text:"流域名称",
					width:"160"
				}, {
					align:"center",
					cellsalign:"center",
					datafield:"rvnm",
					id:"rvnm",
					order:1,
					text:"河流名称",
					width:"160"
				}, {
					align:"center",
					cellsalign:"center",
					datafield:"rvcd",
					id:"rvcd",
					order:1,
					text:"河流代码",
					width:"30%"
				}, {
					align:"center",
					cellsalign:"center",
					datafield:"f187",
					id:"f187",
					order:1,
					text:"187条黑臭条数",
					width:"100",
					type: 'string'
				}, {
					align:"center",
					cellsalign:"center",
					datafield:"f35",
					id:"f35",
					order:1,
					text:"35条黑臭条数",
					width:"100",
					type: 'string'
				}];

				w.queryMetadata("GH_DRAINAGE_BASIN", function (columnsInfo, prikey, _metadata) {
					that.initLayout();
					$('#draingBasinList').on('rowclick', function (event) {
						var dataObj = event.args.row.bounddata;
						var layer = {
							serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
							layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
							tableName: "GH_DRAINAGE_BASIN",
							params: {
								"prikey": prikey,
								"row": dataObj,
							},
							metadata: _metadata,
							title: title,
							isPoint: "false",
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
                var url = auGurit.global.rootPath + "/subject/listDrainageBasin";
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
                    $("#draingBasinPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#draingBasinPager"),
                            changeHandler: function () {
                                that.getListData(that._pager._pageInfo.currentPage);
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                }

				that.gridDataSource.localdata = that._data;
				$("#draingBasinList").jqxGrid({
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
				map._mapInterface.addDynamicMapLayer(auGurit.global.mapTopLayers[title]["serviceUrl"], auGurit.global.mapTopLayers[title]["layerTable"], function (layer) {
					auGurit.global.mapLayers[title] = layer;
				}, { opacity: 0.7 });
            }
        };

        var modal = {
            IsMax: ko.observable(false),
            search: ko.observable({
                rvcdnm: ko.observable(""),
            }),
            clickSearchBtn: $.proxy(draingeBasin.clickSearchBtn, draingeBasin),
            clickResetBtn: $.proxy(draingeBasin.clickResetBtn, draingeBasin),
        };


		draingeBasin.init();
        return modal;
    });