$(function () {

    $('#org_tree').tree({
        animate: true,
        method: 'GET',
        url: ctx + '/datacatalog/tree',
        //右键点击节点触发
            /*
        onContextMenu: function (e, node) {
            e.preventDefault();
            // 查找节点
            $('#org_tree').tree('select', node.target);
            var parent = $('#org_tree').tree('getParent', node.target);
            if (parent == null) {
                // 显示快捷菜单
                $('#mr').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            } else {
                // 显示快捷菜单
                $('#mc').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        },*/
        formatter: function (node) {
            return node.text;
        },
       // onBeforeExpand: function (node) {
       //     $("#org_tree").tree("options").url = ctx + "/agsupport/user/tree/" + node.id; //查找该节点子节点
       // },
        onClick: function (node) {
            if (node.tflag == 'table') {

               // alert(node.attributes.NAME);  alert(node.attributes.TABLEID);
                getTableField_Def_for_Datagrid( node.attributes.TABLEID );
                queryUser({start: 1});

                //var selected = $('#org_tree').tree('getSelected');
                //debugger
                // if (selected && selected.tflag=='table') {
                //     alert( ctx+'/datacatalog/listfromtable/' + selected.attributes.NAME)
                //     $.ajax({
                //         url: ctx+'/datacatalog/listfromtable/' + selected.attributes.NAME,
                //         type: 'POST',
                //         data: {},
                //         dataType: 'json',
                //         success: function (data) {
                //             debugger
                //             $('#dg_user').datagrid('loadData', data);
                //
                //         },
                //         error: function (data) {
                //             $.messager.alert('警告', '请求远程数据失败！', 'error');
                //         }
                //     })
                //
                // }



               // var selected = $('#org_tree').tree('getSelected');
               // if (selected && selected.tflag=='table') {
                //    reload(ctx + '/datacatalog/listfromtable/' + selected.attributes.NAME, {}, 'form_user', 'dg_user');
               // }
            }

        }
    });

    $('#dg_user').datagrid({
        onDblClickRow: function (index, row) {
          //  updUser();
        },
        onClickRow: function (index, row) {
          //  $('#dg_user').datagrid('clearChecked');
            $('#dg_user').datagrid('selectRow', index);
            //queryRoleByUser({start: 1});
        }
    });

    $('#isContain').switchbutton({
        disabled: true,
        checked: true,
        onChange: function (checked) {
            queryUser({start: 1});
        }
    });

    setTimeout(function () {  //延时加载
        var nodes = $('#org_tree').tree('getRoots');
        if (nodes.length != 0) {
          //  $('#org_tree').tree('select', nodes[0].target);
         //   $('#org_tree').tree('expand', nodes[0].target);
        }
       // queryUser({start: 1});
    }, 100);

    /**
     * 回车监听事件
     */
    $('#userNameSearch').textbox('textbox').keydown(function (e) {
        if (e.keyCode == 13) {
            queryUser({start:1});
        }
    });

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
function changeColumn(data){

    var arrays=[];
    var columnsArray=[];

    arrays.push({field:'ck',checkbox:true});
    arrays.push({field:'id', hidden:true});

    $(data).each(function(){
        arrays.push({field:'',title:'',align:'left'});
    });

    $.each(data, function (i, row) {
       arrays[i+2].field = row.name.toLowerCase();
       arrays[i+2].title = row.cname;
        if (row.type == 'Date') {
            arrays[i+2].formatter = formatDateFun;
        }
    });

    //最后一条记录不要了， '编辑状态'
    arrays.pop();

    columnsArray.push(arrays);//[[]]形式

    $('#dg_user').datagrid({
        columns:columnsArray
    });
}

function formatDateFun(val) {
    var time = "";
    try {
        var now = new Date(val.time);
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

        time = year + "/" + month + "/" + date  + " " + hour + ":" + minu + ":" + sec ;
    } catch (e) {
    }
    return time;
}
/**
 * 导入机构用户
 */
function importOrgUser(){
    $.messager.confirm('确认','是否导入机构用户？',function(r){
        if (r){
            $.ajax({
                url:ctx + '/agsupport/user/importOrgUser',
                type:'POST',
                dataType:'json',
                success: function(data){
                    if(data.success){
                        //$.messager.alert('提示','导入成功！','info');
                        loadOrgTree();
                        setTimeout(function () {  //延时加载
                            var nodes = $('#org_tree').tree('getRoots');
                            if (nodes.length != 0) {
                                $('#org_tree').tree('select', nodes[0].target);
                                $('#org_tree').tree('expand', nodes[0].target);
                            }
                            queryUser({start: 1});
                        }, 100);
                    } else {
                        $.messager.alert('提示','导入失败！','error');
                    }
                },
                error: function(data){
                    $.messager.alert('警告','请求远程数据失败！','error');
                }
            })
        }
    });
}

/**
 * 加载机构
 */
function loadOrgTree() {
    $("#org_tree").tree("options").url = ctx + "/agsupport/user/tree/all";
    $("#org_tree").tree("reload");
}

/**
 * 右键添加机构
 */
function appendOrg() {
    $("#dlg_org").dialog('open').dialog('center').dialog('setTitle', '添加机构');
    $("#org_form").form('clear');
    $("#submit_org").unbind();//解除事件绑定
    $("#submit_org").bind('click', function () {//添加点击事件
        saveOrg();
    });
}

function saveOrg() {
    var selected = $("#org_tree").tree('getSelected');
    $('#org_form').form('submit', {
        url: ctx + "/agsupport/user/saveOrg/" + selected.id,
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (data) {
            var data = eval('(' + data + ')');
            if (data.success) {
                $("#dlg_org").dialog('close');
                loadOrgTree();
                setTimeout(function () {
                    if (data.content) {
                        var node = $("#org_tree").tree('find', data.content);
                        $("#org_tree").tree('select', node.target);
                        $("#org_tree").tree('expandTo', node.target);
                    }
                    queryUser({start: 1});
                }, 100);
            } else {
                $.messager.alert('提示', data.message, 'warning');
            }
        },
        error: function () {
            $.messager.alert('警告', '请求远程数据失败！', 'error');
        }
    });
}

/**
 * 右键添加用户
 */
function appendUser() {
    $("#form_orgUser").form('clear');//清空查询表单
    queryOrgUser(ctx + '/agsupport/user/userList');
    $("#dlg_user_dg").datagrid('hideColumn', 'orgPath');//隐藏机构目录列
    $("#dlg_user").dialog({width: 500});//设置窗口宽度
    $("#dlg_user").dialog('open').dialog('center').dialog('setTitle', '添加用户');
    $("#search_user").unbind();//解除事件绑定
    $("#search_user").bind('click', function () {//添加点击事件
        queryOrgUser(ctx + '/agsupport/user/userList');
    });
    $("#submit_user").linkbutton({text: '保存'});
    $("#submit_user").unbind();//解除事件绑定
    $("#submit_user").bind('click', function () {//添加点击事件
        saveOrgUser();
    });
}

function saveOrgUser() {
    var selected = $("#org_tree").tree('getSelected');
    var ids = getSelKeyIds($('#dlg_user_dg'));
    if (ids.length == 0) {
        $.messager.alert('提示', '至少选择一条记录！', 'info');
        return;
    } else {
        var userIds = null;
        $.each(ids, function (i, value) {
            if (i == 0) {
                userIds = value;
            } else {
                userIds += ',' + value;
            }
        });
        $.ajax({
            url: ctx + '/agsupport/user/saveOrgUser',
            type: 'POST',
            data: {'orgCode': selected.id, 'userIds': userIds},
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    $("#dlg_user").dialog('close');
                    //$.messager.alert('提示','添加成功！','info');
                    queryUser({start: 1});
                } else {
                    $.messager.alert('提示', '添加失败！', 'error');
                }
            },
            error: function (data) {
                $.messager.alert('警告', '请求远程数据失败！', 'error');
            }
        })
    }
}

/**
 * 右键移除用户
 */
function removeUser() {
    var selected = $("#org_tree").tree('getSelected');
    $("#form_orgUser").form('clear');//清空查询表单
    queryOrgUser(ctx + '/agsupport/user/usersByXpath/' + selected.id, {isContain: 1, start: 1});
    $("#dlg_user_dg").datagrid('showColumn', 'orgPath');//显示机构目录列
    $("#dlg_user").dialog({width: 730});//设置窗口宽度
    $("#dlg_user").dialog('open').dialog('center').dialog('setTitle', '移除用户');
    $("#search_user").unbind();//解除事件绑定
    $("#search_user").bind('click', function () {//添加点击事件
        queryOrgUser(ctx + '/agsupport/user/usersByXpath/' + selected.id, {isContain: 1, start: 1});
    });
    $("#submit_user").linkbutton({text: '移除'});
    $("#submit_user").unbind();//解除事件绑定
    $("#submit_user").bind('click', function () {//添加点击事件
        delOrgUser();
    });
}

function delOrgUser() {
    var ids = getSelKeyIds($('#dlg_user_dg'), 'orgUserId');
    if (ids.length == 0) {
        $.messager.alert('提示', '至少选择一条记录！', 'info');
        return;
    } else {
        $.messager.confirm('确认', '确定移除？', function (r) {
            if (r) {
                var orgUserIds = null;
                $.each(ids, function (i, value) {
                    if (i == 0) {
                        orgUserIds = value;
                    } else {
                        orgUserIds += ',' + value;
                    }
                });
                $.ajax({
                    url: ctx + '/agsupport/user/delOrgUser',
                    type: 'POST',
                    data: {'orgUserIds': orgUserIds},
                    dataType: 'json',
                    success: function (data) {
                        $.messager.progress('close');
                        if (data.success) {
                            $("#dlg_user").dialog('close');
                            //$.messager.alert('提示','移除成功！','info');
                            queryUser({start: 1});
                        } else {
                            $.messager.alert('提示', '移除失败！', 'error');
                        }
                    },
                    error: function (data) {
                        $.messager.alert('警告', '请求远程数据失败！', 'error');
                    }
                })
            }
        });
    }
}

/**
 * 移除用户
 */
function removeOrgUser() {
    var selected = $("#org_tree").tree('getSelected');
    if (!selected) {
        $.messager.alert('提示', '请先选择机构！', 'info');
        return;
    }
    var ids = getSelKeyIds($('#dg_user'), 'orgUserId');
    if (ids.length == 0) {
        $.messager.alert('提示', '至少选择一条记录！', 'info');
        return;
    } else {
        $.messager.confirm('确认', '确定移除选中的用户？', function (r) {
            if (r) {
                var orgUserIds = null;
                $.each(ids, function (i, value) {
                    if (i == 0) {
                        orgUserIds = value;
                    } else {
                        orgUserIds += ',' + value;
                    }
                });
                $.ajax({
                    url: ctx + '/agsupport/user/delOrgUser',
                    type: 'POST',
                    data: {'orgUserIds': orgUserIds},
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {
                            $("#dlg_user").dialog('close');
                            //$.messager.alert('提示','移除成功！','info');
                            queryUser();
                        } else {
                            $.messager.alert('提示', '移除失败！', 'error');
                        }
                    },
                    error: function (data) {
                        $.messager.alert('警告', '请求远程数据失败！', 'error');
                    }
                })
            }
        });
    }
}

/**
 * 编辑机构
 */
function edit() {
    var selected = $("#org_tree").tree('getSelected');
    $("#orgName").textbox('setValue', selected.text);
    $("#orgCode").textbox('setValue', selected.id);
    $("#dlg_org").dialog('open').dialog('center').dialog('setTitle', '编辑机构');
    $("#submit_org").unbind();//解除事件绑定
    $("#submit_org").bind('click', function () {//添加点击事件
        updateOrg();
    });
}

function updateOrg() {
    var selected = $("#org_tree").tree('getSelected');
    $('#org_form').form('submit', {
        url: ctx + "/agsupport/user/updateOrg/" + selected.id,
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (data) {
            var data = eval('(' + data + ')');
            if (data.success) {
                $("#dlg_org").dialog('close');
                loadOrgTree();
                setTimeout(function () {
                    if (data.content) {
                        var node = $("#org_tree").tree('find', data.content);
                        $("#org_tree").tree('select', node.target);
                        $("#org_tree").tree('expandTo', node.target);
                    }
                    queryUser({start: 1});
                }, 100);
            } else {
                $.messager.alert('提示', data.message, 'warning');
            }
        },
        error: function () {
            $.messager.alert('警告', '请求远程数据失败！', 'error');
        }
    });
}

/**
 * 删除机构
 */
function removeOrg() {
    var selected = $("#org_tree").tree('getSelected');
    $.messager.confirm('确认', '确定删除？', function (r) {
        if (r) {
            $.post(ctx + '/agsupport/user/deleteOrg', {orgCode: selected.id}, function (result) {
                if (result.success) {
                    $('#isContain').switchbutton('disable');
                    loadOrgTree();
                    setTimeout(function () {  //延时加载
                        var nodes = $('#org_tree').tree('getRoots');
                        if (nodes.length != 0) {
                            $('#org_tree').tree('select', nodes[0].target);
                            $('#org_tree').tree('expand', nodes[0].target);
                        }
                        queryUser({start: 1});
                    }, 100);
                } else {
                    $.messager.alert('提示', '删除失败！', 'error');
                }
            },'json');
        }
    });
}