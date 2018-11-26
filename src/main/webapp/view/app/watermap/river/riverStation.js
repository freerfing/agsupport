/**
 * Created by lizzy on 2017/10/30.
 */
define(["jquery", "durandal/app", "knockout", "common", "http", "panal", "pager", "slickGrid","mapUtils"],
    function ($, app, ko, common, http, panal, pager, Slick,mapUtils) {
        var pointObject;
        var features;//所有要素对象

        var lastLocatedPoint;
        var preViewUrl,preTitle;
        var RiverStation = {
            init: function () {
                var that = this;
                that.renderUI();
                that.bindUI();
            },
            renderUI: function () {
                var that = this;
                if(!auGurit.global.shareSelectLayers){
                    auGurit.global.shareSelectLayers = [];
                }
                if (!auGurit.global.mapTopLayers) {//所有图层
                    auGurit.global.mapTopLayers = {};
                }
                if (!auGurit.global.shareMapLayers) {//已选图层
                    auGurit.global.shareMapLayers = {};
                }
            },
            bindUI: function () {
                var that = this;                
                that.initPanel();
                
            },
            initPanel:function () {
                var that=this;
                var docuContent = '<div id="panel-div" class="layer-panel" style="width:130px;right:360px;display: none;"><div class="layer-panel-collapse"><div id="collapse-div"><b class="layer-caret"></b><b class="layer-caret"></b></div></div><ul>';
                http.getInstance("data/riverTopic/riverLayer.json").ajax().then(function (result) {
                    var data = result.topic;
                    for (var index in data) {

                        var temp=data[index];
                        if(temp.hasMap){
                            that.setMapTopLayers(temp);  
                        }                        
                        if (temp.subtopic) {
                            for(var index in temp.subtopic){
                                if(temp.hasMap){
                                    that.setMapTopLayers(temp.subtopic[index]);  
                                }
                            }
                            docuContent += '<li class="" id="' + temp.id + '" data-index="' + index + '" data-view-url='+temp.viewUrl+' data-title=' + temp.title + ' data-layer=' + JSON.stringify(temp.subtopic) + '>' + temp.text + '<div style="float: right;padding-right: 10px;"><b class="layer-caret"></b></div></li>';
                        } else {
                            if (temp.enabled)
                                docuContent += '<li class=""  data-index="' + index + '" data-title="' + temp.title + '" data-view-url='+temp.viewUrl+' data-status="close" data-has-map="'+temp.hasMap+'">' + temp.text + '</li>';
                            else
                                docuContent += '<li class=""  data-index="' + index + '">' + temp.text + '</li>';
                        }
                    }
                    docuContent += "</ul></div>";
                    //desktop-map emap-container
                    $("#desktop-map").append(docuContent);
                    var collapseContent = "<div id='collapseBtn' style='position: absolute;width: 80px;border-radius: 5px;color: #0092de;border: 1px #0092de solid;height: 32px;line-height: 32px;background: white;top: 18px;right: 360px;font-size: 16px;z-index: 1000;cursor:default;'>共享信息</div>"
                    $("#desktop-map").append(collapseContent);

                    $(".layer-panel li").on("click", RiverStation.onLiClick);
                    $(".layer-panel li").on("mouseover", RiverStation.onLiMouseOver);
                    $("#collapse-div").on("click", function () {
                        $(".layer-panel").hide();
                        $("#collapseBtn").show();
                        that.initMapOffClick();
                    });
                    $("#collapseBtn").on("click", function () {
                        $(".layer-panel").show();
                        $("#collapseBtn").hide();    
                        that.initMapOnClick();                   
                        
                    });
                });
            },
            setMapTopLayers:function(data){
                auGurit.global.mapTopLayers[data["title"]] = {
                    serviceUrl: data["serviceUrl"],
                    layerTable: data["layerTable"],
                    dirLayerId: data["dirLayerId"],
                    annoFieldCN: data["annoFieldCN"],
                    sttp: typeof (data["sttp"]) != "undefined" ? data["sttp"] : null
                }
            },
            initMapOffClick:function(){
                var map = $("#desktop-main-map")[0].contentWindow.map;
                if(auGurit.global.shareSelectLayers.length==0){
                    map.off('click');
                    map._mapInterface.layerFeature.clearLayers();
                    $(map._container).css('cursor', '-webkit-grab');
                }
                

            },
            initMapOnClick: function () {
                var that=this;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                $(map._container).css('cursor', 'url(' + auGurit.global.rootPath + '/style/asip/common/css/images/resource/identify_pointer.png),auto');
                map.on("click", function (evt) {
                    map._mapInterface.layerFeature.clearLayers();
                    if(!auGurit.global.shareSelectLayers.length)
                        return;
                    var count = 0;
                    for(var index  in auGurit.global.shareSelectLayers){
                        that.squences = [];//存储squence,用来检查整个循环是否执行完成
                        that.identifyFeature = [];//查询到的结果
                        var mapTopLayer=auGurit.global.mapTopLayers[auGurit.global.shareSelectLayers[index].title];
                        if(mapTopLayer){  
                                count++;                             
                               //count表示for循环过程中i的值,用来检查整个循环是否执行完成
                                (function (index, count) {
                                    var dirLayerId = mapTopLayer.dirLayerId;
                                    var sttp = mapTopLayer.sttp;
                                    if (dirLayerId) {
                                        that.getResult(evt.latlng, {
                                            dirLayerId: dirLayerId,
                                            sttp: sttp
                                        }, index, count);
                                    }
                                })(index, count);
            
                        }
                    }
                    that.mapLayerCount=count;
                });
            },

            getResult:function(latlng,param,index,count){
                var that=this;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                var curTitle=auGurit.global.shareSelectLayers[index].title;
                var mapTopLayer=auGurit.global.mapTopLayers[curTitle];
                map._mapInterface._Identify(latlng, param.dirLayerId, function (result) {                 
                    if (result&&result.length>0){
                        var identifyLayer = [];
                        var layer = map._mapInterface.wktToLayer({                            
                            geometry: result[0].geometry,
                            type: "Feature"
                        });
                        mapUtils.setLayerStyle(layer, 1);
                        map._mapInterface.layerFeature.addLayer(layer);
                        that.identifyFeature.push({
                            data:result[0],
                            layer: layer,
                            type: curTitle,
                            index:index
                        });
                        
                       
                    }
                    that.squences.push(count);
                    that.showResult();
                });
                
            },
            showResult:function(){
                var that=this;
                if (that.squences.length === that.mapLayerCount){
                    for(var i in that.identifyFeature){
                        var temp=that.identifyFeature[i];
                        //如果选中，只显示点
                        if(that.identifyFeature.length>1&&temp.layer.features.geometry.type=='LineString')
                            continue;
                        
                        var title =temp.type+"-"+temp.data.NAME;
                        var resoureUrl=temp.data.URL;
                        var height = Math.ceil($("#desktop-map").height() * 0.98) - 8;
                        var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - 0.98) / 2) + 8;
                        common.openDialogPanal(auGurit.global.shareSelectLayers[temp.index].viewUrl, title, {url: resoureUrl}, 620, 380, top, null, 5, true, true, false);     
                    }
                    
                }
            },

            onLiMouseOver: function (e) {
                if($("#layer-subpanel").length&&$(e.target).data("index")!=null)
                    $("#layer-subpanel").remove();
                var arr = $(e.target).data("layer");
                if(arr){
                    var top = (40+$(e.target).data("index")*32)+"px";
                    var subtopicContent = "<div id='layer-subpanel' class='layer-panel'  style='width:110px;right:250px;top:"+top+";border-radius:0 4px 4px 0'><ul>"
                    for(var index in arr){
                        subtopicContent +="<li>"+arr[index].text+"</li>";
                    }
                    subtopicContent += "</ul></div>";
                    $("#desktop-map").append(subtopicContent);
                }
            },

            onLiClick: function (e) {
                var that=this;
                var title = $(e.target).data("title");               
                var status = $(e.target).data("status");
                var viewUrl=$(e.target).data("viewUrl");                            
		        var hasMap=$(e.target).data("hasMap");
                var map = $("#desktop-main-map")[0].contentWindow.map;
                preTitle=title;
                preViewUrl=viewUrl;
                if(status=="close") {                    
		            if(hasMap){
                        RiverStation.addDynamicMapLayer();
                    }else{
                        RiverStation.addFeaturesLayer();
                    }
                    auGurit.global.shareSelectLayers.push({
                        title:preTitle,
                        viewUrl:preViewUrl,
                        hasMap:hasMap
                    });
		            $(e.target).data("status","open");
                    $(e.target).addClass("activated");
                }else if(status=="open"){
                    var layerFeature = map._mapInterface.layerFeature;
                    layerFeature.clearLayers();
                    for(var i in auGurit.global.shareSelectLayers){
                        if(auGurit.global.shareSelectLayers[i].title==title){                          
                            map.removeLayer(auGurit.global.shareMapLayers[title]);
                            auGurit.global.shareSelectLayers.splice(i,1);                            
                            break;
                        }

                    }
                    $(e.target).data("status","close");
                    $(e.target).removeClass("activated");                    
                }
            },
            addDynamicMapLayer:function (){
                var that=this;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                var layerInfo=auGurit.global.mapTopLayers[preTitle];
                map._mapInterface.addDynamicMapLayer(layerInfo.serviceUrl,[layerInfo.layerTable], function (layer) {                     
                    auGurit.global.shareMapLayers[preTitle]=layer;                    
                });
            }, 
            addFeaturesLayer:function (){
                var that = this;
                var h = http.getInstance("subject/getHuanbaoList", {
                    type: "post"
                });
                var requestParams ={};             
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    dataList=result.list;
                    that._data = data;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };                  
                    that.addFeatures(result.list);                    
                });
            },  
            addFeatures: function (data) {
                var that = this;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                var layerFeature = map._mapInterface.layerFeature;
                layerFeature.clearLayers();
                if(!data) return;
                var featureList = {};
                for (var i = 0; i < data.length; i++) {
                    var feature = {};
                    feature.geometry = "POINT (" + data[i].lgtd + " " + data[i].lttd + ")";
                    feature.properties = data[i];
                    feature.isOverLayer=true;//覆盖上原来的点
                    feature.style = that.getDefaultStyle(data[i].szlb);
                    feature.styleSelected = {
                        "iconUrl": auGurit.global.rootPath + "style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [20,20]
                    };
                    // feature.styleSelected = that.getDefaultStyle(data[i].szlb);
                    // feature.styleSelected.className='_selected';
                    feature.tipContent = data[i].hcmc;
                    if(data[i].ad){//站上水位
                        feature.tipContent+="<br>氨氮:"+parseFloat(data[i].ad).toFixed(2)+"mg/L";
                    }
                    if(data[i].zl){//站下水位
                        feature.tipContent+="<br>总磷:"+parseFloat(data[i].zl).toFixed(2)+"mg/L";
                    }
                    if(data[i].hxqyl){//渠箱水位
                        feature.tipContent+="<br>化学含氧量:"+parseFloat(data[i].hxqyl).toFixed(2)+"mg/L";
                    }
                    if(data[i].rjy){//站上水位
                        feature.tipContent+="<br>溶解氧:"+parseFloat(data[i].rjy).toFixed(2)+"mg/L";
                    }
                    if(data[i].tmd){//渠箱水位
                        feature.tipContent+="<br>透明度:"+parseFloat(data[i].tmd).toFixed(2)+"mg/L";
                    }
                    if(data[i].jsny){//站上水位
                        feature.tipContent+="<br>监测年月:"+data[i].jsny+"";
                    }
                    featureList["feature_" + data[i].sGuid] = feature;
                }

                var obj= map._mapInterface.addFeature(featureList, function (selectedFeature) {
                        that.resetFeatureStyle(selectedFeature); 
                        var params=selectedFeature.features.properties;                                          
                        openPanel(params.hcmc,"view/app/watermap/river/huanbao/huanbaoDetail",params);
                    },{isResetLevel:true});
                
                features = obj.markerList;
                auGurit.global.shareMapLayers[preTitle] = obj.featureGroup;
            },   
            getDefaultStyle:function(szlb){                
                var style;
                var iconUrl=auGurit.global.rootPath+"view/app/common/huanbao/icon_";
                if(szlb)
                    iconUrl+=szlb.replace("类", "");
                iconUrl+=".png";
                style = {
                    iconUrl: iconUrl,
                    iconSize: [20, 20]
                };
                return style;
            },
             resetFeatureStyle: function (selectedFeature) {
                var map = $("#desktop-main-map")[0].contentWindow.map;
                if (lastLocatedPoint && lastLocatedPoint != selectedFeature) {
                    lastLocatedPoint.style = lastLocatedPoint.features.style;
                    map._mapInterface.setFeatureStyle(lastLocatedPoint);
                }
                lastLocatedPoint = selectedFeature;
            },
            
        }

        function openPanel(_title,_url,_param) {
            var top = 75;
            var left = 41;           
            common.openDialogPanal(_url,_title,_param,600, 480, top, left);
        }

        RiverStation.init();
    });