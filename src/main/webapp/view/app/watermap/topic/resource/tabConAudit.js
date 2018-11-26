define(["layer", "jquery", "durandal/app", "durandal/composition", "knockout", "common"], function(layer, $, app, composition, ko, common) {
	var info={
		init:function() {
			var that=this;

			composition.addBindingHandler("tabConAuditHandler", {
				init: function(dom) {
					modal.pageNum(modal._$_param["pageNum"] || 1);
					modal.selectedStatusType().name(modal._$_param["statusTypeName"] || "全  部");
					modal.selectedStatusType().value(modal._$_param["statusTypeValue"] || 0);

					that.loadApplyData();
				},
				update: function() {}

			});
		},

		initData: function() {
			info.loadApplyData();
		},

		openAuditPanal: function (title, applyInfo) {
			var top = 90;
			var left = (window.screen.width - 800) / 2; //获得窗口的水平位置;
			common.openDialogPanal("view/app/watermap/topic/resource/uploadDocOrApprovalForm", title, {
				instanceId: applyInfo.id,
				applyLoginName: applyInfo.applyingUser.loginName,
				parentPage: info
			}, 800, 560, top, left);

		},

		// 加载申请相关数据
		loadApplyData: function() {
			modal.applys.removeAll();

			$.ajax({
				url: agsupportUrl + "/resources/listApplyRecords",
				type:"POST",
				data: {
					loginName: loginName,
					applySerialNo: modal.applySerialNoSearch(),
					applyUserName: modal.applyUserNameSearch(),
					servName: modal.serviceNameSearch(),
					approvalStatusType: modal.selectedStatusType().value(),
					pageNum: modal.pageNum(),
					pageSize: modal.pageSize()
				},
				dataType:"json",
				success: function (data) {
					console.log(data);
					if(data.success) {
						if(data.content.list) {
							modal.applys(data.content.list);

							modal.pageBar([]);
							modal.lastPageNum(data.content.pages);
							var pageArr = [];
							var beginDate = (data.content.pageNum - 2 >= 1) ? data.content.pageNum - 2 : 1;
							var endDate = (data.content.pageNum + 2 <= data.content.pages) ? data.content.pageNum + 2 : data.content.pages;
							if (beginDate != 1) {
								pageArr.push("...");
							}
							for (var i = beginDate; i <= endDate; i++) {
								pageArr.push(i);
							}
							if (endDate != data.content.pages) {
								pageArr.push("...");
							}

							modal.pageBar(pageArr);
						}
					} else {
						layer.alert(data.message, {icon: 2});
					}
				},
				error: function () {
				}
			});
		}
	};

	var modal = {
		applySerialNoSearch: ko.observable(),
		applyUserNameSearch: ko.observable(),
		serviceNameSearch: ko.observable(),
		// 添加状态筛选
		selectedStatusType: ko.observable({ name : ko.observable("全  部"), value: ko.observable(0) }),
		statusTypeItems : ko.observableArray(["全  部", "待审核", "已通过", "已驳回"]),
		clickStatusType : function(index, name) {
			modal.selectedStatusType().name(name);
			modal.selectedStatusType().value(index);
			modal.pageNum(1);
			modal.lastPageNum(1);
			modal.pageBar([]);
			info.loadApplyData();
		},
		applys: ko.observableArray([]),

		// 分页模块
		pageNum : ko.observable(1), //当前页
		pageSize : ko.observable(20),//每页条数
		lastPageNum : ko.observable(1),//最后一页
		pageBar : ko.observableArray([]),

		onSearchClick: function() {
			modal.pageNum(1);
			modal.lastPageNum(1);
			modal.pageBar([]);
			info.initData();
		},

		lookApplyDocDetail: function(applyInfo) {
			app.setRoot("view/app/watermap/topic/resource/applydoc", null, "tabCon-container", {
				"instanceId": applyInfo.id,
				"applyLoginName": applyInfo.applyingUser.loginName,
				"applySerialNoSearch": modal.applySerialNoSearch(),
				"applyUserNameSearch": modal.applyUserNameSearch(),
				"serviceNameSearch": modal.serviceNameSearch(),
				"statusTypeName": modal.selectedStatusType().name(),
				"statusTypeValue": modal.selectedStatusType().value(),
				"pageNum": modal.pageNum(),
				"tabIndex": modal._$_param["tabIndex"]
			});
		},

		lookMapServDetail: function(applyInfo, layer) {
			app.setRoot("view/app/watermap/topic/resource/mapServDetail", null, "tabCon-container", {
				"id": layer.id,
				"applyLoginName": applyInfo.applyingUser.loginName,
				"instanceId": applyInfo.id,
				"applySerialNoSearch": modal.applySerialNoSearch(),
				"applyUserNameSearch": modal.applyUserNameSearch(),
				"serviceNameSearch": modal.serviceNameSearch(),
				"statusTypeName": modal.selectedStatusType().name(),
				"statusTypeValue": modal.selectedStatusType().value(),
				"pageNum": modal.pageNum(),
				"tabIndex": modal._$_param["tabIndex"]
			});
		},

		lookDataServDetail: function(applyInfo, resources) {
			app.setRoot("view/app/watermap/topic/resource/dataServDetail", null, "tabCon-container", {
				"id": resources.id,
				"instanceId": applyInfo.id,
				"applyLoginName": applyInfo.applyingUser.loginName,
				"applySerialNoSearch": modal.applySerialNoSearch(),
				"applyUserNameSearch": modal.applyUserNameSearch(),
				"serviceNameSearch": modal.serviceNameSearch(),
				"statusTypeName": modal.selectedStatusType().name(),
				"statusTypeValue": modal.selectedStatusType().value(),
				"pageNum": modal.pageNum(),
				"tabIndex": modal._$_param["tabIndex"]
			});
		},

		onPageClick: function(pageNum) {
			if (pageNum == "..." || pageNum == modal.pageNum()) {
				return;
			}

			modal.pageNum(pageNum);

			info.loadApplyData();
		},

		openAuditPanal: function (applyInfo) {
			info.openAuditPanal('服务审批', applyInfo);
		}
	};

	info.init();

	return modal;

});