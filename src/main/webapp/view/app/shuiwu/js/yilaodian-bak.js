require.config({
	paths: {
		echarts: 'js/echarts'
	}
});
require(
	[
		'echarts',
		'echarts/chart/bar'
	],

	function(echarts) {
		var domMain = document.getElementById('yilaodian');

		var option = {
			grid: {
				x:30,
				y: 20,
				x2:10,
				y2:35,
				borderWidth:0
			},
			tooltip: {
				show: true
			},
			legend: {
				show: false,
				data: ['上报问题'],
			},
			xAxis: [{
				type: 'category',
				data: ['白云区', '海珠区', '黄埔区', '荔湾区', '天河区', '越秀区'],
				axisLabel: {
					show: true,
					textStyle: {
						color: '#fff',
						fontSize: '14'
					}
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#293e4b',
						width: '1'
					}
				},
				splitLine: {
					show: false
				}

			}],
			yAxis: [{
				type: 'value',
				name:'（个数）',
				nameTextStyle:{
					color: '#fff'
				},
				axisLabel: {
					textStyle: {
						color: '#fff',
						fontSize: '12'
					}
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#293e4b',
						width: '1'
					}
				},
				splitLine: {
					lineStyle: {
						color: '#293e4b',
						width: '1'
					}
				}
			}],

			series: [{
				name: "易涝点",
				type: 'bar',
				data: [17,2,20,2,24,7],
				barWidth: '30',
				itemStyle: {
					normal: {
						
	                    color: function(params) {
	                        // build a color map as your need.
	                        var colorList = [
	                          '#e8a917','#2a7acb','#86d32b','#e35f91','#da5f0e',
	                           '#a46cea'
	                        ];
	                        return colorList[params.dataIndex]
	                    },
						
						barBorderRadius: [5, 5, 0, 0]
					}
				}
			}]
		}

		var myChart = echarts.init(domMain);
		window.onresize = myChart.onresize;
		myChart.setOption(option);
	}
);