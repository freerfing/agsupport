var monthName=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
Date.prototype.FormatNew = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o){
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	}
	return fmt;
}
function getLocalTime(nS) {     
	return new Date(parseInt(nS)).FormatNew("yyyy-MM-dd hh:mm:ss");
}

function getLocalDate(nS) {     
	return new Date(parseInt(nS)).FormatNew("yyyy-MM-dd");
}

function getCNLocalTime(nS) {
	return new Date(parseInt(nS)).FormatNew("yyyy年MM月dd日 hh时mm分ss秒");
}
function getCNLocalTimeDAY(nS) {
	return new Date(parseInt(nS)).FormatNew("yyyy年MM月dd日");
}

function getDateTime(nS) {     
	return new Date(parseInt(nS));
}
function getUTCString(strDate){
	var date=new Date(strDate.replace(/-/g,"/"));
	var strDate=monthName[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	return strDate;
}
function getTimeLong(strDate){
	var date=new Date(strDate.replace(/-/g,"/"));
	var time_sec = Math.floor(date.getTime());
	return time_sec;
}