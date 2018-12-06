// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProvider/supportClasses/AreasInfoTemplateBuilder",["dojo/when","dojo/promise/all","esri/dijit/PopupTemplate","./attachments/AttributesUtil","dojo/i18n!esri/nls/jsapi"],function(g,k,l,m,f){f=f.geoenrichment.dijit.ReportPlayer.AreasInfoTemplateBuilder;var h={buildInfoTemplates:function(a,b,c){var d=this,e={};b=b.map(function(c,b){return g(d._getAttributesAndNotesForAreaAt(a,b),function(a){e[b]=a;d._buildAreaInfoTemplate(c,a.attributesText,a.notesText)})});
return k(b).then(function(){c.groups&&c.groups.forEach(function(a){var c=e[a.indexes[0]];d._buildGroupInfoTemplate(a,c.attributesText,c.notesText)})})},buildInfoTemplateForFeature:function(a,b,c,d){var e=this;return g(this._getAttributesAndNotesForAreaAt(a,c),function(a){e._buildFeatureInfosInfoTemplate([{feature:b,title:d}],a.attributesText,a.notesText)})},_getAttributesAndNotesForAreaAt:function(a,b){a.setCurrentAnalysisAreaIndex&&a.setCurrentAnalysisAreaIndex(b);return k([function(){return g(a.getAttributes(),
function(a){return a&&a.length?h.buildAttributesTable(f.attributes,a.map(function(a){return{label:a.alias,value:m.formatAttributeValue(a,{returnUnavailableDataForIncorrectValues:!0})}})):null})}(),function(){return g(a.getNotes(),function(a){return a&&a.length?h.formatArrayOfTexts(f.notes,a.map(function(a){return a.text})):null})}()]).then(function(a){return{attributesText:a[0]||"",notesText:a[1]||""}})},_buildAreaInfoTemplate:function(a,b,c){var d=[{feature:a.feature,title:a.name}];a.location&&d.push({feature:a.location,
title:a.locationName||a.name});this._buildFeatureInfosInfoTemplate(d,b,c)},_buildGroupInfoTemplate:function(a,b,c){var d=[];a.location&&d.push({feature:a.location,title:a.locationName||a.name});this._buildFeatureInfosInfoTemplate(d,b,c)},_buildFeatureInfosInfoTemplate:function(a,b,c){a.forEach(function(a){b||c?a.feature.setInfoTemplate(new l({title:a.title,fieldInfos:[],description:b+c})):a.feature.setInfoTemplate(null)})},formatArrayOfTexts:function(a,b){return"\x3cp\x3e"+a+"\x3c/p\x3e"+("\x3cp style\x3d'padding-left:10px'\x3e"+
b.join("\x3cbr/\x3e\x3cbr/\x3e")+"\x3c/p\x3e")},buildAttributesTable:function(a,b,c){var d="",e=c&&c.padding||0;a&&(d+="\x3cp\x3e"+a+"\x3c/p\x3e");d+="\x3ctable\x3e";b.forEach(function(a){d+="\x3ctr style\x3d'text-align:left;'\x3e";var b=d+="\x3ctd style\x3d'padding:"+e+"px;'\x3e"+a.label+"\x3c/td\x3e";a=a.value;a=null===a||void 0===a||"number"===typeof a&&isNaN(a)?f.unavailableData:a;d=b+("\x3ctd style\x3d'padding:"+e+"px;'\x3e"+a+"\x3c/td\x3e");d+="\x3c/tr\x3e"});return d+="\x3c/table\x3e"}};return h});