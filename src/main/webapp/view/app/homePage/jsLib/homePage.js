var socket, initSocket, loopInitSocket, loopInitSocket_idto, warningTimes = 5;

initSocket = function () {
	// IE浏览器没必要连接SOCKET服务端
	if(layer.ie) {
		return;
	}

	socket = WebSocket ? new WebSocket('ws://127.0.0.1:11112') : null;
	if(socket) {
		socket.onopen = function() {
			//console.log('连接建立...');
		};
		socket.onerror = function() {
			//console.log('连接出错...');
		};
		socket.oneclose = function(event) {
			//console.log('连接关闭...');
		};
		socket.onmessage = function(event) {
			var data = event.data;
			//console.log('接收到服务端的响应数据: ', data);
			if(data === 'close') {
				socket.close();
			}
		};
	} else {
		throw new Error('浏览器不支持WebSocket...');
	}
};

initSocket();

loopInitSocket = function() {
	// IE浏览器没必要连接SOCKET服务端
	if(layer.ie) {
		return;
	}

	if (socket) {
		loopInitSocket_idto = setTimeout(function () {
			if (socket.readyState === 1) {
				loopInitSocket_idto = undefined;
			} else {
				socket.close();
				initSocket();
				loopInitSocket_idto = undefined;
				if(warningTimes === 0) {
					//layer.alert("连接通讯服务一直失败，请重新启动通讯服务试试", { icon: 2 });
				} else {
					loopInitSocket();
				}
				if(warningTimes >= 0) {
					warningTimes = warningTimes - 1;
				}
			}
		}, 1000);
	}
};

loopInitSocket();

function getRootPath(){
    return location.protocol+"//" + location.host;
}

var serviceList={
    iconService: top.agsupportUrl + "/appauthor/listByLoginName",
    noticeService: top.agsupportUrl + "/platformNotice/list",
    todoService: top.agsupportUrl + "/resources/listApplyRecords",
    todoService1: top.agsupportUrl + "/swuser/findMyAuditRecords",
    dataService: top.agsupportUrl + "/datacatalog/findDataRecords"
};

var systemList = new Array();

$.ajax({
	url: top.agsupportUrl + "/thirdappsys/listAuthoredApps",
	type:"post",
	dataType:"json",
	async: false,
	data: {start: 1, rows: 1000, page: 1, loginName: top.loginName },
	success: function (data) {
		var rows = data.rows;
		for(var i=0; i<rows.length; i++) {
			var row = rows[i];
			if(row.authentication === '1' && row.useSso === '0') {
				row.isNeedLogin = '1';
			} else {
				row.isNeedLogin = '0';
			}

			if(row.status === '1' && row.appUrl) {
				// 首页url需特别处理，线上环境有71、78两套, 但用的是同一套库
				row.appUrl = row.appUrl.replace(/(10\.194\.170\.71|10\.194\.170\.78|127\.0\.0\.1)/, location.host);
				systemList.push(row);
			}
		}

	},
	error: function () {
	}
});

var initCount=0;
window.initDeskIcon = function() {
    $.ajax({
        url: serviceList.iconService + '?ti=' + new Date().getTime(),
		type:"POST",
		data: {
			loginName: top.loginName
		},
		dataType:'json',
        success:function(userSysList) {
        	$("#deskIcon").empty();
            for(var key in userSysList) {
				var system = getSystem(userSysList[key].appId);

				if (!system || 'del' === userSysList[key].authorizeStatus) {
					continue;
				} else {
					system.isUserBinded = true;
				}

				var checkedImgHtmlContent = '';
				if(system.useSso === '0' && system.authentication === '1') {
					system.cancelProxyLogin = (userSysList[key].cancelProxyLogin == 1);
					if(system.cancelProxyLogin) {
						checkedImgHtmlContent = '<span title="点击绑定用户" style="left: 2px; bottom: 2px; position: absolute" onclick="toggleCheckedImg(this);"><img src="images/unchecked.png" style="height:16px; width:16px;"  /></span>';
					} else {
						checkedImgHtmlContent = '<span title="取消绑定用户" style="left: 2px; bottom: 2px; position: absolute" onclick="toggleCheckedImg(this);"><img src="images/checked.png" style="height:16px; width:16px;"  /></span>';
					}
				}
				var liHtmlContent = ''
					+ '<li class="desktop_icon" data-name="' + userSysList[key].appId + '" data-login-name="' + userSysList[key].loginName + '">'
					+ '<span class="icon">'
						+ '<img src="' + top.agsupportUrl + '/' + system.iconAddr + '" />'
						+ checkedImgHtmlContent
					+ '</span>'
					+ '<div style="color:white" class="text">' + system.appName + '</div>'
					+ '</li>';
				var li = $(liHtmlContent);

				li.click(
					(function (userSys, sys) {
						return function () {
							login(sys.appSysId, userSys.appLoginName, userSys.appPassword, false);
						}
					})(userSysList[key], system)
				);

				// 绑定右键点击事件
				li.contextMenu('homePage-context-menu', {
					bindings: {
						'menu-system-delete': removeSys
					}
				});

				$("#deskIcon").append(li);

				initByCount(++initCount);
			}

			// 添加必须在桌面上显示的应用
			for(var i=0; i<systemList.length; i++) {
            	var sysItem = systemList[i];
				if(sysItem.isMustShowInDesktop === '1' && !isDeleted(sysItem, userSysList) && sysItem.isSetVisibleRange != '1' && !sysItem.isUserBinded) {
					var checkedImgHtmlContent = '';
					if(sysItem.appLoginUrl) {
						sysItem.cancelProxyLogin = true;
						checkedImgHtmlContent = '<span title="点击绑定用户" style="left: 2px; bottom: 2px; position: absolute" onclick="openSaveUserDialog(this);"><img src="images/unchecked.png" style="height:16px; width:16px;"  /></span>';
					}

					var liHtmlContent = ''
						+ '<li class="desktop_icon" data-name="' + sysItem.appSysId + '" data-login-name="">'
						+ '<span class="icon">'
							+ '<img src="' + top.agsupportUrl + '/' + sysItem.iconAddr + '" />'
							+ checkedImgHtmlContent
						+ '</span>'
						+ '<div style="color: white" class="text">' + sysItem.appName + '</div>'
						+ '</li>';
					var li = $(liHtmlContent);

					// 绑定右键点击事件
					li.contextMenu('homePage-context-menu', {
						bindings: {
							'menu-system-delete': removeSys
						}
					});

					li.click(
						(function (sys) {
							return function () {
								login(sys.appSysId, '', '', false);
							}
						})(sysItem)
					);

					$("#deskIcon").append(li);

					initByCount(++initCount);
				}
			}

			var addIcon=$("<li class='desktop_icon'><span class='icon'><img src='icon/addRemove.png'/></span><div class='text'>添加</div></li>");
			// 添加删除点击事件绑定
			addIcon.click((function () {
				return function () {
					addRemoveSystem();
				}
			})());
			$("#deskIcon").append(addIcon);
			initByCount(++initCount);
        },
        error:function() {
            console.error("获取系统列表失败！！");
        }
    });
}

function initNotice() {
	if(window.myroll) {
		clearInterval(window.myroll);
		try {
			delete window.myroll;
		} catch(error) {
			window.myroll = undefined;
		}
	}

    $.ajax({
    	url:serviceList.noticeService + '?ti=' + new Date().getTime(),
		type: "POST",
		data: {isManagePage: false, loginName: top.loginName, rows: 12},
		dataType:'json',
		async: false,
    	success:function(data) {
			var list = data.rows;
			var liContents = '';
			for(var i=0; i<list.length; i++) {
				var title = list[i].title;
				if(list[i].emergencyLvl == 2) {// 紧急度高
					title = '<font style="color:#F60;">（重要）&nbsp;' + title + "</font>";
				}

				if(list[i].isTop != null && list[i].isTop == '1') {
					liContents += '<li onclick="showNoticeDetail(\'' + list[i].id + '\')" ><a class="noticeName" href="#" title="' + list[i].title + '"><font style="color:#F60;">[置顶]</font>&nbsp;' + title + '</a><span>' + list[i].noticeTime.split(/\s/)[0] + '</span></li>';
				} else {
					liContents += '<li onclick="showNoticeDetail(\'' + list[i].id + '\')" ><a class="noticeName" href="#" title="' + list[i].title + '">' + title + '</a><span>' + list[i].noticeTime.split(/\s/)[0] + '</span></li>';
				}
        	}

			$("#platformNotice").html(liContents);

			// 长度要超出ul的范围, 进行滚动效果处理
			if(list.length > 6) {
				window.textRoll = function () {
					$("#platformNotice li:first").animate({
						marginTop: "-36px"
					}, 2000, function () {
						$(this).css("marginTop", "0").appendTo('#platformNotice');
					});
				};
				window.myroll = setInterval(window.textRoll, 2000);
				$("#platformNotice li").hover(function () {
					clearInterval(window.myroll);
					try {
						delete window.myroll;
					} catch(error) {
						window.myroll = undefined;
					}
				}).mouseout(function () {
					if(!window.myroll) {
						window.myroll = setInterval(textRoll, 2000);
					}
				});
			}
		},
		error:function(){
			layer.msg('获取公告失败', { time: 1000 });
		}
	});
}

function initTodo(){
	var actList= [], regList = [];// 抽离出来，方便css处理

	var loginUserName = top.loginName;
	$.ajax({
	    url:serviceList.todoService + '?ti=' + new Date().getTime(),
		async: false,
	    data:{
	    	loginName: loginUserName,
			approvalStatusType: 1,
			pageNum: 1,
			pageSize: 100
		},
		dataType : "json",
	    success:function(result) {
	    	if(result.success) {
				actList = result.content.list || [];
				for(var i=0; i<actList.length; i++) {
					var serviceNames = '';
					actList[i].layers = actList[i].layers || [];
					for(var key in actList[i].layers) {
						if(key != 0) {
							serviceNames += '、';
						}

						serviceNames += actList[i].layers[key].nameCn;
					}

					actList[i].resourcesList = actList[i].resourcesList || [];
					for(var key in actList[i].resourcesList) {
						if(key != 0) {
							serviceNames += '、';
						}

						serviceNames += actList[i].resourcesList[key].serviceName;
					}

					var text = "申请人\"" + actList[i].applyUser + "\"关于[" + serviceNames + "]的申请";
					var li ="<li class='schedule_service' id='" + actList[i].id + "'><a href='javascript:void(0)' title='" + text + "' onclick=\"audit('"+actList[i].id + "','服务审核', '" + actList[i].applyingUser.loginName + "')\"><span>[待审核]</span>&nbsp;申请人\"" + actList[i].applyUser + "\"关于[" + serviceNames + "]的申请</a></li>";
					$(li).prependTo($("#schedule"));
				}
			}
	    },
	    error:function(){
	        layer.msg('获取待办列表失败', { time: 2000 });
	    }
	});

	$.ajax({
		url:serviceList.todoService1 + '?ti=' + new Date().getTime(),
		data:{
			"loginName":loginUserName
		},
		async: false,
		dataType : "json",
		success:function(result) {
			regList = result;
			for(var i=0; i<result.length; i++) {
				var li ="<li class='schedule_service' id='" + result[i].id + "'><a href='javascript:void(0)' onclick=\"audit('" + result[i].id + "', '平台用户注册审核', '" + result[i].loginName + "')\"><span>[待审核]</span>&nbsp;平台用户 \"" + result[i].userName + "\" 注册申请</a></li>";
				$(li).prependTo($("#schedule"));
			}
		},
		error:function(){
			layer.msg('获取用户注册申请列表失败', { time: 1000 });
		}
	});
	
	// 配置数据上报的待办事项
	$.ajax({
		url: serviceList.dataService + '?ti=' + new Date().getTime(),
		data:{
			"loginName":loginUserName
		},
		dataType : "json",
		success: function(result) {
			for(var i=0; i<result.length; i++) {
				var text = "平台用户 \"" + result[i].username + "\" 上报[" + (result[i].tablename==null?"":result[i].tablename) + "]的" + result[i].numberall + "条记录";
				var li =$("<li class='schedule_service'><a href='javascript:void(0)' title='" + text + "'><span>[待审核]</span>&nbsp;" + text + "</a></li>");
				li.prependTo($("#schedule")).click(
					(function(tableRecord) {
						return function() {
							// alert(tableRecord.tablename);
							layer.open({
								type: 2,
								content: ["/awater/view/app/homePage/metaDataAudit.html?id=" + tableRecord.id],
								shadeClose: true,
								title: tableRecord.tablename + ' 数据审核',
								area: ['80%', '530px']
							});
						}
					})(result[i])
				);
			}

			if(actList.length > 0 || regList.length > 0 || result.length > 0) {
				var bodyHeight = document.body.clientHeight || document.documentElement.clientHeight;
				var windowAllowedMaxHeight = bodyHeight - $("#ptgg").height() - 100;
				var height = windowAllowedMaxHeight;
				if(windowAllowedMaxHeight > (6*36 + 20)) {
					height = 6*36 + 20;
				}
				$("#schedule").css({ "height": (actList.length + regList.length + result.length) * 36 + 20 });
				$(".schedule_wrapper").css({ "height": height });

				$("#dbsx").show();
			}
		},
		error:function() {
			if(actList.length > 0 || regList.length > 0) {
				var bodyHeight = document.body.clientHeight || document.documentElement.clientHeight;
				var windowAllowedMaxHeight = bodyHeight - $("#ptgg").height() - 100;
				var height = windowAllowedMaxHeight;
				if(windowAllowedMaxHeight > (6*36 + 20)) {
					height = 6*36 + 20;
				}
				$("#schedule").css({ "height": (actList.length + regList.length) * 36 + 20 });
				$(".schedule_wrapper").css({ "height": height });

				$("#dbsx").show();
			}

			layer.msg('获取配置数据上报列表失败', { time: 1000 });
		}
	});
}

function audit(instanceId, title, applyingLoginName) {
    window.parent.openAuditPanalInHomePage(title, instanceId, applyingLoginName, {
        // 成功的回调方法
        initData: function() {
            $("#schedule").children("#" + instanceId).remove();
            //如果最后一条记录被删除,则隐藏div
            if($("#schedule li").length==0){
            	$("#dbsx").hide();
            }
        }
    });
}

function showNoticeDetail(id){
	if(layer.ie == 8) {// IE8下特别处理
		window.open("/awater/view/noticeDetail/noticeDetail.html?id=" + id);
	} else {
		layer.open({
			type: 2,
			content: ["/awater/view/noticeDetail/noticeDetail.html?id="+id],
			shadeClose: true,
			title: false,
			area: ['99%', '99%']
		});
	}
}

//发布公告
function release() {
	window.parent.releaseNoticePanelInHomePage('通知公告发布', {
		// 成功的回调方法
		initData: function() {
			// 在IE下，initNotice方法调用后莫名其妙增加随机几个空行li元素
			// initNotice();
			location.reload();
	}});
}
function moreData(){
	layer.open({
		type: 2,
		content: ["/awater/view/noticeDetail/morePlatformNotice.html?ti=" + new Date().getTime(), 'no'],
		title: "通知公告",
		area: ['95%', '98%'],
		btn: [],
		end: function () {
		 	location.reload();
		}
	});
}

function manage(){
	layer.open({
		type: 2,
		content: ["/awater/view/noticeDetail/platformNotice.html?ti=" + new Date().getTime(), 'no'],
		title: "通知公告管理",
		area: ['95%', '98%'],
		btn: [],
		end: function () {
			location.reload();
		}
	});
} 
 
function initByCount(count){
    if(count>=1){
        initPage();
    }
}

function login(appId, loginName, password, encrypt) {
	var sys = getSystem(appId);
    if(sys.useSso === '0' && sys.authentication === '1') {// 非单点登录的鉴权系统
		if(sys.cancelProxyLogin) {
			if(sys.openType == 1) {// 在首页桌面直接打开
				layer.open({
					type: 2,
					content: sys.originalAppLoginUrl,
					title: sys.appName,
					offset: '2px',
					area: ['80%', '100%'],
					btn: []
				});
			} else if(sys.openType == 0) {// 以tab页打开
				if(sys.useIE == 1 && !layer.ie && socket && socket.readyState === 1) {
					try {
						socket.send(getRootPath() + '/awater/spa.html?appLoginUrl=&appUrl=' + sys.originalAppLoginUrl + '&loginName=&password=');
					} catch(e) {
						window.open(sys.originalAppLoginUrl);
					}
				} else {
					window.open(sys.originalAppLoginUrl);
				}
			}

			return;
		}

        var index;
        var password = encrypt ? hex_md5(password) : password;
        $.ajax({
            url: sys.appLoginUrl,
            type: 'post',
			dataType:'json',
            data: {loginName: loginName, password: password},
            beforeSend: function () {
                index = layer.msg('正在登录业务系统', {
                    icon: 16,
                    anim: -1,
                    time: 800000,// 800S关闭
                    fixed: false
                });
            },
            success: function (data) {
            	var realUrl = data.success ? $.trim(sys.appUrl) : ($.trim(sys.originalAppLoginUrl) || $.trim(sys.appUrl));
            	if(sys.openType == 1) {// 在首页桌面直接打开
					layer.open({
						type: 2,
						content: realUrl,
						title: sys.appName,
						offset: '2px',
						area: ['80%', '100%'],
						btn: []
					});
				} else if(sys.openType == 0) {// 以tab页打开
					if(sys.useIE == 1 && !layer.ie && socket && socket.readyState === 1) {
						try {
							socket.send(getRootPath() + '/awater/spa.html?appLoginUrl=' + $.trim(sys.appLoginUrl) + '&appUrl=' + realUrl + '&loginName=' + (loginName || '') + '&password=' + (password || ''));
						} catch(e) {
							window.open(realUrl);
						}
					} else {
						window.open(realUrl);
					}
				}
            },
            error: function () {
				//layer.close(index);
                layer.msg("登录失败", { time: 2000 });
				if(sys.useIE == 1 && !layer.ie && socket && socket.readyState === 1) {
					try {
						socket.send(getRootPath() + '/awater/spa.html?appLoginUrl=&appUrl=' + sys.originalAppLoginUrl + '&loginName=&password=');
					} catch(e) {
						window.open(sys.originalAppLoginUrl);
					}
				} else {
					window.open(sys.originalAppLoginUrl);
				}
            },
            complete: function() {
                layer.close(index);
            }
        });
    } else {
		if(sys.openType == 1) {// 在首页桌面直接打开
			layer.open({
				type: 2,
				content: sys.appUrl || sys.originalAppLoginUrl,
				title: sys.appName,
				offset: '2px',
				area: ['80%', '100%'],
				btn: []
			});
		} else if(sys.openType == 0) {// 以tab页打开
			if(sys.useIE == 1 && !layer.ie && socket && socket.readyState === 1) {
				try {
					socket.send(getRootPath() + '/awater/spa.html?appLoginUrl=' + $.trim(sys.appLoginUrl) + '&appUrl=' + ($.trim(sys.appUrl) || $.trim(sys.originalAppLoginUrl)) + '&loginName=' + (loginName || '') + '&password=' + (password || ''));
				} catch(e) {
					window.open(realUrl);
				}
			} else {
				window.open($.trim(sys.appUrl) || $.trim(sys.originalAppLoginUrl));
			}
		}
    }
}

function addRemoveSystem() {
    layer.open({
        type: 2,
        content: 'sysCenter.html?ti=' + new Date().getTime(),
        title: '业务系统中心',
		offset: '2px',
        area: ['1100px', '580px'],
        btn: []
    });
}

function getSystem(appId){
	for(var index in systemList) {
		if (systemList[index].appSysId === appId) {
			return systemList[index];
		}
	}
}

function toggleCheckedImg(item) {
	if(window.event){//IE下阻止冒泡
		event.cancelBubble  = true;
	} else{
		event.stopPropagation();
	}

	var sys = getSystem($(item).closest("li").attr("data-name"));
	var cancelProxyLogin = $(item).attr('title') === '取消绑定用户';
	$.ajax({
		url: top.agsupportUrl + '/appauthor/save',
		type: 'post',
		dataType:'json',
		data: {
			loginName: loginName,
			appId: sys.appSysId,
			cancelProxyLogin: (cancelProxyLogin ? 1 : 0)
		},
		success: function (data) {
			if(cancelProxyLogin) {
				$(item).attr('title', '点击绑定用户');
				$(item).find("img").attr('src', 'images/unchecked.png');
				sys.cancelProxyLogin = true;
			} else {
				$(item).attr('title', '取消绑定用户');
				$(item).find("img").attr('src', 'images/checked.png');
				sys.cancelProxyLogin = false;
			}
		}
	});

	return false;
}

function openSaveUserDialog(item) {
	var isSaveUserInfoSuccess = false;

	if(window.event){//IE下阻止冒泡
		event.cancelBubble  = true;
	} else{
		event.stopPropagation();
	}
	if($(item).attr('title') === '取消绑定用户') {
		$(item).attr('title', '点击绑定用户');
		$(item).find("img").attr('src', 'images/unchecked.png');
		return;
	} else {
		$(item).attr('title', '取消绑定用户');
		$(item).find("img").attr('src', 'images/checked.png');
	}


	var sys = getSystem($(item).closest("li").attr("data-name"));
	var divHtmlContent = ''
		+ '<div id="password-edit-container">'
		+ '<input class="txt03" type="hidden" name="appId" value="' + sys.appSysId + '" disabled />'
		+ '<div class="form-item">'
		+ '<span class="form-label">系统名称:</span>'
		+ '<div class="input-block">'
		+ '<input class="txt03" type="text" name="showName" value="' + sys.appName + '" disabled />'
		+ '</div>'
		+ '</div>'
		+ '<div class="form-item">'
		+ '<span class="form-label">系统用户名:</span>'
		+ '<div class="input-block">'
		+ '<input class="txt03" type="text" name="sysLoginName" value="' + $.trim(sys.publicUserName) + '"/>'
		+ '&nbsp;&nbsp;<span class="invalid-msg"></span>'
		+ '</div>'
		+ '</div>'
		+ '<div class="form-item">'
		+ '<span class="form-label">系统密码:</span>'
		+ '<div class="input-block">'
		+ '<input class="txt03" type="password" name="sysLoginPass" value="' + $.trim(sys.publicPwd) + '" />'
		+ '&nbsp;&nbsp;<span class="invalid-msg"></span>'
		+ '</div>'
		+ '</div>'
		+ '<div id="conn-msg" style="text-align: center; color: #FF7F27;">'
		+ '</div>'
		+ '</div>';

	layer.open({
		content: divHtmlContent,
		title: '保存业务系统用户信息',
		area: ['650px', '400px'],
		btn: ['确定', '测试连接', '取消'],
		resize: false,
		btnAlign: 'c',
		yes: function (index) {
			var appId = $('input[name="appId"]').val();// 第三方系统编码
			var sysLoginName = $('input[name="sysLoginName"]').val();// 第三方登录用户
			var sysLoginPass = $('input[name="sysLoginPass"]').val();// 第三方登录密码

			if (!$.trim(sysLoginName)) {
				$('.invalid-msg').text('');
				$('input[name="sysLoginName"]').parent('div').find('span').text('用户名不能为空');
				return false;
			}

			if (!$.trim(sysLoginPass)) {
				$('.invalid-msg').text('');
				$('input[name="sysLoginPass"]').parent('div').find('span').text('密码不能为空');
				return false;
			}

			var appSysConnMsgs = ['正在连接系统中.', '正在连接系统中..', '正在连接系统中...', '正在连接系统中....'];
			var appSysConnMsgIndex = 0;
			function showAppSysConnMsg() {
				$("#conn-msg").css("color", "#FF7F27").text(appSysConnMsgs[appSysConnMsgIndex++%4]);
			}
			var appSysConnMsgShowId, checkUserInfoSuccess = false;

			$.ajax({
				xhrFields: { withCredentials: true },
				url: sys.appLoginUrl,
				async: false,
				data: "loginName=" + sysLoginName + "&password=" + sysLoginPass,
				dataType:'json',
				beforeSend: function() {
					appSysConnMsgShowId = setInterval(showAppSysConnMsg, 500);
				},
				complete: function() {
					if(appSysConnMsgShowId) {
						clearInterval(appSysConnMsgShowId);
						appSysConnMsgShowId = null;
					}
				},
				success: function(data) {
					if(data.success) {
						$("#conn-msg").css("color", "green").text("连接成功！");
						checkUserInfoSuccess = true;
					} else {
						$("#conn-msg").css("color", "#f55").text("连接失败，请核对输入的用户名和密码信息！");
					}
				},
				error: function () {
					if(appSysConnMsgShowId) {
						clearInterval(appSysConnMsgShowId);
						appSysConnMsgShowId = null;
					}
					$("#conn-msg").css("color", "#f55").text("连接失败，请核对输入的用户名和密码信息！");
				}
			});

			if(!checkUserInfoSuccess) {
				return;
			}

			// 保存第三方业务系统用户和密码信息
			$.ajax({
				xhrFields: {withCredentials: true},
				url: '/agsupport/appauthor/save',
				type: 'POST',
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				data: {
					loginName: loginName,
					appId: appId,
					authorizeStatus: 'ok',
					appLoginName: sysLoginName,
					appPassword: sysLoginPass
				},
				dataType: 'json',
				success: function (data) {
					if (data.success) {
						layer.msg('添加成功', {time: 2000});
						isSaveUserInfoSuccess = true;
						location.reload();
					} else {
						layer.msg('添加失败', {time: 2000});
					}
					// 关闭弹出确认框
					layer.close(index);
				},
				error: function () {
					layer.msg('添加失败', {time: 2000});
				}
			});
		},
		success: function (layer) {
			$(".layui-layer-btn-c a:eq(1)").removeClass('layui-layer-btn1');
			$(".layui-layer-btn-c a:eq(1)").addClass('layui-layer-btn3');
			//layer[0].childNodes[3].childNodes[1].attributes[0].value='layui-layer-btn3';
			$(".layui-layer-content").css("min-height", "280px");
		},
		btn2: function (index) {
			var appId = $('input[name="appId"]').val();// 第三方系统编码
			var sysLoginName = $('input[name="sysLoginName"]').val();// 第三方登录用户
			var sysLoginPass = $('input[name="sysLoginPass"]').val();// 第三方登录密码

			if (!$.trim(sysLoginName)) {
				$('.invalid-msg').text('');
				$('input[name="sysLoginName"]').parent('div').find('span').text('用户名不能为空');
				return false;
			}

			if (!$.trim(sysLoginPass)) {
				$('.invalid-msg').text('');
				$('input[name="sysLoginPass"]').parent('div').find('span').text('密码不能为空');
				return false;
			}

			var connMsgs = ['正在连接系统中.', '正在连接系统中..', '正在连接系统中...', '正在连接系统中....'];
			var connMsgsIndex = 0;

			function showConnMsg() {
				$("#conn-msg").css("color", "#FF7F27").text(connMsgs[connMsgsIndex++ % 4]);
			}

			var connMsgsShowId;

			$.ajax({
				xhrFields: {withCredentials: true},
				url: sys.appLoginUrl,
				data: "loginName=" + sysLoginName + "&password=" + sysLoginPass,
				dataType: 'json',
				beforeSend: function () {
					connMsgsShowId = setInterval(showConnMsg, 500);
				},
				complete: function () {
					if (connMsgsShowId) {
						clearInterval(connMsgsShowId);
						connMsgsShowId = null;
					}
				},
				success: function (data) {
					if (data.success) {
						$("#conn-msg").css("color", "green").text("连接成功！");
					} else {
						$("#conn-msg").css("color", "#f55").text("连接失败，请核对输入的用户名和密码信息！");
					}
				},
				error: function () {
					if (connMsgsShowId) {
						clearInterval(connMsgsShowId);
						connMsgsShowId = null;
					}
					$("#conn-msg").css("color", "#f55").text("连接失败，请核对输入的用户名和密码信息！");
				}
			});

			return false;
		},
		end: function() {
			if(!isSaveUserInfoSuccess) {
				$(item).attr('title', '点击绑定用户');
				$(item).find("img").attr('src', 'images/unchecked.png');
			}
		}
	});

	return false;
}

function isDeleted(sysItem, userSysList) {
	var i, result = false;
	for(i=0; i<userSysList.length; i++) {
		if(sysItem.appSysId === userSysList[i].appId) {
			if(userSysList[i].authorizeStatus === 'del') {
				result = true;
				break;
			}
		}
	}

	return result;
}

function removeSys(item) {
	var id = $(item).attr("data-name");
	layer.confirm('确认要移除[' + getSystem(id).appName + ']吗?', {
		icon: 3,
		title: '提示'
	}, function (index) {
		// 删除系统
		$.ajax({
			xhrFields: {withCredentials: true},
			url: "/agsupport/appauthor/remove",
			data: {
				appId: id,
				loginName: top.loginName
			},
			type: "POST",
			success: function () {
				initDeskIcon();
			},
			error: function () {
				layer.msg('移除系统失败...', {time: 1000});
			}
		});

		layer.close(index);
	});
};