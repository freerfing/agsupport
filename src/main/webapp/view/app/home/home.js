define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal"],
			function ($, app, composition, ko, common, http, panal) {
		var HomePage = {
			init: function() {
				var that = this;
				composition.addBindingHandler("homePageInitHandler", {
					init: function(dom) {
						that.renderUI();
						that.bindUI();
					},
					update: function() {}
				});
			},
			getRootPath:function (){
	    		return location.protocol+"//"+location.host;
	    	},
			getProjectPath:function (){
	    		return this.getRootPath()+"/"+location.pathname.replace(/\/([^/]*)\/.*/,"$1");
	    	},
			renderUI: function() {
			},
			bindUI: function() {
				$.ajaxSetup({ cache: false });
  				var that=this;
		        var systemList = {
		                pszx: {showName:"广州市排水设施管理信息系统(IE7、IE8)",loginAction:"/agsupport/loginSystem/loginPSZX", indexUrl: that.getRootPath()+"/engine5/index/index.action", name: "pszx" },
		                psjcz:{showName:"广州市排水监测站监控管理系统", loginAction:"/agsupport/loginSystem/loginJCZ", indexUrl: that.getRootPath()+":82/Main.aspx", name: "psjcz" },
		                sfb:  {showName:"广州中心城区河湖库监测与预警系统",loginAction: "/agsupport/loginSystem/loginSFB", indexUrl: that.getRootPath()+":81/gzzxcq/mainNew.aspx", name: "sfb" },
		                qxxx: {showName:"台风实时采集分析系统", loginAction: "", indexUrl: "http://172.16.49.5:8080/map/map.aspx", name: "qxxx" },
		                swqx: {showName:"广州市水文气象信息共享平台", loginAction: "", indexUrl: "http://10.195.88.22/gzqxsw/", name: "swqx" },
		                gzkh: {showName:"广州市抗旱决策支持系统", loginAction: "", indexUrl: "http://172.16.49.132/gzkh/", name: "gzkh" },
		                sfzh: {showName:"三防决策系统(IE5-IE10)",  loginAction: "", indexUrl: "http://10.194.170.2/gzsfweb/webgis/Login.aspx", name: "sfzh" },
                    	oa:   {showName:"广州市水务局行政资源管理系统", loginAction: "/agsupport/loginSystem/loginOA" ,indexUrl: that.getRootPath() +":83/oa/guard/mainframe.jsp", name: "oa" }
                };
				$.ajax({
					xhrFields: { withCredentials: true },
					url:"/agsupport/loginSystem/findListByUserName?userName="+loginName,
					dataType:'json',
					success:function(data){
						for(var i=0;i<data.length;i++){
							var system=data[i];
							var systemCode=system.systemCode;
							var systemData=systemList[systemCode];
			                var li=$('<li></li>');
			                var a=$('<a  target="_blank"><span><img src="style/asip/common/css/images/home/'+systemCode+'.png"></span><b>'+systemData.showName+'</b></a>');
			                a.click(
			                		(function(data,sys){
			                			return function(){
			                				that.login(data.loginAction,data.indexUrl,sys.loginName,sys.password);
			                			}
			                		})(systemData,system)
			                
			                );
			                li.append(a);
			                $("#systemList").append(li);
						}
					},
					error:function(){alert("获取系统列表失败");}
				});
			},
			login:function login(loginAction, indexUrl,loginName,password){
				    	if(loginAction){
				    		$.ajax({
				    			url:loginAction,
				    			type:'post',
				    			data:"loginName="+loginName+"&password="+password,
				    			success:function(){
				    				window.open(indexUrl);
				    			},
				    			error:function(){
				    				alert("登录失败");
				    			}
				    		});
				    	}else{
				    		window.open(indexUrl);
				    	}
			},
			clickLeftBtn: function () {
				var obj =$(".cm01_ul li:last-child");;
				$(".cm01_ul li:last-child").remove();
				obj.insertBefore($(".cm01_ul li:first-child"));
			},
			clickRightBtn: function () {
				var obj =$(".cm01_ul li:first-child");;
				$(".cm01_ul li:first-child").remove();
				obj.insertAfter($(".cm01_ul li:last-child"));
			},
			clickSubItem: function () {
				var radio = 0.98;
				var height = Math.ceil($("#desktop-map").height() * radio);
				var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2);
				var left = 5;
				$(".map-container").hide();
				$("#page-container").hide();
				$("#resource-container").hide();
	            $("#operation-container").hide();
	            $("#more-page-container").show();
				$("#home-container").hide();
				app.setRoot("view/app/home/more", null, "more-page-container");
				if(auGurit.global.utlPanal){
					auGurit.global.utlPanal.close();
				}
			}
		};

		var modal = {
			clickLeftBtn: $.proxy(HomePage.clickLeftBtn, HomePage),
			clickRightBtn: $.proxy(HomePage.clickRightBtn, HomePage),
			clickSubItem: $.proxy(HomePage.clickSubItem, HomePage)
		};

        HomePage.init();
		return modal;
	});