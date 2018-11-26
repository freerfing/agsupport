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
        	 url: '/awater/subject/getZuiGaoTreeJsonWSCLC?sttp=FQ',
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
                    $("#searchTx1").textbox("setValue",node.text);
                    $("#nameMingcheng").textbox("setValue",node.text);
                    //七个指标的赋值
                    $("#adName").textbox("setValue",node.text);
                    $("#zlName").textbox("setValue",node.text);
                    $("#zdName").textbox("setValue",node.text);
                    $("#phName").textbox("setValue",node.text);
                    $("#xfwName").textbox("setValue",node.text);
                    $("#sllName").textbox("setValue",node.text);
                    $("#CODcrName").textbox("setValue",node.text);
                    //区默认
                    $("#nameMingQY").textbox("setValue",node.pid);
                    $("#searchTx0").textbox("setValue",node.pid);
                    $("#QYad").textbox("setValue",node.pid);
                    $("#QYzl").textbox("setValue",node.pid);
                    $("#QYhxhyl").textbox("setValue",node.pid);
                    $("#QYrjy").textbox("setValue",node.pid);
                    $("#QYtmd").textbox("setValue",node.pid);
                    $("#QYsz").textbox("setValue",node.pid);
                    //showHistCharts();
                    searchTxReal();//实时数据
                    showHistParentCharts('ad');//显示图标
                    showHistParentCharts('zl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('zd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('ph');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('xfw');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('sll');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('CODcr');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                }else{//如果不是选择对应的监测点，而是选择区域就默认 加入一些数据到标签
                	option1 = initOption();//初始化option,多个和一个会冲突
                    $("#nameMingQY").textbox("setValue",node.text);
                    $("#searchTx0").textbox("setValue",node.text);
                    $("#QYad").textbox("setValue",node.text);
                    $("#QYzl").textbox("setValue",node.text);
                    $("#QYhxhyl").textbox("setValue",node.text);
                    $("#QYrjy").textbox("setValue",node.text);
                    $("#QYtmd").textbox("setValue",node.text);
                    $("#QYsz").textbox("setValue",node.text);
                    //七个指标的赋值清空
                    $("#adName").textbox("setValue",node.children[0].id);
                    $("#zlName").textbox("setValue",node.children[0].id);
                    $("#zdName").textbox("setValue",node.children[0].id);
                    $("#phName").textbox("setValue",node.children[0].id);
                    $("#xfwName").textbox("setValue",node.children[0].id);
                    $("#sllName").textbox("setValue",node.children[0].id);
                    $("#CODcrName").textbox("setValue",node.children[0].id);
                    $("#searchTx1").textbox("setValue",node.children[0].id);
                    //如果点击的是父节点.需要获取下面的全部水库库的名称进行查询数据
                    //showHistCharts();//显示历史数据
                    searchTxReal();//实时数据
                    showHistParentCharts('ad');//显示图标
                    showHistParentCharts('zl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('zd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('ph');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('xfw');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('sll');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('CODcr');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                }
           	},
            onLoadSuccess:function(node,data){
           	 option1 = initOption();//初始化option,多个和一个会冲突
           	 $("#tttt li:eq(0)").find("div").addClass("tree-node-selected");   //设置第一个节点高亮   
                var n = $("#tttt").tree("getSelected");
                var a = n.children[0];
                if(n!=null){   
                     $("#tttt").tree("select",n.target);  
                     $("#nameMingQY").textbox("setValue",n.text);
                     $("#searchTx0").textbox("setValue",n.text);
                     $("#QYad").textbox("setValue",n.text);
                     $("#QYzl").textbox("setValue",n.text);
                     $("#QYzd").textbox("setValue",n.text);
                     $("#QYph").textbox("setValue",n.text);
                     $("#QYxfw").textbox("setValue",n.text);
                     $("#QYsll").textbox("setValue",n.text);
                     $("#QYCODcr").textbox("setValue",n.text);
                     
                     $("#adName").textbox("setValue",a.id);
                     $("#zlName").textbox("setValue",a.id);
                     $("#zdName").textbox("setValue",a.id);
                     $("#phName").textbox("setValue",a.id);
                     $("#xfwName").textbox("setValue",a.id);
                     $("#sllName").textbox("setValue",a.id);
                     $("#CODcrName").textbox("setValue",a.id);
                     $("#searchTx1").textbox("setValue",a.id);
                     initTab();
                     //showHistChartsshowHistCharts();//显示历史数据
                     // searchTxReal();//实时数据
                     showHistParentCharts('ad');//显示图标
                     showHistParentCharts('zl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('zd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('ph');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('xfw');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('sll');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('CODcr');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     //加载完成以后,初始化各tab的长度
                     
                }   
           }
        });
		//隐藏
		$('#tt').tabs({
            border:true,
            onSelect:function(title){
            	if(title=="数据列表"){
            		searchTxReal();
            	}            	
            }
        });
    });
   
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
         $("#adStrat").textbox("setValue",sevenDayTimeformatter()).datebox();
         $("#adEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#zlStrat").textbox("setValue",sevenDayTimeformatter()).datebox();
         $("#zlEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#zdStrat").textbox("setValue",sevenDayTimeformatter()).datebox();
         $("#zdEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#phStrat").textbox("setValue",sevenDayTimeformatter()).datebox();
         $("#phEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#xfwStrat").textbox("setValue",sevenDayTimeformatter()).datebox();
         $("#xfwEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#sllStrat").textbox("setValue",sevenDayTimeformatter()).datebox();
         $("#sllEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#CODcrStrat").textbox("setValue",sevenDayTimeformatter()).datebox();
         $("#CODcrEnd").textbox("setValue",dqTimeformatter()).datebox();
         $("#startTime").textbox("setValue",sevenDayTimeformatter()).datebox();
         $("#endTime").textbox("setValue",dqTimeformatter()).datebox();
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
  //7天前
    function sevenDayTimeformatter(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate()-7;
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    }
    //指标数据,获取前两年的数据用来展示就行
    function indexFormatter(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    }

    function searchTxReal(){//搜索实时数据
    	$("#publishDg").datagrid({
            url : '/awater/subject/StFactoryRealList?sttp=FQ',
            queryParams:{
            	"startTime":$("#startTime").val()+" 00:00:00",
            	"endTime":$("#endTime").val()+" 23:59:59",
                "stnm":$("#searchTx1").val(),
                "addvcd":$("#searchTx0").val()                
                },
            pagination:true,
            loadMsg : '数据装载中......',
            rownumbers : false,// 行号
            singleSelect:true,
            idField:'id',
            columns : [ [
                {field:'stnm',title : '名称',width:'15%',align:'center'},
                {field:'addvcd',title : '区域',width:'10%',align:'center'},
                {field:'spt',title : '时间',width:'15%',align:'center',formatter :myformatter},
                {field:'nh3n',title : '氨氮(mg/L)',width:'10%',align:'center',formatter :nullvalue},
                {field:'tp',title : '总磷(mg/L)',width:'10%',align:'center',formatter :nullvalue},
                {field:'tn',title : '总氮(mg/L)',width:'10%',align:'center',formatter :nullvalue},
                {field:'ph',title : 'pH值 ',width:'10%',align:'center',formatter :nullvalue},
                {field:'ss',title : '悬浮物(mg/L)',width:'10%',align:'center',formatter :nullvalue},
                {field:'q2',title : '水流量(L/s)',width:'10%',align:'center',formatter :nullvalue},
                {field :'codcr',title : '化学需氧量 (mg/L)',width:'10%',align:'center',formatter :nullvalue}
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
    }

    // 区分无
    function nullvalue(value){
    	if(value=="9999"){
    		return "-";
    	}else{
    		return value;
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
		    	 dataZoom : {//实现缩放功能  
                     type:'slider',     
                     show : true, 
                     showDetail:false,
                     start : 10,        
                     end : 100 ,
                     filterMode:'empty'//不过滤数据，只改变数轴范围
                 }, 
               //grid : {left : '10px',right : '0px',bottom : '-12px',width:'92%',height:'90%',containLabel : true,show : true,backgroundColor : 'rgb(255,255,255)'},
 		    	grid: { right: 70,left: 60 },
 		    	xAxis: {type: 'time',splitLine: {show: true}},
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
            url : '/awater/subject/findHistWSCL',
            queryParams:{
               "stnm":$("#nameMingcheng").val(),
               "searchStrat":$("#searchStrat").val(),
               "searchEnd":$("#searchEnd").val(),
               "addvcd":$("#nameMingQY").val()
            },
            loadMsg : '数据装载中......',
            rownumbers : false,// 行号
            singleSelect:true,
            pagination:true,
            idField:'id',
            columns : [[
            	{field:'stnm',title : '名称',width:'12%',align:'center'},
                {field:'addvcd',title : '区域',width:'10%',align:'center'},
                {field:'spt',title : '时间',width:'15%',align:'center',formatter :myformatter},
                {field:'nh3n',title : '氨氮',width:'10%',align:'center'},
                {field:'tp',title : '总磷',width:'10%',align:'center'},
                {field:'tn',title : '总氮',width:'10%',align:'center'},
                {field:'ph',title : 'pH值 ',width:'7%',align:'center'},
                {field:'ss',title : '悬浮物',width:'10%',align:'center'},
                {field:'q2',title : '水流量',width:'6%',align:'center'},
                {field :'codcr',title : '化学需氧量 ',width:'10%',align:'center'}
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
    		url : "/awater/subject/getWuShuiEcharts?sttp=FQ",
    		data:{"addvcd":$("#QY"+type).val(),
    			  "searchStrat":$("#"+type+"Strat").val(),
    			  "searchEnd":$("#"+type+"End").val(),
    			  "type":type,
	              "stnm":$("#"+type+"Name").val()
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
					}else{
						layer.msg(stnm+"暂无数据！");
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
    	if(type=='ad'){
    		index = '氨氮(mg/L)';
    	}else if(type=='zl'){
    		index = '总磷(mg/L)';
    	}else if(type=='zd'){
    		index = '总氮(mg/L)';
    	}else if(type=='ph'){
    		index = 'PH';
    	}else if(type=='xfw'){
    		index = '悬浮物(mg/L)';
    	}else if(type=='sll'){
    		index = '水流量(L/s)'
    	}else if(type=='CODcr'){
    		index = 'CODcr(mg/L)'
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
    	}else if(type=='ph'){
    		return {
        		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
        		value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.ph)*100)/100)]
        	}
    	}else if(type=='xfw'){
    		return {
    			name : getCNLocalTime(Date.parse(new Date(item.tmData))),
    			value : [ Date.parse(new Date(item.tmData)),(Math.floor((item.xfw)*100)/100)]
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
    	}
    }
    function initTab(){
    	var width = $("#adChart").width();
    	var height = $("#adChart").height();
    	console.log(width+"----"+height);
    	if(width==height){	    	
	    	width=$("#tt").width()-45;
	    	height = $("#tt").height()-95;    	
	    }
    	$("#adChart").css("width", width).css("height", height);
    	$("#zlChart").css("width", width).css("height", height);
    	$("#zdChart").css("width", width).css("height", height);
    	$("#phChart").css("width", width).css("height", height);
    	$("#xfwChart").css("width", width).css("height", height);
    	$("#sllChart").css("width", width).css("height", height);
    	$("#CODcrChart").css("width", width).css("height", height);
    }
