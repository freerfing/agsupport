// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/portalToEditorUtils/parsers/infographic/StaticInfographicParser",["dojo/_base/lang","../../../ConversionUtil","esri/dijit/geoenrichment/ReportPlayer/core/infographics/utils/InfographicJsonUtil","esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes","esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/templateJsonUtils/fieldInfo/FieldInfoBuilder"],function(u,h,r,k,v){return{portalToEditor:function(b,c){function l(a){return c.parsers.getParser("section").parseTable(a,
c)}var t=b.tags.slice(),m,n=[],p,q;(function(){1.1<=c.revisionVersion?t.forEach(function(a){switch(a.attributes.type){case k.INFOGRAPHIC_HEADER:m=a.tags[0];break;case k.INFOGRAPHIC_VARIABLE:n.push(a);break;case k.INFOGRAPHIC_BACKGROUND:p=a.tags;break;case k.INFOGRAPHIC_FOREGROUND:q=a.tags}}):n=t.filter(function(a){return"infographicHeader"===a.attributes.type?(m=a,!1):!0})})();var d={type:b.attributes.type,isDefault:b.attributes.isDefault,style:{width:h.ptToPx(b.attributes.width),height:h.ptToPx(b.attributes.height),
backgroundColor:b.attributes.backgroundColor},background:p?p.map(l):null,header:m&&l(m),variableTables:null,foreground:q?q.map(l):null,dataDrilling:null};d.variableTables=n.map(function(a){var b={style:h.ptToPxObj({left:a.attributes.left,top:a.attributes.top,width:a.attributes.width,height:a.attributes.height})},f;a.tags.forEach(function(a){if("dataDrillingPanels"===a.name)f=a;else{var c=a.attributes.type,d=l(a),e=d.data.data[0],g=d.data.columns[0].field;a={isContrastColor:a.attributes.isContrastColor,
isHighlighted:a.attributes.isHighlighted,style:u.mixin({width:d.data.columns[0].style.width,height:e.style.height,left:d.style.left,top:d.style.spaceBefore},e.style.fields[g])};delete a.style.overrideStyle;"shape"===c&&(a.shapeJson=e.fieldInfos[g].shapeJson);"image"===c?a.imageJson=e.fieldInfos[g].imageJson:"variable"===c?a.fieldInfo=e.fieldInfos[g]||v.createFieldInfoFromMissingVariable():"description"===c&&(a.text=e[g]);b[c]=a}});f&&f.tags&&f.tags.length&&(a=f.tags[0],a.attributes&&a.attributes.isStandard?
r.setDataDrilling(d,b.variable.fieldInfo.templateName,{isStandard:!0,standardId:a.attributes.standardId}):(a=a.tags&&a.tags[0])&&"section"===a.name&&r.setDataDrilling(d,b.variable.fieldInfo.templateName,{sectionJson:c.parsers.getParser("section").parseSection(a,c)}));return b});["minWidth","maxWidth","minHeight","maxHeight"].forEach(function(a){void 0!==b.attributes[a]&&(d.style[a]=h.ptToPx(b.attributes[a]))});return d}}});