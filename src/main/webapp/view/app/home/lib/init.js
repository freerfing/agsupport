$(document).ready(function(){
    //水情-水库水位
    var sksw = echarts.init(document.getElementById('sq'), 'dark');
    var skswOption = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            text: "水库水位",
            subtext: "总共:{value|123} 超汛限:{value|3}",
            subtextStyle:{
                fontSize:15,
                rich:{
                    value:{
                        color:'red',
                        lineHeight: 10,
                        fontWeight:'bold'
                    }
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['金坑', '联安', '深港水库', '白灰田水库', '大井水库'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '水位',
                type: 'bar',
                barWidth: '40%',
                data: [68, 52, 200, 334, 390]
            }
        ]
    };
    sksw.setOption(skswOption);
    $("#sq").on("click",function(){
        window.location.href="sq/sq.html";
    });
    //易涝点

    var yldOption = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['积水', '上次最高水位', '历史最高水位', '警戒值'],
        },
        title: {
            text: "易涝点",
            subtext: "总共:{value|123} 超汛限:{value|3}",
            subtextStyle:{
                fontSize:15,
                rich:{
                    value:{
                        color:'red',
                        lineHeight: 10,
                        fontWeight:'bold'
                    }
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['荔湾区\n中山七路和安社区周边', '荔湾区\n恒海中街-如意坊新街-景华新街', '越秀区\n东华新永胜市场、大方巷'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '积水',
                type: 'bar',
                barWidth: '15%',
                data: [68, 52, 200]
            }, {
                name: '上次最高水位',
                type: 'bar',
                barWidth: '15%',
                data: [120, 33, 123]
            }, {
                name: '历史最高水位',
                type: 'bar',
                barWidth: '15%',
                data: [120, 33, 123]
            }, {
                name: '警戒值',
                type: 'bar',
                barWidth: '15%',
                data: [66, 66, 64]
            }
        ]
    };
    
    var yld = echarts.init(document.getElementById('yld'), 'dark');
    yld.setOption(yldOption);
    $("#yld").on("click",function(){
        window.location.href="yld/yld.html";
    });
    //水质
     //方案
     var fa = echarts.init(document.getElementById('sz'), 'dark');
     var faoption = {
         tooltip: {
             trigger: 'item',
             formatter: "{a} <br/>{b}: {c} ({d}%)"
         },
         title: {
             text: "2017 污水治理总进度",
             left: 'left'
         },
         legend: {
             orient: 'vertical',
             data: ['方案定制中', '处理中', '未启动', '治理完成'],
             x: 'left',
             y:'center'
         },
         series: [
             {
                 name: '污水治理',
                 type: 'pie',
                 radius: ['50%', '70%'],
                 avoidLabelOverlap: false,
                 label: {
                     normal: {
                         show: true,
                         position: 'inner'
                     },
                     emphasis: {
                         show: true,
                         textStyle: {
                             fontSize: '30',
                             fontWeight: 'bold'
                         }
                     }
                 },
                 labelLine: {
                     normal: {
                         show: false
                     }
                 },
                 data: [
                     { value: 335, name: '方案定制中' },
                     { value: 310, name: '处理中' },
                     { value: 234, name: '未启动' },
                     { value: 135, name: '治理完成' }
                 ]
             }
         ]
     };
     fa.setOption(faoption);
     $("#sz").on("click",function(){
        window.location.href="sz/sz.html";
    });
     //雨情
     var yq = echarts.init(document.getElementById('yq'),'dark');
     yqoption = {
             title: {
                 text: '雨情',
             },
             tooltip: {
                 trigger: 'axis'
             },
             toolbox: {
                 show: true,
                 feature: {
                     dataZoom: {
                         yAxisIndex: 'none'
                     },
                     dataView: {readOnly: false},
                     magicType: {type: ['line', 'bar']},
                     restore: {},
                     saveAsImage: {}
                 }
             },
             xAxis:  {
                 type: 'category',
                 boundaryGap: false,
                 data: ['三坑','金坑','简村齐岭桥','永和街测站','九和桥','荔联排涝站','派潭','派潭测站','莲溪','振兴村','活动陂','中洞']
             },
             yAxis: {
                 type: 'value',
                 axisLabel: {
                     formatter: '{value} mm'
                 }
             },
             series: [
                 {
                     name:'雨量',
                     type:'line',
                     data:[30.0, 30.0, 21.9, 17.5, 13.0, 9.9, 8.5, 5.5, 5.3, 4.0, 3.5, 3.5],
                     markPoint: {
                         data: [
                             {type: 'max', name: '最大值'},
                             {type: 'min', name: '最小值'}
                         ]
                     },
                     markLine: {
                         data: [
                             {type: 'average', name: '平均值'}
                         ]
                     }
                 }]
         };
     
     // 使用刚指定的配置项和数据显示图表。
     yq.setOption(yqoption);
     //河长制
     $("#yq").on("click",function(){
        window.location.href="yq/rainCondition.html";
    });
     var hzz = echarts.init(document.getElementById('hzz'),'dark');
     hzzoption = {
             title: {
                 text: '水质整治信息'
             },
             tooltip: {
                 trigger: 'item',
                 formatter: function(params, ticket, callback) {
                     var res = params.seriesName;
                     res += '<br/>' + params.name + ' : ' + params.percent + '%';
                     return res;
                 }
             },
             grid: {
                 bottom: 30
             },
             xAxis: [{
                 type: 'category',
                 axisLine: {
                     show: false
                 },
                 axisTick: {
                     show: false
                 },
                 axisLabel: {
                     interval: 0
                 },
                 data: ['优V类整治比例', '劣V类整治比例', '黑臭类整治比例']
             }],
             yAxis: [{
                 show: false
             }],
             series: [{
                 name: '优V类整治比例',
                 center: [
                     '25.0%',
                     '50%'
                 ],
                 radius: [
                     '40%',
                     '25%'
                 ],
                 type: 'pie',
                 labelLine: {
                     normal: {
                         show: false
                     }
                 },
                 data: [{
                     value: 63,
                     name: '整治比例',
                     label: {
                         normal: {
                             formatter: '{d} %',
                             position: 'center',
                             show: true,
                             textStyle: {
                                 fontSize: '16',
                                 fontWeight: 'bold',
                                 color: '#FF0000'
                             }
                         }
                     }
                 }, {
                     value: 37,
                     name: '',
                     tooltip: {
                         show: false
                     },
                     itemStyle: {
                         normal: {
                             color: '#aaa'
                         },
                         emphasis: {
                             color: '#aaa'
                         }
                     },
                     hoverAnimation: false
                 }]
             }, {
                 name: '劣V类整治比例',
                 center: [
                     '50.0%',
                     '50%'
                 ],
                 radius: [
                     '40%',
                     '25%'
                 ],
                 type: 'pie',
                 labelLine: {
                     normal: {
                         show: false
                     }
                 },
                 data: [{
                     value: 30,
                     name: '整治比例',
                     label: {
                         normal: {
                             formatter: '{d} %',
                             position: 'center',
                             show: true,
                             textStyle: {
                                 fontSize: '16',
                                 fontWeight: 'bold',
                                 color: '#FF0000'
                             }
                         }
                     }
                 }, {
                     value: 70,
                     name: '',
                     tooltip: {
                         show: false
                     },
                     itemStyle: {
                         normal: {
                             color: '#aaa'
                         },
                         emphasis: {
                             color: '#aaa'
                         }
                     },
                     hoverAnimation: false
                 }]
             }, {
                 name: '黑臭水体整治比例',
                 center: [
                     '75.0%',
                     '50%'
                 ],
                 radius: [
                     '40%',
                     '25%'
                 ],
                 type: 'pie',
                 labelLine: {
                     normal: {
                         show: false
                     }
                 },
                 data: [{
                     value: 10,
                     name: '整治比例',
                     label: {
                         normal: {
                             formatter: '{d} %',
                             position: 'center',
                             show: true,
                             textStyle: {
                                 fontSize: '16',
                                 fontWeight: 'bold',
                                 color: '#FF0000'
                             }
                         }
                     }
                 }, {
                     value: 90,
                     name: '',
                     tooltip: {
                         show: false
                     },
                     itemStyle: {
                         normal: {
                             color: '#aaa'
                         },
                         emphasis: {
                             color: '#aaa'
                         }
                     },
                     hoverAnimation: false
                 }]
             }]
         };
     // 使用刚指定的配置项和数据显示图表。
     hzz.setOption(hzzoption);
     $("#hzz").on("click",function(){
        window.location.href="hzz/hezhangzhi.html";
    });
    //管网
    var gw = echarts.init(document.getElementById('gw'),'dark');
    var gwoption = {
        color: ['#ffd285', '#ff733f', '#ec4863'],
    
        title: [{
            text: '排水管网'
        }],
        tooltip: {
            /*trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
            formatter: function(params) {
                //return params.seriesType
                //return params.name+':'+params.value
            }*/
        },
        legend: {
            x: '70%',
            top: '10%',
            textStyle: {
                color: '#ffd285',
            },
            data: ['雨水管网', '污水管网', '雨污合流管网','供水管网']
        },
        grid: {
            left: '10%',
            right: '35%',
            top: '16%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            "show": false,
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            "axisLine": {
                lineStyle: {
                    color: '#c0576d'
                }
            },
            "axisTick": {
                "show": false
            },
            axisLabel: {
                textStyle: {
                    color: '#ffd285'
                }
            },
            boundaryGap: true, //false时X轴从0开始
            data: ['白云区', '越秀区', '荔湾区', '海珠区', '天河区', '黄浦区']
        },
        yAxis: {
            "axisLine": {
                lineStyle: {
                    color: '#c0576d'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#c0576d'
                }
            },
            "axisTick": {
                "show": false
            },
            axisLabel: {
                textStyle: {
                    color: '#ffd285'
                }
            },
            type: 'value',
            name:'km'
        },
        series: [{
                name: '雨水管网',
                smooth: true,
                type: 'bar',
                symbolSize: 8,
                //symbol: 'circle',
                data: [800, 200, 300, 500, 1000, 250]
            }, {
                name: '污水管网',
                smooth: true,
                type: 'bar',
                symbolSize: 8,
                //symbol: 'circle',
                data: [2280, 100, 480, 300, 500, 260]
            }, {
                name: '雨污合流管网',
                smooth: true,
                type: 'bar',
                symbolSize: 8,
                //symbol: 'circle',
                data: [1000, 500, 460, 650, 700, 200]
            },{
                name: '供水管网',
                smooth: true,
                type: 'bar',
                symbolSize: 8,
                //symbol: 'circle',
                data: [2860, 680, 1009, 1205, 1866, 752]
            }, {
                type: 'pie',
                center: ['83%', '65%'],
                radius: ['35%', '30%'],
                name: '饼图',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                /* label: {
                         normal: {
                             textStyle: {
                                 color: '#ffd285',
                             },
                             formatter: "{b}: {c} ({d}%)"
                         }
                     },*/
                data: [{
                    value: 4201.541,
                    name: '污水管网'
                }, {
                    value: 2656.182,
                    name: '雨水管网'
                }, {
                    value: 3012.518,
                    name: '雨污合流管网'
                }, {
                    value: 5012.518,
                    name: '供水管网'
                }]
            }]
    };
    //使用刚指定的配置项和数据显示图表。
    gw.setOption(gwoption);
    hzz.setOption(hzzoption);
    $("#gw").on("click",function(){
       window.location.href="gw/drainagePipeNetwork.html";
   });
});