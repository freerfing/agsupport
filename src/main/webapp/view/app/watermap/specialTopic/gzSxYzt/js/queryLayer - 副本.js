var selectKey = '';
var firstTab = 'block';
//点击查询按钮时触发
function layerQuery() {
    firstTab = 'block';
    var name = $("#sole-input").val();
    if (name == null) {
        name = '';
    }
    $("#selectLayer").slideDown("slow");
    $(this).addClass("icon-up").removeClass("icon-bottom");
    mark = false;

    name = name.replace(/(^\s*)|(\s*$)/g, "");

    if (name == '') {
        alert('请输入查询关键字');
        return;
    }

    $("#searchResultTitle").html('');
    $("#searchResultInfo").html('');
    $("#divSearchResultTitle").css('display', 'block');
    $("#searchResultInfo").css('display', 'block');

    //如果选择的图层都为空，则在全部图层中根据关键字查找
    if (selectKey == '') {
        //$(".infoBox").html('');
        //遍历全部图层
        for (var key in layerConfiguration.dissertation) {
            layerForQuery(name, key);
        }
    }
    else {
        //有选择图层时，针对选择的图层查询
        //$(".infoBox").html('');
        layerForQuery(name, selectKey);
    }
}

//查询数据
function layerForQuery(keyValue, selectedKey) {
    var query = new esri.tasks.Query();
    query.outFields = layerConfiguration.dissertation[selectedKey].outFields; 
    //根据queryField配置，拼写模糊查询语句,// 名称 like '%B%'
    query.where = "";
    var flag = true;
    for (var queryField in layerConfiguration.dissertation[selectedKey].queryField) {
        var fieldName = layerConfiguration.dissertation[selectedKey].queryField[queryField];
        if (flag == true) {
            query.where += fieldName + " like \'%" + keyValue + "%\' "; //查询语句
            flag = false;
        }
        else {
            query.where += " or " + fieldName + " like \'%" + keyValue + "%\' "; //查询语句
        }
    }
    query.geometry = null;
    query.returnGeometry = true;

    var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[selectedKey].url, { outFields: layerConfiguration.dissertation[selectedKey].outFields, id: selectedKey });
    tempLayer.queryFeatures(query, function (featureSet) {
        var features = featureSet.features;
        if (features.length > 0) {
          
            //tab标题模板
            //<li class="active" style="background: transparent;"><a id="tab_Chart" href="#tab1" style="background: transparent;"><font color="black">统计图</font></a></li>

            var titleHtml = "<li class=\"active\" style=\"background: transparent;\"><a id=\"tab_Chart\" href=\"#" + selectedKey + "\" style=\"background: transparent;\"><font color=\"black\">" + layerConfiguration.dissertation[selectedKey].name + "(" + features.length + ")</font></a></li>";

            var div = initSearchResultContent(features, selectedKey);

            //<div id="tab1" class="tab_content" style="display: block; width: 100%; height: 100%;"></div>

            var resulthtml = "<div id=\"" + selectedKey + "\" class=\"tab_content\" style=\"display: " + firstTab + "; width: 100%; max-height: 260px;overflow-y:auto\"></div>";
            firstTab = 'none';
            $("#searchResultTitle").append(titleHtml);

            $("#searchResultInfo").append(resulthtml);

            $("#" + selectedKey).append(div);
            $("#" + selectedKey).mCustomScrollbar("update");

            initTabContent(false);
        } else {
            //alert("没有查询到结果");
        }
    },
    function (err) {
        console.log(err);
    });
}

//用于定位数据
function locateFeature(graphic) {
    if (graphic != null) {
        //计算获取的点
        map.infoWindow.setFeatures([graphic]);
        //生成信息框内容
        getInfoWindowContent(graphic, graphic.key);
        map.infoWindow.select(0);
        map.infoWindow.popupWindow = true;

        //计算信息框的弹出位置
        var type = graphic.geometry.type;
        var centerPoint;
        if (type == "point") {
            var point = graphic.geometry;
            centerPoint = point;// new esri.geometry.Point(point.x, point.y, new esri.SpatialReference(wkt));
        } else {
            //当为线和多边形的类型时，因为infowindow不能使用鼠标拖动，为了尽量避免遮挡数据，将弹窗位置设置为x最大的点
            if (type == "polyline") {
                var polyline = graphic.geometry;
                map.setExtent(polyline.getExtent());
                centerPoint = getMaxXPoint(polyline);
                //因为坐标系不同，可能会无法定位，最好能够在发布服务时，数据都使用相同的坐标系
                //centerPoint.spatialReference =  new esri.SpatialReference(wkt);
            } else if (type == "polygon") {
                var polygon = graphic.geometry;
                var extent = polygon.getExtent();
                map.setExtent(extent);
                centerPoint = getMaxXPoint(polygon);
                //centerPoint.spatialReference = new esri.SpatialReference(wkt);
            }
        }
        map.infoWindow.hide();
        map.setScale(map.getScale() + 1);
        map.centerAt(centerPoint);
        //map.infoWindow.reposition();
        map.infoWindow.show(centerPoint);
        //map.infoWindow.reposition();
    }
}