// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/geometry/Circle","dojo/_base/declare dojo/_base/lang dojo/has ../kernel ./Point ./Polygon ./geodesicUtils ./webMercatorUtils ../WKIDUnitConversion ../units".split(" "),function(c,m,p,q,r,k,t,n,h,u){c=c(k,{declaredClass:"esri.geometry.Circle",_unitToMeters:{esriCentimeters:.01,esriDecimeters:.1,esriFeet:.3048,esriInches:.0254,esriKilometers:1E3,esriMeters:1,esriMiles:1609.344,esriMillimeters:.001,esriNauticalMiles:1852,esriYards:.9144,esriDecimalDegrees:111320},constructor:function(b,
a){b.center?a=b:(a=a||{},a.center=b);this.center=m.isArray(a.center)?new r(a.center[0],a.center[1]):a.center;this.radius=a.radius||1E3;this.radiusUnit=a.radiusUnit||u.METERS;this.geodesic=!0===a.geodesic?!0:!1;this.numberOfPoints=a.numberOfPoints||60;this._init()},toJson:function(){return this.inherited(arguments)},_init:function(){this.rings=[];this._ring=0;var b=this.radius*this._unitToMeters[this.radiusUnit],a=this._srType(this.center.spatialReference);if(this.geodesic){var e;switch(a){case "webMercator":e=
n.webMercatorToGeographic(this.center);break;case "projected":console.error("Creating a geodesic circle requires the center to be specified in web mercator or geographic coordinate system");break;case "geographic":e=this.center}b=this._createGeodesicCircle(e,b,this.numberOfPoints,e.spatialReference);"webMercator"===a&&(b=n.geographicToWebMercator(b))}else{var d;"webMercator"===a||"projected"===a?d=b/this._convert2Meters(1,this.center.spatialReference):"geographic"===a&&(d=b/this._unitToMeters.esriDecimalDegrees);
b=this._createPlanarCircle(this.center,d,this.numberOfPoints)}this.spatialReference=b.spatialReference;this.addRing(b.rings[0]);this.verifySR()},_createGeodesicCircle:function(b,a,e,d){for(var l=0,g=Math.PI/180,f=[],c;l<2*Math.PI;)c=t._directGeodeticSolver(b.y*g,b.x*g,l,a,d),f.push([c.x,c.y]),l+=Math.PI/(e/2);f.push(f[0]);return new k(f)},_createPlanarCircle:function(b,a,e){for(var d=0,c=[],g,f;d<2*Math.PI;)g=b.x+Math.cos(d)*a,f=b.y+Math.sin(d)*a,c.push([g,f]),d+=Math.PI/(e/2);c.push(c[0]);b=new k(b.spatialReference);
b.addRing(c);return b},_srType:function(b){return b.isWebMercator()?"webMercator":null!=h[b.wkid]||b.wkt&&0===b.wkt.indexOf("PROJCS")?"projected":"geographic"},_convert2Meters:function(b,a){if(null!=h[a.wkid])a=h.values[h[a.wkid]];else{a=a.wkt;var c=a.lastIndexOf(",")+1,d=a.lastIndexOf("]]");a=parseFloat(a.substring(c,d))}return b*a}});p("extend-esri")&&m.setObject("geometry.Circle",c,q);return c});