define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "slickGrid", "jqxgrid.selection", "WdatePicker"],
    function ($, app, composition, ko, common, http, panal, pager, Slick) {
        var panalObj;
        var featureList;//加载列表所生成的点列表
        var lastLoactePoint;//上一个定位点
        var pointObj;
        var map;//地图对象
        var features; //所有要素对象
        var dataList;//从数据库拿到的数据
        var searchDataList;//如果通过搜索按钮搜索，则查询“通过查询通过数据库拿到的数据”
	    var resetLevel;//是否重新设置等级
    	//当前降雨量等级
        var curRainLevel=[
                          {id:"level-count-01",iconUrl:"style/asip/common/css/images/icon/white_circle.png",text: "0",min: "0.0",max: "0.0"},
                {id:"level-count-02",iconUrl:"style/asip/common/css/images/icon/cyan_circle.png",text: "0.1~1",min: "0.1",max: "1"},
                {id:"level-count-03",iconUrl:"style/asip/common/css/images/icon/yellow_circle.png",text: "1~25",min: "1.1",max: "25"},
                {id:"level-count-04",iconUrl:"style/asip/common/css/images/icon/green_circle.png",text: "25~50",min: "25.1",max: "50"},
                {id:"level-count-05",iconUrl:"style/asip/common/css/images/icon/blue_circle.png",text: "50~100",min: "50.1",max: "100"},
                {id:"level-count-06",iconUrl:"style/asip/common/css/images/icon/purple_circle.png",text: "100~200",min: "100.1",max: "200"},
                {id:"level-count-07",iconUrl:"style/asip/common/css/images/icon/red_circle.png",text: "200以上",min: "200.1",max: "99999"}
                ];//计算出来的雨量等级
        var RainFallCityStation = {
            init: function () {
                var that = this;
                composition.addBindingHandler("rainfallcitystationInitHandler", {
                    init: function (dom) {
			            that.maxValue=0;
                        resetLevel=true;
                        that.mapLayerTitle=modal._$_param.title   ;
                        panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onMaxShow = function () {
                        };
                        panalObj.settings.onClose = function () {
                            // if (pointObj) {
                            //     for (var i in pointObj) {
                            //         map.removeLayer(pointObj[i]);
                            //     }
                            // }
                        }
                        that.bindUI();
                        that.renderUI();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                var date = new Date();
                //当前时间
                var now = date.getFullYear() +
                    "-" + ((date.getMonth() + 1)<10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1)) +
                    "-" + (date.getDate()<10 ? ("0"+date.getDate()) : date.getDate()) +
                    " " + (date.getHours()<10 ? ("0"+date.getHours()) : date.getHours()) +
                    ":" + (date.getMinutes()<10 ? ("0"+date.getMinutes()) : date.getMinutes()) +
                    ":" + (date.getMinutes()<10 ? ("0"+date.getMinutes()) : date.getMinutes());
                var day1 = new Date();
                day1.setTime(day1.getTime()-24*60*60*1000);
                //前一天八点
                var last = day1.getFullYear() +
                    "-" + ((day1.getMonth() + 1)<10 ? "0"+(day1.getMonth()+1) : (day1.getMonth()+1)) +
                    "-" + (day1.getDate()<10 ? ("0"+day1.getDate()) : day1.getDate()) +
                    " 08:00:00";
                beginDate = last;
                endDate = now;
                //beginDate = "2017-06-11 08:00:00";
                //endDate = "2017-06-12 08:00:00";
                $("#startTime").val(beginDate);
                $("#endTime").val(endDate);
                var that = this;
                that.initPage(modal);
                that.initTableColumns();//初始化jqxgrid
                //读取降雨量等级数据
                var h = http.getInstance("data/rainlevel.json");
                h.ajax().then(function (data) {
                    that.data = data.level;
                    for (var i = 0; i < that.data.length; i++) {
                        var level = that.data[i];
                        if (level.id == 'level-24h') {
                            that.level24 = level.sublevel;                      
                            break;
                        }
                    }  
                    that.initWaterLevel();
                    that.getListData();
                });
                $("#startTime").click(function () {
		    resetLevel=true;
                    WdatePicker({readOnly: true, maxDate: "#F{$dp.$D('endTime')}"});
                });
                $("#endTime").click(function () {
 		    resetLevel=true;
                    WdatePicker({readOnly: true, minDate: "#F{$dp.$D('startTime')}"});
                });
                $("input[name='rainfallstation_stsys']").on("click",function(){
 			resetLevel=false;
                   that.getListData();
                })
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
                        hidden:true
                    },
                    {
                        id: "stcdStr",
                        text: "站点名称",
                        datafield: "stnm",
                        width: "50%",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
                        id: "drpStr",
                        text: "雨量(mm)",
                        datafield: "sumDrp",
                        width: "50%",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f1',
                    },
                    // {
                    //     id: "legend",
                    //     text: "",
                    //     datafield: "legend",
                    //     width: "10%",
                    //     align: "center",
                    //     cellsalign: "center",
                    //     cellsrenderer: that.legendFormatter
                    // }
                ];
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({
                        name: columns[i].datafield,
                        type: 'string'
                    });
                }
                that.gridDataSource = {};
                gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
                $("#rainfallcitystationList").jqxGrid({
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
                $('#rainfallcitystationList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    var id = dataObj.rowId;//暂时用rowId
                    var currentFeature = pointObj["feature_" + dataObj.stcd];
                    currentFeature.style = currentFeature.features.styleSelected;
                    map._mapInterface.layerLocate(currentFeature, that.callbackRestoreStyle);
                    var startDateVal = $('#startTime').val();
                    var endDateVal = $('#endTime').val();
                    openPanal(startDateVal, endDateVal, dataObj.stcd, dataObj.stnm);
                });
            },
            loadRainFallList: function (_dataList) {
                var tableData = [];
                var that = this;
                 if (_dataList)
                    tableData = _dataList;
                /*var options = {
                 enableCellNavigation: true,
                 enableColumnReorder: true,
                 multiSelect: false
                 };*/

                this.gridDataSource.localdata = tableData;
                $("#rainfallcitystationList").jqxGrid({
                    source: this.gridDataSource
                });
            },
            addFeatures: function (data) {
                var that = this;
                map = $("#desktop-main-map")[0].contentWindow.map;
                features = {};
                if(data){
                    for (var i = 0; i < data.length; i++) {
                        var feature = {};
                        feature.geometry = "POINT (" + data[i].x + " " + data[i].y + ")";
                        feature.properties = data[i];
                        feature.style = that.locationStyle(data[i]);
                        feature.styleSelected = {
                            "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                            "iconSize": [10, 10]
                        };
                        feature.tipContent = data[i].stnm+"<br>"+data[i].sumDrp+"m";
                        features["feature_" + data[i].stcd] = feature;
                    };
                   
                    if(resetLevel){
                        pointObj = map._mapInterface.addFeature(features, function (params) {
                            that.callbackRestoreStyle(params);
                            var param = params.features.properties;
                            var startDateVal = $('#startTime').val();
                            var endDateVal = $('#endTime').val();
                            openPanal(startDateVal, endDateVal, param.stcd, param.stnm)
                        });
                    }else{//不改变当前视图
                        pointObj = map._mapInterface.addFeatureUnmove(features, function (params) {
                            that.callbackRestoreStyle(params);
                            var param = params.features.properties;
                            var startDateVal = $('#startTime').val();
                            var endDateVal = $('#endTime').val();
                            openPanal(startDateVal, endDateVal, param.stcd, param.stnm)
                        });
                       
                    }
                }
            },
            getListData: function () {
                var that = this;
                var sDate = new Date($('#startTime').val());
                var eDate = new Date($('#endTime').val());
		        var h = http.getInstance("/subject/listStPptnRPage", {
                    type: "post"
                });
                var requestParams = that._param;
                requestParams.startTime = $('#startTime').val();
                requestParams.endTime = $('#endTime').val();
                requestParams.stnm = $("#stnm").val();
                requestParams.stsys ='智能水网';
                var checkval = $("#myform").serializeArray();
                if (checkval.length > 0) {
                    var checkvalstring = "";
                    for (var i = 0; i < checkval.length; i++) {
                        checkvalstring += checkval[i].value + ',';
                    }
                    checkvalstring = checkvalstring.substring(0, checkvalstring.length - 1);
                    requestParams.rainfall = checkvalstring;
		}else {//否则搜索不出内容
                    requestParams.rainfall = "9999999999-99999999999";
                }
                if(resetLevel){//如果重置等级，全部调取数据
                    requestParams.rainfall = "";
                }

      		var chk_stsys= new Array();
                var stsysStr="";
                $('input[name="rainfallstation_stsys"]:checked').each(function () {
                    chk_stsys.push($(this).val());
                    stsysStr += $(this).val() + ',';
                });
                if(stsysStr==""){stsysStr="查不到";}
                requestParams.stsysArr=stsysStr;//chk_stsys.toString();
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    that._data = data;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };
		            dataList=result.list;
                    that.setListData();
                    //先清除上一次查询地图上面的所有点
                    if(auGurit.global.mapLayers["城区雨量"]) {
                        var prePointObject = auGurit.global.mapLayers["城区雨量"];
                        if (prePointObject) {
                            for (var i in prePointObject) {
                                map.removeLayer(prePointObject[i]);
                            }
                        }     
                    }

                    that.maxValue=that.getMax();
                    if(result.list&&that.maxValue>200&&(eDate.getTime() - sDate.getTime() > 24 * 60 * 60 * 1000 )){//如果有数据，且最大值>200，时间差>24小时。获得计算出来的雨量等级范围                        
                        that.getRainLevel(that.maxValue);   
                        that.initWaterLevel();//重新初始化一次                     
                    }else if(curRainLevel[0].text!=that.level24[0].text){                        
                        for(var i=0;i<curRainLevel.length;i++){  
                            var level24=that.level24[i];
                            curRainLevel[i].min=level24.min;
                            curRainLevel[i].max=level24.max;
                            curRainLevel[i].text=level24.text;
                        }
                        that.initWaterLevel();//重新初始化一次
                    }             
                    that.setWaterLevelState();//设置是否可以勾选
                    that.addFeatures(result.list);
                    auGurit.global.mapLayers["城区雨量"] = pointObj;
                    //auGurit.global.mapLayers[that.mapLayerTitle] = pointObj;
                });
	        },
             initWaterLevel:function () {
                var that=this;
                $('#myform').empty();                
                for (var i = 0; i < curRainLevel.length; i++) {
                    var obj = curRainLevel[i];
                    var styleStr = 'style="background: url(' + auGurit.global.rootPath + obj.iconUrl + ') no-repeat 0 2px;background-size: 14px 14px;"';
                    $('#myform').append('<label><input name="ylfw" type="checkbox" checked value="' + obj.min+'-'+obj.max+ '" data-min="'+obj.min+'" data-max="'+obj.max+'"/><b ' + styleStr + '>' + obj.text + '</b> </label>');
                }
                $("input[name='ylfw']").on("change",function (argument) {
                    resetLevel=false; 
                    that.getListData();
                })

                $('.rainfallstation_table_b').css('top', '230px');
            },
            setWaterLevelState:function(){
                var that=this;
                if(resetLevel){
                    
                    $('input[name="ylfw"]').each(function () {
                        var inputMax=$(this).data("max");
                        console.log(that.maxValue+"||最大值"+$(this).data("max")+"||最小值"+$(this).data("min"));
                        if(that.maxValue<$(this).data("min")){
                            //$(this).attr("checked",false);  
                            $(this).removeAttr("checked"); 
                            $(this).attr("disabled",true);  
                            $(this).parent().find("b").css({"color": "darkgray"});
                        }else{
                            $(this).prop("checked",true); 
                            $(this).attr("disabled",false);  
                            $(this).parent().find("b").css({"color": "black"});
                        }
                    });
                }
            },

            setListData: function () {
                var that = this;
                //处理分页
                if (that._data && that._pageInfo.totalPage >= 1) {
                    $(".list-datagroup-pager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $(".list-datagroup-pager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                that.getListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    $(".list-datagroup-pager").css("display", "none");
                    $(".list-datagroup-content").css("bottom", 0);
                }
                that.loadRainFallList(dataList); 
            },
     
            getDataByDataList:function (){//maxt
                var that = this;
      
                searchDataList=new Array();
                var searchValue=$("#rainfallstation_stnm").val();
                for(var i=0;i<dataList.length;i++){
                    var item=dataList[i];       
                    var itemFeature=pointObj["feature_" + item.stcd];
                    if(item.stnm.indexOf(searchValue)>-1||item.stcd.indexOf(searchValue)>-1){ 
                        searchDataList.push(item);
                        itemFeature.style = {
                            "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat_s.gif",
                            "iconSize": [16, 16]
                        };                       
                                                                                                 
                    }else{
                        itemFeature.style = that.locationStyle(itemFeature.features.properties);
                       
                    }
                    map._mapInterface.setFeatureStyle(itemFeature);   
                }
                that.loadRainFallList(searchDataList);//jxq列表数据
            },
            clickSearchBtn: function () {
                var that = this;
                resetLevel=true;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickSearchByNameBtn: function () {//maxt
                var that = this;
                resetLevel=false;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;             
                that.getDataByDataList();                
            },
            clickClearSearchBtn:function () {
                var that=this;
                // 清除缓存
		        resetLevel=true;
                $("#rainfallstation_stnm").val('');
                that.callbackRestoreStyle(null);//还原样式
                that.loadRainFallList(dataList);//jxq列表数据
            },      
            clickResetBtn: function () {
		        resetLevel=true;
                $('#startTime').val('');
                $('#endTime').val('');
                $('#FW').val('');
                $('#LY').val('');
                $("#stnm").val('');
                $("#myform input:checkbox").removeAttr("checked");
            },
            legendFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var that = RainFallCityStation;
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div></div>');
                var data = this.owner.host.jqxGrid('getrowdata', row);
                //雨量
                var drp = data.sumDrp;

                    for (var i = 0; i <curRainLevel.length; i++) {
                        var obj = curRainLevel[i];
                        if (drp >= parseFloat(obj.min)) {
                            if (obj.max == '~' || drp <= parseFloat(obj.max)) {
                                $iconDiv.css('background', 'url(' + auGurit.global.rootPath + obj.iconUrl + ') center center no-repeat');
                                break;
                            }
                        }
                    }
                
		        $iconDiv.css('height', '10px');

                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            //回调还原非选中点的样式
            callbackRestoreStyle: function (data) {
                for (var i in pointObj) {
                    if (pointObj[i] != data) {
                        var otherLocateFeature = pointObj[i];
                        otherLocateFeature.style = RainFallCityStation.locationStyle(pointObj[i].features.properties);
                        map._mapInterface.setFeatureStyle(otherLocateFeature);
                    }
                }
            },
            //根据降雨量不同在确定地图上面定位的点的样式
            locationStyle: function (rowData) {
                var that = this;
                var style;
                var drp = rowData.sumDrp;
                
                    for (var i = 0; i < curRainLevel.length; i++) {
                        var obj = curRainLevel[i];
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
            getMax:function(){//获得区间最大值
                var maxValue=0;
                if(dataList){
                    maxValue=dataList[0].sumDrp;
                    for (var i=1;i<dataList.length;i++){                    
                        maxValue=Math.max(maxValue,dataList[i].sumDrp);
                    } 
                }   
                return  maxValue;        
            },
            getRainLevel:function(_maxValue){//计算雨量等级区间   
                var that=this; 
                var tempMax=((_maxValue-_maxValue%7)+7);//获得最大值最近的7的倍数的值
                var step=parseInt(tempMax/curRainLevel.length);  
                step=step-step%5+5; //保证5的倍数        
                var stepMax=0;
                for(var i=0;i<curRainLevel.length;i++){  
                    var  stepMin= ((i==0)?0:i*step);
                    var  stepMax= (i+1)*step;
                    curRainLevel[i].min=stepMin;
                    curRainLevel[i].max=stepMax;
                    curRainLevel[i].text=stepMin+"~"+stepMax;
                }
                return curRainLevel;
            }
        }

        var modal = {
            clickSearchBtn: $.proxy(RainFallCityStation.clickSearchBtn, RainFallCityStation),
            clickSearchByNameBtn: $.proxy(RainFallCityStation.clickSearchByNameBtn, RainFallCityStation),
            clickResetBtn: $.proxy(RainFallCityStation.clickResetBtn, RainFallCityStation),
            clickClearSearchBtn: $.proxy(RainFallCityStation.clickClearSearchBtn, RainFallCityStation)
        }; 
            


        function openPanal(tm_s, tm_e, stcd, stnm) {
            var radio = 0.98;
            var height = Math.ceil($("#desktop-map").height() * radio) - 8;
            var top = 75;
            var left = 41;
            var title = stnm;
            common.openDialogPanal("view/app/watermap/rainFallStation/rainWin", title, {
                tm1: tm_s, tm2: tm_e, stcd: stcd, stnm: stnm
            }, 600, 500, top, left);
        }

        //点定位callback
        function getLocatedPoint(point) {
            lastLoactePoint = point;
        }

        //画出所有要素以后所返回的对应的地图对象
        function getFeatureList(features) {
            featureList = features;
        }

        //点定位完成后所绑定的点击事件
        function bindOnclick(feature) {
            // var that = this;
            // var $tipWin = $("#desktop-main-map").contents().find("#agcom_2dmap").contents().find('#tipWin');
            // var attr = feature.properties;
            // $tipWin.append('<label style="padding-top: 5px">站名：'+attr.stnm+'</label><br><label>雨量：'+attr.sumDrp+'(mm)</label>')
        }

        RainFallCityStation.init();
        return modal;
    });