define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "highcharts", "tabs", "echarts3_8_4","WdatePicker","animateLoad"],
    function ($, app, composition, ko, common, http, panal,panalPop, highcharts, tabs, echarts,wdatePicker,animateLoad) {
        var dataList,interval,idx;
        var loadDivHeight,loadTop;
        var waterLevelRange;//水位区间
        var panalObj;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("riverWinHandler", {
                    init: function (dom) {
                        panalObj = panalPop.getPanalByElement(dom);
                        that.stcd = panalObj.param.stcd;
                        that.data=panalObj.param;
                        that.isPlaying=false;
                        loadTop="4.7em";
                        loadDivHeight=12.9;//自己计算高度，定死div总高度
                        interval=null;
                        idx=0;
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
                    WdatePicker({
                        onpicked: function (dp) {
                            that.clickSearchBtn();
                        },
                        dateFmt: 'yyyy-MM-dd HH:mm:ss',
                        maxDate: "#F{$dp.$D('to_date')}"
                    });
                });
                $("#to_date").click(function () {
                    WdatePicker({
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
                        waterLevel=parseFloat(dataList[idx].z);
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
            loadTabs: function () {
                var that = this;

	            var playButtonStr='<div id="playButton" class="detail_playbtn_container">'+
                    '<span class="reservoir_query_name">播放速度：</span><span>'+
                        '<select id="speed">'+
                            '<option value="0.5">0.5秒</option>'+
                            '<option value="1">1秒</option>'+
                            '<option value="2">2秒</option>'+
                            '<option value="3">3秒</option>'+
                            '<option value="5">5秒</option>'+
                            '<option value="10">10秒</option>'+
                        '</select>'+
                    '</span>'+
                    '<button id="playBtn">播放</button>'+
                '</div>';
                var t = tabs.getInstance([{
                    id: "profileInfo",
                    title: "水位剖面图",
                    content: playButtonStr+'<div class="popeProfile_tab detail_tab_container"><div id="riverProfileInfoTab" class="profile-container" style="width:100%"></div></div>',
                    selected: true
                },{
                    id: "chartInfo",
                    title: "水位过程线",
                    // content: '<div id="hisChart" class="detail_chart_container"></div>'+
                    // '<div id="historyList" class="detail_table_container"></div>'+
                    // '<div id="changeChartTable" class="detail_chart2table_container"></div>',
                    content: '<div class="detail_tab_container"><div id="hisChart"></div></div>',
                    selected: false
                },{
                    id: "tableInfo",
                    title: "数据列表",
                    content:'<div class="detail_tab_container"><div id="historyList"></div></div>',
                    selected: false
                }], {
                    replace: $("#riverTab"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '100%',
                    width: '100%'
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
		        that.stopPlaying();
                var h = http.getInstance("subject/getRiverHis", {type: "post"});
                h.ajax({stcd: that.stcd,fromDate: fromDate, toDate: toDate}).then(function (result) {
                    var hasData=false;
		            if(result) {
                        idx=result.length-1;
                        dataList= result;
                        $("#playButton").show();
                        waterLevelRange=that.getWaterLevelRange(result);//获得水位区间
                        hasData=true;
                        that.data.z = result[0].z;
                        that.data.tm = result[0].tm;
                    }else{
                        $("#playButton").hide();
                        that.data.tm = "无检测值";
                    }        
                               
                    
                    that.loadChart(result);
                    that.loadHistoryWaterList(result);
                    that.initShape(hasData);//初始化剖面图
                    common.hideLoading();

                })
            },
            initShape:function(hasData) {

                var that = this;
                $("#riverProfileInfoTab").empty();
                var COMB_NAME=that.data.stnm;
                var SOURCE=that.data.stsys;//数据来源

                var WATER_LEVEL=that.data.z?that.data.z:0;//当前水位

                var TIME_KEY=that.data.tm?that.data.tm:"无检测值";//上报时间

                var JJSW=0;//警戒水位
              
                if(that.data.jjsw){
                    JJSW=that.data.jjsw;
                }
                var HDGC=waterLevelRange[2]==10?WATER_LEVEL*1.5:waterLevelRange[2];//这里调取区间值  0;遥测站高程
                if(JJSW>HDGC){
                    HDGC=JJSW*1.2;
                }
     
                var html="<div class='wrapper'>";
                    html+="<span class='topTips'>"+COMB_NAME+"</span>";  
                    html+="<span id='updateTime' class='update_time'>上报时间："+TIME_KEY+"</span>" ;
                    html+="<div class='content'>";
                    // if(HDGC!=0){
                    //     html+="<span class='hdgcTip'>遥测站高程<b> "+HDGC.toFixed(2)+"</b>m</span>";
                    // }else{
                        html+="<span class='hdgcTip'></span>";//遥测站高程<b> "+HDGC.toFixed(2)+"</b>m

                    // }
                    if(hasData){         
                        html+="<div class='load' id='load'>";                         
                            if(JJSW!=0){
                                html+="<div class='line'></div>";
                                html+="<span class='lineTip'  style='left: 0em;'>警戒水位<b> "+JJSW+"</b>m</span>";
                            }                  

                                html+="<div class='box'>";
                                    html+="<div class='text' id='waterLevelInfo'>";
                                        html+="<div class='water_info'><span id='curWaterLevel'> "+WATER_LEVEL+"m</span></div>";
                                    html+="</div>";     
                                html+="</div>";
                        html+="</div>";
                    }
                    html+="</div>";
                    html+="<div class='hedaomark'></div>";
                    html+="<span class='bottomTips'>数据来源："+SOURCE+"</span>";
                html+="</div>";
                $("#riverProfileInfoTab").append(html);
     		    
                $("#load").loading({tickHeight:(WATER_LEVEL-waterLevelRange[0])/HDGC,linetick:(JJSW-waterLevelRange[0])/HDGC,height:loadDivHeight,top:loadTop,left:"0"});
                
                
            },
            getWaterLevelRange:function(_dataList){//获得最大水位值
                var that=this;
                var maxValue=-9999999;
                var minValue=9999999;                
                if(_dataList){                   
                    
                    maxValue=_dataList[0].z;                    
                    for (var i=1;i<_dataList.length;i++){   
                        maxValue=Math.max(maxValue,_dataList[i].z);
                        minValue=Math.min(minValue,_dataList[i].z);
                    } 

                    if(that.data.jjsw){
                        maxValue=Math.max(maxValue,that.data.jjsw);
                        minValue=Math.min(minValue,that.data.jjsw);
                    }
                }
                //console.log("原始，最小值："+minValue+"||最大值："+maxValue);
                minValue=parseFloat(minValue<0?minValue*1.2:minValue*0.8);
                maxValue=parseFloat(maxValue<0?maxValue*0.8:maxValue*1.2);
                //console.log("最小值："+minValue+"||最大值："+maxValue+"||差值："+(maxValue-minValue));
                return  new Array(minValue,maxValue,maxValue-minValue);        
            },

            loadChart: function (data) {
		        var that=this;
                var date = [];
                var waterLineData = [];
                if (data) {
                    for (var i = data.length-1; i>=0; i--) {
                        date.push(data[i].tm.replace(' ', '\n'));
                        waterLineData.push(data[i].z);
                    }
                }
                var markLineData = [];
                
                if(that.data.jjsw){
                    markLineData.push({
                        yAxis:that.data.jjsw,
                        name: '警戒水位',
                        symbolSize:[0,0],
                        lineStyle:{
                            normal:{
                                color:'red',//#FFA500
                            }
                        }
                    });
                }

                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    title: {
                        x: 'center',
                        text: '河道水位变化图',
                    },
                    legend: {
                        data: ['河道水位'],
                        x: 'left'
                    },
                    grid: {
                        right: 50,
                        left:60,
                    },
                    // toolbox: {
                    //     feature: {
                    //         dataZoom: {
                    //             yAxisIndex: 'none'
                    //         },
                    //         restore: {},
                    //         saveAsImage: {}
                    //     }
                    // },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    yAxis: {
                        type: 'value',
			            min:waterLevelRange[0],
                        max:waterLevelRange[1],
                        name: '河道水位(m)',
			            axisLabel: {                   
                            formatter: function (value, index) {           
                                return value.toFixed(2);      
                            }                
                        }
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 10,
                        end: 100,
                    }, {
                        show: true,
                        showDetail:false,
                        start: 10,
                        end: 100    
                    }],
                    series: [
                        {
                            name: '河道水位',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            showSymbol:false,
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: 'rgb(255, 70, 131)'
                                }
                            },
                            data: waterLineData,
                            itemStyle: {
                                normal: {
                                    color: '#22ffff'  //线的颜色
                                }
                            },
                            markLine: {
                                data:markLineData,
                                label:{
                                    normal:{
                                        position:'middle',
                                        formatter:function(param){
                                            return param.name+":"+param.value.toFixed(2)+"m";
                                        }
                                    }
                                }
                            },
                        }
                    ]
                };

                var myChart = echarts.init(document.getElementById('hisChart'));
                myChart.setOption(option);

                setTimeout(function () {
                    window.onresize = function () {
                        myChart.resize();
                    }
                }, 200)
            },
            loadHistoryWaterList: function (data) {
                var columns = [
                    {
                        id: "sbsj",
                        text: "上报时间",
                        datafield: "tm",
                        width: "60%",
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "sw",
                        text: "水位(m)",
                        datafield: "z",
                        width: "40%",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    }
                ];
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({
                        name: columns[i].datafield,
                        type: 'string'
                    });
                }
                var gridDataSource = {
                    localdata: data,
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
                $("#historyList").jqxGrid({
                    width: "99%",
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columns
                });
            },
            clickSearchBtn: function () {
                var that = this;
                common.showLoading($("#"+panalObj.uniqueID));
                that.getData();
            }
        }

        var modal = {};

        List.init();
        return modal;
    });