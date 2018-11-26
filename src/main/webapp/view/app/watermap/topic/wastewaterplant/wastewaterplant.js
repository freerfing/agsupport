define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
		var curPanal;
        var panalObj;
        var map; //地图对象
        var features;//所有要素对象
        var dataList;
		var Wastewaterplant = {
			init: function() {
				var that = this;
				composition.addBindingHandler("wastewaterplantInitHandler", {
					init: function(dom) {
                        that.layerArr=[];//存放图层的数组，这里有服务一个图层、渲染的点一个图层
                        panalObj = panal.getPanalByElement(dom);
                        that.mapLayerTitle=modal._$_param.title;
						that.renderUI();
						that.bindUI();
						that.initLayout();
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
                that.dateFmt='yyyy-MM-dd  HH:mm:ss';
                $("input[name='ptype']").on("click",function(){
                    that.radioClick();
                });

                $("input[name='time_type']").change(function(){
                    var type=$(this).val();
                    $("#plantTime").toggle();
                    $("#plantDate").toggle();
                    that.radioClick();
                });
            },
            radioClick:function(){
                var that = this;
                var timeType = $("input[name='time_type']:checked").val();
                var ptype=$("input[name='ptype']:checked").val();
                if(ptype ==='1'&&timeType ==='day'){
                    $('#wastewaterplantList').jqxGrid('showcolumn', 'standardState');
                }else{
                    $('#wastewaterplantList').jqxGrid('hidecolumn', 'standardState');
                }
                that.clickSearchBtn();
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
                        type: 'string',
                        datafield: "stcd",
						width:125,
						align: "center",
						cellsalign: "center",
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
                        id: "stnm",
                        text: "污水厂名称",
                        datafield: "stnm",
                        type:"string",
                        // width: "40%",
                        width:125,
                        align: "center",
                        cellsalign: "center",
                        // pinned: true
                    },{
                        id: "standardState",
                        type:"string",
                        text: "达标情况",
                        datafield: "standardState",
                        // width: "20%",
                        width:65,
                        hidden:true,
                        align: "center",
                        cellsalign: "center",
                        cellclassname: that.standardClass,
                        cellsrenderer: that.standardFormatter
                    },{
                        id: "CoDcr",
                        type:"float",
                        text: "CODcr<br/>(mg/L)",
                        datafield: "codcr",
                        // width: "20%",
                        width:65,
                        align: "center",
                        cellsalign: "center",
                        cellsformat:"d2",
                        renderer:that.headerFormatter 
                    },{
                        id: "nh3n",
                        type:"float",
                        text: "氨氮<br/>(mg/L)",
                        datafield: "nh3n",
                        // width: "20%",
                        width:65,
                        align: "center",
                        cellsalign: "center",
                        cellsformat:"d2",
                        renderer:that.headerFormatter 
                    },{
						id: "tn",
						type:"float",
						text: "总氮<br/>(mg/L)",
						datafield: "tn",
						width:65,
						align: "center",
						cellsalign: "center",
						cellsformat:"f3",
						renderer:that.headerFormatter
					},{
						id: "tp",
						type:"float",
						text: "总磷<br/>(mg/L)",
						datafield: "tp",
						width:65,
						align: "center",
						cellsalign: "center",
						cellsformat:"f3",
						renderer:that.headerFormatter
					},{
						id: "dox",
						type:"float",
						text: "溶解氧<br/>(mg/L)",
						datafield: "dox",
						width:65,
						align: "center",
						cellsalign: "center",
						cellsformat:"f3",
						renderer:that.headerFormatter
					},{
						id: "ss",
						type:"float",
						text: "悬浮物<br/>(mg/L)",
						datafield: "ss",
						width:65,
						align: "center",
						cellsalign: "center",
						cellsformat:"f2",
						renderer:that.headerFormatter
					},{
						id: "ph",
						type:"float",
						text: "PH",
						datafield: "ph",
						width:65,
						align: "center",
						cellsalign: "center",
						cellsformat:"f2"
					},{
						id: "envt",
						type:"float",
						text: "环境温度<br/>(℃)",
						datafield: "envt",
						width:65,
						align: "center",
						cellsalign: "center",
						cellsformat:"f2",
						renderer:that.headerFormatter
					},{
						id: "humid",
						type:"float",
						text: "湿度<br/>(mg/L)",
						datafield: "humid",
						width:65,
						align: "center",
						cellsalign: "center",
						cellsformat:"f3",
						renderer:that.headerFormatter
					},{
                        id: "q2",
                        type:"float",
                        text: "水流量<br/>(l/s)",
                        datafield: "q2",
                        // width: "25%",
                        width:80,
                        align: "center",
                        cellsalign: "center",
                        cellsformat:"d2",
                        renderer:that.headerFormatter 
                    },{
						id: "addvcd",
						text: "行政区",
						datafield: "addvcd",
						type:"string",
						align: "center",
						cellsalign: "center",
						width: 65
					},{
						id: "spt",
						type:"string",
						text: "采集时间",
						datafield: "spt",
						width: "150",
						align: "center",
						cellsalign: "center",
						// cellsrenderer: that.dateFormatter
					}
                ];
				var maxcolumns = columns.slice(1, columns.length);
				maxcolumns.unshift({
					id: "stcd",
					text: "站点id",
					datafield: "stcd",
					width:125,
					align: "center",
					cellsalign: "center"
				});
				that._mincolumns = columns;
				that._maxcolumns = maxcolumns;
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

                $("#wastewaterplantList").jqxGrid({
                    width: '100%',
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    columnsheight: 35,
                    selectionmode: 'singlerow',
                    columns: columns
                });
                $('#wastewaterplantList').on('rowclick', function (event) {
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
            standardFormatter:function (row, columnfield, value, defaulthtml, columnproperties) {
                var standard="";
                if (value === 0) {
                    standard="未达标";
                } else if (value === 1) {
                    standard="达标";
                }
                var $cellHtml = $(defaulthtml);
                $cellHtml.empty();
                $cellHtml.append(standard);
                return $cellHtml[0].outerHTML;
            },
            standardClass: function (row, columnfield, value) {
                if (value === 0) {
                    return 'red';
                } else if(value === 1){
                     return 'green'
                }
                else return '';
            },
            loadListData: function (_dataList) {
	            var that = this;
                var tableData = [];
                if (_dataList){
                    tableData = _dataList;
					var xzqs = {440103:"荔湾区",440104:"越秀区",440105:"海珠区",440106:"天河区",440111:"白云区",440112:"黄埔区",440113:"番禺区",440114:"花都区",440115:"南沙区",440116:"萝岗区",440117:"从化区",440118:"增城区"};
                    for(var i=0; i < _dataList.length; i++) {
						_dataList[i].addvcd = xzqs[_dataList[i].addvcd] || _dataList[i].addvcd;
                    }
                }
                that.setListPage(tableData);
                that.gridDataSource.localdata = tableData;
                $("#wastewaterplantList").jqxGrid({
                    source: that.gridDataSource
                });
            },
            initMapData: function () {//初始化地图数据
                var that = this;
                var requestParams = that._param;

                var timeType = $("input:radio[name='time_type']:checked").val();
                var url="/subject/listWasteWaterPlant";
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                
                if(timeType==='day'){
                    url="/subject/listWasteWaterPlantDay";
                    requestParams.date =modal.search().dayDate();
                    requestParams.sdate =modal.search().sdayDate();
                }
                requestParams.xzq="";
                requestParams.type =$("input:radio[name='ptype']:checked").val();
                // requestParams.type=$("input:checkbox[name='ptype']").map(function(index,elem) {
                //     return $(elem).val();
                // }).get().join(',');
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                http.getInstance(url, {type: "post"}).ajax(requestParams).then(function (result) {
                    that.addFeatures(result.list);
                });
            },
            initListData: function () {//列表数据筛选
                var that = this;
                var requestParams = that._param;

                var timeType = $("input:radio[name='time_type']:checked").val();
                var url="/subject/listWasteWaterPlant";
                requestParams.date =modal.search().date();
                requestParams.sdate =modal.search().sdate();
                if(timeType==='day'){
                    url="/subject/listWasteWaterPlantDay";
                    requestParams.date =modal.search().dayDate();
                    requestParams.sdate =modal.search().sdayDate();
                }

                //requestParams.stnm =modal.search().stnm();
                
                requestParams.xzq = modal.search().xzq();
                requestParams.type =$("input:radio[name='ptype']:checked").val();
                // requestParams.type=$("input:checkbox[name='ptype']:checked").map(function(index,elem) {
                //     return $(elem).val();
                // }).get().join(',');
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;

                $('#wastewaterplantList').jqxGrid('showloadelement');
                http.getInstance(url, {type: "post"}).ajax(requestParams).then(function (result) {
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
                    $('#wastewaterplantList').jqxGrid('hideloadelement');
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (dataList && that._pageInfo.totalPage >= 1) {
                    $("#wastewaterplantListPager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);
                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $("#wastewaterplantListPager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                that.initListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    // $("#wastewaterplantListPager").css("display", "none");
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
                for(var i=0; i<data.length; i++) {
                	if(data[i].x && data[i].y) {
						features["feature_"+data[i].stcd] = that.getFeature(data[i]);
					}
                }
                //添加服务图层
                that.addDynamicMapLayer(function (layer) {
                    that.layerArr.push(layer);                           
                });
                //智能标注
                var layerGroup= map._mapInterface.IntelligenceLabel(features, function (params) {
                    that.openPanel(params.features.properties);
                },that.mapLayerTitle);
                that.layerArr.push(layerGroup);
                //添加
                auGurit.global.mapLayers[that.mapLayerTitle] = that.layerArr;  
            },
            getFeature:function(data){
                var that=this;
                var _feature = {};
                _feature.geometry = "POINT (" + data.x + " " + data.y + ")";
                _feature.properties = data;
                _feature.style = that.getDefaultStyle(data.stnm);
                _feature.styleSelected =that.getDefaultStyle(data.stnm);
                _feature.styleSelected.className='_selected';
                _feature.coor = [data.x,data.y];
                var label = {text: that.getText(data), font: null};
                _feature.label = label;
                _feature.feature=_feature;
                return _feature;
            },
            getText:function(dataObj){
                return [dataObj.stnm];
            },
            getTipContent:function(dataObj){
                var tipContent =dataObj.stnm;
                if(dataObj.codcr) 
                    tipContent+="<br/>CODCR:"+(dataObj.codcr).toFixed(2)+"mg/L";
                if(dataObj.nh3n) 
                    tipContent+="<br/>氨氮:"+(dataObj.nh3n).toFixed(3)+"mg/L";
                if(dataObj.q2) 
                    tipContent+="<br/>水流量:"+(dataObj.q2).toFixed(3)+"L/s";
            },
            dateFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var date=value.substring(2);
                $cellHtml.empty();
                $cellHtml.append(date.replace(/-/g,"/"));
                return $cellHtml[0].outerHTML;
            },
            getDefaultStyle:function(name){
                var icon ="wujinkou.png";
                if(name.indexOf("出水口")>-1){
                    icon ="wuchukou.png"
                }
                var style={
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/"+icon,
                        "iconSize": [16, 16]
                    };
                return style;
            },
            clearInput:function(){
                var that=this;
                // $("input[name='ptype']").each(function(){
                //    $(this).prop({"checked": true});
                // });
                // $($('#'+id+' input').eq(0)).prop('checked',true);
                
                $("input:radio[name='ptype']").eq(1).prop({"checked": true});
                $("input:radio[name='time_type']").eq(0).prop({"checked": true});
                debugger;
                //时间
                var nowTm=common.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
                modal.search().sdate(common.getPastDate(nowTm,3));
                modal.search().date(nowTm);

                that.time = nowTm.split(" ")[1];//时分秒
                //日期
                modal.search().sdayDate(common.getPastDate(nowTm.split(" ")[0],7,"yyyy-MM-dd"))
                modal.search().dayDate(nowTm.split(" ")[0]);

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
            clickXZQBtn: function () {
                var that = this;
                that.initListData();
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
                    // dateFmt:'yyyy-MM-dd  HH:mm:ss',
                    readOnly: true,
                    maxDate: "%y-%M-%d",
                    onpicked: function (dp) {


                        that.time = dp.cal.getNewDateStr().split(" ")[1];

                        modal.search().sdate(common.getPastDate(dp.cal.getNewDateStr(),3));
                        modal.search().date(dp.cal.getNewDateStr());

                        modal.search().sdayDate(common.getPastDate(dp.cal.getNewDateStr().split(" ")[0],7,"yyyy-MM-dd"));
                        modal.search().dayDate(dp.cal.getNewDateStr().split(" ")[0]);
                        that.clickSearchBtn();
                    }

                });  
            },
            clickDayDate:function(){
                var that=this;
                WdatePicker({
                    dateFmt:'yyyy-MM-dd',
                    readOnly: true,
                    maxDate: "%y-%M-%d",
                    onpicked: function (dp) {
                        //时间3天内
                        var tmStr = dp.cal.getNewDateStr()+" "+that.time;
                        modal.search().sdate(common.getPastDate(tmStr,3));
                        modal.search().date(tmStr);

                        //日期 7天内
                        modal.search().sdayDate(common.getPastDate(dp.cal.getNewDateStr(),7,"yyyy-MM-dd"));
                        modal.search().dayDate(dp.cal.getNewDateStr());
                        that.clickSearchBtn();
                    }

                });  
            },
            getBeforeDateStr:function(now,day){//现在日期时间

            },
            getDataByDataList:function (){//maxt
                var that = this;
                searchDataList=new Array();
                var searchValue=modal.search().stnm();
                if(searchValue==''){
                    alert("请输入站名/站号");
                    return;
                }
                if(!dataList) return;
                for(var i=0;i<dataList.length;i++){
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
                var radio = 0.98;
                var top = 75;
                var left = 41;
                var title = data.stnm;
                data.timeType = $("input:radio[name='time_type']:checked").val();                
                data.date =modal.search().date();
                if(data.timeType==='day'){
                    data.date =modal.search().dayDate();
                }
                common.openDialogPanalPop("view/app/watermap/topic/wastewaterplant/wastewaterplantWin", title,data, 600, 500,top,left);
            },
            initLayout:function(){
				var that = this, newcolumns = undefined;
                if(panalObj.getSizeState() == "max" ){
                    $(".telemetryStation_query_com_icon").css({'margin-top':'-28px','margin-left':'70px'});
                    $("#yl_icon").css({'margin-left':'153px'});
					if(that.gridDataSource) {
						newcolumns = that._maxcolumns;
                    }
                }else{
                    $(".telemetryStation_query_com_icon").css({'margin-top':'0','margin-left':'0'});
					if(that.gridDataSource) {
						newcolumns = that._mincolumns;
					}
                }
                var topHeight=(panalObj.getSizeState() == "max" ? 154 : 240);//$("#" + modal._$_param.panelId ).find(".telemetryStation_query_c").height() + 45;
                var jqHeight = $("#" + modal._$_param.panelId ).height() - topHeight;
                if(newcolumns) {
					$("#wastewaterplantList").jqxGrid({
						width: '100%',
						height: jqHeight,
                        columns: newcolumns
					});
                } else {
					$("#wastewaterplantList").jqxGrid({
						width: '100%',
						height: jqHeight
					});
                }
            }
		};

		var modal = {
            search: ko.observable({
                stnm:ko.observable(""),
                date:ko.observable(""),
                sdate:ko.observable(""),
                dayDate:ko.observable(""),
                sdayDate:ko.observable(""),
                xzq: ko.observable(""),
                xzqList: ko.observableArray([
                    {"value":"","title":"全部"},
                    {"value":440103,"title":"荔湾区"},
                    {"value":440104,"title":"越秀区"},
                    {"value":440105,"title":"海珠区"},
                    {"value":440106,"title":"天河区"},
                    {"value":440111,"title":"白云区"},
                    {"value":440112,"title":"黄埔区"},
                    {"value":440113,"title":"番禺区"},
                    {"value":440114,"title":"花都区"},
                    {"value":440115,"title":"南沙区"},
                    {"value":440116,"title":"萝岗区"},
                    {"value":440118,"title":"增城区"},
                    {"value":440117,"title":"从化区"}
                ])
            }),
            clickDate:$.proxy(Wastewaterplant.clickDate, Wastewaterplant),
            clickDayDate:$.proxy(Wastewaterplant.clickDayDate, Wastewaterplant),
            clickSearchBtn: $.proxy(Wastewaterplant.clickSearchBtn, Wastewaterplant),
            clickResetBtn: $.proxy(Wastewaterplant.clickResetBtn, Wastewaterplant),
            clickSearchByNameBtn: $.proxy(Wastewaterplant.clickSearchByNameBtn, Wastewaterplant),
            clickClearSearchBtn: $.proxy(Wastewaterplant.clickClearSearchBtn, Wastewaterplant),
            clickXZQBtn: $.proxy(Wastewaterplant.clickXZQBtn, Wastewaterplant)
		};


		Wastewaterplant.init();
		return modal;
	});