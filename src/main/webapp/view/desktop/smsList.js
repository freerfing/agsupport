define(["jquery", "durandal/app", "durandal/composition", "knockout", "layer", "pager"],
	function ($, app, composition, ko, layer, pager) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("smsListInitHandler", {
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
				that.loadSmsList();
			},

			renderUI: function() {
				var that = this;
			},

			bindUI: function() {
				var that = this;
			},

			loadSmsList: function() {
				$.ajax({
					url: agsupportUrl + "/sms/list",
					type:"POST",
					data: {
						senderId: auGurit.global.userInfo.id,
						statusType: modal.selectedStatusType().value(),
						content: modal.content(),
						pageNum: modal.pageNum(),
						pageSize: modal.pageSize()
					},
					dataType:"json",
					success: function (data) {
						modal.smslist.removeAll();

						for(var i=0; i<data.list.length; i++) {
							var sms = data.list[i];
							var isFirstTime = true;
							sms.recieverNames = '';
							for(var j=0; j<sms.receivers.length; j++) {
								isFirstTime? (isFirstTime = false) : (sms.recieverNames += ',');
								sms.recieverNames += (sms.receivers[j].userName || sms.receivers[j].mobile);
							}
						}

						modal.smslist(data.list);

						modal.pageBar([]);
						modal.lastPageNum(data.pages);

						var pageArr = [];
						var beginDate = (data.pageNum - 2 >= 1) ? data.pageNum - 2 : 1;
						var endDate = (data.pageNum + 2 <= data.pages) ? data.pageNum + 2 : data.pages;
						if (beginDate != 1) {
							pageArr.push("...");
						}

						for (var i = beginDate; i <= endDate; i++) {
							pageArr.push(i);
						}

						if (endDate != data.pages) {
							pageArr.push("...");
						}

						modal.pageBar(pageArr);
					}
				});
			},

			resetModel: function() {
				var that = this;

				// 查询模块
				that.resetPageModel();

				modal.content("");
				modal.smslist([]);
				modal.recieverNames("");
				modal.pageNum(modal._$_param["pageNum"] || 1);
				modal.content(modal._$_param["content"] || '');
				modal.selectedStatusType().name(modal._$_param["statusTypeName"] || "全   部");
				modal.selectedStatusType().value(modal._$_param["statusTypeValue"] || 0);

				// check模块
				modal.checkedIds([]);
			},

			resetPageModel: function() {
				// 分页模块
				modal.pageNum(1);
				modal.pageSize(7);
				modal.lastPageNum(1);
				modal.pageBar([]);
			}
		};

		var modal = {
			content: ko.observable(),
			smslist: ko.observableArray([]),
			statusTypeItems: ko.observableArray(["全   部", "已发送", "未发送"]),
			selectedStatusType: ko.observable({ name: ko.observable("全   部"), value: ko.observable(0) }),
			recieverNames: ko.observable(""),
			statusTypeName: ko.observable("已发送"),
			clickStatus: function(index, name) {
				// 初始化分页组件
				info.resetPageModel();
				modal.selectedStatusType().name(name);
				modal.selectedStatusType().value(index);
				info.loadSmsList();
			},
			lookDetail: function(sms) {
				app.setRoot("view/desktop/smsSender", null, "smsTabCon-container", {
					smslist: info,
					id: sms.id,
					pageNum: modal.pageNum(),
					content: modal.content(),
					statusTypeName: modal.selectedStatusType().name(),
					statusTypeValue: modal.selectedStatusType().value()
				});
			},
			lookSMSUserDetail: function(sms) {
				app.setRoot("view/desktop/smsResultDetail", null, "smsTabCon-container", {
					smslist: info,
					sms: sms
				});
			},
			onSearchClick: function() {
				info.resetPageModel();
				info.loadSmsList();
			},
			onSearchKeyDown: function(data, event) {
				if (event.keyCode === 13) {
					info.resetPageModel();
					info.loadSmsList();
				}

				return true;
			},

			// check模块
			checkedIds: ko.observableArray([]),
			checkAll: function() {
				$('#smsList-container table tbody input[type="checkbox"]').each(function(index, item) {
					$(item).prop('checked',  $("#smsListCheckAll").get(0).checked);
					// 更新checkedIds内容
					modal.checkedIds([]);
					if($("#smsListCheckAll").get(0).checked) {
						modal.checkedIds.push($(item).attr('id'));
					}
				});

				return true;
			},
			check: function(sms) {
				if($('#' + sms.id + ":checked").val()) {
					modal.checkedIds.push(sms.id);
				} else {
					modal.checkedIds.remove(sms.id);
				}

				return true;
			},

			// 短信操作模块
			sendSMS: function() {
				app.setRoot("view/desktop/smsSender", null, "smsTabCon-container", {
					smslist: info,
					pageNum: modal.pageNum(),
					content: modal.content(),
					statusTypeName: modal.selectedStatusType().name(),
					statusTypeValue: modal.selectedStatusType().value()
				});
			},

			removeSMS: function() {
				if(modal.checkedIds().length < 1) {
					layer.alert('请选择要删除的短信记录', {icon: 2});
					return;
				}

				layer.confirm("是否要删除选中短信记录", {icon: 3, title:'确认删除'}, function(index) {
					$.ajax({
						url: "/agsupport/sms/remove",
						type:"POST",
						data: {
							ids: modal.checkedIds().join(',')
						},
						dataType:"json",
						success: function (data) {
							layer.close(index);
							if(!data.success) {
								layer.msg('删除失败', {time: 2000});
								return;
							}
							layer.msg('删除成功', {time: 2000});
							// 清空checkedIds
							modal.checkedIds([]);
							info.loadSmsList();
						}
					});
				});

			},

			// 分页模块
			pageNum : ko.observable(1), //当前页
			pageSize : ko.observable(7),//每页条数
			lastPageNum : ko.observable(1),//最后一页
			pageBar : ko.observableArray([]),

			onPageClick: function(pageNum) {
				if (pageNum == "..." || pageNum == modal.pageNum()) {
					return;
				}

				modal.pageNum(pageNum);

				info.loadSmsList();
			}
		};

		info.init();

		return modal;
	}
);