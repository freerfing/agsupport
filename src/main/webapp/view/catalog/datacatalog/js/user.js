/**
 * 查询用户
 */
function queryUser(param) {
    var selected = $('#org_tree').tree('getSelected');
    if (selected && selected.tflag=='table') {
        reload(ctx + '/datacatalog/listfromtable/' + selected.attributes.NAME, param, 'form_user', 'dg_user');
    }


/*
    if (selected) {
        $('#dg_user').datagrid('showColumn', 'orgPath');
        $('#isContain').switchbutton('enable');
        if ($('#isContain').switchbutton('options').checked) {
            param = param ? $.extend({isContain: 1}, param) : {isContain: 1};
        } else {
            param = param ? $.extend({isContain: 0}, param) : {isContain: 0};
        }
        queryUserByXpath(param);
    } else {
        $('#dg_user').datagrid('hideColumn', 'orgPath');
        reload(ctx + '/swuser/userList', param, 'form_user', 'dg_user');
    }
    setTimeout(function () {
        queryRoleByUser({start: 1});
    }, 200);
    */
}

/**
 * 刷新用户
 */
function refreshUser() {
    queryUser();
}
/**
 * 清空表单
 * @param {} form
 */
function clean_form(form) {
    $('#isContain').switchbutton('disable');
    clean(form);
    loadOrgTree();
}

/**
 * 右键查询用户
 */
function queryOrgUser(url, param) {
    reload(url, param, 'form_orgUser', 'dlg_user_dg');
}

/**
 * 单击机构树查询User
 */
function queryUserByXpath(param) {
    var selected = $('#org_tree').tree('getSelected');
    reload(ctx + '/swuser/usersByXpath/' + selected.id, param, 'form_user', 'dg_user');
}

/**
 * 添加用户
 */
function addUser() {
    var selected = $('#org_tree').tree('getSelected');
    var params = null;
    if (selected) {
        params = {orgCode: selected.id};
    }
    $("#form_saveUser").form('clear');
    $('#form_saveUser .easyui-combobox').combobox('reload');//刷新combobox
    $("#isActive").combobox('setValue', '1');
    $("#isActive").combobox('readonly');
    $("#loginNamePanel").show();//显示登录名称
    $("#dlg_saveUser").dialog('open').dialog('center').dialog('setTitle', '添加用户');
    $("#submit_saveUser").unbind();//解除事件绑定
    $("#submit_saveUser").bind('click', function () {//添加点击事件
        saveUser(params);
    });
}

/**
 * 修改用户
 */
function updUser() {
    var rows = $("#dg_user").datagrid('getSelections');
    if (rows.length > 1) {
        $.messager.alert('警告', '请选中一行！', 'info');
        return;
    }
    var row = $("#dg_user").datagrid('getSelected');
    if (row == null) {
        $.messager.alert('警告', '请选中一行！', 'info');
        return;
    } else {
        $("#form_saveUser").form('clear');
        $('#form_saveUser .easyui-combobox').combobox('reload');//刷新combobox
        $("#form_saveUser").form('load', row);
        $("#isActive").combobox('readonly', false);
        $("#loginNamePanel").hide();//隐藏登录名称
        $('#password1').passwordbox({
            value: "password",
            editable: false,
            icons: [{
                iconCls: 'icon-edit',
                handler: function (e) {
                    $('#password1').passwordbox({
                        value: "",
                        editable: true
                    });
                    $('#confirmPassword1').passwordbox({
                        value: "",
                        editable: true
                    });
                    $('#password').val("");
                }
            }]
        });
        $('#confirmPassword1').passwordbox({
            value: "password",
            editable: false
        });
        $("#dlg_saveUser").dialog('open').dialog('center').dialog('setTitle', '编辑');
        $("#submit_saveUser").unbind();//解除事件绑定
        $("#submit_saveUser").bind('click', function () {//添加点击事件
            saveUser();
        });
    }
}

/**
 * 保存用户
 */
function saveUser(params) {
    params = params ? params : null;
    $('#form_saveUser').form('submit', {
        url: ctx + "/swuser/saveUser",
        onSubmit: function () {
            if ($(this).form('validate') && ($('#password').val() == null || $('#password').val() == "")) {
                $('#password').val(hex_md5($('#password1').val()));
            }
            return $(this).form('validate');
        },
        queryParams: params,
        success: function (data) {
            var data = eval('(' + data + ')');
            if (data.success) {
                $("#dlg_saveUser").dialog('close');
                queryUser({start: 1});
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
 * 删除用户
 */
function delUser() {
    var rows = $("#dg_user").datagrid('getSelections');
    if (rows.length == 0) {
        $.messager.alert('警告', '请至少选中一行！', 'info');
        return;
    } else {
        var userIds = null;
        if (rows.length > 0) {
            $.each(rows, function (i, row) {
                if (i == 0) {
                    userIds = row.id;
                } else {
                    userIds += ',' + row.id;
                }
            });
        }
        $.messager.confirm('确认', '确定删除选中的行？', function (r) {
            if (r) {
                $.post(ctx + '/swuser/deleteUsers', {userIds: userIds}, function (result) {
                    if (result.success) {
                        queryUser();
                    } else {
                        $.messager.alert('提示', '删除失败！', 'error');
                    }
                }, 'json');
            }
        });
    }
}

/**
 * 查询用户下的角色
 */
function queryRoleByUser(param) {
    var row = $("#dg_user").datagrid('getSelected');
    var userId = null;
    if (row != null) {
        userId = row.id;
    }
    reload(ctx + '/agsupport/role/roleListByUser/' + userId, param, 'form_role', 'dg_role');
}

/**
 * 检索角色
 * @param {} form
 */
function searchRole(form) {
    var param = jsonform(form);
    $('#dlg_role_dg').datagrid({
        method: 'POST',
        url: ctx + '/agsupport/role/roleDataList',
        queryParams: param
    });
}
/**
 * 授权角色
 */
function roleAuthor() {
    var rows = $("#dg_user").datagrid('getSelections');
    if (rows.length == 0) {
        $.messager.alert('警告', '至少选择一项！', 'info');
        return;
    } else {
        var userIds = null;
        if (rows.length > 0) {
            $.each(rows, function (i, row) {
                if (i == 0) {
                    userIds = row.id;
                } else {
                    userIds += ',' + row.id;
                }
            });
        }
        clean('form_role_dlg');
        searchRole('form_role_dlg');
        $("#dlg_roleAuthor").dialog('open').dialog('center').dialog('setTitle', '授权角色');
        $("#submit_roleAuthor").unbind();//解除事件绑定
        $("#submit_roleAuthor").bind('click', function () {//添加点击事件
            saveUserRole(userIds);
        });
    }
}

function saveUserRole(userIds) {
    var rows = $("#dlg_role_dg").datagrid('getChecked');
    var roleIds = null;
    if (rows.length == 0) {
        $.messager.alert('警告', '至少选择一项！', 'info');
        return;
    } else {
        $.each(rows, function (i, row) {
            if (i == 0) {
                roleIds = row.id;
            } else {
                roleIds += ',' + row.id;
            }
        });
        $.ajax({
            url: ctx + '/agsupport/role/authorUser',
            type: 'POST',
            data: {'roleIds': roleIds, 'userIds': userIds},
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    $("#dlg_roleAuthor").dialog('close');
                    queryUser();
                } else {
                    $.messager.alert('警告', '授权失败！', 'error');
                }
            },
            error: function (data) {
                $.messager.alert('警告', '请求远程数据失败！', 'error');
            }
        })
    }
}
/**
 * 移除角色
 */
function removeRole() {
    var rows = $('#dg_role').datagrid('getSelections');
    if (rows.length == 0) {
        $.messager.alert('提示', '至少选择一项！', 'info');
        return;
    } else {
        var userRoleIds = null;
        if (rows.length > 0) {
            $.each(rows, function (i, row) {
                if (i == 0) {
                    userRoleIds = row.userRoleId;
                } else {
                    userRoleIds += ',' + row.userRoleId;
                }
            });
        }
        $.messager.confirm('确认', '确定移除选中的角色？', function (r) {
            if (r) {
                $.post(ctx + '/agsupport/role/delUserRole', {userRoleIds: userRoleIds}, function (result) {
                    if (result.success) {
                        queryRoleByUser();
                    } else {
                        $.messager.alert('提示', '移除失败！', 'error');
                    }
                }, 'json');
            }
        });
    }
}
