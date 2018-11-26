/*
    弹出菜单组件
*/
define(["jquery", "durandal/app", "durandal/system", "durandal/composition", "durandal/activator", "knockout", "i18nCommon", "common", "http", "panal", "mapUtils", "fakeloader", "bootstrap", "metisMenu"],
    function ($, app, system, composition, activator, ko, i18n, common, http, panal, mapUtils) {
        var currentPage = {};
        var currentPageId = "";
        var Container = {
            init: function () {
                var that = this;
                composition.addBindingHandler("initSideHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                    }
                });
            },

            renderUI: function () {
                var that = this;
                var rootPath = auGurit.global.rootPath;
                var ip = rootPath.substring(0, rootPath.lastIndexOf("/", rootPath.length - 2));
                var menuId = modal._$_param.menu.id;

                //获取菜单项目
                $.ajax({
                    type: 'POST',
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    url: ip + agsupportName + "/agsupport/menuDir/getMenuDirByPid/" + menuId,
                    data: {},
                    success: function (result, textStatus, jqXHR) {
                        if (result && result.success && (result.success === true || result.success === "true")) {
                            var data = result.content;

                            for (var i = 0; i < data.length; i++) {
                            	data[i].name = that.htmlDecode(data[i].name);
                                data[i].visible = ko.observable(i == 0);
                                data[i].init = ko.observable(false);
                            };
                            modal.menuList(data);
                            if(modal.menuList().length > 0)
                                that.menuClick(modal.menuList()[0]);
                        } 
                        else 
                        {
                            console.error("获取菜单出错" + url + " \n" + data);
                        }
                    }
                });

            },

            bindUI: function () {
                var that = this;
                modal._$_param.parent.setCurrentPage(that);
            },

            //菜单点击
            menuClick: function(item){
                var that = this;
                //关闭弹窗
                if(auGurit.global.secondUtlPanal){
                    auGurit.global.secondUtlPanal.close();
                }
				if(currentPageId != item.id)
                {
                    that.showUtlBar(true);
                    //清空当前所有资源
                    //that.dispose();

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

                }
                else
                {
                    that.showUtlBar(!modal.sidebarVisible());  
                }

                currentPageId = item.id;

                //清除共享工具条图层                
                if(auGurit.global.shareSelectLayers){
                    var map = $("#desktop-main-map")[0].contentWindow.map;
                    map._mapInterface.layerFeature.clearLayers();
                    for (var l = 0; l < auGurit.global.shareSelectLayers.length; l++) {
                        layerObj = auGurit.global.shareMapLayers[auGurit.global.shareSelectLayers[l].title];
                        if (layerObj)
                            map.removeLayer(layerObj);
                        auGurit.global.shareMapLayers[auGurit.global.shareSelectLayers[l].title] = null;
                        auGurit.global.shareSelectLayers.splice(l, 1);
                        l--;
                    }
                    map.off('click');
                    $(map._container).css('cursor', '-webkit-grab');
                    auGurit.global.identifyFlag=false;//全局是否
                    //回复默认状态.
                    $(".tool-line").removeClass("selected");               
                }

                
            },

            sidebarClick: function(){
                var that = this;
                that.showUtlBar(!modal.sidebarVisible());
            },

            showUtlBar: function (isShow) {

                var flag = isShow ? "show" : "hide";
                modal.sidebarVisible(isShow);
                $("#smainPanel").animate({
                    width: flag,
                    paddingLeft: flag,
                    paddingRight: flag,
                    marginLeft: flag,
                    marginRight: flag
                }, 300);

                var leftTipBar = isShow ? 320 : 55;
                modal.sidebarVisible(isShow);
                $("#tipPanel").animate({
                    left: leftTipBar
                }, 300);

            },

            showTipBar: function (isShow, url) {

                modal.tipVisible(isShow);
                var leftTipBar = modal.sidebarVisible() ? 320 : 55;
                modal.tipVisible(isShow);
                $("#tipPanel").animate({
                    left: leftTipBar
                }, 300);

            },            

            //设置当前页
            setCurrentPage: function(itemId, item)
            {
                // if(currentPage[itemId] && currentPage[itemId].dispose)
                // {
                //     currentPage[itemId].dispose();
                //     currentPage[itemId] = null;
                // }

                // if($(".app-panal").length > 0)
                // {
                //     $(".app-panal").remove(); 
                // }

                currentPage[itemId] = item;
            },

            dispose: function() {

                var that = this;
                
                if(currentPage[currentPageId] && currentPage[currentPageId].dispose)
                {
                    currentPage[currentPageId].dispose();
                }

                if($(".app-panal").length > 0)
                {
                    $(".app-panal").remove();
                }

                that.showTipBar(false);
                //console.log("清空功能项");
            },

            openWidgetTabPanal: function (url, title, param, width, height, top, left, right, maxBtn, resizable, draggable, switchBtn, multiId) {
                var that = this;
                var settings = {
                    width: width || 360,
                    height: height || $(".desktop-map").height(),
                    resizable: false,
                    draggable: draggable,
                    minBtn: true,
                    maxBtn: true,
                    closeBtn: false,
                    statBtn: switchBtn,
                    detailBtn: switchBtn,
                    multi: multiId,
                    multiId: multiId,
                    titleShow: true,
                    title: title,
                    panalListTitle: "",   //在桌面的面板列表上显示的标题
                    top: top,
                    left: left,
                    right: right,
                    mouseoutClose: false, //鼠标移出即关闭
                    pointShow: false,     //面板是否带有指示角
                    pointBorder: "right",  //left/right/top/bottom
                    pointPosition: 0,    //距离顶点的位置,从左边到右或者从上到下的距离
                    modal: false,         //是否模态
                    closeOther: true,
                    onTabClose: function (tab) {

                        that.clearClient(tab.data.params);
                    }
                };
                var p = panal.getTabInstance(settings);
                auGurit.global.utlPanal = p;

                //缩小事件
                p.settings.onMinShow = function(e){

                    if (p.getSizeState() == "min") {

                        var radio = 0.98;
                        var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                        var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2) + 8;
                        var left = document.documentElement.clientWidth - 350;
                        p.moveTo(top, left);
                        $(".MaxPanel").hide();
                        $(".NormalPanel").show();
                    } else {
                    	/*
                        $(".app-panal").css({
                            "height": document.documentElement.clientHeight - 100
                        });
                        $(".app-panal-content").css({
                            "height": document.documentElement.clientHeight - 130
                        });
                        $(".MaxPanel").hide();
                        $(".NormalPanel").show();
                        */
                    }
                };

                //放大事件
                p.settings.onMaxShow = function (e) {
                    if (p.getSizeState() == "max") {
                        var panelHeight = $("#desktop-map").height() / 2;
                        $(".app-panal").css({
                            "height": panelHeight
                        });
                        $(".app-panal-content").css({
                            "height": panelHeight - 30
                        });
                        var radio = 0.98;
                        var smainPanelWidth = $("#smainPanel").is(":hidden") ? 0 : $("#smainPanel").width();
                        var left = $("#side").width() + smainPanelWidth + 37;
                        var top = document.documentElement.clientHeight - $(".app-panal").height() - 2;
                        p.moveTo(top, left);
                        var w = $("#desktop-map").width() - smainPanelWidth - 60;
                        $(".app-panal").width(w);
                       // $(".app-panal-content").width(w - 10);
                        p.updateLayout();
                        $(".MaxPanel").show();
                        $(".NormalPanel").hide();
                    } else {
                    	/*
                        $(".app-panal").css({
                            "height": document.documentElement.clientHeight - 100
                        });
                        $(".app-panal-content").css({
                            "height": document.documentElement.clientHeight - 130
                        });
                        $(".MaxPanel").hide();
                        $(".NormalPanel").show();
                        */
                    }
                };
                return p;
            },

            clearClient: function(item)
            {
                var that = this;
                try
                {
                    var map = $("#desktop-main-map")[0].contentWindow.map;
                    //反选
                    $(".nr_sd>a[name='" + item.id + "']").removeClass("hover");
                    //清除图层
                    map._mapInterface.layerFeature.clearLayers();
                    mapUtils.removeGlobalMapLayers(item.title); 
                    for (var l in auGurit.global.selectSubject) {
                        if (auGurit.global.selectSubject[l].title == item.title) {
                            auGurit.global.selectSubject.splice(l, 1);
                        }
                    }
                }
                catch(e)
                {
                    console.log(e);
                }
                if(item.id == "topic-31-1")
                {
                    that.showTipBar(false);
                }
                
            },

            closepanel: function () {
                var that = this;

                if(auGurit.global.utlPanal)
                    auGurit.global.utlPanal.close();
                that.showTipBar(false);
                $(".nr_sd a").removeClass("hover");
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2) + 8;
                var right = 5;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                
                if (map.hasEventListeners("zoom")) {
                    map.off("zoom");
                }
                for (var l = 0; l < auGurit.global.selectSubject.length; l++) {
                    map._mapInterface.layerFeature.clearLayers();
                    mapUtils.removeGlobalMapLayers(auGurit.global.selectSubject[l].title);
                    auGurit.global.selectSubject.splice(l, 1);
                    l--;
                }
            },

			htmlDecode: function(str) {
            	if(str) {
					var div = document.createElement('div');
					div.innerHTML = str;
					return div.innerText || div.textContent;
				}

				return '';
			}

        };

        var modal = {

            //数据
            menuList: ko.observableArray(),
            sidebarVisible: ko.observable(false),
            tipVisible: ko.observable(false),

            //操作
            menuClick: $.proxy(Container.menuClick, Container),
            sidebarClick: $.proxy(Container.sidebarClick, Container),

        };

        Container.init();
        return modal;
    });