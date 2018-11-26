var limit50=50,limit100=100;
var limit50=5,limit100=10;//测试
var yqTemplate=
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昨天08时至今，全市有<span class="nub-green">${N}个区</span>发生降雨，最大降雨出现在<span class="nub-green">${station}</span>，累计雨量为<span class="nub-green">${stationValue}毫米</span>。 当前1小时降雨量大于50毫米的雨量站'+
    '<span class="nub-green">${1h}个</span>； 当前3小时降雨量大于100毫米的雨量站'+
    '<span class="nub-green">${3h}个</span>';
function initYQ(){
	var endTime=new Date();
	var endHour=endTime.getHours();
	var startTime=getLastHour(8-endHour-24);
	$.ajax(
		{
			url:"/awater/subject/listYLByTime",
			cache:false,
			data:"startTime="+startTime.Format("yyyy-MM-dd hh:mm:ss")+"&endTime="+endTime.Format("yyyy-MM-dd hh:mm:ss"),
			dataType:"json",
			success:function(data){
                var result=yqTemplate;
                var date=new Date();
                var hour=date.getHours();
                var minute=date.getMinutes();
                var maxStation=getMaxRain(data);
                document.body.innerHTML=result.replace("${time}",hour+"时"+minute+"分")
                    .replace("${N}",getRainCount(data)).replace("${station}",maxStation.name).replace("${stationValue}",maxStation.value)
                    .replace("${1h}",get1H50Count(data)).replace("${3h}",get3H100Count(data));
			},
			error:function(){

			}
		}
	);
}

function getLastHour(num){
    var date=new Date();
    var hour=date.getHours();
    var fullYear=date.getFullYear();
    var month=date.getMonth();
    var d=date.getDate();
    date.setFullYear(fullYear);
    date.setMonth(month);
    date.setDate(d);
    date.setHours(hour+num);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}

function getRainCount(data){//获取下雨的行政区个数
	var obj={},count=0;
	for(var i=0;i<data.length;i++){
		if(!obj[data[i].ADDVCD]){
            obj[data[i].ADDVCD]="1";
		}
	}
	for(var key in obj) count++;
	return count;
}

function getMaxRain(data){//获取最大雨量的站名及值
	var obj={};
    for(var i=0;i<data.length;i++){
        if(!obj[data[i].STNM]){
            obj[data[i].STNM]={name:data[i].STNM,value:data[i].DRP};
        }else{
        	 obj[data[i].STNM].value+=data[i].DRP;
		}
    }
    var maxValue=0,maxName="";
    for(var name in obj){
		if(obj[name].value>maxValue) {
			maxValue=obj[name].value;
			maxName=name;
		}
	}
	return {name:maxName,value:maxValue.toFixed(2)}
}

function get1H50Count(data){//获取1小时内降雨大于50毫米的站
	var lastDate=getLastHour(-1).Format("yyyy-MM-dd hh:mm:ss");
	var count=0;
	for(var i=0;i<data.length;i++){
		var item=data[i];
		var thisTime=(new Date(item.TM)).Format("yyyy-MM-dd hh:mm:ss");
		if(thisTime==lastDate && item.DRP>=limit50){
			count++;
		}
	}
	return count;
}

function get3H100Count(data) {//获取3小时降雨大于100毫米的站
    var lastHoursArr = [getLastHour(-1).Format("yyyy-MM-dd hh:mm:ss"),
						getLastHour(-2).Format("yyyy-MM-dd hh:mm:ss"),
						getLastHour(-3).Format("yyyy-MM-dd hh:mm:ss")
						];
    var resultObj={};
    var count=0;
    for (var i = 0; i < data.length; i++) {
		var item=data[i];
		var name=item.STNM;
		var thisTime=(new Date(item.TM)).Format("yyyy-MM-dd hh:mm:ss");
		if(!resultObj[name]){
			resultObj[name]=0;
		}
		if(thisTime==lastHoursArr[0] ||thisTime==lastHoursArr[1] ||thisTime==lastHoursArr[2])
        	resultObj[name]+=item.DRP;
    }
    for(var key in resultObj){
    	if(resultObj[key]>=limit100) {
    		count++;
    	}
	}
    return count;
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}