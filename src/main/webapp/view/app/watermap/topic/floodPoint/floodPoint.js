define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var map;//地图对象
        var panalObj;
        var dataList;//从数据库拿到的数据
        var searchDataList;//如果通过搜索按钮搜索，则查询“通过查询通过数据库拿到的数据”
        var FloodPointstation = {
            init: function () {
                var that = this;
                composition.addBindingHandler("floodPointInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle=modal._$_param.title;
                        that.bindUI();
                        that.renderUI();
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
                that.initPage(modal);
                that.clearInput();
                that.initEvent();
                that.initTableColumns();
                that.initMapData();
                that.initListData();
            },
            initEvent:function(){
                var that = this;
                // $("#endTime").click(function () {
                //     that.resetLevel=true;
                //     WdatePicker({ 
                //         onpicked: function (dp) { 
                //             modal.search().date(dp.cal.getNewDateStr());                          
                //             that.initListData();
                //         },
                //         readOnly: true, maxDate: "#F{$dp.$D('startTime')}"});
                // });
            },
            initPage: function (modal) {
                this.originalCurPage = 1;
                this.originalPerPageCount = 20;
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
                var columns = [{    
                        id: "stcd",
                        text: "站点id",
                        datafield: "stcd",
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
                        id: "stsys",
                        text: "数据来源",
                        datafield: "stsys",
                        type:"string",
                        hidden:true
                    },{
                        id: "sttp",
                        text: "类型",
                        datafield: "sttp",
                        type:"string",
                        hidden:true
                    },{
                        id: "floodPointNameStr",
                        text: "站名",
                        datafield: "stnm",
                        type:"string",
                        width: "30%",
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "waterLevelStr",
                        text: "水深(m)",
                        datafield: "z",
                        type:"float",
                        width: "25%",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    },{
                        id: "tm",
                        text: "采集时间",
                        datafield: "tm",
                        type:"string",
                        width: "45%",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.dateFormatter
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
                $("#floodPointList").jqxGrid({
                    width: '100%',
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    columnsheight: 25,
                    selectionmode: 'singlerow',//'singlecell',
                    columns: columns
                });
                $('#floodPointList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    // that.openPanel(dataObj);
                    var newFeature=that.getFeature(dataObj);
                    newFeature.style = newFeature.styleSelected;
                    map._mapInterface._singleIntelligenceLabel(newFeature,function (params) {
                        that.openPanel(params.features.properties);
                    });
                });
            },
            loadListData: function (_dataList) {
                var that=this;
                var tableData = [];
                if (_dataList){
                    tableData = _dataList;
                }
                that.setListPage(tableData);
                that.gridDataSource.localdata = tableData;
                $("#floodPointList").jqxGrid({
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
                http.getInstance("/subject/getFloodPointList", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.addFeatures(result.list);
                });
            },
            initListData: function () {
                var that = this;

                var requestParams = that._param;
                // requestParams.stnm = modal.search().stnm();//$('#floodPointName').val();
                requestParams.date = modal.search().date();//$('#endTime').val();
                requestParams.sdate =modal.search().sdate();
                requestParams.xzq = modal.search().xzq();
                $('#floodPointList').jqxGrid('showloadelement');
                var h = http.getInstance("subject/getFloodPointList", {type: "post"});
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
                    if(modal.search().stnm()!=''){
                        that.clickSearchByNameBtn();
                    }
                    $('#floodPointList').jqxGrid('hideloadelement');  
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (dataList && that._pageInfo.totalPage >= 1) {
                    $("#floodPointListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#floodPointListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    // $("#floodPointListPager").css("display", "none");
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
            getDataByDataList:function (){//maxt
                var that = this;
                searchDataList=new Array();
                var searchValue=modal.search().stnm();//$("#floodPointName").val();
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
            addFeatures: function (data) {
                var that = this;
                //先清除上一次查询地图上面的所有点        
                map._mapInterface.layerFeature.clearLayers();
                mapUtils.removeGlobalMapLayers(that.mapLayerTitle);
                if(!data) return;
                var features = {};                
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
                _feature.style = that.getDefaultStyle(data);
                _feature.styleSelected = {
                    "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                    "iconSize": [15, 15]
                };
                // _feature.styleSelected =that.getDefaultStyle(data);
                // _feature.styleSelected.className='_selected';
                _feature.coor = [data.x,data.y];

                var waterLevel=data.z,
                fontColor="#969696";
                if (waterLevel >0.05&&waterLevel <0.15) {//轻度
                    fontColor="#00B6FF";
                }
                if (waterLevel >=0.15&&waterLevel <0.25){//中度
                    fontColor="#FF8F18";
                }
                if (waterLevel >=0.25){//重度
                    fontColor="#ED2416";
                }
                var label = {text: that.getText(data), font: null};
                _feature.label = label;
                _feature.feature=_feature;
                return _feature;
            },
            getText:function(dataObj){
                var textArr=[];
                textArr.push(dataObj.stnm);
                if(dataObj.z) 
                    textArr.push((dataObj.z).toFixed(2));
                return textArr;
            },
            getDefaultStyle: function (rowData) {
                var that = this;
                var icon= "jsmark0.png";
                var waterLevel=rowData.z;
                if (waterLevel >0.05&&waterLevel <0.15) {//轻度
                    icon= "jsmark1.png";
                }else if (waterLevel >=0.15&&waterLevel <0.25){//中度
                    icon= "jsmark2.png";
                }else if (waterLevel >=0.25){//重度
                    icon= "jsmark3.png";
                }
                var  style = {
                    iconUrl: auGurit.global.rootPath + "/style/asip/common/css/images/icon/"+icon,
                    iconSize: [16, 25],
                    iconAnchor:[8,28]
                };
                return style;
            },
            clearInput:function(){
                var that=this;
                // modal.search().date(common.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss"));
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
            dateFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var date=value.substring(2);
                $cellHtml.empty();
                $cellHtml.append(date.replace(/-/g,"/"));
                return $cellHtml[0].outerHTML;
            },
            openPanel: function (data) {
                var top = 75;
                var left = 41;
                var title = data.stnm;
                data.date=modal.search().date();//$("#endTime").val();
                data.sdate=modal.search().sdate();
                common.openDialogPanalPop("view/app/watermap/topic/floodPoint/floodPointWin", title, data, 600, 480, top, left);
            },
            initLayout:function(){
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
                    $("#floodPointList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#floodPointList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 154 : 212);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#floodPointList").jqxGrid({
                   // width: '100%',
                    height: jqHeight
                });
            }
        }

        var modal = {
            search: ko.observable({
                stnm:ko.observable(""),
                sdate:ko.observable(""),
                date:ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([{"value":"","title":"全部"},{"value":440103,"title":"荔湾区"},{"value":440104,"title":"越秀区"},{"value":440105,"title":"海珠区"},{"value":440106,"title":"天河区"},{"value":440111,"title":"白云区"},{"value":440112,"title":"黄埔区"},{"value":440113,"title":"番禺区"},{"value":440114,"title":"花都区"},{"value":440115,"title":"南沙区"},{"value":440116,"title":"萝岗区"},{"value":440199,"title":"北江区"},{"value":440183,"title":"增城区"},{"value":440184,"title":"从化区"}])
            }),
            clickDate:$.proxy(FloodPointstation.clickDate, FloodPointstation),
            clickSearchBtn: $.proxy(FloodPointstation.clickSearchBtn, FloodPointstation),
            clickSearchByNameBtn: $.proxy(FloodPointstation.clickSearchByNameBtn, FloodPointstation),
            clickResetBtn: $.proxy(FloodPointstation.clickResetBtn, FloodPointstation),
            clickClearSearchBtn: $.proxy(FloodPointstation.clickClearSearchBtn, FloodPointstation),
            clickXZQBtn:$.proxy(FloodPointstation.clickXZQBtn, FloodPointstation)
        };

        FloodPointstation.init();
        return modal;
    });

