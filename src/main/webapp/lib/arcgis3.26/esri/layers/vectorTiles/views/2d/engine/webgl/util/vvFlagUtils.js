// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/webgl/util/vvFlagUtils",["require","exports","../enums","../visualVariablesUtils"],function(k,d,b,h){function e(a,c){void 0===c&&(c=!1);var d=b.WGLVVFlag.SIZE_FIELD_STOPS|b.WGLVVFlag.SIZE_MINMAX_VALUE|b.WGLVVFlag.SIZE_SCALE_STOPS|b.WGLVVFlag.SIZE_UNIT_VALUE;a=(a&(b.WGLVVTarget.FIELD_TARGETS_OUTLINE|b.WGLVVTarget.MINMAX_TARGETS_OUTLINE|b.WGLVVTarget.SCALE_TARGETS_OUTLINE|b.WGLVVTarget.UNIT_TARGETS_OUTLINE))>>>4;return c?d&a:d&~a}function g(a){var c=e(a,
!1);return a&(b.WGLVVFlag.COLOR|b.WGLVVFlag.OPACITY|b.WGLVVFlag.ROTATION|c)}Object.defineProperty(d,"__esModule",{value:!0});d.getVVFlags=function(a){if(!a)return b.WGLVVFlag.NONE;for(var c=0,d=0;d<a.length;d++){var f=a[d];if("size"===f.type){var e=h.getTypeOfSizeVisualVariable(f),c=c|e;"outline"===f.target&&(c|=e<<4)}else"color"===f.type?c|=b.WGLVVFlag.COLOR:"opacity"===f.type?c|=b.WGLVVFlag.OPACITY:"rotation"===f.type&&(c|=b.WGLVVFlag.ROTATION)}return c};d.getSizeFlagsMask=e;d.getMarkerVVFlags=
g;d.getFillVVFlags=function(a){return a&(b.WGLVVFlag.COLOR|b.WGLVVFlag.OPACITY)};d.getLineVVFlags=function(a,c){if(c)return c=e(a,!0),a&c;c=e(a,!1);return a&(b.WGLVVFlag.COLOR|b.WGLVVFlag.OPACITY|c)};d.getTextVVFlags=function(a){return g(a)}});