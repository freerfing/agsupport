/**
 * Created by czh on 2017-11-01.
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "mapUtils", "bootstrap"], function ($, app, composition, ko, common, http, panal, mapUtils) {

    var identifyLayerPanel = {
        init: function () {
            var that = this;
            composition.addBindingHandler("identifyLayerPanelHandler", {
                init: function (dom) {
                    that.panalObj = panal.getPanalByElement(dom);
                    // console.log(panalObj.param);
                    that.renderUI();
                    that.bindUI();
                },
                update: function () {
                }
            });
        },
        renderUI: function () {
        },
        bindUI: function () {
            this.setPanel();
            this.clickHandle();
        },
        setPanel: function () {
            var param = this.panalObj.param;
            // console.log("返回数据:"+param);
            var allHtml = "";
            if(param[0]){
                var html = "<div class='identify'><table class='table table-hover table-bordered'>";
                html += "<tr><td colspan='2' class='layer_name'><h5><strong>" + param[0].type + "</strong></h5></td></tr>"
                var obj = param[0].layer;
                var tr = "";
                for (var j in obj) {
                    tr = tr + "<tr><td width='25px'>" + (parseInt(j) + 1) + "</td><td>" + obj[j].name + "</td></tr>"
                }
                html = html + tr + "</table></div>";
                allHtml = allHtml + html;
            }
            $("#identifyLayerPanel").html(allHtml);
            /*if (param && param.length > 0) {
                var allHtml = "";
                for (var i in param) {
                    var html = "<div class='identify'><table class='table table-hover table-bordered'>";
                    html += "<tr><td colspan='2' class='layer_name'><h5><strong>" + param[i].type + "</strong></h5></td></tr>"
                    var obj = param[i].layer;
                    var tr = "";
                    for (var j in obj) {
                        tr = tr + "<tr><td width='25px'>" + (parseInt(j) + 1) + "</td><td>" + obj[j].name + "</td></tr>"
                    }
                    html = html + tr + "</table></div>";
                    allHtml = allHtml + html;
                }
                $("#identifyLayerPanel").html(allHtml);
            }*/

        },
        clickHandle: function () {
            var _this = this;
            var map = $("#desktop-main-map")[0].contentWindow.map;
            var param = this.panalObj.param;
            $(".identify .table tr").on("click", function () {
                var layerFeature = map._mapInterface.layerFeature;
                layerFeature.eachLayer(function (layer) {
                    mapUtils.setLayerStyle(layer, 0);
                });
                for (var i in param) {
                    if (param[i].type == $(this).parents("table").find("tr").eq(0).children("td").eq(0).text()) {
                        var layers = param[i].layer;
                        for (var j in layers) {
                            if (layers[j].name == $(this).children("td:last-child").text()) {
                                var layer = layers[j].layer;
                                if (layerFeature.hasLayer(layer)) {
                                    mapUtils.setLayerStyle(layerFeature.getLayer(layer._leaflet_id), 1);
                                } else {
                                    layer.setStyle({color: 'red', opacity: '1'});
                                    layerFeature.addLayer(layer);
                                    map.fitBounds(layer.getBounds());
                                }
                                if (!layer.getPopup().isOpen()) {
                                    layer.openPopup();
                                }
                            }
                        }
                    }
                }
                // map.closePopup();
            });
        }
    };

    identifyLayerPanel.init();

    var modal = {};
    return modal;
});