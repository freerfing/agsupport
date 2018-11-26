define(["jquery", "core"], function($, core) {
	var TipTool;
	// content为默认显示的内容
	TipTool = function(delegate, content, settings) {
		this.settings = $.extend({}, TipTool.defaultSettings, settings);
		this.defContent = content || "";
		this.content = content || "";
		this.delegate = delegate;

		// 默认事件方法
		this._showFn = $.proxy(TipTool._showTip, this);
		this._hideFn = $.proxy(TipTool._hideTip, this);

	}

	TipTool._setCurrentTarget = function(e, context) {
		var target = e.target;
		var title = "";
		if (target && context.content != '') {
			context._currentTarget.target = $(target);
			title = context._currentTarget.target.attr("title");
			context._currentTarget.title = title;
			context._currentTarget.target.attr("title", "");
		}
	}

	TipTool._clearCurrentTarget = function(context) {
		if (context._currentTarget.target != null) {
			context._currentTarget.target.attr("title", context._currentTarget.title);
		}
		context._currentTarget.target = null;
		context._currentTarget.title = null;
	}

	TipTool._clearTimeout = function(context) {
		if (context.showTimeout)
			clearTimeout(context.showTimeout);
		if (context.hideTimeout)
			clearTimeout(context.hideTimeout);
		if (context.autoHideTimeout)
			clearTimeout(context.autoHideTimeout);
	}

	// 默认mouseover处理方法，设置content
	TipTool._defMouseOver = function(e) {
		this.setContent(this._currentTarget.title);
	}

	TipTool._showTip = function() {

		this._contentEle.html("");

		if (this.content instanceof jQuery) {
			this._contentEle.append(this.content);
		} else if (this.content instanceof Node) {
			this._contentEle.append($(this.content));
		} else {
			this._contentEle.html(this.content);
		}

		if (this._contentEle.html() === "")
			return;

		var offset = this.delegate.offset();

		var delWidth = this.delegate.width();
		var delHeight = this.delegate.height();

		// document size
		this.winWidth = $(document).width();
		this.winHeight = $(document).height();

		// TipTool size
		this.eleWidth = this.rootEle.width();
		this.eleHeight = this.rootEle.height();

		this.posLeft = (delWidth < this.mousePos.X - offset.left + this.eleWidth + this.settings.offsetX) ? (this.mousePos.X - this.eleWidth - this.settings.offsetX) : this.mousePos.X + this.settings.offsetX;
		this.posTop = this.mousePos.Y + this.settings.offsetY;
		this.rootEle.css({
					display	: '',
					top		: this.posTop - offset.top,
					left	: this.posLeft - offset.left
				});
	}

	TipTool._hideTip = function() {
		this.content = this.defContent;
		this.rootEle.css("display", "none");
	}

	TipTool.defaultSettings = {
		showDelay		: 200,// ms
		hideDelay		: 100,
		autoHideDelay	: 30000,
		offsetX			: 15,
		offsetY			: 15
	};

	TipTool.view = ["<div class='app-tiptool' style='display:none'>", "<div class='app-tiptool-content'>", "</div>", "</div>"]
			.join("");

	// 属性方法
	TipTool.prototype = {
		init			: function() {

			var that = this;
			this.rootEle = this.delegate.find(".app-tiptool");

			// 添加TipTool div到delegate中
			if (!this.rootEle || this.rootEle.length === 0) {
				this.rootEle = $(TipTool.view);
				this.delegate.append(this.rootEle);
			}
			this.uniqueID = core.generateId("app-tiptool");
			this._contentEle = this.rootEle.find(".app-tiptool-content");
			this._contentEle.attr("id", this.uniqueID);

			this._currentTarget = {
				target	: null,
				title	: null
			}

			// 鼠标位置
			this.mousePos = {
				X	: 0,
				Y	: 0
			};

			// 页面大小
			this.winWidth = $(document).width();
			this.winHeight = $(document).height();

			// 内容大小
			this.eleWidth = 0;
			this.eleHeight = 0;

			// 事件绑定
			this.delegate.on({
						mouseover	: function(e) {
							if (!that._onMouseOverFn) {
								that._onMouseOverFn = $.proxy(TipTool._defMouseOver, that);
							}
							that._onMouseOverFn(e);
							TipTool._setCurrentTarget(e, that);
							that.showTip();
						},
						mousemove	: function(e) {
							that.mousePos.X = e.pageX;
							that.mousePos.Y = e.pageY;
						},
						mouseout	: function(e) {
							TipTool._clearCurrentTarget(that);
							TipTool._clearTimeout(that);
							that._hideFn();
						}
					});
		},

		setContent		: function(content) {
			this.content = content;
			return this;
		},
		getContent		: function(content) {
			return this.content;
		},
		// 自定义mouseover事件
		triggerEnter	: function(fn) {
			this._onMouseOverFn = $.proxy(fn, this);
			return this;
		},
		// 显示当前设置的TipTool
		showTip			: function() {
			TipTool._clearTimeout(this);
			this.showTimeout = setTimeout(this._showFn, this.settings.showDelay);
			this.autoHideTimeout = setTimeout(this._hideFn, this.settings.autoHideDelay);
			return this;
		},

		// 隐藏TipTool
		hideTip			: function() {
			TipTool._clearTimeout(this);
			this._hideFn();
			return this;
		},

		remove			: function() {
			this.hideTip();
			TipTool._clearCurrentTarget(this);
			this.delegate.unbind("mouseover");
			this.delegate.unbind("mousemove");
			this.delegate.unbind("mouseout");
		}
	}
	return {
		create	: function(ele, content, settings) {
			var tt = new TipTool(ele, content, settings);
			tt.init();
			return tt;
		}
	}
});
