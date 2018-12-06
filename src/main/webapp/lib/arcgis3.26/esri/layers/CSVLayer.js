// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"esri/arcgis/csv":function(){define("dojo/_base/lang dojo/_base/array dojo/_base/Deferred dojo/sniff dojo/number dojox/data/CsvStore ../kernel ../config ../request ../SpatialReference ../geometry/jsonUtils ../geometry/webMercatorUtils".split(" "),function(p,d,m,l,k,e,a,c,g,b,f,n){function h(a){var b=0,f="";d.forEach([","," ",";","|","\t"],function(c){var t=a.split(c).length;t>b&&(b=t,f=c)});return f}function C(a,b){if(!a||"[object Date]"!==Object.prototype.toString.call(a)||isNaN(a.getTime()))return!1;
a=!0;if(l("chrome")&&/\d+\W*$/.test(b)){if(b.match(/[^0-9a-zA-Z\s]/))return!1;if(b=b.match(/[a-zA-Z]{2,}/)){a=!1;for(var f=0,c=b.length,t=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i;!a&&f<=c&&!(a=!t.test(b[f]));)f++;a=!a}}return a}function r(a,b,f){var c=a.indexOf("\n"),c=p.trim(a.substr(0,c)),t=b.columnDelimiter;t||(t=h(c));var g=new e({data:a,separator:t});g.fetch({onComplete:function(a,
c){c=0;var y={layerDefinition:b.layerDefinition,featureSet:{features:[],geometryType:"esriGeometryPoint"}},t=y.layerDefinition.objectIdField,n=y.layerDefinition.fields;t||d.some(n,function(a){return"esriFieldTypeOID"===a.type?(t=a.name,!0):!1})||(n.push({name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",editable:!1}),t="__OBJECTID");var e,h,v=g._attributes,q=[],r=[];d.forEach(n,function(a){"esriFieldTypeDate"===a.type?q.push(a.name):"esriFieldTypeDouble"!==a.type&&"esriFieldTypeInteger"!==
a.type||r.push(a.name)});b.locationInfo&&"coordinates"===b.locationInfo.locationType?(e=b.locationInfo.latitudeFieldName,h=b.locationInfo.longitudeFieldName):(d.forEach(v,function(a){var b;b=d.indexOf(z,a.toLowerCase());-1!==b&&(e=a);b=d.indexOf(A,a.toLowerCase());-1!==b&&(h=a)}),e&&h&&(b.locationInfo={locationType:"coordinates",latitudeFieldName:e,longitudeFieldName:h}));if(e&&h){-1===d.indexOf(r,e)&&r.push(e);-1===d.indexOf(r,h)&&r.push(h);var m;p.isArray(b.outFields)&&-1===d.indexOf(b.outFields,
"*")&&(m=b.outFields);d.forEach(v,function(a){d.some(n,function(b){return a===b.name})||n.push({name:a,alias:a,type:a===e||a===h?"esriFieldTypeDouble":"esriFieldTypeString"})});var v=0,F=a.length;for(v;v<F;v++){var x=a[v],l=g.getAttributes(x),u={};d.forEach(l,function(a){if(a&&(a===e||a===h||!m||-1<d.indexOf(m,a))){var b=a;0===a.length&&d.forEach(n,function(b,f){b.name==="attribute_"+(f-1)&&(a="attribute_"+(f-1))});if(-1<d.indexOf(q,a)){var b=g.getValue(x,b),f=new Date(b);u[a]=C(f,b)?f.getTime():
null}else-1<d.indexOf(r,a)?(f=k.parse(g.getValue(x,b)),a!==e&&a!==h||!(isNaN(f)||181<Math.abs(f))||(f=parseFloat(g.getValue(x,b))),isNaN(f)?u[a]=null:u[a]=f):u[a]=g.getValue(x,b)}});u[t]=c;c++;var l=u[e],B=u[h];null==B||null==l||isNaN(l)||isNaN(B)||(m&&-1===d.indexOf(m,e)&&delete u[e],m&&-1===d.indexOf(m,h)&&delete u[h],y.featureSet.features.push({geometry:{x:B,y:l,spatialReference:{wkid:4326}},attributes:u}))}y.layerDefinition.name="csv";f&&f(y)}else setTimeout(function(){console.error("File does not seem to contain fields with point coordinates.")},
1),f&&f(null,Error("File does not seem to contain fields with point coordinates."))},onError:function(a){console.error("Error fetching items from CSV store: ",a);f&&f(null,a)}});return!0}function q(a,b,e,g,h,k){0===a.length&&h(null);var t=f.getGeometryType(b),r=[];d.forEach(a,function(a){a=new t(a);a.spatialReference=e;r.push(a)},this);b=[102113,102100,3857];e.wkid&&4326===e.wkid&&g.wkid&&-1<d.indexOf(b,g.wkid)?(d.forEach(r,function(a){a.xmin?(a.xmin=Math.max(a.xmin,-180),a.xmax=Math.min(a.xmax,180),
a.ymin=Math.max(a.ymin,-89.99),a.ymax=Math.min(a.ymax,89.99)):a.rings?d.forEach(a.rings,function(a){d.forEach(a,function(a){a[0]=Math.min(Math.max(a[0],-180),180);a[1]=Math.min(Math.max(a[1],-89.99),89.99)},this)},this):a.paths?d.forEach(a.paths,function(a){d.forEach(a,function(a){a[0]=Math.min(Math.max(a[0],-180),180);a[1]=Math.min(Math.max(a[1],-89.99),89.99)},this)},this):a.x&&(a.x=Math.min(Math.max(a.x,-180),180),a.y=Math.min(Math.max(a.y,-89.99),89.99))},this),a=[],d.forEach(r,function(b){b=
n.geographicToWebMercator(b);102100!==g.wkid&&(b.spatialReference=g);a.push(b.toJson())},this),h(a)):null!==e.wkid&&-1<d.indexOf(b,e.wkid)&&null!==g.wkid&&4326===g.wkid?(a=[],d.forEach(r,function(b){a.push(n.webMercatorToGeographic(b).toJson())},this),h(a)):(b=function(b,f){b&&b.length===a.length?(a=[],d.forEach(b,function(b){b&&(b.rings&&0<b.rings.length&&0<b.rings[0].length&&0<b.rings[0][0].length&&!isNaN(b.rings[0][0][0])&&!isNaN(b.rings[0][0][1])||b.paths&&0<b.paths.length&&0<b.paths[0].length&&
0<b.paths[0][0].length&&!isNaN(b.paths[0][0][0])&&!isNaN(b.paths[0][0][1])||b.xmin&&!isNaN(b.xmin)&&b.ymin&&!isNaN(b.ymin)||b.x&&!isNaN(b.x)&&b.y&&!isNaN(b.y))?a.push(b.toJson()):a.push(null)},this),h(a)):k(b,f)},c.defaults.geometryService?c.defaults.geometryService.project(r,g,p.hitch(this,b),k):h(null))}function D(a,b){var f=[102113,102100,3857];return a&&b&&a.wkid===b.wkid&&a.wkt===b.wkt||a&&b&&a.wkid&&b.wkid&&-1<d.indexOf(f,a.wkid)&&-1<d.indexOf(f,b.wkid)?!0:!1}function w(a,c,g,e){if(a.featureSet&&
0!==a.featureSet.features.length)if(D(g,c))e(a);else{var h,n=function(b){var f=[];d.forEach(a.featureSet.features,function(a,c){b[c]&&(a.geometry=b[c],f.push(a))},this);e(a)},r=function(b,f){console.error("error projecting featureSet ("+a.layerDefinition.name+"). Final try.");e(a)},k=function(b,f){console.error("error projecting featureSet ("+a.layerDefinition.name+"). Try one more time.");q(h,a.featureSet.geometryType,c,g,p.hitch(this,n),p.hitch(this,r))};a.featureSet.features&&0<a.featureSet.features.length?
(h=[],d.forEach(a.featureSet.features,function(b){if(b.geometry.toJson)h.push(b.geometry);else{var c=f.getGeometryType(a.featureSet.geometryType);h.push(new c(b.geometry))}}),c.toJson||(c=new b(c)),g.toJson||(g=new b(g)),q(h,a.featureSet.geometryType,c,g,p.hitch(this,n),p.hitch(this,k))):e(a)}}var z="lat latitude y ycenter latitude83 latdecdeg point-y lat_dd".split(" "),A="lon lng long longitude x xcenter longitude83 longdecdeg point-x long_dd".split(" "),E={latFieldStrings:z,longFieldStrings:A,buildCSVFeatureCollection:function(a){var b=
new m,f=function(a,f){f?b.errback(f):b.callback(a)},c={url:a.url,handleAs:"text",load:function(b){r(b,a,p.hitch(this,f))},error:function(a){b.errback(a);console.error("error: "+a)}};-1<a.url.indexOf("arcgis.com")&&-1<a.url.indexOf("/content/items")&&-1<a.url.indexOf("/data")&&(c.headers={"Content-Type":""});g(c,{usePost:!1});return b},projectFeatureCollection:function(a,f,c){var g=new m;c||(c=new b({wkid:4326}));w(a,c,f,p.hitch(this,function(a){g.callback(a)}));return g},generateDefaultPopupInfo:function(a){var b=
{esriFieldTypeDouble:1,esriFieldTypeSingle:1},f={esriFieldTypeInteger:1,esriFieldTypeSmallInteger:1},c={esriFieldTypeDate:1},g=null;a=d.map(a.layerDefinition.fields,p.hitch(this,function(a){"NAME"===a.name.toUpperCase()&&(g=a.name);var e="esriFieldTypeOID"!==a.type&&"esriFieldTypeGlobalID"!==a.type&&"esriFieldTypeGeometry"!==a.type,h=null;if(e){var d=a.name.toLowerCase();if(-1<",stretched value,fnode_,tnode_,lpoly_,rpoly_,poly_,subclass,subclass_,rings_ok,rings_nok,".indexOf(","+d+",")||-1<d.indexOf("area")||
-1<d.indexOf("length")||-1<d.indexOf("shape")||-1<d.indexOf("perimeter")||-1<d.indexOf("objectid")||d.indexOf("_")===d.length-1||d.indexOf("_i")===d.length-2&&1<d.length)e=!1;a.type in f?h={places:0,digitSeparator:!0}:a.type in b?h={places:2,digitSeparator:!0}:a.type in c&&(h={dateFormat:"shortDateShortTime"})}return p.mixin({},{fieldName:a.name,label:a.alias,isEditable:!0,tooltip:"",visible:e,format:h,stringFieldOption:"textbox"})}));return{title:g?"{"+g+"}":"",fieldInfos:a,description:null,showAttachments:!1,
mediaInfos:[]}},_getSeparator:h,_isValidDate:C,_processCsvData:r,_projectGeometries:q,_sameSpatialReference:D,_projectFeatureSet:w};l("extend-esri")&&p.setObject("arcgis.csv",E,a);return E})},"dojox/data/CsvStore":function(){define("dojo/_base/lang dojo/_base/declare dojo/_base/xhr dojo/_base/kernel dojo/data/util/filter dojo/data/util/simpleFetch".split(" "),function(p,d,m,l,k,e){d=d("dojox.data.CsvStore",null,{constructor:function(a){this._attributes=[];this._attributeIndexes={};this._dataArray=
[];this._arrayOfAllItems=[];this._loadFinished=!1;a.url&&(this.url=a.url);this._csvData=a.data;a.label?this.label=a.label:""===this.label&&(this.label=void 0);this._storeProp="_csvStore";this._idProp="_csvId";this._features={"dojo.data.api.Read":!0,"dojo.data.api.Identity":!0};this._loadInProgress=!1;this._queuedFetches=[];this.identifier=a.identifier;""===this.identifier?delete this.identifier:this._idMap={};"separator"in a&&(this.separator=a.separator);"urlPreventCache"in a&&(this.urlPreventCache=
a.urlPreventCache?!0:!1)},url:"",label:"",identifier:"",separator:",",urlPreventCache:!1,_assertIsItem:function(a){if(!this.isItem(a))throw Error(this.declaredClass+": a function was passed an item argument that was not an item");},_getIndex:function(a){a=this.getIdentity(a);this.identifier&&(a=this._idMap[a]);return a},getValue:function(a,c,g){this._assertIsItem(a);var b=g;if("string"===typeof c)c=this._attributeIndexes[c],null!=c&&(b=this._dataArray[this._getIndex(a)][c]||g);else throw Error(this.declaredClass+
": a function was passed an attribute argument that was not a string");return b},getValues:function(a,c){return(a=this.getValue(a,c))?[a]:[]},getAttributes:function(a){this._assertIsItem(a);var c=[];a=this._dataArray[this._getIndex(a)];for(var g=0;g<a.length;g++)""!==a[g]&&c.push(this._attributes[g]);return c},hasAttribute:function(a,c){this._assertIsItem(a);if("string"===typeof c)return c=this._attributeIndexes[c],a=this._dataArray[this._getIndex(a)],"undefined"!==typeof c&&c<a.length&&""!==a[c];
throw Error(this.declaredClass+": a function was passed an attribute argument that was not a string");},containsValue:function(a,c,g){var b=void 0;"string"===typeof g&&(b=k.patternToRegExp(g,!1));return this._containsValue(a,c,g,b)},_containsValue:function(a,c,g,b){a=this.getValues(a,c);for(c=0;c<a.length;++c){var f=a[c];if("string"===typeof f&&b)return null!==f.match(b);if(g===f)return!0}return!1},isItem:function(a){if(a&&a[this._storeProp]===this)if(a=a[this._idProp],this.identifier){if(this._dataArray[this._idMap[a]])return!0}else if(0<=
a&&a<this._dataArray.length)return!0;return!1},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(a){},getFeatures:function(){return this._features},getLabel:function(a){if(this.label&&this.isItem(a))return this.getValue(a,this.label)},getLabelAttributes:function(a){return this.label?[this.label]:null},_fetchItems:function(a,c,g){var b=this,f=function(a,f){var g=null;if(a.query){var e,h,g=[],d=a.queryOptions?a.queryOptions.ignoreCase:!1,n={};for(e in a.query)h=a.query[e],"string"===
typeof h&&(n[e]=k.patternToRegExp(h,d));for(d=0;d<f.length;++d){var r=!0,m=f[d];for(e in a.query)h=a.query[e],b._containsValue(m,e,h,n[e])||(r=!1);r&&g.push(m)}}else g=f.slice(0,f.length);c(g,a)};if(this._loadFinished)f(a,this._arrayOfAllItems);else if(""!==this.url)if(this._loadInProgress)this._queuedFetches.push({args:a,filter:f});else{this._loadInProgress=!0;var e=m.get({url:b.url,handleAs:"text",preventCache:b.urlPreventCache});e.addCallback(function(c){try{b._processData(c),f(a,b._arrayOfAllItems),
b._handleQueuedFetches()}catch(q){g(q,a)}});e.addErrback(function(f){b._loadInProgress=!1;if(g)g(f,a);else throw f;});var h=null;a.abort&&(h=a.abort);a.abort=function(){var b=e;b&&-1===b.fired&&(b.cancel(),b=null);h&&h.call(a)}}else if(this._csvData)try{this._processData(this._csvData),this._csvData=null,f(a,this._arrayOfAllItems)}catch(r){g(r,a)}else{var d=Error(this.declaredClass+": No CSV source data was provided as either URL or String data input.");if(g)g(d,a);else throw d;}},close:function(a){},
_getArrayOfArraysFromCsvFileContents:function(a){if(p.isString(a)){var c=/^\s+/g,e=/\s+$/g,b=/""/g,f=[],d=this._splitLines(a);for(a=0;a<d.length;++a){var h=d[a];if(0<h.length){for(var h=h.split(this.separator),k=0;k<h.length;){var m=h[k].replace(c,""),q=m.replace(e,""),l=q.charAt(0),w=q.charAt(q.length-1),z=q.charAt(q.length-2),A=q.charAt(q.length-3);if(2===q.length&&'""'==q)h[k]="";else if('"'==l&&('"'!=w||'"'==w&&'"'==z&&'"'!=A)){if(k+1===h.length)return;h[k]=m+this.separator+h[k+1];h.splice(k+
1,1)}else'"'==l&&'"'==w&&(q=q.slice(1,q.length-1),q=q.replace(b,'"')),h[k]=q,k+=1}f.push(h)}}this._attributes=f.shift();for(a=0;a<this._attributes.length;a++)this._attributeIndexes[this._attributes[a]]=a;this._dataArray=f}},_splitLines:function(a){var c=[],e,b="",f=!1;for(e=0;e<a.length;e++){var d=a.charAt(e);switch(d){case '"':f=!f;b+=d;break;case "\r":f?b+=d:(c.push(b),b="",e<a.length-1&&"\n"==a.charAt(e+1)&&e++);break;case "\n":f?b+=d:(c.push(b),b="");break;default:b+=d}}""!==b&&c.push(b);return c},
_processData:function(a){this._getArrayOfArraysFromCsvFileContents(a);this._arrayOfAllItems=[];if(this.identifier&&void 0===this._attributeIndexes[this.identifier])throw Error(this.declaredClass+": Identity specified is not a column header in the data set.");for(a=0;a<this._dataArray.length;a++){var c=a;this.identifier&&(c=this._dataArray[a][this._attributeIndexes[this.identifier]],this._idMap[c]=a);this._arrayOfAllItems.push(this._createItemFromIdentity(c))}this._loadFinished=!0;this._loadInProgress=
!1},_createItemFromIdentity:function(a){var c={};c[this._storeProp]=this;c[this._idProp]=a;return c},getIdentity:function(a){return this.isItem(a)?a[this._idProp]:null},fetchItemByIdentity:function(a){var c,e=a.scope?a.scope:l.global;if(this._loadFinished)c=this._createItemFromIdentity(a.identity),this.isItem(c)||(c=null),a.onItem&&a.onItem.call(e,c);else{var b=this;if(""!==this.url)this._loadInProgress?this._queuedFetches.push({args:a}):(this._loadInProgress=!0,c=m.get({url:b.url,handleAs:"text"}),
c.addCallback(function(f){try{b._processData(f);var c=b._createItemFromIdentity(a.identity);b.isItem(c)||(c=null);a.onItem&&a.onItem.call(e,c);b._handleQueuedFetches()}catch(h){a.onError&&a.onError.call(e,h)}}),c.addErrback(function(b){this._loadInProgress=!1;a.onError&&a.onError.call(e,b)}));else if(this._csvData)try{b._processData(b._csvData),b._csvData=null,c=b._createItemFromIdentity(a.identity),b.isItem(c)||(c=null),a.onItem&&a.onItem.call(e,c)}catch(f){a.onError&&a.onError.call(e,f)}}},getIdentityAttributes:function(a){return this.identifier?
[this.identifier]:null},_handleQueuedFetches:function(){if(0<this._queuedFetches.length){for(var a=0;a<this._queuedFetches.length;a++){var c=this._queuedFetches[a],e=c.filter,b=c.args;e?e(b,this._arrayOfAllItems):this.fetchItemByIdentity(c.args)}this._queuedFetches=[]}}});p.extend(d,e);return d})},"dojo/data/util/filter":function(){define(["../../_base/lang"],function(p){var d={};p.setObject("dojo.data.util.filter",d);d.patternToRegExp=function(d,l){for(var k="^",e=null,a=0;a<d.length;a++)switch(e=
d.charAt(a),e){case "\\":k+=e;a++;k+=d.charAt(a);break;case "*":k+=".*";break;case "?":k+=".";break;case "$":case "^":case "/":case "+":case ".":case "|":case "(":case ")":case "{":case "}":case "[":case "]":k+="\\";default:k+=e}k+="$";return l?new RegExp(k,"mi"):new RegExp(k,"m")};return d})},"dojo/data/util/simpleFetch":function(){define(["../../_base/lang","../../_base/kernel","./sorter"],function(p,d,m){var l={};p.setObject("dojo.data.util.simpleFetch",l);l.errorHandler=function(k,e){e.onError&&
e.onError.call(e.scope||d.global,k,e)};l.fetchHandler=function(k,e){var a=e.abort||null,c=!1,g=e.start?e.start:0,b=e.count&&Infinity!==e.count?g+e.count:k.length;e.abort=function(){c=!0;a&&a.call(e)};var f=e.scope||d.global;e.store||(e.store=this);e.onBegin&&e.onBegin.call(f,k.length,e);e.sort&&k.sort(m.createSortFunction(e.sort,this));if(e.onItem)for(var n=g;n<k.length&&n<b;++n){var h=k[n];c||e.onItem.call(f,h,e)}e.onComplete&&!c&&(n=null,e.onItem||(n=k.slice(g,b)),e.onComplete.call(f,n,e))};l.fetch=
function(d){d=d||{};d.store||(d.store=this);this._fetchItems(d,p.hitch(this,"fetchHandler"),p.hitch(this,"errorHandler"));return d};return l})},"dojo/data/util/sorter":function(){define(["../../_base/lang"],function(p){var d={};p.setObject("dojo.data.util.sorter",d);d.basicComparator=function(d,l){var k=-1;null===d&&(d=void 0);null===l&&(l=void 0);if(d==l)k=0;else if(d>l||null==d)k=1;return k};d.createSortFunction=function(m,l){function k(a,b,f,c){return function(e,d){e=c.getValue(e,a);d=c.getValue(d,
a);return b*f(e,d)}}for(var e=[],a,c=l.comparatorMap,g=d.basicComparator,b=0;b<m.length;b++){a=m[b];var f=a.attribute;if(f){a=a.descending?-1:1;var n=g;c&&("string"!==typeof f&&"toString"in f&&(f=f.toString()),n=c[f]||g);e.push(k(f,a,n,l))}}return function(a,b){for(var f=0;f<e.length;){var c=e[f++](a,b);if(0!==c)return c}return 0}};return d})},"*noref":1}});
define("esri/layers/CSVLayer","dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../arcgis/csv ./FeatureLayer ../geometry/Extent ../tasks/FeatureSet".split(" "),function(p,d,m,l,k,e,a,c,g){d=d(a,{declaredClass:"esri.layers.CSVLayer",_preventInit:!0,_fieldTypeMap:{Date:"esriFieldTypeDate",Number:"esriFieldTypeDouble",String:"esriFieldTypeString"},constructor:function(a,f){this.url=a;f=m.mixin({},f);this.columnDelimiter=f.columnDelimiter;this.latitudeFieldName=f.latitudeFieldName;
this.longitudeFieldName=f.longitudeFieldName;a=f.layerDefinition;a||(a={fields:f.fields||[],geometryType:"esriGeometryPoint",copyrightText:f.copyright},f.fields&&p.forEach(f.fields,function(a){a.type=this._fieldTypeMap[a.type||"String"];a.alias||(a.alias=a.name)},this));this._buildCsvFcParam={url:this.url,columnDelimiter:this.columnDelimiter,layerDefinition:a,outFields:f.outFields};this.latitudeFieldName&&this.longitudeFieldName&&(this._buildCsvFcParam.locationInfo={locationType:"coordinates",latitudeFieldName:this.latitudeFieldName,
longitudeFieldName:this.longitudeFieldName});this._projectFeatures=m.hitch(this,this._projectFeatures);this._addFeatures=m.hitch(this,this._addFeatures);this._initCSVLayer(f)},refresh:function(){this._fireUpdateStart();this.applyEdits(null,null,this.graphics);this._loadFeatures()},_isWebGLCompatible:function(){return!1},_setMap:function(a){var b=this.inherited(arguments);this._fireUpdateStart();this._projectFeatures(this._csvFC).then(this._addFeatures).otherwise(this._errorHandler);this._csvFC=null;
return b},_initCSVLayer:function(a){var b=this;e.buildCSVFeatureCollection(this._buildCsvFcParam).then(function(f){!b._buildCsvFcParam.locationInfo||b.latitudeFieldName&&b.longitudeFieldName||(b.latitudeFieldName=b._buildCsvFcParam.locationInfo.latitudeFieldName,b.longitudeFieldName=b._buildCsvFcParam.locationInfo.longitudeFieldName);b._csvFC=f;var c=f.layerDefinition;c.extent=b._getFCExtent(f);a.outFields||(a.outFields=["*"]);a.timeInfo&&(c.timeInfo=a.timeInfo);b._initFeatureLayer({layerDefinition:c},
a)}).otherwise(this._errorHandler)},_loadFeatures:function(){e.buildCSVFeatureCollection(this._buildCsvFcParam).then(this._projectFeatures).then(this._addFeatures).otherwise(this._errorHandler)},_projectFeatures:function(a){return e.projectFeatureCollection(a,this._map.spatialReference)},_addFeatures:function(a){a=new g(a.featureSet);this.applyEdits(a.features,null,null);this._fireUpdateEnd()},_getFCExtent:function(a){var b;if(a&&a.featureSet&&a.featureSet.features){a=a.featureSet.features;var e=
a.length;if(1<e){var d=a[0].geometry;b=new c(d.x,d.y,d.x,d.y);for(--e;0<e;e--)d=a[e].geometry,b.xmin=Math.min(b.xmin,d.x),b.ymin=Math.min(b.ymin,d.y),b.xmax=Math.max(b.xmax,d.x),b.ymax=Math.max(b.ymax,d.y);0>=b.getWidth()&&0>=b.getHeight()&&(b=null)}}return b}});l("extend-esri")&&m.setObject("layers.CSVLayer",d,k);return d});