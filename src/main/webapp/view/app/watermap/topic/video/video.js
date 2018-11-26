define(["jquery","layer", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, layer,app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map;
        var dataList;
        var searchDataList;
        var video = {
            init: function () {
                var that = this;
                composition.addBindingHandler("videoInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
						that.mapLayerTitle = modal._$_param.title;
                        that.renderUI();
                        that.bindUI();
                        that.initLayout();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
                var runId = modal._$_param.panelId;
                var that = this;
                panalObj.addEvent(runId, "onMaxShow", function (e) {  
                    that.initLayout();
                });
                panalObj.addEvent(runId, "onMinShow", function (e) {
                    that.initLayout();
                });

            },
            bindUI: function () {
                var that = this;
		        map = $("#desktop-main-map")[0].contentWindow.map;
                that.initPage(modal);
                that.clearInput();
                that.initTableColumns();
                that.initMapData();
                that.initListData(); 
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
                this._maxColumns = [];
                this._normalColumns = [];
            },
            initTableColumns: function () {
                var that = this;
                that._normalColumns = [
                    {
                        id: "objectid",
                        text: "id",
                        datafield: "objectid",
                        type:"string",
                        hidden:true
                    },{
                        id: "id",
                        text: "摄像机编号",
                        datafield: "id",
                        type:"string",
                        hidden:true
                    },{
                        id: "x",
                        text: "经度",
                        datafield: "x",
                        type:"string",
                        hidden:true
                    },{
                        id: "y",
                        text: "纬度",
                        datafield: "y",
                        type:"string",
                        hidden:true
                    },{
                        id: "mc",
                        text: "摄像机名称",
                        datafield: "mc",
                        width: "75%",
                        align: "center",
                        type:"string",
                        cellsalign: "left"
                    },
                    {
                        id: "type",
                        text: "摄像机类型",
                        datafield: "type",
                        width: "25%",
                        align: "center",
                        type:"string",
                        cellsalign: "center"
                    }
                ];
                
                that._maxColumns = [
                                       {
                                           id: "objectid",
                                           text: "id",
                                           datafield: "objectid",
                                           type:"string",
                                           hidden:true
                                       },{
                                           id: "x",
                                           text: "经度",
                                           datafield: "x",
                                           type:"string",
                                           hidden:true
                                       },{
                                           id: "y",
                                           text: "纬度",
                                           datafield: "y",
                                           type:"string",
                                           hidden:true
                                       },{
                                           id: "mc",
                                           text: "摄像机名称",
                                           datafield: "mc",
                                           width: "50%",
                                           align: "center",
                                           type:"string",
                                           cellsalign: "left"
                                       },{
                                    	   id: "id",
                                           text: "摄像机编号",
                                           datafield: "id",
                                           width: "25%",
                                           align: "center",
                                           type:"string",
                                           cellsalign: "center"
                                       },
                                       {
                                           id: "type",
                                           text: "摄像机类型",
                                           datafield: "type",
                                           width: "25%",
                                           align: "center",
                                           type:"string",
                                           cellsalign: "center"
                                       }
                                   ];                
                that.initLayout();
            },
            initMapData: function () {//初始化地图数据
                var that = this;
                var requestParams = that._param;
                requestParams.mc =modal.search().mc();
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                http.getInstance("/subject/queryVideoPage", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.dataList=result.list;
                    that.queryLayerObjects("0");  
                });
            },
            initListData: function () {
                var that = this;

                var requestParams = that._param;
                requestParams.mc=modal.search().mc();
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;

                $('#videoList').jqxGrid('showloadelement');
                var h = http.getInstance("subject/queryVideoPage", {type: "post"});
                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    dataList=result.list;
                    that._data = data;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };
                    that.setListData();
                    if(modal.search().mc()!=''){
                        that.clickSearchByNameBtn();
                    }
                    $('#videoList').jqxGrid('hideloadelement');                        
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (that._data && that._pageInfo.totalPage >= 1) {
                    $("#videoListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#videoListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                                        
                }
                that.loadListData(dataList);
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
            queryLayerObjects: function (_layerTable,callback) {
                var that=this;
                that.lastLayerTable=_layerTable;
                var layerOption = {
                    url:auGurit.global.mapTopLayers[that.mapLayerTitle]["serviceUrl"],
                    layerTable: _layerTable,
                    where: "1=" + 1,
                    opacity: 1
                };
                map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
                    if(featureCollection){
                        that.addFeatures(that.dataList);
                    }
                });                
            },
            addFeatures: function (data) {
                var that = this;  
                //先清除上一次查询地图上面的所有点
                map._mapInterface.layerFeature.clearLayers();
                mapUtils.removeGlobalMapLayers(that.mapLayerTitle);
                if(!data) return;
                var features = {};
                for (var i = 0; i < data.length; i++) {
                    features["feature_" + data[i].id] = that.getFeature(data[i]);
                }
                var layerGroup= map._mapInterface.IntelligenceLabel(features, function (params) {
                    that.openPanel(params.features.properties);
                });
                auGurit.global.mapLayers[that.mapLayerTitle] = layerGroup;           
            },
            getFeature:function(data){
                var that=this;
                var _feature = {};
                _feature.geometry = "POINT (" + data.x + " " + data.y + ")";
                _feature.properties = data;
                _feature.style = that.getDefaultStyle();
                _feature.styleSelected =that.getDefaultStyle();
                _feature.styleSelected.className='_selected';
                _feature.coor = [data.x,data.y];
                var label = {text: that.getText(data), font: null, color:null};
                _feature.label = label;
                _feature.feature=_feature;
                return _feature;
            },
            getText:function(dataObj){
                var textArr=[];
                textArr.push(dataObj.mc);

                return textArr;
            },
            getDefaultStyle:function(){
                var style={"iconUrl": auGurit.global.rootPath + "style/asip/common/css/images/icon/video.png",
                        "iconSize": [16, 16]}
                return style;
            },
            loadListData: function (_dataList) {
                var that=this;
                var tableData = [];
                if (_dataList){
                    tableData = _dataList;
                }
                that.dataList=_dataList;
                that.setListPage(tableData);
                that.gridDataSource.localdata = tableData;
                $("#videoList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            getDataByDataList:function (){//maxt
                var that = this;
                searchDataList=new Array();
                var searchValue=modal.search().mc();//$("#wasStationName").val();
                if(searchValue==''){
                	layer.msg("请输入摄像机名称", {time:3000});
                    return;
                }
                if(!dataList) return;
                for (var i = 0; i < dataList.length; i++) {
                    var item = dataList[i];
                    if (item.mc.indexOf(searchValue) > -1 || item.mc.indexOf(searchValue) > -1) {
                        searchDataList.push(item);
                    }
                }
                that.loadListData(searchDataList);//jxq列表数据
            },
            clearInput:function(){
                modal.search().mc("");
            },
            clickSearchByNameBtn: function () {//maxt
                var that = this;          
                that.getDataByDataList();                
            },
            clickClearSearchBtn:function () {
                var that=this;
                map._mapInterface.layerFeature.clearLayers();
                modal.search().mc("");
                that.loadListData(dataList);//jxq列表数据
            },
            openPanel:function(param) {
                var top = 75;
                var left = 41;
                var title = param.mc;                            
                // common.openDialogPanalPop("view/app/watermap/topic/video/videoDetail", title,param,600, 480, top, left);
                layer.msg("此功能正在开发中...", {time:3000});
            },
            initLayout:function(){
            	var that=this;
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#videoList").jqxGrid({
                    	width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#videoList").jqxGrid({
                    	width: '100%'
                    });
                }
                     
                
                var columns = panalObj.getSizeState() == "max" ? that._maxColumns : that._normalColumns;
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield,type: columns[i].type});
                }
                that.gridDataSource = {
                    localdata: that.dataList || [],
                    datafields: datadatafields,
                    datatype: "array"
                };
                var topHeight=(panalObj.getSizeState() == "max" ? 184 : 212);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight+55;
                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#videoList").jqxGrid({
                	// width: '100%',
                    height: jqHeight,
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    columnsheight: 35,
                    selectionmode: 'singlerow',
                    columns: columns
                });
                //为表格增加一个cell单击事件,只对定位图标的cell有效
                $('#videoList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    that.openPanel(dataObj);
                    var newFeature=that.getFeature(dataObj);
                    newFeature.style = newFeature.styleSelected;
                    map._mapInterface._singleIntelligenceLabel(newFeature,function (params) {
                        that.openPanel(params.features.properties);
                    });
                });
            } 
        }

        var modal = {
            search: ko.observable({
                mc:ko.observable("")
            }),
            clickSearchByNameBtn: $.proxy(video.clickSearchByNameBtn, video),
            clickClearSearchBtn: $.proxy(video.clickClearSearchBtn, video)
        };  

        video.init();
        return modal;
    });