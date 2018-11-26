define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "layer", "ajaxupload"],
	function ($, app, composition, ko, common, http, panal, layer) {

		var parentParam;

		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("uploadDocOrApprovalFormInitHandler", {
					init: function(dom) {
						parentParam = panal.getPanalByElement(dom).param;
						that.resetModal();
						that.renderUI();
						that.bindUI();
						that.getApplyUserInfo();
						that.getTaskInfoById();
						// 延时聚焦到审核意见上
						setTimeout(function() {
							$("#uploadDocOrApprovalForm_approvalOpion").focus();
						}, 800);

					},
					update: function() {}
				});
			},
			renderUI: function() {
				var that = this;
			},

			bindUI: function() {
				var options = {
					action: agsupportUrl + "/upload/files/3",
					responseType: "json",
					name: 'file',
					onSubmit: function (files, extensions) {
						//do sth on submit
					},
					onComplete: function (files, data) {
						// 上传成功
						if(data && data.length > 0) {
							$(data).each(function(index, fileInfo) {
								modal.fileInfos.push(fileInfo);
							});
						}
					},
					onChange: function (files, extensions) {
						//do sth on change
					}
				};
				new AjaxUpload("approvallist_upload_button", options);
			},

			getApplyUserInfo: function() {
				$.ajax({
					url: agsupportUrl + "/swuser/findUserAllInfoByLoginname/" + parentParam.applyLoginName,
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
						id : parentParam.instanceId
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
							if(instance.fileInfos) {
								modal.fileInfos(instance.fileInfos);
							}
							modal.curStatus(instance.curStatus);

							for(var i=0; i<instance.hists.length; i++) {
								if(i === 0) {
									modal.applyOpinion(instance.hists[i].handleComments);
								}

								if(i >= 2 && (i === (instance.hists.length - 1))) {
									modal.approvalOpinion("");
									modal.approvalName(instance.hists[i].activityChineseName);
									modal.approvalStatusCn(instance.hists[i].activityStatusName);
									modal.approvalUserName(instance.hists[i].assigneeName || auGurit.global.userInfo.userName);
								}
							}
						}
					},
					error: function () {
					}
				});
			},

			clickUploadDocConfirmBtn: function() {
				if(modal.fileInfos().length <= 0) {
					layer.alert("请上传申请材料附件", {icon: 2});
					return;
				}
				var fileIds = '';
				for(var index=0; index<modal.fileInfos().length; index++) {
					fileIds += modal.fileInfos()[index].id + ',';
				}
				if(index != 0) {
					fileIds = fileIds.substring(0, fileIds.length - 1);
				}

				$.ajax({
					url: agsupportUrl + "/resources/uploadApplyDoc",
					type:"post",
					dataType:"json",
					data: {
						"instanceId": parentParam.instanceId,
						"loginName": loginName,
						"fileIds" : fileIds
					},
					success: function (data) {
						if(data.success) {
							if(parentParam.parentPage) {
								parentParam.parentPage.initData();
							}

							auGurit.global.secondUtlPanal.close();
						} else {
							layer.msg(data.message);
						}

					},
					error: function () {
						layer.alert('请求出错，请刷新浏览器试试', {icon: 2});
					}
				});
			},
			clickApprovalBtn: function(approvalStatusType) {
				$.ajax({
					url: agsupportUrl + "/resources/approval",
					type:"post",
					dataType:"json",
					data: {
						"instanceId" : parentParam.instanceId,
						"loginName": loginName,
						"approvalStatusType" : approvalStatusType,
						"approvalOpinion": modal.approvalOpinion()
					},
					success: function (data) {
						if(data.success) {
							if(parentParam.parentPage) {
								parentParam.parentPage.initData();
							}

							auGurit.global.secondUtlPanal.close();
						} else {
							layer.msg(data.message);
						}

					},
					error: function () {
						layer.alert('请求出错，请刷新浏览器试试', {icon: 2});
					}
				});
			},

			resetModal: function() {
				modal.applyUserName('');
				modal.mobile('');
				modal.selfCert('');
				modal.workUnitCode('');
				modal.workUnitAddress('');
				modal.workUnitName('');
				modal.applyOpinion('');
				modal.applySerialNo('');
				modal.dataType('');
				modal.obtainType('');
				modal.obtainTypeDesc('');
				modal.validityDateName('');

				modal.curStatus('');
				modal.layers([]);

				modal.fileInfos([]);

				modal.approvalOpinion('');
				modal.approvalName('');
				modal.approvalUserName('');
				modal.approvalStatusCn('');
			}
		};

		var modal = {
			// 申请用户信息
			applyUserName: ko.observable(),
			mobile: ko.observable(),
			selfCert: ko.observable(),
			workUnitCode: ko.observable(),
			workUnitAddress: ko.observable(),
			workUnitName: ko.observable(),

			// 申请相关信息
			applyOpinion: ko.observable(),// 申请意见
			applySerialNo: ko.observable(),// 申请流水号
			dataType: ko.observable(),// 数据类型
			obtainType: ko.observable(),// 获取方式
			obtainTypeDesc: ko.observable(),// 获取方式
			validityDateName: ko.observable(''),
			layers: ko.observableArray([]),
			resourcesList: ko.observableArray([]),

			curStatus: ko.observable(),// 当前状态

			// 审核模块
			approvalOpinion: ko.observable(),
			approvalName: ko.observable(),// 审批环节名称
			approvalUserName: ko.observable(),
			approvalStatusCn: ko.observable(),// 审核状态名称， 如待发放服务
			approvalTime: ko.observable(),

			fileInfos: ko.observableArray([]),
			removeFile: function(data) {
				modal.fileInfos.remove(data);
			},
			dowloadFile: function(data) {
				window.open(agsupportUrl + "/download/file/" + data.id);
			},
			clickCloseBtn: function() {
				auGurit.global.secondUtlPanal.close();
			},
			clickUploadDocConfirmBtn : $.proxy(info.clickUploadDocConfirmBtn, info),
			clickApprovalBtn: $.proxy(info.clickApprovalBtn, info)
		};

		info.init();

		function showLocale(){
			var str, objD = new Date();
			var yy = objD.getFullYear();
			var MM = objD.getMonth()+1;
			var dd = objD.getDate();
			var hh = objD.getHours();
			var mm = objD.getMinutes();
			var ss = objD.getSeconds();

			if(MM<10) MM = '0' + MM;
			if(dd<10) dd = '0' + dd;
			if(hh<10) hh = '0' + hh;
			if(mm<10) mm = '0' + mm;
			if(ss<10) ss = '0' + ss;

			str = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
			return(str);
		}

		setInterval(function(){
			modal.approvalTime(showLocale());
		}, 1000);

		return modal;
	});