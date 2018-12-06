// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/BrowseLayerMixin","dojo/_base/declare dojo/_base/lang dojo/has dojo/query ../../kernel ../../request ../../arcgis/Portal ../../SpatialReference ./ProjectExtent dojo/Deferred dojo/i18n!./nls/BrowseLayerMixin".split(" "),function(e,d,m,f,n,p,q,r,t,l,b){e=e([],{allowedItemTypes:["Map Service","Feature Service"],availableItemTypeFilters:["layers","featureLayers","mapImageLayers","imageryLayers","tables"],_createBrowseItems:function(a,c){this.useArcGISComponents?this.setUpItemBrowser(a,
c).then(function(){this._chopExtentAtDateLine(this.map.extent).then(this._projectExtentAndDispatch.bind(this))}.bind(this)):(c=this._browsedlg.browseItems.get("query"),c.custom=this._queryTagsForLivingAtlasBrowseItems(a),this._browsedlg.browseItems.set("extent",this.get("map").extent),this._browsedlg.browseItems.set("query",c),this._browsedlg.show())},setUpItemBrowser:function(a,c){var k=new l;window.require(["arcgis-components/wrappers/ItemBrowser","esri/arcgis/Portal"],function(g,f){if(!this.ib){var h=
document.createElement("div");document.body.appendChild(h);var e=new f.Portal(this.portalSelf&&this.portalSelf.urlKey&&this.portalSelf.customBaseUrl?location.protocol+"//"+this.portalSelf.urlKey+"."+this.portalSelf.customBaseUrl+"/sharing/rest":this.portalUrl+"/sharing/rest");e.signIn().then(function(){this.ib=new g.ItemBrowserWrapper(h,{apiVersion:3,portal:e,request:p,initialState:d.mixin(g.initialState,{settings:d.mixin(g.initialState.settings,{config:d.mixin(g.initialState.settings.config,{dialogTitle:this._getItemBrowserTitle(),
allowedItemTypes:this.allowedItemTypes,availableItemTypeFilters:this.availableItemTypeFilters,baseSections:[],resultsPerQuery:5,layoutMode:"fullscreen",searchPlaceholderText:this._isCustomAnalysisQuery()?b.searchCustomPlaceholderText:b.searchPlaceholderText,staticFilters:this._getStaticFilters(a),onBack:function(){this.ib.itemBrowser.store.dispatch({type:"CLOSE_FULLSCREEN_BROWSER"});c.reset();setTimeout(function(){document.body.removeChild(h)},300);delete this.ib}.bind(this),onSelect:function(a){this.ib.itemBrowser.store.dispatch({type:"CLOSE_FULLSCREEN_BROWSER"});
d.hitch(this,this.onBrowseItemSelect,a[0],e)();setTimeout(function(){document.body.removeChild(h)},300);delete this.ib}.bind(this),mainActionTitle:b.mainActionTitle,customActions:[{allowed:function(){return!0},asynchronous:!1,onAction:function(a){this.ib.itemBrowser.store.dispatch({type:"CLOSE_FULLSCREEN_BROWSER"});d.hitch(this,this.onBrowseItemSelect,a,e,!0)();document.body.removeChild(h);delete this.ib}.bind(this),name:b.customActionName}],customSections:[{name:b.customeSectionName,baseQuery:this._getBaseQuery(a),
filters:[{fetchGroupIdByQuery:this._getAnalysisGroupQuery(),name:b.Categories,type:"group",path:["categories"],staticSchema:this._getStaticSchema()}].concat(this._getFilters()),addToFront:!0}]})}),ui:d.mixin(g.initialState.ui,{expanded:d.mixin(g.initialState.ui.expanded,{filters:!0})})}),parameters:d.mixin(g.initialState.parameters,{section:b.customeSectionName,filter:d.mixin(g.initialState.parameters.filter,{searchMapArea:!0})})});k.resolve()}.bind(this))}}.bind(this));return k},_queryTagsForLivingAtlasItemBrowser:function(a){a=
a.tags;if(!a||0===a.length)return"";f=[];if(1===a.length)return"tags: ("+a[0]+")";f=[];a.forEach(function(a){f.push(a)});return"tags: ("+f.join(" OR ")+")"},_queryTagsForLivingAtlasBrowseItems:function(a){if((a=a.tags)&&0!==a.length){if(1===a.length)return['tags:"'+a[0]+'"'];f=[];a.forEach(function(a){f.push('tags:"'+a+'"')});return f}},onBrowseItemSelect:function(a,c,k){a={selection:new q.PortalItem(d.mixin(a,{portal:c}))};this._handleBrowseItemsSelect(a,k)},_setAllowedItemTypesAttr:function(a){this.allowedItemTypes=
a},_setAvailableItemTypeFiltersAttr:function(a){this.availableItemTypeFilters=a},_getAnalysisGroupQuery:function(){return this._isCustomAnalysisQuery()||this._getDefaultQueryString()},_getDefaultQueryString:function(){var a='title:"Living Atlas Analysis Layers" AND owner:esri';this.isSingleTenant&&(a='title:"Living Atlas Analysis Layers" AND owner:esri_livingatlas');return a},_isCustomAnalysisQuery:function(){return this.portalSelf&&this.portalSelf.analysisLayersGroupQuery&&this.portalSelf.analysisLayersGroupQuery!==
this._getDefaultQueryString()?this.portalSelf.analysisLayersGroupQuery:this._portal&&this._portal.analysisLayersGroupQuery&&this._portal.analysisLayersGroupQuery!==this._getDefaultQueryString()?this._portal.analysisLayersGroupQuery:!1},_getItemBrowserTitle:function(){return this._isCustomAnalysisQuery()?b.customAnalysisLayerTitle:b.defaultAnaysisLayerTitle},_getStaticSchema:function(){if(!this._isCustomAnalysisQuery())return[{title:"categories",categories:[{title:"boundaries and places",categories:[{title:"boundaries",
categories:[],displayName:b.boundaries},{title:"places",categories:[],displayName:b.places}],displayName:b.boundariesAndPlaces},{title:"hexbins",categories:[],displayName:b.hexbins},{title:"transportation",categories:[],displayName:b.transportation}]}]},_getBaseQuery:function(a){var c=this._isCustomAnalysisQuery?['-typekeywords:"Multilayer"']:['typekeywords:"Analysis Ready"'];this._portal&&this._portal.user.demographics||c.push('-typekeywords:"Requires Credits"');c.push('-type:"Attachment" -tags:"mature support"');
c.push(this._queryTagsForLivingAtlasItemBrowser(a));return c.join(" ")},_getFilters:function(){return this.isSingleTenant?"itemType modified created shared status tags".split(" "):["tags"]},_getStaticFilters:function(a){if((a=a.tags)&&0!==a.length){var c=[];a.forEach(function(a){c.push(b[a]?b[a]:a)});return c}},_projectExtentAndDispatch:function(a){this.sr||(this.sr=new r(4326));t(a,this.sr,function(a){this._dispatchExtentToItemBrowser(a[0])}.bind(this),function(a){console.error(a)}.bind(this))},
_chopExtentAtDateLine:function(a){var c=new l;window.esri.geometry.normalizeCentralMeridian([a],null,function(b){if(b[0].rings){var d=(new window.esri.geometry.Polygon(a.spatialReference)).addRing(b[0].rings[0]).getExtent();b=(new window.esri.geometry.Polygon(a.spatialReference)).addRing(b[0].rings[1]).getExtent();c.resolve(d.getWidth()>b.getWidth()?d:b)}else c.resolve(b[0])},function(a){c.reject(a)});return c},_dispatchExtentToItemBrowser:function(a){window.require(["arcgis-components/wrappers/ItemBrowser"],
function(b){this.ib.dispatch(b.updateExtent({minx:a.xmin,miny:a.ymin,maxx:a.xmax,maxy:a.ymax}))}.bind(this))}});m("extend-esri")&&d.setObject("dijit.analysis.BrowseLayerMixin",e,n);return e});