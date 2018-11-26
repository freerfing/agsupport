define(["esri-leaflet", "Omnivore", "LabelTextCollision", "DistMeasure", "AreaMeasure"], function (esri_leaflet, Omnivore, LabelTextCollision, DistMeasure, AreaMeasure) {
    function MapInterface() {
        this.layerFeature = L.featureGroup([]);
        if (!this._renderer) {
            this._renderer = JSON.parse(JSON.stringify(map.options.renderer));
        }
        map.addLayer(this.layerFeature);
    }

    MapInterface.prototype = {
        // 添加卷帘 (currentLayerDirLayerID,leftLayerDirLayerID,rightLayerDirLayerID)
        addCurtainControl: function (currentLayerDirLayerID, leftLayerDirLayerID, rightLayerDirLayerID) {
            var layerTreeControl = map._controls.layerTreeControl;
            var baseLayers = layerTreeControl._baseLayers;
            if (map._controls._CurtainControl == null) {
                var leftLayer = {};
                var rightLayer = {};
                for (var i = 0; i < baseLayers.length; i++) {
                    var layer = baseLayers[i];
                    if (layer.dirLayerId == leftLayerDirLayerID) {
                        leftLayer = layer;
                        if (layer.dirLayerId != currentLayerDirLayerID) {
                            layerTreeControl._addLayer(leftLayer);
                        }
                    } else if (layer.dirLayerId == rightLayerDirLayerID) {
                        rightLayer = layer;
                        if (layer.dirLayerId != currentLayerDirLayerID) {
                            layerTreeControl._addLayer(rightLayer);
                        }
                    }
                }
                if (currentLayerDirLayerID != leftLayerDirLayerID && currentLayerDirLayerID != rightLayerDirLayerID) {
                    for (var i = 0; i < baseLayers.length; i++) {
                        var layer = baseLayers[i];
                        if (layer.dirLayerId == currentLayerDirLayerID) {
                            layerTreeControl._removeLayer(layer);
                        }
                    }
                }
                var sideBySideContorl = L.control.sideBySide(leftLayer.layer, rightLayer.layer);
                sideBySideContorl.addTo(map);
                map._controls._CurtainControl = sideBySideContorl;
            } else {
                map._controls._CurtainControl.remove();
                if (currentLayerDirLayerID != leftLayerDirLayerID) {
                    layerTreeControl._layergroup.removeLayer(map._controls._CurtainControl._leftLayer);
                } else {
                    map._controls._CurtainControl._leftLayer.getContainer().style.clip = "";
                }
                if (currentLayerDirLayerID != rightLayerDirLayerID) {
                    layerTreeControl._layergroup.removeLayer(map._controls._CurtainControl._rightLayer);
                } else {
                    map._controls._CurtainControl._rightLayer.getContainer().style.clip = "";
                }
                if (currentLayerDirLayerID != leftLayerDirLayerID && currentLayerDirLayerID != rightLayerDirLayerID) {
                    for (var i = 0; i < baseLayers.length; i++) {
                        var layer = baseLayers[i];
                        if (layer.dirLayerId == currentLayerDirLayerID) {
                            layerTreeControl._addLayer(layer);
                        }
                    }
                }
                map._controls._CurtainControl = null;
            }
        },
        //  点、线、面定位
        layerLocate: function (feature, callback) {
            if (feature.features.geometry.indexOf('POINT') >= 0) {
                map.panTo(feature.getLatLng());
            } else {
                map.fitBounds(feature.getBounds());
            }
            feature.containerPoint = {"x": map._container.clientWidth / 2, "y": map._container.clientHeight / 2};
            this.setFeatureStyle(feature);
            /*
             if(feature._tooltip){
             feature.openTooltip();
             }
             */
            callback(feature);
            return feature;
        },
        //保证原来的点不变，通过叠加新图层标致选中点
        addLayerLocate: function (feature, callback) {
            this.layerFeature.clearLayers();
            var newFeature = {};
            newFeature.geometry = feature.features.geometry;
            newFeature.style = feature.features.styleSelected;
            var newLayer = this.wktToLayer(newFeature);
            this.layerFeature.addLayer(newLayer);
            map.panTo(feature.getLatLng());
            if (callback)
                callback(feature);
            return feature;
        },
        addLayer: function (layerOption, callback) {
            var _this = this;
            var layer = esri_leaflet.dynamicMapLayer(layerOption).addTo(map);
            map.on('click', function (e) {
                var identifiedFeature;
                if (identifiedFeature) {
                    map.removeLayer(identifiedFeature);
                }
                var identify = layer.identify();
                // identify.params.sr = map.options.crs.code.split(":")[1];
                identify.on(map).at(e.latlng).run(function (error, featureCollection) {
                    // make sure at least one feature was identified.
                    if (featureCollection.features.length > 0) {
                        identifiedFeature = featureCollection.features[0];
                        var geoJSON = L.geoJSON(featureCollection.features[0]);
                        geoJSON.setStyle({'color': '#FF0000', 'opacity': 1.0});
                        _this.layerFeature.clearLayers();
                        _this.layerFeature.addLayer(geoJSON);
                        if (identifiedFeature.geometry.type != "Point") {
                            _this.coruscate(geoJSON);
                        }
                        var feature = map._controls.queryLayerControl._unprojectGeoJson(identifiedFeature);
                        callback(feature);
                    }
                });
            });
            return layer;
        },

        /**
         * 要素闪烁效果
         */
        coruscate: function (geoJSON) {
            var stateInterval = true;
            var endStaticIndex = 0;
            var _this = this;
            _this._setIntervalhandler = window.setInterval(function () {
                endStaticIndex++;
                if (stateInterval) {
                    geoJSON.setStyle({'color': '#FF0000', 'opacity': 0});
                } else {
                    geoJSON.setStyle({'color': '#FF0000', 'opacity': 1.0});
                }
                stateInterval = !stateInterval;
                if (endStaticIndex > 7) {
                    if (_this._setIntervalhandler) {
                        window.clearInterval(_this._setIntervalhandler);
                    }
                }
            }, 500);
        },
        //用于只是查询图层属性，但不在地图添加图层
        queryLayerObjects: function (layerOption, callback) {
            var _this = this;
            var _layerTable = layerOption.layerTable;
            if (Object.prototype.toString.call(_layerTable) === '[object Array]') {
                _layerTable = _layerTable[0];
            }
            var url = layerOption.url + "/" + _layerTable;
            //请求结果
            var query = esri_leaflet.query({
                url: url
            });
            query.where(layerOption.where);
            if (layerOption.fields) {
                query.fields(layerOption.fields);
            }
            if (layerOption.token) {
                query.token(layerOption.token);
            }
            if (layerOption.geometry) {
                query.intersects(layerOption.geometry);
            }
            query.params.outSr = map.options.crs.code.split(":")[1];
            query.run(function (error, featureCollection) {
                callback(featureCollection);
            });
        },
        queryLayer: function (layerOption, callback) {
            var _this = this;
            var _layerTable = layerOption.layerTable;
            if (Object.prototype.toString.call(_layerTable) === '[object Array]') {
                _layerTable = _layerTable[0];
            }
            var url = layerOption.url + "/" + _layerTable;
            //请求结果
            var query = esri_leaflet.query({
                url: url
            });
            query.where(layerOption.where);
            if (layerOption.token) {
                query.token(layerOption.token);
            }
            query.params.outSr = map.options.crs.code.split(":")[1];
            query.run(function (error, featureCollection) {
                var feature = map._controls.queryLayerControl._unprojectGeoJson(featureCollection.features[0]);
                var geoJSON = L.geoJSON(feature);
                geoJSON.setStyle({'color': '#FF3399', 'opacity': '1'});
                _this.layerFeature.clearLayers();
                _this.layerFeature.addLayer(geoJSON);
                if (feature.geometry.type != "Point") {
                    _this.coruscate(geoJSON);
                }
                map.fitBounds(geoJSON.getBounds());
                callback(featureCollection.features[0]);
            });
        },
        addLayerForService: function (layerOption, callback, notChangeZoom) {
            var _this = this;
            var _layerTable = layerOption.layerTable;
            if (Object.prototype.toString.call(_layerTable) === '[object Array]') {
                _layerTable = _layerTable[0];
            }
            var url = layerOption.url + "/" + _layerTable;
            //请求结果
            var query = esri_leaflet.query({
                url: url
            });
            if (layerOption.fields) {
                query.fields(layerOption.fields);
            }
            query.where(layerOption.where);
            query.params.outSr = map.options.crs.code.split(":")[1];
            query.run(function (error, featureCollection) {
                if (featureCollection && featureCollection.features && featureCollection.features.length > 0) {
                    var feature = map._controls.queryLayerControl._unprojectGeoJson(featureCollection.features[0]);
                    var geoJSON;
                    if (feature.geometry.type != "Point") {
                        geoJSON = L.geoJSON(feature);
                        if (layerOption.style)
                            geoJSON.setStyle(layerOption.style);
                        if(notChangeZoom) {
							var bounds = geoJSON.getBounds();
							var southWest = bounds._southWest;
							var northWest = bounds._northEast;
							map.panTo({
								lat: (southWest.lat + northWest.lat) / 2,
								lng: (southWest.lng + northWest.lng) / 2
							})
                        } else {
							map.fitBounds(geoJSON.getBounds());
                        }
                        //map.fitBounds(geoJSON.getBounds());
                    } else {
                        var latlng = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
                        geoJSON = L.marker(latlng);
                        if (layerOption.style)
                            geoJSON.setIcon(L.icon(layerOption.style));
                        map.panTo(latlng);
                    }
                    geoJSON.properties = feature.properties;
                    _this.layerFeature.clearLayers();
                    _this.layerFeature.addLayer(geoJSON);
                    callback(geoJSON);
                }
            });
        },
        changeBaseLayer: function (layerInfo) {
            var layerTree = map._controls.layerTreeControl;
            for (var i in layerInfo.layers) {
                var layerId = layerInfo.layers[i];
                var node = $("#dragPanel_widgetID_ag-layerTree  li[dirlayerid='" + layerId + "'");
                var layer = {
                    layerId: node.attr("_layerid")
                };
                if ($.inArray(layerId, layerInfo.selectedLayer) !== -1) {
                    layerTree._updateBaseLayer(layer, true);
                } else {
                    layerTree._updateBaseLayer(layer, false);
                }
            }
        },
        addFeature: function (features, callback, params) {
            var that = this;
            var overlayer = L.featureGroup([]);
            var markerList = {};
            //isOpacity tiptool是否透明，isResetLevel是否缩放等级
            var option = params || {isOpacity: false, isResetLevel: true};
            var isOpacity = option.isOpacity != null ? option.isOpacity : false;
            var isResetLevel = option.isResetLevel != null ? option.isResetLevel : true;
            map.addLayer(overlayer);
            //console.log("isOpacity:"+isOpacity+"||isResetLevel:"+isResetLevel);
            for (var i in features) {
                var obj = features[i];
                var layer = that.wktToLayer(obj);
                layer.on('click ', function (evt) {
                    var feature = evt.target;
                    that.layerFeature.clearLayers();
                    if (feature.features.isOverLayer) {//是否覆盖原来的点
                        var feature = evt.target;
                        that.addLayerLocate(feature);
                    } else {//改变当前点的样式resetLevel
                        feature.style = feature.features.styleSelected;
                        feature.containerPoint = evt.containerPoint;
                        that.setFeatureStyle(feature);
                    }
                    callback(feature);
                });
                if (!isOpacity) {
                    layer.bindTooltip(layer.features.tipContent);
                } else {
                    layer.bindTooltip(layer.features.tipContent, {
                        permanent: true,
                        direction: 'top',
                        className: "_anim-tooltip"
                    }).openTooltip();
                }
                layer.addTo(overlayer);
                markerList[i] = layer;

            }
            if (isResetLevel)//是否定位位置
                map.fitBounds(overlayer.getBounds());
            return {"markerList": markerList, "featureGroup": overlayer};
        },
        addFeatureUnmove: function (features, callback) {
            var that = this;
            var overlayer = L.featureGroup([]);
            var markerList = {};
            map.addLayer(overlayer);
            for (var i in features) {
                var obj = features[i];
                var layer = this.wktToLayer(obj);
                layer.on('click ', function (evt) {
                    this.layerFeature.clearLayers();
                    var feature = evt.target;
                    var newFeature = {};
                    newFeature.geometry = feature.features.geometry;
                    newFeature.style = feature.features.styleSelected;
                    var newLayer = this.wktToLayer(newFeature);
                    this.layerFeature.addLayer(newLayer);
                    callback(feature);
                });
                layer.bindTooltip(layer.features.tipContent);
                layer.addTo(overlayer);
                markerList[i] = layer;
            }
            return {"markerList": markerList, "featureGroup": overlayer};
        },

        wktToLayer: function (feature) {
            var layer;
            if (typeof(feature.geometry) == 'string') {
                layer = Omnivore.wkt.parse(feature.geometry);
                if (feature.geometry.indexOf('POINT') >= 0) {
                    var latlng;
                    for (var _layer in layer._layers) {
                        if (layer._layers.hasOwnProperty(_layer)) {
                            latlng = layer._layers[_layer].getLatLng();
                            latlng = map.options.crs.unproject(L.point(latlng.lng, latlng.lat));
                            break;
                        }
                    }
                    if (feature.style) {
                        layer = L.marker(latlng, {
                            icon: L.icon(feature.style)
                        });
                    } else {
                        layer = L.marker(latlng);
                    }
                    //添加getCenter方法
                    L.Marker.prototype.getCenter = function () {
                        return this.getLatLng();
                    };
                }
            } else {
                if (map.options.crs.code != "EPSG:4326") {
                    feature = map._controls.queryLayerControl._unprojectGeoJson(feature);
                }
                layer = L.geoJSON(feature.geometry);
            }
            layer.features = feature;
            return layer;
        },

        setFeatureStyle: function (feature) {
            var icon = new L.Icon.Default();
            if (feature.style != null) {
                icon = L.icon(feature.style);
            }
            feature.setIcon(icon);
        },

        picPanel: function () {
            require(["Panel"], function (panelObject) {
                panelObject.createPanel("picPanel", "图例", false);
                var picPanel = $("#picPanel").css("height", "220px").css("width", "250px").css("top", $(document).height() - 245 + "px");
                picPanel.find(".panel-body").html("<img src='css/legends.png' />")
                picPanel.find(".closePanel").remove();
                picPanel.show();
            })
        },
        //测距接口
        lengthMeasure: function () {
            this.clearMap();
            DistMeasure.load();

        },
        //测面接口
        areaMeasure: function () {
            this.clearMap();
            AreaMeasure.load();
        },
        //标注接口
        label: function () {
            $("#widgetID_ag-label").click();
        },
        //数据加载
        dataLoad: function () {
            $("#widgetID_ag-loadlayer").click();
        },
        //道路搜索
        roadSearch: function (value) {
            var _this = this;
            var layerOption = {
                url: "http://10.194.170.121/arcgis/rest/services/daolu_na/MapServer",
                layerTable: "7",
                where: "道路名 like '%"+value+"%'",
                fields: "道路名",
                opacity: 1
            };
            this.queryLayerObjects(layerOption, showResult);
            function showResult(featureCollection) {
                if($("#dragPanel_roadSearch").length==0){
                    $("<div class='panel dragPanel div_color_darkBlue' id='dragPanel_roadSearch'>" +
                        "<div class='panel-heading systemcolor color_darkBlue'>搜索结果<i class='fa fa-times closePanel'></i></div>" +
                        "<div class='panel-body'><table id='road-search-table' class='leaflet-bar table-condensed' style='table-layout:fixed;'></table></div></div>").appendTo("#contentDiv").siblings(".dragPanel").hide(); //动态生成面板div
                    $("#dragPanel_roadSearch").draggable({ //设置面板为可拖拽、缩放等
                        handle: ".panel-heading",
                        containment: "#contentDiv",
                        scroll: false
                    })
                    $("#dragPanel_roadSearch").css({"height": "375px", 'width': '300px'});
                    $("#dragPanel_roadSearch .closePanel,#dragPanel_roadSearch .cancel").on("click", function () { //关闭按钮
                        $(this).parent().parent().hide();
                    });
                }else{
                    $("#dragPanel_roadSearch").show();
                }
                var results = [];
                for (var i = featureCollection.features.length - 1; i >= 0; i--) {
                    var result = featureCollection.features[i].properties;
                    result = $.extend({feature: featureCollection.features[i]}, result);
                    results.push(result);
                }

                var columns = [{field: '道路名', title: '道路名', sortable: true}];
                $('#road-search-table').bootstrapTable('destroy');
                $('#road-search-table').bootstrapTable({
                    data: results,
                    cache: false,
                    striped: true,
                    clickToSelect: true,
                    columns: columns,
                    height: 300,
                    onClickRow: function (row, $element, field) {
                        var feature = row.feature;
                        if (feature.geometry.type == 'LineString' || feature.geometry.type == 'MultiLineString') {//线定位
                            var _feature = map._controls.queryLayerControl._unprojectGeoJson(feature);
                            var geoJSON = L.geoJSON(_feature);
                            geoJSON.setStyle({'color': '#FF3399', 'opacity': '1'});
                            _this.layerFeature.clearLayers();
                            _this.layerFeature.addLayer(geoJSON);
                            map.fitBounds(geoJSON.getBounds());
                        }
                    }
                });
            }
        },
        showTipByLevel: function (leavel, pointObj) {
            for (var i in pointObj) {
                var _layer = pointObj[i];
                if (!_layer.getTooltip()) {
                    _layer.bindTooltip(_layer.features.tipContent, {
                        permanent: true,
                        direction: 'top',
                        className: "_anim-tooltip"
                    }).closeTooltip();
                }
            }
            map.on("zoomend", function () {
                if (map.getZoom() >= leavel) {
                    for (var i in pointObj) {
                        var _layer = pointObj[i];
                        if (!_layer.isTooltipOpen()) {
                            _layer.openTooltip();
                        } else {
                            break;
                        }
                    }
                } else {
                    for (var i in pointObj) {
                        var _layer = pointObj[i];
                        if (_layer.getTooltip() && _layer.isTooltipOpen()) {
                            _layer.closeTooltip();
                        } else {
                            break;
                        }
                    }
                }
            });

        },
        //清除接口
        clearMap: function () {
            if (map && map._controls) {
                //清空搜索
                if (map._controls.searchControl) {
                    map._controls.searchControl._cleanLayers();
                    map._controls.searchControl.option.resultPannel.hide();
                }
                //清空鼠标位置
                if (map._controls.coordinatesControl) {
                    map._controls.coordinatesControl._cleanLayers();
                }
                //清空标注
                if (map._controls.labelControl) {
                    map._controls.labelControl._cleanLayers();
                    var display = map._controls.labelControl.pannelContainer.css('display');
                    if (display != 'none') {//执行清空地图操作时，如果当前微件是标注，则标注面板的“在地图上显示”不勾选
                        var check = map._controls.labelControl.showLabelCheckbox.prop("checked");
                        if (check) {
                            map._controls.labelControl.showLabelCheckbox.prop("checked", false);
                        }
                    }
                }
                //清空测距
                if (map._controls.lengthMeasureControl) {
                    map._controls.lengthMeasureControl._cleanLayers();
                    map._controls.lengthMeasureControl.handler.disable();
                }
                //清空测面
                if (map._controls.areaMeasureControl) {
                    map._controls.areaMeasureControl._cleanLayers();
                    map._controls.areaMeasureControl._finishMeasure();
                }
                // 清空书签
                if (map._controls.bookmarkControl) {
                    map._controls.bookmarkControl._cleanLayers();
                }
            }
        },

        //拉框放大
        zoomBox: function () {
            require(["ZoomBox"], function (ZoomBox) {
                ZoomBox.load();
            });
        },
        //平移
        pan: function () {
            //平移是默认的，只要把其他功能绑定在鼠标上的事件干掉即可
            this.clearMap();
            if (map._controls.zoomInControl) {
                require(["ZoomBox"], function (ZoomBox) {
                    ZoomBox.remove();
                });
            }
            if (map._controls.identifyControl) {
                require(["Identify"], function (Identify) {
                    Identify.remove();
                });
            }
        },

        //卷帘
        SideBySide: function () {
            require(["SideBySide"], function (SideBySide) {
                SideBySide.load();
            });
        },
        addTiledMapLayer: function (url, callback) {
            require(["esri-leaflet"], function (esri_leaflet) {
                var layer = esri_leaflet.tiledMapLayer({
                    url: url,
                    zIndex: 99
                }).addTo(map);
                callback(layer);
            });
        },
        addDynamicMapLayer: function (url, layerTable, callback, option) {
            require(["esri-leaflet"], function (esri_leaflet) {
				var opacity = 1;
            	if(option && option.opacity) {
					opacity = option.opacity;
				}
                if (typeof(layerTable) == "string")
                    layerTable = parseInt(layerTable);

                var layer = esri_leaflet.dynamicMapLayer({
                    url: url,
                    layers: layerTable,
                    opacity: opacity
                }).addTo(map);

                if (option && option.zoom) {
                    // map.setZoom(option.zoom);
                    // map.panTo(map.options.crs.unproject(L.point(option.xy[0], option.xy[1])));
                	map.setView(option.xy ? map.options.crs.unproject(L.point(option.xy[0], option.xy[1])) : map.getCenter(), option.zoom);
                }
                callback(layer);
            });
        },
        _Identify: function (latlng, dirLayerId, callBack) {
            var _this = this;
            //最后一级的缓冲半径,单位为degree
            var minR = 0.00004;
            //当前地图等级缓冲半径
            var currentR = Math.pow(2, map.getMaxZoom() - map._zoom) * minR;
            _this.buffer(latlng, currentR, dirLayerId, callBack);
        },
        buffer: function (latlng, r, dirLayerId, callBack) {
            var _this = this;
            var wkt = 'POINT(' + latlng.lng + ' ' + latlng.lat + ')';
            var data = 'wkt=' + wkt + '&dBuffer=' + r;
            var url = agsupportURL + '/agsupport/operate/buffer';
            $.post(url, data, function (r) {
                _this._IdentifyQueryLayer(r, dirLayerId, callBack);
            });
        },
        _IdentifyQueryLayer: function (wkt, dirLayerId, callBack) {
            var _this = this;
            var layer = map._controls.layerTreeControl.getObjectByDirlayerId(dirLayerId);
            (function (layer) {
                var layers = Omnivore.wkt.parse(wkt)._layers;
                for (var _layer in layers) {
                    if (layers.hasOwnProperty(_layer)) {
                        _this.geoFilter = layers[_layer];
                        break;
                    }
                }
                var option = {
                    dirLayerId: layer.dirLayerId,
                    url: layer.layer.options.url,
                    name: layer.name,
                    layerType: layer.layerType,
                    layerTable: layer.layerTable,
                    geoFilter: _this.geoFilter
                };
                _this.queryArcGISServer_rest(option, callBack);
            }(layer));
        },
        queryArcGISServer_rest: function (option, callback) {
            var _this = this;
            var _northEast = map.options.crs.project(map.getBounds()._northEast),
                _southWest = map.options.crs.project(map.getBounds()._southWest),
                mapExtent = _southWest.x + "," + _southWest.y + "," + _northEast.x + "," + _northEast.y,
                coordinates = option.geoFilter.feature.geometry.coordinates[0],
                epsg = map.options.crs.code.split(":")[1],
                r = "[[";
            $.each(coordinates, function (id, coordinate) {
                var latlon = map.options.crs.project(L.latLng(coordinate[1], coordinate[0]));
                r += "[" + latlon.x + "," + latlon.y + "],"
            });
            var rings = r.substring(0, r.length - 1) + "]]";
            var url = option.url + 'identify?geometry={"rings":' + rings + ',"spatialReference":{"wkid":' + epsg + '}}&geometryType=esriGeometryPolygon&sr='
                + epsg + '&layers=top&tolerance=3&mapExtent=' + mapExtent + '&imageDisplay=1056,816,96&f=pjson';
            if (option.token) {
                url += '&token=' + option.token;
            }
            $.ajax({
                url: url,
                // type: "post",
                type: "get",
                dataType: "json",
                async: false,
                success: function (json) {
                    var results = json.results;
                    if (results && results.length > 0) {//组装信息
                        var data = [];
                        $.each(results, function (id, result) {

                            var item = result.attributes,
                                geometry = result.geometry,
                                geometryJson = {};
                            if (result.displayFieldName) {
                                item.displayFieldName = result.displayFieldName;
                            }
                            if (geometry.hasOwnProperty('paths')) {
                                var _paths = geometry.paths;
                                if (_paths.length > 1) {
                                    var paths = [];
                                    for (var i = 0; i < _paths.length; i++) {
                                        paths.push(_paths[i]);
                                    }
                                    geometryJson.type = "MultiLineString"; //已测
                                    geometryJson.coordinates = paths;
                                } else {
                                    geometryJson.type = "LineString";
                                    geometryJson.coordinates = _paths[0];
                                }
                            } else if (geometry.hasOwnProperty('rings')) {
                                var _rings = geometry.rings;
                                if (_rings.length > 1) {
                                    var rings = [];
                                    for (var i = 0; i < _rings.length; i++) {
                                        rings.push(_rings[i]);
                                    }
                                    geometryJson.type = "MultiPolygon";
                                    geometryJson.coordinates = [rings];
                                } else {
                                    geometryJson.type = "Polygon"; //已测
                                    geometryJson.coordinates = _rings;
                                }
                            } else {
                                geometryJson.type = "Point";
                                geometryJson.coordinates = [geometry.x, geometry.y]; //已测
                            }
                            item.geometry = geometryJson;
                            data.push(item);
                        });
                        callback(data);
                    } else {
                        callback([]);
                    }
                },
                error: function (e) {
                }
            });
        },
        coruscatePoint: function (feature) {
            var latlng = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
            var layer = L.circleMarker(latlng, {radius: 5, color: "red", fill: true, fillColor: "red", fillOpacity: 1});
            setTimeout(function () {
                layer.addTo(map);
                setTimeout(function () {
                    layer.remove();
                    setTimeout(function () {
                        layer.addTo(map);
                    }, 200);
                }, 300);
            }, 300);
        },
        getMapScale: function (zoom) {
            if (zoom) {
                return "1:" + 96 / (map.options.crs.scale(zoom) * 0.254);
            } else {
                return "1:" + 96 / (map.options.crs.scale(map.getZoom()) * 0.254);
            }
        },
        addCanvasObjToLayer: function (obj, layer, callback) {
            var icon = new L.Icon.Default(), _radius;
            var _this = this;
            if (obj.style) {
                icon = L.icon(obj.style);
                _radius = (obj.style.iconSize[0]) / 2;
            } else {
                _radius = 5;
            }
            var latlng = map.options.crs.unproject(L.point(obj.coor[0], obj.coor[1]));
            if ($(".leaflet-overlay-pane canvas").length < 2) {
                // $(".leaflet-overlay-pane").empty();
                var _labelTextCollision = new LabelTextCollision({
                    collisionFlg: true
                });
                if (map.options.renderer) {
                    map.options["renderer"] = _labelTextCollision;
                } else {
                    map.options.renderer = _labelTextCollision;
                }
            }
            var _label = L.circleMarker(latlng, {
                radius: _radius,
                color: "rgba(225, 225, 225, 0.1)",
                opacity: "0.1",
                text: obj.label.text,
                textColor: obj.label.color != null && obj.label.color != "" ? obj.label.color : undefined,
                font: obj.label.font != null && obj.label.font != "" ? obj.label.font : undefined
            });
            _label.features = obj.feature;
            var _labelClickFunc = function (evt) {
				_this.layerFeature.clearLayers();
				var feature = evt.target;
				var newFeature = {};
				newFeature.geometry = feature.features.geometry;
				newFeature.style = feature.features.styleSelected;
				var newLayer = _this.wktToLayer(newFeature);
				newLayer.on('click', function() {
					if (callback) {
						callback(feature);
					}
                });
				_this.layerFeature.addLayer(newLayer);
				if (callback) {
					callback(feature);
				}
			};
            _label.on('click', _labelClickFunc);
            var _point = L.marker(latlng, {icon: icon});
            _point.on('click', _labelClickFunc);
            _point.features = obj.feature;
            layer.addLayer(_label);
            layer.addLayer(_point);
        },
        IntelligenceLabel: function (opt, callback) {
            var layers = L.featureGroup();
            for (var i in opt) {
                var obj = opt[i];
                this.addCanvasObjToLayer(obj, layers, callback);
            }
            layers.addTo(map);
            return layers;
        },
        _singleIntelligenceLabel: function (obj, callback) {
            this.layerFeature.clearLayers();
            this.addCanvasObjToLayer(obj, this.layerFeature, callback);
            var latlng = map.options.crs.unproject(L.point(obj.coor[0], obj.coor[1]));
            map.panTo(latlng);
        },
        drawGraph: function (type, callback) {
            var _this = this;
            map._controls.queryLayerControl._clearDraw();
            switch (type) {
                case "polyline":
                    map._controls.queryLayerControl.drawPolyline.enable();
                    map._controls.queryLayerControl.drawPolyline.afterDraw = function (layer) {
                        callback(_this.pointsToWkt(map._controls.queryLayerControl._projectLatLngs(layer._latlngs), "polyline"));
                    };
                    break;
                case "marker":
                    map._controls.queryLayerControl.drawMarker.enable();
                    map._controls.queryLayerControl.drawMarker.afterDraw = function (layer) {
                        callback(_this.pointsToWkt(map._controls.queryLayerControl._projectLatLngs(layer._latlng), "marker"));
                    };
                    break;
                case "polygon":
                    map._controls.queryLayerControl.drawPolygon.enable();
                    map._controls.queryLayerControl.drawPolygon.afterDraw = function (layer) {
                        callback(_this.pointsToWkt(map._controls.queryLayerControl._projectLatLngs(layer._latlngs), "polygon"));
                    };
                    break;
                case "rectangle":
                    map._controls.queryLayerControl.drawRectangle.enable();
                    map._controls.queryLayerControl.drawRectangle.afterDraw = function (layer) {
                        callback(_this.pointsToWkt(map._controls.queryLayerControl._projectLatLngs(layer._latlngs), "polygon"));
                    };
                    break;
            }
        },
        pointsToWkt: function (points, type, mRadius) {
            var wkt;
            if (!points) {
                return null;
            }
            if (type === "marker") {
                wkt = "POINT (" + points.lng + " " + points.lat + ")";
            } else if (type === "polyline") {
                wkt = "LINESTRING (";
                for (var i in points) {
                    wkt += points[i].lng + " " + points[i].lat + ",";
                }
                wkt = wkt.substring(0, wkt.length - 1) + ")";
            } else if (type === "circle") {
                wkt = "POLYGON ((";
                if (AgMap.options.crs.code == 'EPSG:4326') {
                    mRadius = mRadius / 111194.872221777;
                }
                var coorlist = this.getPointBuffer(points.lng, points.lat, mRadius, 10);
                for (var i in coorlist) {
                    wkt += coorlist[i][0] + " " + coorlist[i][1] + ",";
                }
                wkt = wkt.substring(0, wkt.length - 1) + "))";
            } else {
                //  只考虑单面
                if (points[0].length < 1) {
                    return null;
                }
                wkt = "POLYGON ((";
                for (var i in points[0]) {
                    wkt += points[0][i].lng + " " + points[0][i].lat + ",";
                }
                wkt += points[0][0].lng + " " + points[0][0].lat + "))";
            }
            return wkt;
        },
        getPointBuffer: function (x, y, r, angle) {
            var strXY = "";
            var points = new Array();
            var sinValue = Math.sin(angle);
            var cosValue = Math.cos(angle);
            for (var i = 0; i <= 360; i += angle) {
                points.push([r * Math.cos((Math.PI * i) / 180) + x, r * Math.sin((Math.PI * i) / 180) + y])
            }
            return points;
        },
        wktToGeojson: function (wkt,type) {
        	// 圆缓冲
        	if(type=="circle"){
        		var _this = this;
                // 添加图形
                _this.layerFeature.clearLayers();
                var c = L.geoJSON(map._controls.queryLayerControl._unprojectGeometry(Terraformer.WKT.parse(wkt))).setStyle({
                    'color': '#FF0000',
                    'opacity': 1.0
                });
               c.addTo(_this.layerFeature);  // geojson对象    可以用L.geoJSON()渲染加载到Map
                map.fitBounds(c.getBounds());
        	}            
            return Terraformer.WKT.parse(wkt);
        },
        geojsonToWkt: function (geojson) {
            return Terraformer.WKT.convert(geojson);
        },
        test: function() {
			// 将行政区划图层加载到地图上展示

			var xzqhLayer = esri_leaflet.featureLayer({
                url: 'http://10.194.170.121/arcgis/rest/services/thematic/XZQH/MapServer/0',
				useCors: true
            }).addTo(map);
			xzqhLayer.query().run(function(xzqhs) {
			    console.log("1111", xzqhs);
            });
        }
    };

    return {
        init: function () {
            return new MapInterface();
        }
    }
});

