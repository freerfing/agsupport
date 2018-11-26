define(["http", "jquery"], function(http, $) {
	
	var _dateTime = null;
	
	var DateUtils = {
		
        formatDate : function(date, format) {
        	format = format || "yyyy-MM-dd hh:mm:ss";
        	var o = {
        		"M+" :  date.getMonth()+1,  //month
        		"d+" :  date.getDate(),     //day
        		"h+" :  date.getHours(),    //hour
        		"m+" :  date.getMinutes(),  //minute
        		"s+" :  date.getSeconds(), //second
        		"q+" :  Math.floor((date.getMonth()+3)/3),  //quarter
        		"S"  :  date.getMilliseconds() //millisecond
        	}
        	
        	if (/(y+)/.test(format)) {
        		format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        	}
        	
        	for (var k in o) {
        		if (new RegExp("("+ k +")").test(format)) {
        			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        		}
        	}
        	return format;
        },
        
        formatTimestamp: function(value, format) {
			var date = new Date(value);
			return DateUtils.formatDate(date, format);
		},
		
		// only support yyyy-MM-dd and yyyy-MM-dd HH:mm:ss
		stringToDate: function(dateStr){
			var re1 = /^[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$/;
			var re2 = /^[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}\s[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$/;
			var date;
			if(re1.test(dateStr)){
				date = dateStr.split("-");
				if(date[1].indexOf("0") == 0){
					date[1] = date[1].substr(1);
				}
				return new Date(date[0], parseInt(date[1]) - 1, date[2]);
			}else if(re2.test(dateStr)){
				var re3 = /:/g;
				var re4 = /\s/g;
				dateStr = dateStr.replace(re3, "-").replace(re4, "-");
				date = dateStr.split("-");
				if(date[1].indexOf("0") == 0){
					date[1] = date[1].substr(1);
				}
				return new Date(date[0], parseInt(date[1]) - 1, date[2], date[3], date[4], date[5]);
			}else{
				return null;
			}
		}
	};
	
	return DateUtils;
});