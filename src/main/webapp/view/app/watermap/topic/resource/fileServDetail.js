define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts", "box", "bootstrapTableZhCN"],
		function ($, app, composition, ko, common, http, panal, pager, echarts, box) {
		var selectedCountArr = [0,0];
		var Info = {
			init: function() {
				var that = this;
				composition.addBindingHandler("fileServDetailInitHandler", {
					init: function(dom) {
						that.resetModel();
						that.renderUI();
						that.bindUI();
						that.initData();
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

			resetModel: function() {
				if(!modal._$_param["instanceId"]) {
					modal.selectedPanelIdx(1);
				} else {
					modal.selectedPanelIdx(2);
				}
				modal.downloadEnable(false);
				modal.applyTaskHists([]);
				modal.approvalTaskHists([]);
			},

			// 获取申请审核历史信息
			findTaskHists: function() {
				if(!modal._$_param["instanceId"]) {
					return;
				}

				$.ajax({
					url: "/agsupport/resources/findTaskHists",
					type:"post",
					dataType:"json",
					data: { instanceId: modal._$_param["instanceId"] },
					success: function (data) {
						if(data.success) {
							for(var i=0; i<data.content.length; i++) {
								if(i < 2) {
									modal.applyTaskHists.push(data.content[i]);
								} else {
									modal.approvalTaskHists.push(data.content[i]);
								}
							}
						}
					},
					error: function () {
					}
				});
			},

			// 获取地图服务资源详情
			getLayerDetail: function() {
				$.ajax({
					url: agsupportUrl + "/awater/fileCollection/getFileCollection",
					type:"post",
					dataType:"json",
					data: {
						id: modal._$_param["id"]
					},
					success: function (result) {
						if(result) {
							var layer = result;
							modal.layer().name(layer.name);
							modal.layer().createTime(layer.createTime);
							modal.layer().remark(layer.remark);
							modal.layer().source(layer.source);
							modal.layer().creatorName(layer.creatorName);
							modal.layer().creatorUnitName(layer.creatorUnitName);
							modal.layer().authorize(layer.authorize);
							modal.layer().fileMenuPath(layer.fileMenuPath);
							modal.layer().imgUrl(layer.imgUrl ? '/agsupport' + layer.imgUrl : 'style/asip/common/css/images/resource/wu.png');
							if(modal._$_param["instanceStatus"] === '1') {
                                modal.downloadEnable(true);
							} else {
								modal.downloadEnable(layer.status === '1' && layer.authorize === '1');
                            }
						}
					},
					error: function () {
						layer.msg('获取文件服务资源失败', { time : 2000 });
					}
				});
			},

			// 元素据
			initFileTable: function() {
				$('#tb_files').bootstrapTable({
					url: agsupportUrl + '/awater/file/listCollectionFiles',         //请求后台的URL（*）
					method: 'post',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					toolbar: '#file_toolbar',                //工具按钮用哪个容器
					striped: true,                      //是否显示行间隔色
					cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
					pagination: true,                   //是否显示分页（*）
					sortable: true,                     //是否启用排序
					sortOrder: "asc",                   //排序方式
					queryParams: function(params) {
						return {
                            pageSize: params.limit,   //页面大小
                            pageNum: params.offset/params.limit + 1,  //页码
                            dirId: modal._$_param["id"],
                            fileName: modal.search().fileName()
                        };
					},
					sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
					pageNumber:1,                       //初始化加载第一页，默认第一页
					pageSize: 30,                       //每页的记录行数（*）
					pageList: [30, 50, 100],        //可供选择的每页的行数（*）
					search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
					strictSearch: true,
					showColumns: true,                  //是否显示所有的列
					showRefresh: true,                  //是否显示刷新按钮
					minimumCountColumns: 2,             //最少允许的列数
					clickToSelect: true,                //是否启用点击选中行
					height: 600,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
					uniqueId: "id",                     //每一行的唯一标识，一般为主键列
					showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
					cardView: false,                    //是否显示详细视图
					detailView: false,                   //是否显示父子表
					columns: [{
						checkbox: true
					}, {
						field: 'originalFilename',
						title: '文件名称'
					}, {
						field: 'creatorUserName',
						title: '创建人'
					}, {
						field: 'createTime',
						title: '创建时间'
					}, {
						field: 'fileSize',
						title: '文件大小'
					}]
				});
			},

			clickSearchBtn: function() {
				var that = this;
				that.initFileTable();
			},

			loadApplyDoc: function() {
				app.setRoot("view/app/watermap/topic/resource/applydoc", null, "d-map-serv-apply-doc-container", {
					"instanceId": modal._$_param["instanceId"],
					"applyLoginName": modal._$_param["applyLoginName"],
					"tabIndex": modal._$_param["tabIndex"],
					"notShowReturnBtn": true
				});
			},

			initData: function(){
				var that = this;
				that.findTaskHists();
				that.getLayerDetail();
				that.loadApplyDoc();
				that.initFileTable();
			},


		};

		var modal = {
			selectedPanelIdx: ko.observable(1),
			applyUser: ko.observable(),
			downloadEnable: ko.observable(false),
			layer: ko.observable({
				imgUrl : ko.observable(),
				name : ko.observable(),
				createTime : ko.observable(),
				remark: ko.observable(),
				source: ko.observable(),
				creatorName: ko.observable(),
				creatorUnitName: ko.observable(),
				authorize: ko.observable(),
				fileMenuPath: ko.observable(),
				files: ko.observableArray([])
			}),
			search: ko.observable({
				year: ko.observable('all'),
				month: ko.observable('all'),
				fileName: ko.observable('')
			}),
			clickSearchBtn: $.proxy(Info.clickSearchBtn, Info),
			applyTaskHists: ko.observableArray([]),
			approvalTaskHists: ko.observableArray([]),
			clickPanelBtn : function(index) {
				modal.selectedPanelIdx(index);
			},
			clickReturnBtn: function() {
				// 我的审核
				if(modal._$_param["tabIndex"] == 3) {
					app.setRoot("view/app/watermap/topic/resource/tabConAudit", null, "tabCon-container", {
						"tabIndex" : modal._$_param["tabIndex"],
						"applySerialNoSearch": modal._$_param["applySerialNoSearch"],
						"applyUserNameSearch": modal._$_param["applyUserNameSearch"],
						"serviceNameSearch": modal._$_param["serviceNameSearch"],
						"statusTypeName": modal._$_param["statusTypeName"],
						"statusTypeValue": modal._$_param["statusTypeValue"],
						"pageNum":  modal._$_param["pageNum"]
					});
					return true;
				}
				// 平台审核
				if(modal._$_param["tabIndex"] == 4) {
					app.setRoot("view/app/watermap/topic/resource/applyManage", null, "tabCon-container", {
						"tabIndex" : modal._$_param["tabIndex"],
						"applySerialNoSearch": modal._$_param["applySerialNoSearch"],
						"applyUserNameSearch": modal._$_param["applyUserNameSearch"],
						"serviceNameSearch": modal._$_param["serviceNameSearch"],
						"statusTypeName": modal._$_param["statusTypeName"],
						"statusTypeValue": modal._$_param["statusTypeValue"],
						"pageNum":  modal._$_param["pageNum"]
					});
					return true;
				}

				app.setRoot("view/app/watermap/topic/resource/fileServList", null, "resCon-container", {
					"tabIndex" : modal._$_param["tabIndex"],
					"dirId" : modal._$_param["dirId"],
					"searchText": modal._$_param["searchText"],
					"applyStatusType": modal._$_param["applyStatusType"] || 0,
					"sortType": modal._$_param["sortType"] || 0,
					"viewType": modal._$_param["viewType"] || 0,
					"pageNum" : modal._$_param["pageNum"],
					"tabConApplyModule": modal._$_param["tabConApplyModule"]
				});
			},
			downloadFiles: function() {
				var index, files = $('#tb_files').bootstrapTable('getSelections');
				for(index=0; index<files.length; index++) {
					window.open(agsupportUrl + '/download/file/' + files[index].id, files[index].id);
				}
			},
            clickSubTab: function(event) {
                if(event && event.stopPropagation) {
					event.stopPropagation();
				}

				var panelTab = $(event.target);

                var index = $("#formSearch>div").index(panelTab.parent().parent());
                var allItemTemp = panelTab.parent().children().first()[0];
                if(event.target == allItemTemp){    //如果选中"全部" 那项，即第一项，那么除了第一项有选中的样式，其余的移除选中效果
                    panelTab.parent().children().not(panelTab[0]).removeClass('click_a_style');
                    panelTab.addClass('click_a_style');
                    selectedCountArr[index]=0;   // 记录年、月被选中的个数，selectedCountArr[0]项表示年，selectedCountArr[1]表示月，不包括"全部"那项。
                }else {
                    if(panelTab.hasClass('click_a_style')) {
                        panelTab.removeClass('click_a_style');
                        selectedCountArr[index]--;
                    } else {
                        panelTab.addClass('click_a_style');
                        selectedCountArr[index]++;
                    }
                }
                // console.log("第"+index+"个："+selectedCountArr[index]);
                if(selectedCountArr[index] == 0){
                    panelTab.parent().children().first().addClass('click_a_style');
                }else{
                    panelTab.parent().children().first().removeClass('click_a_style');
                }

                /* if(panelTab.hasClass('click_a_style')) {
                     panelTab.removeClass('click_a_style');
                 } else {
                     panelTab.addClass('click_a_style');
                 }*/
				return false;
			},
		};

		Info.init();

		return modal;
	});