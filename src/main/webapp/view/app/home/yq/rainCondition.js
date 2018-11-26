//1 水质整治信息 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('rainCondition'),'dark');
option = {
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
myChart.setOption(option);