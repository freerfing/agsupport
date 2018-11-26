/**
 * Created by hzp on 2017-07-20.
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","highcharts","tabs", "echarts"],
    function ($, app, composition, ko, common, http, panal,highcharts,tabs, echarts) {
        var myChart = null;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("reservoirWinHandler", {
                    init: function (dom) {
                        var panalObj = panal.getPanalByElement(dom);
                        var sbsj = panalObj.param.sbsj;
                        var zm = panalObj.param.zm;
                        // var sbsj = modal._$_param.sbsj;
                        // var zm = modal._$_param.zm;
                        that.renderUI();
                        that.bindUI(sbsj,zm);
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function (sbsj,zm) {
                var that = this;
                that.loadTabs();
                //that.loadChart(sbsj,zm);
            },
            loadTabs:function(){
                var that = this;
                var t = tabs.getInstance([{
                    id: "omInfo",
                    title: "实时水位雨量",
                    view:"view/app/common/list",
                    // content: "<div id='graphic'>" +
                    // "<div id='main' style='width:300px;height:100px;'</div>" +
                    // "<div id='main2' style='width:300px;height:100px;'</div>" +
                    // "<div id='main3' style='width:300px;height:100px;'</div>" +
                    // "</div>",
                    selected: true
                },/*{
                    id: "baseInfo",
                    title: "实时水位雨量",
                    content: "<div style='height: 100%;width: 100%'><div style='padding-top: 10px;display: none'>" +
                    "<label>时间：</label>" +
                    "<select id='timeSelect' style='width: 100px'><option>一周以内</option></select>" +
                    "<label style='padding-left: 20px'>时段类型：</label>" +
                    "<select id='timeType' style='width: 100px'><option>小时</option></select>" +
                    "</div><div id='chartTab' style='height: 100%;width: 100%'></div></div>",
                    selected: false
                },*/{
                    id: "videoInfo",
                    title: "视频信息",
                    content: "<div></div>",
                    selected: false
                }], {
                    replace: $("#reserviorList1"),
                    contentBorder: true,
                    onSelect: function(tabId, title){
                    },
                    onClose: function(tabId, title){
                    },
                    height: '100%',
                    width:'100%'
                });
            },
            loadChart: function (sbsj,zm) {
                var plotLines = [];
                plotLines.push(
                    {
                        value: 160,
                        width: 2,
                        color: '#ED3A15',
                        zIndex: 4,
                        label: {x: 3, text: '警戒水位', style: {color: '#ED3A15', fontSize: '12px'}}
                    }
                );
                plotLines.push(
                    {
                        value: 100,
                        width: 1,
                        color: '#ED3A15',
                        zIndex: 4,
                        label: {x: 3, text: '正常水位', style: {color: '#ED3A15', fontSize: '12px'}}
                    }
                );
                var h=http.getInstance("subject/queryLastweekWaterStage")
                h.ajax({sbsj:sbsj,zm:zm}).then(function(result){
                    $('#chartTab').highcharts({
                        chart: {
                            type: 'areaspline',
                            animation: Highcharts.svg, // don't animate in old IE
                            marginRight: 10,
                            events: {
                                // load: function () {
                                //     // set up the updating of the chart each second
                                //     var series = this.series[0],
                                //         chart = this;
                                //     setInterval(function () {
                                //         var x = (new Date()).getTime(), // current time
                                //             y = Math.random();
                                //         series.addPoint([x, y], true, true);
                                //         activeLastPointToolip(chart)
                                //     }, 1000);
                                // }
                            }
                        },
                        title: {
                            text: '水库水位'
                        },
                        credits: {
                            enabled: false     //不显示LOGO
                        },
                        xAxis: {
                            type: 'datetime',
                            labels: {
                                formatter: function () {
                                    return Highcharts.dateFormat('%Y-%m-%d', this.value);
                                }
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>水位（m):' +
                                    this.y
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        yAxis: {
                            title: {
                                text: '水位（m)'
                            },
                            plotLines: plotLines,
                            min: 0
                        },
                        series: [{
                            name: '水库水位',
                            data: (function () {
                                var data = [];
                                for(var i=0;i<result.length;i++) {
                                    data.push({
                                        x: new Date(result[i].sbsj).getTime(),
                                        y: Number(result[i].sw)
                                    });
                                }
                                return data;
                            }())
                        }]
                    }, function (c) {
                        activeLastPointToolip(c)
                    });
                });

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