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
		var domMain = document.getElementById('mdtj');

		var option = {
			grid: {
				x:35,
				y: 50,
				x2:10,
				y2:30,
				borderWidth:0
			},
			title: {
				show: 'true',
				text: '管网分区统计（密度）',
				x: 'center',
				y: '10',
				textStyle: {
					color: '#fff',
					fontSize: '16'
				}
			},
			tooltip: {
				show: true
			},
			legend: {
				show: false,
				data: ['管网长度'],
			},
			xAxis: [{
				type: 'category',
				data: ['天河区', '海珠区', '白云区', '荔湾区', '越秀区', '黄埔区'],
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
				name:'（km/km²）',
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
				name: "管网长度",
				type: 'bar',
				data: [16.35,19.49,6.11,19.61,25.91,8.68],
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