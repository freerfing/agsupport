// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/GridRowsPrettifier",[],function(){return{adjustContent:function(g){var d=[];g.getFieldCells().forEach(function(b){if(b.valueLabel&&b.valueLabel.innerHTML){var a=d[b.gridData.index]=d[b.gridData.index]||{};a.cells=a.cells||[];a.cells.push(b);a.h=Math.max(a.h||0,b.getHeight());a.minH=Math.max(a.minH||0,b.valueLabel.clientHeight)}});var e=0,f=0,h=[],k=[],l;for(l in d){var a=d[l];if(a.h>a.minH){var c=a.h-a.minH,e=e+c;h.push({cells:a.cells,
maxHR:c,rowH:a.h})}else a.h<a.minH&&(c=a.minH-a.h+4,f+=c,k.push({cells:a.cells,hInc:c,rowH:a.h}))}if(0<f){var m=Math.min(1,f/e),n=Math.min(1,e/f);h.forEach(function(a){a.cells.forEach(function(b){g.setCellHeight(b,a.rowH-a.maxHR*m)})});k.forEach(function(a){a.cells.forEach(function(b){g.setCellHeight(b,a.rowH+a.hInc*n)})})}}}});