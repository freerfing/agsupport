// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/GridBackgroundForegroundUtil",["dojo/_base/lang","dojo/dom-construct"],function(f,g){var d={renderBackground:function(a,c,e){return d._renderSection(a,c,e,!0)},renderForeground:function(a,c,e){return d._renderSection(a,c,e,!1)},_renderSection:function(a,c,e,d){g.empty(d?a.backgroundNode:a.foregroundNode);if(!c)return null;var b={};b["class"]="esriGEAbsoluteStretched "+(d?"adjustableGrid_backgroundSection":"adjustableGrid_foregroundSection");
b.initialWidth=a.getAllowedWidth();b.json=c;b.viewModel=a.viewModel;b.theme=a.theme;b.hasFixedLayout=!1;b.parentWidget=a;b.currentFeatureIndex=a.currentFeatureIndex;b.initialViewMode=a.getViewMode();b.initialSpecificViewMode=a.getSpecificViewMode();f.mixin(b,e);c=a.viewModel.layoutBuilder.createElement("section",b,d?a.backgroundNode:a.foregroundNode);c.setResizedHeight(a.getHeight());return c}};return d});