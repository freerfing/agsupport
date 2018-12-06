// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/layout/LayoutBuilder",["dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/dom-construct"],function(f,c,g,h){return f(null,{_moduleMap:null,_getModulePaths:function(){return{core:{section:"esri/dijit/geoenrichment/ReportPlayer/core/sections/Section",emptySection:"esri/dijit/geoenrichment/ReportPlayer/core/sections/Empty",grid:"esri/dijit/geoenrichment/ReportPlayer/core/grid/AdjustableGrid",image:"esri/dijit/geoenrichment/ReportPlayer/core/annotations/image/ImageRenderer",
chart:"esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartRenderer"},classic:{reportContainer:"esri/dijit/geoenrichment/ReportPlayer/core/reportContainer/ReportContainer"},graphicCore:{shape:"esri/dijit/geoenrichment/ReportPlayer/core/annotations/shape/ShapeRenderer",infographic:"esri/dijit/geoenrichment/ReportPlayer/core/infographics/utils/InfographicRenderer"},graphic_fullPages:{reportContainerGrid:"esri/dijit/geoenrichment/ReportPlayer/core/reportContainerGrid/ReportContainerGrid"},graphic_panelsInSlides:{reportContainerPagination:"esri/dijit/geoenrichment/ReportPlayer/core/reportContainerPagination/ReportContainerPagination",
infographicPage:"esri/dijit/geoenrichment/ReportPlayer/core/infographics/InfographicsPage"},graphic_panelsInStack:{reportContainerStack:"esri/dijit/geoenrichment/ReportPlayer/core/reportContainerStack/ReportContainerStack",infographicPageStack:"esri/dijit/geoenrichment/ReportPlayer/core/infographics/InfographicsPageStack"}}},initCoreComponents:function(){var a=this._getModulePaths();return this._initPaths(c.mixin({},a.core,a.graphicCore))},initClassicComponents:function(){var a=this._getModulePaths();
return this._initPaths(c.mixin({},a.core,a.classic))},initGraphicComponents:function(a){var b=this._getModulePaths();return this._initPaths(c.mixin({},b.core,b.graphicCore,b["graphic_"+a]||b.graphic_fullPages))},_initPaths:function(a){var b=this;this._moduleMap=this._moduleMap||{};var e=[],d;for(d in a)e.push({id:d,path:a[d]});var c=new g;require(e.map(function(a){return a.path}),function(){for(var a=0;a<arguments.length;a++)b._moduleMap[e[a].id]=arguments[a];c.resolve()});return c.promise},createElement:function(a,
b,c,d){switch(a){case "section":case "emptySection":case "grid":case "reportContainer":case "reportContainerGrid":case "reportContainerPagination":case "reportContainerStack":case "infographicPage":case "infographicPageStack":return new this._moduleMap[a](b,c?h.create("div",null,c,d):void 0);case "image":return this._moduleMap[a].createImageContainer(b);case "shape":return this._moduleMap[a].createShapeContainer(b);case "chart":return this._moduleMap[a].createChartPage(b);case "infographic":return this._moduleMap[a].createInfographicPage(b)}return!1},
getClass:function(a){return this._moduleMap[a]}})});