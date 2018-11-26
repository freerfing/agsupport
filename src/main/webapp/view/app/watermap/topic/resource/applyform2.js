define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "layer"],
	function ($, app, composition, ko, common, http, panal, layer) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("applyForm2InitHandler", {
					init: function(dom) {
						that.restModal();

						var panalObj = panal.getPanalByElement(dom);
						modal.resIds(panalObj.param.resIds);
						modal.resTypes(panalObj.param.resTypes);
						modal.resNames(panalObj.param.resNames);
						that.parentPage = panalObj.param.parentPage;

						that.renderUI();
						that.bindUI();
						that.getApplyUserInfo();
						// 延时聚焦到数据用途上
						setTimeout(function() {
							$("#applyOpinionContainer").focus();
						}, 800);
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

			restModal:function() {
				modal.obtainType("1");
				modal.obtainTypeDesc("");
				modal.dataType("1");
				modal.isApplySucess(false);
				modal.instanceId('');
				modal.selectedValidityDate(30);
				modal.applyOpinion("");
			},

			getApplyUserInfo: function() {
				$.ajax({
					url: agsupportUrl + "/swuser/findUserAllInfoByLoginname/" + loginName,
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

			clickSubmitBtn: function() {
				var that = this;
				if(!$.trim(modal.workUnitName())) {
					layer.alert("请填写单位(处室)名称", {icon: 2});
					return;
				}
				if(!$.trim(modal.mobile())) {
					layer.alert("请填写经办人联系电话", {icon: 2});
					return;
				}
				if (!/^((0\d{2,3}-\d{7,8})|(1\d{10}))$/.test($.trim(modal.mobile()))) {
					layer.alert("经办人联系电话格式有误", {icon: 2});
					return;
				}
				if(!$.trim(modal.selfCert())) {
					layer.alert("请填写经办人身份证号码", {icon: 2});
					return;
				}
				if(!$.trim(modal.applyOpinion())) {
					layer.alert("请填写数据用途", {icon: 2});
					return;
				}
				if(modal.obtainType() === '2' && !$.trim(modal.obtainTypeDesc())) {
					layer.alert("请详细补充具体的数据获取方式", {icon: 2});
					return;
				}

				$.ajax({
					url: agsupportUrl + "/resources/apply",
					type:"post",
					dataType:"json",
					data: {
						"resIds": modal.resIds(),
						"resNames": $.trim(modal.resNames()),
						"resTypes": modal.resTypes(),
						"applyOpinion": modal.applyOpinion(),
						"loginName": loginName,
						"mobile": $.trim(modal.mobile()),
						"selfCert": $.trim(modal.selfCert()),
						"workUnitCode": $.trim(modal.workUnitCode()),
						"workUnitAddress": $.trim(modal.workUnitAddress()),
						"dataType": $.trim(modal.dataType()),
						"obtainType": $.trim(modal.obtainType()),
						"obtainTypeDesc": $.trim(modal.obtainTypeDesc()),
						"workUnitName": $.trim(modal.workUnitName()),
						"validityDate": $.trim(modal.selectedValidityDate())
					},
					success: function (data) {
						if(data.success) {
							layer.alert('您的服务申请已成功提交，生成的流水号：' + data.content.applySerialNo + ", 请导出申请表格并完成线下流程。", {icon: 1});
							modal.isApplySucess(true);
							modal.instanceId(data.content.id);
						} else {
							layer.alert(data.message, {icon: 2});
						}
					},
					error: function () {
						layer.alert('请求出错，请刷新浏览器试试', {icon: 2});
					}
				});
			},

			clickExportBtn: function() {
				var that = this;

				window.open(agsupportUrl + "/resources/download/" + modal.instanceId());
				if(that.parentPage) {
					that.parentPage.initData();
				}

			},
			clickExportCloseBtn: function() {
				var that = this;

				if(that.parentPage) {
					that.parentPage.initData();
				}

				//关闭
				auGurit.global.secondUtlPanal.close();
			}

		};


		var modal = {
			// 服务信息
			resIds: ko.observable(),
			resTypes: ko.observable(),
			resNames: ko.observable(),

			// 申请用户信息
			applyUserName: ko.observable(),
			mobile: ko.observable(),
			selfCert: ko.observable(),
			workUnitCode: ko.observable(),
			workUnitAddress: ko.observable(),
			workUnitName: ko.observable(),
			applyOpinion: ko.observable(),

			obtainType: ko.observable(),
			obtainTypeDesc: ko.observable(),
			dataType: ko.observable(),
			// 申请的有效时间
			availableValidityDateOptions: ko.observableArray([
				{"name": "1个月", "value": 30}, {"name": "3个月", "value": 90},
				{"name": "6个月", "value": 180}, {"name": "1 年", "value": 365},
				{"name": "永 久", "value": 3650000}]),
			selectedValidityDate: ko.observable(30),

			isApplySucess: ko.observable(false),
			instanceId: ko.observable(''),

			clickSubmitBtn: $.proxy(info.clickSubmitBtn, info),
			clickCloseBtn: function() {  auGurit.global.secondUtlPanal.close(); },
			clickExportBtn: $.proxy(info.clickExportBtn, info),
			clickExportCloseBtn: $.proxy(info.clickExportCloseBtn, info)
		};

		info.init();

		return modal;
	});