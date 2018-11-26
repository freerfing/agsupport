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
	     borderTop: true
	};
	
	Tabs.prototype.resize = function(width, height){
		var that = this;
		that.settings.width = width || that.settings.width;
		that.settings.height = height || that.settings.height;
		that._tabsElement.css({
			width: that.settings.width ? that.settings.width : "100%", 
			height:	that.settings.height ? that.settings.height : "100%" 
		});
		that._tabsContentContainerElement.css({
			height:	that._tabsElement.height() - that._tabsHeadElement.height() - 1
		});
		that._tabsElement.find(".app-tabs-content").css({
			width: that._tabsElement.height() - that._tabsHeadElement.height() - 5, 
			height:	that._tabsElement.height() - that._tabsHeadElement.height() - 5
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
		that._tabsHeadElement = that._tabsElement.find(".app-tabs-head");
		that._tabsContentContainerElement = that._tabsElement.find(".app-tabs-content-container");
		that._preElement = that._tabsHeadElement.find('.app-show-left');
		that._nextElement = that._tabsHeadElement.find('.app-show-right');
		if(that.settings.contentBorder){
			that._tabsContentContainerElement.css({
				"margin-top": "-1px",  //这里消除box border 间距
//				"border-top": "none",
				// "border-left": "1px solid #D8D8D8",
				// "border-right": "1px solid #D8D8D8",
				// "border-bottom": "1px solid #D8D8D8",
				"border-bottom-left-radius": "5px",
				"border-bottom-right-radius": "5px"
			});
			that._tabsContentContainerElement.addClass("app-border-left-spe app-border-right-spe app-border-bottom-spe");
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
		if (that._selectedId && that._tabsData && that._tabsData[that._selectedId] && !that._tabsData[that._selectedId].borderTop) {
			that._tabsHeadElement.find(".app-tabs-item").removeClass("app-tabs-item-inactive").addClass("app-tabs-item-active-spe");
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
		var itemTrue = that._tabsHeadElement.find('.app-tabs-item').filter("[_appTabVisible=true]");
		itemTrue.first().prev().show().attr("_appTabVisible", "true");
		if (0 === that._tabsHeadElement.find('.app-tabs-item').filter('[_appTabVisible=false]').size()) {
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
		var itemTrue = that._tabsHeadElement.find('.app-tabs-item').filter("[_appTabVisible=true]");
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
		var itemWidth = parseInt(item.outerWidth() + 5);
		this._tabsItemWidth = this._tabsItemWidth ? (this._tabsItemWidth + itemWidth) : itemWidth;
		if (this._tabsItemWidth > parseInt(this._tabsHeadElement.outerWidth() - 20)) {
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
	 *   borderTop: true
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
			item.find('.app-tabs-item-text').text(tabsData.title);
			item.click(function(){
				item.removeClass("app-tabs-item-hover");
				that.active(tabsData.id, tabsData.title);
			}).mouseout(function(){
				item.removeClass("app-tabs-item-hover");
			}).mouseover(function(){
				//当非激活状态时候鼠标移过改变颜色
				if(item.hasClass("app-tabs-item-inactive")){
					item.addClass("app-tabs-item-hover");
				}
			});
			var content = $(Tabs.viewTabsContent).hide().css({
				width: that._tabsContentContainerElement.width() - 4, 
				height:	that._tabsContentContainerElement.height() - 4
			});
			this._tabsData[tabsData.id] = {
				"item": item,
				"content": content,
				"title": tabsData.title,
				"borderTop": tabsData.borderTop
			};
			this._tabsHeadElement.append(item);
			this._tabsContentContainerElement.append(content);
			item.find('.app-tabs-item-text').text(tabsData.titile);
			if(tabsData.closable){//如果可以关闭,定义双击事件关闭
				item.find('.app-tabs-item-text').css({
					padding: '0 18px 0 10px'
				});
				item.find('.app-tabs-item-close')
					.show()
					.click(function(event) {
						// that.settings.onClose(tabsData.id, tabsData.title);
						that.close(tabsData.id);
					});
				item.dblclick(function(){
					// that.settings.onClose(tabsData.id, tabsData.title);
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
			if (this._tabsItemWidth > parseInt(this._tabsHeadElement.outerWidth() - 20)) {  //当宽度不够时，title滚动
				this.showNext();
				var hideWidth = parseInt(this._tabsHeadElement.find('.app-tabs-item').filter("[_appTabVisible=false]").last().outerWidth() + 5);
				while(hideWidth < parseInt(item.outerWidth() + 5)) {
					this.showNext();
					hideWidth += parseInt(this._tabsHeadElement.find('.app-tabs-item').filter("[_appTabVisible=false]").last().outerWidth() + 5);
				}
			}
		}
	};

	Tabs.prototype.active = function(tabId, title){
		this._tabsHeadElement.find(".app-tabs-item").removeClass("app-tabs-item-active-spe").addClass("app-tabs-item-inactive")
			.addClass("app-tabs-item-noactive-spe");
		for(var id in this._tabsData) {
			if(this._tabsData.hasOwnProperty(id)) {
				if(id == tabId){
					this.setTopBorderStyle(this._tabsData[tabId]["borderTop"]);
					this._tabsData[tabId]["item"].removeClass("app-tabs-item-inactive").addClass("app-tabs-item-active-spe")
						.removeClass("app-tabs-item-noactive-spe");
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
			this._tabsItemWidth -= parseInt(this._tabsData[tabId]["item"].outerWidth() + 5);
			this._tabsData[tabId]["item"].remove();
			this._tabsData[tabId]["content"].remove();
			if ((this._preUsable || this._nextUsable) && this._tabsItemWidth < parseInt(this._tabsHeadElement.outerWidth() - 20)) {
				this._preElement.hide();
				this._preUsable = false;
				this._nextElement.hide();
	    		this._nextUsable = false;
	    		this._tabsHeadElement.find('.app-tabs-item').filter("[_appTabVisible=false]").show().attr("_appTabVisible", "true");
			}
			this.settings.onClose(tabId, this._tabsData[tabId].title);
			this._tabsData[tabId] = null;
			if (this.lengths() == 0) {
				this._tabsItemWidth = 0;
			}
		}
	};
	
	Tabs.prototype.show = function(){
		this._tabsElement.show();
	};
	
	Tabs.prototype.hide = function(){
		this._tabsElement.hide();
	};

	/** 是否隐藏tab上边框
	 * flag: true 显示
 		  	 false 隐藏
	 */
	Tabs.prototype.setTopBorderStyle = function(flag) {
		if (flag) {
			// this._tabsContentContainerElement.css('border-top', '1px solid #D8D8D8');
			this._tabsContentContainerElement.addClass('app-border-top-spe');
			this._tabsHeadElement.find(".app-tabs-item").removeClass("app-tabs-item-active-spe").addClass("app-tabs-item-inactive");
		} else {
			// this._tabsContentContainerElement.css('border-top', '0px');
			this._tabsContentContainerElement.removeClass('app-border-top-spe');
			this._tabsHeadElement.find(".app-tabs-item").removeClass("app-tabs-item-inactive").addClass("app-tabs-item-active-spe");
		}
	};
	
	Tabs.viewTabs = [
	     "<div class='app-tabs'>",
	         "<div class='app-tabs-head'>",
	         	"<div class='app-show-left app-part-show' style='top: 5px; left: 0; display: none;'>",
		 			"<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'>",
		 		    	"<polygon points='0,5 8,10 8,0' class='app-show-arrow-spe'/>",
		 		    "</svg>",
		 	    "</div>",
		 	    "<div class='app-show-right app-part-show' style='top: 5px; right: 0; display: none;'>",
		   			"<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'>",
		   				"<polygon points='0,0 0,10 8,5' class='app-show-arrow-spe'/>",
		   			"</svg>",
		   	    "</div>",
	         "</div>",  
	         "<div class='app-tabs-content-container app-border-top-spe'></div>",
	     "</div>"].join("");
	Tabs.viewTabsItem = [
		"<div class='app-tabs-item app-tabs-item-noactive-spe app-tabs-item-inactive app-tabs-border-spe' style='position: relative;'>",
			"<div class='app-tabs-item-text'></div>",
			"<div class='app-tabs-item-close'>",
				"<svg width='7' height='7' version='1.1' xmlns='http://www.w3.org/2000/svg' class='app-panal-head-button-btn app-panal-head-button-btn-close'>",
			        "<line x1='0' y1='0' x2='7' y2='7' class='app-tabs-item-close-spe' style='stroke-width:2'/>",
			        "<line x1='7' y1='0' x2='0' y2='7' class='app-tabs-item-close-spe' style='stroke-width:2'/>",
			    "</svg>",
			"</div>",
		"</div>"].join("");
	Tabs.viewTabsContent = "<div class='app-tabs-content'></div>";
	
	return {
		getInstance: function(data, settings){
			var t = new Tabs(data, settings);
			t.init();
			return t;
		}
	}
});