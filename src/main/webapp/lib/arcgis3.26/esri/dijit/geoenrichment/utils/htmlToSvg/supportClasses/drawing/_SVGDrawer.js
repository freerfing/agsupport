// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/htmlToSvg/supportClasses/drawing/_SVGDrawer",["../dom-style","../ElementBuilder","../StyleParser","esri/dijit/geoenrichment/utils/SVGUtil"],function(e,h,k,l){return{_svgTempParentNode:null,drawSVG:function(a,b,m){var f=e.toPixelValue(a,a.getAttribute("x")),g=e.toPixelValue(a,a.getAttribute("y"));a.setAttribute("x",Math.round(100*(f+b.box.x))/100+"px");a.setAttribute("y",Math.round(100*(g+b.box.y))/100+"px");var d=a.getAttribute("style")||"";if(d){a.setAttribute("style",
"");var c=k.parseStyleString(d);c.width&&a.setAttribute("width",c.width);c.height&&a.setAttribute("height",c.height)}b=h.buildElement("g",{opacity:b.style.opacity,clipParams:m,transform:b.style.transform},l.getOuterHTML(a));a.setAttribute("x",f+"px");a.setAttribute("y",g+"px");a.setAttribute("style",d);return b}}});