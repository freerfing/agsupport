//地图初始化相关的脚本
require([
    "esri/map",
    "esri/geometry/Extent",
    "custom/MeasureTools",
    "custom/tdt/TDTLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISImageServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/tasks/query",
    "esri/InfoTemplate",
    "esri/graphic",
    "esri/Color",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/SpatialReference",
	"esri/layers/ArcGISTiledMapServiceLayer"
]);
require(["dojo/ready"], function (ready) {
    ready(function () {
    /*
   			//本地用127.0.0.1
			//申请国规委地图服务token
    		$.ajax({
  				type: 'POST',
  				url: "http://10.194.148.18:6080/arcgis/tokens/generateToken",
  				data: "client=6d33659626c6bd4bd3f27ae287c953e778ce8032374b330c50968dfd2719101c94a0e9815113b86eb06fab926bb1ce22d1802fda543b73a4c935919ae2f1357a&encrypted=true&expiration=6427d3dfa0e1f26bc5fd1ed693a4c40ebd7df4383794cf09c66d2cc56da106ee9ff9a6be299ec7e592bfaf0a1e3dcc25cf78206fa84d646569762acaa9f6bb42&f=json&ip=&password=3e3bdfa9dd7094c3b73d6a80ac9da5009b5c5a77037c65bf343dbf359f78b265db9a633fee3acf213c5c5b2fe2770155756c7f3723456dfe2820bc015b00f352&referer=23f6ec779fea62e68c6dbd9469bec3dec26fda0e176ef63521fb5aa516b2a25ec9b48c05e4a8c58efeadb5c0b5c3d9b4e6203a9402b24f7b893f5b2cea889b89&username=2e398e6a3a13f931caa269cc7714c8cc5d3391ce4ba85b028bf1efe92f05392a9fbcdca456fa4d584796b13cd3511e4d6182752a9c30d9f1a9656569f5a23047",
  				dataType:"json",
  				success: function(e){
  					token2 = "?token=" + e.token;
  					//申请水务局地图服务token
  					$.ajax({
  						type: 'POST',
  						url: "http://10.194.170.68:6080/arcgis/tokens/generateToken",
  						data:"password=04d484a5ec7cc6514675cc46146d69bc75359cd35d3413f9b6961ac8130649b6ed4a9371121009704bd94d7c5e8b8a110b941c374db679d40c6d89a02152ff67&f=json&username=327ba3d4f39e94f9a2c196c2b938e0f10053b9e09f146e8b562ad7e01c056e447e873c038d800d4d56b8b42491e59592a916fc5f5a75fded228b036541ca8b3d&client=19919e89955526661ceb9a39db1a7e5791902f73b5a1033c6359850164de9848bb22d1f07bb370aad8330863658709f811243ac986fa66056dfa81fbdaa5ffe4&referer=4fbb59a9f09494e923f85ae54cd45190f526346c017cabc7be658692047bddbf9a92acbf18a2066876fed615063bd752bad74c1edeebe848c4b7ce931fb16c5b&ip=&expiration=84643f0f5a765f291db30c2b3728a4a3d8180e76a5e3858490e7d100f72ee30608d8b5dd0bff469888a9d7001456f9239bcd7c9670390bc0951330a372e9cda2&encrypted=true",
  						dataType:"json",
  						success:function(e){
  						 	token = "?token=" + e.token;
							initUrl();//初始化地图服务链接
							initMap()//加载地图
  						},
  						error:function(e){
  							console.log(e);
  						}
  					});
  				},
  				error: function(e){
  					console.log(e);
  				}
			});*/
			
			//服务器用10.194.170.65
			//申请国规委地图服务token
		
    		$.ajax({
  				type: 'POST',
  				url: "http://10.194.148.18:6080/arcgis/tokens/generateToken",
  				//data: "password=38ae079d913a4495925bab474ce9397cfe207a0810405a0352f7cd55292d20c31d5534a8e0261100f4af690fa9dd2b706afb93e95601829dab9be8b5ab5d7ef7&f=json&username=03c0c02729ea54942d388fbeefbf616c226c096040402ca596683839f61474d970b49330a8f405574b90a6c7961061bd30af4c899efc1a550cbb7262a2c837b0&client=370d4b5585de97c40842e8e634cd43c49bd23b6fe4012cebd72e38e003d225ab0cc64b6dbaebef158dc8c9b593630090842fb7dc4af1842ea39b89c74e040283&referer=&ip=&expiration=0604ca3bab017d624bc786954e4ddbde54c6bcb76fdf53ebdfb5f4d38a4d39c690ed761dd3411d8cc0b13666570770803689f159220c711de0187e28e7dc4073&encrypted=true",
  				//78服务器
  				data: "password=383750c504fc6159ac4b716d25fe894261b972bf804939f98cd0287976de0af20085e0af5e7bf0bd52796b9404c6fb91cc394510a9a69eed19d5a36b3e15f85c&f=json&username=0d8b6125abc2df39abe8f90ecb1124b35b9eb56811c42884c1c6bbfa80a82dbdd54bfee0c566b642a9d781c0a5e88491d9f615be499684f4a1a9f85ac59350ea&client=783e3491780793f9870cff0c830777a906cbb059a3c95bac7f7721c0776f16a0e8b29d2eddee20913c1bee83ddc6cbae157cac9410a189999e1e1c557503b966&referer=&ip=&expiration=3e7009f349a83e9e3be5818301aa1487018e689980d09457931ce2650f0430ae8ec3f916d986521011501b15afb45c44cfce1b695eab0ab31705ec250d95eac2&encrypted=true",
  				dataType:"json",
  				async: false,
  				success: function(e){
  					token2 = "?token=" + e.token;
  					//申请水务局地图服务token
  					$.ajax({
  						type: 'POST',
  						async: false,
  						url: "http://10.194.170.68:6080/arcgis/tokens/generateToken",
  						//data:"password=541d8a7fad2e4b2ed02f64f81e78abc23a797c392e4d259f19c68958b2ede78e45cd3457a81e7698d9e2e98c86985e8c6dd1a1e7376bbaba7248a301bb700b88&f=json&username=783c7917ba1ddc4111eb3b578a9bf255413de4c6f61c7dca738daa6196fb266c38e0d90fab96d2e7744b6fa2fd62ddcffd95509b2154b9f8d94990f5efe604f5&client=733afa41e2c3247938d996b8051f503387105175341855a7b9ac8e21e8081f2716af23fd18274b18935fbf3dcb98a1c0fbb387de52467796d36c1f916a3c1aaa&referer=&ip=&expiration=67b3a949a92c8c41dc1f40c2f0afeae50b84358fbbfa6ad034a00cd2f5f47f867fc2a84e096c903d5a559894f8bc42512daa9f57d4463979f3d8670ff075cf21&encrypted=true",
  						//78服务器
  						data:"password=6411dd3c8201979bd297714eb19bcff5a2e78cca4b27faa24a4398aba34a6baeb727aed728c9880725996fd6cdc27e077946553e978f865e6c1ae2c6f5ab17a1&f=json&username=249a01b07f571c4bd33ec3d3d99a5847f48939643b5e781da241cd9aa385b7a4f5ae9d5539db4e3d6483647c41a8876f775d729808d71f95d633b37c190d9e13&client=054bad385f698b09ece4fd39cc54669a57f6174d4c71bd125dcd5bfa01a03b8ee864f052e14a244d36de44e6304d73eeeead4e8adf527ab3644e2234b05544e7&referer=&ip=&expiration=4a6be81326d491eaf14188320bdfb004b64fd89d5352bc14122831517a41ef5d159dbb0db0a8029c46c270c46d382b10dd24ae7baae6f5b2c1fd3807431fef41&encrypted=true",
  						dataType:"json",
  						success:function(e){
  						 	token = "?token=" + e.token;
							initUrl();//初始化地图服务链接
							initMap()//加载地图
  						},
  						error:function(e){}
  					});
  				},
  				error: function(e){
  					console.log(e);
  				}
			});
			
    });
});

var map;
var wkt;
var mapClickOn;
var isDrawing = false;//判断是否正在增加兴趣点，如果是，则地图点击查询的功能需要暂时停止。
var mapQueryFlag=0;//用于计算地图点击查询是否已经完成
var isClickQuery = true;
var isInfoWindowShow = false;

function initMap() {

    wkt = 'PROJCS["gz",GEOGCS["GCS_Beijing_1954",DATUM["D_Beijing_1954",SPHEROID["Krasovsky_1940",6378245.0,298.3]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",41805.106],PARAMETER["False_Northing",-2529665.281],PARAMETER["Central_Meridian",113.3],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]';
    var fill = new esri.symbol.SimpleFillSymbol("solid", null, new dojo.Color("#A4CE67"));

	var lods = [		 {"level" : 9,  "resolution" : 264.583863, "scale" : 1000000},
                         {"level" : 10, "resolution" : 132.291931, "scale" : 500000},
                         {"level" : 11, "resolution" : 66.145966,  "scale" : 250000}, 
                         {"level" : 12, "resolution" : 26.458386,  "scale" : 100000},
                         {"level" : 13, "resolution" : 13.229193,  "scale" : 50000},
                         {"level" : 14, "resolution" : 6.614597,   "scale" : 25000},
                         {"level" : 15, "resolution" : 2.645839,   "scale" : 10000},
                         {"level" : 16, "resolution" : 1.322919,   "scale" : 5000},
                         {"level" : 17, "resolution" : 0.529168 ,  "scale" : 2000},
                         {"level" : 18, "resolution" : 0.264584 ,  "scale" : 1000},
                         {"level" : 19, "resolution" : 0.132292,   "scale" : 500}
                        ];  

    map = new esri.Map("mapDiv", {
        showLabels: true,
		lods:lods,
		logo:false
    });

    map.infoWindow.domNode.getElementsByClassName("action zoomTo")[0].style.display = "none"; //隐藏infoWindow的缩放至按钮
    
    //信息框切换选中的数据时，重新生成信息框的内容
    map.infoWindow.on("selection-change", function () {
        	var selectedFeature = map.infoWindow.getSelectedFeature();
        	if (selectedFeature != null) {
                if(selectedFeature.key=="wurenjixunfei") {
                    planelineJson = selectedFeature.geometry.toJson();
                    planelineLength = selectedFeature.attributes["SHAPE.LEN"];
                    var planeLineSymbol = (new esri.symbol.SimpleLineSymbol()).setColor(new esri.Color([230, 255, 0])).setWidth(5);
                    map.graphics.clear();
                    map.graphics.add(new esri.Graphic(selectedFeature.geometry,planeLineSymbol));
                }
           	 getInfoWindowContent(selectedFeature, selectedFeature.key);
        	}
    });
    
    //map.infoWindow.resize(300, 600);//定义信息查询框大小

    mapClickOn = map.on('click', mapClickQuery);
    map.on('mouse-move', mapMouseMove);//鼠标移动事件，动态显示坐标以及比例尺
    map.setMapCursor("url(plugins/hplus/images/identify_pointer.png),auto");
    //底图、影像图、水利设施
    
	var slLyr2 =  new esri.layers.ArcGISTiledMapServiceLayer(layerConfiguration.baseMap.DiTu,{visible:true,id:'DiTu'});
	map.addLayer(slLyr2,0);

    var weiXingYingXiangLayer = new esri.layers.ArcGISTiledMapServiceLayer(layerConfiguration.baseMap.WeiXingYingXiang,{visible:false,id:'WeiXingYingXiang'});
    map.addLayer(weiXingYingXiangLayer);
    
    var weiXingYingXiangGGWLayer = new esri.layers.ArcGISTiledMapServiceLayer(layerConfiguration.baseMap.WeiXingYingXiang_GGW,{visible:false,id:'WeiXingYingXiangGGW'});
    map.addLayer(weiXingYingXiangGGWLayer);

    var demYingXiangLayer = new esri.layers.ArcGISTiledMapServiceLayer(layerConfiguration.baseMap.DemYingXiang,{visible:false,id:'DemYingXiang'});
    map.addLayer(demYingXiangLayer);

	var shuixiLyr =  new esri.layers.ArcGISTiledMapServiceLayer(layerConfiguration.baseMap.ShuiXi,{visible:true,id:'shuixi'});
	map.addLayer(shuixiLyr);
	
	var dikeLyr =  new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.Dike,{visible:true,id:'dike'});
	map.addLayer(dikeLyr);
	
	var gateLyr =  new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.Gate,{visible:true,id:'gate'});
	map.addLayer(gateLyr);

	var pumpLyr =  new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.Pump,{visible:true,id:'pump'});
	map.addLayer(pumpLyr);

	var resLyr =  new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.Res,{visible:true,id:'res'});
	map.addLayer(resLyr);

	var paishuiLayer =  new esri.layers.ArcGISTiledMapServiceLayer(layerConfiguration.baseMap.PaiShui,{visible:true,id:'PaiShui'});
	map.addLayer(paishuiLayer);
	
	var shuixiDiMingLayer =  new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.ShuiXiDiMing,{visible:true,id:'shuixidiming'});
	var visibleLayers=[24];
	shuixiDiMingLayer.setVisibleLayers(visibleLayers);
	map.addLayer(shuixiDiMingLayer);

    //添加其他图层到地图
    for (var key in layerConfiguration.dissertation) {
        if (layerConfiguration.dissertation[key].addToMap == true) {//当配置文件中addToMap为true时，把图层添加到地图中
            var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url, {visible:true, outFields: layerConfiguration.dissertation[key].outFields, id: key });
            map.addLayer(tempLayer);
        }
    }

    //设置地图的显示范围
    map.centerAt(new esri.geometry.Point(44166, 28392, new esri.SpatialReference(2435)));
    map.setScale(25000);
    //初始化测量工具
    initTools();
}

//鼠标在地图上移动时
function mapMouseMove(e) {
    //动态显示当前坐标与比例尺
    var coorDiv = document.getElementById('coorDiv');
    coorDiv.innerHTML = 'x: ' + parseInt(e.mapPoint.x) + ',  y:  ' + parseInt(e.mapPoint.y) + '     比例 1:  ' + parseInt(map.getScale());
    //var scaleDiv = document.getElementById('scaleDiv');
    //scaleDiv.innerHTML = '比例    1:  ' + parseInt(map.getScale());
}
//地图点击查询
function mapClickQuery(e) {
    if(isClickQuery==true){
		$("#loadingWindow").show();//显示等待界面
		mapQueryFlag = 0;//重新计数
		isInfoWindowShow = false;
    	map.infoWindow.hide();
    	map.infoWindow.clearFeatures();//清空原来选中的要素
    	map.infoWindow.pagingControls = true;
    	map.infoWindow.pagingInfo = true;
    	map.selectedFeatures = new Array();//用于保存点击时选中的要素
    	if (isDrawing == false) {
        	for (var key in layerConfiguration.dissertation) {
            	querySingleLayer(key, e);
        	}
    	}
    }
}
//对单个图层进行查询
function querySingleLayer(key, e) {
    var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url, { outFields: layerConfiguration.dissertation[key].outFields, id: key });
    query = new esri.tasks.Query();
    query.returnGeometry = true;
    query.outFields = layerConfiguration.dissertation[key].outFields;
    var extentFlag = 20;//小矩形的查询范围，大比例尺默认20，小比例尺需要更大，要不选不上
    //根据比例尺重新生成查询范围
    extentFlag = map.getScale() / 1000;
    //因为点选的话，对于点图层，比较难选中，因此根据鼠标点的坐标，x/y个加减20，生成一个小矩形，用于查询的范围
    var polygonJson = { "rings": [[[e.mapPoint.x - extentFlag, e.mapPoint.y - extentFlag], [e.mapPoint.x + extentFlag, e.mapPoint.y - extentFlag], [e.mapPoint.x + extentFlag, e.mapPoint.y + extentFlag], [e.mapPoint.x - extentFlag, e.mapPoint.y + extentFlag]]], "spatialReference": map.spatialReference };
    var polygon = new esri.geometry.Polygon(polygonJson);
    query.geometry = polygon;
    tempLayer.queryFeatures(query, function (response) {
        if (response.features != null && response.features.length > 0) {
            //每个feature添加key属性，以方便在弹出框时，得到显示的字段等配置
            for (var i = 0; i < response.features.length; i++) {
                response.features[i].key = key;
            }
            for (var i = 0; i < response.features.length; i++) {
                map.selectedFeatures.push(response.features[i]);
            }
            map.infoWindow.setFeatures(map.selectedFeatures);
			if(map.infoWindow.count > 0){
				map.infoWindow.select(0);
			}
        }
        //每完成一个查询，计数+1
        mapQueryFlag++;
        if(mapQueryFlag == 18){//计数等于查询图层数量时，完成查询，如果查询图层的数量有更改，需要修改这里，目前参与查询的图层数量为18
        	$("#loadingWindow").hide();//隐藏等待界面
            mapQueryFlag = 0;
        }
        if (map.infoWindow.count > 0 && isInfoWindowShow == false) {//显示弹框，如果已经显示过，则不再弹出，避免弹窗被手动关掉后再次弹出
        	$("#loadingWindow").hide();//隐藏等待界面
			getInfoWindowContent(map.infoWindow.features[0], map.infoWindow.features[0].key);
            map.infoWindow.select(0);
            map.infoWindow.popupWindow = true;
            map.infoWindow.show(e.mapPoint);
            isInfoWindowShow = true;
        }
    });
}
//在地图上绘制临时的兴趣点样式
function addInterestToMap(e) {
    isDrawing = false;

    var pointSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10,
                            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                            new dojo.Color([255, 0, 0]), 1),
                            new dojo.Color([0, 255, 0, 0.25]));

    map.graphics.add(new esri.Graphic(e.geometry, pointSymbol));
    map.DrawTool.deactivate();

    //弹出信息框，在信息框内填写兴趣点的信息

    map.infoWindow.clearFeatures();
    map.infoWindow.setContent("<div><p>兴趣点名称:</p><input id = 'interestPointName_input' type='text' style='width:100%'></input><p></div><div>备注（最长600字）:</p><textarea id = 'interestPointRemark_input'  type='text'  style='width:99%'></textarea></div><div><input type='button' style='width:30%' value='保存' onclick='addInterestPoint(" + e.geometry.x + "," + e.geometry.y + ")'></input></div>");
    map.infoWindow.show(e.geometry);

}
//添加兴趣点到数据库
function addInterestPoint(x, y) {
    var interestName = document.getElementById('interestPointName_input').value;
    if (interestName == "" || interestName == null) {
        alert('请输入兴趣点名称');
        return;
    }
    var interestRemark = document.getElementById('interestPointRemark_input').value;
    var geo = new esri.geometry.Point(x, y, map.spatialReference);
    var attr = { "NAME": interestName, "REMARK": interestRemark };
    var graphic = new esri.Graphic(geo, null, attr, null);

    saveInterestEdit([graphic], null, null, 'interestPoint')

    map.graphics.clear();
}
//删除指定的兴趣点
function deleteInterestPoint() {
    saveInterestEdit(null, null, [map.selectedInterestPoint], 'interestPoint');
}
//保存指定兴趣点的编辑
function saveInterestPointEdit() {
    var newPointName = $('#info_interestPointName').val();
    var newPointRemark = $('#info_interestPointRemark').val();
    map.selectedInterestPoint.attributes['NAME'] = newPointName;
    map.selectedInterestPoint.attributes['REMARK'] = newPointRemark;
    saveInterestEdit(null, [map.selectedInterestPoint], null, 'interestPoint');
}
//保存兴趣点的编辑，四个参数对应新增的、更新的、删除的、图层id
function saveInterestEdit(adds, updates, deletes, layerId) {
    var interestLayer = map.getLayer(layerId);
    //applyEdits(adds?, updates?, deletes?, callback?, errback?)
    interestLayer.applyEdits(adds, updates, deletes, function () {
        interestLayer.refresh();
        map.infoWindow.hide();
    }, function (e) {
        alert(e);
    });
}
//使兴趣点弹窗内容可编辑
function enableEdit() {
    try {
        $('#info_interestPointName').removeAttr('readonly');
        $('#info_interestPointRemark').removeAttr('readonly');
    }
    catch (err) { }
}
//获取指定要素的信息框样式
function getInfoWindowContent(feature, key) {
	if(key==null) return;
    var graJson = feature.toJson();
    var attr = feature.attributes;
    var title = layerConfiguration.dissertation[key].name;
    
    //if (title == null) {
    //    title = "";
    //}
    //if (title.replace(/(^\s*)|(\s*$)/g, "") == "") {
    //    title = "";
    //}

    var infoContent = "";
    //判断key是否为720数据
    if (key == 'quanjingtu') {
    	infoContent += "<a href='#' onclick='show720(\""+feature.attributes["NAME"]+"\",\""+feature.attributes[layerConfiguration.dissertation[key].outFields[2]]+"\")'>切换720全景视图</a>"
        title +="-"+ feature.attributes["NAME"];
    }
    else if (key == "interestPoint") {//如果为兴趣点图层
        map.selectedInterestPoint = feature;
        var interestName = feature.attributes['NAME'];
        var interestRemark = feature.attributes['REMARK'];
        if (interestName == null) {
            interestName = "";
        }
        if (interestRemark == null) {
            interestRemark = "";
        }
        infoContent += "<div style='height:10%'><input id = 'divInterestId' style='display:none' value ='" + feature.attributes['OBJECTID'] + "'></input><p>兴趣点名称：</p><input id = 'info_interestPointName' type='text' value = '" + interestName + "' readonly='readonly' style = 'width:100%'></input></div><div style='height:90%'><div>备注：</div><textarea id = 'info_interestPointRemark' style='width:100%;height:90%;' readonly='readonly'>" + interestRemark + "</textarea><div style='width:100%'><input type='button' value = '修改' onclick = 'enableEdit()'></input><input type='button' value = '保存' onclick='saveInterestPointEdit()'></input><input type='button' value = '删除' onclick='deleteInterestPoint()'></input></div></div>";
    }
    else if (key == "wurenjixunfei") {

        infoContent += "<a href='#' onclick='showVideoWindow(\"" + feature.attributes["NAME"] + "\",\"" + feature.attributes[layerConfiguration.dissertation[key].outFields[1]] + "\")'>查看无人机巡飞视频</a>"
        title += "-" + feature.attributes["NAME"];

        //infoContent += "<a href='videoPage.html?key=" + feature.attributes[layerConfiguration.dissertation[key].outFields[1]] + "' target='_blank'>查看河涌视频</a>"
        //title += "-" + feature.attributes["NAME"];
    }
    else {
        infoContent += "<table class='customTable2'  cellspacing='0' style='width:100%;border-collapse:collapse;'>";
        //获取图层的配置
        var displayFields = layerConfiguration.dissertation[key].displayFields;
        var outFields = layerConfiguration.dissertation[key].outFields;
        for (var i = 0; i < displayFields.length; i++) {
            var valueAttr = graJson.attributes[outFields[i]];
            if (valueAttr == null || valueAttr == undefined) {
                valueAttr = "";
            }
            if(typeof valueAttr === 'number'){
            	valueAttr = parseInt(valueAttr*100)/100;
            }
            //var valueFloat = parseFloat(valueAttr.toString());
            //if(valueFloat!=null) valueAttr = parseInt(valueAttr*100)/100;
            infoContent += "<tr><td width='50%' class='left_row' style='text-align:center'>" + displayFields[i] + "</td><td width='50%' class='right_row' style='text-align:center'>" + valueAttr + "</td></tr>";
        }
        infoContent += "</table>";
    }
    //map.infoWindow.setTitle(title);
    //map.infoWindow.setTitle(title+"("+(map.infoWindow.selectedIndex+1)+"/"+map.infoWindow.count+")");
    if(map.infoWindow.count>1){
    	map.infoWindow.setTitle(title+"  (点击右侧箭头切换至下一个)");
    }
    else{
    	map.infoWindow.setTitle(title);
    }
    map.infoWindow.setContent(infoContent);
}
//初始化各个工具
function initTools() {
    require([
	   "esri/map",
	   "custom/MeasureTools",
       "esri/toolbars/navigation",
       "esri/toolbars/draw",
       "esri/layers/FeatureLayer",
       "esri/dijit/Legend",
       "dojo/_base/array",
       "dojo/parser",
       "dijit/layout/BorderContainer",
       "dijit/layout/ContentPane",
       "dijit/layout/AccordionContainer",
	   "dojo/domReady!"
    ], function (
		Map, deMeasureTools, Navigation, Draw, FeatureLayer, Legend, arrayUtils, parser
	  ) {
        //初始化测量工具
        var measureTool = new deMeasureTools({
            map: map
        }, "measureTools");


         //导航工具
        var navToolbar = new Navigation(map);
        map.NavToolbar = navToolbar;//用于在其他地方调用，例如在测量面积时，先禁用导航工具
        document.getElementById("tool_suoxiao").onclick = function () {
            measureTool.toolbar.deactivate();
            drawTool.deactivate();
            isClickQuery=false;
            navToolbar.activate(Navigation.ZOOM_OUT);
            map.setMapCursor("url(plugins/hplus/images/suoxiao_btn_hover.png),auto");
            return false;
        };
        document.getElementById("tool_fangda").onclick = function () {
            measureTool.toolbar.deactivate();
            drawTool.deactivate();
            isClickQuery=false;
            navToolbar.activate(Navigation.ZOOM_IN);
            map.setMapCursor("url(plugins/hplus/images/fangda_btn_hover.png),auto");
            return false;
        };
        document.getElementById("tool_pingyi").onclick = function () {
            measureTool.toolbar.deactivate();
            drawTool.deactivate();
            isClickQuery=false;
            navToolbar.activate(Navigation.PAN);
            map.setMapCursor("url(plugins/hplus/images/pingyi_btn_hover.png),auto");
            return false;
        };

        //初始化清除选择
        document.getElementById("tool_qingchu").onclick = function () {
            navToolbar.deactivate();//停止缩放工具以及测量工具，以免冲突
            measureTool.toolbar.deactivate();
            drawTool.deactivate();
            isClickQuery=true;//恢复点击查询
            map.graphics.clear();
            //移除临时图层
            var addedGraLyr = map.getLayer("tempGraphic");
			if(addedGraLyr!=null){
				map.removeLayer(addedGraLyr);
			}
			var addedLabelLyr = map.getLayer("tempLabel");
			if(addedLabelLyr!=null){
				map.removeLayer(addedLabelLyr);
			}
            map.setMapCursor("url(plugins/hplus/images/identify_pointer.png),auto");
			return false;
        };
        
        document.getElementById("tool_query").onclick = function () {
            navToolbar.deactivate();//停止缩放工具以及测量工具，以免冲突
            measureTool.toolbar.deactivate();
            isClickQuery=true;
            map.setMapCursor("url(plugins/hplus/images/identify_pointer.png),auto");
            return false;
        };
        
        //初始化拉框查询
        var drawTool = new Draw(map);
        drawTool.on("draw-end", extentQuery);
        document.getElementById("tool_extentquery").onclick = function () {
            map.DrawTool = drawTool;
            navToolbar.deactivate();//停止缩放工具以及测量工具，以免冲突
            measureTool.toolbar.deactivate();
            isClickQuery=false;
            map.setMapCursor("url(plugins/hplus/images/kuangxuan_btn_hover.png),auto");
            drawTool.activate(Draw.EXTENT);
        };
        
        //添加编辑工具，兴趣点编辑
        //定义用于新增兴趣点的绘制工具
      //  var addInterestTool = new Draw(map);
        //addInterestTool.on("draw-end", addInterestToMap);
        //document.getElementById("interest_manager").onclick = function () {
      //      isDrawing = true;
     //       map.DrawTool = addInterestTool;
     //       navToolbar.deactivate();//停止缩放工具以及测量工具，以免冲突
     //       drawTool.deactivate();
     //       measureTool.toolbar.deactivate();
     //       addInterestTool.activate(Draw.POINT);
    //    };
        //初始化图例控件
        //var layers = new Array();

       // for (var key in layerConfiguration.dissertation) {
         //   var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url, { outFields: '*' });
           // tempLayer.name = layerConfiguration.dissertation[key].name;
            //layers.push(tempLayer);
        //}


       // var layerInfo = arrayUtils.map(layers, function (layer, index) {
         //   return { layer: layer, title: layer.name };
        //});

        //if (layerInfo.length > 0) {
          //  var legendDijit = new Legend({
            //    map: map,
              //  layerInfos: layerInfo
            //}, "divLegendWindow");
            //legendDijit.startup();
        //}
    });
}
//矩形查询
function extentQuery(e) {
    //清空地图绘制的元素
    map.graphics.clear();
    //清空结果窗口
    //$('#divExtentResult').html('');
    //$("#extentResultTitle").html('');

    //$("#extentResultInfo").html('');

    firstTab = true;
    isHasResult=false;
    $("#search-clear-btn").show();
    //先把矩形绘制上地图
    var recSymb = new esri.symbol.SimpleFillSymbol(
          esri.symbol.SimpleFillSymbol.STYLE_NULL,
          new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
            new dojo.Color([105, 105, 105]),
            2
          ), new dojo.Color([255, 255, 0, 0.25])
        );
    //根据selectedKey查询

    //如果选择的图层都为空，则在全部图层中根据范围查找，暂时不做
    //if (selectKey == '') {
    //    //使用该范围查询
    //    for (var key in layerConfiguration.dissertation) {
    //        spatialQuery(e.geometry, key);
    //    }
    //}
    //else {
    //    spatialQuery(e.geometry, selectKey);
    //}

    //使用该范围查询
    for (var key in layerConfiguration.dissertation) {
        spatialQuery(e.geometry, key);
    }

    //显示信息框
    map.graphics.add(new esri.Graphic(e.geometry, recSymb));
    map.DrawTool.deactivate();
    map.setMapCursor("url(plugins/hplus/images/identify_pointer.png),auto");
    isClickQuery=true;
}
//初始化
function initExtentTabContent(features,key,length) {
    //获取面板标题内容
    var titleHtml = "<li class=\"active\" style=\"background: transparent;\"><a id=\"tab_Chart\" href=\"#" + key + "\" style=\"background: transparent;\"><font color=\"black\">" + layerConfiguration.dissertation[key].name + "(" + length + ")</font></a></li>";

    //获取面板内容
    var div = initSearchResultContent(features, key);

    var resulthtml = "<div id=\"" + key + "\" class=\"tab_content\" style=\"display:" + firstTab + ";width:100%;max-height:260px;overflow-y:auto\"></div>";
    firstTab = 'none';

    $("#extentResultTitle").append(titleHtml);

    $("#extentResultInfo").append(resulthtml);

    $("#" + key).append(div);
    $("#" + key).mCustomScrollbar("update");

    initTabContent(false);
}
//空间查询
function spatialQuery(extent, key) {
    var query = new esri.tasks.Query();
    query.outFields = layerConfiguration.dissertation[key].outFields; // 名称 like '%B%'
    query.geometry = extent;
    query.returnGeometry = true;
    var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url, { outFields: layerConfiguration.dissertation[key].outFields, id: key });
    tempLayer.queryFeatures(query, function (featureSet) {
        initSearchContentBox(featureSet.features,key);

		/*
		if (features.length > 0) {

            $('#extentResultWindow').show();

            //在结果面板生成tab
            //只在面板上显示10个要素，所以先取出前10个要素
            var tempFeatures = new Array();
            if (features.length > 10) {
                tempFeatures = features.slice(0, 10);
            }
            else {
                tempFeatures = features;
            }
            //如果length>=1000，则重新查询一个总个数
            if (features.length >= 1000) {

                var queryTask = new esri.tasks.QueryTask(layerConfiguration.dissertation[key].url);

                queryTask.executeForCount(query, function (count) {

                    initExtentTabContent(tempFeatures, key, count);

                }, function (error) {
                    console.log(error);
                });

            }
            else {
                initExtentTabContent(tempFeatures, key, features.length);
            }

            for (var i = 0; i < features.length; i++) {
                var type = features[i].geometry.type;
                var graphicsPnt;
                //如果为点类型，则直接作为标注的位置
                //如果为线类型或者多边形，则找出范围类x最大的点，作为标注点，以免标注位置超出拉框的范围
                if (type == "point") {
                    graphicsPnt = features[i].geometry;
                }
                else if (type == "polyline") {
                    var polyline = features[i].geometry;
                    graphicsPnt = getMaxXPoint(polyline, extent);//获取范围内x最大的点
                }
                else if (type == "polygon") {
                    var polygon = features[i].geometry;
                    graphicsPnt = getMaxXPoint(polygon, extent);//获取范围内x最大的点
                }
                else {
                    break;
                }
                //图片样式
                var pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol('plugins/hplus/img/Thumbtack.png', 30, 30).setOffset(15,15);
                var tempGraphic = new esri.Graphic(graphicsPnt, pictureMarkerSymbol)
                map.graphics.add(tempGraphic);
                //添加标注
                //先获取显示的名称
                var titleField = layerConfiguration.dissertation[key].titleField;
                var title = features[i].attributes[titleField];
                var textSymbol = new esri.symbol.TextSymbol(title).setColor(
                    new esri.Color([128, 0, 0])).setAlign(esri.symbol.Font.ALIGN_END).setAngle(0).setFont(
                    new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD)).setOffset(15, 35);
                var labelGraphic = new esri.Graphic(graphicsPnt, textSymbol);
                map.graphics.add(labelGraphic);
            }
        }
		*/
    });
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
                var vertex = new esri.geometry.Point(polyline.paths[z][j][0], polyline.paths[z][j][1], polyline.spatialReference);
                points.push(vertex);
            }
        }
    }
    else if (geometry.type == 'polygon') {
        var polygon = geometry;
        for (var z = 0; z < polygon.rings.length; z++) {
            for (var j = 0; j < polygon.rings[z].length; j++) {
                var vertex = new esri.geometry.Point(polygon.rings[z][j][0], polygon.rings[z][j][1], polygon.spatialReference);
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
//显示720数据
function show720(title,url) {
    layer.open({
		type: 2,
		title: title,
		maxmin: true,
		area: ['100%', '100%'],  
                skin:'layui-layer-lan',
	        shade: 0,
		content: "data/720/" + url
	});

    //var frame = $("#iframe720");
    //frame.attr("src", "data/720/" + url);
    //frame.show();
    //return map;
}


function showVideoWindow(title,url) {
    //document.getElementById("popupVideoWindow").style.display = "block";//隐藏统计面板
    //document.getElementById("videoTitle").innerText = title;
    //var videoControl = document.getElementById('videoControl');
    //videoControl.src = "data/Media/WRJXF1/" + url;
    planeSpatialReference = new esri.SpatialReference(2435);
    //planeMarkerSymbol = (new esri.symbol.SimpleMarkerSymbol()).setColor(new esri.Color("red")).setSize(6).setOutline(lineSymbol);
    planeMarkerSymbol = new esri.symbol.PictureMarkerSymbol("common/image/plane.png",48,48);
    layer.open({
		type: 2,
		title: title,
		maxmin: true,
		area: ['40%', '50%'],
        skin:'layui-layer-lan',
        offset: 'rt',
        shade: 0,
		//content: 'videoPage.html?videoUrl=data/Media/WRJXF1/' + url
        content: 'videoPage.html?videoUrl=http://10.194.170.65:8010/awater_ui_sys/data/Media/WRJXF1/' + url,
        cancel: function () {
           map.graphics.clear();
        }

	});
    map.infoWindow.hide();
    /*var html='<video id="videoControl" controls="controls" style="width: 98%; height: 95%; margin-left: 1%; margin-top: 1px; object-fit: fill" src ="data/Media/WRJXF1/'+ url +'"></video>';
    $("#videoTitle").parent().append(html);*/
}

var planeSpatialReference,planeMarkerSymbol,planelineJson,planelineLength,tourGraphic;

function tourOverTheLine(dueLengthNow) {
    require(["esri/geometry/mathUtils"],function(mathUtil){
        var pointArr = planelineJson.paths[0];
        var calculatedLength = 0;
        for(var i=0;i<pointArr.length-1;i++) {
            var lineLength = mathUtil.getLength(new esri.geometry.Point(pointArr[i][0],pointArr[i][1],planeSpatialReference),new esri.geometry.Point(pointArr[i+1][0],pointArr[i+1][1],planeSpatialReference));
            calculatedLength += lineLength;
            if(calculatedLength < dueLengthNow)
                continue;
            else{
                if(tourGraphic)
                   map.graphics.remove(tourGraphic);
                var rightPoint = new esri.geometry.Point();
                var x = pointArr[i][0] + (pointArr[i+1][0] - pointArr[i][0]) * ((dueLengthNow - (calculatedLength - lineLength))/lineLength);
                rightPoint.setX(x);
                var y = pointArr[i][1] + (pointArr[i+1][1] - pointArr[i][1]) * ((dueLengthNow - (calculatedLength - lineLength))/lineLength);
                rightPoint.setY(y);
                rightPoint.setSpatialReference(planeSpatialReference);
                tourGraphic =  new esri.Graphic(rightPoint,planeMarkerSymbol);
                if(x<map.extent.xmin||x>map.extent.xmax||y<map.extent.ymin) {
                    map.centerAt(new esri.geometry.Point(x,y-(map.extent.ymax-map.extent.ymin)*0.9,planeSpatialReference));
                }else if(y>map.extent.ymax){
                    map.centerAt(new esri.geometry.Point(x,y-(map.extent.ymax-map.extent.ymin)*0.4,planeSpatialReference));
                }
                map.graphics.add(tourGraphic);
                break;
            }
        }
    });
}

function changeLayerVisible(layerId,com,selectedStyle,unSelectedStyle){
	var layer = map.getLayer(layerId);
	if(layer!=null){
    	layer.setVisibility(!layer.visible);
    	if(layer.visible==true){
    		$(com).addClass(selectedStyle).removeClass(unSelectedStyle);
    	}
    	else{
    		$(com).addClass(unSelectedStyle).removeClass(selectedStyle);
    	}
	}
}

function changeBaseMap(baseMapId){
	    var ditu = map.getLayer("DiTu");
    	var yingxiang = map.getLayer("WeiXingYingXiang");
    	var dem = map.getLayer("DemYingXiang");
    	var yingxiangggw = map.getLayer("WeiXingYingXiangGGW");
        switch (baseMapId) {
            case "DiTu":
            	ditu.setVisibility(true);
            	
            	$("#standard-map-icon").addClass("standard-map-selected-icon").removeClass("standard-map-icon");
            	$("#satellite-map-icon").addClass("satellite-map-icon").removeClass("satellite-map-selected-icon");
            	$("#dem-map-icon").addClass("image-map-icon").removeClass("image-map-selected-icon");
            	$("#satellite-map-ggw-icon").addClass("satellite-map-icon").removeClass("satellite-map-selected-icon");

            	yingxiang.setVisibility(false);
            	dem.setVisibility(false);
            	yingxiangggw.setVisibility(false);
                break;
            case "WeiXingYingXiang":
            
            	$("#standard-map-icon").addClass("standard-map-icon").removeClass("standard-map-selected-icon");
            	$("#satellite-map-icon").addClass("satellite-map-selected-icon").removeClass("satellite-map-icon");
            	$("#dem-map-icon").addClass("image-map-icon").removeClass("image-map-selected-icon");
            	$("#satellite-map-ggw-icon").addClass("satellite-map-icon").removeClass("satellite-map-selected-icon");
            
                ditu.setVisibility(false);
            	yingxiang.setVisibility(true);
            	dem.setVisibility(false);
            	yingxiangggw.setVisibility(false);
                break;
            case "DemYingXiang":
            	
            	$("#standard-map-icon").addClass("standard-map-icon").removeClass("standard-map-selected-icon");
            	$("#satellite-map-icon").addClass("satellite-map-icon").removeClass("satellite-map-selected-icon");
            	$("#dem-map-icon").addClass("image-map-selected-icon").removeClass("image-map-icon");
            	$("#satellite-map-ggw-icon").addClass("satellite-map-icon").removeClass("satellite-map-selected-icon");
            
                ditu.setVisibility(false);
            	yingxiang.setVisibility(false);
            	dem.setVisibility(true);
            	yingxiangggw.setVisibility(false);
            	break;
            case "WeiXingYingXiangGGW":
            
            	$("#standard-map-icon").addClass("standard-map-icon").removeClass("standard-map-selected-icon");
            	$("#satellite-map-icon").addClass("satellite-map-icon").removeClass("satellite-map-selected-icon");
            	$("#dem-map-icon").addClass("image-map-icon").removeClass("image-map-selected-icon");
            	$("#satellite-map-ggw-icon").addClass("satellite-map-selected-icon").removeClass("satellite-map-icon");
            
                ditu.setVisibility(false);
            	yingxiang.setVisibility(false);
            	dem.setVisibility(false);
            	yingxiangggw.setVisibility(true);
            	break;
        }
}