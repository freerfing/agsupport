define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "echarts3_8_4", "tabs", "WdatePicker","animateLoad"],
    function ($, app, composition, ko, common, http, panal,panalPop, echarts, tabs, wdatePicker,animateLoad) {
	    var dataList,interval,idx;
        var panalObj;
        var bzRange, qxRange,bkRange;//渠箱水位区间
        var loadDivHeight,quxiangHeight,QXFALL,BKFALL,YZFALL,loadTop;
        var zsSW,zxSW,qxSW,bkSW;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("homeInitHandler_pump", {
                    init: function (dom) {
                        panalObj = panalPop.getPanalByElement(dom);
                        that.data=panalObj.param;

                        hasQx=false;//是否有渠箱
                        hasBk=false;//是否有泵坑
                        hasBz=false;//是否有泵站

                        interval=null;
                        idx=0;

                        loadDivHeight=14.9;//自己计算高度，定死div总高度
                        quxiangHeight=13.6;//渠箱总高度

                        QXFALL=13.6;//水箱总高
                        BKFALL=7.3//泵坑
                        YZFALL=14.9;//em堰闸总高           
                        loadTop="5em";//初始化14.8em;top: 3.599em;

                        bzRange=new Array(0,0,10);//堰闸水位区间
                        qxRange=new Array(0,0,10);//渠箱水位区间
                        bkRange=new Array(0,0,10);//渠箱水位区间
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

                //初始化时间           
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

                var playButtonStr='<p id="playButton" class="detail_playbtn_container">'+
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
                    '</p>';

                var t = tabs.getInstance([{
                    id: "pumpProfileInfo",
                    title: "水位剖面图",
                    content: playButtonStr+'<div class="profileInfoDiv detail_tab_container"><div id="pumpProfileInfoTab" style="width:100%"></div></div>',
                    selected: true
                },{
                    id: "hisInfo",
                    title: "水位过程线",
                    content: '<div class="detail_tab_container"><div id="hisChart"></div></div>',
                    selected: false
                },{
                    id: "tableInfo",
                    title: "数据列表",
                    content:'<div class="detail_tab_container"><div id="historyList"></div></div>',
                    selected: false
                }], {
                    replace: $("#pumpDetail"),
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
                     
                        zsSW=dataList[idx].ppupz!=null?dataList[idx].ppupz:bzRange[0];
                        zxSW=dataList[idx].ppdwz!=null?dataList[idx].ppdwz:bzRange[0];
                        qxSW=dataList[idx].chanb!=null?dataList[idx].chanb:qxRange[0];
                        bkSW=dataList[idx].pumppt!=null?dataList[idx].pumppt:bkRange[0];


                        $("#updateTime").text("上报时间："+dataList[idx].tm);//采集时间
                        $("#zsSW").text(zsSW.toFixed(2)+"m");//站上水位
                        $("#zxSW").text(zxSW.toFixed(2)+"m");//站下水位  
                        $("#qxSW").text(qxSW.toFixed(2)+"m");//渠箱水位
			            $("#bkSW").text(bkSW.toFixed(2)+"m");//渠箱水位                  
                   
                        that.updateAllHeightCss();
                          
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
                var h2 = http.getInstance("subject/queryPumpHist", {type: "post"});
                h2.ajax({stcd: that.data.stcd, fromDate: fromDate, toDate: toDate}).then(function (result) {//水位过程线和表格
                    that.hasData=false;
			        if(result) {
                        idx=result.length-1;
                        dataList= result;
                        $("#playButton").show();                        
                        that.data.chanb = result[0].chanb;
                        that.data.pumppt = result[0].pumppt;
                        that.data.ppupz = result[0].ppupz;
                        that.data.ppdwz = result[0].ppdwz;
                        that.data.tm = result[0].tm;
                        that.hasData=true;
                        if(that.data.chanb){
                            hasQx=true;//是否有渠箱
                        }
                        if(that.data.pumppt){
                            hasBk=true;//是否有渠箱
                        }
                        if(that.data.ppupz||that.data.ppdwz){
                            hasBz=true;
                        }
                        that.setWaterLevelRange(result);//获得水位区间
                    }else{
                        idx=-1;
                        $("#playButton").hide();
                        that.data.chanb = null;
                        that.data.pumppt = null;
                        that.data.ppupz = null;
                        that.data.ppdwz = null;
                        that.data.tm = null;
                        hasQx=false;//是否有渠箱
                        hasBk=false;//是否有泵坑
                        hasBz=false;//是否有泵站
                    } 
                    that.initShape();
                    that.loadHisChart(result);
                    that.loadHistoryWaterList(result);
                    common.hideLoading();
                });
            },  
            initShape:function() {
                var that = this;
               $("#pumpProfileInfoTab").empty();
                var COMB_NAME=that.data.stnm;
                var TIME_KEY=that.data.tm?that.data.tm:"无检测值";//上报时间
                var SOURCE=that.data.stsys;

                zsSW=that.data.ppupz!=null?that.data.ppupz:bzRange[0];//站上水位 
                zxSW=that.data.ppdwz!=null?that.data.ppdwz:bzRange[0];//站下水位：  
                qxSW=that.data.chanb!=null?that.data.chanb:qxRange[0];//渠箱水位：  
                bkSW=that.data.pumppt!=null?that.data.pumppt:bkRange[0];//泵站水位： 

                

                if(idx==-1){//没有返回值
                    var max=Math.max(zsSW,zxSW);
                    var min=Math.min(zsSW,zxSW);
                    min=parseFloat(min<0?min*1.2:min*0.8);
                    max=parseFloat(max<0?max*0.8:max*1.2);
                    bzRange= new Array(min,max,max-min);
                }

                var html="<div id='allInfo'>";
                html+="<span class='topTips'>"+COMB_NAME+"</span>";  
                html+="<span id='updateTime' class='update_time'>上报时间："+TIME_KEY+"</span>" ; 
    		    //泵坑             
                html+="<div id='bengkeng' style='display:none;' class='profileItem'>";
                    html+="<span class='typeTip'>泵坑</span>";
                    html+="<div class='load' id='bkload'>";
                        html+="<div class='boxdiv'>";//满7.2em
                            html+="<div class='text'>";
                                html+="<div class='water_info'><span id='bkSW'>"+(that.data.pumppt?bkSW.toFixed(2)+"m":"无检测值")+"</span></div>";                 
                            html+="</div>";      
                        html+="</div>";
                    html+="</div>";
                html+="</div>";
                
                //泵站的剖面
                html+="<div class='profile-container profileInfo profileItem' id='profileInfo' style='width:23.5em'>";   
                    html+="<div class='wrapper'>";                                             
                        html+="<div class='content'>";     		                                    
     			            //html+="<span class='yzgcTip'></span>";//闸门高程<b> 12</b>m
                            html+="<div class='load' id='load' style='height:"+loadDivHeight+"em;top:"+loadTop+";'>";
                                //警戒区                 
                                // html+="<div class='line'>";
                                //     html+="<span class='lineTip'>校核水位<b> 23</b>m</span>";
                                // html+="</div>";
                                html+="<div class='box box_l'>";//满14.9em
                                    html+="<strong class='water_type_l'>站上</strong>";
                                    html+="<div class='text'>";
                                        html+="<div class='water_info'><span id='zsSW'>"+(that.data.ppupz?zsSW.toFixed(2)+"m":"无检测值")+"</span></div>";                   
                                    html+="</div>";     
                                html+="</div>";
                                html+="<div class='box box_r'>";
                                    html+="<strong class='water_type_r'>站下</strong>";
                                    html+="<div class='text'>";
                                        html+="<div class='water_info'><span  id='zxSW'>"+(that.data.ppdwz?zxSW.toFixed(2)+"m":"无检测值")+"</span></div>";                   
                                    html+="</div>";      
                                html+="</div>";
                            html+="</div>";
                        html+="</div>";
                        html+="<div class='yanzhamark'></div>";                        
                    html+="</div>";                  
                html+="</div>";
                

                //渠箱的剖面
                
                html+="<div id='quxiang' class='profileItem'>";
                    html+="<span class='typeTip'>渠箱</span>";
                    html+="<div class='load' id='qxload'>";
                        html+="<div class='boxdiv'>";//满14.2em
                            html+="<div class='text'>";
                                 html+="<div class='water_info'><span id='qxSW'>"+(that.data.chanb?qxSW.toFixed(2)+"m":"无检测值")+"</span></div>";                
                            html+="</div>";      
                        html+="</div>";
                    html+="</div>";
                html+="</div>";
                
                html+="<span class='bottomTips'>数据来源："+SOURCE+"</span>";
                html+="</div>";

             $("#pumpProfileInfoTab").append(html);

                var width=39.7;
                var paddingLeft=0;
                if(hasQx&&hasBk){//如果有渠箱和泵坑
                    width=24.5;
                    $("#bengkeng").show();
                    $("#quxiang").show();
                    paddingLeft=13;                    
                }else if(hasQx&&!hasBk){//如果只有渠箱
                    width=32.5;
                    $("#quxiang").show();
                     paddingLeft=17;
                }else if(hasBk&&!hasQx){//如果只有泵坑
                    width=34;
                    $("#bengkeng").show();    
                    paddingLeft=17;                
                }

                if(hasBz||!that.hasData){//如果没有数据，默认显示泵站
                    paddingLeft=0;
                    $("#profileInfo").show();
                    $("#profileInfo").css({'width':width+"em"});                    
                }
                $(".profileItem:visible").eq(0).css({"margin-left":paddingLeft+"em"});

                that.updateAllHeightCss();                
            }, 

            updateAllHeightCss:function(){    
                var that=this;
                that.updateHeightCss($("#qxload .boxdiv"),QXFALL,qxSW-qxRange[0],qxRange[2]);
                that.updateHeightCss($("#bkload .boxdiv"),BKFALL,bkSW-bkRange[0],bkRange[2]);
                that.updateHeightCss($("#load .box_l"),YZFALL,zsSW-bzRange[0],bzRange[2]);
                that.updateHeightCss($("#load .box_r"),YZFALL,zxSW-bzRange[0],bzRange[2]);
            }, 
            updateHeightCss:function($elem,totalHeight,sw,range){    
                var curDivHeight=(sw/range)*totalHeight;
                var curTop=totalHeight-curDivHeight;
                $elem.css({                  
                    "height":curDivHeight+"em",
                    "top":curTop+"em"
                });   
            },  
            loadChart: function (result) {    
                var that=this;         
                var content;
                var arrDate = [];
                var arrReleaseNum = [];
                var arrBrowseUserNum = [];
                var tm = '';//时间
                var ppupz = '';//站上水位
                var ppdwz = '';//站下水位
                var omcn = '';//开机台数
                var ompwr = '';//开机功率
                var pmpq = '';//抽水流量(m^3/s)
                var chanb = '';//渠箱水位
                if (result) {                    
                    if (result[0].tm != "undefined" && result[0].tm != undefined) tm = result[0].tm;
                    if (result[0].ppupz != "undefined" && result[0].ppupz != undefined) ppupz = result[0].ppupz;
                    if (result[0].ppdwz != "undefined" && result[0].ppdwz != undefined) ppdwz = result[0].ppdwz;
                    if (result[0].ppupz != "undefined" && result[0].ppupz != undefined) ppupz = result[0].ppupz;
                    if (result[0].ppdwz != "undefined" && result[0].ppdwz != undefined) ppdwz = result[0].ppdwz;
                    if (result[0].omcn != "undefined" && result[0].omcn != undefined) omcn = result[0].omcn;
                    if (result[0].ompwr != "undefined" && result[0].ompwr != undefined) ompwr = result[0].ompwr;
                    if (result[0].pmpq != "undefined" && result[0].pmpq != undefined) pmpq = result[0].pmpq;
                    if (result[0].chanb != "undefined" && result[0].chanb != undefined) chanb = result[0].chanb;
                    arrDate.push(tm);
                    arrReleaseNum.push(ppupz);
                    arrBrowseUserNum.push(ppdwz);
                }
                content = '<div class="basic-info-row">' +
                    '<div class="basic-info-cell-header">泵站名称：' + that.data.stnm + '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell-header">时间：' + tm + '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell-header">数据来源：' + that.data.stsys + '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell-header">站上水位：' + ppupz + '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell-header">站下水位：' + ppdwz + '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell-header">开机台数：' + omcn + '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell-header">渠箱水位：' + chanb + '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell-header">开机功率：' + ompwr + '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell-header">抽水流量(m^3/s)：' + pmpq + '</div>' +
                    '</div>';
                document.getElementById('detail1').innerHTML = content;
                var option = {
                    title: {
                        text: '泵站实时在线监测图',
                        x: 'center',
                        top: 15,
                        align: 'right'
                    },
                    grid: {
                        bottom: 50,                       
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            animation: false,
                            label: {
                                backgroundColor: '#505765'
                            }
                        }
                    },
                    legend: {
                        data: ['站上水位', '站下水位']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: arrDate
                        }
                    ],
                    yAxis: [
                        {
                            name: '水位(m)',
                            nameLocation: 'start',
                            min: -2,
                            max: 10,
                            type: 'value',
                            inverse: false
                        }
                    ],
                    series: [
                        {
                            name: '站上水位',
                            type: 'bar',
                            barWidth: 30,
                            data: arrReleaseNum
                        }, {
                            name: '站下水位',
                            type: 'bar',
                            barWidth: 30,
                            data: arrBrowseUserNum,
                            barGap: 0
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById('lineEchart'));

                myChart.setOption(option);

                setTimeout(function () {
                    window.onresize = function () {
                        myChart.resize();
                    };
                }, 200);

            },
            loadHisChart: function (result) { 
                var that=this;            
                 var ppupz = [], ppdwz = [], chanb =[],date = [],pumppt=[],legendData=[],seriesData=[],colorData=[]
                if (result) {
                    for (var i = result.length-1; i >=0; i--) {
                        var data = result[i];
                        ppupz.push(data.ppupz);
                        ppdwz.push(data.ppdwz);
                        chanb.push(data.chanb);
                        pumppt.push(data.pumppt);
                        date.push(data.tm.replace(' ', '\n'));
                    }
                }
              
                if(hasBz||!that.hasData){
                    legendData.push('闸上水位', '闸下水位');
                    seriesData.push({
                        name: '闸上水位',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        showSymbol:false,
                        data: ppupz
                    },
                    {
                        name: '闸下水位',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        showSymbol:false,
                        data: ppdwz
                    });
  
                    colorData.push('#87CEFA', '#fa6af6');
                }
             
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
                if(hasBk){
                    seriesData.push({
                        name: '泵坑水位',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        showSymbol:false,
                        data: pumppt
                    });
                    legendData.push('泵坑水位');
                    colorData.push('#00ED00');
                }
                var option = {
                    title: {
                        text: '泵站历史水位变化图',
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
                        cellsalign: "center",
                        sortable:true,
                        sortorder :"desc"
                    },
                ];
                if(hasBz||!that.hasData){
                    columns.push({
                        id: "zssw",
                        text: "站上水位(m)",
                        datafield: "ppupz",                 
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    },{
                        id: "sxsw",
                        text: "站下水位(m)",
                        datafield: "ppdwz",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                    });
                }
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
		        if(hasBk){
                    columns.push({
                        id: "qxsw",
                        text: "泵坑水位(m)",
                        datafield: "pumppt",
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
		        //泵坑
		        var bmaxValue=-9999;
                var bminValue=9999;
                for (var i=0;i<_dataList.length;i++){   
                    if(hasBz){
                        maxValue=Math.max(maxValue,_dataList[i].ppupz);                    
                        minValue=Math.min(minValue,_dataList[i].ppupz);
                        maxValue=Math.max(maxValue,_dataList[i].ppdwz);
                        minValue=Math.min(minValue,_dataList[i].ppdwz);
                    }                    
                    if(hasQx){
                        qmaxValue=Math.max(qmaxValue,_dataList[i].chanb);
                        qminValue=Math.min(qminValue,_dataList[i].chanb);
                    }
		            if(hasBk){
                        bmaxValue=Math.max(qmaxValue,_dataList[i].pumppt);
                        bminValue=Math.min(qminValue,_dataList[i].pumppt);
                    }
                    
                } 
                if(hasBz){
                    minValue=parseFloat(minValue<0?minValue*1.2:minValue*0.8);
                    maxValue=parseFloat(maxValue<0?maxValue*0.8:maxValue*1.2);
                    bzRange=new Array(minValue,maxValue,maxValue-minValue); 
                }
                if(hasQx){
                    qminValue=parseFloat(qminValue<0?qminValue*1.2:qminValue*0.8);
                    qmaxValue=parseFloat(qmaxValue<0?qmaxValue*0.8:qmaxValue*1.2);
                    qxRange=new Array(qminValue,qmaxValue,qmaxValue-qminValue);  
                } 
		        if(hasBk){
                    bminValue=parseFloat(bminValue<0?bminValue*1.2:bminValue*0.8);
                    bmaxValue=parseFloat(bmaxValue<0?bmaxValue*0.8:bmaxValue*1.2);
                    bkRange=new Array(bminValue,bmaxValue,bmaxValue-bminValue);  
                }
            },
        };
        var modal = {};

        List.init();
        return modal;
    });