define(["jquery", "i18nCommon", "durandal/app", "mousewheel"], function($, i18n, app){
	var Tabs;
	
	Tabs = function(data, settings){
		if(!settings.after && !settings.before && !settings.parent && !settings.replace){
			alert(i18n.textCommonParamError);
		}
		this.settings = $.extend({}, Tabs.defaultSettings, settings);
		this._initData = data;
		this._tabsData = {};
	};
	
	Tabs.defaultSettings = {
		after: null,
		before: null,
		parent: null,
		replace: null,
		width: 380,
		height: 280,
		contentBorder: false, //内容边框
		onSelect: function(tabId, title){},
		onClose: function(tabId, title){}
	};
	
	Tabs.dataDefault = {
		 content: null, 
	     view: null,
		 selected: true,
	     closable: false,
	     borderLeft: true
	};
	
	Tabs.prototype.resize = function(width, height){
		var that = this;
		that.settings.width = width || that.settings.width;
		that.settings.height = height || that.settings.height;
		that._tabsElement.css({
			width: that.settings.width ? that.settings.width : "100%", 
			height:	that.settings.height ? that.settings.height : "100%" 
		});
	};
	
	Tabs.prototype.init = function(){
		var that = this;
		that._tabsElement = $(Tabs.viewTabs);
		if(that.settings.after){
			that.settings.after.before(that._tabsElement);
		}else if(that.settings.before){
			that.settings.before.after(that._tabsElement);
		}else if(that.settings.parent){
			that.settings.parent.append(that._tabsElement);
		}else if(that.settings.replace){
			that._tabsElement.replaceAll(that.settings.replace);
		}
		that._tabsHeadElement = that._tabsElement.find(".app-tabsY-head");
		that._tabsContentContainerElement = that._tabsElement.find(".app-tabsY-content-container");
		that._preElement = that._tabsElement.find('.app-show-up');
		that._nextElement = that._tabsElement.find('.app-show-down');
		if(that.settings.contentBorder){
			that._tabsContentContainerElement.addClass("app-border-top-spe app-border-right-spe app-border-bottom-spe");
		}
		that.resize();
		that._tabsData = {};
		that.add(that._initData);
		// 如果没有一个被激活，默认激活第一个tab
		if(!that._selectedId && that._initData){
			if(that._initData instanceof Array){
				if(that._initData.length > 0 && that._initData[0].id){
					that.active(that._initData[0].id);
				}
			}else if(that._initData.id){
				that.active(that._initData.id);
			}
		}
		if (that._selectedId && that._tabsData && that._tabsData[that._selectedId] && !that._tabsData[that._selectedId].borderLeft) {
			that._tabsHeadElement.find(".app-tabsY-item").removeClass("app-tabsY-item-inactive").addClass("app-tabsY-item-active-spe");
		}
		that._initData = null;

		that.initAction();
	};
	
	Tabs.prototype.initAction = function() {
		var that = this;

		//点击显示后一个
		that._nextElement.click(function() {
			setTimeout(function() {
				that.showNext();
			}, 100);
		});

		//点击显示前一个
		that._preElement.click(function() {
			setTimeout(function() {
				that.showPre();
			}, 100);
		});

		//支持鼠标滚动
		that._mouseWheeling = false;
		that._tabsHeadElement.mousewheel(function(event, delta, deltaX, deltaY) { 
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
	};

	Tabs.prototype.showPre = function() {
		var that = this;
		if (!that._preUsable) {
			return;
		}
		var itemTrue = that._tabsHeadElement.find('.app-tabsY-item').filter("[_appTabVisible=true]");
		itemTrue.first().prev().show().attr("_appTabVisible", "true");
		if (0 === that._tabsHeadElement.find('.app-tabsY-item').filter('[_appTabVisible=false]').size()) {
			that._preElement.hide();
			that._preUsable = false;
		};
 	    that._nextElement.show();
 	    that._nextUsable = true;
	};

	Tabs.prototype.showNext = function() {
		var that = this;
		if (!that._nextUsable) {
			return;
		}
		var itemTrue = that._tabsHeadElement.find('.app-tabsY-item').filter("[_appTabVisible=true]");
		itemTrue.first().hide().attr("_appTabVisible", "false");
		if (2 === itemTrue.size()) {
			that._nextElement.hide();
	    	that._nextUsable = false;
		}
		that._preElement.show();
		that._preUsable = true;
	};

	Tabs.prototype.inintPartShow = function(item) {
		item.attr("_appTabVisible", "true");
		var itemHeight = Tabs.getItemHeight(item);
		this._tabsItemHeight = this._tabsItemHeight ? (this._tabsItemHeight + itemHeight) : itemHeight;
		if (this._tabsItemHeight > Tabs.getHeadHeidht(this)) {
			this._nextElement.show();
			this._nextUsable = true;
		}
	};
	
	Tabs.prototype.exists = function(id){
		return !!this._tabsData[id];
	};
	
	Tabs.prototype.lengths = function(){
		var num = 0;
		for(var id in this._tabsData){
			if(this._tabsData.hasOwnProperty(id) && this._tabsData[id]){
				num++;
			}
		}
		return num;
	}
	
	/**
	 * tabsData 格式 {
	 *   id: "tab001",
	 *   title: "标题1",
	 *   content: "<div></div>", 
	 *   view: "view/...",
	 *   selected: true,
	 *   closable: false,
	 *   href: null 暂时不支持,
	 *   borderLeft: true
	 * }
	 * 或者是数组
	 */
	Tabs.prototype.add = function(tabsData){
		if(!tabsData) return;
		if(tabsData instanceof Array){
			for(var i=0;i<tabsData.length;i++){
				this.add(tabsData[i]);
			}
			return;
		}
		tabsData = $.extend({}, Tabs.dataDefault, tabsData);
		var that = this;
		if(!this.exists[tabsData.id]){
			var item = $(Tabs.viewTabsItem);
			item.find('.app-tabsY-item-text').text(tabsData.title);
			item.click(function(){
				item.removeClass("app-tabsY-item-hover");
				that.active(tabsData.id, tabsData.title);
			}).mouseout(function(){
				item.removeClass("app-tabsY-item-hover");
			}).mouseover(function(){
				//当非激活状态时候鼠标移过改变颜色
				if(item.hasClass("app-tabsY-item-inactive")){
					item.addClass("app-tabsY-item-hover");
				}
			});
			var content = $(Tabs.viewTabsContent).hide();
			this._tabsData[tabsData.id] = {
				"item": item,
				"content": content,
				"title": tabsData.title,
				"borderLeft": tabsData.borderLeft
			};
			this._tabsHeadElement.append(item);
			this._tabsContentContainerElement.append(content);
			item.find('.app-tabsY-item-text').text(tabsData.titile);
			if(tabsData.closable){//如果可以关闭,定义双击事件关闭
				item.find('.app-tabsY-item-text').css({
					'padding-bottom': '18px'
				});
				item.find('.app-tabsY-item-close')
					.show()
					.click(function(event) {
						that.close(tabsData.id);
					});
				item.dblclick(function(){
					that.close(tabsData.id);
				});
			}
			if(tabsData.content){
				content.append(tabsData.content);
			}else if(tabsData.view){
				app.setRoot(tabsData.view, null, content[0]); 
			}
			this.inintPartShow(item);
		}
		if(tabsData.selected){
			this.active(tabsData.id);
			if (this._tabsItemHeight > Tabs.getHeadHeidht(this)) {  //当宽度不够时，title滚动
				this.showNext();
				var hideWidth = Tabs.getItemHeight(this._tabsHeadElement.find('.app-tabsY-item').filter("[_appTabVisible=false]").last());
				while(hideWidth < Tabs.getItemHeight(item)) {
					this.showNext();
					hideWidth += Tabs.getItemHeight(this._tabsHeadElement.find('.app-tabsY-item').filter("[_appTabVisible=false]").last());
				}
			}
		}
	};

	Tabs.prototype.active = function(tabId, title){
		this._tabsHeadElement.find(".app-tabsY-item").removeClass("app-tabsY-item-active-spe").addClass("app-tabsY-item-inactive")
			.addClass("app-tabsY-item-noactive-spe");
		for(var id in this._tabsData) {
			if(this._tabsData.hasOwnProperty(id)) {
				if(id == tabId){
					this.setTopBorderStyle(this._tabsData[tabId]["borderLeft"]);
					this._tabsData[tabId]["item"].removeClass("app-tabsY-item-inactive").addClass("app-tabsY-item-active-spe")
						.removeClass("app-tabsY-item-noactive-spe");
					this._tabsData[tabId]["content"].show();
					this._selectedId = tabId;
					this.settings.onSelect(tabId, title);
				}else{
					if(this._tabsData[id] && this._tabsData[id]["content"]){
						this._tabsData[id]["content"].hide();
					}
				}
			}
		}
	};
	
	Tabs.prototype.close = function(tabId){
		if(this.exists(tabId)){
			if (this._preUsable && this._tabsData[tabId]["item"].prev().attr('_appTabVisible') == 'false') {
				this.showPre();
			}
			this._tabsItemHeight -= Tabs.getItemHeight(this._tabsData[tabId]["item"]);
			this._tabsData[tabId]["item"].remove();
			this._tabsData[tabId]["content"].remove();
			if ((this._preUsable || this._nextUsable) && this._tabsItemHeight < Tabs.getHeadHeidht(this)) {
				this._preElement.hide();
				this._preUsable = false;
				this._nextElement.hide();
	    		this._nextUsable = false;
	    		this._tabsHeadElement.find('.app-tabsY-item').filter("[_appTabVisible=false]").show().attr("_appTabVisible", "true");
			}
			this.settings.onClose(tabId, this._tabsData[tabId].title);
			this._tabsData[tabId] = null;
			if (this.lengths() == 0) {
				this._tabsItemHeight = 0;
			}
		}
	};
	
	Tabs.prototype.show = function(){
		this._tabsElement.show();
	};
	
	Tabs.prototype.hide = function(){
		this._tabsElement.hide();
	};

	/** 是否隐藏tab左边框
	 * flag: true 显示
 		  	 false 隐藏
	 */
	Tabs.prototype.setTopBorderStyle = function(flag) {
		if (flag) {
			this._tabsContentContainerElement.addClass('app-border-left-spe');
			this._tabsHeadElement.find(".app-tabsY-item").removeClass("app-tabsY-item-active-spe").addClass("app-tabsY-item-inactive");
		} else {
			this._tabsContentContainerElement.removeClass('app-border-left-spe');
			this._tabsHeadElement.find(".app-tabsY-item").removeClass("app-tabsY-item-inactive").addClass("app-tabsY-item-active-spe");
		}
	};

	Tabs.getItemHeight = function(item) {
		return parseInt(item.outerHeight() + 5);
	};

	Tabs.getHeadHeidht = function(self) {
		return parseInt(self._tabsHeadElement.outerHeight());
	};
	
	Tabs.viewTabs = [
	     "<div class='app-tabsY'>",
     		"<div class='app-show-up app-part-show' style='top: -2px;left:7px; display: none;'>",
	 			"<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'>",
	 		    	"<polygon points='6,0 1,8 10,8' class='app-show-arrow-spe'/>",
	 		    "</svg>",
	 	    "</div>",
	 	    "<div class='app-show-down app-part-show' style='bottom: 5px;left:6px; display: none;'>",
	   			"<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'>",
	   				"<polygon points='1,0 6,8 10,0' class='app-show-arrow-spe'/>",
	   			"</svg>",
	   	    "</div>",
         	"<div class='app-tabsY-head'></div>",  
         	"<div class='app-tabsY-content-container app-border-left-spe'></div>",
	     "</div>"].join("");
	Tabs.viewTabsItem = [
		"<div class='app-tabsY-item app-tabsY-item-noactive-spe app-tabsY-item-inactive app-tabsY-border-spe' style='position: relative;'>",
			"<div class='app-tabsY-item-text'></div>",
			"<div class='app-tabsY-item-close'>",
				"<svg width='7' height='7' version='1.1' xmlns='http://www.w3.org/2000/svg' class='app-panal-head-button-btn app-panal-head-button-btn-close'>",
			        "<line x1='0' y1='0' x2='7' y2='7' class='app-tabsY-item-close-spe' style='stroke-width:2'/>",
			        "<line x1='7' y1='0' x2='0' y2='7' class='app-tabsY-item-close-spe' style='stroke-width:2'/>",
			    "</svg>",
			"</div>",
		"</div>"].join("");
	Tabs.viewTabsContent = "<div class='app-tabsY-content'></div>";
	
	return {
		getInstance: function(data, settings){
			var t = new Tabs(data, settings);
			t.init();
			return t;
		}
	}
});