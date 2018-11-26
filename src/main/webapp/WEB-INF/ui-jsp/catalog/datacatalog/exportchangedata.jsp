<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <%@ include file="../comm/meta-easyui-taglibs.jsp" %>
    <title>数据列表</title>
    <%--<link rel="stylesheet" type="text/css" href="${ctx}/agcom/ui/sc/uploadifive/uploadifive.css">--%>
    <%--<script type="text/javascript" src="${ctx}/agcom/ui/sc/uploadifive/jquery.uploadifive.js"></script>--%>

    <script type="text/javascript" src="${ctx}/view/catalog/datacatalog/js/exportchangedata.js"></script>
    <script type="text/javascript">
        function onresize() {
            $('#body_div').layout('resize');
        }
        function formatCellTooltip(value) {
            return "<span title='" + value + "'>" + value + "</span>";
        }

        var vtableId = '${tableid}';
    </script>
    <style>
        .datagrid-btable .datagrid-cell {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .export-button:hover{
            cursor:pointer;
            background-color:#A9A9A9;
        }

        .popupdlg table {border-right:1px solid #000;border-bottom:1px solid #000}
        .popupdlg table td {border-left:1px solid #000;border-top:1px solid #000}

    </style>
</head>


<body class='easyui-layout' data-options='fit:true' id='body_div' onresize='onresize()'
      style="overflow-x:hidden;overflow-y:hidden;">
<%@ include file="../comm/meta-easyui-loading.jsp" %>
<div id="dialog">
    <!-- 菜单栏地图参数窗口 -->
    <div id="dlg_param" class="easyui-dialog" style="width:700px;height: 500px;" closed="true"
         buttons="#dlg_buttons_param" data-options="modal:true,resizable:false,iconCls:'icon-save'">

        <form id="form_saveParam" class="popupdlg" method="post" style="margin:0;padding:10px 30px;">
            <table id='idOldNewValTable' style="width:100%;height:100%; " >

            </table>
        </form>
    </div>

    <div id="dlg_buttons_param">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
           onclick="javascript:$('#dlg_param').dialog('close')" style="width:90px">取消</a>
    </div>
</div>

<!-- 主页面-->
<div data-options="region:'center',border:false" style="width:auto;padding: 3px 3px;">
    <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north', collapsible:false" title="数据列表" style="overflow-y:hidden;">
            <%--<div style="margin: 10px;width:auto;height: 60px;">--%>
                <%--<form id="form_param" method="post">--%>
                    <%--<table>--%>
                        <%--<tr>--%>
                            <%--<td style="padding-right: 10px">--%>
                                <%--<input id="paramNameSearch" class="easyui-textbox" label="名称：" labelWidth="55%"--%>
                                       <%--data-options="width:200" type="text" name="name"/>--%>
                            <%--</td>--%>
                            <%--<td style="padding-right: 10px" align="right" width="40%">--%>
                                <%--<div style="float: left;margin-right: 3px;">--%>
                                    <%--<a href="#" class="easyui-linkbutton" iconCls="icon-search"--%>
                                       <%--onclick="queryParam({start:1})">查询</a>--%>
                                <%--</div>--%>
                                <%--<div style="float: left;">--%>
                                    <%--<a href="#" class="easyui-linkbutton" iconCls="icon-undo"--%>
                                       <%--onclick="clean('form_param');">清空</a>--%>
                                <%--</div>--%>
                            <%--</td>--%>
                        <%--</tr>--%>
                    <%--</table>--%>
                <%--</form>--%>
            <%--</div>--%>
        </div>
        <div data-options="region:'center', border:false">
            <div id="tbar_param" style="height:auto;padding: 10px">
                <%--<c:if test="${imp}">--%>
                    <%--<a href="#" class="easyui-linkbutton" iconCls="icon-search" data-options="plain:true"--%>
                       <%--onclick="importMapParam()">导入</a>--%>
                <%--</c:if>--%>
                <%--<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="addParam()">新增</a>--%>
                <%--<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true"--%>
                   <%--onclick="updParam()">修改</a>--%>
                <%--<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true"--%>
                   <%--onclick="delParam()">删除</a>--%>
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:false"
                    onclick="exporttoexcel('${tableid}')">导出excel</a>
            </div>
            <table id="dg_param" class="easyui-datagrid" style="width:auto;height:auto"
                   data-options="singleSelect:true,rownumbers:true,pagination:true,toolbar:'#tbar_param',remoteSort:false,fit:true">
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
</body>
</html>