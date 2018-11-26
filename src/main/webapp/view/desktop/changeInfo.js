/**
 * 修改用户信息
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts", "box", "layer","md5", "ajaxupload"],
	function ($, app, composition, ko, common, http, panal, pager, echarts, box,layer,md5) {
		var parentPage;
		var info = {
				init: function() {
					var that = this;
					composition.addBindingHandler("userInfo", {
						init:function(dom){
							var panalObj = panal.getPanalByElement(dom);
							modal.loginName(panalObj.param.loginName);
							that.parentPage = panalObj.param.parentPage;
							
							that.renderUI();
							that.bindUI();
						}
					});
				},
				renderUI: function() {
					var that = this;
					modal.password('');
					modal.password1('');
					modal.confirmPassword1('');


					//主题
					var i = 0;
					var ths = modal.themeArray();
					var themeSelect = auGurit.global.style;
					for (i=0; i<ths.length; i++) {
						if(ths[i].theme == "theme-"+themeSelect)
						{
							modal.themeSelect(ths[i]);
							break;
						}
					}

				},
				bindUI:function(){
					var that = this;
					// 获取申请用户信息
					that.loadUserInfo(modal.loginName());
				},
				loadUserInfo:function(loginName){					
					// 加载用户拓展信息及组织机构
			        $.ajax({
			        	url:agsupportUrl + '/swuser/getUserExAndOrgsById',
			        	cache:false,
						async:false,
			        	data:{"id":loginName},
			        	dataType:"json",
			        	success:function(res){  
			        		// 加载用户拓展信息
			        		modal.email($.trim(res.ex.email));
			        		modal.fax(res.ex.fax);
			        		modal.mobile(res.ex.mobile);
			        		modal.officeTel(res.ex.officeTel);
			        		modal.identitynum(res.ex.identitynum);
			        		modal.passwordOld(res.ex.password);
			        		modal.userId(res.ex.id);
			        		modal.userName(res.ex.userName);
			        		modal.loginName(res.ex.loginName);
							modal.qq(res.ex.qq);
			        		// 加载用户组织信息
			        		var or='';
			        		if(res.org!=null&&res.org.length>0&&res.org[0].orgId!=null){
			        			or=res.org[0].orgId;
			        		}
			        		modal.orgIdOld(or);

							modal.orgXpath(res.orgs.xpath);
							//OrgId 暂存 orgCode
							modal.orgId(res.orgs.orgCode);
			        		// 加载组织列表
							/*
			        		$("#orgId").html('');
			        		var str="";
			        		for(var i=0;i<res.orgs.length;i++){
			        			if(res.orgs[i].id==or){
			        				str=str+',<option value="'+res.orgs[i].id+'" selected="selected">'+res.orgs[i].xpath+'</option>';
			        			}else{
			        				str=str+',<option value="'+res.orgs[i].id+'" >'+res.orgs[i].xpath+'</option>';
			        			}
			        		}
			        		if(str!=""){
			        			str=str.substring(1);
			        			$("#orgId").html(str);
			        		}
			        		*/
			        	}
			        });
				},
				check:function(){

					var flag=false;
					// 密码校验
					var oo=modal.passwordOld();
					var o=modal.password();
					var n=modal.password1();
					var cn=modal.confirmPassword1();
					if((o==""||o==undefined)&&(n==""||n==undefined)&&(cn==""||cn==undefined)){
						flag=true;
					}else{
						// 判断原密码是否一致
						if(o!=undefined&&oo!=md5.hex_md5(o)){
							layer.alert('原密码错误', {icon: 2});
							flag=false;
							return flag;
						}else{
							// 新密码与确认密码是否一致
							if(cn!=n){
								layer.alert('新密码与确认密码不一致', {icon: 2});
								flag=false;
								return flag;
							}else if(cn==n) {   // old n!=""&&cn!=""&&cn==n
								if (n == "" || n == undefined) {
									flag = true;
								} else {
									//密码强度 检查
									var val = modal.password1();
									var lv = 0;
									if (val.match(/[a-z]/g)) lv++;
									if (val.match(/[A-Z]/g)) lv++;
									if (val.match(/[0-9]/g)) lv++;
									if (val.match(/(.[^a-z0-9A-Z])/g)) lv++;
									if (lv > 4) lv = 4;

									if (lv < 4 || val.length < 8) {
										layer.alert('新密码弱，不符合规定，请重新输入密码。', {icon: 2});
										flag = false;
										return flag;
									} else {
										flag = true;
									}
								}//else
							}//}else if(cn==n) {   // old n!=""&&cn!=""&&cn==n

						}//else

					}


					// 手机校验
					var mobile=modal.mobile();
					if(mobile!=""&&mobile!=undefined){
						if(!(/^1\d{10}/.test(mobile))){
							layer.alert('手机输入不合法', {icon: 2});
							flag=false;
							return flag;
						}
					}					
					
					// 邮箱校验
					var email=modal.email();
					if($.trim(email)){
						if(!/[A-Za-z0-9]@([A-Za-z0-9]+[.])+[A-Za-z0-9]{2,5}$/.test(email)){
							layer.alert('邮箱输入不合法', {icon: 2});
							flag=false;
							return flag;
						}
					}
					
					return flag;
				},

				clickSaveBtn:function(){
					if(this.check()){
						var id=modal.userId()==undefined?"":modal.userId();
						var loginName=modal.loginName()==undefined?"":modal.loginName();
						var userName=modal.userName()==undefined?"":modal.userName();
						var password1=(modal.password1()==undefined||modal.password1()=="")?modal.passwordOld():md5.hex_md5(modal.password1());
						var identitynum=modal.identitynum()==undefined?"":modal.identitynum();
						var officeTel=modal.officeTel()==undefined?"":modal.officeTel();
						var mobile=modal.mobile()==undefined?"":modal.mobile();
						var fax=modal.fax()==undefined?"":modal.fax();
						var email=modal.email()==undefined?"":modal.email();
						var orgId=(modal.orgId()==undefined||modal.orgId()=="")?modal.orgIdOld():modal.orgId();
						var orgIdOld=modal.orgIdOld()==undefined?"":modal.orgIdOld();
						var qq = modal.qq()==undefined?"":modal.qq();
						// 保存
						$.ajax({
							url: agsupportUrl + "/swuser/saveUserEx",
							cache:false,
							async:false,
				        	data:{
				        		"id":id,
				        		"loginName":loginName,
				        		"userName":userName,
				        		"password1":password1,
				        		"identitynum":identitynum,
				        		"officeTel":officeTel,
				        		"mobile":mobile,
				        		"fax":fax,
				        		"email":email,
				        		"orgIdOld":orgIdOld,
				        		"orgId":orgId,
								"qq":qq
				        	},
				        	dataType:"json",
				        	success: function (data) {
				        		if(data.success){
									layer.msg('修改用户信息成功');
				        			//box.alert("修改用户操作成功", "消息",{cancelBtnShow:false,clickSure:function(){
				        			//	auGurit.global.secondUtlPanal.close();
									//}});
				        		}else{
									layer.alert('修改用户操作失败', {icon: 2});
				        		}
				        	}
						});
					}
					
				},
				getAppUrl: function getAppUrl() {
					var
						urlRegexp = /^(?:[A-Za-z]+:)?\/{0,3}(?:[0-9.\-A-Za-z]+)(?::\d+)?(?:\/[^/?#]*)/,
						matchedUrlArray = window.location.href.match(urlRegexp);
					if(matchedUrlArray) {
						return matchedUrlArray[0];
					}
					return null;
				}
		};
		
		// 模板
		var modal = {
			loginName:ko.observable(),
			email:ko.observable(),
			fax:ko.observable(),
			mobile:ko.observable(),
			officeTel:ko.observable(),
			identitynum:ko.observable(),
			confirmPassword1:ko.observable(),
			password1:ko.observable(),
			password:ko.observable(),
			userName:ko.observable(),
			loginName:ko.observable(),
			userId:ko.observable(),
			passwordOld:ko.observable(),
			orgIdOld:ko.observable(),
			orgId:ko.observable(),
			orgXpath:ko.observable(),
			qq:ko.observable(),
			themeSelect: ko.observable({ theme:"theme-custom", title:"默认主题" }),
			themeArray: ko.observableArray([
				{ theme:"theme-custom", title:"默认主题" }, 
				{ theme:"theme-blue", title:"蓝色主题" }, 
				{ theme:"theme-green", title:"绿色主题" }, 
				{ theme:"theme-red", title:"红色主题" }, 
				{ theme:"theme-black", title:"黑色主题" }]),
			clickTheme: function(item){
				modal.themeSelect(item);

				var oldTheme = auGurit.global.style;
				var cookisTheme = "auGuritGlobalStyle=" + item.theme.replace("theme-", "");
				document.cookie = cookisTheme;
				auGurit.global.style = item.theme.replace("theme-", "");

				//require(["css!style/asip/" + auGurit.global.style + "/main.css"]); 

				$('#homeFrame').attr('src', $('#homeFrame').attr('src'));
				if($("link[href*='asip/" + oldTheme + "/main.css']").get(0)) {
					$("link[href*='asip/" + oldTheme + "/main.css']").remove();
					//$("link[href*='asip/" + oldTheme + "/main.css']").attr("href", newThemeCssUrl);
				}

				$("<link>").attr({  rel: "stylesheet",
					type: "text/css",
					href: info.getAppUrl() + "/style/asip/" + auGurit.global.style + "/main.css"
				}).appendTo("head");
			},
			clickCloseBtn: function() {
				auGurit.global.secondUtlPanal.close();
			},
			clickSaveBtn:$.proxy(info.clickSaveBtn, info),
            pwMsg: function () {
                //密码强度 检查
                //var val = modal.password1();
                var val = $('#password1').val();
                if (val==''||val==undefined) {
                  //  $('#idSpanTip').text("密码长度至少8位（区分大小写），必须同时包含至少一位大写字母（A-Z）、小写字母（a-z）、数字（0-9）和特殊符号（包含：!@#$%^&*_-）");
                 //   $('#idSpanTip').css("color","gray");
                    return;
                }

                var lv=0;
                if(val.match(/[a-z]/g)){lv++;}
                if(val.match(/[A-Z]/g)){lv++;}
                if(val.match(/[0-9]/g)){lv++;}
                if(val.match(/(.[^a-z0-9A-Z])/g)){lv++;}
                if(lv > 4){lv=4;}
                if (lv<4 || val.length<8) {
					var msg = "密码长度至少8位（区分大小写），必须同时包含至少一位大写字母（A-Z）、小写字母（a-z）、数字（0-9）和特殊符号（包含：!@#$%^&*_-）";
                    //$('#idSpanTip').text(msg);
                   // $('#idSpanTip').css("color","red");
					$('#idSpanTipForPassword').text("");
					layer.tips("<span style='color:red'>"+msg+"</span>", $('#password1'),{tips:[3,'#F0E68C'],time: 3000});//弹出框加回调函数
                } else {
                    $('#idSpanTipForPassword').css("color","green");
                    $('#idSpanTipForPassword').text("密码合格");
                }

            },

            comfirmPw: function () {
                var tt = $('#confirmPassword1').val();
                if (tt == $('#password1').val()) {
                    $('#idSpanTipConfirm').css("color","green");
                    if (tt =='')
                        $('#idSpanTipConfirm').text("");
                    else
                        $('#idSpanTipConfirm').text("密码一致");

             	} else {
                    $('#idSpanTipConfirm').css("color","red");
                    $('#idSpanTipConfirm').text("密码不一致");
                }

                return true;
            },
            openOrgChoosenPage: function() {

                layer.open({
                    title: ["选择部门", 'text-align: left;'],
                    type: 2,
                  // btn: '提交',
                    content: '/awater/view/desktop/changeInfoGetOrg.html',
                    btn: ['确定', '取消'],
                    btnAlign: 'c',
                    shade: 0,
                    area:["550px", "500px"],
                    yes: function(index, ct) {
                        var result = $(ct).find('iframe')[0].contentWindow.callbackdata();
                       
                        if(result) {
							//orgId 实际存的是 orgCode
                            modal.orgId(result.orgCode);
							modal.orgXpath(result.xpath);

                        }

                        layer.close(index);
                    },
                    success:function (ct,index) {

                    }
                });
            }


		};
		
		// 初始化
		info.init();

		return modal;
});
