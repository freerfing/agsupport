// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/VisibleScaleRangeSlider/ScaleRanges",["./scalePreviewUtil","dojo/_base/array","dojo/_base/declare","dojo/Stateful","dojo/i18n!../../nls/jsapi"],function(g,l,f,m,n){f=f(m,{_scaleRangeStops:[{id:"room",minScale:100},{id:"rooms",minScale:400},{id:"smallBuilding",minScale:800},{id:"building",minScale:1999},{id:"buildings",minScale:3999},{id:"street",minScale:7499},{id:"streets",minScale:14999},{id:"neighborhood",minScale:29999},{id:"town",minScale:59999},{id:"city",minScale:119999},
{id:"cities",minScale:249999},{id:"metropolitanArea",minScale:499999},{id:"county",minScale:999999},{id:"counties",minScale:1999999},{id:"state",minScale:3999999},{id:"states",minScale:6999999},{id:"country",minScale:14999999},{id:"countries",minScale:34999999},{id:"continent",minScale:99999999},{id:"world",minScale:147914382}],_allRanges:null,_ranges:null,length:0,constructor:function(){this._allRanges=this.getScaleRanges()},_scaleRangeBoundsSetter:function(a){this._ranges=a=this.getScaleRanges(a.maxScale,
a.minScale);this.length=a.length},getScaleRanges:function(a,b){var e=this._scaleRangeStops,d=e.length,c,f,k;a=0<=a?a:0;b=0<b?b:e[d-1].minScale;c=a;f=[];for(var h=0;h<d;h++){var g=Math.min(e[h].minScale,b);k=Math.min(g,b);a<=g&&c<b&&f.push({id:e[h].id,maxScale:Math.max(c,a),minScale:k});c=k+1}f.reverse();return this._ensureValidBoundaryRanges(f)},_ensureValidBoundaryRanges:function(a){var b=a[0];b.minScale===b.maxScale&&(a.shift(),a[0].minScale+=1);b=a[a.length-1];b.minScale===b.maxScale&&(a.pop(),
--a[a.length-1].maxScale);return a},getScalePreviewSpriteBackgroundPosition:function(a){a=this._toFullRangeIndex(a);return g.getScalePreviewSpriteBackgroundPosition(a)},_toFullRangeIndex:function(a){a=this.findScaleRangeByIndex(Math.floor(a));for(var b=this._allRanges,e=b.length,d=0,c=0;c<e;c++)if(b[c].id===a.id){d=c;break}return d},getScaleRangeLabel:function(a){a=this._ranges[this._clampScaleRangeIndex(a)];return n.widgets.visibleScaleRangeSlider.scaleRangeLabels[a.id]},findScaleRange:function(a){var b=
this._ranges,e,d;if(a>=b[0].maxScale)return b[0];if(a<=b[b.length-1].minScale)return b[b.length-1];for(var c=0;c<b.length;c++)if(d=b[c],a>=d.maxScale&&a<=d.minScale){e=d;break}return e},findScaleRangeByIndex:function(a){a=this._clampScaleRangeIndex(a);return this._ranges[a]},clampScale:function(a){return Math.min(this.get("minScale"),Math.max(this.get("maxScale"),a))},_minScaleGetter:function(){return this.get("firstRange").minScale},_maxScaleGetter:function(){return this.get("lastRange").maxScale},
_firstRangeGetter:function(){return this._ranges[0]},_lastRangeGetter:function(){var a=this._ranges;return a[a.length-1]},clampMinScale:function(a){return 0===a?this.get("minScale"):this.clampScale(a)},clampMaxScale:function(a){return this.clampScale(a)},_clampScaleRangeIndex:function(a){if(0>=a)return 0;var b=this._ranges.length-1;return a>b?b:Math.floor(a)},scaleToRangeIndex:function(a){return l.indexOf(this._ranges,this.findScaleRange(a))},contains:function(a){for(var b=this._ranges,e=!1,d,c=0;c<
b.length;c++)if(d=b[c],a>=d.maxScale&&a<=d.minScale){e=!0;break}return e}});f.getScalePreviewSource=function(a){return g.getScalePreviewSource(a)};return f});