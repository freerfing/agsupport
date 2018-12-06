// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/support/expressionUtils","dojo/_base/lang dojo/_base/array dojo/has ../kernel ../arcade/arcade ../arcade/Feature".split(" "),function(f,h,n,p,d,k){var l={vars:{$feature:"any",$view:"any"}},m=/^\$feature\./i,e={_getSyntaxTree:function(a,b){return"string"===typeof a?e.createSyntaxTree(a,b):a},createSyntaxTree:function(a,b){b=b||f.clone(l);var c;try{c=a?d.parseScript(a,b):null}catch(g){c=null}return c},createFunction:function(a,b){b=b||f.clone(l);a=e._getSyntaxTree(a,b);var c;try{c=a?d.compileScript(a,
b):null}catch(g){c=null}return c},createExecContext:function(a,b){return{vars:{$feature:a?k.createFromGraphic(a):new k,$view:b&&b.view},spatialReference:b&&b.sr}},evalSyntaxTree:function(a,b){var c;try{c=d.executeScript(a,b,b.spatialReference)}catch(g){c=null}return c},executeFunction:function(a,b){var c;try{c=a?a(b,b.spatialReference):null}catch(g){c=null}return c},extractFieldNames:function(a,b){a=e._getSyntaxTree(a,b);a=d.extractFieldLiterals(a);var c=[];h.forEach(a,function(a){m.test(a)&&(a=a.replace(m,
""),c.push(a))});c.sort();return h.filter(c,function(a,b){return 0===b||c[b-1]!==a})},dependsOnView:function(a){return d.referencesMember(a,"$view")},hasGeometryOperations:function(a){return(a=e._getSyntaxTree(a))?d.scriptUsesGeometryEngine(a):!1},enableGeometryOperations:function(){return d.enableGeometrySupport()}};n("extend-esri")&&f.setObject("renderer.expressionUtils",e,p);return e});