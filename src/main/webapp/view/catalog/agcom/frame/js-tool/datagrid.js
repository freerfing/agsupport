/**
 * @author Hunter 2013.12.05
 */
//事件注册
var easyEventRegist = {};
//解决翻页控件参数不变的问题
var easyParamRegist = {};

/**
 * grid加载函数
 * @param {} url    后台查询接口路径
 * @param {} param    分页参,数如{start: 1, limit:10}
 * @param {} formId 用于查询的formId
 * @param {} grid 用于显示的girdId
 * @param {} pagination 分页控件的ID, 可空
 */
function reload(url, param, form, grid, pagination, params, method) {
    if (form) {
        if (typeof(form) == 'string') form = $('#' + form);
        var formparam = jsonform(form);
        param = param ? $.extend(param, formparam) : formparam;
    } else {
        param = param ? param : {};
    }
    //start 检查查询参数的合法性 防止输入非法字符
    var paramStr = JSON.stringify(param);
    if (paramStr.indexOf('%') >= 0) {
        if(paramStr.indexOf('sellayer') < 0){
            $.messager.alert('提示', '查询条件含有非法字符，请重新输入！', 'info');
            return;
        }
    }
    //end
    if (typeof(grid) == 'string') grid = $('#' + grid);
    if (grid[0].className.indexOf('easyui-treegrid') != -1) {
        var opts = grid.treegrid('options');
    } else {
        var opts = grid.datagrid('options');
    }

    //changed by sf 20171113
    opts.url = url;
    opts.pageNumber = 1;

    if (opts.pageNumber < 1) opts.pageNumber = 1;	//兼容easyui-1.5.1
    //考虑三种情况 1.page控件 2.自带page 3.无page的情况
    var page = null;
    if (pagination) {
        if (typeof(pagination) == 'string') pagination = $('#' + pagination);
        page = pagination;
    } else if (opts.pagination) {
        if (grid[0].className.indexOf('easyui-treegrid') != -1) {
            page = grid.treegrid('getPager');
        } else {
            page = grid.datagrid('getPager');

        }

    }
    if (page != null && page.length == 1) {
        var eventName = grid[0].id + "_onSelectPage";
        grid.data('url', url);
        grid.data('param', param);
        grid.data('params', params);
        if (!easyEventRegist[eventName]) {
            var pageParams = {
                onSelectPage: function (pageNumber, pageSize) {
                    var url = grid.data('url');
                    var param = grid.data('param');
                    var params = grid.data('params');
                    if (pageNumber < 1) pageNumber = 1;
                    $.extend(param, {start: (pageNumber - 1) * pageSize + 1, limit: pageSize});
                    $.extend(param, {page: pageNumber, rows: pageSize});//新版iopus框架参数依赖分页参数
                    opts.queryParams = param;
                    param.start = null;

                    reload(url, param, form, grid, pagination, params);
                },
                row: null,
                onBeforeRefresh: function () {
                    if (grid[0].className.indexOf('easyui-treegrid') != -1) {
                        row = grid.treegrid('getSelected');
                    } else {
                        row = grid.datagrid('getSelected');
                    }

                },
                onRefresh: function () {
                    if (!row) return;
                    if (grid[0].className.indexOf('easyui-treegrid') != -1) {
                        var index = row.id;
                        setTimeout(function () {

                            grid.treegrid('select', index);
                        }, 100);
                    } else {
                        var index = grid.datagrid('getRowIndex', row);
                        setTimeout(function () {

                            grid.datagrid('selectRow', index);
                        }, 100);
                    }

                }
            };
            if (params != null) {
                $.extend(pageParams, params);
            }
            page.pagination(pageParams);
            easyEventRegist[eventName] = true;
            if (!param.start || param.start == 0) param.start = 1;
            opts.url = url;
            opts.queryParams = param;
        }
        var pageNumber = opts.pageNumber;
        var pageSize = opts.pageSize;
        if (!param.start) {
            param.start = (pageNumber - 1) * pageSize + 1;
        } else {
            page.pagination('refresh', {total: 1, pageNumber: 1});
        }
        if (!param.limit) {
            param.limit = pageSize;
        }
        //新版iopus框架参数依赖分页参数start
        if (!param.page) {
            param.page = Math.ceil(param.start / pageSize);
        }
        if (!param.rows) {
            param.rows = pageSize;
        }
        //新版iopus框架参数依赖分页参数end
    }
    if (typeof(WaitBar) != 'undefined') WaitBar.show();
    var callback = function (data) {
        if (typeof(WaitBar) != 'undefined') WaitBar.hide();
        if (page != null && page.length == 1) {
            var popt = page.pagination('options');
            if (popt.total != data.total) {
                page.pagination('refresh', {total: data.total});
            }
            //解决翻页后index列总是从1开始的问题
            opts.pageNumber = popt.pageNumber;
            opts.pageSize = popt.pageSize;
        }
        if (grid[0].className.indexOf('easyui-treegrid') != -1) {
            //2017-08-15强制将总数设置为查询结果总数
            $.data(grid[0], "treegrid").total = data.total;
            grid.treegrid('loadData', data);
        } else {
            grid.datagrid('loadData', data);
        }
    };
    //changed by sf 20171113
   // if (method && method.toLowerCase() == 'post') {
   //     jQuery.post(url, $.param(param, true), callback);
   // } else {
   //     jQuery.getJSON(url, $.param(param, true), callback);
  //  }
    if (method && method.toLowerCase() == 'post') {
		jQuery.post(url, $.param(param, true), callback);
	} else {
		jQuery.getJSON(url, $.param(param, true),callback);
	}
}

/**
 * 刷新
 * @param {} grid
 */
function gridrefresh(grid) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    var row = grid.datagrid('getSelected');
    var index = grid.datagrid('getRowIndex', row);
    if (typeof(refresh) == 'function') {
        refresh();
    } else {
        grid.datagrid('reload');
    }
    setTimeout(function () {
        grid.datagrid('selectRow', index);
        if (typeof(WaitBar) != 'undefined') WaitBar.hide();
    }, 150);
}

/**
 * 删除
 * @param {} url
 * @param {} grid
 */
function delrow(url, grid, callback) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    var ids = getSelKeyIds(grid);
    if (ids.length == 0) {
        $.messager.alert("消息", "至少选择一条记录!", "info");
        return;
    }
    $.messager.confirm('消息', '确定要删除吗？', function (r) {
        if (!r) return;
        $.getJSON(url,
            $.param({ids: ids}, true),
            function (data) {
                loadsubmit(data, function () {
                    if (data.message) {
                        $.messager.alert("消息", data.message, "info");
                    }
                    var rows = grid.datagrid('getSelections');
                    for (var i = 0; i < rows.length; i++) {
                        var index = grid.datagrid('getRowIndex', rows[i]);
                        grid.datagrid('deleteRow', index);
                    }
                    if (callback) callback(data);
                });
            }
        );
    });
}

/**
 * 拿到datagrid中的所有选中的id
 * @param {} grid
 * @return {} 以数组返回
 */
function getSelKeyIds(grid, keyName) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    var rows = grid.datagrid('getSelections');
    var ids = new Array();
    var key = "id";
    if (keyName) key = keyName;
    for (var i = 0; i < rows.length; i++) {
        ids.push(rows[i][key]);
    }
    return ids;
}

/**
 * 兼容旧名称
 * @return {}
 */
function CrudGridWin(json) {
    return $.extend(new SubWin(), json)
}

/**
 * dialog
 * @param {} json
 * @return {}
 */
function SubWin(json) {
    var _this = {
        saveUrl: null,
        inputUrl: null,
        parentGrid: null,
        form: null,
        window: null,
        param: null,
        onBeforeSave: null,
        afterUpdate: null,
        addOnOpen: null,
        updOnOpen: null,
        onBeforeSave: null,
        //以上参数必须入力
        title: function (title) {
            if (typeof(_this.window) == 'string') _this.window = $('#' + _this.window);
            _this.window.parent().find('.panel-title').html(title);
        },
        addEvent: function () {
            return {
                onBeforeOpen: function () {
                    _this.title('添加');
                },
                onOpen: function () {
                    //覆盖这个方法
                    if (typeof(_this.addOnOpen) == 'function') {
                        _this.addOnOpen();
                    }
                },
                onBeforeClose: function () {
                    clean($('#' + _this.form));
                    $('#' + _this.form).find('td label').html('');
                    gridrefresh(_this.parentGrid);
                }
            };
        },
        updEvent: function () {
            return {
                onBeforeOpen: function () {
                    _this.title('编辑');
                    var ids = getSelKeyIds(_this.parentGrid);
                    if (ids.length != 1) {
                        $.messager.alert('系统提示', "请选择一条要修改的记录!", 'info');
                        return false;
                    }
                },
                onOpen: function () {
                    if (typeof(_this.updOnOpen) == 'function') {
                        _this.updOnOpen();
                    }
                    var ids = getSelKeyIds(_this.parentGrid);
                    $.getJSON(_this.inputUrl,
                        {id: ids[0]},
                        function (data) {
                            loadsubmit(data, function (json) {
                                setTimeout(function () {
                                    $('#' + _this.form).form('load', json);
                                    if (typeof(_this.afterUpdate) == 'function') {
                                        _this.afterUpdate(json);
                                    }
                                    _this.formLoadSuccess(json);
                                }, 100);
                            });
                        }
                    );
                },
                onBeforeClose: function () {
                    clean($('#' + _this.form));
                    $('#' + _this.form).find('td label').html('');
                    gridrefresh(_this.parentGrid);
                }
            };
        },
        save: function (fn) {
            if (!$('#' + _this.form).form('validate')) {
                return;
            }
            if (typeof(_this.onBeforeSave) == 'function') {
                if (!_this.onBeforeSave()) return;
            }
            $.messager.progress({title: '请稍后', msg: '数据保存中...', interval: 600});
            $('#' + _this.form).form('submit', {
                url: _this.saveUrl,
                onSubmit: function () {
                    return $('#' + _this.form).form('validate');
                },
                success: function (data) {
                    $.messager.progress('close');
                    var obj = eval('(' + data + ')');
                    if (loadsubmit(obj)) {
                        if (obj.id) {
                            $('#' + _this.form).find('[name=id]').val(obj.id);
                        }
                        //新版iopus框架参数依赖
                        if (obj.content) {
                            $('#' + _this.form).find('[name=id]').val(obj.content);
                        }
                        if (fn) fn();
                        _this.title('编辑');
                        gridrefresh(_this.parentGrid);
                        //_this.close();
                    }
                }
            });
        },
        open: function (flag) {
            if (typeof(_this.window) == 'string') _this.window = $('#' + _this.window);
            var window = _this.window;
            if (flag == 'add') {
                if (_this.param) {
                    window.window($.extend(_this.param, _this.addEvent()));
                } else {
                    window.window(_this.addEvent());
                }
                window.window('open');
            } else if (flag == 'upd') {
                if (_this.param) {
                    window.window($.extend(_this.param, _this.updEvent()));
                } else {
                    window.window(_this.updEvent());
                }
                window.window('open');
            }
            //打开窗口后先清空所有的验证css
            setTimeout(function () {
                $('#' + _this.form).find('.validatebox-invalid').removeClass('validatebox-invalid');
            }, 100);
        },
        close: function () {
            if (typeof(_this.onBeforeClose) == 'function') {
                _this.onBeforeClose();
            }
            if (typeof(_this.window) == 'string') _this.window = $('#' + _this.window);
            _this.window.window('close');
        },
        collapse: function () {
            if (typeof(_this.window) == 'string') _this.window = $('#' + _this.window);
            _this.window.window('collapse');
        },
        formLoadSuccess: function (data) {
        }
    }
    $.extend(_this, json);
    return _this;
}

/**
 * 当前索引记录
 */
var easyIndexRegist = {};

/**
 * 获得当前索引
 * @param {} grid
 * @return {}
 */
function getEditIndex(grid) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    var name = grid[0].id + "_editIndex";
    var index = easyIndexRegist[name]
    return index;
}

/**
 * 设置当前索引
 * @param {} grid
 * @param {} index
 */
function setEditIndex(grid, index) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    var name = grid[0].id + "_editIndex";
    easyIndexRegist[name] = index;
}

/**
 * 结束编辑
 * @param {} grid
 * @return {Boolean}
 */
function endEditing(grid) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    var editIndex = getEditIndex(grid);
    if (editIndex == undefined) return true
    if (grid.datagrid('validateRow', editIndex)) {
        grid.datagrid('endEdit', editIndex);
        setEditIndex(grid, undefined);
        return true;
    } else {
        return false;
    }
}

function onDblClickRow(index) {
    var grid = $(this);
    var editIndex = getEditIndex(grid);
    if (editIndex != index) {
        if (endEditing(grid)) {
            grid.datagrid('selectRow', index).datagrid('beginEdit', index);
            setEditIndex(grid, index);
            //var ed = grid.datagrid('getEditor', {index:index,field:field});
            //if (ed != null) $(ed.target).focus();
        } else {
            grid.datagrid('selectRow', editIndex);
        }
    }
}

function append(grid) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    if (endEditing(grid)) {
        grid.datagrid('appendRow', {});
        var editIndex = grid.datagrid('getRows').length - 1;
        setEditIndex(grid, editIndex);
        grid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
    }
}

function remove(grid) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    var editIndex = getEditIndex(grid);
    if (editIndex == undefined) return;
    grid.datagrid('cancelEdit', editIndex).datagrid('deleteRow', editIndex);
    setEditIndex(grid, undefined);
}

function accept(grid) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    if (endEditing(grid)) {
        grid.datagrid('acceptChanges');
    }
}

function reject(grid) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    grid.datagrid('rejectChanges');
    setEditIndex(grid, undefined);
}

function getChanges(grid) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    endEditing(grid);
    var rows = grid.datagrid('getChanges');
    return rows;
}

/**
 * 相同连续列合并
 * @param {} grid
 * @param {} fields
 */
function autoMergeCells(grid, fields) {
    if (typeof(grid) == 'string') grid = $('#' + grid);
    var target = grid;
    if (!fields) {
        fields = target.datagrid("getColumnFields");
    }
    if (typeof(fields) == 'string') {
        fields = fields.split(/, */g);
    }
    var rows = target.datagrid("getRows");
    var i = 0,
        j = 0,
        temp = {};
    for (i; i < rows.length; i++) {
        var row = rows[i];
        j = 0;
        for (j; j < fields.length; j++) {
            var field = fields[j];
            var tf = temp[field];
            if (!tf) {
                tf = temp[field] = {};
                tf[row[field]] = [i];
            } else {
                var tfv = tf[row[field]];
                if (tfv) {
                    tfv.push(i);
                } else {
                    tfv = tf[row[field]] = [i];
                }
            }
        }
    }
    $.each(temp, function (field, colunm) {
        $.each(colunm, function () {
            var group = this;
            if (group.length > 1) {
                var before,
                    after,
                    megerIndex = group[0];
                for (var i = 0; i < group.length; i++) {
                    before = group[i];
                    after = group[i + 1];
                    if (after && (after - before) == 1) {
                        continue;
                    }
                    var rowspan = before - megerIndex + 1;
                    if (rowspan > 1) {
                        target.datagrid('mergeCells', {
                            index: megerIndex,
                            field: field,
                            rowspan: rowspan
                        });
                    }
                    if (after && (after - before) != 1) {
                        megerIndex = after;
                    }
                }
            }
        });
    });
}

/**
 * 读取ajax返回的数据结构
 *
 * data 返回数据
 * noError 不显示错误提示，默认false
 * noDebug 显示调试消息框，默认false
 * return true: 解析正确
 *        false:解析失败
 */
function loadsubmit(data, fn, noMsg, noDebug) {
    if (!data) {
        return false;
    }
    if (data.success) {
        var json = null;
        if (data.result && data.result.length > 0) {
            json = data.result[0];
        } else if (data.content) {
            json = data.content;
        } else {
            json = data;
        }
        var msg = data.message;
        if (fn) fn(json, msg);
        return true;
    } else {
        var msg = data.message;
        if (msg && !noMsg) {
            $.messager.error("错误", msg);
        } else {
            if (fn) fn();
        }
    }
    if (noDebug) {
        alert($.toJSON(data));
    }
    return false;
}

