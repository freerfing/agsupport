// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/reportingEngine/converters/DocumentConverter",["dojo/_base/lang","../../ConversionUtil","../ReportingEnginePageSizeCompatibilityUtil"],function(d,c,f){var e={buildDocumentTag:function(b){var a=c.pxToPtObj(d.mixin({},b.report.templateJson.documentOptions)),a={name:"HTMLextReport",attributes:{version:"10.1",pagesize:f.getReportingEnginePageSize(a.pagesize,a.orientation),orientation:a.orientation,left:a.left,right:a.right,top:a.top,bottom:a.bottom,
style:c.composeStyleString(e.buildDocumentStyle(b))},tags:[{name:"def",attributes:{align:a.align,lineSpacing:a.lineSpacing}}]};b.addDefaultQuery&&a.tags.unshift({name:"queries",tags:[{name:"query",attributes:{name:"default",table:"headers"}}]});return{documentTag:a}},buildDocumentStyle:function(b){b=c.pxToPtObj(d.mixin({},b.report.templateJson.documentOptions));return{fontSize:b.fontSize,fontFamily:b.fontFamily}}};return e});