// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/libs/gl-matrix/mat4",["./common"],function(r){var k={scalar:{},SIMD:{},create:function(){var a=new r.ARRAY_TYPE(16);a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a},clone:function(a){var b=new r.ARRAY_TYPE(16);b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15];return b},
copy:function(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];a[6]=b[6];a[7]=b[7];a[8]=b[8];a[9]=b[9];a[10]=b[10];a[11]=b[11];a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15];return a},fromValues:function(a,b,c,d,e,f,h,g,m,l,A,n,k,q,v,t){var p=new r.ARRAY_TYPE(16);p[0]=a;p[1]=b;p[2]=c;p[3]=d;p[4]=e;p[5]=f;p[6]=h;p[7]=g;p[8]=m;p[9]=l;p[10]=A;p[11]=n;p[12]=k;p[13]=q;p[14]=v;p[15]=t;return p},set:function(a,b,c,d,e,f,h,g,m,l,A,n,k,q,v,t,p){a[0]=b;a[1]=c;a[2]=d;a[3]=e;a[4]=f;a[5]=h;a[6]=
g;a[7]=m;a[8]=l;a[9]=A;a[10]=n;a[11]=k;a[12]=q;a[13]=v;a[14]=t;a[15]=p;return a},identity:function(a){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a}};k.scalar.transpose=function(a,b){if(a===b){var c=b[1],d=b[2],e=b[3],f=b[6],h=b[7],g=b[11];a[1]=b[4];a[2]=b[8];a[3]=b[12];a[4]=c;a[6]=b[9];a[7]=b[13];a[8]=d;a[9]=f;a[11]=b[14];a[12]=e;a[13]=h;a[14]=g}else a[0]=b[0],a[1]=b[4],a[2]=b[8],a[3]=b[12],a[4]=b[1],a[5]=b[5],a[6]=
b[9],a[7]=b[13],a[8]=b[2],a[9]=b[6],a[10]=b[10],a[11]=b[14],a[12]=b[3],a[13]=b[7],a[14]=b[11],a[15]=b[15];return a};k.SIMD.transpose=function(a,b){var c,d,e,f,h,g;c=SIMD.Float32x4.load(b,0);d=SIMD.Float32x4.load(b,4);e=SIMD.Float32x4.load(b,8);b=SIMD.Float32x4.load(b,12);f=SIMD.Float32x4.shuffle(c,d,0,1,4,5);h=SIMD.Float32x4.shuffle(e,b,0,1,4,5);g=SIMD.Float32x4.shuffle(f,h,0,2,4,6);f=SIMD.Float32x4.shuffle(f,h,1,3,5,7);SIMD.Float32x4.store(a,0,g);SIMD.Float32x4.store(a,4,f);f=SIMD.Float32x4.shuffle(c,
d,2,3,6,7);h=SIMD.Float32x4.shuffle(e,b,2,3,6,7);c=SIMD.Float32x4.shuffle(f,h,0,2,4,6);d=SIMD.Float32x4.shuffle(f,h,1,3,5,7);SIMD.Float32x4.store(a,8,c);SIMD.Float32x4.store(a,12,d);return a};k.transpose=r.USE_SIMD?k.SIMD.transpose:k.scalar.transpose;k.scalar.invert=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],h=b[4],g=b[5],m=b[6],l=b[7],A=b[8],n=b[9],k=b[10],q=b[11],v=b[12],t=b[13],p=b[14];b=b[15];var r=c*g-d*h,y=c*m-e*h,z=c*l-f*h,w=d*m-e*g,x=d*l-f*g,C=e*l-f*m,D=A*t-n*v,E=A*p-k*v,F=A*b-q*v,G=n*
p-k*t,H=n*b-q*t,I=k*b-q*p,B=r*I-y*H+z*G+w*F-x*E+C*D;if(!B)return null;B=1/B;a[0]=(g*I-m*H+l*G)*B;a[1]=(e*H-d*I-f*G)*B;a[2]=(t*C-p*x+b*w)*B;a[3]=(k*x-n*C-q*w)*B;a[4]=(m*F-h*I-l*E)*B;a[5]=(c*I-e*F+f*E)*B;a[6]=(p*z-v*C-b*y)*B;a[7]=(A*C-k*z+q*y)*B;a[8]=(h*H-g*F+l*D)*B;a[9]=(d*F-c*H-f*D)*B;a[10]=(v*x-t*z+b*r)*B;a[11]=(n*z-A*x-q*r)*B;a[12]=(g*E-h*G-m*D)*B;a[13]=(c*G-d*E+e*D)*B;a[14]=(t*y-v*w-p*r)*B;a[15]=(A*w-n*y+k*r)*B;return a};k.SIMD.invert=function(a,b){var c,d,e,f,h,g,m,l;h=SIMD.Float32x4.load(b,0);
g=SIMD.Float32x4.load(b,4);m=SIMD.Float32x4.load(b,8);l=SIMD.Float32x4.load(b,12);b=SIMD.Float32x4.shuffle(h,g,0,1,4,5);d=SIMD.Float32x4.shuffle(m,l,0,1,4,5);c=SIMD.Float32x4.shuffle(b,d,0,2,4,6);d=SIMD.Float32x4.shuffle(d,b,1,3,5,7);b=SIMD.Float32x4.shuffle(h,g,2,3,6,7);f=SIMD.Float32x4.shuffle(m,l,2,3,6,7);e=SIMD.Float32x4.shuffle(b,f,0,2,4,6);f=SIMD.Float32x4.shuffle(f,b,1,3,5,7);b=SIMD.Float32x4.mul(e,f);b=SIMD.Float32x4.swizzle(b,1,0,3,2);h=SIMD.Float32x4.mul(d,b);g=SIMD.Float32x4.mul(c,b);b=
SIMD.Float32x4.swizzle(b,2,3,0,1);h=SIMD.Float32x4.sub(SIMD.Float32x4.mul(d,b),h);g=SIMD.Float32x4.sub(SIMD.Float32x4.mul(c,b),g);g=SIMD.Float32x4.swizzle(g,2,3,0,1);b=SIMD.Float32x4.mul(d,e);b=SIMD.Float32x4.swizzle(b,1,0,3,2);h=SIMD.Float32x4.add(SIMD.Float32x4.mul(f,b),h);l=SIMD.Float32x4.mul(c,b);b=SIMD.Float32x4.swizzle(b,2,3,0,1);h=SIMD.Float32x4.sub(h,SIMD.Float32x4.mul(f,b));l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(c,b),l);l=SIMD.Float32x4.swizzle(l,2,3,0,1);b=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(d,
2,3,0,1),f);b=SIMD.Float32x4.swizzle(b,1,0,3,2);e=SIMD.Float32x4.swizzle(e,2,3,0,1);h=SIMD.Float32x4.add(SIMD.Float32x4.mul(e,b),h);m=SIMD.Float32x4.mul(c,b);b=SIMD.Float32x4.swizzle(b,2,3,0,1);h=SIMD.Float32x4.sub(h,SIMD.Float32x4.mul(e,b));m=SIMD.Float32x4.sub(SIMD.Float32x4.mul(c,b),m);m=SIMD.Float32x4.swizzle(m,2,3,0,1);b=SIMD.Float32x4.mul(c,d);b=SIMD.Float32x4.swizzle(b,1,0,3,2);m=SIMD.Float32x4.add(SIMD.Float32x4.mul(f,b),m);l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(e,b),l);b=SIMD.Float32x4.swizzle(b,
2,3,0,1);m=SIMD.Float32x4.sub(SIMD.Float32x4.mul(f,b),m);l=SIMD.Float32x4.sub(l,SIMD.Float32x4.mul(e,b));b=SIMD.Float32x4.mul(c,f);b=SIMD.Float32x4.swizzle(b,1,0,3,2);g=SIMD.Float32x4.sub(g,SIMD.Float32x4.mul(e,b));m=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,b),m);b=SIMD.Float32x4.swizzle(b,2,3,0,1);g=SIMD.Float32x4.add(SIMD.Float32x4.mul(e,b),g);m=SIMD.Float32x4.sub(m,SIMD.Float32x4.mul(d,b));b=SIMD.Float32x4.mul(c,e);b=SIMD.Float32x4.swizzle(b,1,0,3,2);g=SIMD.Float32x4.add(SIMD.Float32x4.mul(f,b),
g);l=SIMD.Float32x4.sub(l,SIMD.Float32x4.mul(d,b));b=SIMD.Float32x4.swizzle(b,2,3,0,1);g=SIMD.Float32x4.sub(g,SIMD.Float32x4.mul(f,b));l=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,b),l);c=SIMD.Float32x4.mul(c,h);c=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c,2,3,0,1),c);c=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c,1,0,3,2),c);b=SIMD.Float32x4.reciprocalApproximation(c);c=SIMD.Float32x4.sub(SIMD.Float32x4.add(b,b),SIMD.Float32x4.mul(c,SIMD.Float32x4.mul(b,b)));c=SIMD.Float32x4.swizzle(c,0,0,0,0);if(!c)return null;
SIMD.Float32x4.store(a,0,SIMD.Float32x4.mul(c,h));SIMD.Float32x4.store(a,4,SIMD.Float32x4.mul(c,g));SIMD.Float32x4.store(a,8,SIMD.Float32x4.mul(c,m));SIMD.Float32x4.store(a,12,SIMD.Float32x4.mul(c,l));return a};k.invert=r.USE_SIMD?k.SIMD.invert:k.scalar.invert;k.scalar.adjoint=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],h=b[4],g=b[5],m=b[6],l=b[7],k=b[8],n=b[9],u=b[10],q=b[11],v=b[12],t=b[13],p=b[14];b=b[15];a[0]=g*(u*b-q*p)-n*(m*b-l*p)+t*(m*q-l*u);a[1]=-(d*(u*b-q*p)-n*(e*b-f*p)+t*(e*q-f*u));a[2]=
d*(m*b-l*p)-g*(e*b-f*p)+t*(e*l-f*m);a[3]=-(d*(m*q-l*u)-g*(e*q-f*u)+n*(e*l-f*m));a[4]=-(h*(u*b-q*p)-k*(m*b-l*p)+v*(m*q-l*u));a[5]=c*(u*b-q*p)-k*(e*b-f*p)+v*(e*q-f*u);a[6]=-(c*(m*b-l*p)-h*(e*b-f*p)+v*(e*l-f*m));a[7]=c*(m*q-l*u)-h*(e*q-f*u)+k*(e*l-f*m);a[8]=h*(n*b-q*t)-k*(g*b-l*t)+v*(g*q-l*n);a[9]=-(c*(n*b-q*t)-k*(d*b-f*t)+v*(d*q-f*n));a[10]=c*(g*b-l*t)-h*(d*b-f*t)+v*(d*l-f*g);a[11]=-(c*(g*q-l*n)-h*(d*q-f*n)+k*(d*l-f*g));a[12]=-(h*(n*p-u*t)-k*(g*p-m*t)+v*(g*u-m*n));a[13]=c*(n*p-u*t)-k*(d*p-e*t)+v*(d*
u-e*n);a[14]=-(c*(g*p-m*t)-h*(d*p-e*t)+v*(d*m-e*g));a[15]=c*(g*u-m*n)-h*(d*u-e*n)+k*(d*m-e*g);return a};k.SIMD.adjoint=function(a,b){var c,d,e,f,h,g,m,l;c=SIMD.Float32x4.load(b,0);d=SIMD.Float32x4.load(b,4);e=SIMD.Float32x4.load(b,8);f=SIMD.Float32x4.load(b,12);g=SIMD.Float32x4.shuffle(c,d,0,1,4,5);h=SIMD.Float32x4.shuffle(e,f,0,1,4,5);b=SIMD.Float32x4.shuffle(g,h,0,2,4,6);h=SIMD.Float32x4.shuffle(h,g,1,3,5,7);g=SIMD.Float32x4.shuffle(c,d,2,3,6,7);d=SIMD.Float32x4.shuffle(e,f,2,3,6,7);c=SIMD.Float32x4.shuffle(g,
d,0,2,4,6);d=SIMD.Float32x4.shuffle(d,g,1,3,5,7);g=SIMD.Float32x4.mul(c,d);g=SIMD.Float32x4.swizzle(g,1,0,3,2);e=SIMD.Float32x4.mul(h,g);f=SIMD.Float32x4.mul(b,g);g=SIMD.Float32x4.swizzle(g,2,3,0,1);e=SIMD.Float32x4.sub(SIMD.Float32x4.mul(h,g),e);f=SIMD.Float32x4.sub(SIMD.Float32x4.mul(b,g),f);f=SIMD.Float32x4.swizzle(f,2,3,0,1);g=SIMD.Float32x4.mul(h,c);g=SIMD.Float32x4.swizzle(g,1,0,3,2);e=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,g),e);l=SIMD.Float32x4.mul(b,g);g=SIMD.Float32x4.swizzle(g,2,3,0,1);
e=SIMD.Float32x4.sub(e,SIMD.Float32x4.mul(d,g));l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(b,g),l);l=SIMD.Float32x4.swizzle(l,2,3,0,1);g=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,2,3,0,1),d);g=SIMD.Float32x4.swizzle(g,1,0,3,2);c=SIMD.Float32x4.swizzle(c,2,3,0,1);e=SIMD.Float32x4.add(SIMD.Float32x4.mul(c,g),e);m=SIMD.Float32x4.mul(b,g);g=SIMD.Float32x4.swizzle(g,2,3,0,1);e=SIMD.Float32x4.sub(e,SIMD.Float32x4.mul(c,g));m=SIMD.Float32x4.sub(SIMD.Float32x4.mul(b,g),m);m=SIMD.Float32x4.swizzle(m,2,3,0,
1);g=SIMD.Float32x4.mul(b,h);g=SIMD.Float32x4.swizzle(g,1,0,3,2);m=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,g),m);l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(c,g),l);g=SIMD.Float32x4.swizzle(g,2,3,0,1);m=SIMD.Float32x4.sub(SIMD.Float32x4.mul(d,g),m);l=SIMD.Float32x4.sub(l,SIMD.Float32x4.mul(c,g));g=SIMD.Float32x4.mul(b,d);g=SIMD.Float32x4.swizzle(g,1,0,3,2);f=SIMD.Float32x4.sub(f,SIMD.Float32x4.mul(c,g));m=SIMD.Float32x4.add(SIMD.Float32x4.mul(h,g),m);g=SIMD.Float32x4.swizzle(g,2,3,0,1);f=SIMD.Float32x4.add(SIMD.Float32x4.mul(c,
g),f);m=SIMD.Float32x4.sub(m,SIMD.Float32x4.mul(h,g));g=SIMD.Float32x4.mul(b,c);g=SIMD.Float32x4.swizzle(g,1,0,3,2);f=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,g),f);l=SIMD.Float32x4.sub(l,SIMD.Float32x4.mul(h,g));g=SIMD.Float32x4.swizzle(g,2,3,0,1);f=SIMD.Float32x4.sub(f,SIMD.Float32x4.mul(d,g));l=SIMD.Float32x4.add(SIMD.Float32x4.mul(h,g),l);SIMD.Float32x4.store(a,0,e);SIMD.Float32x4.store(a,4,f);SIMD.Float32x4.store(a,8,m);SIMD.Float32x4.store(a,12,l);return a};k.adjoint=r.USE_SIMD?k.SIMD.adjoint:
k.scalar.adjoint;k.determinant=function(a){var b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],h=a[5],g=a[6],m=a[7],l=a[8],k=a[9],n=a[10],u=a[11],q=a[12],v=a[13],t=a[14];a=a[15];return(b*h-c*f)*(n*a-u*t)-(b*g-d*f)*(k*a-u*v)+(b*m-e*f)*(k*t-n*v)+(c*g-d*h)*(l*a-u*q)-(c*m-e*h)*(l*t-n*q)+(d*m-e*g)*(l*v-k*q)};k.SIMD.multiply=function(a,b,c){var d=SIMD.Float32x4.load(b,0),e=SIMD.Float32x4.load(b,4),f=SIMD.Float32x4.load(b,8);b=SIMD.Float32x4.load(b,12);var h=SIMD.Float32x4.load(c,0),h=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,
0,0,0,0),d),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,1,1,1,1),e),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,2,2,2,2),f),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,3,3,3,3),b))));SIMD.Float32x4.store(a,0,h);h=SIMD.Float32x4.load(c,4);h=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,0,0,0,0),d),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,1,1,1,1),e),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,2,2,2,2),f),
SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,3,3,3,3),b))));SIMD.Float32x4.store(a,4,h);h=SIMD.Float32x4.load(c,8);h=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,0,0,0,0),d),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,1,1,1,1),e),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,2,2,2,2),f),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h,3,3,3,3),b))));SIMD.Float32x4.store(a,8,h);c=SIMD.Float32x4.load(c,12);d=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,
0,0,0,0),d),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,1,1,1,1),e),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,2,2,2,2),f),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,3,3,3,3),b))));SIMD.Float32x4.store(a,12,d);return a};k.scalar.multiply=function(a,b,c){var d=b[0],e=b[1],f=b[2],h=b[3],g=b[4],m=b[5],l=b[6],k=b[7],n=b[8],u=b[9],q=b[10],v=b[11],t=b[12],p=b[13],r=b[14];b=b[15];var y=c[0],z=c[1],w=c[2],x=c[3];a[0]=y*d+z*g+w*n+x*t;a[1]=y*e+z*m+w*u+x*p;a[2]=y*f+z*
l+w*q+x*r;a[3]=y*h+z*k+w*v+x*b;y=c[4];z=c[5];w=c[6];x=c[7];a[4]=y*d+z*g+w*n+x*t;a[5]=y*e+z*m+w*u+x*p;a[6]=y*f+z*l+w*q+x*r;a[7]=y*h+z*k+w*v+x*b;y=c[8];z=c[9];w=c[10];x=c[11];a[8]=y*d+z*g+w*n+x*t;a[9]=y*e+z*m+w*u+x*p;a[10]=y*f+z*l+w*q+x*r;a[11]=y*h+z*k+w*v+x*b;y=c[12];z=c[13];w=c[14];x=c[15];a[12]=y*d+z*g+w*n+x*t;a[13]=y*e+z*m+w*u+x*p;a[14]=y*f+z*l+w*q+x*r;a[15]=y*h+z*k+w*v+x*b;return a};k.multiply=r.USE_SIMD?k.SIMD.multiply:k.scalar.multiply;k.mul=k.multiply;k.scalar.translate=function(a,b,c){var d=
c[0],e=c[1];c=c[2];var f,h,g,m,l,k,n,u,q,v,t,p;b===a?(a[12]=b[0]*d+b[4]*e+b[8]*c+b[12],a[13]=b[1]*d+b[5]*e+b[9]*c+b[13],a[14]=b[2]*d+b[6]*e+b[10]*c+b[14],a[15]=b[3]*d+b[7]*e+b[11]*c+b[15]):(f=b[0],h=b[1],g=b[2],m=b[3],l=b[4],k=b[5],n=b[6],u=b[7],q=b[8],v=b[9],t=b[10],p=b[11],a[0]=f,a[1]=h,a[2]=g,a[3]=m,a[4]=l,a[5]=k,a[6]=n,a[7]=u,a[8]=q,a[9]=v,a[10]=t,a[11]=p,a[12]=f*d+l*e+q*c+b[12],a[13]=h*d+k*e+v*c+b[13],a[14]=g*d+n*e+t*c+b[14],a[15]=m*d+u*e+p*c+b[15]);return a};k.SIMD.translate=function(a,b,c){var d=
SIMD.Float32x4.load(b,0),e=SIMD.Float32x4.load(b,4),f=SIMD.Float32x4.load(b,8),h=SIMD.Float32x4.load(b,12);c=SIMD.Float32x4(c[0],c[1],c[2],0);b!==a&&(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],a[4]=b[4],a[5]=b[5],a[6]=b[6],a[7]=b[7],a[8]=b[8],a[9]=b[9],a[10]=b[10],a[11]=b[11]);d=SIMD.Float32x4.mul(d,SIMD.Float32x4.swizzle(c,0,0,0,0));e=SIMD.Float32x4.mul(e,SIMD.Float32x4.swizzle(c,1,1,1,1));f=SIMD.Float32x4.mul(f,SIMD.Float32x4.swizzle(c,2,2,2,2));b=SIMD.Float32x4.add(d,SIMD.Float32x4.add(e,SIMD.Float32x4.add(f,
h)));SIMD.Float32x4.store(a,12,b);return a};k.translate=r.USE_SIMD?k.SIMD.translate:k.scalar.translate;k.scalar.scale=function(a,b,c){var d=c[0],e=c[1];c=c[2];a[0]=b[0]*d;a[1]=b[1]*d;a[2]=b[2]*d;a[3]=b[3]*d;a[4]=b[4]*e;a[5]=b[5]*e;a[6]=b[6]*e;a[7]=b[7]*e;a[8]=b[8]*c;a[9]=b[9]*c;a[10]=b[10]*c;a[11]=b[11]*c;a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15];return a};k.SIMD.scale=function(a,b,c){var d;c=SIMD.Float32x4(c[0],c[1],c[2],0);d=SIMD.Float32x4.load(b,0);SIMD.Float32x4.store(a,0,SIMD.Float32x4.mul(d,
SIMD.Float32x4.swizzle(c,0,0,0,0)));d=SIMD.Float32x4.load(b,4);SIMD.Float32x4.store(a,4,SIMD.Float32x4.mul(d,SIMD.Float32x4.swizzle(c,1,1,1,1)));d=SIMD.Float32x4.load(b,8);SIMD.Float32x4.store(a,8,SIMD.Float32x4.mul(d,SIMD.Float32x4.swizzle(c,2,2,2,2)));a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15];return a};k.scale=r.USE_SIMD?k.SIMD.scale:k.scalar.scale;k.rotate=function(a,b,c,d){var e=d[0],f=d[1];d=d[2];var h=Math.sqrt(e*e+f*f+d*d),g,m,l,k,n,u,q,v,t,p,J,y,z,w,x,C,D,E,F,G;if(Math.abs(h)<r.EPSILON)return null;
h=1/h;e*=h;f*=h;d*=h;g=Math.sin(c);m=Math.cos(c);l=1-m;c=b[0];h=b[1];k=b[2];n=b[3];u=b[4];q=b[5];v=b[6];t=b[7];p=b[8];J=b[9];y=b[10];z=b[11];w=e*e*l+m;x=f*e*l+d*g;C=d*e*l-f*g;D=e*f*l-d*g;E=f*f*l+m;F=d*f*l+e*g;G=e*d*l+f*g;e=f*d*l-e*g;f=d*d*l+m;a[0]=c*w+u*x+p*C;a[1]=h*w+q*x+J*C;a[2]=k*w+v*x+y*C;a[3]=n*w+t*x+z*C;a[4]=c*D+u*E+p*F;a[5]=h*D+q*E+J*F;a[6]=k*D+v*E+y*F;a[7]=n*D+t*E+z*F;a[8]=c*G+u*e+p*f;a[9]=h*G+q*e+J*f;a[10]=k*G+v*e+y*f;a[11]=n*G+t*e+z*f;b!==a&&(a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);
return a};k.scalar.rotateX=function(a,b,c){var d=Math.sin(c);c=Math.cos(c);var e=b[4],f=b[5],h=b[6],g=b[7],m=b[8],l=b[9],k=b[10],n=b[11];b!==a&&(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);a[4]=e*c+m*d;a[5]=f*c+l*d;a[6]=h*c+k*d;a[7]=g*c+n*d;a[8]=m*c-e*d;a[9]=l*c-f*d;a[10]=k*c-h*d;a[11]=n*c-g*d;return a};k.SIMD.rotateX=function(a,b,c){var d=SIMD.Float32x4.splat(Math.sin(c));c=SIMD.Float32x4.splat(Math.cos(c));b!==a&&(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],
a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);var e=SIMD.Float32x4.load(b,4);b=SIMD.Float32x4.load(b,8);SIMD.Float32x4.store(a,4,SIMD.Float32x4.add(SIMD.Float32x4.mul(e,c),SIMD.Float32x4.mul(b,d)));SIMD.Float32x4.store(a,8,SIMD.Float32x4.sub(SIMD.Float32x4.mul(b,c),SIMD.Float32x4.mul(e,d)));return a};k.rotateX=r.USE_SIMD?k.SIMD.rotateX:k.scalar.rotateX;k.scalar.rotateY=function(a,b,c){var d=Math.sin(c);c=Math.cos(c);var e=b[0],f=b[1],h=b[2],g=b[3],m=b[8],l=b[9],k=b[10],n=b[11];b!==a&&(a[4]=b[4],
a[5]=b[5],a[6]=b[6],a[7]=b[7],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);a[0]=e*c-m*d;a[1]=f*c-l*d;a[2]=h*c-k*d;a[3]=g*c-n*d;a[8]=e*d+m*c;a[9]=f*d+l*c;a[10]=h*d+k*c;a[11]=g*d+n*c;return a};k.SIMD.rotateY=function(a,b,c){var d=SIMD.Float32x4.splat(Math.sin(c));c=SIMD.Float32x4.splat(Math.cos(c));b!==a&&(a[4]=b[4],a[5]=b[5],a[6]=b[6],a[7]=b[7],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);var e=SIMD.Float32x4.load(b,0);b=SIMD.Float32x4.load(b,8);SIMD.Float32x4.store(a,0,SIMD.Float32x4.sub(SIMD.Float32x4.mul(e,
c),SIMD.Float32x4.mul(b,d)));SIMD.Float32x4.store(a,8,SIMD.Float32x4.add(SIMD.Float32x4.mul(e,d),SIMD.Float32x4.mul(b,c)));return a};k.rotateY=r.USE_SIMD?k.SIMD.rotateY:k.scalar.rotateY;k.scalar.rotateZ=function(a,b,c){var d=Math.sin(c);c=Math.cos(c);var e=b[0],f=b[1],h=b[2],g=b[3],m=b[4],l=b[5],k=b[6],n=b[7];b!==a&&(a[8]=b[8],a[9]=b[9],a[10]=b[10],a[11]=b[11],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);a[0]=e*c+m*d;a[1]=f*c+l*d;a[2]=h*c+k*d;a[3]=g*c+n*d;a[4]=m*c-e*d;a[5]=l*c-f*d;a[6]=k*c-h*
d;a[7]=n*c-g*d;return a};k.SIMD.rotateZ=function(a,b,c){var d=SIMD.Float32x4.splat(Math.sin(c));c=SIMD.Float32x4.splat(Math.cos(c));b!==a&&(a[8]=b[8],a[9]=b[9],a[10]=b[10],a[11]=b[11],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);var e=SIMD.Float32x4.load(b,0);b=SIMD.Float32x4.load(b,4);SIMD.Float32x4.store(a,0,SIMD.Float32x4.add(SIMD.Float32x4.mul(e,c),SIMD.Float32x4.mul(b,d)));SIMD.Float32x4.store(a,4,SIMD.Float32x4.sub(SIMD.Float32x4.mul(b,c),SIMD.Float32x4.mul(e,d)));return a};k.rotateZ=r.USE_SIMD?
k.SIMD.rotateZ:k.scalar.rotateZ;k.fromTranslation=function(a,b){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=b[0];a[13]=b[1];a[14]=b[2];a[15]=1;return a};k.fromScaling=function(a,b){a[0]=b[0];a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=b[1];a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=b[2];a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromRotation=function(a,b,c){var d=c[0],e=c[1];c=c[2];var f=Math.sqrt(d*d+e*e+c*c),h;if(Math.abs(f)<r.EPSILON)return null;f=1/f;d*=f;
e*=f;c*=f;f=Math.sin(b);b=Math.cos(b);h=1-b;a[0]=d*d*h+b;a[1]=e*d*h+c*f;a[2]=c*d*h-e*f;a[3]=0;a[4]=d*e*h-c*f;a[5]=e*e*h+b;a[6]=c*e*h+d*f;a[7]=0;a[8]=d*c*h+e*f;a[9]=e*c*h-d*f;a[10]=c*c*h+b;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromXRotation=function(a,b){var c=Math.sin(b);b=Math.cos(b);a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=b;a[6]=c;a[7]=0;a[8]=0;a[9]=-c;a[10]=b;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromYRotation=function(a,b){var c=Math.sin(b);b=Math.cos(b);a[0]=b;a[1]=
0;a[2]=-c;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=c;a[9]=0;a[10]=b;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromZRotation=function(a,b){var c=Math.sin(b);b=Math.cos(b);a[0]=b;a[1]=c;a[2]=0;a[3]=0;a[4]=-c;a[5]=b;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromRotationTranslation=function(a,b,c){var d=b[0],e=b[1],f=b[2],h=b[3],g=d+d,m=e+e,l=f+f;b=d*g;var k=d*m,d=d*l,n=e*m,e=e*l,f=f*l,g=h*g,m=h*m,h=h*l;a[0]=1-(n+f);a[1]=k+h;a[2]=d-m;a[3]=0;a[4]=
k-h;a[5]=1-(b+f);a[6]=e+g;a[7]=0;a[8]=d+m;a[9]=e-g;a[10]=1-(b+n);a[11]=0;a[12]=c[0];a[13]=c[1];a[14]=c[2];a[15]=1;return a};k.getTranslation=function(a,b){a[0]=b[12];a[1]=b[13];a[2]=b[14];return a};k.getRotation=function(a,b){var c=b[0]+b[5]+b[10],d=0;0<c?(d=2*Math.sqrt(c+1),a[3]=.25*d,a[0]=(b[6]-b[9])/d,a[1]=(b[8]-b[2])/d,a[2]=(b[1]-b[4])/d):b[0]>b[5]&b[0]>b[10]?(d=2*Math.sqrt(1+b[0]-b[5]-b[10]),a[3]=(b[6]-b[9])/d,a[0]=.25*d,a[1]=(b[1]+b[4])/d,a[2]=(b[8]+b[2])/d):b[5]>b[10]?(d=2*Math.sqrt(1+b[5]-
b[0]-b[10]),a[3]=(b[8]-b[2])/d,a[0]=(b[1]+b[4])/d,a[1]=.25*d,a[2]=(b[6]+b[9])/d):(d=2*Math.sqrt(1+b[10]-b[0]-b[5]),a[3]=(b[1]-b[4])/d,a[0]=(b[8]+b[2])/d,a[1]=(b[6]+b[9])/d,a[2]=.25*d);return a};k.fromRotationTranslationScale=function(a,b,c,d){var e=b[0],f=b[1],h=b[2],g=b[3],m=e+e,l=f+f,k=h+h;b=e*m;var n=e*l,e=e*k,u=f*l,f=f*k,h=h*k,m=g*m,l=g*l,g=g*k,k=d[0],q=d[1];d=d[2];a[0]=(1-(u+h))*k;a[1]=(n+g)*k;a[2]=(e-l)*k;a[3]=0;a[4]=(n-g)*q;a[5]=(1-(b+h))*q;a[6]=(f+m)*q;a[7]=0;a[8]=(e+l)*d;a[9]=(f-m)*d;a[10]=
(1-(b+u))*d;a[11]=0;a[12]=c[0];a[13]=c[1];a[14]=c[2];a[15]=1;return a};k.fromRotationTranslationScaleOrigin=function(a,b,c,d,e){var f=b[0],h=b[1],g=b[2],k=b[3],l=f+f,r=h+h,n=g+g;b=f*l;var u=f*r,f=f*n,q=h*r,h=h*n,g=g*n,l=k*l,r=k*r,k=k*n,n=d[0],v=d[1];d=d[2];var t=e[0],p=e[1];e=e[2];a[0]=(1-(q+g))*n;a[1]=(u+k)*n;a[2]=(f-r)*n;a[3]=0;a[4]=(u-k)*v;a[5]=(1-(b+g))*v;a[6]=(h+l)*v;a[7]=0;a[8]=(f+r)*d;a[9]=(h-l)*d;a[10]=(1-(b+q))*d;a[11]=0;a[12]=c[0]+t-(a[0]*t+a[4]*p+a[8]*e);a[13]=c[1]+p-(a[1]*t+a[5]*p+a[9]*
e);a[14]=c[2]+e-(a[2]*t+a[6]*p+a[10]*e);a[15]=1;return a};k.fromQuat=function(a,b){var c=b[0],d=b[1],e=b[2];b=b[3];var f=c+c,h=d+d,g=e+e,c=c*f,k=d*f,d=d*h,l=e*f,r=e*h,e=e*g,f=b*f,h=b*h;b*=g;a[0]=1-d-e;a[1]=k+b;a[2]=l-h;a[3]=0;a[4]=k-b;a[5]=1-c-e;a[6]=r+f;a[7]=0;a[8]=l+h;a[9]=r-f;a[10]=1-c-d;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.frustum=function(a,b,c,d,e,f,h){var g=1/(c-b),k=1/(e-d),l=1/(f-h);a[0]=2*f*g;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=2*f*k;a[6]=0;a[7]=0;a[8]=(c+b)*g;a[9]=(e+d)*k;a[10]=
(h+f)*l;a[11]=-1;a[12]=0;a[13]=0;a[14]=h*f*2*l;a[15]=0;return a};k.perspective=function(a,b,c,d,e){b=1/Math.tan(b/2);var f=1/(d-e);a[0]=b/c;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=b;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=(e+d)*f;a[11]=-1;a[12]=0;a[13]=0;a[14]=2*e*d*f;a[15]=0;return a};k.perspectiveFromFieldOfView=function(a,b,c,d){var e=Math.tan(b.upDegrees*Math.PI/180),f=Math.tan(b.downDegrees*Math.PI/180),h=Math.tan(b.leftDegrees*Math.PI/180);b=Math.tan(b.rightDegrees*Math.PI/180);var g=2/(h+b),k=2/(e+f);a[0]=
g;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=k;a[6]=0;a[7]=0;a[8]=-((h-b)*g*.5);a[9]=(e-f)*k*.5;a[10]=d/(c-d);a[11]=-1;a[12]=0;a[13]=0;a[14]=d*c/(c-d);a[15]=0;return a};k.ortho=function(a,b,c,d,e,f,h){var g=1/(b-c),k=1/(d-e),l=1/(f-h);a[0]=-2*g;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=-2*k;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=2*l;a[11]=0;a[12]=(b+c)*g;a[13]=(e+d)*k;a[14]=(h+f)*l;a[15]=1;return a};k.lookAt=function(a,b,c,d){var e,f,h,g,m,l,A,n,u=b[0],q=b[1];b=b[2];h=d[0];g=d[1];f=d[2];A=c[0];d=c[1];e=c[2];if(Math.abs(u-
A)<r.EPSILON&&Math.abs(q-d)<r.EPSILON&&Math.abs(b-e)<r.EPSILON)return k.identity(a);c=u-A;d=q-d;A=b-e;n=1/Math.sqrt(c*c+d*d+A*A);c*=n;d*=n;A*=n;e=g*A-f*d;f=f*c-h*A;h=h*d-g*c;(n=Math.sqrt(e*e+f*f+h*h))?(n=1/n,e*=n,f*=n,h*=n):h=f=e=0;g=d*h-A*f;m=A*e-c*h;l=c*f-d*e;(n=Math.sqrt(g*g+m*m+l*l))?(n=1/n,g*=n,m*=n,l*=n):l=m=g=0;a[0]=e;a[1]=g;a[2]=c;a[3]=0;a[4]=f;a[5]=m;a[6]=d;a[7]=0;a[8]=h;a[9]=l;a[10]=A;a[11]=0;a[12]=-(e*u+f*q+h*b);a[13]=-(g*u+m*q+l*b);a[14]=-(c*u+d*q+A*b);a[15]=1;return a};k.str=function(a){return"mat4("+
a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+")"};k.frob=function(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2)+Math.pow(a[4],2)+Math.pow(a[5],2)+Math.pow(a[6],2)+Math.pow(a[7],2)+Math.pow(a[8],2)+Math.pow(a[9],2)+Math.pow(a[10],2)+Math.pow(a[11],2)+Math.pow(a[12],2)+Math.pow(a[13],2)+Math.pow(a[14],2)+Math.pow(a[15],2))};k.add=function(a,b,
c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];a[2]=b[2]+c[2];a[3]=b[3]+c[3];a[4]=b[4]+c[4];a[5]=b[5]+c[5];a[6]=b[6]+c[6];a[7]=b[7]+c[7];a[8]=b[8]+c[8];a[9]=b[9]+c[9];a[10]=b[10]+c[10];a[11]=b[11]+c[11];a[12]=b[12]+c[12];a[13]=b[13]+c[13];a[14]=b[14]+c[14];a[15]=b[15]+c[15];return a};k.subtract=function(a,b,c){a[0]=b[0]-c[0];a[1]=b[1]-c[1];a[2]=b[2]-c[2];a[3]=b[3]-c[3];a[4]=b[4]-c[4];a[5]=b[5]-c[5];a[6]=b[6]-c[6];a[7]=b[7]-c[7];a[8]=b[8]-c[8];a[9]=b[9]-c[9];a[10]=b[10]-c[10];a[11]=b[11]-c[11];a[12]=b[12]-c[12];
a[13]=b[13]-c[13];a[14]=b[14]-c[14];a[15]=b[15]-c[15];return a};k.sub=k.subtract;k.multiplyScalar=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;a[2]=b[2]*c;a[3]=b[3]*c;a[4]=b[4]*c;a[5]=b[5]*c;a[6]=b[6]*c;a[7]=b[7]*c;a[8]=b[8]*c;a[9]=b[9]*c;a[10]=b[10]*c;a[11]=b[11]*c;a[12]=b[12]*c;a[13]=b[13]*c;a[14]=b[14]*c;a[15]=b[15]*c;return a};k.multiplyScalarAndAdd=function(a,b,c,d){a[0]=b[0]+c[0]*d;a[1]=b[1]+c[1]*d;a[2]=b[2]+c[2]*d;a[3]=b[3]+c[3]*d;a[4]=b[4]+c[4]*d;a[5]=b[5]+c[5]*d;a[6]=b[6]+c[6]*d;a[7]=b[7]+c[7]*
d;a[8]=b[8]+c[8]*d;a[9]=b[9]+c[9]*d;a[10]=b[10]+c[10]*d;a[11]=b[11]+c[11]*d;a[12]=b[12]+c[12]*d;a[13]=b[13]+c[13]*d;a[14]=b[14]+c[14]*d;a[15]=b[15]+c[15]*d;return a};k.exactEquals=function(a,b){return a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]&&a[3]===b[3]&&a[4]===b[4]&&a[5]===b[5]&&a[6]===b[6]&&a[7]===b[7]&&a[8]===b[8]&&a[9]===b[9]&&a[10]===b[10]&&a[11]===b[11]&&a[12]===b[12]&&a[13]===b[13]&&a[14]===b[14]&&a[15]===b[15]};k.equals=function(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],h=a[4],g=a[5],k=a[6],l=a[7],
A=a[8],n=a[9],u=a[10],q=a[11],v=a[12],t=a[13],p=a[14];a=a[15];var J=b[0],y=b[1],z=b[2],w=b[3],x=b[4],C=b[5],D=b[6],E=b[7],F=b[8],G=b[9],H=b[10],I=b[11],B=b[12],K=b[13],L=b[14];b=b[15];return Math.abs(c-J)<=r.EPSILON*Math.max(1,Math.abs(c),Math.abs(J))&&Math.abs(d-y)<=r.EPSILON*Math.max(1,Math.abs(d),Math.abs(y))&&Math.abs(e-z)<=r.EPSILON*Math.max(1,Math.abs(e),Math.abs(z))&&Math.abs(f-w)<=r.EPSILON*Math.max(1,Math.abs(f),Math.abs(w))&&Math.abs(h-x)<=r.EPSILON*Math.max(1,Math.abs(h),Math.abs(x))&&
Math.abs(g-C)<=r.EPSILON*Math.max(1,Math.abs(g),Math.abs(C))&&Math.abs(k-D)<=r.EPSILON*Math.max(1,Math.abs(k),Math.abs(D))&&Math.abs(l-E)<=r.EPSILON*Math.max(1,Math.abs(l),Math.abs(E))&&Math.abs(A-F)<=r.EPSILON*Math.max(1,Math.abs(A),Math.abs(F))&&Math.abs(n-G)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(G))&&Math.abs(u-H)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(H))&&Math.abs(q-I)<=r.EPSILON*Math.max(1,Math.abs(q),Math.abs(I))&&Math.abs(v-B)<=r.EPSILON*Math.max(1,Math.abs(v),Math.abs(B))&&Math.abs(t-
K)<=r.EPSILON*Math.max(1,Math.abs(t),Math.abs(K))&&Math.abs(p-L)<=r.EPSILON*Math.max(1,Math.abs(p),Math.abs(L))&&Math.abs(a-b)<=r.EPSILON*Math.max(1,Math.abs(a),Math.abs(b))};return k});