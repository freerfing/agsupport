/**
 * 初始化
 */
var dd=[];
var ddvId="";
var args = getQueryStringArgs();

$(function () {
    // 加载审批类型
    loadCheckType();
    // 查询数据
	queryData();
});

/**
 * 查询
 */
function queryData() {
	var param = { tflag: 'table', tableid: args.id };

	// 设置提示信息
	var start_time=$("#start_time").val();
	var end_time=$("#end_time").val();
	var checktype=$("input[name='checktype']").val();
	param.start_time=start_time;
	param.end_time=end_time;
	param.checktype=checktype;
	var str='无记录。';
	var type="";
	$.ajax({
		url:'/agsupport/datacatalog/getCheckTableInfo',
		data:param,
		cache:false,
		async:false,
		dataType:"json",
		success:function(data){
			if(data!=null&&data.length>0){
				var che= new Array(); //定义一数组
				che=checktype.split(",");
				if("IS_MODI"==che[0]){
					type="mod";
				}else if("IS_ADD"==che[0]){
					type="add";
				}else if("IS_DEL"==che[0]){
					type="del";
				}else if("All"==che[0]){
					type="all";
				}
				var type0=data[0][type+"0"]==null?"0":data[0][type+"0"];
				var type1=data[0][type+"1"]==null?"0":data[0][type+"1"];
				var type2=data[0][type+"2"]==null?"0":data[0][type+"2"];
				var w=parseInt(type0)+parseInt(type1)+parseInt(type2);
				if(w==0){
					str=""+data[0].start_time+"至"+data[0].end_time+"，无审核记录。";
				}else{
					str=""+data[0].start_time+"至"+data[0].end_time+"，共"+w+"条待审核记录。";
				}
				// 获取时间
				param.start_time=data[0].start_time;
				param.end_time=data[0].end_time;
			}
		}
	});

	// 加载工具栏
	var tool=[];
	var tg={text:'通过',iconCls:'icon-ok',handler:tongGuoMore};
	tool.push(tg);
	tool.push('-');
	var bh={text:'驳回',iconCls:'icon-cancel',handler:boHuiMore};
	tool.push(bh);
	tool.push('-');
	var xq={text:'详情',iconCls:'icon-edit',handler:detailData};
	tool.push(xq);

	// 加载列
	var cols=[];
	var col=[];
	$.ajax({
		url: '/agsupport/datacatalog/listFieldDefFromTbl/'+param.tableid,
		type:"POST",
		async:false,
		dataType:"json",
		success:function(data){
			col.push({field:"ck",checkbox:true});
			col.push({title:"tablename",field:"tablename",hidden:true,formatter:formatValue});
			col.push({title:"prifield",field:"prifield",hidden:true,formatter:formatValue});
			col.push({title:"prikey",field:"prikey",hidden:true,formatter:formatValue});
			col.push({title:"操作",field:"_oper",width:'16%',align:"center",formatter:function(value,row,idx){
				return "<a href='#' onclick=\"tongGuo('"+row.rowid+"','"+row.tablename+"','"+row.prifield+"','"+row.prikey+"','"+row.checktype+"')\" style='color:blue;'>通过</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick=\"boHui('"+row.rowid+"','"+row.tablename+"','"+row.prifield+"','"+row.prikey+"','"+row.checktype+"')\" style='color:red;'>驳回</a>";
			}});
			col.push({title:"审核类型",field:"checktype",width:'10%',align:"center",formatter:function(value,row,index){
				if(value=="is_add"){
					return "<span title='新增'>新增</span>";
				}else if(value=="is_del"){
					return "<span title='删除'>删除</span>";
				}else if(value=="is_modi"){
					return "<span title='修改'>修改</span>";
				}
			}});
			col.push({title:"上报人",field:"opera_name",width:'16%',align:"center",formatter:formatValue});
			$.each(data,function(idx,val){
				var field=val.name;
				if(val.dd!=null&&val.dd!=""){
					dd[field]=val.dd;
					col.push({title:val.cname,field:field.toLowerCase(),width:'12%',align:"center",formatter:function(value,row,index){
						if(value==null){
							return "";
						}else{
							var d=eval('('+dd[field]+')');
							var va=d[value]==undefined?"":d[value];
							return "<span title=\"" + va + "\">" + va + "</span>";
						}
					}});
				}else{
					col.push({title:val.cname,field:field.toLowerCase(),width:'12%',align:"center",formatter:formatValue});
				}
			});
		}
	});
	cols.push(col);

	// 加载表单
	param.loginName = top.loginName;
	$("#check_data").datagrid({
		title:str,
		// view: detailview, //注意1
		url: '/agsupport/datacatalog/getCheckDataNew',
		loadMsg:'数据加载中，请稍候...',
		queryParams:param,
		striped:true,
		cache: false,
		width:'auto',
		height:'420',
		pageSize:30,
		pageList:[10,20,30],
		columns:cols,
		pagination:true,
		rownumbers:true,
		singleSelect:false,
		toolbar:tool,
		onDblClickRow: function (index, row) {
			if(row.tablename!=null&&row.tablename!=""){
				$("#modify_check").dialog('open').dialog('center').dialog('setTitle', '修改详细');
				// 拼装比较信息
				var str = '<tr bgcolor="#d3d3d3" style="line-height: 180%;text-align: center;"><td>属性名称</td><td>原内容</td><td>新内容</td></tr>';
				// 列循环
				var listStr="";
				$.ajax({
					url: '/agsupport/datacatalog/listFieldFromTable/'+row.tablename,
					type:"POST",
					async:false,
					success:function(data){
						listStr=data;
					},
					error:function(data){
						alert(data);
					}
				});

				var list=eval('('+listStr+')');
				// var list=eval('('+row.field_description+')');
				var modi=null;
				var old=null;
				if(row.checktype=="is_add"){
					modi=eval('('+row.orig_value+')');
				}else{
					old=eval('('+row.orig_value+')');
					if(row.modi_value!=null&&row.modi_value!=""){
						modi=eval('('+row.modi_value+')');
					}
				}
				for(var k=0;k<list.length;k++){
					var field=list[k].name;
					var ol=old==null?"":old[field];
					var mo=modi==null?"":modi[field];
					// 数据字典
					if(list[k].dd!=null){
						var dd=eval('('+list[k].dd+')');
						if(ol!=null&&ol!=""){
							ol=dd[ol+""];
							ol=ol==undefined?"":ol;
						}
						if(mo!=null&&mo!=""){
							mo=dd[mo+""];
							mo=mo==undefined?"":mo;
						}
					}
					if(list[k].type!=null&&(list[k].type=="DATE"||list[k].type=="date")){
						ol=ol.replace(".0","");
						mo=mo.replace(".0","");
					}
					if(ol!=mo){
						str+="<tr><td>"+list[k].cname+"</td><td>"+(ol==null?"":ol)+"</td><td  style='color:red;'>"+(mo==undefined?"":mo)+"</td></tr>";
					}else{
						str+="<tr><td>"+list[k].cname+"</td><td>"+(ol==null?"":ol)+"</td><td>"+(mo==undefined?"":mo)+"</td></tr>";
					}
				}
				$("#compare").html("");
				$("#compare").append(str);
			}

			/*
			var expander = $('#check_data').datagrid('getExpander', index);
			if(expander.hasClass('datagrid-row-collapse')){
				$('#check_data').datagrid('collapseRow',index); // 收缩
			}else{
				// 是否隐藏
				if(type=="mod"){
					$('#check_data').datagrid('getExpander', index).show();
					$('#check_data').datagrid('expandRow',index);  // 展开
				}else{
					$('#check_data').datagrid('getExpander', index).hide();
				}
			}
			*/
		},
		detailFormatter:function(index,row){//注意2
			return '<div style="padding:2px;border: red 1px solid;" ><div style="color: red;">原始值&nbsp;&nbsp;</div><div id="ddv-' + row.prikey + '"></div></div>';
		},
		onExpandRow:function(index,row){//注意3
			// 拼装列
			var v=[];
			var co=[];
			for(var i=0;i<cols[0].length;i++){
				if(i==4){
					co.push({title:"操作",field:"_oper",width:120,align:"center",formatter:function(value,row,idx){
						return "-";
					}});
				}else{
					co.push(cols[0][i]);
				}
			}
			v.push(co);

			ddvId=row.prikey;
			// 修改信息
			$('#ddv-'+row.prikey).datagrid({
				url: '/agsupport/datacatalog/modifyDataNew',
				queryParams:{
					tablename:row.tablename,
					prifield:row.prifield,
					prikey:row.prikey
				},
				loadMsg:'数据加载中，请稍候...',
				fitColumns:true,
				singleSelect:true,
				height:'auto',
				showHeader:false,  // 隐藏表头
				columns:v,
				onResize:function(){
					$('#check_data').datagrid('fixDetailRowHeight',index);
				},
				onLoadSuccess:function(){
					setTimeout(function(){
						$('#check_data').datagrid('fixDetailRowHeight',index);
					},0);
				}
			});
			$('#check_data').datagrid('fixDetailRowHeight',index);
		},
		onLoadSuccess:function(data){
			$.each(data.rows,function(idx,val){
				// 是否隐藏
				if(type=="mod"){
					$('#check_data').datagrid('getExpander', idx).show();
				}else{
					$('#check_data').datagrid('getExpander', idx).hide();
				}
			});
		}
	});
}

/**
 * 详情
 */
function detailData(){
	var row=$("#check_data").datagrid('getSelections');
	if(row.length==0||row.length>1){
		$.messager.alert('警告', '请选中一行！', 'info');
        return;
	}else{
		$("#modify_check").dialog('open').dialog('center').dialog('setTitle', '修改详细');
		// 拼装比较信息
		var str = '<tr bgcolor="#d3d3d3" style="line-height: 180%;text-align: center;"><td>属性名称</td><td>原内容</td><td>新内容</td></tr>';
		// 列循环
		var listStr="";
		$.ajax({
			url:'/agsupport/datacatalog/listFieldFromTable/'+row[0].tablename,
			type:"POST",
			async:false,
			success:function(data){
				listStr=data;
			},
			error:function(data){
				alert(data);
			}
		});
		
		var list=eval('('+listStr+')');
		// var list=eval('('+row.field_description+')');
		var modi=null;
		var old=null;
		if(row[0].checktype=="is_add"){
			modi=eval('('+row[0].orig_value+')');
		}else{
			old=eval('('+row[0].orig_value+')');
			if(row[0].modi_value!=null&&row[0].modi_value!=""){
				modi=eval('('+row[0].modi_value+')');
			}
		}
		for(var k=0;k<list.length;k++){
			var field=list[k].name;
			var ol=old==null?"":old[field];
			var mo=modi==null?"":modi[field];
			// 数据字典
			if(list[k].dd!=null){
				var dd=eval('('+list[k].dd+')');
				if(ol!=null&&ol!=""){
					ol=dd[ol+""];
					ol=ol==undefined?"":ol;
				}
				if(mo!=null&&mo!=""){
					mo=dd[mo+""];
					mo=mo==undefined?"":mo;
				}				
			}
			if(list[k].type!=null&&(list[k].type=="DATE"||list[k].type=="date")){
				ol=ol.replace(".0","");				
			}
			if(ol!=mo){
				str+="<tr><td>"+list[k].cname+"</td><td>"+(ol==null?"":ol)+"</td><td  style='color:red;'>"+(mo==undefined?"":mo)+"</td></tr>";
			}else{
				str+="<tr><td>"+list[k].cname+"</td><td>"+(ol==null?"":ol)+"</td><td>"+(mo==undefined?"":mo)+"</td></tr>";
			}
		}
		$("#compare").html("");
		$("#compare").append(str);
	}
}

/**
 * 通过更多
 */
function tongGuoMore(){
	var row=$("#check_data").datagrid('getSelections');
	if(row.length==0){
		$.messager.alert('提示', "请至少选择一条记录！", 'warning');
		return;
	}else{
		var checktype=$("input[name='checktype']").val();	
		var che=checktype.split(",");
		var type="";
		if("IS_MODI"==che[0]){
			type="modi";
		}else if("IS_ADD"==che[0]){
			type="add";
		}else if("IS_DEL"==che[0]){
			type="del";
		}
		// 循环数据
		var tablename="";
		var prifield="";
		var privalue="";
		var rowid="";
		$.each(row,function(idx,val){	
			rowid+=","+val.rowid;
			tablename+=","+val.tablename;
			prifield+=","+val.prifield;
			privalue+=","+val.prikey;
		});
		if(""!=tablename){
			rowid=rowid.substring(1);
			tablename=tablename.substring(1);
			prifield=prifield.substring(1);
			privalue=privalue.substring(1);
		}
		
		// 操作
		$.ajax({
			url:'/agsupport/datacatalog/passCheckData',
			data:{id:rowid,type:type,tablenames:tablename,prifields:prifield,privalues:privalue},
			anysc:false,
			cache:false,
			dataType:"json",
			success:function(data){	
				if(data.success){
					$.messager.alert('提示', "审核通过操作成功！", 'info');
					queryData();
				}else{
					$.messager.alert('提示', data.message, 'warning');
					queryData();
				}
			},
			error:function(data){
				alert(data);
			}
		});
	}
}

/**
 * 驳回更多保存
 */
function boHuiMoreSave(id,type,tablename,prifield,prikey,view){
	$.ajax({
		url:'/agsupport/datacatalog/passCheckDataNo',
		data:{id:id,type:type,tablenames:tablename,prifields:prifield,privalues:prikey,view:view},
		anysc:false,
		cache:false,
		dataType:"json",
		success:function(data){	
			if(data.success){
				$.messager.alert('提示', "审核驳回操作成功！", 'info');
				queryData();
			}else{
				$.messager.alert('提示', data.message, 'warning');
				queryData();
			}
		},
		error:function(data){
			alert(data);
		}
	});
}

/**
 * 驳回更多
 */
function boHuiMore(){
	var row=$("#check_data").datagrid('getSelections');
	if(row.length==0){
		$.messager.alert('提示', "请至少选择一条记录！", 'warning');
		return;
	}else{
		var checktype=$("input[name='checktype']").val();	
		var che=checktype.split(",");
		var type="";
		if("IS_MODI"==che[0]){
			type="modi";
		}else if("IS_ADD"==che[0]){
			type="add";
		}else if("IS_DEL"==che[0]){
			type="del";
		}
		// 循环数据
		var tablename="";
		var prifield="";
		var privalue="";
		var rowid="";
		$.each(row,function(idx,val){	
			rowid+=","+val.rowid;
			tablename+=","+val.tablename;
			prifield+=","+val.prifield;
			privalue+=","+val.prikey;
		});
		if(""!=tablename){
			rowid=rowid.substring(1);
			tablename=tablename.substring(1);
			prifield=prifield.substring(1);
			privalue=privalue.substring(1);
		}
		
		// 弹出对话框
		$("#check_view").textbox("setValue", "");
		$("#bohui_table").dialog('open').dialog('center').dialog('setTitle', '驳回');
		$("#submit_bohui").unbind();
		$("#submit_bohui").bind("click",function(){
			var view=$("#check_view").val();
			$('#bohui_table').dialog('close');
			boHuiMoreSave(rowid,type,tablename,prifield,privalue,view);		
		});	
	}
}

/**
 * 通过
 */
function tongGuo(id,tablename,prifield,privalue,ct){
	var checktype=$("input[name='checktype']").val();	
	var che=checktype.split(",");
	var type="";
	if("IS_MODI"==che[0]){
		type="modi";
	}else if("IS_ADD"==che[0]){
		type="add";
	}else if("IS_DEL"==che[0]){
		type="del";
	}else if("All"==che[0]){
		type=ct.replace("is_","");
	}
	if(type=="modi"){ // 修改审核
		$.messager.confirm('确认', '确定通过修改审核吗？', function(r){
			if (r){
				$.ajax({
					url:'/agsupport/datacatalog/passCheckData',
					data:{id:id,type:type,tablenames:tablename,prifields:prifield,privalues:privalue},
					anysc:false,
					cache:false,
					dataType:"json",
					success:function(data){	
						if(data.success){
							$.messager.alert('提示', "修改审核操作成功！", 'info');
							queryData();
						}else{
							$.messager.alert('提示', data.message, 'warning');
						}
					},
					error:function(data){
						alert(data);
					}
				});
			}
		});	
	}else if(type=="del"){ // 删除审核
		$.messager.confirm('确认', '确定通过删除审核吗？', function(r){
			if (r){
				$.ajax({
					url:'/agsupport/datacatalog/passCheckData',
					data:{id:id,type:type,tablenames:tablename,prifields:prifield,privalues:privalue},
					anysc:false,
					cache:false,
					dataType:"json",
					success:function(data){	
						if(data.success){
							$.messager.alert('提示', "删除审核操作成功！", 'info');
							queryData();
						}else{
							$.messager.alert('提示', data.message, 'warning');
						}
					},
					error:function(data){
						alert(data);
					}
				});	
			}
		});
	}else if(type=="add"){ // 新增审核
		$.messager.confirm('确认', '确定通过新增审核吗？', function(r){
			if (r){
				$.ajax({
					url:'/agsupport/datacatalog/passCheckData',
					data:{id:id,type:type,tablenames:tablename,prifields:prifield,privalues:privalue},
					anysc:false,
					cache:false,
					dataType:"json",
					success:function(data){	
						if(data.success){
							$.messager.alert('提示', "新增审核操作成功！", 'info');
							queryData();
						}else{
							$.messager.alert('提示', data.message, 'warning');
						}
					},
					error:function(data){
						alert(data);
					}
				});			
			}
		});
	}
}

/**
 * 驳回操作
 */
function boHuiSave(id,tablename,prifield,prikey,view,ct){
	var checktype=$("input[name='checktype']").val();	
	var che= new Array(); //定义一数组 
	che=checktype.split(",");
	var type="";
	if("IS_MODI"==che[0]){
		type="modi";
	}else if("IS_ADD"==che[0]){
		type="add";
	}else if("IS_DEL"==che[0]){
		type="del";
	}else if("All"==che[0]){
		type=ct.replace("is_","");
	}
	if(type=="modi"){ // 修改审核
			$.ajax({
				url:'/agsupport/datacatalog/passCheckDataNo',
				data:{id:id,type:type,tablenames:tablename,prifields:prifield,privalues:prikey,view:view},
				anysc:false,
				cache:false,
				dataType:"json",
				success:function(data){	
					if(data.success){
						$.messager.alert('提示', "驳回修改审核操作成功！", 'info');
						queryData();
					}else{
						$.messager.alert('提示', data.message, 'warning');
					}
				},
				error:function(data){
					alert(data);
				}
			});
	}else if(type=="del"){ // 删除审核
			$.ajax({
				url:'/agsupport/datacatalog/passCheckDataNo',
				data:{id:id,type:type,tablenames:tablename,prifields:prifield,privalues:prikey,view:view},
				anysc:false,
				cache:false,
				dataType:"json",
				success:function(data){	
					if(data.success){
						$.messager.alert('提示', "驳回删除审核操作成功！", 'info');
						queryData();
					}else{
						$.messager.alert('提示', data.message, 'warning');
					}
				},
				error:function(data){
					alert(data);
				}
			});
	}else if(type=="add"){ // 新增审核
			$.ajax({
				url:'/agsupport/datacatalog/passCheckDataNo',
				data:{id:id,type:type,tablenames:tablename,prifields:prifield,privalues:prikey,view:view},
				anysc:false,
				cache:false,
				dataType:"json",
				success:function(data){	
					if(data.success){
						$.messager.alert('提示', "驳回新增审核操作成功！", 'info');
						queryData();
					}else{
						$.messager.alert('提示', data.message, 'warning');
					}
				},
				error:function(data){
					alert(data);
				}
			});
	}
}

/**
 * 驳回
 */
function boHui(id,tablename,prifield,prikey,ct){
	// 弹出对话框
	$("#bohui_table").dialog('open').dialog('center').dialog('setTitle', '驳回');
	$("#check_view").textbox("setValue", "");

	$("#submit_bohui").unbind();
	$("#submit_bohui").bind("click",function(){
		var view=$("#check_view").val();
		$('#bohui_table').dialog('close');
		boHuiSave(id,tablename,prifield,prikey,view,ct);		
	});	
}

/**
 * 清空
 * @param form
 */
function clean_form(form){
	$("#start_time").datetimebox('setValue', '');
	$("#end_time").datetimebox('setValue', '');
	$('#checktype').combobox('setValue', 'All,0');
	var queryParams = $('#check_data').datagrid('options').queryParams;  
	var start_time=$("#start_time").val();
	var end_time=$("#end_time").val();
	var checktype=$("input[name='checktype']").val();
	queryParams.start_time=start_time;
	queryParams.end_time=end_time;
	queryParams.checktype=checktype;
    $('#check_data').datagrid('options').queryParams=queryParams; 
    queryData();
}

/**
 * 加载审核类型
 */
function loadCheckType(){
	var str='[{"value":"All,0","name":"全部","selected":true},{"value":"IS_ADD,0","name":"新增"},{"value":"IS_DEL,0","name":"删除"},{"value":"IS_MODI,0","name":"修改"}]';
	var da = JSON.parse(str);
	// 审核类型
    $("#checktype").combobox({
    	data:da,
		onChange: function (n,o) {
			if(o!=null&&o!=""){
				queryData();
			}
		}
	});
}

/**
 * 刷新
 */
function refreshData(){
	$("#check_data").datagrid('reload'); 
}

function getQueryStringArgs() {
	var
		qs = (location.search.length > 0 ? location.search.substring(1) : ''),
		items = qs.length ? qs.split('&') : [],
		args = {}, item = null, name = null, value = null,
		i = 0, len = items.length;
	for(i = 0; i < len; i++) {
		item = items[i].split('=');
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);

		if(name.length) {
			args[name] = value;
		}
	}

	return args;
}