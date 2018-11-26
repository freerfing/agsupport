define(["jquery", "durandal/app", "knockout", "common", "http", "panal", "pager", "slickGrid","mapUtils"],
    function ($, app, ko, common, http, panal, pager, Slick,mapUtils) {
        var pointObject;
        var features;

        var lastLocatedPoint;
        var preViewUrl,preTitle;
        var RelevantInfo = {
            init: function () {
                var that = this;
                that.renderUI();
                that.bindUI();
                that.identifyFlag = false;
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
                http.getInstance("data/riverTopic/riverLayer.json").ajax().then(function (result) {
                    var docuContent='<div id="panel-div" class="layer-panel">';

                    // docuContent += '<div class="layer-panel-collapse"><div id="collapse-div"><b class="layer-caret"></b><b class="layer-caret"></b></div></div>';
                    var data = result.topic;
                    docuContent+="<ul>";
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
                            docuContent += '<li id="' + temp.id + '" data-index="' + index + '" data-view-url='+temp.viewUrl+' data-title=' + temp.title + ' data-layer=' + JSON.stringify(temp.subtopic) + '>' + temp.text + '<div style="float: right;padding-right: 10px;"><b class="layer-caret"></b></div></li>';
                        } else {
                            if (temp.enabled)
                                docuContent += '<li data-index="' + index + '" data-title="' + temp.title + '" data-view-url='+temp.viewUrl+' data-status="close" data-has-map="'+temp.hasMap+'">' + temp.text + '</li>';
                            else
                                docuContent += '<li data-index="' + index + '">' + temp.text + '</li>';
                        }
                    }
                    docuContent += "</ul></div>";
                    //desktop-map emap-container
                    $(".map-container").append(docuContent);
                    var leftValue=$("#widgets_toolbar").position().left+$("#widgets_toolbar").width()+45;                    
                    $("#panel-div").css({"left":leftValue});
                    $(".layer-panel li").on("click", that.onLiClick);
                    $(".layer-panel li").on("mouseover",that.onLiMouseOver);
                    $("#collapse-div").on("click", that.hideInfo);
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
            hideInfo:function(){
                $(".layer-panel").hide();
                $("#tool_btn_info").removeClass("active");
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
                var hasLayer=(auGurit.global.shareSelectLayers && auGurit.global.shareSelectLayers.length >0);
               if (hasLayer&&!that.identifyFlag) {                              
                    $(map._container).css('cursor', 'url(' + auGurit.global.rootPath + '/style/asip/common/css/images/resource/identify_pointer.png),auto');
                    map.on("click", function (evt) {
                        if (!hasLayer) {
                            alert("当前地图没有可查询的关联信息！");
                            return;
                        }
                        map._mapInterface.layerFeature.clearLayers();

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
                    that.identifyFlag = true;
                }else if(!hasLayer){
                    map.off('click');
                    map._mapInterface.layerFeature.clearLayers();
                    $(map._container).css('cursor', '-webkit-grab');
                    that.identifyFlag = false;
                }
                
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
                    var top = ($(e.target).data("index")*32)+"px";
                    var leftValue=$("#panel-div").position().left+$("#panel-div").width()+"px";
                    var subtopicContent = "<div id='layer-subpanel' class='layer-panel layer-subpanel'  style='top:"+top+";left:"+leftValue+"'><ul>"
                    for(var index in arr){
                        subtopicContent +="<li>"+arr[index].text+"</li>";
                    }
                    subtopicContent += "</ul></div>";
                    $(".map-container").append(subtopicContent);
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
                        RelevantInfo.addDynamicMapLayer();
                    }else{
                        RelevantInfo.addFeaturesLayer();
                    }
                    auGurit.global.shareSelectLayers.push({
                        title:preTitle,
                        viewUrl:preViewUrl,
                        hasMap:hasMap
                    });
		            $(e.target).data("status","open");
                    $(e.target).addClass("activated");
                }else if(status=="open"){
                    map._mapInterface.layerFeature.clearLayers();
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
                RelevantInfo.initMapOnClick();
            },
            addDynamicMapLayer:function (){
                var that=this;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                var layerInfo=auGurit.global.mapTopLayers[preTitle];
                map._mapInterface.addDynamicMapLayer(layerInfo.serviceUrl,[layerInfo.layerTable], function (layer) {                     
                    auGurit.global.shareMapLayers[preTitle]=layer;
                });
            }      
        }        

        RelevantInfo.init();
    });