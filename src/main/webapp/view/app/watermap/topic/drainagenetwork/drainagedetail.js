define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http","panal","panalPop", "pager","tabs", "echarts3_8_4", "WdatePicker","animateLoad"],
    function ($, app, composition, ko, common, http, panal,panalPop, pager, tabs,echarts,wdatePicker,animateLoad) {
        var dataList,interval,idx;
        var loadDivHeight,loadTop,waterLevelRange;//水位区间
        var panalObj;
        var Drainagedetail = {
            init: function () {
                var that = this;
                composition.addBindingHandler("drainagedetailInitHandler", {
                    init: function (dom) {
                        interval=null,idx=0;
                        loadDivHeight=14;
                        loadTop="4em";
                        waterLevelRange=new Array(0,0,10);
                        panalObj = panalPop.getPanalByElement(dom);

                        that.data = panalObj.param;
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
                $("#from_date").val(common.getPastDate(tm_e,1));
                $("#to_date").val(tm_e);

                that.loadTabs();//tab选项卡
                that.getData();//水位过程图    
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
                        waterLevel=dataList[idx].z;
                        currentDivHeight=((waterLevel-waterLevelRange[0])/HDGC)*loadDivHeight;
                        var info="<strong>水位：</strong><span> "+waterLevel.toFixed(2)+"m</span>";
                        $("#waterLevelInfo").css({"top":"-1.5em"});//.html(info);
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
            //初始化管网流速折线图
            loadChart: function (data) {
                var date = [];
                var waterLineData = [];
                if (data) {
                    for (var i = data.length-1; i >=0; i--) {
                        date.push(data[i].tm.replace(' ', '\n'));
                        waterLineData.push(data[i].z);
                    }
                }
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    title: {
                        x: 'center',
                        text: '管道水位过程线',
                    },
                    legend: {
                        data: ['管道水深'],
                        x: 'left'
                    },
                    grid: {
                        left:60,
                        right: 50,
                        bottom: 50
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
                        name: '管道水深(m)'
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
                            name: '管道水深',
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
                            }
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
            initShape: function () {
                var that = this;
    
                $("#shape_div").empty();

                var COMB_NAME=that.data.stnm;
                var WATER_LEVEL=that.data.z;//水位高度 5  data.z;
                var TIME_KEY=that.data.tm;
                var SOURCE=that.data.stsys;

                var JJSW=that.data.jjsw?that.data.jjsw:waterLevelRange[1];//警戒水位           

                var JS=waterLevelRange[2]==10?WATER_LEVEL*1.5:waterLevelRange[2];////10;//井深  假设10

                var JDGC=0;//井底高程     井底高程+井深=地面高程
                var GDGC=0;//管底高程

                var BG=JDGC+WATER_LEVEL;//标高=井底高程+水位高度

                var SYGJ="";//"DN300";//sy管径
                var XYGJ="";//"DN200";//xy管径
                
                var html="<div class='wrapper'>";
                        html+="<span class='topTips'>"+COMB_NAME+"</span>";
                        html+='<span id="updateTime">上报时间：'+TIME_KEY+'</span>';
                        html+="<div class='content'>";
                        if(WATER_LEVEL){
                            html+="<div class='load' id='load'>";
                                    // html+="<div class='line'></div>";
                                    // html+="<span class='lineTip'>距井口<b>1</b>米</span>";
                                    html+="<div class='box'>";
                                        html+="<div class='text' id='waterLevelInfo'>";
                                            // if(JDGC!=0){
                                            //     html+="<strong>标高：</strong><span>"+BG.toFixed(2)+"m</span>";
                                            // }  
                                            html+="<div class='water_info'><span id='curWaterLevel'>"+WATER_LEVEL+"m</span></div>";                                    
                                        html+="</div>";     
                                    html+="</div>";
                            html+="</div>";

                            html+="<div class='arrowGroup'>";
                                html+="<div class='leftA'>";
                                    html+="<span class='arrow rightArrow'></span>";
                                html+="</div>";
                                html+="<div class='rightA'>";
                                    html+="<span class='arrow rightArrow'></span>";
                                html+="</div>";
                            html+="</div>";
                            html+="<div class='pipePort'>";
                                html+="<span class='leftMark'>"+SYGJ+"</span>";
                                html+="<span class='rightMark'>"+XYGJ+"</span>";
                            html+="</div>";
                            html+="<div class='pipeBottom'>";
                            if(GDGC!=0){
                                html+="<span class='leftHeight'>管底标高<br/>"+GDGC+"</span>";
                            }
                            html+="</div>";
                        html+="</div>";
                        html+="<p class='bottomTips'>";
                        if(JDGC!=0){html+="井底标高:"+JDGC+"m";}
                        html+="</p>";
                        }
                        html+="<span class='bottomTips'>数据来源："+SOURCE+"</span>";

                    html+="</div>";
                    $("#shape_div").append(html);

                    //,
                    //linetick:(JS-1)/JS 距离井口1米
                    $("#load").loading({tickHeight:(WATER_LEVEL-waterLevelRange[0])/JS,linetick:(JS-1)/JS,height: loadDivHeight,top:loadTop,left:"5.6em",width:"6.9em"});//调用wellanimate
            },
            loadTabs: function () {
                var that = this;                

                var playButtonStr='<div id="playButton" class="detail_playbtn_container">'+
                        '<span class="reservoir_query_name">播放速度：</span><span>'+
                            '<select id="speed" style="width:80px">'+
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
                    id: "pipeProfileInfo",
                    title: "水位剖面图",
                    content: playButtonStr+'<div id="pipeProfileInfoTab" class="popeProfile_tab detail_tab_container"><div id="shape_div"></div></div>',
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
                    replace: $("#drainagedetailTab"),
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
                that.stopPlaying();
                var fromDate = $('#from_date').val();
                var toDate = $('#to_date').val();
                var h = http.getInstance("subject/getDrainageHis", {type: "post"});
                h.ajax({stcd: that.data.stcd,fromDate: fromDate, toDate: toDate}).then(function (result) {
                    if(result) {
                        idx=result.length-1;
                        dataList= result;
                        that.data.z = result[0].z;
                        that.data.tm = result[0].tm;
                        $("#playButton").show();
                         waterLevelRange=that.getWaterLevelRange(result);//获得水位区间
                    }else{
                        that.data.tm = "无检测值";
                        that.data.z = null;
                        $("#playButton").hide();
                    }      
                    that.loadChart(result);  
                    that.loadHistoryWaterList(result);     
                    that.initShape();//初始化剖面图
                    common.hideLoading();        
                })
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
                        text: "管道水深",
                        datafield: "z",                 
                        align: "center",
                        cellsformat: 'f2',
                        type:'float',
                        cellsalign: "center"
                    }];
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
            //查询按钮点击事件
            clickSearchBtn: function () {
                var that = this;
                common.showLoading($("#"+panalObj.uniqueID));
                that.getData();
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
                // console.log("原始，最小值："+minValue+"||最大值："+maxValue);
                minValue=parseFloat(minValue<0?minValue*1.2:minValue*0.8);
                maxValue=parseFloat(maxValue<0?maxValue*0.8:maxValue*1.2);
                // console.log("最小值："+minValue+"||最大值："+maxValue+"||差值："+(maxValue-minValue));
                return  new Array(minValue,maxValue,maxValue-minValue);        
            },
        };

        var modal = {
            clickSearchBtn: $.proxy(Drainagedetail.clickSearchBtn, Drainagedetail)
        };

        Drainagedetail.init();
        return modal;
    });