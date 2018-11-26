define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "highcharts", "tabs", "echarts3_8_4","WdatePicker","animateLoad"],
    function ($, app, composition, ko, common, http, panal,panalPop, highcharts, tabs, echarts,wdatePicker,animateLoad) {
      	var dataList,loadTop,loadDivHeight,interval,idx;
        var waterLevelRange;//水位区间
        var panalObj;
        var FloodPointDetail = {
            init: function () {
                var that = this;
                composition.addBindingHandler("homeInitHandler_fp", {
                    init: function (dom) {

                        loadTop="4.27em";//初始化
                        loadDivHeight=17;//自己计算高度，定死div总高度
                        interval=null;
                        idx=0;

                        waterLevelRange=new Array(0,0,10);//水位区间
                        panalObj = panalPop.getPanalByElement(dom);
                        that.data=panalObj.param;
                        that.isPlaying=false;
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
                var that = this;
            },
            bindUI: function () {
                var that = this;
                var beginDateStr,endDateStr;
                if(that.data.endTime&&that.data.endTime!=''){
                    endDateStr=that.data.endTime;
                }else{
                    var tm_e = new Date();//当前时间
                    endDateStr = common.formatDate(tm_e, 'yyyy-MM-dd hh:mm:ss');
                }

                var endDateTime=Date.parse(new Date(endDateStr.replace(/-/g,'/')));
                var beginDate = new  Date(endDateTime-60 * 60 * 1000);//前推一个小时
                beginDateStr = common.formatDate(beginDate, 'yyyy-MM-dd hh:mm:ss');

                $("#from_date").val(beginDateStr);
                $("#to_date").val(endDateStr);

                that.loadTabs();
                that.getData();//历史数据
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
                        id: "floodPointProfileInfo",
                        title: "水位剖面图",
                        content: playButtonStr+'<div class="popeProfile_tab detail_tab_container"><div id="floodPointProfileInfoTab" class="profile-container" style="width:100%"></div></div>',
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
                    replace: $("#floodPointDetail"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '100%',
                    width: '100%'
                });
            },
            initShape: function (hasData) {
                var that = this;
                var data=that.data;
                $("#floodPointProfileInfoTab").empty();
                var COMB_NAME=that.data.stnm;

                var WATER_LEVEL=that.data.z;//data.z;//当前水深
                var TIME_KEY=that.data.tm?that.data.tm:"无检测值";
                var SOURCE=that.data.stsys;//数据来源

                var GC=10;//高程 ，模拟       
                var DMGC=0;//地面高程
                var JJSW=0;//警戒水深    
                var DIFF= waterLevelRange[2]==10?WATER_LEVEL*1.5:waterLevelRange[2];// (GC-DMGC);   水位总范围高度差      
                var html ="<div class='wrapper'>";
                        html+="<span class='topTips'>"+COMB_NAME+"</span>";
                        html+="<span id='updateTime' class='update_time' style='left:-13.5em;'>上报时间："+TIME_KEY+"</span>" ;
                        html+="<div class='content'>";
                            if(hasData){
                            html+="<div class='load' id='load'>";
                                html+="<div class='topGC'>";
                                if(GC!=10){//高程
                                    html+="<label>高程</label><b>"+GC.toFixed(2)+"</b>";
                                }
                                 html+="</div>";
                                if(JJSW>0){//警戒水深
                                    html+="<div class='line'></div>";
                                    html+="<span class='lineTip'>警戒水位<b> "+JJSW+"</b>m</span>";
                                }
                                html+="<div class='box'>";
                                    html+="<div class='text' id='waterLevelInfo'>";
                                    html+="<div class='water_info'><span id='curWaterLevel'> "+WATER_LEVEL+"m</span></div>";
                                    html+="</div>";     
                                html+="</div>";

                                html+="<div class='bottomGC'>";// arrow leftArrow
                                if(DMGC!=0){//高程
                                    html+="<label>地面高程</label><b>"+DMGC+"m</b>";
                                }
                                html+="</div>";
                            html+="</div>";
                            }
                        html+="</div>";

                        html+="<div class='jiancedianmark'></div>";
                        html+="<span class='bottomTips'>数据来源："+SOURCE+"</span>";
                    html+="</div>";
                    $("#floodPointProfileInfoTab").append(html);
		            
                    $("#load").loading({tickHeight:(WATER_LEVEL)/DIFF,linetick:JJSW/DIFF,height:loadDivHeight,top:loadTop,left:0});
	                
            },
            getWaterLevelRange:function(){//获得最大水位值
                var maxValue=-9999999;
                var minValue=9999999;
                var diff=0;                
                if(dataList){
                    maxValue=dataList[0].z;                    
                    for (var i=1;i<dataList.length;i++){   
                        var sw=parseFloat(dataList[i].z);                 
                        maxValue=Math.max(maxValue,sw);
                        minValue=Math.min(minValue,sw);
                    } 
                }
                minValue=parseFloat((parseFloat(minValue))<0?minValue*1.5:minValue*0.5).toFixed(2);//Math.floor
                maxValue=parseFloat((parseFloat(maxValue))<0?maxValue*0.5:maxValue*1.5).toFixed(2);//Math.ceil
                diff=maxValue-minValue;
                if(maxValue==0&&diff==0){//如果范围是0，且最大值和最小值都是0
                    diff=1;
                    //minValue=-0.5;
                }
                return  new Array(minValue,maxValue,diff);        
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

                var h = http.getInstance("subject/getFloodPointHis", {type: "post"});
                h.ajax({stcd: that.data.stcd, fromDate: fromDate, toDate: toDate}).then(function (result) {//水深过程线和表格
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
                        that.data.z = null;

                    }
                    that.loadHisChart(result);                   
                    that.loadHistoryWaterList(result);
                    that.initShape(hasData);//初始化剖面图
                    common.hideLoading();
                });
            }, 
            loadHisChart: function (result) {
                var that = this;
                var jjsw=0;//没有数据
                var data=[];
                var date=[];
                if (result) {
                    for(var i=result.length-1;i>=0;i--) {
                        data.push(parseFloat(result[i].z).toFixed(2));
                        date.push(result[i].tm.replace(' ', '\n'));
                    }
                }
                var markLineData = [];
                if(jjsw>0){
                    markLineData.push({
                        yAxis: jjsw,
                        name: '警戒水深',
                        lineStyle: {
                            normal: {
                                color: '#FFA500'
                            }
                        }
                    });
                }                    
                var option = {
                    title: {
                        text: '积水点水深变化图',
                        left: 'center'
                    },
                    grid: {
                        //bottom: 70,
                        right: 50,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            animation: false,
                            label: {
                                backgroundColor: '#505765'
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
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    }],
                    yAxis: [{
                        name: '易涝点水深(m)',
                        type: 'value',
                        axisLabel: {                   
                            formatter: function (value, index) {           
                                return value.toFixed(2);      
                            }                
                        }
                    }],
                    series: [{
                        type: 'line',
                        animation: false,
                        smooth: true,
                        symbol: 'none',
                        showSymbol:false,
                        itemStyle: {
                            normal: {
                                color: '#22ffff'  //线的颜色
                            }
                        },
                        markLine: {
                            data: markLineData,
                            label: {
                                normal: {
                                    formatter: function (param) {
                                        return param.name + ":" + param.value + "mm"
                                    }
                                }
                            }
                        },
                        data: data
                    }]
                };
                var myChart = echarts.init(document.getElementById('hisChart'));
                myChart.setOption(option);  
            },
            loadHistoryWaterList: function (result) {
                var that = this;         
                columns = [{
                        id: "tm",
                        text: "上报时间",
                        datafield: "tm",
                        align: "center",
                        cellsalign: "center",
                        sortable:true,
                        sortorder :"desc"
                    },{
                        id: "sw",
                        text: "水深(m)",
                        datafield: "z",                 
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
                that.gridDataSource = {};
                gridDataSource = {
                    localdata: result,
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
        FloodPointDetail.init();
        return modal;
    });