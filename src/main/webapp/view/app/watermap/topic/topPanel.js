/**
 * Created by czz on 2017-08-11.
 * 查询面板
 *
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts", "box"],
	function ($, app, composition, ko, common, http, panal, pager, echarts, box) {
		
		var parentPage;

		var info = {

			init: function() {
				var that = this;
				composition.addBindingHandler("topPanelInitHandler", {
					init: function(dom) {

						that.renderUI();
						that.bindUI();

					},
					update: function() {


					}
				});
			},
			renderUI: function() {
				
				var that = this;
				var url = "data/topic/topic.json";
                if ($("#userName").text() == '普通用户') {
                    url = "data/topic/topic1.json";
                }
				var getMenuService=http.getInstance(url)
				getMenuService.ajax().then(function(data){
					modal.topicList(data.topic);
				});

				var height = Math.ceil($("#desktop-map").height() * 0.98) - $("#chooseTab").height() - 120;
				modal.height(height);

			},
			bindUI: function() {
				var that = this;
			},
			showPanel: function(panelId){

				var height = Math.ceil($("#desktop-map").height() * 0.98) - $("#chooseTab").height() - 120;
				modal.height(height);

				$(".rPanel").hide();
				$("#" + panelId).toggle();

			}

		}


		var modal = 
		{

			topicList : ko.observableArray(),
			height : ko.observable(),
			showPanel :$.proxy(info.showPanel, info)
		};

		info.init();
		return modal;
	});