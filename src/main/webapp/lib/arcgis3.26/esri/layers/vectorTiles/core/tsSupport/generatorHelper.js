// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/tsSupport/generatorHelper",[],function(){return function(h,k){function e(a){return function(b){return m([a,b])}}function m(b){if(f)throw new TypeError("Generator is already executing.");for(;c;)try{if(f=1,d&&(a=b[0]&2?d["return"]:b[0]?d["throw"]||((a=d["return"])&&a.call(d),0):d.next)&&!(a=a.call(d,b[1])).done)return a;if(d=0,a)b=[b[0]&2,a.value];switch(b[0]){case 0:case 1:a=b;break;case 4:return c.label++,{value:b[1],done:!1};case 5:c.label++;d=b[1];b=[0];continue;
case 7:b=c.ops.pop();c.trys.pop();continue;default:if(!(a=c.trys,a=0<a.length&&a[a.length-1])&&(6===b[0]||2===b[0])){c=0;continue}if(3===b[0]&&(!a||b[1]>a[0]&&b[1]<a[3]))c.label=b[1];else if(6===b[0]&&c.label<a[1])c.label=a[1],a=b;else if(a&&c.label<a[2])c.label=a[2],c.ops.push(b);else{a[2]&&c.ops.pop();c.trys.pop();continue}}b=k.call(h,c)}catch(l){b=[6,l],d=0}finally{f=a=0}if(b[0]&5)throw b[1];return{value:b[0]?b[1]:void 0,done:!0}}var c={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},
trys:[],ops:[]},f,d,a,g;return g={next:e(0),"throw":e(1),"return":e(2)},"function"===typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g}});