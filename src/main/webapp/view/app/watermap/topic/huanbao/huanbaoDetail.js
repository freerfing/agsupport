define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal","panalPop", "echarts3_8_4", "tabs", "WdatePicker"],
     function ($, app, composition, ko, common, http, panal,panalPop, echarts, tabs, wdatePicker) {
        var panalObj;

        var HuanbaoDetail = {
            init: function () {
                var that = this;
                composition.addBindingHandler("huanbaoHandler", {
                    init: function (dom) {
                        that.isMaxShow = false;
                        panalObj = panalPop.getPanalByElement(dom);
                        that.data= panalObj.param;
                        that.renderUI();
                        that.bindUI();
                        panalObj.settings.onMaxShow = function (e) {
                            that.initSize();
                        }
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                var that = this;
                common.showLoading($("#"+panalObj.uniqueID));
                that.loadTabs();
                that.initEvent();
                that.loadBaseInfo();
                that.getDataList();             
            },
            loadTabs: function () {
                var that = this;
                var data=that.data;
                var baseInfoHtml='<div class="river-info-container">'+
                    '<div class="huanbao-content">'+
                        '<div class="instructions">'+
                            '<div class="nameBox">'+
                                '<div class="river-name">'+data.hcmc+'</div>'+
                                '<div class="level-icon"><img src="view/app/common/huanbao/icon_'+data.szlb.replace("类", "")+'.png"/></div>'+
                            '</div>'+
                            '<div class="check-time">监测时间：<span class="check-time-value">'+data.jcny.replace("-",".")+'</span></div>'+
                            '<div class="area-name">行政区：<span class="area-name-value">'+data.ssxzq+'</span></div>'+
                            '<div class="poll_reource_level"><div class="lei1"></div><div class="lei2"></div><div class="lei3"></div><div class="lei4"></div><div class="lei5"></div><div class="lei6"></div></div>'+
                            '<div class="poll_reource_level_color"><div class="color1"></div><div class="color2"></div><div class="color3"></div><div class="color4"></div><div class="color5"></div><div class="color6"></div></div>'+
                            '<div class="data-source">数据来源：广州市环保局</div>'+
                            '<div class="type-intro">水质类别说明</div>'+
                        '</div>'+
                        '<div class="information">'+
                            '<div class="check-address"><span class="check-address-value">'+data.hcmc+'</span>监测点</div>'+
                            '<div class="check-item-info">'+
                                '<div class="check-item-type">'+
                                    '<div class="check-item-type-letter">DO</div>'+
                                    '<div class="check-item-type-name">溶解氧</div>'+
                                '</div>'+
                                '<div class="check-item-value">'+
                                    '<span class="do-check-item-value">'+that.changeColor(data.rjy,[7.5,6,5,3,2],"do")+'</span>'+
                                '</div>'+
                                '<div class="shuxian"></div>'+
                                '<div class="hengxian"></div>'+
                            '</div>'+
                            '<div class="check-item-info">'+
                                '<div class="check-item-type">'+
                                    '<div class="check-item-type-letter">CODcr</div>'+
                                    '<div class="check-item-type-name">化学需氧量</div>'+
                                '</div>'+
                                '<div class="check-item-value">'+
                                    '<span class="cod-check-item-value">'+that.changeColor(data.hxqyl,[15,15,20,30,40])+'</span>'+
                                '</div>'+
                                '<div class="hengxian"></div>'+
                            '</div>'+

                            '<div class="check-item-info">'+
                                '<div class="check-item-type">'+
                                    '<div class="check-item-type-letter">NH3-N</div>'+
                                    '<div class="check-item-type-name">氨氮</div>'+
                                '</div>'+
                                '<div class="check-item-value">'+
                                    '<span class="nh-check-item-value">'+that.changeColor(data.ad,[0.15,0.15,1,1.5,2])+'</span>'+
                                '</div>'+
                                '<div class="shuxian"></div>'+
                                '<div class="hengxian"></div>'+
                            '</div>'+

                            '<div class="check-item-info">'+
                                '<div class="check-item-type">'+
                                    '<div class="check-item-type-letter">TP</div>'+
                                    '<div class="check-item-type-name">总磷</div>'+
                                '</div>'+
                                '<div class="check-item-value">'+
                                    '<span class="tp-check-item-value">'+that.changeColor(data.zl,[.002,0.1,0.2,0.3,0.4])+'</span>'+
                                '</div>'+
                                '<div class="hengxian"></div>'+
                            '</div>'+
                            '<div class="check-item-info">'+
                                '<div class="check-item-type">'+
                                    '<div class="check-item-type-letter">Transparency</div>'+
                                    '<div class="check-item-type-name">透明度</div>'+
                                '</div>'+
                                '<div class="check-item-value">'+
                                    '<span class="tmd-check-item-value">'+data.tmd+"(m)"+'</span>'+
                                '</div>'+
                                '<div class="shuxian"></div>'+
                            '</div>'+

                            '<div class="check-item-info">'+
                                '<div class="check-item-type">'+
                                    '<div class="check-item-type-letter">WQI</div>'+
                                    '<div class="check-item-type-name">水质指数</div>'+
                                '</div>'+
                                '<div class="check-item-value">'+
                                    '<span class="szzs-check-item-value">'+data.szzs+'</span>'+
                                '</div>'+
                            '</div>'+
                            
                        '</div>'+
                    '</div>'+
                    '<div class="hint-box">'+
                        '<div class="hint-content">'+
                            '<div class="hint-title">水质类别说明</div>'+
                            '<img class="hintImg" src="view/app/common/huanbao/hint.png" />'+
                        '</div>'+
                        '<div class="hint-btn">关闭</div>'+
                    '</div>'+
                '</div>';

                var t = tabs.getInstance([
                {
                    id: "baseInfo",
                    title: "基本信息",
                    content:baseInfoHtml,
                    selected: true 
                },{
                    id: "DOTab",
                    title: "DO",
                    content: '<div class="detail_tab_container"><div class="hisChart" id="DO" data-title="DO溶解氧" data-arrname="rjy" style="width:590px;height:410px"></div></div>',
                    selected: false 
                },{
                    id: "CODTab",
                    title: "CODcr",
                    content: '<div class="detail_tab_container"><div class="hisChart" id="COD" data-title="CODcr化学需氧量" data-arrname="hxqyl"  style="width:590px;height:410px"></div></div>',
                    selected: false 
                },{
                    id: "NH3NTab",
                    title: "NH3-N",
                    content: '<div class="detail_tab_container"><div class="hisChart" id="NH3N" data-title="NH3-N氨氮" data-arrname="ad"  style="width:590px;height:410px"></div></div>',
                    selected: false 
                },{
                    id: "TPTab",
                    title: "TP",
                    content: '<div class="detail_tab_container"><div class="hisChart" id="TP" data-title="TP总磷"  data-arrname="zl"  style="width:590px;height:410px"></div></div>',
                    selected: false 
                },{
                    id: "TMDTab",
                    title: "透明度",
                    content: '<div class="detail_tab_container"><div class="hisChart" id="TMD" data-title="透明度"  data-arrname="tmd"  style="width:590px;height:410px"></div></div>',
                    selected: false 
                },{
                    id: "SZZSTab",
                    title: "水质指数",
                    content: '<div class="detail_tab_container"><div class="hisChart" id="SZZS" data-title="水质指数"  data-arrname="szzs"  style="width:590px;height:410px"></div></div>',
                    selected: false 
                }], {
                    replace: $("#huanbaoDetail"),
                    contentBorder: true,
                    onSelect: function (tabId, title) {
                    },
                    onClose: function (tabId, title) {
                    },
                    height: '100%',
                    width: '100%'
                });
            },
            getDataList:function(){
                var that = this;
                var h2 = http.getInstance("subject/getHuanbao6MonthHis", {type: "post"});
                h2.ajax({hcmc: that.data.hcmc,date:that.data.date}).then(function (result) {//水位过程线和表格
                    that.loadChart(result);  
                    common.hideLoading();
                });
            },
            pass:function(num){
                if(num==null||num==undefined||num==""){return 0;}
                num=num.replace(">","");
                num=num.replace("<","");
                num=num.replace("-","");
                return num;
            },
            loadChart:function(result){
                var that=this;
                that.date = [];
                var rjy = [], ad = [], hxqyl =[],zl=[],tmd=[],szzs=[];
                if (result) {
                    for (var i = result.length-1; i >=0; i--) {
                        var data = result[i];
                        rjy.push(that.pass(data.rjy));
                        ad.push(that.pass(data.ad));
                        hxqyl.push(that.pass(data.hxqyl));
                        zl.push(that.pass(data.zl));
                        tmd.push(that.pass(data.tmd));
                        szzs.push(that.pass(data.szzs));
                        that.date.push(data.jcny);
                    }
                }
              
                $(".hisChart").each(function(i){
                    var id = $(this).attr("id");
                    var arrName = $(this).data("arrname");
                    var title = $(this).data("title");
                    var data=eval("("+arrName+")");
                    var myChart = echarts.init(document.getElementById(id));
                    var option=that.getChartOption(title,data);

                    if(arrName=='tmd'){
                        option.yAxis.name='透明度(m)';
                    }
                    else if(arrName=='szzs'){
                        option.yAxis.name='水质指数'
                    }
                    myChart.setOption(option);
                });
                
               
            },
            getChartOption:function(_title,_data){
                var that=this;
                var option = {
                    title: {
                        text: _title + '近6个月趋势图',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    color:'#73ACE2',
                    legend: {
                        data:_title,
                        show:true
                    },
                    calculable: true,
                    grid: {
                        show:true,
                        right: 50,
                        left: 50,
                        backgroundColor:'#ECF6FB',
                        borderColor:'#F5FAFD'
                    },
                    xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            axisLine :{//坐标轴轴线相关设置。
                                show:true,
                                lineStyle:{
                                    color:'#CCD6EB'
                                },
                            },
                            axisLabel:{
                                 color:'#666666'
                            },
                            data: that.date
                    }],
                    yAxis: {
                        type: 'value',
                        name: '含量(mg/L)',
                        nameLocation:'middle',
                        nameGap:30,
                        axisLine :{//坐标轴轴线相关设置。
                            show:false
                        },
                        axisTick:{//刻度线
                            show:false
                        },
                        splitLine:{
                            lineStyle:{
                                color:['#F5FAFD']
                            }
                        },
                        splitArea:{
                            show:true,
                            areaStyle:{
                                color:['#F5FAFD','#FFFFFF']
                            }
                            
                        }
                    },
                    series:{
                        name: _title,
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize:10,
                        lineStyle:{
                            normal:{
                                color:'#73ACE2'
                            }
                        },    
                        itemStyle:{
                            normal:{
                                color:'#73ACE2'
                            }
                        },                      
                        data: _data
                    }
                };
                return option; 
            },
            changeColor:function(va,arr,type){
                var res = "";
                if(type == "do"){
                    if(va >=arr[0]){
                    res = "<font color='#16c7f6'>"+va+" (mg/L)</font>";
                    }
                    else if(va>=arr[1] && va <= arr[0]) {
                        res = "<font color='#14abf0'>"+va+" (mg/L)</font>";
                    }
                    else if(va>=arr[2] && va <= arr[1]) {
                        res = "<font color='#5dd324'>"+va+" (mg/L)</font>";
                    }
                    else if(va>=arr[3] && va <= arr[2]) {
                        res = "<font color='#27b451'>"+va+" (mg/L)</font>";
                    }
                    else if(va>=arr[4] && va <= arr[3]) {
                        res = "<font color='#ffc206'>"+va+" (mg/L)</font>";
                    }else if(va <= arr[4]) {
                        res = "<font color='#fe5408'>"+va+" (mg/L)</font>";
                    }
                }else{
                    if(va <= arr[0]){
                    res = "<font color='#16c7f6'>"+va+" (mg/L)</font>";
                    }
                    else if(va>=arr[0] && va <= arr[1]) {
                        res = "<font color='#14abf0'>"+va+" (mg/L)</font>";
                    }
                    else if(va>=arr[1] && va <= arr[2]) {
                        res = "<font color='#5dd324'>"+va+" (mg/L)</font>";
                    }
                    else if(va>=arr[2] && va <= arr[3]) {
                        res = "<font color='#27b451'>"+va+" (mg/L)</font>";
                    }
                    else if(va>=arr[3] && va <= arr[4]) {
                        res = "<font color='#ffc206'>"+va+" (mg/L)</font>";
                    }else if(va >= arr[4]) {
                        res = "<font color='#fe5408'>"+va+" (mg/L)</font>";
                    }
                }
                
                return res;
            },
            loadBaseInfo:function(){
                var that = this;
                var data=that.data;
                $(".level-icon img").attr("src", "view/app/common/huanbao/icon_" + data.szlb.replace("类", "") + ".png").show();
                $(".poll_reource_level div").removeClass("poll_reource_leve_selected");
                switch(data.szlb){
                    case "Ⅰ类":
                        $(".poll_reource_level .lei1").addClass("poll_reource_leve_selected");
                        break;
                    case "Ⅱ类":
                        $(".poll_reource_level .lei2").addClass("poll_reource_leve_selected");
                        break;
                    case "Ⅲ类":
                        $(".poll_reource_level .lei3").addClass("poll_reource_leve_selected");
                        break;
                    case "Ⅳ类":
                        $(".poll_reource_level .lei4").addClass("poll_reource_leve_selected");
                        break;
                    case "Ⅴ类":
                        $(".poll_reource_level .lei5").addClass("poll_reource_leve_selected");
                        break;
                    case "劣Ⅴ类":
                        $(".poll_reource_level .lei6").addClass("poll_reource_leve_selected");
                        break;
                }
                
                // $(".check-time-value").html(data.jcny.replace("-","."));                
                // $(".check-address-value").html(data.hcmc);
                // $(".river-name").html(data.hcmc);
                // $(".area-name-value").html(data.ssxzq);
                // $(".do-check-item-value").html(that.changeColor(data.rjy,[7.5,6,5,3,2]),"do");
                // $(".cod-check-item-value").html(that.changeColor(data.hxqyl,[15,15,20,30,40]));
                // $(".nh-check-item-value").html(that.changeColor(data.ad,[0.15,0.15,1,1.5,2]));
                // $(".tp-check-item-value").html(that.changeColor(data.zl,[.002,0.1,0.2,0.3,0.4]));
                // $(".tmd-check-item-value").html(data.tmd+"(m)");
                // $(".szzs-check-item-value").html(data.szzs);
                
            },
            initEvent:function(){
                var that = this;
                $('.type-intro').click(that.openTypeInfoClick);
                $('.hint-btn').click(that.closeTypeInfoClick);
            },
            closeTypeInfoClick:function(){
                $('.hint-box').fadeOut(500);
            },
            openTypeInfoClick:function(){
                $('.hint-box').fadeIn(500);
            }
        }

        var modal = {};

        HuanbaoDetail.init();
        return modal;
    });
