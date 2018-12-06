// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/VectorTileDisplayObject","require exports ../../core/tsSupport/extendsHelper ../../core/ObjectPool ../../core/libs/gl-matrix/mat4 ../../core/libs/gl-matrix/vec2 ../../geometry/support/spatialReferenceUtils ../2d/engine/DisplayObject ../2d/tiling/enums ../2d/tiling/TileKey ./RenderBucket ../webgl/BufferObject".split(" "),function(B,C,t,u,v,w,x,y,n,z,q,f){var A="fillVertexBuffer fillDDVertexBuffer fillIndexBuffer outlineVertexBuffer outlineDDVertexBuffer outlineIndexBuffer lineVertexBuffer lineDDVertexBuffer lineIndexBuffer iconVertexBuffer iconDDVertexBuffer iconIndexBuffer textVertexBuffer textDDVertexBuffer textIndexBuffer circleVertexBuffer circleIndexBuffer".split(" ");
return function(r){function g(){for(var c=[],b=0;b<arguments.length;b++)c[b]=arguments[b];b=r.call(this)||this;b._renderBuckets=[];b._vectorTileData=null;b._symbolUpdateData=null;b.status=n.TileStatus.INITIALIZED;b.coords=[0,0];b.bounds=[0,0,0,0];b.tileTransform={transform:Float32Array[16],displayCoord:Float32Array[2]};b.stencilData={mask:0,reference:0};b.status=n.TileStatus.INITIALIZED;b.tileTransform.transform=v.create();b.tileTransform.displayCoord=w.create();0<c.length&&(f=b.acquire).call.apply(f,
[b].concat(c));return b;var f}t(g,r);g.prototype.reset=function(){z.pool.release(this.key);this.refKey=this.key=null;this.coords[0]=0;this.coords[1]=0;this.bounds[0]=0;this.bounds[1]=0;this.bounds[2]=0;this.height=this.width=this.bounds[3]=0;this.resolution=null;this.rotation=0;this.id=this.client=this.styleLayers=this._vectorTileData=null;this.tileTransform.transform.fill(0);this.tileTransform.displayCoord.fill(0);this.stencilData.mask=0;this.stencilData.reference=0;this._renderBuckets.length=0;
this._symbolUpdateData=null;this.status=n.TileStatus.INITIALIZED};g.prototype.acquire=function(c,b,f,a,k){this.key=c;this.refKey=b;b=f.lodAt(c.level).resolution;var d=f.size[0]*b,e=f.origin,h=c.col*d,m=c.row*d,l=f.spatialReference,g=0;l&&(l._isWrappable?l._isWrappable():l.isWrappable)&&(l=x.getInfo(l),g=l.valid[1]-l.valid[0]);h=e.x+h+c.world*g;e=e.y-m;this.coords[0]=h;this.coords[1]=e;this.bounds[0]=h;this.bounds[1]=e;this.bounds[2]=h+d;this.bounds[3]=e-d;this.widthInPixels=f.size[1];this.coordRange=
4096;this.resolution=b;this.rotation=k;this.styleLayers=a;this.id=c.id};g.prototype.setData=function(c,b){this._vectorTileData=c;this.client=b;c&&c.bufferDataInfo||(this.status=n.TileStatus.NO_DATA)};g.prototype.updateSymbolData=function(c){c&&(this._symbolUpdateData=c,this.requestRender())};g.prototype.dispose=function(){this.fillVertexArrayObject&&(this.fillVertexArrayObject.dispose(),this.fillVertexArrayObject=null);this.fillDDVertexArrayObject&&(this.fillDDVertexArrayObject.dispose(),this.fillDDVertexArrayObject=
null);this.outlineVertexArrayObject&&(this.outlineVertexArrayObject.dispose(),this.outlineVertexArrayObject=null);this.outlineDDVertexArrayObject&&(this.outlineDDVertexArrayObject.dispose(),this.outlineDDVertexArrayObject=null);this.lineVertexArrayObject&&(this.lineVertexArrayObject.dispose(),this.lineVertexArrayObject=null);this.lineDDVertexArrayObject&&(this.lineDDVertexArrayObject.dispose(),this.lineDDVertexArrayObject=null);this.iconVertexArrayObject&&(this.iconVertexArrayObject.dispose(),this.iconVertexArrayObject=
null);this.iconDDVertexArrayObject&&(this.iconDDVertexArrayObject.dispose(),this.iconDDVertexArrayObject=null);this.textVertexArrayObject&&(this.textVertexArrayObject.dispose(),this.textVertexArrayObject=null);this.textDDVertexArrayObject&&(this.textDDVertexArrayObject.dispose(),this.textDDVertexArrayObject=null);this.circleVertexArrayObject&&(this.circleVertexArrayObject.dispose(),this.circleVertexArrayObject=null);this.fillVertexBuffer&&(this.fillVertexBuffer.dispose(),this.fillVertexBuffer=null);
this.fillDDVertexBuffer&&(this.fillDDVertexBuffer.dispose(),this.fillDDVertexBuffer=null);this.fillIndexBuffer&&(this.fillIndexBuffer.dispose(),this.fillIndexBuffer=null);this.outlineVertexBuffer&&(this.outlineVertexBuffer.dispose(),this.outlineVertexBuffer=null);this.outlineDDVertexBuffer&&(this.outlineDDVertexBuffer.dispose(),this.outlineDDVertexBuffer=null);this.outlineIndexBuffer&&(this.outlineIndexBuffer.dispose(),this.outlineIndexBuffer=null);this.lineVertexBuffer&&(this.lineVertexBuffer.dispose(),
this.lineVertexBuffer=null);this.lineDDVertexBuffer&&(this.lineDDVertexBuffer.dispose(),this.lineDDVertexBuffer=null);this.lineIndexBuffer&&(this.lineIndexBuffer.dispose(),this.lineIndexBuffer=null);this.iconVertexBuffer&&(this.iconVertexBuffer.dispose(),this.iconVertexBuffer=null);this.iconDDVertexBuffer&&(this.iconDDVertexBuffer.dispose(),this.iconDDVertexBuffer=null);this.iconIndexBuffer&&(this.iconIndexBuffer.dispose(),this.iconIndexBuffer=null);this.textVertexBuffer&&(this.textVertexBuffer.dispose(),
this.textVertexBuffer=null);this.textDDVertexBuffer&&(this.textDDVertexBuffer.dispose(),this.textDDVertexBuffer=null);this.textIndexBuffer&&(this.textIndexBuffer.dispose(),this.textIndexBuffer=null);this.circleVertexBuffer&&(this.circleVertexBuffer.dispose(),this.circleVertexBuffer=null);this.circleIndexBuffer&&(this.circleIndexBuffer.dispose(),this.circleIndexBuffer=null);this.texture&&(this.texture.dispose(),this.texture=null);this._renderBuckets.length=0;this.status=n.TileStatus.INITIALIZED};g.prototype.getCpuMemoryUsage=
function(){return null!=this._vectorTileData&&this._vectorTileData.bufferData?this._vectorTileData.bufferData.reduce(function(c,b){return c+b.byteLength},0)+this._vectorTileData.bufferDataInfo.byteLength+this._vectorTileData.bucketDataInfo.byteLength:0};g.prototype.getGpuMemoryUsage=function(){var c=this,b=A.reduce(function(b,a){return c[a]?b+c[a].size:b},0);this.texture&&(b+=this.texture.descriptor.width*this.texture.descriptor.height*4);return b};g.prototype.attach=function(c){if(this.status!==
n.TileStatus.INITIALIZED)return!0;if(0===this._renderBuckets.length)for(var b=new Uint32Array(this._vectorTileData.bucketDataInfo),g=b.length,a=0;a<g;){var k=b[a],d=b[a+1];if(0===d)d=new q.BackgroundRenderBucket,d.layerID=k,this._renderBuckets.push(d),a+=2;else if(1===d)d=new q.FillRenderBucket,d.layerID=k,d.triangleElementStart=b[a+2],d.triangleElementCount=b[a+3],d.outlineElementStart=b[a+4],d.outlineElementCount=b[a+5],this._renderBuckets.push(d),a+=6;else if(2===d)d=new q.LineRenderBucket,d.layerID=
k,d.triangleElementStart=b[a+2],d.triangleElementCount=b[a+3],this._renderBuckets.push(d),a+=4;else if(3===d){d=new q.SymbolRenderBucket;d.layerID=k;d.isSDF=0!==b[a+2];var e=a+3,k=b[e];e++;if(0<k)for(var h=void 0,m=void 0,l=void 0,p=0;p<k;p++)h=b[e],m=b[e+1],l=b[e+2],d.markerPerPageElementsMap.set(h,[m,l]),e+=3;var r=b[e];e++;if(0<r)for(l=m=h=void 0,p=0;p<r;p++)h=b[e],m=b[e+1],l=b[e+2],d.glyphPerPageElementsMap.set(h,[m,l]),e+=3;this._renderBuckets.push(d);a+=5+3*k+3*r}else 4===d?(d=new q.CircleRenderBucket,
d.layerID=k,d.triangleElementStart=b[a+2],d.triangleElementCount=b[a+3],this._renderBuckets.push(d),a+=4):console.error("Bad bucket type!")}c=c.context;b=new Uint32Array(this._vectorTileData.bufferDataInfo);g=b.length;for(d=a=0;d<g;d+=2,a++)if(!(0>=b[d+1]||0===this._vectorTileData.bufferData[a].byteLength))switch(b[d]){case 1:this.fillVertexBuffer?this.fillVertexBuffer.setData(this._vectorTileData.bufferData[a]):this.fillVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;
case 2:this.fillDDVertexBuffer?this.fillDDVertexBuffer.setData(this._vectorTileData.bufferData[a]):this.fillDDVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;case 3:this.fillIndexBuffer?this.fillIndexBuffer.setData(this._vectorTileData.bufferData[a]):this.fillIndexBuffer=f.createIndex(c,35044,this._vectorTileData.bufferData[a]);break;case 4:this.outlineVertexBuffer?this.outlineVertexBuffer.setData(this._vectorTileData.bufferData[a]):this.outlineVertexBuffer=f.createVertex(c,
35044,this._vectorTileData.bufferData[a]);break;case 5:this.outlineDDVertexBuffer?this.outlineDDVertexBuffer.setData(this._vectorTileData.bufferData[a]):this.outlineDDVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;case 6:this.outlineIndexBuffer?this.outlineIndexBuffer.setData(this._vectorTileData.bufferData[a]):this.outlineIndexBuffer=f.createIndex(c,35044,this._vectorTileData.bufferData[a]);break;case 7:this.lineVertexBuffer?this.lineVertexBuffer.setData(this._vectorTileData.bufferData[a]):
this.lineVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;case 8:this.lineDDVertexBuffer?this.lineDDVertexBuffer.setData(this._vectorTileData.bufferData[a]):this.lineDDVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;case 9:this.lineIndexBuffer?this.lineIndexBuffer.setData(this._vectorTileData.bufferData[a]):this.lineIndexBuffer=f.createIndex(c,35044,this._vectorTileData.bufferData[a]);break;case 10:this.iconVertexBuffer?this.iconVertexBuffer.setData(this._vectorTileData.bufferData[a]):
this.iconVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;case 11:this.iconDDVertexBuffer?this.iconDDVertexBuffer.setData(this._vectorTileData.bufferData[a]):this.iconDDVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;case 12:this.iconIndexBuffer?this.iconIndexBuffer.setData(this._vectorTileData.bufferData[a]):this.iconIndexBuffer=f.createIndex(c,35044,this._vectorTileData.bufferData[a]);break;case 13:this.textVertexBuffer?this.textVertexBuffer.setData(this._vectorTileData.bufferData[a]):
this.textVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;case 14:this.textDDVertexBuffer?this.textDDVertexBuffer.setData(this._vectorTileData.bufferData[a]):this.textDDVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;case 15:this.textIndexBuffer?this.textIndexBuffer.setData(this._vectorTileData.bufferData[a]):this.textIndexBuffer=f.createIndex(c,35044,this._vectorTileData.bufferData[a]);break;case 16:this.circleVertexBuffer?this.circleVertexBuffer.setData(this._vectorTileData.bufferData[a]):
this.circleVertexBuffer=f.createVertex(c,35044,this._vectorTileData.bufferData[a]);break;case 17:this.circleIndexBuffer?this.circleIndexBuffer.setData(this._vectorTileData.bufferData[a]):this.circleIndexBuffer=f.createIndex(c,35044,this._vectorTileData.bufferData[a])}this._vectorTileData=null;this.status=n.TileStatus.READY;return!0};g.prototype.detach=function(c){this.client&&this.status!==n.TileStatus.INVALID&&this.status!==n.TileStatus.INITIALIZED&&this.client.invoke("destructTileData",this.id);
this.dispose();r.prototype.detach.call(this,c)};g.prototype.doRender=function(c){if(this.visible&&this.status===n.TileStatus.READY){var b=c.context,f=c.renderer;if(b&&f){var a=c.drawphase;this._symbolUpdateData&&this._updateSymbolData(c);b.setStencilFunction(514,this.stencilData.reference,this.stencilData.mask);var k=this.styleLayers,d=void 0!==c.layerOpacity?c.layerOpacity:1;if(0!==d){var e,h=this._renderBuckets.length,g=0;if(0===a)for(g=h-1;0<=g;g--)e=this._renderBuckets[g],3!==e.type&&4!==e.type&&
e.hasData()&&f.renderBucket(b,e,c.displayLevel,c.requiredLevel,a,this,k.layers[e.layerID],d);else for(g=0;g<h;g++)e=this._renderBuckets[g],e.hasData()&&f.renderBucket(b,e,c.displayLevel,c.requiredLevel,a,this,k.layers[e.layerID],d)}}}};g.prototype._updateSymbolData=function(c){if(!this._symbolUpdateData.bucketDataInfo)return!0;var b=new Uint32Array(this._symbolUpdateData.bucketDataInfo),g=b.length;if(0===g)return this._symbolUpdateData=null,!0;if(this.status!==n.TileStatus.READY)return this.requestRender(),
!1;c=c.context;for(var a=new Uint32Array(this._symbolUpdateData.bufferDataInfo),k=a.length,d=0,e=0;e<k;e+=2,d++)switch(a[e]){case 10:this.iconVertexBuffer&&(this.iconVertexBuffer.dispose(),this.iconVertexBuffer=null);this.iconVertexBuffer=f.createVertex(c,35044,this._symbolUpdateData.bufferData[d]);break;case 11:this.iconDDVertexBuffer&&(this.iconDDVertexBuffer.dispose(),this.iconDDVertexBuffer=null);this.iconDDVertexBuffer=f.createVertex(c,35044,this._symbolUpdateData.bufferData[d]);break;case 12:this.iconIndexBuffer&&
(this.iconIndexBuffer.dispose(),this.iconIndexBuffer=null);this.iconIndexBuffer=f.createIndex(c,35044,this._symbolUpdateData.bufferData[d]);break;case 13:this.textVertexBuffer&&(this.textVertexBuffer.dispose(),this.textVertexBuffer=null);this.textVertexBuffer=f.createVertex(c,35044,this._symbolUpdateData.bufferData[d]);break;case 14:this.textDDVertexBuffer&&(this.textDDVertexBuffer.dispose(),this.textDDVertexBuffer=null);this.textDDVertexBuffer=f.createVertex(c,35044,this._symbolUpdateData.bufferData[d]);
break;case 15:this.textIndexBuffer&&(this.textIndexBuffer.dispose(),this.textIndexBuffer=null),this.textIndexBuffer=f.createIndex(c,35044,this._symbolUpdateData.bufferData[d])}c=this._renderBuckets.length;for(a=0;a<c;a++)this._renderBuckets[a]instanceof q.SymbolRenderBucket&&(k=this._renderBuckets[a],k.markerPerPageElementsMap.clear(),k.glyphPerPageElementsMap.clear());for(c=0;c<g;){k=b[c];d=-1;e=this._renderBuckets.length;for(a=0;a<e;a++)if(this._renderBuckets[a].layerID===k){d=a;break}a=this._renderBuckets[d];
a||(a=new q.SymbolRenderBucket,a.layerID=k,a.isSDF=0!==b[c+2],this._renderBuckets.push(a));var h=c+3,k=b[h];h++;if(0<k)for(var m=e=d=void 0,l=0;l<k;l++)d=b[h],e=b[h+1],m=b[h+2],a.markerPerPageElementsMap.set(d,[e,m]),h+=3;var p=b[h];h++;if(0<p)for(m=e=d=void 0,l=0;l<p;l++)d=b[h],e=b[h+1],m=b[h+2],a.glyphPerPageElementsMap.set(d,[e,m]),h+=3;c+=5+3*k+3*p}this.iconVertexArrayObject&&(this.iconVertexArrayObject.dispose(),this.iconVertexArrayObject=null);this.iconDDVertexArrayObject&&(this.iconDDVertexArrayObject.dispose(),
this.iconDDVertexArrayObject=null);this.textVertexArrayObject&&(this.textVertexArrayObject.dispose(),this.textVertexArrayObject=null);this.textDDVertexArrayObject&&(this.textDDVertexArrayObject.dispose(),this.textDDVertexArrayObject=null);this._symbolUpdateData=null;return!0};g.pool=new u(g);return g}(y)});