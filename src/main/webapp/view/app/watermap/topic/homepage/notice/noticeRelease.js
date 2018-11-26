define(["jquery", "durandal/app", "durandal/composition", "knockout", "panal", "box", "layer", "ueditor", "ueditorZhCn", "xss", "easyui", "ajaxupload"],
	function ($, app, composition, ko, panal, box, layer) {
		var info = {
			init: function () {
				var that = this;

				composition.addBindingHandler("noticeReleaseInitHandler", {
					init: function (dom) {
						var panalObj = panal.getPanalByElement(dom);

						that.resetModal();
						that.renderUI();
						that.bindUI();

						that.parentPage = panalObj.param.parentPage;
					},

					update: function () {
					}
				});
			},

			renderUI: function () {
				var that = this;
				// 初始化上传组件
				var options = {
					action: agsupportUrl + "/upload/files/2",
					responseType: "json",
					name: 'file',
					inputFileId: 'releaseNoticeFile',
					onSubmit: function (files, extensions, sizes) {
						for(var i=0; i<sizes.length; i++) {
							if(sizes[i] > 104857600) {// 文件大于100M，取消上传
								layer.alert('上传的文件不能大于100M', {icon: 2});
								return false;
							}
						}
					},
					onComplete: function (file, data) {
						// 上传成功
						if(data && data.length > 0) {
							$(data).each(function(index, fileInfo) {
								modal.fileInofs.push(fileInfo);
							});
							//modal.fileInofs.push(data);
						}
					},
					onChange: function (files, extensions) {

					}
				};
				new AjaxUpload($("#file_choose_btn"), options);

				// 初始化ueditor组件
				UE.delEditor("editor");
				var ue = UE.getEditor('editor');
			},

			bindUI: function () {
				var that = this;
			},
			clickSaveBtn: function() {
				var that = this;

				var fileIds = '';
				for(var index=0; index<modal.fileInofs().length; index++) {
					fileIds += modal.fileInofs()[index].id + ',';
				}
				if(index != 0) {
					fileIds = fileIds.substring(0, fileIds.length - 1);
				}

				$.ajax({
					url: agsupportUrl + "/platformNotice/save",
					type:"POST",
					data: {
						title: modal.title(),
						emergencyLvl: modal.emergencyLvl(),
						content: UE.getEditor('editor').getContent(),
						userid: auGurit.global.userInfo.id,
						keyWord: modal.keyWord(),
						isTop: modal.topDate() === 0 ? "0" : "1",
						topDate: modal.topDate(),
						isSend: "0",
						loginName: auGurit.global.userInfo.loginName,
						orgIds: modal.orgIds(),
						fileIds: fileIds
					},
					dataType:"json",
					success: function (data) {
						if(data.success) {
							layer.msg('保存通知公告成功', {time: 2000});
							auGurit.global.secondUtlPanal.close();
						} else {
							layer.msg('保存通知公告失败', {time: 2000});
						}
					}
				});
			},

			clickPublishBtn: function() {
				var that = this;

				if(!modal.title()) {// 公告标题
					layer.alert('通知公告标题不能为空', {icon: 2});
					return;
				}
				if(!$.trim(UE.getEditor('editor').getPlainTxt())) {// 公告内容
					layer.alert('通知公告内容不能为空', {icon: 2});
					return;
				}

				if(!modal.orgIds()) {// 公告内容接收机构
					layer.alert('通知公告可见范围不能为空', {icon: 2});
					return;
				}

				var fileIds = '';
				for(var index=0; index<modal.fileInofs().length; index++) {
					fileIds += modal.fileInofs()[index].id + ',';
				}
				if(index != 0) {
					fileIds = fileIds.substring(0, fileIds.length - 1);
				}

				$.ajax({
					url: agsupportUrl + "/platformNotice/save",
					type:"POST",
					data: {
						title: modal.title(),
						emergencyLvl: modal.emergencyLvl(),
						content: UE.getEditor('editor').getContent(),
						userid: auGurit.global.userInfo.id,
						keyWord: modal.keyWord(),
						isTop: modal.topDate() === 0 ? "0" : "1",
						topDate: modal.topDate(),
						isSend: "1",
						loginName: auGurit.global.userInfo.loginName,
						orgIds: modal.orgIds(),
						fileIds: fileIds
					},
					dataType:"json",
					success: function (data) {
						if(data.success) {
							layer.msg('发布通知公告成功', {time: 2000});
							// 刷新公告发布框并刷新父页
							if(that.parentPage) {
								that.parentPage.initData();
							}

							auGurit.global.secondUtlPanal.close();
						} else {
							layer.msg('发布通知公告失败', {time: 2000});
						}
					}
				});
			},

			resetModal: function () {
				modal.title("");
				modal.content("");
				modal.keyWord("");
				modal.topDate("0");
				modal.fileInofs([]);
				modal.orgIds("");
				modal.orgNames("");
				modal.emergencyLvl("0");
			}
		};

		var modal = {
			id: ko.observable(""),
			title: ko.observable(""),
			content: ko.observable(""),
			keyWord: ko.observable(""),
			topDate: ko.observable("0"),
			emergencyLvl: ko.observable("0"),
			fileInofs: ko.observableArray([]),
			orgNames: ko.observable(""),
			orgIds: ko.observable(""),
			openOrgChoosenPage: function() {
				layer.open({
					title: ["可见范围", 'text-align: left;'],
					type: 2,
					btn: '提交',
					content: '/awater/view/desktop/chooseOrgs.html',
					btn: ['确定', '取消'],
					btnAlign: 'c',
					shade: 0,
					area:["800px", "500px"],
					yes: function(index, ct) {
						var result = $(ct).find('iframe')[0].contentWindow.callbackdata();

						if(result) {
							modal.orgIds(result.orgIds);
							modal.orgNames(result.orgNames);
						}

						layer.close(index);
					},
					success:function (ct,index) {

					}
				});
			},
			removeFile: function(data) {
				modal.fileInofs.remove(data);
			},
			clickPublishBtn: $.proxy(info.clickPublishBtn, info),
			clickSaveBtn: $.proxy(info.clickSaveBtn, info),
			clickCloseBtn: function() {
				auGurit.global.secondUtlPanal.close();
			}
		};

		info.init();

		return modal;
	}
);