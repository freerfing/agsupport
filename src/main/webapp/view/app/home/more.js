define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal"],
			function ($, app, composition, ko, common, http, panal) {
		var HomePage = {
			init: function() {
				var that = this;
				composition.addBindingHandler("morePageInitHandler", {
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
			clickSFItem: function () {
				$("#com_cm02").show();
				$("#ps").hide();
				$("#gs").hide();
	            $("#shj").hide();
			},
			clickPSItem: function () {
				$("#com_cm02").hide();
				$("#ps").show();
				$("#gs").hide();
	            $("#shj").hide();
			},
			clickGSItem: function () {
				$("#com_cm02").hide();
				$("#ps").hide();
				$("#gs").show();
	            $("#shj").hide();
			},
			clickSHJItem: function () {
				$("#com_cm02").hide();
				$("#ps").hide();
				$("#gs").hide();
	            $("#shj").show();
			}
		};

		var modal = {
			clickSFItem: $.proxy(HomePage.clickSFItem, HomePage),
			clickPSItem: $.proxy(HomePage.clickPSItem, HomePage),
			clickGSItem: $.proxy(HomePage.clickGSItem, HomePage),
			clickSHJItem: $.proxy(HomePage.clickSHJItem, HomePage)
		};

        HomePage.init();
		return modal;
	});