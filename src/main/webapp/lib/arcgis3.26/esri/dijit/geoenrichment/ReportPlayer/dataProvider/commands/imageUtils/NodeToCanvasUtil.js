// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProvider/commands/imageUtils/NodeToCanvasUtil",["dojo/Deferred","dojo/when","dojo/dom-construct","esri/dijit/geoenrichment/utils/SVGUtil","../createHTML/CSSFilesLoader"],function(m,n,c,p,q){return{svgNodeToCanvasFunc:function(d,e,f){return n(q.loadCssFontFiles(),function(g){var b=document.createElement("canvas");b.width=e;b.height=f;g.forEach(function(a){var b=document.createElementNS("http://www.w3.org/2000/svg","defs"),c=document.createElementNS("http://www.w3.org/2000/svg",
"style");c.innerHTML=a;b.appendChild(c);d.insertBefore(b,d.firstElementChild)});var k=window.URL||window.webkitURL||window,a=new Image;a.width=e;a.height=f;g=new Blob([p.getOuterHTML(d)],{type:"image/svg+xml"});var l=k.createObjectURL(g),h=new m;a.onload=function(){b.getContext("2d").drawImage(a,0,0,e,f);k.revokeObjectURL(l);c.destroy(a);h.resolve(b)};a.onerror=function(b){c.destroy(a);h.reject(b)};c.place(a,document.body);a.src=l;return h.promise})}}});