// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/arcade/arcadeCompiler","require exports ./Dictionary ./Feature ./ImmutablePathArray ./ImmutablePointArray ./languageUtils ./treeAnalysis ./functions/date ./functions/geometry ./functions/geomsync ./functions/maths ./functions/stats ./functions/string ../geometry/Extent ../geometry/Geometry ../geometry/Multipoint ../geometry/Point ../geometry/Polygon ../geometry/Polyline ../SpatialReference".split(" "),function(la,n,u,y,E,Q,d,h,R,S,T,U,V,W,X,Y,Z,aa,ba,ca,da){function m(b,a,c){try{return c(b,
null,a)}catch(e){throw e;}}function g(b,a){try{switch(a.type){case "EmptyStatement":return"lc.voidOperation";case "VariableDeclarator":return ea(b,a);case "VariableDeclaration":for(var c=[],e=0;e<a.declarations.length;e++)c.push(g(b,a.declarations[e]));return c.join("\n")+" \n lastStatement\x3d  lc.voidOperation; \n";case "BlockStatement":return K(b,a);case "FunctionDeclaration":var e=a.id.name.toLowerCase(),d={applicationCache:void 0===b.applicationCache?null:b.applicationCache,spatialReference:b.spatialReference,
console:b.console,symbols:b.symbols,localScope:{_SymbolsMap:{}},depthCounter:b.depthCounter+1,globalScope:b.globalScope};if(64<d.depthCounter)throw Error("Exceeded maximum function depth");for(var r="new lc.SizzleFunction( lang.functionDepthchecker(function() { var lastStatement \x3d lc.voidOperation; var lscope \x3d [];\n ",z=0;z<a.params.length;z++){var l=a.params[z].name.toLowerCase(),F=H(l,b);d.localScope._SymbolsMap[l]=F;r+="lscope['"+F+"']\x3darguments["+z.toString()+"];\n"}r+=K(d,a.body)+"\n return lastStatement; }, runtimeCtx))";
r+="\n lastStatement \x3d lc.voidOperation; \n";void 0!==b.globalScope[e]?c="gscope['"+e+"']\x3d"+r:void 0!==b.globalScope._SymbolsMap[e]?c="gscope['"+b.globalScope._SymbolsMap[e]+"']\x3d"+r:(F=H(e,b),b.globalScope._SymbolsMap[e]=F,c="gscope['"+F+"']\x3d"+r);return c;case "ReturnStatement":var L;L=null===a.argument?"return lc.voidOperation;":"return "+g(b,a.argument)+";";return L;case "IfStatement":if("AssignmentExpression"===a.test.type||"UpdateExpression"===a.test.type)throw Error(h.nodeErrorMessage(a.test,
"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));var fa=g(b,a.test),m=C(b),n="var "+m+" \x3d "+fa+";\n if ("+m+" \x3d\x3d\x3d true) {\n"+M(b,a.consequent)+"\n }\n",n=null!==a.alternate?n+("else if ("+m+"\x3d\x3d\x3dfalse)   { \n"+M(b,a.alternate)+"}\n"):n+("else if ("+m+"\x3d\x3d\x3dfalse) { \n lastStatement \x3d lc.voidOperation;\n }\n");return n+="else { lang.error({type: '"+a.type+"'},'RUNTIME','CANNOT_USE_NONBOOLEAN_IN_CONDITION'); \n}\n";case "ExpressionStatement":var u;u="AssignmentExpression"===
a.expression.type?"lastStatement \x3d lc.voidOperation; "+g(b,a.expression)+" \n ":"lastStatement \x3d "+g(b,a.expression)+";";return u;case "AssignmentExpression":return ga(b,a);case "UpdateExpression":return ha(b,a);case "BreakStatement":return"break;";case "ContinueStatement":return"continue;";case "ForStatement":c="lastStatement \x3d lc.voidOperation; \n";null!==a.init&&(c+=g(b,a.init));var q=C(b),v=C(b),c=c+("var "+q+" \x3d true;")+"\n do { ";null!==a.update&&(c+=" if ("+q+"\x3d\x3d\x3dfalse) {\n "+
g(b,a.update)+"  \n}\n "+q+"\x3dfalse; \n");null!==a.test&&(c+="var "+v+" \x3d "+g(b,a.test)+";",c+="if ("+v+"\x3d\x3d\x3dfalse) { break; } else if ("+v+"!\x3d\x3dtrue) { lang.error({type: '"+a.type+"'},'RUNTIME','CANNOT_USE_NONBOOLEAN_IN_CONDITION');   }\n");c+=g(b,a.body);null!==a.update&&(c+="\n "+g(b,a.update));return c+("\n"+q+" \x3d true; \n} while(true);  lastStatement \x3d lc.voidOperation;");case "ForInStatement":var w=C(b),B=C(b),t=C(b),k="var "+w+" \x3d "+g(b,a.right)+";\n";"VariableDeclaration"===
a.left.type&&(k+=g(b,a.left));var x="VariableDeclaration"===a.left.type?a.left.declarations[0].id.name:a.left.name,x=x.toLowerCase(),c="";null!==b.localScope&&(void 0!==b.localScope[x]?c="lscope['"+x+"']":void 0!==b.localScope._SymbolsMap[x]&&(c="lscope['"+b.localScope._SymbolsMap[x]+"']"));""===c&&(void 0!==b.globalScope[x]?c="gscope['"+x+"']":void 0!==b.globalScope._SymbolsMap[x]&&(c="gscope['"+b.globalScope._SymbolsMap[x]+"']"));k=k+("if ("+w+"\x3d\x3d\x3dnull) {  lastStatement \x3d lc.voidOperation; }\n ")+
("else if (lc.isArray("+w+") || lc.isString("+w+")) {")+("var "+B+"\x3d"+w+".length; \n")+("for(var "+t+"\x3d0; "+t+"\x3c"+B+"; "+t+"++) {\n");k+=c+"\x3d"+t+";\n";k+=g(b,a.body);k+="\n}\n";k+=" lastStatement \x3d lc.voidOperation; \n";k+=" \n}\n";k+="else if (lc.isImmutableArray("+w+")) {";k=k+("var "+B+"\x3d"+w+".length(); \n")+("for(var "+t+"\x3d0; "+t+"\x3c"+B+"; "+t+"++) {\n");k+=c+"\x3d"+t+";\n";k+=g(b,a.body);k+="\n}\n";k+=" lastStatement \x3d lc.voidOperation; \n";k+=" \n}\n";k+="else if (( "+
w+" instanceof lang.Dictionary) || ( "+w+" instanceof lang.Feature)) {";k=k+("var "+B+"\x3d"+w+".keys(); \n")+("for(var "+t+"\x3d0; "+t+"\x3c"+B+".length; "+t+"++) {\n");k+=c+"\x3d"+B+"["+t+"];\n";k+=g(b,a.body);k+="\n}\n";k+=" lastStatement \x3d lc.voidOperation; \n";k+=" \n}\n";return k+"else { lastStatement \x3d lc.voidOperation; } \n";case "Identifier":return ia(b,a);case "MemberExpression":var y;try{c=void 0,c=!0===a.computed?g(b,a.property):"'"+a.property.name+"'",y="lang.member("+g(b,a.object)+
","+c+")"}catch(p){throw p;}return y;case "Literal":return null===a.value||void 0===a.value?"null":JSON.stringify(a.value);case "ThisExpression":throw Error(h.nodeErrorMessage(a,"RUNTIME","NOTSUPPORTED"));case "CallExpression":try{if("Identifier"!==a.callee.type)throw Error(h.nodeErrorMessage(a,"RUNTIME","ONLYNODESSUPPORTED"));var A=a.callee.name.toLowerCase(),c="";null!==b.localScope&&(void 0!==b.localScope[A]?c="lscope['"+A+"']":void 0!==b.localScope._SymbolsMap[A]&&(c="lscope['"+b.localScope._SymbolsMap[A]+
"']"));""===c&&(void 0!==b.globalScope[A]?c="gscope['"+A+"']":void 0!==b.globalScope._SymbolsMap[A]&&(c="gscope['"+b.globalScope._SymbolsMap[A]+"']"));if(""!==c)for(e="[",d=0;d<a.arguments.length;d++)0<d&&(e+=", "),e+=g(b,a.arguments[d]);else throw Error(h.nodeErrorMessage(a,"RUNTIME","NOTFOUND"));}catch(p){throw p;}return"lang.callfunc("+c+","+(e+"]")+",runtimeCtx)";case "UnaryExpression":var D;try{D="lang.unary("+g(b,a.argument)+",'"+a.operator+"')"}catch(p){throw p;}return D;case "BinaryExpression":var E;
try{E="lang.binary("+g(b,a.left)+","+g(b,a.right)+",'"+a.operator+"')"}catch(p){throw p;}return E;case "LogicalExpression":var G;try{if("AssignmentExpression"===a.left.type||"UpdateExpression"===a.left.type)throw Error(h.nodeErrorMessage(a.left,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));if("AssignmentExpression"===a.right.type||"UpdateExpression"===a.right.type)throw Error(h.nodeErrorMessage(a.right,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));if("\x26\x26"===a.operator||"||"===a.operator)G=
"(lang.logicalCheck("+g(b,a.left)+") "+a.operator+" lang.logicalCheck("+g(b,a.right)+"))";else throw Error(h.nodeErrorMessage("LogicalExpression","RUNTIME","ONLYORORAND"));}catch(p){throw p;}return G;case "ConditionalExpression":throw Error(h.nodeErrorMessage(a,"RUNTIME","NOTSUPPORTED"));case "ArrayExpression":try{c=[];for(e=0;e<a.elements.length;e++)"Literal"===a.elements[e].type?c.push(g(b,a.elements[e])):c.push("lang.aCheck("+g(b,a.elements[e])+",'ArrayExpression')");r="["+c.join(",")+"]"}catch(p){throw p;
}return r;case "ObjectExpression":c="lang.dictionary([";for(e=0;e<a.properties.length;e++){var z=a.properties[e],I="Identifier"===z.key.type?"'"+z.key.name+"'":g(b,z.key),J=g(b,z.value);0<e&&(c+=",");c+="lang.strCheck("+I+",'ObjectExpression'),lang.aCheck("+J+", 'ObjectExpression')"}return c+"])";case "Property":throw Error("Should not get here");case "Array":throw Error(h.nodeErrorMessage(a,"RUNTIME","NOTSUPPORTED"));default:throw Error(h.nodeErrorMessage(a,"RUNTIME","UNREOGNISED"));}}catch(p){throw p;
}}function ha(b,a){var c=null,e="";if("MemberExpression"===a.argument.type)return c=g(b,a.argument.object),e=!0===a.argument.computed?g(b,a.argument.property):"'"+a.argument.property.name+"'","lang.memberupdate("+c+","+e+",'"+a.operator+"',"+a.prefix+")";c=a.argument.name.toLowerCase();if(null!==b.localScope){if(void 0!==b.localScope[c])return"lang.update(lscope, '"+c+"','"+a.operator+"',"+a.prefix+")";if(void 0!==b.localScope._SymbolsMap[c])return"lang.update(lscope, '"+b.localScope._SymbolsMap[c]+
"','"+a.operator+"',"+a.prefix+")"}if(void 0!==b.globalScope[c])return"lang.update(gscope, '"+c+"','"+a.operator+"',"+a.prefix+")";if(void 0!==b.globalScope._SymbolsMap[c])return"lang.update(gscope, '"+b.globalScope._SymbolsMap[c]+"','"+a.operator+"',"+a.prefix+")";throw Error("Variable not recognised");}function ga(b,a){var c=g(b,a.right),e=null,d="";if("MemberExpression"===a.left.type)return e=g(b,a.left.object),d=!0===a.left.computed?g(b,a.left.property):"'"+a.left.property.name+"'","lang.assignmember("+
e+","+d+",'"+a.operator+"',"+c+");";e=a.left.name.toLowerCase();if(null!==b.localScope){if(void 0!==b.localScope[e])return"lscope['"+e+"']\x3dlang.assign("+c+",'"+a.operator+"', lscope['"+e+"']); ";if(void 0!==b.localScope._SymbolsMap[e])return"lscope['"+b.localScope._SymbolsMap[e]+"']\x3dlang.assign("+c+",'"+a.operator+"', lscope['"+b.localScope._SymbolsMap[e]+"']); "}if(void 0!==b.globalScope[e])return"gscope['"+e+"']\x3dlang.assign("+c+",'"+a.operator+"', gscope['"+e+"']); ";if(void 0!==b.globalScope._SymbolsMap[e])return"gscope['"+
b.globalScope._SymbolsMap[e]+"']\x3dlang.assign("+c+",'"+a.operator+"', gscope['"+b.globalScope._SymbolsMap[e]+"']); ";throw Error("Variable not recognised");}function M(b,a){return"BlockStatement"===a.type?g(b,a):"ReturnStatement"===a.type?g(b,a):"BreakStatement"===a.type?g(b,a):"ContinueStatement"===a.type?g(b,a):"UpdateExpression"===a.type?"lastStatement \x3d "+g(b,a)+";":"ExpressionStatement"===a.type?g(b,a):"ObjectExpression"===a.type?"lastStatement \x3d "+g(b,a)+";":g(b,a)}function K(b,a){for(var c=
"",e=0;e<a.body.length;e++)c="ReturnStatement"===a.body[e].type?c+(g(b,a.body[e])+" \n"):"BreakStatement"===a.body[e].type?c+(g(b,a.body[e])+" \n"):"ContinueStatement"===a.body[e].type?c+(g(b,a.body[e])+" \n"):"UpdateExpression"===a.body[e].type?c+("lastStatement \x3d "+g(b,a.body[e])+"; \n"):"ObjectExpression"===a.body[e].type?c+("lastStatement \x3d "+g(b,a.body[e])+"; \n"):c+(g(b,a.body[e])+" \n");return c}function ea(b,a){var c=null===a.init?null:g(b,a.init);c===d.voidOperation&&(c=null);a=a.id.name.toLowerCase();
if(null!==b.localScope){if(void 0!==b.localScope[a])return"lscope['"+a+"']\x3d"+c+";";if(void 0!==b.localScope._SymbolsMap[a])return"lscope['"+b.localScope._SymbolsMap[a]+"']\x3d"+c+";";var e=H(a,b);b.localScope._SymbolsMap[a]=e;return"lscope['"+e+"']\x3d"+c+";"}if(void 0!==b.globalScope[a])return"gscope['"+a+"']\x3d"+c+";";if(void 0!==b.globalScope._SymbolsMap[a])return"gscope['"+b.globalScope._SymbolsMap[a]+"']\x3d"+c+";";e=H(a,b);b.globalScope._SymbolsMap[a]=e;return"gscope['"+e+"']\x3d"+c+";"}
function ja(b,a,c){a=a.toLowerCase();switch(a){case "hasz":return b=b.hasZ,void 0===b?!1:b;case "hasm":return b=b.hasM,void 0===b?!1:b;case "spatialreference":return a=b.spatialReference._arcadeCacheId,void 0===a&&(c=!0,Object.freeze&&Object.isFrozen(b.spatialReference)&&(c=!1),c&&(q++,a=b.spatialReference._arcadeCacheId=q)),b=new u({wkt:b.spatialReference.wkt,wkid:b.spatialReference.wkid}),void 0!==a&&(b._arcadeCacheId="SPREF"+a.toString()),b}switch(b.type){case "extent":switch(a){case "xmin":case "xmax":case "ymin":case "ymax":case "zmin":case "zmax":case "mmin":case "mmax":return b=
b[a],void 0!==b?b:null;case "type":return"Extent"}break;case "polygon":switch(a){case "rings":return a=d.isVersion4?b.cache._arcadeCacheId:b.getCacheValue("_arcadeCacheId"),void 0===a&&(q++,a=q,d.isVersion4?b.cache._arcadeCacheId=a:b.setCacheValue("_arcadeCacheId",a)),b=new E(b.rings,b.spatialReference,!0===b.hasZ,!0===b.hasM,a);case "type":return"Polygon"}break;case "point":switch(a){case "x":case "y":case "z":case "m":return void 0!==b[a]?b[a]:null;case "type":return"Point"}break;case "polyline":switch(a){case "paths":return a=
d.isVersion4?b.cache._arcadeCacheId:b.getCacheValue("_arcadeCacheId"),void 0===a&&(q++,a=q,d.isVersion4?b.cache._arcadeCacheId=a:b.setCacheValue("_arcadeCacheId",a)),b=new E(b.paths,b.spatialReference,!0===b.hasZ,!0===b.hasM,a);case "type":return"Polyline"}break;case "multipoint":switch(a){case "points":return a=d.isVersion4?b.cache._arcadeCacheId:b.getCacheValue("_arcadeCacheId"),void 0===a&&(q++,a=q,d.isVersion4?b.cache._arcadeCacheId=a:b.setCacheValue("_arcadeCacheId",a)),b=new Q(b.points,b.spatialReference,
!0===b.hasZ,!0===b.hasM,a,1);case "type":return"Multipoint"}}throw Error(h.nodeErrorMessage(c,"RUNTIME","PROPERTYNOTFOUND"));}function ia(b,a){try{var c=a.name.toLowerCase();if(null!==b.localScope){if(void 0!==b.localScope[c])return"lscope['"+c+"']";if(void 0!==b.localScope._SymbolsMap[c])return"lscope['"+b.localScope._SymbolsMap[c]+"']"}if(void 0!==b.globalScope[c])return"gscope['"+c+"']";if(void 0!==b.globalScope._SymbolsMap[c])return"gscope['"+b.globalScope._SymbolsMap[c]+"']";throw Error(h.nodeErrorMessage(a,
"RUNTIME","VARIABLENOTFOUND"));}catch(e){throw e;}}function G(b){return null===b?"":d.isArray(b)||d.isImmutableArray(b)?"Array":d.isDate(b)?"Date":d.isString(b)?"String":d.isBoolean(b)?"Boolean":d.isNumber(b)?"Number":b instanceof u?"Dictionary":b instanceof y?"Feature":b instanceof aa?"Point":b instanceof ba?"Polygon":b instanceof ca?"Polyline":b instanceof Z?"Multipoint":b instanceof X?"Extent":d.isFunctionParameter(b)?"Function":b===d.voidOperation?"":"number"===typeof b&&isNaN(b)?"Number":"Unrecognised Type"}
function I(b,a,c,e){try{if(d.equalityTest(a[c],e))return a[c+1];var f=a.length-c;return 1===f?a[c]:2===f?null:3===f?a[c+2]:I(b,a,c+2,e)}catch(r){throw r;}}function J(b,a,c,e){try{if(!0===e)return a[c+1];if(3===a.length-c)return a[c+2];var f=a[c+2];if(!1===d.isBoolean(f))throw Error("WHEN needs boolean test conditions");return J(b,a,c+2,f)}catch(r){throw r;}}function v(b,a){var c=b.length,e=Math.floor(c/2);if(0===c)return[];if(1===c)return[b[0]];var d=v(b.slice(0,e),a);b=v(b.slice(e,c),a);for(c=[];0<
d.length||0<b.length;)0<d.length&&0<b.length?(e=a(d[0],b[0]),isNaN(e)&&(e=0),0>=e?(c.push(d[0]),d=d.slice(1)):(c.push(b[0]),b=b.slice(1))):0<d.length?(c.push(d[0]),d=d.slice(1)):0<b.length&&(c.push(b[0]),b=b.slice(1));return c}function H(b,a){a.symbols.symbolCounter++;return"_T"+a.symbols.symbolCounter.toString()}function C(b){b.symbols.symbolCounter++;return"_Tvar"+b.symbols.symbolCounter.toString()}function ka(b,a,c){var d={};b||(b={});c||(c={});d._SymbolsMap={};d.textformatting=1;d.infinity=1;
d.pi=1;for(var f in a)d[f]=1;for(f in c)d[f]=1;for(f in b)d[f]=1;return d}function N(b){console.log(b)}Object.defineProperty(n,"__esModule",{value:!0});var q=0,l={};R.registerFunctions(l,m);W.registerFunctions(l,m);U.registerFunctions(l,m);S.registerFunctions(l,m);V.registerFunctions(l,m);T.registerFunctions(l,m);l["typeof"]=function(b,a){return m(b,a,function(b,a,f){d.pcCheck(f,1,1);b=G(f[0]);if("Unrecognised Type"===b)throw Error("Unrecognised Type");return b})};l.iif=function(b,a){try{return m(b,
a,function(b,a,f){d.pcCheck(f,3,3);if(!1===d.isBoolean(f[0]))throw Error("IF Function must have a boolean test condition");return f[0]?f[1]:f[2]})}catch(c){throw c;}};l.decode=function(b,a){try{return m(b,a,function(a,d,f){if(2>f.length)throw Error("Missing Parameters");if(2===f.length)return f[1];if(0===(f.length-1)%2)throw Error("Must have a default value result.");return I(b,f,1,f[0])})}catch(c){throw c;}};l.when=function(b,a){try{return m(b,a,function(a,e,f){if(3>f.length)throw Error("Missing Parameters");
if(0===f.length%2)throw Error("Must have a default value result.");a=f[0];if(!1===d.isBoolean(a))throw Error("WHEN needs boolean test conditions");return J(b,f,0,a)})}catch(c){throw c;}};l.top=function(b,a){return m(b,a,function(b,a,f){d.pcCheck(f,2,2);if(d.isArray(f[0]))return d.toNumber(f[1])>=f[0].length?f[0].slice(0):f[0].slice(0,d.toNumber(f[1]));if(d.isImmutableArray(f[0]))return d.toNumber(f[1])>=f[0].length()?f[0].slice(0):f[0].slice(0,d.toNumber(f[1]));throw Error("Top cannot accept this parameter type");
})};l.first=function(b,a){return m(b,a,function(b,a,f){d.pcCheck(f,1,1);return d.isArray(f[0])?0===f[0].length?null:f[0][0]:d.isImmutableArray(f[0])?0===f[0].length()?null:f[0].get(0):null})};l.sort=function(b,a){return m(b,a,function(b,a,f){d.pcCheck(f,1,2);a=f[0];d.isImmutableArray(a)&&(a=a.toArray());if(!1===d.isArray(a))throw Error("Illegal Argument");if(1<f.length){if(!1===d.isFunctionParameter(f[1]))throw Error("Illegal Argument");a=v(a,function(a,c){return O.callfunc(f[1],[a,c],b)})}else{if(0===
a.length)return[];for(var c={},e=0;e<a.length;e++){var g=G(a[e]);""!==g&&(c[g]=!0)}if(!0===c.Array||!0===c.Dictionary||!0===c.Feature||!0===c.Point||!0===c.Polygon||!0===c.Polyline||!0===c.Multipoint||!0===c.Extent||!0===c.Function)return a.slice(0);var e=0,g="",h;for(h in c)e++,g=h;a=1<e||"String"===g?v(a,function(a,b){if(null===a||void 0===a||a===d.voidOperation)return null===b||void 0===b||b===d.voidOperation?0:1;if(null===b||void 0===b||b===d.voidOperation)return-1;a=d.toString(a);b=d.toString(b);
return a<b?-1:a===b?0:1}):"Number"===g?v(a,function(a,b){return a-b}):"Boolean"===g?v(a,function(a,b){return a===b?0:b?-1:1}):"Date"===g?v(a,function(a,b){return b-a}):a.slice(0)}return a})};for(var P in l)l[P]=new d.NativeFunction(l[P]);var D=function(){};D.prototype=l;n.functionHelper={fixSpatialReference:d.fixSpatialReference,parseArguments:function(b,a){for(var c=[],d=0;d<a.arguments.length;d++)c.push(g(b,a.arguments[d]));return c},standardFunction:m};n.extend=function(b){for(var a={mode:"sync",
compiled:!0,functions:{},signatures:[],standardFunction:m},c=0;c<b.length;c++)b[c].registerFunctions(a);for(var e in a.functions)l[e]=new d.NativeFunction(a.functions[e]),D.prototype[e]=l[e];for(c=0;c<a.signatures.length;c++)h.addFunctionDeclaration(a.signatures[c],"f")};n.executeScript=function(b,a,c){return b(a,c)};n.extractFieldLiterals=function(b,a){void 0===a&&(a=!1);return h.findFieldLiterals(b,a)};n.validateScript=function(b,a){return h.validateScript(b,a,"simple")};n.referencesMember=function(b,
a){return h.referencesMember(b,a)};n.referencesFunction=function(b,a){return h.referencesFunction(b,a)};var O={error:function(b,a,c){throw Error(h.nodeErrorMessage(b,a,c));},functionDepthchecker:function(b,a){return function(){a.depthCounte++;if(64<a.depthCounter)throw Error("Exceeded maximum function depth");var c=b.apply(this,arguments);a.depthCounte--;return c}},aCheck:function(b,a){if(d.isFunctionParameter(b))throw Error(h.nodeErrorMessage({type:a},"RUNTIME","FUNCTIONCONTEXTILLEGAL"));return b===
d.voidOperation?null:b},Dictionary:u,Feature:y,dictionary:function(b){for(var a={},c=0;c<b.length;c+=2){if(d.isFunctionParameter(b[c+1]))throw Error("Illegal Argument");if(!1===d.isString(b[c]))throw Error("Illegal Argument");a[b[c].toString()]=b[c+1]===d.voidOperation?null:b[c+1]}b=new u(a);b.immutable=!1;return b},strCheck:function(b,a){if(!1===d.isString(b))throw Error("Illegal Argument");return b},unary:function(b,a){if(d.isBoolean(b)){if("!"===a)return!b;if("-"===a)return-1*d.toNumber(b);if("+"===
a)return 1*d.toNumber(b);throw Error(h.nodeErrorMessage({type:"UnaryExpression"},"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"));}if("-"===a)return-1*d.toNumber(b);if("+"===a)return 1*d.toNumber(b);throw Error(h.nodeErrorMessage({type:"UnaryExpression"},"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"));},logicalCheck:function(b){if(!1===d.isBoolean(b))throw Error(h.nodeErrorMessage("LogicalExpression","RUNTIME","ONLYORORAND"));return b},logical:function(b,a,c){if(d.isBoolean(b)&&d.isBoolean(a))switch(c){case "||":return b||
a;case "\x26\x26":return b&&a;default:throw Error(h.nodeErrorMessage("LogicalExpression","RUNTIME","ONLYORORAND"));}else throw Error(h.nodeErrorMessage("LogicalExpression","RUNTIME","ONLYORORAND"));},binary:function(b,a,c){switch(c){case "\x3d\x3d":return d.equalityTest(b,a);case "\x3d":return d.equalityTest(b,a);case "!\x3d":return!d.equalityTest(b,a);case "\x3c":return d.greaterThanLessThan(b,a,c);case "\x3e":return d.greaterThanLessThan(b,a,c);case "\x3c\x3d":return d.greaterThanLessThan(b,a,c);
case "\x3e\x3d":return d.greaterThanLessThan(b,a,c);case "+":return d.isString(b)||d.isString(a)?d.toString(b)+d.toString(a):d.toNumber(b)+d.toNumber(a);case "-":return d.toNumber(b)-d.toNumber(a);case "*":return d.toNumber(b)*d.toNumber(a);case "/":return d.toNumber(b)/d.toNumber(a);case "%":return d.toNumber(b)%d.toNumber(a);default:throw Error(h.nodeErrorMessage({type:"BinaryExpression"},"RUNTIME","OPERATORNOTRECOGNISED"));}},assign:function(b,a,c){switch(a){case "\x3d":return b===d.voidOperation?
null:b;case "/\x3d":return d.toNumber(c)/d.toNumber(b);case "*\x3d":return d.toNumber(c)*d.toNumber(b);case "-\x3d":return d.toNumber(c)-d.toNumber(b);case "+\x3d":return d.isString(c)||d.isString(b)?d.toString(c)+d.toString(b):d.toNumber(c)+d.toNumber(b);case "%\x3d":return d.toNumber(c)%d.toNumber(b);default:throw Error(h.nodeErrorMessage("AssignmentExpression","RUNTIME","OPERATORNOTRECOGNISED"));}},update:function(b,a,c,e){var f=d.toNumber(b[a]);b[a]="++"===c?f+1:f-1;return!1===e?f:"++"===c?f+
1:f-1},memberupdate:function(b,a,c,e){var f;if(d.isArray(b))if(d.isNumber(a)){0>a&&(a=b.length+a);if(0>a||a>=b.length)throw Error("Assignment outside of array bounds");f=d.toNumber(b[a]);b[a]="++"===c?f+1:f-1}else throw Error("Invalid Parameter");else if(b instanceof u){if(!1===d.isString(a))throw Error("Dictionary accessor must be a string");if(!0===b.hasField(a))f=d.toNumber(b.field(a)),b.setField(a,"++"===c?f+1:f-1);else throw Error("Invalid Parameter");}else if(b instanceof y){if(!1===d.isString(a))throw Error("Feature accessor must be a string");
if(!0===b.hasField(a))f=d.toNumber(b.field(a)),b.setField(a,"++"===c?f+1:f-1);else throw Error("Invalid Parameter");}else{if(d.isImmutableArray(b))throw Error("Array is Immutable");throw Error("Invalid Parameter");}return!1===e?f:"++"===c?f+1:f-1},assignmember:function(b,a,c,e){if(d.isArray(b))if(d.isNumber(a)){0>a&&(a=b.length+a);if(0>a||a>b.length)throw Error("Assignment outside of array bounds");if(a===b.length&&"\x3d"!==c)throw Error("Invalid Parameter");b[a]=this.assign(e,c,b[a])}else throw Error("Invalid Parameter");
else if(b instanceof u){if(!1===d.isString(a))throw Error("Dictionary accessor must be a string");if(!0===b.hasField(a))b.setField(a,this.assign(e,c,b.field(a)));else{if("\x3d"!==c)throw Error("Invalid Parameter");b.setField(a,this.assign(e,c,null))}}else if(b instanceof y){if(!1===d.isString(a))throw Error("Feature accessor must be a string");if(!0===b.hasField(a))b.setField(a,this.assign(e,c,b.field(a)));else{if("\x3d"!==c)throw Error("Invalid Parameter");b.setField(a,this.assign(e,c,null))}}else{if(d.isImmutableArray(b))throw Error("Array is Immutable");
throw Error("Invalid Parameter");}},member:function(b,a){if(null===b)throw Error(h.nodeErrorMessage("MemberExpression","RUNTIME","NOTFOUND"));if(b instanceof u||b instanceof y){if(d.isString(a))return b.field(a)}else if(b instanceof Y){if(d.isString(a))return ja(b,a,"MemberExpression")}else if(d.isArray(b)){if(d.isNumber(a)&&isFinite(a)&&Math.floor(a)===a){0>a&&(a=b.length+a);if(a>=b.length||0>a)throw Error(h.nodeErrorMessage("MemberExpression","RUNTIME","OUTOFBOUNDS"));return b[a]}}else if(d.isString(b)){if(d.isNumber(a)&&
isFinite(a)&&Math.floor(a)===a){0>a&&(a=b.length+a);if(a>=b.length||0>a)throw Error(h.nodeErrorMessage("MemberExpression","RUNTIME","OUTOFBOUNDS"));return b[a]}}else if(d.isImmutableArray(b)&&d.isNumber(a)&&isFinite(a)&&Math.floor(a)===a){0>a&&(a=b.length()+a);if(a>=b.length()||0>a)throw Error(h.nodeErrorMessage("MemberExpression","RUNTIME","OUTOFBOUNDS"));return b.get(a)}throw Error(h.nodeErrorMessage("MemberExpression","RUNTIME","INVALIDTYPE"));},callfunc:function(b,a,c){return b instanceof d.NativeFunction?
b.fn(c,a):b instanceof d.SizzleFunction?b.fn.apply(this,a):b.apply(this,a)}};n.compileScript=function(b,a){void 0===a&&(a=null);null===a&&(a={vars:{},customfunctions:{}});a={globalScope:ka(a.vars,l,a.customfunctions),localScope:null,console:N,symbols:{symbolCounter:0}};b=g(a,b.body[0].body);""===b&&(b="lc.voidOperation;");a={lc:d,lang:O,postProcess:function(a){a instanceof d.ReturnResult&&(a=a.value);a instanceof d.ImplicitResult&&(a=a.value);a===d.voidOperation&&(a=null);if(a===d.breakResult)throw Error("Cannot return BREAK");
if(a===d.continueResult)throw Error("Cannot return CONTINUE");if(d.isFunctionParameter(a))throw Error("Cannot return FUNCTION");return a},prepare:function(a,b){b||(b=new da({wkid:102100}));var c=a.vars,d=a.customfunctions,e=new D;c||(c={});d||(d={});var g=new u({newline:"\n",tab:"\t",singlequote:"'",doublequote:'"',forwardslash:"/",backwardslash:"\\"});g.immutable=!1;e._SymbolsMap={textformatting:1,infinity:1,pi:1};e.textformatting=g;e.infinity=Number.POSITIVE_INFINITY;e.pi=Math.PI;for(var h in d)e[h]=
d[h],e._SymbolsMap[h]=1;for(h in c)e._SymbolsMap[h]=1,e[h]=c[h]&&"esri.Graphic"===c[h].declaredClass?y.createFromGraphic(c[h]):c[h];return{spatialReference:b,globalScope:e,localScope:null,console:a.console?a.console:N,symbols:{symbolCounter:0},depthCounter:1,applicationCache:void 0===a.applicationCache?null:a.applicationCache}}};return(new Function("context","spatialReference","var runtimeCtx\x3dthis.prepare(context, spatialReference);\n var lc \x3d this.lc;  var lang \x3d this.lang; var gscope\x3druntimeCtx.globalScope; \n function mainBody() {\n var lastStatement\x3dlc.voidOperation;\n "+
b+"\n return lastStatement; } \n return this.postProcess(mainBody());")).bind(a)}});