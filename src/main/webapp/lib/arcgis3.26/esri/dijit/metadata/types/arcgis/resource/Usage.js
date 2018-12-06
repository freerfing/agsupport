// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/arcgis/resource/templates/Usage.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3c!-- usage --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n    data-dojo-props\x3d"target:\'idSpecUse\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nArcGIS.resource.idSpecUse.caption}\'"\x3e\r\n    \r\n    \x3c!-- specific --\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'specUsage\',minOccurs:1,label:\'${i18nArcGIS.resource.idSpecUse.specUsage}\'"\x3e\r\n    \x3c/div\x3e\r\n    \r\n    \x3c!-- date --\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'usageDate\',minOccurs:0,label:\'${i18nArcGIS.resource.idSpecUse.usageDate}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputDate" data-dojo-props\x3d"allowTime:true"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \r\n    \x3c!-- limitations --\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'usrDetLim\',minOccurs:0,label:\'${i18nArcGIS.resource.idSpecUse.usrDetLim}\'"\x3e\r\n    \x3c/div\x3e\r\n    \r\n    \x3c!-- contact --\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n      data-dojo-props\x3d"target:\'usrCntInfo\',minOccurs:1,maxOccurs:\'unbounded\',label:\'${i18nArcGIS.contact.caption}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/citation/ContactElements"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/arcgis/resource/Usage","dojo/_base/declare dojo/_base/lang dojo/has ../../../../../kernel ../../../base/Descriptor dojo/text!./templates/Usage.html ../citation/ContactElements".split(" "),function(a,b,c,d,e,f){a=a(e,{templateString:f});c("extend-esri")&&b.setObject("dijit.metadata.types.arcgis.resource.Usage",a,d);return a});