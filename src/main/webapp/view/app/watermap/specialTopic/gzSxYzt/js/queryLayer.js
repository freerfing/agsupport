var selectKey = '';
var firstTab = true;
var isHasResult=false;
//点击查询按钮时触发
function layerQuery() {
    firstTab = true;
	document.getElementById('tab_box').innerHTML="";
	document.getElementById('tab_ContentAll').innerHTML="";

    var name = $("#sc-home-map-search-input").val();
    if (name == null) {
        name = '';
    }
    //$("#selectLayer").slideDown("slow");
    $(this).addClass("icon-up").removeClass("icon-bottom");
    mark = false;

    name = name.replace(/(^\s*)|(\s*$)/g, "");

    if (name == '') {
        alert('请输入查询关键字');
        return;
    }
    isHasResult=false;
	$("#search-clear-btn").show();
    //$("#searchResultTitle").html('');
    //$("#searchResultInfo").html('');
    //$("#divSearchResultTitle").css('display', 'block');
    //$("#searchResultInfo").css('display', 'block');

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
        initSearchContentBox(featureSet.features,selectedKey);
    },
    function (err) {
        console.log(err);
    });
}

function initSearchContentBox(features,selectedKey){
	if (features.length > 0) {
		$('#search_box').slideDown(500);
        isHasResult=true;
        //tab标题模板
        var tabTitle;
        var tabContent;
		var layerName = layerConfiguration.dissertation[selectedKey].name;
        if(firstTab==true){
 			tabTitle = $("<a href='#' class = 'active' id = '"+selectedKey+"' >"+layerName+"("+ features.length +")"+"</a>");
 			tabContent= $("<div id = '"+selectedKey+"_content' style='display:block' class = 'content_tab_box'/>");
 			firstTab=false;
		}
		else{
			tabTitle = $("<a href='#' id = '"+selectedKey+"'>"+layerName+"("+ features.length +")"+"</a>");
 			tabContent= $("<div id = '"+selectedKey+"_content' style='display:none' class = 'content_tab_box'/>");
		}
		//拼tab内容
		for(var i=0;i<features.length;i++){
			var graphic=features[i];
			graphic.key= selectedKey;
			var title =graphic.attributes[layerConfiguration.dissertation[selectedKey].titleField];
			var content = $("<div class='content'/>");
			var img = $("<img src='/awater/view/app/watermap/specialTopic/gzSxYzt/plugins/hplus/img/shuiku.png'/>");
			var a=$("<a href='#' >"+title+"</a>");//onclick='locateMap(\""+selectedKey+"\","+graphic+")'

			content.click(
				(function(graphic){
					return function(){
						locateFeature(graphic);
						return false;
					}
					return false;
				})(graphic)	
			);
				
			content.append(img);
			content.append(a);
			tabContent.append(content);
		}
		$("#tab_box").append(tabTitle);
		$("#tab_ContentAll").append(tabContent);
		$(".tab_box").find("a").on("click", function () {
		$(".tab_box").find("a").each(function (i, obj) {
        $(this).removeClass("active");
        $(".content_box").find("#"+$(this).eq(0).attr('id')+"_content").hide();
	});
	$(this).addClass("active");
	$(".content_box").find("#"+$(this).eq(0).attr('id')+"_content").show();
	});
	}
	else{
        }
}

//用于定位数据
function locateFeature(graphic) {
    if (graphic != null) {
        //计算获取的点
        map.infoWindow.hide();
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
            centerPoint = new esri.geometry.Point( point.x,point.y,new esri.SpatialReference(2435));
        } else {
            //当为线和多边形的类型时，因为infowindow不能使用鼠标拖动，为了尽量避免遮挡数据，将弹窗位置设置为x最大的点
            if (type == "polyline") {
                var polyline = graphic.geometry;
                map.setExtent(polyline.getExtent());
                centerPoint = getMaxXPoint(polyline);
                //因为坐标系不同，可能会无法定位，最好能够在发布服务时，数据都使用相同的坐标系
            } else if (type == "polygon") {
                var polygon = graphic.geometry;
                var extent = polygon.getExtent();
                map.setExtent(extent);
                centerPoint = getMaxXPoint(polygon);
            }
        }
		if(graphic.geometry.type=="point"){
			map.setScale(500);
		}
		else{}
        map.infoWindow.show(centerPoint);
        map.resize();
        map.centerAt(centerPoint);
        flashGraphic(graphic);
    }
}