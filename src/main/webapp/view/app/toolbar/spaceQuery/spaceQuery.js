define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http","mapUtils","jqxgrid.selection"],
    function ($, app, composition, ko, common, http,mapUtils) {
        var curPanal;
        var map=$("#desktop-main-map")[0].contentWindow.map;//地图对象;
        var MapToolBar = {
            init: function () {
                var that = this;
                composition.addBindingHandler("spacebarbtnInitHandler", {
                    init: function (dom) {
                        that.renderUI();
                        that.bindUI();
                        $(dom).click(function () {
                        });
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                $(".space_btn").mouseover(function () {
                    $("#spacetool").show();
                });
                $(".sub_map_space").mouseleave(function () {
                    $("#spacetool").hide();
                });
            },
            // 道路搜索
            susou:function(){
            	var dis=layer.open({  
            	    id:1,  
                    type: 1,  
                    title:'地名定位',  
                    skin:'layui-layer-rim',  
                    area:['450px', '160px'], 
                    content: '<div style="margin-top: 10px;">道路名：<input id="road" type="text" style="width: 67%;height: 24px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;border: 1px solid #ccc;border-radius: 4px;" ></div>',  
                    btn:['确定','关闭'],  
                    btn1: function (index,layero) { 
                    		var road=$("#road").val();
                    		map._mapInterface.roadSearch(road);
                    	
    	 	                // 关闭弹窗
    	               		layer.close(index);                      	
                    },  
                    btn2:function (index,layero) {  
                    	layer.close(index);   
                    } 
            	});    
            },
            // 数据加载
            jiazai:function(){
            	map._mapInterface.dataLoad()
            },
            // 路径分析
            lujing:function(){
            	    // 路径分析
	            	layer.open({
						type: 2,
						content: ["/awater/view/app/watermap/spaceQuery/route/route.html"],
						shadeClose: true,
						title: '路径分析',
						area: ['80%', '500px']
					}); 
            },
            // 查询
            chaxun: function () {
            	// 清空范围
            	map._mapInterface.layerFeature.clearLayers();
            	
            	var wkt="";
            	// 查询范围
               map._mapInterface.drawGraph("polygon",function(re){
            	   wkt=map._mapInterface.wktToGeojson(re,"polygon");
            	   
            	   // 查询页面
            	   var radio = 0.98;
                   var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                   var top = 75;
                   var left = 310;
                   var title = "空间查询";     
                   common.openDialogPanal("view/app/watermap/spaceQuery/query/query", title, {
                	   wkt: wkt
                   }, 500, 440,top,left);
            	   
               });   
            },
            //分析
            fengxi: function () {
            	// 清空范围
            	map._mapInterface.layerFeature.clearLayers();
            	
            	var wkt="";
            	// 查询范围
               map._mapInterface.drawGraph("polygon",function(re){
            	   wkt=map._mapInterface.wktToGeojson(re,"polygon");
            	   
            	   // 统计分析
            	   var radio = 0.98;
                   var height = Math.ceil($("#desktop-map").height() * radio) - 8;
                   var top = 75;
                   var left = 310;
                   var title = "统计分析";   
                   common.openDialogPanal("view/app/watermap/spaceQuery/analysis/analysis", title, {
                	   wkt: wkt
                   }, 500, 440,top,left);            	   
               });  
            },
            //缓冲
            huangchong: function () {
            	var dis=layer.open({  
            	    id:1,  
                    type: 1,  
                    title:'缓冲分析',  
                    skin:'layui-layer-rim',  
                    area:['450px', '160px'], 
                    content: '<div style="margin-top: 10px;">缓冲距离（米）：<input id="dis" type="text" style="width: 67%;height: 24px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;border: 1px solid #ccc;border-radius: 4px;" ></div>',  
                    btn:['确定','关闭'],  
                    btn1: function (index,layero) { 
                    	var dis=$("#dis").val();
                    	
                    	if(dis==""||dis=="0"||!(/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/.test(dis))){
    	               		layer.msg('缓冲距离不能为空且必须是大于0的数字，请重新输入', {time: 3000,icon: 2});
    	               		return ;
    	               	}else{    	               		
    	               		// 查询范围
    	 	               map._mapInterface.drawGraph("marker",function(re){            	    
    	 		               	
    	 		               	var post = 'wkt=' + re + '&dBuffer=' + dis;
    	 		               	var url = agsupportUrl+'/agsupport/operate/buffer';
    	 		                $.post(url, post, function (r) {		
    	 		                	
    	 		                	var wkt=map._mapInterface.wktToGeojson(r,"circle");
    	 		                	
    	 		                	// 缓冲分析
    	 		                	var radio = 0.98;
    	 		                    var height = Math.ceil($("#desktop-map").height() * radio) - 8;
    	 		                    var top = 75;
    	 		                    var left = 310;
    	 		                    var title = "缓冲分析";     
    	 		                    common.openDialogPanal("view/app/watermap/spaceQuery/buffer/buffer", title, {
    	 		                    	wkt: wkt
    	 		                    }, 500, 440,top,left);
    	 		                });     
    	 		                	
    	 	               });
    	 	               // 关闭弹窗
    	               		layer.close(index);  
    	               	}
                    	
                    },  
                    btn2:function (index,layero) {  
                    	layer.close(index);   
                    }  
              
                }); 
            }
        };

        var modal = {
            chaxun: $.proxy(MapToolBar.chaxun, MapToolBar),
            fengxi: $.proxy(MapToolBar.fengxi, MapToolBar),
            huangchong: $.proxy(MapToolBar.huangchong, MapToolBar),
            lujing: $.proxy(MapToolBar.lujing, MapToolBar),
            susou: $.proxy(MapToolBar.susou, MapToolBar),
            jiazai: $.proxy(MapToolBar.jiazai, MapToolBar)
        };

        MapToolBar.init();
        return modal;
    });