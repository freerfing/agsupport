// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.11/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/MosaicRule":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../lang ../geometry/Point".split(" "),function(c,b,p,g,k,m){var e=c(null,{declaredClass:"esri.layers.MosaicRule",method:null,where:null,sortField:null,sortValue:null,ascending:!1,lockRasterIds:null,viewpoint:null,objectIds:null,operation:null,multidimensionalDefinition:[],constructor:function(n){b.isObject(n)&&(b.mixin(this,n),n.mosaicMethod&&(this.method=n.mosaicMethod),this.method&&
"esri"!==this.method.toLowerCase().substring(0,4)&&(this.method=this._getMethodEnum(this.method)),n.mosaicOperation&&(this.operation=n.mosaicOperation),this.operation&&"MT_"!==this.operation.toUpperCase().substring(0,3)&&(this.operation=this._getOperatorEnum(this.operation)),n.fids&&(this.objectIds=n.fids),n.viewpoint&&(this.viewpoint=new m(n.viewpoint)))},toJson:function(){var b=null,f=this.multidimensionalDefinition?this.multidimensionalDefinition.length:0;if(f)for(var b=[],e=0;e<f;e++)b.push("esri.layers.DimensionalDefinition"===
this.multidimensionalDefinition[e].declaredClass?this.multidimensionalDefinition[e].toJson():this.multidimensionalDefinition[e]);b={mosaicMethod:this.method,where:this.where,sortField:this.sortField,sortValue:this.sortValue,ascending:this.ascending,lockRasterIds:this.lockRasterIds,viewpoint:this.viewpoint?this.viewpoint.toJson():null,fids:this.objectIds,mosaicOperation:this.operation,multidimensionalDefinition:b};return k.filter(b,function(f){if(null!==f)return!0})},_getMethodEnum:function(b){if(b){var f=
e.METHOD_NONE;switch(b.toLowerCase()){case "byattribute":f=e.METHOD_ATTRIBUTE;break;case "center":f=e.METHOD_CENTER;break;case "lockraster":f=e.METHOD_LOCKRASTER;break;case "nadir":f=e.METHOD_NADIR;break;case "northwest":f=e.METHOD_NORTHWEST;break;case "seamline":f=e.METHOD_SEAMLINE;break;case "viewpoint":f=e.METHOD_VIEWPOINT}return f}},_getOperatorEnum:function(b){if(b)switch(b.toLowerCase()){case "first":return e.OPERATION_FIRST;case "last":return e.OPERATION_LAST;case "max":return e.OPERATION_MAX;
case "min":return e.OPERATION_MIN;case "blend":return e.OPERATION_BLEND;case "mean":return e.OPERATION_MEAN}}});b.mixin(e,{METHOD_NONE:"esriMosaicNone",METHOD_CENTER:"esriMosaicCenter",METHOD_NADIR:"esriMosaicNadir",METHOD_VIEWPOINT:"esriMosaicViewpoint",METHOD_ATTRIBUTE:"esriMosaicAttribute",METHOD_LOCKRASTER:"esriMosaicLockRaster",METHOD_NORTHWEST:"esriMosaicNorthwest",METHOD_SEAMLINE:"esriMosaicSeamline",OPERATION_FIRST:"MT_FIRST",OPERATION_LAST:"MT_LAST",OPERATION_MIN:"MT_MIN",OPERATION_MAX:"MT_MAX",
OPERATION_MEAN:"MT_MEAN",OPERATION_BLEND:"MT_BLEND"});p("extend-esri")&&b.setObject("layers.MosaicRule",e,g);return e})},"esri/tasks/ImageServiceIdentifyTask":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../request ../geometry/normalizeUtils ./Task ./ImageServiceIdentifyResult".split(" "),function(c,b,p,g,k,m,e,n){c=c(e,{declaredClass:"esri.tasks.ImageServiceIdentifyTask",constructor:function(f){this._url.path+="/identify";this._handler=b.hitch(this,this._handler)},__msigns:[{n:"execute",
c:3,a:[{i:0,p:["geometry"]}],e:2}],_handler:function(f,b,e,l,h){try{var c=new n(f);this._successHandler([c],"onComplete",e,h)}catch(p){this._errorHandler(p,l,h)}},execute:function(f,e,c,l){var h=l.assembly;f=this._encode(b.mixin({},this._url.query,{f:"json"},f.toJson(h&&h[0])));var n=this._handler,p=this._errorHandler;return k({url:this._url.path,content:f,callbackParamName:"callback",load:function(b,f){n(b,f,e,c,l.dfd)},error:function(b){p(b,c,l.dfd)}})},onComplete:function(){}});m._createWrappers(c);
p("extend-esri")&&b.setObject("tasks.ImageServiceIdentifyTask",c,g);return c})},"esri/tasks/Task":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/json dojo/has ../kernel ../deferredUtils ../urlUtils ../Evented".split(" "),function(c,b,p,g,k,m,e,n){c=c(n,{declaredClass:"esri.tasks._Task",_eventMap:{error:["error"],complete:["result"]},constructor:function(f,c){f&&b.isString(f)&&(this._url=e.urlToObject(this.url=f));c&&c.requestOptions&&(this.requestOptions=c.requestOptions);this.normalization=
!0;this._errorHandler=b.hitch(this,this._errorHandler);this.registerConnectEvents()},_useSSL:function(){var b=this._url,e=/^http:/i;this.url&&(this.url=this.url.replace(e,"https:"));b&&b.path&&(b.path=b.path.replace(e,"https:"))},_encode:function(e,c,n){var l,h,g={},k,m;for(k in e)if("declaredClass"!==k&&(l=e[k],h=typeof l,null!==l&&void 0!==l&&"function"!==h))if(b.isArray(l)){g[k]=[];m=l.length;for(h=0;h<m;h++)g[k][h]=this._encode(l[h])}else"object"===h?l.toJson&&(h=l.toJson(n&&n[k]),"esri.tasks.FeatureSet"===
l.declaredClass&&h.spatialReference&&(h.sr=h.spatialReference,delete h.spatialReference),g[k]=c?h:p.toJson(h)):g[k]=l;return g},_successHandler:function(b,e,c,l){e&&this[e].apply(this,b);c&&c.apply(null,b);l&&m._resDfd(l,b)},_errorHandler:function(b,e,c){this.onError(b);e&&e(b);c&&c.errback(b)},setNormalization:function(b){this.normalization=b},onError:function(){}});g("extend-esri")&&(k.Task=c);return c})},"esri/tasks/ImageServiceIdentifyResult":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../geometry/jsonUtils ./FeatureSet".split(" "),
function(c,b,p,g,k,m){c=c(null,{declaredClass:"esri.tasks.ImageServiceIdentifyResult",constructor:function(b){b.catalogItems&&(this.catalogItems=new m(b.catalogItems));b.location&&(this.location=k.fromJson(b.location));this.catalogItemVisibilities=b.catalogItemVisibilities;this.name=b.name;this.objectId=b.objectId;this.value=b.value;this.properties=b.properties}});p("extend-esri")&&b.setObject("tasks.ImageServiceIdentifyResult",c,g);return c})},"esri/tasks/ImageServiceIdentifyParameters":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/json dojo/has ../kernel ../lang ../geometry/jsonUtils".split(" "),
function(c,b,p,g,k,m,e){c=c(null,{declaredClass:"esri.tasks.ImageServiceIdentifyParameters",geometry:null,mosaicRule:null,renderingRule:null,pixelSizeX:null,pixelSizeY:null,pixelSize:null,returnGeometry:!1,returnCatalogItems:!0,timeExtent:null,toJson:function(b){var c=b&&b.geometry||this.geometry;b={geometry:c,returnGeometry:this.returnGeometry,returnCatalogItems:this.returnCatalogItems,mosaicRule:this.mosaicRule?p.toJson(this.mosaicRule.toJson()):null,renderingRule:this.renderingRule?p.toJson(this.renderingRule.toJson()):
null};c&&(b.geometryType=e.getJsonType(c));c=this.timeExtent;b.time=c?c.toJson().join(","):null;m.isDefined(this.pixelSizeX)&&m.isDefined(this.pixelSizeY)?b.pixelSize=p.toJson({x:parseFloat(this.pixelSizeX),y:parseFloat(this.pixelSizeY)}):this.pixelSize&&(b.pixelSize=this.pixelSize?p.toJson(this.pixelSize.toJson()):null);return b}});g("extend-esri")&&b.setObject("tasks.ImageServiceIdentifyParameters",c,k);return c})},"esri/tasks/FeatureSet":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../lang ../graphic ../SpatialReference ../graphicsUtils ../geometry/jsonUtils ../symbols/jsonUtils".split(" "),
function(c,b,p,g,k,m,e,n,f,r,y){c=c(null,{declaredClass:"esri.tasks.FeatureSet",constructor:function(c){if(c){b.mixin(this,c);var h=this.features,f=c.spatialReference,k=r.getGeometryType(c.geometryType),f=this.spatialReference=new n(f);this.geometryType=c.geometryType;c.fields&&(this.fields=c.fields);p.forEach(h,function(b,c){var l=b.geometry&&b.geometry.spatialReference;h[c]=new e(k&&b.geometry?new k(b.geometry):null,b.symbol&&y.fromJson(b.symbol),b.attributes);h[c].geometry&&!l&&h[c].geometry.setSpatialReference(f)})}else this.features=
[]},displayFieldName:null,geometryType:null,spatialReference:null,fieldAliases:null,toJson:function(b){var c={};this.displayFieldName&&(c.displayFieldName=this.displayFieldName);this.fields&&(c.fields=this.fields);this.spatialReference?c.spatialReference=this.spatialReference.toJson():this.features[0]&&this.features[0].geometry&&(c.spatialReference=this.features[0].geometry.spatialReference.toJson());this.features[0]&&(this.features[0].geometry&&(c.geometryType=r.getJsonType(this.features[0].geometry)),
c.features=f._encodeGraphics(this.features,b));c.exceededTransferLimit=this.exceededTransferLimit;return m.fixJson(c)}});g("extend-esri")&&b.setObject("tasks.FeatureSet",c,k);return c})},"*noref":1}});
define("esri/layers/ArcGISImageServiceLayer","dojo/_base/declare dojo/_base/lang dojo/_base/Deferred dojo/_base/array dojo/_base/json dojo/_base/config dojo/has dojo/io-query ../kernel ../config ../lang ../request ../deferredUtils ../urlUtils ../geometry/Extent ../geometry/Point ../SpatialReference ./MosaicRule ./DynamicMapServiceLayer ./TimeInfo ./Field ../graphic ../tasks/ImageServiceIdentifyTask ../tasks/ImageServiceIdentifyParameters ../geometry/Polygon".split(" "),function(c,b,p,g,k,m,e,n,f,
r,y,l,h,D,E,G,O,C,H,I,J,K,L,M,N){c=c(H,{declaredClass:"esri.layers.ArcGISImageServiceLayer",_eventMap:{"rendering-change":!0,"mosaic-rule-change":!0},constructor:function(a,c){this._url=D.urlToObject(a);var d=c&&c.imageServiceParameters;this.format=d&&d.format;this.interpolation=d?d.interpolation:null;this.compressionQuality=d?d.compressionQuality:null;this.bandIds=d?d.bandIds:null;this.mosaicRule=d?d.mosaicRule:null;this.renderingRule=d?d.renderingRule:null;this._params=b.mixin({},this._url.query,
{f:"image",interpolation:this.interpolation,format:this.format,compressionQuality:this.compressionQuality,bandIds:this.bandIds?this.bandIds.join(","):null},d?d.toJson():{});this._initLayer=b.hitch(this,this._initLayer);this._queryVisibleRastersHandler=b.hitch(this,this._queryVisibleRastersHandler);this._visibleRasters=[];this.useMapImage=c&&c.useMapImage||!1;this.infoTemplate=c&&c.infoTemplate;this._rasterAttributeTableFields=[];this._rasterAttributeTableFeatures=[];this._loadCallback=c&&c.loadCallback;
(d=c&&c.resourceInfo)?this._initLayer(d):l({url:this._url.path,content:b.mixin({f:"json"},this._url.query),callbackParamName:"callback",load:this._initLayer,error:this._errorHandler});this.registerConnectEvents()},disableClientCaching:!1,_initLayer:function(a,c){this._findCredential();(this.credential&&this.credential.ssl||a&&a._ssl)&&this._useSSL();var d=this.minScale,e=this.maxScale;b.mixin(this,a);this.minScale=d;this.maxScale=e;this.initialExtent=this.fullExtent=this.extent=new E(a.extent);this.spatialReference=
this.initialExtent.spatialReference;this.pixelSizeX=parseFloat(this.pixelSizeX);this.pixelSizeY=parseFloat(this.pixelSizeY);for(var f=this.minValues,h=this.maxValues,k=this.meanValues,l=this.stdvValues,g=this.bands=[],d=0,e=this.bandCount;d<e;d++)g[d]={min:f[d],max:h[d],mean:k[d],stddev:l[d]};this.timeInfo=(d=this.timeInfo)&&d.timeExtent?new I(d):null;e=this.fields=[];if(f=a.fields)for(d=0;d<f.length;d++)e.push(new J(f[d]));this.version=a.currentVersion;this.version||(this.version="fields"in a||"objectIdField"in
a||"timeInfo"in a?10:9.3);y.isDefined(a.minScale)&&!this._hasMin&&this.setMinScale(a.minScale);y.isDefined(a.maxScale)&&!this._hasMax&&this.setMaxScale(a.maxScale);d={};a.defaultMosaicMethod?(d.method=a.defaultMosaicMethod,d.operation=a.mosaicOperator,d.sortField=a.sortField,d.sortValue=a.sortValue):d.method=C.METHOD_NONE;this.defaultMosaicRule=new C(d);this.defaultMosaicRule.ascending=!0;10<this.version&&this.hasRasterAttributeTable&&this.getRasterAttributeTable().then(b.hitch(this,function(a){a&&
(a.features&&0<a.features.length)&&(this._rasterAttributeTableFeatures=b.clone(a.features));a&&(a.fields&&0<a.fields.length)&&(this._rasterAttributeTableFields=b.clone(a.fields))}));this.loaded=!0;this.onLoad(this);if(d=this._loadCallback)delete this._loadCallback,d(this)},getKeyProperties:function(){var a=this._url.path+"/keyProperties",b=new p(h._dfdCanceller);10<this.version?(b._pendingDfd=l({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),b._pendingDfd.then(function(a){b.callback(a)},
function(a){b.errback(a)})):(a=Error("Layer does not have key properties"),a.log=m.isDebug,b.errback(a));return b},getRasterAttributeTable:function(){var a=this._url.path+"/rasterAttributeTable",b=new p(h._dfdCanceller);10<this.version&&this.hasRasterAttributeTable?(b._pendingDfd=l({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),b._pendingDfd.then(function(a){b.callback(a)},function(a){b.errback(a)})):(a=Error("Layer does not support raster attribute table"),a.log=m.isDebug,
b.errback(a));return b},_getRasterAttributeTableFeatures:function(){var a=new p;if(this._rasterAttributeTableFeatures&&0<this._rasterAttributeTableFeatures.length)return a.resolve(this._rasterAttributeTableFeatures),a;if(10<this.version&&this.hasRasterAttributeTable)return a=this.getRasterAttributeTable(),a.then(b.hitch(this,function(a){a&&(a.features&&0<a.features.length)&&(this._rasterAttributeTableFeatures=b.clone(a.features))})),a;a.resolve(this._rasterAttributeTableFeatures);return a},getCustomRasterFields:function(a){var c=
a?a.rasterAttributeTableFieldPrefix:"",d={name:"Raster.ItemPixelValue",alias:"Item Pixel Value",domain:null,editable:!1,length:50,type:"esriFieldTypeString"};a=this.fields?b.clone(this.fields):[];var e=a.length;a[e]={name:"Raster.ServicePixelValue",alias:"Service Pixel Value",domain:null,editable:!1,length:50,type:"esriFieldTypeString"};if(this.capabilities&&-1<this.capabilities.toLowerCase().indexOf("catalog")||this.fields&&0<this.fields.length)a[e+1]=d;this._rasterAttributeTableFields&&0<this._rasterAttributeTableFields.length&&
(d=g.filter(this._rasterAttributeTableFields,function(a){return"esriFieldTypeOID"!==a.type&&"value"!==a.name.toLowerCase()}),d=g.map(d,function(a){var d=b.clone(a);d.name=c+a.name;return d}),a=a.concat(d));return a},getImageUrl:function(a,c,d,e){var f=a.spatialReference.wkid||k.toJson(a.spatialReference.toJson());delete this._params._ts;var h=this._url.path+"/exportImage?";b.mixin(this._params,{bbox:a.xmin+","+a.ymin+","+a.xmax+","+a.ymax,imageSR:f,bboxSR:f,size:c+","+d},this.disableClientCaching?
{_ts:(new Date).getTime()}:{});var g=this._params.token=this._getToken();a=D.addProxy(h+n.objectToQuery(b.mixin(this._params,{f:"image"})));a.length>r.defaults.io.postLength||this.useMapImage?this._jsonRequest=l({url:h,content:b.mixin(this._params,{f:"json"}),callbackParamName:"callback",load:function(a,b){var d=a.href;g&&(d+=-1===d.indexOf("?")?"?token\x3d"+g:"\x26token\x3d"+g);e(D.addProxy(d))},error:this._errorHandler}):e(a)},onRenderingChange:function(){},onMosaicRuleChange:function(){},setInterpolation:function(a,
b){this.interpolation=this._params.interpolation=a;b||this.refresh(!0)},setCompressionQuality:function(a,b){this.compressionQuality=this._params.compressionQuality=a;b||this.refresh(!0)},setBandIds:function(a,b){var d=!1;this.bandIds!==a&&(d=!0);this.bandIds=a;this._params.bandIds=a.join(",");if(d&&!b)this.onRenderingChange();b||this.refresh(!0)},setDefaultBandIds:function(a){this.bandIds=this._params.bandIds=null;a||this.refresh(!0)},setDisableClientCaching:function(a){this.disableClientCaching=
a},setMosaicRule:function(a,b){var d=!1;this.mosaicRule!==a&&(d=!0);this.mosaicRule=a;this._params.mosaicRule=k.toJson(a.toJson());if(d&&!b)this.onMosaicRuleChange();b||this.refresh(!0)},setRenderingRule:function(a,b){var d=!1;this.renderingRule!==a&&(d=!0);this.renderingRule=a;this._params.renderingRule=a?k.toJson(a.toJson()):null;if(d&&!b)this.onRenderingChange();b||this.refresh(!0)},setImageFormat:function(a,b){this.format=this._params.format=a;b||this.refresh(!0)},setInfoTemplate:function(a){this.infoTemplate=
a},setDefinitionExpression:function(a,b){var d=this.mosaicRule?this.mosaicRule.toJson():{};this.mosaicRule||(this.defaultMosaicRule?d=this.defaultMosaicRule.toJson():d.method=C.METHOD_NONE);d.where=a;d=new C(d);this.setMosaicRule(d,b);return this},getDefinitionExpression:function(){return this.mosaicRule?this.mosaicRule.where:null},refresh:function(a){if(a)this.inherited(arguments);else{var b=this.disableClientCaching;this.disableClientCaching=!0;this.inherited(arguments);this.disableClientCaching=
b}},exportMapImage:function(a,c){var d=r.defaults.map,d=b.mixin({size:d.width+","+d.height},this._params,a?a.toJson(this.normalization):{},{f:"json"});delete d._ts;this._exportMapImage(this._url.path+"/exportImage",d,c)},queryVisibleRasters:function(a,b,d,c){var e=this._map,f=h._fixDfd(new p(h._dfdCanceller));this._visibleRasters=[];var g,k,l=!0,n;if(this.infoTemplate&&this.infoTemplate.info.fieldInfos&&0<this.infoTemplate.info.fieldInfos.length){l=!1;n=this.infoTemplate.info;for(g=0;g<n.fieldInfos.length;g++)if((k=
n.fieldInfos[g])&&"raster.servicepixelvalue"!==k.fieldName.toLowerCase()&&(k.visible||n.title&&-1<n.title.toLowerCase().indexOf(k.fieldName.toLowerCase()))){l=!0;break}}g=new M;g.geometry=a.geometry;g.returnGeometry=this._map.spatialReference.equals(this.spatialReference);g.returnCatalogItems=l;g.timeExtent=a.timeExtent;g.mosaicRule=this.mosaicRule?this.mosaicRule:null;g.renderingRule=this.renderingRule?this.renderingRule:null;e&&(a=new G((e.extent.xmax-e.extent.xmin)/(2*e.width),(e.extent.ymax-e.extent.ymin)/
(2*e.height),e.extent.spatialReference),g.pixelSize=a);var m=this;a=new L(this.url);(f._pendingDfd=a.execute(g)).addCallbacks(function(a){m._queryVisibleRastersHandler(a,b,d,c,f)},function(a){m._resolve([a],null,c,f,!0)});return f},_queryVisibleRastersHandler:function(a,c,d,e,f){function h(){var a=this.getCustomRasterFields(c),e=this._getDomainFields(a),k=c?c.returnDomainValues:!1,l=c&&c.rasterAttributeTableFieldPrefix,q,r,F,u,x,t,w,v;this._getRasterAttributeTableFeatures().then(b.hitch(this,function(a){for(q=
0;q<m.length;q++){s=m[q];s.setInfoTemplate(this.infoTemplate);s._layer=this;if(n&&(r=n,p&&p.length>=q&&(F=p[q],r=F.replace(/ /gi,", ")),s.attributes["Raster.ItemPixelValue"]=r,s.attributes["Raster.ServicePixelValue"]=n,a&&0<a.length&&(u=g.filter(a,function(a){if(a&&a.attributes)return a.attributes.hasOwnProperty("Value")?a.attributes.Value==r:a.attributes.VALUE==r}),0<u.length&&(x=b.clone(u[0]),l&&x)))){v={};for(t in x.attributes)x.attributes.hasOwnProperty(t)&&(w=l+t,v[w]=x.attributes[t]);x.attributes=
v;s.attributes=b.mixin(s.attributes,x.attributes)}k&&(e&&0<e.length)&&g.forEach(e,function(a){if(a){var b=s.attributes[a.name];y.isDefined(b)&&(b=this._getDomainValue(a.domain,b),y.isDefined(b)&&(s.attributes[a.name]=b))}},this);z.push(s);this._visibleRasters.push(s)}this._resolve([z,null,!0],null,d,f)}))}var n=a.value,p,m,q=0,u=0,r=this,w=this.objectIdField,v;if(a.catalogItems){e=0;var A,B,t=a.catalogItems.features.length;A=0;m=Array(t);p=Array(t);v=Array(t);for(q=0;q<t;q++)-1<a.properties.Values[q].toLowerCase().indexOf("nodata")&&
A++;A=t-A;for(q=0;q<t;q++)B=-1<a.properties.Values[q].toLowerCase().indexOf("nodata")?A++:e++,m[B]=a.catalogItems.features[q],p[B]=a.properties.Values[q],v[B]=m[B].attributes[w]}this._visibleRasters=[];var s;a=-1<n.toLowerCase().indexOf("nodata");n&&(!m&&!a)&&(w="ObjectId",m=[],s=new K(new E(this.fullExtent),null,{ObjectId:0}),m.push(s));var z=[];m?!this._map.spatialReference.equals(this.spatialReference)&&v&&0<v.length?l({url:this._url.path+"/query",content:{f:"json",objectIds:v.join(","),returnGeometry:!0,
outSR:k.toJson(r._map.spatialReference.toJson()),outFields:w},handleAs:"json",callbackParamName:"callback",load:function(a){if(0===a.features.length)r._resolve([z,null,null],null,d,f);else{for(q=0;q<a.features.length;q++)for(u=0;u<m.length;u++)m[u].attributes[w]==a.features[q].attributes[w]&&(m[u].geometry=new N(a.features[q].geometry),m[u].geometry.setSpatialReference(r._map.spatialReference));h.call(r)}},error:function(a){r._resolve([z,null,null],null,d,f)}}):h.call(this):this._resolve([z,null,
null],null,d,f)},getVisibleRasters:function(){var a=this._visibleRasters,b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(a[c]);return b},_getDomainFields:function(a){if(a){var b=[];g.forEach(a,function(a){if(a.domain){var c={};c.name=a.name;c.domain=a.domain;b.push(c)}});return b}},_getDomainValue:function(a,b){if(a&&a.codedValues){var c;g.some(a.codedValues,function(a){return a.code===b?(c=a.name,!0):!1});return c}},_resolve:function(a,b,c,e,f){b&&this[b].apply(this,a);c&&c.apply(null,a);e&&h._resDfd(e,
a,f)}});e("extend-esri")&&b.setObject("layers.ArcGISImageServiceLayer",c,f);return c});