// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/tasks/FeatureSet","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../lang ../graphic ../SpatialReference ../graphicsUtils ../geometry/Polygon ../geometry/jsonUtils ../symbols/jsonUtils".split(" "),function(e,q,r,v,w,x,t,l,y,z,c,A){e=e(null,{declaredClass:"esri.tasks.FeatureSet",constructor:function(a,b){if(a){q.mixin(this,a);var u=this.features=this.features||[],d=a.spatialReference,d=this.spatialReference=c.createInstance(l.simpleConstructor,d),m=c.getGeometryType(a.geometryType);
this.geometryType=a.geometryType;a.fields&&(this.fields=a.fields);a=c.supportsLazyUnquantization(this.geometryType);var g=c.unquantizeFunction(this.geometryType,this.transform),h=!!(b&&a&&g),e=m&&(h?m.accessorConstructor:m.simpleConstructor);r.forEach(u,function(a,b){var k=c.createInstance(t.simpleConstructor),n=a.geometry;if(m&&n){var f=k.geometry=c.createInstance(e,h?null:n);f.setSpatialReference(n.spatialReference?c.createInstance(l.simpleConstructor,n.spatialReference):d);h&&f.setupLazyUnquantization(g,
n)}k.symbol=a.symbol?A.fromJson(a.symbol):null;k.attributes=a.attributes;u[b]=k});h||this._hydrate()}else this.features=[]},displayFieldName:null,geometryType:null,spatialReference:null,fieldAliases:null,toJson:function(a){var b={};this.displayFieldName&&(b.displayFieldName=this.displayFieldName);this.fields&&(b.fields=this.fields);this.spatialReference?b.spatialReference=this.spatialReference.toJson():this.features[0]&&this.features[0].geometry&&(b.spatialReference=this.features[0].geometry.spatialReference.toJson());
this.features[0]&&(this.features[0].geometry&&(b.geometryType=c.getJsonType(this.features[0].geometry)),b.features=y._encodeGraphics(this.features,a));b.geometryType=b.geometryType||this.geometryType;b.exceededTransferLimit=this.exceededTransferLimit;b.transform=this.transform;return x.fixJson(b)},_hydrate:function(){c.unquantize(this.features,this.geometryType,this.transform);this.transform=null},quantize:function(a){if(!this.geometryType)return this.transform=null,this;var b=a.translate[0],c=a.translate[1],
d=a.scale[0],e=a.scale[1],g=this.features,h=function(a,b,c){var p,k,d,h,f,e,g=[];p=0;for(k=a.length;p<k;p++)if(d=a[p],0<p){if(e=b(d[0]),d=c(d[1]),e!==h||d!==f)g.push([e-h,d-f]),h=e,f=d}else h=b(d[0]),f=c(d[1]),g.push([h,f]);return 0<g.length?g:null},B=function(a,b,d){if("esriGeometryPoint"===a)return function(a){a.x=b(a.x);a.y=d(a.y);return a};if("esriGeometryPolyline"===a||"esriGeometryPolygon"===a)return function(a){var c,f,e,g,k;e=a.rings||a.paths;k=[];c=0;for(f=e.length;c<f;c++)g=e[c],(g=h(g,
b,d))&&k.push(g);return 0<k.length?(a.rings?a.rings=k:a.paths=k,a):null};if("esriGeometryMultipoint"===a)return function(a){var c;c=h(a.points,b,d);return 0<c.length?(a.points=c,a):null};if("esriGeometryEnvelope"===a)return function(a){return a}}(this.geometryType,function(a){return Math.round((a-b)/d)},function(a){return Math.round((c-a)/e)}),f,l;f=0;for(l=g.length;f<l;f++)g[f].geometry&&(B(g[f].geometry)||g[f].setGeometry(null));this.transform=a;return this}});e.createGraphics=function(a){var b=
a.geometryType,e=c.createInstance(l.simpleConstructor,a.spatialReference),d=c.getGeometryType(b).accessorConstructor,m=c.unquantizeFunction(b,a.transform);return r.map(a.features,function(a,b){b=c.createInstance(t.simpleConstructor);var g=a.geometry;if(g){var f=b.geometry=c.createInstance(d);f.setSpatialReference(e);f.setupLazyUnquantization(m,g)}b.attributes=a.attributes;return b})};e.createPolygon=function(a,b,e){var d;a&&(d=c.createInstance(z.accessorConstructor),d.setSpatialReference(b),b=c.unquantizeFunction("esriGeometryPolygon",
e),d.setupLazyUnquantization(b,a));return d};v("extend-esri")&&q.setObject("tasks.FeatureSet",e,w);return e});