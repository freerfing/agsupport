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
		var domMain = document.getElementById('xzqtj');

		var option = {
			grid: {
				x: 50,
				y: 40,
				x2: 20,
				y2: 30,
				borderWidth: 0
			},
			tooltip: {
				show: true
			},
			legend: {
				data: ['天河区', '海珠区', '越秀区', '番禺区', '白云区', '黄埔区'],
				textStyle: {
					color: '#fff',
					fontSize: '12'
				}
			},
			xAxis: [{
				type: 'category',
				data: ['雨水管道', '雨水沟渠', '污水管道', '污水沟渠', '雨污合流管道', '雨污合流沟渠'],
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
			yAxis: [{
				type: 'value',
				name: '个数',
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
					name: '天河区',
					type: 'bar',
					barGap:'30%',
					barCategoryGap :'20%',
					data: [789.95,179,26,622.91,24.37,504.59,266.98],
					itemStyle: {
					normal: {
						barBorderRadius: [5, 5, 0, 0]
					}
					}
				},
				{
					name: '海珠区',
					type: 'bar',
					barGap:'30%',
					barCategoryGap :'20%',
					data: [504.59,32.26,470.32,6.30,716.95],
					itemStyle: {
					normal: {
						barBorderRadius: [5, 5, 0, 0]
					}
					}
				},
				{
					name: '越秀区',
					type: 'bar',
					barGap:'30%',
					barCategoryGap :'20%',
					data: [609.89,248.13,1171.82,1044.53,523.44,482.81],
					itemStyle: {
					normal: {
						barBorderRadius: [5, 5, 0, 0]
					}
					}
				},
				{
					name: '番禺区',
					type: 'bar',
					barGap:'30%',
					barCategoryGap :'20%',
					data: [362.69,59.68,403.29,8.78,439.99,35.10],
					itemStyle: {
					normal: {
						barBorderRadius: [5, 5, 0, 0]
					}
					}
				},
				{
					name: '白云区',
					type: 'bar',
					barGap:'30%',
					barCategoryGap :'20%',
					data: [262.35,21.43,189,01,5.65,382.16,56.84],
					itemStyle: {
					normal: {
						barBorderRadius: [5, 5, 0, 0]
					}
					}
				},
				{
					name: '黄埔区',
					type: 'bar',
					barGap:'30%',
					barCategoryGap :'20%',
					data: [281.29,81.49,246.24,141.59,135.29],
					itemStyle: {
					normal: {
						barBorderRadius: [5, 5, 0, 0]
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