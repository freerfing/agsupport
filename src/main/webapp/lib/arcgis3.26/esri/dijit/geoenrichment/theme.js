// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/theme","require dojo/_base/declare dojo/_base/lang dojo/Evented dojo/dom-class dojo/Deferred ../../extend".split(" "),function(g,d,k,l,f,m,n){function h(c,b){for(var a in b)if(b.hasOwnProperty(a))try{c[a]=b[a].constructor==Object?h(c[a],b[a]):b[a]}catch(p){c[a]=b[a]}return c}var e="common";d=new (d([l],{set:function(c,b){this.change(c,e,b);e=b;this.emit("change")},get:function(){return e},load:function(c){function b(){f&&f.remove();a.resolve(d)}var a=new m,d=null,
f=g.on("error",b);g(["./themes/common/"+c],function(a){d=k.clone(a);e&&"common"!=e?g(["./themes/"+e+"/"+c],function(a){h(d,a);b()}):b()});return a.promise},change:function(c,b,a){b&&"common"!=b&&f.remove(c,b);a&&"common"!=a&&f.add(c,a)}}));n("esri.dijit.geoenrichment.theme",d);return d});