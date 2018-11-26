define(["jquery","durandal/app","durandal/composition","knockout",],function ($, app,composition,ko) {

    var info = {
        init: function () {
            var that = this;
            composition.addBindingHandler("dataExplainInitHandler", {
                init: function (dom) {
                    that.renderUI();
                    /*that.bindUI();*/
                    console.log(dom);

                },
                update: function () {
                }
            });
        },
        renderUI: function () {

            $.ajax({
                url:agsupportUrl+"/submenu/getSubmenu/"+model._$_param["id"],
                type:"GET",
                data: {},
                success: function (result) {
                    //console.log("返回结果:"+result);
                    //console.log(typeof result);
                    var jsonObject = $.parseJSON( result );  //可以将json字符串转换成json对象
                    model.itemTitle(jsonObject.content.submenuName);
                    var content = jsonObject.content.submenuRemark;
                    if(!content){
                        model.htmlContent("暂无数据说明！")
                    }else {
                        // 数据量多时把高度变成自动高度
                        var a = content.replace(/<\/?.+?>/g,"");
                        var b = a.replace(/ /g,"");//b为得到后的内容
                        // console.log("不包括格式标签的文本长度:"+b.length+"----不包括格式标签的文本长度:"+content.length);
                        //console.log(b+"----"+content);
                        if(b.length>200){
                            $(".dataExplainBox").removeClass("dataExplainBox_height");
                        }else {
                            $(".dataExplainBox").addClass("dataExplainBox_height");
                        }
                        model.htmlContent(jsonObject.content.submenuRemark);
                    }

                }
            });
        },
      /*  bindUI: function () {
            var that = this;
            modal._$_param.parent.setCurrentPage(modal._$_param.menu.id, that);
        },*/
    }
    var model = {
        itemTitle:ko.observable(),
        htmlContent:ko.observable(),

    }
    info.init();
    return model;

});