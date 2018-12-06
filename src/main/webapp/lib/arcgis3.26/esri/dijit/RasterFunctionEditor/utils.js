// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/RasterFunctionEditor/utils","dojo/_base/lang dojo/has dojo/on dojo/_base/array dojo/_base/Color ../../kernel ../../request ../../tasks/Geoprocessor ../../tasks/JobInfo ../../tasks/AlgorithmicColorRamp ../../tasks/MultipartColorRamp ../../renderers/colorUtils ../../renderers/colorRampUtils".split(" "),function(k,u,l,h,d,v,w,x,y,z,A,m,p){function q(a){if(a){var b=h.map([a.FromColor,a.ToColor],function(a){a=m.toRGB({h:a.Hue,s:a.Saturation,v:a.Value});return[a.r,a.g,a.b]});return{fromColor:b[0],
toColor:b[1],type:"algorithmic",algorithm:a.Algorithm}}}function r(a){if(a)return a=m.toHSV(m.getDojoColor(a)),{type:"HsvColor",Hue:a.h,Saturation:a.s,Value:a.v,AlphaValue:255}}function t(a){if(a){var b=a.toJson?a.toJson():void 0;return{Algorithm:b&&b.Algorithm||"esriHSVAlgorithm",type:"AlgorithmicColorRamp",FromColor:r(a.fromColor),ToColor:r(a.toColor)}}}d={};var e,f,g;k.mixin(d,{convertRFT:function(a,b,c,n){var h=a.url,d=function(){g&&(g.remove(),g=null);f&&(f.remove(),f=null)};e||(e=new x(h),l(e,
"error",d));f=l(e,"job-complete",function(a){f&&(f.remove(),f=null);a.jobInfo.jobStatus!==y.STATUS_SUCCEEDED?(d(),n(a)):e.getResultData(a.jobInfo.jobId,"outputRasterFunction")});g=l(e,"get-result-data-complete",function(a){g&&(g.remove(),g=null);(a=a&&a.result&&a.result.value)&&a.url&&w({url:a.url,callbackParamName:"callback",content:{f:"json"},handleAs:"json",load:c,error:n})});a={inputRasterFunction:JSON.stringify(a.rft),format:a.format};return e.submitJob(a,b,null,n)},getRasterJsonFromLayer:function(a){if(!a)return null;
var b=a.url;a.credential&&(b=b+"?token\x3d"+a.credential.token,a.credential.referer&&(b+=a.credential.referer));b={url:b,name:a.name};a.renderingRule&&(b.renderingRule=a.renderingRule.toJson());a.mosaicRule&&(b.mosaicRule=a.mosaicRule.toJson());return b},getLayerIdfromRasterValue:function(a,b){if(a&&b){var c;h.some(b,function(b){if(b&&b.url===a.url&&b.name===a.name&&a.name)return c=b.id,!0});return c}},getColorRampFromArg:function(a){if(a){var b,c;a.type&&-1<a.type.toLowerCase().indexOf("colorramp")?
b=a:a.value&&-1<a.value.type.toLowerCase().indexOf("colorramp")&&(b=a.value);if(b)return a=b.type.toLowerCase(),"multipartcolorramp"===a?c=p.fromJson({type:"multipart",colorRamps:h.map(b.ArrayOfColorRamp,function(a){return q(a)})}):"algorithmiccolorramp"===a&&(c=p.fromJson(q(b))),c.id=c.name=b.Name,c}},getRFxArgColorRampValue:function(a){if(a){if(a.fromColor&&a.toColor)return k.mixin(t(a),{Name:a.name});if(a.colorRamps){var b=h.map(a.colorRamps,t);return{type:"MultipartColorRamp",NumColorRamps:b.length,
ArrayOfColorRamp:b,Name:a.name}}}},RFX_VARIABLE_TYPE:"RasterFunctionVariable",RFX_TEMPLATE_TYPE:"RasterFunctionTemplate"});u("extend-esri")&&k.setObject("dijit.RasterFunctionEditor.utils",d,v);return d});