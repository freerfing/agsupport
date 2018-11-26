/**
 * 简单遮罩，一般用在弹出框和模态框中
 */
define(["jquery", "core"], function($, core){
	var mask, Mask, html = "<div class='app-mask app-mask-spe' id='app-mask'></div>";
	
	Mask = function(parent){
		this.parent = parent;
	};
	
	Mask.prototype.init = function(){
		//遮罩已经打开
		if(this._maskElement){
			return;
		}
		this.parent = core.getParent(this.parent);
		this._maskElement = $(html);
		this._maskElement.css({
			"z-index": mask.getMaskNextZIndex()
		});
		this._maskElement.appendTo(this.parent);
	};
	
	Mask.prototype.show = function(){
		if(this._maskElement){
			this._maskElement.show();
		}
	};
	
	Mask.prototype.close = function(){
		if(this._maskElement){
			this._maskElement.hide();
		}
	};
	
	Mask.prototype.hide = function(){
		if(this._maskElement){
			this._maskElement.hide();
		}
	};
	
	Mask.prototype.remove = function(){
		if(this._maskElement){
			this._maskElement.remove();
		}
		this._maskElement = null;
	};
	
	
	mask = {
		getInstance: function(parent){
			var m = new Mask(parent);
			m.init();
			return m;
		},
		getMaskNextZIndex: function(){
			return core.generateId("mask-z-index", {from: 10000000, prefix: false});
		}
	};
		
	return mask;
});