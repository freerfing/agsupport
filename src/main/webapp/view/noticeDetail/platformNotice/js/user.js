// 初始化
$(function(){
    loadLoginUserPrivs();
});

/**
 * 查询用户
 */
function queryUser(param) {
    var selected = $('#org_tree').tree('getSelected');
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
    	// 模拟单击
    	setTimeout(function(){
    		$("#_easyui_tree_1").addClass("tree-node-selected");   //设置第一个节点高亮   
    	    var n = $("#org_tree").tree("getSelected"); 
    	    if(n!=null){   
    	         $("#org_tree").tree("select",n.target);    
    	         
    	         // 查询
    	         $('#dg_user').datagrid('showColumn', 'orgPath');
    	         $('#isContain').switchbutton('enable');
    	         if ($('#isContain').switchbutton('options').checked) {
    	             param = param ? $.extend({isContain: 1}, param) : {isContain: 1};
    	         } else {
    	             param = param ? $.extend({isContain: 0}, param) : {isContain: 0};
    	         }
    	         queryUserByXpath(param);
    	    } 
    	},3000);
    	/*
        $('#dg_user').datagrid('hideColumn', 'orgPath');
        reload(ctx + '/swuser/userList', param, 'form_user', 'dg_user');
        */
    }
    // setTimeout(function () {
    //     queryRoleByUser({start: 1});
    // }, 200);
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
 * 添加用户
 */
function addUser() {
    var selected = $('#org_tree').tree('getSelected');
    if(!selected){
        $.messager.alert('警告', '请选择机构！', 'info');
        return;
    }
    var params = null;
    var orgCode= selected.id;
    if (selected) {
        params = {orgCode:orgCode};
    }
    $("#form_saveUser").form('clear');
    $('#form_saveUser .easyui-combobox').combobox('reload');//刷新combobox
    $("#isActive").combobox('setValue', '1');
    $("#isActive").combobox('readonly');
    $("#loginNamePanel").show();//显示登录名称
    $("#dlg_saveUser").dialog('open').dialog('center').dialog('setTitle', '添加用户');
    // 清空之前选中的第三方系统数据
    appSysIds.splice(0, appSysIds.length);
    unclickable=false;//第三方系统 不可选
    if(orgCode){//如果新增，获取所选机构对应的orgCode
        reload(ctx + '/swuser/appSys/allOrg/'+orgCode, {start: 1}, null, 'dg_appSys');
    }else{
        reload(ctx + '/swuser/appSys/all', {start: 1}, null, 'dg_appSys');
    }
    
    
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
                
        // 加载用户拓展信息及组织机构
        $.ajax({
        	url:ctx + '/swuser/getUserExAndOrgsById',
        	cache:false,
            async:false,
        	data:{"id":row.id},
        	dataType:"json",
        	success:function(res){     		
        		
        		// 加载组织机构信息
        		var str='[';
        		var stra='';
        		var orgid='';
        		for(var i=0;i<res.orgs.length;i++){
        			if(res.orgs[i].xpath==row.orgPath){
        				stra=stra+',{"value":"'+res.orgs[i].id+'","name":"'+res.orgs[i].xpath+'","selected":true}';
        				orgid=res.orgs[i].id;
        			}else{
        				stra=stra+',{"value":"'+res.orgs[i].id+'","name":"'+res.orgs[i].xpath+'"}';
        			}     			
        		}
        		if(stra!=''){
        			stra=stra.substring(1);
        		}
        		str=str+stra+']';
        		var data = JSON.parse(str);
        		$("#orgId").combobox("loadData",data);
        		
        		// 加载拓展信息
        		$("#form_saveUser").form('load',{
        			identitynum:res.ex.identitynum,
        			officeTel:res.ex.officeTel,
        			mobile:res.ex.mobile,
        			fax:res.ex.fax,
        			email:res.ex.email,
        			memo1:orgid
        		});
        	}
        });
        
        $("#isActive").combobox('readonly', false);
        $("#loginNamePanel").hide();//隐藏登录名称
        /*
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
        */
        /*
        $('#confirmPassword1').passwordbox({
            value: "password",
            editable: false
        });
        */

        // 清空之前选中的第三方系统数据
        appSysIds.splice(0, appSysIds.length);        
        unclickable=true;//第三方系统 不可选
        reload(ctx + '/swuser/appSys/all', {userid: row.id, start: 1}, null, 'dg_appSys');
       
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
    params = params ? params : {};
    // 赋于选中的第三方系统ID值
    params.appSysIds = appSysIds;
    $('#form_saveUser').form('submit', {
        url: ctx + "/swuser/saveUser",
        onSubmit: function () {
            if ($(this).form('validate') && ($('#password').val() == null || $('#password').val() == "")) {
                $('#password').val(hex_md5($('#password1').val()));
            }
            // 保存新密码
            if($('#password1').val()!=null&&$('#password1').val()!=""){
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

/**
 * 授权机构
 */
function  orgAuthor() {
    var rows=$("#dg_user").datagrid('getSelections');
    if(rows.length==0){
        $.messager.alert('警告','至少选择一项！','info');
        return;
    }else{
        var userIds=null;
        if (rows.length > 0) {
            $.each(rows, function (i, row) {
                if (i == 0) {
                    userIds = row.id;
                } else {
                    userIds += ',' + row.id;
                }
            });
        }

        // 弹窗
        $("#dlg_orgAuthor").dialog('open').dialog('center').dialog('setTitle','授权');
        $("#submit_org_priv").unbind();
        $("#submit_org_priv").bind("click",function(){
            saveUserOrg(userIds);
        });
    }
}

/**
 * 授权回收
 */
function orgAuthorDel(){
	var rows=$("#dg_user").datagrid('getSelections');
    if(rows.length==0){
        $.messager.alert('警告','至少选择一项！','info');
        return;
    }else{
        var userIds=null;
        if (rows.length > 0) {
            $.each(rows, function (i, row) {
                if (i == 0) {
                    userIds = row.id;
                } else {
                    userIds += ',' + row.id;
                }
            });
        }

        // 删除
        $.ajax({
            url:ctx + '/swauthor/delUserOrg',
            type:'POST',
            data:{'userIds' : userIds, 'privs' : 'twoOrgAuthor,twoOrgAuthorOperation'},
            dataType:'json',
            success: function(data){
                if(data.success){
                    $.messager.alert('信息','操作成功！','info');
                    // window.location.reload();
                } else {
                    $.messager.alert('警告','授权回收失败！','error');
                }
            },
            error: function(data){
                $.messager.alert('警告','请求远程数据失败！','error');
            }
        });
    }
}

/**
 * 保存用户授权机构
 */
function saveUserOrg(){
    // 选择机构
    var checkboxs = $('#loginPrivDiv .privCheckBox');
    if(checkboxs) {
        var privs = '';
        var isFirstTime = true;
        for(var i=0; i<checkboxs.length; i++) {
            if(checkboxs[i].checked) {
                if(isFirstTime) {
                    privs += $(checkboxs[i]).attr('id');
                    isFirstTime = false;
                } else {
                    privs += ',' + $(checkboxs[i]).attr('id');
                }
            }
        }

        // 选择用户
        var rows = $("#dg_user").datagrid('getChecked');
        var userIds = '';
        if(rows.length == 0){
            $.messager.alert('警告','至少选择一项！','info');
            return;
        }
        $.each(rows,function(i,row){
            if(i == 0){
                userIds = row.id;
            } else {
                userIds += ',' + row.id;
            }
        });

        // 保存用户授权机构
        $.ajax({
            url:ctx + '/swauthor/saveUserOrg',
            type:'POST',
            data:{'userIds' : userIds, 'privs' : privs},
            dataType:'json',
            success: function(data){
                if(data.success){
                    $("#dlg_orgAuthor").dialog('close');
                    $.messager.alert('信息','操作成功！','info');
                    // window.location.reload();
                } else {
                    $.messager.alert('警告','授权失败！','error');
                }
            },
            error: function(data){
                $.messager.alert('警告','请求远程数据失败！','error');
            }
        });
    }
}

/**
 * 加载授权机构树
 */
function  loadLoginUserPrivs() {
    $.ajax({
        url:ctx + '/swauthor/findTreeByLoginUserAndCondition',
        type:'POST',
        data:{"key":"twoOrgAuthor"},
        dataType:'json',
        success: function(privs){
            var ul = '<ul class="privTree">';
            privs.forEach(function(priv){
                ul += '<li>'
                    + '<div class="tree-node privTreeRootNode" style="border-bottom: none;">'
                    + '<span class="tree-checkbox"><input class="privCheckBox" type="checkbox" id="' + priv.privCode + '"></span>'
                    + '<span class="tree-indent"></span>'
                    + '<span class="tree-hit" style="padding: 0 15px;display: none;">剩余有效时间：100天</span>'
                    + '<span class="tree-title">' + priv.privName + '</span>'
                    + '</div>';
                /*
                if(priv.children && priv.children.length > 0) {
                    ul += '<ul style="display: block;">';
                    priv.children.forEach(function(child) {
                        ul += '<li>'
                            + '<div class="tree-node">'
                            + '<span class="tree-checkbox"><input class="privCheckBox"  type="checkbox"  id="' + child.privCode + '" name="' + priv.privCode + '"></span>'
                            + '<span class="tree-indent"></span><span class="tree-indent"></span>'
                            + '<span class="tree-hit" style="padding: 0 15px;display: none;">剩余有效时间：100天</span>'
                            + '<span class="tree-title">' + child.privName + '</span>'
                            + '</div>'
                            + '</li>';
                    });

                    ul += '</ul>';
                }
                */
                ul += '</li>'
            });
            ul += "</ul>";
            $("#loginPrivDiv").html(ul);

            privCheckBoxBind(true);
        },
        error: function(data){
            $.messager.alert('警告','请求远程数据失败！','error');
        }
    })
}

/**
 * checkBox根据授权与回收操作制定操作
 * @param isAuthor 是否授权
 */
function privCheckBoxBind(isAuthor) {
    $(".privCheckBox").unbind();
    if(isAuthor) {// 授权绑定点击操作
        $(".privCheckBox").bind('click', function() {
            var name = $(this).attr("name");
            // 有name属性是二级权限
            if(name) {
                // 获取兄弟节点， 如果有一个checked的话，父节点也保持选中状态
                var checkElems = $('input[name="' + name + '"][type="checkbox"]');
                if(checkElems && checkElems.length > 0) {
                    var index = 0;
                    for(; index<checkElems.length; index++) {
                        if(checkElems[index].checked) {
                            $('input[id="' + name + '"][type="checkbox"]').prop('checked', checkElems[index].checked);
                            break;
                        }
                    }
                    if(index === checkElems.length) {
                        $('input[id="' + name + '"][type="checkbox"]').prop('checked', false);
                    }
                }
                return;
            }

            var id = $(this).attr("id");
            $('input[name="' + id + '"][type="checkbox"]').prop('checked', this.checked);
        });
    } else {// 回收绑定点击操作
        $(".privCheckBox").bind('click', function() {
            var name = $(this).attr("name");
            // 有name属性是二级权限
            if(name) {
                // 获取兄弟节点， 如果有一个checked的话，父节点也保持选中状态
                var checkElems = $('input[name="' + name + '"][type="checkbox"]');
                if(checkElems && checkElems.length > 0) {
                    var index = 0;
                    for(; index<checkElems.length; index++) {
                        if(!checkElems[index].checked) {
                            $('input[id="' + name + '"][type="checkbox"]').prop('checked', checkElems[index].checked);
                            break;
                        }
                    }
                    if(index === checkElems.length) {
                        $('input[id="' + name + '"][type="checkbox"]').prop('checked', true);
                    }
                }
                return;
            }

            var id = $(this).attr("id");
            $('input[name="' + id + '"][type="checkbox"]').prop('checked', this.checked);
        });
    }
};
