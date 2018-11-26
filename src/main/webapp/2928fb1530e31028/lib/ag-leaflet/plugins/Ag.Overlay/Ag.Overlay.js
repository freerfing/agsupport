/**
 * Author：yzq
 * CreateDate：2017-08-29
 * Description: 叠加分析脚本
 */

define(["Omnivore"],function (omnivore) {
    function shp_upload() {
        var fileName;
        var fileType = "";
        var $queueItem;
        $("#uploadify").uploadifive({
            height: 30,
            uploadScript: agsupportURL + '/agsupport/labelImport/uploadFile',
            width: 30,
            method: 'post',
            buttonText: '+',
            removeCompleted: true,
            dnd: true,
            multi: true,
            onAddQueueItem: function (file) {
                var value = $("#uploadify_text").val();
                if (value.indexOf(file.name + ';') < 0) {
                    value = value + file.name + ';';
                }
                $('#uploadify_text').val(value);
                var list = file.name.split(".");
                var type = list[list.length - 1].toLowerCase();
                if (!file.size > 0) {
                    alert("文件" + file.name + "大小为0字节,不允许上传!");
                    $queueItem = $('.uploadifive-queue-item');
                    $queueItem.each(function () {
                        $("#uploadify").uploadifive('cancel', $(this).data('file'));
                    });
                    $("#uploadify_text").val('');
                    fileType = "";
                } else if ("dbf,prj,sbn,sbx,shp,shp.xml,shx,cpg".indexOf(type) < 0) {
                    alert("文件类型不符合：dbf,prj,sbn,sbx,shp,shp.xml,shx,cpg;");
                    $queueItem = $('.uploadifive-queue-item');
                    $queueItem.each(function () {
                        $("#uploadify").uploadifive('cancel', $(this).data('file'));
                    });
                    $("#uploadify_text").val('');
                    fileType = "";
                } else {
                    fileType = fileType + type + ";";
                }

                if (type.indexOf("shp") != -1 || type.indexOf("SHP") != -1) {
                    fileName = file.name;
                }
            },
            onUpload: function (filesToUpload) {
                if (fileType != "" && !(fileType.indexOf("shp") != -1 && fileType.indexOf("xml") != -1 && fileType.indexOf("shx") != -1 && fileType.indexOf("dbf") != -1 && fileType.indexOf("sbn") != -1 && fileType.indexOf("sbx") != -1)) {
                    alert("缺少文件，请重新上传！")
                    $queueItem = $('.uploadifive-queue-item');
                    $queueItem.each(function () {
                        $("#uploadify").uploadifive('cancel', $(this).data('file'));
                    });
                    $("#uploadify_text").val('');
                    fileType = "";
                }
            },
            onQueueComplete: function (uploads) {
                var overlayer = L.featureGroup([]);
                if (uploads.count == uploads.successful) {
                    $.post(agsupportURL + '/agsupport/labelImport/getShp', {fileName: fileName}, function (data) {
                        if (data != null && data != '') {
                            var wktList = eval("(" + data + ")");
                            for (var i in wktList) {
                                if (map.options.crs.code != "EPSG:4326") {
                                    wktList[i] = unprojectWkt(wktList[i]);
                                }
                                omnivore.wkt.parse(wktList[i]).addTo(overlayer);
                            }
                            group.addLayer(overlayer);
                            overlayer.addTo(map);
                            map.fitBounds(overlayer.getBounds());
                        }
                    });
                } else {
                    alert("文件上传失败！");
                }
                $("#uploadify_text").val('');
                fileType = "";
            },
            onUploadError: function (file, errorCode, errorMsg, errorString) {
                alert('文件 ' + file.name + ' 上传失败: ' + errorString);
                $("#uploadify_text").val('');
                fileType = "";
            },
            onFallback: function () {
                alert("该浏览器无法使用!");
            }
        })
    }
    function shp_uploads() {
        var fileName;
        var fileType = "";
        var $queueItem;
        $("#uploadifys").uploadifive({
            height: 30,
            uploadScript: agsupportURL + '/agsupport/labelImport/uploadFile',
            width: 30,
            method: 'post',
            buttonText: '+',
            removeCompleted: true,
            dnd: true,
            multi: true,
            onAddQueueItem: function (file) {
                var value = $("#layer1").val();
                // if (value.indexOf(file.name + ';') < 0) {
                    value = value + file.name + ';';
                // }
                $('#layer1').val(value);
                var list = file.name.split(".");
                var type = list[list.length - 1].toLowerCase();
                if (!file.size > 0) {
                    alert("文件" + file.name + "大小为0字节,不允许上传!");
                    $queueItem = $('.uploadifive-queue-item' );
                    $queueItem.each(function () {
                        $("#uploadify").uploadifive('cancel', $(this).data('file'));
                    });
                    $("#layer1").val('');
                    fileType = "";
                } else if ("dbf,prj,sbn,sbx,shp,shp.xml,shx,cpg".indexOf(type) < 0) {
                    alert("文件类型不符合：dbf,prj,sbn,sbx,shp,shp.xml,shx,cpg;");
                    $queueItem = $('.uploadifive-queue-item');
                    $queueItem.each(function () {
                        $("#uploadify").uploadifive('cancel', $(this).data('file'));
                    });
                    $("#layer1").val('');
                    fileType = "";
                } else {
                    fileType = fileType + type + ";";
                }

                if (type.indexOf("shp") != -1 || type.indexOf("SHP") != -1) {
                    fileName = file.name;
                }
            },
            onUpload: function (filesToUpload) {
                if (fileType != "" && !(fileType.indexOf("shp") != -1 && fileType.indexOf("xml") != -1 && fileType.indexOf("shx") != -1 && fileType.indexOf("dbf") != -1 && fileType.indexOf("sbn") != -1 && fileType.indexOf("sbx") != -1)) {
                    alert("缺少文件，请重新上传！")
                    $queueItem = $('.uploadifive-queue-item');
                    $queueItem.each(function () {
                        $("#uploadify").uploadifive('cancel', $(this).data('file'));
                    });
                    $("#layer1").val('');
                    fileType = "";
                }
            },
            onQueueComplete: function (uploads) {
                var overlayer = L.featureGroup([]);
                if (uploads.count == uploads.successful) {
                    $.post(agsupportURL + '/agsupport/labelImport/getShp', {fileName: fileName}, function (data) {
                        if (data != null && data != '') {
                            var wktList = eval("(" + data + ")");
                            for (var i in wktList) {
                                if (map.options.crs.code != "EPSG:4326") {
                                    wktList[i] = unprojectWkt(wktList[i]);
                                }
                                omnivore.wkt.parse(wktList[i]).addTo(overlayer);
                            }
                            group.addLayer(overlayer);
                            overlayer.addTo(map);
                            map.fitBounds(overlayer.getBounds());
                        }
                    });
                } else {
                    alert("文件上传失败！");
                }
                $("#layer1").val('');
                fileType = "";
            },
            onUploadError: function (file, errorCode, errorMsg, errorString) {
                alert('文件 ' + file.name + ' 上传失败: ' + errorString);
                $("#layer1").val('');
                fileType = "";
            },
            onFallback: function () {
                alert("该浏览器无法使用!");
            }
        })
    }
    function getTree() {
        $.ajax({
            url: agsupportURL + "/agsupport/dir/layersByUserIdAndFeatureType",
            type: "post",
            dataType: "json",
            data: {
                userId: userId,
                featureType: "point"
            },
            success: function (data) {
                $.each(data, function (index, value) {
                    if(value.layerType=="010001"){
                        $("<option sid =" + value.dirLayerId + " value ='" + value.dirLayerId + "'>" + value.nameCn + "</option>").appendTo("#layer2");
                        $("<option sid =" + value.dirLayerId + " value ='" + value.dirLayerId + "'>" + value.nameCn + "</option>").appendTo("#layer1");
                    }
                });
            },
            error: function (e) {
                console.info(e);
            }
        });
        $.ajax({
            url: agsupportURL + "/agsupport/dir/layersByUserIdAndFeatureType",
            type: "post",
            dataType: "json",
            data: {
                userId: userId,
                featureType: "polyline"
            },
            success: function (data) {
                $.each(data, function (index, value) {
                    if(value.layerType=="010001"){
                    $("<option sid =" + value.dirLayerId + " value ='" + value.dirLayerId + "'>" + value.nameCn + "</option>").appendTo("#layer2");
                    $("<option sid =" + value.dirLayerId + " value ='" + value.dirLayerId + "'>" + value.nameCn + "</option>").appendTo("#layer1");
                    }
                    });
            },
            error: function (e) {
                console.info(e);
            }
        });
        $.ajax({
            url: agsupportURL + "/agsupport/dir/ ",
            type: "post",
            dataType: "json",
            data: {
                userId: userId,
                featureType: "polygon"
            },
            success: function (data) {
                $.each(data, function (index, value) {
                    if(value.layerType=="010001"){
                    $("<option sid =" + value.dirLayerId + " value ='" + value.dirLayerId + "'>" + value.nameCn + "</option>").appendTo("#layer2");
                    $("<option sid =" + value.dirLayerId + " value ='" + value.dirLayerId + "'>" + value.nameCn + "</option>").appendTo("#layer1");
                    }
                });
            },
            error: function (e) {
                console.info(e);
            }
        });
        
    }
    function overlay(layerObj) {

        var urls1=$("#layer1").val();
        var url2=$("#layer2").val();
        var urls=map.getZoom();
        var self = this;
        var wkt1="";
        var wkt2="";
        // var popupName = layerObj.name;
        layerObj.renderZoom = map.getZoom();
        layerObj.renderExtent = map.getBounds().pad(1.2);
        var renderExtent = map._controls.queryLayerControl._projectLatLngs([layerObj.renderExtent.getSouthWest(), layerObj.renderExtent.getNorthEast()]);
        var param = {
            userId: userId,
            dirLayerId: urls1,
            extent: JSON.stringify(renderExtent),
            zoom: map.getMaxZoom() - map.getZoom() > 2 ? map.getZoom() : 0
        };
        $.post(agsupportURL + "/agsupport/layer/loadVectorLayer", param, function (result) {
            var data = result.data;
            var fieldConf = result.fieldConf;
            var layerConf = result.layerConf;
            var styleConf = result.styleConf;
            if (data != null && typeof(data) != "undefined") {
                require(["Popup", "PolylineOffset"], function (PopupObject) {
                    //清空容器
                    for (var i = 0; i < data.length; i++) {

                        if(data[i].agdaa5681082!=null&&data[i].agdaa5681082!=""){
                            if(i==0){
                                if(data[i].agdaa5681082.toLowerCase().indexOf("line")!=-1){
                                    wkt1+="POLYGON("
                                }else if(data[i].agdaa5681082.toLowerCase().indexOf("polygon")!=-1){
                                    wkt1+="POLYGON("
                                }else if(data[i].agdaa5681082.toLowerCase().indexOf("polygon")!=-1){
                                    wkt1+="POINT("
                                }
                                wkt1+=""+data[i].agdaa5681082.match(/\(([^)]*)\)/)[1]+")";
                            }else{
                            var rt= /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(data[i].agdaa5681082);
                            wkt1+=","+data[i].agdaa5681082.match(/\(([^)]*)\)/)[1]+")";
                            }
                        }
                    }
                    wkt1+=")"
                    var param1= {
                        userId: userId,
                        dirLayerId: urls1,
                        extent: JSON.stringify(renderExtent),
                        zoom: map.getMaxZoom() - map.getZoom() > 2 ? map.getZoom() : 0
                    };
                    $.post(agsupportURL + "/agsupport/layer/loadVectorLayer", param1, function (result) {
                        var data = result.data;
                        var fieldConf = result.fieldConf;
                        var layerConf = result.layerConf;
                        var styleConf = result.styleConf;
                        if (data != null && typeof(data) != "undefined") {
                            require(["Popup", "PolylineOffset"], function (PopupObject) {
                                //清空容器
                                for (var i = 0; i < data.length; i++) {

                                    if(data[i].agdaa5681082!=null&&data[i].agdaa5681082!=""){
                                        if(i==0){
                                            if(data[i].agdaa5681082.toLowerCase().indexOf("line")!=-1){
                                                wkt2+="POLYGON("
                                            }else if(data[i].agdaa5681082.toLowerCase().indexOf("polygon")!=-1){
                                                wkt2+="POLYGON("
                                            }else if(data[i].agdaa5681082.toLowerCase().indexOf("polygon")!=-1){
                                                wkt2+="POINT("
                                            }
                                            wkt2+=""+data[i].agdaa5681082.match(/\(([^)]*)\)/)[1]+")";
                                        }else{
                                            var rt= /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(data[i].agdaa5681082);
                                            wkt2+=","+data[i].agdaa5681082.match(/\(([^)]*)\)/)[1]+")";
                                        }
                                    }

                                }
                                wkt2+=")"
                                setTimeout(getss(wkt1,wkt2),5000);
                            });
                        }

                    }, 'json');
                });
            }
        }, 'json');
      

    }

    function getss(wkt1,wkt2) {
        var normalM = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {maxZoom: 18, minZoom: 3});
        var normalA = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {maxZoom: 18, minZoom: 3});
        // var polygonWKT1 = 'POLYGON((113.50 23.15,113.55 23.10,113.60 23.15,113.55 23.20,113.50 23.15))';
        // var polygonWKT2 = 'POLYGON((113.50 23.15,113.55 23.10,113.60 23.15,113.55 23.20,113.50 23.15))';
        //
        var polygonWKT1 = wkt1;
        var polygonWKT2 = wkt2;
        var normal = L.layerGroup([normalM, normalA]);
        var overlayer = L.layerGroup([]);
        var post = 'wkt1=' + polygonWKT1 + '&wkt2=' + polygonWKT2;
        console.log(post);
        var url, msg;
        switch ("intersect") {
            case 'intersect':
                url = agsupportURL + '/agsupport/operate/intersect';
                msg = '显示要素一、要素二重叠部分';
                break;
            case 'union':
                url = agsupportURL + '/agsupport/operate/union';
                msg = '显示要素一、要素二联合部分';
                break;
            case 'difference':
                url = agsupportURL + '/agsupport/operate/difference';
                msg = '显示要素一、要素二不同部分';
                break;
            case 'symDifference':
                url = agsupportURL + '/agsupport/operate/symDifference';
                msg = '显示要素一除去要素二剩下部分';
                break;
        }
        $.post(url, post, function (r) {
            if (r != 'GEOMETRYCOLLECTION EMPTY') {
                // var result = omnivore.wkt.parse(r).setStyle({color: 'red'}).bindTooltip(msg);
                // overlayer.clearLayers().addLayer(result);
                //mymap.fitBounds(result.getBounds());
            }
        });

    }
    function bindfunction() {
       $("#getresult").click(overlay);
    }
    function initOverlay() {
            shp_upload();
            shp_uploads();
            getTree()
            bindfunction();
    }
    return {
        initOverlay: initOverlay
    };
})
