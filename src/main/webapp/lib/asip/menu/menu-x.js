define(["jquery", "i18nCommon"], function($, i18n){
	var MenuX;
	
	MenuX = function(data, settings){
		this._data = data;
		this.settings = $.extend({}, MenuX.defaultSettings, settings);
	};
	
	MenuX.defaultSettings = {
		parent: $("body"),
		subMenu: false
	};
	
	MenuX.dataDefault = {
		visible: true,
		click: function(e){}
	};
	
	MenuX.prototype.init = function(){
		var that = this;
		if(this.settings.subMenu){
			that._menuElement = $(MenuX.viewMenu).hide();
		}else{
			that._menuElement = $(MenuX.FirstviewMenu).hide();
		}
		that.settings.parent.append(that._menuElement);
		that._menuData = {};
		that.add(this._data);
	};
	
	MenuX.prototype.showMenuAt = function(x, y) {
		this._left = x;
		this._top = y;
		this._menuElement.css({
			"left": x,
			"top": y
		});
		this._menuElement.show();
		this._hideBorder();
		this._hasShow = true;
	};
	
	MenuX.prototype.hide = function(){
		if(this.settings.subMenu)
			this._menuElement.hide();
		this._hasShow = false;
		if(this._parentMenu){
			this._parentMenu.hide();
		}
	};
	
	MenuX.prototype.showMenuItem = function(menuId){
		if(this.exist(menuId)){
			this._menuData[menuId]["item"].show();
		}
	};
	
	MenuX.prototype.hideMenuItem = function(menuId){
		if(this.exist(menuId)){
			this._menuData[menuId]["item"].hide();
		}
	};
	
	MenuX.prototype._hideBorder = function(){
		if(this.settings.subMenu){
			this._menuElement.find(".app-menuX-item:visible").first().css({"border-top": "0px"});
//			this._menuElement.css({"border-bottom-right-radius": "15px","border-bottom-left-radius": "15px"});
		}else{		
			this._menuElement.find(".app-menuX-item:visible").first().css({"border-left": "0px"});
//			this._menuElement.css({"border-top-left-radius": "15px", "border-top-right-radius": "15px"});
		}
	};
	
	/**
	 * menuData 格式 {
	 *   id: "menu001",
	 *   text: "标题1",
	 *   title: "标题1",
	 *   visible: true,
	 *   click: function(){
	 *   },
	 *   subMenu:[{
	 *       id: "menu001",
	 *       text: "标题1",
	 *       title: "标题1",
	 *       visible: true,
	 *       click: function(){
	 *       },
	 *       subMenu:[
	 *       	...
	 *       ]
	 *   }]
	 * }
	 * 或者是数组
	 */
	MenuX.prototype.add = function(menuData){
		if(!menuData) return;
		if(menuData instanceof Array){
			for(var i=0;i<menuData.length;i++){
				if (i == 0) {
					this._itemNum = 0;
				} else if (i == menuData.length -1) {
					this._itemNum = 1;
				} else {
					this._itemNum = 2;
				}
				this.add(menuData[i]);
			}
			return;
		}
		if(this.exist(menuData.id)){
			return;
		}
		menuData = $.extend({}, MenuX.dataDefault, menuData);
		var that = this;
		var menuItem;
		if(this.settings.subMenu){
			menuItem = $(MenuX.viewMenuItem);
		}else{
			menuItem = $(MenuX.FirstviewMenuItem);
			if (this._itemNum == 0) {
				menuItem.addClass('app-menuX-item-left');
			} else if (this._itemNum == 1) {
				menuItem.addClass('app-menuX-item-right');
			}
			
		}
		if(!menuData.visible){
			menuItem.hide();
		}
		that._menuElement.append(menuItem);
		var subMenu = null;
		if(menuData.subMenu){
			//处理子菜单
			menuItem.children(".app-menuX-item-show-sub").show();
			subMenu = new MenuX(menuData.subMenu, {parent: menuItem, subMenu: true});
			subMenu.init();
			subMenu._parentMenu = that;
			menuItem.mouseover(function(e){
				if(!subMenu._hasShow){
					var left = that._left;
					var top = that._top;
					if(!(that.settings.subMenu)){
						subMenu.showMenuAt(0, menuItem.parent().height());
					}else{
						subMenu.showMenuAt(menuItem.parent().width() + 1, 0);
					}
				}
			}).mouseout(function(e) {	//鼠标移出即关闭菜单
				subMenu.hide();
				subMenu._hasShow = false;
			});
		}else{
			menuItem.children(".app-menuX-item-show-sub").hide();
		}
		menuItem.click(function(e){
			//that.hide();
			menuData.click(e);
			if(subMenu){
				subMenu._menuElement.hide();
				subMenu._hasShow = false;
			}
		});
		menuItem.attr("title", menuData.title || menuData.text).children(".app-menuX-item-text").text(menuData.text);
		that._menuData[menuData.id] = {
			"item": menuItem,
			"subMenu": subMenu
		};
		
	};
	
	MenuX.prototype.exist = function(menuId){
		return !!this._menuData[menuId];
	};
	
//	Menu.prototype._addExist = function(){
//		var that = this;
//		that.add({
//			 id: "__menuExit",
//			 text: i18n.textMenuExit,
//			 title: i18n.textMenuExit,
//			 click: function(){
//				 that.hide();
//			 }
//		});
//	};

	MenuX.prototype.remove = function(){
		this._menuElement.remove();
		this._data = null;
		this._menuData = null;
		this._left = null;
		this._top = null;
		$(".app-menuX-spe").remove();
	};
	
	MenuX.FirstviewMenu = "<div class='app-menuX app-menuX-first app-menuX-spe'></div>";
	MenuX.viewMenu = "<div class='app-menuX-subMenu app-menuX-first app-menuX-spe'></div>";
	MenuX.FirstviewMenuItem = [
	    "<div class='app-menuX-item app-menuX-item-spe'>",
	    	"<div class='app-menuX-item-text'></div>",
	    	"<div class='app-menuX-item-show-sub app-menuX-item-show-sub-first'></div>",
	    "</div>"
	].join("");
	MenuX.viewMenuItem = [
          "<div class='app-menuX-item-subMenu app-menuX-item-subMenu-spe'>",
	      "<div class='app-menuX-item-text'></div>",
	      "<div class='app-menuX-item-show-sub'></div>",
	      "</div>"
    ].join("");
	
	return {
		getInstance: function(data, settings){
			var mx = new MenuX(data, settings);
			mx.init();
			return mx;
		}
	}
});