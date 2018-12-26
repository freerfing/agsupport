<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>一体化平台后台管理</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=11;IE=10;IE=9;IE=8; IE=EDGE" />
    <link rel="stylesheet" type="text/css" href="../lib/layui/css/layui.css" />
    <link rel="stylesheet" type="text/css" href="../styles/main.css" />
    <script src="../lib/layui/layui.js"></script>
</head>
<body class="layui-container">
    <div class="layui-col-md12">
        <div id="menus_toolbar" style="display: none;">
            <button data-method="addMenuBtnClick" class="layui-btn layui-btn-bind-click">新增</button>
            <button id="menusRemoveBtn" data-method="removeMenus" class="layui-btn layui-btn-danger layui-btn-bind-click">批量删除</button>
        </div>
        <table id="menuTreeTable" lay-filter="menuTreeTableFilter"></table>
    </div>
    <form id="menu_save" class="layui-form" method="post" lay-filter="menuSaveFormFilter" style="display: none; padding: 16px;">
        <input type="hidden" class="layui-input" name="id" />
        <input type="hidden" class="layui-input" name="pid" />
        <div class="layui-form-item">
            <label class="layui-form-label">名称</label>
            <div class="layui-input-block">
                <input type="text" name="name" class="layui-input" lay-verify="required" placeholder="请输入菜单名称" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">链接</label>
            <div class="layui-input-block">
                <input type="text" name="url" class="layui-input" placeholder="请输入菜单链接URL" />
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">显示</label>
            <div class="layui-input-block">
                <input type="checkbox" checked="" name="isDisplay" lay-skin="switch" lay-text="显示|隐藏" value="1">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block flex-row-center" style="margin-left: 0;">
                <button lay-submit lay-filter="menuSaveFilter" class="layui-btn">确定</button>
                <button data-method="closeDialog" class="layui-btn layui-btn-primary layui-btn-bind-click">取消</button>
            </div>
        </div>
    </form>
<script>
    layui.config({ base: '../lib/layui/extend/' }).extend({ treeGrid: 'treeGrid' }).use(['jquery', 'layer', 'treeGrid', 'form'], function($, layer, treeGrid, form) {
		var modal = {
			checkedIds: [],
            layerDialogIndex: undefined,
			addMenuBtnClick: function(title, row) {
				title = (typeof title === 'string')? title : undefined;
				if(row) {
					form.val("menuSaveFormFilter", row.data);
                } else {
					// 初始化form信息
					form.val("menuSaveFormFilter", {
						id: '',
						pid: '',
						name: '',
						url: '',
						isDisplay: '1'
					});
                }

				modal.layerDialogIndex = layer.open({
                    type: 1,
                    title: title || '菜单新增',
                    content: $('#menu_save'),
                    area: ["600px", "300px"]
                });
			},
			removeMenus: function() {
                if(modal.checkedIds.length < 1) {
                	layer.msg('至少选择一条记录操作', { icon: 2, time: 3000 });
                	return;
                }
				layer.confirm("您确定删除数据吗？此操作会删除选中的菜单和其下级所有菜单，您还要继续吗？", {icon: 3, title:'提示'}, function(localIndex) {
					$.ajax({
						type: 'POST',
						contentType: "application/x-www-form-urlencoded",
						dataType: "json",
						url: "delMenus",
						data: { id: modal.checkedIds.join(',') },
						success: function (resp) {
							if(resp.code != '200') {
								layer.msg(resp.msg || '删除失败', { icon: 2, time: 3000 });
							} else {
								layer.close(localIndex);
								modal.checkedIds = [];
								layer.msg('删除成功', { icon: 1, time: 2000 });
								treeGrid.reload('menuTreeTable');
							}
						},
						error: function(xhr, errorMsg, error) {
							layer.msg('删除失败', { icon: 2, time: 3000 });
						}
					});
                });
            },
			closeDialog: function() {
				layer.close(modal.layerDialogIndex);
            },
            toggleCheckBox: function(row) {
				var data, index;
				if(row.type === 'all') {
					if(row.checked) {
						modal.checkedIds = [];
						data = treeGrid.checkStatus('menuTreeTable').data;
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
            removeMenu: function(row) {
				layer.confirm("您确定删除数据吗？此操作会删除当前菜单和下级所有菜单，您还要继续吗？", {icon: 3, title:'提示'}, function(localIndex) {
					$.ajax({
						type: 'POST',
						contentType: "application/x-www-form-urlencoded",
						dataType: "json",
						url: "delMenus",
						data: { id: row.data.id },
						success: function (resp) {
							if(resp.code != '200') {
								layer.msg(resp.msg || '删除失败', { icon: 2, time: 3000 });
							} else {
								layer.close(localIndex);
								modal.checkedIds = [];
								layer.msg('删除成功', { icon: 1, time: 2000 });
								treeGrid.reload('menuTreeTable');
							}
						},
						error: function(xhr, errorMsg, error) {
							layer.msg('删除失败', { icon: 2, time: 3000 });
						}
					});
				});
            },
			addChildMenu: function(row) {
				modal.addMenuBtnClick('菜单新增', {
					id: '',
					pid: row.data.id,
					name: '',
					url: '',
					isDisplay: '1'
				});
            },
			updateMenu: function(row) {
				modal.addMenuBtnClick('菜单更新', row);
            },
			clickOperation: function(row) {
				if(row.event && typeof modal[row.event] === 'function') {
					modal[row.event](row);
                }
            }
		};

		// 初始化表格
		treeGrid.render({
            id: 'menuTreeTable',
			elem: '#menuTreeTable',
			idField: 'id',
			height: 500,
			url: 'http://127.0.0.1/awater/menu/listMenus', //数据接口
			method: 'post',
			treeId: 'id',//树形id字段名称
			treeUpId: 'pid',//树形父id字段名称
			treeShowName: 'name',//以树形式显示的字段
			where: {},
			toolbar: '#menus_toolbar',
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
					title: '名称',
					width: 200
				},
				{
					field: 'url',
					title: '链接',
					width: 300
				},
				{
					field: 'dispOrder',
					title: '排序',
					width: 60
				},
				{
					field: 'isDisplay',
					title: '可见',
					width: 120,
                    templet: function(d) {
						return d.isDisplay === '1' ? '<span style="color: #009688">显示</span>' : '<span style="color: #ccc;">隐藏</span>'
                    }
				},
				{
					title: '操作',
					width: 186,
					templet: function(d) {
						return String()
                            + '<a class="layui-btn layui-btn-xs" lay-event="addChildMenu">添加子菜单</a>'
                            + '<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="updateMenu">修改</a>'
                            + '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="removeMenu">删除</a>';
					}
				}
			]],
			parseData: function(data) {
				var isSuccess = data.code === '200', ret;

				if(!isSuccess) {
					ret = {
						code: 1,
						msg: data.msg
                    }
                } else {
					ret = {
						code: 0,
						msg: data.msg,
						count: data.content.length,
						data: data.content
                    }
                }

                return ret;
			}
		});
		// 表格绑定事件
		treeGrid.on('checkbox(menuTreeTableFilter)', modal.toggleCheckBox);
		treeGrid.on('tool(menuTreeTableFilter)', modal.clickOperation);

		// form绑定事件
		form.on('submit(menuSaveFilter)', function(formData) {
			var data = $.extend({}, formData.field, { type: '1' });

			$.ajax({
				type: 'POST',
				contentType: "application/x-www-form-urlencoded",
				dataType: "json",
				url: "saveMenu",
				data: data,
				success: function (resp) {
					if(resp.code != '200') {
						layer.msg(resp.msg, { icon: 2, time: 3000 });
					} else {
						layer.msg('保存成功', { icon: 1, time: 2000 });
						treeGrid.reload('menuTreeTable');
						layer.close(modal.layerDialogIndex);
                    }
				},
				error: function(xhr, errorMsg, error) {
					layer.msg('保存失败', { icon: 2, time: 3000 });
				}
			});

			return false;
		});

		// 页面所有按钮绑定事件
		$(document).on('click', '.layui-btn-bind-click', function() {
			var othis = $(this), method = othis.data('method');
			modal[method] ? modal[method].call(this, othis) : '';
		});
    });
</script>
</body>
</html>