define(["jquery", "durandal/app", "durandal/composition", "knockout","pager"],
	function ($, app, composition, ko, pager) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("smsInitHandler", {
					init: function(dom) {
						that.resetModal();
						that.renderUI();
						that.bindUI();
					},

					update: function() {}
				});
			},

			renderUI: function() {
				var that = this;

				app.setRoot("view/desktop/smsSender", null, "smsTabCon-container", {});
			},

			bindUI: function() {
				var that = this;
			},

			resetModal: function() {
				modal.selectMenuIndex(0);
			}
		};

		// 菜单数据
		var menuList = [{
			name : "短信发送",
			index : 0
		}, {
			name : "短信管理",
			index : 1
		}];

		var modal = {
			menus: ko.observableArray(menuList),
			selectMenuIndex: ko.observable(0),
			clickMenu: function(menu) {
				modal.selectMenuIndex(menu.index);

				if(menu.index === 0) {// 短信发送模块
					app.setRoot("view/desktop/smsSender", null, "smsTabCon-container", {});
				}
				else if(menu.index === 1) {// 短信管理模块
					app.setRoot("view/desktop/smsList", null, "smsTabCon-container", {});
				}
			}
		};

		info.init();

		return modal;
	}
);