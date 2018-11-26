
var vKeyFieldName = '';
var vMetaFieldDefArray = [];
var vhtml = '';
var jsonCell=[];
$(function () {
    //获取列表的表头
    getTableField_Def_for_Datagrid( vtableId );

    queryParam({start:1});

    $("#dg_param").datagrid({
        onClickRow: function (index, row) {
            vhtml = '';
            // $(this).datagrid('clearChecked');
            $(this).datagrid('selectRow', index);

            var vkeyfieldval = row[vKeyFieldName];
            $.ajax({
                url: ctx + '/datacatalog/getOldDataFromBaseTable/',
                type: 'POST',
                data: {keyfield:vKeyFieldName, tableid:vtableId, keyfieldval:vkeyfieldval},
                dataType: 'json',
                success: function (data) {
                    vhtml = '<tr bgcolor="#d3d3d3"><td>属性名称</td><td>原内容</td><td>新内容</td></tr>';

                    $.each(vMetaFieldDefArray, function (i, eachdata) {

                        var enField = eachdata.name.toLowerCase();
                        var cnField = eachdata.cname;
                        var oldval = '';
                        if (eachdata.type == 'Date') {
                            oldval = formatDateFun(row[enField]);
                        } else {
                            oldval =  row[enField];
                        }

                        var newval = '';
                        //list [] 第一条
                        if (data.length>=1)
                            newval = data[0][enField];

                        //数据字典处理
                        if (eachdata.dd!='' && eachdata.dd!=null) {
                            var obj = eval('(' + eachdata.dd + ')');
                            if (oldval!=null)
                                oldval = obj[oldval];
                            if (newval!=null)
                                newval = obj[newval];
                        }

                        if (oldval==null )
                            oldval = '';
                        if (newval==null )
                            newval = '';

                        vhtml += '<tr><td>' + cnField + '</td><td>';
                        if (oldval==newval)
                            vhtml += newval + '</td><td>' + oldval + '</td></tr>';
                        else
                            vhtml += "" + newval + "</td><td><span style='color:red'>" + oldval + "</span></td></tr>";
                    });

                   $('#idOldNewValTable').html(vhtml);

                },
                error: function (data) {
                    $.messager.alert('警告', '请求远程数据失败！', 'error');
                }
            });

            $("#dlg_param").dialog('open').dialog('center').dialog('setTitle', '数据比较');
        }
        // onDblClickRow: function (index, row) {
        //     updParam();
        // }
    });
    /*
        $("#file_upload_1").uploadifive({
            height: 25,
            uploadScript: ctx + '/agsupport/param/loadMapextent',
            width: 88,
            method: 'post',
            buttonText: '地图参数',
            removeCompleted: true,
            dnd: true,
            multi: true,
            queueSizeLimit: 2,
            onAddQueueItem: function (file) {
                if (!file.size > 0) {
                    alert("文件" + file.name + "大小为0字节,不允许上传!");
                    $("#file_upload_1").uploadifive('cancel', $('.uploadifive-queue-item').first().data('file'));
                    return;
                } else if (file.name.split(".")[1] != "xml" && file.name.split(".")[1] != "cdi") {
                    alert("文件类型不正确");
                    $("#file_upload_1").uploadifive('cancel', $('.uploadifive-queue-item').first().data('file'));
                    return;
                }
            },
            onUploadComplete: function (file, data) {
                var text = eval("(" + data + ")");
                if (text.success == true) {
                    if (text.mapextent)
                        $("#extent").textbox('setValue', text.mapextent);
                    if (text.resolution)
                        $("#scales").textbox('setValue', text.resolution);
                    if (text.tileOrigin) {
                        $("#origin").textbox('setValue', text.tileOrigin);
                        $("#tileOrigin").textbox('setValue', text.tileOrigin);
                    }
                } else {
                    alert("导入失败！");
                }
            },
            onUploadError: function (file, errorCode, errorMsg, errorString) {
                alert('文件 ' + file.name + ' 上传失败: ' + errorString);
            },
            onFallback: function () {
                alert("该浏览器无法使用!");
            }
        });

        $("#importParam").uploadifive({
            height: 25,
            uploadScript: ctx + '/agsupport/param/importParam',
            width: 88,
            method: 'post',
            buttonText: '导入参数',
            removeCompleted: true,
            dnd: true,
            multi: true,
            queueSizeLimit: 2,
            onAddQueueItem: function (file) {
                if (!file.size > 0) {
                    $.messager.alert('提示', '文件' + file.name + '大小为0字节,不允许上传！', 'info');
                    $("#importParam").uploadifive('cancel', $('.uploadifive-queue-item').first().data('file'));
                    return;
                } else if (file.name.split(".")[1] != "json") {
                    $.messager.alert('提示', '文件类型不正确', 'info');
                    $("#importParam").uploadifive('cancel', $('.uploadifive-queue-item').first().data('file'));
                    return;
                }
            },
            onUploadComplete: function (file, result) {
                result = JSON.parse(result);
                if (result.success) {
                    $('#form_saveParam').form('load', JSON.parse(result.content));
                } else {
                    $.messager.alert('提示', '导入失败！', 'error');
                }
            },
            onUploadError: function (file, errorCode, errorMsg, errorString) {
                $.messager.alert('提示', '文件 ' + file.name + ' 上传失败: ' + errorString, 'error');
            },
            onFallback: function () {
                $.messager.alert('提示', '该浏览器无法使用！', 'error');
            }
        });

        $("#extent").textbox({
            onChange: function () {
                var extent = $("#extent").textbox('getValue');
                if (extent != "" || extent != null && extent.indexOf(",") != -1) {
                    var maptl = extent.split(",");
                    if (maptl.length == 4) {
                        var cpx = parseFloat(maptl[2]) > parseFloat(maptl[0]) ? parseFloat(maptl[0]) + parseFloat((maptl[2] - maptl[0]) / 2) : "";
                        var cpy = parseFloat(maptl[3]) > parseFloat(maptl[1]) ? parseFloat(maptl[1]) + parseFloat((maptl[3] - maptl[1]) / 2) : "";
                        $("#center").textbox('setValue', cpx + "," + cpy);
                    }
                }
            }
        });

        $("#scales").textbox({
            onChange: function () {
                var scales = $("#scales").textbox('getValue');
                if (scales != "" || scales != null && scales.indexOf(",") != -1) {
                    var zoom = scales.split(",");
                    var list = new Array();
                    for (var i = 0; i < zoom.length; i++) {
                        list.push({'name': i, 'value': i});
                    }
                    $("#zoom").combobox({
                        valueField: 'value',
                        textField: 'name',
                        data: list,
                        onLoadSuccess: function () {
                            if (list.length > 0)
                                $(this).combobox("select", 1);
                        }
                    });
                    $("#minZoom").combobox({
                        valueField: 'value',
                        textField: 'name',
                        data: list,
                        onLoadSuccess: function () {
                            if (list.length > 0)
                                $(this).combobox("select", 0);
                        }
                    });
                    $("#maxZoom").combobox({
                        valueField: 'value',
                        textField: 'name',
                        data: list,
                        onLoadSuccess: function () {
                            if (list.length > 0)
                                $(this).combobox("select", list.length - 1);
                        }
                    });
                }
            }
        });

        $("#paramName").textbox({
            onChange: function () {
                var value = $(this).textbox('getValue');
                var id;
                if ($("#paramId").val() != "")
                    id = $("#paramId").val();
                else
                    id = null;
                if (value.trim("") != null && value.trim("") != '') {
                    $.post(ctx + '/agsupport/param/checkName', {name: value, id: id}, function (data) {
                        var text = eval("(" + data + ")");
                        if (text.success == true) {
                            $("#msg").show();
                        } else {
                            $("#msg").hide();
                        }
                    })
                }
            }
        })
       */
   // queryParam();

    /**
     * 回车监听事件

    $('#paramNameSearch').textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
            queryParam({start: 1});
        }
    });*/
});


/**
 * 不同的表，datagrid列的名称 是不同的
 */
function getTableField_Def_for_Datagrid( tableId ) {

    $.ajax({
        url: ctx + '/datacatalog/listFieldDefFromTbl/' + tableId,
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            changeColumn(data)
            //  console.log('here..');

        },
        error: function (data) {
            $.messager.alert('警告', '请求远程数据失败！', 'error');
        }
    })
}
/**
 * 不同的表，datagrid列的名称 是不同的
 */
function changeColumn(data) {

    var arrays=[];
    var columnsArray=[];
    vMetaFieldDefArray = [];
    //arrays.push({field:'ck',checkbox:true});
    arrays.push({field:'id', hidden:true});
    var iInitVal = 1;
    $.each(data, function (i, row) {
    	if ( i==0 ) {
            vKeyFieldName = row.name.toLowerCase();
        }
    	// 弹窗标题
    	vMetaFieldDefArray[i] = row;
    	if (row.type == 'Date') {
    		arrays.push({field:row.name.toLowerCase(),title:row.cname,align:'left',formatter:formatDateFun});
    	}else if(row.dd != null && row.dd != ''){
    		jsonCell[row.name.toLowerCase()]=row.dd;
    		var ro=row.name.toLowerCase();
    		arrays.push({field:row.name.toLowerCase(),title:row.cname,align:'left',formatter:function(value,row,index){
    			var str=eval('('+jsonCell[""+ro]+')');
    			var val=str[value+""];
    			if(val!=undefined){
    				return val;
    			}else{
    				return "";
    			}
    		}});
    	}else{
    		arrays.push({field:row.name.toLowerCase(),title:row.cname,align:'left'});
    	}
    });
    /*
    $(data).each(function(){
        arrays.push({field:'',title:'',align:'left'});
    });

    $.each(data, function (i, row) {
    	// 判断是否礼包
    	
        //表的主键
        if ( i==0 ) {
            vKeyFieldName = row.name.toLowerCase();
        }

        vMetaFieldDefArray[i] = row;

        arrays[i+iInitVal].field = row.name.toLowerCase();
        arrays[i+iInitVal].title = row.cname;
        if (row.type == 'Date') {
            arrays[i+iInitVal].formatter = formatDateFun;
        }
        if (row.dd != null && row.dd != '') {
        	console.log(row.dd);
        	
        	arrays[i+iInitVal].editor=formatDD;
        }

    });
    */
   //最后一条记录不要了， '编辑状态'
    arrays.pop();
    vMetaFieldDefArray.pop();

    columnsArray.push(arrays);//[[]]形式

    $('#dg_param').datagrid({
        columns:columnsArray
    });
}

function formatDateFun(valObj) {
    var time = "";
    try {
        var now = new Date(valObj); // .time
        var year = now.getFullYear(); //getFullYear getYear
        var month = now.getMonth();
        var date = now.getDate();
        var hour = now.getHours();
        var minu = now.getMinutes();
        var sec = now.getSeconds();

        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;

        time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec ;
    } catch (e) {
    }
    return time;
}

/**
 * 导入地图参数
 */
function importMapParam() {
    $.messager.confirm('确认', '是否导入地图参数？', function (r) {
        if (r) {
            $.ajax({
                url: ctx + '/agsupport/param/importMapParam',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        queryParam({start: 1});
                    } else {
                        $.messager.alert('提示', '导入失败！', 'error');
                    }
                },
                error: function (data) {
                    $.messager.alert('警告', '请求远程数据失败！', 'error');
                }
            })
        }
    });
}

/**
 * 查询地图参数
 * @param param
 */
function queryParam(param) {

    reload(ctx + '/datacatalog/listChangeDatafromTemptable/'+vtableId, param, 'form_param', 'dg_param');

}

/**
 * 刷新
 */
function refreshParam() {
    queryParam();
}

/**
 * 添加地图参数
 */
function addParam() {
    $("#dlg_param").dialog('open').dialog('center').dialog('setTitle', '添加');
    $("#form_saveParam").form('clear');
   // $('#form_saveParam .easyui-combobox').combobox('reload');//刷新combobox
    $("#submit_saveParam").unbind();//解除事件绑定
    $("#zoom").combobox({  // 初始化显示等级下拉框
        data: []
    });
    $("#msg").hide();
    $("#reference").combobox({
        onLoadSuccess: function () {
            var val = $(this).combobox('getData');
            var value = $(this).combobox('getValue');
            if (value == null || value == "") {
                $(this).combobox('select', val[0].name);

            }
        }
    });
    $("#submit_saveParam").bind('click', function () {//添加点击事件
        saveParam({start: 1});
    });
}

/**
 * 编辑地图参数
 */
function updParam() {
    var rows = $("#dg_param").datagrid('getSelections');
    if (rows.length > 1) {
        $.messager.alert('提示', '请选中一行！', 'info');
        return;
    }
    var row = $("#dg_param").datagrid('getSelected');
    if (row == null) {
        $.messager.alert('提示', '请选中一行！', 'info');
        return;
    } else {
        $("#form_saveParam").form('clear');
        $('#form_saveParam .easyui-combobox').combobox('reload');//刷新combobox
        $("#form_saveParam").form('load', row);
        $("#dlg_param").dialog('open').dialog('center').dialog('setTitle', '编辑');
        $("#submit_saveParam").unbind();//解除事件绑定
        $("#submit_saveParam").bind('click', function () {//添加点击事件
            saveParam();
        });
    }
}

/**
 * 保存地图参数
 * @param param
 */
function saveParam(param) {
    if (parseInt($("#minZoom").combobox('getText')) <= parseInt($("#zoom").combobox('getText')) && parseInt($("#zoom").combobox('getText')) <= parseInt($("#maxZoom").combobox('getText'))) {
        $('#form_saveParam').form('submit', {
            url: ctx + "/agsupport/param/saveParam",
            onSubmit: function () {
                return $(this).form('validate');
            },
            success: function (data) {
                var data = eval('(' + data + ')');
                if (data.success) {
                    $("#dlg_param").dialog('close');
                    queryParam(param);
                } else {
                    $.messager.alert('提示', data.message, 'warning');
                }
            },
            error: function () {
                $.messager.alert('警告', '请求远程数据失败！', 'error');
            }
        });
    } else {
        $.messager.alert('提示', '最小显示等级 <= 初始化显示等级 <= 最大显示等级！', 'warning');
    }
}

/**
 * 删除
 */
function delParam() {
    var rows = $("#dg_param").datagrid('getSelections');
    if (rows.length == 0) {
        $.messager.alert('警告', '至少选择一项！', 'info');
        return;
    } else {
        $.messager.confirm('确认', '确定删除选中的参数？', function (r) {
            if (r) {
                var paramIds = null;
                $.each(rows, function (i, row) {
                    if (i == 0) {
                        paramIds = row.id;
                    } else {
                        paramIds += ',' + row.id;
                    }
                });
                $.post(ctx + '/agsupport/param/deleteParam', {paramIds: paramIds}, function (result) {
                    if (result.success) {
                        queryParam();
                    } else {
                        $.messager.alert('提示', '删除失败！', 'error');
                    }
                }, 'json');
            }
        });
    }
}

/**
 * 导出地图参数
 */
function exportParam() {
    var form_json = jsonform('form_saveParam');
    if (form_json.id != undefined) delete form_json.id;//删除id属性
    window.open(ctx + '/agsupport/param/exportParam?jsonString=' + JSON.stringify(form_json));
}



function exporttoexcel(tableId) {
    window.open(ctx + '/datacatalog/exporttoexcel/' + tableId  );

}