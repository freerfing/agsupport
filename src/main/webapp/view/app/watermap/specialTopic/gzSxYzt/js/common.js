//通常方法
function popupInfoWindow() { 
    
}

function getCenterPoint(geometry){
	var points = new Array();
	if(geometry.type == "point"){
		return geometry;
	}
	else if(geometry.type == "polyline"){
		try{
			var length = geometry.paths[0].length;
			var index = parseInt(length/2);
			var centerPnt = new esri.geometry.Point(geometry.paths[0][index][0], geometry.paths[0][index][1], new esri.SpatialReference(2435));
			return centerPnt;
		}
		catch(err){//当几何图形为空时，跳过
			return null;
		}
	}
	else if(geometry.type == "polygon"){
		try{
			var length = geometry.rings[0].length;
			var index = parseInt(length/2);
			var centerPnt = new esri.geometry.Point(geometry.rings[0][index][0], geometry.rings[0][index][1], new esri.SpatialReference(2435));
		 	return centerPnt;
		}
		catch(err){//当几何图形为空时，跳过
			return null;
		}
	}
	return null;
}

//获取几何图形，x值最大的点
function getMaxXPoint(geometry, extent) {
    //先把所有点放到数组中
    var points = new Array();
    if (geometry.type == 'point') {//点直接返回
        return geometry;
    }
    else if (geometry.type == 'polyline') {
        var polyline = geometry;
        for (var z = 0; z < polyline.paths.length; z++) {
            for (var j = 0; j < polyline.paths[z].length; j++) {
                var vertex = new esri.geometry.Point(polyline.paths[z][j][0], polyline.paths[z][j][1], map.spatialReference);
                points.push(vertex);
            }
        }
    }
    else if (geometry.type == 'polygon') {
        var polygon = geometry;
        for (var z = 0; z < polygon.rings.length; z++) {
            for (var j = 0; j < polygon.rings[z].length; j++) {
                var vertex = new esri.geometry.Point(polygon.rings[z][j][0], polygon.rings[z][j][1], map.spatialReference);
                points.push(vertex);
            }
        }
    }

    var tempPnt;
    //有范围限制时
    if (extent != null) {
        for (var i = 0; i < points.length; i++) {
            //判断该点是否在extent这个范围内
            if (points[i].x <= extent.xmax && points[i].x >= extent.xmin && points[i].y <= extent.ymax && points[i].y >= extent.ymin) {
                if (tempPnt == null) {
                    tempPnt = points[i];
                }
                else {
                    if (points[i].x > tempPnt.x) {
                        tempPnt = points[i];
                    }
                }
            }
        }
    }
    else {
        for (var i = 0; i < points.length; i++) {
            if (tempPnt == null) {
                tempPnt = points[i];
            }
            else {
                if (points[i].x > tempPnt.x) {
                    tempPnt = points[i];
                }
            }
        }
    }
    return tempPnt;
}

function getLocatePoint(geometry){
		var type = geometry.type;
        var centerPoint;
        if (type == "point") {
            var point = geometry;
            centerPoint = point;// new esri.geometry.Point(point.x, point.y, new esri.SpatialReference(wkt));
        } else {
            //当为线和多边形的类型时，因为infowindow不能使用鼠标拖动，为了尽量避免遮挡数据，将弹窗位置设置为x最大的点
            if (type == "polyline") {
                var polyline = geometry;
                //map.setExtent(polyline.getExtent());
                centerPoint = getMaxXPoint(polyline);
                //因为坐标系不同，可能会无法定位，最好能够在发布服务时，数据都使用相同的坐标系
                //centerPoint.spatialReference =  new esri.SpatialReference(wkt);
            } else if (type == "polygon") {
                var polygon = geometry;
                //var extent = polygon.getExtent();
                //map.setExtent(extent);
                centerPoint = getMaxXPoint(polygon);
                //centerPoint.spatialReference = new esri.SpatialReference(wkt);
            }
        }
        centerPoint.spatialReference = map.spatialReference;
        return centerPoint;
}

function locateMap(key,id,layerId){
	$("#loadingWindow").show();
	var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url, { outFields: "*", id: key });
    query = new esri.tasks.Query();
    query.returnGeometry = true;
    query.where = 'objectid = '+id;
    tempLayer.queryFeatures(query, function (response) {
        if (response.features != null && response.features.length > 0) {
            //每个feature添加key属性，以方便在弹出框时，得到显示的字段等配置
            //var locatePoint = getLocatePoint(response.features[0].geometry);
            //response.features[0].key = key;
			//getInfoWindowContent(map.infoWindow.features[0], map.infoWindow.features[0].key);
			//map.infoWindow.select(0);
            //map.infoWindow.popupWindow = true;
            //map.infoWindow.show(locatePoint);
            //map.centerAt(locatePoint);
            map.graphics.clear();
            response.features[0].setSymbol(tempLayer.renderer.getSymbol(response.features[0]));
            if(key=="heliuzhili35"||key=="heliuzhili187"){//当为黑臭河涌时，以蓝底红框绘制
				response.features[0].setSymbol(new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255,0,0,1]), 3));
            	map.graphics.add(response.features[0]);
            }
            else{
            	map.infoWindow.setFeatures([response.features[0]]);
            }
            //response.features[0].geometry.spatialReference = map.spatialReference;
           
			if(response.features[0].geometry.type=="point"){
				map.setScale(1000);
				response.features[0].geometry.spatialReference = map.spatialReference;
				map.centerAt(response.features[0].geometry);
			}
			else{
            	var extent =response.features[0].geometry.getExtent();
            	extent.spatialReference = map.spatialReference;
            	map.setExtent(extent);
			}
			flashGraphic(response.features[0]);
			if(layerId!=null){//定位时，显示该图层
				var tempLyr = map.getLayer(layerId);
				if(tempLyr!=null){
					map.getLayer(layerId).setVisibility(true)
				}
			}
        }
        $("#loadingWindow").hide();
    });
}

function flashGraphic(graphic){
	var resizeInterval1,resizeInterval2;
	var resizeTimer,resizeTime=2000;
	clearTimeout(resizeTimer);
	var tempSymbol = graphic.symbol;

	resizeInterval1=setInterval(function(){
		map.graphics.remove(graphic);
		if(graphic.geometry.type=="point"){
			graphic.setSymbol(
				new esri.symbol.SimpleMarkerSymbol({
					"color":[255,0,0,1],
					"size": 12,
					"style": "esriSMSCircle"
					}));
		}
		else
		{
			graphic.setSymbol(new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255,0,0,1]), 3));
		}
		map.graphics.add(graphic);
		},200);	
	
	resizeInterval2=setInterval(function(){
		map.graphics.remove(graphic);
		if(graphic.geometry.type=="point"){
			graphic.setSymbol(
				new esri.symbol.SimpleMarkerSymbol({
					"color":[255,0,0,1],
					"size": 12,
					"style": "esriSMSCircle"
					}));
		}
		else{
			graphic.setSymbol(new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255,0,0,1]), 3));
		}
		map.graphics.add(graphic);
		},220);	

	resizeTimer=setTimeout(function(){
		clearInterval(resizeInterval1);
		clearInterval(resizeInterval2);
		map.graphics.remove(graphic);
		graphic.setSymbol(tempSymbol);
		map.graphics.add(graphic);
		},resizeTime);
}

//使用行政区定位要素，whereClause查询条件，district行政区名称，key图层id，visibleLayer需要显示的图层
function locateByDistrict(whereClause,district,key,visibleLayer){
	$("#loadingWindow").show();
	var layerList=['shuixi','dike','gate','pump','res','PaiShui','wurenjixunfei','quanjingtu','heliuzhili187','heliuzhili35'];
	//先查出行政区的位置
	if(district!=null&&district!=""){
		var districtLayer = new esri.layers.FeatureLayer(layerConfiguration.baseMap.QJ,{outFiekds:"*"});
		var queryDistrict = new esri.tasks.Query();
		queryDistrict.returnGeometry=true;
		queryDistrict.where = "FQ = '"+district+"'";
   		districtLayer.queryFeatures(queryDistrict,function(response){
    		 if (response.features != null && response.features.length > 0) {
				//定位到该行政区
				var districtExtent = response.features[0].geometry.getExtent();
				//districtGeo.setSpatialReference(32649)
				districtExtent.spatialReference = map.spatialReference;
				map.setExtent(districtExtent);
				//闪烁行政区
				flashGraphic(response.features[0]);
    		 }
   	 });
    }
    else{//整个广州范围时
    	map.infoWindow.clearFeatures();
    	map.setScale(1000000);
    	map.centerAt(new esri.geometry.Point(54047,41983, map.spatialReference));//定位到广州的范围
    }
    //同步进行查询该区域内的相关数据
    var labelField = layerConfiguration.dissertation[key].titleField;
	var queryLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url,{outFields:"*"});
	var query = new esri.tasks.Query();
	query.returnGeometry=true;
	query.where = whereClause//districtFieldName + " like '%"+district+"%'";
	queryLayer.queryFeatures(query,function(response){
		 if (response.features != null && response.features.length > 0) {
			//先清除掉地图要素
			//再把查询出来的全部以新建GraphicLayer的方式添加上去，添加到最上层
			var addedGraLyr = map.getLayer("tempGraphic");
			if(addedGraLyr!=null){
				map.removeLayer(addedGraLyr);
			}
			var addedLabelLyr = map.getLayer("tempLabel");
			if(addedLabelLyr!=null){
				map.removeLayer(addedLabelLyr);
			}
			
			var newGraphicLayer = new esri.layers.GraphicsLayer({id:"tempGraphic",visible:true});
			for(var i=0;i<response.features.length;i++){
				newGraphicLayer.add(response.features[i]);
			}
			newGraphicLayer.setRenderer(queryLayer.renderer);
			map.addLayer(newGraphicLayer);
			
			//添加标注层
			var tempLabelLayer = new esri.layers.GraphicsLayer({id:"tempLabel",visible:true});
    	 	var titleField = layerConfiguration.dissertation[key].titleField;
    	 	if(queryLayer.labelingInfo!=null){//如果原来的图层有标注，则使用原来的标注样式
    	 		for(var i=0;i<response.features.length;i++){
            		var title = response.features[i].attributes[titleField];
            		var graphicsPnt = getCenterPoint(response.features[i].geometry);
            		var textSymbol = new esri.symbol.TextSymbol(queryLayer.labelingInfo[0].symbol.toJson());
            		textSymbol.setText(title);
           	 		var labelGraphic = new esri.Graphic(graphicsPnt, textSymbol);
           	 		tempLabelLayer.add(labelGraphic);
            	}
            }
            else{//如果原来的图层没有标准的话，就使用同一的标注样式
				for(var i=0;i<response.features.length;i++){
            		var title = response.features[i].attributes[titleField];
            		var graphicsPnt = getCenterPoint(response.features[i].geometry);
            	    var textSymbol = new esri.symbol.TextSymbol(title).setColor(
                    	new esri.Color([128, 0, 0])).setAlign(esri.symbol.Font.ALIGN_END).setAngle(0).setFont(
                    	new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD)).setOffset(15, 35);
           	 		var labelGraphic = new esri.Graphic(graphicsPnt, textSymbol);
           	 		tempLabelLayer.add(labelGraphic);
            	}
            }
            //绘制完标注后，调整一下比例尺，以刷新地图
            //map.setScale(map.getScale()+1);
            map.addLayer(tempLabelLayer);
            //如果为35条黑臭河涌，则闪烁
            if(key=="heliuzhili35")
            {
            	for(var i=0;i<response.features.length;i++){
            		flashGraphic(response.features[i]);
            	}
            }
    	 }
    	 $("#loadingWindow").hide();
	});
	map.infoWindow.hide();
	//需要关掉其他图层
	for(var i=0;i<layerList.length;i++){
		var tempLyr = map.getLayer(layerList[i]);
		if(tempLyr!=null){
			if(layerList[i]==visibleLayer){
				tempLyr.setVisibility(true);
			}
			else{
				tempLyr.setVisibility(false);
			}
		}
	}
	//清除图层控制中图标的选中状态
	$("#river-info-icon").addClass('river-info-icon').removeClass('river-info-selected-icon');
	$("#reservoir-map-icon").addClass('reservoir-map-icon').removeClass('reservoir-map-selected-icon');
	$("#difang-map-icon").addClass('difang-map-icon').removeClass('difang-map-selected-icon');
	$("#dam-icon").addClass('dam-icon').removeClass('dam-selected-icon');
	$("#pump-station-icon").addClass('pump-station-icon').removeClass('pump-station-selected-icon');
	$("#quanjingtu-720-icon").addClass('quanjingtu-720-icon').removeClass('quanjingtu-720-selected-icon');
	$("#UAV-map-icon").addClass('UAV-map-icon').removeClass('UAV-map-selected-icon');
	$("#heichou35-icon").addClass('heichou35-icon').removeClass('heichou35-selected-icon');
	$("#heichou187-icon").addClass('heichou187-icon').removeClass('heichou187-selected-icon');
	$("#psgw-map-icon").addClass('psgw-map-icon').removeClass('psgw-map-selected-icon');
	$("#psgd-map-icon").addClass('psgd-map-icon').removeClass('psgd-map-selected-icon');
	$("#qtpsss-icon").addClass('qtpsss-icon').removeClass('qtpsss-selected-icon');
}