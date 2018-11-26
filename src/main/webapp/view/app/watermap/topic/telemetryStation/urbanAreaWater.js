define(["jquery", "durandal/app", "durandal/composition", "knockout", "common", "http", "panal", "pager", "jqxgrid.selection", "WdatePicker"],
    function ($, app, composition, ko, common, http, panal, pager) {
        var lastLocatedPoint;//上一个定位点
        var map;//地图对象
        var features;
 	    var dataList;
        var resetLevel;
        var UrbanAreaWater = {
            init: function () {
                var that = this;
                composition.addBindingHandler("urbanAreaWaterInitHandler", {
                    init: function (dom) {
                        panalObj = panal.getPanalByElement(dom);
						resetLevel=true;
                        that.mapLayerTitle=modal._$_param.title;
                        panalObj.settings.onMaxShow = function () {
                        };
                        panalObj.settings.onClose = function () {
                            if (auGurit.global.secondUtlPanal)
                                auGurit.global.secondUtlPanal.close();
                            // if (features) {
                            //     for (var i in features) {
                            //         map.removeLayer((features)[i]);
                            //     }
                            // }
                        }
                        that.bindUI();
                        that.renderUI();
                    }
                });
            },
            renderUI: function () {
            },
            bindUI: function () {
                var that = this;
                map = $("#desktop-main-map")[0].contentWindow.map;
                
		        $("input[name^='urbanArea_']").on("click",function(){
                   resetLevel=false;
                   that.getListData();
                })
                that.initPage(modal);
                that.initTableColumns();
                that.getListData();
            },
            initPage: function (modal) {
                this.originalCurPage = 1;
                this.originalPerPageCount = 20;
                this._param = {};
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                this._pager = null;
                this._infoList = null;
                this._pageInfo = null;
            },
            initTableColumns: function () {
                var that = this;
                var columns = [
                    {
  			            id: "stcd",
                        text: "站点id",
                        datafield: "stcd",
                        hidden:true
                    },
                    {
                        id: "stnm",
                        text: "测站名称",
                        datafield: "stnm",
                        width: "30%",
                        align: "center",
                        cellsalign: "center"
                    },
                    {
                        id: "z",
                        text: "水位(m)",
                        datafield: "z",
                        width: "25%",
                        align: "center",
                        cellsalign: "center",
                        cellsformat: 'f2',
                        cellsrenderer: that.waterLevelFormatter
                    },
                    {
                        id: "tm",
                        text: "更新时间",
                        datafield: "tm",
                        width: "45%",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: that.dateFormatter
                    }
                ];
                var datadatafields = [];
                for (var i = 0; i < columns.length; i++) {
                    datadatafields.push({
                        name: columns[i].datafield,
                        type: 'string'
                    });
                }
                that.gridDataSource = {
                    localdata: [],
                    datadatafields: datadatafields,
                    datatype: "array"
                };
                var dataAdapter = new $.jqx.dataAdapter(that.gridDataSource);
                $("#urbanAreaWaterList").jqxGrid({
                    width: '100%',
                    height: "100%",
                    source: dataAdapter,
                    rowsheight: 25,
                    altrows: true,
                    groupsheaderheight: 25,
                    columnsheight: 25,
                    selectionmode: 'singlerow',
                    columns: columns
                });
                $('#urbanAreaWaterList').on('rowclick', function (event) {//cellclick
                    //if (event.args.datafield == 'locateIcon') {
                        var dataObj = event.args.row.bounddata;
                        //that.openPanel(dataObj);
                        //点击的行主键
                        var id = dataObj.rowId;
                        var currentFeature = features["feature_" +  dataObj.stcd];
                        currentFeature.style = currentFeature.features.styleSelected;
                        map._mapInterface.layerLocate(currentFeature, that.resetFeatureStyle);
                        that.openPanel(currentFeature.features.properties);
                    //}
                });
            },
            loadRiverList: function (_dataList) {
                var tableData = [];
                if (_dataList)
                    tableData = _dataList;
                this.gridDataSource.localdata = tableData;
                $("#urbanAreaWaterList").jqxGrid({
                    source: this.gridDataSource
                });
            },
            waterLevelFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var data = this.owner.host.jqxGrid('getrowdata', row);
                var $cellHtml = $(defaulthtml);
                var $icon;
                var color="blue";
                if(data.state=='1'){color="red";}
                var $font = $('<div class="telemetryStation_font" style="color:'+color+'">' + $cellHtml.text() + '</div>');
                switch (data.wptn) {
                    case '4':
                        $icon = $('<div class="telemetryStation_icon_down_'+color+'"></div>');
                        break;
                    case '5':
                        $icon = $('<div class="telemetryStation_icon_up_'+color+'"></div>');
                        break;
                    default:
                        $icon = $('<div class="telemetryStation_icon_same_'+color+'"></div>');
                        break;
                }
                $cellHtml.empty();
                $cellHtml.append($font);
                $cellHtml.append($icon);
                return $cellHtml[0].outerHTML;
            },
            getListData: function () {
                var that = this;
                //清除之前的feature
                // if (features) {
                //     for (var i in features) {
                //         map.removeLayer(features[i]);
                //     }
                // }
                var h = http.getInstance("subject/getRealtimeWaterList", {type: "post"});
                var requestParams = that._param;
                requestParams.stnm = $('#urbanAreaWaterName').val();
                requestParams.xzq = $('#urbanAreaWaterDistrict').val();
                requestParams.curPage = 1;
                requestParams.perPageCount = 9999; 
               //选中状态
                requestParams.wptnList=$("input:checkbox[name='urbanArea_wptn']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');

                // 是否超出
                requestParams.stateNormalList = $("input:checkbox[name='urbanArea_state_normal']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');
                //站类
                requestParams.sttpList = $("input:checkbox[name='urbanArea_sttp']:checked").map(function(index,elem) {
                    return $(elem).val();
                }).get().join(',');
                //来源
                requestParams.stsysList = "智能水网";
                h.ajax(requestParams).then(function (result) {
                    var data = result;
                    dataList=result.list;
                    that._pageInfo = {
                        totalPage: data.pages,
                        currentPage: data.pageNum,
                        currentRecord: data.size,
                        totalRecord: data.total
                    };
                     //先清除上一次查询地图上面的所有点
                    if(auGurit.global.mapLayers["城区水情"]) {
                        var prePointObject = auGurit.global.mapLayers["城区水情"];
                        if (prePointObject) {
                            for (var i in prePointObject) {
                                map.removeLayer(prePointObject[i]);
                            }
                        }     
                    }
                    that.setListData();
                    if (result.list)
                        that.addFeatures(result.list);

                    auGurit.global.mapLayers["城区水情"] = features;
                    // auGurit.global.mapLayers[that.mapLayerTitle] = features;
                    
                });
            },
            setListData: function () {
                var that = this;
                //处理分页
                if (dataList && that._pageInfo.totalPage >= 1) {
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
                that.loadRiverList(dataList);
            },
            addFeatures: function (data) {
                var that = this;

                var featureList = {};
		        if(!data) return;
                for (var i = 0; i < data.length; i++) {
                    var feature = {};
                    feature.geometry = "POINT (" + data[i].lgtd + " " + data[i].lttd + ")";
                    feature.properties = data[i];
                    feature.style = that.getFeatureStyle(data[i]);
                    feature.styleSelected = {
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [16, 16]
                    };
                   var iconName="";
                    switch (data[i].wptn) {
                        case '4':
                            iconName ="down";// '↓';//
                            break;
                        case '5':
                            iconName = "up";//'↑';
                            break;
                        default:
                            iconName = "same";//'-';
                            break;
                    }   
                    if(data[i].state!=0){
                        iconName+="_red.png";
                    }else{
                        iconName+="_blue.png";
                    }
                    var icon='<img src="'+auGurit.global.rootPath + '/style/asip/common/css/images/icon/'+iconName+'"/>'
                                    

                    feature.tipContent = data[i].stnm+"<br/>"+data[i].z+"m&nbsp;"+icon;
                    featureList["feature_" + data[i].stcd] = feature;
                }
                if(resetLevel){
                    features = map._mapInterface.addFeature(featureList, function (params) {
                        that.callbackRestoreStyle(params);
                        var param = params.features.properties;        
                        that.openPanel(param);
                    });
                }else{//不改变当前视图
                    features = map._mapInterface.addFeatureUnmove(featureList, function (params) {
                        that.callbackRestoreStyle(params);
                        var param = params.features.properties;                       
                        that.openPanel(param);
                    });                  
                }            
	    },
            clickSearchBtn: function () {
                var that = this;
		        resetLevel=true;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;
                that.getListData();
            },
            clickResetBtn: function () {
		         var that = this;
                $('#urbanAreaWaterName').val('');
   		        $("input[name^='urbanArea_']").each(function(){
                   $(this).prop({"checked": true});
                });
                resetLevel=true;
                that.getListData();
            },
            dateFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var date=value.substring(2);
                $cellHtml.empty();
                $cellHtml.append(date.replace(/-/g,"/"));
                return $cellHtml[0].outerHTML;
            },
            locateIconFormatter: function (row, columnfield, value, defaulthtml, columnproperties) {
                var $cellHtml = $(defaulthtml);
                var $iconDiv = $('<div class="telemetryStation_location"></div>');
                $cellHtml.empty();
                $cellHtml.append($iconDiv);
                return $cellHtml[0].outerHTML;
            },
            resetFeatureStyle: function (selectedFeature) {
                if (lastLocatedPoint && lastLocatedPoint != selectedFeature) {
                    lastLocatedPoint.style = lastLocatedPoint.features.style;
                    map._mapInterface.setFeatureStyle(lastLocatedPoint);
                }
                lastLocatedPoint = selectedFeature;
            },
            openPanel: function (data) {
                var top = 75;
                var left = 41;
                var title = data.stnm;
                common.openDialogPanal("view/app/watermap/topic/telemetryStation/realtimeWaterWin", title, data, 600, 480, top, left);
            },
            getFeatureStyle: function (data) {
                var style;
                var iconUrl=auGurit.global.rootPath+"view/app/common/telemetryStation/";
                if (data.wptn == 4) {//落
                    iconUrl+="shuiweijiang";
                } else if (data.wptn == 5) {//涨
                    iconUrl+="shuiweizhang";
                } else {//平
                    iconUrl+="shuiweiping";
                }
                if(data.state!=0){
                    iconUrl+="_r";
                }
                iconUrl+=".png";
                style = {
                    iconUrl: iconUrl,
                    iconSize: [10, 10]
                };

                return style;
	        },                        
            callbackRestoreStyle: function (data) {//回调还原非选中点的样式
                for (var i in features) {
                    if (features[i] != data) {
                        var otherLocateFeature = features[i];
                        otherLocateFeature.style = UrbanAreaWater.getFeatureStyle(features[i].features.properties);
                        map._mapInterface.setFeatureStyle(otherLocateFeature);
                    }
                }
            },
            getDataByDataList:function (){//maxt
                var that = this;
                searchDataList=new Array();
                var searchValue=$("#realtimeWaterName").val();
                for(var i=0;i<dataList.length;i++){
                    var item=dataList[i];
                    var itemFeature=features["feature_" + item.stcd];
                    if(item.stnm.indexOf(searchValue)>-1||item.stcd.indexOf(searchValue)>-1){ 
                        searchDataList.push(item);
                        itemFeature.style = {
                            "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat_s.gif",
                            "iconSize": [16, 16]
                        };                                                                                                                     
                    }else{
                        itemFeature.style = that.getFeatureStyle(itemFeature.features.properties);            
                    }
                    map._mapInterface.setFeatureStyle(itemFeature);   
                }
                that.loadRiverList(searchDataList);//jxq列表数据
            },
            clickSearchByNameBtn: function () {//maxt
                var that = this;
                this._param.curPage = this.originalCurPage;
                this._param.perPageCount = this.originalPerPageCount;             
                that.getDataByDataList();                
            },
            clickClearSearchBtn:function () {
                var that=this;
                // 清除缓存
                $("#realtimeCityWaterName").val('');
                that.callbackRestoreStyle(null);//还原样式
                that.loadRiverList(dataList);//jxq列表数据
            },  

        }

        var modal = {
            clickSearchBtn: $.proxy(UrbanAreaWater.clickSearchBtn, UrbanAreaWater),
            clickResetBtn: $.proxy(UrbanAreaWater.clickResetBtn, UrbanAreaWater),
	        clickSearchByNameBtn: $.proxy(UrbanAreaWater.clickSearchByNameBtn, UrbanAreaWater),
            clickClearSearchBtn: $.proxy(UrbanAreaWater.clickClearSearchBtn, UrbanAreaWater)
        };

        UrbanAreaWater.init();
        return modal;
    });

