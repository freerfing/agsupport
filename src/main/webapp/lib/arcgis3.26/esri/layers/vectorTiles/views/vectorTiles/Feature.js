// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/Feature",["require","exports","../2d/engine/webgl/Geometry"],function(m,n,k){return function(){function l(a,c){this.values={};var g=c.keys;for(c=c.values;a.next();)switch(a.tag()){case 1:this.id=a.getUInt64();break;case 2:for(var b=a.getMessage(),h=this.values;!b.empty();){var e=b.getUInt32(),d=b.getUInt32();h[g[e]]=c[d]}break;case 3:this.type=a.getUInt32();break;case 4:this._pbfGeometry=a.getMessage();break;default:a.skip()}}l.prototype.getGeometry=
function(a){if(void 0!==this._geometry)return this._geometry;var c=this._pbfGeometry,g,b;a?a.reset(this.type):g=[];for(var h=1,e=0,d=0,f=0;!c.empty();)switch(0===e&&(e=c.getUInt32(),h=e&7,e>>=3),e--,h){case 1:d+=c.getSInt32();f+=c.getSInt32();a?a.moveTo(d,f):(b&&g.push(b),b=[],b.push(new k.Point(d,f)));break;case 2:d+=c.getSInt32();f+=c.getSInt32();a?a.lineTo(d,f):b.push(new k.Point(d,f));break;case 7:a?a.close():b&&!b[0].equals(d,f)&&b.push(b[0].clone());break;default:throw Error("Invalid path operation");
}a?a=a.result():(b&&g.push(b),a=g);return this._geometry=a};return l}()});