// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/iso/gmd/distribution/templates/DistributionFormat.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n    data-dojo-props\x3d"target:\'gmd:distributionFormat\',minOccurs:0,maxOccurs:\'unbounded\',\r\n      label:\'${i18nIso.MD_Distribution.distributionFormat}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject"\r\n      data-dojo-props\x3d"target:\'gmd:MD_Format\',minOccurs:0"\x3e\r\n      \r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'gmd:name\',\r\n          label:\'${i18nIso.MD_Format.name}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement"\r\n          data-dojo-props\x3d"target:\'gco:CharacterString\'"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'gmd:version\',\r\n          label:\'${i18nIso.MD_Format.version}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement"\r\n          data-dojo-props\x3d"target:\'gco:CharacterString\'"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \r\n    \x3c/div\x3e\r\n  \x3c/div\x3e  \r\n  \r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/iso/gmd/distribution/DistributionFormat","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/Element ../../../../form/iso/AbstractObject ../../../../form/iso/GcoElement ../../../../form/iso/ObjectReference dojo/text!./templates/DistributionFormat.html ../../../../../../kernel".split(" "),function(a,b,c,d,g,h,k,l,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.iso.gmd.distribution.DistributionFormat",
a,f);return a});