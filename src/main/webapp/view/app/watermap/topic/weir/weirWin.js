define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "echarts3_8_4", "tabs", "WdatePicker","animateLoad"],
    function ($, app, composition, ko, common, http, panal,panalPop, echarts, tabs, wdatePicker,animateLoad) {
        var dataList,interval,idx;
        var loadTop,loadDivHeight,YZFALL; 
        var yzRange;//渠箱水位区间
        var panalObj;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("homeInitHandler_weir", {
                    init: function (dom) {
                        panalObj = panalPop.getPanalByElement(dom);
                        that.data=panalObj.param;

                        interval=null;
                        idx=0;
                        loadTop="5em";//初始化14.8em;top: 3.599em;
                        loadDivHeight=14.9;//渠箱总高度自己计算高度，定死div总高度
                        YZFALL=14.9;//em堰坝总高
                        yzRange=new Array(0,0,10);//堰坝水位区间
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
                var tm_e = that.data.date;
                $("#from_date").val(common.getYestday8Clock(tm_e));
                $("#to_date").val(tm_e);

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
                    id: "weirProfileInfo",
                    title: "水位剖面图",
                    content: playButtonStr+'<div class="detail_tab_container profileInfoDiv"><div id="weirProfileInfoTab"></div></div>',
                    selected: true
                },{
                    id: "hisInfo",
                    title: "水位过程线",
                    content: '<div class="detail_tab_container"><div id="hisChart" sytle="width:600px;height: 410px;"></div></div>',
                    selected: false
                },{
                    id: "tableInfo",
                    title: "数据列表",
                    content:'<div class="detail_tab_container"><div id="historyList"></div></div>',
                    selected: false
                }], {
                    replace: $("#weirDetail"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '100%',
                    width: '100%'
                });
            },
    
            playProfile:function(){
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
                            idx=dataList-1;
                            return;
                        };
                     
                        var zsSW=dataList[idx].rwz;
                        var zxSW=dataList[idx].blrwz;
                        var qxSW=dataList[idx].chanb;
                       
                        $("#updateTime").text("上报时间："+dataList[idx].tm);//采集时间
                        if(zsSW){
                            $("#zsSW").text(zsSW.toFixed(2)+"m");//坝上水位
                            that.updateHeightCss($("#load .box_l"),YZFALL,zsSW-yzRange[0],yzRange[2]);
                        }
                        if(zxSW){
                            $("#zxSW").text(zxSW.toFixed(2)+"m");//坝下水位   
                            that.updateHeightCss($("#load .box_r"),YZFALL,zxSW-yzRange[0],yzRange[2]);
                        }
                          
                        idx--;
                    },speed*1000);  
                                      
                }
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
                that.stopPlaying();
                var fromDate = $('#from_date').val();
                var toDate = $('#to_date').val();
                var h = http.getInstance("subject/queryWeirHist", {type: "post"});
                h.ajax({stcd: that.data.stcd, fromDate: fromDate, toDate: toDate}).then(function (result) {//水位过程线和表格
                    var hasData=false;
                    if(result) {
                        idx=result.length-1;
                        dataList= result;
                        $("#playButton").show();
                        that.data.rwz = result[0].rwz;
                        that.data.blrwz = result[0].blrwz;
                        that.data.tm = result[0].tm;
                        that.setWaterLevelRange(dataList);//获得水位区间
                        hasData=true;
                        
                    }else{
                        idx=-1;
                        $("#playButton").hide();
                        that.data.tm = "无检测值";
                        that.data.rwz = null;
                        that.data.blrwz = null;
                    }      

                    that.initShape(hasData);
                    that.loadHisChart(result);
                    that.loadHistoryWaterList(result);
                    common.hideLoading();
                });
            },            
            initShape:function(hasData) {
                var that = this;
                $("#weirProfileInfoTab").empty();
                var COMB_NAME=that.data.stnm;
                var SOURCE=that.data.stsys;               
                var WATER_LEVEL_L=that.data.rwz;//坝上水位;
                var WATER_LEVEL_R=that.data.blrwz;//坝下水位;
                var TIME_KEY=that.data.tm?that.data.tm:"无检测值";//上报时间


                var UWRZ=that.data.uwrz;//坝下警戒水位;
                var DWRZ=that.data.dwrz;//坝下警戒水位;

                var JJSW=0;//警戒水位
                var hasL=true;
                var hasR=true;

                var max,min;
                if(idx==-1&&that.data.blrwz!=null&&that.data.rwz!=null){//没有返回值
                    max=Math.max(WATER_LEVEL_L,WATER_LEVEL_R);
                    min=Math.min(WATER_LEVEL_L,WATER_LEVEL_R);
                    min=parseFloat(min<0?min*1.2:min*0.8);
                    max=parseFloat(max<0?max*0.8:max*1.2);
                    
                }else if(idx==-1&&that.data.rwz&&!that.data.blrwz){//如果只有坝上
                    max=that.data.rwz;
                    if(max>0){
                        min=0;
                        max=max*1.2;                        
                    }else{
                        min=max*1.2;
                        max=max*0.8; 
                    }
                    hasR=false;                   
                }else if(idx==-1&&!that.data.rwz&&that.data.blrwz){//如果只有坝下
                    max=that.data.blrwz;
                    if(max>0){
                        min=0;
                        max=max*1.2;
                    }else{
                        min=max*1.2;
                        max=max*0.8;  
                    }  
                    hasL=false;
                }
                if(idx==-1){
                    yzRange= new Array(min,max,max-min);
                }

                var ZMGC=yzRange[2];//坝门高程

            
                var width=42.7;
                  
                var html="<span class='topTips'>"+COMB_NAME+"</span>";
                html+="<span id='updateTime' class='update_time'>上报时间："+TIME_KEY+"</span>" ;  
                html+="<div  class='profile-container profileInfo' id='profileInfo' style='width:"+width+"em'>";   
                html+="<div class='wrapper'>";                                            
                    html+="<div class='content'>";                       
                        //html+="<span class='yzgcTip'></span>";//坝门高程<b> 12</b>m
                        if(hasData){
                        html+="<div class='load' id='load' style='height:"+loadDivHeight+"em;top:"+loadTop+";'>";
                            //警戒区                 
                        // html+="<div class='line line_l'>";
                        //     html+="<span class='lineTip'>坝上警戒水位<b> 23</b>m</span>";
                        // html+="</div>";
                        // html+="<div class='line line_r'>";
                        //     html+="<span class='lineTip'>坝下警戒水位<b> 23</b>m</span>";
                        // html+="</div>";
                        if(UWRZ){
                            html+="<div class='line line_l'></div>";
                            html+="<span class='lineTip lineTip_l'>坝上警戒水位<b> "+UWRZ+"</b>m</span>"; 
                        }
                        
                        if(DWRZ){
                            html+="<div class='line line_r'></div>";
                            html+="<span class='lineTip lineTip_r'>坝下警戒水位<b> "+DWRZ+"</b>m</span>";
                        }
                        
                        if(WATER_LEVEL_L){
                            html+="<div class='box box_l'>";//满14.9em
                                html+="<strong class='water_type_l'>坝上</strong>"
                                html+="<div class='text'>";
                                if(hasL&&typeof(WATER_LEVEL_L)!="undefined"){
                                    html+="<div class='water_info'><span id='zsSW'>"+WATER_LEVEL_L+"m</span></div>";    
                                }

                                html+="</div>";     
                            html+="</div>";
                        }
                        if(WATER_LEVEL_R){
                            html+="<div class='box box_r'>";
                                html+="<strong class='water_type_r'>坝下</strong>"
                                html+="<div class='text'>";
                                if(hasR&&typeof(WATER_LEVEL_R)!="undefined"){
                                    html+="<div class='water_info'><span  id='zxSW'>"+WATER_LEVEL_R+"m</span></div>";   
                                }
                                html+="</div>";      
                            html+="</div>";
                        }

                        html+="</div>";
                        }
                    html+="</div>";
                    
                    html+="<div class='yanzhamark'></div>";                    
                html+="</div>";                  
            html+="</div>";

            html+="<span class='bottomTips'>数据来源："+SOURCE+"</span>";
                $("#weirProfileInfoTab").append(html);
                if(hasL)
                    that.updateHeightCss($("#load .box_l"),YZFALL,WATER_LEVEL_L-yzRange[0],ZMGC);
                if(hasR)
                    that.updateHeightCss($("#load .box_r"),YZFALL,WATER_LEVEL_R-yzRange[0],ZMGC); 
                if(UWRZ){
                    that.updateLineCss($("#load .line_l"),YZFALL,UWRZ-yzRange[0],ZMGC);
                    that.updateLineCss($("#load .lineTip_l"),YZFALL,UWRZ-yzRange[0],ZMGC,1.5);
                }
                if(DWRZ){
                    that.updateLineCss($("#load .line_r"),YZFALL,DWRZ-yzRange[0],ZMGC);
                    that.updateLineCss($("#load .lineTip_r"),YZFALL,DWRZ-yzRange[0],ZMGC,1.5);
                }
            },
            updateLineCss:function($elem,totalHeight,sw,range,diff){    
                var curDivHeight=(sw/range)*totalHeight;
                var curTop=totalHeight-curDivHeight;
                if(diff){//如果有差值
                    curTop-=diff;
                }
                $elem.css({
                    "top":curTop+"em"
                });   
            },
            updateHeightCss:function($elem,totalHeight,sw,range){    
                var curDivHeight=(sw/range)*totalHeight;
                var curTop=totalHeight-curDivHeight;
                $elem.css({                  
                    "height":curDivHeight+"em",
                    "top":curTop+"em"
                });   
            },           
            loadHisChart: function (result) {              
                var rwz = [], blrwz = [],date = [],legendData=[],seriesData=[],colorData=[];
                if (result) {
                    for (var i = result.length-1; i >=0; i--) {
                        var data = result[i];
                        rwz.push(data.rwz);
                        blrwz.push(data.blrwz);
                        date.push(data.tm.replace(' ', '\n'));
                    }
                }
                legendData=['坝上水位', '坝下水位'];
                colorData=['#87CEFA', '#fa6af6'];
                seriesData=[
                        {
                            name: '坝上水位',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            showSymbol:false,
                            data: rwz
                        },
                        {
                            name: '坝下水位',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            showSymbol:false,
                            data: blrwz
                        },                        
                    ]

                var option = {
                    title: {
                        text: '拦河坝历史水位变化图',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    color:colorData,
                    legend: {
                        data:legendData,
                        top: 30
                    },
                    calculable: true,
                    grid: {
                        right: 50,
                        left: 50
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
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: date
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '水位(m)',
                            axisLabel: {                   
                                formatter: function (value, index) {           
                                    return value.toFixed(2);      
                                }                
                            }
                        }
                    ],
                    series: seriesData
                };
                var myChart = echarts.init(document.getElementById("hisChart"));
                myChart.setOption(option);
                
            },
            loadHistoryWaterList: function (result) {
                var that = this;         
                columns = [{
                        id: "tm",
                        text: "上报时间",
                        datafield: "tm",
                        align: "center",
                        width:150,
                        cellsalign: "center"
                    },{
                        id: "rwz",
                        text: "坝上水位(m)",
                        datafield: "rwz",                 
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    },{
                        id: "blrwz",
                        text: "坝下水位(m)",
                        datafield: "blrwz",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    },
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
                    height:"100%",
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
            },
            setWaterLevelRange:function(_dataList){//获得最大水位值
                var that=this;                
                if(!_dataList) return;  
                //堰坝
                var maxValue=-9999;
                var minValue=9999; 
 
                for (var i=0;i<_dataList.length;i++){   
                    if(dataList[i].rwz){
                        maxValue=Math.max(maxValue,_dataList[i].rwz);                    
                        minValue=Math.min(minValue,_dataList[i].rwz);
                    }
                    if(dataList[i].blrwz){
                        maxValue=Math.max(maxValue,_dataList[i].blrwz);
                        minValue=Math.min(minValue,_dataList[i].blrwz);
                    }                 
                }
                console.log("警戒之前--"+maxValue+"||"+minValue);
                maxValue=Math.max(maxValue,that.data.uwrz);
                minValue=Math.min(minValue,that.data.uwrz);
                maxValue=Math.max(maxValue,that.data.dwrz);
                minValue=Math.min(minValue,that.data.dwrz);
                console.log(maxValue+"||"+minValue);
                minValue=parseFloat(minValue<0?minValue*1.2:minValue*0.8);
                maxValue=parseFloat(maxValue<0?maxValue*0.8:maxValue*1.2);
                yzRange=new Array(minValue,maxValue,maxValue-minValue);
            },
        };
        var modal = {};

        List.init();
        return modal;
    });