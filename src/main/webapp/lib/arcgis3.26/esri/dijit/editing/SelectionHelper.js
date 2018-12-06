// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/editing/SelectionHelper","dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/has dojo/DeferredList ../../geometry/Extent ../../geometry/Point ../../geometry/ScreenPoint ../../layers/FeatureLayer ../../tasks/query ../../kernel".split(" "),function(k,g,l,f,q,r,t,u,n,h,p,v){k=k(null,{declaredClass:"esri.dijit.editing.SelectionHelper",constructor:function(a){this._settings=a||{};this._sConnects=[];this._mapServiceCount=0;this._map=this._settings.map;this._tolerance=
this._settings.singleSelectionTolerance;this._initMapServiceInfos(this._settings.layers)},destroy:function(){for(var a in this._sConnects)this._sConnects.hasOwnProperty(a)&&l.disconnect(this._sConnects[a])},selectFeatures:function(a,b,e,d){e===h.SELECTION_NEW&&(this._resetMapServiceInfos(),this.getSelection(a));var c=[];f.forEach(a,function(a){if(!0===a.visible&&!0===a._isMapAtVisibleScale()){var d=e;a._isSelOnly&&d===h.SELECTION_NEW&&(d=h.SELECTION_ADD);c.push(a.selectFeatures(b,d))}});(new r(c)).addCallback(g.hitch(this,
function(b){var c=[];f.forEach(b,function(b,e){f.forEach(b[1],function(b){(b=a[e]._mode._getFeature(b.attributes[a[e].objectIdField])||null)&&c.push(b)},this)},this);this._mapServiceCount?((b=e===h.SELECTION_SUBTRACT)?(this._resetMapServiceInfos(),this._createLayerDefs(this._getLayerInfosFromSelection(a))):this._createLayerDefs(this._getLayerInfosFromFeatures(c)),this._updateLayerDefs(this._mapServiceInfos,!1,!(c&&c.length||b),g.hitch(this,d,c))):d(c)}))},selectFeaturesByGeometry:function(a,b,e,d){var c=
b;-1!==b.declaredClass.indexOf("Extent")&&b.xmax===b.xmin&&b.ymax===b.ymin&&(c=new u(b.xmax,b.ymax,b.spatialReference));c=-1!==c.declaredClass.indexOf("Point")?this._extentFromPoint(c):c;b=new p;b.geometry=c;this.selectFeatures(a,b,e,d)},clearSelection:function(a){f.forEach(this._nonSelOnlyLayers,function(b){b.clearSelection&&b.clearSelection()});if(this._mapServiceCount){this._resetMapServiceInfos();var b=this._getLayerInfosFromSelection(this._settings.layers);f.some(b,function(b){return b.oids&&
b.oids.length})&&(this._createLayerDefs(b),this._updateLayerDefs(this._mapServiceInfos,!0,a||!1))}},findMapService:function(a){var b=this._map,e=b.layerIds;a=a&&a._url&&a._url.path?a._url.path.toLowerCase():"";var d,c,f;for(c in e)if(e.hasOwnProperty(c)&&(d=b.getLayer(e[c]),f=d._url?d._url.path?d._url.path.toLowerCase().replace("mapserver","featureserver"):d._url.toLowerCase().replace("mapserver","featureserver"):"",a.substr(0,f.length)===f&&"esri.layers.ArcGISDynamicMapServiceLayer"===d.declaredClass))return d},
getSelection:function(a){var b=[];f.forEach(a,function(a){a._isSelOnly&&b.push(this._createLayerInfo(a))},this);f.forEach(b,function(b){var a=this._createMapServiceInfo(this.findMapService(b.layer));a&&(a.layerInfos[b.layer.layerId]=b)},this)},_initMapServiceInfos:function(a){this._nonSelOnlyLayers=[];this._mapServiceInfos=[];f.forEach(a,function(b){var a=this.findMapService(b);a?(this._mapServiceCount++,this._createMapServiceInfo(a),a&&a.setDisableClientCaching(!0)):this._nonSelOnlyLayers.push(b)},
this)},_createMapServiceInfo:function(a){if(!a)return null;var b=this._mapServiceInfos,e=b[a.id];e||(e=b[a.id]={mapService:a,layerInfos:[],layerDefs:g.mixin([],a.layerDefinitions||[]),origLayerDefs:g.mixin([],a.layerDefinitions||[])});return e},_resetMapServiceInfo:function(a){f.forEach(a.layerInfos,this._resetLayerInfo);a.layerDefs=g.mixin([],a.origLayerDefs||[])},_resetMapServiceInfos:function(){var a=this._mapServiceInfos,b;for(b in a)a.hasOwnProperty(b)&&this._resetMapServiceInfo(a[b])},_createLayerInfo:function(a,
b){var e=a.objectIdField;b=b?[]:a.getSelectedFeatures();return{layer:a,selectedFeatures:b||[],oids:f.map(b,function(b){return b.attributes[e]})}},_resetLayerInfo:function(a){a&&(a.selectedFeatures=[],a.oids=[])},_updateLayerDefs:function(a,b,e,d){for(var c in a)if(a.hasOwnProperty(c)){var f=a[c],m=f.mapService,h=f.layerDefs=b?g.mixin([],f.origLayerDefs||[]):f.layerDefs;h?(e?d&&d():this._sConnects[m.id]=l.connect(m,"onUpdateEnd",g.hitch(this,"_onMapServiceUpdate",f,b,d)),m.setLayerDefinitions(h,e||
!1)):d&&d()}},_onMapServiceUpdate:function(a,b,e){l.disconnect(this._sConnects[a.mapService.id]);f.forEach(a.layerInfos,function(a){if(b)a&&a.layer.clearSelection();else{var c=new p;c.objectIds=a?a.oids:[];c.objectIds.length&&a.layer.selectFeatures(c,h.SELECTION_SUBTRACT)}},this);b&&this._resetMapServiceInfo(a);e&&e()},_createLayerDefs:function(a){f.forEach(a,function(a){var b=a.layer,d=this._createMapServiceInfo(this.findMapService(a.layer));if(d){var d=d.layerDefs,c=b.layerId,g='("'+b.objectIdField+
'" NOT IN (',h=a.oids;h&&h.length&&(f.forEach(a.oids,function(a,b){h=!0;b&&(g+=",");g+="'"+a+"'"}),g+="))",d[c]=d.length&&d[c]&&d[c].length?d[c]+(" AND"+g):g)}},this)},_getLayerInfosFromFeatures:function(a){var b=[];f.forEach(a,function(a){var c=a.getLayer();c&&c._isSelOnly&&(b[c.id]||(b[c.id]=this._createLayerInfo(c,!0)),b[c.id].selectedFeatures.push(a),b[c.id].oids.push(a.attributes[c.objectIdField]))},this);a=[];for(var e in b)b.hasOwnProperty(e)&&a.push(b[e]);return a},_getLayerInfosFromSelection:function(a){var b=
[];f.forEach(a,function(a){a._isSelOnly&&b.push(this._createLayerInfo(a,!1))},this);return b},_extentFromPoint:function(a){var b=this._tolerance,e=this._map,d=e.toScreen(a);a=new n(d.x-b,d.y+b);b=new n(d.x+b,d.y-b);a=e.toMap(a);b=e.toMap(b);return new t(a.x,a.y,b.x,b.y,e.spatialReference)}});q("extend-esri")&&g.setObject("dijit.editing.SelectionHelper",k,v);return k});