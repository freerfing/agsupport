var histTbleName="";
var searchStratT="";//开始时间
var searchEndT="";//结束时间范围
var timeDate="";//当前时间
var hcmc="";
var option1 ={};

$(function(){
	//点击选项卡时候触发
        histTbleName=$("#histTbleName").val();
        $('#tttt').tree({
           url: '/awater/subject/getZuiGaoTreeJsonSZ',
           loadFilter: function(data){
                return data[0];
           },
           formatter:function(node){ return node.text;},
           parentField: 'pid',
           onClick: function(node){
        	   option1 = initOption();//初始化option,多个和一个会冲突
           		if(node.pid!=-1){
                    $("#searchTx1").textbox("setValue",node.text);
                    $("#adName").textbox("setValue",node.text);
                    $("#zlName").textbox("setValue",node.text);
                    $("#hxhylName").textbox("setValue",node.text);
                    $("#rjyName").textbox("setValue",node.text);
                    $("#tmdName").textbox("setValue",node.text);
                    $("#szName").textbox("setValue",node.text);
                    $("#nameMingcheng").textbox("setValue",node.text);
                    $("#nameMingQY").textbox("setValue",node.pid);
                    $("#searchTx0").textbox("setValue",node.pid);
                    $("#QYad").textbox("setValue",node.pid);
                    $("#QYzl").textbox("setValue",node.pid);
                    $("#QYhxhyl").textbox("setValue",node.pid);
                    $("#QYrjy").textbox("setValue",node.pid);
                    $("#QYtmd").textbox("setValue",node.pid);
                    $("#QYsz").textbox("setValue",node.pid);
                    showHistCharts();
                    //searchTxReal();
                    showHistParentCharts('ad');//显示图标
                    showHistParentCharts('zl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('hxhyl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('rjy');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('tmd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('sz');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                }else{//如果不是选择对应的监测点，而是选择区域就默认 加入一些数据到标签
                	$("#adName").textbox("setValue",node.children[0].id);
                    $("#zlName").textbox("setValue",node.children[0].id);
                    $("#hxhylName").textbox("setValue",node.children[0].id);
                    $("#rjyName").textbox("setValue",node.children[0].id);
                    $("#tmdName").textbox("setValue",node.children[0].id);
                    $("#szName").textbox("setValue",node.children[0].id);
                    $("#nameMingcheng").textbox("setValue",node.children[0].id);
                    $("#searchTx1").textbox("setValue",node.children[0].id);
                    
                    $("#nameMingQY").textbox("setValue",node.text);
                    $("#searchTx0").textbox("setValue",node.text);
                    $("#QYad").textbox("setValue",node.text);
                    $("#QYzl").textbox("setValue",node.text);
                    $("#QYhxhyl").textbox("setValue",node.text);
                    $("#QYrjy").textbox("setValue",node.text);
                    $("#QYtmd").textbox("setValue",node.text);
                    $("#QYsz").textbox("setValue",node.text);
                    //如果点击的是父节点.需要获取下面的全部水库库的名称进行查询数据
                    showHistCharts();//显示历史数据
                    //searchTxReal();
                    showHistParentCharts('ad');
                    showHistParentCharts('zl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('hxhyl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('rjy');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('tmd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                    showHistParentCharts('sz');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
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
                     $("#QYhxhyl").textbox("setValue",n.text);
                     $("#QYrjy").textbox("setValue",n.text);
                     $("#QYtmd").textbox("setValue",n.text);
                     $("#QYsz").textbox("setValue",n.text);
                     $("#adName").textbox("setValue",a.id);
                     $("#zlName").textbox("setValue",a.id);
                     $("#hxhylName").textbox("setValue",a.id);
                     $("#rjyName").textbox("setValue",a.id);
                     $("#tmdName").textbox("setValue",a.id);
                     $("#szName").textbox("setValue",a.id);
                     $("#nameMingcheng").textbox("setValue",a.id);
                     $("#searchTx1").textbox("setValue",a.id);
                     initTab();
                     showHistCharts();//显示历史数据
                     //searchTxReal();
                     showHistParentCharts('ad');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('zl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('hxhyl');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('rjy');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('tmd');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     showHistParentCharts('sz');//相当于默认点击了一下第一个节点，执行onSelect方法,查询ALL查询出全部
                     //加载完成以后,初始化各tab的长度
                     
                }   
           }
        });
		//隐藏
		$('#tt').tabs({
            border:true,
            onSelect:function(title){}
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

    function searchTxHist(){
        $("#publishDg1").empty();
        searchStratT=$("#searchStrat").val();
        searchEndT=$("#searchEnd").val();
        console.log(searchStratT.length);
        console.log(searchEndT.length);
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
           url : '/awater/subject/findHistSZ',
           queryParams:{
               "hcmc":$("#nameMingcheng").val(),
               "searchStrat":$("#searchStrat").val(),
               "searchEnd":$("#searchEnd").val(),
               "ssxzq":$("#nameMingQY").val()
           },
           pagination:true,
           loadMsg : '数据装载中......',
           rownumbers : false,// 行号
           singleSelect:true,
           idField:'id',
           columns : [ [
               {field:'hcmc',title : '名称',width:'8%',align:'center'},
               {field:'ssxzq',title : '行政区',width:'10%',align:'center'},
               {field:'ad',title : '氨氮(mg/l）',width:'10%',align:'center'},
               {field:'zl',title : '总磷(mg/l）',width:'10%',align:'center'},
               {field:'hxqyl',title : '含氧量(mg/l）',width:'10%',align:'center'},
               {field:'rjy',title : '溶解氧(mg/l）',width:'10%',align:'center'},
               {field:'tmd',title : '透明度cm',width:'10%',align:'center'},
               {field:'szzs',title : '指数/WQI',width:'10%',align:'center'},
               {field:'szlb',title : '类别',width:'5%',align:'center'},
               {field:'sfhc',title : '黑臭',width:'5%',align:'center'},
               {field :'s_last_updated',title : '时间',width:'10%',align:'center',formatter :myformatter}
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
    function searchTxReal(){//搜索实时数据
        $("#publishDg").datagrid({
            url : '/awater/subject/findListHechong',
            queryParams:{
                "hcmc":$("#searchTx1").val(),
                "ssxzq":$("#searchTx0").val()
            },
            pagination:true,
            loadMsg : '数据装载中......',
            rownumbers : true,// 行号
            singleSelect:true,
            idField:'id',
            columns : [ [
               {field:'hcmc',title : '名称',width:'9%',align:'center'},
               {field:'ssxzq',title : '行政区',width:'9%',align:'center'},
               {field:'ad',title : '氨氮(mg/l）',width:'9%',align:'center'},
               {field:'zl',title : '总磷(mg/l）',width:'9%',align:'center'},
               {field:'hxqyl',title : '含氧量(mg/l）',width:'9%',align:'center'},
               {field:'rjy',title : '溶解氧(mg/l）',width:'10%',align:'center'},
               {field:'tmd',title : '透明度cm',width:'10%',align:'center'},
               {field:'szzs',title : '指数/WQI',width:'10%',align:'center'},
               {field:'szlb',title : '类别',width:'10%',align:'center'},
               {field:'sfhc',title : '黑臭',width:'5%',align:'center'},
               {field :'jcny',title : '时间',width:'10%',align:'center'}
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
            url : '/awater/subject/findHistSZ',
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
                {field:'hcmc',title : '名称',width:'9%',align:'center'},
                {field:'ssxzq',title : '行政区',width:'9%',align:'center'},
                {field:'ad',title : '氨氮(mg/L）',width:'9%',align:'center'},
                {field:'zl',title : '总磷(mg/L）',width:'9%',align:'center'},
                {field:'hxqyl',title : '含氧量(mg/L）',width:'9%',align:'center'},
                {field:'rjy',title : '溶解氧(mg/L）',width:'10%',align:'center'},
                {field:'tmd',title : '透明度cm',width:'10%',align:'center'},
                {field:'szzs',title : '指数/WQI',width:'10%',align:'center'},
                {field:'szlb',title : '类别',width:'10%',align:'center'},
                {field:'sfhc',title : '黑臭',width:'5%',align:'center'},
                {field :'jcny',title : '时间',width:'10%',align:'center'}
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
  //查询
    
    function showHistParentCharts(type){
    	option1 = initOption();
    	var realDataChart = echarts.init(document.getElementById(type+"Chart"));
    	realDataChart.showLoading({
             text: "图表数据正在努力加载..."
         }); 
    	var legend = [];
		var data = [];
    	$.ajax({
    		url : "/awater/subject/getHongChongEcharts",
    		data:{"addvcd":$("#QY"+type).val(),
    			  "searchStrat":$("#"+type+"Strat").val(),
    			  "searchEnd":$("#"+type+"End").val(),
    			  "stnm":$("#"+type+"Name").val(),
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
    			layer.msg("请求水库数据错误！" + error)
    		}
    	})
    }
    
    function getTarget(type){
    	var index="";
    	if(type=='ad'){
    		index = '氨氮(mg/L)';
    	}else if(type=='zl'){
    		index = '总磷(mg/L)';
    	}else if(type=='hxhyl'){
    		index = '化学含氧量(mg/L)';
    	}else if(type=='rjy'){
    		index = '溶解氧(mg/L)';
    	}else if(type=='tmd'){
    		index = '透明度(cm)';
    	}else if(type=='sz'){
    		index = '水质指数(WQI)'
    	}
    	return index;
    }
    function getDatas(item,type){
    	var jcny = getCNLocalTime(Date.parse(new Date(item.jcny)));
    	var jcnyTime = jcny.substring(0,8);
    	if(type=='ad'){
    		return {
        		name : jcnyTime,
        		value : [ Date.parse(new Date(item.jcny)),(Math.floor((item.ad)*100)/100)]
        	}
    	}else if(type=='zl'){
    		return {
        		name : jcnyTime,
        		value : [ Date.parse(new Date(item.jcny)),(Math.floor((item.zl)*100)/100)]
        	}
    	}else if(type=='hxhyl'){
    		return {
        		name : jcnyTime,
        		value : [ Date.parse(new Date(item.jcny)),(Math.floor((item.hxqyl)*100)/100)]
        	}
    	}else if(type=='rjy'){
    		return {
        		name : jcnyTime,
        		value : [ Date.parse(new Date(item.jcny)),(Math.floor((item.rjy)*100)/100)]
        	}
    	}else if(type=='tmd'){
    		return {
    			name : jcnyTime,
    			value : [ Date.parse(new Date(item.jcny)),(Math.floor((item.tmd)*100)/100)]
    		}
    	}else if(type=='sz'){
    		return {
    			name : jcnyTime,
    			value : [ Date.parse(new Date(item.jcny)),(Math.floor((item.szzs)*100)/100)]
    		}
    	}
    }
    function initTab(){
    	var width = $("#adChart").width();
    	var height = $("#adChart").height();
    	if(width==height){	    	
	    	width=$("#tt").width()-45;
	    	height = $("#tt").height()-95;    	
	    }
    	$("#adChart").css("width", width).css("height", height);
    	$("#zlChart").css("width", width).css("height", height);
    	$("#hxhylChart").css("width", width).css("height", height);
    	$("#rjyChart").css("width", width).css("height", height);
    	$("#tmdChart").css("width", width).css("height", height);
    	$("#szChart").css("width", width).css("height", height);
    }
