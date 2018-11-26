require.config({
	paths: {
		echarts: 'js/echarts'
	}
});
require(
	[
		'echarts',
		'echarts/chart/pie'
	],

	function(echarts) {
		var domMain = document.getElementById('gwzcd');

		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			color: ['#00e6a8','#e79700','#fc83dc'],
			legend: {
				orient: 'vertical',
				x: 540,
				y: 50,
				data: ['雨水管网', '雨污合流管网', '污水管网'],
				textStyle: {
					color: '#fff',
					fontSize: 16,
				}
			},

			series: [{
				name: '管网',
				type: 'pie',
				center : ['38%', 150],
				radius: ['40%', '60%'],
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: '{c}',
							textStyle: {
								fontSize: 16,
								color: '#fff'
							}
						},
						labelLine: {
							show: true,
							lineStyle: {
								color: '#fff'
							}
						}
					},
					emphasis: {
						label: {
							show: true,
							position: 'center',
							textStyle: {
								fontSize: 18,
								fontWeight: '400',
								color: '#fff'
							}
						}
					}
				},
				data: [{
						value: 2656.182,
						name: '雨水管网'
					},
					{
						value: 3012.518,
						name: '雨污合流管网'
					},
					{
						value: 4201.541,
						name: '污水管网'
					}
				]
			}]
		};

		var myChart = echarts.init(domMain);
		window.onresize = myChart.onresize;
		myChart.setOption(option);

	}
);