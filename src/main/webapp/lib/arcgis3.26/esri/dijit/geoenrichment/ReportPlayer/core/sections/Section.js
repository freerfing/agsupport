// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/core/templates/Section.html":'\x3cdiv class\x3d"esriGEReportPlayer_section"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"stackNode" class\x3d"section_stackNode"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"errorDiv" class\x3d"esriGEAbsoluteStretched section_errorDiv"\x3e${nls.mapLoadError}\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/geoenrichment/ReportPlayer/core/sections/Section","require dojo/_base/declare dojo/_base/lang dojo/dom-construct dojo/dom-class dojo/dom-style dojo/store/Memory dijit/_WidgetBase dijit/_TemplatedMixin ./_SectionQueryElementsMixin ../supportClasses/tableJson/TableJsonUtil ../supportClasses/ViewModes ../supportClasses/templateJsonUtils/fieldInfo/FieldInfoBuilder ./supportClasses/SectionLayoutManager ./sectionUtils/SectionJsonUtil esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes dojo/text!../templates/Section.html dojo/i18n!esri/nls/jsapi".split(" "),function(q,
r,k,g,l,e,t,u,v,w,x,n,m,y,z,p,h,A,f){f=f.geoenrichment.dijit.ReportPlayer.Sections;return r([u,v,w],{templateString:A,nls:f,json:null,viewModel:null,theme:null,currentFeatureIndex:null,initialWidth:null,hasFixedLayout:!0,parentWidget:null,parentElementInPageInfo:null,viewPortContainer:null,parentGridCell:null,isPagePanelSection:!1,isInfographicHeaderSection:!1,isInfographicSection:!1,infographicViewController:null,calculationStatesGroup:null,noContentOffset:!1,tableClass:null,tableParams:null,initialViewMode:null,
initialSpecificViewMode:null,isDataDrillingView:!1,_stackElements:null,_layoutManager:null,_dynamicSettingsBuilder:null,_backgroundColor:void 0,_topSpacer:null,_bottomSpacer:null,postCreate:function(){this.inherited(arguments);this._showError(!1);this._layoutManager=new y(this);this._stackElements=[];this.infographicViewController&&this.infographicViewController.addSection(this);(this.initialViewMode||this.initialSpecificViewMode)&&this._tryApplyNewViewMode(this.initialViewMode,this.initialSpecificViewMode);
this.initialWidth&&this.setWidth(this.initialWidth);this.fromJson(this.json);this.json=null;this.viewModel.dynamicReportInfo&&q(["./dynamicSettings/SectionDynamicSettingsBuilder"],function(a){this._dynamicSettingsBuilder=new a(this)}.bind(this))},_createStack:function(a){this._destroyStack();if(a){this._topSpacer=g.create("div",{"class":"stackNodeSpacer"},this.stackNode);var c=this;a.stack.forEach(function(a,d){switch(a.id){case "table":c._createGrid(a);break;case "img":c._createImage(a);break;case "hr":c._createHorizontalLine(a,
d);break;case "pageBreak":c._createPageBreak(a)}});this._bottomSpacer=g.create("div",{"class":"stackNodeSpacer"},this.stackNode);this._updateSpacersForHorizontalLines()}},_addEmptyLine:function(){g.create("div",{"class":"stackNodeEmptyLine"},this.stackNode)},_getGridCreateParams:function(a,c){return null},_createGrid:function(a,c,b,d){var f=this;a.style=a.style||{};a.attributes=a.attributes||{};a.data.columns=a.data.columns||[];a.data.data=a.data.data||[];var e=c&&(c.domNode||c);b=e?b||"after":void 0;
e=e||this.stackNode;d=this.viewModel.layoutBuilder.createElement("grid",k.mixin({"class":this.tableClass,fieldCellClass:this.tableClass?this.tableClass+"Cell":"",viewModel:this.viewModel,theme:this.theme,columns:a.data.columns,store:new t({data:a.data.data,idProperty:"id"}),parentWidget:this,viewPortContainer:this.viewPortContainer,fixedViewMode:a.attributes.viewMode,currentFeatureIndex:this.currentFeatureIndex,isDataDrillingView:this.isDataDrillingView,getPreviewValueFunction:this.infographicViewController&&
function(){return f.infographicViewController.getValueInfo(f)},enableNumberAnimation:this.isInfographicSection&&!!this.viewModel.dynamicReportInfo,allowSorting:!this.isInfographicSection&&!!this.viewModel.dynamicReportInfo&&!(this.tableParams&&!1===this.tableParams.allowSorting),onContentLoadingStart:function(){f.onContentLoadingStart()},onContentLoadingEnd:function(){f.onContentLoadingEnd()}},this._getGridCreateParams(a,d),this.tableParams),e);g.place(d.domNode,e,b);d.setMaxWidth(this.hasFixedLayout?
this.getWidth():1E5);d.setSettings({style:{width:a.style.width,left:a.style.left,spaceBefore:a.style.spaceBefore,spaceAfter:a.style.spaceAfter,alternatingStyle:a.style.alternatingStyle},attributes:k.mixin({fixedColumns:a.attributes.fixedColumns,dynamicColumns:a.attributes.dynamicColumns,fixedRows:a.attributes.fixedRows,dynamicRows:a.attributes.dynamicRows},this._getAdditionalTableAttributes(a)),scaleToFitWidth:a.scaleToFitWidth,scaleToFitHeight:a.scaleToFitHeight,viewMode:this._viewMode,specificViewMode:this._specificViewMode});
d.stackId="table";c?this._stackElements.splice(this._stackElements.indexOf(c)+("after"===b?1:0),0,c):this._stackElements.push(d);return d},_getAdditionalTableAttributes:function(a){},_createImage:function(a){return a.isMapImage||!this.viewModel.isGraphicStyle?this._createFloatingImage(a):this._createElementInTable(a,"image")},_createFloatingImage:function(a){var c=this,b;b=this._doCreateImageWithParams({viewModel:this.viewModel,theme:this.theme,parentWidget:this,currentFeatureIndex:this.currentFeatureIndex,
onInitialized:function(){b&&b.resize()},onContentLoadingStart:function(){c.onContentLoadingStart()},onContentLoadingEnd:function(){c.onContentLoadingEnd()},onMapLoadError:function(){c._showError(!0)}},a);b.stackId="img";this._stackElements.push(b);this._syncElementViewMode(b);return b},_doCreateImageWithParams:function(a,c){return this.viewModel.layoutBuilder.createElement("image",{node:this.stackNode,relativeParent:this.domNode,json:c,creationParams:a})},_createElementInTable:function(a,c,b){a.style=
a.style||{};"chart"===c?b={x:0,y:0,w:a.visualProperties.width,h:a.visualProperties.height}:(a=k.mixin({},a),a.style=k.clone(a.style),b=b&&b.defaultSize||100,a.style.width=a.style.width||b,a.style.height=a.style.height||b,b={x:a.style.left||0,y:a.style.top||0,w:a.style.width,h:a.style.height},a.style.left=0,a.style.top=0);var d;switch(c){case "image":d=m.createFieldInfoFromImage(a);break;case "shape":d=m.createFieldInfoFromShape(a);break;case "chart":d=m.createFieldInfoFromChart(a)}a=x.createSingleCellTable({left:b.x,
spaceBefore:b.y,width:b.w,height:b.h,fieldInfo:d,cellStyle:{horizontalAlign:a.style.horizontalAlign||"center",verticalAlign:a.style.verticalAlign||"middle",backgroundColor:"transparent"}});a=this._createGrid(a);"image"===c&&(a.__isImageTable=!0);return a},isImageTable:function(a){return a&&a.__isImageTable},_createHorizontalLine:function(a,c){a.style=a.style||{};var b=g.create("div",{"class":"templateHorizontalLine"},this.stackNode);0===c?(l.add(b,"templateHorizontalLineTop"),this._stackElements.unshift(b),
b._isTopLine=!0):(l.add(b,"templateHorizontalLineBottom"),this._stackElements.push(b),b._isTopLine=!1);b.stackId="hr";a.style.backgroundColor&&e.set(b,"backgroundColor",a.style.backgroundColor);a.style.height&&e.set(b,"height",a.style.height+"px")},_updateSpacersForHorizontalLines:function(){var a=this._queryElementsById("hr");e.set(this._topSpacer,"height","0px");e.set(this._bottomSpacer,"height","0px");var c=this;a.forEach(function(a){e.set(a._isTopLine?c._topSpacer:c._bottomSpacer,"height",e.get(a,
"height")+"px")})},_createPageBreak:function(a){a=g.create("div",{"class":"esriGEReportPlayer_pageBreak"},this.stackNode);a.stackId="pageBreak";g.create("div",{"class":"pageBreakLine dijitInline"},a);g.create("div",{"class":"pageBreakLabel dijitInline",innerHTML:f.pageBreak},a);g.create("div",{"class":"pageBreakLine dijitInline"},a);this._stackElements.push(a)},_destroyStack:function(){for(;this._stackElements.length;)this._removeElement(this._stackElements[0]);this.stackNode&&g.empty(this.stackNode);
this._addEmptyLine()},removeElement:function(a){a&&this._removeElement(a)},_removeElement:function(a){a&&(a.destroy?a.destroy():g.destroy(a),this._stackElements.splice(this._stackElements.indexOf(a),1),"hr"===a.stackId&&this._updateSpacersForHorizontalLines())},getWidth:function(){return this._layoutManager.getWidth()},setWidth:function(a,c){this._layoutManager.setWidth(a,c)},getHeight:function(a){return this._layoutManager.getHeight(a)},getResizedHeight:function(){return this._layoutManager.getResizedHeight()},
setResizedHeight:function(a,c){this._layoutManager.setResizedHeight(a,c)},getPreferredHeight:function(){return this._layoutManager.getPreferredHeight()},collapseContent:function(){var a=this.getInfographicWithTable();a&&a.infographic.collapseContent()},calculateFloatingContentBox:function(){return this._layoutManager.getFloatingContentBox()},scaleFloatingContentProportionally:function(a){this._layoutManager.scaleFloatingContentProportionally(a)},fitContentNicely:function(a,c){this._layoutManager.fitContentNicely(a,
c)},_getFirstCellContent:function(){var a=this.getFirstTable();return(a=a&&a.getFirstCell())&&a.content},sortChart:function(a){var c=this._getFirstCellContent();c&&c.sortChart(a)},chartToTable:function(){var a=this._getFirstCellContent();a&&a.chartToTable()},tableToChart:function(){var a=this._getFirstCellContent();a&&a.tableToChart()},setChartCalculationState:function(a){this.onCalculationStateChanged(a)},onCalculationStateChanged:function(a){},getStyle:function(){return{backgroundColor:this._backgroundColor}},
setStyle:function(a){this._backgroundColor=(a=k.mixin(this.getStyle(),a))&&a.backgroundColor;this.domNode.style.backgroundColor=this._backgroundColor||""},getSettings:function(){var a=this._queryElementsById("hr"),c=a[0]&&a[0]._isTopLine?a[0]:null,a=a.filter(function(a){return!a._isTopLine})[0],b={type:this._sectionType,hasTopLine:!!c,hasBottomLine:!!a};c&&(b.topLineHeight=e.get(c,"height"),b.topLineColor=e.get(c,"backgroundColor"));a&&(b.bottomLineHeight=e.get(a,"height"),b.bottomLineColor=e.get(a,
"backgroundColor"));return b},setSettings:function(a){var c=this;this._queryElementsById("hr").map(function(a){c._removeElement(a)});a.hasTopLine&&this._createHorizontalLine({style:{height:a.topLineHeight,backgroundColor:a.topLineColor}},0);a.hasBottomLine&&this._createHorizontalLine({style:{height:a.bottomLineHeight,backgroundColor:a.bottomLineColor}})},_notifyContentChanged:function(){this._layoutManager.updateHeightAfterContentChange()},_viewMode:null,_specificViewMode:null,_viewModeKey:null,setViewMode:function(a,
c){this._tryApplyNewViewMode(a,c)&&this._stackElements.forEach(function(a){this._syncElementViewMode(a)},this)},_tryApplyNewViewMode:function(a,c){a=a||this._viewMode;c=c||this._specificViewMode;var b=a+c;if(this._viewModeKey===b)return!1;this._viewModeKey=b;this._viewMode=a;this._specificViewMode=c;l[this._viewMode===n.EDIT?"add":"remove"](this.domNode,"esriGEReportPlayer_sectionEditMode");l[this._viewMode===n.EDIT?"remove":"add"](this.domNode,"esriGEReportPlayer_sectionPreviewMode");return!0},_syncElementViewMode:function(a){a.setViewMode&&
a.setViewMode(this._viewMode,this._specificViewMode)},notifyShown:function(){this._stackElements.forEach(function(a){a.notifyShown&&a.notifyShown()});this._dynamicSettingsBuilder&&this._dynamicSettingsBuilder.notifyShown()},_sectionType:null,getSectionType:function(){return this._sectionType},isEmpty:function(){return!1},isDataSection:function(){var a=this.getSectionType();return!this.hasPageBreak()&&this.hasNonEmptyTables()&&(a===h.DETAILS||a===h.DETAILS_HEADER||a===h.GROUP)},isPageHeader:function(){return this.getSectionType()===
h.PAGE_HEADER},isPageFooter:function(){return this.getSectionType()===h.PAGE_FOOTER},getSectionName:function(){if(this.hasPageBreak())return"";switch(this._sectionType){case h.PAGE_HEADER:return f.pageHeader;case h.DETAILS_HEADER:return this.hasLocatorHeaderTables()?f.locatorHeaderTable:f.detailsHeader;case h.DETAILS:return this.hasLocatorTables()?f.locatorTable:this.hasSummarizeTables()?f.summarizeTable:f.details;case h.GROUP:return f.group;case h.REPORT_FOOTER:return f.reportFooter;case h.PAGE_FOOTER:return f.pageFooter}return""},
getVisualState:function(){return{stackElements:this._stackElements.map(function(a){return a.getVisualState&&a.getVisualState()})}},setVisualState:function(a){a&&a.stackElements&&a.stackElements.length===this._stackElements.length&&(this._stackElements.forEach(function(c,b){c.setVisualState&&c.setVisualState(a.stackElements[b])}),this._dynamicSettingsBuilder&&this._dynamicSettingsBuilder.setVisualState(a))},updateContentFromJson:function(a){this.fromJson(a);this._notifyContentChanged()},fromJson:function(a){this._showError(!1);
this._sectionType=a.type;"number"===typeof a.currentFeatureIndex&&(this.currentFeatureIndex=a.currentFeatureIndex);this._createStack(a);this.setStyle(a.style)},toJson:function(){var a=this,c={type:this._sectionType,stack:[]};this._backgroundColor&&(c.style={backgroundColor:this._backgroundColor});this._stackElements.forEach(function(b){var d;switch(b.stackId){case "table":a.isImageTable(b)?(b=b.toJson(),(d=z.getTableJsonFirstFieldInfo(b).imageJson)?(d.style.left=b.style.left,d.style.top=b.style.spaceBefore):
d=b):d=b.toJson();break;case "img":d=b.toJson();break;case "hr":d={id:"hr",style:{height:e.get(b,"height"),backgroundColor:e.get(b,"backgroundColor")}};break;case "pageBreak":d={id:"pageBreak"}}d&&c.stack.push(d)});return c},onContentLoadingStart:function(){},onContentLoadingEnd:function(){},_showError:function(a){p[a?"show":"hide"](this.errorDiv);p[a?"hide":"show"](this.stackNode)},destroy:function(){this._destroyStack();this.inherited(arguments)}})});