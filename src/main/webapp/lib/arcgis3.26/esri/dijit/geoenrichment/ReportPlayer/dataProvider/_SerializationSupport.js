// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProvider/_SerializationSupport","dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/when dojo/promise/all ./supportClasses/AnalysisAreaJsonUtil ./supportClasses/attachments/AttributesUtil ./supportClasses/attachments/NotesUtil ./supportClasses/attachments/CustomAttachmentsStore ./supportClasses/GEUtil ../core/supportClasses/templateJsonUtils/TemplateJsonSerializer ../core/supportClasses/templateJsonUtils/TemplateJsonAnalyzer ../core/infographics/dataDrilling/EnrichUtil ../core/infographics/utils/InfographicJsonUtil ../core/conversion/portalToEditorUtils/variables/PlayerVariableProvider ../core/infographics/InfographicTypes esri/dijit/geoenrichment/ReportPlayer/countryConfig ../../utils/ProjectionUtil".split(" "),
function(r,l,t,g,f,k,u,v,w,x,m,y,z,n,A,B,p,C){var q={getAttachmentsStoreJson:function(a,b){function c(){return f([a.getAttachments(),a.getAttributes(),a.getNotes()]).then(function(a){var b=a[0]||[],c=a[1]||[],h=a[2]||[];return f(b.map(function(a){return f([a.getThumbnail(),a.getAttachmentUrl()]).then(function(b){a.__thumbnail=b[0];a.__url=b[1]})})).then(function(){return{attachments:b.map(function(a){var b=a.__thumbnail,c=a.__url;delete a.__thumbnail;delete a.__url;return{description:a.description,
thumbnail:b,url:c}}),attributes:c.map(function(a){return u.attributeToJson(a)}),notes:h.map(function(a){return v.noteToJson(a)})}})})}if(!a)return null;var d=[],e=[];if(a.setCurrentAnalysisAreaIndex&&a.supportsMultipleAreas)for(var h=0;h<b;h++)a.setCurrentAnalysisAreaIndex(h),e.push(g(c(),function(a){d.push(a)}));else e.push(g(c(),function(a){d.push(a)}));return f(e).then(function(){return{supportsMultipleAreas:a.supportsMultipleAreas,areaAttachements:d}})},getAttachmentsStoreFromJson:function(a){return a||
a.areaAttachements?new w(a.areaAttachements?a:{areaAttachements:[a]}):null}};return r(null,{reportDataToJson:function(a,b){var c=this;b=b||{};return g(b.allowDataDrilling&&this._serializeDataDrilling(a),function(){return g(q.getAttachmentsStoreJson(a.attachmentsStore,a.analysisAreas.length),function(d){var e=l.mixin({},a.config);!1!==b.forceFixedDataMode&&delete e.geoenrichmentUrl;d={isClassic:a.isClassic,isMultiFeature:a.isMultiFeature,reportType:a.reportType,reportTitle:a.reportTitle,templateJson:m.serialize(a.templateJson),
reportObject:c._prepareReportObjectJson(a.reportObject),fieldData:a.fieldData,analysisAreas:k.areasToJson(a.analysisAreas),combinedAreasInfo:k.combinedAreasInfoToJson(a.combinedAreasInfo),reverseAnalysisAreasOnMap:a.reverseAnalysisAreasOnMap,infographicOptions:a.infographicOptions&&a.infographicOptions.toJson(),attachmentsStore:d,templateVariableProvider:a.templateVariableProvider&&a.templateVariableProvider.toJson(),config:e,countryConfig:p.toJson(),mapImageInfos:b.mapImageInfos};console.log("_SerializationSupport.js \x3d\x3e reportDataJson");
console.log(d);return d})})},_prepareReportObjectJson:function(a){var b={},c;for(c in a)a[c]&&"object"!==typeof a[c]&&(b[c]=a[c]);return b},_serializeDataDrilling:function(a){var b=z.getEnrichInfosForTemplateJson(a.infographicOptions.countryID,a.templateJson),c=[];c.push(this.enrichFieldData(b,l.mixin({analysisAreas:a.analysisAreas,fieldData:a.fieldData},a.config)));c.push(this._enrichInfographicVariables(a,b));var d={};b&&b.forEach(function(a){a.isChart||a.isGeneral?a.fields.forEach(function(a){a.mapTo&&
(d[a.mapTo]=1)}):a.isInfographic&&(a.fieldInfos?a.fieldInfos.forEach(function(a){a.hasVariable&&a.fullName&&(d[a.fullName]=1)}):a.variables&&a.variables.forEach(function(a){d[a]=1}))});var b=y.collectVariablesStats(a.templateJson),e;for(e in b)d[e]=1;c.push(a.templateVariableProvider.tryFetchDataVintageInfo(a.config,d));return f(c)},_enrichInfographicVariables:function(a,b){var c=a.infographicOptions;return g(c.getOptions().getItems(c.countryID),function(){var d=[];b.forEach(function(b){b.isInfographic&&
b.variables&&a.analysisAreas.forEach(function(a,e){c.setCurrentAnalysisAreaIndex(e);var f=new t;a=c.createGeoenrichment({currentFeatureIndex:e});a.onDone=function(){f.resolve()};a.country=c.countryID;e=B.supportsComparison(b.type);a.setGeoLevels(e?n.getSubLevels(b):null,e?n.getHighestLevel(b):null);a.setVariables(b.variables);a.setStudyArea(c.studyArea);d.push(f.promise)})});return f(d)})},reportDataFromJson:function(a){var b=a.fieldData;b.featureData&&(b.areaData=b.featureData.map(function(a){return{mainCalculator:{data:a}}}),
delete b.featureData);b={isClassic:a.isClassic,isMultiFeature:a.isMultiFeature,reportType:a.reportType,reportTitle:a.reportTitle,templateJson:m.deserialize(a.templateJson),reportObject:a.reportObject,fieldData:b,analysisAreas:k.areasFromJson(a.analysisAreas),combinedAreasInfo:k.combinedAreasInfoFromJson(a.combinedAreasInfo),reverseAnalysisAreasOnMap:a.reverseAnalysisAreasOnMap,infographicOptions:a.infographicOptions&&this._infographicOptionsProvider.getInfographicOptionsFromJson(a.infographicOptions),
attachmentsStore:a.attachmentsStore&&q.getAttachmentsStoreFromJson(a.attachmentsStore),templateVariableProvider:a.templateVariableProvider&&new A(a.templateVariableProvider),config:a.config||{},mapImageInfos:a.mapImageInfos};x.setGeoenrichmentUrl(b.config.geoenrichmentUrl);b.config.geometryServiceUrl&&C.setGeometryServiceUrl(b.config.geometryServiceUrl);p.fromJson(a.countryConfig);return b}})});