// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/sections/dynamicSettings/comparison/_ComparisonSettingsBuilder",["dojo/when","../../../infographics/InfographicTypes"],function(c,d){return{provideComparisonSettings:function(e){var a=e.getInfographic();return a&&a.getType()===d.COMPARISON_TABLE?c(a.getContentInitPromise(),function(){var b=a.getInnerInfographic();return c(b.getStatRanges(),function(a){return{statRanges:1<b.getNumAreasTotal()&&a,isChartView:b.isChartView(),comparisonTableInfographic:b}})}):
null}}});