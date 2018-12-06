// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/arcgis/resource/templates/Service.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'svType\',minOccurs:0,label:\'${i18nArcGIS.service.svType}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'genericName\',minOccurs:0,label:\'${i18nArcGIS.service.svType_Name}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputText"\x3e\x3c/div\x3e\r\n      \x3cdiv style\x3d"margin-top: 8px;"\x3e\x3c/div\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute"\r\n        data-dojo-props\x3d"target:\'codeSpace\',minOccurs:0,noIndent:true,label:\'${i18nArcGIS.codeRef.idCodeSpace}\'"\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'svTypeVer\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nArcGIS.codeRef.idVersion}\'"\x3e\r\n  \x3c/div\x3e\r\n  \r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'svCouplRes\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nArcGIS.service.svCouplRes.caption}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'svOpName\',minOccurs:0,label:\'${i18nArcGIS.service.svCouplRes.svOpName}\'"\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'svResCitId\',minOccurs:0,label:\'${i18nArcGIS.service.svCouplRes.svResCitId}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n        data-dojo-props\x3d"target:\'identCode\',minOccurs:0,showHeader:false"\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e  \r\n  \x3c/div\x3e\r\n  \r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'svCouplType\',minOccurs:0,label:\'${i18nArcGIS.codelist.SV_CouplingType}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n      data-dojo-props\x3d"target:\'CouplTypCd\',minOccurs:0,showHeader:false"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute"\r\n        data-dojo-props\x3d"target:\'value\',minOccurs:0,showHeader:false"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputSelectCode"\r\n          data-dojo-props\x3d"codelistType:\'SV_CouplingType\'"\x3e\r\n        \x3c/div\x3e      \r\n      \x3c/div\x3e\r\n    \x3c/div\x3e    \r\n  \x3c/div\x3e\r\n  \r\n   \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n    data-dojo-props\x3d"target:\'svAccProps\',minOccurs:0,label:\'${i18nArcGIS.service.svAccProps}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/distribution/OrderingProcessElements"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/arcgis/resource/Service","dojo/_base/declare dojo/_base/lang dojo/has ../../../../../kernel ../../../base/Descriptor dojo/text!./templates/Service.html ../distribution/OrderingProcessElements".split(" "),function(a,b,c,d,e,f){a=a(e,{templateString:f});c("extend-esri")&&b.setObject("dijit.metadata.types.arcgis.resource.Service",a,d);return a});