// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/3d/webgl-engine/lib/gl-matrix",[],function(){var J={};(function(A,x){x(A,!0);x(A,!1)})(J,function(A,x){var K={};(function(){if("undefined"!=typeof Float32Array){var a=new Float32Array(1),b=new Int32Array(a.buffer);K.invsqrt=function(c){a[0]=c;b[0]=1597463007-(b[0]>>1);var d=a[0];return d*(1.5-.5*c*d*d)}}else K.invsqrt=function(a){return 1/Math.sqrt(a)}})();var u=Array;"undefined"!=typeof Float32Array&&(u=x?Float32Array:Array);var r={create:function(a){var b=new u(3);
a?(b[0]=a[0],b[1]=a[1],b[2]=a[2]):b[0]=b[1]=b[2]=0;return b},createFrom:function(a,b,c){var d=new u(3);d[0]=a;d[1]=b;d[2]=c;return d},set:function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];return b},set3:function(a,b,c,d){d[0]=a;d[1]=b;d[2]=c;return d},add:function(a,b,c){if(!c||a===c)return a[0]+=b[0],a[1]+=b[1],a[2]+=b[2],a;c[0]=a[0]+b[0];c[1]=a[1]+b[1];c[2]=a[2]+b[2];return c},subtract:function(a,b,c){if(!c||a===c)return a[0]-=b[0],a[1]-=b[1],a[2]-=b[2],a;c[0]=a[0]-b[0];c[1]=a[1]-b[1];c[2]=a[2]-b[2];
return c},multiply:function(a,b,c){if(!c||a===c)return a[0]*=b[0],a[1]*=b[1],a[2]*=b[2],a;c[0]=a[0]*b[0];c[1]=a[1]*b[1];c[2]=a[2]*b[2];return c},max:function(a,b,c){c[0]=Math.max(a[0],b[0]);c[1]=Math.max(a[1],b[1]);c[2]=Math.max(a[2],b[2]);return c},min:function(a,b,c){c[0]=Math.min(a[0],b[0]);c[1]=Math.min(a[1],b[1]);c[2]=Math.min(a[2],b[2]);return c},negate:function(a,b){b||(b=a);b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];return b},scale:function(a,b,c){if(!c||a===c)return a[0]*=b,a[1]*=b,a[2]*=b,a;c[0]=
a[0]*b;c[1]=a[1]*b;c[2]=a[2]*b;return c},normalize:function(a,b){b||(b=a);var c=a[0],d=a[1];a=a[2];var e=Math.sqrt(c*c+d*d+a*a);if(!e)return b[0]=0,b[1]=0,b[2]=0,b;if(1===e)return b[0]=c,b[1]=d,b[2]=a,b;e=1/e;b[0]=c*e;b[1]=d*e;b[2]=a*e;return b},cross:function(a,b,c){c||(c=a);var d=a[0],e=a[1];a=a[2];var f=b[0],g=b[1];b=b[2];c[0]=e*b-a*g;c[1]=a*f-d*b;c[2]=d*g-e*f;return c},length:function(a){var b=a[0],c=a[1];a=a[2];return Math.sqrt(b*b+c*c+a*a)},length2:function(a){var b=a[0],c=a[1];a=a[2];return b*
b+c*c+a*a},dot:function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]},direction:function(a,b,c){c||(c=a);var d=a[0]-b[0],e=a[1]-b[1];a=a[2]-b[2];b=Math.sqrt(d*d+e*e+a*a);if(!b)return c[0]=0,c[1]=0,c[2]=0,c;b=1/b;c[0]=d*b;c[1]=e*b;c[2]=a*b;return c},lerp:function(a,b,c,d){d||(d=a);d[0]=a[0]+c*(b[0]-a[0]);d[1]=a[1]+c*(b[1]-a[1]);d[2]=a[2]+c*(b[2]-a[2]);return d},dist:function(a,b){var c=b[0]-a[0],d=b[1]-a[1];a=b[2]-a[2];return Math.sqrt(c*c+d*d+a*a)},dist2:function(a,b){var c=b[0]-a[0],d=b[1]-a[1];a=b[2]-
a[2];return c*c+d*d+a*a}},O=null,y=new u(4);r.unproject=function(a,b,c,d,e){e||(e=a);O||(O=w.create());var f=O;y[0]=2*(a[0]-d[0])/d[2]-1;y[1]=2*(a[1]-d[1])/d[3]-1;y[2]=2*a[2]-1;y[3]=1;w.multiply(c,b,f);if(!w.inverse(f))return null;w.multiplyVec4(f,y);if(0===y[3])return null;e[0]=y[0]/y[3];e[1]=y[1]/y[3];e[2]=y[2]/y[3];return e};var J=r.createFrom(1,0,0),S=r.createFrom(0,1,0),T=r.createFrom(0,0,1);r.rotationTo=function(a,b,c){c||(c=h.create());var d=r.dot(a,b),e=r.create();if(1<=d)h.set(U,c);else if(-.999999>
d)r.cross(J,a,e),1E-6>e.length&&r.cross(S,a,e),1E-6>e.length&&r.cross(T,a,e),r.normalize(e),h.fromAxisAngle(e,Math.PI,c);else{var d=Math.sqrt(2*(1+d)),f=1/d;r.cross(a,b,e);c[0]=e[0]*f;c[1]=e[1]*f;c[2]=e[2]*f;c[3]=.5*d;h.normalize(c)}1<c[3]?c[3]=1:-1>c[3]&&(c[3]=-1);return c};var P=r.create(),Q=r.create();r.project=function(a,b,c,d){d||(d=a);r.direction(b,c,P);r.subtract(a,b,Q);a=r.dot(P,Q);r.scale(P,a,d);r.add(d,b,d)};r.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+"]"};var H={create:function(a){var b=
new u(9);a?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8]):b[0]=b[1]=b[2]=b[3]=b[4]=b[5]=b[6]=b[7]=b[8]=0;return b},createFrom:function(a,b,c,d,e,f,g,k,m){var l=new u(9);l[0]=a;l[1]=b;l[2]=c;l[3]=d;l[4]=e;l[5]=f;l[6]=g;l[7]=k;l[8]=m;return l},determinant:function(a){var b=a[3],c=a[4],d=a[5],e=a[6],f=a[7],g=a[8];return a[0]*(g*c-d*f)+a[1]*(-g*b+d*e)+a[2]*(f*b-c*e)},inverse:function(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],k=a[5],m=a[6],l=a[7];a=a[8];var q=
a*g-k*l,p=-a*f+k*m,G=l*f-g*m,n=c*q+d*p+e*G;if(!n)return null;n=1/n;b||(b=H.create());b[0]=q*n;b[1]=(-a*d+e*l)*n;b[2]=(k*d-e*g)*n;b[3]=p*n;b[4]=(a*c-e*m)*n;b[5]=(-k*c+e*f)*n;b[6]=G*n;b[7]=(-l*c+d*m)*n;b[8]=(g*c-d*f)*n;return b},multiply:function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2],g=a[3],k=a[4],m=a[5],l=a[6],q=a[7];a=a[8];var p=b[0],G=b[1],n=b[2],h=b[3],v=b[4],t=b[5],r=b[6],L=b[7];b=b[8];c[0]=p*d+G*g+n*l;c[1]=p*e+G*k+n*q;c[2]=p*f+G*m+n*a;c[3]=h*d+v*g+t*l;c[4]=h*e+v*k+t*q;c[5]=h*f+v*m+t*a;c[6]=
r*d+L*g+b*l;c[7]=r*e+L*k+b*q;c[8]=r*f+L*m+b*a;return c},multiplyVec2:function(a,b,c){c||(c=b);var d=b[0];b=b[1];c[0]=d*a[0]+b*a[3]+a[6];c[1]=d*a[1]+b*a[4]+a[7];return c},multiplyVec3:function(a,b,c){c||(c=b);var d=b[0],e=b[1];b=b[2];c[0]=d*a[0]+e*a[3]+b*a[6];c[1]=d*a[1]+e*a[4]+b*a[7];c[2]=d*a[2]+e*a[5]+b*a[8];return c},set:function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];return b},identity:function(a){a||(a=H.create());a[0]=1;a[1]=0;a[2]=0;a[3]=
0;a[4]=1;a[5]=0;a[6]=0;a[7]=0;a[8]=1;return a},transpose:function(a,b){if(!b||a===b){b=a[1];var c=a[2],d=a[5];a[1]=a[3];a[2]=a[6];a[3]=b;a[5]=a[7];a[6]=c;a[7]=d;return a}b[0]=a[0];b[1]=a[3];b[2]=a[6];b[3]=a[1];b[4]=a[4];b[5]=a[7];b[6]=a[2];b[7]=a[5];b[8]=a[8];return b},toMat4:function(a,b){b||(b=w.create());b[15]=1;b[14]=0;b[13]=0;b[12]=0;b[11]=0;b[10]=a[8];b[9]=a[7];b[8]=a[6];b[7]=0;b[6]=a[5];b[5]=a[4];b[4]=a[3];b[3]=0;b[2]=a[2];b[1]=a[1];b[0]=a[0];return b},str:function(a){return"["+a[0]+", "+a[1]+
", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+"]"}},w={create:function(a){var b=new u(16);4===arguments.length?(b[0]=arguments[0],b[1]=arguments[1],b[2]=arguments[2],b[3]=arguments[3],b[4]=arguments[4],b[5]=arguments[5],b[6]=arguments[6],b[7]=arguments[7],b[8]=arguments[8],b[9]=arguments[9],b[10]=arguments[10],b[11]=arguments[11],b[12]=arguments[12],b[13]=arguments[13],b[14]=arguments[14],b[15]=arguments[15]):a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],
b[6]=a[6],b[7]=a[7],b[8]=a[8],b[9]=a[9],b[10]=a[10],b[11]=a[11],b[12]=a[12],b[13]=a[13],b[14]=a[14],b[15]=a[15]);return b},createFrom:function(a,b,c,d,e,f,g,k,m,l,q,p,G,n,h,v){var t=new u(16);t[0]=a;t[1]=b;t[2]=c;t[3]=d;t[4]=e;t[5]=f;t[6]=g;t[7]=k;t[8]=m;t[9]=l;t[10]=q;t[11]=p;t[12]=G;t[13]=n;t[14]=h;t[15]=v;return t},createFromMatrixRowMajor:function(a){var b=new u(16);b[0]=a[0];b[4]=a[1];b[8]=a[2];b[12]=a[3];b[1]=a[4];b[5]=a[5];b[9]=a[6];b[13]=a[7];b[2]=a[8];b[6]=a[9];b[10]=a[10];b[14]=a[11];b[3]=
a[12];b[7]=a[13];b[11]=a[14];b[15]=a[15];return b},createFromMatrix:function(a){var b=new u(16);b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15];return b},set:function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15];return b},setRowMajor:function(a,
b){b[0]=a[0];b[4]=a[1];b[8]=a[2];b[12]=a[3];b[1]=a[4];b[5]=a[5];b[9]=a[6];b[13]=a[7];b[2]=a[8];b[6]=a[9];b[10]=a[10];b[14]=a[11];b[3]=a[12];b[7]=a[13];b[11]=a[14];b[15]=a[15];return b},identity:function(a){a||(a=w.create());a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a},transpose:function(a,b){if(!b||a===b){b=a[1];var c=a[2],d=a[3],e=a[6],f=a[7],g=a[11];a[1]=a[4];a[2]=a[8];a[3]=a[12];a[4]=b;a[6]=a[9];a[7]=a[13];a[8]=
c;a[9]=e;a[11]=a[14];a[12]=d;a[13]=f;a[14]=g;return a}b[0]=a[0];b[1]=a[4];b[2]=a[8];b[3]=a[12];b[4]=a[1];b[5]=a[5];b[6]=a[9];b[7]=a[13];b[8]=a[2];b[9]=a[6];b[10]=a[10];b[11]=a[14];b[12]=a[3];b[13]=a[7];b[14]=a[11];b[15]=a[15];return b},determinant:function(a){var b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],k=a[6],m=a[7],l=a[8],q=a[9],p=a[10],G=a[11],n=a[12],h=a[13],v=a[14];a=a[15];return n*q*k*e-l*h*k*e-n*g*p*e+f*h*p*e+l*g*v*e-f*q*v*e-n*q*d*m+l*h*d*m+n*c*p*m-b*h*p*m-l*c*v*m+b*q*v*m+n*g*d*G-f*h*d*G-
n*c*k*G+b*h*k*G+f*c*v*G-b*g*v*G-l*g*d*a+f*q*d*a+l*c*k*a-b*q*k*a-f*c*p*a+b*g*p*a},inverse:function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],k=a[5],m=a[6],l=a[7],q=a[8],p=a[9],h=a[10],n=a[11],r=a[12],v=a[13],t=a[14];a=a[15];var u=c*k-d*g,L=c*m-e*g,w=c*l-f*g,M=d*m-e*k,I=d*l-f*k,B=e*l-f*m,C=q*v-p*r,D=q*t-h*r,E=q*a-n*r,F=p*t-h*v,x=p*a-n*v,y=h*a-n*t,z=u*y-L*x+w*F+M*E-I*D+B*C;if(!z)return null;z=1/z;b[0]=(k*y-m*x+l*F)*z;b[1]=(-d*y+e*x-f*F)*z;b[2]=(v*B-t*I+a*M)*z;b[3]=(-p*B+h*I-n*M)*z;b[4]=(-g*
y+m*E-l*D)*z;b[5]=(c*y-e*E+f*D)*z;b[6]=(-r*B+t*w-a*L)*z;b[7]=(q*B-h*w+n*L)*z;b[8]=(g*x-k*E+l*C)*z;b[9]=(-c*x+d*E-f*C)*z;b[10]=(r*I-v*w+a*u)*z;b[11]=(-q*I+p*w-n*u)*z;b[12]=(-g*F+k*D-m*C)*z;b[13]=(c*F-d*D+e*C)*z;b[14]=(-r*M+v*L-t*u)*z;b[15]=(q*M-p*L+h*u)*z;return b},toRotationMat:function(a,b){b||(b=w.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b},toMat3:function(a,b){b||
(b=H.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[4];b[4]=a[5];b[5]=a[6];b[6]=a[8];b[7]=a[9];b[8]=a[10];return b},toInverseMat3:function(a,b){var c=a[0],d=a[1],e=a[2],f=a[4],g=a[5],k=a[6],m=a[8],l=a[9];a=a[10];var q=a*g-k*l,p=-a*f+k*m,h=l*f-g*m,n=c*q+d*p+e*h;if(!n)return null;n=1/n;b||(b=H.create());b[0]=q*n;b[1]=(-a*d+e*l)*n;b[2]=(k*d-e*g)*n;b[3]=p*n;b[4]=(a*c-e*m)*n;b[5]=(-k*c+e*f)*n;b[6]=h*n;b[7]=(-l*c+d*m)*n;b[8]=(g*c-d*f)*n;return b},multiply:function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2],
g=a[3],k=a[4],m=a[5],l=a[6],q=a[7],p=a[8],h=a[9],n=a[10],r=a[11],v=a[12],t=a[13],u=a[14];a=a[15];var w=b[0],x=b[1],y=b[2],I=b[3],B=b[4],C=b[5],D=b[6],E=b[7],F=b[8],A=b[9],H=b[10],z=b[11],J=b[12],K=b[13],N=b[14];b=b[15];c[0]=w*d+x*k+y*p+I*v;c[1]=w*e+x*m+y*h+I*t;c[2]=w*f+x*l+y*n+I*u;c[3]=w*g+x*q+y*r+I*a;c[4]=B*d+C*k+D*p+E*v;c[5]=B*e+C*m+D*h+E*t;c[6]=B*f+C*l+D*n+E*u;c[7]=B*g+C*q+D*r+E*a;c[8]=F*d+A*k+H*p+z*v;c[9]=F*e+A*m+H*h+z*t;c[10]=F*f+A*l+H*n+z*u;c[11]=F*g+A*q+H*r+z*a;c[12]=J*d+K*k+N*p+b*v;c[13]=
J*e+K*m+N*h+b*t;c[14]=J*f+K*l+N*n+b*u;c[15]=J*g+K*q+N*r+b*a;return c},multiplyVec3:function(a,b,c){c||(c=b);var d=b[0],e=b[1];b=b[2];c[0]=a[0]*d+a[4]*e+a[8]*b+a[12];c[1]=a[1]*d+a[5]*e+a[9]*b+a[13];c[2]=a[2]*d+a[6]*e+a[10]*b+a[14];return c},multiplyVec4:function(a,b,c){c||(c=b);var d=b[0],e=b[1],f=b[2];b=b[3];c[0]=a[0]*d+a[4]*e+a[8]*f+a[12]*b;c[1]=a[1]*d+a[5]*e+a[9]*f+a[13]*b;c[2]=a[2]*d+a[6]*e+a[10]*f+a[14]*b;c[3]=a[3]*d+a[7]*e+a[11]*f+a[15]*b;return c},translate:function(a,b,c){var d=b[0],e=b[1];
b=b[2];var f,g,k,m,l,q,p,h,n,r,v,t;if(!c||a===c)return a[12]=a[0]*d+a[4]*e+a[8]*b+a[12],a[13]=a[1]*d+a[5]*e+a[9]*b+a[13],a[14]=a[2]*d+a[6]*e+a[10]*b+a[14],a[15]=a[3]*d+a[7]*e+a[11]*b+a[15],a;f=a[0];g=a[1];k=a[2];m=a[3];l=a[4];q=a[5];p=a[6];h=a[7];n=a[8];r=a[9];v=a[10];t=a[11];c[0]=f;c[1]=g;c[2]=k;c[3]=m;c[4]=l;c[5]=q;c[6]=p;c[7]=h;c[8]=n;c[9]=r;c[10]=v;c[11]=t;c[12]=f*d+l*e+n*b+a[12];c[13]=g*d+q*e+r*b+a[13];c[14]=k*d+p*e+v*b+a[14];c[15]=m*d+h*e+t*b+a[15];return c},scale:function(a,b,c){var d=b[0],
e=b[1];b=b[2];if(!c||a===c)return a[0]*=d,a[1]*=d,a[2]*=d,a[3]*=d,a[4]*=e,a[5]*=e,a[6]*=e,a[7]*=e,a[8]*=b,a[9]*=b,a[10]*=b,a[11]*=b,a;c[0]=a[0]*d;c[1]=a[1]*d;c[2]=a[2]*d;c[3]=a[3]*d;c[4]=a[4]*e;c[5]=a[5]*e;c[6]=a[6]*e;c[7]=a[7]*e;c[8]=a[8]*b;c[9]=a[9]*b;c[10]=a[10]*b;c[11]=a[11]*b;c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15];return c},maxScale:function(a){return Math.max(Math.max(Math.sqrt(a[0]*a[0]+a[4]*a[4]+a[8]*a[8]),Math.sqrt(a[1]*a[1]+a[5]*a[5]+a[9]*a[9])),Math.sqrt(a[2]*a[2]+a[6]*a[6]+a[10]*
a[10]))},rotate:function(a,b,c,d){var e=c[0],f=c[1];c=c[2];var g=Math.sqrt(e*e+f*f+c*c),k,m,l,q,p,h,n,r,v,t,u,w,x,y,A,B,C,D,E,F;if(!g)return null;1!==g&&(g=1/g,e*=g,f*=g,c*=g);k=Math.sin(b);m=Math.cos(b);l=1-m;b=a[0];g=a[1];q=a[2];p=a[3];h=a[4];n=a[5];r=a[6];v=a[7];t=a[8];u=a[9];w=a[10];x=a[11];y=e*e*l+m;A=f*e*l+c*k;B=c*e*l-f*k;C=e*f*l-c*k;D=f*f*l+m;E=c*f*l+e*k;F=e*c*l+f*k;e=f*c*l-e*k;f=c*c*l+m;d?a!==d&&(d[12]=a[12],d[13]=a[13],d[14]=a[14],d[15]=a[15]):d=a;d[0]=b*y+h*A+t*B;d[1]=g*y+n*A+u*B;d[2]=q*
y+r*A+w*B;d[3]=p*y+v*A+x*B;d[4]=b*C+h*D+t*E;d[5]=g*C+n*D+u*E;d[6]=q*C+r*D+w*E;d[7]=p*C+v*D+x*E;d[8]=b*F+h*e+t*f;d[9]=g*F+n*e+u*f;d[10]=q*F+r*e+w*f;d[11]=p*F+v*e+x*f;return d},rotateX:function(a,b,c){var d=Math.sin(b);b=Math.cos(b);var e=a[4],f=a[5],g=a[6],k=a[7],m=a[8],l=a[9],q=a[10],h=a[11];c?a!==c&&(c[0]=a[0],c[1]=a[1],c[2]=a[2],c[3]=a[3],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a;c[4]=e*b+m*d;c[5]=f*b+l*d;c[6]=g*b+q*d;c[7]=k*b+h*d;c[8]=e*-d+m*b;c[9]=f*-d+l*b;c[10]=g*-d+q*b;c[11]=k*-d+
h*b;return c},rotateY:function(a,b,c){var d=Math.sin(b);b=Math.cos(b);var e=a[0],f=a[1],g=a[2],k=a[3],m=a[8],l=a[9],q=a[10],h=a[11];c?a!==c&&(c[4]=a[4],c[5]=a[5],c[6]=a[6],c[7]=a[7],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a;c[0]=e*b+m*-d;c[1]=f*b+l*-d;c[2]=g*b+q*-d;c[3]=k*b+h*-d;c[8]=e*d+m*b;c[9]=f*d+l*b;c[10]=g*d+q*b;c[11]=k*d+h*b;return c},rotateZ:function(a,b,c){var d=Math.sin(b);b=Math.cos(b);var e=a[0],f=a[1],g=a[2],k=a[3],m=a[4],l=a[5],h=a[6],p=a[7];c?a!==c&&(c[8]=a[8],c[9]=a[9],
c[10]=a[10],c[11]=a[11],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a;c[0]=e*b+m*d;c[1]=f*b+l*d;c[2]=g*b+h*d;c[3]=k*b+p*d;c[4]=e*-d+m*b;c[5]=f*-d+l*b;c[6]=g*-d+h*b;c[7]=k*-d+p*b;return c},frustum:function(a,b,c,d,e,f,g){g||(g=w.create());var k=b-a,m=d-c,l=f-e;g[0]=2*e/k;g[1]=0;g[2]=0;g[3]=0;g[4]=0;g[5]=2*e/m;g[6]=0;g[7]=0;g[8]=(b+a)/k;g[9]=(d+c)/m;g[10]=-(f+e)/l;g[11]=-1;g[12]=0;g[13]=0;g[14]=-(f*e*2)/l;g[15]=0;return g},perspective:function(a,b,c,d,e){a=c*Math.tan(a*Math.PI/360);b*=a;return w.frustum(-b,
b,-a,a,c,d,e)},ortho:function(a,b,c,d,e,f,g){g||(g=w.create());var k=b-a,m=d-c,l=f-e;g[0]=2/k;g[1]=0;g[2]=0;g[3]=0;g[4]=0;g[5]=2/m;g[6]=0;g[7]=0;g[8]=0;g[9]=0;g[10]=-2/l;g[11]=0;g[12]=-(a+b)/k;g[13]=-(d+c)/m;g[14]=-(f+e)/l;g[15]=1;return g},lookAt:function(a,b,c,d){d||(d=w.create());var e,f,g,k,m,l,h,p,r=a[0],n=a[1];a=a[2];g=c[0];k=c[1];f=c[2];h=b[0];c=b[1];e=b[2];if(r===h&&n===c&&a===e)return w.identity(d);b=r-h;c=n-c;h=a-e;p=1/Math.sqrt(b*b+c*c+h*h);b*=p;c*=p;h*=p;e=k*h-f*c;f=f*b-g*h;g=g*c-k*b;
(p=Math.sqrt(e*e+f*f+g*g))?(p=1/p,e*=p,f*=p,g*=p):g=f=e=0;k=c*g-h*f;m=h*e-b*g;l=b*f-c*e;(p=Math.sqrt(k*k+m*m+l*l))?(p=1/p,k*=p,m*=p,l*=p):l=m=k=0;d[0]=e;d[1]=k;d[2]=b;d[3]=0;d[4]=f;d[5]=m;d[6]=c;d[7]=0;d[8]=g;d[9]=l;d[10]=h;d[11]=0;d[12]=-(e*r+f*n+g*a);d[13]=-(k*r+m*n+l*a);d[14]=-(b*r+c*n+h*a);d[15]=1;return d},fromRotationTranslation:function(a,b,c){c||(c=w.create());var d=a[0],e=a[1],f=a[2],g=a[3],k=d+d,m=e+e,l=f+f;a=d*k;var h=d*m,d=d*l,p=e*m,e=e*l,f=f*l,k=g*k,m=g*m,g=g*l;c[0]=1-(p+f);c[1]=h+g;
c[2]=d-m;c[3]=0;c[4]=h-g;c[5]=1-(a+f);c[6]=e+k;c[7]=0;c[8]=d+m;c[9]=e-k;c[10]=1-(a+p);c[11]=0;c[12]=b[0];c[13]=b[1];c[14]=b[2];c[15]=1;return c},str:function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+"]"}},h={create:function(a){var b=new u(4);a?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3]):b[0]=b[1]=b[2]=b[3]=0;return b},createFrom:function(a,b,c,d){var e=new u(4);e[0]=a;
e[1]=b;e[2]=c;e[3]=d;return e},set:function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];return b},identity:function(a){a||(a=h.create());a[0]=0;a[1]=0;a[2]=0;a[3]=1;return a}},U=h.identity();h.calculateW=function(a,b){var c=a[0],d=a[1],e=a[2];if(!b||a===b)return a[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e)),a;b[0]=c;b[1]=d;b[2]=e;b[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e));return b};h.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]};h.inverse=function(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],
c=(c=c*c+d*d+e*e+f*f)?1/c:0;if(!b||a===b)return a[0]*=-c,a[1]*=-c,a[2]*=-c,a[3]*=c,a;b[0]=-a[0]*c;b[1]=-a[1]*c;b[2]=-a[2]*c;b[3]=a[3]*c;return b};h.conjugate=function(a,b){if(!b||a===b)return a[0]*=-1,a[1]*=-1,a[2]*=-1,a;b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];b[3]=a[3];return b};h.length=function(a){var b=a[0],c=a[1],d=a[2];a=a[3];return Math.sqrt(b*b+c*c+d*d+a*a)};h.normalize=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2];a=a[3];var f=Math.sqrt(c*c+d*d+e*e+a*a);if(0===f)return b[0]=0,b[1]=0,b[2]=0,b[3]=
0,b;f=1/f;b[0]=c*f;b[1]=d*f;b[2]=e*f;b[3]=a*f;return b};h.add=function(a,b,c){if(!c||a===c)return a[0]+=b[0],a[1]+=b[1],a[2]+=b[2],a[3]+=b[3],a;c[0]=a[0]+b[0];c[1]=a[1]+b[1];c[2]=a[2]+b[2];c[3]=a[3]+b[3];return c};h.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2];a=a[3];var g=b[0],k=b[1],h=b[2];b=b[3];c[0]=d*b+a*g+e*h-f*k;c[1]=e*b+a*k+f*g-d*h;c[2]=f*b+a*h+d*k-e*g;c[3]=a*b-d*g-e*k-f*h;return c};h.multiplyVec3=function(a,b,c){c||(c=b);var d=b[0],e=b[1],f=b[2];b=a[0];var g=a[1],k=a[2];a=a[3];
var h=a*d+g*f-k*e,l=a*e+k*d-b*f,q=a*f+b*e-g*d,d=-b*d-g*e-k*f;c[0]=h*a+d*-b+l*-k-q*-g;c[1]=l*a+d*-g+q*-b-h*-k;c[2]=q*a+d*-k+h*-g-l*-b;return c};h.scale=function(a,b,c){if(!c||a===c)return a[0]*=b,a[1]*=b,a[2]*=b,a[3]*=b,a;c[0]=a[0]*b;c[1]=a[1]*b;c[2]=a[2]*b;c[3]=a[3]*b;return c};h.toMat3=function(a,b){b||(b=H.create());var c=a[0],d=a[1],e=a[2],f=a[3],g=c+c,k=d+d,h=e+e;a=c*g;var l=c*k,c=c*h,q=d*k,d=d*h,e=e*h,g=f*g,k=f*k,f=f*h;b[0]=1-(q+e);b[1]=l+f;b[2]=c-k;b[3]=l-f;b[4]=1-(a+e);b[5]=d+g;b[6]=c+k;b[7]=
d-g;b[8]=1-(a+q);return b};h.toMat4=function(a,b){b||(b=w.create());var c=a[0],d=a[1],e=a[2],f=a[3],g=c+c,h=d+d,m=e+e;a=c*g;var l=c*h,c=c*m,q=d*h,d=d*m,e=e*m,g=f*g,h=f*h,f=f*m;b[0]=1-(q+e);b[1]=l+f;b[2]=c-h;b[3]=0;b[4]=l-f;b[5]=1-(a+e);b[6]=d+g;b[7]=0;b[8]=c+h;b[9]=d-g;b[10]=1-(a+q);b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b};h.slerp=function(a,b,c,d){d||(d=a);var e=a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3],f,g;if(1<=Math.abs(e))return d!==a&&(d[0]=a[0],d[1]=a[1],d[2]=a[2],d[3]=a[3]),d;f=Math.acos(e);
g=Math.sqrt(1-e*e);if(.001>Math.abs(g))return d[0]=.5*a[0]+.5*b[0],d[1]=.5*a[1]+.5*b[1],d[2]=.5*a[2]+.5*b[2],d[3]=.5*a[3]+.5*b[3],d;e=Math.sin((1-c)*f)/g;c=Math.sin(c*f)/g;d[0]=a[0]*e+b[0]*c;d[1]=a[1]*e+b[1]*c;d[2]=a[2]*e+b[2]*c;d[3]=a[3]*e+b[3]*c;return d};h.fromRotationMatrix=function(a,b){b||(b=h.create());var c=a[0]+a[4]+a[8],d;if(0<c)d=Math.sqrt(c+1),b[3]=.5*d,d=.5/d,b[0]=(a[7]-a[5])*d,b[1]=(a[2]-a[6])*d,b[2]=(a[3]-a[1])*d;else{d=h.fromRotationMatrix.s_iNext=h.fromRotationMatrix.s_iNext||[1,
2,0];c=0;a[4]>a[0]&&(c=1);a[8]>a[3*c+c]&&(c=2);var e=d[c],f=d[e];d=Math.sqrt(a[3*c+c]-a[3*e+e]-a[3*f+f]+1);b[c]=.5*d;d=.5/d;b[3]=(a[3*f+e]-a[3*e+f])*d;b[e]=(a[3*e+c]+a[3*c+e])*d;b[f]=(a[3*f+c]+a[3*c+f])*d}return b};H.toQuat4=h.fromRotationMatrix;(function(){var a=H.create();h.fromAxes=function(b,c,d,e){a[0]=c[0];a[3]=c[1];a[6]=c[2];a[1]=d[0];a[4]=d[1];a[7]=d[2];a[2]=b[0];a[5]=b[1];a[8]=b[2];return h.fromRotationMatrix(a,e)}})();h.identity=function(a){a||(a=h.create());a[0]=0;a[1]=0;a[2]=0;a[3]=1;
return a};h.fromAngleAxis=function(a,b,c){c||(c=h.create());a*=.5;var d=Math.sin(a);c[3]=Math.cos(a);c[0]=d*b[0];c[1]=d*b[1];c[2]=d*b[2];return c};h.toAngleAxis=function(a,b){b||(b=a);var c=a[0]*a[0]+a[1]*a[1]+a[2]*a[2];0<c?(b[3]=2*Math.acos(a[3]),c=K.invsqrt(c),b[0]=a[0]*c,b[1]=a[1]*c,b[2]=a[2]*c):(b[3]=0,b[0]=1,b[1]=0,b[2]=0);return b};h.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+"]"};var R={create:function(a){var b=new u(4);a?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3]):b[0]=b[1]=
b[2]=b[3]=0;return b},createFrom:function(a,b,c,d){var e=new u(4);e[0]=a;e[1]=b;e[2]=c;e[3]=d;return e},set:function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];return b},identity:function(a){a||(a=R.create());a[0]=1;a[1]=0;a[2]=0;a[3]=1;return a},transpose:function(a,b){if(!b||a===b)return b=a[1],a[1]=a[2],a[2]=b,a;b[0]=a[0];b[1]=a[2];b[2]=a[1];b[3]=a[3];return b},determinant:function(a){return a[0]*a[3]-a[2]*a[1]},inverse:function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2];a=a[3];var f=c*a-e*d;if(!f)return null;
f=1/f;b[0]=a*f;b[1]=-d*f;b[2]=-e*f;b[3]=c*f;return b},multiply:function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2];a=a[3];c[0]=d*b[0]+e*b[2];c[1]=d*b[1]+e*b[3];c[2]=f*b[0]+a*b[2];c[3]=f*b[1]+a*b[3];return c},rotate:function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2];a=a[3];var g=Math.sin(b);b=Math.cos(b);c[0]=d*b+e*g;c[1]=d*-g+e*b;c[2]=f*b+a*g;c[3]=f*-g+a*b;return c},multiplyVec2:function(a,b,c){c||(c=b);var d=b[0];b=b[1];c[0]=d*a[0]+b*a[1];c[1]=d*a[2]+b*a[3];return c},scale:function(a,b,c){c||(c=a);
var d=a[1],e=a[2],f=a[3],g=b[0];b=b[1];c[0]=a[0]*g;c[1]=d*b;c[2]=e*g;c[3]=f*b;return c},str:function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+"]"}};x=x?"":"d";A["glMath"+x]=K;A["vec2"+x]={create:function(a){var b=new u(2);a?(b[0]=a[0],b[1]=a[1]):(b[0]=0,b[1]=0);return b},createFrom:function(a,b){var c=new u(2);c[0]=a;c[1]=b;return c},add:function(a,b,c){c||(c=b);c[0]=a[0]+b[0];c[1]=a[1]+b[1];return c},subtract:function(a,b,c){c||(c=b);c[0]=a[0]-b[0];c[1]=a[1]-b[1];return c},multiply:function(a,
b,c){c||(c=b);c[0]=a[0]*b[0];c[1]=a[1]*b[1];return c},divide:function(a,b,c){c||(c=b);c[0]=a[0]/b[0];c[1]=a[1]/b[1];return c},scale:function(a,b,c){c||(c=a);c[0]=a[0]*b;c[1]=a[1]*b;return c},dist:function(a,b){var c=b[0]-a[0];a=b[1]-a[1];return Math.sqrt(c*c+a*a)},dist2:function(a,b){var c=b[0]-a[0];a=b[1]-a[1];return c*c+a*a},set:function(a,b){b[0]=a[0];b[1]=a[1];return b},set2:function(a,b,c){c[0]=a;c[1]=b;return c},negate:function(a,b){b||(b=a);b[0]=-a[0];b[1]=-a[1];return b},normalize:function(a,
b){b||(b=a);var c=a[0]*a[0]+a[1]*a[1];0<c?(c=Math.sqrt(c),b[0]=a[0]/c,b[1]=a[1]/c):b[0]=b[1]=0;return b},cross:function(a,b,c){a=a[0]*b[1]-a[1]*b[0];if(!c)return a;c[0]=c[1]=0;c[2]=a;return c},length:function(a){var b=a[0];a=a[1];return Math.sqrt(b*b+a*a)},dot:function(a,b){return a[0]*b[0]+a[1]*b[1]},direction:function(a,b,c){c||(c=a);var d=a[0]-b[0];a=a[1]-b[1];b=d*d+a*a;if(!b)return c[0]=0,c[1]=0,c[2]=0,c;b=1/Math.sqrt(b);c[0]=d*b;c[1]=a*b;return c},lerp:function(a,b,c,d){d||(d=a);d[0]=a[0]+c*
(b[0]-a[0]);d[1]=a[1]+c*(b[1]-a[1]);return d},str:function(a){return"["+a[0]+", "+a[1]+"]"}};A["vec3"+x]=r;A["vec4"+x]={create:function(a){var b=new u(4);a?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3]):(b[0]=0,b[1]=0,b[2]=0,b[3]=0);return b},createFrom:function(a,b,c,d){var e=new u(4);e[0]=a;e[1]=b;e[2]=c;e[3]=d;return e},add:function(a,b,c){c||(c=b);c[0]=a[0]+b[0];c[1]=a[1]+b[1];c[2]=a[2]+b[2];c[3]=a[3]+b[3];return c},subtract:function(a,b,c){c||(c=b);c[0]=a[0]-b[0];c[1]=a[1]-b[1];c[2]=a[2]-b[2];c[3]=
a[3]-b[3];return c},multiply:function(a,b,c){c||(c=b);c[0]=a[0]*b[0];c[1]=a[1]*b[1];c[2]=a[2]*b[2];c[3]=a[3]*b[3];return c},divide:function(a,b,c){c||(c=b);c[0]=a[0]/b[0];c[1]=a[1]/b[1];c[2]=a[2]/b[2];c[3]=a[3]/b[3];return c},scale:function(a,b,c){c||(c=a);c[0]=a[0]*b;c[1]=a[1]*b;c[2]=a[2]*b;c[3]=a[3]*b;return c},dot:function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]},set:function(a,b){b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];return b},set4:function(a,b,c,d,e){e[0]=a;e[1]=b;e[2]=c;e[3]=d;
return e},negate:function(a,b){b||(b=a);b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];b[3]=-a[3];return b},lerp:function(a,b,c,d){d||(d=a);d[0]=a[0]+c*(b[0]-a[0]);d[1]=a[1]+c*(b[1]-a[1]);d[2]=a[2]+c*(b[2]-a[2]);d[3]=a[3]+c*(b[3]-a[3]);return d},str:function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+"]"}};A["mat2"+x]=R;A["mat3"+x]=H;A["mat4"+x]=w;A["quat4"+x]=h});return J});