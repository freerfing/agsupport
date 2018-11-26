/**
 * Author：李德文
 * CreateDate：2017-12-22
 * Description: 标注冲突检测中间层
 */
requirejs.config({
    paths: {
        "LabelTextCollision.sc": "../../../lib/leaflet/plugins/Leaflet.LabelTextCollision-master/L.LabelTextCollision"
    },
    shim: {
        "LabelTextCollision.sc": {
            deps: ["leaflet"],
            exports: "L.LabelTextCollision"
        }
    }
});

define(["LabelTextCollision.sc"], function (LabelTextCollision) {
    return LabelTextCollision;
});
