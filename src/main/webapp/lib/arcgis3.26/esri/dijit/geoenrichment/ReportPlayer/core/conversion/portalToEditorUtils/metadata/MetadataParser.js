// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/portalToEditorUtils/metadata/MetadataParser",["esri/dijit/geoenrichment/utils/JsonXmlConverter","./DemographicCalculatorsParser","./LocatorCalculatorsParser","./map/MapCalculatorsParser","./TradeAreaCalculatorsParser"],function(d,e,f,g,h){return{parseMetadataXML:function(a,c,b){b.log&&b.log(a.data);(a=d.parseXml(a.data))&&a.tags&&(h.parseTradeAreaCalculators(a,b),e.parseDemographicCalculators(a,c,b),f.parseLocatorCalculators(a,c,b),g.parseMapCalculators(a,
c))}}});