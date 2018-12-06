// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/htmlToSvg/supportClasses/text/TextStyleBuilder",["../dom-style"],function(e){var g={_MAP:{"white-space":"whiteSpace","word-wrap":"wordWrap","word-break":"wordBreak","overflow-wrap":"overflowWrap"},_MAP_TAG_STYLES:{"font-weight":"fontWeight","font-style":"fontStyle","text-decoration":"textDecoration"},_RESET_ALL:{fontWeight:"",fontStyle:"",textDecoration:"",whiteSpace:"",wordWrap:"",wordBreak:"",overflowWrap:"",fontFamily:"",fontSize:"",textAlign:"",lineHeight:""},
_getTagStyles:function(a,d){return{"font-weight":a.style.fontWeight||(d.isB?"bold":"")||e.get(a,"fontWeight"),"font-style":a.style.fontStyle||(d.isI?"italic":"")||e.get(a,"fontStyle"),"text-decoration":a.style.textDecoration||(d.isU?"underline":"")||e.get(a,"textDecoration")}},buildTextStyleString:function(a,d,h,k,f,b){e.setComputedStyleCache(a,b);b="";for(var c in g._MAP){var l=e.get(a,g._MAP[c]);l&&(b+=c+":"+l+";")}d=this._getTagStyles(a,d);for(c in d)b+=c+":"+d[c]+";";(c=e.get(a,"fontFamily").replace(/"/g,
"'"))&&(b+="font-family:"+c+";");h&&(b+="font-size:"+h+"px;");k&&(b+="text-align:"+k+";");f&&"normal"!==f&&(b+="line-height:"+f+"px;");e.clearCache(a);return b},buildTextStyleObject:function(a,d,h,k,f,b){e.setComputedStyleCache(a,b);b={};for(var c in g._MAP){var l=g._MAP[c],m=e.get(a,l);m&&(b[l]=m)}d=this._getTagStyles(a,d);for(c in d)b[this._MAP_TAG_STYLES[c]]=d[c];(c=e.get(a,"fontFamily").replace(/"/g,"'"))&&(b.fontFamily=c);h&&(b.fontSize=h+"px");k&&(b.textAlign=k);f&&"normal"!==f&&(b.lineHeight=
f+"px");e.clearCache(a);return b},resetTextStyle:function(a){e.set(a,g._RESET_ALL)}};return g});