$(function () {
	$('#org_tree').tree({
		method: 'GET',
		url: top.agsupportUrl + '/swuser/tree/all',
		onContextMenu: function (e, node) {
			e.preventDefault();
		},
		formatter: function (node) {
			return node.text;
		},
		onBeforeExpand: function (node) {
			$("#org_tree").tree("options").url = top.agsupportUrl + "/swuser/tree/" + node.id; //查找该节点子节点
		},
		onClick: function (node) {
			var isLeaf = $('#org_tree').tree('isLeaf', node.target);
			if (isLeaf) {
				//如果是叶子机构 按ag_user_center_ex表的 disporder排序。用 {orgUserId : 1} 标识
				queryUserOnTreeNodeClick({start: 1, orgUserId:1});
			} else {
				//如果不是 叶子机构  仍用 姓名 排序。用 {orgUserId : 0} 标识
				queryUserOnTreeNodeClick({start: 1, orgUserId:0});
			}

			if(node.state=='open') {
				$("#org_tree").tree('collapse',node.target);
			} else {
				$("#org_tree").tree('expand',node.target);
			}
		},
		onLoadSuccess: function (node, data) {
			var nodes = $('#org_tree').tree('getRoots');
			if (nodes.length != 0) {
				$('#org_tree').tree('expand', nodes[0].target);
				var children = $('#org_tree').tree('getLeafChildren', nodes[0].target);
				if (children.length != 0) {
					$('#org_tree').tree('select', children[0].target);
					$('#org_tree').tree('expand', children[0].target);
				} else {
					$('#org_tree').tree('select', nodes[0].target);
				}

				queryUser({start: 1});
			}
		}
	});

	// 回车监听事件
	$('#userNameSearch').textbox('textbox').keydown(function (e) {
		if (e.keyCode == 13) {
			queryUser({start: 1});
		}
	});

});

function queryUserOnTreeNodeClick(param) {
	var selected = $('#org_tree').tree('getSelected');
	if (selected) {
		param = param ? $.extend({isContain: 1}, param) : {isContain: 1};
		queryUserByXpath_withoudFormSearchParam(param);

	} else {
		// 模拟单击
		setTimeout(function(){
			$("#_easyui_tree_1").addClass("tree-node-selected");   //设置第一个节点高亮
			var n = $("#org_tree").tree("getSelected");
			if(n!=null){
				$("#org_tree").tree("select",n.target);
				param = param ? $.extend({isContain: 1}, param) : {isContain: 1};
				queryUserByXpath_withoudFormSearchParam(param);
			}
		},3000);

	}
}

function queryUserByXpath(param) {
	var selected = $('#org_tree').tree('getSelected');
	reload(top.agsupportUrl + '/swuser/usersByXpathContactList/' + selected.id, param, 'form_user', 'dg_user');
}

function queryUserByXpath_withoudFormSearchParam(param) {
	var selected = $('#org_tree').tree('getSelected');
	reload(top.agsupportUrl + '/swuser/usersByXpathContactList/' + selected.id, param, '', 'dg_user');
}

// 查询用户
function queryUser(param) {
	debugger
	var selected = $('#org_tree').tree('getSelected');
	if (selected) {
		param = param ? $.extend({isContain: 1}, param) : {isContain: 1};
		queryUserByXpath(param);
	} else {
		setTimeout(function(){
			$("#_easyui_tree_1").addClass("tree-node-selected");   //设置第一个节点高亮
			var n = $("#org_tree").tree("getSelected");
			if(n!=null){
				$("#org_tree").tree("select",n.target);
				param = param ? $.extend({isContain: 1}, param) : {isContain: 1};
				queryUserByXpath(param);
			}
		},3000);
	}
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
	clean(form);
	queryUser({start:1});
}