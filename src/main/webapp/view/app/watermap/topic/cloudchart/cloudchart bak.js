define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts"],
	function ($, app, composition, ko, common, http, panal, pager, echarts) {
		var curPanal;
		var Cloudchart = {
			init: function() {
				var that = this;
				composition.addBindingHandler("cloudchartInitHandler", {
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

		
		Cloudchart.init();
		return modal;
	});