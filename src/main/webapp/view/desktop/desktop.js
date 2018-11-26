/*
    桌面组件
    czz

    auGurit.global.userInfo 全局存入用户信息
*/
define(["jquery", "durandal/app", "durandal/system", "durandal/composition", "durandal/activator", "knockout", "i18nCommon", "common", "http", "panal", "mapUtils", "fakeloader", "bootstrap", "metisMenu"],
    function ($, app, system, composition, activator, ko, i18n, common, http, panal, mapUtils) {
        var currentPage = {};
        var currentPageId = "";
        var Desktop = {
            init: function () {
                var that = this;
                this.identifyFlag = false;//属性查看是否开启
                composition.addBindingHandler("initDesktopHandler", {
                    init: function (dom) {
                        // that.browserCheck();
                        that.renderUI();
                        that.bindUI();
                        $(dom).click(function () { 

                        });
                    }
                });
            },

            renderUI: function () {
                var that = this;
            },

            bindUI: function () {
                var that = this;
                that.getUserInfo();

                // 设置全局，主要是给首页调用
                window.openAuditPanalInHomePage = function (title, instanceId, applyingLoginName, sucessCallback) {
                    var top = 80;
                    var left = (window.screen.width - 800) / 2; //获得窗口的水平位置;
                    if(title === '平台用户注册审核') {
						common.openDialogPanal("view/app/watermap/topic/homepage/userAudit", title, {
							applyingUserId: instanceId,
							applyingLoginName: applyingLoginName,
							parentPage: sucessCallback
						}, 800, 500, top, left);
                    } else {
						common.openDialogPanal("view/app/watermap/topic/resource/uploadDocOrApprovalForm", title, {
							instanceId: instanceId,
							applyLoginName: applyingLoginName,
							parentPage: sucessCallback
						}, 800, 560, top, left);
                    }
                };

                window.releaseNoticePanelInHomePage = function(title, sucessCallback) {
					var top = 80;
					var left = (window.screen.width - 1000) / 2; //获得窗口的水平位置;
					common.openDialogPanal("view/app/watermap/topic/homepage/notice/noticeRelease", title, {
						parentPage: sucessCallback
					}, 1000, 580, top, left);
                }
                
            },

            //获取用户信息
            getUserInfo: function () {
                var that = this;
                var rootPath = auGurit.global.rootPath;
                var ip = rootPath.substring(0, rootPath.lastIndexOf("/", rootPath.length - 2));
                
                if(auGurit.global.userInfo)
                {
                    auGurit.global.userInfo = {"id":"","loginName":"","password":"","userName":"","orgId":null,"orgName":null,"isActive":"1","orgCode":null,"userRoleId":null,"orgUserId":null,"orgPath":null,"roleId":null,"appSysIds":null,"selfCert":"","workUnitCode":"","workUnitAddress":"","workUnitName":"","sex":"","userCode":"","mobile":"","":"","email":"","createTime":null,"memo1":null,"identitynum":"","fax":""}
                }
                
                //获取用户名称
                $.ajax({
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    url: ip + agsupportName + "/swuser/findUserAllInfoByLoginname/" + loginName,
                    data: {},
                    success: function (result, textStatus, jqXHR) {
                        auGurit.global.userInfo = result;
                        modal.userName(result.userName);

						that.loadUnReadCount();
                    }
                });

                //获取菜单项目
                $.ajax({
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    url: ip + agsupportName + "/agsupport/menuDir/getSubSysMenuByLoginName/" + loginName,
                    data: {},
                    success: function (result, textStatus, jqXHR) {
                        if (result && result.success && (result.success === true || result.success === "true")) {
                            var data = result.content;
                            
                            for (var i = 0; i < data.length; i++) {
                                data[i].visible = ko.observable(i == 0);
                                data[i].init = ko.observable(false);
                            };
                            modal.menuList(data);
                            if(modal.menuList().length > 0) {
                                that.menuClick(modal.menuList()[0]);
                            }
                        } 
                        else 
                        {
                            console.error("获取菜单出错" + url + " \n" + data);
                        }
                    }
                });

            },

			//点击我的短信按钮
			clickSmsBtn: function () {
				var left = (window.screen.width - 1240) / 2; //获得窗口的水平位置;
				common.openDialogPanal("view/desktop/sms", "我的短信", {
					loginName: loginName
				}, 1240, 550, 90, left);
			},

            // 点击反馈意见按钮
			clickFeedbackBtn: function() {
				var left = (window.screen.width - 800) / 2; //获得窗口的水平位置;
				common.openDialogPanal("view/desktop/feedback", "反馈意见", {}, 900, 550, 90, left);
            },

            //点击退出按钮
            clickQuitBtn: function () {
                var href = auGurit.global.rootPath + 'logoutByCas.do';
                location.href = href;
            },

            //点击用户名
            clickUserNameBtn: function () {
                var w = ($(window).width()-600)/2 + 'px';
                common.openDialogPanal("view/desktop/changeInfo", "修改用户信息", {
                    loginName: loginName
                }, "600px", "550px", "75px",w);
            },

            //菜单点击
            menuClick: function(item) {
				// 客户要求，在点击菜单的时候，panel需要关闭掉
                if(auGurit.global.secondUtlPanal) {
					auGurit.global.secondUtlPanal.close();
                }

                var that = this;
                if(currentPageId == item.id && item.init())
                    return;

                //清空所有资源
                that.dispose();

                currentPageId = item.id;

                var menuList = modal.menuList();
                for (var i = 0; i < menuList.length; i++) {
                    modal.menuList()[i].visible(modal.menuList()[i].id == item.id);
                    //加载一次

                    if(modal.menuList()[i].id == item.id && !modal.menuList()[i].init())
                    {
                        app.setRoot(item.url, null, item.id, { parent:that, menu:item } );
                    }
                    modal.menuList()[i].init(modal.menuList()[i].id == item.id || modal.menuList()[i].init());
                };
                
            },

            //设置当前页
            setCurrentPage: function(itemId, item)
            {
                if(currentPage[itemId] && currentPage[itemId].dispose)
                {
                    currentPage[itemId].dispose();
                    currentPage[itemId] = null;
                }
                currentPage[itemId] = item;
            },

            //设置当前页面是否重新初始化 false初始化 true不初始化
            setCurrentPageInit: function(itemId, bInit)
            {
                var menuList = modal.menuList();
                for (var i = 0; i < menuList.length; i++) {
                    if(modal.menuList()[i].id == itemId)
                    {
                        modal.menuList()[i].init(bInit);
                    }
                }
            },

            //退出是清空
            dispose: function()
            {
                try
                {
                    if(currentPage[currentPageId] && currentPage[currentPageId].dispose)
                    {
                        currentPage[currentPageId].dispose();
                    }                    
                }
                catch(e)
                {
                    console.error("dispose出错");
                    console.error(e);
                }

            },

			// 反馈意见
			loadUnReadCount: function() {
				// 获取反馈意见条数
				$.ajax({
					type: 'POST',
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					url: agsupportUrl + "/feedback/getUnreadCount/",
					data: {
						userId: auGurit.global.userInfo.id
					},
					success: function (result) {
						if(result.success) {
							modal.unReadCount(result.content);
						}
					}
				});
			}

        };

        var modal = {
			unReadCount: ko.observable(0),

            //数据
            userName: ko.observable(""),
            menuList: ko.observableArray(),
            
            //操作
            menuClick: $.proxy(Desktop.menuClick, Desktop),
			clickSmsBtn: $.proxy(Desktop.clickSmsBtn, Desktop),
			clickFeedbackBtn: $.proxy(Desktop.clickFeedbackBtn, Desktop),
            clickQuitBtn: $.proxy(Desktop.clickQuitBtn, Desktop),
            clickUserNameBtn: $.proxy(Desktop.clickUserNameBtn, Desktop)
        };

        Desktop.init();
       return modal;
    });