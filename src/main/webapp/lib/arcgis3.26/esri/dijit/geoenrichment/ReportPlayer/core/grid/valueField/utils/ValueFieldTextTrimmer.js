// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/valueField/utils/ValueFieldTextTrimmer",["dojo/dom-style","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/UrlUtil","esri/dijit/geoenrichment/utils/RegExpUtil"],function(e,k,g,h){return{checkValueLabelOverflow:function(a,b){a.valueLabel&&void 0!==b&&this._applyNewText(a,b);a.valueLabel.__hasTrimmedText=!1;if(a.trimTextIfOverflows&&a.valueLabel&&this._getLabelInnerHTML(a)&&!h.isRichText(this._getLabelInnerHTML(a))&&(b=
this.getFullText(a),b!==this._getLabelInnerHTML(a)&&this._setLabelInnerHTML(a,b),a.valueLabel.__untrimmedText=b,a.domNode.clientWidth)){b=b.trim();var c=a.domNode.clientWidth-e.get(a.valueLabel,"paddingLeft")-e.get(a.valueLabel,"paddingRight"),d=a.domNode.clientHeight-e.get(a.valueLabel,"paddingTop")-e.get(a.valueLabel,"paddingBottom"),f=e.toPixelValue(a.domNode,e.get(a.domNode,"fontSize")),f=k.getTextBox(b,{style:"font-family:"+e.get(a.valueLabel,"fontFamily")+";font-size:"+f+"px;"});if(!(a.valueLabel.clientHeight<=
d)){var c=Math.floor(c/(f.w/b.length)),g=b.length;b=b.substr(0,Math.max(1,Math.floor(d/f.h))*c);g>b.length&&(b=b.substr(0,b.length-3),this._setLabelInnerHTML(a,b+"..."),a.valueLabel.__hasTrimmedText=!0);if(a.valueLabel.clientHeight>d)for(;!(!b||a.valueLabel.clientHeight<=d||this._getLabelInnerHTML(a).length<=c);)b=b.substr(0,b.length-1),this._setLabelInnerHTML(a,b+"..."),a.valueLabel.__hasTrimmedText=!0}}},getFullText:function(a){return a.valueLabel&&(a.valueLabel.__untrimmedText||this._getLabelInnerHTML(a))},
hasOverflowText:function(a){return a.valueLabel&&a.valueLabel.__hasTrimmedText||a.valueLabel.clientHeight>a.domNode.clientHeight},_applyNewText:function(a,b){this._getLabelInnerHTML(a)!==b&&this._setLabelInnerHTML(a,b);delete a.valueLabel.__untrimmedText},_getLabelInnerHTML:function(a){return this._getInnerHTMLNode(a).innerHTML},_setLabelInnerHTML:function(a,b){b=String(b);var c=a.valueLabel;if(a.autoDetectUrl){var d=this.getFullText(a)||b;h.isUrl(d)?(a=this._getInnerHTMLNode(a),"A"===a.nodeName?
(a.innerHTML=b,a.hasAttribute("href")&&a.removeAttribute("href"),a.setAttribute("href",d)):c.innerHTML="\x3ca href\x3d'"+g.toHttpsUrl(d)+"' target\x3d'_blank'\x3e"+b+"\x3c/a\x3e"):c.innerHTML=b}else c.innerHTML=b},_getInnerHTMLNode:function(a){var b=a.valueLabel;return a.autoDetectUrl&&b.childNodes&&1===b.childNodes.length&&b.childNodes[0]&&"A"===b.childNodes[0].nodeName?b.childNodes[0]:b}}});