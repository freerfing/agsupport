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
		var domMain = document.getElementById('zltj');

		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			color: ['#b171bf','#59559f','#72c096','#fec93f','#2796c4','#22c3f9'], 
			legend: {
				orient: 'horizontal',
				x: 'center',
				y: 35,
				icon: 'stack',
				data: ['天河区', '海珠区', '越秀区', '番禺区', '白云区', '黄埔区'],
				textStyle: {
					color: '#fff',
					fontSize: 14
				}
			},

			series: [{
				name: '管网分区统计',
				type: 'pie',
				center : ['50%', 200],
				radius: ['14%', '42%'],
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: "{b}:{c} \n ({d}%)",
							textStyle: {
								fontSize: 14,
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
								fontSize: '14',
								fontWeight: 'bold',
								color: '#fff'
							}
						}
					}
				},
				data: [{
						value: 335,
						name: '天河区',
						
					},
					{
						value: 310,
						name: '海珠区'
					},
					{
						value: 234,
						name: '越秀区'
					},{
						value: 335,
						name: '番禺区'
					},
					{
						value: 310,
						name: '白云区'
					},
					{
						value: 234,
						name: '黄埔区'
					}
				]
			}]
		};

		var myChart = echarts.init(domMain);
		window.onresize = myChart.onresize;
		myChart.setOption(option);

	}
);