define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop","highcharts","tabs", "echarts3_8_4","WdatePicker","animateLoad"],
    function ($, app, composition, ko, common, http, panal,panalPop,highcharts,tabs, echarts,wdatePicker,animateLoad) {
        var dataList,interval,idx;
        var loadDivHeight,loadTop,waterLevelRange,isInFloodSeasonFlag;
        var panalObj;
        var myChart;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("reservoirWinHandler", {
                    init: function (dom) {
                        
                        panalObj = panalPop.getPanalByElement(dom);
                        that.data=panalObj.param;

                        interval=null;
                        idx=0;
                        loadDivHeight=16;//自己计算高度，定死div总高度
                        loadTop="4.5em";
                        
                        that.isPlaying=false;
                        waterLevelRange=new Array(0,0,10);//水位区间
                        panalObj.settings.onMaxShow = function () {
                        };
                        panalObj.settings.onClose = function () {
                            that.stopPlaying();
                        };                   
                       
                        
                        that.renderUI();
                        that.bindUI();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                var that = this;

                var tm_e = that.data.date;
                $("#from_date").val(common.getYestday8Clock(tm_e));
                $("#to_date").val(tm_e);


                 //调取数据
                that.loadTabs();
                that.getData();
                 $("#from_date").click(function () {
                    wdatePicker({
                        onpicked: function (dp) {
                            that.clickSearchBtn();
                        },
                        dateFmt: 'yyyy-MM-dd HH:mm:ss',
                        maxDate: "#F{$dp.$D('to_date')}"
                    });
                });
                $("#to_date").click(function () {
                    wdatePicker({
                        onpicked: function (dp) {
                            that.clickSearchBtn();
                        },
                        dateFmt: 'yyyy-MM-dd HH:mm:ss',
                        minDate: "#F{$dp.$D('from_date')}"
                    });
                });
                
                $("#playBtn").click(function() {
                    that.playProfile();
                });
                $("#xxswBtn").click(function() {
                    that.swToggle();
                });
            },
            playProfile:function(){
                var that = this;
                var HDGC=waterLevelRange[2];//that.newestWaterLevel;//河道高程
                var currentDivHeight;//当前高度
                var that = this;
                if(!dataList) 
                    return;                
                if(that.isPlaying){
                    that.isPlaying = false;
                    $("#playBtn").text("播放");
                    clearInterval(interval);
                }else{
                    var speed=$("#speed").val();
                    that.isPlaying = true;
                    $("#playBtn").text("停止");

                    interval = setInterval(function(){
                        if(idx<0){
                            that.isPlaying = false;
                            clearInterval(interval);
                            $("#playBtn").text("播放");
                            idx=dataList.length-1;
                            return;
                        };
                        waterLevel=parseFloat(dataList[idx].rz);
                        currentDivHeight=((waterLevel-waterLevelRange[0])/HDGC)*loadDivHeight;
                        $("#updateTime").text("上报时间："+dataList[idx].tm);//采集时间
                        $("#curWaterLevel").text(waterLevel.toFixed(2)+"m");
                        $("#load .box").css({                  
                            "height":currentDivHeight+"em",
                            "top":loadDivHeight-currentDivHeight+"em"
                        });                            
                        idx--;
                    },speed*1000);  
                                      
                }
            },            
            loadTabs:function(){
                var that = this;
                isInFloodSeasonFlag=that.getIsInFloodSeason();//是否在汛期
  	            var playButtonStr='<div id="playButton" class="detail_playbtn_container">'+
                    '<span class="reservoir_query_name">播放速度：</span><span>'+
                        '<select id="speed">'+
                           // '<option selected value=""></option>'+
                            '<option value="0.5">0.5秒</option>'+
                            '<option value="1">1秒</option>'+
                            '<option value="2">2秒</option>'+
                            '<option value="3">3秒</option>'+
                            '<option value="5">5秒</option>'+
                            '<option value="10">10秒</option>'+
                        '</select>'+
                    '</span>'+
                    '<button id="playBtn">播放</button>';
                    if(that.data.jjsw!=""){
                        var className="i-icon-unselect";
                        if(isInFloodSeasonFlag){
                            className="i-icon-select";
                        }
                        playButtonStr+='<span id="xxswBtn"><i class="i-icon '+className+'"></i>汛限水位</span>';
                    }
                playButtonStr+='</div>';
                var t = tabs.getInstance([{
                    id: "reservoirProfileInfo",
                    title: "水位剖面图",
                    content: playButtonStr+'<div class="detail_tab_container popeProfile_tab"><div id="reservoirProfileInfoTab" class="profile-container" style="width:100%"></div></div>',
                    selected: true
                },{
                    id: "chartInfo",
                    title: "水位过程线",
                    content: '<div class="detail_tab_container"><div id="hisChart"></div></div>',
		            selected: false
                },{
                    id: "tableInfo",
                    title: "数据列表",
                    content:'<div class="detail_tab_container"><div id="historyList"></div></div>',
                     selected: false
                }], {
                    replace: $("#reserviorWinTab"),
                    contentBorder: true,
                    onSelect: function(tabId, title){
                    },
                    onClose: function(tabId, title){
                    },
                    height: '100%',
                    width:'100%'
                });
            },
            stopPlaying:function(){
                var that=this;
                if(that.isPlaying){
                    that.isPlaying = false;
                    $("#playBtn").text("播放");
                    clearInterval(interval);
                }
            },
            getData: function () {
                var that = this;   
                var fromDate = $('#from_date').val();
                var toDate = $('#to_date').val();   
                isInFloodSeasonFlag=that.getIsInFloodSeason();
                that.stopPlaying();
                var h = http.getInstance("subject/queryReservoirPeriod",{type:"post"});
                h.ajax({stcd:that.data.stcd,fromDate: fromDate, toDate: toDate}).then(function(result){
                    that.hasData=false;
	                if(result) {
                        idx=result.length-1;
                        dataList= result;
                        $("#playButton").show();
                        waterLevelRange=that.getWaterLevelRange(dataList);//获得水位区间
                        that.hasData=true;
                        that.data.rz = result[0].rz;
                        that.data.tm = result[0].tm;
                    }else{
                        $("#playButton").hide();
                        that.data.tm = "无检测值";
                    }     

                    that.loadChart(result);
                    that.loadHistoryWaterList(result);
                    that.initShape();//初始化剖面图
                    common.hideLoading();
                })
            },
            loadHistoryWaterList: function (result) {
                var that = this;         
                columns = [                   
                    {
                        id: "tm",
                        text: "上报时间",
                        datafield: "tm",
                        width: "50%",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
                        id: "rz",
                        text: "水位(m)",
                        datafield: "rz",
                        width: "50%",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    }
                    // ,{
                    //     id: "drp",
                    //     text: "降雨量(mm)",
                    //     datafield: "drp",
                    //     width: "25%",
                    //     align: "center",
                    //     cellsalign: "center",
                    //     cellsformat: 'f1',
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
                    localdata: result,
                    datadatadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
                $("#historyList").jqxGrid({
                    width: "99%",
                    height:"100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    //selectionmode: 'singlecell',
                    columns: columns
                });
            },
            initShape:function() {
                var that = this;
                $("#reservoirProfileInfoTab").empty();
                var COMB_NAME=that.data.stnm;//站名

                var SOURCE=that.data.stsys;//数据来源

                var WATER_LEVEL=that.data.rz?that.data.rz:0;//当前水位

                var TIME_KEY=that.data.tm?that.data.tm:"无检测值";//上报时间

                var JJSW=that.data.jjsw?that.data.jjsw:waterLevelRange[1];//汛限水位

                var SKGC=waterLevelRange[2]==10?WATER_LEVEL*1.5:waterLevelRange[2];
                
                var html="<div class='wrapper'>";
                    html+="<span class='topTips'>"+COMB_NAME+"</span>"; 
                    html+="<span id='updateTime' class='update_time'>上报时间："+TIME_KEY+"</span>" ;                    
                    html+="<div class='content'>";
                    // if(SKGC!=0){
                    //     html+="<span class='skgcTip'>水库高程<b> "+SKGC.toFixed(2)+"</b>m</span>";
                    // }else{
                    //     html+="<span class='skgcTip'></span>";
                         //SKGC=(WATER_LEVEL>JJSW)?WATER_LEVEL+10:JJSW+10;//模拟高度，为了计算水位高度
                    // }
                    if(that.hasData){
                        html+="<div class='load' id='load' style='width:30em'>";
                            if(that.data.jjsw){
                                html+="<div class='line xxSW'></div>";   
                                html+="<span class='lineTip xxSW'>汛限水位<b id='jjSW'> "+JJSW+"m</b></span>";
                            }
                                html+="<div class='box'>";
                                    html+="<div class='text' id='waterLevelInfo'>";
                                        html+="<div class='water_info'><span id='curWaterLevel'> "+WATER_LEVEL+"m</span></div>";
                                    html+="</div>";     
                                html+="</div>";
                        html+="</div>";
                    }
                    html+="</div>";
                    html+="<div class='shuikumark'></div>";
                    html+="<span class='bottomTips'>数据来源："+SOURCE+"</span>";
                html+="</div>";
                $("#reservoirProfileInfoTab").append(html);

                var $i = $("#xxswBtn").find("i");
                if(isInFloodSeasonFlag){
                    $(".xxSW").show();
                    $i.removeClass("i-icon-unselect").addClass("i-icon-select");
                }else{
                    $(".xxSW").hide();
                    $i.removeClass("i-icon-select").addClass("i-icon-unselect");
                }

                $("#load").loading({tickHeight:(WATER_LEVEL-waterLevelRange[0])/SKGC,linetick:(JJSW-waterLevelRange[0])/SKGC,height:loadDivHeight,top:loadTop,left:"0",width:"33em"});
            },
            swToggle:function(){
                var that = this;
                var $i = $("#xxswBtn").find("i");
                if($i.hasClass("i-icon-unselect")){
                    isInFloodSeasonFlag=true;                    
                    $i.removeClass("i-icon-unselect").addClass("i-icon-select");                    
                }else{
                    isInFloodSeasonFlag=false;                    
                    $i.removeClass("i-icon-select").addClass("i-icon-unselect");
                }
                that.changeChartOption();                
                that.initShape();
            },
            changeChartOption:function(){
                var that = this;
                var _option = myChart._api.getOption();
                _option.legend[0].selected["汛限水位"] = isInFloodSeasonFlag;
                var obj = that.getCharMaxMinValue(isInFloodSeasonFlag);          
                _option.yAxis[0].max=obj.maxValue;
                _option.yAxis[0].min=obj.minValue;
                myChart.setOption(_option);

                waterLevelRange=that.getWaterLevelRange(dataList);
            },
	        getWaterLevelRange:function(_dataList){//获得最大水位值
                var that=this;
                var maxValue=-9999999;
                var minValue=9999999;                
                if(_dataList){                            
                    maxValue=_dataList[0].rz;                    
                    for (var i=1;i<_dataList.length;i++){   
                        maxValue=Math.max(maxValue,_dataList[i].rz);
                        minValue=Math.min(minValue,_dataList[i].rz);
                    } 
                }
                if(that.data.jjsw&&isInFloodSeasonFlag){
                    maxValue=Math.max(maxValue,that.data.jjsw);
                    minValue=Math.min(minValue,that.data.jjsw);
                }
 
                minValue=parseFloat(minValue<0?minValue*1.2:minValue*0.8);
                maxValue=parseFloat(maxValue<0?maxValue*0.8:maxValue*1.2);
                //console.log("最小值："+minValue+"||最大值："+maxValue+"||差值："+(maxValue-minValue));
                return  new Array(minValue,maxValue,maxValue-minValue);        
            },
            getIsInFloodSeason:function(){//判断选择时间是否包含汛期
                var sMon=parseInt($("#from_date").val().split ("-")[1]);
                var eMon=parseInt($("#to_date").val().split ("-")[1]);
                //4.1~9.30是汛期
                if((3<sMon&&sMon<10)||(3<eMon&&eMon<10))
                    return true;
                else
                    return false;                
            },
            loadChart:function (result) {
                var that=this;
                var axisData = [];
                var waterLineData = [];
                var rainNumData = [];
                var zcsw;
                var xxsw;
                var legendData=['水库水位'];
                var seriesData=[{
                    name: '水库水位',
                    type: 'line',
                    showSymbol:false,
                    data: waterLineData
                }];
                that.maxcharSw = that.data.rz; //最大水位
                that.mincharSw = that.data.rz; //最小水位
               
                if (result) {

                    zcsw = result[0].zcsw;
                    xxsw = that.data.jjsw;
                    var markLineData = [];
                    if (xxsw&&xxsw>0) {
                        markLineData.push({
                            yAxis: xxsw,
                            name: '汛限水位',
                            symbolSize:[0,0],
                            label: {
                                    normal: {
                                        position:'middle',
                                        formatter: function (param) {
                                            return param.name + ":" + param.value;
                                        }
                                    }
                                }
                        });
                        legendData.push('汛限水位');
                        seriesData.push({
                            name: '汛限水位',
                            type: 'line',
                            showSymbol:false,
                            data: markLineData,
                            markLine: {
                                data: markLineData                                   
                            }
                        });
                    }
                    var maxDrp = result[0].drp;//最大降雨量
                    var minDrp = result[0].drp;//最大降雨量
                    for (var i =  result.length-1; i >=0; i--) {
                        axisData.push(result[i].tm.replace(' ', '\n'));
                        waterLineData.push(result[i].rz);
                        rainNumData.push(result[i].drp);
                        if (maxDrp < result[i].drp) {
                            maxDrp = result[i].drp;
                        }
                        if (minDrp > result[i].drp) {
                            minDrp = result[i].drp;
                        }
                        if (that.maxcharSw < result[i].rz) {
                            that.mincharSw = result[i].rz;
                        }
                        if (that.mincharSw > result[i].rz) {
                            that.mincharSw = result[i].rz;
                        }
                    }    
                             
                }
                //获得选中日期范围是否包含在汛期中
                var valueObj=that.getCharMaxMinValue(isInFloodSeasonFlag);

                


                var option = {
                    color: ['#22ffff','#FF0000'],
                    title: {
                        text: '水位过程线',//雨量水库
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    legend: {
                        data: legendData,//'降雨量',
                        left:0,
                        itemGap:5,
                        selected:{'汛限水位':isInFloodSeasonFlag}
                    },
                    // toolbox: {
                    //     feature: {
                    //         dataZoom: {
                    //            // yAxisIndex: 'none'
                    //         },
                    //         restore: {},
                    //         saveAsImage: {}
                    //     }
                    // },
                    dataZoom: [{
                        type: 'inside',
                        start: 10,
                        end: 100,
                    }, {
                        type:'slider', 
                        show: true,
                        showDetail:false,
                        start: 10,
                        end: 100,
                        filterMode:'empty'//不过滤数据，只改变数轴范围    
                    }],
                    grid: [{
                         // left: 60,
                         // right: 50,                                             
                    }],
                    xAxis: [
                        {                                
                            type: 'category',
                            boundaryGap :false,
                            data: axisData
                        }
                    ],
                    yAxis: [
                        {
                            name: '水库水位(m)',
                            type: 'value',
                            min: valueObj.minValue,
                            max: valueObj.maxValue,
                            boundaryGap :false,
                            axisLabel: {                   
                                formatter: function (value, index) {           
                                    return value.toFixed(2);      
                                }                
                            }
                        }
                        
                    ],
                    series: seriesData
                };

                myChart = echarts.init(document.getElementById('hisChart'));
                myChart.setOption(option);
                myChart.on("legendselectchanged",function(params){
                    option.legend.selected = params.selected;
                    that.swToggle();
                });
                setTimeout(function () {
                    window.onresize = function () {
                        myChart.resize();
                    }
                }, 200);

            },
            getCharMaxMinValue:function(flag){
                var that = this;
                var maxValue=that.mincharSw;
                var minValue=that.mincharSw;
                var xxsw = that.data.jjsw;              
                if(flag&&xxsw){//如果在汛期&&有汛限水位
                    //最大值最小值范围扩大                    
                    maxValue=(xxsw>that.maxcharSw)?xxsw:that.maxcharSw;
                    minValue=(xxsw<that.mincharSw)?xxsw:that.mincharSw;
                }
                var diff=maxValue-minValue;
                if(diff==0){
                    maxValue+=maxValue*0.5;
                    minValue-=minValue*0.5;    
                }else{
                    maxValue+=diff*0.5;
                    minValue-=diff*0.5;
                }
                return {maxValue:maxValue,minValue:minValue}
            },
            clickSearchBtn: function () {
                var that = this;
                common.showLoading($("#"+panalObj.uniqueID));
                that.getData();
            }
        }
        var modal = {};

        function activeLastPointToolip(chart) {
            var points = chart.series[0].points;
            chart.tooltip.refresh(points[points.length - 1]);
        }

        List.init();
        return modal;
    });