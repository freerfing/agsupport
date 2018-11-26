define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager","jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager) {
        var panalObj;

        var GeneralView = {
            init: function () {
                var that = this;
                composition.addBindingHandler("generalViewInitHandler", {
                    init: function (dom) {
                        that.isMaxShow = false;
                        panalObj = panal.getPanalByElement(dom);
                        that.data = panalObj.param;                        
                        that.bindUI();
                        that.renderUI(); 
                        panalObj.settings.onMaxShow = function (e) {
                            that.initSize();
                        }
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
                var that = this;
            },
            bindUI: function () {
                var that = this;
                that.max = false;
                that.initView();
                that.initEvent();
            },
            isFullScreen: function(){
                if(document.body.clientHeight == window.screen.height){
                    return true;
                }else{
                    return false;
                }
            },
            initEvent:function(){
                //全屏按钮的点击事件
                var that = this;
                $("#generalViewFrame").load(function(){  
                    $(this).contents().find("img[src='images/fullscreen.png']").on('click',
                        function(){
                            var docElm = document.getElementById("generalViewFrame");
                            if(!that.isFullScreen()){
                                //W3C
                                if (docElm.requestFullscreen) {
                                    docElm.requestFullscreen();
                                }
                                //FireFox
                                else if (docElm.mozRequestFullScreen) {
                                    docElm.mozRequestFullScreen();
                                }
                                //Chrome等
                                else if (docElm.webkitRequestFullScreen) {
                                    docElm.webkitRequestFullScreen();
                                }
                                //IE11
                                else if (docElm.msRequestFullscreen) {
                                    docElm.msRequestFullscreen();
                                }else{
                                    alert("当前浏览器不支持全屏功能,请在新打开的页面中使用F11进行全屏显示");
                                    var videoUrl = auGurit.global.rootPath.replace('/awater/','')+"/xunfei720/720/" + that.data.url;
                                    window.open(videoUrl);
                                }
                            }else{
                                if (document.exitFullscreen) {
                                    document.exitFullscreen();
                                }
                                else if (document.mozCancelFullScreen) {
                                    document.mozCancelFullScreen();
                                }
                                else if (document.webkitCancelFullScreen) {
                                    document.webkitCancelFullScreen();
                                }
                                else if (document.msExitFullscreen) {
                                    document.msExitFullscreen();
                                }
                            }
                    });
                });
            },
            initView: function(){
                var that = this;
                // var videoUrl = "http://10.194.170.65:8082/xunfei720/720/" + that.data.url;
                //71上做了10.194.170.65:8082的反向代理
                var videoUrl = auGurit.global.rootPath.replace('/awater/','')+"/xunfei720/720/" + that.data.url;
                $("#generalViewFrame").attr("src",videoUrl);
            },
            initSize: function () {
                if (panalObj.getSizeState() != "max") {
                    $(".app-panal").css({
                        "height": 380,"left":$(window).width()-620,"width": 620
                    });
                    $(".app-panal-content").css({
                        "height": 348,"width": 620
                    });
                    $(".MaxPanel").hide();
                    $(".NormalPanel").show();
                }
            }
        }

        var modal = {};

        GeneralView.init();
        return modal;
    });
