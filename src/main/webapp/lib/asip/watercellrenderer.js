define(["jquery", "http"], function($, http){

    return  {
        //水闸类别
        sltpTp: function(index, datafield, value, defaultvalue, column, rowdata){

            var cellTxt = "";

            var mapType = {

                "1": "进水闸",
                "2": "退水闸",
                "3": "节制闸",
                "4": "挡潮闸",
                "5": "船闸",
                "9": "其他"

            }

            cellTxt = mapType[value];
            if(cellTxt == null || cellTxt == undefined)
            {
                cellTxt = "";
            }

            return "<div style='text-align:center; line-height:24px; height:24px'>" + cellTxt + "</div>";

        },

        //泵站类别
        idsttpType: function(index, datafield, value, defaultvalue, column, rowdata){

            var cellTxt = "";

            var mapType = {

                "1": "大型机配排灌站",
                "2": "中型机配排灌站",
                "3": "小型机配排灌站",
                "4": "大型电配排灌站",
                "5": "中型电配排灌站",
                "6": "小型电配排灌站",
                "9": "其他"

            }
            
            cellTxt = mapType[value];
            if(cellTxt == null || cellTxt == undefined)
            {
                cellTxt = "";
            }

            return cellTxt;
        },

        //工程规模
        prscType: function(index, datafield, value, defaultvalue, column, rowdata){

            var cellTxt = "";

            var mapType = {

                "1": "大(1)型",
                "2": "大(2)型",
                "3": "节制闸",
                "4": "小(1)型",
                "5": "小(2)型"

            }

            cellTxt = mapType[value];
            if(cellTxt == null || cellTxt == undefined)
            {
                cellTxt = "";
            }

            return "<div style='text-align:center; line-height:24px; height:24px'>" + cellTxt + "</div>";
        },

        //工程状态
        prstType: function(index, datafield, value, defaultvalue, column, rowdata){

            var cellTxt = "";

            var mapType = {

                "1": "在建",
                "2": "已建",
                "9": "其它"

            }

            cellTxt = mapType[value];
            if(cellTxt == null || cellTxt == undefined)
            {
                cellTxt = "";
            }

            return "<div style='text-align:center; line-height:24px; height:24px'>" + cellTxt + "</div>";
        },

        //工程等别
        prgrType: function(index, datafield, value, defaultvalue, column, rowdata){

            var cellTxt = "";

            var mapType = {

                "1": "I",
                "2": "Ⅱ",
                "3": "Ⅲ",
                "4": "Ⅳ",
                "5": "V"

            }

            cellTxt = mapType[value];
            if(cellTxt == null || cellTxt == undefined)
            {
                cellTxt = "";
            }

            return "<div style='text-align:center; line-height:24px; height:24px'>" + cellTxt + "</div>";
        },

        //主要建筑物级别
        mnblgrType: function(index, datafield, value, defaultvalue, column, rowdata){

            var cellTxt = "";

            var mapType = {

                "1": "1",
                "2": "2",
                "3": "3",
                "4": "4",
                "5": "5"

            }

            cellTxt = mapType[value];
            if(cellTxt == null || cellTxt == undefined)
            {
                cellTxt = "";
            }

            return "<div style='text-align:center; line-height:24px; height:24px'>" + cellTxt + "</div>";
        },

        //归属部门
        blsysType: function(index, datafield, value, defaultvalue, column, rowdata){

            var cellTxt = "";

            var mapType = {

                "1": "水利",
                "2": "能源",
                "3": "交通",
                "4": "农业",
                "5": "建设",
                "6": "国企",
                "9": "其他",

            }

            cellTxt = mapType[value];
            if(cellTxt == null || cellTxt == undefined)
            {
                cellTxt = "";
            }

            return "<div style='text-align:center; line-height:24px; height:24px'>" + cellTxt + "</div>";
        },

        //查询元数据
        queryMetadata:function(table, callback)
        {

            //http://172.16.34.55/awater/metadata/getFieldsByTableName/WRP_RVR_BSIN
            var url = "metadata/getFieldsByTableName/" + table;
            var getMeteoService = http.getInstance(url);
            getMeteoService.ajax().then(function (data) {

                var prikey = "";
                var cols = [];
                //列处理
                for(var key in data)
                {

                    if(data[key].prikey == "1")
                    {
                        prikey = key;
                    }

                    if(data[key].visible != 1)
                        continue;

                    var fieldText = data[key].cname;
                    if(data[key].unit)
                    {
                        fieldText = fieldText + "(" + data[key].unit + ")";
                    }

                    var col = {
                        id: key.toLowerCase(),
                        text: fieldText,
                        datafield: key.toLowerCase(),
                        width: "100",
                        align: "center",
                        cellsalign: "center",
                        //hidden: true,
                        cellsrenderer: null,
                        order: parseInt(data[key].dispsort) 
                    }

                    //cellsrenderer: w.sltpTp,
                    if(data[key].dd)
                    {

                        var typeJson = {}
                        try
                        {
                            typeJson = JSON.parse(data[key].dd);
                        }
                        catch(e)
                        {
                            typeJson = {};
                            console.error(data[key].dd);
                        }
                        
                        col.cellsrenderer = function(index, datafield, value, defaultvalue, column, rowdata){

                            var cellTxt = "";

                            var mapType = typeJson;

                            cellTxt = mapType[value];
                            if(cellTxt == null || cellTxt == undefined)
                            {
                                cellTxt = "";
                            }

                            return "<div style='text-align:center; line-height:24px; height:24px'>" + cellTxt + "</div>";

                        }
                    }

                    //jgxgrid 用sort会报错
                    if(key.toLowerCase() == "sort")
                    {
                        col.id = "ag_sort";
                        col.datafield = "ag_sort";
                        col.cellsrenderer = function(index, datafield, value, defaultvalue, column, rowdata){
                            return datafield["sort"];
                        }

                    }

                    cols.push(col);

                }

                //排序
                cols.sort(function(col1, col2){
                    return (col1.order > col2.order) ? 1 : -1 ;
                });

                cols[0].width = "155";
                cols[1].width = "155";

                callback(cols, prikey, data);

            });

        }

    }

})

