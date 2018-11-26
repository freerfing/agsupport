define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts", "box"],
		function ($, app, composition, ko, common, http, panal, pager, echarts, box) {

		var attrDic = {
			"name": "名称",
			"nameCn": "别名",
			"label": "标签",
			"illustration": "说明",
			"dataSource": "数据来源",
			"dataVersion": "数据版本",
			"coordinateSystem": "坐标系",
			"pubDate": "发布时间",
			"area": "覆盖范围",
			"updateCycle": "更新周期",
			"projectionType": "投影类型"
		};

		var Info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("mapServDetailInitHandler", {
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
			},

			resetModel: function() {
				if(!modal._$_param["instanceId"]) {
					modal.selectedPanelIdx(1);
				} else {
					modal.selectedPanelIdx(2);
				}
				modal.layer().picture('');
				modal.layer().proxyUrl('');
				modal.layer().name('');
				modal.layer().pubDate('');
				modal.layer().illustration('');
				modal.layer().dataSource('');
				modal.layer().dataVersion('');
				modal.layer().coordinateSystem('');
				modal.layer().owner('');
				modal.layerAttrs([]);
				modal.applyTaskHists([]);
				modal.approvalTaskHists([]);
			},

			// 获取申请审核历史信息
			findTaskHists: function() {
				if(!modal._$_param["instanceId"]) {
					return;
				}

				$.ajax({
					url: "/agsupport/resources/findTaskHists",
					type:"post",
					dataType:"json",
					data: { instanceId: modal._$_param["instanceId"] },
					success: function (data) {
						if(data.success) {
							for(var i=0; i<data.content.length; i++) {
								if(i < 2) {
									modal.applyTaskHists.push(data.content[i]);
								} else {
									modal.approvalTaskHists.push(data.content[i]);
								}
							}
						}
					},
					error: function () {
					}
				});
			},

			// 获取地图服务资源详情
			getLayerDetail: function() {
				$.ajax({
					url: agsupportUrl + "/resources/getLayerDetail",
					type:"post",
					dataType:"json",
					data: {
						"id" : modal._$_param["id"],
						"applyLoginName" : modal._$_param["applyLoginName"]
					},
					success: function (result) {
						if(result.success && result.content) {
							var layer = result.content;
							var sdata = JSON.parse(layer.data);
							modal.layer().picture(layer.picture ? (agsupportUrl + "/upload/picture/" + layer.picture) : 'style/asip/common/css/images/resource/a2.png');
							modal.layer().pubDate(sdata.pubDate ? sdata.pubDate : layer.createTime.substr(0, 10));
							modal.layer().name(layer.nameCn);
							if(sdata.dataVersion) {
								modal.layer().dataVersion(sdata.dataVersion);
							} else {
								modal.layer().dataVersion('最新');
							}
							modal.layer().coordinateSystem(sdata.coordinateSystem);
							modal.layer().dataSource(sdata.dataSource);
							modal.layer().owner(layer.owner);
							modal.layer().proxyUrl(layer.proxyUrl || '');
							modal.layer().illustration(layer.illustration);

							var dataArr = [];

							for(var key in layer) {
								if(layer.hasOwnProperty(key) && attrDic[key]) {
									dataArr.push({ key : attrDic[key], value : layer[key] });
								}
							}

							for(var key in sdata) {
								if(attrDic[key] && sdata.hasOwnProperty(key) && key != 'illustration') {
									dataArr.push({ key: attrDic[key], value : sdata[key] });
								}
							}

							modal.layerAttrs(dataArr);
						}
					},
					error: function () {
						layer.msg('获取地图服务资源详情失败', { time : 2000 });
					}
				});
			},

			// 加载电子申请材料信息
			loadApplyDoc: function() {
				app.setRoot("view/app/watermap/topic/resource/applydoc", null, "d-map-serv-apply-doc-container", {
					"instanceId": modal._$_param["instanceId"],
					"applyLoginName": modal._$_param["applyLoginName"],
					"tabIndex": modal._$_param["tabIndex"],
					"notShowReturnBtn": true
				});
			},

			initData: function(){
				var that = this;
				that.findTaskHists();
				that.getLayerDetail();
				that.loadApplyDoc();
			}

		};

		var modal = {
			selectedPanelIdx: ko.observable(2),
			applyUser: ko.observable(),
			layer: ko.observable({
				picture : ko.observable(),
				proxyUrl : ko.observable(),
				name : ko.observable(),
				pubDate : ko.observable(),
				illustration: ko.observable(),
				dataSource: ko.observable(),
				dataVersion: ko.observable(),
				coordinateSystem: ko.observable(),
				owner: ko.observable()
			}),
			layerAttrs: ko.observableArray([]),
			applyTaskHists: ko.observableArray([]),
			approvalTaskHists: ko.observableArray([]),
			clickPanelBtn : function(index) {
				modal.selectedPanelIdx(index);
			},
			clickReturnBtn: function() {
				// 我的审核
				if(modal._$_param["tabIndex"] == 3) {
					app.setRoot("view/app/watermap/topic/resource/tabConAudit", null, "tabCon-container", {
						"tabIndex" : modal._$_param["tabIndex"],
						"applySerialNoSearch": modal._$_param["applySerialNoSearch"],
						"applyUserNameSearch": modal._$_param["applyUserNameSearch"],
						"serviceNameSearch": modal._$_param["serviceNameSearch"],
						"statusTypeName": modal._$_param["statusTypeName"],
						"statusTypeValue": modal._$_param["statusTypeValue"],
						"pageNum":  modal._$_param["pageNum"]
					});
					return true;
				}
				// 平台审核
				if(modal._$_param["tabIndex"] == 4) {
					app.setRoot("view/app/watermap/topic/resource/applyManage", null, "tabCon-container", {
						"tabIndex" : modal._$_param["tabIndex"],
						"applySerialNoSearch": modal._$_param["applySerialNoSearch"],
						"applyUserNameSearch": modal._$_param["applyUserNameSearch"],
						"serviceNameSearch": modal._$_param["serviceNameSearch"],
						"statusTypeName": modal._$_param["statusTypeName"],
						"statusTypeValue": modal._$_param["statusTypeValue"],
						"pageNum":  modal._$_param["pageNum"]
					});
					return true;
				}
				app.setRoot("view/app/watermap/topic/resource/mapServList", null, "resCon-container", {
					"tabIndex" : modal._$_param["tabIndex"],
					"dirId" : modal._$_param["dirId"],
					"searchText": modal._$_param["searchText"],
					"applyStatusType": modal._$_param["applyStatusType"] || 0,
					"sortType": modal._$_param["sortType"] || 0,
					"viewType": modal._$_param["viewType"] || 0,
					"coordinateIndex": modal._$_param["coordinateIndex"] || 0,
					"pageNum" : modal._$_param["pageNum"],
					"tabConApplyModule": modal._$_param["tabConApplyModule"]
				});
			}
		};

		Info.init();

		return modal;
	});