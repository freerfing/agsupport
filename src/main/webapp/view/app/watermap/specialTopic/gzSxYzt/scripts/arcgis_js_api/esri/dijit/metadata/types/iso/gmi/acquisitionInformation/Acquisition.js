// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/iso/gmi/acquisitionInformation/templates/Acquisition.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3c!-- \r\n    http://www.isotc211.org/2005/gmi/acquisitionInformation.xsd\r\n    \x3cxs:sequence\x3e\r\n      \x3cxs:element name\x3d"acquisitionRequirement" type\x3d"gmi:MI_Requirement_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n      \x3cxs:element name\x3d"objective" type\x3d"gmi:MI_Objective_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n      \x3cxs:element name\x3d"instrument" type\x3d"gmi:MI_Instrument_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n      \x3cxs:element name\x3d"acquisitionPlan" type\x3d"gmi:MI_Plan_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n      \x3cxs:element name\x3d"operation" type\x3d"gmi:MI_Operation_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n      \x3cxs:element name\x3d"platform" type\x3d"gmi:MI_Platform_PropertyType" minOccurs\x3d"0" maxOccurs\x3d"unbounded"/\x3e\r\n      \x3cxs:element name\x3d"environmentalConditions" type\x3d"gmi:MI_EnvironmentalRecord_PropertyType" minOccurs\x3d"0"/\x3e\r\n    \x3c/xs:sequence\x3e\r\n  --\x3e\r\n\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n    data-dojo-props\x3d"target:\'gmi:acquisitionInformation\',minOccurs:0,maxOccurs:\'unbounded\',\r\n      label:\'${i18nIso.MI_Metadata.acquisitionInformation}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject"\r\n      data-dojo-props\x3d"target:\'gmi:MI_AcquisitionInformation\',minOccurs:0"\x3e  \r\n      \r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Tabs"\x3e\r\n      \r\n        \x3c!-- acquisitionRequirement - the user requirements used to derive the acquisition plan --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/AcquisitionRequirement"\r\n          data-dojo-props\x3d"label:\'${i18nIso.acquisitionSection.requirement}\'"\x3e\x3c/div\x3e\r\n          \r\n        \x3c!-- objective - the characteristics and geometry of the intended object to be observed--\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/Objective"\r\n          data-dojo-props\x3d"label:\'${i18nIso.acquisitionSection.objective}\'"\x3e\x3c/div\x3e\r\n                  \r\n        \x3c!-- instrument - designations of the measuring instruments used to acquire the data --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/Instrument"\r\n          data-dojo-props\x3d"label:\'${i18nIso.acquisitionSection.instrument}\'"\x3e\x3c/div\x3e\r\n\r\n        \x3c!-- acquisitionPlan - the acquisition plan that was implemented to acquire the data --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/AcquisitionPlan"\r\n          data-dojo-props\x3d"label:\'${i18nIso.acquisitionSection.plan}\'"\x3e\x3c/div\x3e\r\n        \r\n        \x3c!-- operation - designations of the overall data gathering program to which the data contribute --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/Operation"\r\n          data-dojo-props\x3d"label:\'${i18nIso.acquisitionSection.operation}\'"\x3e\x3c/div\x3e\r\n          \r\n        \x3c!-- platform - designations of the platform from which the data were taken --\x3e  \r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/Platform"\r\n          data-dojo-props\x3d"label:\'${i18nIso.acquisitionSection.platform}\'"\x3e\x3c/div\x3e\r\n        \r\n         \x3c!-- environmentalConditions - information about the environmental conditions during the acquisition --\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmi/acquisitionInformation/EnvironmentalConditions"\r\n          data-dojo-props\x3d"label:\'${i18nIso.acquisitionSection.environment}\'"\x3e\x3c/div\x3e\r\n                    \r\n      \x3c/div\x3e  \r\n      \r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/iso/gmi/acquisitionInformation/Acquisition","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/Tabs ../../../../form/iso/AbstractObject ../../../../form/iso/ObjectReference ./AcquisitionPlan ./AcquisitionRequirement ./EnvironmentalConditions ./Instrument ./Objective ./Operation ./Platform dojo/text!./templates/Acquisition.html ../../../../../../kernel".split(" "),function(a,b,c,d,g,h,k,l,m,n,p,q,r,s,e,f){a=a(d,{templateString:e});
c("extend-esri")&&b.setObject("dijit.metadata.types.iso.gmi.acquisitionInformation.Acquisition",a,f);return a});