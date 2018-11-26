define(["jquery", "durandal/app", "durandal/composition", "knockout", "layer", "pager", "ajaxupload"],
	function ($, app, composition, ko, layer, pager) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("feedbackListInitHandler", {
					init: function(dom) {
						that.resetModal();
						that.renderUI();
						that.bindUI();
						that.loadFeedbacks();
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

			loadFeedbacks: function() {
				$.ajax({
					url: agsupportUrl + "/feedback/listAllFeedbacks",
					type:"POST",
					data: {
						senderId: auGurit.global.userInfo.id,
						pageNum: modal.pageNum(),
						pageSize: modal.pageSize()
					},
					dataType:"json",
					success: function (data) {
						modal.feedbacks.removeAll();
						if(data.success) {
							if(!data.content.list || data.content.list.length <= 0) {
								app.setRoot("view/desktop/feedbackSender", null, "feedback-content", {
									pageNum: modal.pageNum()
								});
								return;
							}

							modal.feedbacks(data.content.list);

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
					}
				});
			},

			resetModal: function() {
				var that = this;
				modal.feedbacks([]);
				that.resetPageModel();
			},

			resetPageModel: function() {
				// 分页模块
				modal.pageNum(modal._$_param["pageNum"] || 1);
				modal.pageSize(4);
				modal.lastPageNum(1);
				modal.pageBar([]);
			}
		};

		var modal = {
			feedbacks: ko.observableArray([]),
			lookDetail: function(item) {
				app.setRoot("view/desktop/feedbackDetail", null, "feedback-content", {
					id: item.id,
					pageNum: modal.pageNum()
				});
			},

			createFeedback: function() {
				app.setRoot("view/desktop/feedbackSender", null, "feedback-content", {
					pageNum: modal.pageNum()
				});
			},

			// 分页模块
			pageNum: ko.observable(1), //当前页
			pageSize: ko.observable(4),//每页条数
			lastPageNum: ko.observable(1),//最后一页
			pageBar: ko.observableArray([]),
			onPageClick: function(pageNum) {
				if (pageNum == "..." || pageNum == modal.pageNum()) {
					return;
				}
				modal.pageNum(pageNum);
				info.loadFeedbacks();
			}
		};

		info.init();

		return modal;
	}
);