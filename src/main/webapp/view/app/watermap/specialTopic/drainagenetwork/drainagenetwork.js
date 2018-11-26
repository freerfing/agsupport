define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager) {
        var panalObj;
        var map;
        var Drainagenetwork = {
            init: function () {
                var that = this;
                composition.addBindingHandler("drainagenetworkInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        var layer = panalObj.param.layer;
                        panalObj.settings.onClose = function () {
                            //清除图层和点击事件
                            map.removeLayer(layer);
                            map.off('click');
                            map._mapInterface.layerFeature.clearLayers();
                            //关闭弹窗
                            if(auGurit.global.secondUtlPanal)
                                auGurit.global.secondUtlPanal.close();
                        };
                        that.renderUI();
                        that.bindUI();
                        $(dom).click(function () {
                            // if(desktopMapClickHandler){
                            // 	desktopMapClickHandler.remove();
                            // }
                        });
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
                var that = this;
                that.initPage();
                that.initTableColumns();
                that.getListData();
            },
            bindUI: function () {
                map = $("#desktop-main-map")[0].contentWindow.map;
            },
            //初始化分页参数
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
            //初始化表格列参数
            initTableColumns: function () {
                var that = this;
                var columns = [
                    {
                        id: "bh",
                        text: "编号",
                        datafield: "bh",
                        width: "52%",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "wsclxy",
                        text: "污水处理系统",
                        datafield: "wsclxy",
                        width: "38%",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "locateIcon",
                        text: "",
                        datafield: "locateIcon",
                        width: "8%",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.locateIconFormatter
                    }
                ];

                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield, type: 'string'});
                }
                that.gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };

                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);

                $("#reserviorList").jqxGrid({
                    width: 340,
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columns
                });
                //为表格增加一个cell单击事件,只对定位图标的cell有效
                $("#reserviorList").on("cellclick", function (event) {
                    if (event.args.datafield == 'locateIcon') {
                        var data = event.args.row.bounddata;
                        var layerOption = {
                            url: "http://172.16.49.219:6080/arcgis/rest/services/watergz/pipe_network2/MapServer",
                            layerTable: data.layerId,
                            where: "OBJECTID=" + data.objectId,
                            opacity: 1
                        };
                        map._mapInterface.queryLayer(layerOption, Drainagenetwork.featureSelected);
                    }
                });
            },
            //加载表格数据
            loadReservoirList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;

                this.gridDataSource.localdata = tableData;
                $("#reserviorList").jqxGrid({
                    source: this.gridDataSource
                });
            },
            //获取表格数据及分页信息
            getListData: function () {
                var that = this;

                var h = http.getInstance("data/drainagenetwork1.json");
                h.ajax().then(function (result) {
                    var data = result;
                    that._data = data;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };
                    that.setListData();
                    //用定位以后再清除动画效果的方式去放大到管线的那一个级别
                    var list = data.list;
                    if(list.length>0) {
                        var layerOption = {
                            url: "http://172.16.49.219:6080/arcgis/rest/services/watergz/pipe_network2/MapServer",
                            layerTable: list[0].layerId,
                            where: "OBJECTID=" + list[0].objectId,
                            opacity: 1
                        };
                        map._mapInterface.queryLayer(layerOption, function(data){map._mapInterface.layerFeature.clearLayers();});
                    }
                });
            },
            //初始化分页组件的实例,为加载表格数据作准备
            setListData: function () {
                var that = this;
                //处理分页
                if (that._data && that._pageInfo.totalPage >= 1) {
                    $(".list-datagroup-pager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $(".list-datagroup-pager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;

                                that.getListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    $(".list-datagroup-pager").css("display", "none");
                    $(".list-datagroup-content").css("bottom", 0);
                }
                that.loadReservoirList();
            },
            //查询按钮事件
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            //重置按钮事件
            clickResetBtn: function () {
                $('#district').val('');
                $('#taskNumber').val('');
                $('#drainageArea').val('');
                $('input[name="drainage_type"]').prop('checked', true);
            },
            //渲染定位图标
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="reservoir_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            //要素点选事件
            featureSelected: function (data) {
                var height = $("#desktop-map").height() * 0.5 - 15;
                var top = 75;
                var left = 45;
                var width = $("#desktop-map").width() - 345 - left;
                var title = '排水管网';
                common.openDialogPanal("view/app/watermap/specialTopic/drainagenetwork/drainagedetail", title, {height: height}, width, height, top, left);
            }
        };

        var modal = {
            clickSearchBtn: $.proxy(Drainagenetwork.clickSearchBtn, Drainagenetwork),
            clickResetBtn: $.proxy(Drainagenetwork.clickResetBtn, Drainagenetwork)
        };

        Drainagenetwork.init();
        return modal;
    });