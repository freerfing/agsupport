// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/renderers/ScaleDependentRenderer","dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/has ../kernel ../lang ./Renderer".split(" "),function(c,n,l,p,q,m,r){c=c(r,{declaredClass:"esri.renderer.ScaleDependentRenderer",constructor:function(a){this.setRendererInfos(a&&a.rendererInfos||[])},setRendererInfos:function(a){this.rendererInfos=a;this._setRangeType();return this},getSymbol:function(a){var b=this.getRendererInfo(a);return b&&b.renderer&&b.renderer.getSymbol(a)},getRendererInfo:function(a){a=
a.getLayer().getMap();return"zoom"===this.rangeType?this.getRendererInfoByZoom(a.getZoom()):this.getRendererInfoByScale(a.getScale())},getRendererInfoByZoom:function(a){var b,d=this.rendererInfos,f,e=0;do b=d[e],a>=b.minZoom&&a<=b.maxZoom&&(f=b),e++;while(!f&&e<d.length);return f},getRendererInfoByScale:function(a){var b,d=this.rendererInfos,f,e=0,k,g,c,h;do b=d[e],k=b.minScale,g=b.maxScale,c=!k,h=!g,!c&&a<=k&&(c=!0),!h&&a>=g&&(h=!0),c&&h&&(f=b),e++;while(!f&&e<d.length);return f},addRendererInfo:function(a){var b,
d=0,f,e=this.rendererInfos,c=a.hasOwnProperty("minZoom")?"minZoom":"minScale",g=e.length;do{f=e[d];if(g===d||a[c]<f[c])e.splice(d,0,a),this._setRangeType(),b=!0;d++}while(!b&&d<g);return this},_setRangeType:function(){var a=this.rendererInfos;if(a=a&&a[0])this.rangeType=a.hasOwnProperty("minZoom")?"zoom":a.hasOwnProperty("minScale")?"scale":""},toJson:function(){if("zoom"===this.rangeType)return null;var a=this.rendererInfos||[],b=a[0]&&a[0].minScale,a=l.mixin(this.inherited(arguments),{type:"scaleDependent",
minScale:0<b?b:0,rendererInfos:n.map(a,function(a){return m.fixJson({maxScale:0<a.maxScale?a.maxScale:0,renderer:a.renderer&&a.renderer.toJson()})})});return m.fixJson(a)}});p("extend-esri")&&l.setObject("renderer.ScaleDependentRenderer",c,q);return c});