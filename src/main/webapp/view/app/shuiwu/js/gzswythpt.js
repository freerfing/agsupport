$(function () {
    getWeather();//抓取天气预报的数据
    initRsvr();//初始化水情。
    initWbsver();//初始化河涌水质(环保局)
    initWqSinf();//初始进水口和出水口
    initHomePageCharts();//初始化统计图
})
var rsvrPage = "";
var rsvrList = "";//水情的当前页
var wqSinfPage = "";
var cskOrjsk = "";
var jskList = "";
var cskList = "";
var dataList = "";//出水口和进水口的数据
function getWeather() {
    //抓取天气预报信息
    $.ajax({
        url: "/awater/subject/getWeather",
        type: "post",
        dataType: "json",
        success: function (datas) {
            var content = datas.content;
            $("#tqyb").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + content);
        },
        error: function () {
            //layer.msg('获取天气预报失败...', { time: 1000 });
        }
    });
}

function initRsvr() {
    $.ajax({
        url: "/awater/subject/getStRsvrList",
        type: "post",
        data: {'sttp': 'RR'},
        dataType: "json",
        success: function (datas) {
            rsvrList = datas.list;
            rsvrPage = 1;
            $("#rsvrCount").html(rsvrList.length + "个");
            $("#rsvrCounts").html(rsvrList.length + "个");
            appendData(rsvrList, rsvrPage, 'rsvrTab');
        },
        error: function () {
            //layer.msg('获取列表失败...', { time: 1000 });
        }
    });
}

function initWqSinf() {
    $.ajax({
        url: "/awater/subject/findStFactoryList",
        type: "post",
        data: {"sttp": "FQ"},//用来区分出水口
        dataType: "json",
        success: function (datas) {
            wqSinfPage = 1;//默认刚进来是第一页;
            cskOrjsk = "csk";
            jskList = datas.jskList;
            cskList = datas.cskList;
            appendWqSinf(cskList, wqSinfPage, 'wqSinf');
        },
        error: function () {
            //layer.msg('获取列表失败...', { time: 1000 });
        }
    });
}

function appendWqSinf(data, page, table) {
    $("#" + table + " tr:not(:first)").remove();
    for (var i = (page - 1) * 4; i < data.length && i < page * 4; i++) {
        tr = "<tr> <td>" + data[i].stnm + "</td><td>" + data[i].addvcd + "</td><td>" + data[i].sptDate + "</td><td>" + data[i].nh3n + "</td>" +
            "<td>" + data[i].tp + "</td> <td>" + data[i].tn + "</td><td>" + data[i].ph + "</td> " +
            "<td>" + data[i].ss + "</td><td>" + data[i].q2 + "</td><td>" + data[i].codcr + "</td> </tr>";
        $("#" + table).append(tr);
    }
}

//加载分页的数据
function appendData(data, page, table) {
    $("#" + table + " tr:not(:first)").remove();
    $("#" + table).append("<tr><td>姓名</td><td>当前水位(m)</td><td>汛限/警戒值</td></tr>");
    for (var i = (page - 1) * 4; i < data.length && i < page * 4; i++) {
        var warn = ""
        var stnm = data[i].stnm;
        var rz = data[i].rz;
        var fsltdz = data[i].fsltdz;
        tr = "<tr><td>" + stnm + "</td><td>" + rz + "(m)</td><td  class='nub-red'>" + fsltdz + "</td></tr>";
        $("#" + table).append(tr);
    }
}

function paGing(type, About) {
    //水库的分页
    if (type == 'rsvrTab') {
        if (About == 'shang') {
            if (rsvrPage == 1) {
                return;
            } else {
                rsvrPage = rsvrPage - 1;
                appendData(rsvrList, rsvrPage, type);
            }
        } else {
            if (rsvrPage >= rsvrList.length / 4) {
                return;
            } else {
                rsvrPage = rsvrPage + 1;
                appendData(rsvrList, rsvrPage, type);
            }
        }
        //出水口和进水口的分页
    } else if (type == 'wqSinf') {
        if (About == 'shang') {
            if (cskOrjsk == 'csk') {
                if (wqSinfPage == 1) {
                    return;
                } else {
                    wqSinfPage = wqSinfPage - 1;
                    appendWqSinf(cskList, wqSinfPage, type);
                }
            } else {
                if (wqSinfPage == 1) {
                    return;
                } else {
                    wqSinfPage = wqSinfPage - 1;
                    appendWqSinf(jskList, wqSinfPage, type);
                }
            }

        } else {
            if (cskOrjsk == 'csk') {
                if (wqSinfPage > cskList.length / 4) {
                    return;
                } else {
                    wqSinfPage = wqSinfPage + 1;
                    appendWqSinf(cskList, wqSinfPage, type);
                }
            } else {
                if (wqSinfPage > jskList.length / 4) {
                    return;
                } else {
                    wqSinfPage = wqSinfPage + 1;
                    appendWqSinf(jskList, wqSinfPage, type);
                }
            }
        }
        //河道的分页
    }
}

function getSZTemplate() {
    var template = '<span>${hcmc} <span class="dengji">${sz}</span></span><table cellpadding="0" cellspacing="0"><tr><td>检测时间：${jcsj}</td><td>行政区：${xzq}</td></tr><tr><td>DO：<span class="nub-green">${doValue}(mg/L)</span></td><td>COD：<span class="nub-yellow">${codValue}(mg/L)</span></td></tr><tr><td>NH3-N：<span class="nub-red">${nh3Value}(mg/L)</span></td><td>TP：<span class="nub-red">${tpValue}(mg/L)</span></td></tr></table>';
    return template;
}

function initWbsver() {

    $.ajax({
        url: "/awater/subject/getHechongList",
        type: "post",
        dataType: "json",
        success: function (datas) {
            var list = datas.list;
            var span = "";
            var tr = "";
            var sz = "";
            for (var i = 0; i < list.length; i++) {
                var hcmc=list[i].hcmc;
                var jcsj=list[i].jcny;
                var xzq=list[i].ssxzq.replace("区","");
                var doValue=list[i].rjy;
                var codValue=list[i].hxqyl;
                var nh3Value=list[i].ad;
                var tpValue=list[i].zl;
                var sz=list[i].szlb.replace("类","");
                var result=getSZTemplate().replace("${hcmc}",hcmc).replace("${jcsj}",jcsj).replace("${xzq}",xzq).replace("${doValue}",doValue)
                    .replace("${codValue}",codValue).replace("${nh3Value}",nh3Value).replace("${tpValue}",tpValue).replace("${sz}",sz);
                // tr = list[i].szlb;
                // sz = tr.substring(0, tr.length - 1);//把水质类别的 “类” 字去掉
                // span = span + "<span class='nub-yellow'>" +  + "</span>" +
                //     "<br />检测时间：" + list[i].jcny + "<br />行政区：" + list[i].ssxzq + "<br />" +
                //     "DO：<span class='nub-green'>" + list[i].rjy + "(mg/L)</span><br />COD：<span class='nub-green'>" + list[i].hxqyl + "(mg/L)</span><br />" +
                //     "NH3-N：<span class='nub-red'>" + list[i].ad + "(mg/L)</span><br />TP：<span class='nub-red'>" + list[i].zl + "(mg/L)</span><br />" +
                //     "水质类别：<span class='dengji'>" + sz + "</span><br /><br />"
                $("#hysz").append(result);
            }
        },
        error: function () {
            //layer.msg('获取列表失败...', { time: 1000 });
        }
    });
}

function switchFun(type) {
    wqSinfPage = 1;
    if (type == 'jsk') {
        $("#csk").removeClass();
        $("#jsk").attr("class", "active");
        dataList = jskList;
        cskOrjsk = "jsk";
    } else {
        $("#jsk").removeClass();
        $("#csk").attr("class", "active");
        dataList = cskList;
        cskOrjsk = "csk";
    }
    wqSinfPage = 1;//默认刚进来是第一页;
    appendWqSinf(dataList, wqSinfPage, 'wqSinf');
}

function moreRsvr() {
    layer.open({
        type: 2,
        content: ["/awater/view/app/resourceContainer/variousStations/rsvrList.html", 'no'],
        title: "水库水位",
        area: ['70%', '85%'],
        btn: []
    });
}

function moreStFactory() {
    debugger;
    layer.open({
        type: 2,
        content: ["/awater/view/app/resourceContainer/variousStations/stfactoryList.html", 'no'],
        title: "河涌水质监测",
        area: ['70%', '85%'],
        btn: []
    });
}
