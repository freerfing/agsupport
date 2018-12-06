// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/webgl/brushes/WGLBrushInfo","require exports ../../../../../core/tsSupport/extendsHelper ../GeometryUtils ./WGLBrush ../shaders/glShaderSnippets ../../../tiling/enums ../../../../webgl/BufferObject ../../../../webgl/Program ../../../../webgl/Texture ../../../../webgl/VertexArrayObject".split(" "),function(b,h,n,p,q,g,r,k,l,t,m){Object.defineProperty(h,"__esModule",{value:!0});b=function(b){function d(){var a=b.call(this)||this;a._initialized=!1;a._maxWidth=
0;a._color=new Float32Array([1,0,0,1]);return a}n(d,b);d.prototype.dispose=function(){this._outlineProgram&&(this._outlineProgram.dispose(),this._outlineProgram=null);this._tileInfoProgram&&(this._tileInfoProgram.dispose(),this._tileInfoProgram=null);this._outlineVertexArrayObject&&(this._outlineVertexArrayObject.dispose(),this._outlineVertexArrayObject=null);this._tileInfoVertexArrayObject&&(this._tileInfoVertexArrayObject.dispose(),this._tileInfoVertexArrayObject=null);this._canvas=null};d.prototype.draw=
function(a,c){a=a.context;if(c.status!==r.TileStatus.INITIALIZED){this._initialized||this._initialize(a);a.bindVAO(this._outlineVertexArrayObject);a.bindProgram(this._outlineProgram);this._outlineProgram.setUniformMatrix4fv("u_transformMatrix",c.tileTransform.transform);this._outlineProgram.setUniform2fv("u_normalized_origin",c.tileTransform.displayCoord);this._outlineProgram.setUniform1f("u_coord_range",512);this._outlineProgram.setUniform1f("u_depth",0);this._outlineProgram.setUniform4fv("u_color",
this._color);a.setLineWidth(2);a.drawArrays(3,0,4);a.bindVAO();var f=this._getTexture(a,c);f&&(a.bindVAO(this._tileInfoVertexArrayObject),a.bindProgram(this._tileInfoProgram),a.bindTexture(f,0),this._tileInfoProgram.setUniformMatrix4fv("u_transformMatrix",c.tileTransform.transform),this._tileInfoProgram.setUniform2fv("u_normalized_origin",c.tileTransform.displayCoord),this._tileInfoProgram.setUniform1f("u_depth",0),this._tileInfoProgram.setUniform1f("u_coord_ratio",1),this._tileInfoProgram.setUniform2f("u_delta",
8,8),this._tileInfoProgram.setUniform2f("u_dimensions",f.descriptor.width,f.descriptor.height),a.drawArrays(5,0,4),a.bindVAO())}};d.prototype._initialize=function(a){if(this._initialized)return!0;var c={a_pos:0},f=new l(a,g.backgroundVS,g.backgroundFS,c),u=new l(a,g.tileInfoVS,g.tileInfoFS,c),e={geometry:[{name:"a_pos",count:2,type:5120,offset:0,stride:2,normalized:!1,divisor:0}]},d=new Int8Array([0,0,1,0,1,1,0,1]),d=k.createVertex(a,35044,d),d=new m(a,c,e,{geometry:d}),b=new Int8Array([0,0,1,0,0,
1,1,1]),b=k.createVertex(a,35044,b);a=new m(a,c,e,{geometry:b});this._outlineProgram=f;this._tileInfoProgram=u;this._outlineVertexArrayObject=d;this._tileInfoVertexArrayObject=a;return this._initialized=!0};d.prototype._getTexture=function(a,c){if(c.texture)return c.texture;this._canvas||(this._canvas=document.createElement("canvas"),this._canvas.setAttribute("id","canvas2d"),this._canvas.setAttribute("width","256"),this._canvas.setAttribute("height","32"),this._canvas.setAttribute("style","display:none"));
var d=c.key.id,b=this._canvas.getContext("2d");b.font="24px sans-serif";b.textAlign="left";b.textBaseline="middle";var e=b.measureText(d),e=Math.pow(2,Math.ceil(p.log2(e.width+2)));e>this._maxWidth&&(this._maxWidth=e);b.clearRect(0,0,this._maxWidth,32);b.fillStyle="blue";b.fillText(d,0,16);c.texture=new t(a,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728},this._canvas);return c.texture};return d}(q.default);h.default=b});