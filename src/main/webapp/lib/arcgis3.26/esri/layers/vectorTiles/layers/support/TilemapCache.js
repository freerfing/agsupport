// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/layers/support/TilemapCache","require exports ../../core/tsSupport/assignHelper ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper dojo/io-query ../../request ../../core/Accessor ../../core/Error ../../core/Handles ../../core/Logger ../../core/LRUMap ../../core/promiseUtils ../../core/watchUtils ../../core/accessorSupport/decorators ./Tilemap".split(" "),function(B,C,q,r,h,t,u,v,n,w,x,y,f,z,e,l){var A=x.getLogger("esri.layers.support.TilemapCache");
return function(p){function b(a){a=p.call(this)||this;a._handles=new w;a._pendingTilemapRequests={};a._availableLevels={};a.levels=5;a.cacheByteSize=2097152;a.request=u;return a}r(b,p);b.prototype.initialize=function(){var a=this;this._tilemapCache=new y(this.cacheByteSize,{sizeOfFunction:function(a){return a.byteSize}});this._handles.add([this.watch(["layer.parsedUrl","layer.tileServers"],function(){return a._initializeTilemapDefinition()}),z.init(this,"layer.tileInfo.lods",function(d){return a._initializeAvailableLevels(d)},
!0)]);this._initializeTilemapDefinition()};b.prototype.destroy=function(){this._handles&&(this._handles.destroy(),this._handles=null)};b.prototype.castLevels=function(a){return 2>=a?(A.error("Minimum levels for Tilemap is 3, but got ",a),3):a};Object.defineProperty(b.prototype,"size",{get:function(){return 1<<this.levels},enumerable:!0,configurable:!0});b.prototype.getTilemap=function(a,d,b){return this._tilemapFromCache(a,d,b,this._tmpTilemapDefinition)};b.prototype.fetchTilemap=function(a,d,b,c){var k=
this;if(!this._availableLevels[a])return f.reject(new n("tilemap-cache:level-unavailable","Level "+a+" is unavailable in the service"));var e=this._tmpTilemapDefinition;if(a=this._tilemapFromCache(a,d,b,e))return f.resolve(a);var g=l.tilemapDefinitionId(e),m=this._pendingTilemapRequests[g];m||(m=l.Tilemap.fromDefinition(e,c).then(function(a){k._tilemapCache.set(g,a);delete k._pendingTilemapRequests[g];return a}).catch(function(a){delete k._pendingTilemapRequests[g];return f.reject(a)}),this._pendingTilemapRequests[g]=
m);return f.create(function(a,d){m.then(a,d)})};b.prototype.getAvailability=function(a,d,b){return this._availableLevels[a]?(a=this.getTilemap(a,d,b))?a.getAvailability(d,b):"unknown":"unavailable"};b.prototype.getAvailabilityUpsample=function(a,d,b,c){c.level=a;c.row=d;c.col=b;a=this.layer.tileInfo;for(a.updateTileInfo(c);;)if(d=this.getAvailability(c.level,c.row,c.col),"unavailable"===d){if(!a.upsampleTile(c))return"unavailable"}else return d};b.prototype.fetchAvailability=function(a,d,b,c){return this._availableLevels[a]?
this.fetchTilemap(a,d,b,c).always(function(c){return c instanceof l.Tilemap?(c=c.getAvailability(d,b),"unavailable"===c?f.reject(new n("tile-map:tile-unavailable","Tile is not available",{level:a,row:d,col:b})):c):c&&"cancel"===c.dojoType?f.reject(c):"unknown"}):f.reject(new n("tilemap-cache:level-unavailable","Level "+a+" is unavailable in the service"))};b.prototype.fetchAvailabilityUpsample=function(a,b,k,c,e){var d=this;c.level=a;c.row=b;c.col=k;var g=this.layer.tileInfo;g.updateTileInfo(c);return this.fetchAvailability(a,
b,k,e).catch(function(a){return a&&"cancel"===a.dojoType?f.reject(a):g.upsampleTile(c)?d.fetchAvailabilityUpsample(c.level,c.row,c.col,c):f.reject(a)})};b.prototype._initializeTilemapDefinition=function(){if(this.layer.parsedUrl){var a=this.layer.parsedUrl,b=a.query;b&&b.token||!this.layer.token||(b=q({},b,{token:this.layer.token}));this._tilemapCache.clear();this._tmpTilemapDefinition={service:{url:a.path,query:b?t.objectToQuery(b):null,tileServers:this.layer.tileServers,request:this.request,type:this.layer.type},
width:this.size,height:this.size,level:0,row:0,col:0}}};b.prototype._tilemapFromCache=function(a,b,e,c){a=this._getTilemapDefinition(a,b,e,c);a=l.tilemapDefinitionId(a);return this._tilemapCache.get(a)};b.prototype._getTilemapDefinition=function(a,b,e,c){c.level=a;c.row=b-b%this.size;c.col=e-e%this.size;return c};b.prototype._initializeAvailableLevels=function(a){var b=this;this._availableLevels={};a&&a.forEach(function(a){return b._availableLevels[a.level]=!0})};h([e.property({constructOnly:!0,type:Number})],
b.prototype,"levels",void 0);h([e.cast("levels")],b.prototype,"castLevels",null);h([e.property({readOnly:!0,dependsOn:["levels"],type:Number})],b.prototype,"size",null);h([e.property({constructOnly:!0,type:Number})],b.prototype,"cacheByteSize",void 0);h([e.property({constructOnly:!0})],b.prototype,"layer",void 0);h([e.property({constructOnly:!0})],b.prototype,"request",void 0);return b=h([e.subclass("esri.layers.support.TilemapCache")],b)}(e.declared(v))});