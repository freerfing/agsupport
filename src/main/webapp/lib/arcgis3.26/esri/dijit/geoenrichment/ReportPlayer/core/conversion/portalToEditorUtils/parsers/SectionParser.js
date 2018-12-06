// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/portalToEditorUtils/parsers/SectionParser",["../../ConversionUtil","./ImageParser","./TableParser"],function(f,h,g){var d={},k={getElement:function(b,c){c=f.parseStyleString(b.attributes.style);return{id:"hr",style:{height:f.ptToPx(b.attributes.height),backgroundColor:c.backgroundColor}}}};d.parseSection=function(b,c){var d=f.parseStyleString(b.attributes.style),e={type:b.attributes.type,style:d.backgroundColor&&{backgroundColor:d.backgroundColor},
stack:[]};e.type||console.log(Error("Section type is not supported!"));b.tags&&b.tags.forEach(function(a){a.attributes=a.attributes||{};"img"===a.name||"mapImage"===a.name?e.stack.push(h.getElement(a,c)):"hr"===a.name?e.stack.push(k.getElement(a,c)):"pageBreak"===a.name?e.stack.push({id:"pageBreak"}):"table"===a.name&&(a=g.getElement(a,c),c.postProcessTableInSection&&c.postProcessTableInSection(b,a),e.stack.push(a))});return e};d.parseTable=function(b,c){return g.getElement(b,c)};d.parseTableCellAttributes=
g.parseTableCellAttributes;return d});