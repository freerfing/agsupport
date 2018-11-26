var quanjv_stnm="";
var histTbleName="";

var searchStratT="";//开始时间
var searchEndT="";//结束时间范围
var timeDate="";//当前时间

$(function(){
        histTbleName=$("#histTbleName").val();
        $('#tttt').tree({
            url: '/awater/subject/getZuiGaoTreeJson?histTbleName='+$("#histTbleName").val(),
            loadFilter: function(data){
        			return data[0];
            },
            formatter:function(node){
                return node.text;
            },
           parentField: 'pid',
           onClick: function(node){
           		if(node.pid!=-1){
           		    //隐藏
                  /*  $('#tt').tabs({
                        border:true,
                        selected:2,
                        onSelect:function(title){}
                    });*/
           		    quanjv_stnm=node.text;

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
               $("#publishDg1").empty();
               $("#publishDg1").datagrid({
                   url : '/awater/subject/findHist?sttp=ZZ&stnm='+node.text+'&histTbleName='+$("#histTbleName").val()+'&searchStrat='+searchStratT+'&searchEnd='+searchEndT+'&timeDate='+timeDate,
                        pagination:true,
                        loadMsg : '数据装载中......',
                        rownumbers : false,// 行号
                        singleSelect:true,
                        idField:'id',
                        columns : [ [
                        {field:'stnm',title : '站名',width:'30%',align:'center'},
                        {field :'tm',title : '时间',width:'23.5%',align:'center',formatter :myformatter},
                        {field:'z',title : '水位(m)',width:'23.3%',align:'center'},
                        {field:'fsltdz',title : '汛限值',width:'23.3%',align:'center'}
                        ]],
                        pageSize: 50,        //设置默认分页大小
                        pageList: [10, 15, 20, 25, 30, 35, 40, 45, 50],   //设置分页大小
                    });
                    bzSearch();
           		}
           	}
        });
        initTimePicker();
		$("#publishDg").datagrid({
			url : '/awater/subject/findList?sttp=WL&histTbleName='+$("#histTbleName").val(),
			pagination:true,
			loadMsg : '数据装载中......',
			rownumbers : false,// 行号
			singleSelect:true,
			idField:'id',
			columns : [ [
            {field:'stnm',title : '站名',width:'30%',align:'center'},
            {field :'tm',title : '时间',width:'23.5%',align:'center',formatter :myformatter},
            {field:'drp',title : '当前水位(m)',width:'23.3%',align:'center'},
            {field:'fsltdz',title : '汛限值',width:'23.3%',align:'center'}
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

    function initTimePicker() {
    	$("#searchStrat").datebox();
    	//$("#searchStrat").datebox('setValue',new Date());
    	$("#searchEnd").datebox();
    	$("#searchStratPucture").datebox();
    }

     //日期
    function myformatter(value){
        var date = new Date(value.time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    }
    function searchTxHist(){
        if(quanjv_stnm==""){
            return alert("选择目标积水点");
        }
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
           url : '/awater/subject/findHist?sttp=RR&stnm='+quanjv_stnm+'&searchStrat='+$("#searchStrat").val()+'&searchEnd='+$("#searchEnd").val()+'&histTbleName='+histTbleName+'&timeDate='+timeDate,
           pagination:true,
           loadMsg : '数据装载中......',
           rownumbers : false,// 行号
           singleSelect:true,
           idField:'id',
           columns : [ [
           {field:'stnm',title : '站名',width:'30%',align:'center'},
           {field :'tm',title : '时间',width:'23.5%',align:'center',formatter :myformatter},
           {field:'z',title : '水位(m)',width:'23.3%',align:'center'},
           {field:'fsltdz',title : '汛限值',width:'23.3%',align:'center'}
           ]],
           pageSize: 50,        //设置默认分页大小
           pageList: [10, 15, 20, 25, 30, 35, 40, 45, 50],   //设置分页大小
       });
    }
    function searchTxReal(){
        $("#publishDg").datagrid({
            url : '/awater/subject/findList?sttp=WL&stnm='+$("#searchTx1").val()+'&histTbleName='+$("#histTbleName").val(),
            pagination:true,
            loadMsg : '数据装载中......',
            rownumbers : false,// 行号
            singleSelect:true,
            idField:'id',
            columns : [ [
            {field:'stnm',title : '站名',width:'30%',align:'center'},
            {field :'tm',title : '时间',width:'23.5%',align:'center',formatter :myformatter},
            {field:'newdata',title : '当前水位(m)',width:'23.3%',align:'center'},
            {field:'fsltdz',title : '汛限值',width:'23.3%',align:'center'}
            ]],
            pageSize: 50,        //设置默认分页大小
            pageList: [10, 15, 20, 25, 30, 35, 40, 45, 50],   //设置分页大小
        });
    }

    //查询
        function bzSearch(){
            if(quanjv_stnm==""){
                 return alert("选择目标江河");
             }
        	var fanhuiTimaPJ=fanhuiTimePJ();
        	getBZStatDataForDay(fanhuiTimaPJ);
        }
        function getBZStatDataForDay(fanhuiTimaPJ) {
        	var realDataChart = echarts.init(document.getElementById('realDataChart'));
        	realDataChart.showLoading();
        	if($("#searchStratPucture").val()==null || $("#searchStratPucture").val().length==0){
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                $("#searchStratPucture").val(y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d))
            }
        	$.ajax({
        		url : "/awater/subject/findHist?sttp=RR&stnm="+quanjv_stnm+"&timeDate="+$("#searchStratPucture").val()+"&histTbleName="+histTbleName,
        		type : "post",
        		dataType : "json",
        		success : function (res) {
        			console.log(res.rows);
        			var itemIdList = [];
        			var legend = [];
        			var data = [];

        			var tempData;
        			for(var a in res.rows){
        				var z = res.rows[a];
        				if($.inArray(z.addvcd,itemIdList) == -1){
        					itemIdList.push(z.addvcd);
        					legend.push(z.stnm);
        					if(tempData !== undefined){
        						data.push(tempData);
        					}
        					tempData = {name: z.stnm,type: 'line',smooth:true,showSymbol: false,hoverAnimation: false,data: []};
        				}
        				tempData.data.push(getData(z));

        				if(a == (res.rows.length-1)){
        					data.push(tempData);
        				}
        			}
        			option1.title.text = '水位参数';
        			option1.title.subtext = $("#searchStratPucture").val();
        			option1.legend.data = legend;
        			option1.series = data;

        			realDataChart.setOption(option1);
        			realDataChart.hideLoading();
        		},
        		error : function (XHR, error, errorThrown) {
        			layer.msg("请求泵站数据错误！" + error)
        		}
        	})
        }
        var option1 = {
        	title : {top:5,text : '',subtext:''},
        	tooltip : {trigger : 'axis',
        		formatter: function(params){
        			var f = "";
        			f += params[0].name + "</br>";
        			for( a in params ) {
        			    console.log(params[a]);
        				f += params[a].seriesName + "：" +params[a].data.value[1];
        				f += "</br>";
        			}
        			return f;
        		},axisPointer : {type : 'line'}},
        	color:["#3b1b83","#c205ae","#0404fc","#10fc04","#117506","#fc0533","#f9fc09","#41f9d9","#fc9809","#5e362a"],
        	legend : {orient:'vertical',left:'right',top:3,height:60,itemWidth:20,itemHeight:12,data : []},
        	grid : {left : '10px',right : '0px',bottom : '-12px',width:'92%',height:'90%',containLabel : true,show : true,backgroundColor : 'rgb(255,255,255)'},
            xAxis: {type: 'time',splitLine: {show: true}},
            yAxis: {type: 'value',
                    boundaryGap: [0, '100%'],
                    splitNumber:10,splitLine: {show: true},
                    inverse: false,
                    axisLabel: {
                        formatter:function (value, index){
                        if(value==0){
                            value=22.2;
                        }
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
        function getData(item){
        	return {
        		name : getCNLocalTimeDAY(item.tm.time),
        		value : [
        		         item.tm.time,(Math.floor((item.rz)*100)/100)
        		         ]
        	}
        }

        function fanhuiTimePJ(){
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
            return "&searchStrat="+searchStratT+"&searchEnd="+searchEndT+"&timeDate="+timeDate+"&histTbleName="+histTbleName;
        }
        function fanhuiTimePJTM(){
                searchStratT=$("#searchStrat").val();
                searchEndT=$("#searchEnd").val();
                if((searchStratT==null || searchStratT.length==0) && (searchEndT==null || searchEndT.length==0)){
                    timeDate=new Date();
                    var y = timeDate.getFullYear();
                    var m = timeDate.getMonth() + 1;
                    var d = timeDate.getDate();
                    return timeDate=y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
                }else{
                    timeDate='';
                    return searchStratT;
                }
            }