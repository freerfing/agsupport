// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("../core/declare ../core/lang ../core/kebabDictionary ../core/Error ../core/Logger ../core/accessorSupport/ensureType ../support/arcadeUtils ../symbols/Symbol ../symbols/PolygonSymbol3D ../symbols/support/jsonUtils ../symbols/support/typeUtils ./Renderer ./support/LegendOptions ./support/ClassBreakInfo".split(" "),function(q,k,r,t,u,m,g,v,w,e,h,x,l,f){var y=u.getLogger("esri.renderers.ClassBreaksRenderer");l=l.LegendOptions;f=f.ClassBreakInfo;var n=r({esriNormalizeByLog:"log",esriNormalizeByPercentOfTotal:"percent-of-total",
esriNormalizeByField:"field"}),z=m.ensureType(f),p=q(x,{declaredClass:"esri.renderers.ClassBreaksRenderer",properties:{backgroundFillSymbol:{types:{base:v,key:"type",typeMap:{"simple-fill":h.types.typeMap["simple-fill"],"picture-fill":h.types.typeMap["picture-fill"],"polygon-3d":h.types.typeMap["polygon-3d"]}},value:null,json:{origins:{"web-scene":{read:e.read,write:{target:{backgroundFillSymbol:{type:w}},writer:e.writeTarget}}},read:e.read,write:e.writeTarget}},classBreakInfos:{type:[f],json:{read:function(a,
b,d){if(Array.isArray(a)){var c=b.minValue;return a.map(function(a){var b=new f;b.read(a,d);null==b.minValue&&(b.minValue=c);null==b.maxValue&&(b.maxValue=b.minValue);c=b.maxValue;return b})}},write:function(a,b,d,c){a=a.map(function(a){return a.write({},c)});this._areClassBreaksConsecutive()&&a.forEach(function(a){delete a.classMinValue});b[d]=a}}},minValue:{type:Number,readOnly:!0,dependsOn:["classBreakInfos"],get:function(){return this.classBreakInfos[0]&&this.classBreakInfos[0].minValue||0},json:{read:!1,
write:{overridePolicy:function(){return 0!==this.classBreakInfos.length&&this._areClassBreaksConsecutive()?{enabled:!0}:{enabled:!1}}}}},defaultLabel:{type:String,value:null,json:{write:!0}},defaultSymbol:{types:h.rendererTypes,value:null,json:{origins:{"web-scene":{read:e.read,write:{target:{defaultSymbol:{types:h.rendererTypes3D}},writer:e.writeTarget}}},read:e.read,write:e.writeTarget}},valueExpression:{type:String,value:null,json:{write:!0}},valueExpressionTitle:{type:String,value:null,json:{write:!0}},
compiledFunc:{dependsOn:["valueExpression"],get:function(){return g.createFunction(this.valueExpression)}},legendOptions:{type:l,value:null,json:{write:!0}},field:{value:null,cast:function(a){return null==a?a:"function"===typeof a?a:m.ensureString(a)},json:{type:String,write:function(a,b,d,c){"string"===typeof a?b[d]=a:c&&c.messages?c.messages.push(new t("property:unsupported","ClassBreaksRenderer.field set to a function cannot be written to JSON")):y.error(".field: cannot write field to JSON since it's not a string value")}}},
isMaxInclusive:!0,normalizationField:{type:String,value:null,json:{write:!0}},normalizationTotal:{type:Number,value:null,json:{write:!0}},normalizationType:{type:String,value:null,dependsOn:["normalizationField","normalizationTotal"],get:function(){var a=this._get("normalizationType"),b=!!this.normalizationField,d=null!=this.normalizationTotal;if(b||d)a=b&&"field"||d&&"percent-of-total",b&&d&&console.warn("warning: both normalizationField and normalizationTotal are set!");else if("field"===a||"percent-of-total"===
a)a=null;return a},json:{read:n.fromJSON,write:function(a,b){if(a=n.toJSON(a))b.normalizationType=a}}},requiredFields:{dependsOn:["field","normalizationField","valueExpression"]},type:{value:"class-breaks",json:{write:function(a,b){b.type="classBreaks"}}}},constructor:function(){this.classBreakInfos=[]},addClassBreakInfo:function(a,b,d){a="number"===typeof a?new f({minValue:a,maxValue:b,symbol:d}):z(k.clone(a));this.classBreakInfos.push(a);1===this.classBreakInfos.length&&this.notifyChange("minValue")},
removeClassBreakInfo:function(a,b){var d,c,e=this.classBreakInfos.length;for(c=0;c<e;c++)if(d=[this.classBreakInfos[c].minValue,this.classBreakInfos[c].maxValue],d[0]==a&&d[1]==b){this.classBreakInfos.splice(c,1);break}},getBreakIndex:function(a,b){var d=this.field,c=a.attributes,e=this.classBreakInfos.length,f=this.isMaxInclusive;if(this.valueExpression)a=g.executeFunction(this.compiledFunc,g.createExecContext(a,g.getViewInfo(b)));else if("function"===typeof d)a=d(a);else if(a=parseFloat(c[d]),b=
this.normalizationType)if(d=parseFloat(this.normalizationTotal),c=parseFloat(c[this.normalizationField]),"log"===b)a=Math.log(a)*Math.LOG10E;else if("percent-of-total"===b&&!isNaN(d))a=a/d*100;else if("field"===b&&!isNaN(c)){if(isNaN(a)||isNaN(c))return-1;a/=c}if(null!=a&&!isNaN(a)&&"number"===typeof a)for(c=0;c<e;c++)if(b=[this.classBreakInfos[c].minValue,this.classBreakInfos[c].maxValue],b[0]<=a&&(f?a<=b[1]:a<b[1]))return c;return-1},getClassBreakInfo:function(a,b){a=this.getBreakIndex(a,b);return-1!==
a?this.classBreakInfos[a]:null},getSymbol:function(a,b){a=this.getBreakIndex(a,b);return-1<a?this.classBreakInfos[a].symbol:this.defaultSymbol},getSymbols:function(){var a=[];this.classBreakInfos.forEach(function(b){b.symbol&&a.push(b.symbol)});this.defaultSymbol&&a.push(this.defaultSymbol);return a},clone:function(){return new p({field:this.field,backgroundFillSymbol:this.backgroundFillSymbol&&this.backgroundFillSymbol.clone(),defaultLabel:this.defaultLabel,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.clone(),
valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,classBreakInfos:k.clone(this.classBreakInfos),isMaxInclusive:this.isMaxInclusive,normalizationField:this.normalizationField,normalizationTotal:this.normalizationTotal,normalizationType:this.normalizationType,visualVariables:k.clone(this.visualVariables),legendOptions:k.clone(this.legendOptions),authoringInfo:this.authoringInfo&&this.authoringInfo.clone()})},collectRequiredFields:function(a){this.inherited(arguments);
[this.field,this.normalizationField].forEach(function(b){b&&(a[b]=!0)});this.valueExpression&&g.extractFieldNames(this.valueExpression).forEach(function(b){a[b]=!0})},_areClassBreaksConsecutive:function(){for(var a=this.classBreakInfos,b=1;b<a.length;b++)if(a[b-1].maxValue!==a[b].minValue)return!1;return!0}});return p});