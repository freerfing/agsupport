// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/core/templates/PaginatableTableInfographic.html":'\x3cdiv class\x3d"esriGEPaginatableTableInfographic"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"noDataPlaceHolder" class\x3d"paginatableTableInfographic_noDataPlaceHolder"\x3e\r\n        \x3cdiv class\x3d"paginatableTableInfographic_noDataPlaceHolderImage"\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"noDataPlaceHolderLabel" class\x3d"paginatableTableInfographic_noDataPlaceHolderLabel"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"dataDiv"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"titleDiv" class\x3d"paginatableTableInfographic_titleDiv"\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"paginationDiv" class\x3d"esriGEAbsoluteStretched"\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"pageNavigatorDiv" class\x3d"paginatableTableInfographic_pageNavigatorDiv"\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"footnoteDiv" class\x3d"paginatableTableInfographic_footNoteDiv"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e\r\n\r\n\r\n'}});
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/paginatableTable/PaginatableTableInfographic","dojo/_base/declare dojo/_base/lang dojo/when dojox/uuid/generateRandomUuid dojo/dom-class dojo/dom-construct dojo/dom-style dijit/_WidgetBase dijit/_TemplatedMixin esri/dijit/geoenrichment/Pagination esri/dijit/geoenrichment/PageNavigator ../../supportClasses/ViewModes ../../supportClasses/tableJson/TableJsonUtil ../../supportClasses/tableJson/TablePrettyParameters ../../sections/supportClasses/SectionContentFitModes ../utils/InfographicThemeUtil esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/InvokeUtil esri/dijit/geoenrichment/utils/ObjectUtil esri/dijit/geoenrichment/utils/WaitingUtil dojo/text!../../templates/PaginatableTableInfographic.html".split(" "),
function(g,h,n,w,p,q,l,x,y,z,A,k,B,r,t,C,u,m,v,D,E){g=g([x,y],{templateString:E,viewModel:null,theme:null,parentWidget:null,currentFeatureIndex:null,isEditMode:!1,minRowHeight:40,maxBulletsLimit:5,hasResizableColumns:!0,allowSorting:!0,noDataText:null,pagination:null,pageNavigator:null,_titleSection:null,_sections:null,_currentInfographicJson:null,_isSinglePage:!1,_sectionJsons:null,_columnWidths:null,postCreate:function(){this.inherited(arguments);this._showEmptyView(!1);this._sections=[];this._createPagination();
this._createPageNavigator()},_createPagination:function(){var a=this;this.pagination=(new z({createItemContainer:h.hitch(this,this._createItemContainer),scrollAnimation:"slide",cyclicPagination:!1,autoCenter:"stretch:1,1",detachChildrenUponHiding:!0,onPageChanged:function(){a.pageNavigator.setCurrentPageIndex(a.pagination.get("currentPage"))},onNodePlaced:function(c,f){a._updateItemContainer(c,f)}})).placeAt(this.paginationDiv);this.own(this.pagination);this.pagination.set("items",[]);this.pagination.startup()},
_createPageNavigator:function(){var a=this;this.pageNavigator=(new A({showArrows:!1,getNumPages:function(){return a.pagination.get("items").length},onPageChanged:function(c){a.pagination.set("currentPage",c)}})).placeAt(this.pageNavigatorDiv);this.own(this.pageNavigator)},_createItemContainer:function(){var a=q.create("div",{"class":"paginatableTableInfographic_paginationRoot"});a.style.width=this._getPageWidth()+"px";a.style.height=this._getPageHeight()+"px";return a},_updateItemContainer:function(a,
c){var f=this,e;if(a&&a.parentNode){q.empty(a);var b=this._getSectionByJson(c);if(b&&b.domNode)b.placeAt(a),this._columnWidths&&(e=b.getTables()[0],this._columnWidths.forEach(function(a,b){e.columns[b].style.width=a}),e.refresh());else{b&&b.destroy();var d={};d.initialWidth=this._getPageWidth();d.json=c;d.viewModel=this.viewModel;d.theme=this.theme;d.hasFixedLayout=!1;d.parentWidget=this;d.noContentOffset=!0;d.tableParams={allowSorting:this.allowSorting,trimTextIfOverflows:!0,autoDetectUrl:!0,keepGridWidthWhenResized:!0,
hasResizableColumns:this.hasResizableColumns,disableResizableColumnsAutoDetection:!this.hasResizableColumns,fitParentWhenResized:!0,enableAsyncRendering:!this.isEditMode,asyncBatchSize:c.stack[0].data.columns.length,layoutDefaults:{columnMinWidth:r.MIN_COLUMN_WIDTH},onColumnWidthChanged:function(){f._columnWidths=e&&e.columns.map(function(a){return a.style.width})}};d.initialViewMode=this.isEditMode?k.EDIT:k.PREVIEW_VALUES;h.mixin(d,this._prepareSectionCreationParams(d));this._columnWidths&&this._columnWidths.forEach(function(a,
b){c.stack[0].data.columns[b].style.width=a});b=this.viewModel.layoutBuilder.createElement("section",d,a);this._sections.push(b);this._putSectionToHash(b,c);b.setResizedHeight(this._getPageHeight());b.setWidth(this._getPageWidth());e=b.getTables()[0];n(e.getRenderPromise(),function(){e.domNode&&(f._resizeSection(b),e.onSortingChanged=function(a){f._setSorting(a)},f._sorting&&e.setSorting(f._sorting,{doNotRefresh:!0}))})}return b}},_resizeSection:function(a){if(this._currentInfographicJson.scaleToFitHeight){var c=
0,f=a.getTables();f.forEach(function(a){c+=a.store.data.length});f.forEach(function(a,b){b=a.store.data.length;var d=b/c;b=Math.max(this._getPageHeight()*d,b*this.minRowHeight);a.resizeToFitHeight(b,!1)},this)}this._adjustTablesVertically(a);a.fitContentNicely({fitMode:t.WIDTH})},_adjustTablesVertically:function(a){var c=0;a.getTables().forEach(function(a,e){0<e&&a.setGridPosition(void 0,c);c+=a.domNode.clientHeight},this)},_prepareSectionCreationParams:function(a){return null},_getPageWidth:function(){return this.width},
_getPageHeight:function(){return this.height-this._getTitleHeight()-this._getFooterHeight()},_getTitleHeight:function(){return this._currentInfographicJson.titleSectionJson?B.getTableHeight(this._currentInfographicJson.titleSectionJson.stack[0])+r.TITLE_GAP:0},hasTitle:function(){return 0<this._getTitleHeight()},_getFooterHeight:function(){return this._isSinglePage?0:30},_sectionsHash:null,_getSectionByJson:function(a){this._sectionsHash=this._sectionsHash||{};a._idInPagination||(a._idInPagination=
w());return this._sectionsHash[a._idInPagination]},_putSectionToHash:function(a,c){this._sectionsHash&&(this._sectionsHash[c._idInPagination]=a)},_updatePromise:null,updateInfographic:function(a){if(this.domNode)return this._currentInfographicJson=a,this._updateInfographicJsonTheme(),this.domNode.style.backgroundColor=this._getInfographicBackgroundColor(),this.onContentLoadingStart(),this._updatePromise=m.invoke(this,"_doUpdateContent",50),D.showProgressPromise(this.domNode,this._updatePromise),this._updatePromise.always(function(){this.onContentLoadingEnd()}.bind(this)),
this._updatePromise},_updateInfographicJsonTheme:function(){var a=this.viewModel.getStaticInfographicDefaultStyles(this.theme);C.applyThemeSettingsPaginatableInfographicJson(this._currentInfographicJson,a)},getUpdatePromise:function(){return this._updatePromise},_getInfographicBackgroundColor:function(){var a=this.viewModel.getStaticInfographicDefaultStyles(this.theme);return this._currentInfographicJson.style.backgroundColor||a&&a.backgroundColor},_doUpdateContent:function(){if(this.domNode&&this.width)return this._destroySections(),
n(this._buildSectionJsonsAndStat(),function(a){this._sectionJsons=a&&a.sectionJsons;this._sectionJsons&&this._sectionJsons.length||(a=this._sectionJsons=null);this._showEmptyView(!a);a&&(this._syncJsonDimensions(),l.set(this.domNode,{width:this.width+"px",height:this.height+"px"}),setTimeout(this._syncEmptyViewPlaceholder.bind(this)),this._isSinglePage=1===a.sectionJsons.length,p[this._isSinglePage?"add":"remove"](this.domNode,"singlePage"),this._renderTitleSection(),this.paginationDiv.style.top=
this._getTitleHeight()?this._getTitleHeight()+"px":"",this.paginationDiv.style.bottom=this._getFooterHeight()?this._getFooterHeight()+"px":"",this.pagination.set("items",a.sectionJsons),this.pagination.resize(),this.pageNavigator.showAsBullets(a.sectionJsons.length<=this.maxBulletsLimit),this.pageNavigator.reset(),this.pageNavigator.currentPageLabel.style.color=this.viewModel.getDocumentDefaultStyles(this.theme).color,this._renderFootNote(),p[this.footnoteDiv.innerHTML?"add":"remove"](this.domNode,
"hasFootnote"));this.onContentUpdated()}.bind(this))},_buildSectionJsonsAndStat:function(){},_renderTitleSection:function(){if(this._currentInfographicJson.titleSectionJson){var a={};a.initialWidth=this._getPageWidth();a.json=this._currentInfographicJson.titleSectionJson;a.viewModel=this.viewModel;a.theme=this.theme;a.hasFixedLayout=!1;a.parentWidget=this;a.noContentOffset=!0;a.tableParams={trimTextIfOverflows:!0};a.initialViewMode=this.isEditMode?k.EDIT:k.PREVIEW_VALUES;h.mixin(a,this._prepareTitleSectionCreationParams());
this._titleSection=this.viewModel.layoutBuilder.createElement("section",a,this.titleDiv);this._titleSection.setWidth(this._getPageWidth());this._titleSection.fitContentNicely({fitMode:t.WIDTH})}},_prepareTitleSectionCreationParams:function(){return null},_renderFootNote:function(){},_showEmptyView:function(a){u[a?"hide":"show"](this.dataDiv);u[a?"show":"hide"](this.noDataPlaceHolder);a&&this._syncEmptyViewPlaceholder()},_syncEmptyViewPlaceholder:function(){this.noDataPlaceHolder&&(this.noDataPlaceHolderLabel.innerHTML=
this.noDataText,l.set(this.noDataPlaceHolder,"paddingTop",(this.height-l.get(this.noDataPlaceHolder,"height"))/2+"px"))},_sorting:null,_setSorting:function(a){this._sorting=a;m.invoke(this,"_doUpdateContent",50)},notifyShown:function(){this._sections.forEach(function(a){a.notifyShown()})},width:null,height:null,resize:function(a,c){void 0!==a&&(this.width=a,this.height=c);return this._checkNeedResize()&&m.invoke(this,"_doUpdateContent",50)},_checkNeedResize:function(){return this._currentInfographicJson&&
this.width&&this.height&&(!v.compareEqual(this._currentInfographicJson.style.width,this.width,1)||!v.compareEqual(this._currentInfographicJson.style.height,this.height,1))},_syncJsonDimensions:function(){this._currentInfographicJson.style=this._currentInfographicJson.style||{};this._currentInfographicJson.style.width=this.width;this._currentInfographicJson.style.height=this.height},toJson:function(){return h.clone(this._currentInfographicJson)},onContentLoadingStart:function(){},onContentLoadingEnd:function(){},
onContentUpdated:function(){},_destroySections:function(){this._titleSection&&this._titleSection.destroy();this._titleSection=null;this._sections.forEach(function(a){a.destroy()});this._sections.length=0},destroy:function(){this._destroySections();this.inherited(arguments)}});g.MIN_ROW_HEIGHT=40;g.BOTTOM_AREA_HEIGHT=30;return g});