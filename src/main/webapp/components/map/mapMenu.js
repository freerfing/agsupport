define(["durandal/app", "durandal/composition", "knockout", "utils", "jquery", "components/map/index"], function (app, composition, ko, utils, $, parent) {
	var map;
	var modal = {
		mapSubMenus: ko.observableArray([]),// 如监测监控中的气象信息、水质信息等
		toggleSubMenu: function(subMenu) {
			subMenu.hiddenItems(!subMenu.hiddenItems());
			return false;
		},
		clickSubMenuItem: function(selectedSubMenuItem) {
			// TODO 点击子菜单ITEM项处理
		},
	};

	composition.addBindingHandler("mapSubMenuInitHandler", {
		init: function(dom) {
			this.initMapSubMenus();// 初始化地图二级菜单和对应的子列表数据
		},
		initMapSubMenus: function() {
			var currentMapMenu = parent.currentMapMenu(), currentSubMenus, mapSubMenus = [], index, mapSubMenu;
			if(currentMapMenu.children && currentMapMenu.children.length > 0) {
				currentSubMenus = currentMapMenu.children;
				for(index=0; index<currentSubMenus.length; index++) {
					mapSubMenu = currentSubMenus[index];
					mapSubMenus.push({
						id: mapSubMenu.id,
						name: mapSubMenu.name,
						hiddenItems: ko.observable(false),// 默认全部隐藏
						subMenuItems: ko.observableArray(mapSubMenu.children || [])
					});
				}
			}
			modal.mapSubMenus(mapSubMenus);
		},

	});


	return modal;
});