define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "echarts3_6_2", "tabs", "WdatePicker"],
    function ($, app, composition, ko, common, http, panal, echarts, tabs, wdatePicker) {
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("homeInitHandler_wasSF", {
                    init: function (dom) {
                        var panalObj = panal.getPanalByElement(dom);
                        that.stcd = panalObj.param.stcd;
                        that.stnm = panalObj.param.stnm;
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
                that.loadChart(that.stcd, that.stnm);
                that.loadHisChart(that.stcd);
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
                    id: "omInfo",
                    title: "基本信息",
                    content: "<div id='detail' style='height: 100%;width: 100%'></div>",
                    selected: true
                }, {
                    id: "hisInfo",
                    title: "历史数据",
                    content: dateInputStr + "<br><div id='hisChart' style='height: 380px;width: 520px'></div>",
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
            loadChart: function (stcd, stnm) {
                var div1 = '<div id="detail1" style="margin-top:15px; width:50%; text-align: left; float:left"></div>';
                var div3 = "<div id='lineEchart' style='height: 100%;width: 50%;float:left'></div>";
                var content;
                var h = http.getInstance("subject/queryWasDetail", {type: "post"});
                h.ajax({stcd: stcd}).then(function (result) {
                        var arrDate = [];
                        var arrReleaseNum = [];
                        var arrBrowseUserNum = [];
                        var tm = '';
                        var ppupz = '';
                        var ppdwz = '';
                        var tgtq = '', supwptn = '', sdwwptn = '', chanb = '', stsys = '';
                        if (result) {
                            ppupz = result[0].upz;
                            ppdwz = result[0].dwz;
                            arrDate.push(tm);
                            arrReleaseNum.push(ppupz);
                            arrBrowseUserNum.push(ppdwz);
                            if (result[0].tm) {
                                tm = result[0].tm;
                            } else {
                                tm = "";
                            }
                            if (result[0].stsys) {
                                stsys = result[0].stsys;
                            } else {
                                stsys = "";
                            }
                            if (result[0].upz == 'undefined' || result[0].upz == undefined) {
                                ppupz = "";
                            } else {
                                ppupz = result[0].upz;
                            }
                            if (result[0].dwz == 'undefined' || result[0].dwz == undefined) {
                                ppdwz = "";
                            } else {
                                ppdwz = result[0].dwz;
                            }
                            if (result[0].tgtq == 'undefined' || result[0].tgtq == undefined) {
                                tgtq = "";
                            } else {
                                tgtq = result[0].tgtq;
                            }
                            if (result[0].supwptn == "undefined" || result[0].supwptn == undefined) {
                                supwptn = "";
                            } else {
                                supwptn = result[0].supwptn;
                            }
                            if (result[0].sdwwptn == "undefined" || result[0].sdwwptn == undefined) {
                                sdwwptn = "";
                            } else {
                                sdwwptn = result[0].sdwwptn;
                            }
                            if (!result[0].chanb == "undefined" || result[0].chanb == undefined) {
                                chanb = "";
                            } else {
                                chanb = result[0].chanb;
                            }
                        }
                        content = '<div class="basic-info-row">' +
                            '<div class="basic-info-cell-header">水闸名称：' + stnm + '</div>' +
                            '</div>' +
                            '<div class="basic-info-row">' +
                            '<div class="basic-info-cell-header">数据来源：' + stsys + '</div>' +
                            '</div>' +
                            '<div class="basic-info-row">' +
                            '<div class="basic-info-cell-header">时间：' + tm + '</div>' +
                            '</div>' +
                            '<div class="basic-info-row">' +
                            '<div class="basic-info-cell-header">闸上水位：' + ppupz + '</div>' +
                            '</div>' +
                            '<div class="basic-info-row">' +
                            '<div class="basic-info-cell-header">闸下水位：' + ppdwz + '</div>' +
                            '</div>' +
                            '<div class="basic-info-row">' +
                            '<div class="basic-info-cell-header">渠箱水位：' + chanb + '</div>' +
                            '</div>' +
                            '<div class="basic-info-row">' +
                            '<div class="basic-info-cell-header">总过闸流量：' + tgtq + '</div>' +
                            '</div>' +
                            '<div class="basic-info-row">' +
                            '<div class="basic-info-cell-header">闸上水势：' + supwptn + '</div>' +
                            '</div>' +
                            '<div class="basic-info-row">' +
                            '<div class="basic-info-cell-header">闸下水势：' + sdwwptn + '</div>' +
                            '</div>';
                        document.getElementById('detail1').innerHTML = content;
                        option = {
                            title: {
                                text: '水闸实时在线监测图',
                                x: 'center',
                                top: 15,
                                align: 'right'
                            },
                            grid: {
                                bottom: 80,
                                left: '12%',
                                right: '18%'
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
                                data: ['闸上水位', '闸下水位']
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
                                    type: 'value',
                                    inverse: false
                                }
                            ],
                            series: [
                                {
                                    name: '闸上水位',
                                    type: 'bar',
                                    barWidth: 30,
                                    data: arrReleaseNum
                                }, {
                                    name: '闸下水位',
                                    type: 'bar',
                                    barWidth: 30,
                                    data: arrBrowseUserNum,
                                    barGap: '0%'
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
                    }
                );
                $("#detail").append(div1 + div3);
            },
            loadHisChart: function (stcd) {
                var fromDate = $('#from_date').val();
                var toDate = $('#to_date').val();
                var h = http.getInstance("subject/queryWasHist", {type: "post"});
                h.ajax({stcd: stcd, fromDate: fromDate, toDate: toDate}).then(function (result) {
                    var upz = [], dwz = [], date = [];
                    if (result) {
                        for (var i = 0; i < result.length; i++) {
                            var data = result[i];
                            upz.push(data.upz);
                            dwz.push(data.dwz);
                            date.push(data.tm.replace(' ', '\n'));
                        }
                    }
                    var option = {
                        title: {
                            text: '水闸历史水位变化图',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        color: ['#87CEFA', '#fa6af6'],
                        legend: {
                            data: ['闸上水位', '闸下水位'],
                            top: 30
                        },
                        calculable: true,
                        grid: {
                            right: 50,
                            left: 50,
                            bottom: 70
                        },
                        dataZoom: [{
                            type: 'inside',
                            start: 10,
                            end: 100,
                        }, {
                            show: true,
                            showDetail: false,
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
                                name: '水位(m)'
                            }
                        ],
                        series: [
                            {
                                name: '闸上水位',
                                type: 'line',
                                data: upz
                            },
                            {
                                name: '闸下水位',
                                type: 'line',
                                data: dwz
                            }
                        ]
                    };
                    var myChart = echarts.init(document.getElementById('hisChart'));
                    myChart.setOption(option);
                });
            },
            clickSearchBtn: function () {
                var that = this;
                that.loadHisChart(that.stcd);
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
        };
        var modal = {};

        List.init();
        return modal;
    });