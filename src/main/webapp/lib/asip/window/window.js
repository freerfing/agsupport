define(["jquery"], function($){
	return  {

		openDialog : function(dlgId, url, width, height, options) {
			url = this._eUrbanUrl(url);
			width = width || screen.availWidth - 10;
			height = height || screen.availHeight - 30;
			options = options || {};
			options.width = width;
			options.height = height;
			if(options.maxIt) {
				return this.openMaximumDialog(dlgId, url, options);	
			} else {
				return this._openDialog(dlgId, url, options);
			}

		},

		openMaximumDialog: function(dlgId, url, options) {
			options = options || {};
			options.width = screen.availWidth - 10;
			options.height = screen.availHeight - 30;
			options.top = "0";
			options.left = "0";
			var win = this._openDialog(dlgId, url, options);
			try{
				win.focus();
				win.moveTo(0, 0);
				win.resizeTo(screen.availWidth, screen.availHeight);
			}catch(e){};
			return win;
		},
		
		openMaximumModalDialog: function(url, callback, parameter) {
			url = this._eUrbanUrl(url);
			return this.openModalDialog(url, screen.availWidth - 10, screen.availHeight - 30, callback, parameter);
		},

		openModalDialog: function(url, width, height, callback, parameter) {
			url = this._eUrbanUrl(url);
			width = width || screen.availWidth - 10;
			height = height || screen.availHeight - 30;
			var options = {width:width,height:height};
			options.callback = callback;
			options.parameter = parameter;
			return this._openModalDialog(url, options);
		},

		_openDialog : function(dlgId, url, options) {
			options = options || {};
			var parameter =
				" menubar=0, toolbar=0, directories=0" +
				",scrollbars=" + (options.scrollbar ? options.scrollbar: "0") +
				",resizable=" + (options.resizable ? options.resizable: "0") +
				  ",left=" + (options.left || (screen.availWidth - options.width)/2) +
				  ",top=" + (options.top || (screen.availHeight - options.height)/2) +
				  ",width=" + options.width + ",height="+ options.height;
			var w = window.open(url, dlgId, parameter);
			try{ w.focus(); } catch(e){};
			return w;
		},

		_openModalDialog: function(url, options) {
			options = options || {};
			var features = [
				"dialogWidth:" + (options.width) + "px",
				"dialogHeight:" + (options.height) + "px",
				"dialogLeft:" + (screen.availWidth - options.width)/2 + "px",
				"dialogTop:" + (screen.availHeight - options.height)/2 + "px",
				"center:1" ].join(";") ;
			var dlgArgs = {
				hostWin: window,
				parameter: options.parameter? options.parameter : {},
				callback: options.callback ? options.callback: function() {return null;}
			}
			return window.showModalDialog(url,  dlgArgs, features );

		},

		openItInHiddenFrame: function(dlgId, url) {
			url = eUrban.global.rootPath + url; 
			var i = $('<iframe id="iframe-open-' + dlgId + '" name="iframe-open-' + dlgId + '" />');
				i[0].style.position = 'absolute';
				i[0].style.top = '-1000px';
				i[0].style.left = '-1000px';
				i[0].src = url;
			$("body").append(i);
		},
		
		_eUrbanUrl: function(url){
			if(url.indexOf("http://") == 0 || url.indexOf("www.") == 0){
				return url;
			}else{
				return eUrban.global.rootPath + url; 
			}
		}

	};
});