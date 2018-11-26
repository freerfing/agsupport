define(["jquery", "durandal/app", "durandal/system", "durandal/composition", "durandal/activator", "knockout", "i18nCommon", "common", "http", "panal", "mapUtils", "fakeloader", "bootstrap", "metisMenu"],
    function ($, app, system, composition, activator, ko, i18n, common, http, panal, mapUtils) {
        var Container = {
            init: function () {
                var that = this;
                composition.addBindingHandler("initHomeHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                    }
                });
            },
            renderUI: function () {
                var that = this;

                // 加载首页iframe
                $("#homeContainer").html('<iframe src="view/app/homePage/homePage.html?ti=' + new Date().getTime() + '" frameborder="0" class="work-iframe" id="homeFrame"></iframe>');
            },

            bindUI: function () {
                var that = this;
                modal._$_param.parent.setCurrentPage(modal._$_param.menu.id, that);
                modal._$_param.parent.setCurrentPageInit(modal._$_param.menu.id, false);
            }
        };

        var modal = {

        };

        Container.init();
        return modal;
    });