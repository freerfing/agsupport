define(["knockout", "durandal/app", "jquery", "i18nCommon", "core", "mask", "panalManager", "string", "chromeTabs", "ui", "resizable"], 
		function (ko, app, $, i18n, core, mask, PanalManager, stringUtils, chromeTabs) {
	var panalUtils, Panal;
	
	Panal = function(content, settings, param){
	    this.settings = $.extend({}, Panal.defaultSettings, settings);
        this.content = content;
        this.param = param;     //参数用来传递给panal页面使用的参数
	};
	
	Panal.defaultSettings = {
		width: 400,
		height: 300,
		draggable: true,
		resizable: true,
		minBtn: true,
		maxBtn: false,
		closeBtn: true,
		statBtn: false,
		detailBtn: false,
		titleShow: true,
		titleHeight: 32,
		title: "",
		panalListTitle: "",   //在桌面的面板列表上显示的标题，用在title为空的情况
		top: null,
		left: null,
		right: null,
		bottom: null,
		margin: 3,
		mouseoutClose: false, //鼠标移出即关闭
		pointShow: false,     //面板是否带有指示角
		pointBorder: "left",  //left/right/top/bottom 在哪个边显示
		pointPosition: 10,    //距离顶点的位置,从左边到右或者从上到下的距离
		modal: false,         //是否模态
		contentOpacity: 0.95,    //内容透明度默认不透明，如果透明，建议设置为 0.7
		headOpacity: 1,       //标题透明度默认不透明，如果透明，建议设置为 0.9
		transition: false,    //转场动画
		multi: false,         //是否只可能存在一个页面，如果可能被多次打开，请设置为true
		multiId: null,        //用来标识被多次打开的字符串
		closeOther: false,
		hasTab: false,		//是否有tab
		onTabClose:function(tab){ }, //选项卡
		onTabActive: function(tab){ }, //选项卡击活的时候
		onFocus: function(e){},
		onClick: function(e){},
		onDbClick: function(e){},
//		onBeforeDrag: function(e){},
		onStartDrag: function(e, ui){},
		onDrag: function(e, ui){},
		onStopDrag: function(e, ui){},
		onResize: function(e){},
		onClose: function(){},
		onStatShow:function(){},
		onMaxShow:function(){},
		onMinShow:function(){},
		onDetailShow:function(){},
		onInitAfter:function(){} //初始化回调

	};
	
	/** 初始化面板 **/
	Panal.prototype.init = function(closeOther){
		Panal.initPanal(this);
		Panal.initHead(this);
		Panal.initButton(this);
		Panal.initContent(this);
		Panal.initPoint(this);
		PanalManager.panalEvent();
		this.active();
		PanalManager.regPanal(this,closeOther);

		var that = this;

		if(this.settings.hasTab)
		{
			this.tabsResize(this.setting);
			var $chromeTabsExampleShell = $('.chrome-tabs-shell')
	        chromeTabs.init({
	            $shell: $chromeTabsExampleShell,
	            minWidth: 35,
	            maxWidth: 160
	        });

	        //绑定关闭事件
	        $chromeTabsExampleShell.bind('chromeTabClose', function(event, params){

	        	var panelId = params.data.id;
        		that._contentElement.find("#" + panelId).remove();
        		that.scrollTab();
    			//清除事件
                that.removeEvent(panelId, "onMinShow");
                that.removeEvent(panelId, "onMaxShow");
                that.removeEvent(panelId, "onClose");

        		//当所有选项卡关闭，关闭面板
        		if(that._headElement.find(".chrome-tab").length == 0)
        		{

        			//清除选项卡
        			that.close();
        		}

        		that.settings.onTabClose(params);

	        });

	        //绑定切换事件
	        $chromeTabsExampleShell.bind('chromeTabRender', function(){
	            var $currentTab = $chromeTabsExampleShell.find('.chrome-tab-current');
	            if ($currentTab.length) {

	                var params = $currentTab.data('tabData').data;
	               	var panelId = params.id;
		        	that._contentElement.find(".rPanel").hide();
	        		that._contentElement.find("#" + panelId).show();

	        		if(that.settings.onTabActive)
	        		{
	        			that.settings.onTabActive(params);
	        		}
	            }
	        });

		}


		if(this.settings.onInitAfter){
			var that = this;
			window.setTimeout(function(){
				that.settings.onInitAfter();
			}, 1500);	
		}     

	};
	
	/** 激活面板 **/
	Panal.prototype.active = function(){
		var that = this;
		if(!this.settings.modal){
			this.zIndex = PanalManager.getNextZIndex();
		}else{
			if(!this._mask){
				this._mask = mask.getInstance();
			}
			this._mask.show();
			this.zIndex = PanalManager.getNextModalZIndex();
		}
		this.panalElement.css({
			"z-index": that.zIndex
		});
		this._headElement.removeClass("app-panal-inactive");
		//this._backgroundElement.removeClass("app-panal-inactive");
		if(this.settings.pointShow){
			this._point.css({"border-right-color": this._backgroundElement.css("background-color")});
		}
		this.settings.onFocus();
		PanalManager.activeAfter(this);
	};
	
	/** 不激活面板 **/
	Panal.prototype.inActive = function(){
		this._headElement.addClass("app-panal-inactive");
		//this._backgroundElement.addClass("app-panal-inactive");
		//if(this.settings.pointShow){
		//	this._point.css({"border-right-color": this._backgroundElement.css("background-color")});
		//}
	};
	
	/** 获取状态 **/
	Panal.prototype.getSizeState = function(){ 
		return this._sizeState; 
	};

	/** 选项卡事件 **/
	Panal.prototype.addEvent = function(runId, eventName, callback)
	{
		if(!this._events)
			this._events = {};

		if(!this._events[eventName])
			this._events[eventName] = [];
		
		this._events[eventName].push({ "target": runId,  "callback": callback });

	}

	/** 触发选项卡事件 **/
	Panal.prototype.raiseEvent = function(eventName)
	{
		if(this._events && this._events[eventName])
		{
			var events = this._events[eventName];
			var i = 0;
			for (i=0; i<events.length; i++) {
				events[i].callback();
			};
		}
	}

	/** 清除事件 **/
	Panal.prototype.removeEvent = function(runId, eventName)
	{

		if(this._events && this._events[eventName])
		{
			var tmpEvents = this._events[eventName];
			var i = 0;
			for (i=0; i<tmpEvents.length; i++) {
				if(tmpEvents[i].target == runId)
				{
					this._events[eventName].splice(i, 1);
					break;
				}
			};
			//console.log(this._events);
		}
	}

	/** 最大化面板 **/
	Panal.prototype.max = function(){
		if(this._sizeState != "max"){
			this.panalElement.css({
				"left": "41px",
				"top": "75px",
				"bottom": "1px",
				"width": document.documentElement.clientWidth - 42,
				"height": document.documentElement.clientHeight - 76});
			this.settings.left = 41;
			this.resize();
			this._sizeState = "max";
		}else {
			this.panalElement.css({
				"left": document.documentElement.clientWidth - 351,
				"top": "75px",
				"bottom": "1px",
				"width": "350px",
				"height": document.documentElement.clientHeight - 76});
            this.settings.left = null;
			this.resize();
			this.panalElement.find(".app-panal-head-button-btn-max").attr("title", i18n.textCommonPanalUpBtn);
			this._sizeState = "normal";
		}
		this.panalElement.find(".app-panal-head-button-btn-max").toggleClass("app-panal-head-button-btn-min");
		this.settings.onMaxShow();
		this.raiseEvent("onMaxShow");
		this.scrollTab();

	};
	
	/** 最小化面板 **/
	Panal.prototype.min = function(){
		if(this._sizeState != "min"){
			this.panalElement.css({
				"width": this.settings.width,
				"height": this.settings.titleHeight,
				"left": this.settings.left,
				"top": this.settings.top,
				"right": this.settings.right,
				"bottom": this.settings.bottom
			});
			this.resize();
			this.panalElement.find(".app-panal-head-button-btn-down").attr("title", i18n.textCommonPanalDownBtn);
			this._sizeState = "min";
		}else{
			this.normalSize();
			this.panalElement.find(".app-panal-head-button-btn-down").attr("title", i18n.textCommonPanalUpBtn);
			this._sizeState = "normal";
		}
		this.panalElement.find(".app-panal-head-button-btn-down").toggleClass("app-panal-head-button-btn-up");
		this.settings.onMinShow();
		this.raiseEvent("onMinShow");
	};
	
	/** 移动面板 **/
	Panal.prototype.move = function(x, y){
		if(this.settings.left){
			this.settings.left = this.settings.left + x;
			this.panalElement.css({"left": this.settings.left});
		}else if(this.settings.right){
			this.settings.right = this.settings.right - x;
			this.panalElement.css({"right": this.settings.right});
		}
		if(this.settings.top){
			this.settings.top = this.settings.top + y;
			this.panalElement.css({"top": this.settings.top});
		}else if(this.settings.bottom){
			this.settings.bottom = this.settings.bottom - y;
			this.panalElement.css({"bottom": this.settings.bottom});
		}
	};
	
	/** 移动面板到 **/
	Panal.prototype.moveTo = function(x, y){
		this.settings.left = x;
		this.settings.right = null;
		this.settings.top = y;
		this.settings.bottom = null;
		this.panalElement.css({
			"left": this.settings.left,
			"right": this.settings.right,
			"top": this.settings.top,
			"bottom": this.settings.bottom
		});
	};
	
	/** 更新标题 **/
	Panal.prototype.updateTitle = function(title){
		this.settings.title = title;
		this._headElement.find(".app-panal-head-title").text(title);
	};
	
	Panal.prototype.getPanalElement = function(){
		return this.panalElement;
	};
	
	Panal.prototype.show = function(){
		this.panalElement.show();
	};
	
	Panal.prototype.tabs = function(){

	}

	Panal.prototype.tabClose = function(title){
		var $chromeTabsExampleShell = $('.chrome-tabs-shell');
		var $tab = $chromeTabsExampleShell.find(".chrome-tab > .chrome-tab-title[title='" + title + "']").parent();

		if($tab.length != 0)
		{
			//console.log($tab.data("tabData"));
			chromeTabs.closeTab($chromeTabsExampleShell, $tab);
		}

		this.scrollTab();
	}

	/**closeByAnother:表示由于打开其他的panal，而关闭了此panal，与点击关闭按钮关闭此panal相区别**/
	Panal.prototype.close = function(closeByAnother){
		if(this.settings.modal){
			this._mask.remove();
			this._mask = null;
		}
		this.settings.onClose();
		this.raiseEvent("onClose");
		this._events = null;
		PanalManager.unRegPanal(this);
		this.panalElement.remove();
		if(!closeByAnother){
			app.trigger("desktop:floatingpanel:visible",{visible:true});
		}
	};
	
	Panal.prototype.normalSize = function(){
		var that = this;
		if(!that.settings.left && !that.settings.right){
			that.settings.left = (document.documentElement.clientWidth - that.settings.width)/2;
		}
		if(!that.settings.top && !that.settings.bottom){
			that.settings.top = (document.documentElement.clientHeight - that.settings.height)/2;
		}

		if(this._sizeState == "min")
		{
			that.settings.left = that.panalElement.left;
		}

		this.panalElement.css({
			"width": that.settings.width,
			"height": that.settings.height,
			"left": that.settings.left,
			"top": that.settings.top,
			"right": that.settings.right,
			"bottom": that.settings.bottom
		});
		this._contentElement.css({
			'margin-left': that.settings.margin + 'px',
			'margin-right': that.settings.margin + 'px'
		});
		
		this.resize();
		this._sizeState = "normal";
	};
	
	Panal.prototype.showStat = function(){
		this.panalElement.find(".app-panal-head-button-btn-stat").toggleClass("app-panal-head-button-btn-stat-click");
		this.panalElement.find(".app-panal-head-button-btn-detail").toggleClass("app-panal-head-button-btn-detail-click");
		this.settings.onStatShow();
	};
	
	Panal.prototype.showDetail = function(){
		this.panalElement.find(".app-panal-head-button-btn-stat").toggleClass("app-panal-head-button-btn-stat-click");
		this.panalElement.find(".app-panal-head-button-btn-detail").toggleClass("app-panal-head-button-btn-detail-click");
		this.settings.onDetailShow();
	};
	
	/**
	移动到
	**/
	Panal.prototype.moveTo = function(top, left)
	{

		this.panalElement.css({
			"top": top,
			"left": left
		});		

	}

	/** 
	*初始化panal大小和位置
    *@param setting {width,height,top,right,right,bottom}
	*/
	Panal.prototype.resize = function(setting){
		if (setting) {
			if(!setting.left && !setting.right){
				setting.left = (document.documentElement.clientWidth - setting.width)/2;
			}
			if(!setting.top && !setting.bottom){
				setting.top = (document.documentElement.clientHeight - setting.height)/2;
			}
			this.panalElement.css({
				"width": setting.width,
				"height": setting.height,
				"left": setting.left,
				"top": setting.top,
				"right": setting.right,
				"bottom": setting.bottom
			});
		}

		this._contentContainerElement.css({
			"height": this.panalElement.height() - this._headElement.height()
		});
		//设置内容
		this._contentElement.css({
			"height": this.panalElement.height() - this._headElement.height(),
			"width": this.panalElement.width() - this.settings.margin*2
		});

		this.tabsResize();

	};
	

	Panal.prototype.tabsResize = function() {
		
		if(!this.settings.hasTab)
			return;

		var tabBarWidth = 280;
		tabBarWidth = this._headElement.width() - this._headElement.find(".app-panal-head-button").width() + 4
		this._headElement.find(".app-panal-head-tabs").css({
			"width" : tabBarWidth
		});

		var $chromeTabsExampleShell = $('.chrome-tabs-shell');
		$chromeTabsExampleShell.scrollLeft(0);
		chromeTabs.fixTabSizes($chromeTabsExampleShell);

	}

	Panal.prototype.updateLayout = function(){

		this.tabsResize();
	}

	/*刷新面板内容*/
	Panal.prototype.update = function(params){
		if (params)
			this.param = params;
		Panal.initContent(this);
	}
	Panal.prototype.scrollTab = function(){
		if($('.chrome-tab').length==0)
			return;
		var p=this.panalElement;
		var widthDiff = (p.find(".chrome-tab").width() + 25) * p.find(".chrome-tab").length - p.find(".chrome-tabs-shell").width();

		if(widthDiff<0){
			p.find(".app-panal-head-button-btn-left").hide();
			p.find(".app-panal-head-button-btn-right").hide();
			return;
		}else{
			p.find(".app-panal-head-button-btn-left").show();
			p.find(".app-panal-head-button-btn-right").show();			
		}	
		this.tabsResize();

		//如果已经添加了事件，就不要再添加了
		$(".app-panal-head-button-btn-left").each(function () { 
	        var e = $._data(this, "events");
	        if (e && e["click"]) {  
	  			
	        } else {  
	            $(this).click(function () {            	
	            	var scrollLeftValue=p.find(".chrome-tabs-shell").scrollLeft();
	            	var itemWidth=p.find(".chrome-tab").width() + 25;
	                var sw = scrollLeftValue - itemWidth;   
	                if(sw<0)
	                	return;
	                p.find(".chrome-tabs-shell").scrollLeft(sw);
	            }).attr("title", i18n.textCommonPanalLeftBtn);  
	        }  
	    });
	    $(".app-panal-head-button-btn-right").each(function () {   
	        var e = $._data(this, "events");
	        if (e && e["click"]) {
	        } else {
	            $(this).click(function () {
					var scrollLeftValue=p.find(".chrome-tabs-shell").scrollLeft();
	            	var itemWidth=p.find(".chrome-tab").width() + 25;
	            	var maxScrollWidth = itemWidth * p.find(".chrome-tab").length - p.find(".chrome-tabs-shell").width();
					var sw = scrollLeftValue + itemWidth;
					if(sw>maxScrollWidth + itemWidth)
						return;
					p.find(".chrome-tabs-shell").scrollLeft(sw);

	            }).attr("title", i18n.textCommonPanalRightBtn);  
	        }  
	    });	
		
	}
	/*添加选项卡*/
	Panal.prototype.addTab = function(title, url, params){
		
		//绑事件
		var panelId = "rPanel_" + url.replace(/\//g, '-');

		//选项卡
        var $chromeTabsExampleShell = $('.chrome-tabs-shell')
        chromeTabs.addNewTab($chromeTabsExampleShell, {
            //favicon: 'img/3.ico',
            title: title,
            data: { 
            	"id": panelId,
            	"title": title,
            	"url": url,
            	"params": params
            }
        });	

        //插件面板
        var newPanel = $("<div id='" + panelId + "' class='rPanel'>加载中...</div>");
        this._contentElement.append(newPanel);
        this._contentElement.find(".rPanel").hide();
        this._contentElement.find("#" + panelId).show();

        if(!params)
        	params = {};
        params.panelId = panelId;

        this.scrollTab();
        //加载url
        app.setRoot(url, null, panelId, params);

	}

	/** 初始化面板 **/
	Panal.initPanal = function(p){
		p.panalId = (p.settings.multi ? (p.content + p.settings.multiId) : p.content);
		p.panalElement = $(Panal.view);
		p.panalElement.attr("panal-id", p.panalId);
		p._headElement = p.panalElement.find(".app-panal-head");
		p._contentContainerElement = p.panalElement.find(".app-panal-content-container");
		p._backgroundElement = p.panalElement.find(".app-panal-background");
		p._contentElement = p.panalElement.find(".app-panal-content");
		//设置panal
		p.panalElement.appendTo($("body"));
		//可以被拖拽。对于非AMD标准的jquery插件不能使用 require("***")
		if(p.settings.draggable){
			/**
			p.panalElement.draggable({
				handle: p._headElement,
				onBeforeDrag: p.settings.onBeforeDrag,
				onStartDrag: p.settings.onStartDrag,
				onDrag: p.settings.onDrag,
				onStopDrag: p.settings.onStopDrag
			});**/
			p.panalElement.draggable({
				containment: [-(p.settings.width), 0, ($(window).width() + p.settings.width), ($(window).height() + p.settings.height)],
				scroll: false,
				iframeFix: true,
				handle: p._headElement,
				start: p.settings.onStartDrag,
				drag: p.settings.onDrag,
				stop: p.settings.onStopDrag
			});
		}else{
			p._headElement.css({"cursor":"auto"});
		}
		//可调整页面大小
		if(p.settings.resizable){
			// p.panalElement.resizable({
			// 	onResize: function(e){
			// 		p.resize();
			// 		p.settings.onResize(e);
			// 	}
			// });

			p.panalElement.resizable();
		}
		p.panalElement.click(function(){
			p.settings.onClick();
		});
		p.panalElement.dblclick(function(){
			p.settings.onDbClick();
		});
		Panal.initPanalMouseout(p);
	};
	
	/** 面板指示角 **/
	Panal.initPoint = function(p){
		if(p.settings.pointShow){
			p._point = $("<div class='app-panal-point'></div>");
			if(p.settings.pointBorder === "right"){
				p._point.css({
					"transform": "rotate(180deg)",
					"right": "-15px",
					"left": null,
					"top": p.settings.pointPosition,
					"border-right-color": p._backgroundElement.css("background-color")
				});
			}else if(p.settings.pointBorder === "top"){
				p._point.css({
					"transform": "rotate(90deg)",
					"top": "-15px",
					"left": p.settings.pointPosition,
					"border-right-color": p._headElement.css("background-color")
				});
			}else if(p.settings.pointBorder === "bottom"){
				p._point.css({
					"transform": "rotate(270deg)",
					"bottom": "-14px",
					"top": null,
					"left": p.settings.pointPosition,
					"border-right-color": p._backgroundElement.css("background-color")
				});
			}else{
				p._point.css({
					"left": "-15px",
					"top": p.settings.pointPosition,
					"border-right-color": p._backgroundElement.css("background-color")
				});
			}
			p.panalElement.append(p._point);
		}
	};
	
	/** 鼠标移出关闭事件 **/
	Panal.initPanalMouseout = function(p){
		if(p.settings.mouseoutClose){
			p.panalElement.mouseout(function(e){
				if(p.settings.left){
					if(e.pageX < p.settings.left){
						p.close();
					}
					if(e.pageX > p.settings.left + p.settings.width){
						p.close();
					}
				}
				if(p.settings.right){
					if(e.pageX < (document.documentElement.clientWidth - p.settings.width - p.settings.right)){
						p.close();
					}
					if(e.pageX > (document.documentElement.clientWidth - p.settings.right)){
						p.close();
					}
				}
				if(p.settings.top){
					if(e.pageY < p.settings.top){
						p.close();
					}
					if(e.pageY > p.settings.top + p.settings.height){
						p.close();
					}
				}
				if(p.settings.bottom){
					if(e.pageY < (document.documentElement.clientHeight - p.settings.height - p.settings.bottom)){
						p.close();
					}
					if(e.pageY > (document.documentElement.clientHeight - p.settings.bottom)){
						p.close();
					}
				}
			});
		}
	};
	
	/** 初始化面板标头 **/
	Panal.initHead = function(p){
		//模态panal不能使用最小化按钮
		if(p.settings.modal){
			p.settings.minBtn = false;
		}
		p._headElement.height(p.settings.titleHeight);
		p._headElement.find(".app-panal-head-title").text(p.settings.title);
		p._headElement.find(".app-panal-head-title").css("line-height",p.settings.titleHeight+"px");
		p._headElement.find(".app-panal-head-button .app-panal-head-button-btn").height(p.settings.titleHeight);
		//p._headElement.find(".app-panal-head-tabs").
		if(p.settings.hasTab)
		{
			//显示选项卡
			p._headElement.find(".app-panal-head-title").addClass("app-panal-hide");

		}
		else
		{
			p._headElement.find(".app-panal-head-tabs").addClass("app-panal-hide");
		}
		//设置标题
		if(p.settings.titleShow){
			p._headElement.css({"opacity": p.settings.headOpacity});
		}else{
			p._headElement.css({
				"opacity": p.settings.contentOpacity
			});
			p._headElement.removeClass("app-panal-head-spe").addClass("app-panal-background-spe");
		}
		p._headElement.dblclick(function(){
			// if(p.settings.maxBtn || p.settings.minBtn){
			// 	if(p._sizeState === "normal"){
			// 		if(p.settings.maxBtn){
			// 			p.max();
			// 		}
			// 	}else{
			// 		if(p._sizeState === "min"){
			// 			p.panalElement.find(".app-panal-head-button-btn-down").attr("title", i18n.textCommonPanalUpBtn);
			// 			p.panalElement.find(".app-panal-head-button-btn-down").toggleClass("app-panal-head-button-btn-up");
			// 		}
			// 		p.normalSize();
			// 	}
			// }
			p.active();
		}).click(function(){
			p.active();
		});
		p.normalSize();
	};
	
	/** 初始化面板内容 **/
	Panal.initContent = function(p){
		//设置背景透明
		p._backgroundElement.css({
			"opacity": p.settings.contentOpacity
		});
		p._backgroundElement.css("top",p.settings.titleHeight);
		p._contentContainerElement.css("top",p.settings.titleHeight);
		p.uniqueID = core.generateId("app-panalPop");
		p._contentElement.attr("id", p.uniqueID);

		//载入页面内容
		if(p.content){
			if(p.settings.transition){
				app.setRoot(p.content, "entrance", p.uniqueID); 
			}else{
				app.setRoot(p.content, null, p.uniqueID); 
			}
		}

	};
	
	/** 初始化面板按钮 **/
	Panal.initButton = function(p){

		if(p.settings.hasTab)
		{
			p.scrollTab();

		}
		else
		{
			p.panalElement.find(".app-panal-head-button-btn-left").hide();
			p.panalElement.find(".app-panal-head-button-btn-right").hide();
		}

		if(p.settings.closeBtn){
			//关闭操作
			p.panalElement.find(".app-panal-head-button-btn-close").click(function(){
				p.close();
			}).attr("title", i18n.textCommonPanalCloseBtn);
		}else{
			p.panalElement.find(".app-panal-head-button-btn-close").hide();
		}
		if(!p.settings.minBtn){
			p.panalElement.find(".app-panal-head-button-btn-down").hide();
		}else{
			p.panalElement.find(".app-panal-head-button-btn-down").click(function(){
				p.min();
			}).attr("title", i18n.textCommonPanalUpBtn);
		}
		if(!p.settings.maxBtn){
			p.panalElement.find(".app-panal-head-button-btn-max").hide();
		}else{
			p.panalElement.find(".app-panal-head-button-btn-max").click(function(){
				p.max();
			}).attr("title", i18n.textCommonPanalMaxBtn);
		}
		if(!p.settings.statBtn){
			p.panalElement.find(".app-panal-head-button-btn-stat").hide();
		}else{
		    p.panalElement.find(".app-panal-head-button-btn-stat").toggleClass("app-panal-head-button-btn-stat-click");
			p.panalElement.find(".app-panal-head-button-btn-stat").click(function(){
				p.showStat();
			}).attr("title", i18n.textCommonPanalStatBtn);
		}
		if(!p.settings.detailBtn){
			p.panalElement.find(".app-panal-head-button-btn-detail").hide();
		}else{
			p.panalElement.find(".app-panal-head-button-btn-detail").click(function(){
				p.showDetail();
			}).attr("title", i18n.textCommonPanalDetailBtn);
		}
	};
	
	Panal.view = [
		"<div class='app-panalPop app-panal-font-spe'>",
		"<div class='app-panal-head app-panal-head-spe'>",
			"<span class='app-panal-head-title'></span>",
			"<div class='app-panal-head-tabs'><div class='chrome-tabs-shell'><div class='chrome-tabs'></div></div></div>",
			"<div class='app-panal-head-button'>",			
			    "<div class='app-panal-head-button-btn app-panal-head-button-btn-close'>",
			    "</div>",
				"<div class='app-panal-head-button-btn app-panal-head-button-btn-max'>",
				"</div>",
			    "<div class='app-panal-head-button-btn app-panal-head-button-btn-down'>",
			    "</div>",				
			    "<div class='app-panal-head-button-btn app-panal-head-button-btn-detail app-panal-head-button-btn-selected'>",
			    "</div>",
			    "<div class='app-panal-head-button-btn app-panal-head-button-btn-stat'>",
			    "</div>",
			    "<div class='app-panal-head-button-btn app-panal-head-button-btn-right'>",
			    "</div>",	
			    "<div class='app-panal-head-button-btn app-panal-head-button-btn-left'>",
			    "</div>",				    		    
			"</div>",
		"</div>",
		"<div class='app-panal-background app-panal-background-spe'></div>",
		"<div class='app-panal-content-container'><div class='app-panal-content' id=''></div></div>",
		"</div>"     
	].join("");
	
	panalUtils = {
		getInstance: function(content, settings, param){
			
			param = param || {};
	        settings = settings || {};
	        // 支持content中添加参数,（主要目的为了减少参数配置）格式：viewPath?p1=value1&p2=value2, 如果 param中有设置，以param为准
	        // 支持content中添加设置参数，设置参数的命名需要添加前缀 "_$_"，以区别于普通参数,如果settings中有设置，以settings中为准 
	        var pos = content.indexOf("?");
		    if(pos > -1){
			    var paramArray = content.substr(pos + 1).split("&"), params;
			    for(var i=0;i<paramArray.length;i++){
				    params = paramArray[i].split("=");
				    if(params[1]){
				    	if(params[0].indexOf("_$_") === 0){
					    	params[0] = params[0].substr(3);
					    	settings[params[0]] = settings[params[0]] || stringUtils.getValue(params[1]);
					    }else{
					    	param[params[0]] = param[params[0]] || stringUtils.getValue(params[1]); 
					    }
				    }
			    }
			    content = content.substring(0, pos);
		    }
			
			var panalId = content;
			if(settings && settings.multi){
				panalId = panalId + settings.multiId;
			}
			if(PanalManager.exist(panalId)){
				var p = PanalManager.getPanal(panalId);
				p.show();
				p.active();
				return p;
			}else{
				var p = new Panal(content, settings, param);
				p.init(settings.closeOther);
				return p;
			}
		},
		getPanal: function(panalId){
			return PanalManager.getPanal(panalId);
		},
		getAllPanal: function(){
			return PanalManager.getAllPanal();
		},
		/** 通过面板内部的dom元素获取面板对象 **/
		getPanalByElement: function(element){
			if(!(element instanceof $)){ 
				element = $(element);
			} 
			return this.getPanal(element.parents("div.app-panalPop:first").attr("panal-id"));
		},
		getTabInstance: function(settings){
			
			settings.hasTab = true;
			return this.getInstance("", settings, null);
		}
	};
	
	return panalUtils;
	
});