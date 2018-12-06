// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/tiling/TileInfoView","require exports ../../../geometry/support/spatialReferenceUtils ./LODInfo ./TileCoverage ./TileKey ./TileSpan".split(" "),function(y,z,u,v,w,k,r){var q=new k("0/0/0/0"),x=function(){function d(b,a,c,f,d,g,l,e){this.x=b;this.ymin=a;this.ymax=c;this.invM=f;this.leftAdjust=d;this.rightAdjust=g;this.leftBound=l;this.rightBound=e}d.create=function(b,a){b[1]>a[1]&&(e=[a,b],b=e[0],a=e[1]);e=b[0];b=b[1];var c=a[0];a=a[1];var f=c-e,t=a-b,t=0!==
t?f/t:0,g=(Math.ceil(b)-b)*t,l=(Math.floor(b)-b)*t;return new d(e,Math.floor(b),Math.ceil(a),t,0>f?g:l,0>f?l:g,0>f?c:e,0>f?e:c);var e};d.prototype.incrRow=function(){this.x+=this.invM};d.prototype.getLeftCol=function(){return Math.max(this.x+this.leftAdjust,this.leftBound)};d.prototype.getRightCol=function(){return Math.min(this.x+this.rightAdjust,this.rightBound)};return d}(),m=[[0,0],[0,0],[0,0],[0,0]];return function(){function d(b,a){var c=this;this.tileInfo=b;this.fullExtent=a;this.scales=[];
this._lodInfos=null;this._infoByScale={};this._infoByLevel={};var f=b.lods.slice();f.sort(function(a,b){return b.scale-a.scale});var d=this._lodInfos=f.map(function(c){return v.create(b,c,a)});f.forEach(function(a,b){c._infoByLevel[a.level]=d[b];c._infoByScale[a.scale]=d[b];c.scales[b]=a.scale},this);this._wrap=b.isWrappable}d.prototype.getLODInfoAt=function(b){return this._infoByLevel[b.level]};d.prototype.getTileBounds=function(b,a,c){void 0===c&&(c=!1);q.set(a);return(a=this._infoByLevel[q.level])?
a.getTileBounds(b,q,c):b};d.prototype.getTileCoords=function(b,a,c){void 0===c&&(c=!1);q.set(a);return(a=this._infoByLevel[q.level])?a.getTileCoords(b,q,c):b};d.prototype.getTileCoverage=function(b,a){void 0===a&&(a=192);var c=this.getClosestInfoForScale(b.scale),f=w.pool.acquire(c),d=this._wrap,g;g=Infinity;var l=-Infinity,e,p,k=f.spans;m[0][0]=m[0][1]=m[1][1]=m[3][0]=-a;m[1][0]=m[2][0]=b.size[0]+a;m[2][1]=m[3][1]=b.size[1]+a;for(a=0;a<m.length;a++){var h=m[a];b.toMap(h,h);h[0]=c.getColumnForX(h[0]);
h[1]=c.getRowForY(h[1])}b=[];h=3;for(a=0;4>a;a++){if(m[a][1]!==m[h][1]){var n=x.create(m[a],m[h]);g=Math.min(n.ymin,g);l=Math.max(n.ymax,l);void 0===b[n.ymin]&&(b[n.ymin]=[]);b[n.ymin].push(n)}h=a}if(null==g||null==l||100<l-g)return null;for(h=[];g<l;){null!=b[g]&&(h=h.concat(b[g]));e=Infinity;p=-Infinity;for(a=h.length-1;0<=a;a--)n=h[a],e=Math.min(e,n.getLeftCol()),p=Math.max(p,n.getRightCol());e=Math.floor(e);p=Math.floor(p);if(g>=c.first[1]&&g<=c.last[1])if(d)if(c.size[0]<c.worldSize[0])for(n=
Math.floor(p/c.worldSize[0]),a=Math.floor(e/c.worldSize[0]);a<=n;a++)k.push(new r(g,Math.max(c.getFirstColumnForWorld(a),e),Math.min(c.getLastColumnForWorld(a),p)));else k.push(new r(g,e,p));else e>c.last[0]||p<c.first[0]||(e=Math.max(e,c.first[0]),p=Math.min(p,c.last[0]),k.push(new r(g,e,p)));g+=1;for(a=h.length-1;0<=a;a--)n=h[a],n.ymax>=g?n.incrRow():h.splice(a,1)}return f};d.prototype.getTileIdAtParent=function(b,a){a=k.pool.acquire(a);var c=this._infoByLevel[a.level];if(b.resolution<c.resolution)throw Error("Cannot calculate parent tile. destination LOD's resolution "+
b.resolution+" is not a parent resolution of "+c.resolution);return b.resolution===c.resolution?a.id:k.getId(b.level,Math.floor(a.row*c.resolution/b.resolution+.01),Math.floor(a.col*c.resolution/b.resolution+.01),a.world)};d.prototype.getTileParentId=function(b){b=k.pool.acquire(b);var a=this._lodInfos.indexOf(this._infoByLevel[b.level])-1;if(0>a)return k.pool.release(b),null;a=this.getTileIdAtParent(this._lodInfos[a],b);k.pool.release(b);return a};d.prototype.getTileResolution=function(b){return(b=
this._infoByLevel[b.level])?b.resolution:-1};d.prototype.getTileScale=function(b){return(b=this._infoByLevel[b.level])?b.scale:-1};d.prototype.intersects=function(b,a){var c=k.pool.acquire(a);a=this._infoByLevel[c.level];var f=b.lodInfo;if(f.resolution>a.resolution){var d=k.pool.acquire(this.getTileIdAtParent(f,c)),g=f.denormalizeCol(d.col,d.world);a=b.spans.some(function(a){return a.row===d.row&&a.colFrom<=g&&a.colTo>=g});k.pool.release(c);k.pool.release(d);return a}if(f.resolution<a.resolution){var l=
b.spans.reduce(function(a,b){a[0]=Math.min(a[0],b.row);a[1]=Math.max(a[1],b.row);a[2]=Math.min(a[2],b.colFrom);a[3]=Math.max(a[3],b.colTo);return a},[Infinity,-Infinity,Infinity,-Infinity]);b=l[0];var e=l[1],m=l[2],l=l[3],q=a.denormalizeCol(c.col,c.world),h=f.getColumnForX(a.getXForColumn(q)),n=f.getRowForY(a.getYForRow(c.row)),q=f.getColumnForX(a.getXForColumn(q+1))-1;a=f.getRowForY(a.getYForRow(c.row+1))-1;k.pool.release(c);return!(h>l||q<m||n>e||a<b)}var r=f.denormalizeCol(c.col,c.world);a=b.spans.some(function(a){return a.row===
c.row&&a.colFrom<=r&&a.colTo>=r});k.pool.release(c);return a};d.prototype.normalizeBounds=function(b,a,c){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];this._wrap&&(a=u.getInfo(this.tileInfo.spatialReference),c=-c*(a.valid[1]-a.valid[0]),b[0]+=c,b[2]+=c);return b};d.prototype.getClosestInfoForScale=function(b){var a=this.scales;this._infoByScale[b]||(b=a.reduce(function(a,d,k,g){return Math.abs(d-b)<Math.abs(a-b)?d:a},a[0]));return this._infoByScale[b]};return d}()});