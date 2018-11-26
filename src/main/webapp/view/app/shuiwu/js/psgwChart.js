function initCharts() {
    getPipeData();
}

function getPipeData() {
    $.ajax({
        url: "/awater/pipe/xzqlxtj",
        cache: false,
        success: function (data) {
            setZCD(data);//设置总长度
            initGWZCD(data);//管网总长度统计图
            initZLTJ(data);//按总量统计图
            initMDTJ(data);//按密度统计图
            initXZQTJ(data);//按行政区统计图
            window.onresize = resetCharts;
        },
        error: function () {

        }
    });
}

function setZCD(data) {
    var result = 0;
    for (var i = 0; i < data.length; i++) {
        result = result + data[i].length;
    }
    var arr = (result / 1000).toFixed(2).split("");
    var text = "广州市管网总长度";
    for (var j = 0; j < arr.length; j++) {
        text = text + "<span class='zongshu'>" + arr[j] + "</span>";
    }
    text = text + "km";
    $("#zcd").append(text);
}

function getGWZCDData(data) {
    var dataObj = {};
    for (var i = 0; i < data.length; i++) {
        var sort = data[i].sort;
        if (dataObj[sort]) {
            var value = dataObj[sort] + data[i].length;
            dataObj[sort] = value;
        } else {
            dataObj[sort] = data[i].length;
        }
    }
    return dataObj;
}

function getZLTJData(data) {
    var dataObj = {};
    for (var i = 0; i < data.length; i++) {
        var district = data[i].district;
        if (dataObj[district]) {
            var value = dataObj[district] + data[i].length;
            dataObj[district] = value;
        } else {
            dataObj[district] = data[i].length;
        }
    }
    return dataObj;
}

var gwzcdChart, zltjChart, mdtjChart, xzqtjChart;
var gwzcdOption, zltjOption, mdtjOption, xzqtjOption;

function resetCharts() {
    gwzcdChart.dispose();
    zltjChart.dispose();
    mdtjChart.dispose();
    xzqtjChart.dispose();
    initGWZCDChart();
    initZLTJChart();
    initMDTJChart();
    initXZQTJChart();
}

function initGWZCD(datas) {
    var data = getGWZCDData(datas);
    var legendData = [];
    var chartData = [];
    for (var key in data) {
        legendData.push(key);
        chartData.push({value: (data[key] / 1000).toFixed(2), name: key});
    }
    // var chartData=[{value: 2656.182, name: '雨水管网'},
    // 	  {value: 3012.518,name: '雨污合流管网'},
    //     	  {value: 4201.541, name: '污水管网'}
    //          ];
    // var legendData=['雨水管网','污水管网','雨污合流管网'];
    gwzcdOption = {
        color: colors,
        legend: {
            show: true,
            data: legendData,
            top: 30,
            type: 'scroll',
            orient: 'horizontal',
            textStyle: {
                color: "#FFFFFF"
            }
        },
        series: [
            bg1, bg2,
            {
                type: "pie",
                label: {
                    normal: {
                        position: 'outside',
                        textStyle: {
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: "bold"
                        },
                        formatter: '{b}({c}km)\n\n{d}%'
                    },
                    emphasis: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            color: '#FF0000',
                            fontWeight: "bold"
                        }
                    }
                },
                radius: ['35%', '55%'],
                data: chartData
            }
        ]
    }
    initGWZCDChart();
}

function initGWZCDChart() {
    gwzcdChart = echarts.init(document.getElementById('gwzcd'), "vintage");
    gwzcdChart.setOption(gwzcdOption, true);
}


function initZLTJ(datas) {
    var data = getZLTJData(datas);
    var legendData = [];
    var chartData = [];
    for (var key in data) {
        legendData.push(key);
        chartData.push({value: (data[key] / 1000).toFixed(2), name: key});
    }
    // var chartData=[
    //     {value: 335,name:'天河区'},
    //     {value: 310,name: '海珠区'},
    //     {value: 234,name: '越秀区'},
    //     {value: 335,name: '番禺区'},
    //     {value: 310,name: '白云区'},
    //     {value: 234,name: '黄埔区'}
    // ];
    // var legendData=['天河区','海珠区','越秀区','番禺区','白云区','黄埔区'];
    zltjOption = {
        color: colors,
        legend: {
            show: true,
            data: legendData,
            //top: 30,
            type: 'scroll',
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
                        position: 'outside',
                        textStyle: {
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: "bold"
                        },
                        formatter: '{b}({c}km)\n{d}%'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: '#FF0000',
                            fontWeight: "bold"
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 10,
                        length2: 5
                    }
                },
                radius: ['35%', '55%'],
                data: chartData
            }
        ]
    }
    initZLTJChart();
}

function initZLTJChart() {
    zltjChart = echarts.init(document.getElementById('zltj'), "vintage");
    zltjChart.setOption(zltjOption, true);
}

var area = {
    "黄埔区": 481094554.761887 / 1000000,
    "海珠区": 91927806.1126215 / 1000000,
    "天河区": 136711565.918994 / 1000000,
    "越秀区": 33457615.4492041 / 1000000,
    "南沙区": 748719924.902413 / 1000000,
    "白云区": 658418712.682781 / 1000000,
    "荔湾区": 61944023.2129046 / 1000000,
    "花都区": 968695062.097024 / 1000000,
    "增城区": 1612626632.85755 / 1000000,
    "从化区": 1979235550.03699 / 1000000,
    "番禺区": 512662332.347154 / 1000000
};

function initMDTJ(datas) {
    var data = getZLTJData(datas);
    var chartData = [];
    var legendData = [];
    for (var key in data) {
        if (key != "市外") {
            legendData.push(key.replace("区", ""));
            chartData.push((data[key] / 1000 / area[key]).toFixed(2));
        }
    }
    mdtjOption = {
        color: colors,
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
                margin: 15,
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
            name: "km/km2",
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
    initMDTJChart();
}

function initMDTJChart() {
    mdtjChart = echarts.init(document.getElementById('mdtj'), "vintage");
    mdtjChart.setOption(mdtjOption, true);
}

function getXZQTJData(name, sorts, datas) {
    var tempData = [];
    var data = [];
    for (var j = 0; j < sorts.length; j++) {
        var sort = sorts[j];
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].district == name && datas[i].sort == sort) {
                data.push((datas[i].length / 1000).toFixed(2));
                break;
            }
        }
    }
    var obj = {
        name: name,
        type: "bar",
        data: data,
        barMinHeight: 5,
        label: getBarLabelStyle(),
        itemStyle: {
            normal: {
                shadowColor: shadowColor,
                shadowBlur: shadowBlur,
                barBorderRadius: [5, 5, 0, 0]
            }
        }
    }
    return obj;
}

function initXZQTJ(datas) {
    var districtData = getZLTJData(datas);
    var sortData = getGWZCDData(datas);
    var legendData = [], xCatalog = [];
    for (var sort in sortData) {
        xCatalog.push(sort);
    }
    for (var district in districtData) {
        legendData.push(district);
    }
    var seriesArr = [];
    for (var i = 0; i < legendData.length; i++) {
        seriesArr.push(getXZQTJData(legendData[i], xCatalog, datas));
    }
    // var legendData=['天河区','海珠区','越秀区','番禺区','白云区','黄埔区'];
    // var xCatalog=['雨水','污水','雨污合流'];
    xzqtjOption = {
        color: colors,
        legend: {
            show: true,
            data: legendData,
            //top: 30,
            type: 'scroll',
            orient: 'horizontal',
            textStyle: {
                color: "#FFFFFF"
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: xCatalog,
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
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
            name: "千米",
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
        series: seriesArr
        //     [
        //     {   name:"天河区",
        //         type:"bar",
        //         data: [789.95,179,26,622.91,24.37,504.59],
        //         label:getBarLabelStyle(),
        //         itemStyle: {
        //             normal: {
        //                 shadowColor: shadowColor,
        //                 shadowBlur: shadowBlur,
        //                 barBorderRadius: [5, 5, 0, 0]
        //             }
        //         }
        //     },
        //     {   name:"海珠区",
        //         type:"bar",
        //         data: [504.59,32.26,470.32,6.30,716.95,6.30],
        //         label:getBarLabelStyle(),
        //         itemStyle: {
        //             normal: {
        //                 shadowColor: shadowColor,
        //                 shadowBlur: shadowBlur,
        //                 barBorderRadius: [5, 5, 0, 0]
        //             }
        //         }
        //     },
        //     {   name:"越秀区",
        //         type:"bar",
        //         data: [609.89,248.13,1171.82,1044.53,523.44,482.81],
        //         label:getBarLabelStyle(),
        //         itemStyle: {
        //             normal: {
        //                 shadowColor: shadowColor,
        //                 shadowBlur: shadowBlur,
        //                 barBorderRadius: [5, 5, 0, 0]
        //             }
        //         }
        //     },
        //     {   name:"番禺区",
        //         type:"bar",
        //         data: [362.69,59.68,403.29,8.78,439.99,35.10],
        //         label:getBarLabelStyle(),
        //         itemStyle: {
        //             normal: {
        //                 shadowColor: shadowColor,
        //                 shadowBlur: shadowBlur,
        //                 barBorderRadius: [5, 5, 0, 0]
        //             }
        //         }
        //     },
        //     {   name:"白云区",
        //         type:"bar",
        //         data: [262.35,21.43,189,01,5.65,382.16],
        //         label:getBarLabelStyle(),
        //         itemStyle: {
        //             normal: {
        //                 shadowColor: shadowColor,
        //                 shadowBlur: shadowBlur,
        //                 barBorderRadius: [5, 5, 0, 0]
        //             }
        //         }
        //     },
        //     {   name:"黄埔区",
        //         type:"bar",
        //         data: [281.29,81.49,246.24,141.59,135.29,141.59],
        //         label:getBarLabelStyle(),
        //         itemStyle: {
        //             normal: {
        //                 shadowColor: shadowColor,
        //                 shadowBlur: shadowBlur,
        //                 barBorderRadius: [5, 5, 0, 0]
        //             }
        //         }
        //     }
        // ]
    }
    initXZQTJChart();
}

function initXZQTJChart() {
    xzqtjChart = echarts.init(document.getElementById('xzqtj'), "vintage");
    xzqtjChart.setOption(xzqtjOption, true);
}