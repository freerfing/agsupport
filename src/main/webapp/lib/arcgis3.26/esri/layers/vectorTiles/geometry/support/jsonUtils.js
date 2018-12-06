// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/geometry/support/jsonUtils","require exports ../Extent ../Multipoint ../Point ../Polygon ../Polyline".split(" "),function(r,b,c,d,e,f,g){function h(a){return void 0!==a.points}function k(a){return void 0!==a.x&&void 0!==a.y}function l(a){return void 0!==a.paths}function m(a){return void 0!==a.rings}function n(a){if(a){if(k(a))return e.fromJSON(a);if(l(a))return g.fromJSON(a);if(m(a))return f.fromJSON(a);if(h(a))return d.fromJSON(a);if(void 0!==a.xmin&&void 0!==a.ymin&&
void 0!==a.xmax&&void 0!==a.ymax)return c.fromJSON(a)}return null}Object.defineProperty(b,"__esModule",{value:!0});b.fromJson=function(a){try{throw Error("fromJson is deprecated, use fromJSON instead");}catch(p){console.warn(p.stack)}return n(a)};b.isMultipoint=h;b.isPoint=k;b.isPolyline=l;b.isPolygon=m;b.fromJSON=n;b.getJsonType=function(a){return a instanceof e?"esriGeometryPoint":a instanceof g?"esriGeometryPolyline":a instanceof f?"esriGeometryPolygon":a instanceof c?"esriGeometryEnvelope":a instanceof
d?"esriGeometryMultipoint":null};var q={esriGeometryPoint:e,esriGeometryPolyline:g,esriGeometryPolygon:f,esriGeometryEnvelope:c,esriGeometryMultipoint:d};b.getGeometryType=function(a){return a&&q[a]||null}});