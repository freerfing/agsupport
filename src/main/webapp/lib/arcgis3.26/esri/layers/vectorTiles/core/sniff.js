// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/sniff",["require","exports","dojo/sniff","./global","../views/webgl/context-util"],function(l,m,a,d,f){function h(){var c={available:!1,version:0,majorPerformanceCaveat:!1,supportsHighPrecisionFragment:!1,supportsVertexShaderSamplers:!1,supportsElementIndexUint:!1,supportsStandardDerivatives:!1},b=document.createElement("canvas");if(!b)return c;var a=f.createContext(b,{failIfMajorPerformanceCaveat:!0},"webgl");!a&&(a=f.createContext(b,{},"webgl"))&&(c.majorPerformanceCaveat=
!0);if(!a)return c;b=a.getParameter(a.VERSION);if(!b)return c;if(b=b.match(/^WebGL\s+([\d.]*)/))c.version=parseFloat(b[1]),c.available=.94<=c.version,b=a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT),c.supportsHighPrecisionFragment=b&&0<b.precision,c.supportsVertexShaderSamplers=0<a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),c.supportsElementIndexUint=null!==a.getExtension("OES_element_index_uint"),c.supportsStandardDerivatives=null!==a.getExtension("OES_standard_derivatives");return c}
function k(){var a={available:!1,version:0},b=document.createElement("canvas");if(!b)return a;b=f.createContext(b,{},"webgl2");if(!b)return a;a.available=!0;b=b.getParameter(b.VERSION);if(!b)return a;if(b=b.match(/^WebGL\s+([\d.]*)/))a.version=parseFloat(b[1]);return a}(function(){var c=navigator.userAgent,b=c.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i),c=c.match(/iPhone/i);b&&a.add("esri-mobile",b);c&&a.add("esri-iPhone",c);a.add("esri-phonegap",!!d.cordova);a.add("esri-cors",
a("esri-phonegap")||"XMLHttpRequest"in d&&"withCredentials"in new XMLHttpRequest);a.add("esri-geolocation",function(){return!!navigator.geolocation});a.add("esri-canvas-svg-support",function(){return!(a("trident")||a("ie"))});a.add("esri-secure-context",function(){if("isSecureContext"in d)return d.isSecureContext;if(d.location&&d.location.origin)return 0===d.location.origin.indexOf("https:")});a.add("esri-wasm","WebAssembly"in d);a("host-webworker")||(a.add("esri-workers","Worker"in d),a.add("esri-script-sandbox",
function(){return"MessageChannel"in d&&"HTMLIFrameElement"in d&&"sandbox"in HTMLIFrameElement.prototype}),a.add("esri-url-encodes-apostrophe",function(){var a=d.document.createElement("a");a.href="?'";return-1<a.href.indexOf("?%27")}),e||(e=h()),a.add("esri-webgl",e.available),a.add("esri-webgl-high-precision-fragment",e.supportsHighPrecisionFragment),a.add("esri-webgl-vertex-shader-samplers",e.supportsVertexShaderSamplers),a.add("esri-webgl-element-index-uint",e.supportsElementIndexUint),a.add("esri-webgl-standard-derivatives",
e.supportsStandardDerivatives),a.add("esri-webgl-major-performance-caveat",e.majorPerformanceCaveat),a.add("esri-featurelayer-webgl-labeling",!0),g||(g=k()),a.add("esri-webgl2",g.available))})();var e=null,g=null;return a});