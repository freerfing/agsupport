/**
 * Created by lizzy on 2017/10/24.
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager","jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager) {
        var panalObj;
        var VideoView = {
            init: function () {
                var that = this;
                composition.addBindingHandler("videoViewInitHandler", {
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
                that.initVideoView();
            },
            initVideoView: function(){
                var that=this;

                // var videoUrl = "http://10.194.170.65:8082/xunfei720/Media/WRJXF1/" +panalObj.param.url;
                //71上做了10.194.170.65:8082的反向代理
                var url = auGurit.global.rootPath.replace('awater/','')+"/xunfei720/Media/WRJXF1/" +that.data.url;

                common.showLoading($("#videoView"));
                var $videoElem=$("#videoControl");
                $videoElem.attr("src",url);
                var videoControl = $videoElem[0];
                videoControl.addEventListener('canplaythrough',function(){
                    videoControl.play();
                    common.hideLoading();
                });
                
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

        VideoView.init();
        return modal;
    });
