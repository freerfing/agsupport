define(function(){
	var Tip, TipUtils;
	
	Tip = function(type, msg, settings){
		this.type = type;
		this.msg = msg;
		this.settings = $.extend({}, Tip.defaultSettings, settings);
	};
	
	Tip.defaultSettings = {
		parent: $("body"),
		left: null,
		top: null,
		bottom: null,
		right: null,
		autoClosed: false,
		timeDuration: 3
	};
	
	Tip.prototype.init = function(){
		var that = this;
		if(that.settings.parent.find(".app-tip").length == 0) {
			that.settings.parent.append(Tip.view);
		}
		if(that.settings.top != null){
			that.settings.parent.find(".app-tip").css({
				"top": that.settings.top
			});
		}else{
			that.settings.parent.find(".app-tip").css({
				"bottom": that.settings.bottom,
				"top": ""
			});
		}
		if(that.settings.left != null){
			that.settings.parent.find(".app-tip").css("left", that.settings.left);
		}else{
			that.settings.parent.find(".app-tip").css({
				"right": that.settings.right,
				"left": ""
			});
		}
		var tipDiv = that.settings.parent.find(".app-tip");
		tipDiv.find(".app-tip-content").removeClass("loading").removeClass("success").removeClass("error").addClass(that.type);
		tipDiv.find(".app-tip-text").text(that.msg);
		tipDiv.css("display", "");
		if(that.settings.autoClosed) {
			setTimeout(function(){
				TipUtils.closeTip(that.settings.parent);
			}, that.settings.timeDuration * 1000);
		}
	};
	
	Tip.view =[
		"<div class='app-tip' style='display:none'>",
			"<div class='app-tip-content'>",
				"<div class='app-tip-icon'></div>",
				"<div class='app-tip-text app-tip-text-spe'></div>",
			"</div>",
		"</div>"
	].join("");
	
	TipUtils = {
			//type: loading, error, success
			showTip: function(type, msg, settings){
				var tip = new Tip(type, msg, settings);
				tip.init();
				return tip;
			},
			
			showError: function(msg, top, left, parent, bottom, right){
				this.showTip("error", msg, {
					parent: parent, 
					left: left, 
					top: top, 
					bottom: bottom,
					right: right,
					autoClosed: false, 
					timeDuration: null
				});
			},

			showSuccess: function(msg, top, left, parent, bottom, right){
				this.showTip("success", msg, {
					parent: parent, 
					left: left, 
					top: top, 
					bottom: bottom,
					right: right,
					autoClosed: true, 
					timeDuration: 3
				});
			},

			showLoading: function(msg, top, left, parent, bottom, right){
				this.showTip("loading", msg, {
					parent: parent, 
					left: left, 
					top: top, 
					bottom: bottom,
					right: right,
					autoClosed: false, 
					timeDuration: null
				});
			},
			
			closeTip: function(parent){
				parent = parent || $("body");
				var tipDiv = parent.find(".app-tip");
				if(tipDiv.length > 0) {
					tipDiv.css("display", "none");
				}
			}
	};
	return TipUtils;
});