dojoConfig = {
has: {
    "dojo-firebug": false,//加载Dojo版的Firebug调试环境，如果浏览器没有自带调试工具，可以用这个
    "dojo-debug-messages": false//显示调试信息，针对于一些废弃的或测试中的功能特性在运行时的信息
},
    async: true,
    parseOnLoad:true,
    packages: [
             {
                 name: "custom",
                 location: "../custom"
             }
        ]
};

//找到arcgis_js_api/init.js的路径
function getScriptLocation() {
    var scripts = document.getElementsByTagName("script");
    var match;
	var result;
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src;
        var match = src.match(/(file|http|https):\/+(.*\/arcgis_js_api\/)init.js$/);
        if (match) {
			result=match[2];
            break;
        }
		match = src.match(/(.*\/arcgis_js_api\/)init.js$/);
		if(match){
			result='10.194.170.65:8010/awater_ui_sys/scripts/arcgis_js_api/';
            break;
		}
    }
    if (match) {
        return result;
    } else {
        alert("找不到arcgis_js_api/init.js的位置");
    }
}
 