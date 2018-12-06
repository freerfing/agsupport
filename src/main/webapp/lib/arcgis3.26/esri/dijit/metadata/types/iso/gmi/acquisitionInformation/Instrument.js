// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/iso/gmi/acquisitionInformation/templates/Instrument.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3c!-- instrument - designations of the measuring instruments used to acquire the data \r\n         type\x3d"gmi:MI_Instrument_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded" --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n    data-dojo-props\x3d"target:\'gmi:instrument\',minOccurs:0,maxOccurs:\'unbounded\',\r\n      label:\'${i18nIso.acquisitionSection.instrument}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/MI_Instrument"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/iso/gmi/acquisitionInformation/Instrument","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/iso/ObjectReference ./MI_Instrument dojo/text!./templates/Instrument.html ../../../../../../kernel".split(" "),function(a,b,c,d,g,h,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.iso.gmi.acquisitionInformation.Instrument",a,f);return a});