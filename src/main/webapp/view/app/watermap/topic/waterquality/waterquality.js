define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager, echarts) {
		var map = $("#desktop-main-map")[0].contentWindow.map;
        var pointObject;
        var panalObj;
        //var lastRowId;//上次次点击的行的id
        var features = {};//所有要素对象
        //var map;//地图对象
        var Drainagenetwork = {
            init: function () {
                var that = this;
                composition.addBindingHandler("waterqualityInitHandler", {
                    init: function (dom) {
                    	panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onMaxShow = function () {
                        };
                        panalObj.settings.onClose = function(){
                            // if(pointObject){
                            //     for(var i in pointObject){
                            //         map.removeLayer(pointObject[i]);
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
                that.getListData();
            },
            bindUI: function () {
                var that = this;
            },
            //初始化分页参数
            initPage: function (modal) {
                this.originalCurPage = 1;
                this.originalPerPageCount = 15;
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
                        id: "jcdmc",
                        text: "监测点",
                        datafield: "jcdmc",
                        width: "28%",
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "xzq",
                        text: "所在区域",
                        datafield: "xzq",
                        width: "28%",
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "szzt",
                        text: "水质状态",
                        datafield: "szzt",
                        width: "28%",
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
                that.gridDataSource = {};
                gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };

                var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
                $("#reserviorList").jqxGrid({
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
                //为表格增加一个cell单击事件,只对定位图标的cell有效
                $("#reserviorList").on('rowclick', function (event) {
                        //alert('定位');
	                    //行数据
	                    var dataObj = event.args.row.bounddata;
	                    //点击的行主键
	                    var id = dataObj.rowId;
	                    var currentFeature = pointObject["feature_"+id];
	                    currentFeature.style = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/info_locat.gif","iconSize":[20,20]};
	                    //上一次点击的行
	                    /*if(lastRowId && lastRowId != id) {
	                    	alert(lastRowId);
	                    	//debugger();
	                    	var lastLocateFeature = pointObject["feature_"+lastRowId]; 
	                    	lastLocateFeature.style = {"iconUrl":auGurit.global.rootPath+"/view/app/common/reservior/point_15px_jsd.png","iconSize":[20,20]};
	                    	map._mapInterface.setFeatureStyle(lastLocateFeature);
	                    } */
	                    //保存这次点击行的id
	                    //lastRowId = id;
	                    //画点
	                    map._mapInterface.layerLocate(currentFeature, Drainagenetwork.openPanal);
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
                var h = http.getInstance("data/waterquality.json");
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
                    that.addFeatures();
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
            //加载地图时定位点
            
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
            addFeatures:function(){
            	var tableData = $('#reserviorList').jqxGrid('getrows');
                for(var i=0;i<tableData.length;i++){
                    var feature = {};
                    feature.geometry = "POINT ("+tableData[i].x+" "+tableData[i].y+")";
                    feature.properties = tableData[i];
                    //雨量
                    var style= {
                            "iconUrl":auGurit.global.rootPath + "/view/app/common/reservior/waterquality.png",
                            "iconSize": [30, 30]
                        };
                    feature.styleSelected = {"iconUrl":auGurit.global.rootPath+"/style/asip/common/css/images/icon/info_locat.gif","iconSize":[20,20]};
                    feature.style = style;
                    feature.tipContent = tableData[i].jcdmc;
                    //features.push(feature);
                    features["feature_"+tableData[i].rowId]=feature;
                };
                pointObject = map._mapInterface.addFeature(features,Drainagenetwork.openPanal);
            },
          //打开监测点详细,还原上一个点的样式
            openPanal: function(data) {
            	//还原其他图标图标
            	for(var i in pointObject) {
            		if(pointObject[i] != data) {
            			var otherLocateFeature = pointObject[i]; 
                    	otherLocateFeature.style = {"iconUrl":auGurit.global.rootPath+"/view/app/common/reservior/waterquality.png","iconSize":[30,30]};
                    	map._mapInterface.setFeatureStyle(otherLocateFeature);
            		}
            	}
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                var top = data.containerPoint.y;
                var left = data.containerPoint.x;
                //var top = 75;
                //var left = 41;
                var title = data.features.properties.jcdmc;
                common.openDialogPanal("view/app/watermap/topic/waterquality/testFile", title, data.features.properties, 610, 400,75,41);
            }
        };

        var modal = {
            clickSearchBtn: $.proxy(Drainagenetwork.clickSearchBtn, Drainagenetwork),
            clickResetBtn: $.proxy(Drainagenetwork.clickResetBtn, Drainagenetwork)
        };
        

        Drainagenetwork.init();
        return modal;
    });