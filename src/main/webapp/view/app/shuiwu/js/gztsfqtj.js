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
		var domMain = document.getElementById('gztsfqtj');

		var option = {
			grid: {
				x:35,
				y: 80,
				x2:10,
				y2:30,
				borderWidth:0
			},
			title: {
				show: 'true',
				text: '2017年1月~11月投诉分区统计',
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
				data: ['上报问题'],
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
				name: "上报问题",
				type: 'bar',
				data: [35,15,20,8,16,17],
				barWidth: '30',
				itemStyle: {
					normal: {
						label: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						},
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