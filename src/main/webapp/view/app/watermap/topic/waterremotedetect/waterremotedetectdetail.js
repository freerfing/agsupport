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
   				    				'<div class="basic-info-cell-header">站名：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.zm+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">区号：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.qh+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
               				'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">站号：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.zh+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">监测指标：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.jczb+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">CODE12：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.code12+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">核实：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.hs+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">安装地址：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.azdz+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">所属系统：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.ssxt+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
   				  				'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">经度：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.x+'</div>'+
   				    			'</div>'+
   				    			'<div class="basic-info-cell">'+
   				    				'<div class="basic-info-cell-header">纬度：</div>'+
   				    				'<div class="basic-info-cell-content">'+rowData.y+'</div>'+
   				    			'</div>'+
   				    		'</div>'+
   				    		'<div class="basic-info-row">'+
				  				'<div class="basic-info-cell">'+
				    				'<div class="basic-info-cell-header">说明：</div>'+
				    				'<div class="basic-info-cell-content">'+rowData.sm+'</div>'+
				    			'</div>'+
				    		'</div>'
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