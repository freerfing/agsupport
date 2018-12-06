// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/renderers/SDFRenderer","require exports dojo/has ../../../core/libs/gl-matrix/mat4 ../../../core/libs/gl-matrix/vec3 ../../../core/libs/gl-matrix/vec4 ../GeometryUtils ./rendererUtils ./vtShaderSnippets ../../webgl/ShaderVariations ../../webgl/VertexArrayObject".split(" "),function(J,K,F,m,t,x,C,G,y,H,u){var I=1/65536;return function(){function a(){this._attributeLocations={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3};this._attributeLocationsDD=
{a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3,a_color:4,a_size:5};this._initialized=!1;this._viewProjMat=m.create();this._offsetVector=t.create();this._extrudeMat=m.create();this._haloColor=x.create();this._sdfColor=x.create();this._scaleVec=t.create()}a.prototype.dispose=function(){};a.prototype.render=function(l,d,c,h,a,k,q,f,z,v,A,B,t){var n=this;if(!F("esri-vector-tiles-avoid-text")){this._initialized||this._initialize(l);var x=C.degToByte(a),w=f.getLayoutValue("text-rotation-alignment",c);
2===w&&(w=1===f.getLayoutValue("symbol-placement",c)?0:1);var u=0===w,w=f.getLayoutValue("text-keep-upright",c)&&u;h=3===h;B=.8*3/B;var y=f.hasDataDrivenTextSize?1:f.getLayoutValue("text-size",c),g=f.hasDataDrivenTextColor?[1,1,1,1]:f.getPaintValue("text-color",c),D=f.hasDataDrivenTextOpacity?1:f.getPaintValue("text-opacity",c),e=g[3]*D*t;this._sdfColor[0]=e*g[0];this._sdfColor[1]=e*g[1];this._sdfColor[2]=e*g[2];this._sdfColor[3]=e;this._glyphTextureSize||(this._glyphTextureSize=new Float32Array([z.width/
4,z.height/4]));g=q.tileTransform.transform;e=f.getPaintValue("text-translate",c);if(0!==e[0]||0!==e[1]){m.copy(this._viewProjMat,q.tileTransform.transform);var g=e[0],e=e[1],r=0,p=0,p=(1<<q.key.level)/Math.pow(2,c)*(q.coordRange/512);if(1===f.getPaintValue("text-translate-anchor",c)){r=-C.C_DEG_TO_RAD*a;a=Math.sin(r);var E=Math.cos(r),r=p*(g*E-e*a),p=p*(g*a+e*E)}else r=p*g,p*=e;this._offsetVector[0]=r;this._offsetVector[1]=p;this._offsetVector[2]=0;m.translate(this._viewProjMat,this._viewProjMat,
this._offsetVector);g=this._viewProjMat}u?m.copy(this._extrudeMat,v):m.copy(this._extrudeMat,A);this._scaleVec[0]=1/24;this._scaleVec[1]=1/24;this._scaleVec[2]=1;m.scale(this._extrudeMat,this._extrudeMat,this._scaleVec);v=f.hasDataDrivenText;if(A=this._getSDFVAO(l,q,v)){l.bindVAO(A);var b=this._shaderVariations.getProgram([v,h],void 0,void 0,v?this._attributeLocationsDD:this._attributeLocations);l.bindProgram(b);b.setUniformMatrix4fv("u_transformMatrix",g);b.setUniformMatrix4fv("u_extrudeMatrix",
this._extrudeMat);b.setUniform2fv("u_normalized_origin",q.tileTransform.displayCoord);b.setUniform1f("u_depth",f.z+I);b.setUniform2fv("u_mosaicSize",this._glyphTextureSize);b.setUniform1f("u_mapRotation",x);b.setUniform1f("u_keepUpright",w?1:0);b.setUniform1f("u_level",10*c);b.setUniform1f("u_fadeSpeed",10*k.fadeSpeed);b.setUniform1f("u_minfadeLevel",10*k.minfadeLevel);b.setUniform1f("u_maxfadeLevel",10*k.maxfadeLevel);b.setUniform1f("u_fadeChange",10*(c+k.fadeChange));b.setUniform1i("u_texture",
0);b.setUniform1f("u_size",y);b.setUniform1f("u_antialiasingWidth",B);h&&(k=G.int32To4Bytes(d.layerID),b.setUniform4f("u_id",k[0],k[1],k[2],k[3]));d.glyphPerPageElementsMap.forEach(function(d,e){z.bind(l,9729,e,0);var a=f.getPaintValue("text-halo-color",c);e=f.getPaintValue("text-halo-width",c);if(0<a[3]&&0<e){var g=a[3]*D*t;n._haloColor[0]=g*a[0];n._haloColor[1]=g*a[1];n._haloColor[2]=g*a[2];n._haloColor[3]=g;a=3*f.getPaintValue("text-halo-blur",c);e*=3;b.setUniform4fv("u_color",n._haloColor);b.setUniform1f("u_halo",
1);b.setUniform1f("u_edgeDistance",e);b.setUniform1f("u_edgeBlur",a);l.drawElements(4,d[1],5125,12*d[0])}0<n._sdfColor[3]&&(b.setUniform4fv("u_color",n._sdfColor),b.setUniform1f("u_halo",0),b.setUniform1f("u_edgeDistance",0),b.setUniform1f("u_edgeBlur",0),l.drawElements(4,d[1],5125,12*d[0]))});l.bindVAO()}}};a.prototype._initialize=function(a){if(this._initialized)return!0;a=new H("text",["textVS","textFS"],[],y,a);a.addDefine("DD","DD",[!0,!1],"DD");a.addDefine("ID","ID",[!0,!0],"ID");this._shaderVariations=
a;this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]};this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,
type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}]};return this._initialized=!0};a.prototype._getSDFVAO=function(a,d,c){if(c){if(d.textDDVertexArrayObject)return d.textDDVertexArrayObject;
c=d.textDDVertexBuffer;var h=d.textIndexBuffer;if(!c||!h)return null;d.textDDVertexArrayObject=new u(a,this._attributeLocationsDD,this._vertexAttributesDD,{geometry:c},h);return d.textDDVertexArrayObject}if(d.textVertexArrayObject)return d.textVertexArrayObject;c=d.textVertexBuffer;h=d.textIndexBuffer;if(!c||!h)return null;d.textVertexArrayObject=new u(a,this._attributeLocations,this._vertexAttributes,{geometry:c},h);return d.textVertexArrayObject};return a}()});