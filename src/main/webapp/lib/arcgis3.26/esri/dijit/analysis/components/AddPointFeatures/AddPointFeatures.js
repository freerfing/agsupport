// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/analysis/components/AddPointFeatures/AddPointFeatures.html":"\x3cdiv\x3e\r\n  \x3cdiv data-dojo-type\x3d'dijit/form/ToggleButton' data-dojo-attach-point\x3d'_analysisPointDrawBtn' class\x3d'esriFloatLeading esriActionButton'\r\n    data-dojo-props\x3d\"showLabel: false, iconClass: 'toolbarIcon esriPointIcon ', label: '${label} '\" data-dojo-attach-event\x3d'onChange:_handleInputDrawPointChange'\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e"}});
define("esri/dijit/analysis/components/AddPointFeatures/AddPointFeatures","../../../../kernel ../../../../lang ../../../../toolbars/draw ../../utils ../../../../layers/FeatureLayer ../../../../symbols/PictureMarkerSymbol ../../../../graphic dijit/form/ToggleButton dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/dom-attr dojo/dom-class dojo/dom-style dojo/dom-construct dojo/has dojo/on dojo/Evented dojo/_base/connect dojo/text!./AddPointFeatures.html".split(" "),
function(f,c,d,g,h,k,l,v,m,n,p,w,q,b,x,y,z,A,r,B,t,e,u){c=q([m,n,p,t],{declaredClass:"esri.dijit.analysis.components.AddPointFeatures.AddPointFeatures",templateString:u,label:"",layerName:"default layer name",map:{},iconUrl:"http://static.arcgis.com/images/Symbols/Basic/GreenStickpin.png",pointFeatureLayer:null,isFirst:!0,postMixInProperties:function(){this.inherited(arguments)},postCreate:function(){this.inherited(arguments)},startup:function(){},_handleInputDrawPointChange:function(a){a?(this.emit("drawtool-activate",
{}),this.pointFeatureLayer||this._createPointFeatColl(),this._pointtoolbar.activate(d.POINT)):this.deactivate()},_createPointFeatColl:function(){var a=g.createPointFeatureCollection(this.layerName);this.pointFeatureLayer=new h(a,{id:this.layerName});this.pointFeatureLayer.drawnLayer=!0;this.map.addLayer(this.pointFeatureLayer);e.connect(this.pointFeatureLayer,"onClick",b.hitch(this,function(a){this.map.infoWindow.setFeatures([a.graphic])}))},deactivate:function(){this.map.graphics.remove(this.graphic);
this._pointtoolbar.deactivate()},_addPointFeatures:function(a){var c=[],b={},d=(new k({height:24,width:24,contentType:"image/png",type:"esriPMS",url:this.iconUrl})).setOffset(0,12);this.graphic=new l(a,d);this.map.graphics.add(this.graphic);b.description="blayer desc";b.title="blayer";this.graphic.setAttributes(b);c.push(this.graphic);this.pointFeatureLayer.applyEdits(c,null,null);this.emitChange()},reset:function(){this._analysisPointDrawBtn.reset()},emitChange:function(){this.emit("change",this.pointFeatureLayer)},
_setLabelAttr:function(a){this.label=a},_getLabelAttr:function(a){return this.label},_setLayerNameAttr:function(a){this.layerName=a},_getLayerNameAttr:function(a){return this.layerName},_setIconUrlAttr:function(a){this.iconUrl=a},_getIconUrlAttr:function(a){return this.iconUrl},_setMapAttr:function(a){this.map=a;this._pointtoolbar=new d(this.map);e.connect(this._pointtoolbar,"onDrawEnd",b.hitch(this,this._addPointFeatures))},_getMapAttr:function(){return this.map},_setPointFeatureLayerAttr:function(a){this.pointFeatureLayer=
a},_getPointFeatureLayerAttr:function(){return this.pointFeatureLayer}});r("extend-esri")&&b.setObject("dijit.analysis.components.AddPointFeatures.AddPointFeatures",c,f);return c});