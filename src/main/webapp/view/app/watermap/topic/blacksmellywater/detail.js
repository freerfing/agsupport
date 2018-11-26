define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "echarts3_8_4", "tabs", "WdatePicker"],
    function ($, app, composition, ko, common, http, panal,panalPop,echarts, tabs, wdatePicker) {
        var panalObj;
        var Detail = {
            init: function () {
                var that = this;
                composition.addBindingHandler("blacksmellywaterDetailHandler", {
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
                that.fieldDataArr=[{
                    dataType:"clarity",
                    dataName:"透明度",
                    dataUnit:"cm",
                    cellsformat: "f2",
                    dataShow:false,
                    width:"10%"},{
                    dataType:"dox",
                    dataName:"溶解氧",
                    dataUnit:"mg/L",
                    cellsformat: "f2",
                    dataShow:true,
                    width:"10%"},{
                    dataType:"z",
                    dataName:"水位",
                    dataUnit:"m",
                    cellsformat: "f2",
                    dataShow:false,
                    width:"10%",
                    yAxisIndex:1},{
                    dataType:"nh3n",
                    dataName:"氨氮",
                    dataUnit:"mg/L",
                    cellsformat: "f2",
                    dataShow:false,
                    width:"10%"},{
                    dataType:"envt",
                    dataName:"环境温度",
                    dataUnit:"℃",
                    cellsformat: "f1",
                    dataShow:false,
                    width:"10%"},{
                    dataType:"humid",
                    dataName:"湿度",
                    cellsformat: "f1",
                    dataUnit:"%",
                    dataShow:false,
                    width:"10%"},{
                    dataType:"redox",
                    dataName:"氧化还原电位",
                    cellsformat: "f2",
                    dataUnit:"mv",
                    dataShow:false,
                    width:"15%"}]
                that.loadTabs();
                that.loadData();
                that.getData();
                $("#from_date").click(function () {
                    wdatePicker({
                        onpicked: function (dp) {
                            that.clickSearchBtn();                        },
                        dateFmt: 'yyyy-MM-dd HH:mm:ss',
                        maxDate: "#F{$dp.$D('to_date')}"
                    });
                });
                $("#to_date").click(function () {
                    wdatePicker({
                        onpicked: function (dp) {
                            that.clickSearchBtn();
                        },
                        dateFmt: 'yyyy-MM-dd HH:mm:ss',
                        minDate: "#F{$dp.$D('from_date')}"
                    });
                });
            },
            loadTabs: function () {
                var that = this;
                // var tm_s = new Date();
                // tm_s.setTime(tm_s.getTime() - 24 * 60 * 60 * 1000);
                // var tm_e = new Date();
                // $("#from_date").val(that.formatDate(tm_s, 'yyyy-MM-dd hh:mm:ss'));
                // $("#to_date").val(that.formatDate(tm_e, 'yyyy-MM-dd hh:mm:ss'));

                var tm_e = that.data.date;//2018-01-16 14:22:26
                var tm_s = common.getPastDate(tm_e,3);//差三天

                $("#from_date").val(tm_s);
                $("#to_date").val(tm_e);
                var t = tabs.getInstance([{
                    id: "omInfo",
                    title: "水质详情",
                    content: '<div id="detail" class="detail_tab_container"></div>',
                    selected: true
                }, {
                    id: "hisInfo",
                    title: "过程线",
                    content: '<div class="detail_tab_container"><div id="hisChart" style="width:600px;height:410px;"></div></div>',
                    selected: false
                },{
                    id: "tableInfo",
                    title: "数据列表",
                    content:'<div class="detail_tab_container"><div id="historyList"></div></div>',
                     selected: false
                }], {
                    replace: $("#blacksmellywaterDetail"),
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
                var div1 = '<div style="margin-top:15px; width:100%; text-align: left;">';
                var div2 = '</div>';
                var content = '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">名称：</div>' +
                    '<div class="basic-info-cell-content">' + rowData.stnm + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">透明度(m)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.clarIty==null?'':rowData.clarIty) + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">氧化还原电位(mv)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.redox==null?'':rowData.redox.toFixed(2)) + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">环境温度(℃)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.envt==null?'':rowData.envt.toFixed(1)) + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">湿度(%)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.humid==null?'':rowData.humid.toFixed(1)) + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">水流量(l/s)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.q2==null?'':rowData.q2.toFixed(2))+ '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">化学需氧量(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.codcr==null?'':rowData.codcr.toFixed(2))+ '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">总氮(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.tn==null?'':rowData.tn.toFixed(3)) + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">氨氮(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.nh3n==null?'':rowData.nh3n.toFixed(2)) + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">总磷(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.tp==null?'':rowData.tp.toFixed(3)) + '</div>' +
                    '</div>' +
                    '</div>'+
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">溶解氧：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.dox==null?'':rowData.dox.toFixed(3)) + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">采集时间：</div>' +
                    '<div class="basic-info-cell-content">' +  (rowData.spt==null?'':rowData.spt) + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">水质级别：</div>' +
                    '<div class="basic-info-cell-content"></div>' +//' + that.waterQualityFormatter(rowData.waterQuality) + '
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">黑臭级别：</div>' +
                    '<div class="basic-info-cell-content">' + that.blackSmellyFormatter(rowData.blackSmelly) + '</div>' +
                    '</div>' +
                    '</div>';
                    $("#detail").append(div1 + content + div2);
            },
            blackSmellyFormatter:function (value) {
                var blackSmelly="无监测值";
                if (value ==3) {
                    blackSmelly="严重黑臭";
                } else if (value ==2) {
                    blackSmelly="轻度黑臭";
                }  else if (value == 1) {
                    blackSmelly="不臭不黑";
                }  
                return blackSmelly;
            },
            waterQualityFormatter:function (value) {                 
                var waterQuality="";
                if (value ==6) {
                    waterQuality="劣Ⅴ类";
                } else if (value ==5) {
                    waterQuality="Ⅴ类";
                } else if (value ==4) {
                    waterQuality="Ⅳ类";
                } else if (value ==3){
                    waterQuality="Ⅲ类";
                } else if (value ==2){
                    waterQuality="Ⅱ类";
                }  else if (value ==1){
                    waterQuality="Ⅰ类";
                }
                return waterQuality;
            },
            getData: function () {
                var that = this;
                var stcd=that.data.stcd;
                
                var fromDate = $('#from_date').val();
                var toDate = $('#to_date').val();
                var h = http.getInstance("subject/queryAllItemHis", {type: "post"});
                h.ajax({stcd: stcd,fromDate: fromDate,toDate: toDate}).then(function (result) {
                    that.loadHisChart(result);
                    that.loadHistoryList(result);
                    common.hideLoading();
                })
            },
            loadHisChart: function (result) {
                var that=this,
                name,legendSelectedData, 
                date = [], legendData=[],              
                seriesArr=[],
                legendData=[],                 
                clarityData=[],
                nh3nData=[],
                doxData=[],//溶解氧
                codcrData=[],//化学需氧量COD
                zData=[],//化学需氧量
                envtData=[],//环境温度
                humidData=[],//湿度
                phData=[]//PH
                redoxData=[]//氧化还原电位
                ;     
                if (result) {
                   
                    for (var i = 0; i < result.length; i++) {
                        var data = result[i];
                        if(data.clarity){
                            clarityData.push(data.clarity);
                        }
                        if(data.codcr){
                            codcrData.push(data.codcr);
                        }
                        if(data.dox){
                            doxData.push(data.dox);
                        }
                        if(data.z){
                            zData.push(data.z);//氨氮
                        }
                        if(data.envt){
                            envtData.push(data.envt);//环境温度
                        }
                        if(data.humid){
                            humidData.push(data.humid);//湿度
                        }
                        if(data.ph){
                            phData.push(data.ph);//PH
                        }
                        if(data.nh3n){
                            nh3nData.push(data.nh3n);
                        }
                        if(data.redoxhData){
                            redoxData.push(data.redox);
                        }

                        date.push(data.spt.replace(' ', '\n'));//时间                        
                    }
                }
                legendSelectedData="{";               
                for (var i = 0; i < that.fieldDataArr.length; i++){ 
                    var field=that.fieldDataArr[i];   
                    var title= field.dataName;
                    if(field.dataUnit){
                       title+='('+field.dataUnit+')';
                    }             
                    var seriesItem ={
                        showSymbol:false,
                        symbol: 'emptyCircle',
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            
                            data: [
                                { type: 'average', symbolSize:[0,0],name: '平均值' }

                            ]
                        },
                        name: field.dataName+'('+field.dataUnit+')',
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
                        text: '水质过程线',
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
                    grid: {x: 50,y: 50,width:400},
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
                        {   splitNumber: 4,
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
                    if(target=='水位(m)'){
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
                    columnGroups=[];//列名与单位
                    for (var i = 0; i < that.fieldDataArr.length; i++){ 
                    var field=that.fieldDataArr[i];            
                    var columnItem ={
                        id: field.dataType,                       
                        datafield: field.dataType,
                        align: "center",
                        cellsalign: "center",
                        cellsformat:field.cellsformat,
                        width:field.width
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
                    // width: 565,
                    // height: 405,
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
                var that = this;
                common.showLoading($("#"+panalObj.uniqueID));
                that.getData();
            }
        };
        var modal = {};

        Detail.init();
        return modal;
    });