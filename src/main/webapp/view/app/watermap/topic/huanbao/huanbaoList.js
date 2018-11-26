define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var curPanal;
        var map ;//地图对象
        var dataList;
        var panalObj;
        var Huanbao = {
            init: function() {
                var that = this;
                composition.addBindingHandler("huanbaoInitHandler", {
                    init: function(dom) {
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle=modal._$_param.title;

                        that.renderUI();
                        that.bindUI();
                        that.initLayout();
                        // panalObj.settings.onClose = function(){
                        //     if (auGurit.global.secondUtlPanal)
                        //         auGurit.global.secondUtlPanal.close();
                        // }
                    },
                    update: function() {}
                });
            },
            renderUI: function() {

                var runId = modal._$_param.panelId;
                var that = this;
                panalObj.addEvent(runId, "onMaxShow", function (e) {   
                    that.initLayout();
                });
                panalObj.addEvent(runId, "onMinShow", function (e) {
                    that.initLayout();
                });

            },
            bindUI: function() {
                var that = this;
                that.fontColors={"劣Ⅴ类":"#FE5408","Ⅴ类":"#FFC206","Ⅳ类":"#27B45E","Ⅲ类":"#5DD324","Ⅱ类":"#14ABF0","Ⅰ类":"#16C7F6"}
                map= $("#desktop-main-map")[0].contentWindow.map;
                
                that.initPage(modal);
                that.clearInput();
                that.initEvent();
                that.initTableColumns();
                that.initMapData(); 
                that.initListData();
            },
            initEvent:function(){
                var that = this;
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
                columns = [{
					id: "szlb",
					text: "水质级别",
					datafield: "szlb",
					align: "center",
					width: "80",
					cellsalign: "center",
					cellsformat:"d2",
					cellclassname: that.waterQualityClass
				}, {
                    id: "stnm",
                    text: "河涌名称",
                    type: "string",
                    datafield: "hcmc",
                    align: "center",
                    width: "40%",
                    cellsalign: "center"
                },{
                    id: "hxqyl",
                    text: "CODcr<br/>(mg/L)",
                    datafield: "hxqyl",
                    align: "center",
                    cellsalign: "center",
                    cellsformat:"d2",
                    width: "65",
                    renderer:that.headerFormatter
                },{
                    id: "do",
                    text: "DO溶解氧<br/>(mg/L)",
                    type: "float",
                    datafield: "rjy",
                    align: "center",
                    cellsalign: "center",
                    cellsformat:"f2",
                    width: "65",
                    renderer:that.headerFormatter
                }, {
                    id: "ad",
                    text: "氨氮<br/>(mg/L)",
                    datafield: "ad",
                    type: "float",
                    align: "center",
                    cellsalign: "center",
                    cellsformat:"f2",
                    width: "65",
                    renderer:that.headerFormatter
                }, {
                    id: "zl",
                    text: "总磷<br/>(mg/L)",
                    type: "float",
                    datafield: "zl",
                    align: "center",
                    cellsalign: "center",
                    cellsformat:"f2",
                    width: "65",
                    renderer:that.headerFormatter
                }, {
                    id: "tmd",
                    text: "透明度<br/>(m)",
                    type: 'string',
                    datafield: "tmd",
                    align: "center",
                    cellsalign: "center",
                    width: "65",
                    renderer:that.headerFormatter
                }, {
                    id: "szzs",
                    text: "水质指数",
                    type: 'string',
                    datafield: "szzs",
                    align: "center",
                    width: "65",
                    cellsalign: "center"
                }, {
					id: "ssxzq",
					text: "行政区",
					type: 'string',
					datafield: "ssxzq",
					align: "center",
					width: "65",
					cellsalign: "center"
				}, {
                    id: "jcny",
                    text: "检测年月",
                    datafield: "jcny",
                    align: "center",
                    width: "20%",
                    cellsalign: "center"
                }];
                that.gridDataSource = {
                    localdata: [],
                    datatype: "array"
                };
                
                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#huanbaoList").jqxGrid({
                    width: '100%',
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    columnsheight: 35,
                    selectionmode: 'singlerow',
                    columns: columns
                });
                $('#huanbaoList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    // that.openPanel(dataObj);
                    var newFeature=that.getFeature(dataObj);
                    newFeature.style = newFeature.styleSelected;
                    map._mapInterface._singleIntelligenceLabel(newFeature,function (params) {
                        that.openPanel(params.features.properties);
                    });
                });
            },
            headerFormatter:function(row, columnfield, value, defaulthtml, columnproperties){
                return '<div class="jxq_column_header_full">' + row + '</div>';
            },
            loadListData: function (_dataList) {
                var that = this;
                var tableData = [];
                if (_dataList){
                    tableData = _dataList;
                }
                that.setListPage(tableData);
                that.gridDataSource.localdata = tableData;
                $("#huanbaoList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            waterQualityClass: function (row, columnfield, value) {
                if (value =='劣Ⅴ类') {
                    return 'szlei6';
                } else if (value =='Ⅴ类') {
                    return 'szlei5';
                } else if (value =='Ⅳ类') {
                    return 'szlei4';
                } else if (value =='Ⅲ类') {
                    return 'szlei3';
                } else if (value =='Ⅱ类') {
                    return 'szlei2';
                } else if (value =='Ⅰ类') {
                    return 'szlei1';
                } 
                else return '';
            },
            initMapData: function () {//初始化地图数据
                var that = this;
                var requestParams = that._param;
                requestParams.date =modal.search().date();
                requestParams.xzq="";
                requestParams.szlb="";
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                http.getInstance("/subject/getHuanbaoList", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.addFeatures(result.list);
                });
            },
            initListData: function () {
                var that = this;
                
                var requestParams ={};
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                // requestParams.stnm = modal.search().stnm();
                requestParams.xzq = modal.search().xzq();
                requestParams.szlb = modal.search().szlb();
                requestParams.date = modal.search().date();

                $('#huanbaoList').jqxGrid('showloadelement');
                var h = http.getInstance("subject/getHuanbaoList", {type: "post"});
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
                    if(modal.search().stnm()!=''){
                        that.clickSearchByNameBtn();
                    }
                    $('#huanbaoList').jqxGrid('hideloadelement');                  
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (that._data && that._pageInfo.totalPage >= 1) {
                    $("#huanbaoListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#huanbaoListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    // $("#huanbaoListPager").css("display", "none");
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
            //初始化定位所有点
            addFeatures: function (data) {
                var that = this;
                //先清除上一次查询地图上面的所有点
                map._mapInterface.layerFeature.clearLayers();
                mapUtils.removeGlobalMapLayers(that.mapLayerTitle);
                if(!data) return;
                var features = {};
                for (var i = 0; i < data.length; i++) {
                    if(data[i].szlb =='—') continue;
                    features["feature_"+data[i].sGuid] = that.getFeature(data[i]);
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
                _feature.style = that.getDefaultStyle(data.szlb);
                _feature.styleSelected =that.getDefaultStyle(data.szlb);
                _feature.styleSelected.className='_selected';
                _feature.coor = [data.x,data.y];
                var label = {text: that.getText(data), font: null, color:that.fontColors[data.szlb]};
                _feature.label = label;
                _feature.feature=_feature;
                return _feature;
            },
            getText:function(dataObj){
                return [dataObj.hcmc];
            },
            getTipContent:function(dataObj,fontColor){
                var tipContent =dataObj.hcmc;
                if(dataObj.ad){
                    tipContent+="<br>氨氮:"+parseFloat(dataObj.ad).toFixed(2)+"mg/L";
                }
                if(dataObj.zl){
                    tipContent+="<br>总磷:"+parseFloat(dataObj.zl).toFixed(2)+"mg/L";
                }
                if(dataObj.hxqyl){
                    tipContent+="<br>化学含氧量:"+parseFloat(dataObj.hxqyl).toFixed(2)+"mg/L";
                }
                if(dataObj.rjy){
                    tipContent+="<br>溶解氧:"+parseFloat(dataObj.rjy).toFixed(2)+"mg/L";
                }
                if(dataObj.tmd){
                    tipContent+="<br>透明度(m):"+dataObj.tmd;
                }
                if(dataObj.jsny){
                    tipContent+="<br>监测年月:"+dataObj.jsny+"";
                }
                // return "<span class='_text_shuizhi _shadow_white'>"+tipContent+"</span>";
                return "<span class='_shadow_white' style='color:"+fontColor+"'>"+tipContent+"</span>";
            },
            getDefaultStyle:function(szlb){                
                var style;
                var iconUrl=auGurit.global.rootPath+"view/app/common/huanbao/icon_";
                if(szlb)
                    iconUrl+=szlb.replace("类", "");
                iconUrl+=".png";
                style = {
                    iconUrl: iconUrl,
                    iconSize: [20, 20]
                };
                return style;
            },
            clearInput:function(){
                modal.search().date(common.formatDate(new Date(),"yyyy-MM"));
                modal.search().stnm("");
                modal.search().xzq("");
                modal.search().szlb("");
            },
            clickSearchBtn: function () {
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
            clickXZQBtn: function () {
                var that = this;
                that.initListData();
            },
            clickDate:function(){
                var that=this;
                WdatePicker({ 
                    dateFmt:'yyyy-MM',
                    onpicked: function (dp) {
                        modal.search().date(dp.cal.getNewDateStr());
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
                var searchValue=modal.search().stnm();
                if(searchValue==''){
                    alert("请输入河涌名");
                    return;
                }
                if(!dataList) return;
                for(var i=0;i<dataList.length;i++){
                    var item=dataList[i];
                    if (item.hcmc.indexOf(searchValue) > -1 || item.sGuid.indexOf(searchValue) > -1) {
                        searchDataList.push(item);
                    }
                }
                that.loadListData(searchDataList);//jxq列表数据
            },
            openPanel: function (data) {
                var radio = 0.98;
                var top = 75;
                var left = 41;
                title = data.hcmc;
                data.date=modal.search().date();
                common.openDialogPanalPop("view/app/watermap/topic/huanbao/huanbaoDetail", title,data, 600, 480,top,left);
            },
            initLayout:function(){
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
                    $("#huanbaoList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#huanbaoList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight= (panalObj.getSizeState() == "max" ? 154 : 238);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#huanbaoList").jqxGrid({
                  //  width: '100%',
                    height: jqHeight
                });

            } 
        }



        var modal = {
            search: ko.observable({
                stnm:ko.observable(""),
                date:ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([{text:"全部", value:""}, {text: "荔湾区", value: "荔湾"}, {text: "海珠区",value: "海珠"}, {text: "番禺区", value: "番禺"}, {text: "南沙区", value: "南沙"}, {text: "天河区", value: "天河"}, {text: "白云区", value: "白云"}, {text: "越秀区", value: "越秀"}, {text: "黄埔区", value: "黄埔"}, {text: "增城区", value: "增城"}, {text: "从化区", value: "从化"}, {text: "花都区", value: "花都"}]),
                szlb: ko.observable(""),
                szlbList: ko.observableArray([{text:"全部", value:""}, {text: "Ⅰ类", value: "Ⅰ类"}, {text: "Ⅱ类",value: "Ⅱ类"}, {text: "Ⅲ类", value: "Ⅲ类"}, {text: "Ⅳ类", value: "Ⅳ类"}, {text: "Ⅴ类", value: "Ⅴ类"}, {text: "劣Ⅴ类", value: "劣Ⅴ类"}])
            }),
            clickDate: $.proxy(Huanbao.clickDate, Huanbao),
            clickSearchBtn: $.proxy(Huanbao.clickSearchBtn, Huanbao),
            clickResetBtn: $.proxy(Huanbao.clickResetBtn, Huanbao),
            clickSearchByNameBtn: $.proxy(Huanbao.clickSearchByNameBtn, Huanbao),
            clickClearSearchBtn: $.proxy(Huanbao.clickClearSearchBtn, Huanbao),
            clickXZQBtn: $.proxy(Huanbao.clickXZQBtn, Huanbao)
        };


        Huanbao.init();
        return modal;
    });