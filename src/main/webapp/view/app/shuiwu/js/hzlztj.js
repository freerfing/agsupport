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
		var domMain = document.getElementById('hzlztj');

		var option = {
			grid: {
				x: 35,
				y: 40,
				x2:30,
				y2:30,
				borderWidth:0
			},
			tooltip: {
				show: true
			},
			legend: {
				data: ['上报问题','落实问题总数'],
				textStyle: {
					color: '#fff',
					fontSize: '12'
				}
			},
			xAxis: [{
				type: 'category',
				data: ['天河区', '海珠区', '越秀区', '番禺区', '白云区', '黄埔区'],
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
				name:'(个数)',
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
				name: '上报问题',
				type: 'bar',
				data: [72,36,36,90,58,56],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5,5,0,0],
						color: '#e8a917',
						label: {
							show: true,
							position: 'top',
							textStyle: {
								color: '#fff'
							}
						}
					}
				}
			},
			{
				name: '落实问题总数',
				type: 'bar',
				data: [50,30,18,78,43,38],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5,5,0,0],
						color: '#679ae0',
						label: {
							show: true,
							position: 'top',
							textStyle: {
								color: '#fff'
							}
						}
					}
				}
			}
			]
		};

		var myChart = echarts.init(domMain);
		window.onresize = myChart.onresize;
		myChart.setOption(option);

	}
);