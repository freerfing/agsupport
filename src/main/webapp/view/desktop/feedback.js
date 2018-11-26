define(["jquery", "durandal/app", "durandal/composition", "knockout", "layer", "pager", "ajaxupload"],
	function ($, app, composition, ko, layer, pager) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("feedbackInitHandler", {
					init: function(dom) {
						that.renderUI();
						that.bindUI();
						that.loadModule();
					},

					update: function() {}
				});
			},

			renderUI: function() {
				var that = this;
			},

			bindUI: function() {
				var that = this;
			},

			loadModule: function() {
				app.setRoot("view/desktop/feedbackList", null, "feedback-content", {});
			}
		};

		var modal = {
		};

		info.init();

		return modal;
	}
);