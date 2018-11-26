/**
 * Created by hzp on 2017-07-20.
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "echarts3_6_2", "tabs"],
    function ($, app, composition, ko, common, http, panal, echarts, tabs) {
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("rainWinHandler", {
                    init: function (dom) {
                        var panalObj = panal.getPanalByElement(dom);
                        var tm_s = panalObj.param.tm1;
                        var tm_e = panalObj.param.tm2;
                        var stcd = panalObj.param.stcd;
                        var stnm = panalObj.param.stnm;
                        that.renderUI();
                        that.bindUI(tm_s, tm_e, stcd, stnm);
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function (tm_s, tm_e, stcd, stnm) {
                var that = this;
                that.loadTabs(tm_s, tm_e);
                that.loadChart(stcd, stnm);
                $("input[name='select-date']").click(function () {
                    WdatePicker({
                        onpicked: function (dp) {
                            $("input[name='select-date']").val(dp.cal.getNewDateStr());
                            that.clickSearchBtn();
                        },
                        dateFmt: 'yyyy-MM-dd',
                        readOnly: true
                    });
                });
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
            loadTabs: function (tm_s, tm_e) {
                var that = this;

                var dateInputStr = '<div class="form-inline pull-right" style="margin-right: 10px;">' +
                    '<div class="form-group">' +
                    '<label for="date">选择日期: </label>' +
                    '<input type="text" style="height: 24px;width: 110px;" class="form-control"' +
                    ' onchange="" value="' + tm_e + '" name="select-date">' +
                    '</div>' +
                    '</div>';

                var dateInputStr2 = '<div class="form-inline pull-right" style="margin-right: 10px;">' +
                    '<div class="form-group">' +
                    '<label for="date">从: </label>' +
                    '<input type="text" style="height: 24px;width: 165px;" class="form-control"' +
                    ' value="' + tm_s + '" id="from_date">' +
                    '<label for="date">至: </label>' +
                    '<input type="text" style="height: 24px;width: 165px;" class="form-control"' +
                    ' value="' + tm_e + '" id="to_date">' +
                    '</div>' +
                    '</div>';

                var t = tabs.getInstance([{
                    id: "omInfo",
                    title: "24h累计降雨",
                    content: dateInputStr + "<br><div id='lineEchart' style='height: 400px;width: 100%'></div>",
                    selected: true
                }, {
                    id: "oneHour",
                    title: "一小时雨量",
                    content: dateInputStr2 + "<br><div id='barChart' style='height: 400px;width: 580px'></div>",
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
            loadChart: function (stcd, stnm) {
                var that = this;
                var tm = $("input[name='select-date']").val();
                var tm_s = $('#from_date').val();
                var tm_e = $('#to_date').val();
                that.stcd = stcd;
                that.stnm = stnm;

                var h = http.getInstance("subject/queryRainfallOneDay");
                if (tm) {
                    h.ajax({tm: tm, stcd: stcd}).then(function (result) {
                        var xData = [], sumYData = []; //xData:时间, sumYData:每小时累计雨量
                        if (result) {
                            var drpSum = 0;
                            for (var i = 0; i < 24; i++) {
                                //var time = i < 10 ? '0' + i + ':00' : i + ':00';
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

                h = http.getInstance("subject/queryRainfallOneTime");
                if (tm_s || tm_e) {
                    h.ajax({tm_s: tm_s, tm_e: tm_e, stcd: stcd}).then(function (result) {
                        var xData = [], yData = []; //xData:时间, yData:一小时降雨量

                        if (result) {
                            for (var i = 0; i < result.length; i++) {
                                xData.push(result[i].tm);
                                yData.push(result[i].drp);
                            }
                        }

                        //一小时降雨图表
                        var myChart = echarts.init(document.getElementById('barChart'));
                        myChart.setOption({
                            color: ['#87CEFA'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                },
                                formatter: '{a0}</br>{b0}（mm）: {c0}'
                            },
                            legend: {
                                data: ['降雨量'],
                                show: false
                            },
                            title: {
                                text: '时段降雨量柱状图',
                                left: 'center',
                                top: '2%'
                            },
                            grid: {
                                right: 70,
                                left: 50
                            },
                            xAxis: {
                                data: xData
                            },
                            yAxis: {name: '降雨量（mm）'},
                            series: [{
                                name: '降雨量',
                                type: 'bar',
                                data: yData
                            }]
                        });
                    });
                }
            },
            clickSearchBtn: function () {
                var that = this;
                that.loadChart(that.stcd, that.stnm);
            }
        };
        var modal = {};

        List.init();
        return modal;
    });