// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/core/templates/DynamicInfographic.html":'\x3cdiv data-dojo-attach-point\x3d"viewDiv" class\x3d"dynamicInfographic_viewDiv"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"infographicDiv"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"errorDiv" class\x3d"esriGEReportPlayerErrorMessage"\x3e${nls.dynamicInfographicError}\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/dynamic/DynamicInfographic","dojo/_base/declare dojo/_base/lang dojo/when dojo/dom-style dojo/query dijit/_WidgetBase dijit/_TemplatedMixin esri/dijit/geoenrichment/theme ./_Infographic ../InfographicTypes esri/dijit/geoenrichment/utils/DelayUtil esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/InvokeUtil esri/dijit/geoenrichment/utils/WaitingUtil ../utils/InfographicJsonUtil ../extentions/BaseSelectComparisonExt dojo/text!../../templates/DynamicInfographic.html dojo/i18n!esri/nls/jsapi ../../../_devConfig".split(" "),
function(g,q,h,c,n,r,t,u,p,e,v,l,w,x,k,y,z,m,A){m=m.geoenrichment.dijit.ReportPlayer.Infographics;var f={};f[e.ONE_VAR]=230;f[e.AGE_PYRAMID]=0;f[e.RELATED_VARS]=320;f[e.TAPESTRY]=300;g=g([r,t],{templateString:z,nls:m,viewModel:null,theme:null,currentFeatureIndex:null,_infographic:null,_progressHanlder:null,buildRendering:function(){y.init();this.inherited(arguments)},postCreate:function(){this.inherited(arguments);this._showError(!1)},_currentInfographicJson:null,_getWidgetCreationParams:function(a){var b=
{};switch(a.type){case e.AGE_PYRAMID:b.showVerticalAxis=a.showVerticalAxis;break;case e.ONE_VAR:b.isMultiFeature="number"!==typeof this.currentFeatureIndex&&this.viewModel.dynamicReportInfo&&this.viewModel.dynamicReportInfo.isMultiFeature&&1<this.viewModel.dynamicReportInfo.analysisAreas.length}return b},updateInfographic:function(a){if(this.viewDiv)return this._destroyCurrentInfographic(),this._currentInfographicJson=a,this._enrichInfographicJsonWithProps(a),h(this._createInfographicWidgetFromJson(a),
function(){this._applyTheme(a)}.bind(this))},_enrichInfographicJsonWithProps:function(a){k.setLevels(a,a.levels)},_createInfographicWidgetFromJson:function(a){var b=this,c=this.viewModel.getInfographicDefaultStyles(this.theme);u.set(this.viewDiv,c&&c.agePyramid&&c.agePyramid.theme||"light");if(this.viewModel.dynamicReportInfo&&this.viewModel.dynamicReportInfo.infographicOptions){var d=this.viewModel.dynamicReportInfo.infographicOptions;this.viewModel.dynamicReportInfo.isFixedDataMode||this.viewModel.dynamicReportInfo.geClient.hasCapability("ComparisonLevelsInCalculators")||
(a.calcData=null);this._infographic=(new p({infographicStyleProvider:c,widgetParams:this._getWidgetCreationParams(a),returnGeometry:!1,autoTitle:!1,subtitle:!1,levels:k.getSubLevels(a),highestLevel:k.getHighestLevel(a),onDataRequest:function(){b._showProgress(!0,"data")},onDataReady:function(){h(b.resize(),function(){b._showProgress(!1,"data")})},onDataError:function(){b._showProgress(!1,"data");b._showError(!0)},onExpandedStateChanged:function(){b._doResize()}})).placeAt(this.infographicDiv);this._showProgress(!0,
"item");return h(function(){return a.calcData?{title:a.title,type:a.type,variables:a.variables||a.calcData.variables}:h(d.getOptions().getItems(d.countryID),function(b){var c;b.some(function(b){if(b.variables&&b.variables.length){var d=k.analyzeVariables(a),e=b.variables[0];if(d.variableID&&-1!==e.indexOf(d.variableID)||d.dataCollectionID&&0===e.indexOf(d.dataCollectionID))return c=b,!0}});return c})}(),function(c){b._showProgress(!1,"item");if(c){var f=b.viewModel.dynamicReportInfo.isMultiFeature&&
e.supportsMultiFeature(a.type)&&"number"!==typeof b.currentFeatureIndex,f=d.createGeoenrichment({infographicJson:a,areaData:b.viewModel.dynamicReportInfo.fieldData.areaData,isMultiFeature:f,currentFeatureIndex:b.currentFeatureIndex});b._infographic.setGeoenrichment(f);b._infographic.set("studyArea",d.studyArea);b._infographic.set("countryID",d.countryID);b._infographic.set("type",a.type);b._infographic.set("variables",c.variables);b._infographic.set("title",c.title);b._infographic.startup();var g=
!f.isBusy();a.title=a.title||c.title;return h(b.resize(),function(){g&&b._showProgress(!1,"data")})}b._showError(!0)})}return this._createDummyInfographic(a)},_createDummyInfographic:function(a){},_applyTheme:function(a){var b=this.viewModel.getInfographicDefaultStyles(this.theme);c.set(this._infographic.domNode,"backgroundColor",a.style&&a.style.backgroundColor||b&&b.backgroundColor);c.set(this._infographic.domNode,"fontFamily","inherit")},_destroyCurrentInfographic:function(){this._showError(!1);
this._showProgress(!1);this._infographic&&this._infographic.destroy();this._infographic=null},_itemLoadingState:0,_dataLoadingState:0,_contentLoadingState:0,_showProgress:function(a,b){x[a?"showProgress":"removeProgress"](this.domNode);"item"===b?this._itemLoadingState=a?1:2:"data"===b&&(this._dataLoadingState=a?1:2);1!==this._itemLoadingState&&1!==this._dataLoadingState||0!==this._contentLoadingState||(this._contentLoadingState=1,this.onContentLoadingStart());2===this._itemLoadingState&&2===this._dataLoadingState&&
1===this._contentLoadingState&&(this._contentLoadingState=2,this.onContentLoadingEnd())},_showError:function(a){A.emulateErrors.contentErrors&&(a=!0);l[a?"show":"hide"](this.errorDiv);l[a?"hide":"show"](this.infographicDiv)},_adjustErrorMessage:function(){c.set(this.errorDiv,"paddingTop",c.get(this.domNode,"height")/2-20+"px")},notifyShown:function(){},width:null,height:null,_infographicResizedAtLeastOnce:!1,resize:function(a,b){void 0!==a&&(this.width=a,this.height=b);return w.invoke(this,"_doResize",
50)},_doResize:function(){var a=this;if(this._infographic&&this._infographic.domNode&&l.isNodeInLayout(this.domNode)&&this._currentInfographicJson){this._syncJsonDimensions();var b=this._currentInfographicJson.type,e=Math.max(function(){if("OneVar"===b){var d=n(".OneVarMultiComparison_Table",a.domNode)[0],d=d?c.get(d,"height")+120:0;return Math.max(d,f[b])}return"Tapestry"===b?(d=(d=n(".Tapestry_Main_Table",a.domNode)[0])?c.get(d,"height")+60:0,Math.max(d,f[b])):f[b]}(),this.height);c.set(this._infographic.domNode,
{width:this.width-(e>this.height?20:0)+"px",height:e+"px"});c.set(this.viewDiv,{height:this.height+"px",overflowY:"auto"});this._infographic.resize();this._adjustErrorMessage();return v.delay()}},_syncJsonDimensions:function(){this._currentInfographicJson.style=this._currentInfographicJson.style||{};this._currentInfographicJson.style.width=this.width;this._currentInfographicJson.style.height=this.height},getPreferredHeight:function(){return this._infographic&&c.get(this._infographic.domNode,"height")},
collapseContent:function(){this._infographic&&this._infographic.collapseContent()},getVisualState:function(){return{selectedFeatureId:this._infographic&&this._infographic.getSelectedFeatureID()}},setVisualState:function(a){a&&a.selectedFeatureId&&this._infographic&&this._infographic.setSelectedFeatureID(a.selectedFeatureId)},toJson:function(){return q.clone(this._currentInfographicJson)},onContentLoadingStart:function(){},onContentLoadingEnd:function(){},destroy:function(){this._destroyCurrentInfographic();
this.inherited(arguments)}});g.Infographic=p;return g});