    var sksw = echarts.init(document.getElementById('sksw'), 'dark');
    var skswOption = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            text: "水库水位",
            subtext: "总共:{value|123} 超汛限:{value|3}",
            subtextStyle:{
                fontSize:15,
                rich:{
                    value:{
                        color:'red',
                        lineHeight: 10,
                        fontWeight:'bold'
                    }
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['金坑', '联安', '深港水库', '白灰田水库', '大井水库'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '水位',
                type: 'bar',
                barWidth: '40%',
                data: [68, 52, 200, 334, 390]
            }
        ]
    };
    sksw.setOption(skswOption);

    var jhsw = echarts.init(document.getElementById('jhsw'), 'dark');
    var jhswOption = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            text: "江河水位",
            subtext: "总共:{value|60} 超汛限:{value|3}",
            subtextStyle:{
                fontSize:15,
                rich:{
                    value:{
                        color:'red',
                        lineHeight: 10,
                        fontWeight:'bold'
                    }
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['广本二厂', '湾吓', '深港水库', '珠村', '二寿桥'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '水位',
                type: 'bar',
                barWidth: '40%',
                data: [68, 52, 200, 334, 390]
            }
        ]
    };
    jhsw.setOption(jhswOption);

    var jsjcOption = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            text: "城区积水监测",
            subtext: "总共:{value|123} 超汛限:{value|3}",
            subtextStyle:{
                fontSize:15,
                rich:{
                    value:{
                        color:'red',
                        lineHeight: 10,
                        fontWeight:'bold'
                    }
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: ['积水', '上次最高水位', '历史最高水位', '警戒值'],
        },
        xAxis: [
            {
                type: 'category',
                data: ['荔湾区\n中山七路和安社区周边', '荔湾区\n恒海中街-如意坊新街-景华新街', '越秀区\n东华新永胜市场、大方巷'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '积水',
                type: 'bar',
                barWidth: '15%',
                data: [68, 52, 200]
            }, {
                name: '上次最高水位',
                type: 'bar',
                barWidth: '15%',
                data: [120, 33, 123]
            }, {
                name: '历史最高水位',
                type: 'bar',
                barWidth: '15%',
                data: [120, 33, 123]
            }, {
                name: '警戒值',
                type: 'bar',
                barWidth: '15%',
                data: [66, 66, 64]
            }
        ]
    };

    var jsjc = echarts.init(document.getElementById('jsjc'), 'dark');
    jsjc.setOption(jsjcOption);


    

    setInterval(function () {
        jhsw.setOption({
            series: [{
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100]
            }]
        });
        sksw.setOption({
            series: [{
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100]
            }]
        });
        jsjc.setOption({
            series: [{
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
            }, {
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
            }, {
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
            }, {
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100]
            }]
        })
    }, 3000);

