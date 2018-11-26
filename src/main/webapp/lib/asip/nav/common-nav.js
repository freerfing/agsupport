define(["jquery", "i18nCommon", "partShow","ui"], function($, i18n, partShow){
	var CommonNav, CommonNavUtils;
	
	CommonNav = function(settings, param){
        this.settings = $.extend({}, CommonNav.defaultSettings, settings);
        this.param = param;     //参数用来传递导航栏数据
	};
	
	CommonNav.defaultSettings = {
		parent: $("body"),
		keyDel: true,
		draggable: true,
		title: i18n.textDesktopNav,
		top: 100,
		left: 50,
		right: null,
		bottom: null,
		contentOpacity: 0.8,
		headOpacity: 0.8,
		mousewheel: true,  //支持鼠标滚轮
		pageShow: false,   //是否整页切换,默认为单行或者单列滚动显示
		backgroundColor: true,  // 是否需要背景色
		onUpdate: function(){}  //保存排列顺序的方法
	};
	
	CommonNav.prototype.init = function(){
		CommonNav.initElement(this);
		CommonNav.initAction(this);
	};
	
	CommonNav.initElement = function(context){
		var that = context;
		var navbarHtml = "";
		if(that.param.length > 0){
		   for(var i = 0; i < that.param.length; i++){
			   navbarHtml += "<div _item='" + i + "' class='app-nav-common-item app-nav-common-item-spe app-nav-common-item-" + that.param[i].id.navItem.navItemID + "' title='" + that.param[i].id.navItem.navItemTitle + "'>" + 
			   		"<label>" + that.param[i].id.navItem.displayName + "</label></div>";	
		   }		   
	    }
		CommonNav.viewContainer[1] = navbarHtml;		
		that.navElement = $(CommonNav.viewContainer.join(""));
		
		that.commonNavElement = $(CommonNav.viewCommonNav);
		that.commonNavElement.css({
			"left": that.settings.left,
			"top": that.settings.top,
			"right": that.settings.right,
			"bottom": that.settings.bottom
		});	
		that._headElement = that.commonNavElement.find(".app-nav-common-head");
		that._headElement.text(that.settings.title).css({
			"opacity": that.settings.headOpacity
		});
		that.navElement.css({
			"opacity": that.settings.contentOpacity
		});
		if (!that.settings.backgroundColor) {
			that.navElement.removeClass('app-nav-common-container-spe');
			that._headElement.removeClass('app-nav-common-head-spe');
		}
		that.commonNavElement.append(that.navElement);
		that.commonNavElement.appendTo(that.settings.parent);
		
	};
	
	CommonNav.initAction = function(context){
		var that = context;
		that.ps = partShow.getInstanse(6, 1, that.navElement);
		that.ps._preElement.css({"top": "20px", "right": "25px"});
		that.ps._nextElement.css({"bottom": "15px", "right": "25px"});
		that.navElement.delegate(".app-nav-common-item", "click", function(){
 		   $(this).addClass("app-nav-common-click app-nav-common-click-spe").siblings().removeClass("app-nav-common-click app-nav-common-click-spe");
 		   that.param[$(this).attr('_item')].click();
 	    });
		if(that.settings.draggable){
			that.commonNavElement.draggable({
				handle: that._headElement
			});
		}else{
			that._headElement.css({"cursor":"auto"});
		}
		that.navElement.sortable({
 		   containment: "document",
		   update: function(e, ui){
			   var newOrderArray = [];
			   that.navElement.find(".app-nav-common-item").each(function(){
				   newOrderArray.push($(this).attr("id").replace("app-nav-common-item-",""));
			   });
			   that.settings.onUpdate(newOrderArray.join(","));
		   },
 		   sort: function(e, ui){
			   var topMin = parseInt(that.navElement.offset().top);
			   if(ui.offset.top > topMin + that.navElement.height() - 70){
				   that.ps.showNext();
				   return;
			   }
			   if(ui.offset.top < topMin + 30){
				   that.ps.showPre();
				   return;
			   }
		   }
 	   });
		if(that.settings.keyDel){
			$(document).keydown(function(event){
				//点击delete键
				if(event.keyCode === 46){
					that.close();
				}
			});
		}
	};
	
	CommonNav.prototype.close = function(){
		this.commonNavElement.remove();
		this.settings = null;
		this.param = null;
	};

	// 清除所有点击效果Class
	CommonNav.prototype.clearAllClass = function() {
		this.navElement.find('.app-nav-common-item').removeClass('app-nav-common-click app-nav-common-click-spe');
	};

	CommonNav.prototype.setClickClass = function(id) {
		this.navElement.find('.app-nav-common-item-' + id)
                    .addClass('app-nav-common-click app-nav-common-click-spe')
                    .siblings().removeClass('app-nav-common-click app-nav-common-click-spe');
	};
	
	CommonNav.viewContainer = [
  		"<div class='app-nav-common-container app-nav-common-container-spe'>","","</div>"     
  	];	
	CommonNav.viewCommonNav = "<div class='app-nav-common'><div class='app-nav-common-head app-nav-common-head-spe'></div></div>";
	
	CommonNavUtils = {
		getInstanse: function(settings, param){
			var commonNav = new CommonNav(settings, param);
			commonNav.init();
			return commonNav;
		}
	};
		
	return CommonNavUtils;
});