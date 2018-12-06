// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/PageUnitsConverter",["dojo/_base/lang"],function(k){function g(a,b,c){c&&(a=k.mixin({},a));for(var d in a){var e=a[d];null!==e&&""!==e&&"boolean"!=typeof e&&("object"==typeof e?a[d]=g(e,b,c):(e=Number(e),isNaN(e)||(a[d]=b(e))))}return a}var c={},h=["px","pt","mm","in","twip"];h.forEach(function(a){h.forEach(function(b){if(a!==b){var f=a+"To"+b.charAt(0).toUpperCase()+b.substr(1);c[f]=function(d,e){return c.convert(d,a,b,void 0!==e?e:5)}}})});c.convert=function(a,
b,f,d){a=Number(a)||0;switch(b){case "in":a*=72;break;case "px":a*=.75;break;case "mm":a=a/25.4*72;break;case "twip":a/=20}switch(f){case "in":a/=72;break;case "px":a/=.75;break;case "mm":a=a/72*25.4;break;case "twip":a=Math.round(20*a)}void 0!==d&&(a=c.roundNDigits(a,d));return a};c.pxToPtObj=function(a,b){return g(a,c.pxToPt,b)};c.ptToPxObj=function(a,b){return g(a,c.ptToPx,b)};c.roundNDigits=function(a,b){return Number(Number(a).toFixed(b))};c.roundNDigitsObj=function(a,b){for(var f in a){var d=
a[f];"object"==typeof d?c.roundNDigitsObj(d,b):a[f]=c.roundNDigits(d,b)}};return c});