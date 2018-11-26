define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal",  "tabs", "echarts3_6_2","WdatePicker","animateLoad"],
    function ($, app, composition, ko, common, http, panal, tabs, echarts,wdatePicker,animateLoad) {
        var myChart = null;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("drainageCanalWinHandler", {
                    init: function (dom) {
                        var panalObj = panal.getPanalByElement(dom);
                        that.data=panalObj.param;
                        console.log(that.data);
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
                that.getHisData();
                that.initShape();
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
                $("#changeChartTable").click(function(event) {
                    $("#hisChart").toggle();
                    $("#historyWaterList").toggle();
                });
            },
            loadTabs: function () {
                var that = this;
                var tm_s = new Date();
                tm_s.setTime(tm_s.getTime() - 24 * 60 * 60 * 1000);
                var tm_e = new Date();
                var dateInputStr = '<div class="form-inline pull-right" style="margin-right: 10px;">' +
                    '<div class="form-group">' +
                    '<label for="date">从: </label>' +
                    '<input type="text" style="height: 24px;width: 165px;" class="form-control"' +
                    ' value="' + that.formatDate(tm_s, 'yyyy-MM-dd hh:mm:ss') + '" id="from_date">' +
                    '<label for="date">至: </label>' +
                    '<input type="text" style="height: 24px;width: 165px;" class="form-control"' +
                    ' value="' + that.formatDate(tm_e, 'yyyy-MM-dd hh:mm:ss') + '" id="to_date">' +
                    '</div>' +
                    '</div>';
                var t = tabs.getInstance([{
                    id: "canalPointProfileInfo",
                    title: "水渠水位剖面图",                    
                     content: '<div style="margin-top:5px;font-size: 14px;"><div id="canalPointProfileInfoTab" class="profile-container" style="width:36em;background-color:#fff;"></div></div>',
                    selected: true
                },{
                    id: "chartInfo",
                    title: "水位过程线",
                    content:dateInputStr +'<br><div id="hisChart" style="width:480px;height:380px;float: left"></div>'+
                        '<div id="historyWaterList" style="float:left;display:none;margin: 5px auto;"></div>'+
                        '<div id="changeChartTable" style="float:right;width:20px;height:20px;"><img style="width:20px" src="style/asip/common/css/images/icon/chart_table.png"></div>',
                    selected: false
                }], {
                    replace: $("#drainageCanalTab"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '100%',
                    width: '100%'
                });
            },
            getHisData: function () {
                var that = this;
                var fromDate = $('#from_date').val();
                var toDate = $('#to_date').val();
                var h = http.getInstance("subject/getdrainageCanalHis", {type: "post"});
                h.ajax({stcd: that.data.stcd,fromDate: fromDate, toDate: toDate}).then(function (result) {
                    that.loadChart(result);
                    that.loadHistoryWaterList(result);
                })
            },
            initShape:function() {
                var that = this;
                $("#canalPointProfileInfoTab").empty();
                var COMB_NAME=that.data.stnm;
                var WATER_LEVEL=that.data.z;//当前水位
                var TIME_KEY=that.data.tm;
                var SOURCE=that.data.stsys;//数据来源

                var JJSW=0;//8//警戒水位
                var SQGC=0;//10//水渠高程                          
                            
                var html="<div class='wrapper'>";
                        html+="<span class='topTips'>"+COMB_NAME+"</span>";                     
                        html+="<div class='content'>";
                        html+="<span class='qdgcTip'>";
                        if(SQGC>0){
                            html+="渠顶高程<b> "+SQGC.toFixed(2)+"m</b>";
                        }else{
                            SQGC=WATER_LEVEL+2;//模拟高度计算水位
                        }
                        html+="</span>";
                            html+="<div class='load' id='load'>";
                                if(JJSW>0){
                                    html+="<div class='line'></div>";
                                    html+="<span class='lineTip' style='left:28em;'>警戒水位<b> "+JJSW.toFixed(2)+"</b>m</span>";
                                }                          
                                    html+="<div class='box'>";
                                        html+="<div class='text'>";
                                            html+="<strong>液位：</strong><span> "+WATER_LEVEL.toFixed(2)+"m</span></br>";
                                        html+="</div>";     
                                    html+="</div>";
                            html+="</div>";
                        html+="</div>";
                        html+="<div class='shuiqumark'></div>";
                        html+="<span class='bottomTips'>时间："+TIME_KEY+"<br>来源："+SOURCE+"</span>";
                    html+="</div>";
                    $("#canalPointProfileInfoTab").append(html);
                    $("#load").loading({tickHeight:WATER_LEVEL/SQGC,linetick:JJSW/SQGC,height:6.9,top:"10.8em",left:"0"});
            },            
            loadChart: function (data) {
                var date = [];
                var waterLineData = [];
                if (data) {
                    for (var i = data.length-1; i >=0 ; i--) {
                        //date.push(data[i].tm);
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
                        text: '水渠水位过程线',
                    },
                    legend: {
                        data: ['水渠水位'],
                        x: 'left'
                    },
                    grid: {
                        left:50,
                        right:15,
                        bottom:80
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    yAxis: {
                        type: 'value',
                        name: '水渠水深(m)'
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 10,
                        end: 100,
                    }, {
                        show: true,
                        showDetail:false,
                        start: 10,
                        end: 100,
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    series: [
                        {
                            name: '水渠水深',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
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
                        id: "ss",
                        text: "水深(m)",
                        datafield: "z",
                        width: "40%",
                        align: "center",
                        cellsalign: "center"
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
                $("#historyWaterList").jqxGrid({
                    width: 480,
                    height: 400,
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
                that.getHisData();
            },
            formatDate: function (date, fmt) {
                var o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "h+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        }

        var modal = {};

        List.init();
        return modal;
    });