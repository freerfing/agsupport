define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map;
        var dataList;
        var Drainagenetwork = {
            init: function () {
                var that = this;
                composition.addBindingHandler("drainagenetworkInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle=modal._$_param.title;
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
                // var h = http.getInstance("data/district.json");
                // h.ajax().then(function (result) {
                //     modal.search().xzqList(result);
                // });
                that.initEvent();
                that.initPage(modal);
                that.clearInput();
                that.initTableColumns();
                that.initMapData();
                that.initListData();
            },
            initEvent:function(){
                var that = this;
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
            initTableColumns: function () {
                var that = this;
                var columns = [
                     {
                        id: "stnm",
                        text: "管网名称",
                        datafield: "stnm",
						width: 80,
                        align: "center",
                        cellsalign: "center"
                    }, {
                        id: "wnpre",
                        text: "水位(m)",
                        datafield: "z",
                        width: 75,
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2'
                    },{
                        id: "stsys",
                        text: "数据来源",
                        datafield: "stsys",
                        width: 160,
                        align: "center",
                        cellsalign: "center"
                    },{
						id: "tm",
						text: "采集时间",
						datafield: "tm",
						width: 120,
						align: "center",
						cellsalign: "center",
						cellsrenderer: that.dateFormatter
					}];
                that.gridDataSource = {
                    localdata: [],
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
                    selectionmode: 'singlerow',
                    columns: columns
                });
                $("#drainagenetworkList").on("rowclick", function (event) {
                    var dataObj = event.args.row.bounddata;
                    // that.openPanel(dataObj);
                    var newFeature=that.getFeature(dataObj);
                    newFeature.style = newFeature.styleSelected;          
                    map._mapInterface._singleIntelligenceLabel(newFeature,function (params) {
                        that.openPanel(params.features.properties);
                    });
                });
            },
            dateFormatter: function (row, columnfield, value,defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var date=value.substring(2);
                var date=date.substring(0, date.length-3);
                $cellHtml.empty();
                $cellHtml.append(date.replace(/-/g,"/"));
                return $cellHtml[0].outerHTML;
            },
            //加载表格数据
            loadListData: function (_dataList) {
                var that=this;
                var tableData = [];
                if (_dataList){
                    tableData =_dataList;
                }
                that.setListPage(tableData);
                that.gridDataSource.localdata = tableData;
                $("#drainagenetworkList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            initMapData: function () {//初始化地图数据
                var that = this;
                var requestParams = that._param;
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                requestParams.xzq="";
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                http.getInstance("/subject/listStConduitchB", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.addFeatures(result.list);
                });
            },
            initListData: function () {
                var that = this;

                var requestParams = that._param;
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                requestParams.stnm = modal.search().stnm();//$('#drainagenetwork_stnm').val();
                requestParams.xzq = modal.search().xzq();

                $('#drainagenetworkList').jqxGrid('showloadelement');
                var h = http.getInstance("subject/listStConduitchB", {type: "post"});
                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    that._data = data;
		            dataList=result.list;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };
                    that.setListData();
                    if(modal.search().stnm()!=''){
                        that.clickSearchByNameBtn();
                    }
                    $('#drainagenetworkList').jqxGrid('hideloadelement');                  
                });
            },
            //初始化分页组件的实例,为加载表格数据作准备
            setListData: function () {
                var that = this;
                //处理分页
                if (dataList && that._pageInfo.totalPage >= 1) {
                    $("#drainagenetworkListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#drainagenetworkListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;

                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    // $("#drainagenetworkListPager").css("display", "none");
                    // $(".list-datagroup-content").css("bottom", 0);
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
            //初始化定位表格中所有数据的位置
            addFeatures: function (data) {
                var that=this;
                //先清除上一次查询地图上面的所有点
                map._mapInterface.layerFeature.clearLayers();
                mapUtils.removeGlobalMapLayers(that.mapLayerTitle);
                if(!data) return;
                var features={};
                for(var i=0; i<data.length; i++) {
                    features["feature_"+data[i].stcd] = that.getFeature(data[i]);
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
                var label = {text: that.getText(data), font: null};
                _feature.label = label;
                _feature.feature=_feature;
                return _feature;
            },
            getText:function(dataObj){
                var textArr=[];
                textArr.push(dataObj.stnm);
                if(dataObj.z&&dataObj.z!="无监测值")
                    textArr.push(Number(dataObj.z).toFixed(2));
                return textArr;
            },
	        getDefaultStyle:function(){
                var style={
                        "iconUrl": auGurit.global.rootPath + "/view/app/common/reservior/paishuiguan.png",
                        "iconSize": [10, 10]
                    };
                return style;
            },//查询按钮事件
            getDataByDataList:function (){//maxt
                var that = this;
                searchDataList=new Array();
                var searchValue=modal.search().stnm();//$("#drainagenetwork_stnm").val();
                if(searchValue==''){
                    alert("请输入站名/站号");
                    return;
                }
                if(!dataList) return;
                for (var i = 0; i < dataList.length; i++) {
                    var item = dataList[i];
                    if (item.stnm.indexOf(searchValue) > -1 || item.stcd.indexOf(searchValue) > -1) {
                        searchDataList.push(item);
                    }
                }
                that.loadListData(searchDataList);//jxq列表数据
            },
            clearInput:function(){
                var nowStr=common.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
                modal.search().date(nowStr);
                modal.search().sdate(common.getPastDate(nowStr,7));

                modal.search().stnm("");
                modal.search().xzq("");
            },
            clickSearchBtn: function () {
                var that = this;
                that.initMapData();
                that.initListData();
            },
            clickXZQBtn: function () {
                var that = this;
                that.initListData();
            },
            clickResetBtn: function () {
                var that = this;
                that._param.curPage = that.originalCurPage;
                that._param.perPageCount = that.originalPerPageCount;
                map._mapInterface.layerFeature.clearLayers();
                that.clearInput(); 
                that.initListData();
                that.initMapData();
            },
            clickSearchByNameBtn: function () {//maxt
                var that = this;           
                that.getDataByDataList();                
            },
            clickClearSearchBtn:function () {
                var that=this;
                map._mapInterface.layerFeature.clearLayers();
                modal.search().stnm("");
                that.loadListData(dataList);//jxq列表数据
            },
            clickDate:function(){
                var that=this;
                WdatePicker({ 
                    onpicked: function (dp) {
                        modal.search().date(dp.cal.getNewDateStr());
                        modal.search().sdate(common.getPastDate(dp.cal.getNewDateStr(),7));
                        that.initListData();
                        that.initMapData();
                    },
                    readOnly: true,
                    maxDate: "%y-%M-%d"
                });  
            },
            openPanel:function(data) {
                var that=this;
                var height = 480;
                var top = 75;
                var left = 45;
                var width = 600;
                var title = '排水管网——' + data.stnm;
                data.date=modal.search().date();
                common.openDialogPanalPop("view/app/watermap/topic/drainagenetwork/drainagedetail", title, data, width, height, top, left);
            },
            initLayout:function(){
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
                    $("#drainagenetworkList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#drainagenetworkList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 154 : 212);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#drainagenetworkList").jqxGrid({
                  //  width: '100%',
                    height: jqHeight
                });
            } 
        };

        var modal = {
            search: ko.observable({
                stnm:ko.observable(""),
                date:ko.observable(""),
                sdate:ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([{"value":"","title":"全部"},{"value":440103,"title":"荔湾区"},{"value":440104,"title":"越秀区"},{"value":440105,"title":"海珠区"},{"value":440106,"title":"天河区"},{"value":440111,"title":"白云区"},{"value":440112,"title":"黄埔区"},{"value":440113,"title":"番禺区"},{"value":440114,"title":"花都区"},{"value":440115,"title":"南沙区"},{"value":440116,"title":"萝岗区"},{"value":440199,"title":"北江区"},{"value":440183,"title":"增城区"},{"value":440184,"title":"从化区"}])
            }),
            clickDate:$.proxy(Drainagenetwork.clickDate, Drainagenetwork),
            clickSearchBtn: $.proxy(Drainagenetwork.clickSearchBtn, Drainagenetwork),
            clickResetBtn: $.proxy(Drainagenetwork.clickResetBtn, Drainagenetwork),
	        clickSearchByNameBtn: $.proxy(Drainagenetwork.clickSearchByNameBtn, Drainagenetwork),
            clickClearSearchBtn: $.proxy(Drainagenetwork.clickClearSearchBtn, Drainagenetwork),
            clickXZQBtn: $.proxy(Drainagenetwork.clickXZQBtn, Drainagenetwork)
        };
        Drainagenetwork.init();
        return modal;
    });