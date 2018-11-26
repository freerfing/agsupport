require.config({
	paths: {
		echarts: 'js/echarts'
	}
});
require(
	[
		'echarts',
		'echarts/chart/line'
	],

	function(echarts) {
		var domMain = document.getElementById('gzts');

		var option = {
			legend: {
				data: ['投诉问题'],
				textStyle: {
					color: '#fff',
					fontSize: '12'
				}
			},
			grid :{
				borderWidth:0
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: ['2016/12', '2017/01', '2017/02', '2017/03'],
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
					lineStyle: {
						color: '#293e4b',
						width: '1'
					}
				}
			}],
			series: [{
					name: '投诉问题',
					type: 'line',
					stack: '总量',
					data: [17, 13, 18, 20],
					symbol:'circle',
					itemStyle: {
					normal: {
						color: '#3bae9c'
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