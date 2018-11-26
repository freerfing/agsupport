define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "layer"],
    function ($, app, composition, ko, common, layer) {
        var curPanal;
        var map;
        var MapToolBar = {
            init: function () {
                var that = this;
                composition.addBindingHandler("toolbarbtnInitHandler", {
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
                $(".tool_btn").mouseover(function () {
                    $("#maptool").show();
                });
                $(".sub_map_tool").mouseleave(function () {
                    $("#maptool").hide();
                });
            },
            //切换矢量图
            switch_vector: function () {
                alert("a");
            },
            //放大
            blow_up: function () {
                map = $("#desktop-main-map")[0].contentWindow.map;
                map.zoomIn();
            },
            //缩小
            shrink: function () {
                map = $("#desktop-main-map")[0].contentWindow.map;
                map.zoomOut();
            },
            //平移
            translate: function () {
                map = $("#desktop-main-map")[0].contentWindow.map;
                map._mapInterface.pan();
            },
            //测距
            ranging: function () {
                map = $("#desktop-main-map")[0].contentWindow.map;
                map._mapInterface.lengthMeasure();
            },
            //测面
            measuring_surface: function () {
                map = $("#desktop-main-map")[0].contentWindow.map;
                map._mapInterface.areaMeasure();
            },
            //清除
            clear: function () {
                map = $("#desktop-main-map")[0].contentWindow.map;
                map._mapInterface.clearMap();
                map._mapInterface.layerFeature.clearLayers();
            },
            // 标注
            label:function(){
            	map = $("#desktop-main-map")[0].contentWindow.map;
                map._mapInterface.clearMap();
            	map._mapInterface.label();
            },
			// 打印
			print: function(){
            	var htmlContent = String()
					+ '<table id="table_print_setting">'
						+ '<tr>'
							+ '<td style="width: 25%;">打印标题：</td>'
							+ '<td style="width: 75%;"><input type="text" maxlength="50" name="printTitle" id="printTitle" placeholder="请输入打印标题"></td>'
						+ '</tr>'
						+ '<tr>'
							+ '<td>打印备注：</td>'
							+ '<td><textarea id="printRemark" placeholder="请输入打印备注" rows="4"></textarea></td>'
						+ '</tr>'
            		+ '</table>';
				layer.open({
					content: htmlContent,
					title: '地图打印',
					area: ['650px', '300px'],
					btn: ['打印', '取消'],
					resize: false,
					btnAlign: 'c',
					yes: function(index) {
						var mapWindow = $('#desktop-main-map')[0].contentWindow, $printTable, printSetting;
						if(mapWindow) {
							$printTable = $("#table_print_setting");
							printSetting = {
								printTitle: $printTable.find("#printTitle").val(),
								printRemark: $printTable.find("#printRemark").val()
							};
							if(printSetting.printTitle) {
								$(mapWindow.document).find("#print_header").text(printSetting.printTitle);
							}
							if(printSetting.printRemark) {
								$(mapWindow.document).find("#print_remark").text(printSetting.printRemark);
							}
							layer.close(index);
							mapWindow.print();
						}
					}
				});

			},
            //切换dem图
            switch_dem: function () {
                /*$('#radio_map a').removeClass("hover");
                 $('#dem').addClass("hover");
                 if(!map)
                 map = $("#desktop-main-map")[0].contentWindow.map;
                 var layerInfo ={
                 selectedLayer:'70c310d8-894f-46d5-b2cf-7a612411ea01',
                 layers:['16e1588f-ddb2-42a6-87ea-c9918510706a','70c310d8-894f-46d5-b2cf-7a612411ea01','0d8c8b0a-64e0-4937-b9f9-953badc43dfb']
                 };
                 map._mapInterface.changeBaseLayer(layerInfo);*/
            }
        };

        var modal = {
            blow_up: $.proxy(MapToolBar.blow_up, MapToolBar),
            shrink: $.proxy(MapToolBar.shrink, MapToolBar),
            translate: $.proxy(MapToolBar.translate, MapToolBar),
            ranging: $.proxy(MapToolBar.ranging, MapToolBar),
            measuring_surface: $.proxy(MapToolBar.measuring_surface, MapToolBar),
            clear: $.proxy(MapToolBar.clear, MapToolBar),
            label: $.proxy(MapToolBar.label, MapToolBar),
            print: $.proxy(MapToolBar.print, MapToolBar)
        };

        MapToolBar.init();
        return modal;
    });