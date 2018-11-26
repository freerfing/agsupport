/*
    运维管理
*/
define(["jquery", "durandal/app", "durandal/system", "durandal/composition", "durandal/activator", "knockout", "i18nCommon", "common", "http", "panal", "mapUtils", "fakeloader", "bootstrap", "metisMenu"],
    function ($, app, system, composition, activator, ko, i18n, common, http, panal, mapUtils) {
        var Container = {
            init: function () {
                var that = this;
                composition.addBindingHandler("initFullScreenHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                    }
                });
            },
            renderUI: function () {
                var that = this;
                
            },

            bindUI: function () {
                var that = this;

            }
        };

        var modal = {

        };

        Container.init();
        return modal;
    });