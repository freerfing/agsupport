/**
 * Author：yzq
 * CreateDate：2017-05-17
 * Description:叠加分析中间层
 */
requirejs.config({
    paths: {
        "Overlay.sc": "../../../lib/ag-leaflet/plugins/Ag.Overlay/Ag.Overlay",
        "Uploadify.sc": "../../../../../resources/lib/js/uploadifive/jquery.uploadifive"
    },
    map: {
        '*': {
            'css': '../js/css.min'
        }
    },
    shim: {
        "Uploadify.sc": {
            deps: ["css!../../../../../resources/lib/js/uploadifive/uploadifive.css"]
        },
        "Overlay.sc": {
            deps: ["Omnivore.sc","Uploadify.sc"]
        }
    }
});

define(["Overlay.sc"], function (Overlay) {
    Overlay.loadLoc = 'Panel.createPanel';
    Overlay.load = function () {
        Overlay.initOverlay();
    };

    Overlay.remove = function () {

    };
    return Overlay;
});

