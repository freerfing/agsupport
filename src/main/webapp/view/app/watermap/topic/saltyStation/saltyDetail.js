/**
 * Created by hzp on 2017-07-20.
 */
define(
		[ "jquery", "durandal/app", "durandal/composition", "knockout",
				"common", "http", "panal", "highcharts", "tabs", "echarts" ],
		function($, app, composition, ko, common, http, panal, highcharts,
				tabs, echarts) {
			var myChart = null;
			var List = {
				init : function() {
					var that = this;
					composition.addBindingHandler("homeInitHandler1", {
						init : function(dom) {
							var panalObj = panal.getPanalByElement(dom);
							that.renderUI();
							that.bindUI();
							that.loadData(panalObj.param);
						},
						update : function() {
						}
					});
				},
				renderUI : function() {
				},
				bindUI : function() {
					var that = this;
					that.loadTabs();
				},
				loadTabs : function() {
					var t = tabs
							.getInstance(
									[ {
										id : "omInfo",
										title : "详情",
										content : "<div id='detail' style='height: 100%;width: 100%'></div>",
										selected : true
									} ], {
										replace : $("#reserviorList1"),
										contentBorder : true,
										onSelect : function(tabId, title) {
										},
										onClose : function(tabId, title) {
										},
										height : '100%',
										width : '100%'
									});
				},

				loadData : function(rowData) {
					var div1 = '<div style="margin-top:15px; width:95%; text-align: left;">';
					var div2 = '</div>';
					var content = '<div class="basic-info-row">'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">站点名称：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.zm
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">行政区域：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.xzq
							+ '</div>'
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-row">'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">氯化物 [mg/L]：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.chloride
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">水温 [℃]：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.temperature
							+ '</div>'
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-row">'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">电导率 [mS/cm]：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.conductivity
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">盐度 [ppt]：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.salinity
							+ '</div>'
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-row">'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">溶解氧 [mg/L]：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.DO
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">水位 [m]：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.sw
							+ '</div>'
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-row">'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">PH值 [l]：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.PH
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">浊度 [NTU]：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.turbidity
							+ '</div>'
							+ '</div>'
							+ '</div>'
							+ '<div class="basic-info-row">'
							+ '<div class="basic-info-cell">'
							+ '<div class="basic-info-cell-header">所在地 ：</div>'
							+ '<div class="basic-info-cell-content">'
							+ rowData.address + '</div>' + '</div>' + '</div>';
					$("#detail").append(div1 + content + div2);
				}
			};
			var modal = {};

			List.init();
			return modal;
		});