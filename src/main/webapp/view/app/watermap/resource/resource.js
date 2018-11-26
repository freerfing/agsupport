define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts"],
			function ($, app, composition, ko, common, http, panal, pager, echarts) {
		var isMapLocClick = false;//定位图标点击状态
		var isListItemClick = false;//列表项点击状态
		var prevGraphic;//被点击的定位图标对应的graphic
		var graphicsLayerPoint;//地图定位点图层
		var infoWindowHideHandler;
		var infoListMap = {}; //房屋编码和人员信息键值对
		var Resource = {
			init: function() {
				var that = this;
				composition.addBindingHandler("resourceInitHandler", {
					init: function(dom) {
						that.renderUI();
						that.bindUI();
					},
					update: function() {}
				});
			},
			renderUI: function() {
				var that = this;
			},
			bindUI: function() {
                var that = this;
			}
		}

		var modal = {
		};
		Resource.init();
		return modal;
	});