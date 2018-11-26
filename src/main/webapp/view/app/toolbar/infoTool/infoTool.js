define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","pager", "echarts", "mapUtils"],
    function ($, app, composition, ko, common, http, panal, pager, echarts,mapUtils) {
        var preViewUrl,preTitle;
        var map;
        var InfoTool = {
            init: function () {
                var that = this;                
                composition.addBindingHandler("infoToolInitHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                        auGurit.global.identifyFlag = false;
                        $(dom).click(function () {
                        });
                    },
                    update: function () {
                    }
                });
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
                map = $("#desktop-main-map")[0].contentWindow.map;
                
                $(".toolbar_info_btn_li").mouseover(function() {
                    $("#infoTool").show();
                });
                $(".toolbar_info_btn_li").mouseleave(function() {
                    $("#infoTool").hide();
                });
            },
            initPanel:function () {
                var that=this;
                http.getInstance("data/riverTopic/riverLayer.json").ajax().then(function (result) {
                    var data = result.topic;
                    modal.menuList(data);    
                    for (var index in data) {
                        var temp=data[index];
                        auGurit.global.mapTopLayers[temp["title"]] = {
                            serviceUrl: temp["serviceUrl"],
                            layerTable: temp["layerTable"],
                            dirLayerId: temp["dirLayerId"],
                            annoFieldCN: temp["annoFieldCN"],
                            sttp: typeof (temp["sttp"]) != "undefined" ? temp["sttp"] : null
                        }
                    }
                    
                });
            },
            initMapOnClick: function () {
                var that=this;
                var hasLayer=(auGurit.global.shareSelectLayers && auGurit.global.shareSelectLayers.length >0);
                if (hasLayer&&!auGurit.global.identifyFlag) {                              
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
                    auGurit.global.identifyFlag = true;
                }else if(!hasLayer){
                    map.off('click');
                    map._mapInterface.layerFeature.clearLayers();
                    $(map._container).css('cursor', '-webkit-grab');
                    auGurit.global.identifyFlag = false;
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
                        common.openDialogPanal(auGurit.global.shareSelectLayers[temp.index].viewUrl, title, {url: resoureUrl}, 620, 380, top, null);     
                    }
                    
                }
            },
            menuClick: function (item) {
                var that=this;
                var title = item.title;
                var viewUrl=item.viewUrl;
                var map = $("#desktop-main-map")[0].contentWindow.map;
                var $item=$("#"+item.id);
                preTitle=title;
                if($item.hasClass("selected")){
                    map._mapInterface.layerFeature.clearLayers();
                    for(var i in auGurit.global.shareSelectLayers){
                        if(auGurit.global.shareSelectLayers[i].title==title){                         
                            map.removeLayer(auGurit.global.shareMapLayers[title]);
                            auGurit.global.shareSelectLayers.splice(i,1);                            
                            break;
                        }
                    }
                    $item.removeClass("selected");   
                }else{
                    that.addDynamicMapLayer();
                    auGurit.global.shareSelectLayers.push({
                        title:title,
                        viewUrl:viewUrl
                    });
                    $item.addClass("selected");
                }
                that.initMapOnClick();
            },
            addDynamicMapLayer:function (){
                var that=this;
                var layerInfo=auGurit.global.mapTopLayers[preTitle];
                if(layerInfo)
                    map._mapInterface.addDynamicMapLayer(layerInfo.serviceUrl,[layerInfo.layerTable], function (layer) {                     
                        auGurit.global.shareMapLayers[preTitle]=layer;
                    });
            }      
        }        

      
        var modal = {
            menuList: ko.observableArray(),
            //操作
            menuClick: $.proxy(InfoTool.menuClick, InfoTool),
        };

        InfoTool.init();
        return modal;
    });