// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/core/templates/ChartContainer.html":'\x3cdiv class\x3d"esriGEReportPlayer_chartContainer"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"chartLabel" class\x3d"chartContainer_chartLabel TrimWithEllipses"\x3e\x3c/div\x3e\r\n\r\n    \x3cdiv data-dojo-attach-point\x3d"chartNormalViewDiv"\x3e\r\n        \x3cdiv class\x3d"chartContainer_chartContainerWithAxis" data-dojo-attach-point\x3d"chartContainerWithAxis"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"chartContainerDiv"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"tableContainerDiv"\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"legendContainerDiv" class\x3d"chartContainer_legendContainer"\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"comparisonSelectBlock" class\x3d"chartContainer_comparisonSelectBlock"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"comparisonLabel" class\x3d"chartContainer_comparisonLabel"\x3e\x3c/div\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"comparisonSelectDiv" class\x3d"chartContainer_comparisonSelectDiv"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\r\n    \x3cdiv data-dojo-attach-point\x3d"errorDiv" class\x3d"esriGEReportPlayerErrorMessage"\x3e${nls.chartLoadError}\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/ChartContainer","require dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/dom-class dojo/dom-construct dojo/dom-style dojo/when dijit/_WidgetBase dijit/_TemplatedMixin ./_ChartLegendSupport ./_ChartEventSupport ./_ChartComparisonSupport ./utils/ChartTypes ./utils/ChartSorting ./utils/ChartJsonUtil ./utils/builder/ChartPlots esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/InvokeUtil esri/dijit/geoenrichment/utils/WaitingUtil dojo/text!../templates/ChartContainer.html dojo/i18n!esri/nls/jsapi ../../_devConfig".split(" "),
function(F,r,G,t,k,u,e,d,H,I,J,K,L,f,M,v,g,c,N,O,P,l,w){function Q(){if(a)return a.promise;var a=new t;F("dojox/charting/Chart dojox/charting/action2d/Magnify ./utils/action2d/Highlight ./utils/builder/ChartBuilder ./utils/ChartCalculator ./utils/ChartStyleUtil ./tooltips/ChartTooltip ./iconRendering/IconRenderer ./textRendering/TextRenderer ./tableViewRendering/TableViewRenderer".split(" "),function(b,h,n,c,d,e,f,g,k,l){x=b;y=h;z=n;m=c;p=d;A=e;B=f;q=g;C=k;D=l;E=r(x,{_renderPlotBackground:function(a,
b,h,c){this.theme.plotarea.backgroundImageData?this.surface.createImage({src:this.theme.plotarea.backgroundImageData,x:b.l-1,y:b.t-1,width:h+2,height:c+2}):this.inherited(arguments)}});a.resolve()});return a.promise}l=l.geoenrichment.dijit.ReportPlayer.ChartContainer;var E,x,y,z,m,p,A,B,q,C,D;return r([H,I,J,K,L],{templateString:P,nls:l,viewModel:null,theme:null,parentWidget:null,currentFeatureIndex:null,immediateRender:!1,chartTheme:null,chart:null,_currentSeries:null,_iconRenderer:null,_textRenderer:null,
_tableViewRenderer:null,postCreate:function(){this.inherited(arguments);this._showError(!1);this.viewModel.isGraphicStyle&&k.add(this.domNode,"graphicReportChart");k.add(this.domNode,this.viewModel.isLightDocumentTheme(this.theme)?"light":"dark")},_currentSeriesItems:null,_originalSeriesItems:null,_currentVisualProperties:null,_currentChartType:null,_currentComparisonInfo:null,_isMultiFeatureChart:null,_initPromise:null,updateChart:function(a){this._destroyChart();if(a)return v.cleanUpJson(a),this._currentChartType=
a.type,this._currentSeriesItems=(this._isMultiFeatureChart=a.isMultiFeatureChart)?v.getSeriesItemsForMultiFeatureChart(a.type,a.seriesItems,this.viewModel.dynamicReportInfo&&this.viewModel.dynamicReportInfo.fieldData.areaData):a.seriesItems,this._originalSeriesItems=a.seriesItems&&a.seriesItems.slice(),this._currentVisualProperties=a.visualProperties,this._currentComparisonInfo=a.comparisonInfo,e.set(this.domNode,{width:this._currentVisualProperties.width+"px",height:this._currentVisualProperties.height+
"px"}),this.domNode.style.backgroundColor=this._currentVisualProperties.panelBackgroundColor||"",c.hide(this.chartLabel),this._initPromise=Q().then(function(){this._initChartComparisonSelect();this._updateLabels();this._createChart();this._addPlotEventListeners();this._createLegend();this._updateSeries()}.bind(this)),O.showProgressPromise(this.domNode,this._initPromise)},isMultiFeatureChart:function(){return this._isMultiFeatureChart},getLegendNode:function(){return this.legendContainerDiv},_updateLabels:function(){this.chartLabel.innerHTML=
this._currentVisualProperties.title.text;c[this.chartLabel.innerHTML?"show":"hide"](this.chartLabel);this.chartLabel.style.textAlign=this._currentVisualProperties.title.align;this.chartLabel.style.marginTop=(this._currentVisualProperties.title.verticalShift||0)+"px";var a=G.mixin({},this.viewModel.getChartDefaultStyles(this.theme).titleStyle,this._currentVisualProperties.title.style);delete a.backgroundColor;e.set(this.chartLabel,A.getStyleObjWithUnits(a))},_createChart:function(){var a=u.create("div",
{"class":"chartContainerDiv_innerChartNode"},this.chartContainerDiv),b=new E(a);this.chart=b;b.setTheme(this.chartTheme);m.getChartBuilder(this._currentChartType).configureChart({chart:b,seriesItems:this._currentSeriesItems,visualProperties:this._currentVisualProperties,chartType:this._currentChartType,comparisonInfo:this._currentComparisonInfo,themeSettings:this.viewModel.getChartDefaultStyles(this.theme),viewModel:this.viewModel,currentFeatureIndex:this.currentFeatureIndex});this.viewModel.dynamicReportInfo&&
(f.isPieLike(this._currentChartType)&&new y(b,g.PRIMARY,{scale:1.03}),g.getWorkingPlots(b).forEach(function(a,c){c=0===c?this._currentChartType:this._getComparisonChartType();new z(b,a,{stroke:c===f.RING})},this));g.getWorkingPlots(b).forEach(function(a,c){c=0===c?this._currentChartType:this._getComparisonChartType();a=new B(b,a,{duration:50});a.showStatistics=!!this.viewModel.dynamicReportInfo||w.charts.showStatisticsInTooltips;a.setChartType(c)},this)},_destroyChart:function(){this._levelLineBuilder&&
this._levelLineBuilder.hideLevelLine();this.chartContainerDiv&&u.empty(this.chartContainerDiv);this.chart&&this.chart.destroy();this.chart=null;this._destroyLegend()},_updateSeries:function(){var a=this;this._removeSeries();if(this._currentSeriesItems&&this._currentSeriesItems.length){this._currentSeries=m.getChartBuilder(this._currentChartType).calcSeries({chart:this.chart,chartType:this._currentChartType,isMultiFeatureChart:this._isMultiFeatureChart,viewModel:this.viewModel,themeSettings:this.viewModel.getChartDefaultStyles(this.theme),
seriesItems:this._currentSeriesItems,visualProperties:this._currentVisualProperties,currentFeatureIndex:this.currentFeatureIndex,excludedSeriesHash:this._excludedSeriesHash,sorting:this._sorting||this._currentVisualProperties.sorting,comparisonInfo:this._currentComparisonInfo,selectedComparisonAreaId:this._comparisonValue,additionalComparisonAreaIds:this._additionalFeaturesCache,ge:this._getGeoenrichment()});var b=m.checkSeriesAreValid(this._currentSeries);this._showError(!b);if(b)return this._currentSeries.forEach(function(b){a._excludedSeriesHash[b.name]||
a.chart.addSeries(b.name,b.data,b.params)}),this.resize()}else this.resize()},_removeSeries:function(){var a=this;this._currentSeries=this._currentSeries||[];this._currentSeries.forEach(function(b){a.chart.removeSeries(b.name)});this._currentSeries.length=0},_chartWidth:0,_chartHeight:0,_resizedFlag:!1,_resizeDfd:null,_pendingResizeObj:!1,resize:function(a,b,h){if(this._currentVisualProperties)return void 0!==a&&e.set(this.domNode,{width:a+"px",height:b+"px"}),d(this._initPromise,function(){if(c.isNodeInLayout(this.domNode))return void 0!==
a&&p.resizeVisualProperties(this._currentVisualProperties,a,b),this._resizedFlag||(this.domNode.style.opacity="0"),this._resizeDfd=this._resizeDfd||new t,h||this.immediateRender?this._doResizeChart():N.invoke(this,"_doResizeChart",50);this._pendingResizeObj={width:a,height:b,immediate:h}}.bind(this))},_doResizeChart:function(){var a=this;if(this.chart){this._resizedFlag||(this.domNode.style.opacity="1");this._resizedFlag=!0;this._updateLegend();var b=p.calcChartDimentions(this,{visualProps:this._currentVisualProperties,
comparisonInfo:this._currentComparisonInfo,chartType:this._currentChartType,maxIconSize:q.AXIS_ICON_MAX_SIZE}),c=b.h;this._chartWidth=b.w;this._chartHeight=c;this._adjustErrorMessage();if(this._isTableView)this._refreshTableView(),this._renderChartPendingFlag=!0;else{try{this.chart&&(this.chart.isPreRenderMode=f.isColumnBarLike(this._currentChartType),this.chart.resize(this._chartWidth,this._chartHeight),this.chart.dirty&&this.chart.render(),f.isColumnBarLike(this._currentChartType)&&m.getChartBuilder(this._currentChartType).updateBarSize({chart:this.chart,
chartType:this._currentChartType,isMultiFeatureChart:this._isMultiFeatureChart,currentFeatureIndex:this.currentFeatureIndex,viewModel:this.viewModel,seriesItems:this._currentSeriesItems,visualProperties:this._currentVisualProperties,chartSize:this.chart.plotArea[f.isColumnLike(this._currentChartType)?"width":"height"],comparisonInfo:this._currentComparisonInfo,additionalComparisonAreaIds:this._additionalFeaturesCache}),this.chart.isPreRenderMode=!1,this.chart.dirty&&this.chart.render())}catch(n){console.log(n)}(function(){setTimeout(function(){a._updateLegend();
a._updateIcons();a._updateTexts()});a.onRendered();a._resizeDfd&&a._resizeDfd.resolve();a._resizeDfd=null})()}}},notifyShown:function(){var a=this;if(this.viewModel.animationAllowed)return d(this._initPromise,function(){c.isNodeInLayout(a.domNode)&&d(a._pendingResizeObj&&a.resize(a._pendingResizeObj.width,a._pendingResizeObj.height,a._pendingResizeObj.immediate),function(){a._pendingResizeObj=null;g.getWorkingPlots(a.chart).forEach(function(b,c){a.chart.getPlot(b).renderAnimation&&a.chart.getPlot(b).renderAnimation()})})})},
onRendered:function(){},_getIconRendererClass:function(){return q},_updateIcons:function(){this._iconRenderer||(this._iconRenderer=(new this._getIconRendererClass)(),this.own(this._iconRenderer),this._iconRenderer.setViewMode(this._viewMode));this._iconRenderer.renderIcons({viewModel:this.viewModel,theme:this.theme,parentWidget:this,chartType:this._currentChartType,iconNode:this.chartContainerWithAxis,chartW:this._chartWidth,chartH:this._chartHeight,visualProperties:this._currentVisualProperties,
comparisonInfo:this._currentComparisonInfo,chart:this.chart})},_getTextRendererClass:function(){return C},_updateTexts:function(){this._textRenderer||(this._textRenderer=(new this._getTextRendererClass)(),this._textRenderer.currentFeatureIndex=this.currentFeatureIndex,this.own(this._textRenderer),this._textRenderer.setViewMode(this._viewMode));this._textRenderer.renderTexts({viewModel:this.viewModel,theme:this.theme,parentWidget:this,textNode:this.chartContainerWithAxis,chartW:this._chartWidth,chartH:this._chartHeight,
visualProperties:this._currentVisualProperties,chart:this.chart})},_viewMode:null,setViewMode:function(a){if(this._viewMode!==a)return this._viewMode=a,d(this._initPromise,function(){this._iconRenderer&&this._iconRenderer.setViewMode(a);this._textRenderer&&this._textRenderer.setViewMode(a);this._tableViewRenderer&&this._tableViewRenderer.setViewMode(a)}.bind(this))},_showError:function(a){w.emulateErrors.contentErrors&&(a=!0);c[a?"show":"hide"](this.errorDiv);c[a?"hide":"show"](this.chartNormalViewDiv)},
_adjustErrorMessage:function(){this.errorDiv.style.paddingTop=e.get(this.domNode,"height")/2-20+"px"},_sorting:null,getSorting:function(){return this._sorting},sortChart:function(a){this._sorting=a&&a!==M.NONE?a:null;return d(this._initPromise,function(){this._updateSeries()}.bind(this))},_isTableView:!1,_renderChartPendingFlag:!1,chartToTable:function(){if(!this._isTableView)return d(this._initPromise,function(){this._setIsTableView(!0);c.hide([this.chartContainerDiv,this.legendContainerDiv]);for(var a=
0;a<this.chartContainerWithAxis.children.length;a++){var b=this.chartContainerWithAxis.children[a];b!==this.tableContainerDiv&&c.hide(b)}this._tableViewRenderer||(this._tableViewRenderer=new D,this.own(this._tableViewRenderer),this._tableViewRenderer.setViewMode(this._viewMode));this._refreshTableView(!0)}.bind(this))},_setIsTableView:function(a){this._isTableView=a;k[this._isTableView?"add":"remove"](this.domNode,"isChartDataInTableView")},_refreshTableView:function(a){var b=e.get(this.domNode,"height")-
e.get(this.chartLabel,"height");this._currentComparisonInfo&&(b-=40);this._tableViewRenderer.renderTableForChart({chartType:this._currentChartType,isMultiFeatureChart:this._isMultiFeatureChart,viewModel:this.viewModel,theme:this.theme,parentWidget:this,tableNode:this.tableContainerDiv,width:e.get(this.domNode,"width"),height:b,chartSeries:this._currentSeries,visualProperties:this._currentVisualProperties,hasComparison:!!this._currentComparisonInfo,chart:this.chart,showAnimation:a})},tableToChart:function(){if(this._isTableView)return d(this._initPromise,
function(){this._setIsTableView(!1);c.show([this.chartContainerDiv,this.legendContainerDiv]);for(var a=0;a<this.chartContainerWithAxis.children.length;a++)c.show(this.chartContainerWithAxis.children[a]);this._tableViewRenderer&&this._tableViewRenderer.destroyTable();this._renderChartPendingFlag?(this._renderChartPendingFlag=!1,d(this.resize(),this.notifyShown.bind(this))):this.notifyShown()}.bind(this))},getVisualState:function(){return{sorting:this.getSorting(),isTableView:this._isTableView}},setVisualState:function(a){a&&
d(this._resizeDfd&&this._resizeDfd.promise,function(){a.sorting&&this.sortChart(a.sorting);a.isTableView&&this.chartToTable()}.bind(this))},getWidth:function(){return this._currentVisualProperties.width},getHeight:function(){return this._currentVisualProperties.height},destroy:function(){this._destroyChart();this.inherited(arguments)}})});