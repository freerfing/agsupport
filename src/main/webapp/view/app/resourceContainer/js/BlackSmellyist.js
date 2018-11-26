var quanjv_stnm="";
var histTbleName="";

var searchStratT="";//开始时间
var searchEndT="";//结束时间范围
var timeDate="";//当前时间
var hcmc="";
var option1 ={};

$(function(){
	 	inputTime();
	//点击选项卡时候触发
        $('#tttt').tree({
        	 url: '/awater/subject/getZuiGaoTreeJsonWSCLC?sttp=RQ',
             loadFilter: function(data){
         			return data[0];
             },
             formatter:function(node){
                 return node.text;
             },
           parentField: 'pid',
           onClick: function(node){
           		if(node.pid!=-1){
           			option1 = initOption();//初始化option,多个和一个会冲突
                    quanjv_stnm=node.text;
                    hcmc=node.text;
                    console.log("node.pid=="+node.pid);
                    console.log("node.text=="+node.text)
                    $("#searchTx1").textbox("setValue",node.text);
                    $("#nameMingcheng").textbox("setValue",node.text);
                    //10个指标的赋值
                    $("#yhhydwName").textbox("setValue",node.text);
                    $("#sdName").textbox("setValue",node.text);
                    $("#CODcrName").textbox("setValue",node.text);
                    $("#adName").textbox("setValue",node.text);
                    $("#rjyName").textbox("setValue",node.text);
                    $("#zdName").textbox("setValue",node.text);
                    $("#zlName").textbox("setValue",node.text);
                    $("#tmdName").textbox("setValue",node.text);
                    $("#hjwdName").textbox("setValue",node.text);
                    $("#sllName").textbox("setValue",node.text);
                    //区默认
                    $("#nameMingQY").textbox("setValue",node.pid);
                    $("#searchTx0").textbox("setValue",node.pid);
                    $("#QYyhhydw").textbox("setValue",node.pid);
                    $("#QYsd").textbox("setValue",node.pid);
                    $("#QYCODcr").textbox("setValue",node.pid);
                    $("#QYad").textbox("setValue",node.pid);
                    $("#QYrjy").textbox("setValue",node.pid);
                    $("#QYzd").textbox("setValue",node.pid);
                    $("#QYzl").textbox("setValue",node.pid);
                    $("#QYtmd").textbox("setValue",node.pid);
                    $("#QYhjwd").textbox("setValue",node.pid);
                    $("#QYsll").textbox("setValue",node.pid);
                    showHistCharts();
                    showHistParentCharts('yhhydw');//显示图标
                    showHistParentCharts('sd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('CODcr');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('ad');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('rjy');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('zd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('zl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('tmd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('hjwd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('sll');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                }else{//如果不是选择对应的监测点，而是选择区域就默认 加入一些数据到标签
                	option1 = initOption();//初始化option,多个和一个会冲突
                	hcmc="";
                	$("#nameMingQY").textbox("setValue",node.text);
                    $("#searchTx0").textbox("setValue",node.text);
                    $("#QYyhhydw").textbox("setValue",node.text);
                    $("#QYsd").textbox("setValue",node.text);
                    $("#QYCODcr").textbox("setValue",node.text);
                    $("#QYad").textbox("setValue",node.text);
                    $("#QYrjy").textbox("setValue",node.text);
                    $("#QYzd").textbox("setValue",node.text);
                    $("#QYzl").textbox("setValue",node.text);
                    $("#QYtmd").textbox("setValue",node.text);
                    $("#QYhjwd").textbox("setValue",node.text);
                    $("#QYsll").textbox("setValue",node.text);
                    //10个指标的赋值清空
                    $("#yhhydwName").textbox("setValue","");
                    $("#sdName").textbox("setValue","");
                    $("#CODcrName").textbox("setValue","");
                    $("#adName").textbox("setValue","");
                    $("#rjyName").textbox("setValue","");
                    $("#zdName").textbox("setValue","");
                    $("#zlName").textbox("setValue","");
                    $("#tmdName").textbox("setValue","");
                    $("#hjwdName").textbox("setValue","");
                    $("#sllName").textbox("setValue","");
                    $("#searchTx1").textbox("setValue","");
                    //如果点击的是父节点.需要获取下面的全部水库库的名称进行查询数据
                    showHistCharts();//显示历史数据
                    showHistParentCharts('yhhydw');//显示图标
                    showHistParentCharts('sd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('CODcr');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('ad');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('rjy');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('zd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('zl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('tmd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('hjwd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('sll');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                }
           	},
            onLoadSuccess:function(node,data){
           	 option1 = initOption();//初始化option,多个和一个会冲突
           	 $("#tttt li:eq(0)").find("div").addClass("tree-node-selected");   //设置第一个节点高亮   
                var n = $("#tttt").tree("getSelected");   
                if(n!=null){ 
                	console.log("n.text=="+n.text);
                     $("#tttt").tree("select",n.target);  
                     $("#nameMingQY").textbox("setValue",n.text);
                     $("#searchTx0").textbox("setValue",n.text);
                     $("#QYyhhydw").textbox("setValue",n.text);
                     $("#QYsd").textbox("setValue",n.text);
                     $("#QYCODcr").textbox("setValue",n.text);
                     $("#QYad").textbox("setValue",n.text);
                     $("#QYrjy").textbox("setValue",n.text);
                     $("#QYzd").textbox("setValue",n.text);
                     $("#QYzl").textbox("setValue",n.text);
                     $("#QYtmd").textbox("setValue",n.text);
                     $("#QYhjwd").textbox("setValue",n.text);
                     $("#QYsll").textbox("setValue",n.text);
                     initTab();
                     showHistCharts();//显示历史数据
                     showHistParentCharts('yhhydw');//显示图标
                     showHistParentCharts('sd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('CODcr');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('ad');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('rjy');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('zd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('zl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('tmd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('hjwd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('sll');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     //加载完成以后,初始化各tab的长度
                     
                }   
           }
        });
        $("#publishDg").datagrid({
			url : '/awater/subject/StFactoryRealList?sttp=RQ',
			pagination:true,
			loadMsg : '数据装载中......',
			rownumbers : true,// 行号
			singleSelect:true,
			idField:'id',
			columns : [ [
                {field:'stnm',title : '名称',width:'9%',align:'center'},
                {field:'addvcd',title : '行政区',width:'9%',align:'center'},
                {field:'redox',title : '氧化还原电位(mv)',width:'12%',align:'center'},
                {field:'humid',title : '湿度(%)',width:'10%',align:'center'},
                {field:'codcr',title : '化学需氧量(mg/L)',width:'12%',align:'center'},
                {field:'nh3n',title : '氨氮(mg/L)',width:'10%',align:'center'},
                {field:'dox',title : '溶解氧(mg/L)',width:'10%',align:'center'},
                {field:'tn',title : '总氮(mg/L)',width:'10%',align:'center'},
                {field:'tp',title : '总磷(mg/L)',width:'10%',align:'center'},
                {field:'clar_ity',title : '透明度(m)',width:'10%',align:'center'},
                {field :'envt',title : '环境温度(℃)',width:'10%',align:'center'},
                {field :'q2',title : '水流量(l/s)',width:'10%',align:'center'},
                {field :'water_quality',title : '水质级别',width:'10%',align:'center',formatter :waterQualityFormatter},
                {field :'black_Smelly',title : '黑臭级别',width:'10%',align:'center',formatter :blackSmellyFormatter},
                {field :'sptDate',title : '更新时间',width:'15%',align:'center'},
            ]],
            pageSize: 50,        //设置默认分页大小
            pageList: [10, 15, 20, 25, 30, 35, 40, 45, 50],   //设置分页大小
		});
		//隐藏
		$('#tt').tabs({
            border:true,
            onSelect:function(title){}
        });
    });
   
	function waterQualityFormatter(value){
	    var waterQuality="";
	    var color = "";
	    if (value ==6) {
	        waterQuality="劣Ⅴ类";
	        color="#16C7F6"; 
	    } else if (value ==5) {
	        waterQuality="Ⅴ类";
	        color=" #14ABF0"; 
	    } else if (value ==4) {
	        waterQuality="Ⅳ类";
	        color=" #5DD324"; 
	    } else if (value ==3){
	        waterQuality="Ⅲ类";
	        color=" #27B45E"; 
	    } else if (value ==2){
	        waterQuality="Ⅱ类";
	        color=" #FFC206"; 
	    }  else if (value ==1){
	        waterQuality="Ⅰ类";
	        color=" #FE5408"; 
	    }
	    
	    return waterQuality;
	    /*if(type=='color'){
	    	return color;
	    }else{
	    	return waterQuality;
	    }*/
	}
	function blackSmellyFormatter(value){
	    var blackSmelly="无监测值";
	    if (value ==3) {
	        blackSmelly="严重黑臭";
	    } else if (value ==2) {
	        blackSmelly="轻度黑臭";
	    }  else if (value == 1) {
	        blackSmelly="不臭不黑";
	    }
	    return blackSmelly;
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
    function inputTime(){
    	 $("#searchStrat").textbox("setValue",threeTimeformatter(3)).datebox();
         $("#searchEnd").textbox("setValue",dqTimeformatter()).datebox();
         //指标时间
         $("#adStrat").textbox("setValue",indexFormatter()).datebox();
         $("#adEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#zlStrat").textbox("setValue",indexFormatter()).datebox();
         $("#zlEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#zdStrat").textbox("setValue",indexFormatter()).datebox();
         $("#zdEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#yhhydwStrat").textbox("setValue",indexFormatter()).datebox();
         $("#yhhydwEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#hjwdStrat").textbox("setValue",indexFormatter()).datebox();
         $("#hjwdEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#sllStrat").textbox("setValue",indexFormatter()).datebox();
         $("#sllEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#CODcrStrat").textbox("setValue",indexFormatter()).datebox();
         $("#CODcrEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#rjyStrat").textbox("setValue",indexFormatter()).datebox();
         $("#rjyEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#sdStrat").textbox("setValue",indexFormatter()).datebox();
         $("#sdEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#tmdStrat").textbox("setValue",indexFormatter()).datebox();
         $("#tmdEnd").textbox("setValue",dqTimeformatter()).datebox();
    }
    //日期
    function threeTimeformatter(n){
    	var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if(day <= n) {
            if(mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
    }
    //日期
    function dqTimeformatter(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    }
    //指标数据,获取前两天的数据用来展示就行
    function indexFormatter(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate()-2;
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    }

    function searchTxReal(){//搜索实时数据
    	$("#publishDg").datagrid({
            url : '/awater/subject/StFactoryRealList?sttp=RQ',
            queryParams:{
                "stnm":$("#searchTx1").val(),
                "addvcd":$("#searchTx0").val()
                },
            pagination:true,
            loadMsg : '数据装载中......',
            rownumbers : false,// 行号
            singleSelect:true,
            idField:'id',
            columns : [ [
            	{field:'stnm',title : '名称',width:'9%',align:'center'},
                {field:'addvcd',title : '行政区',width:'9%',align:'center'},
                {field:'redox',title : '氧化还原电位(mv)',width:'12%',align:'center'},
                {field:'humid',title : '湿度(%)',width:'10%',align:'center'},
                {field:'codcr',title : '化学需氧量(mg/L)',width:'12%',align:'center'},
                {field:'nh3n',title : '氨氮(mg/L)',width:'10%',align:'center'},
                {field:'dox',title : '溶解氧(mg/L)',width:'10%',align:'center'},
                {field:'tn',title : '总氮(mg/L)',width:'10%',align:'center'},
                {field:'tp',title : '总磷(mg/L)',width:'10%',align:'center'},
                {field:'clar_ity',title : '透明度(m)',width:'10%',align:'center'},
                {field :'envt',title : '环境温度(℃)',width:'10%',align:'center'},
                {field :'q2',title : '水流量(l/s)',width:'10%',align:'center'},
                {field :'water_quality',title : '水质级别',width:'10%',align:'center'},
                {field :'black_Smelly',title : '黑臭级别',width:'10%',align:'center'},
                {field :'spt',title : '更新时间',width:'15%',align:'center',formatter :myformatter},
            ]],
            pageSize: 50,        //设置默认分页大小
            pageList: [10, 15, 20, 25, 30, 35, 40, 45, 50],   //设置分页大小
            onLoadSuccess: function (data) {
                if (data.total == 0) {
                    var body = $(this).data().datagrid.dc.body2;
                        body.find('table tbody').append('<tr><td width="100%" colspan=11 style="height: 20px; text-align: center;"><h5>未获取到相关数据</h5></td></tr>');
                }
            },
        });
        if($("#searchTx1").val()!=null && $("#searchTx1").val().length!=0){
            quanjv_stnm=$("#searchTx1").val();
            $("#realDataChart").empty();
           showHistCharts();
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
		    			   },
		    			   axisPointer : {type : 'line'}
		    		},
		    	color:["#3b1b83","#c205ae","#0404fc","#10fc04","#117506","#fc0533","#f9fc09","#41f9d9","#fc9809","#5e362a"],
		    	legend : {orient:'vertical',left:'right',top:3,height:60,itemWidth:20,itemHeight:12,data : []},
		    	grid : {left: '10px',right : '0px',bottom : '-12px',width:'92%',height:'90%',containLabel : true,show : true,backgroundColor : 'rgb(255,255,255)'},
		        xAxis: {type: 'time',splitLine: {show: false}},
		        yAxis: {type: 'value',
		                boundaryGap: [0, '100%'],
		                splitNumber:10,splitLine: {show: true},
		                inverse: false,
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
            url : '/awater/subject/',
            queryParams:{
               "hcmc":$("#nameMingcheng").val(),
               "ssxzq":$("#nameMingQY").val(),
               "searchStrat":$("#searchStrat").val(),
               "searchEnd":$("#searchEnd").val()
            },
            loadMsg : '数据装载中......',
            rownumbers : false,// 行号
            singleSelect:true,
            pagination:true,
            idField:'id',
            columns : [[
                {field:'stnm',title : '名称',width:'9%',align:'center'},
                {field:'addvcd',title : '行政区',width:'9%',align:'center'},
                {field:'redox',title : '氧化还原电位(mv)',width:'12%',align:'center'},
                {field:'humid',title : '湿度(%)',width:'10%',align:'center'},
                {field:'codcr',title : '化学需氧量(mg/L)',width:'12%',align:'center'},
                {field:'nh3n',title : '氨氮(mg/L)',width:'10%',align:'center'},
                {field:'dox',title : '溶解氧(mg/L)',width:'10%',align:'center'},
                {field:'tn',title : '总氮(mg/L)',width:'10%',align:'center'},
                {field:'tp',title : '总磷(mg/L)',width:'10%',align:'center'},
                {field:'clar_ity',title : '透明度(m)',width:'10%',align:'center'},
                {field :'envt',title : '环境温度(℃)',width:'10%',align:'center'},
                {field :'q2',title : '水流量(l/s)',width:'10%',align:'center'},
                {field :'q2',title : '水质级别',width:'10%',align:'center'},
                {field :'q2',title : '黑臭级别',width:'10%',align:'center'},
                {field :'spt',title : '更新时间',width:'10%',align:'center',formatter :myformatter},
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
  
    function showHistParentCharts(type){
    	option1 = initOption();
    	var realDataChart = echarts.init(document.getElementById(type+"Chart"));
    	realDataChart.showLoading({
             text: "图表数据正在努力加载..."
         }); 
    	var legend = [];
		var data = [];
    	$.ajax({
    		url : "/awater/subject/getWuShuiEcharts?sttp=RQ",
    		data:{"addvcd":$("#QY"+type).combobox('getValue'),
    			  "searchStrat":$("#"+type+"Strat").val(),
    			  "searchEnd":$("#"+type+"End").val(),
    			  "type":type,
	              "stnm":hcmc
    			 },
    		type : "post",
    		dataType : "json",
    		success : function (res) {
    			//获取到区级下满所有的水库.然后再去查询数据
    			for (var i = 0; i < res.length; i++) {
					var stnm = res[i].stnm;
					var dataList = res[i].dataList;
					var tempData="";
					if(dataList.length>0){
						tempData={name:stnm,type:'line',smooth:true,showSymbol:false,hoverAnimation:false,data: []};
						legend.push(stnm);
					}
					for (var j = 0; j < dataList.length; j++) {
						tempData.data.push(getDatas(dataList[j],type));
					}
					if(dataList.length>0){
						data.push(tempData);
					}
				}
    			option1.title.text = getTarget(type);
    			option1.legend.data = legend;
    			option1.series = data;
    			realDataChart.setOption(option1);
    			realDataChart.hideLoading();
    		},	
    		error : function (XHR, error, errorThrown) {
    			layer.msg("请求数据错误！" + error)
    		}
    	})
    }
    
    function getData(item){
    	return {
    		name : getCNLocalTime(item.tm.time),
    		value : [
    		         item.tm.time,(Math.floor((item.rz)*100)/100)
    		         ]
    	}
    }
    function getTarget(type){
    	var index="";
    	if(type=='yhhydw'){
    		index = '氧化还原电位(mv)';
    	}else if(type=='sd'){
    		index = '湿度(%)';
    	}else if(type=='CODcr'){
    		index = 'CODcr(mg/L)'
    	}else if(type=='ad'){
    		index = '氨氮(mg/L)';
    	}else if(type=='rjy'){
    		index = '溶解氧(mg/L)';
    	}else if(type=='zd'){
    		index = '总氮(mg/L)'
    	}else if(type=='zl'){
    		index = '总磷(mg/L)'
    	}else if(type=='tmd'){
    		index = '透明度(m)'
    	}else if(type=='hjwd'){
    		index = '环境温度(℃))'
    	}else if(type=='sll'){
    		index = '水流量(l/s)'
    	}
    	return index;
    }
    function getDatas(item,type){
    	if(type=='ad'){
    		return {
        		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
        		value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.ad)*100)/100)]
        	}
    	}else if(type=='zl'){
    		return {
        		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
        		value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.zl)*100)/100)]
        	}
    	}else if(type=='zd'){
    		return {
        		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
        		value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.zd)*100)/100)]
        	}
    	}else if(type=='yhhydw'){
    		return {
        		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
        		value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.yhhydw)*100)/100)]
        	}
    	}else if(type=='hjwd'){
    		return {
    			name : getCNLocalTime(Date.parse(new Date(item.tmData))),
    			value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.hjwd)*100)/100)]
    		}
    	}else if(type=='sll'){
    		return {
    			name : getCNLocalTime(Date.parse(new Date(item.tmData))),
    			value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.sll)*100)/100)]
    		}
    	}else if(type=='CODcr'){
	    	return {
	    		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
	    		value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.codcr)*100)/100)]
	    	}
    	}else if(type=='rjy'){
	    	return {
	    		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
	    		value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.rjy)*100)/100)]
    		}
    	}else if(type=='sd'){
	    	return {
	    		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
	    		value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.sd)*100)/100)]
    		}
    	}else if(type=='tmd'){
	    	return {
	    		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
	    		value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.tmd)*100)/100)]
    		}
    	}
    }
    function initTab(){
    	var width = $("#yhhydwChart").width();
    	var height = $("#yhhydwChart").height();
    	console.log(width+"----"+height);
    	$("#adChart").css("width", width).css("height", height);
    	$("#zlChart").css("width", width).css("height", height);
    	$("#zdChart").css("width", width).css("height", height);
    	$("#hjwdChart").css("width", width).css("height", height);
    	$("#rjyChart").css("width", width).css("height", height);
    	$("#sllChart").css("width", width).css("height", height);
    	$("#CODcrChart").css("width", width).css("height", height);
    	$("#sdChart").css("width", width).css("height", height);
    	$("#tmdChart").css("width", width).css("height", height);
    	$("#yhhydwChart").css("width", width).css("height", height);
    }
