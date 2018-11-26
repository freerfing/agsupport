define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "echarts3_8_4", "tabs", "WdatePicker","animateLoad"],
    function ($, app, composition, ko, common, http, panal,panalPop, echarts, tabs, wdatePicker,animateLoad) {
        var dataList,interval,idx;
        var loadTop,loadDivHeight,QXFALL,YZFALL;
        var hasQ;//是否有渠箱      
        var yzRange,qxRange;//渠箱水位区间
        var panalObj;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("homeInitHandler_was", {
                    init: function (dom) {
                        interval=null;
                        idx=0;
                        loadTop="5em";//初始化14.8em;top: 3.599em;
                        loadDivHeight=14.9;//渠箱总高度自己计算高度，定死div总高度
                        QXFALL=13.6;//水箱总高
                        YZFALL=14.9;//em堰闸总高

                        
                        panalObj = panalPop.getPanalByElement(dom);
                        that.data=panalObj.param;
                        yzRange=new Array(0,0,10);//堰闸水位区间
                        qxRange=new Array(0,0,10);//渠箱水位区间
                        hasQx=false;//是否有渠箱
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
                    // content: '<div id="hisChart" class="detail_chart_container"></div>'+
                    // '<div id="historyList" class="detail_table_container"></div>'+
                    // '<div id="changeChartTable" class="detail_chart2table_container"></div>',
                    content: '<div class="detail_tab_container"><div id="hisChart" sytle="width:600px;height: 410px;"></div></div>',
                    selected: false
                },{
                    id: "tableInfo",
                    title: "数据列表",
                    content:'<div class="detail_tab_container"><div id="historyList"></div></div>',
                    selected: false
                }], {
                    replace: $("#wasDetail"),
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
                     
                        var zsSW=dataList[idx].upz;
                        var zxSW=dataList[idx].dwz;
                        var qxSW=dataList[idx].chanb;
                       
                        $("#updateTime").text("上报时间："+dataList[idx].tm);//采集时间
                        if(zsSW){
                            $("#zsSW").text(zsSW.toFixed(2)+"m");//闸上水位
                            that.updateHeightCss($("#load .box_l"),YZFALL,zsSW-yzRange[0],yzRange[2]);
                        }
                        if(zxSW){
                            $("#zxSW").text(zxSW.toFixed(2)+"m");//闸下水位   
                            that.updateHeightCss($("#load .box_r"),YZFALL,zxSW-yzRange[0],yzRange[2]);                               
                        }
                        
                        if(qxSW){
                            $("#qxSW").text(qxSW.toFixed(2)+"m");
                            that.updateHeightCss($("#qxload .boxdiv"),QXFALL,qxSW-qxRange[0],qxRange[2]);
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
                // common.showLoading($("#"+panalObj.uniqueID));
                var h = http.getInstance("subject/queryWasHist", {type: "post"});
                h.ajax({stcd: that.data.stcd, fromDate: fromDate, toDate: toDate}).then(function (result) {//水位过程线和表格
                    var hasData=false;
                    if(result) {
                        idx=result.length-1;
                        dataList= result;
                        $("#playButton").show();
                        
                        that.data.upz = result[0].upz;
                        that.data.dwz = result[0].dwz;
                        that.data.chanb = result[0].chanb;
                        that.data.tm = result[0].tm;
                        if(that.data.chanb){
                            hasQx=true;//是否有渠箱
                        }
                        that.setWaterLevelRange(dataList);//获得水位区间
                        hasData=true;
                        
                    }else{
                        idx=-1;
                        $("#playButton").hide();
                        that.data.tm = "无检测值";
                        that.data.upz = null;
                        that.data.dwz = null;
                        that.data.chanb = null;
                        hasQx=false;
                    }      

                    that.initShape();
                    that.loadHisChart(result);
                    that.loadHistoryWaterList(result);
                    common.hideLoading();
                });
            },            
            initShape:function() {
                var that = this;
                $("#weirProfileInfoTab").empty();
                var COMB_NAME=that.data.stnm;
               
                var WATER_LEVEL_L=that.data.upz;//闸上水位;
                var WATER_LEVEL_R=that.data.dwz;//闸下水位;                
                var WATER_LEVEL_QX=that.data.chanb;//闸下水位;
                var TIME_KEY=that.data.tm?that.data.tm:"无检测值";//上报时间

                var JJSW=0;//警戒水位
                var hasL=true;
                var hasR=true;
                var SOURCE=that.data.stsys;
                if(SOURCE=='排水监测'){
                    SOURCE='排水中心';
                }
                var max,min;
                if(idx==-1&&that.data.dwz!=null&&that.data.upz!=null){//没有返回值
                    max=Math.max(WATER_LEVEL_L,WATER_LEVEL_R);
                    min=Math.min(WATER_LEVEL_L,WATER_LEVEL_R);
                    min=parseFloat(min<0?min*1.2:min*0.8);
                    max=parseFloat(max<0?max*0.8:max*1.2);
                    
                }else if(idx==-1&&that.data.upz&&!that.data.dwz){//如果只有闸上
                    max=that.data.upz;
                    if(max>0){
                        min=0;
                        max=max*1.2;                        
                    }else{
                        min=max*1.2;
                        max=max*0.8; 
                    }
                    hasR=false;                   
                }else if(idx==-1&&!that.data.upz&&that.data.dwz){//如果只有闸下
                    max=that.data.dwz;
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

                var ZMGC=yzRange[2];//闸门高程
                var QXGC=qxRange[2]==10?(WATER_LEVEL_QX>0?WATER_LEVEL_QX*1.5:WATER_LEVEL_QX*0.5):qxRange[2];//渠箱高程
            
                var width=42.7;
                if(hasQx){width=32.5;}                
                var html="<span class='topTips'>"+COMB_NAME+"</span>";
                html+="<span id='updateTime' class='update_time'>上报时间："+TIME_KEY+"</span>" ;  
                html+="<div  class='profile-container profileInfo' id='profileInfo' style='width:"+width+"em'>";   
                html+="<div class='wrapper'>";                                            
                    html+="<div class='content'>";                       
                        //html+="<span class='yzgcTip'></span>";//闸门高程<b> 12</b>m
                        html+="<div class='load' id='load' style='height:"+loadDivHeight+"em;top:"+loadTop+";'>";
                            //警戒区                 
                            // html+="<div class='line'>";
                            //     html+="<span class='lineTip'>校核水位<b> 23</b>m</span>";
                            // html+="</div>";

                        if(WATER_LEVEL_L){
                            html+="<div class='box box_l'>";//满14.9em
                                html+="<strong class='water_type_l'>闸上</strong>"
                                html+="<div class='text'>";
                                if(hasL&&typeof(WATER_LEVEL_L)!="undefined"){
                                    html+="<div class='water_info'><span id='zsSW'>"+WATER_LEVEL_L+"m</span></div>";    
                                }

                                html+="</div>";     
                            html+="</div>";
                        }
                        if(WATER_LEVEL_R){
                            html+="<div class='box box_r'>";
                                html+="<strong class='water_type_r'>闸下</strong>"
                                html+="<div class='text'>";
                                if(hasR&&typeof(WATER_LEVEL_R)!="undefined"){
                                    html+="<div class='water_info'><span  id='zxSW'>"+WATER_LEVEL_R+"m</span></div>";   
                                }
                                html+="</div>";      
                            html+="</div>";
                        }

                        html+="</div>";
                    html+="</div>";
                    html+="<div class='yanzhamark'></div>";                    
                html+="</div>";                  
            html+="</div>";
            if(hasQx){
                html+="<div id='quxiang'>";
                    html+="<span class='typeTip'>渠箱</span>";
                    html+="<div class='load' id='qxload'>";
                        html+="<div class='boxdiv'>";//满14.2em
                            html+="<div class='text' >";
                                html+="<div class='water_info'><span id='qxSW'>"+(that.data.chanb?WATER_LEVEL_QX+"m":"无检测值")+"</span></div>";                  
                            html+="</div>";      
                        html+="</div>";
                    html+="</div>";
                html+="</div>";
            }
            html+="<span class='bottomTips'>数据来源："+SOURCE+"</span>";
                $("#weirProfileInfoTab").append(html);
                if(hasL)
                    that.updateHeightCss($("#load .box_l"),YZFALL,WATER_LEVEL_L-yzRange[0],ZMGC);
                if(hasR)
                    that.updateHeightCss($("#load .box_r"),YZFALL,WATER_LEVEL_R-yzRange[0],ZMGC);
                if(hasQx)
                    that.updateHeightCss($("#qxload .boxdiv"),QXFALL,WATER_LEVEL_QX-qxRange[0],QXGC);      
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
                var upz = [], dwz = [], chanb =[],date = [],legendData=[],seriesData=[],colorData=[];
                if (result) {
                    for (var i = result.length-1; i >=0; i--) {
                        var data = result[i];
                        upz.push(data.upz);
                        dwz.push(data.dwz);
                        chanb.push(data.chanb);
                        date.push(data.tm.replace(' ', '\n'));
                    }
                }
                legendData=['闸上水位', '闸下水位'];
                colorData=['#87CEFA', '#fa6af6'];
                seriesData=[
                        {
                            name: '闸上水位',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            showSymbol:false,
                            data: upz
                        },
                        {
                            name: '闸下水位',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            showSymbol:false,
                            data: dwz
                        },                        
                    ]
                if(hasQx){
                    seriesData.push({
                        name: '渠箱水位',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        showSymbol:false,
                        data: chanb
                    });
                    legendData.push('渠箱水位');
                    colorData.push('#EBB813');
                }
                var option = {
                    title: {
                        text: '水闸历史水位变化图',
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
                        left: 50,
                        //bottom: 70
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
                        width:150,
                        cellsalign: "center"
                    },{
                        id: "zssw",
                        text: "闸上水位(m)",
                        datafield: "upz",                 
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    },{
                        id: "sxsw",
                        text: "闸下水位(m)",
                        datafield: "dwz",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    },
                ];
                if(hasQx){
                    columns.push({
                        id: "qxsw",
                        text: "渠箱水位(m)",
                        datafield: "chanb",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    });
                }
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
                //堰闸
                var maxValue=-9999;
                var minValue=9999; 
                //渠箱
                var qmaxValue=-9999;
                var qminValue=9999; 
                for (var i=0;i<_dataList.length;i++){   
                    if(dataList[i].upz){
                        maxValue=Math.max(maxValue,_dataList[i].upz);                    
                        minValue=Math.min(minValue,_dataList[i].upz);
                    }
                    if(dataList[i].dwz){
                        maxValue=Math.max(maxValue,_dataList[i].dwz);
                        minValue=Math.min(minValue,_dataList[i].dwz);
                    }
                    if(hasQx){
                        qmaxValue=Math.max(qmaxValue,_dataList[i].chanb);
                        qminValue=Math.min(qminValue,_dataList[i].chanb);
                    }                    
                } 
                // if(that.data.upz){
                //     maxValue=Math.max(maxValue,that.data.upz);
                //     minValue=Math.min(minValue,that.data.upz);
                // }
                // if(that.data.dwz){
                //     maxValue=Math.max(maxValue,that.data.dwz);
                //     minValue=Math.min(minValue,that.data.dwz);
                // }
                //console.log("原始，最小值："+minValue+"||最大值："+maxValue+"||渠箱"+qminValue+","+qmaxValue);
                minValue=parseFloat(minValue<0?minValue*1.2:minValue*0.8);
                maxValue=parseFloat(maxValue<0?maxValue*0.8:maxValue*1.2);
                yzRange=new Array(minValue,maxValue,maxValue-minValue);
                if(hasQx){
                    qmaxValue=Math.max(qmaxValue,that.data.chanb);
                    qminValue=Math.min(qminValue,that.data.chanb);
                    qminValue=parseFloat(qminValue<0?qminValue*1.2:qminValue*0.8);
                    qmaxValue=parseFloat(qmaxValue<0?qmaxValue*0.8:qmaxValue*1.2);
                    qxRange=new Array(qminValue,qmaxValue,qmaxValue-qminValue);  
                }    
            },
        };
        var modal = {};

        List.init();
        return modal;
    });