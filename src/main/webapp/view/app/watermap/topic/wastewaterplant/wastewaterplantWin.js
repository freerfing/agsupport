define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "echarts3_8_4", "tabs", "WdatePicker"],
    function ($, app, composition, ko, common, http, panal,panalPop, echarts, tabs, wdatePicker) {
        var panalObj;
        var List = {
            init: function () {
                var that = this;
                composition.addBindingHandler("wastewaterplantWinInitHandler", {
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
                    dataType:"ss",
                    dataName:"悬浮物",
                    dataUnit:"mg/L",
                    cellsformat: "f2",
                    dataShow:false},{
                    dataType:"codcr",
                    dataName:"CODcr",
                    dataUnit:"mg/L",
                    cellsformat: "f3",
                    dataShow:true},{
                    dataType:"nh3n",
                    dataName:"氨氮",
                    dataUnit:"mg/L",
                    cellsformat: "f2",
                    dataShow:false},{
                    dataType:"q2",
                    dataName:"水流量",
                    dataUnit:"l/s",
                    cellsformat: "f2",
                    dataShow:false,
                    yAxisIndex:1},{
                    dataType:"tn",
                    dataName:"总氮",
                    dataUnit:"mg/L",
                    cellsformat: "f3",
                    dataShow:false},{
                    dataType:"tp",
                    dataName:"总磷",
                    dataUnit:"mg/L",
                    cellsformat: "f3",
                    dataShow:false},{
                    dataType:"ph",
                    dataName:"PH",
                    dataUnit:"",
                    cellsformat: "f2",
                    dataShow:false}]
                    
                that.title="实时";
                var dateFmt = 'yyyy-MM-dd HH:mm:ss';
                var past = 7;
                var width = 145;
                if(that.data.timeType == "day"){
                    that.title ="日均";
                    dateFmt = 'yyyy-MM-dd';
                    past = 30;
                    width = 85;
                }
                
                $(".win-date-input").css({width:width});
                var tm_e = that.data.date;//2018-01-16 14:22:26
                var tm_s = common.getPastDate(tm_e,past,dateFmt.replace('HH','hh'));

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
                that.getData();
            },
            loadTabs: function () {
                var that = this;
               
                var t = tabs.getInstance([{
                    id: "omInfo",
                    title: "水质详情",
                    content: '<div id="detail" class="detail_tab_container"></div>',
                    selected: true
                }, {
                    id: "hisInfo",
                    title: that.title+"过程线",
                    content: '<div class="detail_tab_container"><div id="hisChart" style="width:600px;height:410px;"></div></div>',
                    selected: false
                },{
                    id: "tableInfo",
                    title: that.title+"数据列表",
                    content:'<div class="detail_tab_container"><div id="historyList"></div></div>',
                     selected: false
                }], {
                    replace: $("#wastewaterplantWinId"),
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
                    '<div class="basic-info-cell-header">时间类型：</div>' +
                    '<div class="basic-info-cell-content"><b>' + that.title + '</b></div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header"></div>' +
                    '<div class="basic-info-cell-content"></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">站名：</div>' +
                    '<div class="basic-info-cell-content">' + rowData.stnm + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">测站类型：</div>' +
                    '<div class="basic-info-cell-content">' + that.sttpFormatter(rowData.sttp) + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">站号：</div>' +
                    '<div class="basic-info-cell-content">' + rowData.stcd + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">环境温度(℃)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.envt==null?'':rowData.envt.toFixed(1))  + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">湿度(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.humid==null?'':rowData.humid.toFixed(1)) + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">水流量(l/s)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.q2==null?'':rowData.q2.toFixed(2)) +  '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">化学需氧量CODcr(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.codcr==null?'':rowData.codcr.toFixed(2)) + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">总氮(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.tn==null?'':rowData.tn.toFixed(3)) + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">总磷(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.tp==null?'':rowData.tp.toFixed(3)) + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">氨氮(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.nh3n==null?'':rowData.nh3n.toFixed(3)) + '</div>' +
                    '</div>' +
                    '</div>'+
                    '<div class="basic-info-row">' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">溶解氧(mg/L)：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.dox==null?'':rowData.dox.toFixed(3)) + '</div>' +
                    '</div>' +
                    '<div class="basic-info-cell">' +
                    '<div class="basic-info-cell-header">采集时间：</div>' +
                    '<div class="basic-info-cell-content">' + (rowData.spt==null?'':rowData.spt) + '</div>' +
                    '</div>' +
                    '</div>' ;
                $("#detail").append(div1 + content + div2);
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
            }
        };
        var modal = {};

        List.init();
        return modal;
    });