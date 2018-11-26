define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map;
        var dataList;
        var serverStcds;
        var searchDataList;//如果通过搜索按钮搜索，则查询“通过查询通过数据库拿到的数据”
        var WasStation = {
            init: function () {
                var that = this;
                composition.addBindingHandler("wasStationInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        serverStcds="";//从服务拿到对应等级所有测站的stcd
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
                that.lastLayerTable=that.getLayerTable();

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
                $("input[name='wasStation_stsys']").on("click",function(){
                   that.clickSearchBtn();
                });
                //地图缩放控制调取不同图层的点
                map.on("zoom", function(){
                    var layerTable = that.getLayerTable();
                    for (var l = 0; l < auGurit.global.selectSubject.length; l++) {
                        if(that.mapLayerTitle==auGurit.global.selectSubject[l].title&&that.lastLayerTable!=layerTable){                         
                            that.queryLayerObjects(layerTable);
                            break;                         
                        }  
                    }
                });
            },
            getLayerTable:function(){
                var layerTable=7;
                var zoom=map.getZoom();
                if(zoom<2){
                    layerTable=7
                }
                if(zoom>=2&&zoom<3){
                    layerTable=5
                }
                if(zoom>=3&&zoom<7){
                    layerTable=3
                }
                if(zoom>=7){
                    layerTable=1
                }
                // var mapScale=(96/(map.options.crs.scale(zoom)*0.254))*10;
                // if(mapScale>=288896){
                //     layerTable=7;
                // }
                // if(mapScale>=144448&&mapScale<288896){
                //     layerTable=5;
                // }
                // if(mapScale>=9028&&mapScale<144448){
                //     layerTable=3;
                // }
                // if(mapScale<9028){
                //     layerTable=1
                // }
                // console.log("地图级别:"+zoom+"||mapScale:"+mapScale+"||查询："+layerTable);
                return layerTable;
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
                        id: "stcd",
                        text: "站点id",
                        datafield: "stcd",
                        type:"string",
                        hidden:true
                    },{
                        id: "addvcd",
                        text: "行政区",
                        datafield: "addvcd",
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
                        id: "supwptn",
                        text: "闸上水势",
                        datafield: "supwptn",
                        type:"string",
                        hidden:true
                    },{
                        id: "sdwwptn",
                        text: "闸下水势",
                        datafield: "sdwwptn",
                        type:"string",
                        hidden:true
                    },{
                        id: "stsys",
                        text: "数据来源",
                        datafield: "stsys",
                        type:"string",
                        hidden:true
                    },{
                        id: "stnm",
                        text: "站名",
                        datafield: "stnm",
                        width: "25%",
                        align: "center",
                        type:"string",
                        cellsalign: "center"
                    }, {
                        id: "upz",
                        text: "闸上<br>(m)",//水位
                        datafield: "upz",
                        width: "20%",                   
                        align: "center",
                        cellsalign: "center",
                        cellsformat: "f2",
                        type:"float", 
                        renderer:that.headerFormatter,
                        cellsrenderer: that.waterLevelFormatter                
                    }, {
                        id: "dwz",
                        text: "闸下<br>(m)",//水位
                        datafield: "dwz", 
                        width: "20%",                
                        align: "center",
                        cellsalign: "center",
                        cellsformat: "f2",
                        type:"float",
                        renderer:that.headerFormatter,
                        cellsrenderer: that.waterLevelFormatter                    
                    },{
                        id: "chanb",
                        text: "渠箱水位",
                        datafield: "chanb",
                        cellsformat: "f2",
                        type:"float",
                        hidden:true
                    },{
                        id: "tgtq",
                        text: "总过闸流量",
                        datafield: "tgtq",
                        cellsformat: "f2",
                        type:"float", 
                        hidden:true
                    },{
                        id: "tm",
                        text: "采集时间",
                        datafield: "tm",
                        width: "45%",
                        align: "center",
                        cellsalign: "center",
                        type:"string",
                        cellsrenderer: that.dateFormatter
                    }
                ];

                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    // var temp={name: columns[i].datafield};
                    // if(columns[i].cellsformat){
                    //     temp.type = 'float';
                    // }
                    // datadatafields.push(temp);
                    datadatafields.push({name: columns[i].datafield,type: columns[i].type});
                }
                that.gridDataSource = {
                    localdata: [],
                    datafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#wasStationList").jqxGrid({
                    width: "100%",
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    columnsheight: 35,
                    selectionmode: 'singlerow',
                    columns: columns
                });
                //为表格增加一个cell单击事件,只对定位图标的cell有效
                $('#wasStationList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    // that.openPanel(dataObj);
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
                requestParams.date =modal.search().date();
                requestParams.sdate=modal.search().sdate();
                requestParams.xzq="";
                requestParams.stsysList=$("input:checkbox[name='wasStation_stsys']").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                http.getInstance("/subject/queryPsStbprpWasPage", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.mapDataList=result.list;
                    that.queryLayerObjects(that.lastLayerTable);  
                });
            },
            initListData: function () {
                var that = this;

                var requestParams = that._param;
                // requestParams.stnm = modal.search().stnm();//$('#wasStationName').val();
                requestParams.xzq = modal.search().xzq();
                requestParams.date =modal.search().date();
                requestParams.sdate=modal.search().sdate();
                //来源
                requestParams.stsysList = $("input:checkbox[name='wasStation_stsys']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;

                $('#wasStationList').jqxGrid('showloadelement');
                var h = http.getInstance("subject/queryPsStbprpWasPage", {type: "post"});
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
                    // that.initLayout();
                    that.setListData();
                    if(modal.search().stnm()!=''){
                        that.clickSearchByNameBtn();
                    }
                    $('#wasStationList').jqxGrid('hideloadelement');                        
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (that._data && that._pageInfo.totalPage >= 1) {
                    $("#wasStationListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#wasStationListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    
                    // $("#wasStationListPager").css("display", "none");
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
            queryLayerObjects: function (_layerTable,callback) {
                var that=this;
                that.lastLayerTable=_layerTable;
                serverStcds="";
                var layerOption = {
                    url:auGurit.global.mapTopLayers[that.mapLayerTitle]["serviceUrl"],
                    layerTable: _layerTable,
                    where: "1=" + 1,
                    opacity: 1
                };
                map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
                    if(featureCollection){
                        for(var i in featureCollection.features){
                            var feature=featureCollection.features[i];
                            serverStcds+=feature.properties.STCD+",";                        
                        }
                        that.addFeatures(that.mapDataList);
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
                    if(serverStcds.indexOf(data[i].stcd)==-1)
                        continue;
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
                textArr.push(dataObj.stnm);

                if(dataObj.upz){//闸上水位
                    textArr.push("闸上水位(m):"+dataObj.upz.toFixed(2));
                }
                if(dataObj.dwz){//闸下水位
                    textArr.push("闸下水位(m):"+dataObj.dwz.toFixed(2));
                }
                if(dataObj.chanb){//渠箱水位
                    textArr.push("渠箱水位(m):"+dataObj.chanb.toFixed(2));
                }
                if(dataObj.tgtq){//总过闸流量
                    textArr.push("总过闸流量(m³):"+dataObj.tgtq.toFixed(2));
                }
                return textArr;
            },
            getDefaultStyle:function(){
                var style={"iconUrl": auGurit.global.rootPath + "style/asip/common/css/images/icon/shuizha.png",
                        "iconSize": [16, 16]}
                return style;
            },
            loadListData: function (_dataList) {
                var that=this;
                var tableData = [];
                if (_dataList){
                    tableData = _dataList;
                }
                that.setListPage(tableData);
                that.gridDataSource.localdata = tableData;
                $("#wasStationList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            headerFormatter:function(row, columnfield, value, defaulthtml, columnproperties){
                return '<div class="jxq_column_header_full">' + row + '</div>';
            },
            waterLevelFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);                
                var $icon;
                var color="blue";
                if(data.state=='1'){color="red";}
                if (columnfield == 'upz')
                    ss = data.supwptn;
                else    ss = data.sdwwptn;
                var $font = $('<div class="telemetryStation_font" style="color:'+color+'">' + $cellHtml.text() + '</div>');
                switch (ss) {
                    case '4':
                        $icon = $('<div class="telemetryStation_icon_down_'+color+'"></div>');
                        break;
                    case '5':
                        $icon = $('<div class="telemetryStation_icon_up_'+color+'"></div>');
                        break;
                    case '6':
                        $icon = $('<div class="telemetryStation_icon_same_'+color+'"></div>');
                        break;
                    default:
                        $icon = $('');
                        break;
                }
                $cellHtml.empty();
                $cellHtml.append($font);
                $cellHtml.append($icon);
                return $cellHtml[0].outerHTML;
            },
            dateFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var date=value.substring(2);
                var date=date.substring(0, date.length-3);
                $cellHtml.empty();
                $cellHtml.append(date.replace(/-/g,"/"));
                return $cellHtml[0].outerHTML;
            },
            getDataByDataList:function (){//maxt
                var that = this;
                searchDataList=new Array();
                var searchValue=modal.search().stnm();//$("#wasStationName").val();
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
                $("input[name^='wasStation_stsys']").each(function(){
                   $(this).prop({"checked": true});
                });
                var nowStr=common.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
                modal.search().date(nowStr);
                modal.search().sdate(common.getPastDate(nowStr,3));
                modal.search().stnm("");
                modal.search().xzq("");
            },
            clickSearchBtn: function () {
                var that = this;
                that.initListData();
                that.initMapData();
            },
            clickXZQBtn: function (item) {
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
                        modal.search().sdate(common.getPastDate(dp.cal.getNewDateStr(),3));
                        that.initListData();
                        that.initMapData();
                    },
                    readOnly: true,
                    maxDate: "%y-%M-%d"
                });  
            },
            openPanel:function(param) {
                var top = 75;
                var left = 41;
                var title = param.stnm;                
                param.date=modal.search().date();                
                common.openDialogPanalPop("view/app/watermap/topic/wasstation/wasDetail", title,param,600, 480, top, left);
            },
            initLayout:function(){
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
                    $("#wasStationList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#wasStationList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 154 : 212);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#wasStationList").jqxGrid({
                   // width: '100%',
                    height: jqHeight
                });
            } 
        }

        var modal = {
            search: ko.observable({
                stnm:ko.observable(""),
                date:ko.observable(""),
                sdate:ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([{"value":"","title":"全部"},{"value":440103,"title":"荔湾区"},{"value":440104,"title":"越秀区"},{"value":440105,"title":"海珠区"},{"value":440106,"title":"天河区"},{"value":440111,"title":"白云区"},{"value":440112,"title":"黄埔区"},{"value":440113,"title":"番禺区"},{"value":440114,"title":"花都区"},{"value":440115,"title":"南沙区"},{"value":440116,"title":"萝岗区"},{"value":440199,"title":"北江区"},{"value":440183,"title":"增城区"},{"value":440184,"title":"从化区"}])
            }),
            clickSearchBtn: $.proxy(WasStation.clickSearchBtn, WasStation),
            clickSearchByNameBtn: $.proxy(WasStation.clickSearchByNameBtn, WasStation),
            clickResetBtn: $.proxy(WasStation.clickResetBtn, WasStation),
            clickClearSearchBtn: $.proxy(WasStation.clickClearSearchBtn, WasStation),
            clickDate: $.proxy(WasStation.clickDate, WasStation),
            clickXZQBtn:$.proxy(WasStation.clickXZQBtn, WasStation)
        };  

        WasStation.init();
        return modal;
    });