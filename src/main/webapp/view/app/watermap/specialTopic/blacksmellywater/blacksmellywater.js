define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager) {
        var map;
        var panalObj;
        var Blacksmellywater = {
            init: function () {
                var that = this;
                composition.addBindingHandler("blacksmellywaterInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        var layer = panalObj.param.layer;
                        panalObj.settings.onMaxShow = function () {
                        };
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
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
                var that = this;
                that.initPage(modal);
                that.initTableColumns();
                that.getListData();
            },
            bindUI: function () {
                map = $("#desktop-main-map")[0].contentWindow.map;
            },
            //初始化分页参数
            initPage: function (modal) {
                this.originalCurPage = 1;
                this.originalPerPageCount = 10;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
            },
            //初始化table的列
            initTableColumns: function () {
                var that = this;
                columns = [
                    {
                        id: "riverName",
                        text: "河涌名称",
                        datafield: "riverName",
                        width: "30%",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
                        id: "district",
                        text: "区域",
                        datafield: "district",
                        width: "30%",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
                        id: "waterQuality",
                        text: "水质状态",
                        datafield: "waterQuality",
                        width: "30%",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
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
                    datadatafields.push({
                        name: columns[i].datafield,
                        type: 'string'
                    });
                }
                that.gridDataSource = {};
                gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
                $("#blacksmellywaterList").jqxGrid({
                    width: '100%',
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columns
                });
                $('#blacksmellywaterList').on('cellclick', function (event) {
                    if (event.args.datafield == 'locateIcon') {
                        var data = event.args.row.bounddata;
                        var layerOption = {
                            url: "http://172.16.49.219:6080/arcgis/rest/services/watergz/hcwater3/MapServer",
                            layerTable: data.layerId,
                            where: "OBJECTID=" + data.OBJECTID,
                            opacity: 1
                        };
                        map._mapInterface.queryLayer(layerOption, Blacksmellywater.featureSelected);
                    }
                });
            },
            loadBlacksmellywaterList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;
                this.gridDataSource.localdata = tableData;
                $("#blacksmellywaterList").jqxGrid({
                    source: this.gridDataSource
                });
            },
            //获取数据
            getListData: function () {
                var that = this;
                var h = http.getInstance("data/blacksmellywater1.json");
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
                that.loadBlacksmellywaterList();
            },
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
                $('#district').val('');
                $('#riverName').val('');
                $("#myform input:checkbox").removeAttr("checked");
            },
            //渲染定位图标
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="blacksmellywater_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            //要素点选事件
            featureSelected: function (data) {
                var properites = data.properties;
                var title = '';
                if (properites.hasOwnProperty('村')) {
                    title = '城中村信息';
                } else if (properites.hasOwnProperty('项目名称')) {
                    title = '城市改造项目信息';
                } else
                    title = '河涌信息';
                common.openDialogPanal("view/app/watermap/specialTopic/blacksmellywater/detail", title, properites, 600, 450, 75, 41);
            }
        };

        var modal = {
            clickSearchBtn: $.proxy(Blacksmellywater.clickSearchBtn, Blacksmellywater),
            clickResetBtn: $.proxy(Blacksmellywater.clickResetBtn, Blacksmellywater)
        };

        Blacksmellywater.init();
        return modal;
    });