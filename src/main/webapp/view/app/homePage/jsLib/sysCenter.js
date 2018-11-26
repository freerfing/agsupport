$(function() {
	var userSysList = [], initialize, bindSearchUI, renderUI, renderSysUI, renderSysHtmlUI,
		bindUI, unbindUI, modifySysUserInfo, addSysUserInfo, removeSysUserInfo,
		openBindSysUserInfoDialog;
	initialize = function() {
		if(userSysList.length > 0) {
			userSysList.length = 0;
		}
		$("#sys-center-ul").html('');
		bindSearchUI();
		$.ajax({
			url: "/agsupport/appauthor/listByLoginName",
			type:"POST",
			async: false,
			data: {
				loginName: top.loginName
			},
			dataType:'json',
			success:function(data) {
				$.each(data, function(index, userSys) {
					var isContained = false, i;
					for(i = 0; i < systemList.length; i++) {
						if(systemList[i].appSysId === userSys.appId) {
							isContained = true;
							break;
						}
					}
					if(isContained) {
						userSysList.push(userSys);
					}
				});
			},
			error:function() {
				layer.msg('获取列表数据失败', { time: 2000 });
			}
		});
		renderUI();
	};

	bindSearchUI = function() {
		$('#sys_search_btn').off().on('click', (function(initialize) {
			return function() {
				initialize();
			}
		})(initialize));
	};

	renderUI = function() {
		var i, j;
		for(i = 0; i < systemList.length; i++) {
			var selectedUserSys = undefined;
			for(j = 0; j < userSysList.length; j++) {
				if(userSysList[j].appId === systemList[i].appSysId) {
					selectedUserSys = userSysList[j];
					break;
				}
			}

			renderSysUI(systemList[i], selectedUserSys);
			bindUI(systemList[i], selectedUserSys);
		}
	};

	// 逻辑有点复杂
	renderSysUI = function(sys, userSys) {
		// 没有保存应用-用户关联关系
		if(!userSys) {
			// 判断应用是否固定应用
			if(sys.isMustShowInDesktop === '1') {
				renderSysHtmlUI(true, false, sys.authentication === '1' && $.trim(sys.appLoginUrl),
					1, sys, userSys);
			} else {
				renderSysHtmlUI(false, true, false, 1, sys, userSys);
			}

			return;
		}

		// 保存了应用-用户关联关系，并判断是否删除状态
		if(userSys.authorizeStatus === 'del') {
			renderSysHtmlUI(false, true, false, 1, sys, userSys);
		} else {
			renderSysHtmlUI(true, false, sys.authentication === '1' && $.trim(sys.appLoginUrl), 1, sys, userSys);
		}
	};

	// mode 0: 更新 1：新增
	// hasUser 是否存在第三方业务系统账号
	renderSysHtmlUI = function(isAdded, isDeleted, hasUser, mode, sys, userSys) {
		var appLoginName, liHtmlContent, searchAppName = $('#sysShowName').val();
		if(searchAppName && sys.appName.indexOf(searchAppName) < 0) {
			return;
		}

		liHtmlContent = String()
			+ '<div class="iconContainer">'
				+ '<img src="/agsupport/' + sys.iconAddr + '" width="80px" height="80px">'
			+ '</div>'
			+ '<table>'
				+ '<tr>'
					+ '<td colspan="2">' + sys.appName + '</td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td width="15%">状态: &nbsp;</td>';
		if(hasUser) {
			appLoginName = (userSys ? ($.trim(userSys.appLoginName) || '无') : '无');
			liHtmlContent += '<td align="left"><span>已添加&nbsp;&nbsp;[关联用户:&nbsp;<a href="javascript:void(0);" id="m_' + sys.appSysId + '">' + appLoginName + '</a>]</span></td>';
		} else if(isAdded) {
			liHtmlContent += '<td align="left"><span>已添加</span></span></td>';
		} else {
			liHtmlContent += '<td align="left"><span class="span-warning">未添加</span></td>';
		}

		liHtmlContent += String()
			+ '</tr>'
			+ '<tr><td colspan="2"><div>';

		if(isAdded) {
			liHtmlContent += '<button type="button" class="btn" disabled>添加</button>';
		} else {
			liHtmlContent += '<button type="button" class="btn btn-primary"  id="a_' + sys.appSysId + '">添加</button>';
		}

		liHtmlContent += '&nbsp;&nbsp;&nbsp;';

		if(isDeleted) {
			liHtmlContent += '<button type="button" class="btn" disabled>移除</button>';
		} else {
			liHtmlContent += '<button type="button" class="btn btn-danger"  id="r_' + sys.appSysId + '">移除</button>';
		}

		liHtmlContent += String()
			+'</div></td></tr>'
			+ '</table>';

		// 移除相关事件
		//unbindUI(sys, userSys);

		if(mode === 0) {
			$("#li_" + sys.appSysId).html(liHtmlContent);
		} else {
			$("#sys-center-ul").append('<li id="li_' + sys.appSysId + '">' + liHtmlContent + '</li>');
		}

		// 绑定相关事件
		bindUI(sys, userSys);
	};

	bindUI = function(sys, userSys) {
		unbindUI(sys, userSys);

		// 添加点击操作事件
		$('#sys-center-ul').off('click', '#m_' + sys.appSysId).on('click', '#m_' + sys.appSysId, (function(sys, userSys) {
			return function() {
				modifySysUserInfo(sys, userSys);
			}
		})(sys, userSys));

		$('#sys-center-ul').off('click', '#a_' + sys.appSysId).on('click', '#a_' + sys.appSysId, (function(sys, userSys) {
			return function() {
				addSysUserInfo(sys, userSys);
			}
		})(sys, userSys));

		$('#sys-center-ul').off('click', '#r_' + sys.appSysId).on('click', '#r_' + sys.appSysId, (function(sys, userSys) {
			return function() {
				removeSysUserInfo(sys, userSys);
			}
		})(sys, userSys));
	};

	unbindUI = function(sys, userSys) {
		$("#m_" + sys.appSysId).off();
		$("#a_" + sys.appSysId).off();
		$("#d_" + sys.appSysId).off();
	};

	modifySysUserInfo = function(sys, userSys) {
		openBindSysUserInfoDialog(sys, userSys);
	};

	addSysUserInfo = function(sys, userSys) {
		if(sys.authentication === '1' && $.trim(sys.appLoginUrl)) {
			openBindSysUserInfoDialog(sys, userSys);
			return;
		}

		// 保存第三方业务系统信息
		$.ajax({
			xhrFields: { withCredentials: true },
			url: '/agsupport/appauthor/save',
			type: 'POST',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data: {
				loginName: loginName,
				appId: sys.appSysId,
				authorizeStatus: 'ok',
				appLoginName: '',
				appPassword: ''
			},
			dataType:'json',
			success: function (data) {
				if(data.success) {
					layer.msg('添加成功', { time: 2000 });
					renderSysHtmlUI(true, false, false, 0, sys, userSys);
                    parent.initDeskIcon();//渲染图标
				} else {
					layer.msg('添加失败', { time: 2000 });
				}
			},
			error: function () {
				layer.msg('添加失败', { time: 2000 });
			}
		});
	};

	removeSysUserInfo = function(sys, userSys) {
		layer.confirm('确认要移除[' + sys.appName + ']吗?', {icon: 3, title:'提示'}, function(index) {
			// 删除系统
			$.ajax({
				xhrFields: { withCredentials: true },
				url: "/agsupport/appauthor/remove",
				data: {
					id: userSys ? userSys.id : '',
					appId: sys.appSysId,
					loginName: loginName
				},
				type: "POST",
				dataType:'json',
				success:function(data) {
					if(data.success) {
						layer.msg('移除系统成功', { time: 2000 });
						userSys = data.content;
                        parent.initDeskIcon();// 渲染图标
					} else {
						layer.msg('移除系统失败', { time: 2000 });
					}

					layer.close(index);
					renderSysHtmlUI(false, true, false, 0, sys, userSys);
				},
				error:function(){
					layer.msg('移除系统失败', { time: 2000 });
				}
			});
		});
	};

	openBindSysUserInfoDialog = function(sys, userSys) {
	    // add guest pattern
        var guestUser = sys.publicUserName;
        var guestPwd = sys.publicPwd;
        if(guestUser == null) guestUser = '';
        if(guestPwd ==null) guestPwd = '';
        var userLoad = (userSys && userSys.authorizeStatus !== 'del' ? userSys.appLoginName || '' : '');
        var pwdLoad =  (userSys && userSys.authorizeStatus !== 'del' ? userSys.appPassword || '' : '');
        var user = '';
        var password = '';
        if(userLoad!=''&&pwdLoad!='') {
            user = userLoad;
            password = pwdLoad;
        }
        else{
            user = guestUser;
            password = guestPwd;
        }
		var divHtmlContent = String()
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
						+ '<input class="txt03" type="text" name="sysLoginName" autocomplete="new-password" value="' + user + '" />'
						+ '&nbsp;&nbsp;<span class="invalid-msg"></span>'
					+ '</div>'
				+ '</div>'
				+ '<div class="form-item">'
					+ '<span class="form-label">系统密码:</span>'
					+ '<div class="input-block">'
						+ '<input class="txt03" type="password" name="sysLoginPass" autocomplete="new-password" value="' +password + '" />'
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
				var checkUserInfoSuccess = false;
				var appId = $('input[name="appId"]').val();// 第三方系统编码
				var sysLoginName = $('input[name="sysLoginName"]').val();// 第三方登录用户
				var sysLoginPass = $('input[name="sysLoginPass"]').val();// 第三方登录密码

				if(!$.trim(sysLoginName)) {
					$('.invalid-msg').text('');
					$('input[name="sysLoginName"]').parent('div').find('span').text('用户名不能为空');
					return false;
				}

				if(!$.trim(sysLoginPass)) {
					$('.invalid-msg').text('');
					$('input[name="sysLoginPass"]').parent('div').find('span').text('密码不能为空');
					return false;
				}

				var appSysConnMsgs = ['正在连接系统中.', '正在连接系统中..', '正在连接系统中...', '正在连接系统中....'];
				var appSysConnMsgIndex = 0;
				function showAppSysConnMsg() {
					$("#conn-msg").css("color", "#FF7F27").text(appSysConnMsgs[appSysConnMsgIndex++%4]);
				}
				var appSysConnMsgShowId;

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
					xhrFields: { withCredentials: true },
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
					dataType:'json',
					success: function (data) {
						if(data.success) {
							layer.msg('添加成功', { time: 2000 });
							if(!userSys) {
								userSys = {
									appId: sys.appSysId,
									approveTime: '',
									authorizeStatus: "ok",
									cancelProxyLogin: "0",
									createTime: 0,
									id: "",
									loginName: loginName,
									userId: "",
									userName: ''
								};
							}
							userSys.appLoginName = sysLoginName;
							userSys.appPassword = sysLoginPass;
							bindUI(sys, userSys);// 重新绑定事件
							renderSysHtmlUI(true, false, true, 0, sys, userSys);
							layer.close(index);
                            parent.initDeskIcon();//渲染图标
						} else {
							layer.msg('添加失败', { time: 2000 });
						}
					},
					error: function () {
						layer.msg('添加失败', { time: 2000 });
					}
				});
			},
			success: function(layer) {
				$(".layui-layer-btn-c a:eq(1)").removeClass('layui-layer-btn1');
				$(".layui-layer-btn-c a:eq(1)").addClass('layui-layer-btn3');
				$(".layui-layer-content").css("min-height", "280px");
			},
			btn2: function(index) {
				var sysLoginName = $('input[name="sysLoginName"]').val();// 第三方登录用户
				var sysLoginPass = $('input[name="sysLoginPass"]').val();// 第三方登录密码

				if(!$.trim(sysLoginName)) {
					$('.invalid-msg').text('');
					$('input[name="sysLoginName"]').parent('div').find('span').text('用户名不能为空');
					return false;
				}

				if(!$.trim(sysLoginPass)) {
					$('.invalid-msg').text('');
					$('input[name="sysLoginPass"]').parent('div').find('span').text('密码不能为空');
					return false;
				}

				var connMsgs = ['正在连接系统中.', '正在连接系统中..', '正在连接系统中...', '正在连接系统中....'];
				var connMsgsIndex = 0;
				function showConnMsg() {
					$("#conn-msg").css("color", "#FF7F27").text(connMsgs[connMsgsIndex++%4]);
				}
				var connMsgsShowId;

				$.ajax({
					xhrFields: { withCredentials: true },
					url: sys.appLoginUrl,
					data: "loginName=" + sysLoginName + "&password=" + sysLoginPass,
					dataType:'json',
					beforeSend: function() {
						connMsgsShowId = setInterval(showConnMsg, 500);
					},
					complete: function() {
						if(connMsgsShowId) {
							clearInterval(connMsgsShowId);
							connMsgsShowId = null;
						}
					},
					success: function(data) {
						if(data.success) {
							$("#conn-msg").css("color", "green").text("连接成功！");
						} else {
							$("#conn-msg").css("color", "#f55").text("连接失败，请核对输入的用户名和密码信息！");
						}
					},
					error: function () {
						if(connMsgsShowId) {
							clearInterval(connMsgsShowId);
							connMsgsShowId = null;
						}
						$("#conn-msg").css("color", "#f55").text("连接失败，请核对输入的用户名和密码信息！");
					}
				});

				return false;
			}
		});
	};

	// 执行初始化
	initialize();
});
