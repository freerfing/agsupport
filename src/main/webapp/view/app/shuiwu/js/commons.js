var colors = getColors();

function topNavigateTo(str){
    top.navigateTo(str);
}

function getColors() {
    var color1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,0,0,1)'
    }, {
        offset: 1,
        color: 'rgba(255,0,170,1)'
    }]);
    var color2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(0,255,0,1)'
    }, {
        offset: 1,
        color: 'rgba(0,255,170,1)'
    }]);
    var color3 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(0,0,255,1)'
    }, {
        offset: 1,
        color: 'rgba(0,170,255,1)'
    }]);
    var color4 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(0,255,255,1)'
    }, {
        offset: 1,
        color: 'rgba(170,255,255,1)'
    }]);
    var color5 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,0,255,1)'
    }, {
        offset: 1,
        color: 'rgba(255,170,255,1)'
    }]);
    var color6 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,255,0,1)'
    }, {
        offset: 1,
        color: 'rgba(255,255,170,1)'
    }]);
    var color7=new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(200,180,160,1)'
    }, {
        offset: 1,
        color: 'rgba(255,255,180,1)'
    }]);
    // var color7 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //     offset: 0,
    //     color: 'rgba(86,126,122,1)'
    // }, {
    //     offset: 1,
    //     color: 'rgba(43,63,61,1)'
    // }]);
    var color8 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,128,0,1)'
    }, {
        offset: 1,
        color: 'rgba(255,64,64,1)'
    }]);

    var color9 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(160,32,240,1)'
    }, {
        offset: 1,
        color: 'rgba(80,16,120,1)'
    }]);
    var color10 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(66,180,80,1)'
    }, {
        offset: 1,
        color: 'rgba(33,90,44,1)'
    }]);
    var color11 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(122,2,74,1)'
    }, {
        offset: 1,
        color: 'rgba(61,1,37,1)'
    }]);
    var color12 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(64,98,180,1)'
    }, {
        offset: 1,
        color: 'rgba(32,49,90,1)'
    }]);
    var colors = [color1, color2, color3, color4, color5, color6, color7, color8, color9, color10, color11, color12];
    return colors;
}

function getBarLabelStyle() {
    return {
        normal: {
            color: "#FFFFFF",
            show: true,
            position: 'top'
        }
    };
}

function itemStyleRender(params) {
    var colorList = colors;
    return colorList[params.dataIndex];
}

function getSplitLineStyle() {
    return {
        lineStyle: {
            color: 'gray',
            opacity: 0.3
        }
    }
}


var bg1 = {
    type: 'pie',
    radius: ['35%', '55%'],
    silent: true,
    data: [
        {
            value: 1,
            itemStyle: {
                normal: {
                	labelLine: {
                		show : false
                	},
                    color: '#050f58',
                    borderColor: '#162abb',
                    borderWidth: 2,
                    shadowBlur: 50,
                    shadowColor: 'rgba(21,41,185,0.75)'
                }
            }
        }]
};
var bg2 = {
    type: 'pie',
    radius: ['35%', '55%'],
    silent: true,
    label: {
        normal: {
            show: false,
        }
    },
    data: [{
        value: 1,
        itemStyle: {
            normal: {
            	labelLine: {
            		show : false
            	},
                color: '#050f58',
                shadowBlur: 50,
                borderColor: '#162abb',
                borderWidth: 1,
                shadowColor: 'rgba(21,41,185,0.75)'
            }
        }
    }]
};

var shadowColor = 'rgba(21,41,185,0.75)';
var shadowBlur = 25;

function getLastHour(num){
    var date=new Date();
    var hour=date.getHours();
    var fullYear=date.getFullYear();
    var month=date.getMonth();
    var d=date.getDate();
    date.setFullYear(fullYear);
    date.setMonth(month);
    date.setDate(d);
    date.setHours(hour+num);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}

Date.prototype.Format = function (fmt) { //author: meizz
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