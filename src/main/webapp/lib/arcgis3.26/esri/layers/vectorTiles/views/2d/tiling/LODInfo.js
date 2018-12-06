// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/tiling/LODInfo",["require","exports","../../../geometry/support/spatialReferenceUtils","./TileKey"],function(r,t,p,q){function k(b,a,c){b[0]=a;b[1]=c;return b}var d=new q("0/0/0/0");return function(){function b(a,c,e,b,f,d,g,h,m,n,k,p){this.level=a;this.resolution=c;this.scale=e;this.origin=b;this.first=f;this.last=d;this.size=g;this.norm=h;this.worldStart=m;this.worldEnd=n;this.worldSize=k;this.wrap=p}b.create=function(a,c,e){var d=p.getInfo(a.spatialReference),
f=[a.origin.x,a.origin.y],l=[a.size[0]*c.resolution,a.size[1]*c.resolution],g=[-Infinity,-Infinity],h=[Infinity,Infinity],m=[Infinity,Infinity];e&&(k(g,Math.max(0,Math.floor((e.xmin-f[0])/l[0])),Math.max(0,Math.floor((f[1]-e.ymax)/l[1]))),k(h,Math.max(0,Math.floor((e.xmax-f[0])/l[0])),Math.max(0,Math.floor((f[1]-e.ymin)/l[1]))),k(m,h[0]-g[0]+1,h[1]-g[1]+1));var n;a.isWrappable?(a=[Math.ceil(Math.round(2*d.origin[1]/c.resolution)/a.size[0]),m[1]],d=[Math.floor((d.origin[0]-f[0])/l[0]),g[1]],e=[a[0]+
d[0]-1,h[1]],n=!0):(d=g,e=h,a=m,n=!1);return new b(c.level,c.resolution,c.scale,f,g,h,m,l,d,e,a,n)};b.prototype.normalizeCol=function(a){if(!this.wrap)return a;var c=this.worldSize[0];return 0>a?c-1-Math.abs((a+1)%c):a%c};b.prototype.denormalizeCol=function(a,c){return this.wrap?this.worldSize[0]*c+a:a};b.prototype.getWorldForColumn=function(a){return this.wrap?Math.floor(a/this.worldSize[0]):0};b.prototype.getFirstColumnForWorld=function(a){return a*this.worldSize[0]+this.first[0]};b.prototype.getLastColumnForWorld=
function(a){return a*this.worldSize[0]+this.first[0]+this.size[0]-1};b.prototype.getColumnForX=function(a){return(a-this.origin[0])/this.norm[0]};b.prototype.getXForColumn=function(a){return this.origin[0]+a*this.norm[0]};b.prototype.getRowForY=function(a){return(this.origin[1]-a)/this.norm[1]};b.prototype.getYForRow=function(a){return this.origin[1]-a*this.norm[1]};b.prototype.getTileBounds=function(a,c,b){void 0===b&&(b=!1);d.set(c);var e=b?d.col:this.denormalizeCol(d.col,d.world),f=d.row;c=this.getXForColumn(e);
b=this.getYForRow(f+1);e=this.getXForColumn(e+1);f=this.getYForRow(f);a[0]=c;a[1]=b;a[2]=e;a[3]=f;return a};b.prototype.getTileCoords=function(a,b,e){void 0===e&&(e=!1);d.set(b);b=e?d.col:this.denormalizeCol(d.col,d.world);Array.isArray(a)?k(a,this.getXForColumn(b),this.getYForRow(d.row)):(a.x=this.getXForColumn(b),a.y=this.getYForRow(d.row));return a};return b}()});