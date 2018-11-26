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
		var domMain = document.getElementById('szhc');

		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'right',
				data: ['轻度黑臭占比', '严重黑臭占比','不黑不臭占比'],
				textStyle: {
					color: '#fff',
					fontSize: '12'
				}
			},
			
			series: [{
				type: 'pie',
				radius: ['32%', '52%'],
				center:['57%','70%'],
				itemStyle: {
					normal: {
						label: {
							show: false,
							formatter: '{c}'
						},
						labelLine: {
							show: false
						}
					},
					emphasis: {
						label: {
							show: false,
							position: 'center',
							textStyle: {
								fontSize: '12'
							}
						}
					}
				},
				data : (function(){
					           var arr=[];
					            $.ajax({
					                  type : "post",
					                  async : false, //同步执行
					                  url : "/awater/subject/getBlackSmellCount",
					                  dataType : "json", //返回数据形式为json
					                  success : function(result) {
					                   if (result) {
					                	   $('#hei11').html(result.list[0].caseWhen);
					                	   $('#hei12').html(result.list[1].caseWhen);
					                	   $('#hei13').html(result.list[2].caseWhen);
					                	   $('#hei21').html(result.list[0].coun);
					                	   $('#hei22').html(result.list[1].coun);
					                	   $('#hei23').html(result.list[2].coun);
					                	   for(var i=0;i<result.list.length;i++){
					                		   var caseWhen = result.list[i].caseWhen+"占比";
					                        	 var itemStyles="";
					                        	 
					                        	 if(caseWhen=='不黑不臭占比'){
					                        		 itemStyles="{normal: {color: '#4288e7'}}";
					                        	 }else if(caseWhen=='轻度黑臭占比'){
					                        		 itemStyles="{normal: {color: '#27da99'}}";
					                        	 }else{
					                        		 itemStyles="{normal: {color: '#f99f57'}}";
					                        	 }
					                        	 arr.push({
					                        		 name : caseWhen,
					                        		 value : result.list[i].coun,
					                        		 itemStyle: itemStyles
					                        	 });  
						                     }    
					                    }
					                  },
					                 })
					                  return arr;
					                })()
			}]
		};
		var myChart = echarts.init(domMain);
		window.onresize = myChart.onresize;
		myChart.setOption(option);

	}
);