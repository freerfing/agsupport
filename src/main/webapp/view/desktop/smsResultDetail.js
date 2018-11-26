define(["jquery", "durandal/app", "durandal/composition", "knockout", "layer", "box"],
	function ($, app, composition, ko, layer, box) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("smsResultDetailInitHandler", {
					init: function(dom) {
						that.resetModel();

						// 绑定短信信息对象
						modal.sms(modal._$_param["sms"]);

						that.renderUI();
						that.bindUI();
						that.initData();
					},
					
					update: function() {}
				});
			},

			initData: function() {
				var that = this;

				// 查询当前短信的接收人结果列表信息
				that.loadSmsUsers();
			},

			loadSmsUsers: function() {
				$.ajax({
					url: "/agsupport/sms/listSmsUser",
					type:"POST",
					data: {
						smsId: modal.sms().id,
						searchText: modal.searchText(),
						pageNum: modal.pageNum(),
						pageSize: modal.pageSize()
					},
					dataType:"json",
					success: function (data) {
						modal.smsUserList(data.list);

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

			renderUI: function() {
				var that = this;
			},

			bindUI: function() {
				var that = this;
			},

			resetModel: function() {
				modal.sms();
				modal.searchText('');
				modal.smsUserList([]);
				modal.checkedIds([]);

				modal.pageNum(1);
				modal.pageSize(7);
				modal.lastPageNum(1);
				modal.pageBar([]);

			}
		};

		var modal = {
			sms: ko.observable(),
			searchText: ko.observable(''),
			smsUserList: ko.observableArray(),
			resendSMS: function() {
				if(modal.checkedIds().length < 1) {
					layer.alert('没有选择接收人', {icon: 2});
					return;
				} else {
					layer.confirm("确认要给选中的" + modal.checkedIds().length + "个接收人重新发送短信吗？", {icon: 3, title:'确认发送'}, function(index) {
						$.ajax({
							url: "/agsupport/sms/resendSMS",
							type:"POST",
							data: {
								senderId: auGurit.global.userInfo.id,
								smsId: modal.sms().id,
								searchText: modal.searchText(),
								ids: modal.checkedIds().join(',')
							},
							dataType:"json",
							success: function (data) {
								layer.close(index);
								if(data.success) {
									layer.msg(data.message || '重新发送成功', {time: 2000});
								} else {
									layer.msg(data.message || '重新发送失败', {time: 2000});
								}

								// 重新加载
								modal.checkedIds([]);
								info.loadSmsUsers();
							}
						});
					});
				}
			},
			onSearchClick: function() {
				info.loadSmsUsers();
				return true;
			},
			onSearchKeyDown: function(data, event) {
				if (event.keyCode === 13) {
					info.loadSmsUsers();
				}

				return true;
			},

			// check模块
			checkedIds: ko.observableArray([]),
			checkAll: function() {
				$('#smsResultDetail-container table tbody input[type="checkbox"]').each(function(index, item) {
					$(item).prop('checked',  $("#smsResultDetailsCheckAll").get(0).checked);
					// 更新checkedIds内容
					modal.checkedIds([]);
					if($("#smsResultDetailsCheckAll").get(0).checked) {
						modal.checkedIds.push($(item).attr('id'));
					}
				});

				return true;
			},
			check: function(smsUser) {
				var id = (smsUser.id || '') + '_' + smsUser.mobile;
				if($('#' + id + ":checked").val()) {
					modal.checkedIds.push(id);
				} else {
					modal.checkedIds.remove(id);
				}

				return true;
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

				info.loadSmsUsers();
			}
		};

		info.init();

		return modal;
	}
);