define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal"],
		function ($, app, composition, ko, common, http, panal) {
		var HomePage = {
			init: function() {
				var that = this;
				composition.addBindingHandler("pageContainerInitHandler", {
					init: function(dom) {
						that.renderUI();
						that.bindUI();
					},
					update: function() {}
				});
			},
			renderUI: function() {
			},
			bindUI: function() {
				
			},
			
		};

		var modal = {
			clickGSItem: $.proxy(HomePage.clickGSItem, HomePage),
			clickSHJItem: $.proxy(HomePage.clickSHJItem, HomePage)
		};

        HomePage.init();
		return modal;
	});