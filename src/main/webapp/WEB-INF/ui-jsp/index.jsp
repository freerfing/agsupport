<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>一体化平台后台管理</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=11;IE=10;IE=9;IE=8; IE=EDGE" />
    <link rel="stylesheet" type="text/css" href="../lib/layui/css/layui.css" />
    <link rel="stylesheet" type="text/css" href="../styles/main.css" />
    <script src="../lib/layui/layui.js"></script>
</head>
<body id="layui_app">
    <!-- 侧边菜单 -->
    <div class="layui-side layui-side-menu">
        <div class="layui-side-scroll">
            <ul style="height: 100%;" class="layui-nav layui-nav-tree" id="layui-side-menu" lay-filter="layui-side-menu-filter">
                <li data-name="user-center" class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;" lay-tips="用户中心" lay-direction="2">
                        <i class="layui-icon layui-icon-user"></i>
                        <cite>用户中心</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd data-name="user-org">
                            <a lay-href="../user/index.do" class="layui-this">用户机构</a>
                        </dd>
                        <dd data-name="role">
                            <a lay-href="../role/index.do">角色管理</a>
                        </dd>
                    </dl>
                </li>
                <li data-name="resource-center" class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;" lay-tips="资源中心" lay-direction="2">
                        <i class="layui-icon layui-icon-app"></i>
                        <cite>资源中心</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd data-name="map">
                            <a lay-href="../map/index.do">地图资源</a>
                        </dd>
                        <dd data-name="dataService">
                            <a lay-href="../dataService/index.do">数据资源</a>
                        </dd>
                        <dd data-name="document">
                            <a lay-href="../document/index.do">文档资源</a>
                        </dd>
                        <dd data-name="app">
                            <a lay-href="../app/index.do">业务应用</a>
                        </dd>
                    </dl>
                </li>
                <li data-name="settings" class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;" lay-tips="系统管理" lay-direction="2">
                        <i class="layui-icon layui-icon-set"></i>
                        <cite>系统管理</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd data-name="menu">
                            <a lay-href="../menu/index.do">菜单管理</a>
                        </dd>
                        <dd data-name="sysLog">
                            <a lay-href="../sysLog/index.do">系统日志</a>
                        </dd>
                        <dd data-name="resLog">
                            <a lay-href="../resLog/index.do">服务访问</a>
                        </dd>
                        <dd data-name="dictionary">
                            <a lay-href="../dictionary/index.do">数据字典</a>
                        </dd>
                    </dl>
                </li>
                <li data-name="data-manager" class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;" lay-tips="数据维护" lay-direction="2">
                        <i class="layui-icon layui-icon-util"></i>
                        <cite>数据维护</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd data-name="metaData">
                            <a lay-href="../metaData/index.do">元数据管理</a>
                        </dd>
                        <dd data-name="tableRows">
                            <a lay-href="../tableRows/index.do">数据目录管理</a>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>

    <!-- 页面标签 -->
    <div class="layui-pagetabs" id="layui_tabs">
        <div class="layui-icon layui-tabs-control layui-icon-prev" layui-event="leftPage"></div>
        <div class="layui-icon layui-tabs-control layui-icon-next" layui-event="rightPage"></div>
        <div class="layui-icon layui-tabs-control layui-icon-down">
            <ul class="layui-nav layui-tabs-select" lay-filter="layui-pagetabs-nav">
                <li class="layui-nav-item" lay-unselect>
                    <a href="javascript:;"></a>
                    <dl class="layui-nav-child layui-anim-fadein">
                        <dd layui-event="closeThisTabs"><a href="javascript:;">关闭当前标签页</a></dd>
                        <dd layui-event="closeOtherTabs"><a href="javascript:;">关闭其它标签页</a></dd>
                        <dd layui-event="closeAllTabs"><a href="javascript:;">关闭全部标签页</a></dd>
                    </dl>
                </li>
            </ul>
        </div>
        <div class="layui-tab" lay-unauto lay-allowClose="true" lay-filter="layui-layout-tabs">
            <ul class="layui-tab-title" id="layui_tabsheader">
                <li lay-id="home/console.html">
                    <i class="layui-icon layui-icon-home"></i>
                </li>
            </ul>
        </div>
    </div>

    <!-- 主体内容 -->
    <div class="layui-app-body" id="layui_body">
        <div class="layui-tabsbody-item layui-show">
            <iframe src="home/console.html" frameborder="0" class="layui-iframe"></iframe>
        </div>
    </div>

<script>
    layui.config({ base: '../lib/layui/extend/' }).use(['layer', 'table', 'form', 'element', 'jquery'], function(layer, table, form, element, $) {
        var $win = $(window), $body = $('body'), modal = {
			sideFlexible: function(status) {
				var app = container,
                    iconElem =  $('#'+ APP_FLEXIBLE);

				//设置状态，PC：默认展开、移动：默认收缩
				if(status === 'spread'){
					//切换到展开状态的 icon，箭头：←
					iconElem.removeClass(ICON_SPREAD).addClass(ICON_SHRINK);
					app.removeClass(APP_SPREAD_SM);
					app.removeClass(SIDE_SHRINK)
				} else {
					//切换到搜索状态的 icon，箭头：→
					iconElem.removeClass(ICON_SHRINK).addClass(ICON_SPREAD);
					app.addClass(SIDE_SHRINK);
					app.removeClass(APP_SPREAD_SM)
				}

				layui.event.call(this, setter.MOD_NAME, 'side({*})', {
					status: status
				});
			},
			resizeSystem: function(){
				if(!modal.resizeSystem.lock){
					setTimeout(function(){
						modal.sideFlexible('spread');
						delete modal.resizeSystem.lock;
					}, 100);
				}

				modal.resizeSystem.lock = true;
			},

			//事件监听
			on: function(events, callback){
				// this绑定的是admin
				return layui.onevent.call(this, 'modal', events, callback);
			},

			//记录最近一次点击的页面标签数据
			tabsPage: {

            },

			//获取页面标签主体元素
			tabsBody: function(index) {
			    return $('#layui_body').find('.layui-tabsbody-item').eq(index || 0);
		    },

            // 菜单导航目录
            tabsMenuChange: function(othis) {
			    var menus = $("#layui-side-menu").find("dl dd").removeClass('layui-this');
			    realUrl = othis.attr('lay-id');
			    if(!realUrl) {
			    	return false;
                }

			    menus.each(function(index, item) {
					var dd = $(item),
						url = dd.children("a").eq(0).attr('lay-href');

					if(realUrl === url) {
                        dd.removeClass('layui-this').addClass('layui-this');
                        return false;
					}
				});
            },

		    //切换页面标签主体
	        tabsBodyChange: function(index, options){
                options = options || {};

                modal.tabsBody(index).addClass('layui-show').siblings().removeClass('layui-show');
                modal.events.rollPage('auto', index);

                layui.event.call(this, 'modal', 'tabsPage({*})', {
                    url: options.url,
                    text: options.text
                });
		    },

		    //resize事件管理
	        resize: function(fn) {
                var router = layui.router(),
                    key = router.path.join('-');
                $win.off('resize', modal.resizeFn[key]);
                fn(), modal.resizeFn[key] = fn;
                $win.on('resize', modal.resizeFn[key]);
            },
            resizeFn: {},
            runResize: function() {
                var router = layui.router(),
                    key = router.path.join('-');
                modal.resizeFn[key] && modal.resizeFn[key]();
            },
            delResize: function() {
                var router = layui.router(),
                    key = router.path.join('-');
                $win.off('resize', modal.resizeFn[key]);
                delete modal.resizeFn[key];
		    },

		    //关闭当前 pageTabs
	        closeThisTabs: function(options) {
				debugger
                if(!modal.tabsPage.index) return;
                $('#layui_tabsheader>li').eq(modal.tabsPage.index).find('.layui-tab-close').trigger('click');
		    },

        	events: {
				openTabsPage: function(url, text){
					//遍历页签选项卡
					var matchTo,
                        tabs = $('#layui_tabsheader>li'),
                        path = url.replace(/(^http(s*):)|(\?[\s\S]*$)/g, '');

					tabs.each(function(index){
						var li = $(this),
                            layid = li.attr('lay-id');

						if(layid === url){
							matchTo = true;
							modal.tabsPage.index = index;
						}
					});

					text = text || '新标签页';

                    //如果未在选项卡中匹配到，则追加选项卡
                    if(!matchTo) {
                        $('#layui_body').append([
                            '<div class="layui-tabsbody-item layui-show">',
                            '<iframe src="'+ url +'" frameborder="0" class="layui-iframe"></iframe>',
                            '</div>'].join(''));
                        modal.tabsPage.index = tabs.length;
                        element.tabAdd('layui-layout-tabs', {
                            title: '<span>'+ text +'</span>',
                            id: url,
                            attr: path
                        });
                    }

					//定位当前tabs
					element.tabChange('layui-layout-tabs', url);
					modal.tabsBodyChange(modal.tabsPage.index, {
						url: url,
                        text: text
					});
				},
				//伸缩
				flexible: function(othis){
					var iconElem = othis.find('#LAY_app_flexible'),
                        isSpread = iconElem.hasClass('layui-icon-spread-left');
					modal.sideFlexible(isSpread ? 'spread' : null);
				},
				//刷新
				refresh: function(){
					var iframe = modal.tabsBody(modal.tabsPage.index).find('.lay-iframe');
					iframe[0].contentWindow.location.reload(true);
				},
				//左右滚动页面标签
				rollPage: function(type, index){
					var tabsHeader = $('#layui_tabsheader'),
						liItem = tabsHeader.children('li'),
						scrollWidth = tabsHeader.prop('scrollWidth'),
						outerWidth = tabsHeader.outerWidth(),
						tabsLeft = parseFloat(tabsHeader.css('left'));

					//右左往右
					if(type === 'left'){
						if(!tabsLeft && tabsLeft <=0) return;

						//当前的left减去可视宽度，用于与上一轮的页标比较
						var  prefLeft = -tabsLeft - outerWidth;

						liItem.each(function(index, item){
							var li = $(item)
								,left = li.position().left;

							if(left >= prefLeft){
								tabsHeader.css('left', -left);
								return false;
							}
						});
					} else if(type === 'auto'){ //自动滚动
						(function(){
							var thisLi = liItem.eq(index), thisLeft;

							if(!thisLi[0]) return;
							thisLeft = thisLi.position().left;

							//当目标标签在可视区域左侧时
							if(thisLeft < -tabsLeft){
								return tabsHeader.css('left', -thisLeft);
							}

							//当目标标签在可视区域右侧时
							if(thisLeft + thisLi.outerWidth() >= outerWidth - tabsLeft){
								var subLeft = thisLeft + thisLi.outerWidth() - (outerWidth - tabsLeft);
								liItem.each(function(i, item){
									var li = $(item)
										,left = li.position().left;

									//从当前可视区域的最左第二个节点遍历，如果减去最左节点的差 > 目标在右侧不可见的宽度，则将该节点放置可视区域最左
									if(left + tabsLeft > 0){
										if(left - tabsLeft > subLeft){
											tabsHeader.css('left', -left);
											return false;
										}
									}
								});
							}
						}());
					} else {
						//默认向左滚动
						liItem.each(function(i, item){
							var li = $(item)
								,left = li.position().left;

							if(left + li.outerWidth() >= outerWidth - tabsLeft){
								tabsHeader.css('left', -left);
								return false;
							}
						});
					}
				},

				//向右滚动页面标签
				leftPage: function(){
					modal.events.rollPage('left');
				},

				//向左滚动页面标签
				rightPage: function(){
					modal.events.rollPage();
				},

				//关闭当前标签页
				closeThisTabs: function(){
					modal.closeThisTabs();
				},

				//关闭其它标签页
				closeOtherTabs: function(type) {
					var TABS_REMOVE = 'layui-pagetabs-remove';
					if(type === 'all') {
						$('#layui_tabsheader>li:gt(0)').remove();
						$('#layui_body').find('.layui-tabsbody-item:gt(0)').remove();

						$('#layui_tabsheader>li').eq(0).trigger('click');
					} else {
						$('#layui_tabsheader>li').each(function(index, item){
							if(index && index != modal.tabsPage.index) {
								$(item).addClass(TABS_REMOVE);
								modal.tabsBody(index).addClass(TABS_REMOVE);
							}
						});
						$('.'+ TABS_REMOVE).remove();
					}
				},

				//关闭全部标签页
				closeAllTabs: function(){
					modal.events.closeOtherTabs('all');
					//location.hash = '';
				},

				setThisRouter: function(othis) {
					var layid = othis.attr('lay-id'),
						attr = othis.attr('lay-attr'),
						index = othis.index();

					modal.tabsBodyChange(index);
					location.hash = layid === 'index' ? '/' : attr;
				},

            }
        };

		//监听 tab 组件切换，同步 index
		element.on('tab(lay-layout-tabs)', function(data) {
			modal.tabsPage.index = data.index;
		});

		//监听选项卡切换，改变菜单状态
		modal.on('tabsPage(setMenustatus)', function(router) {
			var pathURL = router.url,
                getData = function(item) {
					return {
						list: item.children('.layui-nav-child'),
                        a: item.children('*[lay-href]')
					}
				},
                sideMenu = $('#layui-side-menu'),

				//捕获对应菜单
				matchMenu = function(list) {
					list.each(function(index, parent) {
						var parentOthis = $(parent),
							parentData = getData(parentOthis),
                            parentListChildren = parentData.list.children('dd');

						parentListChildren.each(function(childIndex, child) {
							var childOthis = $(child),
								childData = getData(childOthis),
                                childMatched = pathURL === childData.a.attr('lay-href');

							if(childMatched) {
								var selected = childData.list[0] ? 'layui-nav-itemed' : 'layui-this';
								childOthis.addClass(selected).siblings().removeClass(selected); //标记选择器
								return false;
							}

						});
					});
				};
			//重置状态
			sideMenu.find('layui-this').removeClass('layui-this');

			//开始捕获
			matchMenu(sideMenu.children('li'));
		});

		//监听侧边导航点击事件
		element.on('nav(layui-side-menu)', function(elem) {
			if(elem.siblings('.layui-nav-child')[0] && container.hasClass(SIDE_SHRINK)){
				modal.sideFlexible('spread');
				layer.close(elem.data('index'));
			};
			modal.tabsPage.type = 'nav';
		});

		//监听选项卡的更多操作
		element.on('nav(layui-pagetabs-nav)', function(elem) {
			var dd = elem.parent();
			dd.removeClass('layui-this');
			dd.parent().removeClass('layui-show');
		});

		//标签页标题点击
		$body.on('click', '#layui_tabsheader>li', function() {
			var othis = $(this),
                index = othis.index();

			modal.tabsPage.type = 'tab';
			modal.tabsPage.index = index;

			//单页标签页
			modal.events.setThisRouter(othis);
		});

		//监听 tabspage 删除
		element.on('tabDelete(layui-layout-tabs)', function(obj) {
			var othis = $('#layui_tabsheader>li.layui-this');

			obj.index && modal.tabsBody(obj.index).remove();
			modal.events.setThisRouter(othis);
            modal.tabsMenuChange(othis);

			//移除resize事件
			modal.delResize();
		});

		//页面跳转
		$body.on('click', '*[lay-href]', function() {
			var othis = $(this),
                href = othis.attr('lay-href'),
                text = othis.attr('lay-text'),
                router = layui.router();

			modal.tabsPage.elem = othis;

			//执行跳转
			modal.events.openTabsPage(href, text || othis.text());
		});

		//点击事件
		$body.on('click', '*[layui-event]', function() {
			var othis = $(this),
                attrEvent = othis.attr('layui-event');
			modal.events[attrEvent] && modal.events[attrEvent].call(this, othis);
		});

		//窗口resize事件
		$win.on('resize', modal.resizeSystem);
    });
</script>
<style>
    .layui-side-menu .layui-nav .layui-nav-item > a {
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .layui-side-menu .layui-nav .layui-nav-item a {
        height: 40px;
        line-height: 40px;
        padding-left: 45px;
        padding-right: 30px;
        box-sizing: initial;
    }

    .layui-side-menu .layui-nav .layui-nav-item .layui-icon {
        position: absolute;
        top: 50%;
        left: 20px;
        margin-top: -20px;
    }

    .layui-pagetabs {
        position: fixed;
        top: 0;
        left: 200px;
        right: 0;
        z-index: 999;
        height: 40px;
        line-height: 40px;
        padding: 0 80px 0 40px;
        background-color: #fff;
        box-sizing: border-box;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    }

    .layui-pagetabs .layui-tabs-control {
        position: absolute;
        top: 0;
        width: 40px;
        height: 100%;
        text-align: center;
        cursor: pointer;
        transition: all .3s;
        -webkit-transition: all .3s;
        box-sizing: border-box;
        border-left: 1px solid #f6f6f6;
    }

    .layui-pagetabs .layui-icon-prev {
        left: 0;
        border-left: none;
        border-right: 1px solid #f6f6f6;
    }

    .layui-pagetabs .layui-tabs-control:hover {
        background-color: #f6f6f6;
    }

    .layui-pagetabs .layui-icon-next {
        right: 40px;
    }

    .layui-pagetabs .layui-icon-down {
        right: 0;
    }

    .layui-tabs-select.layui-nav {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        background: none;
    }

    .layui-tabs-select.layui-nav .layui-nav-item {
        line-height: 40px;
    }

    .layui-tabs-select.layui-nav .layui-nav-item>a {
        height: 40px;
    }

    .layui-tabs-select.layui-nav .layui-nav-item a {
        color: #666;
    }

    .layui-tabs-select.layui-nav .layui-nav-child {
        top: 40px;
        left: auto;
        right: 0;
    }

    .layui-pagetabs .layui-tab {
        margin: 0;
        overflow: hidden;
    }

    .layui-app-body {
        position: absolute;
        top: 50px;
        left: 200px;
        right: 0;
        bottom: 0;
        z-index: 998;
        width: auto;
        overflow: hidden;
        overflow-y: auto;
        box-sizing: border-box;
    }

    .layui-app-body .layui-tabsbody-item {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        display: none;
    }

    .layui-iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
</style>
</body>
</html>