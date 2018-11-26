<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ include file="../include/include.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="<%=basePath%>/agcom/gis/2dmap/augurit/dist/com.css"/>
    <style type="text/css">
        #print_header {
            display: none;
            text-align: center;
            width: 100%;
        }
        #print_remark {
            display: none;
            font-family:微软雅黑;
            font-size:12px;
            color:#333333;
            position: absolute;
            width: 100%;
            text-align: center;
            left: 0;
            bottom: 2px;
            white-space:normal;
            word-break:break-all;
            word-wrap:break-word;
        }

        @media print{
            #print_header {
                display: block;
                margin-top: 20px;
                height: 30px;
            }
            #print_remark {
                display: block;
                height: 30px;
            }
        }
    </style>
</head>
<body>
<div id="mainDiv">
    <!--搜索功能-->
    <div id="baiduMap" style="display: none"></div>

    <div id="settingDiv">
        <!-- Nav tabs -->
        <nav class="navbar navbar-default" role="navigatin">
            <div>
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#example-navbar-collapse">
                        <span class="sr-only">切换导航</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="example-navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#tab1" data-toggle="tab"><i class="fa fa-star-half-o"
                                                                                aria-hidden="true"></i>主题</a></li>
                        <li><a href="#tab2" data-toggle="tab"><i class="fa fa-puzzle-piece"
                                                                 aria-hidden="true"></i>微件</a></li>
                        <li><a href="#tab4" data-toggle="tab"><i class="fa fa-cogs" aria-hidden="true"></i> 构建</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Tab panes -->
        <div class="tab-content margin15_lr">
            <div role="tabpanel" class="tab-pane fade in active" id="tab1">
                <strong class="margin15_tb" styleHide>风格</strong>
                <div class="row margin15_lr style styleHide">
                    <div class="col-md-12 col-lg-6">
                        <div class="center">
                            <img src="<%=basePath%>/agcom/resources/images/topic1.png" alt="topic1"
                                 class="img-thumbnail">
                        </div>
                        <p>主题1</p>
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <div class="center">
                            <img src="<%=basePath%>/agcom/resources/images/topic1.png" alt="topic1"
                                 class="img-thumbnail">
                        </div>
                        <p>主题2</p>
                    </div>
                </div>
                <strong class="margin15_tb colorHide">颜色</strong>
                <div class="btn-toolbar margin15_lr color colorHide" role="toolbar">
                    <div class="btn-group btn-block">
                        <button type="button" class="btn color_darkBlue" colorclass="color_darkBlue"></button>
                        <button type="button" class="btn color_lightBlue" colorclass="color_lightBlue"></button>
                        <button type="button" class="btn color_darkgreen" colorclass="color_darkgreen"></button>
                    </div>
                    <div class="btn-group btn-block">
                        <button type="button" class="btn color_lightgreen" colorclass="color_lightgreen"></button>
                        <button type="button" class="btn color_grey" colorclass="color_grey"></button>
                        <button type="button" class="btn color_purple" colorclass="color_purple"></button>
                    </div>
                </div>
                <strong class="margin15_tb layoutHide">布局</strong>
                <div class="row margin15_lr layout layoutHide">
                    <div class="col-md-12 col-lg-6">
                        <div class="center composition" layoutclass="composition">
                            <img src="<%=basePath%>/agcom/resources/images/composition.png" alt="composition"
                                 class="img-thumbnail">
                        </div>
                        <p>合成</p>
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <div class="center independent" layoutclass="independent">
                            <img src="<%=basePath%>/agcom/resources/images/independent.png" alt="independent"
                                 class="img-thumbnail">
                        </div>
                        <p>独立</p>
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <div class="center nothing" layoutclass="nothing">
                            <img src="<%=basePath%>/agcom/resources/images/nothing.png" alt="nothing"
                                 class="img-thumbnail">
                        </div>
                        <p>无工具条</p>
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="tab2">
                <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><p>默认微件</p></a>
                            </h4>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse in">
                            <div class="panel-body" style="margin:0 auto;text-align:center;"></div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><p>
                                    工具栏微件(可拖放设为快捷键)</p></a>
                            </h4>
                        </div>
                        <div id="collapseTwo" class="panel-collapse collapse">
                            <div class="panel-body" style="margin:0 auto;text-align:center;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="tab4"></div>
        </div>

    </div>

    <div id="widgetsdropDiv">
        <div class='widgetsdropDiv_new'><i class='fa fa-plus'></i></div>
    </div>
    <div id="print_header"></div>
    <div id="contentDiv">
        <div id="mapDiv"></div>
        <div id="tableDivVisible"><i class="fa fa-angle-up"></i></div>
        <div id="tableDiv">
            <ul class="nav nav-tabs" role="tablist">
            </ul>

            <div class="tab-content">
            </div>
        </div>
        <div class="systemcolorDiv systemcolor" id="moreWidgets">
            <div class="moreWidgetsTitle">
                <i class="fa fa-times closePanel"></i>
            </div>
        </div>
        <!-- 时间轴 -->
        <div class="event_box">
            <div class="parHd clearfix">
            </div>
        </div>
    </div>
    <div id="print_remark"></div>


    <!-- 模态框（Modal） 用做系统的操作提示-->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">提示</h4>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
<script src="<%=basePath%>/agcom/resources/lib/js/echarts-2.2.7/build/source/echarts-all.js"></script>
<script src="<%=basePath%>/agcom/resources/lib/js/requireJs/require.js"></script>
<script src="../js/config.js"></script>
<script src="<%=basePath%>/agcom/gis/2dmap/augurit/dist/micmap.js"></script>

