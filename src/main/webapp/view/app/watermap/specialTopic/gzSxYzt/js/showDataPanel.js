var statistic35 = true;//判断是否显示35条臭河涌的统计数据
var pieClickObj;

function changeStatisticShow() {
    var selVal = $("input[name='radiobutton']:checked").val();
    if (selVal == "35") {
        statistic35 = true;
    }
    else {
        statistic35 = false;
    }

    if (pieClickObj != null) {
        if (statistic35 == true) {
            initChartAndTable(CZCData35);
        }
        else {
            initChartAndTable(CZCData152);
        }
    }
}

function allBtnClick() {
    selectKey = '';
    document.getElementById("rightInfoWindow").style.display = "none";//隐藏统计面板
}

function selectedKeyChange(key, flag) {
    selectKey = key;
   // if (flag == true) {
     //   initSelectField();
       // refreshChart();
    //}
    //else {
      //  document.getElementById("rightInfoWindow").style.display = "none";//隐藏统计面板
    //}
}

function initSelectField() {
    var selectFieldDom = document.getElementById('select_statisticField');
    selectFieldDom.innerHTML = "";
    var innerHtml = "";
    for (var field in layerConfiguration.dissertation[selectKey].statisticsFields) {
        innerHtml += "<option value='" + field + "'>" + layerConfiguration.dissertation[selectKey].statisticsFields[field] + "</option>";
    }
    selectFieldDom.innerHTML = innerHtml;
}

function refreshChart() {
    var selectFieldDom = document.getElementById('select_statisticField');
    var statField = selectFieldDom.value;
    var statDisplayField = layerConfiguration.dissertation[selectKey].statisticsFields[statField];
    var isCZC = false;
    if (selectKey == 'chengzhongcun') isCZC = true;
    queryLayer(layerConfiguration.dissertation[selectKey].url, statField, layerConfiguration.dissertation[selectKey].name, statDisplayField, statDisplayField, isCZC);
}

function showDataDetails(field, value, tableName) {

    var dataDetails = '';
    var query = new esri.tasks.Query();
    query.outFields = layerConfiguration.dissertation[selectKey].outFields;
    query.text = field + "='" + value + "'";
    if (value != '其他') {
        query.where = "1 = 1 and " + field + "='" + value + "'";
    }
    else {
        query.where = field + " is null or " + field + " = '' or " +field + " = ' '";
    }
    query.geometry = null;
    query.returnGeometry = true;
    var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[selectKey].url, { outFields: layerConfiguration.dissertation[selectKey].outFields, id: selectKey });
    tempLayer.queryFeatures(query, function (featureSet) {
        var features = featureSet.features;
        var div = '';
        if (features.length > 0) {
            div = initSearchResultContent(features, selectKey);
        }
        $('#div_Pietable').html("");
        $("#div_Pietable").append(div);
        var selectFieldDom = document.getElementById('select_statisticField');
        var statField = selectFieldDom.value;
        var statDisplayField = layerConfiguration.dissertation[selectKey].statisticsFields[statField];
        $('#div_PietableName').html(statDisplayField + "为" + value + ":");
    }
    );
}

function initSearchResultContent(features, selectedKey) {
    var div = $('<div class="infoTitle" style="width:100%;height:100%" id = "infoTitle'+selectedKey+'"><div>');
    var ul = $('<ul class="infoTitle-t clear"></ul>');
    for (var i = 0; i < features.length; i++) {
        var graphic = features[i];
        graphic.key = selectedKey;
        var isNull = false;
        for (var key in graphic.attributes) {
            //过滤掉为空值的数据
            if (key == layerConfiguration.dissertation[selectedKey].titleField) {
                name = graphic.attributes[key].replace(/(^\s*)|(\s*$)/g, "");
                if (name != null && name != "" && name != '') {
                    isNull = true;
                }
                else {
                    isNull = false;
                }
                break;
            }
        }
        if (isNull == true) {
            var a = $("<a href='#' style='margin-top:10px;'>详情</a>");
            var name, owner;

            a.click(
            (
             function (graphic) {
                 return function () {
                     locateFeature(graphic)
                 }
             })(graphic)
             );

            //如果名称过长，做裁剪处理，避免界面打乱的情况
            var isTooLong = false;
            var nameSub = name;
            if (name.length > 15) {
                nameSub = name.substring(0, 14) + "...";
                isTooLong = true;
            }
            var li;
            if (isTooLong == true) {
                li = $("<li><h3><abbr title = '" + name + "'>" + nameSub + "</abbr></h3></li>");
            }
            else {
                li = $("<li><h3>" + nameSub + "</h3></li>");
            }
            li.append(a);
            li.graphic = graphic;
            ul.append(li);
        }
    }
    div.append(ul);
    return div;
}

function queryLayer(statLayerUrl, field, chartName, description, tableTitle, isCZCData) {
    require(
    [
        "esri/layers/FeatureLayer",
        "esri/plugins/FeatureLayerStatistics",
        "esri/tasks/query",
        "esri/tasks/StatisticDefinition",
        "dojo/domReady!"
    ], function (FeatureLayer, FeatureLayerStatistics, Query, StatisticDefinition) {

        document.getElementById("rightInfoWindow").style.height = "60%";
        document.getElementById("rightInfoWindow").style.display = "block";
        document.getElementById("divBottomTable").style.display = "block";
        document.getElementById("divBottomChart").style.display = "none";
        var featureLayer = new FeatureLayer(statLayerUrl);
        var featureLayerStats = new FeatureLayerStatistics({ layer: featureLayer });
        featureLayerStats.getUniqueValues({ field: field }).then(function (result) {
            //result.uniqueValueInfos[i].value是唯一值，result.uniqueValueInfos[i].count是该唯一值的总数
            var uniqueValues = new Array();
            var data = new Array();
            var pieStatisticTable = "<table class='customTable' cellspacing='0' style='color:black;font-size:8;width:100%;cursor:pointer'><td>" + tableTitle + "</td><td>总数</td>"; //跟饼图相关的统计表
            var sum = 0;
            //拼写参数作为图表
            for (var i = 0; i < result.uniqueValueInfos.length; i++) {
                var tempValue = result.uniqueValueInfos[i].value;
                var uniqueValue = tempValue;
                if (tempValue != null) {
                    uniqueValue = tempValue.toString();
                }
                else {
                    //continue;
                    uniqueValue = '其他';
                }
                uniqueValues.push(uniqueValue);
                data.push({ value: result.uniqueValueInfos[i].count, name: uniqueValue });
                sum += result.uniqueValueInfos[i].count;
                pieStatisticTable += "<tr><td width='60%' onclick=\"showDataDetails('" + field + "','" + uniqueValue + "')\"><a>" + uniqueValue + "</a></td><td width='40%'>" + result.uniqueValueInfos[i].count + "</td></tr>";
            }

            pieStatisticTable += "<tr><td width='60%'><a>总数</a></td><td width='40%'>" + sum + "</td></tr>";

            pieStatisticTable += "</table>";

            $('#div_Pietable').html("");
            $("#div_Pietable").append(pieStatisticTable);

            var myChartTitle = echarts.init(document.getElementById('chartTitle1'));
            myChartTitle._dom.innerText = chartName; //修改图表名称
            $('#div_PietableName').html('统计表：');

            var myChart1 = echarts.init(document.getElementById('chart1'));

            var option1 = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    itemWidth: 12,
                    itemHeight: 7,
                    itemGap: 5,
                    orient: 'vertical',
                    left: 'left',
                    top: 'top',
                    data: uniqueValues,
                    color: ['rgb(0,0,0)'],
                    textStyle: {
                        color: ['rgb(0,0,0)']
                    }
                },
                series: [{
                    name: description,
                    type: 'pie',
                    radius: ['0%', '85%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,
                    grid: {
                        x: 40,
                        y: 20,
                        y2: 40,
                        x2: 8
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data,
                    color: ['#60C0DD', '#F3A43B', '#FAD860', '#9BCA63', '#FE8463', 'rgb(254,67,101)', 'rgb(252,157,154)', 'rgb(249,205,173)', 'rgb(200,200,169)', 'rgb(131,175,155)', '#8BCDAF', '#75DEB2']
                }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(option1);

            //如果不是城中村数据
            myChart1.on('click', function (param) {
                showDataDetails(field, param.name);
            });

            //if (isCZCData) {

            //    myChart1.on('click', function (param) {

            //        pieClickObj = param;

            //        document.getElementById("chartBox2").style.display = "block";
            //        document.getElementById("tab_Chart").onclick = null; //取消绑定事件

            //        if (pieClickObj != null) {
            //            if (statistic35 == true) {
            //                initChartAndTable(CZCData35);
            //            }
            //            else {
            //                initChartAndTable(CZCData152);
            //            }
            //        }
            //    });
            //}
            //else {
            //    //如果不是城中村数据
            //    myChart1.on('click', function (param) {
            //        showDataDetails(field, param.name);
            //    });
            //}
        });

        //var featureLayerStatsParams = { field: "DFLX",normalizationField:"CD", };

       // featureLayerStats.getUniqueValues();

    })
}

function initChartAndTable(list) {

    for (var i = 0; i < list.length; i++) {
        if (list[i].name == pieClickObj.name) {
            //修改面板高度。以显示柱状图

            document.getElementById("rightInfoWindow").style.height = "70%";
            document.getElementById("divBottomTable").style.display = "none";
            document.getElementById("divBottomChart").style.display = "block";
            var myChart2 = echarts.init(document.getElementById('chart2'));
            var myChartTitle = echarts.init(document.getElementById('chartTitle2'));
            var myTableTitle = echarts.init(document.getElementById('tableTitle'));
            if (statistic35 == true) {
                myChartTitle._dom.innerText = "35条黑臭河涌涉及城中村、农村统计图-" + pieClickObj.name; //修改图表名称
                myTableTitle._dom.innerText = "35条黑臭河涌涉及城中村、农村统计表-" + pieClickObj.name; //修改图表名称
            }
            else {
                myChartTitle._dom.innerText = "152条黑臭河涌涉及城中村、农村统计图-" + pieClickObj.name; //修改图表名称
                myTableTitle._dom.innerText = "152条黑臭河涌涉及城中村、农村统计表-" + pieClickObj.name; //修改图表名称
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['常住人口', '流动人口'],
                    textStyle: {
                        color: ['rgb(0,0,0)']
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: ['rgb(0,0,0)']
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: list[i].countryName,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: ['rgb(0,0,0)']
                        }
                    }
                },
                series: [
                    {
                        name: '常住人口',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color: '#F3A43B'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideLeft'
                            }
                        },
                        data: list[i].alPeople
                    },
                    {
                        name: '流动人口',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color: '#C6E579'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: list[i].flPeople
                    }
                ]
            };

            if (list[i].flPeople.length > 15) {//当数据量大时，在统计图中添加滚动条，避免整幅图挤在一起
                option.dataZoom = {
                    type: 'slider',
                    orient: 'vertical',
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 30,
                    handleSize: 10
                };
            }

            myChart2.setOption(option);

            //生成统计表
            var alPeoSum = 0;
            var flPeoSum = 0;
            var peoSum = 0;
            var statTable = "<table class='customTable' cellspacing='0' style='color:black;font-size:8;'><td>村名</td><td>常驻人口</td><td>流动人口</td><td>合计</td>";
            for (var j = 0; j < list[i].flPeople.length; j++) {
                var count = list[i].alPeople[j] + list[i].flPeople[j];
                alPeoSum += list[i].alPeople[j];
                flPeoSum += list[i].flPeople[j];
                peoSum += count;
                statTable += "<tr><td width='15%'>" + list[i].countryName[j] + "</td><td width='15%'>" + list[i].alPeople[j] + "</td><td width='15%'>" + list[i].flPeople[j] + "</td><td width='15%'>" + count + "</td></tr>"
            }

            statTable += "<tr><td width='15%'>总数</td><td width='15%'>" + alPeoSum + "</td><td width='15%'>" + flPeoSum + "</td><td width='15%'>" + peoSum + "</td></tr>"
            statTable += "</table>";

            $('#statTable').html("");
            $("#statTable").append(statTable);
            break;
        }
    }
}