define(["jquery", "layer","durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "echarts3_8_4", "tabs", "WdatePicker","animateLoad"],
    function ($, layer,app, composition, ko, common, http, panal, echarts, tabs, wdatePicker,animateLoad) {
        var panalObj;
        var videoDetial = {
            init: function () {
                var that = this;
                composition.addBindingHandler("videoDetialInitHandler", {
                    init: function (dom) {                        
                        that.renderUI();
                        that.bindUI();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
            	var that = this;
            	that.startPlay();
            },
            startPlay:function(){
            	// 判断是否安装插件
            	var np =this.IEVersion();
            	if(np!="google"){ // if(np!="google"){
            		try{
                		var ax=new ActiveXObject("PlayerAXCtrl.AxJpPlayerCtrl");  
                	}catch(e){
                		// 提示谷歌安装IE tab
                		layer.msg("您未安装视频控件，请下载并安装", {time:3000});
                		$("#B").show();
                	}
            	}else if(np=="google"){            		
            		// 提示谷歌安装IE tab
            		layer.msg("您正在使用谷歌浏览器，请安装IE Tab插件", {time:3000});
            		$("#A").show();
            	}
            	           	           	
            },
            IEVersion:function(){
            	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
                var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
                var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
                var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
                if(isIE) {
                    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                    var fIEVersion = parseFloat(RegExp["$1"]);
                    if(fIEVersion == 7) {
                        return 7;
                    } else if(fIEVersion == 8) {
                        return 8;
                    } else if(fIEVersion == 9) {
                        return 9;
                    } else if(fIEVersion == 10) {
                        return 10;
                    } else {
                        return 6;//IE版本<=7
                    }   
                } else if(isEdge) {
                    return 'edge';//edge
                } else if(isIE11) {
                    return 11; //IE11  
                }else if(navigator.userAgent.indexOf('Chrome')!=-1){
                    return "google";//谷歌
                }
            },
            downOCX:function(){
            	window.open('/awater/video/downOCX');
            },
            downIETab:function(){
            	window.open('/awater/video/downIETab');
            }
        };
        var modal = {
        	downOCX: $.proxy(videoDetial.downOCX, videoDetial),
        	downIETab: $.proxy(videoDetial.downIETab, videoDetial)
        };

        videoDetial.init();
        return modal;
    });