define(["jquery", "durandal/app", "durandal/composition", "knockout", "layer", "pager", "ajaxupload"],
	function ($, app, composition, ko, layer, pager) {
		var info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("feedbackSenderInitHandler", {
					init: function(dom) {
						that.resetModal();
						that.renderUI();
						that.bindUI();
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
				new AjaxUpload($("#feedback_upload_btn"), options);
			},

			bindUI: function() {
				var that = this;
			},

			resetModal: function() {
				var that = this;
				modal.ftype("0");
				modal.fileInfos([]);
				modal.ftitle('');
				modal.content('');
				modal.contentHtmlTips('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">400</span>个字');
			}
		};

		var modal = {
			ftype: ko.observable("0"),
			ftitle: ko.observable(''),
			content: ko.observable(''),
			fileInfos: ko.observableArray([]),
			contentHtmlTips: ko.observable('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">400</span>个字'),
			contentChange: function() {
				if(modal.content().length > 400) {
					modal.content(modal.content().substring(0, 400));
				}

				var retainedWords = 400 - modal.content().length;
				modal.contentHtmlTips('您可以输入<span style="color: green;">400</span>个字， 现在还剩余<span style="color: red;">' + retainedWords + '</span>个字');

				// 防止事件冒泡
				return true;
			},
			saveFeedback: function() {
				// 校验内容
				if(!$.trim(modal.ftitle())) {
					layer.alert('问题标题不能为空', { icon: 2 });
					return;
				}

				if(!$.trim(modal.content())) {
					layer.alert('问题描述不能为空', { icon: 2 });
					return;
				}

				var fileIds = '';
				for(var index=0; index<modal.fileInfos().length; index++) {
					fileIds += modal.fileInfos()[index].id;
					if(index != (modal.fileInfos().length - 1)) {
						fileIds += ',';
					}
				}

				$.ajax({
					url: agsupportUrl + "/feedback/save",
					type:"POST",
					data: {
						senderId: auGurit.global.userInfo.id,
						senderName: auGurit.global.userInfo.userName,
						ftitle: modal.ftitle(),
						content: modal.content(),
						ftype: modal.ftype(),
						fileIds: fileIds
					},
					dataType:"json",
					success: function (data) {
						if(data.success) {
							layer.msg("谢谢您的耐心反馈", { time: 2000 });
							app.setRoot("view/desktop/feedbackList", null, "feedback-content", {
								pageNum: modal._$_param["pageNum"]
							});
						} else {
							layer.msg(data.message, { time: 2000 });
						}
					}
				});
			},
			clickReturnBtn: function() {
				app.setRoot("view/desktop/feedbackList", null, "feedback-content", {
					pageNum: modal._$_param["pageNum"]
				});
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
			}
		};

		info.init();

		return modal;
	}
);