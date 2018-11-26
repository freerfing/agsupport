/**
 * 空间查询
 */
define(["jquery","layer", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "echarts", "slickGrid", "watertype", "mapUtils", "jqxgrid.selection", "WdatePicker", "bootstrap"],
	function ($,layer, app, composition, ko, common, http, panal, pager, echarts, Slick, w, mapUtils) {
		var panalObj;
		var map = $("#desktop-main-map")[0].contentWindow.map;//地图对象
		var title;
		var buffer = {
			init: function () {
				var that = this;
				composition.addBindingHandler("bufferDisInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
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
                modal.search().hcjl("");
            },
            initLayout: function () {
            	var that = this;
                var jqHeight =  $(".app-panal-content").height() - 100;
                var columns = panalObj.getSizeState() == "max" ? that._columns : that._normalColumns;
            },
            initPage: function (modal) {
                this._columns = [];
                this._normalColumns = [];
            },
            initTableColumns: function () {
                var that = this;
                var normalColumns = [];
                that._normalColumns = normalColumns;
                that.initLayout();
            },  
            clickSearchBtn: function () {
                var that = this;
                var wkt="";
                
                // 清空范围
                map._mapInterface.layerFeature.clearLayers();
                
                try{     
                	// 查询缓冲范围
	               	var dBuffer = modal.search().hcjl();
	               	if(dBuffer==""||dBuffer=="0"||!(/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/.test(dBuffer))){
	               		layer.msg('缓冲距离不能为空且必须是大于0的数字，请重新输入', {time: 3000,icon: 2});
	               		return ;
	               	}
                	
	               // 查询范围
	               map._mapInterface.drawGraph("marker",function(re){            	    
		               	
		               	var post = 'wkt=' + re + '&dBuffer=' + dBuffer;
		               	var url = agsupportUrl+'/agsupport/operate/buffer';
		                $.post(url, post, function (r) {		
		                	
		                	wkt=map._mapInterface.wktToGeojson(r,"circle");
		                	
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
                }catch(e){
                	console.log(e);
                	layer.alert('执行缓冲分析时发生异常，请联系系统管理员！', {icon: 2});
                }
            },
            clickClearBtn: function () {            	
            	modal.search().hcjl("");          	
            	map._mapInterface.layerFeature.clearLayers();
            }
		}
		var modal = {
			IsMax: ko.observable(false),
			search: ko.observable({
				hcjl: ko.observable("")
			}),
			clickSearchBtn: $.proxy(buffer.clickSearchBtn, buffer),
			clickClearBtn: $.proxy(buffer.clickClearBtn, buffer)
		}
		buffer.init();
		return modal;
	});