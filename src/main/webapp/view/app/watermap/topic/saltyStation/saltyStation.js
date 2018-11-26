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
        var Reservoir = {
            init: function () {
                var that = this;
                composition.addBindingHandler("saltyInitHandler", {
                    init: function (dom) {
                        that.isMaxShow = false;
                        panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onMaxShow = function () {
                            that.isMaxShow = !that.isMaxShow;
                            if (that.isMaxShow) {
                                $('#reservoir-flow-chart-b').show();
                                $('#reservoir-flow-chart').hide();
                            } else {
                                $('#reservoir-flow-chart-b').hide();
                                $('#reservoir-flow-chart').show();
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
                this.originalCurPage = 1;
                this.originalPerPageCount = 10;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
            },
            initTableColumns: function () {
                var that = this;
                var columns = [
                               {
                                   id: "zm",
                                   text: "站点",
                                   datafield: "zm",
                                   width: ($(window).width()) * 0.1 + "px",
                                   align: "center",
                                   cellsalign: "center"
                               },
                               {
                                   id: "chloride",
                                   text: "氯化物[mg/L]",
                                   datafield: "chloride",
                                   width: ($(window).width()) * 0.1 + "px",
                                   align: "center",
                                   cellsalign: "center"
                               }, {
                                   id: "temperature",
                                   text: "水温[°C]",
                                   datafield: "temperature",
                                   width: ($(window).width()) * 0.05 + "px",
                                   align: "center",
                                   cellsalign: "center"
                               }, {
                                   id: "conductivity",
                                   text: "电导率[mS/cm]",
                                   datafield: "conductivity",
                                   width: ($(window).width()) * 0.1 + "px",
                                   align: "center",
                                   cellsalign: "center"
                               }, {
                                   id: "salinity",
                                   text: "盐度[ppt]",
                                   datafield: "salinity",
                                   width: ($(window).width()) * 0.05 + "px",
                                   align: "center",
                                   cellsalign: "center"
                               },{
                                   id: "DO",
                                   text: "溶解氧 [mg/L]",
                                   datafield: "DO",
                                   width: ($(window).width()) * 0.1 + "px",
                                   align: "center",
                                   cellsalign: "center"
                               },{
                                   id: "sw",
                                   text: "水位[m]",
                                   datafield: "sw",
                                   width: ($(window).width()) * 0.05 + "px",
                                   align: "center",
                                   cellsalign: "center"
                               },{
                                   id: "PH",
                                   text: "PH值[l]",
                                   datafield: "PH",
                                   width: ($(window).width()) * 0.05 + "px",
                                   align: "center",
                                   cellsalign: "center"
                               },{
                                   id: "turbidity",
                                   text: "浊度 [NTU]",
                                   datafield: "turbidity",
                                   width: ($(window).width()) * 0.1 + "px",
                                   align: "center",
                                   cellsalign: "center"
                               },{
                                   id: "address",
                                   text: "所在地",
                                   datafield: "address",
                                   width: ($(window).width()) * 0.25 + "px",
                                   align: "center",
                                   cellsalign: "center"
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
                $("#reserviorList-b").jqxGrid({
                    width: $(window).width() * 0.96,
                    height: "100%",
                    source: dataAdapter,
                    // theme: 'energyblue',
                    rowsheight: 35,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columnsDisplay
                });

                columns = [
                           {
                               id: "zm",
                               text: "站点",
                               datafield: "zm",
                               width: 100,
                               align: "center",
                               cellsalign: "center"
                           }, {
                               id: "xzq",
                               text: "行政区",
                               datafield: "xzq",
                               width: 100,
                               align: "center",
                               cellsalign: "center"
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
                $("#reserviorList").jqxGrid({
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
                $('#reserviorList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    var id = dataObj.rowId;//暂时用rowId
                    var currentFeature = pointObj["feature_"+id];
                    currentFeature.style = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/info_locat.gif","iconSize":[16,16]};
                    map._mapInterface.layerLocate(currentFeature, Reservoir.openPanal);
                });
            },
            loadReservoirList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;

                this.gridDataSource.localdata = tableData;
                $("#reserviorList").jqxGrid({
                    source: this.gridDataSource
                });

                this.gridDataSourceBig.localdata = tableData;
                $("#reserviorList-b").jqxGrid({
                    source: this.gridDataSourceBig
                });
            },
            getListData: function () {
                var that = this;
                var h = http.getInstance("data/saltySation.json");
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
                    //先清除上一次查询地图上面的所有点
                    // if(pointObj){
                    //     for(var i in pointObj){
                    //         map.removeLayer(pointObj[i]);
                    //     }
                    // }
                    
                    //先清除上一次查询地图上面的所有点
                    if(auGurit.global.mapLayers["咸情测站"]) {
                        var prePointObject = auGurit.global.mapLayers["咸情测站"];
                        if (prePointObject) {
                            for (var i in prePointObject) {
                                map.removeLayer(prePointObject[i]);
                            }
                        }     
                    }

                    that.addFeatures(result.list);

                    auGurit.global.mapLayers["咸情测站"] = pointObj;

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
                    var style = {
                            iconUrl: auGurit.global.rootPath + "/style/asip/common/css/images/icon/xianqing.png",
                            iconSize: [20,20]
                        };
                    feature.styleSelected = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/info_locat.gif","iconSize":[20,20]};
                    feature.tipContent = data[i].zm;
                    feature.style = style;
                    //暂时用rowId
                    features["feature_"+data[i].rowId] = feature;
                };
                //定位
                pointObj = map._mapInterface.addFeature(features,Reservoir.openPanal);
            },
            //根据降水位不同在确定地图上面定位的点的样式
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
                                $('#reservoirName').val(that.zm);
                                $('#district').val(that.xzq);
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
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
                $('#district').val('');
                $('#reservoirName').val('');
                $('#district-b').val('');
                $('#reservoirName-b').val('');
            },
            initEvent: function () {
                $('#district').change(function () {
                    $('#district-b').val($(this).val());
                });
                $('#reservoirName').change(function () {
                    $('#reservoirName-b').val($(this).val());
                });

                $('#district-b').change(function () {
                    $('#district').val($(this).val());
                });
                $('#reservoirName-b').change(function () {
                    $('#reservoirName').val($(this).val());
                });
            },
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="reservoir_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            openPanal: function(data) {
            	//还原其他图标图标
            	for(var i in pointObj) {
            		if(pointObj[i] != data) {
            			var otherLocateFeature = pointObj[i]; 
                    	otherLocateFeature.style = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/xianqing.png","iconSize":[20,20]};
                    	map._mapInterface.setFeatureStyle(otherLocateFeature);
            		}
            	}
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                var top = data.containerPoint.y;
                var left = data.containerPoint.x;
                var title = data.features.properties.zm;
                common.openDialogPanal("view/app/watermap/topic/saltyStation/saltyDetail", title, data.features.properties, 600, 450, 75, 41);
            }
        };

        var modal = {
            clickSearchBtn: $.proxy(Reservoir.clickSearchBtn, Reservoir),
            clickResetBtn: $.proxy(Reservoir.clickResetBtn, Reservoir)
        };

        //画出所有要素以后所返回的对应的地图对象
        function getFeatureList(features) {
            featureList = features;
        }

        //点定位callback
        function getLocatedPoint(point) {
            lastLoactePoint = point;
        }
        
        Reservoir.init();
        return modal;
    });