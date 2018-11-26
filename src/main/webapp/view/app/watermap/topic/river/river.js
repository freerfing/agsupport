define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var map;//地图对象
        var panalObj;
   	    var dataList;
        var River = {
            init: function () {
                var that = this;
                composition.addBindingHandler("riverInitHandler", {
                    init: function (dom) {
                        that.layerArr=[];//存放图层的数组，这里有服务一个图层、渲染的点一个图层
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle=modal._$_param.title;
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
                // var h = http.getInstance("data/district.json");
                // h.ajax().then(function (result) {
                //     modal.search().xzqList(result);
                // });
                //数据请求地址
                that.initPage(modal);
                that.clearInput();
                that.initEvent();
                that.initTableColumns();
                that.initMapData();
                that.initListData();
            },
            initEvent: function () {
                var that = this;
                $("input[name='river_stsys']").on("click",function(){
                   that.clickSearchBtn();
                });
            },
            initPage: function (modal) {
                this.originalCurPage = 1;
                this.originalPerPageCount = 20;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
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
                        id: "wptn",
                        text: "水势",
                        datafield: "wptn",
                        type:"string",
                        hidden:true
                    },{
                        id: "state",
                        text: "状态",
                        datafield: "state",
                        type:"number",
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
                        // width: 65,
                        width: '25%',
                        datafield: "stnm",
                        type:"string",                         
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "z",
                        text: "水位(m)",
                        // width: 65,
                        width: '20%',
                        datafield: "z",
                        type:"float",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: "f2",
                        cellsrenderer: that.waterLevelFormatter
                    },{
                        id: "jjsw",
                        text: "警戒<br/>水位(m)",
                        datafield: "jjsw",
                        type:"float",
                        width: '20%',
                        align: "center",
                        cellsalign: "center",
                        cellsformat: "f2",
                        renderer:that.headerFormatter,
                        cellsrenderer: that.colorTurnToRedFormatter
                    },{
                        id: "tm",
                        text: "采集时间",
                        datafield: "tm",
                        type:"string",
                        // width: 120,
                        width: "35%",
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
                $("#riverList").jqxGrid({
                    width: '100%',
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    columnsheight: 35,
                    selectionmode: 'singlerow',
                    columns: columns
                });
                $('#riverList').on('rowclick', function (event) {                    
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
                $("#riverList").jqxGrid({
                    source: that.gridDataSource
                });
            },        
            initMapData: function () {//初始化地图数据
                var that = this;
                var requestParams = that._param;
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                requestParams.xzq="";
                requestParams.stsysList = $("input:checkbox[name='river_stsys']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                http.getInstance("/subject/getRiverList", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.addFeatures(result.list);
                });
            },    
            initListData: function () {
                var that = this;
                
                var requestParams = that._param;
                // requestParams.stnm = modal.search().stnm();//$('#riverName').val();
                 //来源
                requestParams.stsysList = $("input:checkbox[name='river_stsys']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');
                requestParams.xzq = modal.search().xzq();
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;

                $('#riverList').jqxGrid('showloadelement');
                var h = http.getInstance("subject/getRiverList", {type: "post"});
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
                    $('#riverList').jqxGrid('hideloadelement');
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (dataList && that._pageInfo.totalPage >= 1) {
                    $("#riverListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#riverListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    // $("#riverListPager").css("display", "none");
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
            addFeatures: function (data) {
                var that = this;
                map._mapInterface.layerFeature.clearLayers();
                mapUtils.removeGlobalMapLayers(that.mapLayerTitle);
                var features = {};
                if(!data) return;
                for (var i = 0; i < data.length; i++) {
                    features["feature_" + data[i].stcd] = that.getFeature(data[i]);
                }
                var layerGroup= map._mapInterface.IntelligenceLabel(features, function (params) {
                    that.openPanel(params.features.properties);
                });
                that.layerArr.push(layerGroup);
                //添加服务图层
                that.addDynamicMapLayer(function (layer) {
                    that.layerArr.push(layer);                           
                });
                //添加
                auGurit.global.mapLayers[that.mapLayerTitle] = that.layerArr;         
            },
            getFeature:function(data){
                var that=this;
                var _feature = {};
                _feature.geometry = "POINT (" + data.x + " " + data.y + ")";
                _feature.properties = data;
                _feature.style = that.getDefaultStyle();
                _feature.styleSelected = {
                    "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                    "iconSize": [15, 15]
                };
                // _feature.styleSelected =that.getDefaultStyle();
                // _feature.styleSelected.className='_selected';
                _feature.coor = [data.x,data.y];
                var label = {text: that.getText(data), font: null, color:null};
                _feature.label = label;
                _feature.feature=_feature;
                return _feature;
            },
            getText:function(dataObj){
                var textArr=[];
                textArr.push(dataObj.stnm);
                var iconName="";
                if(dataObj.wptn=='4') {
                    iconName = '↓';
                }
                if(dataObj.wptn=='5'){
                    iconName = '↑';
                }
                if(dataObj.wptn=='6'){
                    iconName = '-';
                }
                if(dataObj.z) 
                    textArr.push((dataObj.z).toFixed(2)+"\n"+iconName);
                return textArr;
            },
            waterLevelFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                var $icon;
                var color="blue";
                if(data.state=='1'){color="red";}
                var $font = $('<div class="telemetryStation_font" style="color:'+color+'">' +$cellHtml.text() + '</div>');
                switch (data.wptn) {
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
                }
                $cellHtml.css('color', color);
                $cellHtml.empty();
                $cellHtml.append($font);
                $cellHtml.append($icon);
                return $cellHtml[0].outerHTML;
            },
            colorTurnToRedFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                if(data.state=='1')
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
            getDefaultStyle: function () {
                var style = {
                    iconUrl: auGurit.global.rootPath + '/style/asip/common/css/images/icon/station_default_icon.png',
                    iconSize: [10,10]
                };
                return style;
            },
            clearInput:function(){
                $("input[name^='river_stsys']").each(function(){
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
                        modal.search().sdate(common.getPastDate(dp.cal.getNewDateStr(),3));
                        that.initListData();
                        that.initMapData();
                    },
                    readOnly: true,
                    maxDate: "%y-%M-%d"
                });  
            },
            getDataByDataList:function (){//maxt
                var that = this;
                searchDataList=new Array();
                var searchValue=modal.search().stnm()//$("#riverName").val();
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
            addDynamicMapLayer:function(callback){
                var that = this;
                var topLayer=auGurit.global.mapTopLayers[that.mapLayerTitle];
                map._mapInterface.addDynamicMapLayer(topLayer["serviceUrl"],topLayer["layerTable"],callback);
            },
            openPanel: function (data) {
                var top = 75;
                var left = 41;
                var title = data.stnm;
                data.date=modal.search().date();
                common.openDialogPanalPop("view/app/watermap/topic/river/riverWin", title, data, 600, 480, top, left);
            },
            initLayout:function(){
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
                    $("#riverList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#riverList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 154 : 212);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#riverList").jqxGrid({
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
            clickDate:$.proxy(River.clickDate, River),
            clickSearchBtn: $.proxy(River.clickSearchBtn, River),
            clickResetBtn: $.proxy(River.clickResetBtn, River),
            clickSearchByNameBtn: $.proxy(River.clickSearchByNameBtn, River),
            clickClearSearchBtn: $.proxy(River.clickClearSearchBtn, River),
            clickXZQBtn:$.proxy(River.clickXZQBtn, River)
        };

        River.init();
        return modal;
    });

