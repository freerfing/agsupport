$(function(){
	inputTime();
	initRsvr();//初始化水库水位
	initRiver();//初始化江河水位
//	initSurdep();//初始化城区积水
	initPptn();//初始化雨量
	initWbsver();//初始化河涌水质
	initStFactory();//初始化污水处理厂
	//initBlackSmelly();//初始化黑臭水体
	getPipeData();//设置总长度
})
var rsvrPage=""; var rsvrList="";//水库的当前页
var riverPage=""; var riverList="";//河流的当前页
var surdepPage=""; var surdepList="";//易涝点的当前页和数据
var pptnPage=""; var pptnList="";//雨情的当前页和数据
var wbsverPage=""; var wbsverList="";//河涌的当前页和数据
var stFactoryPage=""; var stFactoryList="";//污水处理厂的当前页和数据
var BlackSmellyPage=""; var BlackSmellyList="";//污水处理厂的当前页和数据
var gwzcdChart, xzqtjChart;
var gwzcdOption, xzqtjOption;
function initBlackSmelly(){
	 $.ajax({
        url : "/awater/subject/findBlackSmellyList",
        type:"post",
        dataType :"json",
        success:function(datas){
       	 var allCount = datas.allCount;
       	 var bl = "</b>总共<b>"+allCount+"</b>";
       	 $("#BlackSmellyCount").html(bl);
       	 BlackSmellyPage=1;//默认刚进来是第一页;
       	 BlackSmellyList = datas.list;
       	 appendData(BlackSmellyList,BlackSmellyPage,'BlackSmelly');
        },
        error:function(){
       	 layer.msg('获取列表失败...', { time: 1000 });
        }
    });
}
function initStFactory(){
	 $.ajax({
         url : "/awater/subject/findStFactoryList",
         type:"post",
         //data:{"sttp":"RR"},
         dataType :"json",
         success:function(datas){
        	 var allCount = datas.allCount;
        	 var bl = "</b>总共<b>"+allCount+"</b>";
        	 $("#stFactoryCount").html(bl);
        	 stFactoryPage=1;//默认刚进来是第一页;
        	 stFactoryList = datas.list;
        	 appendData(stFactoryList,stFactoryPage,'stFactory');
         },
         error:function(){
        	 layer.msg('获取列表失败...', { time: 1000 });
         }
     });
}
function initWbsver(){
	 $.ajax({
         url : "/awater/subject/getHechongList",
         type:"post",
         //data:{"sttp":"RR"},
         dataType :"json",
         success:function(datas){
        	 var allCount = datas.allCount;
        	 var bl = "</b>总共<b>"+allCount+"</b>";
        	 $("#hechongCount").html(bl);
        	 wbsverPage=1;//默认刚进来是第一页;
        	 wbsverList = datas.list;
        	 appendData(wbsverList,wbsverPage,'hechong');
         },
         error:function(){
        	 layer.msg('获取列表失败...', { time: 1000 });
         }
     });
}
function initRsvr(){
	 $.ajax({
         url : "/awater/subject/getStRsvrList",
         type:"post",
         dataType :"json",
         success:function(datas){
        	 rsvrPage=1;//默认刚进来是第一页;
        	 rsvrList = datas.list;
        	 var rsvrOrRiverCount =0;
        	 for(var i=0;i<rsvrList.length;i++){
        		 if(rsvrList[i].maxData>0){
        			 rsvrOrRiverCount++;
        		 }
        	 }
        	 var bl = "超汛限<b class='jj-rt'>"+rsvrOrRiverCount+"</b>总共<b>"+rsvrList.length+"</b>";
			$("#rsvrCount").html(bl);
        	 appendData(rsvrList,rsvrPage,'rsvr');
         },
         error:function(){
        	 layer.msg('获取列表失败...', { time: 1000 });
         }
     });
}

function initRiver(){
	 $.ajax({
         url : "/awater/subject/getStRiverList",
         type:"post",
         dataType :"json",
         success:function(datas){
        	 riverPage=1;//默认刚进来是第一页;
        	 riverList = datas.list;
        	 var rsvrOrRiverCount =0;
        	 for(var i=0;i<riverList.length;i++){
        		 if(riverList[i].maxData>0){
        			 rsvrOrRiverCount++;
        		 }
        	 }
        	 var bl = "超警戒<b class='jj-rt'>"+rsvrOrRiverCount+"</b>总共<b>"+riverList.length+"</b>";
			$("#riverCount").html(bl);
			 appendData(riverList,riverPage,'river');
         },
         error:function(){
        	 layer.msg('获取列表失败...', { time: 1000 });
         }
     });
}
function initSurdep(){
	 $.ajax({
        url : "/awater/subject/getAwaterallList",
        type:"post",
        data:{"sttp":"WL"},//可以用来区别是否要查询汛限值大于0,有值的话就查询汛限数量.没值的话,查询的就是全部数量
        dataType :"json",
        success:function(datas){
       	 var deplusCount = datas.deplusCount;
       	 var allCount = datas.allCount;
       	 var bl = "超汛限<b class='jj-rt'>"+deplusCount+"</b>总共<b>"+allCount+"</b>";
       	 $("#surdepCount").html(bl);
       	 surdepPage=1;//默认刚进来是第一页;
       	 surdepList = datas.list;
       	 appendData(surdepList, surdepPage,'surdep')
        },
        error:function(){
       	 layer.msg('获取列表失败...', { time: 1000 });
        }
    });
}
function initPptn(){
	 $.ajax({
       url : "/awater/subject/getNewPptnData",
       data:{ 
 		    "searchStrat":$("#searchStratPucture").html(),
            "searchEnd":$("#searchEndPucture").html()
			 },
       type:"post",
       dataType :"json",
       success:function(datas){
    	 pptnList = datas;
      	 var bl = "总共<b>"+pptnList.length+"</b>";
      	 $("#pptnCount").html(bl);
      	 pptnPage=1;//默认刚进来是第一页;
      	 appendPptnData(pptnList, pptnPage);
       },
       error:function(){
      	 layer.msg('获取列表失败...', { time: 1000 });
       }
   });
}
var pptnTr ="";
function appendPptnData(data,page){
	$("#pptn >tr").remove();
	for(var i=(page-1)*10;i<data.length && i<=page*10;i++){
		 var warn=""
		 var stnm = data[i].stnm;
		 var sumDate = data[i].sumData;
		 if(i%2==0){
				pptnTr =" <tr><td>"+stnm+"</td><td>"+toDecimal2(sumDate,2)+"</td>";
		 }else{
			 pptnTr = pptnTr+"<td>"+stnm+"</td><td>"+toDecimal2(sumDate,2)+"</td><tr>";
			 $("#pptn").append(pptnTr);
			 pptnTr="";
		 }
		 
	 }
}

function sumData(data){
	 var dataList = data.dataList;
	 var sumData=0;
	 for (var i = 0; i < dataList.length; i++) {
		 sumData =sumData+dataList[i].drp;
	 }
	 return sumData;
}

function getClass(wptn,maxData){
	var cls = "";
	if(maxData>0){
		if(wptn==5){
			cls="s-h";
		}else if(wptn==6){
			cls="cp-h";	
		}else{
			cls="j-h";
		}
	}else{
		if(wptn==5){
			cls="s-l";
		}else if(wptn==6){
			cls="cp-l";
		}else{
			cls="j-l";
		}
	}
	return cls;
}
function moreBlackSmelly(){
	 layer.open({
       type: 2,
       content: ["/awater/view/app/resourceContainer/variousStations/BlackSmellyist.html", 'no'],
       title: "黑臭水体监测",
        area: ['90%', '95%'],
       btn: []
   });
}
function moreRsvr(){
	 layer.open({
        type: 2,
        content: ["/awater/view/app/resourceContainer/variousStations/rsvrList.html", 'no'],
        title: "重点水库水位 ",
         area: ['90%', '95%'],
        btn: []
    });
}
function moreRiver(){
	 layer.open({
        type: 2,
        content: ["/awater/view/app/resourceContainer/variousStations/riverList.html", 'no'],
        title: "重点江河水位",
         area: ['90%', '95%'],
        btn: []
    });
}
function moreSurdep(){
	 layer.open({
        type: 2,
        content: ["/awater/view/app/resourceContainer/variousStations/surdepList.html", 'no'],
        title: "积水点",
         area: ['90%', '95%'],
        btn: []
    });
}
function moreRian(){
	 layer.open({
        type: 2,
        content: ["/awater/view/app/resourceContainer/variousStations/rianList.html", 'no'],
        title: "城区雨情监测",
         area: ['90%', '95%'],
        btn: []
    });
}
function moreWbsver(){
	 layer.open({
        type: 2,
        content: ["/awater/view/app/resourceContainer/variousStations/wbsverList.html", 'no'],
        title: "水质公示(环保局) ",
         area: ['90%', '95%'],
        btn: []
    });
}
function moreStFactory(){
	 layer.open({
        type: 2,
        content: ["/awater/view/app/resourceContainer/variousStations/stfactoryList.html", 'no'],
        title: "污水处理厂进出口水质 ",
        area: ['90%', '95%'],
        btn: []
    });
}

//加载分页的数据
function appendData(data,page,table){
	$("#"+table+" >tr").remove();
	for(var i=(page-1)*5;i<data.length && i<page*5;i++){
		 var tr="";
		 if(table=="surdep"){//积水点,易涝点
			 var addvcd = data[i].addvcd;
			 tr=" <tr class="+warn+"> <td>"+addvcd+"</td> <td>"+stnm+"</td><td>"+newdata+"<i class="+cls+"></i></td> <td>"+data[i].lastTimeMaxData+"</td><td>"+data[i].maxData+"</td> <td>"+fsltdz+"</td></tr>";
		 }else if(table=="hechong"){
			 tr="<tr> <td>"+data[i].hcmc+"</td><td>"+data[i].ssxzq+"</td><td>"+toDecimal2(data[i].ad,3)+"</td><td>"+toDecimal2(data[i].zl,3)+"</td>" +
			     "<td>"+toDecimal2(data[i].hxqyl,2)+"</td> <td>"+toDecimal2(data[i].rjy,2)+"</td><td>"+toDecimal2(data[i].tmd,2)+"</td> " +
			 	"<td>"+data[i].szzs+"</td><td class='"+data[i].szlb+"'>"+data[i].szlb+"</td><td>"+data[i].sfhc+"</td> <td>"+data[i].jcny+"</td> </tr>";
		 }else if(table=="stFactory"){
			 tr="<tr> <td>"+data[i].stnm+"</td><td>"+data[i].addvcd+"</td><td>"+data[i].sptDate+"</td><td>"+toDecimal2(data[i].nh3n,3)+"</td>" +
		     "<td>"+toDecimal2(data[i].tp,3)+"</td> <td>"+toDecimal2(data[i].tn,3)+"</td><td>"+toDecimal2(data[i].ph,2)+"</td> " +
		 	"<td>"+toDecimal2(data[i].ss,2)+"</td><td>"+toDecimal2(data[i].q2,2)+"</td><td>"+toDecimal2(data[i].codcr,2)+"</td> </tr>";
		 }else if(table=="BlackSmelly"){
			 tr="<tr> <td>"+data[i].stnm+"</td><td>"+data[i].redox+"</td><td>"+data[i].humid+"</td><td>"+data[i].codcr+"</td>" +
		     "<td>"+data[i].nh3n+"</td> <td>"+data[i].dox+"</td><td>"+data[i].tn+"</td> " +
		 	"<td>"+data[i].tp+"</td><td>"+data[i].clar_ity+"</td><td>"+data[i].envt+"</td>"+ 
		 	"<td>"+data[i].q2+"</td><td class='"+waterQualityFormatter('color',data[i].water_quality)+"'>"+waterQualityFormatter('type',data[i].water_quality)+"</td><td>"+blackSmellyFormatter(data[i].black_Smelly)+"</td><td>"+data[i].sptDate+"</td></tr>";
		 }else {
			var warn=""
			var cls = getClass(data[i].wptn,data[i].maxData);//升降的样式,需要判断
			if(data[i].maxData>0){
				warn= "warn";//行的样式,红的 
			}
			tr = " <tr class="+warn+"><td>"+data[i].stnm+"</td><td>"+toDecimal2(data[i].rz,2)+"<i class="+cls+"></i></td><td>"+toDecimal2(data[i].fsltdz,2)+"</td></tr>";
		 }
		 $("#"+table).append(tr);
	 }
	setColor();
}

function waterQualityFormatter(type,value){
    var waterQuality="";
    var color = "";
    if (value ==6) {
        waterQuality="劣Ⅴ类";
        color="FE5408"; 
    } else if (value ==5) {
        waterQuality="Ⅴ类";
        color="FFC206"; 
    } else if (value ==4) {
        waterQuality="Ⅳ类";
        color="27B45E"; 
    } else if (value ==3){
        waterQuality="Ⅲ类";
        color="5DD324"; 
    } else if (value ==2){
        waterQuality="Ⅱ类";
        color="14ABF0"; 
    }  else if (value ==1){
        waterQuality="Ⅰ类";
        color="16C7F6"; 
    }
    if(type=='color'){
    	return color;
    }else{
    	return waterQuality;
    }
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
function setColor(){
	$(".16C7F6").each(function(){
		var td= $(this);
		td.css("background-color","#16C7F6");
	})
	$(".14ABF0").each(function(){
		var td= $(this);
		td.css("background-color","#14ABF0");
	})
	$(".5DD324").each(function(){
		var td= $(this);
		td.css("background-color","#5DD324");
	})
	$(".27B45E").each(function(){
		var td= $(this);
		td.css("background-color","#27B45E");
	})
	$(".FFC206").each(function(){
		var td= $(this);
		td.css("background-color","#FFC206");
	})
	$(".FE5408").each(function(){
		var td= $(this);
		td.css("background-color","#FE5408");
	})
	
	$(".劣Ⅴ类").each(function(){
		var td= $(this);
		td.css("background-color","#FE5408");
	})
	$(".Ⅴ类").each(function(){
		var td= $(this);
		td.css("background-color","#FFC206");
	})
	$(".Ⅳ类").each(function(){
		var td= $(this);
		td.css("background-color","#27B45E");
	})
	$(".Ⅲ类").each(function(){
		var td= $(this);
		td.css("background-color","#5DD324");
	})
	$(".Ⅱ类").each(function(){
		var td= $(this);
		td.css("background-color","#14ABF0");
	})
	$(".Ⅰ类").each(function(){
		var td= $(this);
		td.css("background-color","#16C7F6");
	})
}
function paGing(type,About){
	//水库的分页
	if(type=='rsvr'){
		if(About=='shang'){
			if(rsvrPage==1){
				return;
			}else{
				rsvrPage = rsvrPage-1;
				appendData(rsvrList,rsvrPage,type);
			}
		}else{
			if(rsvrPage>=rsvrList.length/5){
				return;
			}else{
				rsvrPage = rsvrPage+1;
				appendData(rsvrList,rsvrPage,type);
			}
		}
		//河道的分页
	}else if(type=='river'){
		if(About=='shang'){
			if(riverPage==1){
				return;
			}else{
				riverPage = riverPage-1;
				appendData(riverList,riverPage,type);
			}
		}else{
			if(riverPage>=riverList.length/5){
				return;
			}else{
				riverPage = riverPage+1;
				appendData(riverList,riverPage,type);
			}
		}
	}else if(type=='surdep'){
		if(About=='shang'){
			if(surdepPage==1){
				return;
			}else{
				surdepPage = surdepPage-1;
				appendData(surdepList,surdepPage,type);
			}
		}else{
			if(surdepPage>surdepList.length/5){
				return;
			}else{
				surdepPage = surdepPage+1;
				appendData(surdepList,surdepPage,type);
			}
		}
	}else if(type=='pptn'){
		if(About=='shang'){
			if(pptnPage==1){
				return;
			}else{
				pptnPage = pptnPage-1;
				appendPptnData(pptnList,pptnPage);
			}
		}else{
			if(pptnPage>=pptnList.length/10){
				return;
			}else{
				pptnPage = pptnPage+1;
				appendPptnData(pptnList,pptnPage);
			}
		}
	}else if(type=='hechong'){
		if(About=='shang'){
			if(wbsverPage==1){
				return;
			}else{
				wbsverPage = wbsverPage-1;
				appendData(wbsverList,wbsverPage,type);
			}
		}else{
			if(wbsverPage>=wbsverList.length/5){
				return;
			}else{
				wbsverPage = wbsverPage+1;
				appendData(wbsverList,wbsverPage,type);
			}
		}
	}else if(type=='stFactory'){
		if(About=='shang'){
			if(stFactoryPage==1){
				return;
			}else{
				stFactoryPage = stFactoryPage-1;
				appendData(stFactoryList,stFactoryPage,type);
			}
		}else{
			if(stFactoryPage>=stFactoryList.length/5){
				return;
			}else{
				stFactoryPage = stFactoryPage+1;
				appendData(stFactoryList,stFactoryPage,type);
			}
		}
	}else if(type=='BlackSmelly'){
		if(About=='shang'){
			if(BlackSmellyPage==1){
				return;
			}else{
				BlackSmellyPage = BlackSmellyPage-1;
				appendData(BlackSmellyList,BlackSmellyPage,type);
			}
		}else{
			if(BlackSmellyPage>=BlackSmellyList.length/5){
				return;
			}else{
				BlackSmellyPage = BlackSmellyPage+1;
				appendData(BlackSmellyList,BlackSmellyPage,type);
			}
		}
	}
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
//强制保留2位小数，如：2，会在2后面补上00.即2.00    
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
function inputTime(){//默认时间设置
    $("#searchEndPucture").html(dqTimeformatter());
    $("#searchStratPucture").html(dqTimeformatters());
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
