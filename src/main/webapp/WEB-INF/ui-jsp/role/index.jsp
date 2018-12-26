<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>角色配置</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=11;IE=10;IE=9;IE=8; IE=EDGE" />
    <link rel="stylesheet" type="text/css" href="../lib/layui/css/layui.css" />
    <link rel="stylesheet" type="text/css" href="../styles/main.css" />
    <script src="../lib/layui/layui.js"></script>
</head>
<body class="layui-container">
    <div class="row">
        <div class="layui-col-md12">
            <div id="rool_toolbar">
                <button data-method="addRole" class="layui-btn layui-btn-bind-click">新增</button>
                <button id="saveRoleBtn" data-method="saveRole" class="layui-btn layui-btn-normal layui-btn-bind-click">保存</button>
                <button id="roleRemoveBtn" data-method="removeRoles" class="layui-btn layui-btn-danger layui-btn-bind-click">批量删除</button>
            </div>
        </div>
    </div>
    <div class="layui-col-md5">
        <table id="roleTable" lay-filter="roleTableFilter"></table>
    </div>
    <div class="layui-col-md7">
        <div class="layui-tab layui-tab-card">
            <ul class="layui-tab-title">
                <li class="layui-this">基本信息</li>
                <li>菜单授权</li>
                <li>地图服务授权</li>
                <li>数据服务授权</li>
                <li>用户列表</li>
            </ul>
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">1</div>
                <div class="layui-tab-item">2</div>
                <div class="layui-tab-item">3</div>
                <div class="layui-tab-item">4</div>
                <div class="layui-tab-item">5</div>
            </div>
        </div>
    </div>
    <form id="role_add" class="layui-form" method="post" style="display: none; padding: 16px;">
        <div class="layui-form-item">
            <label class="layui-form-label">名称</label>
            <div class="layui-input-block">
                <input type="text" name="name" class="layui-input" lay-verify="required" placeholder="请输入角色名称" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">角色说明</label>
            <div class="layui-input-block">
                <textarea name="remark" placeholder="请输入角色说明" class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block flex-row-center" style="margin-left: 0;">
                <button lay-submit lay-filter="roleSaveFilter" class="layui-btn">确定</button>
                <button data-method="closeDialog" class="layui-btn layui-btn-primary layui-btn-bind-click">取消</button>
            </div>
        </div>
    </form>
<script>
    layui.config({ base: '../lib/layui/extend' }).use(['jquery', 'layer', 'table', 'form'], function($, layer, table, form) {
		var $ = layui.$, modal = {
			saveLayerIndex: undefined,
			checkedIds: [],
			addRole: function() {
				var _this = this;
				modal.saveLayerIndex = layer.open({
                    type: 1,
                    title: '角色新建',
                    content: $('#role_add'),
                    area: ["600px", "300px"]
                });
			},
			removeRoles: function() {
                if(modal.checkedIds.length < 1) {
                	layer.msg('至少选择一条记录操作', { icon: 2, time: 3000 });
                	return;
                }
				layer.confirm("您确定要删除选中的" + modal.checkedIds.length + "个角色吗？此操作会删除角色和授权全部信息，您还要继续吗？", {icon: 3, title:'提示'}, function(localIndex) {
					$.ajax({
						type: 'POST',
						contentType: "application/x-www-form-urlencoded",
						dataType: "json",
						url: "delRoles",
						data: { id: modal.checkedIds.join(',') },
						success: function (resp) {
							if(resp.code != '200') {
								layer.msg(resp.msg || '删除失败', { icon: 2, time: 3000 });
							} else {
								//layer.close(localIndex);
								modal.checkedIds = [];
								layer.msg('删除成功', { icon: 1, time: 2000 });
								roleTable.reload();
							}
						},
						error: function(xhr, errorMsg, error) {
							layer.msg('删除失败', { icon: 2, time: 3000 });
						}
					});
				});
            },
			closeDialog: function() {
				layer.close(modal.saveLayerIndex);
            },
            toggleCheckBox: function(row) {
				var data, index;
				if(row.type === 'all') {
					if(row.checked) {
						modal.checkedIds = [];
						data = table.checkStatus('roleTable').data;
						for(index in data) {
							modal.checkedIds.push(data[index].id);
                        }
					} else {
						modal.checkedIds = [];
					}
                } else {
					if(row.checked) {
						modal.checkedIds.push(row.data.id);
					} else {
						modal.checkedIds.pop(row.data.id);
					}
                }
            },
		}, roleTable;

		// 页面所有按钮绑定事件
        $(document).on('click', '.layui-btn-bind-click', function() {
			var othis = $(this), method = othis.data('method');
			modal[method] ? modal[method].call(this, othis) : '';
        });

		// 初始化表格
		roleTable = table.render({
			elem: '#roleTable',
			height: 500,
			url: 'http://127.0.0.1/awater/role/listRoles', //数据接口
			method: 'post',
			where: {},
			//toolbar: '#rool_toolbar',
			page: false, //开启分页
			cols: [[ //表头
				{
					field: 'id',
					title: 'ID',
					width: 40,
					fixed: 'left',
					type: 'checkbox'
				},
				{
					field: 'name',
					title: '角色名称',
					width: 200
				},
				{
					field: 'remark',
					title: '角色说明',
					width: 200
				}
			]],
			parseData: function(data) {
				return {
					code: data.code === '200'? 0 : 1,
					msg: data.msg,
					count: data.content.length,
					data: data.content
				}
			}
		});
		// 表格绑定事件
        table.on('checkbox(roleTableFilter)', modal.toggleCheckBox);

		// form绑定事件
		form.on('submit(roleSaveFilter)', function(formData) {
			$.ajax({
				type: 'POST',
				contentType: "application/x-www-form-urlencoded",
				dataType: "json",
				url: "saveRole",
				data: formData.field,
				success: function (resp) {
					if(resp.code != '200') {
						layer.msg(resp.msg, { icon: 2, time: 3000 });
					} else {
						layer.close(modal.saveLayerIndex);
						layer.msg('保存成功', { icon: 1, time: 2000 });
						roleTable.reload();
                    }
				},
				error: function(xhr, errorMsg, error) {
					layer.msg('保存失败', { icon: 2, time: 3000 });
				}
			});

			return false;
		});
    });
</script>
</body>
</html>