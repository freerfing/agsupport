define(["jquery", "core", "mousewheel"], function($, core){
	
	var PartShow, partShowUtils;
	
	PartShow = function(row, colunm, parent, settings){
		this.settings = $.extend({}, PartShow.defaultSettings, settings);
		this.settings.row = row;
		this.settings.colunm = colunm;
		this.parent = core.getParent(parent);
		if(this.settings.type === "left-right"){
			//当左右显示时候,如果行数大于1,只支持按页切换
			if(this.settings.row > 1){
				this.settings.pageShow = true;
		    //当左右显示时候,如果行数等于1,并且不是按页显示,那么逐个显示
			}else{
				this.settings.row = 1;
				if(!this.settings.pageShow){
					this.settings.colunm = 1;
				}
			}
		}
	};
	
	PartShow.defaultSettings = {
		type: "up-down",  //up-down 上下显示  left-right 左右显示	
		mousewheel: true, //支持鼠标滚轮
		pageShow: false   //是否整页切换,默认为单行或者单列滚动显示
	};
	
	PartShow.prototype.init = function(){
		PartShow.initElement(this);
		PartShow.initAction(this);
	};
	
	PartShow.initElement = function(context){
		var that = context;
		//添加元素
		if(that.settings.type === "up-down"){
			that._preElement = $(PartShow.viewUp);
			that._nextElement = $(PartShow.viewDown);
		}else{
			that._preElement = $(PartShow.viewLeft);
			that._nextElement = $(PartShow.viewRight);
		}
		that.parent.append(that._preElement);
		that.parent.append(that._nextElement);
		that._preElement.hide();
		that._nextElement.hide();
		that._nextUsable = false;
		that._preUsable = false;
		that._showItemCount = that.settings.row * that.settings.colunm;
		that._items = that.parent.children("").not($(".app-part-show"));
		that._items.attr("_appPartShowVisible", "true");
		that._itemCount = that._items ? that._items.length : 0;
		//初始化可见性
		if(that._itemCount > that._showItemCount){
			that._nextElement.show();
			that._nextUsable = true;
		}else{
			that._nextElement.hide();
			that._nextUsable = false;
		}
	};
	
	PartShow.initAction = function(context){
		var that = context;
		//点击显示前一个
		that._preClicking = false;
		that._preElement.click(function(){
			if(that._preClicking){
				return;
			}
			that._preClicking = true;
			setTimeout(function(){
				that.showPre();
				that._preClicking = false;
			}, 100);
		});
		//点击显示后一个
		that._nextClicking = false;
		that._nextElement.click(function(){
			if(that._nextClicking){
				return;
			}
			that._nextClicking = true;
			setTimeout(function(){
				that.showNext();
				that._nextClicking = false;
			}, 100);
		});
		//支持鼠标滚动
		if(that.settings.mousewheel){
			that._mouseWheeling = false;
			that.parent.mousewheel(function(event, delta, deltaX, deltaY) { 
	 		   if(that._mouseWheeling){
	 			   return;
	 		   }
	 		   that._mouseWheeling = true;
	 		   setTimeout(function(){
	 			   if(delta < 0){
	 				   that.showNext();
	     		   }else{
	     			   that.showPre();
	     		   }
	 			   that._mouseWheeling = false;
	 		   }, 100);
	 	   });
		}
	};
	
	PartShow.prototype.showPre = function(){
		var that = this;
		if(!that._preUsable){
			return;
		}
		var topHideCount = that._items.filter("[_appPartShowVisible=false]").size(); 
		this._items.each(function(i){
 		    if(i >= (topHideCount - (that.settings.pageShow ? that._showItemCount : that.settings.colunm))){
 			    $(this).show().attr("_appPartShowVisible", "true");
 		    }
 	    });
 	    if(topHideCount - (that.settings.pageShow ? that._showItemCount : that.settings.colunm) > 0){
 	    	that._preElement.show();
 	    	that._preUsable = true;
 	    }else{
 	    	that._preElement.hide();
 	    	that._preUsable = false;
 	    }
 	    that._nextElement.show();
 	    that._nextUsable = true;
	};
	
	PartShow.prototype.showNext = function(){
		var that = this;
		if(!that._nextUsable){
			return;
		}
		that._items.filter("[_appPartShowVisible=true]").each(function(i){
		    if(i < (that.settings.pageShow ? that._showItemCount : that.settings.colunm)){
			    $(this).hide().attr("_appPartShowVisible", "false");
		    }
	    })
	    if(that._items.filter("[_appPartShowVisible=true]").size() > that._showItemCount){
	    	that._nextElement.show();
	    	that._nextUsable = true;
	    }else{
	    	that._nextElement.hide();
	    	that._nextUsable = false;
	    }
		that._preElement.show();
		that._preUsable = true;
	};
	
	PartShow.prototype.showLast = function(){
		while(this._nextUsable)
			this.showNext();
	};
	
	PartShow.prototype.showFirst = function(){
		while(this._preUsable)
			this.showPre();
	};
	
	PartShow.viewUp = [
	    "<div class='app-show-up app-part-show'>",
			"<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'>",
		    	"<polygon points='6,0 1,8 10,8' fill='#FFFFFF'/>",
		    "</svg>",
		"</div>"].join("");
	
	PartShow.viewDown = [
   	    "<div class='app-show-down app-part-show'>",
   			"<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'>",
   				"<polygon points='1,0 6,8 10,0' fill='#FFFFFF'/>",
   			"</svg>",
   	    "</div>"].join("");
    
	PartShow.viewLeft = [
 	    "<div class='app-show-left app-part-show'>",
 			"<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'>",
 		    	"<polygon points='0,5 8,10 8,0' fill='#FFFFFF'/>",
 		    "</svg>",
 	    "</div>"].join("");
	
	PartShow.viewRight = [
   	    "<div class='app-show-right app-part-show'>",
   			"<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'>",
   				"<polygon points='0,0 0,10 8,5' fill='#FFFFFF'/>",
   			"</svg>",
   	    "</div>"].join("");
	
	partShowUtils = {
		getInstanse: function(row, colunm, parent, settings){
			var partShow = new PartShow(row, colunm, parent, settings);
			partShow.init();
			return partShow;
		}
	}
	
	return partShowUtils;
});