define(["jquery", "durandal/app", "durandal/composition", "knockout"],
    function ($, app, composition, ko) {
        var resConModule;
        var info = {
            init: function() {
                var that = this;
                composition.addBindingHandler("initResHandler", {
                    init: function() {
                        modal.selectedMenuId('');// 重置选择菜单
                        that.loadResMenus();
                        that.loadDataMenus();
                        that.loadFileMenus();
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
            // 加载服务资源目录
            loadResMenus: function(searchText) {
                $.ajax({
                    url: agsupportUrl + "/resources/tree",
                    type:"post",
                    dataType:"json",
                    data: {},
                    success: function (data) {
                        if(data.success) {
                            for(var i=0; i<data.content.length; i++) {
                                data.content[i].isShow = ko.observable(true);
                            }
                            modal.resMenus(data.content);
                        } else {
                            layer.msg(data.message, { time: 2000 });
                        }
                    }
                });
            },
            // 加载数据资源目录
            loadDataMenus: function(searchText) {
                var that = this;
                $.ajax({
                    url: "/agsupport/awater/datadir/tree",
                    type: "post",
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        if(data.success) {
                            var root = data.content;
                            modal.title(root[0].dirName);
                            var list = [];
                            root[0].level = -1;
                            that.initTree(list, root[0]);
                            modal.treeMenus(list);

                        } else {
                            layer.msg(data.message, { time: 2000 });
                        }
                    }
                });
            },
            // 加载文件资源目录
            loadFileMenus: function(searchText) {
                $.ajax({
                    url: agsupportUrl + "/awater/fileDir/list",
                    type: "post",
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        for(var i=0; i<data.length; i++) {
                            data[i].isShow = ko.observable(true);
                        }
                        modal.fileMenus(data);
                    },
                    error: function() {
                        layer.msg('文件资源目录加载失败', { time: 2000 });
                    }
                });
            },

            //初始化树
            initTree: function(list, parentNode){
                var that = this;
                var i = 0;
                for (i=0; i<parentNode.children.length; i++) {
                    var node = parentNode.children[i];
                    node.level = parentNode.level + 1;
                    node.childs = node.children == null ? 0 : node.children.length;
                    node.state = ko.observable(true);
                    node.visible = ko.observable(true);
                    node.stateStack = [];
                    node.index = list.length;
                    list.push(node);
                    if(node.children != null && node.children.length > 0)
                    {
                        that.initTree(list, node);
                        delete list[i].children;
                    }

                };

            },
            initData: function() {
                app.setRoot("res/resList", null, "resContent", {
                    "resType" : 1,
                });
            },

            // 数据服务资源菜单模块接入
            clickHideBtn: function(even){
                var that = this;
                even.isShow(!even.isShow());
                that.gotoPage("root", "/");
            },

            gotoPage: function(id, path) {
                app.setRoot("res/resList", null, "resContent", {
                    "resType" : 2,
                    "dirId": path
                });
            }
        };

        var modal = {
            selectedMenuId: ko.observable(),
            resMenus: ko.observableArray(),
            dataMenus: ko.observableArray(),
            fileMenus: ko.observableArray(),

            treeMenus: ko.observableArray(),

            searchText: ko.observable(''),

            clickResMenu: function(menu) {
                modal.selectedMenuId(menu.id);

                if(menu.dirFullpath != null) {
                    info.gotoPage(menu.id, menu.dirFullpath);
                    return;
                }

                app.setRoot("res/resList", null, "resContent", {
                    "resType" : 1,
                    "dirId": menu.id
                });
            },
            clickResMenuHideBtn: function(even) {
                even.isShow(!even.isShow());
                // 阻止事件冒泡
                return true;
            },
            clickFileMenu: function(menu) {
                modal.selectedMenuId(menu.id);

                var dirIds = menu.id;
                if(menu.children) {
                    for(var i=0; i<menu.children.length; i++) {
                        dirIds += ',' + menu.children[i].id;
                    }
                }
                app.setRoot("res/resList", null, "resContent", {
                    "resType" : 3,
                    "dirId": dirIds
                });
            },
            clickFileMenuHideBtn: function(even) {
                even.isShow(!even.isShow());
                // 阻止事件冒泡
                return true;
            },
            expendTreeNode: function(menu) {
                var subMenuState = !menu.state();
                menu.state(subMenuState);
                var subTree = modal.treeMenus();
                var i = 0;
                for(i=menu.index+1; i<subTree.length; i++) {
                    if(subTree[i].dirFullpath.indexOf(menu.dirFullpath) == -1)
                        break;
                    if(subMenuState)
                    {
                        subTree[i].visible(subTree[i].stateStack.pop());
                    }
                    else
                    {
                        subTree[i].stateStack.push(subTree[i].visible());
                        subTree[i].visible(false);
                    }
                }

            },

            // 数据资源目录树
            isShow: ko.observable(true),
            title: ko.observable("数据"),
            clickHideBtn: $.proxy(info.clickHideBtn, info)
        };

        info.init();

        return modal;
    });