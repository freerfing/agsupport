// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/map/layers/std/StdPolygonsBuilder",["./DefaultSymbolRenderer","./LoadedFeaturesSyncronizer","../../symbols/HighlightedSymbolGenerator","esri/dijit/geoenrichment/utils/SymbolUtil"],function(f,h,k,l){var c={addStdPolygons:function(a,g){a.stdPolygonsControllers&&a.stdPolygonsControllers.forEach(function(d){var b=new h({controller:d,layerSorter:g,map:a.map,countryID:a.countryID,hierarchy:a.hierarchy,calculatorFieldName:a.calculatorFieldName,
onLayerCreated:function(b,e){c._registerLayer(b,e,a.map,d,a)}});d.setShownFeaturesChangedListener(function(){b.syncWithShownFeatures()});d.setLoadAllFeaturesListener(function(){return b.loadAllFeatures()});b.syncWithShownFeatures();var e=a.map.on("before-unload",function(){e.remove();b.destroy();b=null})})},_registerLayer:function(a,g,d,b,e){var c=b.getRendererJson(e.calculatorFieldName);k.getHighlightSymbol({graphicsLayer:a,rendererJson:c,defaultHighlightSymbol:f.getDefaultStdSymbolHighlighted()}).then(function(c){var f=
c.symbol;l.simpleFillSymbolToPictureFillSymbol(f).then(function(c){b.setStdPolygonsLayer(e.calculatorFieldName+";"+g,a,d,{getGraphicForAttributesFunc:function(b){return b&&"object"===typeof b&&a.graphics.filter(function(a){return a.attributes.StdGeographyID===b.StdGeographyID})[0]},setGraphicHighlightedFunc:function(a,b){a.setSymbol(b?c||f:null)}})})})},getDefaultStdRenderer:function(){return f.getDefaultStdRenderer()}};return c});