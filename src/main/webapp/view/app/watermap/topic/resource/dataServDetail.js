define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts", "box"],
	function ($, app, composition, ko, common, http, panal, pager, echarts, box) {

		var Info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("dataServDetailInitHandler", {
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
				modal.dataResource({"id":"","serviceName":"","serviceId":"","serviceSql":"","dataSource":"","description":"","inputParams":[],"dataDirId":"aaaa-aaaa","dataDirFullpath":"","dataDirFullname":"","cacheTime":10,"remarks":"","ispaging":1,"status":1,"createTime":"","createMan":"","editTime":"","editMan":"","authorCount":0,"publishTime":"","publishMan":"","outputParams":[], "uri":"", "uri2":"" }),
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

			// 获取数据服务资源详情
			getDataResourcesDetail: function() {
				$.ajax({
					url: agsupportUrl + "/awater/dataresources/info/" + modal._$_param.id,
					type: "post",
					dataType: "json",
					data: {
						loginName: loginName
					},
					success: function (result) {
						if(result.success) {
							var json = result.content;
							json.uri = agsupportUrl + '/catalog' + json.dataDirFullpath + '/' + json.serviceId;
							json.uri2 = json.uri;
							json.inputParams = JSON.parse( json.inputParams );
							json.outputParams = JSON.parse( json.outputParams );

							json.uri2 += "?token=";
							for (var i = 0; i < json.inputParams.length; i++) {
								json.uri2 += "&" + json.inputParams[i].paramName + "=";
							};

							//json.inputParams = ko.observableArray( json.inputParams );
							//json.outputParams = ko.observableArray( json.outputParams );

							if(json.remarks == null || json.remarks == "")
							{
								json.remarks = "暂没描述信息";
							}

							modal.dataResource( json );
						} else {
							layer.msg(result.message, { time : 2000 });
						}

					},
					error: function (jqXHR, textStatus, errorThrown) {
						layer.alert('请求出错，请刷新页面试试', {icon: 2});
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
				that.getDataResourcesDetail();
				that.loadApplyDoc();
			}

		};

		var modal = {
			dataResource: ko.observable({"id":"","serviceName":"","serviceId":"","serviceSql":"","dataSource":"","description":"","inputParams":[],"dataDirId":"aaaa-aaaa","dataDirFullpath":"","dataDirFullname":"","cacheTime":10,"remarks":"","ispaging":1,"status":1,"createTime":"","createMan":"","editTime":"","editMan":"","authorCount":0,"publishTime":"","publishMan":"","outputParams":[], "uri":"", "uri2":"" }),
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

				app.setRoot("view/app/watermap/topic/resource/dataServList", null, "resCon-container", {
					"tabIndex" : modal._$_param["tabIndex"],
					"dirId" : modal._$_param["dirId"],
					"searchText": modal._$_param["searchText"] || '',
					"sortType": modal._$_param["sortType"] || 0,
					"viewType": modal._$_param["viewType"] || 0,
					"applyStatusType": modal._$_param["applyStatusType"] || 0,
					"pageNum" : modal._$_param["pageNum"],
					"tabConApplyModule": modal._$_param["tabConApplyModule"]
				});
			},

			serviceTest: function() {
				var uri = modal.dataResource().uri;

				if(uri && uri.lastIndexOf('?') != -1) {
					uri += '&token=agcas&loginName=' + loginName;
				} else {
					uri += '?token=agcas&loginName=' + loginName;
				}

				window.open(uri);
			}
		};

		Info.init();

		return modal;
	});