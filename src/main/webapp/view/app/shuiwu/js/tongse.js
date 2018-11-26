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
		var domMain = document.getElementById('tousufltj');

		var option = {
			grid: {
				x:50,
				y: 40,
				x2:100,
				borderWidth:0
			},
			title: {
				show: 'true',
				text: '投诉分类统计',
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
				data: ['个数']
			},
			xAxis: [{
				type: 'category',
				data: ["工业废水排放","养殖污染","违法建设","建筑废弃物","工程维护","排水设施","农家乐","堆场码头","生活垃圾","其他",""],
				axisLabel: {
					show: false,
					rotate: 17,
					textStyle: {
						color: '#fff',
						fontSize: '40'
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
				name: '人口',
				type: 'bar',
				data: [35,15,20,8,16,17,20,9,16,9,34],
				barWidth: '20',
				itemStyle: {
					normal: {
						barBorderRadius: [20,20,0,0],
						color: '#24d2c7'
					},
					emphasis: {
						barBorderRadius: [20,20,0,0],
						color: '#8cf2ec'
					}
				}
			}]
		};

		var myChart = echarts.init(domMain);
		window.onresize = myChart.onresize;
		myChart.setOption(option);

	}
);