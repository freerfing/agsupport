define(["jquery", "core", "i18nCommon", "mask", "string"], function(jquery, core, i18n, mask, stringUtils){
	var Box, BoxUtils;
	
	Box = function(type, message, title, settings, parent){
		this.type = type;
        this.settings = $.extend({}, Box.defaultSettings, settings);
        this.message = message;
        this.title = title;
        this.parent = core.getParent(parent);
	};
	
	Box.initAlert = function(box){
		box._sureBtn = box._contentElement.find(".app-box-button-btn-sure");
		box._cancelBtn = box._contentElement.find(".app-box-button-btn-cancel");
		if(box.settings.sureBtnShow){
			box._sureBtn.text(i18n.textCommonOkBtn).click(function(){
				box.close();
				box.settings.clickSure();
			}).show();
		}
		if(box.settings.cancelBtnShow){
			box._cancelBtn.text(i18n.textCommonCancelBtn).click(function(){
				box.close();
				box.settings.clickCancel();
			}).show();
		}
	};
	
	Box.initConfirm = function(box){
		box._yesBtn = box._contentElement.find(".app-box-button-btn-yes");
		box._noBtn = box._contentElement.find(".app-box-button-btn-no");
		if(box.settings.yesBtnShow){
			box._yesBtn.text(i18n.textCommonYesBtn).click(function(){
				box.close();
				box.settings.clickYes();
			}).show();
		}
		if(box.settings.noBtnShow){
			box._noBtn.text(i18n.textCommonNoBtn).click(function(){
				box.close();
				box.settings.clickNo();
			}).show();
		}
	};
	
	Box.initPrompt = function(box){
		box._contentElement.find(".app-box-alert-image").hide();
		box._contentElement.find(".app-box-message").css({
			"left": "10px",
			"width": (box.settings.width - 20) + "px",
			"height": "20px",
			"margin-top": "12px"
		});
		box._sureBtn = box._contentElement.find(".app-box-button-btn-sure");
		box._cancelBtn = box._contentElement.find(".app-box-button-btn-cancel");
		var input = $("<div class='app-box-prompt-text'><input type='text'></div>");
		input.appendTo(box._contentElement);
		input.css({
			"width": (box.settings.width - 20) + "px",
		});
		if(box.settings.sureBtnShow){
			box._sureBtn.text(i18n.textCommonOkBtn).click(function(){
				var value = input.find("input").val();
				box.close();
				box.settings.clickSure(value);
			}).show();
		}
		if(box.settings.cancelBtnShow){
			box._cancelBtn.text(i18n.textCommonCancelBtn).click(function(){
				var value = input.find("input").val();
				box.close();
				box.settings.clickCancel(value);
			}).show();
		}
	};
	
	Box.prototype.init = function(){
		//内部属性
		var that = this;
		this.boxElement = $(Box.view);
		this._headElement = this.boxElement.find(".app-box-head");
		this._contentElement = this.boxElement.find(".app-box-content");
		//遮罩
		this._mask = mask.getInstance(that.parent);
		this._mask.show();
		this._contentElement.find(".app-box-message").text(that.message);
		//box
		this.boxElement.css({
			"width": that.settings.width,
			"height": that.settings.height,
			"left": (that.parent.width() - that.settings.width)/2,
			"top": ((that.parent.selector == 'body' ? document.documentElement.clientHeight : 
					(that.parent.height() === 0 ? document.documentElement.clientHeight : that.parent.height()))  - that.settings.height)/2,
			"z-index": mask.getMaskNextZIndex()
		});
		//设置内容
		this._contentElement.css({
			"opacity": that.settings.contentOpacity,
			"height": that.boxElement.height() - that._headElement.height() 
		});
		this.uniqueID = core.generateId("app-box");
		this._contentElement.attr("id", that.uniqueID);
		this.boxElement.appendTo(that.parent);
		//设置标题
		this._headElement.find(".app-box-head-title").text(that.title);
		this._headElement.css({"opacity": that.settings.headOpacity});
		//关闭操作
		this._headElement.find(".app-box-head-button-btn-close").click(function(){
			that.close();
		}).attr("title", i18n.textCommonPanalCloseBtn);
		//如果消息内容过多，重新设置面板高度
		var messageHeight = this._contentElement.find(".app-box-message").height();
		if(messageHeight > 40){
			that.settings.height = that.settings.height - 40 + messageHeight;
		}
		that.resize();
		if(this.type === "alert"){
			Box.initAlert(this);
		}else if(this.type === "prompt"){
			Box.initPrompt(this);
		}else if(this.type === "confirm"){
			Box.initConfirm(this);
		}
	};

	Box.prototype.resize = function(width, height){
		var that = this;
		that.boxElement.css({
			"width": width || that.settings.width,
			"height": height || that.settings.height
		});
		that._contentElement.css({
			"height": that.boxElement.height() - that._headElement.height() + 1
		});
	};
	
	/**
	 * 点击sure 或 yes 按钮
	 */
	Box.prototype.clickSureOrYes = function(){
		if(this._sureBtn){
			this._sureBtn.click();
		}
		if(this._yesBtn){
			this._yesBtn.click();
		}
	};
	
	Box.prototype.close = function(){
		this._mask.remove();
		this.boxElement.remove();
	};
	
	Box.defaultSettings = {
		width: 320,
		height: 150,
		sureBtnShow: true,
		cancelBtnShow: true,
		yesBtnShow: true,
		noBtnShow: true,
		contentOpacity: 0.7,  //内容透明度
		headOpacity: 1,       //标题透明度
		clickSure: function(){},
		clickCancel: function(){},
		clickYes: function(){},
		clickNo: function(){}
	};
	
	Box.view = [
  		"<div class='app-box'>",
  		"<div class='app-box-head app-box-head-spe'>",
  			"<span class='app-box-head-title'></span>",
  			"<div class='app-box-head-button'>",
  			    "<svg width='16' height='22' version='1.1' xmlns='http://www.w3.org/2000/svg' class='app-box-head-button-btn app-box-head-button-btn-close'>",
  			        "<circle cx='8' cy='10' r='6' stroke='#FFFFFF' stroke-width='1' fill='red'/>",
  			        "<line x1='6' y1='8' x2='10' y2='12'  style='stroke:white;stroke-width:2'/>",
  			        "<line x1='10' y1='8' x2='6' y2='12'  style='stroke:white;stroke-width:2'/>",
  			    "</svg>",
  			"</div>",
  		"</div>",
  		"<div class='app-box-content app-box-content-spe' id=''>",
	  		"<div class='app-box-alert-image'>",
		  		"<svg width='100%' height='100%' version='1.1' xmlns='http://www.w3.org/2000/svg'>",
		  			"<polygon points='14,80 66,80 73,68 45,22 35,22 7,68' fill='#F7CD7C'/>",
		  			"<circle cx='40' cy='26' r='6' fill='#F7CD7C'/>",
		  			"<circle cx='12' cy='73' r='7' fill='#F7CD7C'/>",
		  			"<circle cx='68' cy='73' r='7' fill='#F7CD7C'/>",
		  			"<circle cx='40' cy='68' r='4' fill='black'/>",
		  			"<circle cx='40' cy='38' r='4' fill='black'/>",
		  			"<circle cx='40' cy='54' r='4' fill='black'/>",
		  			"<polygon points='36,38 44,38 44,54 36,54' fill='#black'/>",
			    "</svg>",
	  		"</div>",
	  		"<div class='app-box-message'></div>",
	  		"<div class='app-box-button'>",
	  			"<div class='app-button app-button-middle app-box-button-btn-cancel'></div>",
	  			"<div class='app-button app-button-middle app-box-button-btn-sure'></div>",
	  			"<div class='app-button app-button-middle app-box-button-btn-no'></div>",
	  			"<div class='app-button app-button-middle app-box-button-btn-yes'></div>",
	  		"</div>",
  		"</div>",
  		"</div>"     
  	].join("");
	
	BoxUtils = {
		alert: function(message, title, settings, parent){
			var box = new Box("alert", message, title, settings, parent);
			box.init();
			return box;
		},
		confirm: function(message, title, settings, parent){
			var box = new Box("confirm", message, title, settings, parent);
			box.init();
			return box;
		},
		prompt: function(message, title, settings, parent){
			var box = new Box("prompt", message, title, settings, parent);
			box.init();
			return box;
		}
	}
	
	return BoxUtils;
});