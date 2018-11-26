function initYLDChart(datas){
    var chartData=[17,2,20,2,24,7];
    var legendData=['白云区','海珠区','黄埔区','荔湾区','天河区','越秀区'];
    var yldOptions={
        color:colors,
        tooltip : {
            trigger: 'item',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data:legendData ,
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                    color: 'white',
                    fontStyle: 'bold',
                    fontFamily: '微软雅黑',
                    fontSize:14
                }
            }
        },
        yAxis: {
            min: 0,
            name:"个数",
            nameTextStyle:{
                color:"#FFFFFF"
            },
            axisLabel: {
                textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            splitLine:getSplitLineStyle()
        },
        series:[
            {   name:"易涝点个数统计",
                type:"bar",
                data: chartData,
                barMinHeight:5,
                label:getBarLabelStyle(),
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
    var chart= echarts.init(document.getElementById('yldChart'), "vintage");
    chart.setOption(yldOptions,true);
}