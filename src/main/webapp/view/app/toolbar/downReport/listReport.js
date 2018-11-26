/**
 * 初始化
 */
$(function(){
	// 查询
	queryData({start: 1});
});

/**
 * 清空
 */
function cleanForm(){
	$("#downForm").form('clear');
    queryData({start: 1});
}

/**
 * 查询
 */
function queryData(param){	
	// 查询文件类型
	var str=new Array();
	var i=0;
	$.getJSON("/awater/view/app/toolbar/downReport/menu.json",function(data){
		$.each(data,function(index,t){			
			if(parent.$("a[name='"+t["id"]+"']").hasClass("hover")){
				str[i++]=t["value"];
			}
		});
		if(str!=""){
			$("#condition").val(str);
		}			
		reload('/agsupport/archive/loadReport', param, 'downForm', 'reportList');
	});
	
}

/**
 * 格式
 * @param value
 */
function formatValue(value){
	if(value==null){
		return "<span title=''></span>";
	}else{
		return "<span title='" + value + "'>" + value + "</span>";
	}	
}

/**
 * 下载文档
 * @param value
 */
function downFile(value,row,index){
	return "<a href='#' onclick=down('"+row.id+"') style='color:#0000FF;text-decoration:underline;'>"+value+"</a>";
}

/**
 * 下载
 * @param id
 */
function down(id){
	window.open('/agsupport/archive/down/' + id);
}