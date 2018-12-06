// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/gridLayoutCalcUtils/columns/ColumnDataUtil",["../GridLayoutCalculatorQueryUtil"],function(g){var e={getFieldWidth:function(a,c,b){var d="string"===typeof b?g.fieldToColumn(a,b):b;b=d?d.field:"string"===typeof b?b:null;return a.looseResize?e.getFieldWidthOwn(a,c,b)||d&&d.style.width:d&&d.style.width},getFieldWidthOwn:function(a,c,b){if(a.looseResize)return c.style.fields=c.style.fields||{},(c.style.fields[b]=c.style.fields[b]||{}).width},
setFieldWidth:function(a,c,b,d,e){var h="string"===typeof b?g.fieldToColumn(a,b):b,f=h?h.field:"string"===typeof b?b:null;a.looseResize?(e?g.getRowSpannedData(a,c,f)||[c]:[c]).forEach(function(a){a.style.fields=a.style.fields||{};(a.style.fields[f]=a.style.fields[f]||{}).width=d}):h&&(h.style.width=d)},calcFieldWidth:function(a,c,b,d){var f=0;1<(c.columnSpans&&c.columnSpans[b])?g.getSpannedColumns(a,b,c.columnSpans[b]).forEach(function(b){d!==b.field&&(f+=e.getFieldWidth(a,c,b.field))}):f=e.getFieldWidth(a,
c,b);return f},recalcGridWidth:function(a){a._width=0;var c=a.store.data[0];a.columns.forEach(function(b){a._width+=e.getFieldWidth(a,c,b.field)});return a._width},getAllowedWidth:function(a){return a.fitParentWhenResized?a.getAllowedWidthFromParent():a.getAllowedWidth()}};return e});