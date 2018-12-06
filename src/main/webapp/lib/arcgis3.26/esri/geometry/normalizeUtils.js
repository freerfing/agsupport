// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/geometry/normalizeUtils","dojo/_base/array dojo/_base/lang dojo/_base/Deferred dojo/has ../kernel ../config ../deferredUtils ./Extent ./Polyline ./Polygon ./webMercatorUtils ./jsonUtils".split(" "),function(n,q,E,N,O,P,y,Q,t,A,z,R){function x(a,e){return Math.ceil((a-e)/(2*e))}function B(a,e){var b=a.paths||a.rings,c,f,d=b.length,m;for(c=0;c<d;c++)for(m=b[c].length,f=0;f<m;f++){var l=a.getPoint(c,f);a.setPoint(c,f,l.offset(e,0))}return a}function F(a,e){if(!(a instanceof t||a instanceof
A))throw console.error("_straightLineDensify: the input geometry is neither polyline nor polygon"),Error("_straightLineDensify: the input geometry is neither polyline nor polygon");var b=a instanceof t,c=[],f;n.forEach(b?a.paths:a.rings,function(a){c.push(f=[]);f.push([a[0][0],a[0][1]]);var d,b,k,g,h,p,n,q,t,r,v,u;for(h=0;h<a.length-1;h++){d=a[h][0];b=a[h][1];k=a[h+1][0];g=a[h+1][1];n=Math.sqrt((k-d)*(k-d)+(g-b)*(g-b));q=(g-b)/n;t=(k-d)/n;r=n/e;if(1<r){for(p=1;p<=r-1;p++)u=p*e,v=t*u+d,u=q*u+b,f.push([v,
u]);p=(n+Math.floor(r-1)*e)/2;v=t*p+d;u=q*p+b;f.push([v,u])}f.push([k,g])}});return b?new t({paths:c,spatialReference:a.spatialReference}):new A({rings:c,spatialReference:a.spatialReference})}function C(a,e,b){e&&(a=F(a,1E6),a=z.webMercatorToGeographic(a,!0));b&&(a=B(a,b));return a}function D(a,e,b){var c=a.x||a[0],f;c>e?(f=x(c,e),a.x?a=a.offset(-2*f*e,0):a[0]=c+-2*f*e):c<b&&(f=x(c,b),a.x?a=a.offset(-2*f*b,0):a[0]=c+-2*f*b);return a}function H(a,e){var b=-1;n.forEach(e.cutIndexes,function(c,f){var d=
e.geometries[f];n.forEach(d.rings||d.paths,function(a,f){n.some(a,function(b){if(!(180>b[0])){b=0;var c,e=a.length,m;for(c=0;c<e;c++)m=a[c][0],b=m>b?m:b;b=Number(b.toFixed(9));b=-360*x(b,180);e=a.length;for(c=0;c<e;c++)m=d.getPoint(f,c),d.setPoint(f,c,m.offset(b,0))}return!0})});c===b?d.rings?n.forEach(d.rings,function(b){a[c]=a[c].addRing(b)}):n.forEach(d.paths,function(b){a[c]=a[c].addPath(b)}):(b=c,a[c]=d)});return a}function I(a,e,b,c){var f=new E;f.addCallbacks(b,c);e=e||P.defaults.geometryService;
var d=[],m=[],l,k,g,h,p,q,G,w,r=0;n.forEach(a,function(a){if(a)if(l||(l=a.spatialReference,k=l._getInfo(),h=(g=l._isWebMercator())?2.0037508342788905E7:180,p=g?-2.0037508342788905E7:-180,q=g?102100:4326,G=new t({paths:[[[h,p],[h,h]]],spatialReference:{wkid:q}}),w=new t({paths:[[[p,p],[p,h]]],spatialReference:{wkid:q}})),k){var b=R.fromJson(a.toJson()),c=a.getExtent();"point"===a.type?d.push(D(b,h,p)):"multipoint"===a.type?(b.points=n.map(b.points,function(a){return D(a,h,p)}),d.push(b)):"extent"===
a.type?(b=c._normalize(null,null,k),d.push(b.rings?new A(b):b)):c?(a=2*x(c.xmin,p)*h,b=0===a?b:B(b,a),c=c.offset(a,0),c.intersects(G)&&c.xmax!==h?(r=c.xmax>r?c.xmax:r,b=C(b,g),m.push(b),d.push("cut")):c.intersects(w)&&c.xmin!==p?(r=2*c.xmax*h>r?2*c.xmax*h:r,b=C(b,g,360),m.push(b),d.push("cut")):d.push(b)):d.push(b)}else d.push(a);else d.push(a)});b=new t;c=x(r,h);for(var v=-90,u=c;0<c;){var y=-180+360*c;b.addPath([[y,v],[y,-1*v]]);v*=-1;c--}0<m.length&&0<u?e?e.cut(m,b,function(b){m=H(m,b);var c=[];
n.forEach(d,function(b,f){"cut"===b&&(b=m.shift(),a[f].rings&&1<a[f].rings.length&&b.rings.length>=a[f].rings.length?(d[f]="simplify",c.push(b)):d[f]=!0===g?z.geographicToWebMercator(b):b)});0<c.length?e.simplify(c,function(a){n.forEach(d,function(b,c){"simplify"===b&&(d[c]=!0===g?z.geographicToWebMercator(a.shift()):a.shift())});f.callback(d)},function(a){f.errback(a)}):f.callback(d)},function(a){f.errback(a)}):f.errback(Error("esri.geometry.normalizeCentralMeridian: 'geometryService' argument is missing.")):
(n.forEach(d,function(a,b){"cut"===a&&(a=m.shift(),d[b]=!0===g?z.geographicToWebMercator(a):a)}),f.callback(d));return f}function w(a,e,b,c){var f=!1,d;q.isObject(a)&&a&&(q.isArray(a)?a.length&&((d=a[0]&&a[0].declaredClass)&&-1!==d.indexOf("Graphic")?(a=n.map(a,function(a){return a.geometry}),f=a.length?!0:!1):d&&-1!==d.indexOf("esri.geometry.")&&(f=!0)):(d=a.declaredClass)&&-1!==d.indexOf("FeatureSet")?(a=n.map(a.features||[],function(a){return a.geometry}),f=a.length?!0:!1):d&&-1!==d.indexOf("esri.geometry.")&&
(f=!0));f&&e.push({index:b,property:c,value:a})}function J(a,e){var b=[];n.forEach(e,function(c){var f=c.i,d=a[f];c=c.p;var e;if(q.isObject(d)&&d)if(c)if("*"===c[0])for(e in d)d.hasOwnProperty(e)&&w(d[e],b,f,e);else n.forEach(c,function(a){w(q.getObject(a,!1,d),b,f,a)});else w(d,b,f)});return b}function K(a,e){var b=0,c={};n.forEach(e,function(f){var d=f.index,e=f.property,l=f.value,k=l.length||1,g=a.slice(b,b+k);q.isArray(l)||(g=g[0]);b+=k;delete f.value;e?(c[d]=c[d]||{},c[d][e]=g):c[d]=g});return c}
function L(a){for(var e=[],b=0,c=0,f=Math.min,d=Math.max,m=0;m<a.length;m++){for(var l=a[m],k=null,g=0;g<l.length;g++)k=l[g],e.push(k),0===g?c=b=k[0]:(b=f(b,k[0]),c=d(c,k[0]));k&&e.push([(b+c)/2,0])}return e}var M={normalizeCentralMeridian:I,_foldCutResults:H,_prepareGeometryForCut:C,_offsetMagnitude:x,_pointNormalization:D,_updatePolyGeometry:B,_straightLineDensify:F,_createWrappers:function(a){var e=q.isObject(a)?a.prototype:q.getObject(a+".prototype");n.forEach(e.__msigns,function(a){var b=e[a.n];
e[a.n]=function(){var c=this,d=[],e,l=new E(y._dfdCanceller);a.f&&y._fixDfd(l);for(e=0;e<a.c;e++)d[e]=arguments[e];var k={dfd:l};d.push(k);var g,h=[],p;c.normalization&&!c._isTable&&(g=J(d,a.a),n.forEach(g,function(a){h=h.concat(a.value)}),h.length&&(p=I(h)));p?(l._pendingDfd=p,p.addCallbacks(function(a){l.canceled||(k.assembly=K(a,g),l._pendingDfd=b.apply(c,d))},function(b){var e=c.declaredClass;e&&-1!==e.indexOf("FeatureLayer")?c._resolve([b],null,d[a.e],l,!0):c._errorHandler(b,d[a.e],l)})):l._pendingDfd=
b.apply(c,d);return l}})},_disassemble:J,_addToBucket:w,_reassemble:K,getDenormalizedExtent:function(a){if(!a)return null;var e=a.getExtent();if(!e)return null;var b=a.spatialReference&&a.spatialReference._getInfo();if(!b)return e;var c=b.valid[0],b=b.valid[1],f=2*b,d=e.getWidth(),m=e.xmax,l=e.xmin;if("extent"===a.type||0===d||d<=b||d>f||m<c||l>b)return e;var k;switch(a.type){case "polygon":if(1<a.rings.length)k=L(a.rings);else return e;break;case "polyline":if(1<a.paths.length)k=L(a.paths);else return e;
break;case "multipoint":k=a.points}a=Math.min;for(var c=Math.max,f=new Q(e.toJson()),g=0;g<k.length;g++){var h=k[g][0];0>h?(h+=b,l=c(h,l)):(h-=b,m=a(h,m))}f.xmin=m;f.xmax=l;return f.getWidth()<d?(f.xmin-=b,f.xmax-=b,f):e}};N("extend-esri")&&q.mixin(q.getObject("geometry",!0,O),M);return M});