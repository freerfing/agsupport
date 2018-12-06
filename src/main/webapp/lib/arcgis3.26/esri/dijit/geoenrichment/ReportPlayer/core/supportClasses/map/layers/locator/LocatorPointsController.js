// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/map/layers/locator/LocatorPointsController","dojo/_base/declare dojo/on dojo/sniff dijit/Destroyable ../../../../../dataProvider/supportClasses/AreaDataUtil esri/dijit/geoenrichment/utils/DeviceUtil".split(" "),function(h,f,l,m,g,n){return h(m,{_info:null,_fieldData:null,_isMultiFeature:null,_calcDataArray:null,_currentFeatureIndex:null,_layerNames:null,constructor:function(a,b,d,c){this._info=a;this._fieldData=b;this._isMultiFeature=
d;this._currentFeatureIndex=c;this._layerIndexes={};this._layerNames={};this._rendererJsons={};this._mapInfos={};this._graphicLayerInfos={}},getCalculatorName:function(){return this._info.calculatorName},getVariableObjects:function(){return this._info.variableObjects},getLayerID:function(){return this._info.layerID},getLayerUrl:function(){return this._info.layerUrl},getLayerName:function(a){return this._layerNames[a]||this._info.layerName},setLayerName:function(a,b){this._layerNames[a]=b},getCalculatorDataArray:function(){if(!this._calcDataArray)if(this._isMultiFeature){var a=
g.combineAreaDataObjectCalculators(this._fieldData.areaData,this.getCalculatorName(),{removeDuplicates:!0});this._calcDataArray=a.thisAreas.concat(a.comparisonLevels)}else this._calcDataArray=(a=g.getAreaDataObjectCalculator(this._fieldData.areaData[this._currentFeatureIndex],this.getCalculatorName()))&&[a.data].concat(a.comparisonLevels);return this._calcDataArray},_rendererJsons:null,getRendererJson:function(a){return this._rendererJsons[a]},setRendererJson:function(a,b){this._rendererJsons[a]=
b},_layerIndexes:null,getLayerIndex:function(a){return this._layerIndexes[a]},setLayerIndex:function(a,b){this._layerIndexes[a]=b},_mapInfos:null,getMapInfo:function(a){return this._mapInfos[a]},getMapInfos:function(){var a=[],b;for(b in this._mapInfos)a.push(this._mapInfos[b]);return a},setMapInfo:function(a,b){this._mapInfos[a]=b},_getPointIndexForCellFunc:null,_getCellForPointAtFunc:null,_highlightedCell:null,setLocatorTableCallbacks:function(a){this._getPointIndexForCellFunc=a.getPointIndexForCellFunc;
this._getCellForPointAtFunc=a.getCellForPointAtFunc},registerLocatorTable:function(a){var b=this,d;a.set("highlightRowsOnHover",!0);f(a.domNode,"mouseover,mousemove",function(){var c=a.getOverFieldCell();c&&c!==d&&(d=c,b._highlightGraphicForFieldCell(d))});f(a.domNode,"mouseout",function(){b._highlightGraphicForFieldCell(null);d=null})},_highlightRowForGraphic:function(a,b){this._highlightedCell&&(this._highlightedCell.parentGrid&&this._highlightedCell.parentGrid.setCellRowHighlighted(this._highlightedCell,
!1),this._highlightedCell=null);b&&this._getCellForPointAtFunc&&(a=a.getPointIndexForGraphicFunc(b),(a=this._getCellForPointAtFunc(a))&&a.parentGrid&&(a.parentGrid.setCellRowHighlighted(a,!0),this._highlightedCell=a))},_graphicLayerInfos:null,setLocatorPointsLayer:function(a,b,d,c){this._unSetInfo(a);b={map:d,graphicsLayer:b,getPointIndexForGraphicFunc:c.getPointIndexForGraphicFunc,getGraphicForPointAtFunc:c.getGraphicForPointAtFunc,setGraphicHighlightedFunc:c.setGraphicHighlightedFunc,layerMouseOverHandle:null,
layerMouseOutHandle:null,highlightedGraphic:null,overGraphic:null};this._graphicLayerInfos[a]=b;this._addLayerListeners(b)},_addLayerListeners:function(a){var b=this,d=a.map,c=a.graphicsLayer,k=n.isMobileDevice(),g=k?c:l("touch")?d:c,h=k?"mouse-over":l("touch")?"mouse-down, mouse-move":"mouse-move";a.layerMouseOverHandle=f(g,h,function(e){e.graphic&&e.graphic._graphicsLayer===c&&a.overGraphic!==e.graphic&&((a.layerMouseOutHandle&&a.layerMouseOutHandle.remove(),a.layerMouseOutHandle=null,b._removeHighlight(a),
a.overGraphic=e.graphic,b._highlightRowForGraphic(a,a.overGraphic),a.setGraphicHighlightedFunc(a.overGraphic,!0),k)?d.infoWindow&&(d.infoWindow.setFeatures([a.overGraphic]),d.infoWindow.show(e.mapPoint,{closestFirst:!0})):a.layerMouseOutHandle=f.once(c,"mouse-out",function(c){b._removeHighlight(a)}))})},_highlightGraphicForFieldCell:function(a){for(var b in this._graphicLayerInfos){var d=this._graphicLayerInfos[b];this._removeHighlight(d);if(a){var c=this._getPointIndexForCellFunc(a);if(c=d.getGraphicForPointAtFunc(c))d.setGraphicHighlightedFunc(c,
!0),d.highlightedGraphic=c}}},_removeHighlight:function(a){this._highlightRowForGraphic(a,null);a.highlightedGraphic&&(a.setGraphicHighlightedFunc(a.highlightedGraphic,!1),a.highlightedGraphic=null);a.overGraphic&&a.setGraphicHighlightedFunc(a.overGraphic,!1);a.overGraphic=null;a.map.infoWindow&&a.map.infoWindow.hide()},setPointVisibleAt:function(a,b){for(var d in this._graphicLayerInfos){var c=this._graphicLayerInfos[d].getGraphicForPointAtFunc(a);if(c)c[b?"show":"hide"]()}},_unSetInfo:function(a){var b=
this._graphicLayerInfos[a];delete this._graphicLayerInfos[a];b&&(b.layerMouseOverHandle&&b.layerMouseOverHandle.remove(),b.layerMouseOutHandle&&b.layerMouseOutHandle.remove())},_unSetLayers:function(){Object.keys(this._graphicLayerInfos).forEach(this._unSetInfo.bind(this));this._graphicLayerInfos={}},destroy:function(){this._unSetLayers()}})});