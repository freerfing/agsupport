/**
 * 水务一张图功能模块
 * czh
 * 2017-11-29
 */
define(["jquery"], function ($) {
    var mapUtils = {
        /**
         * 点查并渲染图层
         * @param opt
         * @param notChangeZoom 给水务一张图 "工程·设施 - 排水设施 - 排水管线" 特别处理"
         */
        queryLayer: function (opt, notChangeZoom) {
            var _this = this;
            if (opt && opt.serviceUrl && opt.params) {
                var map = $("#desktop-main-map")[0].contentWindow.map;
                var projectID = opt.params.row[opt.params.prikey.toLowerCase()];
                var where = (opt.params.prikeyName ?  (opt.params.prikeyName + " = '") : "projectID = '" ) + projectID + "'";
                var params = {
                    url: opt.serviceUrl,
                    layerTable: opt.layerTable,
                    where: where,
                    fields: opt.params.prikeyName || "projectId"
                };
                if (opt.isPoint === "false") {
                    params.style = {color: 'red', opacity: '1'};
                } else {
                    params.style = {
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [20, 20]
                    };
                }
                map._mapInterface.addLayerForService(params, function (layers) {
                    var param = {
                        content: opt.metadata,
                        obj: opt.params.row,
                        title: opt.title,
                        isSort: opt.isSort,
                    };
                    if (opt.isCheck && opt.isCheck === "false") {
                        _this._createPopup(param, layers);
                    } else {
                        _this.createPopup($.extend({}, param, {
                            field: opt.params.prikey,
                            tableName: opt.tableName
                        }), layers);
                    }
                }, notChangeZoom);
            }
        },
        /**
         * 需要修改的Popup
         * @param option
         * @param layer
         */
        createPopup: function (option, layer) {
            var _this = this, btnId;
            var url = auGurit.global.rootPath + "datacatalog/getChangeData/" + option.content[Object.keys(option.content)[0]].tableid;
            var html = "<div class='layer-popupContainer'><h3 class='title'>" + option.title + "</h3></div><div class='fieldContainer'>";
			if(option.isSort) {
			    // 该段代码没有测试过
				for(var i in option.content) {
					var fieldsObj = option.content[i];
					if (fieldsObj && fieldsObj.visible == "1") {
						var dd = fieldsObj.dd ? fieldsObj.dd : "";
						var type = fieldsObj.type ? fieldsObj.type : "";
						var key, value;
						if (dd != "") {
							var ddCopy = JSON.parse(dd);
							value = option.obj[i.toLowerCase()] ? ddCopy[option.obj[i.toLowerCase()]] : "";
						} else {
							value = option.obj[i.toLowerCase()] ? option.obj[i.toLowerCase()] : "";
						}
						if (fieldsObj.unit)
							key = fieldsObj.cname + "(" + fieldsObj.unit + ")";
						else
							key = fieldsObj.cname;
						html += "<div class='input-group'><span class='input-group-addon' type = '" + type + "' dd = '" + dd + "' name = '" + i + "' editable = '" + fieldsObj.editable + "'>" + key + "</span><input class='form-control readOnly' disabled='disabled' value='" + value + "'></div>";
					}
				}
			} else {
				for (var i in option.obj) {
					var fieldsObj = option.content[i.toUpperCase()];
					if (fieldsObj && fieldsObj.visible == "1") {
						var dd = fieldsObj.dd ? fieldsObj.dd : "";
						var type = fieldsObj.type ? fieldsObj.type : "";
						var key, value;
						if (dd != "") {
							var ddCopy = JSON.parse(dd);
							value = option.obj[i] ? ddCopy[option.obj[i]] : "";
						} else {
							value = option.obj[i] ? option.obj[i] : "";
						}
						if (fieldsObj.unit)
							key = fieldsObj.cname + "(" + fieldsObj.unit + ")";
						else
							key = fieldsObj.cname;
						html += "<div class='input-group'><span class='input-group-addon' type = '" + type + "' dd = '" + dd + "' name = '" + i.toUpperCase() + "' editable = '" + fieldsObj.editable + "'>" + key + "</span><input class='form-control readOnly' disabled='disabled' value='" + value + "'></div>";
					}
				}
			}

            //  兼容Identify查询
            if (option.leaflet_id) {
                btnId = "btnId = '" + option.leaflet_id + "'";
            } else {
                btnId = "";
            }
            html += "</div><div class ='popup_tools'><p>该记录已于 <span class = 'dtupdt'></span> 执行了修改。</p><div class='input-group'><span class='input-group-addon'>其它问题</span><input class='form-control'></div><div><span class='edit' " + btnId + ">数据报错</span><span class='back' " + btnId + ">取消</span><span class='save' " + btnId + ">保存</span><span><a href='" + url + "' target='_blank'  style='display: none;'>查看修改记录</a></span></div></div><input type='hidden' id='metaDataId' />";
            layer.bindPopup(html, {minWidth: "430px"});
            _this.popupEvent(option);
            layer.getPopup().on('add', function (e) {
                 _this.popupEvent(option);
            });
        },
        /**
         * 不需要修改的Popup
         * @param obj
         * @param layer
         * @private
         */
        _createPopup: function (option, layer) {
            var html = "<div class='layer-popupContainer'><h3 class='title'>" + option.title + "</h3></div><div class='fieldContainer'>";
            if(option.isSort) {
                for(var i in option.content) {
					var fieldsObj = option.content[i];
					if (fieldsObj && fieldsObj.visible == "1") {
						var value = option.obj[i.toLowerCase()] ? option.obj[i.toLowerCase()] : "", key;
						if (fieldsObj.unit)
							key = fieldsObj.cname + "(" + fieldsObj.unit + ")";
						else
							key = fieldsObj.cname;
						html += "<div class='input-group'><span class='input-group-addon'  name = '" + i.toUpperCase() + "' >" + key + "</span><input class='form-control readOnly' disabled='disabled' value='" + value + "'></div>";
					}
                }
            } else {
				for (var i in option.obj) {
					var fieldsObj = option.content[i.toUpperCase()];
					if (fieldsObj && fieldsObj.visible == "1") {
						var value = option.obj[i] ? option.obj[i] : "", key;
						if (fieldsObj.unit)
							key = fieldsObj.cname + "(" + fieldsObj.unit + ")";
						else
							key = fieldsObj.cname;
						html += "<div class='input-group'><span class='input-group-addon'  name = '" + i.toUpperCase() + "' >" + key + "</span><input class='form-control readOnly' disabled='disabled' value='" + value + "'></div>";
					}
				}
            }

            layer.bindPopup(html, {minWidth: "430px"});
        },
        /**
         * 按钮事件
         * @param option
         * 兼容Identify查询
         */
        popupEvent: function (option) {
            var _this = this;
            var mapBody = document.getElementById("desktop-main-map").contentWindow.document.getElementsByTagName("body")[0];
            $(mapBody).find(".popup_tools .input-group").hide().end().find("p").hide();
            $(mapBody).find(".popup_tools").find(".edit").bind("click", function () {
                if (option._leaflet_id) {
                    if ($(this).attr("btnId") == option._leaflet_id + "")
                        _this.editData($(this), option)
                } else {
                    _this.editData($(this), option)
                }
            });
            $(mapBody).find(".popup_tools").find(".back").on('click', function () {
                if (option._leaflet_id) {
                    if ($(this).attr("btnId") == option._leaflet_id + "")
                        _this.rollBack($(this));
                } else {
                    _this.rollBack($(this));
                }
            });
            $(mapBody).find(".popup_tools").find(".save").on('click', function () {
                if (option._leaflet_id) {
                    if ($(this).attr("btnId") == option._leaflet_id + "")
                        _this.saveData($(this), option);
                } else {
                    _this.saveData($(this), option);
                }
            });
        },
        /**
         * 回滚数据
         * @param $Btn
         */
        rollBack: function ($Btn) {
            var $fieldContainer = $Btn.parents(".popup_tools").siblings(".fieldContainer");
            var $inputClones = $fieldContainer.find(".input-group>.inputClone");
            if ($inputClones.length > 0) {
                $inputClones.hide();
            }
            $.each($inputClones, function (i, $inputClone) {
                $($inputClone).val($($inputClone).attr("cancelValue"));// 用于cancel时值的还原
            });
            var $selects = $fieldContainer.find(".input-group>select");
            if ($selects.length > 0) {
                $selects.hide();
            }
            $.each($selects, function (i, $select) {
                $($select).val($($select).attr("cancelValue")).find("option[value='" + $($select).attr("cancelValue") + "']").attr("selected", true);// 用于cancel时值的还原
            });
            $Btn.parents(".popup_tools").find(".input-group").hide().end().find("p").hide();
            // 样式调整
            $fieldContainer.find(".input-group-addon[editable=0]").siblings("input").css("width", "196px");

        },
        /**
         * 保存数据
         * @param url
         * @returns {boolean}
         */
        saveData: function ($Btn, option) {
            var _this = this;
            if (!$Btn.parents(".popup_tools").children(".input-group").is(':visible')) {
                alert("请先编辑数据，再进行保存");
                return false;
            }
            var $fieldContainer = $Btn.parents(".popup_tools").siblings(".fieldContainer");
            var inputClones = {};
            // 不可编辑的属性
            var $spans = $fieldContainer.find(".input-group-addon[editable=0]");
            $.each($spans, function (i, $span) {
                inputClones[$($span).attr("name")] = $($span).siblings("input").val();
            });
            // 可编辑的select属性
            var $selects = $fieldContainer.find("select");
            $.each($selects, function (i, $select) {
                inputClones[$($select).siblings("span").attr("name")] = $($select).find("option:selected").attr("key");
                $($select).attr("cancelValue", $($select).find("option:selected").text()); // 用于cancel时值的还原
            });
            // 可编辑的input属性
            var $inputClones = $fieldContainer.find(".inputClone");
            $.each($inputClones, function (i, $inputClone) {
                inputClones[$($inputClone).siblings("span").attr("name")] = $($inputClone).val();
                $($inputClone).attr("cancelValue", $($inputClone).val()); // 用于cancel时值的还原
            });
            inputClones["REMARK"] = $fieldContainer.parent().find(".popup_tools input").val();// 其它问题
            inputClones["DTUPDT"] = new Date().format("yyyy-MM-dd hh:mm:ss"); // 当前时间
            var id = $($fieldContainer.find("span[name=" + option.field + "]")[0]).siblings("input").val();
            var metaData = {};
            for (var i in option.content) {
                metaData[i] = option.content[i].cname;
            }
            var $metaDataId = $fieldContainer.siblings("#metaDataId");
            var metaDataId = $metaDataId.val() != "" || $metaDataId.val() != null ? $metaDataId.val() : null;
            var obj = {
                tableName: option.tableName,
                priField: option.field,
                priValue: id,
                fieldDescription: JSON.stringify(metaData),
                origValue: JSON.stringify(_this.keyToUpperCase(option.obj)),
                modiValue: JSON.stringify(inputClones),
                remark: inputClones["REMARK"],
                id: metaDataId
            };
            $.ajax({
                url: auGurit.global.rootPath + "/metadataEdit/saveMetadata",
                type: 'post',
                data: obj,
                success: function (r) {
                    r = JSON.parse(r);
                    if (r.content && r.content != null) {
                        $metaDataId.val(r.content);
                    }
                    $($fieldContainer).siblings(".popup_tools").find("span.dtupdt").html(new Date().format("yyyy-MM-dd hh:mm:ss"));
                    $($fieldContainer).siblings(".popup_tools").children("p").show();
                    if(r.success){
                    	alert("保存成功！");
                    }else{
                    	alert("保存失败！");
                    }
                },
                error: function (r) {
                    console.info(r);
                    alert("保存失败");
                }
            });
        },
        keyToUpperCase: function (obj) {
            var newObj = {};
            if (obj) {
                for (var i in obj) {
                    newObj[i.toUpperCase()] = obj[i];
                }
            }
            return newObj;
        },
        /**
         *  开始编辑数据
         * @param $Btn
         * @param option
         */
        editData: function ($Btn, option) {
            var _this = this;
            var $fieldContainer = $Btn.parents(".popup_tools").siblings(".fieldContainer");
            if ($fieldContainer.find(".input-group>.inputClone").length > 0) {
                $fieldContainer.find(".input-group>.inputClone").show();
                $fieldContainer.find(".input-group>select").show();
                if ($($fieldContainer).siblings(".popup_tools").find("span.dtupdt").html() != "") {
                    $($fieldContainer).siblings(".popup_tools").children("p").show();
                }
            } else {
                // 构建编辑框
                var $inputs = $fieldContainer.find(".input-group>input");
                $.each($inputs, function (i, $input) {
                    if ($($input).siblings("span").attr("editable") == "1") { // 可编辑
                        var DD = $($input).siblings("span").attr("dd");
                        var $inputClone;
                        if (DD == "") { // 数据字典对值域进行了限制
                            $inputClone = $($input).clone().addClass("inputClone").removeAttr("disabled").removeClass("readOnly");
                            $inputClone.attr("cancelValue", $($inputClone).val()); // 用于cancel时值的还原
                        } else {
                            var DD_json = JSON.parse(DD);
                            $inputClone = $("<select class='form-control'><option value =''></option></select>");
                            $.each(DD_json, function (key, value) {
                                $("<option key ='" + key + "' value ='" + value + "'>" + value + "</option>").appendTo($inputClone);
                            });
                            if ($($input).val() != "") {
                                $inputClone.find("option[value='" + $($input).val() + "']").attr("selected", true);
                            }
                            $inputClone.attr("cancelValue", $($inputClone).find("option:selected").text()); // 用于cancel时值的还原
                        }
                        $inputClone.insertAfter($($input));
                    }
                });
                $($fieldContainer).siblings(".popup_tools").children("p").hide();
                var id = $($fieldContainer.find("span[name=" + option.field + "]")[0]).siblings("input").val();
                _this.getTempTableData({
                    "params": option.tableName + "/" + option.field + "/" + id, //  查询已修改信息参数
                    "$fieldContainer": $fieldContainer,
                    "content": option.content   //  源数据
                });
            }
            $Btn.parents(".popup_tools").find(".input-group").show();
            // 样式调整
            $fieldContainer.find(".input-group-addon[editable=0]").siblings("input").css("width", "213px");
        },
        /**
         * 获取临时表的数据，并填充至编辑框
         * @param option
         */
        getTempTableData: function (option) {
            $.post(auGurit.global.rootPath + "/metadataEdit/findMetadata/" + option.params, function (data) {
                if (data) {
                    var result = JSON.parse(data);
                    if (result.success) {
                        if (result.content && result.content['modiValue']) {
                            var obj = eval('(' + result.content['modiValue'] + ')'), DTUPDT = "";
                            $.each(obj, function (key, value) {
                                if (key == " ") {
                                    option.$fieldContainer.siblings(".popup_tools").find(".input-group>input").val(value);
                                } else if (key == "DTUPDT") {
                                    option.$fieldContainer.siblings(".popup_tools").find("span.dtupdt").html(value);
                                }
                                var $span = option.$fieldContainer.find("span[name=" + key + "]")[0];
                                if ($($span).attr("dd") == "") {
                                    $($span).siblings("input.inputClone").val(value).attr("cancelValue", value); // 用于cancel时值的还原;
                                } else {
                                    var fieldsObj = option.content[key.toUpperCase()];
                                    if (fieldsObj) {
                                        var dd = fieldsObj.dd ? fieldsObj.dd : "";
                                        var text;
                                        if (dd != "") {
                                            var ddCopy = JSON.parse(dd);
                                            text = obj[key] ? ddCopy[obj[key]] : "";
                                        } else {
                                            text = obj[key] ? obj[key] : "";
                                        }
                                        $($span).siblings("select").val(text).find("option[key=" + value + "]").attr("selected", true).end().attr("cancelValue", text); // 用于cancel时值的还原
                                    }
                                }
                            });
                            if (result.content['id']) {
                                option.$fieldContainer.siblings("#metaDataId").val(result.content['id']);
                            }
                            option.$fieldContainer.siblings(".popup_tools").children("p").show();
                        }
                        return;
                    }
                }
                alert("编辑信息获取失败");
            });
        },
        /**
         * @param layer
         * @param selectFlag    // 1:正选,0:反正
         */
        setLayerStyle: function (layer, selectFlag) {
            var map = $("#desktop-main-map")[0].contentWindow.map;
            if (layer.features.geometry.type == "Point" || layer.features.geometry.type == "POINT") {
                var _layer = layer._layers[Object.keys(layer._layers)[0]];
                if (selectFlag) {
                    _layer.style = {
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.gif",
                        "iconSize": [20, 20]
                    };
                } else {
                    _layer.style = {
                        "iconUrl": auGurit.global.rootPath + "/style/asip/common/css/images/icon/info_locat.png",
                        "iconSize": [20, 20]
                    };
                }
                map._mapInterface.setFeatureStyle(_layer);
            } else {
                if (selectFlag) {
                    layer.setStyle({color: 'red', opacity: '1'});
                } else {
                    layer.setStyle({color: '#FFFF00', opacity: '1'});
                }
            }
        },
        /**
         *清除全局变量auGurit.global.mapLayers中存储的layer
         * @param title
         */
        removeGlobalMapLayers: function (title) {
            var map = $("#desktop-main-map")[0].contentWindow.map;
            var _mapLayers = auGurit.global.mapLayers[title];
            if (_mapLayers) {
                if (Object.prototype.toString.call(_mapLayers) === '[object Array]') {
                    for (var k in _mapLayers) {
                        map.removeLayer(_mapLayers[k]);
                    }
                } else {
                    map.removeLayer(_mapLayers);
                }
                //清除智能标注
                if (map.options.renderer._textList) {
                    map.options.renderer._update();
                }
            }
            auGurit.global.mapLayers[title] = null;            
        }
    };

    Date.prototype.format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    return mapUtils;
})
;
