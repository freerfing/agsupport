/**
 * Created by hzp on 2017-07-20.
 */
define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "slickGrid", "jqxgrid.selection", "WdatePicker"],
    function ($, app, composition, ko, common, http, panal, pager, Slick) {
        var panalObj;
        var featureList;//加载列表所生成的点列表
        var lastLoactePoint;//上一个定位点
        var pointObj;
        var map;//地图对象
        var features; //所有要素对象
        var hasStandardRange = true; //是否有降雨量等级标准
        var curRainLevelId = null; //当前降雨量等级ID
        var RainFallStation = {
            init: function () {
                var that = this;
                composition.addBindingHandler("rainfallstationInitHandler", {
                    init: function (dom) {
                        // panalObj = panal.getPanalByElement(dom);
                        // panalObj.settings.onMaxShow = function () {
                        // };
                        // panalObj.settings.onClose = function () {
                        //     if (pointObj) {
                        //         for (var i in pointObj) {
                        //             map.removeLayer(pointObj[i]);
                        //         }
                        //     }
                        // }
                        that.bindUI();
                        that.renderUI();
                    },
                    update: function () {
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                //默认给昨天八点到今天八点的时间
                /*var date = new Date();
                 var now = date.getFullYear() + "-" +
                 ((date.getMonth())<10 ? "0"+(date.getMonth()+1):(date.getMonth()+1)) +
                 "-" +  (date.getDate()<10 ? ("0"+date.getDate()):(date.getDate()))+" 08:00:00";
                 var day1 = new Date();
                 day1.setTime(day1.getTime()-24*60*60*1000);
                 var last = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate()+" 08:00:00";

                 beginDate = last;
                 endDate = now;*/
                beginDate = "2017-06-11 08:00:00";
                endDate = "2017-06-12 08:00:00";
                $("#startTime").val(beginDate);
                $("#endTime").val(endDate);
                var that = this;
                that.initPage(modal);
                that.initTableColumns();
                // that.loadReservoirList();
                //读取降雨量等级数据
                var h = http.getInstance("data/rainlevel.json");
                h.ajax().then(function (data) {
                    that.data = data.level;
                    curRainLevelId = null;
                    that.getListData();
                });
                $("#startTime").click(function () {
                    WdatePicker({readOnly: true, maxDate: "#F{$dp.$D('endTime')}"});
                });
                $("#endTime").click(function () {
                    WdatePicker({readOnly: true, minDate: "#F{$dp.$D('startTime')}"});
                });
            },
            initPage: function (modal) {
                // this._url = param.url;
                // this._displayType = param.displayType;
                // this._groupName = param.groupName;
                // this._param = param.queryParam;
                this.originalCurPage = 1;
                this.originalPerPageCount = 8;
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
                //列
                columns = [
                    {
                        id: "stcdStr",
                        text: "站点名称",
                        datafield: "stnm",
                        width: "40%",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
                        id: "drpStr",
                        text: "雨量",
                        datafield: "sumDrp",
                        width: "40%",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
                        id: "legend",
                        text: "",
                        datafield: "legend",
                        width: "10%",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.legendFormatter
                    }
                ];
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({
                        name: columns[i].datafield,
                        type: 'string'
                    });
                }
                that.gridDataSource = {};
                gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(gridDataSource);
                $("#rainfallstationList").jqxGrid({
                    width: '100%',
                    height: "100%",
                    source: dataAdapter,
                    //theme: 'energyblue',
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlecell',
                    columns: columns
                });
                $('#rainfallstationList').on('rowclick', function (event) {
                    var dataObj = event.args.row.bounddata;
                    var id = dataObj.rowId;//暂时用rowId
                    var currentFeature = pointObj["feature_" + id];
                    currentFeature.style = {
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [16, 16]
                    };
                    map._mapInterface.layerLocate(currentFeature, that.callbackRestoreStyle);
                    var startDateVal = $('#startTime').val();
                    var endDateVal = $('#endTime').val();
                    openPanal(startDateVal, endDateVal, dataObj.stcd, dataObj.stnm);
                });
            },
            loadRainFallList: function () {
                var tableData = [];
                var that = this;
                if (this._data.list)
                    tableData = this._data.list;
                /*var options = {
                 enableCellNavigation: true,
                 enableColumnReorder: true,
                 multiSelect: false
                 };*/

                this.gridDataSource.localdata = tableData;
                $("#rainfallstationList").jqxGrid({
                    source: this.gridDataSource
                });
            },
            addFeatures: function (data) {
                var that = this;
                map = $("#desktop-main-map")[0].contentWindow.map;
                features = {};
                for (var i = 0; i < data.length; i++) {
                    var feature = {};
                    feature.geometry = "POINT (" + data[i].x + " " + data[i].y + ")";
                    feature.properties = data[i];
                    feature.style = that.locationStyle(data[i]);
                    feature.styleSelected = {
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [16, 16]
                    };
                    feature.tipContent = data[i].stnm;
                    //featureArray.push(feature);
                    //站名没有id，这里先用rowId代替吧
                    features["feature_" + data[i].rowId] = feature;
                }
                ;
                pointObj = map._mapInterface.addFeature(features, function (params) {
                    that.callbackRestoreStyle(params);
                    var param = params.features.properties;
                    var startDateVal = $('#startTime').val();
                    var endDateVal = $('#endTime').val();
                    openPanal(startDateVal, endDateVal, param.stcd, param.stnm)
                });
                auGurit.global.topicsFeatures.push(pointObj);
            },
            getListData: function () {
                var that = this;

                var sDate = new Date($('#startTime').val());
                var eDate = new Date($('#endTime').val());

                if (eDate.getTime() - sDate.getTime() <= 24 * 60 * 60 * 1000) {//时间间隔少于等于24小时
                    if (!curRainLevelId || curRainLevelId != 'level-24h') {
                        //获取24小时降雨量等级数据
                        for (var i = 0; i < that.data.length; i++) {
                            var level = that.data[i];
                            if (level.id == 'level-24h') {
                                that.level = level;
                                break;
                            }
                        }
                        $('#myform').empty();

                        //显示雨量范围
                        $('.rainfall_range_h3').show();
                        for (var i = 0; i < that.level.sublevel.length; i++) {
                            var obj = that.level.sublevel[i];
                            var styleStr = 'style="background: url(' + auGurit.global.rootPath + obj.iconUrl + ') no-repeat 0 2px;background-size: 14px 14px;"';
                            $('#myform').append('<label><input name="ylfw" type="checkbox" value="' + obj.text + '"/><b ' + styleStr + '>' + obj.text + '</b> </label>');
                        }

                        hasStandardRange = true;
                        $('.rainfallstation_table_b').css('top', '277px');

                        curRainLevelId = 'level-24h';
                    }
                } else {//没有数据标准
                    $('#myform').empty();
                    //隐藏雨量范围
                    $('.rainfall_range_h3').hide();
                    hasStandardRange = false;
                    $('.rainfallstation_table_b').css('top', '187px');

                    curRainLevelId = null;
                }

                var h = http.getInstance("/subject/listStPptnRPage", {
                    type: "post"
                });
                var requestParams = that._param;
                requestParams.startTime = $('#startTime').val();
                requestParams.endTime = $('#endTime').val();
                var checkval = $("#myform").serializeArray();
                if (checkval.length > 0) {
                    var checkvalstring = "";
                    for (var i = 0; i < checkval.length; i++) {
                        checkvalstring += checkval[i].value + ',';
                    }
                    checkvalstring = checkvalstring.substring(0, checkvalstring.length - 1);
                    requestParams.rainfall = checkvalstring;
                } else {
                    requestParams.rainfall = "";
                }
                requestParams.fw = $('#FW').val();
                requestParams.ly = $('#LY').val();

                var chk_value = new Array();
                $('input[name="reservoir_Fruit"]:checked').each(function () {
                    chk_value.push($(this).val());
                });

                requestParams.zl = chk_value.toString();
                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    that._data = data;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };
                    that.setListData();
                    //先清除上一次查询地图上面的所有点
                    // if (pointObj) {
                    //     for (var i in pointObj) {
                    //         map.removeLayer(pointObj[i]);
                    //     }
                    // }

                    //先清除上一次查询地图上面的所有点
                    if(auGurit.global.mapLayers["雨量站"]) {
                        var prePointObject = auGurit.global.mapLayers["雨量站"];
                        if (prePointObject) {
                            for (var i in prePointObject) {
                                map.removeLayer(prePointObject[i]);
                            }
                        }     
                    }

                    that.addFeatures(result.list);

                    auGurit.global.mapLayers["雨量站"] = pointObj;
                    
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
                                that.getListData();
                            }
                        });
                    }
                    that._pager.setPageInfo(that._pageInfo);
                } else {
                    $(".list-datagroup-pager").css("display", "none");
                    $(".list-datagroup-content").css("bottom", 0);
                }
                that.loadRainFallList();
            },
            clickSearchBtn: function () {
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
                $('#startTime').val('');
                $('#endTime').val('');
                $('#FW').val('');
                $('#LY').val('');
                //var ylfw =  $("input[name^='ylfw']");
                // $('#myform').reset();
                // $("#myform").prop({checked:false});
                $("#myform input:checkbox").removeAttr("checked");
            },
            legendFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var that = RainFallStation;
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div></div>');
                var data = this.owner.host.jqxGrid('getrowdata', row);
                //雨量
                var drp = data.sumDrp;
                if (hasStandardRange) {
                    for (var i = 0; i < that.level.sublevel.length; i++) {
                        var obj = that.level.sublevel[i];
                        if (drp >= parseFloat(obj.min)) {
                            if (obj.max == '~' || drp <= parseFloat(obj.max)) {
                                $iconDiv.css('background', 'url(' + auGurit.global.rootPath + obj.iconUrl + ') center center no-repeat');
                                break;
                            }
                        }
                    }
                } else
                    $iconDiv.css('background', 'url(' + auGurit.global.rootPath + 'style/asip/common/css/images/icon/cyan_circle.png' + ') center center no-repeat');
                $iconDiv.css('height', '16px');

                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            //回调还原非选中点的样式
            callbackRestoreStyle: function (data) {
                for (var i in pointObj) {
                    if (pointObj[i] != data) {
                        var otherLocateFeature = pointObj[i];
                        otherLocateFeature.style = RainFallStation.locationStyle(pointObj[i].features.properties);
                        map._mapInterface.setFeatureStyle(otherLocateFeature);
                    }
                }
            },
            //根据降雨量不同在确定地图上面定位的点的样式
            locationStyle: function (rowData) {
                var that = this;
                var style;
                var drp = rowData.sumDrp;
                if (hasStandardRange) {
                    for (var i = 0; i < that.level.sublevel.length; i++) {
                        var obj = that.level.sublevel[i];
                        if (drp >= parseFloat(obj.min)) {
                            if (obj.max == '~' || drp <= parseFloat(obj.max)) {
                                style = {
                                    iconUrl: auGurit.global.rootPath + obj.iconUrl,
                                    iconSize: [16, 16]
                                };
                                break;
                            }
                        }
                    }
                } else {
                    style = {
                        iconUrl: auGurit.global.rootPath + 'style/asip/common/css/images/icon/cyan_circle.png',
                        iconSize: [16, 16]
                    };
                }
                return style;
            }
        }

        var modal = {
            clickSearchBtn: $.proxy(RainFallStation.clickSearchBtn, RainFallStation),
            clickResetBtn: $.proxy(RainFallStation.clickResetBtn, RainFallStation)
        };

        function openPanal(tm_s, tm_e, stcd, stnm) {
            var radio = 0.98;
            var height = Math.ceil($("#desktop-map").height() * radio) - 8;
            var top = 75;
            var left = 41;
            var title = stnm;
            common.openDialogPanal("view/app/watermap/rainFallStation/rainWin", title, {
                tm1: tm_s, tm2: tm_e, stcd: stcd, stnm: stnm
            }, 600, 500, top, left);
        }

        //点定位callback
        function getLocatedPoint(point) {
            lastLoactePoint = point;
        }

        //画出所有要素以后所返回的对应的地图对象
        function getFeatureList(features) {
            featureList = features;
        }

        //点定位完成后所绑定的点击事件
        function bindOnclick(feature) {
            // var that = this;
            // var $tipWin = $("#desktop-main-map").contents().find("#agcom_2dmap").contents().find('#tipWin');
            // var attr = feature.properties;
            // $tipWin.append('<label style="padding-top: 5px">站名：'+attr.stnm+'</label><br><label>雨量：'+attr.sumDrp+'(mm)</label>')
        }

        RainFallStation.init();
        return modal;
    });