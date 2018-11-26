define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts3_6_2"],
			function ($, app, composition, ko, common, http, panal, pager, echarts) {
		var isMapLocClick = false;//定位图标点击状态
		var isListItemClick = false;//列表项点击状态
		var prevGraphic;//被点击的定位图标对应的graphic
		var graphicsLayerPoint;//地图定位点图层
		var infoWindowHideHandler;
		var infoListMap = {}; //房屋编码和人员信息键值对
        var myChart = null;
		var List = {
			init: function() {
				var that = this;
				composition.addBindingHandler("homeInitHandler", {
					init: function(dom) {
                        var panalObj = panal.getPanalByElement(dom);
                        var sbsj = panalObj.param.sbsj;
                        var zm = panalObj.param.zm;
						that.renderUI();
						that.bindUI(sbsj,zm);
					},
					update: function() {}
				});
			},
			renderUI: function() {
			},
			bindUI: function(sbsj,zm) {
                var that = this;
                that.drawBaseMap(sbsj,zm);
				// $.ajax({
				// 	url:  auGurit.global.rootPath + '/student/listinfo',
				// 	type: 'post',
				// 	data: {},
				// 	dataType: 'json',
				// 	success: function (ajaxResult) {
				// 		debugger;
				// 		userList = JSON.parse(ajaxResult.result);
				// 		//初始化系统用户名称
				// 	}
				// });
				// var h = http.getInstance("/student/listinfo", {
				// 	type: "post"
				// });
				// h.ajax({
				// 	code: "1"
				// }).then(function(result) {
				// 	var data = result;
				// });
			},
            drawBaseMap: function(sbsj,zm) {
                var axisData = [];
                var waterLineData = [];
                var rainNumData = [];
                var jjsw;
                var zcsw;
                var xxsw;
                var h=http.getInstance("subject/queryReservoirPeriod",{type:"post"});
                h.ajax({zm:zm}).then(function(result){
                    if(result) {
                        jjsw = result[0].jjsw;
                        zcsw = result[0].zcsw;
                        xxsw = result[0].xxsw;
                        var markLineData = [];
                        if(jjsw){
                            markLineData.push({
                                yAxis:jjsw,
                                name: '警戒水位',
                                lineStyle:{
                                    normal:{
                                        color:'#FFA500'
                                    }
                                }
                            });
                        }
                        if(zcsw){
                            markLineData.push({
                                yAxis:zcsw,
                                name: '正常水位',
                                lineStyle:{
                                    normal:{
                                        color:'#40E0D0'
                                    }
                                }
                            });
                        };
                        /*if(xxsw){
                            markLineData.push({
                                yAxis:xxsw,
                                name: '汛限水位',
                                lineStyle:{
                                    normal:{
                                        color:'#FF0000'
                                    }
                                }
                            });
                        }*/
                        var maxDrp = result[0].drp;//最大降雨量
                        var maxSw = result[0].sw; //最大水位
                        for (var i = 0; i < result.length; i++) {
                            axisData.push(result[i].sbsj);
                            waterLineData.push(result[i].sw);
                            rainNumData.push(result[i].drp);
                            if (maxDrp <result[i].drp) {
                                maxDrp = result[i].drp;
                            }
                            if (maxSw <result[i].sw) {
                                maxSw = result[i].sw;
                            }
                        }
                        option = {
                            title : {
                                text: '降雨量-水库水位关系图',
                                subtext:"2017年7月11日7时 到 2017年7月29日23时",
                                x: 'center',
                                top:15
                            },
                            grid: {
                                top:'18%',
                                bottom: 80,
                                left:'12%',
                                right:'19%'
                            },
                            /*toolbox: {
                                feature: {
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    },
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },*/
                            tooltip : {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    animation: false,
                                    label: {
                                        backgroundColor: '#505765'
                                    }
                                }
                            },
                            legend: {
                                x:'left',
                                data:['降雨量','水库水位']
                            },
                            dataZoom: [
                                {
                                    show: true,
                                    realtime: true,
                                    start: 0,
                                    end: 100
                                },
                                {
                                    type: 'inside',
                                    realtime: true,
                                    start: 0,
                                    end: 100
                                }
                            ],
                            xAxis : [
                                {
                                    type : 'category',
                                    axisLine: {onZero: false},
                                    data : axisData.map(function (str) {
                                            return str.replace(' ', '\n')
                                        })
                                }
                            ],
                            yAxis: [
                                {
                                    name: '降雨量(mm)',
                                    nameLocation: 'start',
                                    min:0,
                                    max: maxDrp * 2,
                                    type: 'value',
                                    inverse: true
                                },
                                {
                                    name: '水库水位(m)',
                                    type: 'value',
                                    max: maxSw * 2
                                }

                            ],
                            series: [

                                {
                                    name:'降雨量',
                                    type:'bar',
                                    animation: false,
                                    itemStyle : {
                                        normal : {
                                            color: function(value) {
                                                if(value >=1.0 && value<4.0){
                                                    return "#0000ff";
                                                }else if(value>=4.0 && value<16.0){
                                                    return "yellow"
                                                }else if(value>=16.0 && value < 50.0){
                                                    return "orange"
                                                } else if(value>=50.0){
                                                    return "red"
                                                }else{
                                                    return "#87CEFA";
                                                }
                                            }
                                        }
                                    },
                                    data: rainNumData
                                },
                                {
                                    name:'水库水位',
                                    type:'line',
                                    yAxisIndex:1,
                                    animation: false,
                                    itemStyle : {
                                        normal : {
                                            color:'#00BFFF',
                                            lineStyle: {
                                                normal: {
                                                    color:'#00BFFF',
                                                    width: 1
                                                }
                                            }
                                        }
                                    },
                                    markLine: {
                                        data:markLineData,
                                        label:{
                                            normal:{
                                                formatter:function(param){
                                                    return param.name+":"+param.value;
                                                }
                                            }
                                        }
                                    },
                                    data:waterLineData
                                }
                            ]
                        };

                        var myChart = echarts.init(document.getElementById('main'));
                        myChart.setOption(option);

                        setTimeout(function (){
                            window.onresize = function () {
                                myChart.resize();
                            }
                        },200)

                    }
                });
            }
		}

		var modal = {
		};

		List.init();
		return modal;
	});