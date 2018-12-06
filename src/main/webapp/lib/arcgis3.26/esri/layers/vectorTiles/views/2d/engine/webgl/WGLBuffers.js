// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/webgl/WGLBuffers",["require","exports","./Utils","../../../webgl/BufferObject"],function(g,h,k,l){Object.defineProperty(h,"__esModule",{value:!0});g=function(){function d(b,a){this.geometryMap=k.createGeometryData(a,function(a){return{indexBuffer:l.createIndex(b,35044),vao:null}},function(a,f){return{vertexBuffer:l.createVertex(b,k.C_VBO_INFO[f])}})}d.prototype.dispose=function(){for(var b in this.geometryMap){var a=this.geometryMap[b];a.data.vao&&a.data.vao.dispose(!1);
a.data.indexBuffer&&a.data.indexBuffer.dispose();for(var c in a.buffers)a.buffers[c]&&a.buffers[c].data.vertexBuffer.dispose()}};d.prototype.get=function(b){var a=this.geometryMap[b];b={};for(var c in a.buffers)b[c]=a.buffers[c].data.vertexBuffer;return{indexBuffer:a.data.indexBuffer,get vao(){return a.data.vao},set vao(b){a.data.vao=b},vertexBufferMap:b}};d.prototype.has=function(b){return null!=this.geometryMap[b]};d.prototype.upload=function(b,a){var c=this;a.forEach(function(a,e){a.indices&&(a.indices.allDirty?
c._uploadIndices(b,e):null!=a.indices.from&&null!=a.indices.count&&c._uploadIndices(b,e,a.indices.from,a.indices.count));a.vertices&&a.vertices.forEach(function(a,f){a.allDirty?c._uploadVertices(b,e,f):null!=a.from&&null!=a.count&&c._uploadVertices(b,e,f,a.from,a.count)})})};d.prototype._uploadVertices=function(b,a,c,f,e){var d=this.geometryMap[a];d&&(a=b.geometries[a].vertexBuffer[c])&&(b=a.stride,a=a.data.buffer,d.buffers[c]&&0<a.byteLength&&(null!=f&&null!=e?d.buffers[c].data.vertexBuffer.setSubData(a,
f*b,f*b,(f+e)*b):d.buffers[c].data.vertexBuffer.setData(a)))};d.prototype._uploadIndices=function(b,a,c,d){var e=this.geometryMap[a];e&&(b=b.geometries[a].indexBuffer.buffer,e.data.indexBuffer&&0<b.byteLength&&(null!=c&&null!=d?e.data.indexBuffer.setSubData(b,4*c,4*c,4*(c+d)):e.data.indexBuffer.setData(b)))};return d}();h.default=g});