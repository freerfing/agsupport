define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts3_6_2", "zrender", "WdatePicker"],
    function ($, app, composition, ko, common, http, panal, pager, echarts, zrender) {
        var curPanal;
        var Drainagedetail = {
            init: function () {
                var that = this;
                composition.addBindingHandler("drainagedetailInitHandler", {
                    init: function (dom) {
                        //当前日期
                        var d = new Date();
                        var month = d.getMonth() + 1;
                        var todayStr = d.getFullYear() + "-" + month + "-" + d.getDate();
                        var tm = todayStr;
                        $("#drainagedetail_date").val(todayStr);
                        var panalObj = panal.getPanalByElement(dom);
                        var panelHeight = panalObj.param.height;
                        var stcd = panalObj.param.rowData.stcd;
                        that.renderUI(tm, panelHeight, stcd);
                        that.bindUI();
                        $(dom).click(function () {
                        });
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function (tm, panelHeight, stcd) {
                var that = this;
                that.dateSelected();
                that.initChart(tm, panelHeight, stcd);
                that.initShape(panelHeight);
            },
            bindUI: function () {
                var that = this;
            },
            dateSelected: function () {
                var that = this;
                $("#drainagedetail_date").click(function () {
                    WdatePicker({
                        onpicked:function(dp){
                            $("#drainagedetail_date").val(dp.cal.getNewDateStr());
                            that.clickSearchBtn();
                        },
                        dateFmt:'yyyy-MM-dd'
                    });
                });
            },
            //初始化管网流速折线图
            initChart: function (tm, panelHeight, stcd) {
                var that = this;
                tm = $("#drainagedetail_date").val();
                that.tm = tm;
                that.panelHeight = panelHeight;
                that.stcd = stcd;
                var h = http.getInstance("subject/queryDrainageDetailDay");
                h.ajax({tm: tm, stcd: stcd}).then(function (result) {
                    var tmArr = new Array();//时间
                    var vArr = new Array();//流速
                    if(result) {
                        for (var i=0; i<result.length; i++){
                            tmArr.push(result[i].tm)
                            vArr.push(result[i].v)
                        }
                    }
                    $('#speed_line_chart').css('height', panelHeight * 0.72 + 'px');
                    var myChart = echarts.init(document.getElementById('speed_line_chart'));
                    myChart.setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        grid: {
                            x: '7%',
                            y: '13%',
                            width: '90%',
                            // height: '75%'
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            axisTick: {
                                interval: 0
                            },
                            data: tmArr
                        },
                        yAxis: {
                            type: 'value',
                            name: '单位: 米/秒',
                            axisLabel: {
                                formatter: '{value}'
                            },
                            axisPointer: {
                                snap: true
                            }
                        },
                        series: [
                            {
                                name: '管网流速',
                                type: 'line',
                                smooth: true,
                                data: vArr,
                                itemStyle: {
                                    normal: {
                                        color: '#B0E2FF'
                                    }
                                },
                                areaStyle: {normal: {}}
                            }
                        ]
                    });
                })
            },
            initShape: function (panelHeight) {
                require(
                    [
                        'zrender',
                        'zrender/shape/Circle',
                        'zrender/shape/Line',
                        'zrender/shape/Polygon',
                        'zrender/shape/Text',
                        'zrender/shape/Sector'
                    ],
                    function (zrender, CircleShape, Line, Polygon, Text, Sector) {
                        $('#shape_div').css('height', panelHeight * 0.72 + 'px');
                        var canvasW = $('#shape_div').width();
                        var canvasH = $('#shape_div').height();

                        var waterLevel = 6.35;//水位
                        var pipesize = 10;//管道直径

                        //图属性
                        var ox = canvasW * 4 / 7;//圆心X坐标130
                        var oy = canvasH * 0.5;//圆心Y坐标80
                        var r = canvasW > canvasH ? canvasW / 4 : canvasH / 4;//圆半径50

                        //初始化
                        var zr = zrender.init(document.getElementById('shape_div'));
                        //清除画布
                        zr.clear();

                        //画圆
                        var circle = new CircleShape({
                            style: {
                                x: ox,
                                y: oy,
                                r: r,
                                brushType: 'both',
                                color: 'white',
                                lineWidth: 1
                            },
                            hoverable: false
                        });
                        zr.addShape(circle);

                        //画上指示线
                        var line = new Line({
                            style: {
                                xStart: ox,
                                yStart: oy - r,
                                xEnd: ox - r - canvasW * 0.1,
                                yEnd: oy - r,
                                lineWidth: 1
                            },
                            hoverable: false
                        });
                        zr.addShape(line);

                        //画下指示线
                        line = new Line({
                            style: {
                                xStart: ox,
                                yStart: oy + r,
                                xEnd: ox - r - canvasW * 0.1,
                                yEnd: oy + r,
                                lineWidth: 1
                            },
                            hoverable: false
                        });
                        zr.addShape(line);

                        //画直径标识线
                        line = new Line({
                            style: {
                                xStart: ox - r - 5,
                                yStart: oy - 0.8 * r,
                                xEnd: ox - r - 5,
                                yEnd: oy + 0.8 * r,
                                lineWidth: 1
                            },
                            hoverable: false
                        });
                        zr.addShape(line);

                        //画直径标识线的上三角
                        var polygon = new Polygon({
                            style: {
                                pointList: [[ox - r - 5, oy - 0.8 * r - 10], [ox - r - 10, oy - 0.8 * r], [ox - r, oy - 0.8 * r]]
                            },
                            hoverable: false
                        });
                        zr.addShape(polygon);

                        //画直径标识线的下三角
                        polygon = new Polygon({
                            style: {
                                pointList: [[ox - r - 5, oy + 0.8 * r + 10], [ox - r - 10, oy + 0.8 * r], [ox - r, oy + 0.8 * r]]
                            },
                            hoverable: false
                        });
                        zr.addShape(polygon);

                        //画直径显示文本
                        var Text = require('zrender/shape/Text');
                        var text = new Text({
                            style: {
                                text: '管道\n直径\n' + pipesize + '米',
                                x: ox - r - canvasW * 0.1 - 20,
                                y: oy,
                                textFont: '14px Arial'
                            },
                            hoverable: false
                        });
                        zr.addShape(text);

                        var radium = pipesize / 2;//管道半径
                        var perMeterRate = r / radium;//每米对应的像素
                        var y = oy - (waterLevel - radium) * perMeterRate;//水位线的y坐标
                        //水位线起点x坐标
                        var x1 = ox - Math.sqrt(radium * radium - Math.pow(waterLevel - radium, 2)) * perMeterRate;
                        var x2 = 2 * ox - x1;//水位线终点x坐标

                        //红色水位线
                        line = new Line({
                            style: {
                                xStart: x1,
                                yStart: y,
                                xEnd: x2,
                                yEnd: y,
                                color: '#cc0000',
                                lineWidth: 1
                            },
                            hoverable: false,
                            zlevel: 200
                        });
                        zr.addShape(line);

                        //水位上标识线
                        line = new Line({
                            style: {
                                xStart: ox,
                                yStart: y,
                                xEnd: ox,
                                yEnd: (oy + r - y) * 0.5 / 2 + y,
                                color: '#cc0000',
                                lineWidth: 1
                            },
                            hoverable: false,
                            zlevel: 200
                        });
                        zr.addShape(line);

                        //水位下标识线
                        line = new Line({
                            style: {
                                xStart: ox,
                                yStart: oy + r,
                                xEnd: ox,
                                yEnd: oy + r - (oy + r - y) * 0.5 / 2,
                                color: '#cc0000',
                                lineWidth: 1
                            },
                            hoverable: false,
                            zlevel: 200
                        });
                        zr.addShape(line);

                        //水位线标识上三角
                        zr.addShape(new Polygon({
                            style: {
                                pointList: [[ox, (oy + r - y) * 0.5 / 2 + y + 5], [ox + 5, (oy + r - y) * 0.5 / 2 + y], [ox - 5, (oy + r - y) * 0.5 / 2 + y]],
                                color: '#cc0000'
                            },
                            hoverable: false,
                            zlevel: 200
                        }));

                        //水位线标识下三角
                        zr.addShape(new Polygon({
                            style: {
                                pointList: [[ox, oy + r - (oy + r - y) * 0.5 / 2 - 5], [ox + 5, oy + r - (oy + r - y) * 0.5 / 2], [ox - 5, oy + r - (oy + r - y) * 0.5 / 2]],
                                color: '#cc0000'
                            },
                            hoverable: false,
                            zlevel: 200
                        }));

                        //水位值文本
                        zr.addShape(new Text({
                            style: {
                                text: waterLevel + '米',
                                x: ox - 10,
                                y: (oy + r + y) / 2,
                                textFont: '12px Arial',
                                color: '#cc0000'
                            },
                            hoverable: false,
                            zlevel: 200
                        }));

                        var a = Math.asin((oy - y) / r);
                        a = a / (Math.PI / 180);
                        var b = 180 - a;

                        //画水位
                        zr.addShape(new Sector({
                            style: {
                                x: ox,
                                y: oy,
                                r: r,
                                startAngle: b,
                                endAngle: a,
                                color: '#7badf6'
                            },
                            hoverable: false
                        }));
                        zr.addShape(new Sector({
                            style: {
                                x: ox,
                                y: y,
                                r: (x2 - x1) / 2,
                                startAngle: waterLevel >= radium ? 180 : 0,
                                endAngle: waterLevel >= radium ? 0 : 180,
                                strokeColor: waterLevel >= radium ? '#7badf6' : 'white',
                                color: waterLevel >= radium ? '#7badf6' : 'white'
                            },
                            hoverable: false
                        }));

                        // 绘画
                        zr.render();
                    }
                );
            },
            //查询按钮点击事件
            clickSearchBtn: function () {
                var that = this;
                console.log(that.stcd);
                this.initChart(that.tm, that.panelHeight, that.stcd);
            }
        };

        var modal = {
            clickSearchBtn: $.proxy(Drainagedetail.clickSearchBtn, Drainagedetail)
        };

        Drainagedetail.init();
        return modal;
    });