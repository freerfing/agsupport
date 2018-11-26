$(function () {
    initRsvr();//初始化重点水库
    initRsvrs();//初始化水库超过总数的数量
    initRiver();//初始化江河水位
    initPptn();//初始化雨情列表
    initTqyb();//初始化天气预报
    initYLDChart();//初始化易涝点图
})

var zdsk = {
    "C440184041": "流溪河水库",//重点水库
    "C440184011": "黄龙带水库",
    "C440183011": "梅州水库",
    "C440111031": "和龙水库",
    "C440116211": "木强水库"
};

function sortZDSKList(dataList){
	var resultList=[];
	var zdList=[];
	for(var i=0;i<dataList.length;i++){
		if(zdsk[dataList[i].stcd]){
            zdList.push(dataList[i]);
		}else{
			resultList.push(dataList[i]);
		}
	}
	var sortZDList=[];
	for(var key in zdsk){
		for(var i=0;i<zdList.length;i++){
			if(zdList[i].stcd==key){
                sortZDList.push(zdList[i]);
			}
		}
	}
	resultList=sortZDList.concat(resultList);
	return resultList;
}

var rsvrPage=""; var rsvrList="";//水库的当前页
var riverPage=""; var riverList="";//河流的当前页
var surdepPage=""; var surdepList="";//易涝点的当前页和数据
var pptnPage=""; var pptnList="";//雨情的当前页和数据
var rsvrsPage=""; var rsvrsList="";//水库的当前页
function initRsvr(){
	 $.ajax({
         url : "/awater/subject/getStRsvrList",
         type:"post",
         dataType :"json",
         success:function(datas){
        	 var rsvrOrRiverCount=0;
        	 rsvrPage=1;//默认刚进来是第一页;
			 var dataList=datas.list
        	 rsvrList = sortZDSKList(dataList);
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
        	 ////layer.msg('获取列表失败...', { time: 1000 });
         }
     });
}
function initTqyb(){
	//抓取天气预报信息
	 $.ajax({
      url : "/awater/subject/getWeather",
      type:"post",
      dataType :"json",
      success:function(datas){
      	var content = datas.content;
      	$("#tqyb").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+content);
      },
      error:function(){
     	 //layer.msg('获取天气预报失败...', { time: 1000 });
      }
  });
}
function initRsvrs(){
	 $.ajax({
         url : "/awater/subject/getStRsvrList",
         type:"post",
         data:{'sttp':'RR'},
         dataType :"json",
         success:function(datas){
        	 rsvrsList = datas.list;
        	 rsvrsPage = 1;
        	 $("#rsvrCounts").html(rsvrsList.length+"个");
        	 $("#rsvrCountss").html(rsvrsList.length+"个");
    		 appendData(rsvrsList,rsvrsPage,'rsvrTab');
        },
         error:function(){
        	 //layer.msg('获取列表失败...', { time: 1000 });
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
        	 var bl = "警戒值<b class='jj-rt'>"+rsvrOrRiverCount+"</b>总共<b>"+riverList.length+"</b>";
			$("#riverCount").html(bl);
        	appendData(riverList, riverPage,'river');
         },
         error:function(){
        	// ////layer.msg('获取列表失败...', { time: 1000 });
         }
     });
}

function initSurdep(){
	$("#surdep >tr").remove();
	 $.ajax({
        url : "/awater/subject/getAwaterallList",
        type:"post",
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
       	// ////layer.msg('获取列表失败...', { time: 1000 });
        }
    });
}

function initPptn() {//1小时雨情列表
    var endTime=new Date();
    var endHour=endTime.getHours();
    var startTime=getLastHour(8-endHour-24);
    var data="curPage=1&perPageCount=9999&startTime="+startTime.Format("yyyy-MM-dd hh:mm:ss")+"&endTime="+endTime.Format("yyyy-MM-dd hh:mm:ss")+"&xzq=&stsysArr=水文遥测,智能水网,气象局&rainfall=";
    $.ajax({
        url: "/awater/subject/listStPptnRPage",
        type: "post",
		data:data,
        dataType: "json",
        success: function (datas) {
            pptnPage = 1;//默认刚进来是第一页;
            pptnList = datas.content.list;
            var bl = "<span>总共<span class='nub-red'>" + pptnList.length + "</span></span>"
            $("#pptnCount").html(bl);
            appendPptnData(pptnList, pptnPage);
        },
        error: function () {
            ////layer.msg('获取列表失败...', { time: 1000 });
        }
    });
}

var pptnTr ="";
function appendPptnData(data,page){
	$("#pptn tr:not(:first)").remove();
	for(var i=(page-1)*10;i<data.length && i<=page*10;i++){
		 var warn=""
	     var drp=data[i].sumDrp;
		 var stnm = data[i].stnm;
		 var addvcd = data[i].addvcd;
		 var cls =""; //getClass(newdata,olddata,deplus);//升降的样式,需要判断
		 if(i%2==0){
				pptnTr =" <tr class="+warn+"><span class="+warn+"><td>"+stnm+"</td></span><td>"+drp+"</td>";
		 }else{
			 pptnTr = pptnTr+"<td>"+stnm+"</td><td>"+drp+"<i class="+cls+"></i></td><tr>";
			 $("#pptn").append(pptnTr);
			 pptnTr="";
		 }
		 
	 }
}

function getClass(wptn,maxData){
	var cls = "";
	if(maxData>0){
		if(wptn==5){
			cls="red-up.png";
		}else if(wptn==6){
			cls="-.png";	
		}else{
			cls="red-down.png";
		}
	}else{
		if(wptn==5){
			cls="blue-up.png";
		}else if(wptn==6){
			cls="-.png";
		}else{
			cls="blue-down.png";
		}
	}
	return cls;
}
function moreRsvr(){
	 layer.open({
        type: 2,
        content: ["/awater/view/app/resourceContainer/variousStations/rsvrList.html", 'no'],
        title: "水库水位",
        area: ['55%', '75%'],
        btn: []
    });
}
//加载分页的数据
function appendData(data,page,table){
	$("#"+table+" tr:not(:first)").remove();
	if(table=='rsvrTab'){
		 $("#rsvrTab").append("<tr><td>站名</td><td>当前水位(m)</td><td>汛限/警戒值</td></tr>");
	}
	for(var i=(page-1)*5;i<data.length && i<page*5;i++){
		 var fsltdz = data[i].fsltdz;
		 var stnm = data[i].stnm;
		 var rz = data[i].rz;
		 var tr="";
		 if(table=="surdep"){//积水点,易涝点
			 var addvcd = data[i].addvcd;
			 tr=" <tr class="+warn+"> <td>"+addvcd+"</td> <td>"+stnm+"</td><td>"+newdata+"<i class="+cls+"></i></td> <td>"+data[i].lastTimeMaxData+"</td><td>"+data[i].maxData+"</td> <td>"+fsltdz+"</td></tr>";
		 }else{
			var warn=""
			var cls = getClass(data[i].wptn,data[i].maxData);//升降的样式,需要判断
			if(data[i].maxData>0){
				warn= "warn";//行的样式,红的 
			}
			tr = "<tr><td><span class="+warn+">"+stnm+"</span></td><td><span class="+warn+">"+rz+"</span><img src='img/"+cls+"' /></td><td><span class="+warn+">"+fsltdz+"</span></td></tr>";
		 }
		 $("#"+table).append(tr);
	 }
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
			if(rsvrPage>rsvrList.length/4){
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
			if(surdepPage>=surdepList.length/5){
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
			if(pptnPage>=pptnList.length/8){
				return;
			}else{
				pptnPage = pptnPage+1;
				appendPptnData(pptnList,pptnPage);
			}
		}
	}else if(type=='rsvrTab'){
		if(About=='shang'){
			if(rsvrsPage==1){
				return;
			}else{
				rsvrsPage = rsvrsPage-1;
				appendData(rsvrsList,rsvrsPage,type);
			}
		}else{
			if(rsvrsPage>=rsvrsList.length/5){
				return;
			}else{
				rsvrsPage = rsvrsPage+1;
				appendData(rsvrsList,rsvrsPage,type);
			}
		}
	}
}
