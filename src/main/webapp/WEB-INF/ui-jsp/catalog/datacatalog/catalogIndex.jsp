<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <%--<%@ include file="/WEB-INF/ui-jsp/catalog/comm/meta-easyui-taglibs.jsp" %>--%>
    <%@ include file="../comm/meta-easyui-taglibs.jsp" %>
    <title>数据资源目录</title>
    <%--<script type="text/javascript" src="${ctx}/agcloud/opus/ui/login/md5.js"></script>--%>

    <%--<script type="text/javascript" src="${ctx}/agcom/ui/sc/user/js/org.js"></script>--%>
    <script type="text/javascript" src="${ctx}/view/catalog/datacatalog/js/org.js"></script>

    <%--<script type="text/javascript" src="${ctx}/agcom/ui/sc/user/js/user.js"></script>--%>
    <script type="text/javascript" src="${ctx}/view/catalog/datacatalog/js/user.js"></script>

    <link rel="stylesheet" type="text/css" href="${ctx}/view/catalog/datacatalog/css/user.css"/>
    <script type="text/javascript">
        function onresize() {
            $('#body_div').layout('resize');
        }

        function formatCellTooltip(value) {
            return "<span title='" + value + "'>" + value + "</span>";
        }
        function formatYESorNO(value) {
            if (value == '0') {
                return "<span style=\"color:red\">否</span>";
            } else if (value == '1') {
                return "<span style=\"color:green\">是</span>";
            }
        }

        function testxy(str) {
            if (typeof(str)=='string')
                alert('is string');
            else
                alert('not string');
        }
        function openWinNew(html,iWidth,iHeight,location){
            var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
            var iLeft = (window.screen.availWidth-10-iWidth)/2;           //获得窗口的水平位置;
            if (location) {
                window.open(html,'_blank','left=' + iLeft + ',top=' + iTop +  ',location=' + location + ',toolbar=no,menubar=no,scrollbars=yes,width=' + iWidth + ',height=' + iHeight );
            } else {
                window.open(html,'_blank','left=' + iLeft + ',top=' + iTop +  ',location=yes,toolbar=no,menubar=no,scrollbars=yes,width=' + iWidth + ',height=' + iHeight );
            }
        }

    </script>
</head>
<body class='easyui-layout' data-options='fit:true' id='body_div' onresize='onresize()'
      style="overflow-x:hidden;overflow-y:hidden;">
<%--<%@ include file="/WEB-INF/ui-jsp/catalog/comm/meta-easyui-loading.jsp" %>--%>
<%@ include file="../comm/meta-easyui-loading.jsp" %>
<div id="dialog">
    <!-- 右键菜单 -->
    <div id="mr" class="easyui-menu" style="width:120px;">
        <div onclick="appendOrg()" data-options="iconCls:'icon-add'">新建机构</div>
        <div onclick="appendUser()" data-options="iconCls:'icon-add'">添加用户</div>
        <div onclick="removeUser()" data-options="iconCls:'icon-remove'">移除用户</div>
        <div onclick="edit()" data-options="iconCls:'icon-edit'">编辑</div>
        <div onclick="removeOrg()" data-options="iconCls:'icon-remove'">删除</div>
    </div>
    <div id="mc" class="easyui-menu" style="width:120px;">
        <div onclick="appendOrg()" data-options="iconCls:'icon-add'">新建机构</div>
        <div onclick="appendUser()" data-options="iconCls:'icon-add'">添加用户</div>
        <div onclick="removeUser()" data-options="iconCls:'icon-remove'">移除用户</div>
        <div onclick="edit()" data-options="iconCls:'icon-edit'">编辑</div>
        <div onclick="removeOrg()" data-options="iconCls:'icon-remove'">删除</div>
    </div>
    <!-- 添加机构窗口 -->
    <div id="dlg_org" class="easyui-dialog" style="width:350px" closed="true" buttons="#dlg_buttons_org"
         data-options="modal:true,resizable:false,iconCls:'icon-edit1'">
        <form id="org_form" method="get" style="margin:0;padding:20px 30px">
            <div style="margin-bottom:6px">
                <input id="orgName" name="name" class="easyui-textbox" data-options="validType:'notNull'" label="机构名称:"
                       labelPosition="left" required="required" style="width:90%">
            </div>
            <div style="margin-bottom:6px">
                <input id="orgCode" name="orgCode" class="easyui-textbox" data-options="validType:'notNull'"
                       label="机构代码:" labelPosition="left" required="required" style="width:90%">
            </div>
        </form>
    </div>
    <div id="dlg_buttons_org">
        <a href="javascript:void(0)" id="submit_org" class="easyui-linkbutton c6" iconCls="icon-ok" onclick=""
           style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
           onclick="javascript:$('#dlg_org').dialog('close')" style="width:90px">取消</a>
    </div>
    <!-- 右键添加用户窗口 -->
    <div id="dlg_user" class="easyui-dialog" style="width:500px;height:445px;" closed="true" buttons="#dlg_buttons_user"
         data-options="modal:true">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north', border:false" style="overflow-y:hidden;">
                <div style="margin: 10px;width:auto;height:30px;">
                    <form id="form_orgUser" method="post">
                        <table>
                            <tr>
                                <td style="padding-right: 10px">
                                    <input class="easyui-textbox" label="用户姓名：" labelWidth="85%" data-options="width:230" type="text" name="userName"/>
                                </td>
                                <td style="padding-right: 10px" align="right" width="37%">
                                    <div style="float: left;margin-right: 3px;">
                                        <a href="#" id="search_user" class="easyui-linkbutton" iconCls="icon-search"
                                           onclick="">查询</a>
                                    </div>
                                    <div style="float: left;">
                                        <a href="#" class="easyui-linkbutton" iconCls="icon-undo"
                                           onclick="clean('form_orgUser');">清空</a>
                                    </div>

                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <div data-options="region:'center', border:false">
                <table id="dlg_user_dg" class="easyui-datagrid" style="width:auto;height:auto"
                       data-options="singleSelect:false,rownumbers:true,pagination:true,remoteSort:false,fit:true">
                    <thead>
                    <tr>
                        <th data-options="field:'ck',checkbox:true"></th>
                        <th data-options="field:'id', hidden:true">ID</th>
                        <th data-options="field:'orgUserId', hidden:true">关联ID</th>
                        <th data-options="field:'loginName',width:200,align:'left',formatter:formatCellTooltip">登录名称
                        </th>
                        <th data-options="field:'userName',width:200,align:'left',formatter:formatCellTooltip">用户姓名</th>
                        <th data-options="field:'orgPath',width:230,align:'left',formatter:formatCellTooltip">机构目录</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <div id="dlg_buttons_user">
        <a href="javascript:void(0)" id="submit_user" class="easyui-linkbutton c6" iconCls="icon-ok" onclick=""
           style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
           onclick="javascript:$('#dlg_user').dialog('close')" style="width:90px">取消</a>
    </div>
    <!-- 菜单栏添加用户窗口 -->
    <div id="dlg_saveUser" class="easyui-dialog" style="width:350px" closed="true" buttons="#dlg_buttons_saveUser"
         data-options="modal:true,resizable:false,iconCls:'icon-edit1'">
        <form id="form_saveUser" method="post" style="margin:0;padding:20px 30px">
            <input id="userId" name="id" type="hidden">
            <input id="password" name="password" type="hidden">
            <div style="margin-bottom:6px" id="loginNamePanel">
                <input id="loginName" name="loginName" class="easyui-textbox" data-options="validType:'loginName'"
                       label="登录名称:" labelPosition="left" required="required" style="width:90%">
            </div>
            <div style="margin-bottom:6px">
                <input id="userName" name="userName" class="easyui-textbox" data-options="validType:'notNull'"
                       label="用户姓名:" labelPosition="left" required="required" style="width:90%">
            </div>
            <div style="margin-bottom:6px">
                <input id="password1" name="password1" class="easyui-passwordbox" label="登录密码:"
                       data-options="validType:'password',showEye:false" labelPosition="left" required="required"
                       style="width:90%">
            </div>
            <div style="margin-bottom:6px">
                <input id="confirmPassword1" name="confirmPassword1" class="easyui-passwordbox"
                       data-options="validType:'equalTo[\'password1\']',showEye:false" label="确认密码" labelPosition="left"
                       required="required" style="width:90%">
            </div>
            <div style="margin-bottom:6px">
                <%--<select id="isActive" name="isActive" class="easyui-combobox" label="是否有效:" labelPosition="left"--%>
                        <%--required="true" data-options="editable:false,valueField:'value',textField:'name'--%>
                        <%--,panelHeight:'auto',url:'${ctx}/agsupport/dic/getAgDicByTypeCode/A006'" style="width:90%;">--%>
                <%--</select>--%>
            </div>
            <input id="appSysIds" name="appSysIds" class="easyui-textbox"
                   label="系统名称:" labelPosition="left" required="required" style="width:90%">


        </form>
    </div>
    <div id="dlg_buttons_saveUser">
        <a href="javascript:void(0)" id="submit_saveUser" class="easyui-linkbutton c6" iconCls="icon-ok" onclick=""
           style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
           onclick="javascript:$('#dlg_saveUser').dialog('close')" style="width:90px">取消</a>
    </div>
    <!-- 授权角色窗口 -->
    <div id="dlg_roleAuthor" class="easyui-dialog" closed="true" buttons="#dlg_buttons_roleAuthor"
         data-options="modal:true,width:465,height:350,iconCls:'icon-edit1'">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',border:false" style="overflow-y:hidden;">
                <div style="margin: 10px;width:auto;height:30px">
                    <form id="form_role_dlg" method="post">
                        <table>
                            <tr>
                                <td style="padding-right: 10px">
                                    <input class="easyui-textbox" label="角色名称：" labelWidth="85%"
                                           data-options="width:230" type="text" name="name"/>
                                </td>
                                <td style="padding-right: 10px" align="right" width="37%">
                                    <div style="float: left;margin-right: 3px;">
                                        <a href="#" class="easyui-linkbutton" iconCls="icon-search"
                                           onclick="searchRole('form_role_dlg')">查询</a>
                                    </div>
                                    <div style="float: left;">
                                        <a href="#" class="easyui-linkbutton" iconCls="icon-undo"
                                           onclick="clean('form_role_dlg');">清空</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <div data-options="region:'center', border:false">
                <table id="dlg_role_dg" class="easyui-datagrid" style="width:auto;height:auto"
                       data-options="singleSelect:false,rownumbers:true,pagination:false,remoteSort:false,fit:true">
                    <thead>
                    <tr>
                        <th data-options="field:'ck',checkbox:true"></th>
                        <th data-options="field:'id', hidden:true">ID</th>
                        <th data-options="field:'name',width:300,align:'left',formatter:formatCellTooltip">角色名称</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <div id="dlg_buttons_roleAuthor">
        <a href="javascript:void(0)" id="submit_roleAuthor" class="easyui-linkbutton c6" iconCls="icon-ok" onclick=""
           style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
           onclick="javascript:$('#dlg_roleAuthor').dialog('close')" style="width:90px">取消</a>
    </div>
</div>
<!-- 主页面-->
<div data-options="region:'center',border:false" style="width:auto;padding: 3px 3px;">
    <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true" title="资源目录" style="width:20%;">
            <table>
                <tr>
                    <td style="padding-left: 0px" align="center" width="600">
                        <div style="float: left">
                            <a href="#" class="easyui-linkbutton" data-options="plain:false"
                               onclick="javascript:$('#org_tree').tree('collapseAll')">全部折叠</a>
                            <a href="#" class="easyui-linkbutton" data-options="plain:false"
                               onclick="javascript:$('#org_tree').tree('expandAll')">全部展开</a>
                        </div>
                        <c:if test="${imp}">
                            <div style="float: right">
                                <a href="#" class="easyui-linkbutton" iconCls="icon-search"
                                   onclick="importOrgUser()">导入</a>
                            </div>
                        </c:if>
                    </td>
                </tr>
            </table>
            <ul id="org_tree" class="easyui-tree" data-options="animate:true"></ul>
        </div>
        <div data-options="region:'center',border:false" style="width:auto">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'center',split:true,border:false" style="width:100%;">
                    <div class="easyui-layout" data-options="fit:true">
                        <div data-options="region:'north',collapsible:false" title="表内容" style="overflow-y:hidden;">
                            <div style="margin: 10px;width:auto;height: 60px;">
                                <form id="form_user" method="post">
                                    <table>
                                        <tr>
                                            <td style="padding-right: 10px">
                                                <input id="userNameSearch" class="easyui-textbox" label="名称："
                                                       labelWidth="85%" data-options="width:230" type="text"
                                                       name="userName"/>
                                            </td>
                                            <td style="padding-right: 10px" align="right" width="50%">
                                                <div style="float: left;margin-right: 3px;">
                                                    <a href="#" class="easyui-linkbutton" iconCls="icon-search"
                                                       onclick="queryUser({start:1})">查询</a>
                                                </div>
                                                <div style="float: left;">
                                                    <a href="#" class="easyui-linkbutton" iconCls="icon-undo"
                                                       onclick="clean_form('form_user');">清空</a>
                                                </div>
                                                <%--<div style="float: left;">--%>
                                                    <%--<a href="#" class="easyui-linkbutton" iconCls="icon-undo"--%>
                                                       <%--onclick="testxy(123);">测试</a>--%>
                                                <%--</div>--%>
                                                <div style="float: right;">
                                                    <a href="#" class="easyui-linkbutton" iconCls="icon-undo"
                                                       onclick="javascrip:window.open('${ctx}/datacatalog/getChangeData/6F9619FF-8B86-D011-B42D-00C04FC964CC'); ">查看</a>

                                                    <%--<a href="#" class="easyui-linkbutton" iconCls="icon-undo"  6F9619FF-8B86-D011-B42D-00C04FC964CC 0D4A4567-E54B-4FA6-BBC2-276A3526E47C --%>
                                                       <%--onclick="openWinNew('${ctx}/datacatalog/getChangeData/6F9619FF-8B86-D011-B42D-00C04FC964CC',600,400)">查看</a>--%>

                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </form>
                            </div>
                        </div>
                        <div data-options="region:'center', border:false">
                            <div id="tbar_user" style="height:auto;">
                                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true"
                                   onclick="addUser()">新增</a>
                                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit1',plain:true"
                                   onclick="updUser()">修改</a>
                                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true"
                                   onclick="delUser()">删除</a>
                                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload',plain:true"
                                   onclick="refreshUser()">刷新</a>

                            </div>
                            <table id="dg_user" class="easyui-datagrid" style="width:auto;height:auto"
                                   data-options="singleSelect:true,rownumbers:true,pagination:true,toolbar:'#tbar_user',remoteSort:false,fit:true">
                                <thead>
                                <tr>
                                    <th data-options="field:'ck',checkbox:true"></th>
                                    <th data-options="field:'id', hidden:true">ID</th>
                                    <th data-options="field:'rvcd',width:'10%',align:'left',formatter:formatCellTooltip">
                                        河流代码
                                    </th>
                                    <th data-options="field:'rvnm',width:'10%',align:'left',formatter:formatCellTooltip">
                                        河流名称
                                    </th>
                                    <th data-options="field:'rvtp',width:'10%',align:'left',formatter:formatCellTooltip">
                                        河流类别
                                    </th>
                                    <th data-options="field:'dwwt',width:'10%',align:'left',formatter:formatCellTooltip">
                                        汇入水域
                                    </th>
                                    <th data-options="field:'hwps',width:'10%',align:'left',formatter:formatCellTooltip">
                                        河源位置
                                    </th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</body>
</html>
