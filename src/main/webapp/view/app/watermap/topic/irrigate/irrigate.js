define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var map;//地图对象
        var dataList;
        var panalObj;
        var searchDataList;
        var Irrigate = {
            init: function () {
                var that = this;
                composition.addBindingHandler("irrigateInitHandler", {
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
                        id: "stcd",
                        text: "测站ID",
                        datafield: "stcd",
                        type:'string',
                        hidden:true
                    },{
                        id: "stname",
                        text: "灌区名称",
                        width: 240,
                        datafield: "stname",
                        type:'string'
                    },{
                        id: "lv1",
                        text: "流速仪1",
                        width: 65,
                        datafield: "lv1",
                        type:'float'
                    },{
                        id: "lv2",
                        text: "流速仪2",
                        width: 65,
                        datafield: "lv2",
                        type:'float'
                    },{
                        id: "lv3",
                        text: "流速仪3",
                        width: 65,
                        datafield: "lv3",
                        type:'float'
                    },{
                        id: "lv4",
                        text: "流速仪4",
                        width: 65,
                        datafield: "lv4",
                        type:'float'
                    },{
                        id: "lvTime",
                        width: 160,
                        text: "流速采集时间",
                        datafield: "lvTime",
                        type:'string'
                    },{
                        id: "q1",
                        text: "流量计1",
                        width: 120,
                        datafield: "q1",
                        type:'float'
                    },{
                        id: "q2",
                        text: "流量计2",
                        width: 120,
                        datafield: "q2",
                        type:'float'
                    },{
                        id: "q3",
                        text: "流量计3",
                        width: 120,
                        datafield: "q3",
                        type:'float'
                    },{
                        id: "q4",
                        text: "流量计4",
                        width: 120,
                        datafield: "q4",
                        type:'float'
                    },{
                        id: "qTime",
                        text: "水量采集时间",
                        width: 160,
                        datafield: "qTime",
                        type:'string'
                    },{
                        id: "wl1",
                        text: "水位计1",
                        width: 65,
                        datafield: "wl1",
                        type:'float'
                    },{
                        id: "wl2",
                        text: "水位计2",
                        width: 65,
                        datafield: "w12",
                        type:'float'
                    },{
                        id: "wl3",
                        text: "水位计3",
                        width: 65,
                        datafield: "wl3",
                        type:'float'
                    },{
                        id: "wl4",
                        text: "水位计4",
                        width: 65,
                        datafield: "wl4",
                        type:'float'
                    },{
                        id: "wlTime",
                        width: 160,
                        text: "水位采集时间",
                        datafield: "wlTime",
                        type:'string'
                    },{
                        id: "rainfall",
                        text: "雨量",
                        width: 65,
                        datafield: "rainfall",
                        type:'float'
                    },{
                        id: "rainfallTime",
                        width: 160,
                        text: "雨量采集时间",
                        datafield: "rainfallTime",
                        type:'string'
                    },{
                        id: "x",
                        text: "x坐标",
                        datafield: "x",
                        width: 65,
                        type:"float",
                        hidden:true
                    },{
                        id: "y",
                        text: "y坐标",
                        datafield: "y",
                        width: 65,
                        type:"float",
                        hidden:true
                    }
                ];
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
                $("#irrigateList").jqxGrid({
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
                $('#irrigateList').on('rowclick', function (event) {
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

                http.getInstance("/subject/listIrrigate", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.mapDataList=result.list;
                    that.addFeatures(result.list);
                });
                /*
                http.getInstance("/data/topic/irrigate.json", {type: "post"}).ajax(requestParams).then(function (result) {
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

                $('#irrigateList').jqxGrid('showloadelement');
                var h = http.getInstance("/subject/listIrrigate", {type: "post"});
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
                    $('#irrigateList').jqxGrid('hideloadelement');
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (dataList && that._pageInfo.totalPage >= 1) {
                    $("#irrigateListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#irrigateListPager"),
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
                $("#irrigateList").jqxGrid({
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
                    features["feature_" + data[i].stcd] = that.getFeature(data[i]);
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
                textArr.push(dataObj.stname);
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
                var radio = 0.98, top = 75, left = 41, title = data.stname;
                data.date=modal.search().date();
                data.sdate = modal.search().sdate();
                common.openDialogPanalPop("view/app/watermap/topic/irrigate/irrigateWin", title, data, 600, 600, top, left);
            },
            getDefaultStyle: function (data) {
                return {
                    iconUrl: auGurit.global.rootPath + "style/asip/custom/css/images/icon/irrigate.png",
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
                    if (item.stname.indexOf(searchValue) > -1 || item.stcd.indexOf(searchValue) > -1) {
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
                    $("#irrigateList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#irrigateList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 158 : 180);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#irrigateList").jqxGrid({
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
            clickClearSearchBtn: $.proxy(Irrigate.clickClearSearchBtn, Irrigate),
            clickSearchBtn: $.proxy(Irrigate.clickSearchBtn, Irrigate),
            clickResetBtn: $.proxy(Irrigate.clickResetBtn, Irrigate),
            clickSearchByNameBtn: $.proxy(Irrigate.clickSearchByNameBtn, Irrigate),
            clickDate: $.proxy(Irrigate.clickDate, Irrigate),
        };

        Irrigate.init();

        return modal;
    });

