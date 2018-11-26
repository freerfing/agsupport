/**
 * 封装leaflet接口
 * Created by 陈泽浩 on 2017-07-20.
 */
requirejs.config({
    paths: {
        "MapInterface.sc": "../../../lib/ag-leaflet/plugins/Ag.MapInterface/Ag.MapInterface"
    }

});

define(["MapInterface.sc"], function (MapInterface) {
    return MapInterface;
});
