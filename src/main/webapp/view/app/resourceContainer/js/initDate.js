//时间框初始化代码
$(function(){
	 $("#searchStrat").textbox("setValue",threeTimeformatter()).datebox();
     $("#searchEnd").textbox("setValue",dqTimeformatter()).datebox();
     //指标时间
     $("#adStrat").textbox("setValue",indexFormatter()).datebox();
     $("#adEnd").textbox("setValue",dqTimeformatter()).datebox();
     $("#zlStrat").textbox("setValue",indexFormatter()).datebox();
     $("#zlEnd").textbox("setValue",dqTimeformatter()).datebox();
     $("#hxhylStrat").textbox("setValue",indexFormatter()).datebox();
     $("#hxhylEnd").textbox("setValue",dqTimeformatter()).datebox();
     $("#rjyStrat").textbox("setValue",indexFormatter()).datebox();
     $("#rjyEnd").textbox("setValue",dqTimeformatter()).datebox();
     $("#tmdStrat").textbox("setValue",indexFormatter()).datebox();
     $("#tmdEnd").textbox("setValue",dqTimeformatter()).datebox();
     $("#szStrat").textbox("setValue",indexFormatter()).datebox();
     $("#szEnd").textbox("setValue",dqTimeformatter()).datebox();
     var mycars=new Array("adStrat","zlStrat","hxhylStrat","rjyStrat","tmdStrat","szStrat","adEnd","zlEnd","hxhylEnd","rjyEnd","tmdEnd","szEnd","searchStrat","searchEnd");
     for (var int = 0; int < mycars.length; int++) {
		var date=mycars[int];
		initDate(date);
	}
})
 //指标数据,获取前两年的数据用来展示就行
    function indexFormatter(){
        var date = new Date();
        var y = date.getFullYear()-1;
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    }
//日期
function threeTimeformatter(){
    var date = new Date();
    var y = date.getFullYear()-1;
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
//日期
function dqTimeformatter(){
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
function initDate(dateId){
		$('#'+dateId).datebox({
	          onShowPanel: function () {//显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
	              span.trigger('click'); //触发click事件弹出月份层
	              if (!tds) setTimeout(function () {//延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔
	                  tds = p.find('div.calendar-menu-month-inner td');
	                  tds.click(function (e) {
	                      e.stopPropagation(); //禁止冒泡执行easyui给月份绑定的事件
	                      var year = /\d{4}/.exec(span.html())[0]//得到年份
	                      , month = parseInt($(this).attr('abbr'), 10); //月份，这里不需要+1
	                      $('#'+dateId).datebox('hidePanel').datebox('setValue', year + '-' + month); //设置日期的值
	                  });
	              }, 0);
	              yearIpt.unbind();//解绑年份输入框中任何事件
	          },
	          parser: function (s) {
	              if (!s) return new Date();
	              var arr = s.split('-');
	              return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);
	          },
	          formatter: function (d) {
	          var a = parseInt(d.getMonth())<parseInt('9')?'0'+parseInt(d.getMonth()+ 1):d.getMonth() + 1;
	          return d.getFullYear() + '-' +a; }
	      });
	      var p = $('#'+dateId).datebox('panel'), //日期选择对象
	      tds = false, //日期选择对象中月份
	      yearIpt = p.find('input.calendar-menu-year'),//年份输入框
	      span = p.find('span.calendar-text'); //显示月份层的触发控件
}