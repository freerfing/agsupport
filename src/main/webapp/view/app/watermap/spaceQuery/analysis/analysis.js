/**
 * 空间查询
 */
define(["jquery","layer", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
	function ($,layer, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
		var panalObj;
		var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
		var title;
		var analysis = {
			init: function () {
				var that = this;
				composition.addBindingHandler("analysisInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
                        modal.wkt(panalObj.param.wkt);
                        that.renderUI();
                        that.bindUI();
                    },
                    update: function () {
                    }
                });
			},
			renderUI: function () {
                var that = this;
                panalObj.addEvent("onMinShow", function (e) {
                    that.initLayout();
                });
                panalObj.addEvent( "onMaxShow", function (e) {
                    that.initLayout();
                });
            },
            bindUI: function () {
                var that = this;
                that.initPage(modal);
                that.initTableColumns();
                this.clickSearchBtn(modal.wkt());
            },
            initLayout: function () {
            	var that = this;
                var jqHeight =  $(".app-panal-content").height() - 100;
                var columns = panalObj.getSizeState() == "max" ? that._columns : that._normalColumns;
                $("#analysisList").jqxGrid({
                    width: '100%',
                    height: 370,
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    columns: columns
                });
            },
            initPage: function (modal) {
                this._columns = [];
                this._normalColumns = [];
            },
            initTableColumns: function () {
                var that = this;
                var normalColumns = [];
                normalColumns.push({
                    align:"center",
                    cellsalign:"center",
                    cellsrenderer:null,
                    datafield:"type",
                    id:"type",
                    order:1,
                    text:"类型",
                    width:"130"
                });
                normalColumns.push({
                    align:"center",
                    cellsalign:"center",
                    cellsrenderer:null,
                    datafield:"all",
                    id:"all",
                    order:1,
                    text:"总计",
                    width:"340"
                });
                that._normalColumns = normalColumns;
                that.initLayout();
            },  
            clickSearchBtn: function (wkt2) {
                var that = this;
                var wkt="";
                // 清空数据
            	gridDataSource = {
                        localdata:[],
                        datatype: "array"
                };
            	var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
            	$("#analysisList").jqxGrid({
            		source: dataAdapter
            	});                
                
                // 图层数组
                var lay=new Array();                
                lay[0]={"title":"河流","name":"RVNM"}; 
                lay[1]={"title":"湖泊","name":"LKNM"};
                lay[2]={"title":"水库","name":"RSNM"};
                lay[3]={"title":"堤防","name":"LVNM"};
                lay[4]={"title":"水闸","name":"SLNM"};
                lay[5]={"title":"泵站","name":"IDSTNM"};
                lay[6]={"title":"雨量站","name":"STNM"};
                lay[7]={"title":"河道水位站","name":"STNM"};
                lay[8]={"title":"水库水文站","name":"STNM"};
                lay[9]={"title":"拦河坝水文站","name":"STNM"};
                lay[10]={"title":"堰闸水文站","name":"STNM"};
                lay[11]={"title":"污水管液位监测站","name":"STNM"};
                lay[12]={"title":"排水泵监测点","name":"STNM"};
                lay[13]={"title":"河涌水质监测站","name":"STNM"};
                lay[14]={"title":"污水处理厂进出口水质水量监测站","name":"STNM"};
                lay[15]={"title":"积水监测点","name":"STNM"};
                
                try{  
                	// 查询范围
  	                // map._mapInterface.drawGraph("polygon",function(re){
  	            	//   wkt=map._mapInterface.wktToGeojson(re);
                	if(wkt2!=""){
                		wkt=wkt2;
                	}
                 	
  	            	   // 判断空间范围
 		               if(wkt!=""){
 		            	    // 稍等 
 		               	 	layer.msg('统计分析正在执行中，请稍候...', {
 			            	    time: 5000,
 			            	    icon: 1
 			            	});
 		               	 	
 		               	    // 河流
 		                    if($("a[name='topic-21-1']").hasClass("hover")){
 			                	var la0=lay[0];
 			                	var title0=la0.title;
 			                	var name0=la0.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title0]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title0]["layerTable"],
 			                        where: "1=" + 1,
 			                        geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	                        	
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title0,all:all});    
 			                        }
 			                    });
 		                    }
 		                                        
 		                	// 湖泊  
 		                    if($("a[name='topic-21-3']").hasClass("hover")){
 			                    var la1=lay[1];
 			                	var title1=la1.title;
 			                	var name1=la1.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title1]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title1]["layerTable"],
 			                        where: "1=" + 1,
 			                        geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title1,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 水库
 		                    if($("a[name='topic-22-1']").hasClass("hover")){
 			                    var la2=lay[2];
 			                	var title2=la2.title;
 			                	var name2=la2.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title2]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title2]["layerTable"],
 			                        where: "1=" + 1,
 			                        geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	 
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title2,all:all});
 			                        }
 			                    });
 		                    }
 		                	                    
 		                	// 堤防
 		                    if($("a[name='topic-22-2']").hasClass("hover")){
 			                    var la3=lay[3];
 			                	var title3=la3.title;
 			                	var name3=la3.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title3]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title3]["layerTable"],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	 
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title3,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 水闸
 		                    if($("a[name='topic-22-3']").hasClass("hover")){
 			                    var la4=lay[4];
 			                	var title4=la4.title;
 			                	var name4=la4.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title4]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title4]["layerTable"],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title4,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 泵站
 		                    if($("a[name='topic-22-4']").hasClass("hover")){
 			                    var la5=lay[5];
 			                	var title5=la5.title;
 			                	var name5=la5.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title5]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title5]["layerTable"],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	  
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title5,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 雨量站
 		                    if($("a[name='topic-23-3']").hasClass("hover")){
 			                    var la6=lay[6];
 			                	var title6=la6.title;
 			                	var name6=la6.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title6]["serviceUrl"],	
 			                    	layerTable: [1,3,5,7],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	 
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title6,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 河道水位站
 		                    if($("a[name='topic-23-1']").hasClass("hover")){
 			                    var la7=lay[7];
 			                	var title7=la7.title;
 			                	var name7=la7.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title7]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title7]["layerTable"],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title7,all:all});
 			                        }
 			                    });
 		                    }
 		                    
 		                	// 水库水文站
 		                    if($("a[name='topic-23-2']").hasClass("hover")){
 			                    var la8=lay[8];
 			                	var title8=la8.title;
 			                	var name8=la8.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title8]["serviceUrl"],	
 			                    	layerTable: [1,3,5,7],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title8,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 拦河坝水文站
 		                    if($("a[name='topic-23-10']").hasClass("hover")){
 			                    var la9=lay[9];
 			                	var title9=la9.title;
 			                	var name9=la9.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title9]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title9]["layerTable"],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title9,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 堰闸水文站
 		                    if($("a[name='topic-23-6']").hasClass("hover")){
 			                    var la10=lay[10];
 			                	var title10=la10.title;
 			                	var name10=la10.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title10]["serviceUrl"],	
 			                    	layerTable: [1,3,5,7],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	   
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title10,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 污水管液位监测站
 		                    if($("a[name='topic-23-7']").hasClass("hover")){
 			                    var la11=lay[11];
 			                	var title11=la11.title;
 			                	var name11=la11.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title11]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title11]["layerTable"],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title11,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 排水泵监测点
 		                    if($("a[name='topic-23-9']").hasClass("hover")){
 			                    var la12=lay[12];
 			                	var title12=la12.title;
 			                	var name12=la12.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title12]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title12]["layerTable"],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	  
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title12,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 河涌水质监测站
 		                    if($("a[name='topic-23-4']").hasClass("hover")){ 
 			                    var la13=lay[13];
 			                	var title13=la13.title;
 			                	var name13=la13.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title13]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title13]["layerTable"],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	  
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title13,all:all});
 			                        }
 			                    });
 		                    }
 		                	
 		                	// 污水处理厂进出口水质水量监测站
 		                    if($("a[name='topic-23-5']").hasClass("hover")){
 				                var la14=lay[14];
 				            	var title14=la14.title;
 				            	var name14=la14.name;
 				            	var layerOption={
 				                	url:auGurit.global.mapTopLayers[title14]["serviceUrl"],	
 				                	layerTable: auGurit.global.mapTopLayers[title14]["layerTable"],
 				                    where: "1=" + 1,
 				                   geometry:wkt,
 				                    opacity: 1
 				                };
 				                map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 				                    if(featureCollection){
 				                    	var all=featureCollection.features.length;	  
 				                    	$("#analysisList").jqxGrid("addrow",null,{type:title14,all:all});
 				                    }
 				                });
 		                    }
 		                	
 		                	// 积水监测点
 		                    if($("a[name='topic-23-8']").hasClass("hover")){
 			                    var la15=lay[15];
 			                	var title15=la15.title;
 			                	var name15=la15.name;
 			                	var layerOption={
 			                    	url:auGurit.global.mapTopLayers[title15]["serviceUrl"],	
 			                    	layerTable: auGurit.global.mapTopLayers[title15]["layerTable"],
 			                        where: "1=" + 1,
 			                       geometry:wkt,
 			                        opacity: 1
 			                    };
 			                    map._mapInterface.queryLayerObjects(layerOption,function(featureCollection){
 			                        if(featureCollection){
 			                        	var all=featureCollection.features.length;	 
 			                        	$("#analysisList").jqxGrid("addrow",null,{type:title15,all:all});
 			                        }
 			                    });
 		                    }
 		               }else{
 		            	   layer.msg('空间范围不能为空，请在地图上标记空间范围...', {
 		   	            	    icon: 2
 		   	                });
 		                	
 		                	// 无范围则不执行查询
 		                	return ; 
 		               }
  	            //  });
                }catch(e){
                	console.log(e);
                	layer.alert('执行统计分析时发生异常，请联系系统管理员！', {icon: 2});
                }
            },
            clickClearBtn: function () {
            	// 清空数据
            	gridDataSource = {
                        localdata:[],
                        datatype: "array"
                };
            	var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
            	$("#analysisList").jqxGrid({
            		source: dataAdapter
            	});
            	map._mapInterface.layerFeature.clearLayers();
            }
		}
		var modal = {
			wkt:ko.observable(),	
			IsMax: ko.observable(false),
			clickSearchBtn: $.proxy(analysis.clickSearchBtn, analysis),
			clickClearBtn: $.proxy(analysis.clickClearBtn, analysis)
		}
		analysis.init();
		return modal;
	});