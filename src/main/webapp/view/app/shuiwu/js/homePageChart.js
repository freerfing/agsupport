function initHomePageCharts() {
    initTSFLTJ();//初始化投诉分类统计图
    getSZHCChartData();//初始化黑臭河涌图
    getPSSSChartData();//初始排水设施统计图
}

function getSZLevelObj(chartData,name){
    for(var key in chartData){
        if(chartData[key].name==name) return chartData[key];
    }
}

function szLegendFormatter(name){
    for(var key in szChartData){
        if(szChartData[key].name==name)
            return name+"("+szChartData[key].value+"条)";
    }
    // return name;
}

function initTSFLTJ(){
    var chartData = [
        {value:35,name:"工业废水排放"},
        {value:15,name:"养殖污染"},
        {value:20,name:"违法建设"},
        {value:8,name:"建筑废弃物"},
        {value:16,name:"工程维护"},
        {value:17,name:"排水设施"},
        {value:20,name:"农家乐"},
        {value:9,name:"堆场码头"},
        {value:19,name:"生活垃圾"},
        {value:9,name:"其他"},
        {value:34,name:"舆情"}
        ];
    var legendData = ["工业废水排放","养殖污染","违法建设","建筑废弃物","工程维护",
        "排水设施","农家乐","堆场码头","生活垃圾","其他","舆情"];

    var tsfltjOption = {
        color: colors,
        title:{
            text:"投诉分类统计",
            textStyle:{
                color:"#FFFFFF"
            },
            top:"15%",
            left:'center'

        },
        tooltip: {
            trigger: 'item',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: legendData,
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                margin: 0,
                formatter: xAxisFormatter,
                color: 'white',
                fontStyle: 'bold',
                fontFamily: '微软雅黑',
                fontSize: 14
            }
        },
        yAxis: {
            min: 0,
            name: "个数",
            nameTextStyle: {
                color: "#FFFFFF"
            },
            axisLabel: {
                textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            splitLine: getSplitLineStyle()
        },
        series: [
            {
                name: "按密度统计",
                type: "bar",
                data: chartData,
                barMinHeight: 5,
                label: getBarLabelStyle(),
                itemStyle: {
                    normal: {
                        color: itemStyleRender,
                        shadowColor: shadowColor,
                        shadowBlur: shadowBlur,
                        barBorderRadius: [5, 5, 0, 0]
                    }
                }
            }
        ]
    }
    var chart = echarts.init(document.getElementById('tousufltj'), "vintage");
    chart.setOption(tsfltjOption, true);
}

var szLevel={0:'不黑不臭',1:'轻度黑臭',2:'严重黑臭'};
var szChartData;
function initSZHCChart(data) {
    // var chartData = [
    //     {value: 37, name: '轻度黑臭'},
    //     {value: 1, name: '严重黑臭'},
    //     {value: 6, name: '不黑不臭'}
    // ];
    // var legendData = ['轻度黑臭', '严重黑臭', '不黑不臭'];
    szChartData = [],legendData=[];
    var list=data.content.list;
    for(var key in szLevel){
        var sz=szLevel[key];
        legendData.push(sz);
        szChartData.push({value:0,name:sz});
    }
    for(var i=0;i<list.length;i++){
        var level=data.content.list[i].blackSmelly;
        var levelName=szLevel[level];
        var obj=getSZLevelObj(szChartData,levelName);
        obj.value=obj.value+1;
    }

    var szhcOption = {
        color: colors,
        legend: {
            show: true,
            data: legendData,
            top:0,
            left:0,
            formatter:szLegendFormatter,
            // type: 'scroll',
            orient: 'horizontal',
            textStyle: {
                color: "#FFFFFF"
            }
        },
        series: [
            bg1, bg2,
            {
                type: "pie",
                minAngle: 15,
                label: {
                    normal: {
                        show: false,
                        position: 'inside',
                        textStyle: {
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: "bold"
                        },
                        formatter: '{b}({c}条)'
                    },
                    emphasis: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            color: '#FF0000',
                            fontWeight: "bold"
                        }
                    }
                },
                radius: ['35%', '55%'],
                data: szChartData
            }
        ]
    }
    var chart = echarts.init(document.getElementById('szhc'), "vintage");
    chart.setOption(szhcOption, true);
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getSZHCChartData(){
    var today=new Date();
    $.ajax({
        url:'/awater/subject/getBlackSmellyWaterList',
        type:"POST",
        data:"curPage=1&perPageCount=9999&date="+today.format("yyyy-MM-dd hh:mm:ss")+"&xzq=&blackLevel=0,1,2",
        dataType:"json",
        cache:false,
        success:function(data){
            initSZHCChart(data);
        },
        error:function(){

        }
    });
}

function getPSSSChartData() {
    $.ajax({
        url: "/awater/pipe/xzqlxtj",
        cache: false,
        success: function (data) {
            initPSSSChart(data);
        },
        error: function () {

        }
    });
}

function initPSSSChart(datas) {
    var districtData = getZLTJData(datas);
    var sortData = getGWZCDData(datas);
    var legendData = [], xCatalog = [];
    for (var district in districtData) {
        xCatalog.push(district);
    }
    for (var sort  in sortData) {
        legendData.push(sort);
    }
    var seriesArr = [];
    for (var i = 0; i < legendData.length; i++) {
        seriesArr.push(getPSSSData(legendData[i], xCatalog, datas));
    }

    var psssOptions = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            show: true,
            data: legendData,
            type: 'scroll',
            orient: 'horizontal',
            textStyle: {
                color: "#FFFFFF"
            }
        },
        xAxis: {
            type: 'category',
            data: xCatalog,
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                formatter:xAxisFormatter,
                textStyle: {
                    color: 'white',
                    fontStyle: 'bold',
                    fontFamily: '微软雅黑',
                    fontSize: 14
                }
            }
        },
        yAxis: {
            min: 0,
            name: "km",
            nameTextStyle: {
                color: "#FFFFFF"
            },
            axisLabel: {
                textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            splitLine: getSplitLineStyle()
        },
        series:seriesArr
    }
    var chart = echarts.init(document.getElementById('paishuiss'), "vintage");
    chart.setOption(psssOptions, true);
}

function xAxisFormatter(value, index){
    var arr=value.split("");
    var result="";
    for(var i=0;i<arr.length;i++){
        result=result+"\n"+arr[i];
    }
    result=result.replace("区","").replace("\n","");
    return result;
}

function getPSSSData(sort, districts, datas) {
    var tempData = [];
    var data = [];
    for (var j = 0; j < districts.length; j++) {
        var district = districts[j];
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].district == district && datas[i].sort == sort) {
                data.push((datas[i].length / 1000).toFixed(2));
                break;
            }
        }
    }
    var obj = {
        name: sort,
        type: "bar",
        data: data,
        stack:"总量",
        barMinHeight: 10,
        label: getBarLabelStyle2(),
        itemStyle: {
            normal: {
                shadowColor: shadowColor,
                shadowBlur: shadowBlur
            }
        }
    }
    return obj;
}

function getBarLabelStyle2() {
    return {
        show:false,
        normal: {
            color: "#FF0000",
            position: 'inside'
        }
    };
}