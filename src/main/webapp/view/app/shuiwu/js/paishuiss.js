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
		var domMain = document.getElementById('paishuiss');

		var option = {
			grid: {
				x:50,
				y: 40,
				x2:10,
				y2:30,
				borderWidth:0
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data: ['雨水管网', '污水管网', '雨污河流'],
				textStyle: {
					color: '#fff',
					fontSize: '12'
				}
			},
			
			yAxis: [{
				type: 'value',
				name:'km',
				nameTextStyle:{
					color: '#fff'
				},
				textStyle: {
						color: '#fff',
						fontSize: '12'
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
			xAxis: [{
				type: 'category',
				data: ['天河区', '海珠区', '越秀区', '番禺区', '白云区', '黄埔区'],
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
					show: false
				}
			}],
			series: [{
					name: '雨水管网',
					type: 'bar',
					barWidth: '30',
					stack: '总量',
					itemStyle: {
						normal: {
							color: '#4ab5f7',
							label: {
								show: true,
								position: 'insideRight'
							}
						}
					},
					data: [320, 302, 301, 334, 390, 330]
				},
				{
					name: '污水管网',
					type: 'bar',
					stack: '总量',
					itemStyle: {
						normal: {
							color: '#d5bc2f',
							label: {
								show: true,
								position: 'insideRight'
							}
						}
					},
					data: [120, 132, 101, 134, 90, 230]
				},
				{
					name: '雨污河流',
					type: 'bar',
					stack: '总量',
					itemStyle: {
						normal: {
							color: '#25c592',
							label: {
								show: true,
								position: 'insideRight'
							}
						}
					},
					data: [220, 182, 191, 234, 290, 330]
				}
			]
		};

		var myChart = echarts.init(domMain);
		window.onresize = myChart.onresize;
		myChart.setOption(option);

	}
);