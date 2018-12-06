// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/core/templates/AdjustableGrid.html":'\x3cdiv class\x3d"esriGEAdjustableGrid"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"backgroundNode" class\x3d"adjustableGridBackgroundNode"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"backgroundFloatingTablesNode" class\x3d"adjustableGridFloatingTablesNode"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"mainNode" class\x3d"adjustableGridMainNode"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"foregroundFloatingTablesNode" class\x3d"adjustableGridFloatingTablesNode"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"foregroundNode" class\x3d"adjustableGridForegroundNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n\r\n\r\n'}});
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/AdjustableGrid","dojo/_base/declare dojo/_base/lang dojo/store/Memory dojo/dom-class dojo/dom-construct dojo/dom-style dijit/_WidgetBase dijit/_TemplatedMixin ./_GridHighlightSupport ./_GridSortSupport ./_ResizableColumnsSupport ./valueField/ValueField ./valueField/_ResizableField ./coreUtils/GridBackgroundForegroundUtil ./coreUtils/GridFloatingTablesUtil ./coreUtils/GridBorderUtil ./coreUtils/GridDataUtil ./coreUtils/GridQueryUtil ./coreUtils/GridLayoutCalculator ./coreUtils/GridCellRenderer ./coreUtils/GridStyleUtil ./coreUtils/GridLayoutSizer ./coreUtils/sorting/GridSortUtil ./coreUtils/_GridDebugUtil esri/dijit/geoenrichment/utils/ArrayUtil esri/dijit/geoenrichment/utils/DeviceUtil esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/async/AsyncQueue esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/ViewModes dojo/text!../templates/AdjustableGrid.html".split(" "),
function(m,h,v,f,n,w,x,y,z,A,B,p,C,q,r,D,g,l,d,E,t,k,F,u,G,H,I,J,K,L){var M={defaultRowHeight:15.33,rowMinHeight:3,columnMinWidth:3,defaultChartRowHeight:150},N=m([p,C]);return m([x,y,z,A,B],{templateString:L,viewModel:null,theme:null,columns:null,store:null,backgroundSectionJson:null,foregroundSectionJson:null,enableBackgroundForeground:!1,backgroundFloatingTablesSectionJson:null,foregroundFloatingTablesSectionJson:null,isFloatingTable:!1,isBackgroundFloatingTable:!1,layoutDefaults:null,stickToRight:!1,
looseResize:!1,keepGridWidthWhenResized:!1,keepGridHeightWhenResized:!1,hasResizableColumns:!1,disableResizableColumnsAutoDetection:!1,fitParentWhenResized:!1,parentWidget:null,parentElementInPageInfo:null,viewPortContainer:null,parentGrid:null,reportContainerPageNode:null,isReportContainerPageGird:!1,getPreviewValueFunction:null,currentFeatureIndex:null,fixedViewMode:null,fieldCellClass:null,applyThemeStyle:!0,inheritThemeBackground:!0,enableAsyncRendering:!1,asyncBatchSize:1,enableNumberAnimation:!1,
previewModeBorderLineStyle:null,editModeBorderLineStyle:null,renderBordersFromTheme:!1,noThemeBorderLineStyle:null,hasRealBorders:!1,allowSorting:!1,trimTextIfOverflows:!1,autoDetectUrl:!1,shouldStayWithinParent:!0,backgroundSection:null,foregroundSection:null,backgroundFloatingTablesSection:null,foregroundFloatingTablesSection:null,_cellRenderer:null,_fieldCells:null,_dynamicBindings:null,_isBeingResizedFlag:!1,_asyncQueue:null,postCreate:function(){this.inherited(arguments);this.layoutDefaults=
h.mixin({},M,this.layoutDefaults)},refresh:function(a){if(this.domNode)return this.isReportContainerPageGird||this.hasResizableColumns||!this.viewModel.dynamicReportInfo||this.isSingleCelledTable()||this.disableResizableColumnsAutoDetection||(this.fitParentWhenResized=this.hasResizableColumns=this.keepGridWidthWhenResized=!0,this.layoutDefaults.columnMinWidth=30),H.isMobileDevice()&&(this.hasResizableColumns=!1),f[this.hasResizableColumns?"add":"remove"](this.domNode,"hasResizableColumns"),a=a||{},
d.markAsDirty(this),a.preserveFocus||a.preserveFocusAll?this.__refreshAndPreserveFocus(a):this.__simpleRefresh(a),F.updateSorting(this,a.skipSorting),this.getRenderPromise()},__simpleRefresh:function(a){this.mainNode&&(a=a||{},this.store&&(this._destroyTableContent(),n.empty(this.mainNode),u.refreshStart(this),this.isEmptyTable()?n.create("div",{"class":"adjustableGrid_emptyRow"},this.mainNode):(f[this.isSingleCelledTable()?"add":"remove"](this.domNode,"esriGEAdjustableGridSingleCell"),d.recalcRows(this),
void 0===a.stickToRight&&(a.stickToRight=this.stickToRight),d.recalcColumns(this,a),d.autoSnapLayout(this),this._createCellsFromStoreData(),this._renderCells(),d.positionCells(this)),this.refreshBackground(),this._renderBackgroundFloatingTables(),this._renderForegroundFloatingTables(),this.refreshForeground(),u.refreshEnd(this)))},__refreshAndPreserveFocus:function(a){this.__simpleRefresh(a)},_createCellsFromStoreData:function(){var a=this;this.enableAsyncRendering&&(this._asyncQueue=new J);this.store.data.forEach(function(b){a.columns.forEach(function(c,
e){if(!(b.excludedIndexHorizontal&&b.excludedIndexHorizontal[e]||b.excludedIndexVertical&&b.excludedIndexVertical[e])){e=c.index+(g.getDataColumnSpan(b,c.field)||1)===a.columns.length;var d=b.index+(g.getDataRowSpan(b,c.field)||1)===a.store.data.length;a._createField(b,c,e,d)}})})},_getFieldClass:function(a){return this.hasResizableColumns&&0===a.gridData.index?N:p},_createField:function(a,b,c,e){var d="adjustableGridField field-"+b.field+(c?" lastInRow":"")+(e?" lastRow":"");c={viewModel:this.viewModel,
fieldStyle:t.combineCellStyle(this,a,b),defaultBorderStyle:this._getDefaultBorderStyle(a,b,c,e),"class":d,fieldCellClass:this.fieldCellClass,trimTextIfOverflows:this.trimTextIfOverflows,autoDetectUrl:this.autoDetectUrl,rowId:a.id,columnId:b.id,parentGrid:this,parentWidget:this,uniqueId:a.id+b.id,gridData:a,column:b,isLastInRow:c,isLastInColumn:e};this.hasResizableColumns&&(c.allowVerticalResizing=!1,c.showColumnRowSizeTooltip=!0);c=this._doCreateFieldFromParams(c,a,b);this.hasResizableColumns&&this._populateFieldForResizableColumns(c,
a,b);c.domNode.style.position="absolute";this._fieldCells.push(c);return c},_getDefaultBorderStyle:function(a,b,c,e){return D.getBorderStyle(this,a,b,c,e)},getRenderPromise:function(){return this._asyncQueue&&this._asyncQueue.getPromise()},_doCreateFieldFromParams:function(a,b,c){return(new (this._getFieldClass(a))(a)).placeAt(this.mainNode)},_renderCells:function(){function a(a){b._renderFieldContent(a);b._postCreateFieldCell(a);b._updateCellViewMode(a)}var b=this;this._asyncQueue?G.splitArrayToBunches(this._fieldCells,
this.asyncBatchSize).forEach(function(c){b._asyncQueue.add(function(){c.forEach(a)},{delayAfter:0})}):this._fieldCells.forEach(a)},_renderFieldContent:function(a){this._preRenderFieldCell(a);this._getCellRenderer().renderCellContent(a);this._configureRenderedCellContentSpecificStyles(a);this._postRenderFieldCell(a)},_preRenderFieldCell:function(a){},_postRenderFieldCell:function(a){},_getCellRenderer:function(){this._cellRenderer||(this._cellRenderer=new E);return this._cellRenderer},_configureRenderedCellContentSpecificStyles:function(a){f[g.isNumericVariableFieldCell(a)?
"add":"remove"](a.domNode,"hasNumericVariableFieldInfo");f[g.isStringVariableFieldCell(a)?"add":"remove"](a.domNode,"hasStringVariableFieldInfo");f[g.getConditionalFormatting(a)?"add":"remove"](a.domNode,"hasConditionalFormatting")},_postCreateFieldCell:function(a){},refreshBackground:function(){this.enableBackgroundForeground&&(this.backgroundSection&&this.backgroundSection.destroy(),this.backgroundSection=q.renderBackground(this,this.backgroundSectionJson,this._getBackgroundSectionCreationParams()))},
_getBackgroundSectionCreationParams:function(){return this._getContentLoadingParams()},refreshForeground:function(){this.enableBackgroundForeground&&(this.foregroundSection&&this.foregroundSection.destroy(),this.foregroundSection=q.renderForeground(this,this.foregroundSectionJson,this._getForegroundSectionCreationParams()))},_getForegroundSectionCreationParams:function(){return this._getContentLoadingParams()},_renderBackgroundFloatingTables:function(){this.backgroundFloatingTablesSection&&this.backgroundFloatingTablesSection.destroy();
this.backgroundFloatingTablesSection=r.renderFloatingTables(this,this.backgroundFloatingTablesSectionJson,this._getFloatingTablesSectionParams(!0),!0)},_renderForegroundFloatingTables:function(){this.foregroundFloatingTablesSection&&this.foregroundFloatingTablesSection.destroy();this.foregroundFloatingTablesSection=r.renderFloatingTables(this,this.foregroundFloatingTablesSectionJson,this._getFloatingTablesSectionParams(!1),!1)},_getFloatingTablesSectionParams:function(a){var b=this;a={tableParams:h.mixin({isFloatingTable:!0,
isBackgroundFloatingTable:a,parentGrid:this,inheritThemeBackground:this.inheritThemeBackground,layoutDefaults:this.layoutDefaults,_preRenderFieldCell:function(a){b._preRenderFieldCell(a)},_postCreateFieldCell:function(a){b._postCreateFieldCell(a)}},this._getContentLoadingParams())};this._addFloatingTablesSectionCreationParams(a);return a},_addFloatingTablesSectionCreationParams:function(a){return a},getVisualState:function(){return{sorting:this.getSorting(this),cells:this.getFieldCells().map(function(a){return a.content&&
a.content.getVisualState&&a.content.getVisualState()}),backgroundSection:this.backgroundSection&&this.backgroundSection.getVisualState(),backgroundFloatingTablesSection:this.backgroundFloatingTablesSection&&this.backgroundFloatingTablesSection.getVisualState(),foregroundFloatingTablesSection:this.foregroundFloatingTablesSection&&this.foregroundFloatingTablesSection.getVisualState(),foregroundSection:this.foregroundSection&&this.foregroundSection.getVisualState()}},setVisualState:function(a){if(a){a.sorting&&
this.setSorting(a.sorting);if(a.cells){var b=this.getFieldCells();a.cells.length===b.length&&b.forEach(function(b,e){b.content&&b.content.setVisualState&&b.content.setVisualState(a.cells[e])})}a.backgroundSection&&this.backgroundSection.setVisualState(a.backgroundSection);a.backgroundFloatingTablesSection&&this.backgroundFloatingTablesSection.setVisualState(a.backgroundFloatingTablesSection);a.foregroundFloatingTablesSection&&this.foregroundFloatingTablesSection.setVisualState(a.foregroundFloatingTablesSection);
a.foregroundSection&&this.foregroundSection.setVisualState(a.foregroundSection)}},_setCellWidth:function(a,b){d.adjustColumnWidth(this,a.gridData,a.column,b);d.positionCells(this)},_setCellHeight:function(a,b){d.adjustRowHeight(this,a.gridData,a.column.field,b);d.positionCells(this)},setCellWidth:function(a,b){this._setCellWidth(a,b)},setCellHeight:function(a,b){this._setCellHeight(a,b)},_maxWidth:500,_width:500,_height:0,_spaceAfter:0,_maxHeight:0,_left:0,_top:0,_alternatingStyle:null,getMaxHeight:function(a){return this._maxHeight},
setMaxHeight:function(a){this._maxHeight=a},getHeight:function(a,b){return this._height+(!1!==b?this._top:0)+(a?this._spaceAfter||0:0)},getMaxWidth:function(){return this._maxWidth},setMaxWidth:function(a,b){var c=0;b&&b.preserveRightOffset&&(d.recalcGridWidth(this),c=this.getAllowedWidth(),c=(c-this._width)/c);this._maxWidth=a;b&&b.resizeToFitAllowedWidth&&this.resizeToFitAllowedWidth({rightOffsetWeight:b.preserveRightOffset?c:0})},getLeft:function(){return this._left},getTop:function(){return this._top},
setSpaceAfter:function(a){this._spaceAfter=a},getAllowedWidth:function(){return this._maxWidth-this._left},getAllowedWidthFromParent:function(){return this.shouldStayWithinParent?w.get(this.domNode.parentNode,"width")-this._left:1E6},getTableBox:function(){var a=this.getSettings().style;return{l:a.left,t:a.spaceBefore,w:a.width,h:this.getHeight(!1,!1)}},getDomPosition:function(){return I.position(this.domNode)},resizeToFitAllowedWidth:function(a){this.isEmptyTable()||k.resizeToFitAllowedWidth(this,
a)},resizeToFitWidth:function(a){this.isEmptyTable()||k.resizeToFitWidth(this,a)},resizeToFitHeight:function(a,b){this.isEmptyTable()||(!1!==b&&(a-=this._top),k.resizeToFitHeight(this,a))},scaleProportionallyWithinParent:function(a){k.scaleProportionallyWithinParent(this,a)},collapseContent:function(){this.getFieldCells().forEach(function(a){a.content&&a.content.collapseContent&&a.content.collapseContent()})},hasHiddenContent:function(){return this._checkNeedResizeRowHeightToShowCellsContent(!1)},
resizeRowHeightToShowCellsContent:function(){this._checkNeedResizeRowHeightToShowCellsContent(!0)},_checkNeedResizeRowHeightToShowCellsContent:function(a){var b=this,c;this.getFieldCells().forEach(function(e){if(e.content&&e.content.getPreferredHeight){var d=e.content.getPreferredHeight();d>e.getHeight()&&(a&&(d&&(d+=10),b._setCellHeight(e,d)),c=!0)}});return c},_tableAttributes:null,setSettings:function(a){var b,c=this._left,e=this.isMultiFeatureTable();this.columns.forEach(function(a){a.style&&
"number"===typeof a.style.width&&(a._wasBeforeRecalc=!0)});if(a.style){void 0!==a.style.left&&this.setGridPosition(a.style.left);void 0!==a.style.spaceBefore&&this.setGridPosition(void 0,a.style.spaceBefore);void 0!==a.style.spaceAfter&&(this._spaceAfter=a.style.spaceAfter);a.style.width&&(this._width=a.style.width);a.style.alternatingStyle&&(this._alternatingStyle=a.style.alternatingStyle);var g=this._width;this._width=Math.min(this._width,this.getAllowedWidth());if(this._width!==g||c!==this._left)b=
!0}a.attributes&&(this._adjustColumnsForSettings(a)&&(b=!0),this._tableAttributes=a.attributes,this._tableAttributes.rowCount&&this._tableAttributes.rowCount!==this.store.data.length&&this._adjustRowsForSettings(a),delete this._tableAttributes.rowCount,delete this._tableAttributes.columnCount);void 0!==a.scaleToFitWidth&&(this._scaleToFitWidth=a.scaleToFitWidth);void 0!==a.scaleToFitHeight&&(this._scaleToFitHeight=a.scaleToFitHeight);this._tableAttributes=this._tableAttributes||{};var f=[];this.columns.forEach(function(a){a._wasBeforeRecalc&&
f.push(a);delete a._wasBeforeRecalc});if(!e&&this.isMultiFeatureTable())for(c=this.columns.length-1;c>=this.getNumFixedColumns();c--)e=f.indexOf(this.columns[c]),-1!==e&&f.splice(e,1);(a.viewMode||a.specificViewMode)&&this._tryApplyNewViewMode(a.viewMode,a.specificViewMode);void 0!==a.maxWidth&&this.setMaxWidth(a.maxWidth);void 0!==a.maxHeight&&this.setMaxHeight(a.maxHeight);this.viewModel.dynamicReportInfo&&this.getNumDynamicColumns()?(d.trimColumnsForNumberOfFeatures(this),this.refresh({resetWidth:!0})):
this.viewModel.dynamicReportInfo&&this.getNumDynamicRows()?(d.adjustRowsForNumberOfFeatures(this),this.refresh()):b?this.refresh({resetWidth:!0,columnsToPreserve:f}):this.refresh()},setGridPosition:function(a,b){void 0!==a&&(this._left=a||0,this.domNode.style.left=this._left+"px");void 0!==b&&(this._top=b||0,this.domNode.style.top=this._top+"px")},_adjustColumnsForSettings:function(a){return!1},_adjustRowsForSettings:function(a){},getSettings:function(){d.recalcGridWidth(this);return{style:{width:this._width,
left:this._left,spaceBefore:this._top,spaceAfter:this._spaceAfter,alternatingStyle:this._alternatingStyle},attributes:h.mixin(h.clone(this._tableAttributes),{columnCount:this.columns.length,rowCount:this.store.data.length}),scaleToFitWidth:this._scaleToFitWidth,scaleToFitHeight:this._scaleToFitHeight}},needScaleToFitWidth:function(){return this._scaleToFitWidth},needScaleToFitHeight:function(){return this._scaleToFitHeight},isEmptyTable:function(){return!this.columns||!this.columns.length||!this.store||
!this.store.data.length},isSingleCelledTable:function(){return 1===this.store.data.length&&1===this.columns.length},isMultiFeatureTable:function(){return!!this.getNumDynamicColumns()||!!this.getNumDynamicRows()},getNumFixedColumns:function(){return this._tableAttributes&&this._tableAttributes.fixedColumns||0},setNumFixedColumns:function(a){this._tableAttributes.fixedColumns=a},getNumDynamicColumns:function(){return this._tableAttributes&&this._tableAttributes.dynamicColumns||0},setNumDynamicColumns:function(a){this._tableAttributes.dynamicColumns=
a},getNumFixedRows:function(){return this._tableAttributes&&this._tableAttributes.fixedRows||0},setNumFixedRows:function(a){this._tableAttributes.fixedRows=a},getNumDynamicRows:function(){return this._tableAttributes&&this._tableAttributes.dynamicRows||0},setNumDynamicRows:function(a){this._tableAttributes.dynamicRows=a},collectFieldInfos:function(a){a=a||{};a.onlySelectedCells&&(a.fieldCells=this.getSelectedCells()||[]);return l.collectFieldInfos(this,a)},_viewMode:null,_specificViewMode:null,_viewModeKey:null,
getViewMode:function(){return this._viewMode},getSpecificViewMode:function(){return this._specificViewMode},setViewMode:function(a,b){this._tryApplyNewViewMode(a,b)&&(this._fieldCells&&this._fieldCells.forEach(function(a){this._updateCellViewMode(a)},this),this.backgroundSection&&this.backgroundSection.setViewMode(this._viewMode,this._specificViewMode),this.backgroundFloatingTablesSection&&this.backgroundFloatingTablesSection.setViewMode(this._viewMode,this._specificViewMode),this.foregroundFloatingTablesSection&&
this.foregroundFloatingTablesSection.setViewMode(this._viewMode,this._specificViewMode),this.foregroundSection&&this.foregroundSection.setViewMode(this._viewMode,this._specificViewMode))},_tryApplyNewViewMode:function(a,b){a=this.fixedViewMode||a||this._viewMode;b=b||this._specificViewMode;var c=a+b;if(this._viewModeKey===c)return!1;this._viewModeKey=c;this._viewMode=a;this._specificViewMode=b;f.remove(this.domNode,"adjustableGridPreviewMode adjustableGridEditMode ");f.add(this.domNode,this._viewMode===
K.EDIT?"adjustableGridEditMode":"adjustableGridPreviewMode");return!0},_updateCellViewMode:function(a){a.setDefaultBorderStyle(this._getDefaultBorderStyle(a.gridData,a.column,a.isLastInRow,a.isLastInColumn));a.content&&a.content.setViewMode&&a.content.setViewMode(this._viewMode,this._specificViewMode);this._getCellRenderer().updateViewMode(a)},_getContentLoadingParams:function(){return{onContentLoadingStart:this.onContentLoadingStart.bind(this),onContentLoadingEnd:this.onContentLoadingEnd.bind(this)}},
getFieldCells:function(a){return a&&a.floatingCells?this.getForegroundFloatingCells().concat(this._fieldCells).concat(this.getBackgroundFloatingCells()):this._fieldCells},queryCells:function(a){return l.queryCells(this,a)},getFirstCell:function(){return this.getFieldCells()[0]},getCellText:function(a){return g.getFieldCellValue(a)},renderCell:function(a){this._renderFieldContent(a)},refreshCellStyle:function(a){a.setStyle(t.combineCellStyle(this,a.gridData,a.column))},getInfographicJson:function(){var a=
this.getFirstCell();return g.isInfographicCell(a)?g.getFieldInfo(a).infographicJson:null},getOverFieldCell:function(a){return l.getOverFieldCell(this,a)},getFeatureIndexForCell:function(a){return this.isMultiFeatureTable()?d.calcRingIndexForCell(a):"number"===typeof this.currentFeatureIndex?this.currentFeatureIndex:"number"===typeof a.gridData.currentFeatureIndex?a.gridData.currentFeatureIndex:"number"===typeof a.column.currentFeatureIndex?a.column.currentFeatureIndex:void 0},getBackgroundFloatingCells:function(a){return this._getFloatingCells(this.backgroundFloatingTablesSection,
a)},getForegroundFloatingCells:function(a){return this._getFloatingCells(this.foregroundFloatingTablesSection,a)},_getFloatingCells:function(a,b){var c=[];if(!a)return c;a.getTables().forEach(function(a){c=c.concat(a.getFieldCells())});b&&b.topFirst&&c.reverse();return c},getChartJson:function(){var a=this.getFirstCell();return g.isChartCell(a)?g.getFieldInfo(a).chartJson:null},toJson:function(){var a=this.getSettings();a.id="table";a.data={data:this.store.data,columns:this.columns};["backgroundSection",
"foregroundSection","backgroundFloatingTablesSection","foregroundFloatingTablesSection"].forEach(function(b){var c=this[b];c&&(c=c.toJson(),c.stack.length&&(a[b+"Json"]=c))},this);return h.clone(a)},fromJson:function(a){a&&a.data&&(this.columns=a.data.columns||[],this.store=new v({data:a.data.data||[],idProperty:"id"}),this.backgroundSectionJson=a.backgroundSectionJson,this.foregroundSectionJson=a.foregroundSectionJson,this.refresh())},notifyShown:function(){this.getFieldCells().forEach(function(a){a.notifyShown();
a.content&&a.content.notifyShown&&a.content.notifyShown()});this.backgroundSection&&this.backgroundSection.notifyShown();this.backgroundFloatingTablesSection&&this.backgroundFloatingTablesSection.notifyShown();this.foregroundFloatingTablesSection&&this.foregroundFloatingTablesSection.notifyShown();this.foregroundSection&&this.foregroundSection.notifyShown()},onContentLoadingStart:function(){},onContentLoadingEnd:function(){},onRequestScaleToFitHeight:function(){},_destroyTableContent:function(){this._renderInfo=
null;this._fieldCells=this._fieldCells||[];this._fieldCells.forEach(function(a){a.parentGrid=null;a.gridData=null;a.column=null;a.destroy()});this._fieldCells.length=0;this.backgroundSection&&this.backgroundSection.destroy();this.backgroundSection=null;this.backgroundFloatingTablesSection&&this.backgroundFloatingTablesSection.destroy();this.backgroundFloatingTablesSection=null;this.foregroundFloatingTablesSection&&this.foregroundFloatingTablesSection.destroy();this.foregroundFloatingTablesSection=
null;this.foregroundSection&&this.foregroundSection.destroy();this.foregroundSection=null;this._asyncQueue&&this._asyncQueue.destroy();this._asyncQueue=null},destroy:function(){this._destroyTableContent();this.reportContainerPageNode=this.parentGrid=this.viewPortContainer=this.parentElementInPageInfo=this.parentWidget=this.columns=this.store=this.theme=this.viewModel=null;this.inherited(arguments)}})});