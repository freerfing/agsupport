/**
 * Created by CZZ on 2017-10-23.
 * 187 河涌面板
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
        var metadata = {}; // 保存元数据
	 var title;
        var rivers_187 = {
            init: function () {
                var that = this;
                composition.addBindingHandler("riversInitHandler_187", {
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

                //modal._$_param.maptool.showTipBar(false);

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
                var jqHeight = $(".app-panal-content").height() - 27 * (panalObj.getSizeState() == "max" ? 1 : 2) - 130;
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
                $("#riversList_187").jqxGrid({
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
                this._columns = [];
                this._normalColumns = [];
                this._data = [];
            },

            initTableColumns: function () {
                var that = this;
                w.queryMetadata("WRP_RVR_BSIN", function (columnsInfo, prikey, _metadata) {
                    
                    var col = {
                        id: "degree",
                        text: "黑臭级别",
                        datafield: "degree",
                        width: "70",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(index, datafield, value, defaultvalue, column, rowdata){

                            var cellTxt = "";

                            switch(value)
                            {
                                case 0:
                                    cellTxt = "<div style='text-align:center; line-height:24px; height:24px; background-color:#A881CC'>轻度黑臭</div>";
                                    break;

                                case 1:
                                    cellTxt = "<div style='text-align:center; line-height:24px; height:24px; background-color:#FC561F'>重度黑臭</div>";
                                    break;
                            }

                            return cellTxt;

                        },
                        order: 3
                    }
                    columnsInfo.splice(2, 0, col);
                    columnsInfo[0].width = "135";
                    columnsInfo[1].width = "105";


                    //normal
                    //河涌名称，河涌总长度（米），黑臭级别， 整治完成时限
                    var normalColumns = [];
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"rvnm",
                        id:"rvnm",
                        order:1,
                        text:"河流名称",
                        width:"80"
                    });
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"xzq",
                        id:"xzq",
                        order:1,
                        text:"行政区",
                        width:"90"
                    });                    
                    normalColumns.push({
                        align:"center",
                        cellsalign:"center",
                        cellsrenderer:null,
                        datafield:"rvlen",
                        id:"rvlen",
                        order:1,
                        text:"河流长度km",
                        width:"80"
                    });
                    normalColumns.push(col);

                    that._normalColumns = normalColumns;
                    that._columns = columnsInfo;
                    that.initLayout();
		            metadata = _metadata;   //  保存源数据
                    $('#riversList_187').on('rowclick', function (event) {
                        var dataObj = event.args.row.bounddata
                        var layer = {
                            serviceUrl: auGurit.global.mapTopLayers[title]["serviceUrl"],
                            layerTable: auGurit.global.mapTopLayers[title]["layerTable"],
                            tableName: "WRP_RVR_BSIN",
                            params: {
                                "prikey": prikey,
                                "row": dataObj,
                            },
                            metadata: metadata,
                            title: title,
                            isPoint: "false",
                            isCheck: auGurit.global.mapTopLayers[title]["isCheck"]
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
                    requestParams.rvcd = modal.search().rvcd();
                    requestParams.rvnm = modal.search().rvnm();
                    requestParams.xzq = modal.search().xzq();
                    requestParams.sslymc = modal.search().sslymc();
                    requestParams.rvlen1 = modal.search().rvlen1();
                    requestParams.rvlen2 = modal.search().rvlen2();

                    if (modal.search().rvlen1() != "") {
                        if (isNaN(modal.search().rvlen1())) {
                            alert("河流长度请输入数字!");
                            return false;
                        }
                    }
                    if (modal.search().rvlen2() != "") {
                        if (isNaN(modal.search().rvlen2())) {
                            alert("河流长度请输入数字!");
                            return false;
                        }
                    }
                }
                else {
                    requestParams.rvcdnm = modal.search().rvcdnm();
                    requestParams.xzq = modal.search().xzq();
                }
                requestParams.curPage = currentPage || 1;
                requestParams.perPageCount = 30;
                var url = auGurit.global.rootPath + "/subject/listrivers_187";
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
                            parent: $("#riversPager_187"),
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

                modal.search().rvcdnm("");
                modal.search().rvcd("");
                modal.search().rvnm("");
                modal.search().xzq("");
                modal.search().sslymc("");
                modal.search().rvlen1("");
                modal.search().rvlen2("");
                modal.search().sslymc("");

                this.getListData();
            },
            queryLayer: function (layerOption) {
                var _this = this;
                if (layerOption && layerOption.serviceUrl && layerOption.params) {
                    var projectID = layerOption.params.row[layerOption.params.prikey.toLowerCase()];
                    _this.queryProperties(layerOption.params.row, function (html, content) {
                        var where = "projectID = '" + projectID + "'";
                        var layer = {
                            url: layerOption.serviceUrl,
                            layerTable: layerOption.layerTable,
                            where: where,
                            style: {color: 'red', opacity: '1'},
                            fields: "projectId"
                        };
                        map._mapInterface.addLayerForService(layer, function (layers) {
                            layers.bindPopup(html, {minWidth: "430px"}); // layers.bindPopup(html, {minWidth: "430px"}).openPopup();
                        });
                    });
                }
            },
            queryProperties: function (obj, callback) {
                if (metadata.hasOwnProperty("content")) {
                    var html = mapUtils.createPopup({
                        "content": metadata.content,
                        "obj": obj,
                        "title": modal._$_param.title,
                        "isEdit": "false"
                    });
                    callback(html, metadata.content);
                } else {
                    $.ajax({
                        url: auGurit.global.rootPath + "metadata/getFieldsByTableName/WRP_RVR_BSIN", // 请求元数据
                        type: 'get',
                        success: function (r) {
                            metadata = JSON.parse(r);
                            var html = mapUtils.createPopup({
                                "content": metadata.content,
                                "obj": obj,
                                "title": modal._$_param.title, "isEdit": "false"
                            });
                            callback(html, metadata.content);
                        },
                        error: function () {
                            alert("信息获取失败");
                        }
                    });
                }
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
                rvcdnm: ko.observable(""),
                rvcd: ko.observable(""),
                rvnm: ko.observable(""),
                xzq: ko.observable(""),
                sslymc: ko.observable(""),
                rvlen1: ko.observable(""),
                rvlen2: ko.observable(""),
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
            clickSearchBtn: $.proxy(rivers_187.clickSearchBtn, rivers_187),
            clickResetBtn: $.proxy(rivers_187.clickResetBtn, rivers_187)
        };


        rivers_187.init();
        return modal;
    });