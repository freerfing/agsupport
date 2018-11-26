
    //方案
    var fa = echarts.init(document.getElementById('fa'), 'dark');
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
    //黑臭水体
    var hcstOption = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            text: "黑臭水体水质监测",
            subtext: "超汛限:3,总共:60"
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: ['透明度(cm)', '溶解氧(mg/L)', '氧化还原电位(mV)', '氨氮(mg/L)'],
        },
        xAxis: [
            {
                type: 'category',
                data: [{value:'荔湾区，中山七路和安社区周边\n水质:{level|劣V}\n进度:{state|治理中}',textStyle:{rich:{
                    state:{},
                    level:{color:'red',fontSize:14}
                }}}, {value:'荔湾区，恒海中街-如意坊新街-景华新街\n水质:{level|劣V}\n进度:{state|治理中}',textStyle:{rich:{
                    state:{},
                    level:{color:'red',fontSize:14},
                }}}, {value:'越秀区，东华新永胜市场、大方巷\n水质:{level|劣V}\n进度:{state|治理中}',textStyle:{rich:{
                    state:{},
                    level:{color:'red',fontSize:14},
                }}}],
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
                name: '透明度(cm)',
                type: 'bar',
                barWidth: '15%',
                data: [68, 52, 200]
            }, {
                name: '溶解氧(mg/L)',
                type: 'bar',
                barWidth: '15%',
                data: [120, 33, 123]
            }, {
                name: '氧化还原电位(mV)',
                type: 'bar',
                barWidth: '15%',
                data: [-120, -33, -123]
            }, {
                name: '氨氮(mg/L)',
                type: 'bar',
                barWidth: '15%',
                data: [66, 66, 64]
            }
        ]
    };

    var qtst = echarts.init(document.getElementById('qtst'), 'dark');
    qtst.setOption(hcstOption);

     //其他水体
     var qtstOption = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            text: "黑臭水体水质监测",
            subtext: "超汛限:3,总共:60"
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: ['PH值', 'BOD', 'COD', '氨氮(mg/L)'],
        },
        xAxis: [
            {
                type: 'category',
                data: [{value:'荔湾区，中山七路和安社区周边\n水质:{level|劣V}\n进度:{state|治理中}',textStyle:{rich:{
                    state:{},
                    level:{color:'red',fontSize:14},
                }}},
                 {value:'荔湾区，恒海中街-如意坊新街-景华新街\n水质:{level|劣IV}\n进度:{state|未处理}',textStyle:{rich:{state:{},level:{color:'#9ea133',fontSize:14}}}}, 
                 {value:'越秀区，东华新永胜市场、大方巷\n水质:{level|劣IV}\n进度:{state|未处理}',textStyle:{rich:{state:{},level:{color:'#9ea133',fontSize:14}}}}],
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
                name: 'PH值透明度',
                type: 'bar',
                barWidth: '15%',
                data: [68, 2, 20]
            }, {
                name: '溶解氧',
                type: 'bar',
                barWidth: '15%',
                data: [120, 33, 12]
            }, {
                name: '氧化还原电位',
                type: 'bar',
                barWidth: '15%',
                data: [20, 3, 13]
            }, {
                name: '氨氮',
                type: 'bar',
                barWidth: '15%',
                data: [16, 66, 64]
            }
        ]
    };

    var qtst = echarts.init(document.getElementById('hcst'), 'dark');
    qtst.setOption(qtstOption);

