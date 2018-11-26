define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager, echarts) {
        var curPanal;
        var pointObj;
        var panalObj;
        var map;
        var layer;
        var Drainagenetwork = {
            init: function () {
                var that = this;
                composition.addBindingHandler("drainagenetworkInitHandler", {
                    init: function (dom) {
                        // panalObj = panal.getPanalByElement(dom);
                        // panalObj.settings.onClose = function () {
                        //     if (pointObj) {
                        //         for (var i in pointObj) {
                        //             map.removeLayer(pointObj[i]);
                        //         }
                        //     }
                        // };
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
                //不要重复加载图层
                if(!layer) {
                    //加载服务
                    var layerOption = {
                        url: "http://192.168.30.107:6080/arcgis/rest/services/watergz/pipe_network2/MapServer",
                        opacity: 1
                    };
                    layer = map._mapInterface.addLayer(layerOption, function (data) {
                    });
                }
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
               /* var columns = [
                    {
                        id: "bh",
                        text: "编号",
                        datafield: "bh",
                        width: "44%",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "wsclxy",
                        text: "污水处理系统",
                        datafield: "wsclxy",
                        width: "44%",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "locateIcon",
                        text: "",
                        datafield: "locateIcon",
                        width: "10%",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.locateIconFormatter
                    }
                ];*/
                var columns = [
                    {
                        id: "stnm",
                        text: "站点名称",
                        datafield: "stnm",
                        width: "30%",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "wnpre",
                        text: "预警压力(kpa)",
                        datafield: "wnpre",
                        width: "30%",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "wndep",
                        text: "预警水位(m)",
                        datafield: "wndep",
                        width: "30%",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "locateIcon",
                        text: "",
                        datafield: "locateIcon",
                        width: "10%",
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

                $("#drainagenetworkList").jqxGrid({
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
                $("#drainagenetworkList").on("cellclick", function (event) {
                    if (event.args.datafield == 'locateIcon') {
                        var data = event.args.row.bounddata;
                        var layerOption = {
                            url: "http://192.168.30.107:6080/arcgis/rest/services/watergz/pipe_network2/MapServer",
                            // layerTable: data.layerId,
                            // where: "FID=" + data.fid,
                            layerTable: 11,
                            where : "WORK_ID='" +data.atid+"'",
                            opacity: 1
                        };
                        //map._mapInterface.queryLayer(layerOption, Drainagenetwork.featureSelected(data));
                        map._mapInterface.queryLayer(layerOption, function () {
                            Drainagenetwork.featureSelected(data);
                        });
                    }
                });
            },
            //加载表格数据
            loadReservoirList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;

                this.gridDataSource.localdata = tableData;
                $("#drainagenetworkList").jqxGrid({
                    source: this.gridDataSource
                });
            },
            //获取表格数据及分页信息
            getListData: function () {
                var that = this;

                // var h = http.getInstance("data/drainagenetwork1.json");
                var h = http.getInstance("subject/listStConduitchB", {
                    type: "post"
                });
                var requestParams = that._param;
                requestParams.stnm = $('#drainagenetwork_stnm').val();
                h.ajax(requestParams).then(function (result) {
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
                            url: "http://192.168.30.107:6080/arcgis/rest/services/watergz/pipe_network2/MapServer",
                            //layerTable: list[0].layerId,
                            //where: "FID=" + list[0].fid,
                            layerTable: 11,
                            where : "WORK_ID='" +list[0].atid+"'",
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
                $('#drainagenetwork_stnm').val('');
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
                common.openDialogPanal("view/app/watermap/topics/drainagenetwork/drainagedetail", title, {rowData: data, height: height}, width, height, top, left);
            }
        };

        var modal = {
            clickSearchBtn: $.proxy(Drainagenetwork.clickSearchBtn, Drainagenetwork),
            clickResetBtn: $.proxy(Drainagenetwork.clickResetBtn, Drainagenetwork)
        };

        Drainagenetwork.init();
        return modal;
    });