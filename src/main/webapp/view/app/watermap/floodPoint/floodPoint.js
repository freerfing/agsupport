define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "highcharts", "tabs", "jqxgrid.selection"],
    function ($, app, composition, ko, common, http, panal, pager, highcharts, tabs) {
        var panalObj;
        var featureList;//加载列表所生成的点列表
        var lastLoactePoint;//上一个定位点
        var agcomMap;
        var map;//地图对象

        var floodPoint = {
            init: function () {
                var that = this;
                composition.addBindingHandler("floodPointInitHandler", {
                    init: function (dom) {
                        that.isMaxShow = false;
                        panalObj = panal.getPanalByElement(dom);
                        panalObj.settings.onMaxShow = function () {
                            that.isMaxShow = !that.isMaxShow;
                            if (that.isMaxShow) {
                                $('#floodPoint-flow-chart-b').show();
                                $('#floodPoint-flow-chart').hide();
                            } else {
                                $('#floodPoint-flow-chart-b').hide();
                                $('#floodPoint-flow-chart').show();
                            }
                        }
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
                that.initPage(modal);
                that.initTableColumns();
                that.initEvent();
                that.getListData();
            },
            initPage: function (modal) {
                // this._url = param.url;
                // this._displayType = param.displayType;
                // this._groupName = param.groupName;
                // this._param = param.queryParam;
                this.originalCurPage = 1;
                this.originalPerPageCount = 10;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                // this._httpType = param.httpType;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
            },
            initTableColumns: function () {
                var that = this;
                var columns = [
                    {
                        id: "sx",
                        text: "市县",
                        datafield: "sx",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    },
                    {
                        id: "zm",
                        text: "站名",
                        datafield: "zm",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    },
                    {
                        id: "zl",
                        text: "站类(报汛项目)",
                        datafield: "zl",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                            var data = this.owner.host.jqxGrid('getrowdata', row);
                            var $cellHtml = $(defaulthtml);
                            if (parseFloat(data.sw) >= parseFloat(data.jjsw))
                                $cellHtml.css('color', 'red');
                            var newVal;
                            switch (value) {
                                case '1':
                                    newVal = "小一型";
                                    break;
                                case '2':
                                    newVal = "小二型";
                                    break;
                                case '3':
                                    newVal = "中型";
                                    break;
                                default:
                                    newVal = "大型";
                                    break;
                            }
                            $cellHtml.text(newVal);
                            return $cellHtml[0].outerHTML;
                        }
                    }, {
                        id: "zryl",
                        text: "昨日雨量",
                        columngroup: "rainfall",
                        datafield: "zryl",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "bszxz",
                        text: "8时-现在",
                        columngroup: "rainfall",
                        datafield: "bszxz",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "qyxx",
                        text: "前一小时",
                        columngroup: "rainfall",
                        datafield: "qyxx",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "jyxx",
                        text: "近一小时",
                        columngroup: "rainfall",
                        datafield: "jyxx",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "bssw",
                        text: "8时水位",
                        columngroup: "waterInfo",
                        datafield: "bssw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "sbsj",
                        text: "上报时间",
                        columngroup: "waterInfo",
                        datafield: "sbsj",
                        width: ($(window).width()) * 0.11 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "sw",
                        text: "水位(m)",
                        columngroup: "waterInfo",
                        datafield: "sw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.waterLevelFormatter
                    }, {
                        id: "kr",
                        text: "库容(百万方)",
                        columngroup: "waterInfo",
                        datafield: "kr",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "jjsw",
                        text: "警戒水位",
                        columngroup: "waterFeature",
                        datafield: "jjsw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "bzsw",
                        text: "保证水位",
                        columngroup: "waterFeature",
                        datafield: "bzsw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "xxsw",
                        text: "汛限水位",
                        columngroup: "waterFeature",
                        datafield: "xxsw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "zcsw",
                        text: "正常水位",
                        columngroup: "waterFeature",
                        datafield: "zcsw",
                        width: ($(window).width()) * 0.06 + "px",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }
                ];

                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield, type: 'string'});
                }
                that.gridDataSourceBig = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var columnsDisplay = columns;

                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSourceBig);
                $("#floodPointList-b").jqxGrid({
                    width: $(window).width() * 0.96,
                    height: "100%",
                    source: dataAdapter,
                    // theme: 'energyblue',
                    rowsheight: 35,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columnsDisplay,
                    columngroups: [
                        {text: "降雨量", align: "center", name: "rainfall"},
                        {text: "水位信息", align: "center", name: "waterInfo"},
                        {text: "特征水位(m)", align: "center", name: "waterFeature"}
                    ]
                });

                columns = [
                    {
                        id: "zm",
                        text: "站名",
                        datafield: "zm",
                        width: 100,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "sw",
                        text: "水位(m)",
                        datafield: "sw",
                        width: 100,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.waterLevelFormatter
                    }, {
                        id: "jjsw",
                        text: "警戒水位",
                        datafield: "jjsw",
                        width: 70,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.colorTurnToRedFormatter
                    }, {
                        id: "locateIcon",
                        text: "",
                        datafield: "locateIcon",
                        width: 50,
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.locateIconFormatter
                    }
                ];

                datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({name: columns[i].datafield, type: 'string'});
                }
                that.gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };

                dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#floodPointList").jqxGrid({
                    width: 340,
                    height: "100%",
                    source: dataAdapter,
                    // theme: 'energyblue',
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columns
                });
                //为小页面的表格增加一个行单击事件
                $('#floodPointList').on('rowclick', function (event) {
                    //清除之前的定位点
                    if (lastLoactePoint) map.removeLayer(lastLoactePoint);

                    var dataObj = event.args.row.bounddata;
                    var feature = {};
                    feature.geometry = 'POINT (' + dataObj.x + ' ' + dataObj.y + ')';
                    // feature.geometry = 'POINT (' + 107.0320 + ' ' + 0.5125 + ')';
                    feature.properties = dataObj;
                    feature.style = null;
                    /*暂时没有点对象的返回值，getLocatedPoint暂时无效*/
                    agcomMap.layerLocate(map, JSON.stringify(feature), getLocatedPoint, bindOnclick);

                    openPanal(dataObj.sbsj, dataObj.zm);
                });
            },
            loadfloodPointList: function () {
                var tableData = [];
                if (this._data.list)
                    tableData = this._data.list;

                this.gridDataSource.localdata = tableData;
                $("#floodPointList").jqxGrid({
                    source: this.gridDataSource
                });

                this.gridDataSourceBig.localdata = tableData;
                $("#floodPointList-b").jqxGrid({
                    source: this.gridDataSourceBig
                });
            },
            getListData: function () {
                var that = this;
                var h = http.getInstance("/subject/reservoirPointPage", {
                    type: "post"
                });
                var requestParams = that._param;
                requestParams.zm = $('#floodPointName').val();
                requestParams.xzq = $('#district').val();
                requestParams.skgn = $('#floodPointFun').val();
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999;
                
                var chk_value = new Array();
                $('input[name="floodPoint_Fruit"]:checked').each(function () {
                    chk_value.push($(this).val());
                });

                requestParams.zl = chk_value.toString();

                that.zm = $('#floodPointName').val();
                that.xzq = $('#district').val();
                that.skgn = $('#floodPointFun').val();
                that.zl = chk_value.toString();

                $('#floodPointName-b').val(that.zm);
                $('#district-b').val(that.xzq);
                $('#floodPointFun-b').val(that.skgn);

                $('input[name="floodPoint_Fruit_b"]').each(function () {
                    $(this).removeAttr('checked');
                    var s = $(this).val();
                    if (that.zl.indexOf(s) > -1)
                        $(this).prop('checked', 'true');
                });

                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    that._data = data;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };
                    //that.addFeatures();
                    //that.located();
                    that.setListData();
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (that._data && that._pageInfo.totalPage >= 1) {
                    $(".list-datagroup-pager").css("display", "block");
                    $(".list-datagroup-content").css("bottom", 30);

                    if (!that._pager) {
                        that._pager = pager.getInstance({
                            parent: $(".list-datagroup-pager"),
                            changeHandler: function () {
                                that._pageInfo.currentPage = that._pager._pageInfo.currentPage;
                                that._param.curPage = that._pager._pageInfo.currentPage;
                                $('#floodPointName').val(that.zm);
                                $('#district').val(that.xzq);
                                $('#floodPointFun').val(that.skgn);

                                $('input[name="floodPoint_Fruit"]').each(function () {
                                    $(this).removeAttr('checked');
                                    var s = $(this).val();
                                    if (that.zl.indexOf(s) > -1)
                                        $(this).prop('checked', 'true');
                                });

                                that.getListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    $(".list-datagroup-pager").css("display", "none");
                    $(".list-datagroup-content").css("bottom", 0);
                }
                that.loadfloodPointList();
            },
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
                $('#district').val('');
                $('#floodPointName').val('');
                $('#floodPointFun').val('');
                $('input[name="floodPoint_Fruit"]').prop('checked', true);
                $('#district-b').val('');
                $('#floodPointName-b').val('');
                $('#floodPointFun-b').val('');
                $('input[name="floodPoint_Fruit_b"]').prop('checked', true);
            },
            addFeatures: function () {
                var that = this;
                //初始化地图
                if (!agcomMap) {
                    agcomMap = window.document.getElementById('desktop-main-map').contentWindow.agcom_2dmap;
                    if (!agcomMap || !agcomMap.map) window.setTimeout(that.addFeatures, 100);
                    map = agcomMap.map;
                }

                //清除地图上的所有要素
                //agcomMap.clean();
                // if (featureList) {
                //     for (var i = 0; i < featureList.length; i++) {
                //         map.removeLayer(featureList[i]);
                //     }
                //     featureList = [];
                // }

                var list = that._data.list;
                var features = [];
                for (var i = 0; i < list.length; i++) {
                    var data = list[i];
                    var feature = {};
                    var style;
                    if (data.sw >= data.jjsw) {//超警戒
                        style = {
                            iconUrl: auGurit.global.rootPath + '/view/app/common/reservior/cjjx.png',
                            iconSize: [16, 16]
                        };
                    } else if (data.ksss == 4) {//落
                        style = {
                            iconUrl: auGurit.global.rootPath + '/view/app/common/reservior/shuiweijiang.png',
                            iconSize: [16, 16]
                        };
                    } else if (data.ksss == 5) {//涨
                        style = {
                            iconUrl: auGurit.global.rootPath + '/view/app/common/reservior/shuiweizhang.png',
                            iconSize: [16, 16]
                        };
                    } else {//平
                        style = {
                            iconUrl: auGurit.global.rootPath + '/view/app/common/reservior/shuiweiping.png',
                            iconSize: [16, 16]
                        };
                    }
                    feature.geometry = 'POINT(' + data.x + ' ' + data.y + ')';
                    feature.properties = data;
                    feature.style = style;
                    features.push(feature);
                }
                agcomMap.addFeature(map, JSON.stringify(features), getFeatureList);
            },
            initEvent: function () {
                $('#district').change(function () {
                    $('#district-b').val($(this).val());
                });
                $('#floodPointName').change(function () {
                    $('#floodPointName-b').val($(this).val());
                });
                $('#floodPointFun').change(function () {
                    $('#floodPointFun-b').val($(this).val());
                });
                $("input[name='floodPoint_Fruit']").change(function () {
                    var chk_value = new Array();
                    $('input[name="floodPoint_Fruit"]:checked').each(function () {
                        chk_value.push($(this).val());
                    });
                    var chk_value_str = chk_value.toString();
                    $('input[name="floodPoint_Fruit_b"]').each(function () {
                        $(this).removeAttr('checked');
                        var s = $(this).val();
                        if (chk_value_str.indexOf(s) > -1)
                            $(this).prop('checked', 'true');
                    });
                });

                $('#district-b').change(function () {
                    $('#district').val($(this).val());
                });
                $('#floodPointName-b').change(function () {
                    $('#floodPointName').val($(this).val());
                });
                $('#floodPointFun-b').change(function () {
                    $('#floodPointFun').val($(this).val());
                });
                $("input[name='floodPoint_Fruit_b']").change(function () {
                    var chk_value = new Array();
                    $('input[name="floodPoint_Fruit_b"]:checked').each(function () {
                        chk_value.push($(this).val());
                    });
                    var chk_value_str = chk_value.toString();
                    $('input[name="floodPoint_Fruit"]').each(function () {
                        $(this).removeAttr('checked');
                        var s = $(this).val();
                        if (chk_value_str.indexOf(s) > -1)
                            $(this).prop('checked', 'true');
                    });
                });
            },
            colorTurnToRedFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                if (parseFloat(data.sw) >= parseFloat(data.jjsw))
                    $cellHtml.css('color', 'red');
                return $cellHtml[0].outerHTML;
            },
            waterLevelFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                var $icon;
                var $font = $('<div class="floodPoint_font">' + $cellHtml.text() + '</div>');
                if (parseFloat(data.sw) >= parseFloat(data.jjsw)) {
                    $cellHtml.css('color', 'red');
                    switch (data.ksss) {
                        case '4':
                            $icon = $('<div class="floodPoint_icon_down_red"></div>');
                            break;
                        case '5':
                            $icon = $('<div class="floodPoint_icon_up_red"></div>');
                            break;
                        default:
                            $icon = $('<div class="floodPoint_icon_same_red"></div>');
                            break;
                    }
                } else {
                    switch (data.ksss) {
                        case '4':
                            $icon = $('<div class="floodPoint_icon_down_blue"></div>');
                            break;
                        case '5':
                            $icon = $('<div class="floodPoint_icon_up_blue"></div>');
                            break;
                        default:
                            $icon = $('<div class="floodPoint_icon_same_blue"></div>');
                            break;
                    }
                }
                $cellHtml.empty();
                $cellHtml.append($font);
                $cellHtml.append($icon);
                return $cellHtml[0].outerHTML;
            },
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="floodPoint_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            }
        }

        var modal = {
            clickSearchBtn: $.proxy(floodPoint.clickSearchBtn, floodPoint),
            clickResetBtn: $.proxy(floodPoint.clickResetBtn, floodPoint)
        };

        //画出所有要素以后所返回的对应的地图对象
        function getFeatureList(features) {
            featureList = features;
        }

        //点定位callback
        function getLocatedPoint(point) {
            lastLoactePoint = point;
        }

        function openPanal(sbsj, zm) {
            var radio = 0.98;
            var height = Math.ceil($("#desktop-map").height() * radio) - 8;
            var top = 75;
            var left = 41;
            var title = zm;
            common.openDialogPanal("view/app/watermap/floodPoint/testFile", title, {
                sbsj: sbsj, zm: zm
            }, 500, 480,top,left);
        }

        //点定位完成后所绑定的点击事件
        function bindOnclick(feature) {
            // var that = this;
            // var $tipWin = $("#desktop-main-map").contents().find("#agcom_2dmap").contents().find('#tipWin');
            // var attr = feature.properties;
            // window.setTimeout($tipWin.html('<label style="padding-top: 5px">水库名：' + attr.zm + '</label><br><label>水位值：' + attr.sw + '(m)</label>'), 500);

            // $tipWin.append("<a onclick='window.parent.parent.parent.parent.openPanal()'>123</a>")
            // debugger;
            // app.setRoot("view/app/watermap/floodPoint/testFile", null, $tipWin[0], feature.properties);
            // app.setRoot("view/app/watermap/floodPoint/testFile", null, $tipWin[0],{});
            // app.setRoot("view/app/watermap/floodPoint/testFile", null, $tipWin[0], {
            //     sbsj: feature.properties.sbsj,
            //     zm: feature.properties.zm
            // });
            // $tipWin.append("<div style='width: 400px;height: 300px' id='sssid'> <div class='home-container' data-bind='homeInitHandler1' style='width:100%;height:100%;'> <div id='floodPoint-flow-chart1' style='width:100%;height:100%;margin-top:5px;'> <div id='reserviorList1' style='height: 100%;width: 100%'></div> </div> </div></div>");
            // loadTabs($tipWin.find('#reserviorList1'));
        }

        floodPoint.init();
        return modal;
    });