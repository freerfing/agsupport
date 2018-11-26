define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map;//地图对象
        var dataList;
        var serverStcds;
        var Reservoir = {
            init: function () {
                var that = this;
                composition.addBindingHandler("reservoirInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle=modal._$_param.title;
                        that.isInFloodSeasonFlag=that.getIsInFloodSeason(new Date().getMonth()+1);

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
            initEvent: function () {
                var that = this;
                $("input[name^='reservoir_']").on("click",function(){
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
                return layerTable;
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
                        id: "rsvrtp",
                        text: "水库类型",
                        datafield: "rsvrtp",
                        type:"string",
                        hidden:true
                    },{
                        id: "addvcd",
                        text: "行政区",
                        datafield: "addvcd",
                        type:"string",
                        hidden:true
                    },{
                        id: "rwptn",
                        text: "水势",
                        datafield: "rwptn",
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
                        id: "stsys",
                        text: "数据来源",
                        datafield: "stsys",
                        type:"string",
                        hidden:true
                    },{
                        id: "stnm",
                        text: "水库名称",
                        datafield: "stnm",
                        type:"string",
                        width: '25%',
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "rz",
                        text: "水位(m)",
                        datafield: "rz",
                        type:"float", 
                        width: '20%',
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                        cellsrenderer: that.waterLevelFormatter
                    }, {
                        id: "jjsw",
                        text: "汛限<br/>水位(m)",
                        datafield: "jjsw",
                        type:"float",
                        width: '20%',
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                        renderer:that.headerFormatter,
                        cellsrenderer: that.colorTurnToRedFormatter
                    },{
                        id: "tm",
                        text: "采集时间",
                        datafield: "tm",
                        type:"string",
                        width: "35%",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.dateFormatter
                    }
                ];

                datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield, type: columns[i].type});
                }
                that.gridDataSource = {
                    localdata: [],
                    datafields: datadatafields,
                    datatype: "array"
                };

                dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#reserviorList").jqxGrid({
                    width: "100%",
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    columnsheight: 35,
                    selectionmode: 'singlerow',
                    columns: columns
                });
                //为小页面的表格增加一个行单击事件
                $('#reserviorList').on('rowclick', function (event) {
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
                $("#reserviorList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            initMapData: function () {//初始化地图数据
                var that = this;
                var requestParams = that._param;
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                requestParams.xzq="";
                requestParams.rsvrtpList=$("input:checkbox[name='reservoir_rsvrtp']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                http.getInstance("/subject/listReservoirPage", {type: "post"}).ajax(requestParams).then(function (result) {
                    // that.addFeatures(result.list);

                    that.mapDataList=result.list;
                    that.queryLayerObjects(that.lastLayerTable); 
                });
            },
            initListData: function () {
                var that = this;                
                var requestParams = that._param;
                requestParams.date = modal.search().date();
                requestParams.sdate =modal.search().sdate();
                //requestParams.stnm = modal.search().stnm();//$("#reservoirName").val();
                requestParams.xzq = modal.search().xzq();
                var chk_value = new Array();
                $('input[name="reservoir_rsvrtp"]:checked').each(function () {
                    chk_value.push($(this).val());
                });
                requestParams.rsvrtpList = chk_value.toString();
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;

                $('#reserviorList').jqxGrid('showloadelement');
                var h = http.getInstance("subject/listReservoirPage", {type: "post"});
                h.ajax(requestParams).then(function (result) {
                    var data = result;
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
                    $('#reserviorList').jqxGrid('hideloadelement');         
                });
            },
            queryLayerObjects: function (_layerTable,callback) {
                var that=this;
                that.lastLayerTable=_layerTable;
                serverStcds="";
                var layerOption = {
                    url: auGurit.global.mapTopLayers[that.mapLayerTitle]["serviceUrl"],
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
            addFeatures:function(data){
                var that = this;
                //先清除上一次查询地图上面的所有点
                map._mapInterface.layerFeature.clearLayers();
                mapUtils.removeGlobalMapLayers(that.mapLayerTitle);
                if(!data) return;
                var features = {};
                for(var i=0;i<data.length;i++){
                    if(serverStcds.indexOf(data[i].stcd)==-1)
                        continue;
                    features["feature_"+data[i].stcd] =  that.getFeature(data[i]);
                };              
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
                var label = {text: that.getText(data), font: null};
                _feature.label = label;
                _feature.feature=_feature;
                return _feature;
            },
            getText:function(dataObj){
                var textArr=[];
                textArr.push(dataObj.stnm);
                var iconName="";
                if(dataObj.rwptn=='4') {
                    iconName = '↓';
                }
                if(dataObj.rwptn=='5'){
                    iconName = '↑';
                }
                if(dataObj.wptn=='6'){
                    iconName = '-';
                }
                if(dataObj.rz) 
                    textArr.push((dataObj.rz).toFixed(2)+"\n"+iconName);
                return textArr;
            },
            //根据水库等级不同在确定地图上面定位的点的样式
            getDefaultStyle:function(data){
                var style;
                var iconUrl=auGurit.global.rootPath+"view/app/common/reservior/";
                if (data.rsvrtp == 1||data.rsvrtp ==2||!data.rsvrtp) {//小(2)型\小(1)型
                    iconUrl+="shuiku_s";
                    iconSize=[15, 15];
                } else if (data.rsvrtp == 3) {//涨
                    iconUrl+="shuiku_m";
                     iconSize=[18, 18];
                } else if(data.rsvrtp == 4||data.rsvrtp ==5){//大(2)型\大(1)型
                    iconUrl+="shuiku_b";
                     iconSize=[23, 23];
                }
                iconUrl+=".png";
                style = {
                        iconUrl: iconUrl,
                        iconSize: iconSize
                    };
                return style;
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (dataList && that._pageInfo.totalPage >= 1) {
                    $("#reserviorListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#reserviorListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;

                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    // $("#reserviorListPager").css("display", "none");
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
            clearInput:function(){
                $("input[name^='reservoir_']").each(function(){
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
                modal.search().stnm("");
                that.loadListData(dataList);//jxq列表数据
            },
            clickXZQBtn: function () {
                var that = this;
                that.initListData();
            },
            clickDate:function(){
                var that=this;
                WdatePicker({ 
                    onpicked: function (dp) {
                        that.isInFloodSeasonFlag=that.getIsInFloodSeason(dp.cal.newdate.M);
                        modal.search().date(dp.cal.getNewDateStr());
                        modal.search().sdate(common.getPastDate(dp.cal.getNewDateStr(),3));
                        that.clickSearchBtn();
                    },
                    readOnly: true,
                    maxDate: "%y-%M-%d"
                });  
            },
            getDataByDataList:function (){//maxt
                var that = this;
                searchDataList=new Array();
                var searchValue=modal.search().stnm();//$("#reservoirName").val();
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
            colorTurnToRedFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var that=this;
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                if(data.state=='1'&&that.isInFloodSeasonFlag)
                    $cellHtml.css('color', 'red');
                return $cellHtml[0].outerHTML;
            },
            headerFormatter:function(row, columnfield, value, defaulthtml, columnproperties){
                return '<div class="jxq_column_header_full">' + row + '</div>';
            },
            dateFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var date=value.substring(2);
                var date=date.substring(0, date.length-3);
                $cellHtml.empty();
                $cellHtml.append(date.replace(/-/g,"/"));
                return $cellHtml[0].outerHTML;
            },
            waterLevelFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var that=this;
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                var $icon;
                var color="blue";
                if(data.state=='1'&&that.isInFloodSeasonFlag){color="red";}
                var $font = $('<div class="telemetryStation_font" style="color:'+color+'">' + $cellHtml.text() + '</div>');
                switch (data.rwptn) {
                    case "4":
                        $icon = $('<div class="telemetryStation_icon_down_'+color+'"></div>');
                        break;
                    case "5":
                        $icon = $('<div class="telemetryStation_icon_up_'+color+'"></div>');
                        break;
                    case "6":
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
            openPanel: function (data) {              
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                var top = 75;
                var left = 41;
                var title = data.stnm;
                data.date=modal.search().date();
                common.openDialogPanalPop("view/app/watermap/topic/reservoir/reservoirWin", title, data, 600, 480,top,left);
            },
            getIsInFloodSeason:function(month){//判断选择时间是否包含汛期                
                //4.1~9.30是汛期
                if(3<month&&month<10)
                    return true;
                else
                    return false;                
            },
            initLayout:function(){
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
                    $("#reserviorList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#reserviorList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 154 : 212);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#reserviorList").jqxGrid({
                  //  width: '100%',
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
            clickDate:$.proxy(Reservoir.clickDate, Reservoir),
            clickSearchBtn: $.proxy(Reservoir.clickSearchBtn, Reservoir),
            clickResetBtn: $.proxy(Reservoir.clickResetBtn, Reservoir),
            clickSearchByNameBtn: $.proxy(Reservoir.clickSearchByNameBtn, Reservoir),
            clickClearSearchBtn: $.proxy(Reservoir.clickClearSearchBtn, Reservoir),
            clickXZQBtn: $.proxy(Reservoir.clickXZQBtn, Reservoir)
        };

        Reservoir.init();
        return modal;
    }); 