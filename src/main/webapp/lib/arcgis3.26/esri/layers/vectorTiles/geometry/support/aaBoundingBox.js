// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/geometry/support/aaBoundingBox",["require","exports","../Extent","./aaBoundingRect"],function(y,d,u,v){function r(a){void 0===a&&(a=d.ZERO);return[a[0],a[1],a[2],a[3],a[4],a[5]]}function n(a){return a[0]>=a[3]?0:a[3]-a[0]}function p(a){return a[1]>=a[4]?0:a[4]-a[1]}function q(a){return a[2]>=a[5]?0:a[5]-a[2]}function w(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];return a}function t(a){return 6===a.length}Object.defineProperty(d,"__esModule",{value:!0});
d.create=r;d.fromValues=function(a,b,c,d,e,x){return[a,b,c,d,e,x]};d.fromExtent=function(a,b){void 0===b&&(b=r());b[0]=a.xmin;b[1]=a.ymin;b[2]=a.zmin;b[3]=a.xmax;b[4]=a.ymax;b[5]=a.zmax;return b};d.toExtent=function(a,b){return isFinite(a[2])||isFinite(a[5])?new u({xmin:a[0],xmax:a[3],ymin:a[1],ymax:a[4],zmin:a[2],zmax:a[5],spatialReference:b}):new u({xmin:a[0],xmax:a[3],ymin:a[1],ymax:a[4],spatialReference:b})};d.fromMinMax=function(a,b,c){void 0===c&&(c=r());c[0]=a[0];c[1]=a[1];c[2]=a[2];c[3]=b[0];
c[4]=b[1];c[5]=b[2];return c};d.expandPointInPlace=function(a,b){b[0]<a[0]&&(a[0]=b[0]);b[0]>a[3]&&(a[3]=b[0]);b[1]<a[1]&&(a[1]=b[1]);b[1]>a[4]&&(a[4]=b[1]);b[2]<a[2]&&(a[2]=b[2]);b[2]>a[5]&&(a[5]=b[2])};d.expand=function(a,b,c){void 0===c&&(c=a);t(b)?(c[0]=Math.min(a[0],b[0]),c[1]=Math.min(a[1],b[1]),c[2]=Math.min(a[2],b[2]),c[3]=Math.max(a[3],b[3]),c[4]=Math.max(a[4],b[4]),c[5]=Math.max(a[5],b[5])):v.is(b)?(c[0]=Math.min(a[0],b[0]),c[1]=Math.min(a[1],b[1]),c[3]=Math.max(a[3],b[2]),c[4]=Math.max(a[4],
b[3])):2===b.length?(c[0]=Math.min(a[0],b[0]),c[1]=Math.min(a[1],b[1]),c[3]=Math.max(a[3],b[0]),c[4]=Math.max(a[4],b[1])):3===b.length&&(c[0]=Math.min(a[0],b[0]),c[1]=Math.min(a[1],b[1]),c[2]=Math.min(a[2],b[2]),c[3]=Math.max(a[3],b[0]),c[4]=Math.max(a[4],b[1]),c[5]=Math.max(a[5],b[2]));return c};d.expandWithBuffer=function(a,b,c,d,e){void 0===e&&(e=a);var g=a[0],h=a[1],m=a[2],k=a[3],l=a[4];a=a[5];for(var f=0;f<d;f++)g=Math.min(g,b[c+3*f]),h=Math.min(h,b[c+3*f+1]),m=Math.min(m,b[c+3*f+2]),k=Math.max(k,
b[c+3*f]),l=Math.max(l,b[c+3*f+1]),a=Math.max(a,b[c+3*f+2]);e[0]=g;e[1]=h;e[2]=m;e[3]=k;e[4]=l;e[5]=a;return e};d.expandWithNestedArray=function(a,b,c,d){void 0===d&&(d=a);var e=b.length,g=a[0],h=a[1],m=a[2],k=a[3],l=a[4];a=a[5];if(c)for(c=0;c<e;c++){var f=b[c],g=Math.min(g,f[0]),h=Math.min(h,f[1]),m=Math.min(m,f[2]),k=Math.max(k,f[0]),l=Math.max(l,f[1]);a=Math.max(a,f[2])}else for(c=0;c<e;c++)f=b[c],g=Math.min(g,f[0]),h=Math.min(h,f[1]),k=Math.max(k,f[0]),l=Math.max(l,f[1]);d[0]=g;d[1]=h;d[2]=m;
d[3]=k;d[4]=l;d[5]=a;return d};d.allFinite=function(a){for(var b=0;6>b;b++)if(!isFinite(a[b]))return!1;return!0};d.width=n;d.depth=p;d.height=q;d.diameter=function(a){var b=n(a),c=q(a);a=p(a);return Math.sqrt(b*b+c*c+a*a)};d.center=function(a,b){void 0===b&&(b=[0,0,0]);b[0]=a[0]+n(a)/2;b[1]=a[1]+p(a)/2;b[2]=a[2]+q(a)/2;return b};d.size=function(a,b){void 0===b&&(b=[0,0,0]);b[0]=n(a);b[1]=p(a);b[2]=q(a);return b};d.maximumDimension=function(a){return Math.max(n(a),q(a),p(a))};d.containsPoint=function(a,
b){return b[0]>=a[0]&&b[1]>=a[1]&&b[2]>=a[2]&&b[0]<=a[3]&&b[1]<=a[4]&&b[2]<=a[5]};d.containsPointWithMargin=function(a,b,c){return b[0]>=a[0]-c&&b[1]>=a[1]-c&&b[2]>=a[2]-c&&b[0]<=a[3]+c&&b[1]<=a[4]+c&&b[2]<=a[5]+c};d.contains=function(a,b){return b[0]>=a[0]&&b[1]>=a[1]&&b[2]>=a[2]&&b[3]<=a[3]&&b[4]<=a[4]&&b[5]<=a[5]};d.intersects=function(a,b){return Math.max(b[0],a[0])<=Math.min(b[3],a[3])&&Math.max(b[1],a[1])<=Math.min(b[4],a[4])&&Math.max(b[2],a[2])<=Math.min(b[5],a[5])};d.offset=function(a,b,
c,d,e){void 0===e&&(e=a);e[0]=a[0]+b;e[1]=a[1]+c;e[2]=a[2]+d;e[3]=a[3]+b;e[4]=a[4]+c;e[5]=a[5]+d;return e};d.setMin=function(a,b,c){void 0===c&&(c=a);c[0]=b[0];c[1]=b[1];c[2]=b[2];c!==a&&(c[3]=a[3],c[4]=a[4],c[5]=a[5]);return c};d.setMax=function(a,b,c){void 0===c&&(c=a);c[3]=b[0];c[4]=b[1];c[5]=b[2];c!==a&&(c[0]=a[0],c[1]=a[1],c[2]=a[2]);return a};d.set=w;d.empty=function(a){return a?w(a,d.NEGATIVE_INFINITY):r(d.NEGATIVE_INFINITY)};d.toRect=function(a,b){b||(b=v.create());b[0]=a[0];b[1]=a[1];b[2]=
a[3];b[3]=a[4];return b};d.fromRect=function(a,b){a[0]=b[0];a[1]=b[1];a[3]=b[2];a[4]=b[3];return a};d.is=t;d.isPoint=function(a){return 0===n(a)&&0===p(a)&&0===q(a)};d.equals=function(a,b,c){if(null==a||null==b)return a===b;if(!t(a)||!t(b))return!1;if(c)for(var d=0;d<a.length;d++){if(!c(a[d],b[d]))return!1}else for(d=0;d<a.length;d++)if(a[d]!==b[d])return!1;return!0};d.POSITIVE_INFINITY=[-Infinity,-Infinity,-Infinity,Infinity,Infinity,Infinity];d.NEGATIVE_INFINITY=[Infinity,Infinity,Infinity,-Infinity,
-Infinity,-Infinity];d.ZERO=[0,0,0,0,0,0]});