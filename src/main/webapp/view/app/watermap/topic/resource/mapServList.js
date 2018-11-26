define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "layer", "http", "panal","pager"],
	function ($, app, composition, ko, common, layer, http, panal, pager) {
	var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("mapServListInitHandler", {
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
				that.initCoordinate()
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
			initCoordinate: function() {
				var i = 0;
				modal.coordinateItems([]);
				$.ajax({
					type: 'get',
					url: agsupportUrl + "/agsupport/dic/getAgDicByTypeCode/A103",
					dataType:'json',
					success:function(data) {
						var coordinateIndex = modal._$_param["coordinateIndex"] || 0;
						var rootCoordinate = {
							index: ko.observable(0),
							name : ko.observable("坐标系"),
							value: ko.observable('')
						};
						modal.coordinateItems.push(rootCoordinate);
						if(coordinateIndex === 0) {
							modal.selectedCoordinate(rootCoordinate);
						}

						for(; i<data.length && $.trim(data[i].note); i++) {
							var coordinate = {
								index: ko.observable(i+1),
								name : ko.observable(data[i].note),
								value: ko.observable(data[i].name)
							};
							modal.coordinateItems.push(coordinate);
							if(coordinateIndex === i+1) {
								modal.selectedCoordinate(coordinate);
							}
						}
					}
				});
			},
			initData: function() {
				$.ajax({
					type: 'post',
					url: agsupportUrl + "/resources/listLayers",
					dataType:'json',
					data: {
						loginName: loginName,
						tabIndex: modal._$_param["tabIndex"],
						dirId: modal._$_param["dirId"],
						sortType: modal.selectedSortType().value(),
						searchText: modal.searchText(),
						coordinateCode: modal.selectedCoordinate().value(),
						applyStatusType: modal.selectedApplyStatus().value(),
						pageNum: modal.pageNum(),
						pageSize: modal.pageSize()
					},
					success:function(data) {
						modal.pageBar([]);
						if(!data.success || !data.content.list) {
							modal.lastPageNum(1);
							modal.layers([]);
							return;
						}

						var layers = data.content.list;
						for (var i = 0; i < layers.length; i++) {
							var djson = JSON.parse(layers[i].data);
							layers[i].data = djson;
							layers[i].newNameCn = layers[i].nameCn;
							layers[i].data.coordinateSystem = layers[i].data.coordinateSystem || '';
							layers[i].data.dataSource = layers[i].data.dataSource || '';
							if (layers[i].data.dataVersion) {
								layers[i].newNameCn = layers[i].nameCn + '(' + layers[i].data.dataVersion + ')';
							}
							if (!layers[i].picture) {
								layers[i].img = "style/asip/common/css/images/resource/wu.png";
							} else {
								layers[i].img = agsupportUrl + "/upload/picture/" + layers[i].picture;
							}

							layers[i].description = layers[i].illustration || '无描述';
							layers[i].time = layers[i].createTime.substr(0, 10);
						}

						modal.layers(layers);
						modal.lastPageNum(data.content.pages);
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
					modal._$_param["tabConApplyModule"].refreshMenus(modal.searchText(), modal.selectedApplyStatus().value(), modal.selectedCoordinate().value(), modal.selectedCoordinate().index());
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
				var instanceId;
				if(mapServ.taskInstance) {
					instanceId = mapServ.taskInstance.id;
				}
				app.setRoot("view/app/watermap/topic/resource/mapServDetail", null, "resCon-container", {
					"id": mapServ.id,
					"applyLoginName": loginName,
					"instanceId": instanceId,
					"tabIndex": modal._$_param["tabIndex"],
					"dirId": modal._$_param["dirId"],
					"searchText": modal.searchText(),
					"applyStatusType": modal.selectedApplyStatus().value(),
					"sortType": modal.selectedSortType().value(),
					"viewType": modal.selectedViewType().value(),
					"coordinateIndex": modal.selectedCoordinate().index(),
					"pageNum": modal.pageNum(),
					"tabConApplyModule": modal._$_param["tabConApplyModule"]
				});
			},

			openMapResApplyPanal: function(mapServ) {
				console.log(mapServ);
				var top = 90;
				var left = (window.screen.width - 736) / 2;
				common.openDialogPanal("view/app/watermap/topic/resource/applyform2",  mapServ.nameCn + " 服务申请", {
					resIds: mapServ.id,
					resNames: mapServ.nameCn,
					resTypes: '0',
					parentPage: info
				}, 736, 560, top, left);
			},

			download: function(mapServ) {
				if(mapServ.taskInstance) {
					window.open(agsupportUrl + "/resources/download/" + mapServ.taskInstance.id);
				}
			},

			addToApplyCart: function(mapServ) {
				if(modal._$_param["tabConApplyModule"]) {
					modal._$_param["tabConApplyModule"].addToApplyCart({
						resId : mapServ.id,
						resName : mapServ.nameCn,
						loginName : loginName,
						resImageUrl : mapServ.img,
						resType : '0'
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
					modal._$_param["tabConApplyModule"].refreshMenus(modal.searchText(), modal.selectedApplyStatus().value(), modal.selectedCoordinate().value(), modal.selectedCoordinate().index());
				}
				info.initData();
			},

			// 服务坐标系
			selectedCoordinate: ko.observable({index: ko.observable(0), name : ko.observable("坐标系"), value: ko.observable('') }),
			coordinateItems : ko.observableArray([]),
			clickCoordinate : function(index, name, value) {
				modal.selectedCoordinate().name(name);
				modal.selectedCoordinate().index(index);
				modal.selectedCoordinate().value(value);
				modal.pageNum(1);
				// 更新资源目录树
				if(modal._$_param["tabConApplyModule"]) {
					modal._$_param["tabConApplyModule"].refreshMenus(modal.searchText(), modal.selectedApplyStatus().value(), modal.selectedCoordinate().value(), modal.selectedCoordinate().index());
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