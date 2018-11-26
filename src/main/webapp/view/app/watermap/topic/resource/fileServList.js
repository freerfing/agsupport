define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "layer", "http", "panal","pager"],
	function ($, app, composition, ko, common, layer, http, panal, pager) {
	var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("fileServListInitHandler", {
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
				if(modal.searchText()) {
					modal.searchStr4Tip("搜索：" + modal.searchText());
				} else {
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
					url: agsupportUrl + "/awater/fileCollection/listByDirIds",
					dataType:'json',
					data: {
						loginName: loginName,
						tabIndex: modal._$_param["tabIndex"],
						menuIds: modal._$_param["dirId"],
						sortType: modal.selectedSortType().value(),
                        fileCollectionName: modal.searchText(),
						applyStatusType: modal.selectedApplyStatus().value(),
						pageNum: modal.pageNum(),
						pageSize: modal.pageSize()
					},
					success:function(data) {
						modal.pageBar([]);
						var layers = data.rows;
						for (var i = 0; i < layers.length; i++) {
							layers[i].imgUrl = (layers[i].imgUrl ? '/agsupport' + layers[i].imgUrl : 'style/asip/common/css/images/resource/wu.png');
							layers[i].remark = layers[i].remark || '无描述';
						}

						modal.layers(layers);
						modal.lastPageNum(Math.floor((data.total + modal.pageSize()) /modal.pageSize()));
						var pageArr = [];
						var beginDate = (modal.pageNum() - 2 >= 1) ? modal.pageNum() - 2 : 1;
						var endDate = (modal.pageNum() + 2 <= modal.lastPageNum()) ? modal.pageNum() + 2 : modal.lastPageNum();
						if (beginDate != 1) {
							pageArr.push("...");
						}
						for (i = beginDate; i <= endDate; i++) {
							pageArr.push(i);
						}
						if (endDate != modal.lastPageNum()) {
							pageArr.push("...");
						}
						modal.pageBar(pageArr);
					}
				});
			}
		};

		var modal = {
			layers: ko.observableArray(),
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

			// 查询地图服务详情
			clickShowLayerDetail: function(mapServ) {
				var instanceId, instanceStatus;
				if(mapServ.taskInstance) {
					instanceId = mapServ.taskInstance.id;
				}
				app.setRoot("view/app/watermap/topic/resource/fileServDetail", null, "resCon-container", {
					"id": mapServ.id,
					"applyLoginName": loginName,
					"instanceId": instanceId,
					"instanceStatus": mapServ.instanceStatus,
					"tabIndex": modal._$_param["tabIndex"],
					"dirId": modal._$_param["dirId"],
					"searchText": modal.searchText(),
					"applyStatusType": modal.selectedApplyStatus().value(),
					"sortType": modal.selectedSortType().value(),
					"viewType": modal.selectedViewType().value(),
					"pageNum": modal.pageNum(),
					"tabConApplyModule": modal._$_param["tabConApplyModule"]
				});
			},

			openMapResApplyPanal: function(mapServ) {
				console.log(mapServ);
				var top = 90;
				var left = (window.screen.width - 736) / 2;
				common.openDialogPanal("view/app/watermap/topic/resource/applyform2",  mapServ.name + " 服务申请", {
					resIds: mapServ.id,
					resNames: mapServ.name,
					resTypes: '2',
					parentPage: info
				}, 736, 560, top, left);
			},

			download: function(mapServ) {
				if(mapServ.taskInstance) {
					window.open(agsupportUrl + "/resources/download/" + mapServ.taskInstance.id);
				}
			},

			addToApplyCart: function(mapServ) {
				debugger;
				if(modal._$_param["tabConApplyModule"]) {
					modal._$_param["tabConApplyModule"].addToApplyCart({
						resId : mapServ.id,
						resName : mapServ.name,
						loginName : loginName,
						resImageUrl : mapServ.imgUrl,
						resType : '2'
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