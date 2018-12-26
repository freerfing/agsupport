define(["durandal/app", "durandal/composition", "knockout", "utils", "jquery", "components/map/index", "layui"], function (app, composition, ko, utils, $, parent) {
	var modal = {
		mapSubMenus: ko.observableArray([]),// 如监测监控中的气象信息、水质信息等
		toggleSubMenu: function(subMenu) {
			subMenu.hiddenItems(!subMenu.hiddenItems());
			return false;
		},
		clickSubMenuItem: function(selectedSubMenuItem) {
			var layer;
			if(selectedSubMenuItem.isSelected()) {
				// 取消选择
				selectedSubMenuItem.isSelected(false);
				layer = map.getLayer(selectedSubMenuItem.id);
				if(layer) {
					map.removeLayer(layer);
				}
			} else {
				// 点击选中
				selectedSubMenuItem.isSelected(true);
				utils.sendPost('http://127.0.0.1/awater/map/submenu/listItemInfo', { submenuItemId: selectedSubMenuItem.id }, function(data) {
					if(data.code === "200") {
						if(data.content[0].type === '1') {
							require(["esri/layers/FeatureLayer"], function(FeatureLayer) {
								layer = new FeatureLayer(data.content[0].mapUrl + '/0', { id : selectedSubMenuItem.id });
								map.addLayer(layer);
							});
						} else {
							layui.use(['layer'], function(layer) {
								layer.open({
									title: selectedSubMenuItem.name,
									type: 2,
									content: selectedSubMenuItem.url,
									area: ['1040px', "500px"],
									end: function() {
										selectedSubMenuItem.isSelected(false);
									}
								});
							});
						}
					}
				});
			}

			return false;
		},
	};

	composition.addBindingHandler("mapSubMenuInitHandler", {
		init: function(dom) {
			this.initMapSubMenus();// 初始化地图二级菜单和对应的子列表数据
		},
		initMapSubMenus: function() {
			modal.mapSubMenus(parent.currentMapMenu().children);
		},

	});


	return modal;
});