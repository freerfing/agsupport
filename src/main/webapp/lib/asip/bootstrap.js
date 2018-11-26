(function(win){
	/** 获取跟路径 **/
	var getRootPath = function() {
		var b, nodes, i, src, match, index;
		var srcPattern = /^(.*)lib\/asip\/bootstrap([\.\-].*)js(\?.*)?$/;
		var doc = win.document;
		nodes = (doc && doc.getElementsByTagName('script')) || [];
		for(i=0; i<nodes.length; i++){
			src = nodes[i].src;
			if(src){
				index = src.indexOf(";jsessionid=");
				if(index > 0){
					src = src.substring(0, index);
				}
				match = src.match(srcPattern);
				b = match && match[1];
				if(b) return b;
			}
		}
	},
	getCookie = function(name){ 
		var strCookie = win.document.cookie; 
		var arrCookie = strCookie.split("; "); 
		for(var i=0; i<arrCookie.length; i++){ 
			var arr = arrCookie[i].split("="); 
			if(arr[0]==name) return arr[1]; 
	    }
		return null;
	};
	/** 系统全局变量，请尽可能不要使用全局变量 **/
	win.auGurit = {};
	win.auGurit.global = {};
	/** 根目录 **/
	win.auGurit.global.rootPath = getRootPath();
	/** 脚本版本 '.min' 或  '',一般发版本使用'.min',调试使用 '' **/
	win.auGurit.global.scriptVersion = ".min";
	/** 是否脚本调试 **/
	win.auGurit.global.debug = true;
	win.auGurit.global.httpSessionValidFlag = true;
	if(win.auGurit.global.debug){
		win.auGurit.global.scriptVersion = "";
	}
	/** 是否禁止onbeforeunload事件的刷新 **/
	win.auGurit.global.unfreshFlag = false;
	/** 在cookie中获取色系 **/
	win.auGurit.global.style = (function(){
		var cookieStyle = getCookie("auGuritGlobalStyle");
		if(!cookieStyle || cookieStyle === ""){
			win.document.cookie = "auGuritGlobalStyle=custom";
		}
		//cookieStyle = cookieStyle || "black";
		cookieStyle = cookieStyle || "custom";
		return cookieStyle;
	})();
	/** 在cookie中获取logo名称，添加logo样式表 **/
	(function(){
		var logoName = getCookie('auGuritGlobalLogo');
		if(!logoName || logoName === "" || logoName === '""'){
			logoName = 'default.png';
		}
		var logoCss = document.createElement('style');
		logoCss.setAttribute('type', 'text/css');
		logoCss.setAttribute('rel', 'stylesheet');
		var styleText = '.app-logo{background:url(' + auGurit.global.rootPath +
                '/style/asip/common/css/images/logo/' + logoName + ') no-repeat 0px 0px;}';
		try{
			logoCss.appendChild(document.createTextNode(styleText));
		}catch(ex){
			//logoCss.stylesheet.cssText = styleText;
            logoCss.cssText = styleText;
		}
		document.getElementsByTagName("head").item(0).appendChild(logoCss);
	})();
	/** 为了保证bootstrap加载成功后再添加程序入口代码 **/
	var mainScript = document.createElement("script");
	mainScript.setAttribute("type", "text/javascript");
	mainScript.setAttribute("data-main", win.auGurit.global.rootPath + "view/main/main.js?t=" + (new Date()).getTime());
	mainScript.setAttribute("src", win.auGurit.global.rootPath + "lib/3rdparty/require/require-2.1.11.js?t=" + (new Date()).getTime());
	document.getElementsByTagName("head").item(0).appendChild(mainScript);
})(this);