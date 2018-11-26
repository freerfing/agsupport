define(["jquery", "i18nCommon", "box"], function($, i18n, box){
	
	var Http;
	
	Http = function(url, settings, syncSuccessFn, syncErrorFn, context){
		this.settings = $.extend({}, Http.defaultSettings, settings);
		if(url.indexOf(auGurit.global.rootPath) < 0 && url.substring(0,4).toLowerCase()!="http"){
			url = auGurit.global.rootPath + url;
		}
		this.settings.url = url;
		if(!this.settings.async){
			if(context){
				if(syncSuccessFn){
					syncSuccessFn = $.proxy(syncSuccessFn, context);
				}
				if(syncErrorFn){
					syncErrorFn = $.proxy(syncErrorFn, context);
				}
			}
			this._successFn = syncSuccessFn;
			this._errorFn = syncErrorFn;
		}
		this.settings.success = $.proxy(Http._success, this);
		this.settings.error = $.proxy(Http._errorHandler, this);
	};
	
	Http.defaultSettings = {
		async: true,       //同步还是异步，默认为异步
		cache: false,
		timeout: 1200000,
		type: "GET",       //请求方式 ("POST" 或 "GET"), 注意：其它 HTTP 请求方法，如 PUT 和  DELETE 也可以使用，但仅部分浏览器支持。
		global: true,
		contentType: "application/x-www-form-urlencoded",
		jsonp: null,
		complete: function(data){},
		dataFilter: function (data, type) {return data;},
		dataType: "json",
		username: null,
		password: null,
		processData: true,
		test: false,       //是否前端独立测试
		testDataName: null //在文件夹view/test/data/下的json文件名，不带后缀
	};
	
	Http._success = function(data){
		if(data){
			if(data && data.success &&
					(data.success === true || data.success === "true")){
				if(this._successFn){
					this._successFn(data.content, data);
				}
			}else{
				Http._error(data, this);
			}
		}else{
			if(data && data.success && 
					(data.success === true || data.success === "true")){
				this._successFn(data.content, data);
			}else{
				Http._error(data, this);
			}
		}
	};
	
	Http._errorHandler = function(XMLHttpRequest, textStatus, errorThrown){
		//如果登陆被踢，或者session失效和没有登陆
		if(XMLHttpRequest && XMLHttpRequest.status === 401){
			auGurit.global.httpSessionValidFlag = false;
			box.alert(XMLHttpRequest.responseJSON[0].message, i18n.textCommonBoxAlertTitle, {
				cancelBtnShow: false,
				clickSure: function(){
					window.location = auGurit.global.rootPath;
				}
			});
		} else if (XMLHttpRequest && XMLHttpRequest.status === 0) {
			box.alert(i18n.textCommonShutDown, i18n.textCommonBoxPrompt, {
				cancelBtnShow: false
			});
		}else{
			Http._error({
				"data": {
					"XMLHttpRequest": XMLHttpRequest,
					"textStatus": textStatus,
					"errorThrown": errorThrown
				},
				"success": false,
				"message": i18n.textCommonError
			}, this);
		}
	};
	
	Http._error = function(data, context){
		console.log(context.settings.url+" 报错");
		if(context._errorFn){
			if(data){
				context._errorFn(data.content, data);
			}else{
				context._errorFn(data.content, data);
			}
		}else{
			if(data.resultInfo){
				if(data && data.message){
					box.alert(data.message, '提示');
				}else{
					box.alert(i18n.textCommonError, '提示');
				}
			}else{
				if(data && data.message){
					box.alert(data.message, '提示');
				}else{
					box.alert(i18n.textCommonError, '提示');
				}
			}
		}
	};
	
	Http.prototype.ajax = function(data){
		this.settings.data = data;
		if(!this.settings.test){
			$.ajax(this.settings); 
		}else{
			//支持前端独立测试
			this.settings.url = auGurit.global.rootPath + "view/test/data/" + this.settings.testDataName + ".json";
			$.ajax(this.settings); 
		}
		return this;
	};
	
	Http.prototype.then = function(successFn, context){
		if(this.settings.async){
			if(context){
				successFn = $.proxy(successFn, context);
			}
			this._successFn = successFn;
		}else{
			alert(" sync can not use then() ");
		}
		return this;
	};
	
	Http.prototype.error = function(errorFn, context){
		if(this.settings.async){
			if(context){
				errorFn = $.proxy(errorFn, context);
			}
			this._errorFn = errorFn;
		}else{
			alert(" sync can not use error() ");
		}
		return this;
	};
	
	return {
		getInstance: function(url, settings, syncSuccessFn, syncErrorFn, context){
			return new Http(url, settings, syncSuccessFn, syncErrorFn, context);
		}
	};
});