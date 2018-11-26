define(["jquery", "i18nCommon", "partShow", "menuX", "menuY"], function($, i18n, partShow, menuX, menuY){
	var MultiNav, MultiNavUtils;

	MultiNav = function(type, settings, param){
		this.type = type;
        this.settings = $.extend({}, MultiNav.defaultSettings, settings);
        this.param = param;     //参数用来传递导航栏数据
	};
	
	MultiNav.defaultSettings = {
		draggable: true,    //只适用于y
		title: i18n.textDesktopNav,    //只适用于y
		titleShow: true,   //只适用于y
		top: null,
		left: null,
		parent: $("body")
	};
	
	MultiNav.prototype.init = function(){
		if(this.type === "x"){
			MultiNav.initMulitX(this);
		}else if(this.type === "y"){
			MultiNav.initMulitY(this);
		}
	};
	
	MultiNav.initMulitY = function(context){
		var that = context;
		
		that.multiNavElement = $(MultiNav.viewMulti);
		that.multiNavElement.css({
			"left": that.settings.left,
			"top": that.settings.top
		});	
		that._headElement = that.multiNavElement.find(".app-nav-multiY-head");
		that._headElement.text(that.settings.title);
		if(!that.settings.titleShow){
			that._headElement.hide();
		}
		that.multiNavElement.appendTo(that.settings.parent);
		var _settings = that.settings;
		_settings.parent = that.multiNavElement;
		var my = menuY.getInstance(MultiNav.initData(that.param), _settings);
		
		if(that.settings.draggable){
			that.multiNavElement.draggable({
				handle: that._headElement
			});
		}else{
			that._headElement.css({"cursor":"auto"});
		}
	};
	
	MultiNav.initMulitX = function(context){
		var that = context;
		
		that.mx = menuX.getInstance(MultiNav.initData(that.param));
		that.mx.showMenuAt(that.settings.left, that.settings.top);
	};
	
	MultiNav.initData = function(navbaritem){
		var navitem, baseArray = [], childrenArray = [];
		for(var i = 0; i < navbaritem.length; i++){
			navitem = {
						id: navbaritem[i].id.navItem.navItemID,
						text: navbaritem[i].id.navItem.displayName,
						title: navbaritem[i].id.navItem.navItemTitle
					};
			if(navbaritem[i].click){
				navitem.click = navbaritem[i].click;
			}
			if(navbaritem[i].id.navItem.seniorID != undefined && navbaritem[i].id.navItem.seniorID > 0){
				navitem.parent = navbaritem[i].id.navItem.seniorID;
				childrenArray.push(navitem);
			}else{
				baseArray.push(navitem);
			}					
		}
		for(var i = 0; i < childrenArray.length; i++){
			for(var j = 0; j < childrenArray.length; j++){
				if(childrenArray[i].parent == childrenArray[j].id){
					if(childrenArray[j].subMenu == undefined)
						childrenArray[j].subMenu = [];
					childrenArray[j].subMenu.push(childrenArray[i]);
					break;
				}			
			}
		}
		for(var i = 0; i < childrenArray.length; i++){
			for(var j = 0; j < baseArray.length; j++){
				if(childrenArray[i].parent == baseArray[j].id){
					if(baseArray[j].subMenu == undefined)
						baseArray[j].subMenu = [];
					baseArray[j].subMenu.push(childrenArray[i]);
					break;
				}
			}
		}
		return baseArray;
	};
	
	MultiNav.prototype.remove = function(){
		if(this.type === "x"){
			this.mx.remove();
		}else if(this.type === "y"){
			this.multiNavElement.remove();
		}		
		this.settings = null;
		this.param = null;
	};
	
	MultiNav.viewMulti = "<div class='app-nav-multiY-container'><div class='app-nav-multiY-head app-nav-multiY-head-spe'></div></div>";
	
	MultiNavUtils = {
		multiX: function(settings, param){
			var multiNav = new MultiNav("x", settings, param);
			multiNav.init();
			return multiNav;
		},
		multiY: function(settings, param){
			var multiNav = new MultiNav("y", settings, param);
			multiNav.init();
			return multiNav;
		}
	};
	
	return MultiNavUtils;		
});