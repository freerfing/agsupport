// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/templateJsonUtils/BlankTemplateJsonUtil",["esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/DocumentOptions","esri/dijit/geoenrichment/utils/PageUnitsConverter","./TemplateJsonModificationUtil"],function(e,f,g){return{createBlankTemplate:function(b){var d={},a=b.documentOptions||e.getDefaultDocumentOptionsGraphicReport(),c=a.top+a.bottom+b.layout.numRows*b.elementHeight;a.pagesize=e.combineCustomSizeString(f.pxToIn(a.left+
a.right+b.layout.numColumns*b.elementWidth),f.pxToIn(c));d.documentOptions=a;a={data:{columns:[],data:[]}};for(c=0;c<b.layout.numColumns;c++)a.data.columns.push({field:"field"+c,style:{width:Number(100/b.layout.numColumns).toFixed(3)+"%"}});for(c=0;c<b.layout.numRows;c++)a.data.data.push({style:{height:b.elementHeight},fieldInfos:{}});d.sectionsTables=[a];g.adjustDocumentOptions(d);return d}}});