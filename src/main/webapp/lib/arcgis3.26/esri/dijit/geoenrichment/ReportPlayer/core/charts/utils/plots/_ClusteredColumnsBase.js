// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/plots/_ClusteredColumnsBase","dojo/_base/lang dojo/_base/array dojo/_base/declare dojo/has dojox/charting/plot2d/CartesianBase dojox/charting/plot2d/_PlotEvents dojox/charting/plot2d/common dojox/lang/functional dojox/lang/functional/reversed dojox/lang/utils ./labelsRendering/_ColumnsLabelRenderingFix ./animation/_ClusteredColumnsAnimation ./_MinVisibleColumn".split(" "),function(t,v,C,D,E,F,w,G,H,B,I,J,K){var L=H.lambda("item.purgeGroup()");
return C("dojox.charting.plot2d.Columns",[E,F,I,J,K],{_mainShapes:null,_animationInfos:null,defaultParams:{gap:0,animate:null,enableCache:!1},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},filter:{},styleFunc:null,font:"",fontColor:"",labelHorizontalAlign:null},constructor:function(a,b){this.opt=t.clone(t.mixin(this.opt,this.defaultParams));B.updateWithObject(this.opt,b);B.updateWithPattern(this.opt,b,this.optionalParams);this.animate=this.opt.animate;this.renderingOptions=
{"shape-rendering":"crispEdges"}},getSeriesStats:function(){var a=w.collectSimpleStats(this.series,function(a){return null==a});a.hmin-=.5;a.hmax+=.5;return a},render:function(a,b){if(!this.chart.isPreRenderMode){if(this.zoom&&!this.isDataDirty())return this.performZoom(a,b);this.resetEvents();this.dirty=this.isDirty();var f;this.dirty&&(v.forEach(this.series,L),this._eventSeries={},this.cleanGroup(),f=this.getGroup(),G.forEachRev(this.series,function(a){a.cleanGroup(f)}));var e=this.chart.theme,
l=this._hScaler.scaler.getTransformerFromModel(this._hScaler),d=this._vScaler.scaler.getTransformerFromModel(this._vScaler),g=d(Math.max(e.series.baseLineValue||0,this._vScaler.bounds.lower)),m=this.events(),p=this.getBarProperties();this._mainShapes=[];this._animationInfos=[];for(var y=this.extractValues(this._hScaler),y=this.rearrangeValues(y,d,g),d=this.series.length-1;0<=d;--d){var c=this.series[d];if(this.dirty||c.dirty){c.cleanGroup();this.opt.enableCache&&(c._rectFreePool=(c._rectFreePool?
c._rectFreePool:[]).concat(c._rectUsePool?c._rectUsePool:[]),c._rectUsePool=[]);var z=e.next("column",[this.opt,c]),t=Array(c.data.length);if(c.hidden)c.dyn.fill=z.series.fill;else{f=c.group;for(var u=v.some(c.data,function(a){return"number"===typeof a||a&&!a.hasOwnProperty("x")}),w=u?Math.min(c.data.length,Math.ceil(this._hScaler.bounds.to)):c.data.length,k=u?Math.max(0,Math.floor(this._hScaler.bounds.from-1)):0;k<w;++k){var h=c.data[k];if(null!=h){var q=this.getValue(h,k,d,u),A=y[d][k],n;this.opt.styleFunc||
"number"!==typeof h?(n="number"!==typeof h?[h]:[],this.opt.styleFunc&&n.push(this.opt.styleFunc(h)),n=e.addMixin(z,"column",n,!0)):n=e.post(z,"column");if(1<=p.width){var r={x:b.l+l(q.x+.5)+p.gap+p.thickness*this._getXShift(d,e),y:a.height-b.b-g-Math.max(A,0),width:p.width,height:Math.abs(A)},r=this._drawColumn(f,h,r,n,a,b,c,g),x=r.shape;x.value=h;this._mainShapes.push(x);r=r.rect;m&&(q={element:"column",index:k,run:c,shape:x,cx:q.x+.5,cy:q.y,x:u?k:c.data[k].x,y:u?c.data[k]:c.data[k].y},this._connectEvents(q),
t[k]=q);this.createLabel(f,h,r,n,b);this.animate&&(h={shape:x,voffset:a.height-b.b-g,vsize:A},this._animationInfos.push(h),this._animateColumn(h))}}}this._eventSeries[c.name]=t;c.dirty=!1}}else e.skip(),this._reconnectEvents(c.name)}this._renderLabels(n,a,b,f);this.dirty=!1;D("dojo-bidi")&&this._checkOrientation(this.group,a,b);return this}},getMainShapes:function(){return this._mainShapes},_drawColumn:function(a,b,f,e,l,d,g,m){},getValue:function(a,b,f,e){e?(f="number"===typeof a?a:a.y,a=b):(f=a.y,
a=a.x-1);return{x:a,y:f}},extractValues:function(a){for(var b=[],f=this.series.length-1;0<=f;--f){var e=this.series[f];if(this.dirty||e.dirty){var l=v.some(e.data,function(a){return"number"==typeof a||a&&!a.hasOwnProperty("x")}),d=l?Math.max(0,Math.floor(a.bounds.from-1)):0,l=l?Math.min(e.data.length,Math.ceil(a.bounds.to)):e.data.length,g=b[f]=[];g.min=d;for(g.max=l;d<l;++d){var m=e.data[d];g[d]=this.isNullValue(m)?0:"number"==typeof m?m:m.y}}}return b},rearrangeValues:function(a,b,f){for(var e=
0,l=a.length;e<l;++e){var d=a[e];if(d)for(var g=d.min,m=d.max;g<m;++g){var p=d[g];d[g]=this.isNullValue(p)?0:b(p)-f}}return a},getBarProperties:function(){var a=this._getClusterSize(),b=w.calculateBarSize(this._hScaler.bounds.scale,this.opt,a);return{gap:b.gap,width:b.size,thickness:b.size,clusterSize:a}},_getClusterSize:function(){var a=this.series.length;v.forEach(this.series,function(b){b.hidden&&a--});return this.chart.theme.series.renderColumnBarsInOppositeDirections?Math.round(a/2):a},_getXShift:function(a,
b){return b.series.renderColumnBarsInOppositeDirections?a>=this.series.length/2?a-this.series.length/2:a:a}})});