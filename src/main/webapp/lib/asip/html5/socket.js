define(["jquery", "durandal/app", "swfobject"], function($, app, swfobject){
	//flex socket
	(function() {
		window.FlexWebSocket = function(socketServerIP, socketServerPort, socketServerPath) {
			this._socketServerIP = socketServerIP;
	    	this._socketServerPort = socketServerPort;
	    	this._socketServerPath = socketServerPath;
	    	this._swf = null;
	    	
	    	FlexWebSocket.__instances = this;
	    	
	    	var swfVersionStr = "10.0.0";
	        var xiSwfUrlStr = "playerProductInstall.swf";
	        var flashvars = {};
			flashvars.humanID = eUrban.global.humanID;
			flashvars.socketServerIP = socketServerIP;
			flashvars.socketServerPort = socketServerPort;
			flashvars.socketServerPath = socketServerPath;

	        var params = {};
	        params.quality = "high";
	        params.bgcolor = "#ffffff";
	        params.allowscriptaccess = "always";
	        params.allowfullscreen = "true";
	        var attributes = {};
	        attributes.id = "socket-msg-receiver";
	        attributes.name = "msgReceiver";
	        attributes.align = "middle";

	        $("body").append("<div id='socket-flash-content' style='display:none;'></div>")
	        
	        var swfReturn = swfobject.embedSWF(eUrban.global.rootPath + "other/socket/msgReceiver.swf", "socket-flash-content",
	            "0px", "0px", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
	        swfobject.createCSS("#socket-flash-content", "display:block;text-align:left;");
			this._swf = document.getElementById("socket-msg-receiver");
	    };
	    
	    FlexWebSocket.__onFlashEvent = function(event) {
	    	FlexWebSocket.__instances._handleEvent(event);
	    };
	    
	    FlexWebSocket.prototype._handleEvent = function(event) {
	    	var handler = this["on" + event.type];
	        if (handler) {
	        	handler.apply(this, [event]);
	        }
	    };
	    
	    FlexWebSocket.prototype.send = function(data) {
	    	this._swf.send(encodeURIComponent(data));
	    };
	})();
	
	//初始化WebSocket
	var socket, socketUtils, messageHandler = {};
	var socketServerIP = window.location.hostname;
	var socketServerPort = window.location.port;
	var socketServerPath = eUrban.global.rootPath.replace("http://", "").replace("https://", "");
	socketServerPath = socketServerPath.substring(socketServerPath.indexOf("/")) + "socket";
	try {
		//IE10 以下不支持WebSocket
		if (WebSocket) {
			socket = new WebSocket("ws://" + eUrban.global.rootPath.replace("http://", "").replace("https://", "") + "socket"); 
		} else {
			//不支持WebSocket的浏览器，使用Flex适配程序
			socket = new FlexWebSocket(socketServerIP, socketServerPort, socketServerPath);
		}
	} catch(ex) {
		//WebSocket异常，使用Flex适配程序
		socket = new FlexWebSocket(socketServerIP, socketServerPort, socketServerPath);
	};
	
	//打开Socket 
	socket.onopen = function(event) {
		//用户注册
		socketUtils.addMessageHandler("register", function(data) {
			if (!data.success) {
				console.log("socket not connect!");
			} else {
				console.log("socket connect!");
			}
		});
		socketUtils.send("register", {humanID: eUrban.global.humanID});
		
		//案件到达提醒
		socketUtils.addMessageHandler("recArrival", function(data) {
			app.trigger("mis:desktop:message:recarrival", data);
		});
	};
	
	//监听消息
    socket.onmessage = function(msg) {
    	if (msg && msg.data) {
    		msg = $.parseJSON(msg.data);
        	if (msg && msg.type) {
        		if (messageHandler[msg.type]) {
        			messageHandler[msg.type](msg.data);
        		}
        	}
    	}
    }; 
    
    socketUtils = {
    	send: function(type, data) {
    	    socket.send(JSON.stringify({
    	    	"type": type,
    	    	"data": data
    	    })); 
    	},
    	addMessageHandler: function(type, fn, context) {
    		if (context) {
    			fn = $.proxy(fn, context);
    		}
    		messageHandler[type] = fn;
    	}
    };
	return socketUtils
});