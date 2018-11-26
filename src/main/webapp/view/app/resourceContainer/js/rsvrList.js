var histTbleName="";
var searchStratT="";//开始时间
var searchEndT="";//结束时间范围
var timeDate="";//当前时间
var realDataChart;

$(function(){
        inputTime();
        initTimePicker();
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
        	   var text = node.text.split("&&");
           		if(node.pid!=-1){
                    $("#searchTx1").textbox("setValue",text[0]);
                    $("#nameMingchengC").textbox("setValue",text[0]);
                    $("#nameMingcheng").textbox("setValue",text[0]);
                    $("#nameMingQYC").textbox("setValue",node.pid);
                    $("#nameMingQY").textbox("setValue",node.pid);
                    $("#searchTx0").textbox("setValue",node.pid);
                    $("#stcd").val(text[1]);
                    inputTime();
                    showHistData();//显示历史数据
                    getRsvrData();
                }else{//如果不是选择对应的监测点，而是选择区域就默认 加入一些数据到标签,还需要将name框的内容去掉.
                    $("#nameMingQYC").textbox("setValue",text[0]);
                    $("#nameMingQY").textbox("setValue",text[0]);
                    $("#searchTx0").textbox("setValue",text[0]);
                    $("#nameMingchengC").textbox("setValue",node.children[0].id);
                    $("#nameMingcheng").textbox("setValue",node.children[0].id);
                    $("#searchTx1").textbox("setValue",node.children[0].id);
                    inputTime();
                    //如果点击的是父节点.需要获取下面的全部水库库的名称进行查询数据
                    showHistData();//显示历史数据
                    getRsvrData();//显示图标
                }
           	},
            onLoadSuccess:function(node,data){
            	initTab();
            	$('#publishDg').datagrid('load', {
            		addvcd:$("#searchTx0").val()
            	});
            	 $("#tttt li:eq(0)").find("div").addClass("tree-node-selected");   //设置第一个节点高亮   
                 var n = $("#tttt").tree("getSelected");
                 var a = n.children[0];
                 if(n!=null){   
                	  var text = n.text.split("&&");
                      $("#tttt").tree("select",n.target);  
                      $("#nameMingQYC").textbox("setValue",text[0]);
                      $("#nameMingQY").textbox("setValue",text[0]);
                      $("#searchTx0").textbox("setValue",text[0]);
                      $("#nameMingchengC").textbox("setValue",a.id);
                      $("#nameMingcheng").textbox("setValue",a.id);
                      $("#searchTx1").textbox("setValue",a.id);
                      showHistData();//显示历史数据
                      getRsvrData();//相当于默认点击了一下第一个节点，执行onSelect方法 
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
        $("#searchStrat").textbox("setValue",threeTimeformatter(3));
        $("#searchEnd").textbox("setValue",dqTimeformatter());
        $("#searchEndPucture").textbox("setValue",dqTimeformatter());
        $("#searchStratPucture").textbox("setValue",threeTimeformatter(3));
    }

    function initTimePicker() {
    	$("#searchStrat").datebox();
    	$("#searchEnd").datebox();
    	$("#searchStratPucture").datebox();
    	$("#searchEndPucture").datebox();
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
           {field:'stnm',title : '站名',width:'20%',align:'center'},
           {field :'tm',title : '时间',width:'20%',align:'center',formatter :myformatter},
           {field:'rz',title : '水位(m)',width:'20%',align:'center'},
           {field:'addvcd',title : '行政区域',width:'20%',align:'center'},
           {field:'fsltdz',title : '汛限值',width:'20%',align:'center'}
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
            {field:'stnm',title : '站名',width:'20%',align:'center'},
            {field :'tm',title : '时间',width:'20%',align:'center',formatter :myformatter},
            {field:'rz',title : '当前水位(m)',width:'20%',align:'center'},
            {field:'addvcd',title : '行政区域',width:'20%',align:'center'},
            {field:'fsltdz',title : '汛限值',width:'20%',align:'center'}
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
    
    function getDatas(item){
    	return {
    		name : getCNLocalTime(Date.parse(new Date(item.tmData))),
    		value : [
    		         Date.parse(new Date(item.tmData)),(Math.floor((item.rz)*100)/100)
    		        ]
    	}
    }
    function showHistData(){
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
            {field:'stnm',title : '站名',width:'20%',align:'center'},
            {field :'tm',title : '时间',width:'20%',align:'center',formatter :myformatter},
            {field:'rz',title : '水位(m)',width:'20%',align:'center'},
            {field:'addvcd',title : '行政区域',width:'20%',align:'center'},
            {field:'fsltdz',title : '汛限值',width:'20%',align:'center',formatter:nullValue}
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
    
    // 汛限为空
    function nullValue(value){
    	if(value=="9999"){
    		return "-";
    	}else{
    		return value;
    	}
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
    function getRsvrData(){
    	if (realDataChart != null && realDataChart != "" && realDataChart != undefined) {  
        	realDataChart.dispose();  
        }
    	realDataChart = echarts.init(document.getElementById('realDataChart'));
        realDataChart.showLoading({
            text: "图表数据正在努力加载..."
        });
    	$.ajax({
    		url : "/awater/subject/getCharQM",
    		data:{ 
    			   "searchStrat":$("#searchStratPucture").val(),
	               "searchEnd":$("#searchEndPucture").val(),
	               "histTbleName":$("#histTbleName").val(),
	               "stnm":$("#nameMingchengC").val()
    			 },
    		type : "post",
    		dataType : "json",
    		success : function (res) {
    			loadChart(res);
    		},
    		error : function (XHR, error, errorThrown) {
    			layer.msg("请求水库数据错误！" + error);
    		}
    	})
    }
    function loadChart(result){
        var that=this;
        var axisData = [];
        var waterLineData = [];
        var rainNumData = [];
        var xxsw;
        var legendData=['水库水位'];
        var seriesData=[{
            name: '水库水位',
            type: 'line',
            showSymbol:false,
            data: waterLineData
        }];
        var maxcharSw =result[0].fsltdz; //最大水位
        var mincharSw =""; //最小水位
               
        if (result.length>0) {
            xxsw = result[0].fsltdz;
            var markLineData = [];
            if (xxsw&&xxsw>0) {
                markLineData.push({
                    yAxis: xxsw,
                    name: '汛限水位',
                    symbolSize:[0,0],
                    label: {
                            normal: {
                                position:'middle',
                                formatter: function (param) {
                                    return param.name + ":" + param.value;
                                }
                            }
                        }
                });
                legendData.push('汛限水位');
                seriesData.push({
                    name: '汛限水位',
                    type: 'line',
                    showSymbol:false,
                    data: markLineData,
                    markLine: {
                        data: markLineData                                   
                    }
                });
            }
            var dataList = result[0].dataList;
            for (var i =  dataList.length-1; i >=0; i--) {
                axisData.push(dataList[i].tmData.replace(' ', '\n'));
                waterLineData.push(dataList[i].rz);
                if (maxcharSw < dataList[i].rz) {
                	maxcharSw = dataList[i].rz;
                }
                if (mincharSw > dataList[i].rz) {
                    mincharSw = dataList[i].rz;
                }
            } 
        }
        
        var option;
        if(result[0].fsltdz!=null){
        	//获得选中日期范围是否包含在汛期中     
            option = {
                color: ['#008bdc','#FF0000'],
                title: {
                    text: '水位过程线('+result[0].stnm+')',//雨量水库
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: legendData,//'降雨量',
                    left:0,
                    itemGap:5,
                    selected:{'汛限水位':true}
                },
                dataZoom: [{
                    type: 'inside',
                    start: 10,
                    end: 100,
                }, {
                    type:'slider', 
                    show: true,
                    showDetail:false,
                    start: 10,
                    end: 100,
                    filterMode:'empty'//不过滤数据，只改变数轴范围    
                }],
                visualMap: {
                    top: 10,
                    right: 10,
                    precision:2,//设置小数精度，默认0没有小数
                    pieces: [{
                        gt: mincharSw-1,
                        lte: result[0].fsltdz,
                        color: '#008bdc'
                    },{
                        gt: result[0].fsltdz,
                        color: '#FF0000'
                    }],
                    outOfRange: {
                        color: '#008bdc'
                    }
                },
                grid: [{
                	//left : '40px',right : '0px',bottom : '0px',width:'92%',height:'90%'                                           
                }],
                xAxis: [
                    {                                
                        type: 'category',
                        boundaryGap :false,
                        data: axisData
                    }
                ],
                yAxis: [
                    {
                        name: '水库水位(m)',
                        type: 'value',
                        max: maxcharSw+maxcharSw*0.5,
                        min: mincharSw-1,
                        boundaryGap :false,
                        axisLabel: {                   
                            formatter: function (value, index) {           
                                return value.toFixed(2);      
                            }                
                        }
                    }
                    
                ],
                series: seriesData
            };
        }else{
        	//获得选中日期范围是否包含在汛期中     
            option = {
                color: ['#008bdc','#FF0000'],
                title: {
                    text: '水位过程线('+result[0].stnm+')',//雨量水库
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: legendData,//'降雨量',
                    left:0,
                    itemGap:5,
                    selected:{'汛限水位':true}
                },
                dataZoom: [{
                    type: 'inside',
                    start: 10,
                    end: 100,
                }, {
                    type:'slider', 
                    show: true,
                    showDetail:false,
                    start: 10,
                    end: 100,
                    filterMode:'empty'//不过滤数据，只改变数轴范围    
                }],
                /*
                visualMap: {
                    top: 10,
                    right: 10,
                    precision:2,//设置小数精度，默认0没有小数
                    pieces: [{
                        gt: mincharSw-1,
                        lte: result[0].fsltdz,
                        color: '#008bdc'
                    },{
                        gt: result[0].fsltdz,
                        color: '#FF0000'
                    }],
                    outOfRange: {
                        color: '#008bdc'
                    }
                },
                */
                grid: [{
                	//left : '40px',right : '0px',bottom : '0px',width:'92%',height:'90%'                                           
                }],
                xAxis: [
                    {                                
                        type: 'category',
                        boundaryGap :false,
                        data: axisData
                    }
                ],
                yAxis: [
                    {
                        name: '水库水位(m)',
                        type: 'value',
                        max: maxcharSw+maxcharSw*0.5,
                        min: mincharSw-1,
                        boundaryGap :false,
                        axisLabel: {                   
                            formatter: function (value, index) {           
                                return value.toFixed(2);      
                            }                
                        }
                    }
                    
                ],
                series: seriesData
            };
        }
        
        if(result[0].dataList<1){
        	layer.msg(result[0].stnm+"暂无数据！");
        }
        realDataChart.setOption(option);
        realDataChart.hideLoading();
    }
    
    	             
    	                    
