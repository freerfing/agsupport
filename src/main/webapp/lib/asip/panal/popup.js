define(["durandal/app", "jquery", "i18nCommon", "core", "mask", "partShow", "panalManager", "ui", "resizable"], 
		function(app, $, i18n, core, mask, partShow, panalManager){
	var PopupUtils, Popup;

	Popup = function(popupId, content, settings, param){
		this.popupId = this.panalId = popupId;
        this.settings = $.extend({}, Popup.defaultSettings, settings);
        this.content = content;
        this.param = param;     //参数用来传递给popup页面使用的参数
	};
	
	Popup.defaultSettings = {
		draggable: true,
		resizable: true,
		minBtn: true,
		maxBtn: false,
		closeBtn: true,
		panalListTitle: "",   //在桌面的面板列表上显示的标题
		top: null,
		left: null,
		right: null,
		bottom: null,
		pointShow: false,     //面板是否带有指示角
		pointBorder: "left",  //left/right/bottom 在哪个边显示
		pointPosition: 5,    //距离顶点的位置,从左边到右或者从上到下的距离
		modal: false,         //是否模态
		contentOpacity: 1,    //内容透明度默认不透明，如果透明，建议设置为 0.7
		headOpacity: 1,       //标题透明度默认不透明，如果透明，建议设置为 0.9
		transition: false,    //转场动画

		onFocus: function(e){},
		onClick: function(e){},
		onDbClick: function(e){},
//		onBeforeDrag: function(e){},
		onStartDrag: function(e){},
		onDrag: function(e){},
		onStopDrag: function(e){},
		onResize: function(e){},
		onClose: function(){}
	};
	
	Popup.dataDefault = {
		width: 300,
		height: 200,
		icon: null,    //按钮图片的class
		id: null       //切换页面的id
	};
	
	/** 初始化面板 **/
	Popup.prototype.init = function(){
		Popup.initPanal(this);
		Popup.initPartShow(this);
		Popup.initHead(this);
		Popup.initContent(this);
		Popup.initPoint(this);
		panalManager.panalEvent();
		this.active();
		panalManager.regPanal(this);
	};
	
	/** 激活面板 **/
	Popup.prototype.active = function(){
		var that = this;
		if(!this.settings.modal){
			this.zIndex = panalManager.getNextZIndex();
		}else{
			if(!this._mask){
				this._mask = mask.getInstance();
			}
			this._mask.show();
			this.zIndex = panalManager.getNextModalZIndex();
		}
		this.popupElement.css({
			"z-index": that.zIndex
		});
		this._headElement.removeClass("app-popup-inactive");
		this._contentContainerElement.removeClass("app-popup-inactive");
		if(this.settings.pointShow){
			this._point.css({"border-right-color": this._contentContainerElement.css("background-color")});
		}
		this.settings.onFocus();
		panalManager.activeAfter(this);
	};
	
	/** 不激活面板 **/
	Popup.prototype.inActive = function(){
		this._headElement.addClass("app-popup-inactive");
		this._contentContainerElement.addClass("app-popup-inactive");
		if(this.settings.pointShow){
			this._point.css({"border-right-color": this._contentContainerElement.css("background-color")});
		}
	};
	
	/** 最大化面板 **/
	Popup.prototype.max = function(){
		this.popupElement.css({
			"left": "2px", 
			"top": "52px", 
			"bottom": "32px",
			"width": document.documentElement.clientWidth - 4,
			"height": document.documentElement.clientHeight - 83});
//		this.resize();
		this.resizeHead();
		this.resizeContent();
		Popup.initPartShow(this);
		this._sizeState = "max";
	};
	
	/** 隐藏面板 **/
	Popup.prototype.min = function(){
		this.hide();
	};
	
	Popup.prototype.hide = function(){
		this.popupElement.hide();
	};
	
	/** 移动面板到 **/
	Popup.prototype.moveTo = function(x, y){
		this.settings.left = x;
		this.settings.right = null;
		this.settings.top = y;
		this.settings.bottom = null;
		this.popupElement.css({
			"left": this.settings.left,
			"right": this.settings.right,
			"top": this.settings.top,
			"bottom": this.settings.bottom
		});
	};
	
	Popup.prototype.getPopupElement = function(){
		return this.popupElement;
	};
	
	Popup.prototype.show = function(){
		this.popupElement.show();
	};
	
	Popup.prototype.close = function(){
		if(this.settings.modal){
			this._mask.remove();
			this._mask = null;
		}
		this.settings.onClose();
		panalManager.unRegPanal(this);
		this.popupElement.remove();
	};
	
	Popup.prototype.normalSize = function(){
		var that = this;
		if(!that.settings.left && !that.settings.right){
			that.settings.left = (document.documentElement.clientWidth - that.popupData.width)/2;
		}
		if(!that.settings.top && !that.settings.bottom){
			that.settings.top = (document.documentElement.clientHeight - that.popupData.height)/2;
		}
		this.popupElement.css({
			"left": that.settings.left,
			"top": that.settings.top,
			"right": that.settings.right,
			"bottom": that.settings.bottom
		});
		
		this.resizePopup();
		this.resizeHead();
		this.resizeContent();
		this._sizeState = "nomal";
	};
	
	Popup.prototype.resizePopup = function(){		
		this.popupElement.css({
			"width": this.popupData.width,
			"height": this.popupData.height
		});
	};
	
	Popup.prototype.resizeHead = function(){
		var headIconTabWidth = this.content.length * 39 + (this.content.length + 1) * 5 + 20;
		var headWidth = headIconTabWidth + this._headButtonElement.outerWidth() + 5;
		
		if(headWidth > this.popupElement.outerWidth()){
			this._headElement.css({
				"width": "100%"
			});
			this._headIconTabElement.css({
				"width": this._headElement.outerWidth() - this._headButtonElement.outerWidth() - 5
			});
			this._contentContainerElement.css({"border-top-right-radius": "0px"});
		}else{
			this._headElement.css({
				"width": headWidth
			});
			this._headIconTabElement.css({
				"width": headIconTabWidth
			});
			this._contentContainerElement.css({"border-top-right-radius": "5px"});
		}
	};
	
	Popup.prototype.resizeContent = function(){
		this._contentContainerElement.css({
			"height": this.popupElement.outerHeight() - this._headElement.outerHeight()
		});	
		//设置内容
		this._contentElement.css({
			"height": this.popupElement.outerHeight() - this._headElement.outerHeight() - 6,
			"width": this.popupElement.outerWidth() - 6
		});
	};
	
	Popup.prototype.exist = function(id){
		return !!this.popupContentList[id];
	};
	
	/** 初始化整体面板 **/
	Popup.initPanal = function(p){		
		p.popupData = $.extend({}, Popup.dataDefault, p.content[0]);
		p.uniqueID = core.generateId("app-popup");
		p.popupElement = $(Popup.view);
		p.popupElement.attr("popup-id", p.popupId);
		p._headElement = p.popupElement.find(".app-popup-head");
		p._headIconTabElement = p.popupElement.find(".app-popup-head-icon-tab");
		p._headButtonElement = p.popupElement.find(".app-popup-head-button");
		p._contentContainerElement = p.popupElement.find(".app-popup-content-container");
		p._contentElement = p.popupElement.find(".app-popup-content");
		p.popupContentList = {};
		p.popupIndex = 0;
		//设置panal
		p.popupElement.appendTo($("body"));
		Popup.initButton(p);
		p.normalSize();
		
		//可调整页面大小
		if(p.settings.resizable){
			p.popupElement.resizable({
				onResize: function(e){
					p.resizeHead();
					p.resizeContent();
					Popup.initPartShow(p);
					p.settings.onResize(e);
				},
				onStopResize: function(e){
					p.content[p.popupIndex].width = p.popupElement.outerWidth();
					p.content[p.popupIndex].height = p.popupElement.outerHeight();
				}
			});
		}
		if(p.settings.draggable){
			p.popupElement.draggable({
				containment: [-(p.settings.width), 0, ($(window).width() + p.settings.width), ($(window).height() + p.settings.height)],
				scroll: false,
				iframeFix: true,
				handle: p._headElement,
				onBeforeDrag: p.settings.onBeforeDrag,
				onStartDrag: p.settings.onStartDrag,
				onDrag: p.settings.onDrag,
				onStopDrag: p.settings.onStopDrag
			});
		}
		
		p.popupElement.click(function(){
			p.active();
			p.settings.onClick();
		});
		p.popupElement.dblclick(function(){
			p.settings.onDbClick();
		});
	};
	
	/** 初始化面板按钮 **/
	Popup.initButton = function(p){
		if(p.settings.closeBtn){
			//关闭操作
			p.popupElement.find(".app-popup-head-button-btn-close").click(function(){
				p.close();
			}).attr("title", i18n.textCommonPanalCloseBtn);
		}else{
			p.popupElement.find(".app-popup-head-button-btn-close").hide();
			p._headButtonElement.css("width", p._headButtonElement.outerWidth() - 16);
		}
		if(!p.settings.minBtn){
			p.popupElement.find(".app-popup-head-button-btn-min").hide();
			p._headButtonElement.css("width", p._headButtonElement.outerWidth() - 16);
		}else{
			p.popupElement.find(".app-popup-head-button-btn-min").click(function(){
				p.min();
			}).attr("title", i18n.textCommonPanalMinBtn);
		}
		if(!p.settings.maxBtn){
			p.popupElement.find(".app-popup-head-button-btn-max").hide();
		}else{
			p.popupElement.find(".app-popup-head-button-btn-max").click(function(){
				if(p.settings.maxBtn){
					if(p._sizeState === "nomal"){
						p.max();
					}else if(p._sizeState === "max"){
						p.normalSize();
						Popup.initPartShow(p);
					}
				}
			}).attr("title", i18n.textCommonPanalMaxBtn);
			p._headButtonElement.css("width", p._headButtonElement.outerWidth() + 16);
		}
	};
	
	/** 初始化标头滚动条 **/
	Popup.initPartShow = function(p){
		var maxNum = parseInt((p._headIconTabElement.outerWidth() - 25)/44);
		if(!p.pslr && p.content.length > maxNum){
			p.pslr = partShow.getInstanse(1, 1, p._headIconTabElement,{type: "left-right"});
			p.pslr._preElement.css("top", "12px");
			p.pslr._nextElement.css("top", "12px");
		}else if(p.pslr){
			if(p.content.length > maxNum){				
				p.pslr._nextElement.show();
				p.pslr._nextUsable = true;				
				if(p._headElement.find(".app-popup-head-item:visible").first().attr("popupItem-id") > 0){
					p.pslr._preElement.show();
					p.pslr._preUsable = true;
				}
			}else{
				p._headElement.find(".app-popup-head-item:hidden").show();
				p.pslr._preElement.hide();
				p.pslr._nextElement.hide();
				p.pslr._nextUsable = false;
				p.pslr._preUsable = false;
			}
		}
	};
	
	/** 初始化面板标头 **/
	Popup.initHead = function(p){
		//模态panal不能使用最小化按钮
		if(p.settings.modal){
			p.settings.minBtn = false;
		}
		for(var i = 0; i < p.content.length; i++){
			var headItem = $(Popup.viewHeadItem);
			headItem.attr("popupItem-id", i);
			headItem.find(".app-popup-head-item-icon").addClass(p.content[i].icon);
			p._headIconTabElement.append(headItem);			
		}
		//设置标题{
		p._headElement.css({"opacity": p.settings.headOpacity});
		
		p._headIconTabElement.delegate(".app-popup-head-item-icon", "click", function(){
			p.popupIndex = $(this).parent().attr("popupItem-id");
			p.popupData = $.extend({}, Popup.dataDefault, p.content[p.popupIndex]);			
			p.popupContentList[p.contentUniqueID].hide();
			p.contentUniqueID = p.popupData.id + p.popupIndex;
			p.resizePopup();
			p.resizeHead();
			p._contentContainerElement.css({
				"height": p.popupElement.outerHeight() - p._headElement.outerHeight()
			});	
			Popup.initPartShow(p);
			if(p.exist(p.contentUniqueID)){
				p._contentElement = p.popupContentList[p.contentUniqueID];
				p._contentElement.show();
			}else{
				p._contentElement = $("<div class='app-popup-content' id=''></div>");
				p._contentContainerElement.append(p._contentElement);
				Popup.initContent(p);
			}			
		});
	};
	
	/** 初始化面板内容 **/
	Popup.initContent = function(p){
		p._contentElement.css({
			"height": p.popupElement.outerHeight() - p._headElement.outerHeight() - 6,
			"width": p.popupElement.outerWidth() - 6
		});
		//设置背景透明
		p._contentContainerElement.css({
			"opacity": p.settings.contentOpacity
		});
		p.contentUniqueID = p.popupData.id + p.popupIndex;
		p._contentElement.attr("id", p.contentUniqueID);
		p.popupContentList[p.contentUniqueID] = p._contentElement;
		//载入页面内容
		if(p.popupData.id){
			if(p.settings.transition){
				app.setRoot(p.popupData.id, "entrance", p.contentUniqueID); 
			}else{
				app.setRoot(p.popupData.id, null, p.contentUniqueID); 
			}
		}
	};
	
	/** 面板指示角 **/
	Popup.initPoint = function(p){
		if(p.settings.pointShow){
			p._point = $("<div class='app-popup-point'></div>");
			if(p.settings.pointBorder === "right"){
				p._point.css({
					"transform": "rotate(180deg)",
					"right": "-15px",
					"left": null,
					"top": p.settings.pointPosition + p._headElement.outerHeight(),
					"border-right-color": p._contentContainerElement.css("background-color")
				});
			}else if(p.settings.pointBorder === "bottom"){
				p._point.css({
					"transform": "rotate(270deg)",
					"bottom": "-14px",
					"top": null,
					"left": p.settings.pointPosition,
					"border-right-color": p._contentContainerElement.css("background-color")
				});
			}else if(p.settings.pointBorder === "left"){
				p._point.css({
					"left": "-15px",
					"top": p.settings.pointPosition + p._headElement.outerHeight(),
					"border-right-color": p._contentContainerElement.css("background-color")
				});
			}
			p.popupElement.append(p._point);
		}
	};
	
	Popup.view = [
  		"<div class='app-popup'>",
	  		"<div class='app-popup-head app-popup-head-spe'>" +
	  			"<div class='app-popup-head-icon-tab'></div>" +
	  			"<div class='app-popup-head-button'>",
				    "<svg width='16' height='20' version='1.1' xmlns='http://www.w3.org/2000/svg' class='app-popup-head-button-btn app-popup-head-button-btn-close'>",
				        "<circle cx='8' cy='10' r='5' stroke='#FFFFFF' stroke-width='1' fill='red'/>",
				        "<line x1='6' y1='8' x2='10' y2='12'  style='stroke:white;stroke-width:2'/>",
				        "<line x1='10' y1='8' x2='6' y2='12'  style='stroke:white;stroke-width:2'/>",
				    "</svg>",
				    "<svg width='16' height='20' version='1.1' xmlns='http://www.w3.org/2000/svg' class='app-popup-head-button-btn app-popup-head-button-btn-min'>",
				        "<circle cx='8' cy='10' r='5' stroke='#FFFFFF' stroke-width='1' fill='green'/>",
				        "<line x1='5' y1='10' x2='11' y2='10'  style='stroke:white;stroke-width:2'/>",
				    "</svg>",
					    "<svg width='16' height='20' version='1.1' xmlns='http://www.w3.org/2000/svg' class='app-popup-head-button-btn app-popup-head-button-btn-max'>",
				        "<circle cx='8' cy='10' r='5' stroke='#FFFFFF' stroke-width='1' fill='blue'/>",
				        "<line x1='6' y1='8' x2='10' y2='8'  style='stroke:white;stroke-width:2'/>",
				        "<line x1='10' y1='8' x2='10' y2='12'  style='stroke:white;stroke-width:2'/>",
				        "<line x1='10' y1='12' x2='6' y2='12'  style='stroke:white;stroke-width:2'/>",
				        "<line x1='6' y1='12' x2='6' y2='8'  style='stroke:white;stroke-width:2'/>",
				    "</svg>",
			    "</div>",
  			"</div>",
	  		"<div class='app-popup-content-container app-popup-content-container-spe'><div class='app-popup-content' id=''></div></div>",
  		"</div>"     
  	].join("");
	
	Popup.viewHeadItem = "<div class='app-popup-head-item'><div class='app-popup-head-item-icon'></div></div>";
	
	PopupUtils = {
		getInstance: function(popupId, content, settings, param){

			if(panalManager.exist(popupId)){
				var p = panalManager.getPanal(popupId);
				p.active();
				return p;
			}else{
				var p = new Popup(popupId, content, settings, param);
				p.init();
				return p;
			}
		},
		getPopup: function(popupId){
			return panalManager.getPanal(popupId);
		},
		/** 通过面板内部的dom元素获取面板对象 **/
		getPopupByElement: function(element){
			if(!(element instanceof $)){ 
				element = $(element);
			} 
			return this.getPopup(element.parents("div.app-popup:first").attr("popup-id"));
		}
	};
	
	return PopupUtils;
});