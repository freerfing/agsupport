define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var lastLocatedPoint;//上一个定位点
        var map;//地图对象
        var panalObj;
        var districtObj;
        var dataList;
        var Blacksmellywater = {
            init: function () {
                var that = this;
                composition.addBindingHandler("blacksmellywaterInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle=modal._$_param.title;                        
                        that.bindUI();
                        that.renderUI();
                        that.initLayout();
                        // panalObj.settings.onMaxShow = function () {
                        // };
                        // panalObj.settings.onClose = function () {
                        //     if (auGurit.global.secondUtlPanal)
                        //         auGurit.global.secondUtlPanal.close();
                        // }
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
                map= $("#desktop-main-map")[0].contentWindow.map;
                //行政区分类
                districtObj={}
                var h = http.getInstance("data/district.json");
                h.ajax().then(function (result) {
                    // modal.search().xzqList(result);
                    $.each(result, function (i, item) {
                        districtObj[item.id]= item.name;
                    })
                });

                
                that.initPage(modal);
                that.clearInput();
                that.initTableColumns();
                that.initMapData();
                that.initListData();
                that.initEvent();
            },
            initEvent:function(){
                var that = this;
                $("input[name='blackLevel']").on("click",function(){
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
                var columns = [
                    {    
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
                    },
                    {
                        id: "stnm",
                        text: "河涌名称",
                        datafield: "stnm",
                        width: 100,
                        align: "center",
                        type:"string",
                        cellsalign: "center"
                    },                    
                    {
                        id: "addvcd",
                        text: "行政区",
                        datafield: "addvcd",
                        type:"string",
                        align: "center",
                        cellsalign: "center",                        
                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                            var $cellHtml = $(defaulthtml);                            
                            var district="";
                            if (value) {
                                district=districtObj[value];
                            }
                            $cellHtml.html(district);
                            return $cellHtml[0].outerHTML;       
                        }   
                    },{
                        id: "waterQuality",
                        text: "水质级别",
                        datafield: "waterQuality",
                        type:"number",
                        width: 75,
                        align: "center",
                        cellsalign: "center",
                        // cellclassname: that.waterQualityClass,
                        cellsrenderer: that.waterQualityFormatter
                    },{
                        id: "blackSmelly",
                        text: "黑臭级别",
                        datafield: "blackSmelly",
                        type:"number",
                        width: 75,
                        align: "center",
                        cellsalign: "center",
                        cellclassname: that.blackSmellyClass,
                        cellsrenderer: that.blackSmellyFormatter
                    },{
                        id: "clarIty",
                        text: "透明度",
                        datafield: "clarIty",
                        type:"number",
                        width: 75,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "redox",
                        text: "氧化还原电位(mv)",
                        datafield: "redox",
                        type:"number",
                        width: 120,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "envt",
                        text: "环境温度(℃)",
                        datafield: "envt",
                        type:"number",
                        width: 120,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "humid",
                        text: "湿度(%)",
                        datafield: "humid",
                        type:"number",
                        width: 75,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "q2",
                        text: "水流量(l/s)",
                        datafield: "q2",
                        type:"number",
                        width: 120,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "codcr",
                        text: "化学需氧量(mg/L)",
                        datafield: "codcr",
                        type:"number",
                        width: 120,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "tn",
                        text: "总氮(mg/L)",
                        datafield: "tn",
                        type:"number",
                        width: 120,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "nh3n",
                        text: "氨氮(mg/L)",
                        datafield: "nh3n",
                        type:"number",
                        width: 120,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "tp",
                        text: "总磷(mg/L)",
                        datafield: "tp",
                        type:"number",
                        width: 120,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "dox",
                        text: "溶解氧",
                        datafield: "dox",
                        type:"number",
                        width: 75,
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "spt",
                        text: "采集时间",
                        datafield: "spt",
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
                $("#blacksmellywaterList").jqxGrid({
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
                $('#blacksmellywaterList').on('rowclick', function (event) {
                    console.log(event.args.row);
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
                $("#blacksmellywaterList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            initMapData: function () {//初始化地图数据
                var that = this;
                var requestParams = that._param;
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                requestParams.xzq="";
                requestParams.blackLevel=$("input:checkbox[name='blackLevel']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                http.getInstance("/subject/getBlackSmellyWaterList", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.addFeatures(result.list);
                });
            },
            initListData: function () {
                var that = this;
                
                var requestParams = that._param;
                // requestParams.stnm =modal.search().stnm();
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                requestParams.xzq = modal.search().xzq();
                requestParams.blackLevel=$("input:checkbox[name='blackLevel']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;

                $('#blacksmellywaterList').jqxGrid('showloadelement');
                var h = http.getInstance("subject/getBlackSmellyWaterList", {type: "post"});
                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    dataList=result.list;
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
                    $('#blacksmellywaterList').jqxGrid('hideloadelement');
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (dataList && that._pageInfo.totalPage >= 1) {
                    $("#blacksmellywaterListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#blacksmellywaterListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                //关闭详情的窗口
                                if (auGurit.global.secondUtlPanal)
                                    auGurit.global.secondUtlPanal.close();
                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    // $("#blacksmellywaterListPager").css("display", "none");
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
                //先清除上一次查询地图上面的所有点
                map._mapInterface.layerFeature.clearLayers();
                mapUtils.removeGlobalMapLayers(that.mapLayerTitle);           
                if(!data) return;
                var features = {};
                for (var i = 0; i < data.length; i++) {
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
                // if(dataObj.clarIty) 
                //     textArr.push("透明度:"+(dataObj.clarIty).toFixed(2)+"m");
                // if(dataObj.dox) 
                //     textArr.push("溶解氧:"+(dataObj.dox).toFixed(3)+"mg/L");
                if(dataObj.nh3n) 
                    textArr.push("透明度(mg/L):"+(dataObj.nh3n).toFixed(2));
                return textArr;
            },
            getTipContent:function(dataObj){
                var tipContent =dataObj.stnm;
                if(dataObj.clarIty)
                    tipContent+="<br/>透明度:"+(dataObj.clarIty).toFixed(2)+"m";
                if(dataObj.dox)
                    tipContent+="<br/>溶解氧:"+(dataObj.dox).toFixed(3)+"mg/L";
                return "<span class='_text_shuizhi _shadow_white'>"+tipContent+"</span>";
            },
            blackSmellyFormatter:function (row, columnfield, value, defaulthtml, columnproperties) {
                var blackSmelly="无监测值";
                if (value ==3) {
                    blackSmelly="严重黑臭";
                } else if (value ==2) {
                    blackSmelly="轻度黑臭";
                }  else if (value == 1) {
                    blackSmelly="不臭不黑";
                }
                var $cellHtml = $(defaulthtml);
                $cellHtml.empty();
                $cellHtml.append(blackSmelly);
                return $cellHtml[0].outerHTML;
            },
            waterQualityFormatter:function (row, columnfield, value, defaulthtml, columnproperties) {
                var waterQuality="";
                if (value ==6) {
                    waterQuality="劣Ⅴ类";
                } else if (value ==5) {
                    waterQuality="Ⅴ类";
                } else if (value ==4) {
                    waterQuality="Ⅳ类";
                } else if (value ==3){
                    waterQuality="Ⅲ类";
                } else if (value ==2){
                    waterQuality="Ⅱ类";
                }  else if (value ==1){
                    waterQuality="Ⅰ类";
                }
                var $cellHtml = $(defaulthtml); 
                $cellHtml.empty();
                // 不显示内容
                // $cellHtml.append(waterQuality);
                return $cellHtml[0].outerHTML;
            },
            waterQualityClass: function (row, columnfield, value) {
                return 'lei'+value;
                // if (value ==6) {
                //     return 'red';
                // } else if (value ==5) {
                //     return 'orange';
                // } else if (value ==4) {
                //     return 'yellow';
                // } 
                // else return 'green';
            },
            blackSmellyClass: function (row, columnfield, value) {
                if (value ==3) {
                    return 'red';
                } else if (value ==2) {
                    return 'yellow';
                } else if(value == 1 ){
                    return 'green';
                }
                return '';  
            },
            getDefaultStyle:function(){
                var style={
                        "iconUrl": auGurit.global.rootPath + "/view/app/common/reservior/shuizhi.png",
                        "iconSize": [16, 16]
                    };
                return style;
            },
            clearInput:function(){
                $("input[name='blackLevel']").each(function(){
                   $(this).prop({"checked": true});
                });                
                var nowStr=common.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
                modal.search().date(common.getPastDate(nowStr,11));
                modal.search().sdate(common.getPastDate(nowStr,18));
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
                        that.clickSearchBtn();
                    },
                    readOnly: true,
                    maxDate: "%y-%M-%d"
                });  
            },
            getDataByDataList:function (){//maxt
                var that = this;
                searchDataList=new Array();
                // var searchValue=$("#black_riverName").val();
                var searchValue=modal.search().stnm();
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
            openPanel: function (data) {
                var top = 75;
                var left = 41;
                var title = data.stnm;
                data.date=modal.search().date();
                console.log(data);
                common.openDialogPanalPop("view/app/watermap/topic/blacksmellywater/detail", title, data, 610, 480, top, left);
            },
            initLayout:function(){
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
                    $("#blacksmellywaterList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#blacksmellywaterList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 154 : 212);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#blacksmellywaterList").jqxGrid({
                   // width: '100%',
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
                xzqList: ko.observableArray([{"value":"","title":"全部"},{"value":440103,"title":"荔湾区"},{"value":440104,"title":"越秀区"},{"value":440105,"title":"海珠区"},{"value":440106,"title":"天河区"},{"value":440111,"title":"白云区"},{"value":440112,"title":"黄埔区"},{"value":440113,"title":"番禺区"},{"value":440114,"title":"花都区"},{"value":440115,"title":"南沙区"},{"value":440116,"title":"萝岗区"},{"value":440199,"title":"北江区"},{"value":440183,"title":"增城区"},{"value":440184,"title":"从化区"}]),
                hcList:ko.observableArray([{"id":"blackLevel0","value":"0","text":"不臭不黑"},{"id":"blackLevel1","value":"1","text":"轻度黑臭"},{"id":"blackLevel2","value":"2","text":"严重黑臭"}])
            }),
            clickDate:$.proxy(Blacksmellywater.clickDate, Blacksmellywater),
            clickSearchBtn: $.proxy(Blacksmellywater.clickSearchBtn, Blacksmellywater),
            clickResetBtn: $.proxy(Blacksmellywater.clickResetBtn, Blacksmellywater),
            clickSearchByNameBtn: $.proxy(Blacksmellywater.clickSearchByNameBtn, Blacksmellywater),
            clickClearSearchBtn: $.proxy(Blacksmellywater.clickClearSearchBtn, Blacksmellywater),
            clickXZQBtn: $.proxy(Blacksmellywater.clickXZQBtn, Blacksmellywater)
        };

        Blacksmellywater.init();
        return modal;
    });