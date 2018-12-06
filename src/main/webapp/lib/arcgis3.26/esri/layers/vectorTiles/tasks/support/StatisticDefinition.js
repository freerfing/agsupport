// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/tasks/support/StatisticDefinition","require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/JSONSupport ../../core/accessorSupport/decorators".split(" "),function(h,k,f,c,g,b){return function(e){function a(a){a=e.call(this)||this;a.maxPointCount=void 0;a.maxRecordCount=void 0;a.maxVertexCount=void 0;a.onStatisticField=null;a.outStatisticFieldName=null;a.statisticType=null;return a}f(a,e);d=a;a.prototype.clone=function(){return new d({maxPointCount:this.maxPointCount,
maxRecordCount:this.maxRecordCount,maxVertexCount:this.maxVertexCount,onStatisticField:this.onStatisticField,outStatisticFieldName:this.outStatisticFieldName,statisticType:this.statisticType})};c([b.property({type:Number,json:{write:!0}})],a.prototype,"maxPointCount",void 0);c([b.property({type:Number,json:{write:!0}})],a.prototype,"maxRecordCount",void 0);c([b.property({type:Number,json:{write:!0}})],a.prototype,"maxVertexCount",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"onStatisticField",
void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"outStatisticFieldName",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"statisticType",void 0);return a=d=c([b.subclass("esri.tasks.support.StatisticDefinition")],a);var d}(b.declared(g))});