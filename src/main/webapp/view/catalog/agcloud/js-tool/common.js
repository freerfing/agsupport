//初始化执行
$(document).ready(function(){

	//初始化宽度、高度
	var page = $(".agcloud-ui-page");
	page.width($(window).width()-20);
	page.height($(window).height()-20);

	//当文档窗口发生改变时 触发
	$(window).resize(function(){
		page.width($(window).width()-20);
		page.height($(window).height()-20);
	});

	//支持表格组件放置linkbutton
	$('.easyui-datagrid').datagrid({
		pageSize: 20,
		onLoadSuccess: function(data){
			$(".ex-grid-operate").linkbutton();
		}
	})
});

// AgCloud JS
function initEasyuiContentLayout(id) {
	//var width = $(window).width()-20;
	var width = $(window).width()-15;
	//var height = $(window).height()-55;
	var height = $(window).height()-55;
	var layout = $("#"+id);
	layout.attr("style", "width:"+width+"px;height:"+height+"px");
	layout.layout();
	$(window).resize(function(){
		layout.layout('resize',{
			//width: $(window).width()-20,
			width: $(window).width()-15,
			//height: $(window).height()-55
			height: $(window).height()-55
		});
	})
}

function initEasyuiContentPanel(id) {
	//var width = $(window).width()-20;
	var width = $(window).width()-10;
	//var height = $(window).height()-55;
	var height = $(window).height()-20;
	var panel = $("#"+id);
	panel.attr("style", "width:"+width+"px;height:"+height+"px");
	panel.panel();
	$(window).resize(function(){
		panel.panel('resize',{
			//width: $(window).width()-20,
			width: $(window).width()-10,
			//height: $(window).height()-55
			height: $(window).height()-20
		});
	})
}
//加载用户账号列表，用于选择成员
function loadUserAcount(){
	var mutiSelectFlag=$('#membersDialog').data('mutiSelectFlag');
	//加载成员列表
	$('#members_datagrid').datagrid({
		url: ctx+'/erp/proj/info/members/listUserAcountByPage.do',
		pageSize:10,
		singleSelect: !mutiSelectFlag,
		onDblClickRow: function (rowIndex, rowData) {
			selectMembersCommon();
		}
	});
}
//成员列表查询方法
function searchMembersCommon(){
	var condition = $("#memberCondition").combobox('getValue');
	var keyword = $("#memberKeyword").textbox('getValue');
	var mutiSelectFlag=$('#membersDialog').data('mutiSelectFlag');
	//加载成员列表
	$('#members_datagrid').datagrid({
		url: ctx+'/erp/proj/info/members/listUserAcountByPage.do?'+condition+'='+keyword,
		pageSize:10,
		singleSelect:!mutiSelectFlag,
		onDblClickRow: function (rowIndex, rowData) {
			selectMembersCommon();
		}
	});
}
function loadOrgDefaultAllForCommon(argInputId,myurl,editable,otherInputId){
	var inputId='#'+argInputId;
	if(editable){editable=true;}else {
		editable=false;
	}
	$(inputId).combotree({
		editable:editable,
		dataPlain: true, //继承于 easyui-tree 的扩展
		parentField: 'parentOrgId', //继承于 easyui-tree 的扩展
		//如果要包含单位 本身则用/opus/om/org/getOrgForComboTree.do?id=A  getOrgChildsForComboTree
		url:myurl,
		height:25,
		onSelect:function(value){
			/*alert(value.id);*/
			$(inputId).data('bindDataId',value.id)
			if(otherInputId){
				$('#'+otherInputId).val(value.id)
			}else{

			}
		},
		onLoadSuccess:function() {
			if(otherInputId){
				$(inputId).combotree('setValue', $(inputId).data('bindDataId'));
				$(inputId).combotree('setValue',$('#'+otherInputId).val());
			}else{
				//默认选中第一个
				var node = $(inputId).combotree("tree").tree('getRoot');
				if(node){
					$(inputId).combotree("setValue", node.id);
					$(inputId).data('bindDataId',node.id);
				}
			}
		}
	});

}

//加载组织机构树型下拉框
function loadOrgDefaultAll(argInputId,editable,otherInputId) {
	myurl=ctx+'/opus/om/org/getOrgForComboTree.do?id=A';
	loadOrgDefaultAllForCommon(argInputId,myurl,editable,otherInputId);
}
//登陆用户组织机构下拉框
function loadOrgForLoginUser() {

}
//加载项目节点树型下拉框
//ctx+'erp/proj/plan/node/projPlanNodeTreeEeasyUIList.do',
function  localProjPlanNode(argInputId,myyrl,projPlanNodeId) {
	var inputId='#'+argInputId;
	$(inputId).clear();
	$(inputId).removeData('bindDataId');
	$(inputId).combotree({
		dataPlain: true, //继承于 easyui-tree 的扩展
		parentField: 'parentPlanNodeId', //继承于 easyui-tree 的扩展
		url:myyrl,
		height:25,
		onSelect:function(value){
			alert(value.id);
			$(inputId).data('bindDataId',value.id)
		},
		onLoadSuccess:function() {
			if($(inputId).data('bindDataId')) {
				$(inputId).combotree('setValue', $(inputId).data('bindDataId'));
			}else if(projPlanNodeId) {
				$(inputId).combotree('setValue', $(inputId).data('bindDataId'));
			}else{
				//默认选中第一个
				var node = $(inputId).combotree("tree").tree('getRoot');
				if(node){
					$(inputId).combotree("setValue", node.id);
					$(inputId).data('bindDataId',node.id);
				}
			}
		}
	});
}

// EasyUI 汉化
/*if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '第';
	$.fn.pagination.defaults.afterPageText = '共{pages}页';
	$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '确定';
	$.messager.defaults.cancel = '取消';
}
$.map(['validatebox','textbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '该输入项为必输项';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
	$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
	$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
	$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
	$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
}*/
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '今天';
	$.fn.datebox.defaults.closeText = '关闭';
	$.fn.datebox.defaults.okText = '确定';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		if (!s) return new Date();
		if(typeof(s) == 'object') {
			return s;
		}
		//modify by sam 2016-11-01 加了如果为数字格式日期不需要转换
		if(typeof(s)!='number'){
			var ss = s.split('-');
			var y = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var d = parseInt(ss[2],10);
			if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
				return new Date(y,m-1,d);
			} else {
				return new Date();
			}
		}
		if(!isNaN(s)) {
			return new Date(s);
		}
	};
}

if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
if ($.fn.datetimespinner){
	$.fn.datetimespinner.defaults.selections = [[0,4],[5,7],[8,10],[11,13],[14,16],[17,19]]
}

//月份选择控件
function initOnlyMonthDateBox(dateboxId){
	dateboxId='#'+dateboxId;
$(dateboxId).datebox({
	onShowPanel : function() {// 显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
		span.trigger('click'); // 触发click事件弹出月份层
		if (!tds)
			setTimeout(function() {// 延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔
				tds = p.find('div.calendar-menu-month-inner td');
				tds.click(function(e) {
					e.stopPropagation(); // 禁止冒泡执行easyui给月份绑定的事件
					var year = /\d{4}/.exec(span.html())[0]// 得到年份
						, month = parseInt($(this).attr('abbr'), 10) ; // 月份
					$(dateboxId).datebox('hidePanel')// 隐藏日期对象
						.datebox('setValue', year + '-' + month+'-'+1); // 设置日期的值
				});
			}, 0);
	},
	parser : function(s) {// 配置parser，返回选择的日期
		if (!s)
			return new Date();
		var date=new Date(s);
		 return date;
		/*var arr = s.split('-');
		return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);*/
	},
	formatter : function(d) {
		var month = d.getMonth();
		month=parseInt(month)+1;
		if(month<=10){
			month = "0"+month;
		}
		/*if (d.getMonth() == 0) {
			return d.getFullYear()-1 + '-' + 12;
		} else {
			return d.getFullYear() + '-' + month;
		}*/
		return d.getFullYear() + '-' + month;
	}// 配置formatter，只返回年月
	});
	var p = $(dateboxId).datebox('panel'), // 日期选择对象
	tds = false, // 日期选择对象中月份
	span = p.find('span.calendar-text'); // 显示月份层的触发控件
}
//数字的货币化
// Extend the default Number object with a formatMoney() method:
// usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
// defaults: (2, "$", ",", ".")
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this,
		negative = number < 0 ? "-" : "",
		i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
/**
 * 居中打开新窗口
 */
function openCenterFixedWindow(url, width, height){
	var x = (screen.availWidth - width) / 2;
	var y = (screen.availHeight - height) / 2;
	var param = "left="+x+",top="+y+",width="+width+",height="+height;
	param += ',toolbar=no,menubar=no,status=yes,locationbar=no,directories=no,scrollbars=yes,resizable=yes';
	//var handle= window.open(url, '_blank', param);//钉钉不支持
	var handle= window.location.href=url;
	return handle;
}

/**
 * 居中打开新窗口
 */
function openCenterWindow(url){
	var param = "left=0,top=0,width="+screen.availWidth+",height="+screen.availHeight;
	param += ',toolbar=no,menubar=no,status=yes,locationbar=no,directories=no,scrollbars=yes,resizable=yes';
	var handle= window.open(url, '_blank', param);
	return handle;
}

//格式化日期
function formatDateTime(cellValue, options, rowObject){
	var d = new Date(cellValue);
	return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}
//判断是否是IE浏览器
function checkIsIE(){
	if(-[1,]){
		alert("这不是IE浏览器！");
	}else{
		alert("这是IE浏览器！");
	}
}

/**
 * 去左空格
 */
function ltrim(s){
	return s.replace( /^\s*/, "");
}

/**
 * 去右空格
 */
function rtrim(s){
	return s.replace( /\s*$/, "");
}

/**
 * 去左右空格
 */
function trim(s){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 可以在一个任意深度的iframe中调用父iframe中的方法
 */
function getRootWindow(){
	var win = window;
	while (win != win.parent){
		win = win.parent;
	}
	return win;
}
/*表单元素的数据转JSON对象
* created by GaoK
*/
$.fn.serializeObject = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1, // month
		"d+": this.getDate(), // day
		"h+": this.getHours(), // hour
		"m+": this.getMinutes(), // minute
		"s+": this.getSeconds(), // second
		"q+": Math.floor((this.getMonth() + 3) / 3), // quarter
		"S": this.getMilliseconds()
		// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};

//日期格式转换
function formatDatebox(value) {
	if (value == null || value == '') {
		return '';
	}
	var dt;
	if (value instanceof Date) {
		dt = value;
	} else {
		dt = new Date(value);
	}
	return dt.format("yyyy-MM-dd hh:mm:ss"); //扩展的Date的format方法(上述插件实现)
}

//日期格式转换  年月日
function formatDateWithoutTime(value) {
	if (value == null || value == '') {
		return '';
	}
	var dt;
	if (value instanceof Date) {
		dt = value;
	} else {
		dt = new Date(value);
	}
	return dt.format("yyyy-MM-dd"); //扩展的Date的format方法(上述插件实现)
}
//日期格式转换  年月
function formatDateWithoutDate(value) {
	if (value == null || value == '') {
		return '';
	}
	var dt;
	if (value instanceof Date) {
		dt = value;
	} else {
		dt = new Date(value);
	}
	return dt.format("yyyy-MM"); //扩展的Date的format方法(上述插件实现)
}
//日期格式转换  年月
function formatDateWithoutDateDaiDing(value) {
	if (value == null || value == '') {
		return '待定';
	}
	var dt;
	if (value instanceof Date) {
		dt = value;
	} else {
		dt = new Date(value);
	}
	return dt.format("yyyy-MM"); //扩展的Date的format方法(上述插件实现)
}


//扩展easyui表单的验证  ,返回false表示不通过
$.extend($.fn.validatebox.defaults.rules, {
	//验证汉字
	CHS: {
		validator: function (value) {
			return /^[\u0391-\uFFE5]+$/.test(value);
		},
		message: 'The input Chinese characters only.'
	},
	//移动手机号码验证
	Mobile: {//value值为文本框中的值
		validator: function (value) {
			var reg = /^1[3|4|5|8|9]\d{9}$/;
			return reg.test(value);
		},
		message: 'Please enter your mobile phone number correct.'
	},
	//国内邮编验证
	ZipCode: {
		validator: function (value) {
			var reg = /^[0-9]\d{5}$/;
			return reg.test(value);
		},
		message: 'The zip code must be 6 digits and 0 began.'
	},
	//数字
	Number: {
		validator: function (value) {
			// var reg =/^[0-9]*$/;
			var reg=/^[0-9]+(\.[0-9]+)?$/;
			return reg.test(value);
		},
		// message: 'Please input number.'
		message: '请输入符合数字的格式.'
	},
	//不能为空以及空字符串-注意校验对于combobox默认为text字段
	strongRequired: {
		validator: function (value) {//param为默认值
			return (value.replace(/(^s*)|(s*$)/g, "").length !=0 &&  (value!="请选择...") );
		},
		message: '请选择内容'
	},
	znLength:{
		validator:function (value, param) {
			var znLen = 0;
			var str = this.value,len=str.length;
			for(var i=0;i<len;i++){
				var _code = String.charCodeAt(str[i]);
				if(_code>255){
					znLen ++;
				}
			}
			if(znLen<param[0]){
				/*console.log('少于10个汉字')*/
				return false;
			}
			return true;
		},
		message: '内容不得少于{0}个汉字'
	},
});
$.extend($.fn.validatebox.methods, {
	remove: function(jq, newposition){
		return jq.each(function(){
			$(this).removeClass("validatebox-text validatebox-invalid").unbind('focus.validatebox').unbind('blur.validatebox');
		});
	},
	reduce: function(jq, newposition){
		return jq.each(function(){
			var opt = $(this).data().validatebox.options;
			$(this).addClass("validatebox-text").validatebox(opt);
		});
	}
});

// 在iframe子页面开启一个父页面新的tab页面
function addTabFromIframe(title, url){
	var jq = parent.jQuery;
	if (jq("#tab-area").tabs('exists', title)){
		jq("#tab-area").tabs('close', title);
	}
	var content = '<div style="width:100%;height:100%;overflow:hidden;">'
		+ '<iframe src="'
		+ url
		+ '" scrolling="auto" style="width:100%;height:100%;border:0;" ></iframe></div>';
	jq("#tab-area").tabs('add',{
		title:title,
		content:content,
		closable:true
	});
}

Date.prototype.addDays = function(number)
{
    var adjustDate = new Date(this.getTime() + 24*60*60*1000*number);
    /*alert("Date" + adjustDate.getFullYear()+"-"+adjustDate.getMonth()+"-"+adjustDate.getDate());*/
    return adjustDate;
};
/**
 * js时间对象的格式化;
 * eg:format="yyyy-MM-dd hh:mm:ss";
 */
Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1,  //month
		"d+": this.getDate(),     //day
		"h+": this.getHours(),    //hour
		"m+": this.getMinutes(),  //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
		"S": this.getMilliseconds() //millisecond
	}
	var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(w+)/.test(format)){
		format = format.replace(RegExp.$1, week[this.getDay()]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

/**
 *js中更改日期
 * y年， m月， d日， h小时， n分钟，s秒
 */
Date.prototype.add = function (part, value) {
	value *= 1;
	if (isNaN(value)) {
		value = 0;
	}
	switch (part) {
		case "y":
			this.setFullYear(this.getFullYear() + value);
			break;
		case "m":
			this.setMonth(this.getMonth() + value);
			break;
		case "d":
			this.setDate(this.getDate() + value);
			break;
		case "h":
			this.setHours(this.getHours() + value);
			break;
		case "n":
			this.setMinutes(this.getMinutes() + value);
			break;
		case "s":
			this.setSeconds(this.getSeconds() + value);
			break;
		default:

	}
};
//Get days and other datetime
//diffrence two datetime
// date1 :更早的日期 小的日期
// date2 :后面的日期 大的日期
//  返回两个时间差的天数小时数分数秒数和毫秒数
function DiffLong(datestr1, datestr2) {

	var date1 = new Date(Date.parse(datestr1.replace(/-/g, "/")));
	var date2 = new Date(Date.parse(datestr2.replace(/-/g, "/")));
	var datetimeTemp;
	var isLater = true;

	if (date1.getTime() > date2.getTime()) {
		isLater = false;
		datetimeTemp = date1;
		date1 = date2;
		date2 = datetimeTemp;
	}

	difference = date2.getTime() - date1.getTime();
	thisdays = Math.floor(difference / (1000 * 60 * 60 * 24));

	difference = difference - thisdays * (1000 * 60 * 60 * 24);
	thishours = Math.floor(difference / (1000 * 60 * 60));


	var strRet = thisdays + '天' + thishours + '小时';

	return strRet;
}

function comparaterTime(datestr1, datestr2) {

	var date1 = new Date(Date.parse(datestr1.replace(/-/g, "/")));
	var date2 = new Date(Date.parse(datestr2.replace(/-/g, "/")));
	var datetimeTemp;
	var isLater = true;

	if (date1.getTime() > date2.getTime()) {
		return 1;
	}else if (date1.getTime() == date2.getTime()) {
		return 0;
	}else {
		return -1;
	}
}

$.fn.getBackgroundColor = function() {
	var rgb = $(this).css('background-color');
	if(rgb >= 0) return rgb;//如果是一个hex值则直接返回
	else{
		rgb = rgb.match(/^rgb(\d+),\s∗(\d+),\s∗(\d+)$/);
		function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
		rgb= "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
	}
	return rgb;

}