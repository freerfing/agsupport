// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/core/templates/SectionDynamicMapSettings.html":'\x3cdiv class\x3d"esriGEReportPlayer_sectionDynamicMapSettings"\x3e\r\n    \x3cdiv class\x3d"esriGERowHigh"\x3e\r\n        \x3clabel data-dojo-attach-point\x3d"showLegendCheckboxLabel"\x3e\x26nbsp;${nls.showLegend}\x3c/label\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/geoenrichment/ReportPlayer/core/sections/dynamicSettings/map/SectionDynamicMapSettings","dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin esri/dijit/geoenrichment/TriStateItem dojo/text!../../../templates/SectionDynamicMapSettings.html dojo/i18n!esri/nls/jsapi".split(" "),function(c,d,e,f,g,b){b=b.geoenrichment.dijit.ReportPlayer.SectionDynamicSettingsBuilder;return c([d,e],{templateString:g,nls:b,postCreate:function(){this.showLegendCheckbox=new f(this.showLegendCheckboxLabel);
this.showLegendCheckbox.onClick=function(){this.onLegendVisibilityChanged(this.showLegendCheckbox.get("checked"))}.bind(this)},setLegendVisible:function(a){this.showLegendCheckbox.set("checked",a)},onLegendVisibilityChanged:function(a){},setVisualState:function(a){a&&(a=a.stackElements[0])&&this.showLegendCheckbox.set("checked",a.showLegend)}})});