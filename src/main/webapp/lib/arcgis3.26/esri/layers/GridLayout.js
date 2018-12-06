// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/GridLayout","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../SpatialReference ../geometry/Extent ../geometry/Polyline ../srUtils".split(" "),function(h,u,q,v,w,A,x,y,z){h=h(null,{declaredClass:"esri.layers._GridLayout",constructor:function(a,b,c,e){this.origin=a;this.cellWidth=b.width;this.cellHeight=b.height;this.mapWidth=c.width;this.mapHeight=c.height;this.srInfo=e},setResolution:function(a){this._resolution=(a.xmax-a.xmin)/this.mapWidth;this.srInfo&&
(a=Math.round(Math.round(2*this.srInfo.valid[1]/this._resolution)/this.cellWidth),this._frameStats=[a,0,a-1])},setMapState:function(a,b,c){this.mapWidth=b;this.mapHeight=c;this.setResolution(a)},getCellCoordinates:function(a){var b=this._resolution,c=this.origin;return{row:Math.floor((c.y-a.y)/(this.cellHeight*b)),col:Math.floor((a.x-c.x)/(this.cellWidth*b))}},normalize:function(a){var b=this._frameStats;if(b){var c=b[0],e=b[1],b=b[2];a<e?(a%=c,a=a<e?a+c:a):a>b&&(a%=c)}return a},intersects:function(a,
b){var c=this.srInfo;return c?q.some(b._getParts(c),function(b){return a.intersects(b.extent)}):a.intersects(b)},getCellExtent:function(a,b){var c=this._resolution,e=this.origin,k=this.cellWidth,l=this.cellHeight;return new x(b*k*c+e.x,e.y-(a+1)*l*c,(b+1)*k*c+e.x,e.y-a*l*c,z.createSpatialReference(e.spatialReference.toJson()))},getLatticeID:function(a){var b=this.getCellCoordinates({x:a.xmin,y:a.ymax}),c=this.getCellCoordinates({x:a.xmax,y:a.ymin});a=b.row;var e=c.row,b=this.normalize(b.col),c=this.normalize(c.col);
return a+"_"+e+"_"+b+"_"+c},sorter:function(a,b){return a<b?-1:1},getCellsInExtent:function(a,b){var c=this.getCellCoordinates({x:a.xmin,y:a.ymax}),e=this.getCellCoordinates({x:a.xmax,y:a.ymin}),k=c.row,l=e.row,c=c.col,e=e.col,h=[],d,m,n,f=[],g=[],r,t,p=[];for(d=k;d<=l;d++)for(m=c;m<=e;m++)n=this.normalize(m),a=this.getCellExtent(d,n),q.some(h,function(a){return a.row===d&&a.col===n})||h.push({row:d,col:n,extent:a,resolution:this._resolution}),b&&(f.push(a.xmin,a.xmax),g.push(a.ymin,a.ymax));c=this.normalize(c);
e=this.normalize(e);f.sort(this.sorter);g.sort(this.sorter);b=f.length;for(d=b-1;0<=d;d--)d<b-1&&f[d]===f[d+1]&&f.splice(d,1);b=g.length;for(d=b-1;0<=d;d--)d<b-1&&g[d]===g[d+1]&&g.splice(d,1);if(f.length&&g.length){a=f[0];m=f[f.length-1];r=g[0];t=g[g.length-1];b=f.length;for(d=0;d<b;d++)p.push([[f[d],t],[f[d],r]]);b=g.length;for(d=0;d<b;d++)p.push([[a,g[d]],[m,g[d]]]);f=new y({paths:p,spatialReference:this.origin.spatialReference.toJson()});h.push({latticeID:k+"_"+l+"_"+c+"_"+e,lattice:f,resolution:this._resolution})}return{minRow:k,
maxRow:l,minCol:c,maxCol:e,cells:h}}});v("extend-esri")&&u.setObject("layers._GridLayout",h,w);return h});