define(["jquery", "durandal/app", "durandal/composition", "knockout", "panal", "box"],
	function ($, app, composition, ko, panal, box) {
		var info = {
			init: function () {
				var that = this;

				composition.addBindingHandler("userAuditInitHandler", {
					init: function (dom) {
						that.resetModal();

						var panalObj = panal.getPanalByElement(dom);
						modal.applyingUserId(panalObj.param.applyingUserId);
						modal.applyingLoginName(panalObj.param.applyingLoginName);

						that.renderUI();
						that.bindUI();
						that.getApplyerInfo();
						$("#user_audit_approvalOpinion").focus();
						that.parentPage = panalObj.param.parentPage;
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

			getApplyerInfo: function () {
				$.ajax({
					url: agsupportUrl + "/swuser/findUserAllInfoByLoginname/" + modal.applyingLoginName(),
					type: "POST",
					async: false,
					dataType: "json",
					success: function (data) {
						modal.applyer(data);
					}
				});
			},

			clickApprovealBtn: function (yesnoAprove) {
				var that = this;

				$.ajax({
					url: "/agsupport/swaudit/saveApproveOpinionForRegUser",
					type: "POST",
					data: {
						approvalLoginName: loginName,
						userIds: modal.applyingUserId(),
						yesnoAprove: yesnoAprove,
						approveOpinion: modal.approvalOpinion()
					},
					dataType: "json",
					success: function (result) {
						if (!result.success) {
							box.alert("用户注册审核失败", "消息");
							return;
						}

						if (that.parentPage) {
							that.parentPage.initData();
						}

						auGurit.global.secondUtlPanal.close();
					}
				});
			},

			resetModal: function () {
				modal.applyingUserId('');
				modal.applyingLoginName('');
				modal.applyer({});
				modal.approvalOpinion('');
			}
		};

		var modal = {
			applyingUserId: ko.observable(''),
			applyingLoginName: ko.observable(''),
			applyer: ko.observable({}),
			auditUserName: ko.observable(auGurit.global.userInfo.userName),
			approvalOpinion: ko.observable(''),
			auditTime: ko.observable(''),
			clickApprovealBtn: $.proxy(info.clickApprovealBtn, info)
		};

		info.init();

		// 设置审核时间
		function showLocale() {
			var str, objD = new Date();
			var yy = objD.getFullYear();
			var MM = objD.getMonth() + 1;
			var dd = objD.getDate();
			var hh = objD.getHours();
			var mm = objD.getMinutes();
			var ss = objD.getSeconds();

			if (MM < 10) MM = '0' + MM;
			if (dd < 10) dd = '0' + dd;
			if (hh < 10) hh = '0' + hh;
			if (mm < 10) mm = '0' + mm;
			if (ss < 10) ss = '0' + ss;

			str = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
			return (str);
		}
		setInterval(function () {
			modal.auditTime(showLocale());
		}, 1000);

		return modal;
	}
);