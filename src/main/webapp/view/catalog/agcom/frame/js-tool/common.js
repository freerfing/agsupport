/**
 * 为easyui写的一个公共方法类
 * 让前端编程省去更多的代码
 * @author Hunter 2013.12.05
 */

/**
 * 打开窗口
 * @param {} html
 * @param {} iWidth
 * @param {} iHeight
 */
function openWin(html,iWidth,iHeight,location){
      var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
	  var iLeft = (window.screen.availWidth-10-iWidth)/2;           //获得窗口的水平位置;
	  if (location) {
	  	window.open(html,'_blank','left=' + iLeft + ',top=' + iTop +  ',location=' + location + ',toolbar=no,menubar=no,scrollbars=yes,width=' + iWidth + ',height=' + iHeight );
	  } else {
	  	window.open(html,'_blank','left=' + iLeft + ',top=' + iTop +  ',location=yes,toolbar=no,menubar=no,scrollbars=yes,width=' + iWidth + ',height=' + iHeight );
	  }
}

/**
 * body上的onresize事件在IE8急速模式下会反复执行7、8次
 * 为解决此问题特设全局变量记录onresize次数
 * @type Number
 */
var onResizeNum_ = 0;

/**
 * 调用此方法 使容器跟随系统窗口大小变化
 * 作用于body.onresize方法
 * @param {} containId
 * @param {} width
 * @param {} height
 */
function resize(containId, width, height){
	onResizeNum_++;
	setTimeout("resize_("+ onResizeNum_ +", "+containId+", "+width+", "+height+")", 100);
}

function resize_(times, containId, width, height) {
	if (times != onResizeNum_) return;
	onResizeNum_ = 0;
	if (typeof(containId) == 'string') containId = $('#'+containId);
	if (!height) height = 0;
	if (!width) width = 0;
	var ifr = $(document.body);
	var element = $(containId);
	if (element.attr("class") == "easyui-datagrid") {
		element.datagrid('resize', {
			height: height != 0 ? (ifr.height() + height) : height,
			width: 	width != 0 ? (ifr.width() + width) : width
		});
	} else {
		if (height != 0) element.height(ifr.height() + height);
		if (width != 0) element.width(ifr.width() + width);
	}
}

/**
 * 解析form中数据成json格式
 * @param {} form
 * @return {}
 */
function jsonform(form) {
	if (typeof(form) == 'string') form = $('#'+form);
	var inputs = form.find('[name][value!="请选择..."][value!=""]');
	var param = {};
	$.each(inputs, function(i, data) {
		param[data.name] = data.value;
	});
	inputs = form.find('[name]:checked');
	$.each(inputs, function(i, data) {
		param[data.name] = data.value;
	});
	return param;
}

/**
 * 清空表单
 * @param {} form
 */
function clean(form) {
	if (typeof(form) == 'string') form = $('#'+form);
	form.form('clear');
	form.find('.validatebox-invalid').removeClass('validatebox-invalid');
	$('.tooltip').remove();
	setTimeout(function() {
		form.find('.validatebox-invalid').removeClass('validatebox-invalid');
	}, 500);
}

/**
 * Combobox的事件
 * 增加下拉项：请选择...
 */
function onLoadSuccess() {
	var data = $(this).combobox('getData');
	if (!data || data.length == 0) {
		return;
	}
	var options = $(this).combobox('options');
	var valueField = options.valueField;
	var textField = options.textField;
	if (data[0][valueField]=='' || data[0][valueField]=='请选择...') {
		return;
	}
	var array = eval("[{"+valueField+":'', "+textField+":'请选择...'}]");
	$.merge(array, data);
	$(this).combobox('loadData', array);
}
/**
 * 获取json对象的长度
 */
function getJsonLength(jsonData){
	var jsonLength = 0;
	for(var item in jsonData){
		jsonLength++;
	}
	return jsonLength;
}

var ajaxLoad_allow = false;

//采用jquery easyui loading css效果
function ajaxLoading(){
	if (!ajaxLoad_allow) return;
	if ($('body .datagrid-mask').length > 0) {
        $('body .datagrid-mask').show();
        $('body .datagrid-mask-msg').show();
	} else {
        $("<div class=\"datagrid-mask\" style='z-index: 99999;position: absolute'></div>").css({
            display: "block",
            width: "100%",
            height: $(window).height()
        }).appendTo("body");
        $("<div class=\"datagrid-mask-msg\" style='z-index: 99999;position: absolute'></div>").html("正在处理，请稍候。。。").appendTo("body").css({
            display: "block",
            left: ($(document.body).outerWidth(true) - 190) / 2,
            top: ($(window).height() - 45) / 2
        });
    }
}

function ajaxLoadEnd(){
	ajaxLoad_allow = false;
    $('body .datagrid-mask').remove();
    $('body .datagrid-mask-msg').remove();
}