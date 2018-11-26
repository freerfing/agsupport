//1 水质整治信息 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('waterQualityInformation'),'dark');
option = {
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
myChart.setOption(option);
//2 公众投诉 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('publicAdvice'),'dark');
var option1 = {
	    title: {
	        text: '公众投诉建议',
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['投诉问题','问题反馈']
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
	        data: ['2016/12','2017/01','2017/02','2017/03']
	    },
	    yAxis: {
	        type: 'value',
	    },
	    series: [
	        {
	            name:'投诉问题',
	            type:'line',
	            data:[15, 10, 17, 19],
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
	        },
	        {
	            name:'问题反馈',
	            type:'line',
	            data:[3,5,4,7],
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'},
	                    [{
	                        symbol: 'none',
	                        x: '90%',
	                        yAxis: 'max'
	                    }, {
	                        symbol: 'circle',
	                        label: {
	                            normal: {
	                                position: 'start',
	                                formatter: '最大值'
	                            }
	                        },
	                        type: 'max',
	                        name: '最高点'
	                    }]
	                ]
	            }
	        }
	    ]
	};
//使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);
//3 公众投诉 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('fenquKaohe'),'dark');
option2 = {
	    color: ['#3398DB'],
	    title: {
	        text: '分区考核统计',
	        textStyle: {
	            color: '#00FF00'
	        }
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['白云区', '越秀区', '荔湾区', '海珠区', '天河区', '黄浦区'],
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name : '(%)'
	        }
	    ],
	    series : [
	        {
	            name:'考核统计',
	            type:'bar',
	            barWidth: '60%',
	            data:[78, 82, 92, 64, 44, 72]
	        }
	    ]
	};
//使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);















