// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/gemini/gmd/extent/templates/TemporalElement.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n    data-dojo-props\x3d"target:\'gmd:temporalElement\',minOccurs:1,maxOccurs:\'unbounded\',\r\n      label:\'${i18nIso.EX_Extent.temporalElement}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject"\r\n      data-dojo-props\x3d"target:\'gmd:EX_TemporalExtent\',minOccurs:0"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n        data-dojo-props\x3d"target:\'gmd:extent\',minOccurs:0,showHeader:false"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n          data-dojo-props\x3d"target:\'gml:TimePeriod\',minOccurs:0,showHeader:false"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute"\r\n            data-dojo-props\x3d"target:\'gml:id\',hide:true"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputText"\r\n              data-dojo-props\x3d"useUniqueId:true"\x3e\x3c/div\x3e\r\n          \x3c/div\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'gml:beginPosition\',\r\n              label:\'${i18nIso.EX_TemporalExtent.TimePeriod.beginPosition}\'"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputDate"\r\n              data-dojo-props\x3d"useNow:true,allowTime:true"\x3e\x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute" style\x3d"margin-top: 5px;"\r\n              data-dojo-props\x3d"target:\'indeterminatePosition\',\r\n               label:\'${i18nIso.TM_Primitive.indeterminatePosition}\'"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputSelectOne"\x3e\r\n                \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Options"\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'\',value:\'\'"\x3e\x3c/div\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'${i18nIso.TM_Primitive.indeterminates.before}\',value:\'before\'"\x3e\x3c/div\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'${i18nIso.TM_Primitive.indeterminates.after}\',value:\'after\'"\x3e\x3c/div\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'${i18nIso.TM_Primitive.indeterminates.now}\',value:\'now\'"\x3e\x3c/div\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'${i18nIso.TM_Primitive.indeterminates.unknown}\',value:\'unknown\'"\x3e\x3c/div\x3e\r\n                \x3c/div\x3e\r\n              \x3c/div\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'gml:endPosition\',\r\n              label:\'${i18nIso.EX_TemporalExtent.TimePeriod.endPosition}\'"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputDate"\r\n              data-dojo-props\x3d"useNow:true,allowTime:true"\x3e\x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute" style\x3d"margin-top: 5px;"\r\n              data-dojo-props\x3d"target:\'indeterminatePosition\',\r\n               label:\'${i18nIso.TM_Primitive.indeterminatePosition}\'"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputSelectOne"\x3e\r\n                \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Options"\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'\',value:\'\'"\x3e\x3c/div\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'${i18nIso.TM_Primitive.indeterminates.before}\',value:\'before\'"\x3e\x3c/div\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'${i18nIso.TM_Primitive.indeterminates.after}\',value:\'after\'"\x3e\x3c/div\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'${i18nIso.TM_Primitive.indeterminates.now}\',value:\'now\'"\x3e\x3c/div\x3e\r\n                  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                    data-dojo-props\x3d"label:\'${i18nIso.TM_Primitive.indeterminates.unknown}\',value:\'unknown\'"\x3e\x3c/div\x3e\r\n                \x3c/div\x3e\r\n              \x3c/div\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/gemini/gmd/extent/TemporalElement","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/Attribute ../../../../form/Element ../../../../form/InputDate ../../../../form/InputSelectOne ../../../../form/InputText ../../../../form/Options ../../../../form/Option ../../../../form/iso/AbstractObject ../../../../form/iso/ObjectReference dojo/text!./templates/TemporalElement.html ../../../../../../kernel".split(" "),function(a,b,c,d,g,
h,k,l,m,n,p,q,r,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.gemini.gmd.extent.TemporalElement",a,f);return a});