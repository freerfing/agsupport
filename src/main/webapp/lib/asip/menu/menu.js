define(["jquery", "i18nCommon"], function($, i18n){
	var Menu;
	
	Menu = function(data, settings){
		this._data = data;
		this.settings = $.extend({}, Menu.defaultSettings, settings);
	};
	
	Menu.defaultSettings = {
		parent: $("body"),
		showExist: true,
		mouseoutClose: true, //鼠标移出即关闭菜单
		toward: "right"      //默认朝右展开子菜单
	};
	
	Menu.dataDefault = {
		visible: true,
		click: function(e){}
	};
	
	Menu.prototype.init = function(){
		var that = this;
		that._menuElement = $(Menu.viewMenu).hide();
		that.settings.parent.append(that._menuElement);
		that._menuData = {};
		that.add(this._data);
		if(that.settings.showExist){
			that._addExist();
		}
	};
	
	Menu.prototype.showMenuAt = function(x, y) {
		if ("left" == this.settings.toward) {
			x = x - this._menuElement.css("width").replace("px", "");
		}
		
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
	
	Menu.prototype.hide = function(){
		this._menuElement.hide();
		this._hasShow = false;
		if(this._parentMenu){
			this._parentMenu.hide();
		}
	};

	Menu.prototype.hideSubMenu = function() {
		$.each(this._menuData, function(index, val) {
			if (val['subMenu']) {
				val['subMenu']._menuElement.hide();
				val['subMenu']._hasShow = false;
			}
		});
	};
	
	Menu.prototype.showMenuItem = function(menuId){
		if(this.exist(menuId)){
			this._menuData[menuId]["item"].show();
		}
	};
	
	Menu.prototype.hideMenuItem = function(menuId){
		if(this.exist(menuId)){
			this._menuData[menuId]["item"].hide();
		}
	};
	
	Menu.prototype._hideBorder = function(){
		this._menuElement.find(".app-menu-item:visible").first().css({"border-top": "0px"});
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
	Menu.prototype.add = function(menuData){
		if(!menuData) return;
		if(menuData instanceof Array){
			for(var i=0;i<menuData.length;i++){
				this.add(menuData[i]);
			}
			return;
		}
		if(this.exist(menuData.id)){
			return;
		}
		menuData = $.extend({}, Menu.dataDefault, menuData);
		var that = this;
		var menuItem = $(Menu.viewMenuItem);
		if(!menuData.visible){
			menuItem.hide();
		}
		that._menuElement.append(menuItem);
		var subMenu = null;
		if(menuData.subMenu){
			//处理子菜单
			if ("left" == this.settings.toward) {
				menuItem.find(".app-menu-item-show-sub-left").show();
				menuItem.find(".app-menu-item-show-sub-right").hide();
			} else {
				menuItem.find(".app-menu-item-show-sub-left").hide();
				menuItem.find(".app-menu-item-show-sub-right").show();
			}
			
			subMenu = new Menu(menuData.subMenu, {
				showExist: false, 
				toward: that.settings.toward, 
				mouseoutClose: that.settings.mouseoutClose
			});
			subMenu.init();
			subMenu._parentMenu = that;
			menuItem.mouseover(function(e){
				that.hideSubMenu();
				if(!subMenu._hasShow){
					var top = that._top;
					while((top + 1 + menuItem.height()) < e.pageY){
						top = top + menuItem.height() + 1;
					}
					if ("left" == that.settings.toward) {
						subMenu.showMenuAt(that._left - 1, top);
					} else {
						subMenu.showMenuAt(that._left + menuItem.width() + 3, top);
					}
				}
			});
		}else{
			menuItem.find(".app-menu-item-show-sub-left").hide();
			menuItem.find(".app-menu-item-show-sub-right").hide();
			menuItem.mouseover(function(){
				that.hideSubMenu();
			});
		}
		menuItem.click(function(e){
			that.hide();
			e.menuID = menuData.id
			menuData.click(e);
			if(subMenu){
				subMenu._menuElement.hide();
				subMenu._hasShow = false;
			}
		});
		menuItem.attr("title", menuData.title || menuData.text).find(".app-menu-item-text").text(menuData.text);
		that._menuData[menuData.id] = {
			"item": menuItem,
			"subMenu": subMenu
		};
		//鼠标移出即关闭菜单
		if(that.settings.mouseoutClose && !subMenu){
			menuItem.mouseout(function(e){
				if(e.pageX < (that._left+1) || e.pageX > (that._left + that._menuElement.width())){
					that.hide();
				}else if(e.pageY < (that._top+1) || e.pageY > (that._top + that._menuElement.height())){
					that.hide();
				}
			});
		}
		if(subMenu){
			menuItem.mouseout(function(e){
				if(e.pageX < (subMenu._left - subMenu._menuElement.width()) || e.pageX > (subMenu._left + subMenu._menuElement.width() + 3)){
					subMenu._menuElement.hide();
					subMenu._hasShow = false;
				}else if(e.pageY < subMenu._top || e.pageY > (subMenu._top + subMenu._menuElement.height())){
					subMenu._menuElement.hide();
					subMenu._hasShow = false;
				}
			});
		}
	};
	
	Menu.prototype.exist = function(menuId){
		return !!this._menuData[menuId];
	};
	
	Menu.prototype._addExist = function(){
		var that = this;
		that.add({
			 id: "__menuExit",
			 text: i18n.textMenuExit,
			 title: i18n.textMenuExit,
			 click: function(){
				 that.hide();
			 }
		});
	};

	Menu.prototype.remove = function(){
		this._menuElement.remove();
		this._data = null;
		this._menuData = null;
		this._left = null;
		this._top = null;
	};
	
	Menu.viewMenu = "<div class='app-menu app-menu-spe'></div>";
	Menu.viewMenuItem = [
	    "<div class='app-menu-item'>",
	        "<div class='app-menu-item-show-sub-left'></div>",
	    	"<div class='app-menu-item-text'></div>",
	    	"<div class='app-menu-item-show-sub-right'></div>",
	    "</div>"
	].join("");
	
	return {
		getInstance: function(data, settings){
			var m = new Menu(data, settings);
			m.init();
			return m;
		}
	}
});