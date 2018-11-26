// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
define("esri/tasks/locationproviders/QueryTaskLocationProvider","../../declare dojo/_base/lang dojo/_base/array ../../tasks/query ../../request ../../SpatialReference ./LocationProviderRemoteBase".split(" "),function(p,n,g,q,r,s,t){return p("esri.tasks.locationproviders.QueryTaskLocationProvider",t,{queryTask:null,queryParameters:null,whereFields:null,unicode:!1,maxWhereLength:2E3,constructor:function(){this.queryParameters||(this.queryParameters={})},_getFieldMapping:function(){return this.whereFields},
_init:function(){if(this.queryTask&&this.queryTask.url){var a=this.getInherited(arguments);r({url:this.queryTask.url,callbackParamName:"callback",content:{f:"json"}}).then(n.hitch(this,function(c){this.geometryType=c.geometryType;a.call(this)}))}},_batchWillOverflow:function(a,c){var e=g.map(a,function(a){return a.expression}).concat(c.expression),d=this.queryParameters.where?this.queryParameters.where.length+7:0;if(e.join(" OR ").length+d>this.maxWhereLength)return!0},_locateBatch:function(a,c){var e=
g.map(a,function(a){return a.expression}).join(" OR "),d=g.map(this._fields,function(a){return a.outField}),f=this.queryParameters.outFields?d.concat(g.filter(this.queryParameters.outFields,function(a){return-1===g.indexOf(d,a)})):d,h=n.hitch(this,function(b){if(b&&b.features)return b.exceededTransferLimit&&console.warn("exceededTransferLimit"),this._merge(a,b.features,d)}),b=new q;b.where=this.queryParameters.where?this.queryParameters.where+" AND ("+e+")":e;b.outFields=f;b.outSpatialReference=c.outSpatialReference||
new s(4326);b.geometry=this.queryParameters.geometry;b.returnGeometry=!1===this.queryParameters.returnGeometry?!1:!0;b.maxAllowableOffset=this.queryParameters.maxAllowableOffset;return this.queryTask.execute(b).then(h)},_merge:function(a,c,e){for(var d=[],f=0;f<a.length;f++)for(var h=a[f],b=0;b<c.length;b++){var k=c[b],l=this._createKey(k,e);if(h.key===l){for(b=0;b<h.features.length;b++){var m=h.features[b];if(l=k.geometry)m.geometry=l;g.forEach(this.queryParameters.outFields,function(a){m.attributes[a]=
k.attributes[a]});d.push(m)}break}}return d},_createQueryExpression:function(a){for(var c=[],e=0;e<this._fields.length;e++){var d=this._fields[e],f=a.attributes[d.inField];if(void 0!==f&&null!==f)c.push(d.outField+(this.unicode?"\x3dN'":"\x3d'")+this._escape(f)+"'");else return}return 1<c.length?"("+c.join(" AND ")+")":c[0]},_escape:function(a){return"string"===typeof a?a.replace(/'/g,"''"):a}})});