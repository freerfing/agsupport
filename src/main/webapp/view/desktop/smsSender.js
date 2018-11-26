define(["jquery", "durandal/app", "durandal/composition", "knockout", "layer", "box"],
	function ($, app, composition, ko, layer, box) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("smsSenderInitHandler", {
					init: function(dom) {
						that.resetModel();
						that.initData();
						that.renderUI();
						that.bindUI();
					},
					
					update: function() {}
				});
			},

			initData: function() {
				var that = this;

				// 如果id不为空，查询接口获取短信记录数据
				modal.id(modal._$_param["id"]);
				if(modal.id()) {
					$.ajax({
						url: "/agsupport/sms/findById",
						type:"POST",
						async: false,
						data: {
							id: modal.id()
						},
						dataType:"json",
						success: function (data) {
							if(!data) {
								return;
							}

							modal.content(data.content);
							modal.createTime(data.createTime);
							var retainedWords = 400 - data.content.length;
							modal.contentHtmlTips('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">' + retainedWords + '</span>个字');
							modal.hasSended(data.status != '0');
							var phones = '', recieverNames = '', recieverIds = '';

							var isUserFirstTime = true, isPhoneFirstTime = true;
							for(var i=0; i<data.receivers.length; i++) {
								if(data.receivers[i].id) {
									if(!isUserFirstTime) {
										recieverNames += ',';
										recieverIds += ',';
									} else {
										isUserFirstTime = false;
									}

									recieverNames += data.receivers[i].userName;
									recieverIds += data.receivers[i].id;
								} else {
									if(!isPhoneFirstTime) {
										phones += ',';
									} else {
										isPhoneFirstTime = false;
									}

									phones += data.receivers[i].mobile;
								}
							}

							modal.recieverIds(recieverIds);
							modal.recieverNames(recieverNames);
							modal.phones(phones);
						}
					});
				}
			},

			renderUI: function() {
				var that = this;
			},

			bindUI: function() {
				var that = this;
			},

			resetModel: function() {
				modal.id('');
				modal.recieverIds('');
				modal.recieverNames('');
				modal.phones('');
				modal.content('');
				modal.contentHtmlTips('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">400</span>个字');
				modal.hasSended(false);
			}
		};

		var modal = {
			id: ko.observable(''),
			recieverIds: ko.observable(''),
			recieverNames: ko.observable(''),
			phones: ko.observable(''),
			content: ko.observable(''),
			createTime: ko.observable(),
			contentHtmlTips: ko.observable('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">400</span>个字'),
			hasSended: ko.observable(false),

			// 选择机构接收用户
			chooseRecievers: function() {
				layer.open({
					title: ["地址本", 'text-align: left;'],
					type: 2,
					btn: '提交',
					content: '/awater/view/desktop/chooseRecievers.html',
					btn: ['确定', '取消'],
					btnAlign: 'c',
					shade: 0,
					offset: '90px',
					area:["800px", "500px"],
					yes: function(index, ct){
						var result = $(ct).find('iframe')[0].contentWindow.callbackdata();

						if(result) {
							modal.recieverIds(result.recieverIds);
							modal.recieverNames(result.recieverNames);
						}

						layer.close(index);
					},
					success:function (ct,index) {

					}
				});
			},
			contentChange: function() {
				if(modal.content().length > 400) {
					modal.content(modal.content().substring(0, 400));
				}

				var retainedWords = 400 - modal.content().length;
				modal.contentHtmlTips('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">' + retainedWords + '</span>个字');

				// 防止事件冒泡
				return true;
			},
			sendContent: function() {
				if(!modal.content().trim()) {// 短信内容为空
					layer.alert('短信内容不能为空', {icon: 2});
					return;
				}

				if(!modal.recieverIds().trim() && !modal.phones().trim()) {// 短信内容为空
					layer.alert('必须指定至少一个收件人', {icon: 2});
					return;
				}

				// 校验手机号码
				var checkedPhones = modal.phones().split(',');
				for(var i=0; i<checkedPhones.length; i++) {
					if(checkedPhones[i].trim() && !/^1\d{10}$/.test(checkedPhones[i].trim())) {
						layer.alert('手机号码[' + checkedPhones[i].trim() + ']格式有误', {icon: 2});
						return;
					}
				}

				$.ajax({
					url: "/agsupport/sms/save",
					type:"POST",
					data: {
						id: modal.id(),
						isSend: true,
						recieverIds: modal.recieverIds(),
						createTime: modal.createTime(),
						content: modal.content(),
						phones: modal.phones(),
						senderId: auGurit.global.userInfo.id,
						type: '1'// 其他类型短信
					},
					dataType:"json",
					success: function (data) {
						if(data.success) {
							layer.msg(data.message || '发送成功');

							if(!modal._$_param["smslist"]) {
								info.resetModel();
							} else {
								// 页面切换回去
								app.setRoot("view/desktop/smsList", null, "smsTabCon-container", {});
							}
						} else {
							box.alert(data.message || '发送失败', "消息");
						}
					}
				});
			},
			saveContent: function() {
				if(!modal.content().trim() && !modal.recieverIds().trim() && !modal.phones().trim()) {// 短信内容为空
					layer.alert('收件人和短信内容不能同时为空', {icon: 2});
					return;
				}

				// 校验手机号码
				var checkedPhones = modal.phones().split(',');
				for(var i=0; i<checkedPhones.length; i++) {
					if(checkedPhones[i].trim() && !/^1\d{10}$/.test(checkedPhones[i].trim())) {
						layer.alert('手机号码[' + checkedPhones[i].trim() + ']格式有误', {icon: 2});
						return;
					}
				}

				$.ajax({
					url: "/agsupport/sms/save",
					type:"POST",
					data: {
						isSend: false,
						recieverIds: modal.recieverIds(),
						content: modal.content(),
						phones: modal.phones(),
						senderId: auGurit.global.userInfo.id,
						type: '1'// 其他类型短信
					},
					dataType:"json",
					success: function (data) {
						if(data.success) {
							layer.msg('保存成功');

							if(!modal._$_param["smslist"]) {
								info.resetModel();
							} else {
								// 页面切换回去
								app.setRoot("view/desktop/smsList", null, "smsTabCon-container", {
									pageNum: modal._$_param.pageNum,
									content: modal._$_param.content,
									statusTypeName: modal._$_param.statusTypeName,
									statusTypeValue: modal._$_param.statusTypeValue
								});
							}
						} else {
							layer.msg('保存失败', {time: 2000});
						}

					}
				});
			},
			closePanel: function() {
				if(!modal._$_param["smslist"]) {
					auGurit.global.secondUtlPanal.close();
				} else {
					// 页面切换回去
					app.setRoot("view/desktop/smsList", null, "smsTabCon-container", {
						pageNum: modal._$_param.pageNum,
						content: modal._$_param.content,
						statusTypeName: modal._$_param.statusTypeName,
						statusTypeValue: modal._$_param.statusTypeValue
					});
				}
			}
		};

		info.init();

		return modal;
	}
);