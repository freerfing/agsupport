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