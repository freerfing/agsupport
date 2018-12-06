// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/comparison/jsonBuilder/_Util",["../../../grid/coreUtils/GridDataUtil","../../../comparison/ComparisonUtil","esri/dijit/geoenrichment/utils/ObjectUtil"],function(e,f,g){var b={};b.valueFormatFunction=f.valueFormatFunction;b.setValueToGridData=function(a,c,d){var b=c.fieldInfos[d];delete c.fieldInfos[d];a=a[b.name];void 0===a||"string"===typeof a?c[d]=a||"":(c[d]=g.formatNumber(a,{places:b.decimals,preserveTrailingZeroes:!0}),e.setNumericDataValue(a,
c,d));return{value:a,formattedValue:c[d],decimals:b.decimals}};return b});