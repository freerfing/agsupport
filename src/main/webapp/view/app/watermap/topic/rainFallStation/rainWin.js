define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "echarts3_8_4", "tabs"],//echarts
    function ($, app, composition, ko, common, http, panal,panalPop, echarts, tabs) {
        var panalObj;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("rainWinHandler", {
                    init: function (dom) {
                        panalObj = panalPop.getPanalByElement(dom);
                        that.data = panalObj.param;
                        
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

                that.loadTabs();
                that.getDataList();


                $("#from_date").click(function () {
                    WdatePicker({
                        onpicked: function (dp) {
                            that.clickSearchBtn();
                        },
                        dateFmt: 'yyyy-MM-dd HH:00:00',
                        readOnly: true,
                        maxDate: "#F{$dp.$D('to_date')}"
                    });
                });
                $("#to_date").click(function () {
                    WdatePicker({
                        onpicked: function (dp) {
                            that.clickSearchBtn();
                        },
                        dateFmt: 'yyyy-MM-dd HH:00:00',
                        readOnly: true,
                        minDate: "#F{$dp.$D('from_date')}"
                    });
                });
            },
            loadTabs: function () {
                var that = this;   
                        
                $("#from_date").val(that.data.tm1);
                $("#to_date").val(that.data.tm2);
                var t = tabs.getInstance([
                // {
                //     id: "omInfo",
                //     title: "24h累计降雨",
                //     content: dateInputStr + "<br><div id='lineEchart' style='height: 400px;width: 100%'></div>",
                //     selected: true
                // }, 
                {
                    id: "oneHour",
                    title: "时段降雨量",
                    content: '<div class="detail_tab_container"><div id="hisChart"></div></div>',
                    selected: true 
                },{
                    id: "tableInfo",
                    title: "数据列表",
                    content:'<div class="detail_tab_container"><div id="historyList"></div></div>',
                    selected: false
                }], {
                    replace: $("#rainfallstation1"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '100%',
                    width: '100%'
                });
            },
            getDataList:function(){
                var that = this;
                var tm_s = $('#from_date').val();
                var tm_e = $('#to_date').val();
                var stcd = that.data.stcd;  
                h = http.getInstance("subject/queryRainfallOneTime");
                if (tm_s || tm_e) {
                    h.ajax({tm_s: tm_s, tm_e: tm_e, stcd: stcd}).then(function (result) {
                        that.loadChart(result); 
                        that.loadHistoryList(result);
                        common.hideLoading();
                    });
                }
            },
            loadHistoryList:function(result){
                var data=[];
                if (result) {
                    data=new Array(result.length);
                    var tempSum=0;
                    for (var i = 0; i < result.length; i++) {
                        tempSum+=result[i].drp;                                
                        result[i].sumDrp=tempSum;

                        data[result.length-i-1]=result[i];
                       
                    }
                    sumItem={
                        tm:"累计雨量",
                        drp:tempSum,
                    }
                    data.push(sumItem);
                }
                var columns = [
                    {
                        id: "tm",
                        text: "时间",
                        datafield: "tm",
                        width: "50%",
                        align: "center",
                        cellsalign: "center"
                    },{
                        id: "drp",
                        text: "雨量(mm)",
                        datafield: "drp",
                        width: "50%",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f1'
                    }
                    // ,{
                    //     id: "sumDrp",
                    //     text: "累计雨量(mm)",
                    //     datafield: "sumDrp",
                    //     width: "30%",
                    //     align: "center",
                    //     cellsalign: "center"
                    // }
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
            loadLineChart:function(stcd, stnm){
                var that = this;
                var tm = $("input[name='select-date']").val();
                var h = http.getInstance("subject/queryRainfallOneDay");
                if (tm) {
                    h.ajax({tm: tm, stcd: stcd}).then(function (result) {
                        var xData = [], sumYData = []; //xData:时间, sumYData:每小时累计雨量
                        if (result) {
                            var drpSum = 0;
                            for (var i = -16; i < 8; i++) {                                
                                var time;
                                if (i<0) {
                                    time = (i + 24) <10 ? '0' + (i + 24) + ':00' : (i + 24) + ':00';
                                } else {
                                    time = '0' + i + ':00';
                                }
                                for (var j = 0; j < result.length; j++) {
                                    if (time == result[j].tm) {
                                        drpSum += result[j].drp;
                                        break;
                                    }
                                }
                                xData.push(time);
                                sumYData.push(drpSum);
                            }
                        }

                        //日期字符串
                        var dateStr = tm.split(" ")[0];

                        //24h累计降雨量
                        var myChart = echarts.init(document.getElementById('lineEchart'));
                        myChart.setOption({
                            title: {
                                text: stnm + " " + dateStr + ' 累计雨量过程线',
                                left: 'center',
                                top: '3%'
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross'
                                }
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                axisTick: {
                                    interval: 0
                                },
                                data: xData
                            },
                            yAxis: {
                                type: 'value',
                                name: '单位: mm',
                                axisLabel: {
                                    formatter: '{value} '
                                },
                                axisPointer: {
                                    snap: true
                                }
                            },
                            visualMap: {
                                top: 10,
                                right: 10,
                                pieces: [{
                                    gt: 0,
                                    lte: 99,
                                    color: '#2FF'
                                }, {
                                    gt: 99,
                                    color: '#FF0000'
                                }],
                                outOfRange: {
                                    color: '#999'
                                }
                            },
                            series: [
                                {
                                    name: '累计雨量',
                                    type: 'line',
                                    smooth: false,
                                    data: sumYData,
                                    markLine: {
                                        data: [
                                            {
                                                name: '警戒值',
                                                yAxis: 100,
                                                lineStyle: {
                                                    normal: {
                                                        type: 'solid'
                                                    }
                                                }
                                            }

                                        ]
                                    }
                                }
                            ]
                        });
                    });
                }
            },
            loadChart: function (result) {
                var that = this;
                var tempSum=0;
                var tm_s = $('#from_date').val();
                var tm_e = $('#to_date').val();
                var dateArr=that.getHourAll(tm_s,tm_e);  
                var xData = [], yData = [],ySumData=[]; //xData:时间, yData:一小时降雨量
                xData=dateArr;
                yData=new Array(dateArr.length);
                ySumData=new Array(dateArr.length);
                if (result) {
                    tempSum=0;
                    for (var i = 0; i < dateArr.length; i++) {
                        yData[i]=0;
                        for (var j = 0; j < result.length; j++) {
                            if(dateArr[i]==result[j].tm){
                                 yData[i]=result[j].drp;
                            }
                        }
                        tempSum+=yData[i];      
                        yData[i]=parseFloat(yData[i]).toFixed(2);                      
                        ySumData[i]=parseFloat(tempSum).toFixed(2);//tempSum;
                    }
                }

                //一小时降雨图表

               
                var myChart = echarts.init(document.getElementById('hisChart'));
                // 绑定事件
                // 点击自定义legend图标
                var option={
                    color: ['#5E5EFF','#FF0000'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                        //formatter: '{b}<br/>{a}：{c}(mm)<br/>{a}：{c1}(mm)'
                    },                   
                    legend: {
                        orient: 'horizontal', // 'vertical'
                        x: 'left', // 'center' | 'left' | {number},
                        y: 'top', // 'center' | 'bottom' | {number}
                        data: ['降雨量','累计雨量'],
                        show: true
                    },
                    dataZoom : {//实现缩放功能  
                        type:'slider',     
                        show : true, 
                        showDetail:false,
                        start : 10,        
                        end : 100 ,
                        filterMode:'empty'//不过滤数据，只改变数轴范围
                    }, 
                    title: {
                        text: '时段降雨量',
                        left: 'center'
                    },
                    grid: {
                        right: 70,
                        left: 60
                    },
                    xAxis: {
                        data: xData,
                        boundaryGap: false
                    },
                    yAxis: [
                        {
                            type: 'value', 
                            name: '降雨量(mm)',
                            nameLocation: 'middle',
                            nameGap: 45,
                            scale: true,//脱离0值比例，放大聚焦到最终_min，_max区间
                            axisLabel: {                   
                                formatter: function (value, index) {           
                                    return value.toFixed(2);      
                                }                
                            }
                        },
                        {
                            type: 'value',
                            name: '累计雨量(mm)',
                            nameLocation: 'middle',
                            nameGap: 45,
                            min: 0,   
                            scale: true,//脱离0值比例，放大聚焦到最终_min，_max区间
                            splitLine : {  
                                show: false  
                            },
                            axisLabel: {                   
                                formatter: function (value, index) {           
                                    return value.toFixed(2);      
                                }                
                            } 

                        }
                    ],
                    series: [
                    {
                        name: '降雨量',
                        type: 'bar',
                        yAxisIndex:0,
                        data: yData                    
                    },{
                        name: '累计雨量',
                        type: 'line',
                        showSymbol:false,
                        symbolSize: [0,0],
                        lineStyle:{
                            normal:{            
                                width:1                                       
                            },
                        },
                        yAxisIndex:1,
                        data: ySumData,
                        smooth:true
                    }]
                }
                myChart.setOption(option);
                myChart.on("legendselectchanged",function(params){ 
                    var target = params.name;  // 获取当前被点击的标签                    
                    if(target=='降雨量'){
                        if(params.selected[target]){                            
                            option.yAxis[0].name='降雨量(mm)';
                        }else{                           
                            option.yAxis[0].name='';
                        }
                    }
                    if(target=='累计雨量'){
                        if(params.selected[target]){                          
                            option.yAxis[1].name='累计雨量(mm)';
                        }else{                            
                            option.yAxis[1].name='';
                        }
                    }
                    myChart.setOption(option);
                });

            },

            clickSearchBtn: function () {
                var that = this;
                common.showLoading($("#"+panalObj.uniqueID));
                that.getDataList();
            },
            //按日查询
            getHourAll:function(begin,end){
                var that=this;
                var dateAllArr = new Array();
                var db =Date.parse(begin.replace(/-/g,'/'));   
                var de =Date.parse(end.replace(/-/g,'/'));
                for(var k=db;k<=de;){
                    //dateAllArr.push(that.formatDate(new Date(parseInt(k)),'yy/MM/dd hh时'));
                    dateAllArr.push(common.formatDate(new Date(parseInt(k)),'yyyy-MM-dd hh:mm:ss'));
                    k=k+60*60*1000;
                }
                return dateAllArr;
            }
        };
        var modal = {};

        List.init();
        return modal;
    });