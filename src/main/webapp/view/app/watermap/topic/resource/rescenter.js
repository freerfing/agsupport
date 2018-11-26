/**
 * Created by czz on 2017-08-11.
 * 资源中心
 *
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "layer", "http", "panal","pager"],
	function ($, app, composition, ko, common, layer, http, panal, pager) {
		var tabConModule;

		var info = {
			init: function () {
				var that = this;
				composition.addBindingHandler("rescenterInitHandler", {
					init: function (dom) {
						that.getTabs();
						that.initCart();
						that.renderUI();
						that.bindUI();
					},
					update: function () {
					}
				});
			},
			renderUI: function () {
				var that = this;
			},
			bindUI: function () {
				var that = this;
			},
			getTabs: function () {
				var that = this;

				$.ajax({
					type: 'post',
					url: agsupportUrl + "/agsupport/menu/getMenuByPidAndLoginName/" + modal._$_param["menu"].id + "/" + loginName,
					dataType: 'json',
					success: function (data) {
						if (data.success && data.content) {
							modal.menus(data.content);

							// 触发tab项点击操作
							if (modal.menus().length > 0) {
								that.menuClick(modal.menus()[0]);
							}
						}
					}
				});
			},
			initCart: function () {
				$.ajax({
					url: agsupportUrl + "/resources/cart/list",
					type: "post",
					dataType: "json",
					data: {
						loginName: loginName
					},
					success: function (data) {
						// 事先移除所有数据
						modal.applyLines.removeAll();

						if (data.success) {
							if (!data.content) {// 处理这种太恶心
								return;
							}

							for (var i = 0; i < data.content.length; i++) {
								modal.applyLines.push(data.content[i]);
							}
						} else {
							layer.msg(data.message, {time: 2000});
						}
					},
					error: function () {
						if (window.console) {
							console.error("获取购物车列表数据出错");
						} else {
							layer.msg("获取购物车列表数据出错", {time: 2000});
						}

					}
				});
			},
			menuClick: function (menu) {
				var url = menu.url, seq = menu.url.indexOf('?index='), index = -1;
				if (seq != -1) {
					url = menu.url.substring(0, seq);
					index = menu.url.substring(seq + '?index='.length);
					// 更新选中菜单序号
					modal.selectedTabIndex(index);
					app.setRoot(url, null, "tabCon-container", {"tabIndex": index, "rescenterModule": info});
				} else {
					layer.alert('运维管理服务资源菜单配置有误', {icon: 2});
				}
			},
			// 将TAB内容块对象赋值回来，申请购物车申请后调用刷新TAB中的主内容块
			setTabConModule: function (childModule) {
				tabConModule = childModule;
			},
			// 提供给外部模块调用，添加至申请购物车中
			addToApplyCart: function (item) {
				if (!item || !item.resId || !item.resName || !item.resType) {
					if (window.console) {
						console.error('服务资源数据内容有误');
					}
					return;
				}

				$.ajax({
					url: "/agsupport/resources/cart/save",
					type: "post",
					dataType: "json",
					data: item,
					success: function (result) {
						if (result.success) {
							layer.msg('添加成功', {time: 2000});
							modal.applyLines.push(result.content);
						} else {
							layer.msg(result.message, {time: 2000});
						}
					},
					error: function () {
						layer.alert('请求出错，请刷新浏览器试试', {icon: 2});
					}
				});
			},
			// 主要给申请购物车申请调用刷新界面
			initData: function () {
				var that = this;
				that.initCart();
				if (tabConModule) {
					tabConModule.refreshResCon();
				}
			}
		};

		var modal = {
			// 菜单模块
			menus: ko.observableArray(),
			selectedTabIndex: ko.observable(1),
			menuClick: $.proxy(info.menuClick, info),

			// 申请购物车模块
			applyLines: ko.observableArray([]),
			removeApplyLine: function(applyLine) {
				$.ajax({
					url: agsupportUrl + "/resources/cart/del",
					type: "post",
					dataType: "json",
					data: { id: applyLine.id },
					success: function (data) {
						if(data.success) {
							modal.applyLines.remove(applyLine);
						} else {
							layer.msg(data.message, { time : 2000 });
						}

					},
					error: function () {
						if(window.console) {
							console.error('删除服务资源申请数据出错');
						}
					}
				});
			},
			enableDetails: function() {
				$('.dorpdown').addClass('hover');
			},
		 	disableDetails: function() {
				$('.dorpdown').removeClass('hover');
			},
			showApplyDialog: function() {
				var resIds = '',
					resTypes = '',
					resNames = '',
					title = '',
					top = 90,
					lines = modal.applyLines(),
					left = (window.screen.width - 736) / 2; //获得窗口的水平位置;

				if(lines.length <= 0) {
					return;
				}

				var isForbiddenUpdateTitle = false;
				for(var i=0; i<lines.length; i++) {
					// 处理服务名称过长
					if(!isForbiddenUpdateTitle && title.length > 25) {
						title += "等 服务申请";
						isForbiddenUpdateTitle = true;
					}

					if(i != 0) {
						resIds += ",";
						resTypes += ",";
						resNames += "、";
						if(!isForbiddenUpdateTitle) {
							title += "、";
						}
					}

					resIds += lines[i].resId;
					resTypes += lines[i].resType;
					resNames += lines[i].resName;
					if(!isForbiddenUpdateTitle) {
						title += lines[i].resName;
					}

				}

				if(!isForbiddenUpdateTitle) {
					title += " 服务申请";
				}

				common.openDialogPanal("view/app/watermap/topic/resource/applyform2", title, {
					resIds: resIds,
					resTypes: resTypes,
					resNames: resNames,
					tabIndex: modal.selectedTabIndex(),
					parentPage: info
				}, 736, 560, top, left);

				return false;
			}
		};

		info.init();

		return modal;
	});