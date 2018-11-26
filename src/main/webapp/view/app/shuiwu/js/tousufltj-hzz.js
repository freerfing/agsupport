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
		var domMain = document.getElementById('tousufltj-hzz');

		option = {
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
				orient: 'vertical',
				x: 'right',
				y: 40,
				data: ["工业废水排放", "养殖污染", "违法建设", "建筑废弃物", "工程维护", "排水设施", "农家乐", "堆场码头", "生活垃圾", "其他", "舆情"],
				textStyle: {
					color: '#fff',
					fontSize: '12'
				}
			},
			calculable: true,
			grid: {
				x: 30,
				y: 40,
				x2: 120,
				borderWidth: 0
			},
			xAxis: [{
				name: '',
				nameTextStyle: {
					color: '#fff',
					fontSize: '12'
				},
				type: 'category',
				show: false,
				data: [""],
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
				name: '（个数）',
				nameTextStyle: {
					color: '#fff'
				},
				show: true,
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
				name: "工业废水排放",
				type: 'bar',
				data: [35],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#148ee3',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}

					}
				}
			}, {
				name: "养殖污染",
				type: 'bar',
				data: [15],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#e49a52',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}, {
				name: "违法建设",
				type: 'bar',
				data: [20],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#c5bf21',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}, {
				name: "建筑废弃物",
				type: 'bar',
				data: [8],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#1ab69e',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}, {
				name: "工程维护",
				type: 'bar',
				data: [16],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#297dd3',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}, {
				name: "排水设施",
				type: 'bar',
				data: [17],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#dd7b1c',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}, {
				name: "农家乐",
				type: 'bar',
				data: [20],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#679ae0',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}, {
				name: "堆场码头",
				type: 'bar',
				data: [9],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#6edfd8',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}, {
				name: "生活垃圾",
				type: 'bar',
				data: [16],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#1cbcf1',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}, {
				name: "其他",
				type: 'bar',
				data: [9],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#d8e828',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}, {
				name: "舆情",
				type: 'bar',
				data: [34],
				itemStyle: {
					normal: {
						barWidth: '20',
						barBorderRadius: [5, 5, 0, 0],
						color: '#18a46e',
						label: {
							show: true,
							textStyle: {
								color: '#3eadef'
							}
						}
					}
				}
			}]
		};

		var myChart = echarts.init(domMain);
		window.onresize = myChart.onresize;
		myChart.setOption(option);

	}
);