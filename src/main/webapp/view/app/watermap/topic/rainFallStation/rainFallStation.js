define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
        var panalObj;
        var map;//地图对象
        var dataList;//从数据库拿到的数据
        var serverStcds;
        var searchDataList;//如果通过搜索按钮搜索，则查询“通过查询通过数据库拿到的数据”
        var use24H;
        var RainFallStation = {
            init: function () {
                var that = this;
                composition.addBindingHandler("rainfallstationInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle = modal._$_param.title;

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
                var that=this;
                map = $("#desktop-main-map")[0].contentWindow.map;
                // if (map.hasEventListeners("zoom")) {
                //     map.off("zoom");
                // }
                that.lastLayerTable=that.getLayerTable();
                // var h = http.getInstance("data/district.json");
                // h.ajax().then(function (result) {
                //     modal.search().xzqList(result);
                // });
                
                //雨量等级
                that.curRainLevel=[{id:"level-count-01",iconUrl:"style/asip/common/css/images/icon/white_circle.png",text:"0",min:"0.0",max:"0.0",fontColor:"#2f312c"},{id:"level-count-02",iconUrl:"style/asip/common/css/images/icon/cyan_circle.png",text:"0.1~1",min:"0.1",max:"1",fontColor:"#74DDFB"},{id:"level-count-03",iconUrl:"style/asip/common/css/images/icon/yellow_circle.png",text:"1~25",min:"1.1",max:"25",fontColor:"#FFCC52"},{id:"level-count-04",iconUrl:"style/asip/common/css/images/icon/green_circle.png",text:"25~50",min:"25.1",max:"50",fontColor:"#7ABD28"},{id:"level-count-05",iconUrl:"style/asip/common/css/images/icon/blue_circle.png",text:"50~100",min:"50.1",max:"100",fontColor:"#225BA9"},{id:"level-count-06",iconUrl:"style/asip/common/css/images/icon/purple_circle.png",text:"100~200",min:"100.1",max:"200",fontColor:"#C74593"},{id:"level-count-07",iconUrl:"style/asip/common/css/images/icon/red_circle.png",text:"200以上",min:"200.1",max:"99999",fontColor:"#E71F19"}];

                that.initPage(modal);

                that.clearInput();
                that.initEvent();
                that.initTableColumns();//初始化jqxgrid

                //读取降雨量等级数据
                var h = http.getInstance("data/rainlevel.json");
                h.ajax().then(function (data) {
                    for (var i = 0; i < data.level.length; i++) {
                        var level = data.level[i];
                        if (level.id == 'level-24h') {
                            that.level24 = level.sublevel;
                            break;
                        }
                    }
                    that.resetFlag=true;
                    that.resetRainLevel=true;
                    that.initWaterLevel();
                    //初始化地图数据
                    that.initMapData();
                    that.initListData();
                });

                      
            },
            initEvent:function(){
                var that=this;
                $("#rainStartTime").click(function () {
                    that.resetFlag=true;
                    that.resetRainLevel=false;
                    WdatePicker({readOnly: true, maxDate: "#F{$dp.$D('rainEndTime')}"});
                });

                $("#rainEndTime").click(function () {
                    that.resetFlag=true;
                    that.resetRainLevel=false;
                    WdatePicker({readOnly: true, minDate: "#F{$dp.$D('rainStartTime')}"});
                });

                $("input[name='rainfallstation_stsys']").on("click", function () {
                    that.resetFlag=false;
                    that.resetRainLevel=false;
                    that.initListData();
                    that.initMapData();
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
            // console.log("地图级别:"+zoom+"||mapScale:"+mapScale+"||查询："+layerTable);
            //7     288896      2311167
            //5     144448      288896
            //3     9028        144448
            //1     564         9028
            //地图级别:0||mapScale:1155595.7311914624||查询：7
            //地图级别:1||mapScale:577792.8655857311||查询：7
            //地图级别:2||mapScale:288896.4277928556||查询：7
            //地图级别:3||mapScale:144448.2188964378||查询：5
            //地图级别:4||mapScale:72224.1044482089||查询：3
            //地图级别:5||mapScale:36112.05222410445||查询：3
            //地图级别:6||mapScale:18056.026112052226||查询：3
            //地图级别:7||mapScale:9028.018056036111||查询：3
            //地图级别:8||mapScale:4514.009028018056||查询：1
            //地图级别:9||mapScale:2257.004514009028||查询：1
            //地图级别:10||mapScale:1128.502257004514||查询：1
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
                //列
                columns = [
                    {
                        id: "stcd",
                        text: "站点id",
                        datafield: "stcd",
                        hidden: true
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
                        text: "站点名称",
                        datafield: "stnm",
                        width: "50%",
                        align: "center",
                        cellsalign: "center",
                        // pinned: true
                    },{
                        text: "雨量(mm)",
                        datafield: "sumDrp",
                        width: "50%",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f1',
                    }
                ];

                that.gridDataSource = {};
                gridDataSource = {
                    localdata: [],
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
                $("#rainfallstationList").jqxGrid({
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
                $('#rainfallstationList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    // that.openPanel(dataObj);
                    var newFeature=that.getFeature(dataObj);
                    newFeature.style = newFeature.styleSelected;
                    map._mapInterface._singleIntelligenceLabel(newFeature,function (params) {
                        that.openPanel(params.features.properties);
                    });
                             
                });
            },

            initDate: function(){//设置时间
                var day1 = new Date();
                day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
                //前一天八点
                var last = day1.getFullYear() +
                    "-" + ((day1.getMonth() + 1) < 10 ? "0" + (day1.getMonth() + 1) : (day1.getMonth() + 1)) +
                    "-" + (day1.getDate() < 10 ? ("0" + day1.getDate()) : day1.getDate()) +
                    " 08:00:00";
                beginDate = last;
                $("#rainStartTime").val(beginDate);
                $("#rainEndTime").val(common.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss"));
            },
            loadListData: function (_dataList) {
                var tableData = [];
                var that = this;
                if (_dataList){
                    tableData = _dataList;
                }
                that.setListPage(tableData);
                that.gridDataSource.localdata = tableData;
                $("#rainfallstationList").jqxGrid({
                    source: that.gridDataSource
                });
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
            initMapData: function () {//初始化地图数据
                var that = this;
                var requestParams = that._param;
                
                requestParams.startTime = $('#rainStartTime').val();
                requestParams.endTime = $('#rainEndTime').val();
                requestParams.xzq="";
                requestParams.stsysArr=$("input:checkbox[name='rainfallstation_stsys']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');

                var checkval = $("#rainLevelForm").serializeArray();
                if (checkval.length > 0) {
                    var checkvalstring = "";
                    for (var i = 0; i < checkval.length; i++) {
                        checkvalstring += checkval[i].value + ',';
                    }
                    checkvalstring = checkvalstring.substring(0, checkvalstring.length - 1);
                    requestParams.rainfall = checkvalstring;
                }else{
                    requestParams.rainfall = "999-9999";
                }
                if(that.resetFlag){//如果重置
                    requestParams.rainfall = "";
                }

                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                http.getInstance("/subject/listStPptnRPage", {type: "post"}).ajax(requestParams).then(function (result) {
                    that.mapDataList=result.list;
                    that.queryLayerObjects(that.lastLayerTable)
                });
            },
            initListData: function () {
                var that = this;
                var sDate = new Date($('#rainStartTime').val());
                var eDate = new Date($('#rainEndTime').val());
                var requestParams = that._param;
                // requestParams.stnm =modal.search().stnm();
                requestParams.startTime = $('#rainStartTime').val();// $('#rainStartTime').val();
                requestParams.endTime = $('#rainEndTime').val();//$('#rainEndTime').val();
                requestParams.xzq = modal.search().xzq();
                requestParams.stsysArr=$("input:checkbox[name='rainfallstation_stsys']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');

                var checkval = $("#rainLevelForm").serializeArray();
                if (checkval.length > 0) {
                    var checkvalstring = "";
                    for (var i = 0; i < checkval.length; i++) {
                        checkvalstring += checkval[i].value + ',';
                    }
                    checkvalstring = checkvalstring.substring(0, checkvalstring.length - 1);
                    requestParams.rainfall = checkvalstring;
                }else{
                    requestParams.rainfall = "999-9999";
                }
                if(that.resetFlag){//如果重置
                    requestParams.rainfall = "";
                }

                // console.log(checkval);
                // requestParams.rainfall = $("input:checkbox[name='ylfw']:checked").map(function(index,elem) {
                //     return $(elem).val();
                // }).get().join(',');
                // return;
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                var url = auGurit.global.rootPath + "/subject/listStPptnRPage";

                $('#rainfallstationList').jqxGrid('showloadelement');
                $.ajax({
                    type: 'POST',
                    dataType: "json",
                    url: url,
                    data: requestParams,
                    success: function(result, textStatus, jqXHR){
                        if(result && result.success && (result.success === true || result.success === "true")){    
                            var data = result.content;
                            that._data = data;
                            that._pageInfo = {
                                totalPage: data.pages,
                                currentPage: data.pageNum,
                                currentRecord: data.size,
                                totalRecord: data.total
                            };
                            dataList = data.list;

                            that.setListData();//列表数据
                            that.maxValue = that.getMax();
                            if (data.list && that.maxValue > 200 && (eDate.getTime() - sDate.getTime() > 24 * 60 * 60 * 1000 )) {//如果有数据，且最大值>200，时间差>24小时。获得计算出来的雨量等级范围
                                that.getRainLevel(that.maxValue);
                                that.initWaterLevel();//重新初始化一次
                                use24H=false;                 
                            }else{
                                //恢复24小时
                                if (that.curRainLevel[0].text != that.level24[0].text&&!use24H) {
                                    use24H=true;
                                    for (var i = 0; i < that.curRainLevel.length; i++) {
                                        var level24 = that.level24[i];
                                        that.curRainLevel[i].min = level24.min;
                                        that.curRainLevel[i].max = level24.max;
                                        that.curRainLevel[i].text = level24.text;
                                    }
                                    that.initWaterLevel();//重新初始化一次
                                }
                            }
                            that.setWaterLevelState();//设置是否可以勾选

                            if(modal.search().stnm()!=''){
                                that.clickSearchByNameBtn();
                            }
                            
                        }else{
                            console.error("查询出错" + url + " \n" + data);
                        }
                        $('#rainfallstationList').jqxGrid('hideloadelement');
                    }
                  
                });

            },
            getText:function(dataObj){
                var textArr=[];
                textArr.push(dataObj.stnm);
                if(dataObj.sumDrp!=0){
                    textArr.push(parseFloat(dataObj.sumDrp).toFixed(1)+"");
                }
                return textArr;
            },
            getFeature:function(data){
                var that=this;
                var _feature = {};
                _feature.geometry = "POINT (" + data.x + " " + data.y + ")";
                _feature.properties = data;
                var index=that.getStyleIndex(data.sumDrp);
                var obj = that.curRainLevel[index];
                _feature.style = {
                    iconUrl: auGurit.global.rootPath + obj.iconUrl,
                    iconSize: [10, 10]
                };
                _feature.styleSelected = {
                    iconUrl: auGurit.global.rootPath + obj.iconUrl,
                    iconSize: [10, 10],
                    className: '_selected'
                }
                _feature.coor = [data.x,data.y];
                //color改成数组，与显示文本内容数组相一致，可以对应修改单行注记的颜色
                var label = {text: that.getText(data), font: null, color:[ null,obj.fontColor]};
                _feature.label = label;
                _feature.feature=_feature;
                return _feature;
            },
            addFeatures: function (data) {
                var that = this;
                //先清除上一次查询地图上面的所有点
                map._mapInterface.layerFeature.clearLayers();
                mapUtils.removeGlobalMapLayers(that.mapLayerTitle);
                if(!data) return;
                features = {}; 
                for (var i = 0; i < data.length; i++) {
                    if(serverStcds.indexOf(data[i].stcd)==-1)
                        continue;
                    features["feature_" + data[i].stcd] = that.getFeature(data[i]);
                };
                var layerGroup= map._mapInterface.IntelligenceLabel(features, function (params) {
                    that.openPanel(params.features.properties);
                });
                auGurit.global.mapLayers[that.mapLayerTitle] = layerGroup;
            },
            initWaterLevel: function () {
                var that = this;

                if(that.resetRainLevel){
                    $('#rainLevelForm').empty();

                    var vals=$("#selectVale").val();
                    for (var i = 0; i < that.curRainLevel.length; i++) {
                        var obj = that.curRainLevel[i];
                        var val=obj.min + '-' + obj.max ;
                        var option='<label><input name="ylfw" type="checkbox" ';
                        if(vals.indexOf(val)>-1||vals=='')
                            option+='checked';
                        option+=' value="'+val+'" data-min="' + obj.min + '" data-max="' + obj.max + '"/><b class="ylmark'+i+'"></b>' + obj.text + '</label>';
                        $('#rainLevelForm').append(option);
                    }

                    $("input[name='ylfw']").on("change", function (argument) {
                        that.resetFlag = false;
                        that.resetRainLevel = false;
                        var chk_value=[];
                        $('input[name="ylfw"]:checked').each(function(){ 
                            chk_value.push($(this).val()); 
                        });
                        $("#selectVale").val(chk_value);
                        that.initMapData();
                        that.initListData();
                    });
                }
            },
            setWaterLevelState: function () {
                var that = this;
                if (that.resetFlag) {
                    $('input[name="ylfw"]').each(function () {
                        var inputMax = $(this).data("max");
                        if (that.maxValue < $(this).data("min")) {  
                            $(this).removeAttr("checked");
                            $(this).attr("disabled", true);
                            $(this).parent().find("b").css({"color": "darkgray"});
                        } else {
                            $(this).prop("checked", true);
                            $(this).attr("disabled", false);
                            $(this).parent().find("b").css({"color": "black"});
                        }
                    });
                }
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (that._data && that._pageInfo.totalPage >= 1) {
                    $("#rainfallstationListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#rainfallstationListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    // $("#rainfallstationListPager").css("display", "none");
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
            getDataByDataList: function () {
                var that = this;
                searchDataList = new Array();
                var searchValue =modal.search().stnm();
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
                var that=this; 
                that.initDate();
                modal.search().stnm("");
                modal.search().xzq("");
                $("#rainLevelForm input[disabled!=disabled]").prop("checked", true);
                $("input[name='rainfallstation_stsys'] ").prop("checked", true);
            },
            clickSearchBtn: function (item) {
                var that = this;
                that.resetFlag=true;
                that.resetRainLevel=false;
                that.initListData();
                that.initMapData();
            },
            clickXZQBtn: function (item) {
                var that = this;
                that.resetFlag=false;
                that.resetRainLevel=false;
                that.initListData();
            },
            clickSearchByNameBtn: function () {//maxt
                var that = this;
                that.resetFlag=false;
                that.resetRainLevel=false;
                that.getDataByDataList();                
            },
            clickClearSearchBtn: function () {
                var that = this;
                that.resetFlag=false;
                that.resetRainLevel=false;
                modal.search().stnm("");
                that.loadListData(dataList);//jxq列表数据
                map._mapInterface.layerFeature.clearLayers();
            },
            clickResetBtn: function () {
                var that=this;
                that.resetFlag=true;
                that.resetRainLevel=true;                that.clearInput();
                that.initListData();
                that.initMapData();
                map._mapInterface.layerFeature.clearLayers();
            },
            //根据降雨量不同在确定地图上面定位的点的样式
            getDefaultStyle: function (rowData) {
                var that = this;
                var style;
                var drp = rowData.sumDrp;
                for (var i = 0; i < that.curRainLevel.length; i++) {
                    var obj = that.curRainLevel[i];
                    if (drp >= parseFloat(obj.min)) {
                        if (obj.max == '~' || drp <= parseFloat(obj.max)) {
                            style = {
                                iconUrl: auGurit.global.rootPath + obj.iconUrl,
                                iconSize: [10, 10]
                            };
                            break;
                        }
                    }
                }
                return style;
            },
            getStyleIndex:function (sumDrp) {
                var that = this;            
                var index=0;
                for (var i = 0; i < that.curRainLevel.length; i++) {
                    var obj = that.curRainLevel[i];
                    if (sumDrp >= parseFloat(obj.min)) {
                        if (sumDrp.max == '~' || sumDrp <= parseFloat(obj.max)) {
                            index=i;
                            break;
                        }
                    }
                }
                return index;
            },
            getMax: function () {//获得区间最大值
                var maxValue = 0;
                if (dataList) {
                    maxValue = dataList[0].sumDrp;
                    for (var i = 1; i < dataList.length; i++) {
                        maxValue = Math.max(maxValue, dataList[i].sumDrp);
                    }
                }
                return maxValue;
            },
            getRainLevel: function (_maxValue) {//计算雨量等级区间
                var that = this;
                var tempMax = ((_maxValue - _maxValue % 7) + 7);//获得最大值最近的7的倍数的值
                var step = parseInt(tempMax / that.curRainLevel.length);
                step = step - step % 5 + 5; //保证5的倍数
                var stepMax = 0;
                for (var i = 0; i < that.curRainLevel.length; i++) {
                    var stepMin = ((i == 0) ? 0 : i * step);
                    var stepMax = (i + 1) * step;
                    that.curRainLevel[i].min = stepMin;
                    that.curRainLevel[i].max = stepMax;
                    that.curRainLevel[i].text = stepMin + "~" + stepMax;
                }
                return that.curRainLevel;
            },
            openPanel:function(data) {
                var radio = 0.98;
                var top = 75;
                var left = 41;
                var title = data.stnm;
                var tm_s = $('#rainStartTime').val();
                var tm_e = $('#rainEndTime').val();
                common.openDialogPanalPop("view/app/watermap/topic/rainFallStation/rainWin", title, {
                    tm1: tm_s, tm2: tm_e, stcd: data.stcd, stnm: data.stnm
                }, 600, 480, top, left);
            },
            initLayout:function(){
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
                    $("#rainfallstationList").jqxGrid({
                        width: '78%'
                    });
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
                    $("#rainfallstationList").jqxGrid({
                        width: '100%'
                    });
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 154 : 283);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                $("#rainfallstationList").jqxGrid({
                   // width: '100%',
                    height: jqHeight
                });
            } 
        }

        var modal = {
            search: ko.observable({
                stnm:ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([{"value":"","title":"全部"},{"value":440103,"title":"荔湾区"},{"value":440104,"title":"越秀区"},{"value":440105,"title":"海珠区"},{"value":440106,"title":"天河区"},{"value":440111,"title":"白云区"},{"value":440112,"title":"黄埔区"},{"value":440113,"title":"番禺区"},{"value":440114,"title":"花都区"},{"value":440115,"title":"南沙区"},{"value":440116,"title":"萝岗区"},{"value":440199,"title":"北江区"},{"value":440183,"title":"增城区"},{"value":440184,"title":"从化区"}])
            }),
            clickSearchBtn: $.proxy(RainFallStation.clickSearchBtn, RainFallStation),
            clickSearchByNameBtn: $.proxy(RainFallStation.clickSearchByNameBtn, RainFallStation),
            clickResetBtn: $.proxy(RainFallStation.clickResetBtn, RainFallStation),
            clickClearSearchBtn: $.proxy(RainFallStation.clickClearSearchBtn, RainFallStation),
            clickXZQBtn : $.proxy(RainFallStation.clickXZQBtn, RainFallStation)
        };



        RainFallStation.init();
        return modal;
    });