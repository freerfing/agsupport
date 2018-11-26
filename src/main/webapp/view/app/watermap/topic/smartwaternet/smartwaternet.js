/**
 * Created by hzp on 2017-07-20.
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "highcharts", "tabs", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager, highcharts, tabs) {
        var panalObj;
        var featureList;//加载列表所生成的点列表
        var lastLoactePoint;//上一个定位点
        var agcomMap;
        var map;//地图对象
        var pointObj;
        var features; //所有要素对象
        var Smartwaternet = {
            init: function () {
                var that = this;
                composition.addBindingHandler("smartwaternetInitHandler", {
                    init: function (dom) {
                        that.isMaxShow = false;
                        panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onMaxShow = function () {
                            that.isMaxShow = !that.isMaxShow;
                            if (that.isMaxShow) {
                                $('#smartwaternet-flow-chart-b').show();
                                $('#smartwaternet-flow-chart').hide();
                            } else {
                                $('#smartwaternet-flow-chart-b').hide();
                                $('#smartwaternet-flow-chart').show();
                            }
                        };
                        panalObj.settings.onClose = function(){
                            // if(pointObj){
                            //     for(var i in pointObj){
                            //         map.removeLayer(pointObj[i]);
                            //     }
                            // }
                        }
                        that.renderUI();
                        that.bindUI();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                var that = this;
                //行政区下拉框
                var h = http.getInstance("data/district.json");
                h.ajax().then(function (result) {
                    $.each(result, function (i, item) {
                        $("#district").append("<option value='" + item.id + "'>" + item.name + "</option>");
                    })
                });
                //初始化分页
                that.initPage(modal);
                //初始化表头
                that.initTableColumns();
                that.initEvent();
                //获取数据
                that.getListData();
            },
            initPage: function (modal) {
                // this._url = param.url;
                // this._displayType = param.displayType;
                // this._groupName = param.groupName;
                // this._param = param.queryParam;
                this.originalCurPage = 1;
                this.originalPerPageCount = 10;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                // this._httpType = param.httpType;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
            },
            initTableColumns: function () {
                var that = this;
                var columns = [
                    {
                        id: "czmc",
                        text: "测站名称",
                        datafield: "czmc",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    },
                    {
                        id: "hymc",
                        text: "河涌名称",
                        datafield: "hymc",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    },
                    {
                        id: "xzq",
                        text: "所在区域",
                        datafield: "xzq",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "azdz",
                        text: "安装地址",
                        datafield: "azdz",
                        width: ($(window).width()) * 0.23 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "jczb",
                        text: "监测指标",
                        datafield: "jczb",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    },{
                        id: "czbm",
                        text: "测站编码",
                        datafield: "czbm",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "x",
                        text: "经度",
                        datafield: "x",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "y",
                        text: "纬度",
                        datafield: "y",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }
                ];

                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield, type: 'string'});
                }
                that.gridDataSourceBig = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var columnsDisplay = columns;

                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSourceBig);
                $("#smartwaternetList-b").jqxGrid({
                    width: $(window).width() * 0.96,
                    height: "100%",
                    source: dataAdapter,
                    // theme: 'energyblue',
                    rowsheight: 35,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columnsDisplay,
                });

                columns = [
                    {
                        id: "czmc",
                        text: "测站名称",
                        datafield: "czmc",
                        width: 100,
                        align: "center",
                        cellsalign: "center",
                    }, {
                        id: "jczb",
                        text: "监测指标",
                        datafield: "jczb",
                        width: 120,
                        align: "center",
                        cellsalign: "center",
                    },{
                        id: "xzq",
                        text: "所在区域",
                        datafield: "xzq",
                        width: 70,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    },{
                        id: "locateIcon",
                        text: "",
                        datafield: "locateIcon",
                        width: 50,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.locateIconFormatter
                    }
                ];

                datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield, type: 'string'});
                }
                that.gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };

                dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#smartwaternetList").jqxGrid({
                    width: 340,
                    height: "100%",
                    source: dataAdapter,
                    // theme: 'energyblue',
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columns
                });
                //为小页面的表格增加一个行单击事件
                $('#smartwaternetList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    var id = dataObj.rowId;//暂时用rowId
                    var currentFeature = pointObj["feature_"+id];
                    currentFeature.style = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/info_locat.gif","iconSize":[16,16]};
                    map._mapInterface.layerLocate(currentFeature, that.callbackRestoreStyle);
                    openPanal(dataObj);
                });
            },
            loadSmartwaternetList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;

                this.gridDataSource.localdata = tableData;
                $("#smartwaternetList").jqxGrid({
                    source: this.gridDataSource
                });

                this.gridDataSourceBig.localdata = tableData;
                $("#smartwaternetList-b").jqxGrid({
                    source: this.gridDataSourceBig
                });
            },
            getListData: function () {
                var that = this;
                var h = http.getInstance("subject/smartwaternet");
                var requestParams = that._param;
                requestParams.zm = $('#smartwaternetName').val();
                requestParams.xzq = $('#district').val();

                var chk_value = new Array();
                $('input[name="smartwaternet_Fruit"]:checked').each(function () {
                    chk_value.push($(this).val());
                });

                requestParams.zl = chk_value.toString();

                that.zm = $('#smartwaternetName').val();
                that.xzq = $('#district').val();
                that.skgn = $('#smartwaternetFun').val();
                that.zl = chk_value.toString();

                $('#smartwaternetName-b').val(that.zm);
                $('#district-b').val(that.xzq);
                $('#smartwaternetFun-b').val(that.skgn);

                $('input[name="smartwaternet_Fruit_b"]').each(function () {
                    $(this).removeAttr('checked');
                    var s = $(this).val();
                    if (that.zl.indexOf(s) > -1)
                        $(this).prop('checked', 'true');
                });
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
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
                    //先清除上一次查询地图上面的所有点
                    // if(pointObj){
                    //     for(var i in pointObj){
                    //         map.removeLayer(pointObj[i]);
                    //     }
                    // }

                    //先清除上一次查询地图上面的所有点
                    if(auGurit.global.mapLayers["智能水网站点"]) {
                        var prePointObject = auGurit.global.mapLayers["智能水网站点"];
                        if (prePointObject) {
                            for (var i in prePointObject) {
                                map.removeLayer(prePointObject[i]);
                            }
                        }     
                    }

                    that.addFeatures(result.list);

                    auGurit.global.mapLayers["智能水网站点"] = pointObj;
                    
                });
            },
            addFeatures:function(data){
                var that = this;
                map = $("#desktop-main-map")[0].contentWindow.map;
                var features = {};
                for(var i=0;i<data.length;i++){
                    var feature = {};
                    feature.geometry = "POINT ("+data[i].x+" "+data[i].y+")";
                    feature.properties = data[i];
                    feature.style = that.locationStyle(data[i]);
                    feature.styleSelected = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/info_locat.gif","iconSize":[16,16]};
                    feature.tipContent = data[i].czmc;
                    //暂时用rowId
                    features["feature_"+data[i].rowId] = feature;
                };
                //定位
                pointObj = map._mapInterface.addFeature(features,function(params){
                    that.callbackRestoreStyle(params);
                    var param = params.features.properties;
                    openPanal(param);
                });
            },
            //回调还原非选中点的样式
            callbackRestoreStyle: function (data) {
                for(var i in pointObj) {
                    if(pointObj[i] != data) {
                        var otherLocateFeature = pointObj[i];
                        otherLocateFeature.style = Smartwaternet.locationStyle(pointObj[i].features.properties);
                        map._mapInterface.setFeatureStyle(otherLocateFeature);
                    }
                }
            },
            //根据降水位不同在确定地图上面定位的点的样式
            locationStyle: function (rowData) {
                var style = {
                    	iconUrl:auGurit.global.rootPath + "/view/app/common/smartwaternet/smartwaternet.png",
                        iconSize: [16, 16]
                    };
                return style;
            },
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
                                $('#smartwaternetName').val(that.czmc);
                                $('#district').val(that.xzq);
                                $('#smartwaternetFun').val(that.skgn);

                                $('input[name="smartwaternet_Fruit"]').each(function () {
                                    $(this).removeAttr('checked');
                                    var s = $(this).val();
                                    if (that.zl.indexOf(s) > -1)
                                        $(this).prop('checked', 'true');
                                });

                                that.getListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    $(".list-datagroup-pager").css("display", "none");
                    $(".list-datagroup-content").css("bottom", 0);
                }
                that.loadSmartwaternetList();
            },
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
                $('#district').val('');
                $('#smartwaternetName').val('');
                $('#smartwaternetFun').val('');
                $('input[name="smartwaternet_Fruit"]').prop('checked', true);
                $('#district-b').val('');
                $('#smartwaternetName-b').val('');
                $('#smartwaternetFun-b').val('');
                $('input[name="smartwaternet_Fruit_b"]').prop('checked', true);
            },
            initEvent: function () {
                $('#district').change(function () {
                    $('#district-b').val($(this).val());
                });
                $('#smartwaternetName').change(function () {
                    $('#smartwaternetName-b').val($(this).val());
                });
                $('#smartwaternetFun').change(function () {
                    $('#smartwaternetFun-b').val($(this).val());
                });
                $("input[name='smartwaternet_Fruit']").change(function () {
                    var chk_value = new Array();
                    $('input[name="smartwaternet_Fruit"]:checked').each(function () {
                        chk_value.push($(this).val());
                    });
                    var chk_value_str = chk_value.toString();
                    $('input[name="smartwaternet_Fruit_b"]').each(function () {
                        $(this).removeAttr('checked');
                        var s = $(this).val();
                        if (chk_value_str.indexOf(s) > -1)
                            $(this).prop('checked', 'true');
                    });
                });

                $('#district-b').change(function () {
                    $('#district').val($(this).val());
                });
                $('#smartwaternetName-b').change(function () {
                    $('#smartwaternetName').val($(this).val());
                });
                $('#smartwaternetFun-b').change(function () {
                    $('#smartwaternetFun').val($(this).val());
                });
                $("input[name='smartwaternet_Fruit_b']").change(function () {
                    var chk_value = new Array();
                    $('input[name="smartwaternet_Fruit_b"]:checked').each(function () {
                        chk_value.push($(this).val());
                    });
                    var chk_value_str = chk_value.toString();
                    $('input[name="smartwaternet_Fruit"]').each(function () {
                        $(this).removeAttr('checked');
                        var s = $(this).val();
                        if (chk_value_str.indexOf(s) > -1)
                            $(this).prop('checked', 'true');
                    });
                });
            },
            colorTurnToRedFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                    $cellHtml.css('color', 'red');
                return $cellHtml[0].outerHTML;
            },
            waterLevelFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                var $icon= $('<div class="reservoir_icon_down_red"></div>');;
                var $font = $('<div class="reservoir_font">' + $cellHtml.text() + '</div>');
                $cellHtml.empty();
                $cellHtml.append($font);
                $cellHtml.append($icon);
                return $cellHtml[0].outerHTML;
            },
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="reservoir_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            }
        }

        var modal = {
            clickSearchBtn: $.proxy(Smartwaternet.clickSearchBtn, Smartwaternet),
            clickResetBtn: $.proxy(Smartwaternet.clickResetBtn, Smartwaternet)
        };

        //画出所有要素以后所返回的对应的地图对象
        function getFeatureList(features) {
            featureList = features;
        }

        //点定位callback
        function getLocatedPoint(point) {
            lastLoactePoint = point;
        }

        function openPanal(data) {
        	var dat=data;
            var radio = 0.98;
            var height = Math.ceil($("#desktop-map").height() * radio) - 8;
            var top = 75;
            var left = 41;
            var title = data.czmc;
            common.openDialogPanal("view/app/watermap/topic/smartwaternet/smartwaternetdetail", title,data, 500, 380,top,left);
        }
        Smartwaternet.init();
        return modal;
    });