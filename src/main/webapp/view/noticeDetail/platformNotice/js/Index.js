var loading=false;
$(function () {
    $('#org_tree').tree({
        animate: true,
        checkbox: true,
        method: 'GET',
        lines:true,//显示虚线效果 /
        url: "/agsupport/swuser/tree/allAuthor",
        //右键点击节点触发
        onContextMenu: function (e, node) {
            e.preventDefault();
            // 查找节点
            $('#org_tree').tree('select', node.target);
            var parent = $('#org_tree').tree('getParent', node.target);
            if (parent == null) {
                // 显示快捷菜单
                $('#mr').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            } else {
                // 显示快捷菜单
                $('#mc').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        },
        formatter: function (node) {
            return node.text;
        },
        onBeforeExpand: function (node) {
            $("#org_tree").tree("options").url = "http://127.0.0.1/agsupport/swuser/tree/" + node.id; //查找该节点子节点
        },
        onLoadSuccess:function(node, data){
        	$("#tab tr:not(:first)").remove(); 
	       	 var node = $('#org_tree').tree('getChildren');
	       	 var chilenodes = window.opener.document.getElementById("publishReleaseScop").value;//已经选中节点,默认选中
	       	 if(chilenodes==undefined || chilenodes=="" || chilenodes ==null)return;
	       	 var chilenode = chilenodes.split(",");
	       	 for(var j = 0; j<chilenode.length;j++){
	       		 for (var i = 0; i < node.length; i++) {
	               	 if(chilenode[j]==node[i].text){
	               		 $('#org_tree').tree('check', node[i].target);
	               		 continue;
	               	 }
	       		 }
	       	 }
        },
        onClick: function (node) {
        },
        onCheck: function(node){
        	$("#tab tr:not(:first)").remove(); 
        	var node = $('#org_tree').tree('getChecked');
	       	var chilenodes = '';
	       	var childIds = '';
			for (var i = 0; i < node.length; i++) {
				if ($('#org_tree').tree('isLeaf', node[i].target)) {
					var tr = "<tr><td><input type='checkbox' name='ids'/></td><td>"+node[i].text+"</td></tr>";
					$('#tab').append(tr);
					chilenodes += node[i].text + ',';
					childIds += node[i].id + ',';
				}
	       	}
            chilenodes = chilenodes.substring(0, chilenodes.lastIndexOf(','));
			childIds = childIds.substring(0, childIds.lastIndexOf(','));
            window.opener.document.getElementById("publishReleaseScop").value = chilenodes;
            window.opener.document.getElementById("publishReleaseScopIds").value = childIds;
        }
    });

    setTimeout(function () {  //延时加载
        var nodes = $('#org_tree').tree('getRoots');
        if (nodes.length != 0) {
            $('#org_tree').tree('select', nodes[0].target);
            $('#org_tree').tree('expand', nodes[0].target);
        }
    }, 100);
    
});

function dispUserList() {
     window.close();
}

function yichu(){
	$("input:checkbox[name='ids']:checked").each(function(){
		var trHtml =  $(this).parent().next().html();
		var node = $('#org_tree').tree('getChecked');
		for (var i = 0; i < node.length; i++) {
          	 if(trHtml==node[i].text){
          		 $('#org_tree').tree('uncheck', node[i].target);
          	 }
  		 }
	})
}
