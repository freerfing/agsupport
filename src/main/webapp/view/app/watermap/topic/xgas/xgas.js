define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var map;//地图对象
        var dataList;
        var panalObj;
        var searchDataList;
        var Xgas = {
            init: function () {
                var that = this;
                composition.addBindingHandler("xgasInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle = modal._$_param.title;
                        that.bindUI();
                        that.renderUI();
                        that.initLayout();
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
                this.originalPerPageCount = 100;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
            },
            clearInput:function(){
                var nowStr=common.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
                modal.search().date(nowStr);
                modal.search().sdate(common.getPastDate(nowStr,3));
                modal.search().stcdnm("");
            },
            initTableColumns: function () {
                var that = this;
                var columns = [
                    {
                        id: "devid",
                        text: "设备ID",
                        datafield: "devid",
                        width: 160,
                        type:'string',
                        hidden: true
                    },
                    {
                        id: "sno",
                        text: "测站ID",
                        width: 65,
                        datafield: "sno",
                        type:'string',
                        hidden: true
                    },
                    {
                        id: "sname",
                        text: "测站名称",
                        width: 160,
                        datafield: "sname",
                        type:'string'
                    },
                    {
                        id: "o2",
                        text: "氧气（%）",
                        datafield: "o2",
                        width: 120,
                        type:'string'
                    },
                    {
                        id: "co",
                        text: "一氧化碳（ppm）",
                        datafield: "co",
                        type:'string',
                        width: 120
                    },
                    {
                        id: "h2s",
                        text: "硫化氢（ppm）",
                        datafield: "h2s",
                        width: 120,
                        type:'string'
                    },
                    {
                        id: "nh3",
                        text: "氨气（ppm）",
                        width: 120,
                        datafield: "nh3",
                        type:'string'
                    },
                    {
                        id: "ch4",
                        text: "甲烷（%LEL）",
                        width: 120,
                        datafield: "ch4",
                        type:'string'
                    },
                    {
                        id: "bat",
                        text: "电池电压（V）",
                        width: 120,
                        datafield: "bat",
                        type: 'string'
                    },
                    {
                        id: "door",
                        text: "门禁",
                        width: 65,
                        datafield: "door",
                        type: 'string',
                        hidden: true
                    },
                    {
                        id: "x",
                        text: "x坐标",
                        width: 65,
                        datafield: "x",
                        type: 'float',
                        hidden: true
                    },
                    {
                        id: "y",
                        text: "y坐标",
                        width: 65,
                        datafield: "y",
                        type: 'float',
                        hidden: true
                    },
                    {
                        id: "tm",
                        text: "采集时间",
                        width: 160,
                        datafield: "tm",
                        type:'string'
                    }];
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield,type: columns[i].type});
                }
                that.gridDataSource = {
                    localdata: [],
                    datafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#xgasList").jqxGrid({
                    width: '100%',
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlerow',
                    columns: columns
                });
                $('#xgasList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    var newFeature=that.getFeature(dataObj);
                    newFeature.style = newFeature.styleSelected;
                    map._mapInterface._singleIntelligenceLabel(newFeature,function (params) {
                        that.openPanel(params.features.properties);
                    });
                });
            },
            initMapData: function () {//初始化地图数据
                var that = this;
                var requestParams = that._param;
                requestParams.stcdnm =modal.search().stcdnm();
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;

                http.getInstance("/subject/listXgas", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.mapDataList=result.list;
                    that.addFeatures(result.list);
                });
                /*
                http.getInstance("/data/topic/xgas.json", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.mapDataList=result.list;
                    that.addFeatures(result.list);
                });
                */
            },
            initListData: function () {
                var that = this;
                var requestParams = that._param;
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                requestParams.curPage = 1;
                requestParams.perPageCount =9999;

                $('#xgasList').jqxGrid('showloadelement');
                var h = http.getInstance("/subject/listXgas", {type: "post"});
                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    dataList = result.list;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };
                    that.setListData();
                    if(modal.search().stcdnm()!=''){
                        that.clickSearchByNameBtn();
                    }
                    $('#xgasList').jqxGrid('hideloadelement');
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (dataList && that._pageInfo.totalPage >= 1) {
                    $("#xgasListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#xgasListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                }
                that.loadListData(dataList);
            },
            loadListData: function (_dataList) {
                var that=this;
                var tableData = [];
                if (_dataList){
                    tableData = _dataList;
                }
                that.setListPage(tableData);
                that.gridDataSource.localdata = tableData;
                $("#xgasList").jqxGrid({
                    source: that.gridDataSource
                });
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
            addFeatures: function (data) {
                var that = this;
                //先清除上一次查询地图上面的所有点
                map._mapInterface.layerFeature.clearLayers();
                mapUtils.removeGlobalMapLayers(that.mapLayerTitle);
                if(!data) return;
                var features = {};
                for (var i = 0; i < data.length; i++) {
                    features["feature_" + data[i].devid] = that.getFeature(data[i]);
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
                _feature.style = that.getDefaultStyle(data);
                _feature.styleSelected =that.getDefaultStyle(data);
                _feature.styleSelected.className='_selected';
                _feature.coor = [data.x,data.y];
                var fontColor="#0000FF";
                var label = {text: that.getText(data), font: null, color:fontColor};
                _feature.label = label;
                _feature.feature=_feature;
                return _feature;
            },
            getText:function(dataObj){
                var textArr=[];
                textArr.push(dataObj.sname);
                return textArr;
            },
            dateFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var date=value.substring(2);
                var date=date.substring(0, date.length-3);
                $cellHtml.empty();
                $cellHtml.append(date.replace(/-/g,"/"));
                return $cellHtml[0].outerHTML;
            },
            openPanel: function (data) {
                var radio = 0.98, top = 75, left = 41, title = data.sname;
                data.date=modal.search().date();
                data.sdate = modal.search().sdate();
                common.openDialogPanalPop("view/app/watermap/topic/xgas/xgasWin", title, data, 600, 600, top, left);
            },
            getDefaultStyle: function (data) {
                return {
                    iconUrl: auGurit.global.rootPath + "style/asip/custom/css/images/icon/yellow_circle.png",
                    iconSize: [16, 16]
                };
            },
            getDataByDataList:function (){
                var that = this;
                searchDataList=[];
                var searchValue =modal.search().stcdnm();
                // var searchValue=$("#realtimeWaterName").val();
                if(searchValue==''){
                    alert("请输入站名/站号");
                    return;
                }
                if(!dataList) return;
                for (var i = 0; i < dataList.length; i++) {
                    var item = dataList[i];
                    if (item.sname.indexOf(searchValue) > -1 || item.devid.indexOf(searchValue) > -1) {
                        searchDataList.push(item);
                    }
                }
                that.loadListData(searchDataList);//jxq列表数据
            },
            clickSearchBtn: function () {
                var that = this;
                that.initMapData();
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
                modal.search().stcdnm("");
                that.loadListData(dataList);//jxq列表数据
            },
            clickDate:function(){
                var that=this;
                WdatePicker({
                    onpicked: function (dp) {
                        modal.search().date(dp.cal.getNewDateStr());
                        modal.search().sdate(common.getPastDate(dp.cal.getNewDateStr(),3));
                        that.initListData();
                        that.initMapData();
                    },
                    readOnly: true,
                    maxDate: "%y-%M-%d"
                });
            },
            initLayout:function(){
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
                    $("#xgasList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#xgasList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 158 : 180);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#xgasList").jqxGrid({
                    //  width: '100%',
                    height: jqHeight
                });
            }
        };

        var modal = {
            search: ko.observable({
                stcdnm: ko.observable(""),
                date: ko.observable(""),
                sdate: ko.observable("")
            }),
            clickClearSearchBtn: $.proxy(Xgas.clickClearSearchBtn, Xgas),
            clickSearchBtn: $.proxy(Xgas.clickSearchBtn, Xgas),
            clickResetBtn: $.proxy(Xgas.clickResetBtn, Xgas),
            clickSearchByNameBtn: $.proxy(Xgas.clickSearchByNameBtn, Xgas),
            clickDate: $.proxy(Xgas.clickDate, Xgas),
        };

        Xgas.init();

        return modal;
    });

