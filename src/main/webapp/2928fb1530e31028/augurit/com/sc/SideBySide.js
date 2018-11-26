/**
 * Author：李德文
 * CreateDate：2017-05-08
 * Description: 卷帘中间层
 */
requirejs.config({
    paths: {
        "SideBySide.sc": "../../../lib/leaflet/plugins/leaflet-side-by-side-gh-pages/leaflet-side-by-side"
    },
    shim: {
        "SideBySide.sc": {
            deps: ["leaflet"],
            exports: "L.control.sideBySide"
        }
    }
});

define(["SideBySide.sc"], function (SideBySide) {
    SideBySide.loadLoc = 'Panel.createPanel';

    SideBySide.load = function () {
        //修改UI
        $("#dragPanel_widgetID_ag-curtain").css("width", $("#mapDiv").width() - 20 + "px").css("z-index", 1999);
        $("#dragPanel_widgetID_ag-curtain .panel-body").css("height", $("#dragPanel_widgetID_ag-curtain").height() - 45 + "px").append("<div id='curtainMap'></div><div class='maptitle'></div>");
        $("#curtainMap").css("height", $("#dragPanel_widgetID_ag-curtain").height() - 45 - 22 + "px").css("width","100%");

        if (widgets["widgetID_ag-curtain"] && widgets["widgetID_ag-curtain"].json) {
            require(["MapInit","esri-leaflet"], function (MapInit,esri_leaflet) {
                var allLayersNode = map._controls.layerTreeControl._allLayersNode,
                    json = widgets["widgetID_ag-curtain"].json,
                    leftLayers = [],
                    rightLayers = [],
                    overLayers = [],
                    mapReferenceID = json.mapReference,
                    mapParam = {};

                $("#dragPanel_widgetID_ag-curtain .maptitle").append("<span class ='left'>"+ Object.keys(json.leftLayer)[0] + "</span><span class ='right'>"+ Object.keys(json.rightLayer)[0]);
                //配置地图参数
                $.each(allLayersNode, function (index, allLayer) {
                    if (allLayer.mapParam.id == mapReferenceID) {
                        mapParam = allLayer.mapParam;
                        return false;
                    }
                });

                var layers = [json.leftLayer,json.rightLayer,json.overLayer];
                //加载图层
                for (var i = 0; i < layers.length; i++) {
                    var layers_ = layers[i];
                    for (var j = 0; j < Object.getOwnPropertyNames(layers_).length; j++) {
                        var layerType = "",
                            layerOptions = {},
                            layer = {},
                            url = "",
                            path = "";
                        var allLayers = map._controls.layerTreeControl._allLayers;
                        $.each(allLayers, function (index, allLayer) {
                            if (allLayer.id == layers_[Object.keys(layers_)[j]]) {
                                layerType = allLayer.layerType;
                                layerOptions = allLayer.layer.options;
                                url = allLayer.layer._url;
                                return false;
                            }
                        });
                        switch (layerType) {
                            case "050005"://WMTS_天地图
                                layer = L.tileLayer.wmts(url, {
                                    layer: layerOptions.layer,
                                    tilematrixSet: layerOptions.tilematrixSet,
                                    format: layerOptions.format,
                                    matrixIds: layerOptions.matrixIds,
                                    tileSize: 256
                                });
                                break;
                            case "020202": //栅格_ArcGIS MapServer(Dynamic)_ArcGIS Y
                                if (layerOptions.isProxy == "1") {
                                    layerOptions.url = path + layerOptions.url;
                                }
                                layer = esri_leaflet.dynamicMapLayer({
                                    url: layerOptions.url,
                                    layers: layerOptions.layers,
                                    isProxy: layerOptions.isProxy,//由于需要动态获取token，添加下面四个字段2017.09.04
                                    token: layerOptions.token,
                                    serverSiteInfo: layerOptions.serverSiteInfo,
                                    useToken: layerOptions.useToken
                                });
                                break;
                            case "030002": //WMS_ArcGIS Y
                                layer = L.tileLayer.wms(url, {
                                    layers: layerOptions.layers,
                                    format: layerOptions.format,
                                    transparent: true
                                });
                                break;
                            case "030003": //WMS_GeoServer Y
                                layer = L.tileLayer.wms(url, {
                                    layers: layerOptions.layers,
                                    format: layerOptions.format,
                                    transparent: true  //false则显示，true则不显示
                                });
                                break;
                            case "020302": //栅格_ArcGIS MapServer(Tile)_ArcGIS Y
                                if (layerOptions.isProxy == "1") {
                                    layerOptions.url = path + layerOptions.url;
                                }
                                layer = esri_leaflet.tiledMapLayer({
                                    url: layerOptions.url,
                                    isProxy: layerOptions.isProxy,
                                    token: layerOptions.token,
                                    serverSiteInfo: layerOptions.serverSiteInfo,
                                    useToken: layerOptions.useToken
                                });
                                break;
                            case "070002": //FeatureServer_ArcGIS Y
                                if (layerOptions.isProxy == "1") {
                                    layerOptions.url = path + layerOptions.url;
                                }
                                layer = esri_leaflet.featureLayer({
                                    url: layerOptions.url
                                });
                                break;
                            case "040003": //WFS_GeoServer Y
                                if (layerOptions.isProxy == "1") {
                                    layerOptions.url = path + layerOptions.url;
                                }
                                layer = new L.WFS({
                                    url: layerOptions.url,
                                    typeNS: layerOptions.typeNS,
                                    typeName: layerOptions.typeName,
                                    geometryField: layerOptions.geometryField,
                                    filter: null
                                });
                                break;
                            case "050003"://WMTS_GeoServer
                                layer = L.tileLayer.wmts(url, {
                                    layer: layerOptions.layer,
                                    tilematrixSet: layerOptions.tilematrixSet,
                                    format: layerOptions.format,
                                    matrixIds: layerOptions.matrixIds
                                });
                                break;
                            case "040002": //WFS_ArcGIS ?
                                if (layerOptions.isProxy == "1") {
                                    layerOptions.url = path + layerOptions.url;
                                }
                                layer = new L.wfs_Esri({
                                    url: layerOptions.url,
                                    typeName: layerOptions.typeName,
                                    srsName: layerOptions.srsName
                                });
                                break;
                            case "080001"://图层组_Geoserver
                                layer = L.tileLayer.wms(url, {
                                    layers: layerOptions.layers,
                                    format: layerOptions.format,
                                    transparent: true
                                });
                                break;

                            case "010001"://矢量图层
                                layer = L.featureGroup([]);//矢量渲染容器
                            case "...": //imageServer_ArcGIS ?
                                layer = esri_leaflet.imageMapLayer({
                                    url: layerOptions.url
                                });
                                break;
                            case "050002": //WMTS_ArcGIS ?
                                break;
                        }
                        if(i==0){
                            leftLayers.push(layer);
                        }else if(i==1){
                            rightLayers.push(layer);
                        }else{
                            overLayers.push(layer);
                        }
                    }
                }
                var center_ = mapParam.center.split(",");
                var center = [];
                var crs = MapInit.getCrs(mapParam);
                if(crs.code == "EPSG:4326"){
                    center = [center_[1], center_[0]];
                }else{
                    var unproject = crs.unproject(L.point(center_[0], center_[1]));
                    center = [unproject.lat, unproject.lng];
                }
                // 构建map
                var curtainMap = L.map("curtainMap", {
                    crs: crs,
                    center: center,
                    minZoom: mapParam.minZoom,
                    maxZoom: mapParam.maxZoom,
                    zoom: mapParam.zoom,
                    layers: rightLayers.concat(leftLayers).concat(overLayers),
                    zoomControl: false,
                    attributionControl: false,
                    visualClick: false
                });
                SideBySide(leftLayers, rightLayers).addTo(curtainMap);
            });
        } else {
            console.info("当前用户尚未配置卷帘，请先行配置");
        }
    };


    SideBySide.config = function () {
        var allLayersNode = map._controls.layerTreeControl._allLayersNode;
        var dragBtn = {};
        var mapReference = {};
        for (var i in allLayersNode) {
            var layer = allLayersNode[i];
            var mapParamID = layer.mapParam.id;
            if(!mapReference.hasOwnProperty(mapParamID)){
                mapReference[mapParamID] = {};
                mapReference[mapParamID].id = layer.mapParam.id;
                mapReference[mapParamID].name = layer.mapParam.name;
                $("#modal_ag-curtain .mapReference").append("<option mapReference=" + layer.mapParam.id +">" + layer.mapParam.name + "</option>");
            }
            $("#modal_ag-curtain .layersDiv").append("<button type='button' class='btn btn-default btn-sm btn-block' draggable='true' mapReference='" + layer.mapParam.id +"' layerId='" + layer.id + "'>" + layer.nameCn + "</button>");
        }

        // 获取保存的信息
        if (widgets["widgetID_ag-curtain"] && widgets["widgetID_ag-curtain"].json) {
            var json = widgets["widgetID_ag-curtain"].json;
            // 影藏非当前保存的坐标参考的图层
            $("#modal_ag-curtain .mapReference").find("option[mapReference = '" + json.mapReference + "']").attr("selected",true);
            $("#modal_ag-curtain .layersDiv button[mapReference != '" + json.mapReference + "']").hide();
            // 展示保存的数据
            var i = 0;
            var layers = [json.leftLayer,json.rightLayer,json.overLayer];
            for (var i = 0; i < layers.length; i++) {
                var layers_ = layers[i];
                for (var j = Object.keys(layers_).length - 1; j >= 0; j--) {
                    $("#modal_ag-curtain .layerDiv:eq(" + i + ")").append("<button type='button' class='btn btn-primary btn-sm btn-block' layerId='" + layers_[Object.keys(layers_)[j]] + "'><span>" + Object.keys(layers_)[j] + "</span><i class='fa fa-trash' title='删除图层'></i></button>");
                }
            }
        } else {
            // 若无保存信息，默认显示当前地图坐标参考下的图层
            var currentMapReference = map.options.mapParamId;
            $("#modal_ag-curtain .mapReference").find("option[mapReference = '" + currentMapReference + "']").attr("selected",true);
            $("#modal_ag-curtain .layersDiv button[mapReference != '" + currentMapReference + "']").hide();
        }

        // 事件注册
        $('body').on('dragstart', "#modal_ag-curtain .layersDiv>button", function (event) { // 开始拖动
            dragBtn.layerId = $(event.target.outerHTML).attr("layerId");
            dragBtn.layerName = $(event.target.outerHTML).html();
        });
        $('body').on('dragover', "#modal_ag-curtain .layerDiv", function (event) {
            event.preventDefault();// 必须通过event.preventDefault()来设置允许拖放
            event.stopPropagation();// 针对火狐
        });
        $('body').on('drop', "#modal_ag-curtain .layerDiv", function (event) {
            event.preventDefault();
            event.stopPropagation();// 针对火狐
            $(this).append("<button type='button' class='btn btn-primary btn-sm btn-block' layerId='" + dragBtn.layerId + "'><span>" + dragBtn.layerName + "</span><i class='fa fa-trash' title='删除图层'></i></button>");
            var $button = $(this).find("button");
            if($button.length == 1){
                $button.children(".fa-star").addClass("selected");
            }
        });
        $('body').on('click', "#modal_ag-curtain .layerDiv .fa-trash", function (event) {
            var $layerDiv = $(this).parents(".layerDiv");
            if( $layerDiv.find("button").length > 1 && $(this).siblings(".fa-star").hasClass("selected")){
                $(this).parent().remove();
                $layerDiv.find(".fa-star").eq(0).addClass("selected");
            }else{
                $(this).parent().remove();
            }
        });

        $("#modal_ag-curtain .mapReference").change(function (){
            var mapReference = $(this).find("option:selected").attr("mapReference");
            $("#modal_ag-curtain .layersDiv button").hide();
            $("#modal_ag-curtain .layersDiv button[mapReference ='" + mapReference + "']").show();
        });

        $("#modal_ag-curtain .save").click(function () {
            var $layerDivs = $("#modal_ag-curtain .layerDiv");
            var json = {
                mapReference: $("#modal_ag-curtain .mapReference").find("option:selected").attr("mapReference"),
                leftLayer: {},
                rightLayer: {},
                overLayer: {}
            };
            for(var i=0;i<$layerDivs.length;i++){
                var $btns = $($layerDivs[i]).find("button");
                for(var j = 0; j < $btns.length; j++) {
                    if(i==0){
                        json.leftLayer[$($btns[j]).find("span").html()] = $($btns[j]).attr("layerid");
                    }else if(i==1){
                        json.rightLayer[$($btns[j]).find("span").html()] = $($btns[j]).attr("layerid");
                    }else{
                        json.overLayer[$($btns[j]).find("span").html()] = $($btns[j]).attr("layerid");
                    }
                }
            }
            saveAndUpdateWidgetsConfig(widgets["widgetID_ag-curtain"].id, {data: json});
            widgets["widgetID_ag-curtain"].json = json;
            $("#modal_ag-curtain").modal('hide');

            // 若已生成
            if ($("#dragPanel_widgetID_ag-curtain").length != 0) {
                $("#dragPanel_widgetID_ag-curtain").remove();
            }
        });
    };
    
    return SideBySide;
});
