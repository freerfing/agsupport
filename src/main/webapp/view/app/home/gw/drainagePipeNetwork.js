//1 水质整治信息 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('paishuiguanwang'),'dark');
var option = {
    color: ['#ffd285', '#ff733f', '#ec4863'],

    title: [{
        text: '排水管网',
        textStyle: {
            color: '#ffd285'
        }
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
myChart.setOption(option);