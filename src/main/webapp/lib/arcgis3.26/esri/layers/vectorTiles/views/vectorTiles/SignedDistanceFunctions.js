// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/SignedDistanceFunctions",["require","exports","../3d/webgl-engine/lib/Util"],function(p,h,n){Object.defineProperty(h,"__esModule",{value:!0});h.computeSignedDistancefieldCicle=function(b,d){var k=new Uint8Array(4*b*b),l=b/2-.5;d/=2;for(var g=0;g<b;g++)for(var e=0;e<b;e++){var f=e+b*g,a=e-l,c=g-l,a=Math.sqrt(a*a+c*c)-d,a=a/b+.5;n.packFloatRGBA(a,k,4*f)}return k};h.computeSignedDistancefieldSquare=function(b,d,k){k&&(d/=Math.SQRT2);for(var l=1/Math.SQRT2,
g=new Uint8Array(4*b*b),e=0;e<b;e++)for(var f=0;f<b;f++){var a=f-.5*(b-.5),c=e-.5*(b-.5),h=e*b+f;if(k)var m=(a+c)*l,c=(c-a)*l,a=m;a=Math.max(Math.abs(a),Math.abs(c))-.5*d;a=a/b+.5;n.packFloatRGBA(a,g,4*h)}return g};h.computeSignedDistancefieldCrossAndX=function(b,d,k){k&&(d*=Math.SQRT2);var l=1/Math.SQRT2;d*=.5;for(var g=new Uint8Array(4*b*b),e=0;e<b;e++)for(var f=0;f<b;f++){var a=f-.5*b,c=e-.5*b,h=e*b+f;if(k)var m=(a+c)*l,c=(c-a)*l,a=m;m=void 0;a=Math.abs(a);c=Math.abs(c);m=a>c?a>d?Math.sqrt((a-
d)*(a-d)+c*c):c:c>d?Math.sqrt(a*a+(c-d)*(c-d)):a;m=m/b+.5;n.packFloatRGBA(m,g,4*h)}return g}});