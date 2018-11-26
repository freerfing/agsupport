define(["jquery", "durandal/app", "durandal/composition", "knockout", "layer", "panal", "ajaxupload"],
	function ($, app, composition, ko, layer, panal) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("feedbackDetailInitHandler", {
					init: function(dom) {
						that.resetModal();
						that.renderUI();
						that.bindUI();
						that.loadFeedback();
					},

					update: function() {}
				});
			},

			renderUI: function() {
				var that = this;
				// 初始化上传组件
				var options = {
					action: agsupportUrl + "/upload/files/1",
					responseType: "json",
					name: 'file',
					inputFileId: 'feedbackFile',
					onSubmit: function (files, extensions, sizes) {
						if(modal.fileInfos().length + files.length > 3) {
							layer.alert('最多支持3张图片', {icon: 2});
							return false;
						}

						for(var i=0; i<sizes.length; i++) {
							if (!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(extensions[i])) {
								layer.alert('图片类型必须是gif,jpeg,jpg,png', {icon: 2});
								return false;
							}

							if(sizes[i] > 10485760) {// 图片文件大于10M，取消上传
								layer.alert('上传的图片文件不能大于10M', {icon: 2});
								return false;
							}
						}
					},
					onComplete: function (file, data) {
						// 上传成功
						if(data && data.length > 0) {
							$(data).each(function(index, fileInfo) {
								fileInfo.url = agsupportUrl + '/download/file/' + fileInfo.id;
								modal.fileInfos.push(fileInfo);
							});
						}
					},
					onChange: function (files, extensions) {

					}
				};
				new AjaxUpload($("#feedback_detail_upload_btn"), options);
			},

			bindUI: function() {
				var that = this;
			},

			loadFeedback: function() {
				$.ajax({
					url: agsupportUrl + "/feedback/getFeedback",
					type:"POST",
					data: {
						id: modal._$_param["id"]
					},
					dataType:"json",
					success: function (data) {
						if(data.success && data.content) {
							modal.id(data.content.id);
							modal.ftitle(data.content.ftitle);
							modal.ftype(data.content.ftype);
							modal.content(data.content.content);
							modal.senderName(data.content.senderName);
							modal.orgName(data.content.sender.orgName);
							modal.identitynum(data.content.sender.identitynum);
							modal.mobile(data.content.sender.mobile);
							modal.fax(data.content.sender.fax);
							modal.createTime(data.content.createTime);
							modal.files(data.content.files || []);
							if(data.content.children) {
								for(var i=0; i<data.content.children.length; i++) {
									modal.feedbacks.push(data.content.children[i]);
								}
							}

							// 更新用户的已读参数
							$.ajax({
								url: agsupportUrl + "/feedback/saveReadCount",
								type:"POST",
								data: {
									id: modal._$_param["id"],
									userId: auGurit.global.userInfo.id,
									readCount: modal.feedbacks().length + 1
								},
								dataType:"json",
								success: function (data) {
									// 不做处理
								}
							});
						} else {
							layer.msg(data.message || '获取反馈意见详情失败', { time: 2000 });
						}
					}
				});
			},

			resetModal: function() {
				var that = this;
				modal.id('');
				modal.ftitle('');
				modal.ftype('');
				modal.content('');
				modal.senderName('');
				modal.orgName('');
				modal.identitynum('');
				modal.mobile('');
				modal.fax('');
				modal.createTime('');
				modal.feedbacks([]);
				modal.files([]);
				modal.fileInfos([]);
				modal.replyContent('');
				modal.contentHtmlTips('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">400</span>个字');
			}
		};

		var modal = {
			id: ko.observable(),
			ftitle: ko.observable(''),
			ftype: ko.observable(''),
			content: ko.observable(''),
			senderName: ko.observable(''),
			orgName: ko.observable(''),
			identitynum: ko.observable(''),
			mobile: ko.observable(''),
			fax: ko.observable(''),
			createTime: ko.observable(''),
			feedbacks: ko.observableArray([]),
			files: ko.observableArray([]),
			fileInfos: ko.observableArray([]),
			replyContent: ko.observable(''),
			contentHtmlTips: ko.observable('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">400</span>个字'),
			contentChange: function() {
				if(modal.replyContent().length > 400) {
					modal.replyContent(modal.replyContent().substring(0, 400));
				}

				var retainedWords = 400 - modal.replyContent().length;
				modal.contentHtmlTips('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">' + retainedWords + '</span>个字');

				// 防止事件冒泡
				return true;
			},
			enableFileRemove: function(fileInfo, event) {
				$(event.currentTarget).find(".removeImgContainer").show();
			},
			disableFileRemove: function(fileInfo, event) {
				$(event.currentTarget).find(".removeImgContainer").hide();
			},
			removeFile: function(fileInfo, event) {
				modal.fileInfos.remove(fileInfo);
				$(event.currentTarget).closest(".imgContainer").remove();
			},
			saveReplyFeedback: function() {
				// 校验内容
				if(!$.trim(modal.replyContent())) {
					layer.alert('回复内容不能为空', { icon: 2 });
					return;
				}

				var fileIds = '';
				for (var index = 0; index < modal.fileInfos().length; index++) {
					fileIds += modal.fileInfos()[index].id;
					if (index != (modal.fileInfos().length - 1)) {
						fileIds += ',';
					}
				}

				$.ajax({
					url: agsupportUrl + "/feedback/save",
					type: "POST",
					data: {
						senderId: auGurit.global.userInfo.id,
						senderName: auGurit.global.userInfo.userName,
						ftitle: modal.ftitle(),
						content: modal.replyContent(),
						ftype: modal.ftype(),
						fileIds: fileIds,
						pid: modal.id()
					},
					dataType: "json",
					success: function (data) {
						if (data.success) {
							// 清空回复的相关数据
							modal.replyContent('');
							modal.contentHtmlTips('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">400</span>个字');
							modal.fileInfos([]);

							layer.msg("发布成功", {time: 2000});
							info.loadFeedback();
						} else {
							layer.msg(data.message, {time: 2000});
						}
					}
				});
			},
			clickReturnBackBtn: function() {
				app.setRoot("view/desktop/feedbackList", null, "feedback-content", {
					pageNum: modal._$_param["pageNum"]
				});
			}
		};

		info.init();

		return modal;
	}
);