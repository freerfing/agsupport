// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/gridLayoutCalcUtils/rows/RowDataUtil",["../GridLayoutCalculatorQueryUtil"],function(g){var d={getDataHeight:function(b,a,c){return b.looseResize?d.getDataHeightOwn(b,a,c)||a.style.height:a.style.height},getDataHeightOwn:function(b,a,c){if(b.looseResize)return a.style.fields=a.style.fields||{},(a.style.fields[c]=a.style.fields[c]||{}).height},setDataHeight:function(b,a,c,d,e){b.looseResize?(e?g.getColumnSpannedFields(b,a,c)||[c]:[c]).forEach(function(b){a.style.fields=
a.style.fields||{};(a.style.fields[b]=a.style.fields[b]||{}).height=d}):a.style.height=d},calcDataHeight:function(b,a,c,g){var e=0,h=a.rowSpans&&a.rowSpans[c];if(1<h)for(var f=a.index;f<a.index+h;f++)f!==g&&(e+=d.getDataHeight(b,b.store.data[f],c));else e=d.getDataHeight(b,a,c);return e},recalcGridHeight:function(b){b._height=0;var a=b.columns[0].field;b.store.data.forEach(function(c){b._height+=d.getDataHeight(b,c,a)});return b._height}};return d});