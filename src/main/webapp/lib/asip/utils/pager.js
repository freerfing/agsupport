define(["jquery", "i18nCommon"], function($, i18n){
	var Pager;
	
	Pager = function(settings){
		if(!settings.after && !settings.before && !settings.parent && !settings.replace){
			alert(i18n.textCommonParamError);
		}
		this.settings = $.extend({}, Pager.defaultSettings, settings);
	};
	
	Pager.defaultSettings = {
		after: null,
		before: null,
		parent: null,
		replace: null,
		pageInfo: null,
		changeHandler: function(data){}
	};
	
	Pager.prototype.init = function(){
		var that = this;
		this._pageElement = $(Pager.view);
		if(this.settings.after){
			this.settings.after.before(this._pageElement);
		}else if(this.settings.before){
			this.settings.before.after(this._pageElement);
		}else if(this.settings.parent){
			this.settings.parent.append(this._pageElement);
		}else if(this.settings.replace){
			this._pageElement.replaceAll(this.settings.replace);
		}
		this._pageElement.find(".app-pager-first").text(i18n.textCommonPagerFirst);
		this._pageElement.find(".app-pager-last").text(i18n.textCommonPagerLast);
		this._pageElement.find(".app-pager-previous").text("<");
		this._pageElement.find(".app-pager-next").text(">");
		this._pageElement.find(".app-pager-go").text(i18n.textCommonPagerJump);
		this._pageElement.find(".app-pager-link").click($.proxy(that._linkHandler, that));
	};
	
	Pager.prototype._linkHandler = function(e){
		var node = $(e.currentTarget);
		if(node.hasClass("app-pager-disabled") || node.hasClass("app-pager-nextpre-disabled")) return;
		if(node.hasClass("app-pager-first")) {
			this._firstPage();
		} else if(node.hasClass("app-pager-next")) {
			this._nextPage();
		} else if(node.hasClass("app-pager-previous")) {
			this._prevPage();
		} else if(node.hasClass("app-pager-last")) {
			this._lastPage();
		} else if(node.hasClass("app-pager-go")) {
			var page = this._pageElement.find("input").val();
			if(parseInt(page, 10)) {
				this.gotoPage(parseInt(page, 10));
			} else {
				this._pageElement.find("input").val(this.pageInfo.currentPage);
			}
		}
		this.settings.changeHandler(this._pageInfo);
	};


	Pager.prototype.close = function(){
		this._pageElement.remove();
	};
	
	Pager.prototype._firstPage = function() {
		this.gotoPage(1);
	};

	Pager.prototype._lastPage = function() {
		this.gotoPage(this._pageInfo.totalPage);
	};

	Pager.prototype._nextPage = function() {
		this.gotoPage(this._pageInfo.currentPage+1);
	};

	Pager.prototype._prevPage = function() {
		this.gotoPage(this._pageInfo.currentPage-1);
	};

	Pager.prototype.gotoPage = function(page) {
		if(page < 1) page = 1;
		if(page > this._pageInfo.totalPage) page = this._pageInfo.totalPage;
		this._pageInfo.currentPage = page;
	};
	
	Pager.prototype.setPageInfo = function(pageInfo){
		this._pageInfo = pageInfo;
		if(pageInfo.totalPage === 0) {
			this._pageElement.hide();
		} else {
			this._pageElement.show();
			this._pageElement.find("input").removeAttr("disabled");
			this._pageElement.children().removeClass("app-pager-disabled");
			this._pageElement.find(".app-pager-previous").removeClass('app-pager-nextpre-disabled')
					.addClass("app-pager-nextpre-background");
			this._pageElement.find(".app-pager-next").removeClass('app-pager-nextpre-disabled')
					.addClass("app-pager-nextpre-background");
			if(pageInfo.currentPage == 1) {
				this._pageElement.find(".app-pager-first").addClass("app-pager-disabled");
				this._pageElement.find(".app-pager-previous").removeClass('app-pager-nextpre-background')
					.addClass("app-pager-nextpre-disabled");
			}
			if(pageInfo.currentPage == pageInfo.totalPage) {
				this._pageElement.find(".app-pager-last").addClass("app-pager-disabled");
				this._pageElement.find(".app-pager-next").removeClass('app-pager-nextpre-background')
					.addClass("app-pager-nextpre-disabled");
			}
		}
		this._pageElement.find("input").val(pageInfo.currentPage);
		this._pageElement.find(".app-pager-msg").text(Pager.message.replace("x", pageInfo.currentPage).
				replace("y", pageInfo.totalPage).replace("c", pageInfo.currentRecord).
				replace("d", pageInfo.totalRecord));
	};
	
	Pager.view = [
	    "<div class='app-pager'>",
		    "<div class='app-pager-first app-pager-link'></div>",
		    "<div class='app-pager-previous app-pager-nextpre-background app-pager-link'></div>",
		    "<div class='app-pager-next app-pager-nextpre-background app-pager-link'></div>",
		    "<div class='app-pager-last app-pager-link'></div>",
		    "<div class='app-pager-jump'><input type='text'></div>",
		    "<div class='app-pager-go app-pager-link app-pager-go-spe'></div>",
		    "<div class='app-pager-msg'></div>",
	    "</div>"
	].join("");
	
	Pager.message = "x/y 本页c条,总数d条";
	
	/**
	 * 用法：
	 * var p = pager.getInstance({
			parent: $("#misTestPager")
			changeHandler: function(pageInfo){
			}
	   });
	   p.setPageInfo(pageInfo);
	 */
	return {
		getInstance: function(settings){
			var p = new Pager(settings);
			p.init();
			return p;
		}
	}
});