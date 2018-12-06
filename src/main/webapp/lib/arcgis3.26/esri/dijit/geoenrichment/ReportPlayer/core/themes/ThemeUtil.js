// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/themes/ThemeUtil",["dojo/_base/lang","esri/dijit/geoenrichment/utils/ColorUtil","esri/dijit/geoenrichment/utils/ObjectUtil"],function(n,d,t){function u(b){var c=d.isLightColor(b);return d.transform(b,{dv:c?-7:7}).toHex()}var v={getPanelTitleColor:function(b){var c=d.isLightColor(b);return d.transform(b,{dv:c?-50:50}).toHex()},getChartElementBackgroundColor:function(b){var c=d.isLightColor(b);return d.transform(b,{dv:c?-13:13}).toHex()}},k={getThemeColors:function(b){return[b.document.backgroundColor,
b.infographic.staticInfographic.icon.backgroundColor,b.infographic.staticInfographic.highlightedIcon.backgroundColor]},generateChartColors:function(b,c,a){a=a||{};var h=a.gradientFactor||1,e=[c,d.transform(c,{dv:-20*h}).toHex(),d.transform(c,{dv:-40*h}).toHex(),d.transform(c,{dv:-50*h}).toHex(),d.transform(c,{dv:-55*h}).toHex(),d.transform(c,{dv:-60*h}).toHex(),d.transform(c,{dv:-65*h}).toHex(),d.transform(c,{dv:-70*h}).toHex()];if(a.numLighterColors)for(var g=0;g<a.numLighterColors;g++)e.unshift(d.transform(c,
{dv:20*h*(g+1),ds:-20*(g+1)}).toHex());b&&b!==c&&e.unshift(b);var f={};return e.filter(function(a){return f[a]?!1:f[a]=!0})},applyThemeColorsToTheme:function(b,c,a,h){var e=c[0],g=c[1];c=c[2];var f=d.getContrastColor(e).toHex(),p="#FFFFFF"===e.toUpperCase()?"#4C4C4C":f,l=d.isLightColor(e),q=v.getChartElementBackgroundColor(e),m=v.getPanelTitleColor(e),n={overrideStyles:{Default:{color:p,backgroundColor:"transparent"},ReportTitle:{color:c,backgroundColor:"transparent"},TableHeader:{color:d.getContrastColor(g,
void 0,void 0,200).toHex(),backgroundColor:g},GreyText:{color:d.transform(e,{dv:l?-33:33}).toHex(),backgroundColor:"transparent"},BlueText:{color:"#56A5D8",backgroundColor:"transparent"},AlternatingRow:{color:p,backgroundColor:d.transform(e,{dv:l?-7:7}).toHex()}}},r={lineColor:f,gridLinesColor:f,gridStripesColor:u(e),gridStripesColorAlt:"transparent",axisStyle:{color:f},titleStyle:{color:f}},w={lineColor:f,gridLinesColor:f,gridStripesColor:u(e),gridStripesColorAlt:"transparent",baseLineColor:f,axisStyle:{color:f},
titleStyle:{color:f}},x=d.isLightColor(e),e={document:{color:p,backgroundColor:e},table:n,chart:{backgroundColor:"transparent",titleStyle:{color:m},dataLabelsStyle:{color:f},xAxis:r,yAxis:w,legendStyle:{color:f,backgroundColor:e},minMaxLegend:{titleStyle:{color:f}},ring:{ringBackground:{backgroundColor:q}},gauge:{dataLabelStyle:{color:g},othersColor:q,arrowIndicator:{lineColor:m,backgroundColor:m}},icon:{backgroundColor:g},columnBarBackground:{backgroundColor:q},comparisonInfo:{lineColor:x?"#666666":
"#BBBBBB"}},infographic:{backgroundColor:"transparent",agePyramid:{theme:l?"light":"common",male:{backgroundColor:g},female:{backgroundColor:c}},staticInfographic:{backgroundColor:"transparent",icon:{backgroundColor:g},highlightedIcon:{backgroundColor:c},iconBarBackground:{},titleLine:{color:d.transform(e,{dv:l?-40:40}).toHex()},titleStyle:{color:m},variableLabelStyle:{color:g},variableLabelStyleHighlighted:{color:c},variableLabelStyleContrast:{color:e},variableDescriptionStyle:{color:d.transform(e,
{dv:l?-50:50}).toHex()}}}};h&&h(e);t.populateObject(b,e,!0);b&&b.chart&&(b.chart.colors=a&&a.length?a:k.generateChartColors(g,c))}},r={fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,textDecoration:1,color:1};k.filterTextStyles=function(b){var c={},a;for(a in r){var d=b[a];void 0!==d&&(c[a]=d)}return c};k.applyTextStyleToTheme=function(b,c){function a(a,b){var d=n.mixin({},c);a&&delete d.color;b||delete d.fontSize;return d}c=k.filterTextStyles(c);var d={document:a(),table:{overrideStyles:{Default:a(!1,
!0),ReportTitle:a(!1,!0),TableHeader:a(!1,!0),AlternatingRow:a(!1,!0)}},chart:{titleStyle:a(),dataLabelsStyle:a(),xAxis:{axisStyle:a(),titleStyle:a()},yAxis:{axisStyle:a(),titleStyle:a()},legendStyle:a(),minMaxLegend:{titleStyle:a(),minVariableLabelStyle:a(!0),maxVariableLabelStyle:a(!0)}},infographic:{staticInfographic:{titleStyle:a(),variableLabelStyle:a(),variableDescriptionStyle:a(),variableLabelStyleHighlighted:a(),variableLabelStyleContrast:a()}}};t.populateObject(b,d,!0)};k.removeBackgroundFromThemeElements=
function(b,c){if(b&&(b.chart.backgroundColor="transparent",b.infographic.backgroundColor="transparent",b.infographic.staticInfographic=b.infographic.staticInfographic||{},b.infographic.staticInfographic.backgroundColor="transparent",c))for(var a in b.table.overrideStyles)b.table.overrideStyles[a].backgroundColor="transparent"};return k});