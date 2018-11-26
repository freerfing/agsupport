<%@ page contentType="text/html;charset=UTF-8"%>
<script type="text/javascript">
$.parser.onComplete = function () {
	$("#page_loading_mask").fadeOut("normal", function () {
	    $(this).remove();
	});
}
</script>
<div id='page_loading_mask' style='position: absolute;left: 0;top: 0;width: 100%;height: 100%;display: block;background: #FFFFFF;overflow-x:hidden;overflow-y:hidden;z-index: 999'>
	<div style='top: 40%; left: 40%; position: relative;'>正在加载数据，请稍候···</div>
</div>
