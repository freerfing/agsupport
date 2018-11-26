define(["jquery", "i18nCommon"], function($, i18n){
	var MenuY;
	
	MenuY = function(data, settings){
		this._data = data;
		this.settings = $.extend({}, MenuY.defaultSettings, settings);
	};
	
	MenuY.defaultSettings = {
		parent: $("body"),
		width: 200,
		paddingleft: 12
	};
	
	MenuY.dataDefault = {
		visible: true,
		click: function(e){}
	};
	
	MenuY.prototype.init = function(){
		var that = this;
		that._menuElement = $(MenuY.viewMenu);
		that._menuElement.width(that.settings.width);
		that.settings.parent.append(that._menuElement);
		that._menuData = {};
		that.add(this._data);
		that._hideBorder();
	};
	
	MenuY.prototype.showMenu = function() {
		this._menuElement.find(".app-menuY-item").first().css({"border-top": "1px solid #a5a5a4"});
		this._menuElement.slideDown("slow");
		this._hasShow = true;
	};
	
	MenuY.prototype.hide = function(){
		this._menuElement.slideUp("slow");
		this._hasShow = false;
	};
	
	MenuY.prototype._hideBorder = function(){
		this._menuElement.find(".app-menuY-item:visible").first().css({"border-top": "0px"});
		if (!this.isSubItem) {
			this._menuElement.children().last().css({"border-bottom": "1px solid #a5a5a4"});
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
	MenuY.prototype.add = function(menuData){
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
		menuData = $.extend({}, MenuY.dataDefault, menuData);
		var that = this;
		var menuItem;
		var subMenu = null;
		if(menuData.subMenu){
			menuItem = $(MenuY.subViewMenuItem);
			menuItem.width(that.settings.width);
			that._menuElement.append(menuItem);
			//处理子菜单
			menuItem.find(".app-menuY-item-sub-sh").show();
			subMenu = new MenuY(menuData.subMenu, {width: menuItem.width(), parent: menuItem, paddingleft: that.settings.paddingleft + 15});
			subMenu.isSubItem = true;
			subMenu.init();
//			subMenu._menuElement.css("background-color","#0e0e0e");
			subMenu._menuElement.hide();
			subMenu._parentMenu = that;			
			menuItem.find(".app-menuY-item").first().click(function(e){
				if(!subMenu._hasShow){
					$.each(subMenu._parentMenu._menuData, function(index, e) {
						if (e.subMenu && e.subMenu._hasShow) {
							e.subMenu.hide();
							e.item.find(".app-menuY-item-sub-sh").first().removeClass("app-menuY-item-sub-hide").addClass("app-menuY-item-sub-show");
						}
					});
					subMenu.showMenu();
					menuItem.find(".app-menuY-item-sub-sh").first().removeClass("app-menuY-item-sub-show").addClass("app-menuY-item-sub-hide");
				}else{
					subMenu.hide();
					menuItem.find(".app-menuY-item-sub-sh").first().removeClass("app-menuY-item-sub-hide").addClass("app-menuY-item-sub-show");
				}
			});
		}else{
			menuItem = $(MenuY.viewMenuItem);
			that._menuElement.append(menuItem);
			menuItem.find(".app-menuY-item-sub-sh").hide();
			menuItem.click(function(e){			
				menuData.click(e);
			});
		}
		if (this.isSubItem) menuItem.parent().addClass('app-menuY-sub-spe');
		
		// menuItem.find('.app-menuY-item-text').width(that.settings.width - 20);
		menuItem.attr("title", menuData.title || menuData.text).find(".app-menuY-item-text").first()
			.text(menuData.text)
			.css({
				"padding-left": that.settings.paddingleft + "px",
				"width": that.settings.width - 20
			});
		if ( menuData.css ) {
			$("<div class='app-menuY-item-css'></div>").addClass(menuData.css).prependTo(menuItem.attr("title", menuData.title || menuData.text).
					find(".app-menuY-item-text").first());
		}
		that._menuData[menuData.id] = {
			"item": menuItem,
			"subMenu": subMenu
		};
	};
	
	MenuY.prototype.exist = function(menuId){
		return !!this._menuData[menuId];
	};

	MenuY.prototype.remove = function(){
		this._menuElement.remove();
		this._data = null;
		this._menuData = null;
	};
	
	MenuY.viewMenu = "<div class='app-menuY app-menuY-spe'></div>";
	MenuY.viewMenuItem = [
          "<div class='app-menuY-item app-menuY-item-spe'>",
	      "<div class='app-menuY-item-text'></div>",
	      "<div class='app-menuY-item-sub-show app-menuY-item-sub-sh'></div>",
	      "</div>"
    ].join("");
	MenuY.subViewMenuItem = [
          "<div><div class='app-menuY-item app-menuY-item-spe'>",
          "<div class='app-menuY-item-text'></div>",
          "<div class='app-menuY-item-sub-show app-menuY-item-sub-sh'></div>",
          "</div></div>"
    ].join("");
	
	return {
		getInstance: function(data, settings){
			var my= new MenuY(data, settings);
			my.init();
			return my;
		}
	}
});