// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/renderers/support/LegendOptions","require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/JSONSupport ../../core/accessorSupport/decorators".split(" "),function(b,a,f,e,g,d){Object.defineProperty(a,"__esModule",{value:!0});b=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.title=null;return a}f(c,b);a=c;c.prototype.clone=function(){return new a({title:this.title})};e([d.property({type:String,json:{write:!0}})],
c.prototype,"title",void 0);return c=a=e([d.subclass("esri.renderers.support.LegendOptions")],c);var a}(d.declared(g));a.LegendOptions=b;a.default=b});