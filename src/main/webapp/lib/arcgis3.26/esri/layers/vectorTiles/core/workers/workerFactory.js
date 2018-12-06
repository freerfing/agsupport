// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/workers/workerFactory","require exports ../tsSupport/assignHelper dojo/_base/kernel ../../config ../../request ../Logger ../promiseUtils ../sniff ../urlUtils ./loaderConfig ./utils ./WorkerFallback".split(" "),function(x,u,h,y,e,z,A,B,n,v,w,k,c){function p(a){return B.create(function(f){function l(g){if(g=k.receiveMessage(g))switch(g.type){case C:g=a;var c=e.workers.loaderUrl||w.DEFAULT_LOADER_URL,d;null!=e["default"]?(d=h({},e),delete d["default"],d=JSON.parse(JSON.stringify(d))):
d=JSON.parse(JSON.stringify(e));var b=e.workers.loaderConfig,b=w.default({baseUrl:b.baseUrl,locale:y.locale,has:h({"config-deferredInstrumentation":0,"dojo-test-sniff":0,"esri-cors":1,"esri-secure-context":n("esri-secure-context"),"esri-workers-supports-transfer-arraybuffer":n("esri-workers-supports-transfer-arraybuffer"),"events-keypress-typed":0,"host-webworker":1},b.has),map:h({},b.map),paths:h({},b.paths),packages:b.packages||[]});g.postMessage({type:D,configure:{esriConfig:d,loaderUrl:c,loaderConfig:b}});
break;case E:a.removeEventListener("message",l),a.removeEventListener("error",m),f(a)}}function m(f){f.preventDefault();a.removeEventListener("message",l);a.removeEventListener("error",m);q.warn("Failed to create Worker. Fallback to execute module in main thread",f);a=new c;a.addEventListener("message",l);a.addEventListener("error",m)}a.addEventListener("message",l);a.addEventListener("error",m)})}Object.defineProperty(u,"__esModule",{value:!0});var r=v.normalize(x.toUrl("./worker.js")),F=!v.hasSameOrigin(r,
location.href),q=A.getLogger("esri.core.workers"),t=null,E=k.MessageType.CONFIGURED,D=k.MessageType.CONFIGURE,C=k.MessageType.HANDSHAKE;u.createWorker=function(){if(!n("esri-workers"))return p(new c);if(!F){var a=void 0;try{a=new Worker(r)}catch(f){q.warn("Failed to create Worker. Fallback to execute module in main thread",event),a=new c}return p(a)}t||(t=z(r,{responseType:"text"}));return t.then(function(a){return new Worker(URL.createObjectURL(new Blob([a.data],{type:"text/javascript"})))}).catch(function(a){q.warn("Failed to create Worker. Fallback to execute module in main thread",
a);return new c}).then(function(a){return p(a)})}});