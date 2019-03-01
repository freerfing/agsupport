define(["durandal/app", "durandal/composition", "knockout", "utils", "jquery"], function (app, composition, ko, utils, $) {
	var modal = {
		mapMenus: ko.observableArray([]),// 如监测监控、工程设施、专题图层、四标四实
		currentMapMenu: ko.observable({}),// 当前地图菜单对象信息
		mapSubMenuDisplayMode: ko.observable('hover'),// 地图子菜单显示模式通过悬浮触发，可以设置成'click'点击触发
		sidebarClick: function() {
			// TODO 隐藏整个地图左侧菜单
		},
		menuClick: function(selectedMapMenu) {
			var mapMenu, index;
			if(modal.mapSubMenuDisplayMode() === 'click') {
				for(index in modal.mapMenus()) {
					mapMenu = modal.mapMenus()[index];
					mapMenu.visible(mapMenu.id === selectedMapMenu.id);
					mapMenu.hoverable(mapMenu.id === selectedMapMenu.id);
					if(mapMenu.id === selectedMapMenu.id) {
						// 重新赋值currentMapMenu对象
						modal.currentMapMenu(mapMenu);
					}
				}

				app.setRoot("components/map/mapMenu", null, selectedMapMenu.id);
			}
		},
		hoverMapMenu: function(selectedMapMenu) {
			var index, mapMenus = modal.mapMenus();
			for(index=0; index<modal.mapMenus().length; index++) {
				if(modal.mapSubMenuDisplayMode() === 'click') {
					if(mapMenus[index].id === selectedMapMenu.id) {
						mapMenus[index].hoverable(true);
					} else {
						mapMenus[index].hoverable(mapMenus[index].visible());
					}
				} else {
					if(mapMenus[index].id === selectedMapMenu.id) {
						mapMenus[index].hoverable(true);
						mapMenus[index].visible(true);
						modal.currentMapMenu(mapMenus[index]);
						app.setRoot("components/map/mapMenu", null, selectedMapMenu.id);
					} else {
						mapMenus[index].hoverable(false);
						mapMenus[index].visible(false);
					}
				}
			}
		},
		leaveMapMenu: function(selectedMapMenu) {
			if(selectedMapMenu.id === modal.currentMapMenu().id) {
				return;
			}
			selectedMapMenu.visible(false);
		},
		hoverMapMenuPanel: function() {
			if(modal.mapSubMenuDisplayMode() === 'hover') {
				modal.currentMapMenu().hoverable(true);
				modal.currentMapMenu().visible(true);
			}
		},
		leaveMapMenuPanel: function() {
			if(modal.mapSubMenuDisplayMode() === 'hover') {
				modal.currentMapMenu().hoverable(false);
				modal.currentMapMenu().visible(false);
				modal.currentMapMenu({});
			}
		}
	};

	composition.addBindingHandler("initMapHandler", {
		init: function(dom) {
			this.initMapMenus();// 初始化地图菜单列表数据
			this.loadBaseMap();// 初始化基础图层服务
		},
		// 初始化菜单配置
		initMapMenus: function() {
			var index, mapMenus = $.extend(true, [], awater.currentMenu.children), mapMenu;
			modal.mapSubMenuDisplayMode(awater.settings.mapSubMenuDisplayMode);
			for(index=0; index<mapMenus.length; index++) {
				mapMenu = mapMenus[index];
				this.initSubmenus(mapMenu);
				mapMenu.hoverable = ko.observable(false);
				mapMenu.visible = ko.observable(false);

				if(modal.mapSubMenuDisplayMode() === 'click' && index === 0) {
					// 如果通过点击方式，默认加载第一项子菜单项数据
					mapMenu.hoverable(true);
					mapMenu.visible(true);
					modal.currentMapMenu(mapMenu);
				}
			}
			modal.mapMenus(mapMenus);
			if(modal.mapSubMenuDisplayMode() === 'click') {
				app.setRoot("components/map/mapMenu", null, modal.currentMapMenu().id);
			}
		},
		initSubmenus: function(mapMenu) {
			// 初始化地图子菜单和子菜单项
			var subIndex, submenu;
			if(mapMenu.children && mapMenu.children.length > 0) {
				for(subIndex=0; subIndex<mapMenu.children.length; subIndex++) {
					submenu = mapMenu.children[subIndex];
					this.initSubmenuItems(submenu);
					submenu.hiddenItems = ko.observable(false);// 默认隐藏
					submenu.subMenuItems = ko.observableArray(submenu.children || []);
				}
			}
		},
		initSubmenuItems: function(submenu) {
			var itemIndex;
			if(submenu.children) {
				for(itemIndex=0; itemIndex<submenu.children.length; itemIndex++) {
					submenu.children[itemIndex].isSelected = ko.observable(false);
				}
			}
		},
		loadBaseMap: function() {
			require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/ArcGISDynamicMapServiceLayer", "dojo/domReady!"], function(Map, ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer) {
				map = new Map("map-wrapper");

				map.on("load", function () {
					$('#map-wrapper_zoom_slider').get(0).style.visibility = "collapse";
				});

				var baseLayer = new ArcGISTiledMapServiceLayer(awater.settings.baseMap, {
					"opacity" : 1
				});

				/*
				var outsideBaseLayer = new ArcGISDynamicMapServiceLayer('', {
					"opacity" : 1
				});
				*/

				map.addLayer(baseLayer);
			});
		},


	});


	return modal;
});