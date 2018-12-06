// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/reportContainerGrid/utils/QueryUtil",["dojo/dom-geometry"],function(g){var f={getLayoutCells:function(b,a){var c=a&&a.sectionFuncName,d=a&&a.floatingCells,e=[];b.getGrids().forEach(function(a){(a=a.getFieldCells({floatingCells:d}))&&(e=e.concat(a))});return c?e.filter(function(a){return!c||a&&a.content&&a.content[c]}):e},findFirstEmptyLayoutCell:function(b){return function(){var a;f.getLayoutCells(b,{sectionFuncName:"isEmpty"}).some(function(c){if(c.content.isEmpty())return a=
c,!0});return a}()},getFocusedLayoutCell:function(b){var a=[];b.getGrids().forEach(function(c){(c=c.getSelectedCells())&&(a=a.concat(c))});return a[0]},hasFocusedChild:function(b){return b.getGrids().some(function(a){return(a=a&&a.getSelectedCells())&&!!a.length})},collectFieldInfos:function(b,a){var c=[];f.getLayoutCells(b,{sectionFuncName:"collectFieldInfos",floatingCells:!0}).some(function(b){(b=b.content.collectFieldInfos(a))&&(c=c.concat(b))});return c},getSectionIndex:function(b,a){var c=0,
d;b.getGrids().some(function(b){return b.getFieldCells().some(function(b){if(b===a)return d=!0;c++})});return d&&c},getLayoutCellBySectionIndex:function(b,a){var c=0,d;b.getGrids().some(function(b){return b.getFieldCells().some(function(b){if(c===a)return d=b,!0;c++})});return d},screenToPageCoords:function(b,a,c,d){var e=b.getGrids()[b.getCurrentViewedPageIndex()];if(!e)return null;e=g.position(e.domNode);a={x:a-e.x,y:c-e.y};d&&!d.returnInScreenCoordinates&&(b=b.getZoomInfo().scale,a.x/=b,a.y/=b);
return a}};return f});