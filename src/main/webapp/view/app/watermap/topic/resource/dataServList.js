define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "layer", "http", "panal","pager"],
	function ($, app, composition, ko, common, layer, http, panal, pager) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("dataServListInitHandler", {
					init: function(dom) {
						that.resetModel();
						that.renderUI();
						that.bindUI();
						that.initData();
					},
					update: function() {}
				});
			},
			renderUI: function() {
				var that = this;
			},
			bindUI: function() {
				var that = this;
				if(modal._$_param["tabConApplyModule"]) {
					modal._$_param["tabConApplyModule"].setResConModule(info);
				}
			},
			resetModel: function() {
				modal.pageNum(modal._$_param["pageNum"] || 1);
				modal.searchText(modal._$_param["searchText"] || '');
				modal.searchStr4Tip("搜索：" + modal.searchText());
				if (!modal.searchText()) {
					modal.searchStr4Tip("");
				}

				var viewType = modal._$_param["viewType"] || 0;
				modal.selectedViewType({
					name: ko.observable(modal.viewTypeItems()[viewType]),
					value: ko.observable(viewType)
				});
				var applyStatus = modal._$_param["applyStatusType"] || 0;
				modal.selectedApplyStatus({
					name: ko.observable(modal.applyStatusItems()[applyStatus]),
					value: ko.observable(applyStatus)
				});
				var sortType = modal._$_param["sortType"] || 0;
				modal.selectedSortType({
					name: ko.observable(modal.sortTypeItems()[sortType]),
					value: ko.observable(sortType)
				});
			},
			initData: function() {
				$.ajax({
					type: 'post',
					url: agsupportUrl + "/awater/dataresources/listResources",
					dataType:'json',
					data: {
						status: 1,
						loginName: loginName,
						searchText: modal.searchText(),
						tabIndex: modal._$_param["tabIndex"],
						dirFullpath: modal._$_param["dirFullpath"],
						sortType: modal.selectedSortType().value(),
						nameOrId: modal.searchText(),
						applyStatusType: modal.selectedApplyStatus().value(),
						pageNum: modal.pageNum(),
						pageSize: modal.pageSize()
					},
					success:function(data) {
						modal.pageBar([]);
						if(!data.success || !data.content.list) {
							modal.lastPageNum(1);
							modal.items([]);
							return;
						}

						var items = data.content.list;
						for (var i = 0; i < items.length; i++) {
							items[i].description = items[i].description || '无描述';
						}

						modal.lastPageNum(data.content.pages);
						modal.items(data.content.list);
						var pageArr = [];
						var beginDate = (data.content.pageNum - 2 >= 1) ? data.content.pageNum - 2 : 1;
						var endDate = (data.content.pageNum + 2 <= data.content.pages) ? data.content.pageNum + 2 : data.content.pages;
						if (beginDate != 1) {
							pageArr.push("...");
						}
						for (i = beginDate; i <= endDate; i++) {
							pageArr.push(i);
						}
						if (endDate != data.content.pages) {
							pageArr.push("...");
						}
						modal.pageBar(pageArr);
					}
				});
			}
		};

		var modal = {
			items: ko.observableArray(),
			// 搜索模块
			searchText : ko.observable(""),
			searchStr4Tip : ko.observable(""),
			onSearchClick: function () {
				modal.searchStr4Tip("搜索：" + modal.searchText());
				if (modal.searchText() == "") {
					modal.searchStr4Tip("搜索：全部");
				}
				modal.pageNum(1);
				info.initData();
				// 更新资源目录树
				if(modal._$_param["tabConApplyModule"]) {
					modal._$_param["tabConApplyModule"].refreshMenus(modal.searchText(), modal.selectedApplyStatus().value());
				}
			},
			onSearchEnter: function (d, e) {
				if (e.keyCode == 13) {
					modal.onSearchClick();
				}
				return true;
			},

			// 查询数据服务详情
			clickShowResourcesDetail: function(serv) {
				var instanceId;
				if(serv.taskInstance) {
					instanceId = serv.taskInstance.id;
				}
				app.setRoot("view/app/watermap/topic/resource/dataServDetail", null, "resCon-container", {
					"id": serv.id,
					"applyLoginName": loginName,
					"instanceId": instanceId,
					"tabIndex": modal._$_param["tabIndex"],
					"dirFullpath": modal._$_param["dirFullpath"],
					"searchText": modal.searchText(),
					"applyStatusType": modal.selectedApplyStatus().value(),
					"sortType": modal.selectedSortType().value(),
					"viewType": modal.selectedViewType().value(),
					"pageNum": modal.pageNum(),
					"tabConApplyModule": modal._$_param["tabConApplyModule"]
				});
			},

			openDataResApplyPanal: function(serv) {
				var top = 90;
				var left = (window.screen.width - 736) / 2;
				common.openDialogPanal("view/app/watermap/topic/resource/applyform2",  serv.serviceName + " 服务申请", {
					resIds: serv.id,
					resTypes: '1',
					resNames: serv.serviceName,
					parentPage: info
				}, 736, 560, top, left);
			},

			download: function(serv) {
				if(serv.taskInstance) {
					window.open(agsupportUrl + "/resources/download/" + serv.taskInstance.id);
				}
			},

			addToApplyCart: function(serv) {
				if(modal._$_param["tabConApplyModule"]) {
					modal._$_param["tabConApplyModule"].addToApplyCart({
						resId : serv.id,
						resName : serv.serviceName,
						loginName : loginName,
						resImageUrl : 'style/asip/common/css/images/data.jpeg',
						resType : '1'
					});
				}
			},

			uploadApplyDoc: function(mapServ) {
				var top = 90;
				var left = (window.screen.width - 800) / 2; //获得窗口的水平位置;
				common.openDialogPanal("view/app/watermap/topic/resource/uploadDocOrApprovalForm", '上传申请材料', {
					instanceId: mapServ.taskInstance.id,
					applyLoginName: mapServ.taskInstance.applyUser,
					parentPage: info
				}, 800, 560, top, left);
			},

			// 查看方式
			selectedViewType: ko.observable({ name : ko.observable("网格方式"), value: ko.observable(0) }),
			viewTypeItems : ko.observableArray(["网格方式", "列表方式"]),
			clickViewType : function(index, name) {
				modal.selectedViewType().name(name);
				modal.selectedViewType().value(index);
			},

			// 申请状态
			selectedApplyStatus: ko.observable({ name : ko.observable("全  部"), value: ko.observable(0) }),
			applyStatusItems : ko.observableArray(["全  部", "可申请", "申请中", "待审核", "已拥有"]),
			clickApplyStatus : function(index, name) {
				modal.selectedApplyStatus().name(name);
				modal.selectedApplyStatus().value(index);
				modal.pageNum(1);

				// 更新资源目录树
				if(modal._$_param["tabConApplyModule"]) {
					modal._$_param["tabConApplyModule"].refreshMenus(modal.searchText(), modal.selectedApplyStatus().value());
				}
				info.initData();
			},

			// 排序方式
			selectedSortType: ko.observable({ name : ko.observable("以服务发布时间降序"), value: ko.observable(0) }),
			sortTypeItems : ko.observableArray(["以服务发布时间降序", "以服务发布时间升序", "以服务资源名称降序", "以服务资源名称升序"]),
			clickSortType : function(index, name) {
				modal.selectedSortType().name(name);
				modal.selectedSortType().value(index);
				info.initData();
			},

			// 分页模块
			pageNum : ko.observable(1),
			pageSize : ko.observable(6),
			lastPageNum : ko.observable(1),
			pageBar : ko.observableArray([]),
			onPageClick: function (pageNum) {
				if (pageNum == "..." || pageNum == modal.pageNum()) {
					return;
				}
				modal.pageNum(pageNum);
				info.initData();
			}
		};

		info.init();

		return modal;
	});