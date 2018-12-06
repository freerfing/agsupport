// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/map/layers/MapContentBuilder","esri/layers/GraphicsLayer ./locator/LocatorPointsBuilder ./std/StdPolygonsBuilder ./thisAreas/AreaFeatureLayersBuilder ./thisAreas/ThisAreasHighlighter ./LayersSorter".split(" "),function(e,f,g,h,k,l){return{addLayersToMap:function(b,a){var c=new l(b),d=new e;d.id="popupLayer";b.addLayer(d);d=h.addAreaFeatures({features:a.features,featureIndexToAreaIndexMap:a.featureIndexToAreaIndexMap,analysisAreas:a.analysisAreas,
map:b,attachmentsStore:a.attachmentsStore},c);k.registerThisLayersForHighlighing({thisAreasHighlightController:a.thisAreasHighlightController,calculatorFieldName:a.calculatorFieldName,thisAreaLayers:d.polygonLayers,thisAreaLayerIndexToAreaIndex:d.polygonLayerIndexToAreaIndex,map:b});g.addStdPolygons({stdPolygonsControllers:a.stdPolygonsControllers,geClient:a.geClient,countryID:a.countryID,hierarchy:a.hierarchy,calculatorFieldName:a.calculatorFieldName,map:b},c);f.addLocatorPoints({locatorPointsControllers:a.locatorPointsControllers,
geClient:a.geClient,countryID:a.countryID,calculatorFieldName:a.calculatorFieldName,map:b},c);c.addFromAdditionalLayerInfos(a.additionalLayerInfos);c.sortLayers()}}});