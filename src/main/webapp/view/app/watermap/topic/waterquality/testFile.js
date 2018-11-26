/**
 * Created by hzp on 2017-07-20.
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","highcharts","tabs", "echarts"],
    function ($, app, composition, ko, common, http, panal,highcharts,tabs, echarts) {
        var myChart = null;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("homeInitHandler1", {
                    init: function (dom) {
                        var panalObj = panal.getPanalByElement(dom);
                        that.renderUI();
                        that.bindUI();
                        that.loadData(panalObj.param);
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                var that = this;
                that.loadTabs();
            },
            loadTabs: function () {
                var t = tabs.getInstance([{
                    id: "omInfo",
                    title: "详情",
                    content: "<div id='detail' style='height: 100%;width: 100%'></div>",
                    selected: true
                }], {
                    replace: $("#reserviorList1"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '100%',
                    width: '100%'
                });
            },
            
        loadData: function(rowData) {
            /*    	for(k in rowData) {
               		if(k == "riverName" || k == "district") {
               			$("#"+k+"_blacksmellywater").text(rowData[k]);
               		} else {
               			$("#" + k).html(rowData[k]);            			
               		}
               	}*/
               	var div1 = '<div style="margin-top:15px; width:95%; text-align: left;">';
               	var div2 = '</div>';
               	var content =  	'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">名称：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.jcdmc+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">区域：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.xzq+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
               				'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">水质状态：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.szzt+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">透明度(cm)：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.tmd+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">溶解氧(mg/L)：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.rjy+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">氧化还原电位(mV)：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.yhhydw+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">氨氮(mg/L)：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.andan+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">PH值：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.ph+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">高锰酸盐指数：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.gmsyzs+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">化学需解氧（COD）：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.hxxjy+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">五日生化需氧量（BOD5）：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.wrshxyl+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">总磷：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.zl+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">总氮：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.zd+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">铜：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.t+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   					    		'<div class="basic-info-cell">'+
   						    		'<div class="basic-info-cell-header">锌：</div>'+
   						    		'<div class="basic-info-cell-content">'+rowData.xin+'</div>'+
   					    		'</div>'+
   					    		'<div class="basic-info-cell">'+
   						    		'<div class="basic-info-cell-header">氧化物：</div>'+
   						    		'<div class="basic-info-cell-content">'+rowData.yhw+'</div>'+
   					    		'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   					    		'<div class="basic-info-cell">'+
   						    		'<div class="basic-info-cell-header">粪大肠菌群（个/L）：</div>'+
   						    		'<div class="basic-info-cell-content">'+rowData.fdcjq+'</div>'+
   					    		'</div>'+
   					    		'<div class="basic-info-cell">'+
   						    		'<div class="basic-info-cell-header"></div>'+
   						    		'<div class="basic-info-cell-content"></div>'+
   					    		'</div>'+
   				    		'</div>';
               	$("#detail").append(div1+content+div2);
               }
           };
        var modal = {};
        /*function activeLastPointToolip(chart) {
            var points = chart.series[0].points;
            chart.tooltip.refresh(points[points.length - 1]);
        }*/

        List.init();
        return modal;
    });