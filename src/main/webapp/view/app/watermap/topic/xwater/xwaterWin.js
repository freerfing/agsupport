define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "echarts3_8_4", "tabs", "WdatePicker", "layer"],
	function ($, app, composition, ko, common, http, panal,panalPop, echarts, tabs, wdatePicker, layer) {
		var panalObj;
		var List = {
			init: function () {
				var that = this;
				composition.addBindingHandler("xwaterWinInitHandler", {
					init: function (dom) {
						panalObj = panalPop.getPanalByElement(dom);
						that.data=panalObj.param;
						that.renderUI();
						that.bindUI();

					},
					update: function () {
					}
				});
			},
			renderUI: function () {
			},
			bindUI: function () {
				var that = this;
				that.title="实时";
				var dateFmt = 'yyyy-MM-dd HH:mm:ss';
				$(".win-date-input").css({width: 145});
				var tm_e = that.data.date;//2018-01-16 14:22:26
				var tm_s = that.data.sdate;

				$("#from_date").val(tm_s);
				$("#to_date").val(tm_e);

				$("#from_date").click(function () {
					wdatePicker({
						onpicked: function (dp) {
							that.clickSearchBtn();
						},
						dateFmt: dateFmt,
						maxDate: "#F{$dp.$D('to_date')}"
					});
				});
				$("#to_date").click(function () {
					wdatePicker({
						onpicked: function (dp) {
							that.clickSearchBtn();
						},
						dateFmt: dateFmt,
						minDate: "#F{$dp.$D('from_date')}"
					});
				});

				that.loadTabs();
				that.loadData();
				//that.getData();
			},
			loadTabs: function () {
				var that = this;

				var t = tabs.getInstance([{
					id: "xwaterInfo",
					title: "排水管网水质监测详情",
					content: '<div id="xwater_detail" class="detail_tab_container"></div>',
					selected: true
				}], {
					replace: $("#xwaterWinId"),
					contentBorder: true,
					onSelect: function (tabId, title) {
					},
					onClose: function (tabId, title) {
					},
					height: '100%',
					width: '100%'
				});
			},

			loadData: function () {
				var that=this;
				var rowData=that.data;

				var content = String()
					+ '<div style="margin-top:15px; width:100%; text-align: left;">'
                        + that.constructBasicInfoRow(['时间类型：'], ['<b>实时</b>'])
                        + that.constructBasicInfoRow(['站名：', '测站ID：'], [rowData.nickname, rowData.id])
                        + that.constructBasicInfoRow(['PH：', '余氯（mg/L）：'], [rowData.ph, rowData.yl])
                        + that.constructBasicInfoRow(['浊度（NTU）：', '压力（Mpa）：'], [rowData.ntu, rowData.p])
                        + that.constructBasicInfoRow(['温度（℃）：', '采集时间：'], [rowData.t, rowData.tm])
					+ '</div>';

				$("#xwater_detail").append(content);
			},
			getData: function () {
				var that = this;
				var stcd=that.data.stcd;

				var fromDate = $('#from_date').val();
				var toDate = $('#to_date').val();

				var url="subject/queryAllItemHis";
				if(that.data.timeType=='day'){
					url="subject/queryAllItemHisDay";
				}
				var h = http.getInstance(url, {type: "post"});
				h.ajax({stcd: stcd,fromDate: fromDate,toDate: toDate}).then(function (result) {
					that.loadHisChart(result);
					that.loadHistoryList(result);
					common.hideLoading();
				})
			},
			loadHisChart: function (result) {
				var that = this;
				var date = [],
					legendData=[],
					legendSelectedData="{",
					seriesArr=[],
					ssData=[],//悬浮物
					codcrData=[],//化学需氧量COD
					q2Data=[],//水流量
					nh3nData=[],//氨氮
					phData=[],//PH
					tnData=[],//总氮
					tpData=[]//总磷
				;
				if (result) {
					for (var i = 0; i < result.length; i++) {
						var data = result[i];
						if(data.ss){
							ssData.push(data.ss);//悬浮物
						}
						if(data.codcr){
							codcrData.push(data.codcr);//化学需氧量
						}
						if(data.q2){
							q2Data.push(data.q2);//水流量
						}
						if(data.tp){
							tpData.push(data.tp);//总磷
						}
						if(data.tn){
							tnData.push(data.tn);//总氮
						}
						if(data.ph){
							phData.push(data.ph);//PH
						}
						if(data.nh3n){
							nh3nData.push(data.nh3n);
						}
						date.push(data.spt.replace(' ', '\n'));//时间
					}
				}

				for (var i = 0; i < that.fieldDataArr.length; i++){
					var field=that.fieldDataArr[i];
					var title= field.dataName;
					if(field.dataUnit){
						title+='('+field.dataUnit+')';
					}
					var seriesItem ={
						showSymbol:false,symbol: 'emptyCircle',
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
						markLine: {
							data: [
								{ type: 'average', name: '平均值' }
							],
							label:{position:'middle'}
						},
						name: title,
						type: 'line',
						data: eval(field.dataType+"Data")
					}
					if(field.yAxisIndex){
						seriesItem.yAxisIndex=field.yAxisIndex;
					}
					legendData.push(title);
					legendSelectedData+= '"'+title+'":'+ field.dataShow+','
					seriesArr.push(seriesItem);
				}
				legendSelectedData=legendSelectedData.substring(0,legendSelectedData.length-1) +"}";
				var option = {
					showAllSymbol: true,
					title: {
						text: '水质水量'+that.title+'过程线',
						left: 'center'
					},
					// toolbox: {
					//     show: true,
					//     feature:{
					//         dataZoom:{ show: true},
					//         mark:{ show: false },
					//         dataView: { show: false, readOnly: false },
					//         magicType:{show:true,type:['line', 'bar']},
					//         restore: { show: true },
					//         saveAsImage: { show: true }
					//     }
					// },
					tooltip: {
						trigger: 'axis'
					},
					color: ['#ff7f50', '#87cefa', '#da70d6','#32cd32', '#6495ed','#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500','#40e0d0', '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700','#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'],
					calculable: true,
					grid: {
						x: 50,y: 50,width:400
					},
					legend: {
						orient:'vertical',
						right:5,
						itemGap:20,
						top:60,
						itemWidth:10,
						itemHeight:15,
						selected:JSON.parse(legendSelectedData),
						data: legendData
					},
					xAxis: [
						{
							type: 'category',
							position: 'bottom',
							boundaryGap: false,
							data: date
						}
					],
					yAxis: [
						{
							// precision: 4,
							splitNumber: 4,
							type: 'value',
							axisLabel: { formatter: '{value}'},
							name: '监测值'//(' + unit + ')
						},{
							show:false,
							name:'水流量',
							splitNumber: 4,
							type: 'value',
							axisLabel: { formatter: '{value}'},
						}
					],
					dataZoom: [{
						type: 'inside',
						start: 10,
						end: 100,
					}, {
						show: true,
						showDetail:false,
						start: 10,
						end: 100
					}],
					series: seriesArr
				};
				var myChart = echarts.init(document.getElementById('hisChart'));
				myChart.setOption(option);
				myChart.on("legendselectchanged",function(params){
					var _option=this._api.getOption();
					var target = params.name;  // 获取当前被点击的标签
					if(target=='水流量(l/s)'){
						if(params.selected[target]){
							_option.yAxis[1].name=target;
							_option.yAxis[1].show=true;
						}else{
							_option.yAxis[1].name='';
							_option.yAxis[1].show=false;
						}
					}
					myChart.setOption(_option);
				});

			},
			loadHistoryList: function (data) {
				var that=this,
					columns = [{
						id: "spt",
						text: "检测时间",
						datafield: "spt",
						align: "center",
						cellsalign: "center",
						width:"25%"
					}],
					datadatafields = [{
						name: "spt",
						type: 'string'
					}],
					columnGroups=[];
				for (var i = 0; i < that.fieldDataArr.length; i++){
					var field=that.fieldDataArr[i];
					var columnItem ={
						id: field.dataType,
						datafield: field.dataType,
						align: "center",
						cellsalign: "center",
						cellsformat:field.cellsformat,
						width:"11%"
					}
					if(field.dataUnit!=""){//如果有单位,列名是单位，属于 类别组
						columnItem.columngroup=field.dataName;
						columnItem.text=field.dataUnit;
						var columnGroupItem={
							text: field.dataName,
							name: field.dataName,
							align: 'center'
						}
						columnGroups.push(columnGroupItem);
					}else{
						columnItem.text=field.dataName;
					}
					columns.push(columnItem);
					datadatafields.push({
						name: field.dataType,
						type: 'string'
					});
				}

				var gridDataSource = {
					localdata: data,
					datadatafields: datadatafields,
					datatype: "array"
				};
				var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
				$("#historyList").jqxGrid({
					width: "99%",
					height:"100%",
					source: dataAdapter,
					rowsheight: 25,
					altrows: true,
					groupsheaderheight: 25,
					columnsheight: 25,
					selectionmode: 'singlecell',
					columns: columns,
					columngroups:columnGroups
				});
			},
			clickSearchBtn: function () {
				layer.msg('该功能正在完善中...');
				return;
				var that = this;
				common.showLoading($("#"+panalObj.uniqueID));
				that.getData();
			},
			sttpFormatter:function (value) {
				var sttp="污水处理厂";//fq
				if (value =='RQ') {
					sttp="黑臭水体测站";
				}
				return sttp;
			},
			constructBasicInfoRow: function(labels, htmlVals) {
				var result = '<div class="basic-info-row">', i;
				for(i=0; i<labels.length; i++) {
					result += String()
						+ '<div class="basic-info-cell">'
						+ '<div class="basic-info-cell-header">' + labels[i] + '</div>'
						+ '<div class="basic-info-cell-content">' + htmlVals[i] + '</div>'
						+ '</div>';
				}
				if(labels.length == 1) {
					result += String()
						+ '<div class="basic-info-cell">'
						+ '<div class="basic-info-cell-header"></div>'
						+ '<div class="basic-info-cell-content"></div>'
						+ '</div>';
				}
				result += '</div>';
				return result;
			}
		};
		var modal = {};

		List.init();
		return modal;
	});