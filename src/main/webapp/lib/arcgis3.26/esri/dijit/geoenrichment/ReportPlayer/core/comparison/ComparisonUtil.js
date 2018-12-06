// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/comparison/ComparisonUtil",["esri/dijit/geoenrichment/utils/ObjectUtil"],function(b){return{valueFormatFunction:function(a,c){return void 0===a||"string"===typeof a?a:b.formatNumber(a,{places:c.decimals,preserveTrailingZeroes:!0})}}});