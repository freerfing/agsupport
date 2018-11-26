/**
 * Created by czh on 2017-09-06.
 */
define(["esri-leaflet", "Omnivore"], function (esri_leaflet, Omnivore) {
    function Mobile() {
        var _this = this;
        this.layerFeature = L.featureGroup([]);
        this.labelArr = [];
        this.geoFilter;
    }

    Mobile.prototype = {
        //  地图放大
        zoomIn: function () {
            map.zoomIn();
        },
        //  地图缩小
        zoomOut: function () {
            map.zoomOut();
        },
        //  平移
        panTo: function (point) {
            map.panTo(L.latLng(point[1], point[0]));
        },
        //  设置缩放等级
        setZoom: function (zoom) {
            map.setZoom(parseInt(zoom));
        },
        //  全图
        viewGlobal: function () {
            map.setView(map.options.center, map.options.zoom);
        },
        //  定位
        location: function (coordinate) {
            if (coordinate && coordinate.length > 1) {
                if (map.options.crs.code != 'EPSG:4326') {
                    var transLatlng = map.options.crs.unproject(L.point(coordinate[0], coordinate[1]));
                    coordinate = transLatlng;
                }
                var coor = L.latLng(coordinate.lat, coordinate.lng);
                this.locateLayer = L.marker(coor, {
                    icon: L.icon({iconUrl: "../../../../../resources/images/locate_select.png", iconSize: [21, 21]})
                });
                map.addLayer(this.locateLayer);
                map.panTo(coor);
            }
        },
        cleanLocation: function () {
            if (this.locateLayer) {
                map.removeLayer(this.locateLayer)
            }
        },
        //  鼠标事件
        listenEvent: function (action, callback) {
            if ("click" == action) {
                map.on({'click': callback});
            } else {
                map.on({'dblclick': callback});
            }
        },
        addFeature: function (features) {
            var _this = this;
            var markerList = {};
            var overlayer = L.featureGroup([]);
            map.addLayer(this.layerFeature);
            for (var i in features) {
                var obj = features[i];
                var layer = this.wktToLayer(obj);
                layer.addTo(this.layerFeature);
                layer.addTo(overlayer);
                markerList[i] = layer;
            }
            map.fitBounds(overlayer.getBounds());
            return markerList;
        },
        addSquare: function (feature) {
            map.addLayer(this.layerFeature);
            var layer = this.wktToLayer(feature);
            layer.addTo(this.layerFeature);
            return layer;
        },
        wktToLayer: function (feature) {
            var layer;
            var _this = this;
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
        //  移除图层
        removeLayer: function (feature) {
            this.layerFeature.removeLayer(feature);
        },
        //  清空所有图层
        removeAllLayers: function () {
            map.removeLayer(this.layerFeature);
            this.layerFeature.clearLayers();
        },
        //  经纬度转换
        latlngToPoint: function (latlng) {
            latlng = JSON.parse(latlng);
            var point = map.options.crs.project(L.latLng(latlng));
            return "[" + point.x + "," + point.y + "]";
        },
        poitToLatlng: function (point) {
            point = JSON.parse(point);
            var latlng = map.options.crs.unproject(L.point(point));
            return "[" + latlng.lat + "," + latlng.lng + "]";
        },
        //  测距
        lengthMeasure: function (flag) {
            if (map._controls.lengthMeasureControl) {
                map._controls.lengthMeasureControl._cleanLayers();
                map._controls.lengthMeasureControl.handler.disable();
            }
            if (flag) {
                require(["DistMeasure"], function (DistMeasure) {
                    DistMeasure.load();
                });
            } else
                map._controls.lengthMeasureControl.handler._finishShape();
        },
        //  测面
        areaMeasure: function (flag) {
            if (map._controls.areaMeasureControl) {
                map._controls.areaMeasureControl._cleanLayers();
                map._controls.areaMeasureControl._finishMeasure();
            }
            if (flag) {
                require(["AreaMeasure"], function (AreaMeasure) {
                    AreaMeasure.load();
                });
            } else
                map._controls.areaMeasureControl._handleMeasureDoubleClick();
        },
        //  取消测距
        quitMeasure: function () {
            if (map._controls.lengthMeasureControl) {
                map._controls.lengthMeasureControl._cleanLayers();
                map._controls.lengthMeasureControl.handler.disable();
            }
            if (map._controls.areaMeasureControl) {
                map._controls.areaMeasureControl._cleanLayers();
                map._controls.areaMeasureControl._finishMeasure();
            }
        },
        //  图层打开或移除
        onTreeClcik: function (dirLayerId) {
            var $li = $("#dragPanel_widgetID_ag-layerTree").find("li[dirLayerId = '" + dirLayerId + "']");
            $($li).find("span.check-icon").click();
        },
        //  获取当前图层树所有选中的图层
        getLayerList: function () {
            return map._controls.layerTreeControl.getLayersChecked();
        },
        //  添加圆形
        addCircle: function (center, style) {
            center = JSON.parse(center);
            style = JSON.parse(style);
            var circle = L.circle(L.latLng(center), {
                radius: style.radius,
                color: style.color,
                fillColor: style.fillColor,
                fillOpacity: style.fillOpacity
            }).addTo(this.layerFeature);
            map.addLayer(this.layerFeature);
            return circle;
        },
        _Identify: function (latlng, callBack) {
            var _this = this;
            //最后一级的缓冲半径,单位为degree
            var minR = 0.00001;
            //当前地图等级缓冲半径
            var currentR = Math.pow(2, map.getMaxZoom() - map._zoom) * minR;
            _this.buffer(latlng, currentR, callBack);
        },
        buffer: function (latlng, r, callBack) {
            var _this = this;
            var wkt = 'POINT(' + latlng.lng + ' ' + latlng.lat + ')';
            var data = 'wkt=' + wkt + '&dBuffer=' + r;
            var url = agsupportURL + '/agsupport/operate/buffer';
            $.post(url, data, function (r) {
                _this._IdentifyQueryLayer(r, callBack);
            });
        },
        _IdentifyQueryLayer: function (wkt, callBack) {
            var _this = this;
            var checkedLayers = map._controls.layerTreeControl.getLayersChecked();
            for (var i = 0; i < checkedLayers.length; i++) {
                var layer = checkedLayers[i];
                (function (squence, layer) {//squence表示for循环过程中i的值,用来检查整个循环是否执行完成
                    //vectorDirLayerId为选中图层绑定的矢量图层的dirLayerId
                    var layers = Omnivore.wkt.parse(wkt)._layers;
                    for (var _layer in layers) {
                        if (layers.hasOwnProperty(_layer)) {
                            _this.geoFilter = layers[_layer];
                            break;
                        }
                    }
                    $.post(agsupportURL + '/agsupport/dir/findBindAuthorizedVector/', {
                        "dirLayerId": layer.dirLayerId,
                        "userId": userId
                    }, function (vectorLayerId) {
                        if (vectorLayerId != "" && vectorLayerId != null) {
                            $.post(agsupportURL + '/agsupport/dir/findLayerByDirLayerId/' + vectorLayerId, null, function (info) {
                                var option = {
                                    dirLayerId: vectorLayerId,
                                    url: info.url,
                                    name: info.name,
                                    layerType: info.layerType,
                                    layerTable: info.layerTable,
                                    type: 'spatial',
                                    geoFilter: _this.geoFilter,
                                    geoType: 'Polygon'
                                };

                                //获取layer所有字段信息
                                $.post(agsupportURL + '/agsupport/field/getLayerConfByUserId', {
                                    dirLayerId: option.dirLayerId,
                                    userId: userId
                                }, function (result) {
                                    option.fieldConf = result.fieldConf;
                                    option.layerConf = result.layerConf;
                                    _this.queryVectorLayer(squence, option, callBack);
                                });
                            });
                        } else {
                            //获取layer所有字段信息
                            $.post(agsupportURL + '/agsupport/field/getLayerConfByUserId', {
                                dirLayerId: layer.dirLayerId,
                                userId: userId
                            }, function (result) {
                                var option = {
                                    dirLayerId: layer.dirLayerId,
                                    url: layer.layer.options.url,
                                    name: layer.name,
                                    layerType: layer.layerType,
                                    layerTable: layer.layerTable,
                                    geoFilter: _this.geoFilter,
                                    geometryField: layer.layer.options.geometryField,
                                    typeNS: layer.layer.options.typeNS,
                                    typeName: layer.layer.options.typeName
                                };
                                option.fieldConf = result.fieldConf;
                                option.layerConf = result.layerConf;
                                if (layer.layerType == "070002" || layer.layerType == "020202") {
                                    if (map.options.crs.code != 'EPSG:4326') {
                                        _this.queryArcGISServer_rest(squence, option, callBack);
                                    } else {
                                        _this.queryArcGISServer(squence, option, callBack);
                                    }
                                } else if (layer.layerType == "040002") {

                                } else if (layer.layerType == "040003") {
                                    _this.queryGeoServerWFS(squence, option, callBack);
                                }
                            });
                        }
                    });
                }(i, layer));
            }
        },
        queryVectorLayer: function (squence, option, callback) {
            var url = agsupportURL + '/agsupport/layer/queryVectorLayer';
            var param = {
                dirLayerId: option.dirLayerId,
                userId: userId,
                type: option.geoType,
                points: option.geoFilter == null ? '' : JSON.stringify(option.geoFilter._latlngs[0])
            };
            $.post(url, param, function (data) {
                callback(data);
            });
        },
        queryArcGISServer_rest: function (squence, option, callback) {
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
            $.ajax({
                url: option.url + 'identify?geometry={"rings":' + rings + ',"spatialReference":{"wkid":' + epsg + '}}&geometryType=esriGeometryPolygon&sr='
                + epsg + '&layers=top&tolerance=3&mapExtent=' + mapExtent + '&imageDisplay=1056,816,96&f=pjson',
                type: "post",
                dataType: "json",
                async: false,
                success: function (json) {
                    var results = json.results;
                    if (results.length > 0) {//组装信息
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
                                    geometryJson.coordinates = rings;
                                } else {
                                    geometryJson.type = "Polygon"; //已测
                                    geometryJson.coordinates = _rings;
                                }
                            } else {
                                geometryJson.type = "Point";
                                geometryJson.coordinates = [geometry.x, geometry.y]; //已测
                            }
                            item.agecc174e3e0 = geometryJson;
                            data.push(item);
                        });
                        if (option.layerTable == null && option.fieldConf.length == 0) {
                            $.each(data[0], function (id, val) {
                                if (id != "agecc174e3e0") {
                                    var obj = {};
                                    obj.fieldName = id;
                                    obj.fieldNameCn = id;
                                    obj.editable = 0;
                                    obj.viewInResult = 1;
                                    option.fieldConf.push(obj);
                                }
                            });
                        }
                        callback(data);
                    } else {
                        callback([]);
                    }
                }
            });

        },
        queryArcGISServer: function (squence, option, callback) {
            var url = "";
            if (option.layerType == "020202") {
                url = option.url + option.layerTable;
            } else if (option.layerType == "070002") {
                url = option.url;
            }
            var query = esri_leaflet.query({
                url: url
            });
            query.intersects(option.geoFilter);
            query.run(function (error, results) {
                //组装信息
                if (results != null) {
                    var data = [];
                    for (var i = 0; i < results.features.length; i++) {
                        var item = results.features[i].properties;
                        item.agecc174e3e0 = results.features[i].geometry;
                        data.push(item);
                    }
                    callback(data);
                } else {
                    callback([]);
                }
            });
        },
        queryGeoServerWFS: function (squence, option, callback) {
            //空间字段
            var filter = null;
            require(["WFS"], function (WFS) {
                filter = new L.Filter.Intersects().append(option.geoFilter, option.geometryField, map.options.crs);
                var wfs_polygon_geoserver = new WFS({
                    url: option.url,
                    typeNS: option.typeNS,
                    typeName: option.typeName,
                    geometryField: option.geometryField,
                    filter: filter
                }).once('load', function () {
                    if (wfs_polygon_geoserver != null) {
                        var features = wfs_polygon_geoserver.toGeoJSON().features;
                        //组装信息
                        var data = [];
                        for (var i = 0; i < features.length; i++) {
                            var item = features[i].properties;
                            item.agecc174e3e0 = features[i].geometry;
                            data.push(item);
                        }
                        callback(data);
                    } else {
                        callback([]);
                    }
                });
            });
        },
        //  返回可查询字段
        checkField: function (dirLayerId, callback) {
            $.post(agsupportURL + '/agsupport/field/getLayerConfByUserId', {
                dirLayerId: dirLayerId,
                userId: userId
            }, function (result) {
                var fieldConf = result.fieldConf;
                var layerConf = result.layerConf;
                var fieldArr = [];
                var layer = map._controls.layerTreeControl.getObjectByDirlayerId(dirLayerId);
                var result;
                if (!layer)
                    result = "{'success':false,'message':'找不到该图层！'}";
                else {
                    if (layerConf.queryable == "1") {
                        if (fieldConf.length > 0) {
                            for (var k in fieldConf) {
                                if (layer.layerType.substr(0, 2) != '01') {
                                    if (fieldConf[k].fieldName.toUpperCase() == "OBJECTID" || fieldConf[k].fieldName.toUpperCase() == "SHAPE")
                                        continue;
                                    if (fieldConf[k].fieldType.toUpperCase() != "ESRIFIELDTYPESTRING" && fieldConf[k].fieldType.toUpperCase() != "STRING")
                                        continue;
                                }
                                if (fieldConf[k].viewInBlurquery == '1') {
                                    var field = {};
                                    field.fieldName = fieldConf[k].fieldName;
                                    field.fieldNameCn = fieldConf[k].fieldNameCn;
                                    fieldArr.push(field);
                                }
                            }
                            if (fieldArr.length > 0)
                                result = "{'success':false,'message':" + JSON.stringify(fieldArr) + "}";
                            else
                                result = "{'success':false,'message':'该图层没有可查询字段！'}";
                        } else
                            result = "{'success':false,'message':'该图层没有可查询字段！'}";
                    } else
                        result = "{'success':false,'message':'该图层不能查询！'}";
                }
                callback(result);
            });
        },
        /**
         * option = {
          * nameCn: null,//图层别名
          * type: 'property',//查询类型 property  spatial
          * geoFilter: null,//空间查询条件
          * data: null,//图层拓展字段
          * geoType: 'All',//空间查询类型 All Extent Envelop Polyline Polygon geoJson wkt
          * queryNames  //  图层属性查询条件
          * queryValue  //  图层属性查询值
          * orderByFieldName    //分组字段
          * order   //ASC 、DESC
          * }
         * */
        queryLayer: function (option, callback) {
            option = JSON.parse(option);
            var _this = this;
            var control = map._controls.queryLayerControl;
            $.post(agsupportURL + '/agsupport/dir/findLayerByNameCn', {nameCn: option.nameCn}, function (info) {
                option.dirLayerId = info.dirLayerId;
                option.layerType = info.layerType;
                option.name = info.name;
                option.layerTable = info.layerTable;
                option.data = JSON.parse(info.data);
                if (info.isProxy == '1') {
                    option.url = basePath + '/agcom/proxy.jsp?' + info.proxyUrl + "/_" + userId;
                } else {
                    option.url = info.url;
                }
                if (option.queryValue != null && option.queryValue != "" && option.queryNames.length > 0) {
                    option.where = "( ";
                    for (var i = 0; i < option.queryNames.length; i++) {
                        if (i == 0) {
                            option.where += option.queryNames[i] + " like '%" + option.queryValue + "%' ";
                        } else {
                            option.where += " or " + option.queryNames[i] + " like '%" + option.queryValue + "%' ";
                        }
                    }
                    option.where += " )";
                } else {
                    option.where = " 1=1 ";
                }

                if (option.layerType == "070002") {
                    _this._queryArcGISServer(option, callback);
                } else if (option.layerType == "020202") {
                    _this._queryArcGISServer(option, callback);
                } else if (option.layerType == "040002") {
                    //arcgis的wfs
                } else if (option.layerType == "040003") {
                    _this._queryGeoServerWFS(option, callback);
                } else if (option.layerType == "010001") {
                    _this._queryVectorLayer(option, callback);
                }

            });
        },
        _queryArcGISServer: function (option, callback) {
            var _this = this;
            var url = option.url + "/" + option.layerTable;
            var query = esri_leaflet.query({
                url: url
            });
            query.params.outSr = map.options.crs.code.split(":")[1];
            if (option.type == 'spatial') {
                if (option.geoType == 'All') {
                    query.where("1=1");
                } else if (option.geoType == 'Extent') {
                    query.intersects(map.getBounds());
                } else if (option.geoType == "geoJson") {
                    query.intersects(_this.wktToLayer(option.geoFilter))
                    if (option.where) {
                        if (option.orderByFieldName) {
                            if (option.order)
                                query.where(option.where).orderBy(option.orderByFieldName, option.order);
                            else
                                query.where(option.where).orderBy(option.orderByFieldName, 'ASC');
                        } else
                            query.where(option.where);
                    }
                } else {
                    query.intersects(option.geoFilter);
                }
            } else {
                if (option.orderByFieldName) {
                    if (option.order)
                        query.where(option.where).orderBy(option.orderByFieldName, option.order);
                    else
                        query.where(option.where).orderBy(option.orderByFieldName, 'ASC');
                } else
                    query.where(option.where);
            }
            query.run(function (error, results, response) {
                //组装信息
                if (results != null) {
                    var datas = new Array();
                    for (var i = 0; i < results.features.length; i++) {
                        var data = results.features[i].properties;
                        data.displayFieldName = response.displayFieldName;
                        data.agecc174e3e0 = results.features[i].geometry;
                        datas.push(data);
                    }
                    callback(datas);
                } else {
                    callback([]);
                }
            });
        },
        _queryVectorLayer: function (option, callback) {
            var url = agsupportURL + '/agsupport/layer/queryVectorLayerPage';
            var param = {
                dirLayerId: option.dirLayerId,
                userId: userId,
                where: option.where,
                type: "geoJson",
                points: JSON.stringify(option.geoFilter)
            };
            var tableOption = {
                id: map._controls.queryLayerControl._formatStr(option.layerTable),
                name: option.name,
                url: url,
                param: param
            };
            callback(tableOption);
        },
        _queryGeoServerWFS: function (option, callback) {
            var geometryField = option.data.geometryField;
            var filter = null;
            var _this = this;
            require(["WFS"], function (WFS) {
                if (option.type == 'spatial' && option.geoType != 'All') {
                    if (option.geoType == 'Extent') {
                        filter = new L.Filter.Intersects().append(map.getBounds(), geometryField, map.options.crs);
                    } else if (option.geoType == 'geoJson') {
                        filter = new L.Filter.Intersects().append(_this.wktToLayer(option.geoFilter), geometryField, map.options.crs);
                    } else {
                        filter = new L.Filter.Intersects().append(option.geoFilter, geometryField, map.options.crs);
                    }
                } else {
                    if (option.queryNames != null && option.queryNames.length > 0) {
                        filter = new L.Filter.OrLike().append(option.queryNames, option.queryValue);
                    }
                }
                var wfs_polygon_geoserver = new WFS({
                    url: option.url,
                    typeNS: option.data.typeNS,
                    typeName: option.data.typeName,
                    geometryField: geometryField,
                    filter: filter
                }).once('load', function () {
                    if (wfs_polygon_geoserver != null) {
                        //添加到列表中
                        var features = wfs_polygon_geoserver.toGeoJSON().features;
                        //组装信息
                        var datas = new Array();
                        for (var i = 0; i < features.length; i++) {
                            var data = features[i].properties;
                            data.agecc174e3e0 = JSON.stringify(features[i].geometry);
                            datas.push(data);
                        }
                        callback(datas);
                    } else {
                        callback([]);
                    }
                });
            });
        },
        //  周边查询
        findTask: function (dirLayerId, text, callback) {
            $.post(agsupportURL + '/agsupport/dir/findLayerByDirLayerId/' + dirLayerId, null, function (info) {
                var url;
                if (info.isProxy == '1') {
                    url = basePath + '/agcom/proxy.jsp?' + info.proxyUrl + "/_" + userId;
                } else {
                    url = info.url;
                }
                var find = esri_leaflet.find({
                    url: url
                });
                find.layers()
                    .text(text);
                find.run(function (error, featureCollection, response) {
                    callback(featureCollection, response);
                });
            })
        },
        //  行政区域查询
        queryAdministrationRegion: function (url, feature, callback) {
            var query = esri_leaflet.query({url: url});
            if (feature) {
                if (map.options.crs.code != "EPSG:4326") {
                    feature = map._controls.queryLayerControl._unprojectGeoJson(feature);
                }
                query.where("1=1").intersects(L.geoJSON(feature.geometry).getBounds());
            }
            query.params.outSr = map.options.crs.code.split(":")[1];
            query.run(function (error, featureCollection, response) {
                if (featureCollection) {
                    var arr = featureCollection.features;
                    callback(arr);
                } else
                    callback([]);
            });
        },
        //  返回标注信息
        findLabelData: function (callback) {
            var _this = this;
            $.ajax({
                url: agsupportURL + "/agsupport/funcConf/findAllByFuncIdAndUserId",
                type: "post",
                data: {
                    funcId: widgets["widgetID_ag-label"].id,
                    userId: userId
                },
                dataType: "json",
                async: false,
                success: function (data) {
                    _this.labelArr = data.layers;
                    callback(JSON.stringify(_this.labelArr));
                }
            })
        },
        deleteLabelData: function (labelId) {
            $.ajax({
                url: agsupportURL + "/agsupport/funcConf/deleteFuncConf",
                type: "post",
                data: {
                    id: labelId
                },
                dataType: "json",
                async: false,
                success: function (r) {
                }
            });
        },
        Geoprocessing: function (option, callback) {
            this.goejsonArr = [];
            if (option && option.gpUrl && option.layerName) {
                require(["GP"], function (GP) {
                    var myService = GP.service({
                        url: option.gpUrl,
                        useCors: false
                    });
                    var myTask = myService.createTask();
                    myTask.setParam("Drive_Times", "1");
                    if (map.options.crs.code != "EPSG:4326") {
                        var geoJson = {};
                        geoJson.geometry = option.geometry;
                        geoJson.type = "Feature";
                        geoJson = map._controls.queryLayerControl._unprojectGeoJson(geoJson);
                    }
                    myTask.setParam(option.layerName, geoJson);
                    myTask.on('initialized', function () {
                        myTask.run(function (error, geojson, response) {
                            callback(geojson);
                        });
                    });
                });
            }
        },
        drawLabelHandle: function (type) {
            require(["Label"], function (Label) {
                if (!map._controls.labelControl) {
                    Label.load();
                }
                if (type == "marker")
                    map._controls.labelControl._handler._toolbars.draw._modes.marker.handler.enable();
                else if (type == "polygon")
                    map._controls.labelControl._handler._toolbars.draw._modes.polygon.handler.enable();
                else
                    map._controls.labelControl._handler._toolbars.draw._modes.polyline.handler.enable();
            });
        },
        intersect: function (option, callback) {
            if (!map._controls.areaMeasureControl) {
                require(["AreaMeasure"], function (AreaMeasure) {
                    AreaMeasure.load();
                    map._controls.areaMeasureControl._finishMeasure();
                });
            }
            if (option && option.geometry1 && option.geometry2) {
                var param = 'wkt1=' + option.geometry1 + '&wkt2=' + option.geometry2;
                $.ajaxSetup({
                    async: false
                });
                $.post(agsupportURL + "/agsupport/operate/intersect", param, function (r) {
                    if (r != 'GEOMETRYCOLLECTION EMPTY') {
                        var geoJson = {geometry: JSON.parse(r)};
                        if (map.options.crs.code != "EPSG:4326") {
                            geoJson = map._controls.queryLayerControl._unprojectGeoJson(geoJson);
                        }
                        var coorArr = geoJson.geometry.coordinates.toString().split(",");
                        var _latlng = [];
                        for (var i = 0; i < coorArr.length; i = i + 2) {
                            _latlng.push(L.latLng(coorArr[i + 1], coorArr[i]));
                        }
                        var option = {
                            "area": map._controls.areaMeasureControl._measure(_latlng).area,
                            "length": map._controls.areaMeasureControl._measure(_latlng).length,
                            "geometry": r
                        };
                        callback(option);
                    }
                    else
                        callback(null);
                });
            } else
                callback(null);
        },
        test: function () {
            require(["GP"], function (GP) {

            });
        }
    }

    return {
        init: function () {
            return new Mobile();
        }
    }
});

