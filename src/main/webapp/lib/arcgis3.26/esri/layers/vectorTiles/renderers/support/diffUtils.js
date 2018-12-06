// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/renderers/support/diffUtils",["require","exports","../../core/Accessor","../../core/Collection","../../core/accessorSupport/utils"],function(z,g,t,h,w){function u(a){return a instanceof h?Object.keys(a.items):a instanceof t?w.getProperties(a).keys():a?Object.keys(a):[]}function q(a,b){return a instanceof h?a.items[b]:a[b]}function x(a,b){return Array.isArray(a)&&Array.isArray(b)?a.length!==b.length:!1}function k(a){return a?a.declaredClass:null}function v(a,b){var e=
a.diff;if(e&&"function"===typeof e)return e(a,b);var l=u(a),m=u(b);if(0!==l.length||0!==m.length){if(!l.length||!m.length||x(a,b))return{type:"complete",oldValue:a,newValue:b};var n=m.filter(function(a){return-1===l.indexOf(a)}),p=l.filter(function(a){return-1===m.indexOf(a)}),n=l.filter(function(c){return-1<m.indexOf(c)&&q(a,c)!==q(b,c)}).concat(n,p).sort();if((p=k(a))&&-1<y.indexOf(p)&&n.length)return{type:"complete",oldValue:a,newValue:b};var r,p=a instanceof t&&b instanceof t,g;for(g in n){var f=
n[g],c=q(a,f),d=q(b,f),h=void 0;(p||"function"!==typeof c&&"function"!==typeof d)&&c!==d&&(null!=c||null!=d)&&(h=e&&e[f]&&"function"===typeof e[f]?e[f](c,d):"object"===typeof c&&"object"===typeof d&&k(c)===k(d)?v(c,d):{type:"complete",oldValue:c,newValue:d})&&(r=r||{type:"partial",diff:{}},r.diff[f]=h)}return r}}Object.defineProperty(g,"__esModule",{value:!0});var y=["esri.Color","esri.portal.Portal"];g.diff=function(a,b){if("function"!==typeof a&&"function"!==typeof b&&(a||b))return!a||!b||"object"===
typeof a&&"object"===typeof b&&k(a)!==k(b)?{type:"complete",oldValue:a,newValue:b}:v(a,b)}});