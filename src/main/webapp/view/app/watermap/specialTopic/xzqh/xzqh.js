define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
		var curPanal;
        var panalObj;
        var map; //地图对象
        var dataList;
		var xzqh = {
			init: function() {
				var that = this;
				composition.addBindingHandler("xzqhInitHandler", {
					init: function(dom) {
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle = modal._$_param.title;
						that.renderUI();
						that.bindUI();
						that.initLayout();
					},
					update: function() {}
				});
			},
			renderUI: function() {
                var runId = modal._$_param.panelId;
                var that = this;
                panalObj.addEvent(runId, "onMaxShow", function (e) {   
                    that.initLayout();
                });
                panalObj.addEvent(runId, "onMinShow", function (e) {
                    that.initLayout();
                });
			},
			bindUI: function() {
				var that = this;
                map = $("#desktop-main-map")[0].contentWindow.map;
                that.initPage();
                that.clearInput();
                that.initTableColumns();
                that.initListData();
                that.initMapData();
			},
            initPage: function () {
                this.originalCurPage = 1;
                this.originalPerPageCount = 10;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
            },
			clearInput:function(){
				modal.search().name("");
				modal.search().xzq("");
			},
            initTableColumns: function () {

            },
			initListData: function () {
			},
            initMapData: function () {
				this.addDynamicMapLayer(function() {});
            },
            setListPage:function(data){
                var that=this;
                that._pageInfo = {
                    totalPage: 1,
                    currentPage: 1,
                    currentRecord: data.length,
                    totalRecord: data.length
                };
                that._pager.setPageInfo(that._pageInfo);
            },
            clickSearchBtn: function () {
                var that = this;
                that.initListData();
            },
			clickClearBtn: function () {
                var that = this;
                that.clearInput(); 
                that.initListData();
            },
            clickXZQBtn: function () {
                var that = this;
                that.initListData();
                return true;
            },
			wantXZQH: function() {
				this.addDynamicMapLayer(function() {});
				return true;
			},
            addDynamicMapLayer:function(callback) {
				//map._mapInterface.test();
                var that = this, i, layerIndexs = [],
					topLayer = auGurit.global.mapTopLayers[that.mapLayerTitle];
				mapUtils.removeGlobalMapLayers(that.mapLayerTitle);

				$('input[name="xzqhType"]:checked').each(function(i) {
					layerIndexs[i] = $(this).val();
				});

				for(i in layerIndexs) {
					map._mapInterface.addDynamicMapLayer(topLayer["serviceUrl"], layerIndexs, callback);
				}
            },
            openPanel: function (data) {

            },
            initLayout:function(){

            }
		};

		var modal = {
            search: ko.observable({
                name:ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([{"value":"","title":"全部"},{"value":440103,"title":"荔湾区"},{"value":440104,"title":"越秀区"},{"value":440105,"title":"海珠区"},{"value":440106,"title":"天河区"},{"value":440111,"title":"白云区"},{"value":440112,"title":"黄埔区"},{"value":440113,"title":"番禺区"},{"value":440114,"title":"花都区"},{"value":440115,"title":"南沙区"},{"value":440116,"title":"萝岗区"},{"value":440199,"title":"北江区"},{"value":440183,"title":"增城区"},{"value":440184,"title":"从化区"}])
            }),
            clickSearchBtn: $.proxy(xzqh.clickSearchBtn, xzqh),
			clickClearBtn: $.proxy(xzqh.clickClearBtn, xzqh),
            clickXZQBtn: $.proxy(xzqh.clickXZQBtn, xzqh),
			wantXZQH: $.proxy(xzqh.wantXZQH, xzqh)
		};

		xzqh.init();
		return modal;
	});