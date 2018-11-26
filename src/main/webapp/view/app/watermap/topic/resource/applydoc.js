define(["jquery", "durandal/app", "durandal/composition", "knockout"],
	function ($, app, composition, ko) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("applydocInitHandler", {
					init: function() {
						that.resetModel();
						that.renderUI();
						that.bindUI();
						that.getApplyUserInfo();
						that.getTaskInfoById();
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

			getApplyUserInfo: function() {
				$.ajax({
					url: agsupportUrl + "/swuser/findUserAllInfoByLoginname/" + modal._$_param["applyLoginName"],
					type:"get",
					dataType:"json",
					success: function (data) {
						modal.applyUserName(data.userName);
						modal.mobile(data.mobile);
						modal.selfCert(data.selfCert);
						modal.workUnitCode(data.workUnitCode);
						modal.workUnitAddress(data.workUnitAddress);
						modal.workUnitName(data.workUnitName);
					}
				});
			},

			getTaskInfoById: function() {
				$.ajax({
					url: agsupportUrl + "/resources/getTaskInfoById",
					type:"post",
					dataType:"json",
					data: {
						id : modal._$_param["instanceId"]
					},
					success: function (data) {
						if(data.success && data.content) {
							var instance = data.content;
							modal.applySerialNo(instance.applySerialNo);
							modal.dataType(instance.dataType);
							modal.obtainType(instance.obtainType);
							modal.obtainTypeDesc(instance.obtainTypeDesc);
							if(instance.validityDate == 30) {
								modal.validityDateName("1个月");
							} else if(instance.validityDate == 90) {
								modal.validityDateName("3个月");
							} else if(instance.validityDate == 180) {
								modal.validityDateName("6个月");
							} else if(instance.validityDate == 365) {
								modal.validityDateName("1 年");
							} else if(instance.validityDate == 3650000) {
								modal.validityDateName("永 久");
							}

							modal.layers(instance.layers);
							modal.resourcesList(instance.resourcesList);
							modal.fileCollections(instance.fileCollections);
							modal.fileInofs(instance.fileInfos);

							for(var i=0; i<instance.hists.length; i++) {
								if(i === 0) {
									//hists[i].
									modal.applyOpinion(instance.hists[i].handleComments);
								}

								if(i >= 2) {
									modal.approvalList.push(instance.hists[i]);
								}
							}
						}
					},
					error: function () {
					}
				});
			},

			resetModel: function() {
				modal.applyUserName('');
				modal.mobile('');
				modal.selfCert('');
				modal.workUnitCode('');
				modal.workUnitAddress('');
				modal.workUnitName('');
				modal.applySerialNo('');
				modal.layers([]);
				modal.resourcesList([]);
				modal.fileCollections([]);
				modal.dataType('');
				modal.obtainType('');
				modal.obtainTypeDesc('');
				modal.validityDateName('');
				modal.applyOpinion('');
				modal.approvalList([]);
				modal.fileInofs([]);
			}
		};

		var modal = {
			applyUserName: ko.observable(),
			mobile: ko.observable(),
			selfCert: ko.observable(),
			workUnitCode: ko.observable(),
			workUnitAddress: ko.observable(),
			workUnitName: ko.observable(),

			applySerialNo: ko.observable(),
			layers: ko.observableArray([]),
			resourcesList: ko.observableArray([]),
            fileCollections: ko.observableArray([]),
			dataType: ko.observable(),
			obtainType: ko.observable(),
			obtainTypeDesc: ko.observable(),
			// 申请的有效时间
			validityDateName: ko.observable(''),
			applyOpinion: ko.observable(),// 申请意见
			approvalList: ko.observableArray([]),
			fileInofs: ko.observableArray([]),

			clickReturnBtn: function() {
				// 我的审核
				if(modal._$_param["tabIndex"] === '3') {
					app.setRoot("view/app/watermap/topic/resource/tabConAudit", null, "tabCon-container", {
						"tabIndex" : modal._$_param["tabIndex"],
						"applySerialNoSearch": modal._$_param["applySerialNoSearch"],
						"applyUserNameSearch": modal._$_param["applyUserNameSearch"],
						"serviceNameSearch": modal._$_param["serviceNameSearch"],
						"statusTypeName": modal._$_param["statusTypeName"],
						"statusTypeValue": modal._$_param["statusTypeValue"],
						"pageNum": modal._$_param["pageNum"]
					});
				}

				// 平台审核
				if(modal._$_param["tabIndex"] === '4') {
					app.setRoot("view/app/watermap/topic/resource/applyManage", null, "tabCon-container", {
						"tabIndex" : modal._$_param["tabIndex"],
						"applySerialNoSearch": modal._$_param["applySerialNoSearch"],
						"applyUserNameSearch": modal._$_param["applyUserNameSearch"],
						"serviceNameSearch": modal._$_param["serviceNameSearch"],
						"statusTypeName": modal._$_param["statusTypeName"],
						"statusTypeValue": modal._$_param["statusTypeValue"],
						"pageNum": modal._$_param["pageNum"]
					});
				}

				return true;
			},
		};

		info.init();

		return modal;
	});