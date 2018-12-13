define(["durandal/app", "durandal/composition", "knockout", "utils", "jquery"], function (app, composition, ko, utils, $) {
	var modal = {
		loginUser: ko.observable({}),
		menus: ko.observableArray([]),
		settings: ko.observable({}),
		menuClick: function(rootMenu) {
			if(rootMenu.id === awater.currentMenu.id) {
				// 点击了已选中菜单，无需处理
				return;
			}

			var menu;
			for(var index in modal.menus()) {
				menu = modal.menus()[index];
				menu.visible(menu.id === rootMenu.id);
				if(menu.id === rootMenu.id) {
					// 重新赋值currentMenu对象
					awater.currentMenu = menu;
					isInit = menu.isInit;
					url = menu.url;
				}
			}

			if(!awater.currentMenu.isInit) {
				if(url.indexOf('components') === 0) {
					awater.currentMenu.isInit = true;
					app.setRoot(awater.currentMenu.url, null, awater.currentMenu.id);
				} else {
					$('<iframe width="100%" height="100%" id="iframe_' + awater.currentMenu.id
						+ '" style="position: absolute; z-index: 4;"  frameborder="no" marginheight="0" marginwidth="0" allowTransparency="true"></iframe>').prependTo("#" + awater.currentMenu.id);
					$("#iframe_" + awater.currentMenu.id).attr("src", awater.currentMenu.url);
				}
			}


		},
		clickUserNameBtn: function() {
			alert('1111');
			// TODO 待完善
		},
		clickSmsBtn: function() {
			alert('1111');
			// TODO 待完善
		},
		clickQuitBtn: function() {
			alert('1111');
			// TODO 待完善
		}
	};

	composition.addBindingHandler("initDesktopHander", {
		init: function(dom) {
			this.getLoginUserEnvs();
		},
		getLoginUserEnvs: function() {
			utils.sendPost(awater.loginUserSettingsUrl, {}, function(data) {
				var index, menus = $.extend(true, [], data.content.menus);
				if(data.code === "200") {
					modal.loginUser(data.content.loginUser);
					// 初始化菜单配置
					for(index=0; index<menus.length; index++) {
						menus[index].visible = ko.observable(index === 0);
						if(index === 0) {
							awater.currentMenu = menus[index];
						}
					}
					modal.menus(menus);
					modal.settings(data.content.settings);
				}
			});
		},
	});


	return modal;
});