var appSysIds = new Array();
var unclickable=false;
$(function() {
    // 加载用户第三方系统信息表格
    loadAppSys("dg_org_appSys","http://127.0.0.1/agsupport/swuser/appSys/allOrg/null");//机构使用
    loadAppSys("dg_appSys","/swuser/appSys/all");// 用户
});

// 用户/机构 选中第三方系统ID集合
function loadAppSys(dgAppSysId,ajaxUrl) { 
    $('#'+dgAppSysId).datagrid({
        url : ajaxUrl,
        width : "auto",
        height : "auto",
        pagination : true,
        rownumbers : false,
        border : false,
        striped : true,
        singleSelect : false,
        checkOnSelect : true,
        selectOnCheck : true,
        onBeforeLoad : function(data) {
            addSelectedAppSysIdsToArray(dgAppSysId);
        },
        onLoadSuccess : function(data) {
            var rowsData = data.rows;
            $.each(rowsData, function(i, row) {
                if(row.ck === true) {
                    addArrayValue(appSysIds, row.appSysId);
                }
            });
            if(appSysIds.length != 0) {
                $.each(appSysIds, function(i, appSysId){
                    for(var index=0; index<rowsData.length; index++) {
                        if(rowsData[index].appSysId == appSysId){
                            $('#'+dgAppSysId).datagrid('selectRow', index);
                        }
                    }
                });
            }
            if(unclickable){
                var rows= $('#'+dgAppSysId).datagrid('getPanel').find('tr.datagrid-row');
                rows.unbind('click').bind('click',function(e){
                    return false;
                });
            }
        },
        onCheck: function(rowIndex, row) {
            if(appSysIds.length == 0) {
                appSysIds.push(row.appSysId);
            } else {
                for (var index = 0; index < appSysIds.length; index++) {
                    if (appSysIds[index] == row.appSysId) {
                        break;
                    }
                    if (index == appSysIds.length - 1) {
                        appSysIds.push(row.appSysId);
                        break;
                    }
                }
            }
        },
        onUncheck : function(rowIndex, row){
            if(appSysIds.length == 0){
                return;
            } else {
                for(var index=0; index<appSysIds.length; index++){
                    if(appSysIds[index] == row.appSysId){
                        removeArrayValue(appSysIds, row.appSysId);
                        break;
                    }
                }
            }
        },
        onSelectAll : function(rows) {
            addSelectedAppSysIdsToArray(dgAppSysId);
        },
        onUnselectAll : function(rows) {
            if(rows.length > 0) {
                for(var i=0; i<rows.length; i++) {
                    removeArrayValue(appSysIds, rows[i].appSysId);
                }
            }
        },
        columns : [ [
            {field : 'ck', checkbox:true},
            {field : 'appSysId', title: '第三方系统ID', hidden:true},
            {field : 'appName', title : '系统ID', width : '30%'},
            {field : 'appCNName', title : '系统名称', width : '38%'},
            {field : 'appUrl', title : '首页URL', width : '30%'}
        ] ]
    });
    return appSysIds;
};

function addSelectedAppSysIdsToArray(dgAppSysId) {
    var rows = $('#'+dgAppSysId).datagrid('getSelections');
    if (rows.length > 0) {
        $.each(rows, function (i, row) {
            if (appSysIds.length == 0) {
                appSysIds.push(row.appSysId);
            } else {
                for (var index = 0; index < appSysIds.length; index++) {
                    if(appSysIds[index] == row.appSysId) {
                        break;
                    }
                    if(index == appSysIds.length - 1) {
                        appSysIds.push(row.appSysId);
                        break;
                    }
                }
            }
        });
    }
}

function removeArrayValue(appSysIds, appSysId) {
    for (var i=0; i <appSysIds.length; i++) {
        if (appSysIds[i] == appSysId) {
            appSysIds.splice(i, 1);
            break;
        }
    }
}

function addArrayValue(appSysIds, appSysId) {
    if(appSysIds.length === 0) {
        appSysIds.push(appSysId);
        return;
    }

    for (var i=0; i <appSysIds.length; i++) {
        if (appSysIds[i] == appSysId) {
            break;
        }

        if(i == appSysIds.length - 1) {
            appSysIds.push(appSysId);
            break;
        }
    }
}
function setChoosableState(dgAppSysId,flag){
    
    $("#"+dgAppSysId).find('input:checkbox[name="ck"]').each(function (index, el) {
     //先选中所有复选框                      
        el.disabled  = flag;
    });
    
}