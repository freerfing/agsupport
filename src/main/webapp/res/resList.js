define(["jquery", "durandal/app", "durandal/composition", "knockout", "layer", "bootstrapTableZhCN"],
    function ($, app, composition, ko, layer) {
        var resList = {
            init: function() {
                var that = this;
                composition.addBindingHandler("initResListHandler", {
                    init: function() {
                        that.resetModel();
                        that.initResList();
                    },
                    update: function() {}
                });
            },
            initResList: function() {
                var url, resType = modal.resType(), columns;
                if(resType === 1) {
                    url = '/agsupport/resources/listAllLayers';
                    columns = [{
                        field: 'nameCn',
                            title: '服务名称'
                    }, {
                        field: 'illustration',
                            title: '说明'
                    }, {
                        field: 'dataSource',
                            title: '数据来源'
                    }, {
                        field: 'dataVersion',
                            title: '数据版本'
                    }, {
                        field: 'coordinateSystem',
                            title: '坐标系'
                    }];
                } else if(resType === 2) {
                    url = '/agsupport/awater/dataresources/listAllResources';
                    columns = [{
                        field: 'serviceName',
                        title: '服务名称'
                    }, {
                        field: 'description',
                        title: '服务说明'
                    }, {
                        field: 'publishTime',
                        title: '发布时间'
                    }, {
                        field: 'publishMan',
                        title: '发布人'
                    }];
                } else if(resType === 3) {
                    url = '/agsupport/awater/fileCollection/listAllByDirIds';
                    columns = [{
                        field: 'name',
                        title: '文件集名称'
                    }, {
                        field: 'remark',
                        title: '文件集说明'
                    }, {
                        field: 'createTime',
                        title: '创建时间'
                    }, {
                        field: 'creatorName',
                        title: '创建人'
                    }];
                }

                $('#mapResTable').bootstrapTable({
                    url: url,         //请求后台的URL（*）
                    method: 'post',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    toolbar: '#mapResToolbar',                //工具按钮用哪个容器
                    striped: true,                      //是否显示行间隔色
                    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: false,                   //是否显示分页（*）
                    sortable: true,                     //是否启用排序
                    sortOrder: "asc",                   //排序方式
                    queryParams: function(params) {
                        return {
                            dirId: modal.dirId(),
                            searchText: modal.searchText()
                        };
                    },
                    responseHandler: function(data) {
                        var i, res, j, row, result = {
                            success: true,
                            rows: []
                        };
                        if(data.success) {
                            res =  data.content;
                            if(resType === 1) {
                                res = res || [];
                                for(i in res) {
                                    var djson = JSON.parse(res[i].data);
                                    result.rows.push({
                                        nameCn: res[i].nameCn,
                                        dataSource: djson.dataSource,
                                        coordinateSystem: djson.coordinateSystem,
                                        dataVersion: djson.dataVersion,
                                        illustration: res[i].illustration
                                    });
                                }
                            } else {
                                res = (res && res.list) ? res.list : [];
                                for(i in res) {
                                    row = {};
                                    for(j=0; j<columns.length; j++) {
                                        row[columns[j].field] = res[i][columns[j].field];
                                    }
                                    result.rows.push(row);
                                }
                            }
                        }
                        return result;
                    },
                    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                    search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                    strictSearch: true,
                    showColumns: true,                  //是否显示所有的列
                    showRefresh: true,                  //是否显示刷新按钮
                    minimumCountColumns: 2,             //最少允许的列数
                    clickToSelect: true,                //是否启用点击选中行
                    height: 900,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                    uniqueId: "id",                     //每一行的唯一标识，一般为主键列
                    showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
                    cardView: false,                    //是否显示详细视图
                    detailView: false,                   //是否显示父子表
                    columns: columns
                });
            },
            resetModel: function() {
                modal.searchText('');
                if(modal._$_param["resType"]) {
                    modal.resType(modal._$_param["resType"]);
                }
                modal.dirId(modal._$_param["dirId"]);
                modal.mapList([]);
                modal.dataList([]);
                modal.fileList([]);
            },
        };

        var modal = {
            resType: ko.observable(1),
            dirId: ko.observable(),
            searchText: ko.observable(""),
            mapList: ko.observableArray([]),
            dataList: ko.observableArray([]),
            fileList: ko.observableArray([]),
            OpenExportDataDialog: function() {
                layer.open({
                    type: 1,
                    content: $('#exportDataContainer'),
                    area: ['500px'],
                    btn: ['导出', '取消'],
                    yes: function(index) {
                        var resTypes = '';
                        $("input[name='resTypes']:checkbox").each(function() {
                            if($(this).is(":checked")) {
                                resTypes += $(this).attr("value")+",";
                            }
                        });
                        if(resTypes.length > 1) {
                            resTypes = resTypes.substring(0, resTypes.length-1);
                        }

                        $.ajax({
                            url: agsupportUrl + "/resources/export",
                            type:"post",
                            dataType:"json",
                            data: {
                                resTypes: resTypes,
                                searchText: $("#exportDataSearchText").val()
                            },
                            success: function (data) {
                                //
                            }
                        });
                        layer.close(index);
                    }
                });
            },
            onSearchClick: function () {
                resList.initResList();
            },
            onSearchEnter: function (d, e) {
                if (e.keyCode == 13) {
                    modal.onSearchClick();
                }

                return true;
            }
        };

        resList.init();

        return modal;
    });