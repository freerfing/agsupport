<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>水务一张图菜单项配置</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=11;IE=10;IE=9;IE=8; IE=EDGE" />
    <link rel="stylesheet" type="text/css" href="../lib/layui/css/layui.css" />
    <script src="../lib/layui/layui.js"></script>
</head>
<body class="layui-container">
    <div class="layui-col-md12">
        <form class="layui-form" action="">
            <div class="layui-form-item">
                <label class="layui-form-label">菜单范围：</label>
                <div class="layui-input-block">
                    <div style="width: 30%; float: left;">
                        <select id="menu" name="menu" lay-verify="">
                            <option value="">全部</option>
                            <option value="010">监测监控</option>
                            <option value="021">工程设施</option>
                            <option value="0571">专题图层</option>
                            <option value="0571">四标四实</option>
                        </select>
                    </div>
                    <div style="width: 30%; float: left;">
                        <select id="submenu" name="submenu" lay-verify="">
                            <option value="">全部</option>
                        </select>
                    </div>
                    <button class="layui-btn">查询</button>
                </div>
            </div>
        </form>
        <div id="subMenuItems_toolbar" style="display: none;">
            <button class="layui-btn">新增</button>
            <button class="layui-btn layui-btn-danger layui-btn-disabled">批量删除</button>
        </div>
        <table id="subMenuItemsTable" lay-filter="test"></table>
    </div>
</div>
<script>
	layui.use('table', function(){
		var table = layui.table;

		table.render({
			elem: '#subMenuItemsTable'
			,height: 312
			,url: 'http://127.0.0.1/awater/data/table.json' //数据接口
            ,where: {
				subMenuId: '',
				subMenuItemId: ''
            }
            ,toolbar: '#subMenuItems_toolbar'
			,page: true //开启分页
			,cols: [[ //表头
				{field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
				,{field: 'username', title: '用户名', width:80}
				,{field: 'sex', title: '性别', width:80, sort: true}
				,{field: 'city', title: '城市', width:80}
				,{field: 'sign', title: '签名', width: 177}
				,{field: 'experience', title: '积分', width: 80, sort: true}
				,{field: 'score', title: '评分', width: 80, sort: true}
				,{field: 'classify', title: '职业', width: 80}
				,{field: 'wealth', title: '财富', width: 135, sort: true}
			]]
		});

	});
</script>
</body>
</html>