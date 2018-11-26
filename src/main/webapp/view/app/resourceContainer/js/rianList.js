var quanjv_stnm="";
var histTbleName="";

var searchStratT="";//开始时间
var searchEndT="";//结束时间范围
var timeDate="";//当前时间
var option1={};
var isParent = true;
var realDataChart;
$(function(){
        inputTime();
        histTbleName=$("#histTbleName").val();
        $('#tttt').tree({
            url: '/awater/subject/getZuiGaoTreeJson?histTbleName='+$("#histTbleName").val(),
            loadFilter: function(data){
        			return data[0];
            },
            formatter:function(node){
            	var text = node.text.split("&&");
                return text[0];
            },
           parentField: 'pid',
           onClick: function(node){
        	   initTab(); // 设置样式
        	   option1 = initOption();
        	   var text = node.text.split("&&");
           		if(node.pid!=-1){
           			realDataChart = echarts.init(document.getElementById('realDataChart'));
           			realDataChart.showLoading({
           		         text: "图表数据正在努力加载..."
           		     }); 
           			$("#realDataChart").show();
           			$("#syq").hide();
                    quanjv_stnm=text[0];
                    $("#stcds").val(text[1]);
                    $("#stnms").val(text[0]);
                    $("#searchTx1").textbox("setValue",quanjv_stnm);
                    $("#nameMingchengC").textbox("setValue",quanjv_stnm);
                    $("#nameMingcheng").textbox("setValue",quanjv_stnm);
                    $("#nameMingQYC").textbox("setValue",node.pid);
                    $("#nameMingQY").textbox("setValue",node.pid);
                    $("#searchTx0").textbox("setValue",node.pid);
                    inputTime();
                    showHistCharts();//显示历史数据
                    loadLineChart();//显示图标
                    isParent = false;
                }else{//如果不是选择对应的监测点，而是选择区域就默认 加入一些数据到标签,还需要将name框的内容去掉.
                    $("#nameMingQYC").textbox("setValue",text[0]);
                    $("#nameMingQY").textbox("setValue",text[0]);
                    $("#searchTx0").textbox("setValue",text[0]);
                    $("#nameMingchengC").textbox("setValue","");
                    $("#nameMingcheng").textbox("setValue","");
                    $("#searchTx1").textbox("setValue","");
                    $("#realDataChart").hide();
                    $("#syq").show();
                    inputTime();
                    //如果点击的是父节点.需要获取下面的全部水库库的名称进行查询数据
                    showHistCharts();//显示历史数据
                    showTableData();//展示区级下面的数据
                    isParent = true;
                }
           	},
            onLoadSuccess:function(node,data){
            	$("#realDataChart").hide();
	            $("#syq").show();
	             initTab();
	           	 option1 = initOption();//初始化option,多个和一个会冲突
	           	 $("#tttt li:eq(0)").find("div").addClass("tree-node-selected");   //设置第一个节点高亮   
	                var n = $("#tttt").tree("getSelected");   
	                if(n!=null){   
	                	 var text = n.text.split("&&");
	                     $("#tttt").tree("select",n.target);  
	                     $("#nameMingQYC").textbox("setValue",text[0]);
	                     $("#nameMingQY").textbox("setValue",text[0]);
	                     $("#searchTx0").textbox("setValue",text[0]);
	                     showHistCharts();//显示历史数据
	                     showTableData();
	                }   
           }
        });

		//隐藏
		$('#tt').tabs({
            border:true,
            onSelect:function(title){}
        });


    });

    function inputTime(){//默认时间设置
        $("#searchStrat").textbox("setValue",dqTimeformatter());
        $("#searchEnd").textbox("setValue",dqTimeformatter());
        $("#searchStrat").datebox();
    	$("#searchEnd").datebox();
        $('#searchStratPucture').datetimebox({    
            showSeconds:true  //显示时分秒的代码
       }); 
        $('#searchEndPucture').datetimebox({    
            showSeconds:true  
       }); 
        $("#searchEndPucture").textbox("setValue",dqTimeformatter());
        $("#searchStratPucture").textbox("setValue",dqTimeformatters());
    }

     //日期
    function myformatter(value){
        var date = new Date(value.time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+"  "+(hh<10?('0'+hh):hh)+":"+(mm<10?('0'+mm):mm)+":"+(ss<10?('0'+ss):ss);
    }
    //日期
    function dqTimeformatter(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+" "+(hh<10?('0'+hh):hh)+":"+(mm<10?('0'+mm):mm)+":"+(ss<10?('0'+ss):ss);
    }
    //日期
    function dqTimeformatters(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate()-1=='00'?'1':date.getDate()-1;
        var mm = date.getMinutes();
        var ss = date.getSeconds();
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+" 08:00:00";
    }

    function searchTxHist(){
      $("#publishDg1").empty();
      searchStratT=$("#searchStrat").val();
      searchEndT=$("#searchEnd").val();
      if((searchStratT==null || searchStratT.length==0) && (searchEndT==null || searchEndT.length==0)){
          timeDate=new Date();
          var y = timeDate.getFullYear();
          var m = timeDate.getMonth() + 1;
          var d = timeDate.getDate();
          timeDate=y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
      }else{
    	  timeDate='';
      }
     $("#publishDg1").datagrid({
           url : '/awater/subject/findHist',
           queryParams:{
                "stnm":$("#nameMingcheng").val(),
                "searchStrat":$("#searchStrat").val(),
                "searchEnd":$("#searchEnd").val(),
                "histTbleName":$("#histTbleName").val(),
                "addvcd":$("#nameMingQY").val()
            },
           pagination:true,
           loadMsg : '数据装载中......',
           rownumbers : false,// 行号
           singleSelect:true,
           idField:'id',
           columns : [ [
            {field:'stnm',title : '站名',width:'25%',align:'center'},
            {field :'tm',title : '时间',width:'25%',align:'center',formatter:myformatter},
            {field:'drp',title : '雨量（mm）',width:'25%',align:'center'},
            {field:'addvcd',title : '行政区域',width:'25%',align:'center'},
           ]],
            pageSize: 50,        //设置默认分页大小
            pageList: [10, 15, 20, 25, 30, 35, 40, 45, 50],   //设置分页大小
            onLoadSuccess: function (data) {
                if (data.total == 0) {
                    var body = $(this).data().datagrid.dc.body2;
                        body.find('table tbody').append('<tr><td width="100%" colspan=11 style="height: 20px; text-align: center;"><h5>暂无数据</h5></td></tr>');
                }
            },
       });
    }
    
    function initTab(){
        var width = $("#realDataChart").width();
        var height = $("#realDataChart").height();
        if(width==height){	    	
	    	width=$("#tt").width()-45;
	    	height = $("#tt").height()-95;  
	    }
        
        $("#realDataChart").css("width", width).css("height", height);
    }
    
    function searchTxReal(){
        $("#publishDg").datagrid({
            url : '/awater/subject/findList',
            queryParams:{
                "stnm":$("#searchTx1").val(),
                "histTbleName":$("#histTbleName").val(),
                "addvcd":$("#searchTx0").val()
            },
            pagination:true,
            loadMsg : '数据装载中......',
            rownumbers : false,// 行号
            singleSelect:true,
            idField:'id',
            columns : [ [
                {field:'stnm',title : '站名',width:'25%',align:'center'},
                {field :'tm',title : '时间',width:'25%',align:'center',formatter:myformatter},
                {field:'drp',title : '雨量(mm)',width:'25%',align:'center'},
                {field:'addvcd',title : '行政区域',width:'25%',align:'center'},
            ]],
            pageSize: 50,        //设置默认分页大小
            pageList: [10, 15, 20, 25, 30, 35, 40, 45, 50],   //设置分页大小
            onLoadSuccess: function (data) {
                if (data.total == 0) {
                    var body = $(this).data().datagrid.dc.body2;
                        body.find('table tbody').append('<tr><td width="100%" colspan=11 style="height: 20px; text-align: center;"><h5>暂无数据</h5></td></tr>');
                }
            },
        });
        if($("#searchTx1").val()!=null && $("#searchTx1").val().length!=0){
            quanjv_stnm=$("#searchTx1").val();
            $("#realDataChart").empty();
           showHistCharts(quanjv_stnm);
        }
    }

        function initOption(){
        	var option = {
        			title : {top:5,text : '',subtext:''},
        			tooltip : {trigger : 'axis',
        				formatter: function(params){
        					var f = "";
        					f += params[0].name + "</br>";
        					for( a in params ) {
        						f += params[a].seriesName + "：" +params[a].data.value[1];
        						f += "</br>";
        					}
        					return f;
        				},axisPointer : {type : 'line'}},
        				color:["#3b1b83","#c205ae","#0404fc","#10fc04","#117506","#fc0533","#f9fc09","#41f9d9","#fc9809","#5e362a"],
        				legend : {orient:'vertical',left:'right',top:3,height:60,itemWidth:20,itemHeight:12,data : []},
        				grid : {left : '10px',right : '0px',bottom : '0px',width:'92%',height:'90%',containLabel : true,show : true,backgroundColor : 'rgb(255,255,255)'},
        		        xAxis: {type: 'time',splitLine: {show: true}},
        				yAxis: {type: 'value',boundaryGap: [0, '100%'],splitNumber:10,splitLine: {show: true},inverse: false,
	    					axisLabel: {
    		                    formatter:function (value, index){
       		                     return value.toFixed(2);
       		                }}},
						series: [
						         {name: '',type: 'line',showSymbol: false,smooth:true,areaStyle: {
						        	 normal: {
						        		 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						        			 offset: 0,
						        			 color: '#3c78d8'
						        		 }, {
						        			 offset: 1,
						        			 color: '#a4c2f4'
						        		 }])
						        	 }
						       },hoverAnimation: false,data: []}
					]
        	};
        	return option;
        }
        function getDatas(item){
        	return {
        		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
        		value : [
        		         Date.parse(new Date(item.tmData)),(Math.floor((item.drp)*100)/100)
        		        ]
        	}
        }

     function showHistCharts(){
        searchStratT=$("#searchStrat").val();
        searchEndT=$("#searchEnd").val();
        if((searchStratT==null || searchStratT.length==0) && (searchEndT==null || searchEndT.length==0)){
            timeDate=new Date();
            var y = timeDate.getFullYear();
            var m = timeDate.getMonth() + 1;
            var d = timeDate.getDate();
            timeDate=y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
        }else{
            timeDate='';
        }
        $("#publishDg1").empty();
        $("#publishDg1").datagrid({
            url : '/awater/subject/findHist?stnm='+$("#nameMingcheng").val()+'&histTbleName='+$("#histTbleName").val()+'&searchStrat='+searchStratT+'&searchEnd='+searchEndT+'&timeDate='+timeDate+'&addvcd='+$("#nameMingQY").val(),
            pagination:true,
            loadMsg : '数据装载中......',
            rownumbers : false,// 行号
            singleSelect:true,
            idField:'id',
            columns : [ [
                {field:'stnm',title : '站名',width:'25%',align:'center'},
                {field :'tm',title : '时间',width:'25%',align:'center',formatter:myformatter},
                {field:'drp',title : '雨量(mm)',width:'25%',align:'center'},
                {field:'addvcd',title : '行政区域',width:'25%',align:'center'},
            ]],
            pageSize: 50,        //设置默认分页大小
            pageList: [10, 15, 20, 25, 30, 35, 40, 45, 50],   //设置分页大小
            onLoadSuccess: function (data) {
              if (data.total == 0) {
                  var body = $(this).data().datagrid.dc.body2;
                      body.find('table tbody').append('<tr><td width="100%" colspan=11 style="height: 20px; text-align: center;"><h5>暂无数据</h5></td></tr>');
              }
            },
        });
     }
     function loadLineChart(){
    	 realDataChart = echarts.init(document.getElementById('realDataChart'));
		 realDataChart.showLoading({
		     text: "图表数据正在努力加载..."
		 });
    	 var tm_s = $("#searchStratPucture").val();
    	 var tm_e = $("#searchEndPucture").val();
    	 var stnm = $("#stnms").val();
    	 var stcd = $("#stcds").val();
    	 $.ajax({
    		 url : "/awater/subject/queryRainfallOneTimes",
     		data:{ 
     			  "stcd":stcd,
     			  "searchStrat":tm_s,
	              "searchEnd":tm_e
     			 },
     		type : "post",
     		dataType : "json",
     		success : function (result) {
                var tempSum=0;
                var content = result.content==undefined?[]:result.content;
                var dateArr=getHourAll(tm_s,tm_e);  
                var xData = [], yData = [],ySumData=[]; //xData:时间, yData:一小时降雨量
                xData=dateArr;
                yData=new Array(dateArr.length);
                ySumData=new Array(dateArr.length);
                if (result) {
                    tempSum=0;
                    for (var i = 0; i < dateArr.length; i++) {
                        yData[i]=0;
                        for (var j = 0; j < content.length; j++) {
                        	 if(dateArr[i]==content[j].tm){
                                 yData[i]=content[j].drp;
							 }
                        }
                        tempSum+=yData[i];      
                        yData[i]=parseFloat(yData[i]).toFixed(2);                      
                        ySumData[i]=parseFloat(tempSum).toFixed(2);//tempSum;
                    }
                }

                //一小时降雨图表

                var myChart = echarts.init(document.getElementById('realDataChart'));
                    // 绑定事件
                    // 点击自定义legend图标
                var option={
                    color: ['#5E5EFF','#FF0000'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                        //formatter: '{b}<br/>{a}：{c}(mm)<br/>{a}：{c1}(mm)'
                    },                   
                    legend: {
                        orient: 'horizontal', // 'vertical'
                        x: 'left', // 'center' | 'left' | {number},
                        y: 'top', // 'center' | 'bottom' | {number}
                        data: ['降雨量','累计雨量'],
                        show: true
                    },
                    dataZoom : {//实现缩放功能  
                        type:'slider',     
                        show : true, 
                        showDetail:false,
                        start : 10,        
                        end : 100 ,
                        filterMode:'empty'//不过滤数据，只改变数轴范围
                    }, 
                    title: {
                        text: '时段降雨量',
                        left: 'center'
                    },
                    grid: {
                        right: 70,
                        left: 60
                    },
                    xAxis: {
                        data: xData,
                        boundaryGap: false
                    },
                    yAxis: [
                        {
                            type: 'value', 
                            name: '降雨量(mm)',
                            nameLocation: 'middle',
                            nameGap: '25',
                            scale: true,//脱离0值比例，放大聚焦到最终_min，_max区间
                            axisLabel: {                   
                                formatter: function (value, index) {  
                                	console.log(value);
                                    return value.toFixed(2);      
                                }                
                            }
                        },
                        {
                            type: 'value',
                            name: '累计雨量(mm)',
                            nameLocation: 'middle',
                            nameGap: '25',
                            min: 0,   
                            scale: true,//脱离0值比例，放大聚焦到最终_min，_max区间
                            splitLine : {  
                                show: false  
                            },
                            axisLabel: {                   
                                formatter: function (value, index) {           
                                    return value.toFixed(2);      
                                }                
                            } 

                        }
                    ],
                    series: [
                    {
                        name: '降雨量',
                        type: 'bar',
                        yAxisIndex:0,
                        data: yData                    
                    },{
                        name: '累计雨量',
                        type: 'line',
                        showSymbol:false,
                        symbolSize: [0,0],
                        lineStyle:{
                            normal:{            
                                width:1                                       
                            },
                        },
                        yAxisIndex:1,
                        data: ySumData,
                        smooth:true
                    }]
                }
                myChart.setOption(option);
                myChart.on("legendselectchanged",function(params){ 
                    var target = params.name;  // 获取当前被点击的标签                    
                    if(target=='降雨量'){
                        if(params.selected[target]){                            
                            option.yAxis[0].name='降雨量(mm)';
                        }else{                           
                            option.yAxis[0].name='';
                        }
                    }
                    if(target=='累计雨量'){
                        if(params.selected[target]){                          
                            option.yAxis[1].name='累计雨量(mm)';
                        }else{                            
                            option.yAxis[1].name='';
                        }
                    }
                    myChart.setOption(option);
                });

            }
    	 })
     }
     function getHourAll(begin,end){
         var that=this;
         var dateAllArr = new Array();
         var db =Date.parse(begin.replace(/-/g,'/'));   
         var de =Date.parse(end.replace(/-/g,'/'));
         for(var k=db;k<=de;){
             //dateAllArr.push(that.formatDate(new Date(parseInt(k)),'yy/MM/dd hh时'));
             dateAllArr.push(formatDate(new Date(parseInt(k)),'yyyy-MM-dd hh:mm:ss'));
             k=k+60*60*1000;
         }
         return dateAllArr;
     }
     function formatDate(date, fmt){
         var o = {
                 "M+": date.getMonth() + 1, //月份
                 "d+": date.getDate(), //日
                 "h+": date.getHours(), //小时
                 "m+": date.getMinutes(), //分
                 "s+": date.getSeconds(), //秒
                 "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                 "S": date.getMilliseconds() //毫秒
             };
             if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
             for (var k in o)
                 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
             return fmt;
         }
     function showTableData(){
    	 $("#hechong tr").remove();
    	 $.ajax({
     		url : "/awater/subject/getCharQM",
     		data:{ 
 	    		   "searchStrat":$("#searchStratPucture").val(),
 	               "searchEnd":$("#searchEndPucture").val(),
 	               "histTbleName":$("#histTbleName").val(),
 	               "addvcd":$("#nameMingQYC").val()
     			 },
     		type : "post",
     		dataType : "json",
     		success : function (res) {
     			var pptnTr="";
     			//获取到区级下满所有的水库.然后再去查询数据
     			for (var i = 0; i < res.length; i++) {
     				$("#hechongCount").html("总共<b>"+res.length+"</b>条数据");
     				var stnm = res[i].stnm;
 					var sumDate = sumData(res[i]);
 					if(i%2==0){
 						pptnTr =" <tr><td>"+stnm+"</td><td>"+toDecimal2(sumDate,2)+"</td>";
 						if(i==res.length-1){
 							$("#hechong").append(pptnTr);
 						}
	 				}else{
	 					pptnTr = pptnTr+"<td>"+stnm+"</td><td>"+toDecimal2(sumDate,2)+"</td><tr>";
	 					$("#hechong").append(pptnTr);
	 					pptnTr="";
	 				}
 				}
     		},
     	error : function (XHR, error, errorThrown) {
     		layer.msg("请求雨晴数据错误！" + error)
     	}
     	})
     }
     function sumData(data){
		 var dataList = data.dataList;
    	 var sumData=0;
    	 for (var i = 0; i < dataList.length; i++) {
    		 sumData =sumData+dataList[i].drp;
		 }
    	 return sumData;
     }
     function search(){
    	 if(!isParent){
    		 loadLineChart();
    	 }else{
    		 showTableData();
    	 }
     }
     function toDecimal2(x,point) {   
    	    var f = parseFloat(x);    
    	    if (isNaN(f)) {    
    	        return false;    
    	    }    
    	    var f = Math.round(x*100)/100;    
    	    var s = f.toString();    
    	    var rs = s.indexOf('.');    
    	    if (rs < 0) {    
    	        rs = s.length;    
    	        s += '.';    
    	    }    
    	    while (s.length <= rs + point) {    
    	        s += '0';    
    	    }    
    	    return s;    
    	} 