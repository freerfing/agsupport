define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts"],
	function ($, app, composition, ko, common, http, panal, pager, echarts) {
		var curPanal;
		var Creekvideo = {
			init: function() {
				var that = this;
				composition.addBindingHandler("creekvideoInitHandler", {
					init: function(dom) {
						that.renderUI();
						that.bindUI();
						$(dom).click(function() {
							// if(desktopMapClickHandler){
							// 	desktopMapClickHandler.remove();
							// }
						});
					},
					update: function() {}
				});
			},
			renderUI: function() {
				var that = this;
				// var getMenuService=http.getInstance("data/topic/topic.json")
				// getMenuService.ajax().then(function(data){
				// });
			},
			bindUI: function() {
				var that = this;
			}
		}

		var modal = {
		};
		Creekvideo.init();
		return modal;
	});