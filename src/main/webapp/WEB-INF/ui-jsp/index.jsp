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
        <form class="layui-form" action="">
            <div class="layui-form-item">
                <label class="layui-form-label" style="width: 110px; font-weight: 600; text-align: left;">菜单范围：</label>
                <div class="layui-input-inline">
                    <select id="menu" name="menu" lay-verify="">
                        <option value="">全部</option>
                        <option value="010">监测监控</option>
                        <option value="021">工程设施</option>
                        <option value="0571">专题图层</option>
                        <option value="0571">四标四实</option>
                    </select>
                </div>
                <div class="layui-input-inline">
                    <select id="submenu" name="submenu" lay-verify="">
                        <option value="">全部</option>
                    </select>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn">查询</button>
                </div>
            </div>
        </form>
        <div id="subMenuItems_toolbar" style="display: none;">
            <button data-method="addSubMenuItem" class="layui-btn layui-btn-bind-click">新增</button>
            <button id="subMenuItemsRemoveBtn" data-method="removeSubMenuItems" class="layui-btn layui-btn-danger layui-btn-bind-click">批量删除</button>
        </div>
        <table id="subMenuItemsTable" lay-filter="subMenuItemsTableFilter"></table>
    </div>
<script>
    layui.config({ base: '../lib/layui/' }).use(['layer', 'table', 'form'], function(layer, table, form) {
		var $ = layui.$, modal = {
			checkedIds: [],
			addSubMenuItem: function() {
				var _this = this;
                layer.open({
                    type: 1,
                    title: '新增地图子菜单项',
                    content: $('#subMenu_item_add'),
                    area: ["600px", "254px"]
                });
			},
			removeSubMenuItems: function() {
				debugger
                if(modal.checkedIds.length < 1) {
                	layer.msg('至少选择一条记录操作', { icon: 2, time: 3000 });
                	return;
                }

				$.ajax({
					type: 'POST',
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					url: "submenu/delItemInfo",
					data: { id: modal.checkedIds.join(',') },
					success: function (resp) {
						if(resp.code != '200') {
							layer.msg(resp.msg || '删除失败', { icon: 2, time: 3000 });
						} else {
							modal.checkedIds = [];
							layer.msg('删除成功', { icon: 1, time: 2000 });
							subMenuItemTable.reload();
						}
					},
					error: function(xhr, errorMsg, error) {
						layer.msg('删除失败', { icon: 2, time: 3000 });
					}
				});
            },
			closeDialog: function() {
				layer.close();
            },
            toggleCheckBox: function(row) {
				var data, index;
				if(row.type === 'all') {
					if(row.checked) {
						modal.checkedIds = [];
						data = table.checkStatus('subMenuItemsTable').data;
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
		}, subMenuItemTable;

		// 页面所有按钮绑定事件
        $(document).on('click', '.layui-btn-bind-click', function() {
			var othis = $(this), method = othis.data('method');
			modal[method] ? modal[method].call(this, othis) : '';
        });

		// 初始化表格
		subMenuItemTable = table.render({
			elem: '#subMenuItemsTable',
			height: 500,
			url: 'http://127.0.0.1/awater/map/submenu/listItemInfo', //数据接口
			method: 'post',
			where: {
				subMenuId: '',
				subMenuItemId: ''
			},
			toolbar: '#subMenuItems_toolbar',
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
					title: '子菜单项目名',
					width: 200
				},
				{
					field: 'type',
					title: '类型',
					width: 120,
					templet: function(row) {
						return row.type === '0'? '内嵌页面' : '模块化';
					},
					sort: true
				},
				{
					field: 'url',
					title: '业务系统URL',
					width: 360
				},
				{
					field: 'mapUrl',
					title: '地图URL',
					width: 360
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
        table.on('checkbox(subMenuItemsTableFilter)', modal.toggleCheckBox);

		// form绑定事件
		form.on('submit(submenuItemSaveFilter)', function(formData) {
			var data = $.extend({}, formData.field, { type: '1' });

			$.ajax({
				type: 'POST',
				contentType: "application/x-www-form-urlencoded",
				dataType: "json",
				url: "submenu/saveItemInfo",
				data: data,
				success: function (resp) {
					if(resp.code != '200') {
						layer.msg(resp.msg);
					} else {
						layer.msg('保存成功');
						layer.close();
                    }
				},
				error: function(xhr, errorMsg, error) {
					layer.msg('保存失败');
				}
			});

			return false;
		});
    });
</script>
</body>
</html>