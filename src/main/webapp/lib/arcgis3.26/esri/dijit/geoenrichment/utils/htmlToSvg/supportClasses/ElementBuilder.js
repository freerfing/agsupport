// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/htmlToSvg/supportClasses/ElementBuilder",[],function(){return{_ommitableValues:{opacity:1,"stroke-opacity":1,"fill-opacity":1,rx:0,ry:0},CLEAN_UP_STYLE_RE:/font-weight:normal;|font-style:normal;|text-align:start;|text-align:left;|text-align:right;|white-space:normal;|white-space:pre-wrap;|word-wrap:normal;|word-break:normal;|text-decoration:none;/g,buildElement:function(d,c,e){var f=[d],b;for(b in c){var a=c[b],g=this._ommitableValues[b];if(void 0===g||a!==g){"style"===
b&&a&&(a=a.replace(this.CLEAN_UP_STYLE_RE,""));if("clipParams"===b){if(!a)continue;b="clip-path";a="url(#"+a.clipId+")"}void 0!==a&&f.push(b+'\x3d"'+a+'"')}}c="\x3c"+f.join(" ");return e?c+("\x3e"+e+"\x3c/"+d+"\x3e"):c+"/\x3e"}}});