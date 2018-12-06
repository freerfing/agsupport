// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/form/tools/templates/GeoExtent.html":'\x3cdiv class\x3d"gxeGeoExtent"\x3e\r\n\r\n  \x3cdiv class\x3d"gxeTop" data-dojo-attach-point\x3d"topNode"\x3e\r\n    \x3cdiv class\x3d"gxeLeft gxeFloatLeft"\x3e\r\n      \x3cdiv class\x3d"gxeTabButton current" \r\n        data-dojo-attach-point\x3d"drawButton"\r\n        data-dojo-attach-event\x3d"onclick: _onDrawClick"\r\n        \x3e${i18nBase.geoExtent.draw}\r\n      \x3c/div\x3e\x3cdiv class\x3d"gxeTabButton" \r\n        data-dojo-attach-point\x3d"navigateButton"\r\n        data-dojo-attach-event\x3d"onclick: _onNavigateClick"\r\n        \x3e${i18nBase.geoExtent.navigate}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"gxeRight gxeFloatRight"\x3e\r\n      \x3cdiv class\x3d"gxeGeocoder" id\x3d"${id}_geocoder"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"gxeClear"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \r\n  \x3cdiv class\x3d"gxeMap" id\x3d"${id}_map" data-dojo-attach-point\x3d"mapNode"\x3e\x3c/div\x3e\r\n  \r\n  \x3cdiv class\x3d"gxeDialogActionBar" data-dojo-attach-point\x3d"bottomNode"\x3e\r\n    \x3cdiv class\x3d"gxeLeft gxeFloatLeft"\x3e\r\n      \x3cspan class\x3d"gxeMessage" data-dojo-attach-point\x3d"drawHint"\r\n        \x3e${i18nBase.geoExtent.drawHint}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"gxeRight gxeFloatRight gxeButtons"\x3e\r\n      \x3cbutton class\x3d"gxeButton prominent" data-dojo-attach-point\x3d"okButton"\r\n        data-dojo-attach-event\x3d"onclick: _onOkClick"\x3e${i18nBase.general.ok}\x3c/button\x3e\r\n      \x3cbutton class\x3d"gxeButton" data-dojo-attach-point\x3d"cancelButton"\r\n        data-dojo-attach-event\x3d"onclick: _onCancelClick"\x3e${i18nBase.general.cancel}\x3c/button\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"gxeClear"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n   \r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/form/tools/GeoExtent","dojo/_base/declare dojo/_base/lang dojo/_base/fx dojo/dom-class dojo/dom-geometry dojo/dom-style dojo/has dojo/window ./geoExtentUtil ../../base/Templated dojo/text!./templates/GeoExtent.html dojo/i18n!../../nls/i18nBase ../../../../map ../../../../dijit/Geocoder ../../../../toolbars/draw ../../../../geometry/Extent ../../../../geometry/webMercatorUtils ../../../../layers/ArcGISTiledMapServiceLayer ../../../../layers/ImageParameters ../../../../kernel".split(" "),
function(g,h,p,d,k,l,q,r,m,t,u,v,w,x,y,z,n,A,B,C){g=g([t],{_drawnExtent:null,_drawtb:null,_fitExtent:!1,_geocoder:null,_initialExtent:null,_map:null,dialogBroker:null,gxeDocument:null,i18nBase:v,templateString:u,basemap:"streets",wrapAround180:!1,xmin:null,ymin:null,xmax:null,ymax:null,postCreate:function(){this.inherited(arguments);this.okButton.disabled=!0;l.set(this.mapNode,"opacity",0)},destroyRecursive:function(){this._geocoder&&this._geocoder.destroyRecursive(!1);this._map&&this._map.destroy();
this.inherited(arguments)},initialize:function(){if(this.gxeDocument&&this.gxeDocument.gxeContext){this._initialExtent=m.makeGeographicExtent(this.xmin,this.ymin,this.xmax,this.ymax);var a=this.gxeDocument.gxeContext,b=this.id+"_map",c={autoResize:!1,wrapAround180:!1,slider:!0,logo:!0,showAttribution:!0};a.wrapAround180&&(c.wrapAround180=a.wrapAround180);a.showMapLogo||(c.logo=!1);a.showMapAttribution||(c.showAttribution=!1);a.basemapUrl||(c.basemap=a.basemap?a.basemap:"streets");var f=this._map=
new w(b,c);a.basemapUrl&&(b=new B,b.format="png24",b=new A(a.basemapUrl,{imageParameters:b}),f.addLayer(b));b=this.id+"_geocoder";c={map:f};null!==a.arcgisGeocoder&&(c.arcgisGeocoder=a.arcgisGeocoder);a.geocoders&&(c.geocoders=a.geocoders);this._geocoder=new x(c,b);this._geocoder.startup();this.own(f.on("load",h.hitch(this,function(){var a=null;this._initialExtent?(a=this._asWebMercatorExtent(this._initialExtent,!0),f.setExtent(a,this._fitExtent).then(h.hitch(this,function(){this._addGraphic(this._asWebMercatorExtent(this._initialExtent,
!1));this._fadeIn()}))):this._fadeIn();this._drawtb=new y(f,{showTooltips:!1});this._onDrawClick();this.own(this._drawtb.on("draw-end",h.hitch(this,function(a){a.geometry&&(this._drawnExtent=new z(a.geometry.toJson()),this._addGraphic(a.geometry),this.okButton.disabled=!1)})))})))}},_addGraphic:function(a){this._map&&a&&m.addGraphic(this._map,a,!0)},_asGeographicExtent:function(a){return n.webMercatorToGeographic(a)},_asWebMercatorExtent:function(a,b){b&&-170<=a.xmin&&170>=a.xmax&&-80<=a.ymin&&80>=
a.ymax&&(a=a.expand(1.05),this._fitExtent=!0);return n.geographicToWebMercator(a)},_fadeIn:function(){p.fadeIn({node:this.mapNode,onEnd:function(){}}).play()},_onCancelClick:function(a){this.onCancelClick(a)},onCancelClick:function(a){},_onDrawClick:function(a){this._map&&this._drawtb&&(d.remove(this.navigateButton,"current"),d.add(this.drawButton,"current"),d.remove(this.drawHint,"gxeDisplayNone"),this._drawtb.deactivate(),this._drawtb.activate("extent"),this._map.disableMapNavigation(),this._map.hideZoomSlider())},
_onNavigateClick:function(a){this._map&&this._drawtb&&(d.remove(this.drawButton,"current"),d.add(this.navigateButton,"current"),d.add(this.drawHint,"gxeDisplayNone"),this._drawtb.deactivate(),this._map.enableMapNavigation(),this._map.showZoomSlider())},_onOkClick:function(a){a=null;this._drawnExtent&&(a=this._asGeographicExtent(this._drawnExtent));this.onOkClick(a)},onOkClick:function(a){},resize:function(){if(this.dialogBroker){var a=r.getBox(this.ownerDocument),b=k.getMarginBox(this.domNode),c=
k.getMarginBox(this.topNode),f=k.getMarginBox(this.bottomNode),e=b.l,d=a.w-100,a=a.h-b.t-e-50-80-(c.h+f.h);50>a&&(a=50);e=d-2*e;450>e&&(e=450);1E3<e&&(e=1E3);l.set(this.mapNode,"width",e+"px");l.set(this.mapNode,"height",a+"px");this._map&&(this._map.resize(),this._map.reposition())}}});q("extend-esri")&&h.setObject("dijit.metadata.form.tools.GeoExtent",g,C);return g});