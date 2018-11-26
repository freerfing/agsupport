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
        var Waterremotedetect = {
            init: function () {
                var that = this;
                composition.addBindingHandler("waterremotedetectInitHandler", {
                    init: function (dom) {
                        that.isMaxShow = false;
                        panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onMaxShow = function () {
                            that.isMaxShow = !that.isMaxShow;
                            if (that.isMaxShow) {
                                $('#waterremotedetect-flow-chart-b').show();
                                $('#waterremotedetect-flow-chart').hide();
                            } else {
                                $('#waterremotedetect-flow-chart-b').hide();
                                $('#waterremotedetect-flow-chart').show();
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
                that.initPage(modal);
                that.initTableColumns();
                that.initEvent();
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
                        id: "qh",
                        text: "区号",
                        datafield: "qh",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                    },
                    {
                        id: "zh",
                        text: "站号",
                        datafield: "zh",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                    },
                    {
                        id: "zm",
                        text: "站名",
                        datafield: "zm",
                        width: ($(window).width()) * 0.05 + "px",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "jczb",
                        text: "监测指标",
                        datafield: "jczb",
                        width: ($(window).width()) * 0.23 + "px",
                        align: "center",
                        cellsalign: "center",
                    }, {
                        id: "code12",
                        text: "CODE12",
                        datafield: "code12",
                        width: ($(window).width()) * 0.05 + "px",
                        align: "center",
                        cellsalign: "center",
                    },{
                        id: "hs",
                        text: "核实",
                        datafield: "hs",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                    },{
                        id: "azdz",
                        text: "安装地址",
                        datafield: "azdz",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                    },{
                        id: "ssxt",
                        text: "所属系统",
                        datafield: "ssxt",
                        width: ($(window).width()) * 0.05 + "px",
                        align: "center",
                        cellsalign: "center",
                    },{
                        id: "sm",
                        text: "说明",
                        datafield: "sm",
                        width: ($(window).width()) * 0.05 + "px",
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
                $("#waterremotedetectList-b").jqxGrid({
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
                        id: "zm",
                        text: "站名",
                        datafield: "zm",
                        width: 100,
                        align: "center",
                        cellsalign: "center",
                    }, {
                        id: "qh",
                        text: "区号",
                        datafield: "qh",
                        width: 100,
                        align: "center",
                        cellsalign: "center",
                    }, {
                        id: "jczb",
                        text: "监测指标",
                        datafield: "jczb",
                        width: 100,
                        align: "center",
                        cellsalign: "center",
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
                $("#waterremotedetectList").jqxGrid({
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
                $('#waterremotedetectList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    var id = dataObj.rowId;//暂时用rowId
                    var currentFeature = pointObj["feature_"+id];
                    currentFeature.style = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/info_locat.gif","iconSize":[16,16]};
                    map._mapInterface.layerLocate(currentFeature, that.callbackRestoreStyle);
                    openPanal(dataObj);
                });
            },
            loadWaterremotedetectList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;

                this.gridDataSource.localdata = tableData;
                $("#waterremotedetectList").jqxGrid({
                    source: this.gridDataSource
                });

                this.gridDataSourceBig.localdata = tableData;
                $("#waterremotedetectList-b").jqxGrid({
                    source: this.gridDataSourceBig
                });
            },
            getListData: function () {
                var that = this;
                var h = http.getInstance("subject/waterremotedetect");
                var requestParams = that._param;
                requestParams.zm = $('#waterremotedetectName').val();
                requestParams.xzq = $('#district').val();

                var chk_value = new Array();
                $('input[name="waterremotedetect_Fruit"]:checked').each(function () {
                    chk_value.push($(this).val());
                });

                requestParams.zl = chk_value.toString();

                that.zm = $('#waterremotedetectName').val();
                that.xzq = $('#district').val();
                that.skgn = $('#waterremotedetectFun').val();
                that.zl = chk_value.toString();

                $('#waterremotedetectName-b').val(that.zm);
                $('#district-b').val(that.xzq);
                $('#waterremotedetectFun-b').val(that.skgn);

                $('input[name="waterremotedetect_Fruit_b"]').each(function () {
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
                    if(auGurit.global.mapLayers["水文遥测站"]) {
                        var prePointObject = auGurit.global.mapLayers["水文遥测站"];
                        if (prePointObject) {
                            for (var i in prePointObject) {
                                map.removeLayer(prePointObject[i]);
                            }
                        }     
                    }


                    that.addFeatures(result.list);

                    auGurit.global.mapLayers["水文遥测站"] = pointObj;
                    
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
                    feature.tipContent = data[i].zm;
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
                        otherLocateFeature.style = Waterremotedetect.locationStyle(pointObj[i].features.properties);
                        map._mapInterface.setFeatureStyle(otherLocateFeature);
                    }
                }
            },
            //根据降水位不同在确定地图上面定位的点的样式
            locationStyle: function (rowData) {
                var style
                 = {
                    	iconUrl:auGurit.global.rootPath + "/view/app/common/waterremotedetect/waterremotedetect.png",
                        iconSize: [25, 25]
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
                                $('#waterremotedetectName').val(that.czmc);
                                $('#district').val(that.xzq);
                                $('#waterremotedetectFun').val(that.skgn);

                                $('input[name="waterremotedetect_Fruit"]').each(function () {
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
                that.loadWaterremotedetectList();
            },
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
                $('#district').val('');
                $('#waterremotedetectName').val('');
                $('#waterremotedetectFun').val('');
                $('input[name="waterremotedetect_Fruit"]').prop('checked', true);
                $('#district-b').val('');
                $('#waterremotedetectName-b').val('');
                $('#waterremotedetectFun-b').val('');
                $('input[name="waterremotedetect_Fruit_b"]').prop('checked', true);
            },
            initEvent: function () {
                $('#district').change(function () {
                    $('#district-b').val($(this).val());
                });
                $('#waterremotedetectName').change(function () {
                    $('#waterremotedetectName-b').val($(this).val());
                });
                $('#waterremotedetectFun').change(function () {
                    $('#waterremotedetectFun-b').val($(this).val());
                });
                $("input[name='waterremotedetect_Fruit']").change(function () {
                    var chk_value = new Array();
                    $('input[name="waterremotedetect_Fruit"]:checked').each(function () {
                        chk_value.push($(this).val());
                    });
                    var chk_value_str = chk_value.toString();
                    $('input[name="waterremotedetect_Fruit_b"]').each(function () {
                        $(this).removeAttr('checked');
                        var s = $(this).val();
                        if (chk_value_str.indexOf(s) > -1)
                            $(this).prop('checked', 'true');
                    });
                });

                $('#district-b').change(function () {
                    $('#district').val($(this).val());
                });
                $('#waterremotedetectName-b').change(function () {
                    $('#waterremotedetectName').val($(this).val());
                });
                $('#waterremotedetectFun-b').change(function () {
                    $('#waterremotedetectFun').val($(this).val());
                });
                $("input[name='waterremotedetect_Fruit_b']").change(function () {
                    var chk_value = new Array();
                    $('input[name="waterremotedetect_Fruit_b"]:checked').each(function () {
                        chk_value.push($(this).val());
                    });
                    var chk_value_str = chk_value.toString();
                    $('input[name="waterremotedetect_Fruit"]').each(function () {
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
                if (parseFloat(data.sw) >= parseFloat(data.jjsw))
                    $cellHtml.css('color', 'red');
                return $cellHtml[0].outerHTML;
            },
            waterLevelFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                var $icon;
                var $font = $('<div class="waterremotedetect_font">' + $cellHtml.text() + '</div>');
                if (parseFloat(data.sw) >= parseFloat(data.jjsw)) {
                    $cellHtml.css('color', 'red');
                    switch (data.ksss) {
                        case '4':
                            $icon = $('<div class="waterremotedetect_icon_down_red"></div>');
                            break;
                        case '5':
                            $icon = $('<div class="waterremotedetect_icon_up_red"></div>');
                            break;
                        default:
                            $icon = $('<div class="waterremotedetect_icon_same_red"></div>');
                            break;
                    }
                } else {
                    switch (data.ksss) {
                        case '4':
                            $icon = $('<div class="waterremotedetect_icon_down_blue"></div>');
                            break;
                        case '5':
                            $icon = $('<div class="waterremotedetect_icon_up_blue"></div>');
                            break;
                        default:
                            $icon = $('<div class="waterremotedetect_icon_same_blue"></div>');
                            break;
                    }
                }
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
            clickSearchBtn: $.proxy(Waterremotedetect.clickSearchBtn, Waterremotedetect),
            clickResetBtn: $.proxy(Waterremotedetect.clickResetBtn, Waterremotedetect)
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
            var title = data.zm;
            common.openDialogPanal("view/app/watermap/topic/waterremotedetect/waterremotedetectdetail", title,data, 500, 380,top,left);
        }
        Waterremotedetect.init();
        return modal;
    });