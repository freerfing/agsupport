define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts"],
	function ($, app, composition, ko, common, http, panal, pager, echarts) {
		var curPanal;
		var Typhoontrack = {
			init: function() {
				var that = this;
				composition.addBindingHandler("typhoontrackInitHandler", {
					init: function(dom) {
						that.renderUI();
						that.bindUI();
						panalObj = panal.getPanalByElement(dom);
			            panalObj.settings.onClose = function () {
			                $(".nr_sd>a[name='" + panalObj.param.id + "']").removeClass("hover");
			            }
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
		Typhoontrack.init();
		return modal;
	});