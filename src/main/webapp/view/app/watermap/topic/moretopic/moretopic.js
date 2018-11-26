/**
 * Created by hzp on 2017-07-20.
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "slickGrid", "jqxgrid.selection", "WdatePicker"],
    function ($, app, composition, ko, common, http, panal, pager, Slick) {
        var moretopic = {
            init: function () {
                var that = this;
                composition.addBindingHandler("moretopicInitHandler", {
                    init: function (dom) {
                       /* panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onMaxShow = function () {
                        };*/
                        that.ey = modal._$_param.ey;
                        that.ex = modal._$_param.ex;
                        that.topicid = modal._$_param.topicid;
                        that.renderUI();
                        that.bindUI();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
                var that = this;
                var getMenuService=http.getInstance("data/topic/moretopic.json")
                getMenuService.ajax().then(function(data){
                    that.topicid;
                    var index;
                    for(var i=0;i<(data.topic).length;i++){
                        if((data.topic)[i].id == that.topicid){
                            index = i;
                            break;
                        }
                    }
                    modal.topicList((data.topic)[index]);
                    if(auGurit.global.hoversubtopic != undefined){
                        $("#mainnav-moretopic>a[name='"+auGurit.global.hoversubtopic+"']").addClass("hover");
                    }
                    //modal.topicList(data.topic);
                    //data.topic.length>0&&modal.clickSubTopic(data.topic[0].subtopic[1]);
                });
            },
            bindUI: function () {
                var that = this;
                that.ex += 19;
                that.ey -= 109;
                $("#mtopic").css('top', that.ey+"px");
                $("#mtopic").css('left', that.ex+"px");

            },
            clickSubMoreTopic:function(item){
                var that = this;
                var flag = false;
                //改变一下地址指向，不然始终是auGurit.global.topicModal.topicList原来所指向的地址值。
                var moretopicData  = JSON.parse(JSON.stringify(auGurit.global.topicModal.topicList._latestValue));
                for(var i=0;i<moretopicData.length;i++){
                    if(moretopicData[i].id == that.topicid){
                        var moreSubtopic = (moretopicData[i].subtopic);
                        for(var j=0;j<moreSubtopic.length;j++){
                            if(moreSubtopic[j].id == item.id){
                                flag = true;
                                break;
                            }
                        }
                        if(flag != true){
                            (moretopicData[i].subtopic).pop();
                            (moretopicData[i].subtopic).unshift(item);
                        }
                    }
                }
                auGurit.global.topicModal.topicList(moretopicData);
                auGurit.global.hoversubtopic = item.id;
                $("#mainnav-moretopic a").removeClass("hover");
                $("#mainnav-moretopic>a[name='"+item.id+"']").addClass("hover");
                $(".nr_sd>a[name='"+item.id+"']").addClass("hover");
                if (auGurit.global.mapUtil) {
                    // auGurit.global.mapUtil.clearMap();
                }
                if(auGurit.global.utlBar){
                    auGurit.global.utlBar=false;
                    $("#smainPanel").animate({
                        width: "hide",
                        paddingLeft: "hide",
                        paddingRight: "hide",
                        marginLeft: "hide",
                        marginRight: "hide"
                    }, 300);
                    setTimeout(function() {
                        $(".desktop-map").css("left",40);
                        $("#sidebar a").removeClass("hover");
                    }, 300);
                }
                var radio = 0.98;
                var height = Math.ceil($("#desktop-map").height() * radio)-8;
                var top = Math.ceil($(".desktop-head").height() + $("#desktop-map").height() * (1 - radio) / 2)+8;
                var right = 5;
                if(item.title=="水库"){
                    //this.openWidgetPanal("view/app/common/list",item.title,{},350,height,top,right,true,true,false);
                    this.openWidgetPanal("view/app/watermap/reservoir/reservoir",item.title,{},350,height,top,null,right,true,true,false);
                }else if(item.title=="排水管网"){
                    this.openWidgetPanal("view/app/watermap/topic/drainagenetwork/drainagenetwork",item.title,{},340,height,top,null,right,false,true,true);
                }else if(item.title == "雨量站"){
                    this.openWidgetPanal("view/app/watermap/rainFallStation/rainFallStation",item.title,{},340,height,top,null,right,false,true,true);
                }else if(item.title == "泵站"){
                    this.openWidgetPanal("view/app/watermap/topic/pumpstation/pumpstation",item.title,{},340,height,top,null,right,false,true,true);
                }else if(item.title == "水质监测点"){
                    this.openWidgetPanal("view/app/watermap/topic/waterquality/waterquality",item.title,{},340,height,top,null,right,false,true,true);
                }else if(item.title == "易涝点"){
                    this.openWidgetPanal("view/app/watermap/topic/floodPoint/floodPoint",item.title,{},340,height,top,null,right,false,true,true);
                }else if(item.title == "黑臭水体"){
                    this.openWidgetPanal("view/app/watermap/topic/blacksmellywater/blacksmellywater",item.title,{},340,height,top,null,right,false,true,true);
                }else if(item.title == "河涌视频"){
                    this.openWidgetPanal("view/app/watermap/topic/creekvideo/creekvideo",item.title,{},340,height,top,null,right,false,true,true);
                }else if(item.title == "卫星云图"){
                    this.openWidgetPanal("view/app/watermap/topic/cloudchart/cloudchart",item.title,{},document.documentElement.clientWidth - 42,height,top,41,null,false,true,true);
                }else if(item.title == "气象雷达"){
                    this.openWidgetPanal("view/app/watermap/topic/weatherradar/weatherradar",item.title,{},document.documentElement.clientWidth - 42,height,top,41,null,false,true,true);
                }else if(item.title == "台风路径"){
                    this.openWidgetPanal("view/app/watermap/topic/typhoontrack/typhoontrack",item.title,{},document.documentElement.clientWidth - 42,height,top,41,null,false,true,true);
                }else if(item.title == "污水处理厂"){
                    this.openWidgetPanal("view/app/watermap/topic/wastewaterplant/wastewaterplant",item.title,{},340,height,top,null,right,false,true,true);
                }else if(item.title == "闸站"){
                    this.openWidgetPanal("view/app/watermap/topic/wasstation/wasstation",item.title,{},340,height,top,null,right,false,true,true);
                }else if(item.title == "三防应急"){
                    var doc = $("#desktop-main-map").contents().find("#agcom_2dmap").contents();
                    var node = doc.find("#dragPanel_widgetID_ag-layerTree  li[dirlayerid='16e1588f-ddb2-42a6-87ea-c9918510706a'").find(".layer");
                    $(node).click();
                }
                $('#moretopic').stop(true,true).slideUp(200);
            },
            openWidgetPanal:function(url,title,param,width,height,top,left,right,maxBtn,resizable,draggable,switchBtn,multiId){
                var settings = {
                    width: width||360,
                    height: height||$(".desktop-map").height(),
                    resizable: resizable,
                    draggable: draggable,
                    minBtn: false,
                    maxBtn: maxBtn,
                    closeBtn: true,
                    statBtn: switchBtn,
                    detailBtn: switchBtn,
                    multi:multiId,
                    multiId:multiId,
                    titleShow: true,
                    title: title,
                    panalListTitle: "",   //在桌面的面板列表上显示的标题
                    top: top,
                    left:left,
                    right: right,
                    mouseoutClose: false, //鼠标移出即关闭
                    pointShow: false,     //面板是否带有指示角
                    pointBorder: "right",  //left/right/top/bottom
                    pointPosition: 0,    //距离顶点的位置,从左边到右或者从上到下的距离
                    modal: false,         //是否模态
                    closeOther: true
                };
                var p = panal.getInstance(url,settings,param);
                auGurit.global.utlPanal=p;
                //this.resizeMap("left",width);
            }
        }
        var modal = {
            topicList: ko.observableArray(),
            clickSubMoreTopic: $.proxy(moretopic.clickSubMoreTopic,moretopic)
        };
        moretopic.init();
        return modal;
    });

