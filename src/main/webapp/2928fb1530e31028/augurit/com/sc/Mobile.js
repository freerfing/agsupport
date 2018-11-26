/**
 * Created by Augurit on 2017-09-08.
 */
requirejs.config({
    paths: {
        "Mobile.sc": "../../../lib/ag-leaflet/plugins/Ag.Mobile/Ag.Mobile"
    }
});

define(["Mobile.sc"], function (Mobile) {
    return Mobile;
});