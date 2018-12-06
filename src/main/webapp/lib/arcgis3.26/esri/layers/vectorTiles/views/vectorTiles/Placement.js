// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/Placement",["require","exports","../2d/engine/webgl/Geometry","./Conflict","./GeometryUtils"],function(I,v,t,D,d){Object.defineProperty(v,"__esModule",{value:!0});I=function(){return function(d,a,g,b,e){void 0===g&&(g=0);void 0===b&&(b=-1);void 0===e&&(e=C);this.x=d;this.y=a;this.angle=g;this.segment=b;this.minzoom=e}}();v.Anchor=I;var Q=function(){return function(k,a,g,b,e,f,l){void 0===e&&(e=!1);void 0===f&&(f=C);void 0===l&&(l=d.C_INFINITY);this.anchor=
k;this.labelAngle=a;this.glyphAngle=g;this.page=b;this.upsideDown=e;this.minzoom=f;this.maxzoom=l}}(),R=function(){return function(d,a,g,b,e,f,l,t,y,r){this.tl=d;this.tr=a;this.bl=g;this.br=b;this.mosaicRect=e;this.labelAngle=f;this.anchor=l;this.minzoom=t;this.maxzoom=y;this.page=r}}();v.PlacedSymbol=R;var S=function(){return function(d,a){this.footprint=d;this.shapes=a}}();v.Placement=S;var C=.5;I=function(){function k(){this.mapAngle=0;this._conflictEngine=new D.ConflictEngine}k.prototype.reset=
function(){this._conflictEngine.reset()};k.prototype.setAngle=function(a){this.mapAngle=a;this._conflictEngine.setAngle(a)};k.prototype.getIconPlacement=function(a,g,b,e,f,l,k){var y=b.width/b.pixelRatio,r=b.height/b.pixelRatio;f=l.offset[0]-y/2;var E=l.offset[1]-r/2,y=f+y,r=E+r,w=b.rect,n=b.sdf?17:2,c=f-n,h=E-n,m=c+w.width/b.pixelRatio,q=h+w.height/b.pixelRatio;b=new t.Point(c,h);n=new t.Point(m,q);q=new t.Point(c,q);h=new t.Point(m,h);m=l.rotate*d.C_DEG_TO_RAD;c=1===l.rotationAlignment;0<=a.segment&&
!c&&(m+=a.angle);if(0!==m){var p=Math.cos(m),z=Math.sin(m);b.rotate(p,z);n.rotate(p,z);q.rotate(p,z);h.rotate(p,z)}p=8*l.padding;z=new t.Point(a.x,a.y);a=new D.Footprint(this.mapAngle,p,c);a.addBox(z,new D.Box(f,E,y,r),e,m,g,C,d.C_INFINITY);g=new R(b,h,q,n,w,0,z,C,d.C_INFINITY,0);g=new S(a,[g]);e=C;l.allowOverlap||(e=this._conflictEngine.getMinZoom(g.footprint,e,k,c));a.minzoom=e;return g};k.prototype.getTextPlacement=function(a,g,b,e,f,l,k,y){for(var r=new t.Point(a.x,a.y),E=k.rotate*d.C_DEG_TO_RAD,
w=0===k.rotationAlignment,n=k.keepUpright,c=C,h=!w,m=h?0:a.angle,q=0<=a.segment&&w,p=new D.Footprint(this.mapAngle,8*k.padding,h),z=[],v=!q,F=Number.POSITIVE_INFINITY,G=Number.NEGATIVE_INFINITY,K=F,L=G,I=q?n:w&&n,T,U=0;U<e.length;U++){var A=e[U],u=A.glyphMosaicItem;if(u&&!u.rect.isEmpty){var V=u.rect,H=u.metrics,B=u.page;v&&(T&&T!==A.y&&(p.addBox(r,new D.Box(F,K,G,L),f,E,g,C,d.C_INFINITY),F=Number.POSITIVE_INFINITY,G=Number.NEGATIVE_INFINITY,K=F,L=G),T=A.y);var J=[];if(q){if(u=(b.x+A.x+H.left-4+.5*
u.metrics.width)*f,c=this._placeGlyph(a,c,u,l,a.segment,1,B,J),n&&(c=this._placeGlyph(a,c,u,l,a.segment,-1,B,J)),2<=c)break}else J.push(new Q(r,m,m,B)),w&&n&&J.push(new Q(r,m+d.C_PI,m+d.C_PI,B,!0));for(var B=A.x+b.x+H.left,A=A.y+b.y-H.top,u=B+H.width,H=A+H.height,M=new t.Point(B-4,A-4),W=new t.Point(M.x+V.width,M.y+V.height),ea=new t.Point(M.x,W.y),fa=new t.Point(W.x,M.y),X=0;X<J.length;X++){var x=J[X],aa=M.clone(),ba=ea.clone(),ca=fa.clone(),da=W.clone(),Y=A,Z=H,N=x.glyphAngle+E;if(0!==N){var O=
Math.cos(N),P=Math.sin(N);aa.rotate(O,P);da.rotate(O,P);ba.rotate(O,P);ca.rotate(O,P)}z.push(new R(aa,ca,ba,da,V,x.labelAngle,x.anchor,x.minzoom,x.maxzoom,x.page));if(!I||this._legible(x.labelAngle))v?(B<F&&(F=B),Y<K&&(K=Y),u>G&&(G=u),Z>L&&(L=Z)):2>x.minzoom&&p.addBox(x.anchor,new D.Box(B,Y,u,Z),f,N,g,x.minzoom,x.maxzoom)}}}if(2<=c)return null;v&&p.addBox(r,new D.Box(F,K,G,L),f,E,g,C,d.C_INFINITY);a=new S(p,z);k.allowOverlap||(c=this._conflictEngine.getMinZoom(a.footprint,c,y,h));p.minzoom=c;return a};
k.prototype.add=function(a){this._conflictEngine.add(a.footprint)};k.prototype._legible=function(a){a=d.radToByte(a);return 65>a||193<=a};k.prototype._placeGlyph=function(a,g,b,e,f,l,k,y){var r=0>l?d.positiveMod(a.angle+d.C_PI,d.C_2PI):a.angle,v=this._legible(r),w=0;0>b&&(l*=-1,b*=-1,w=d.C_PI);0<l&&++f;a=new t.Point(a.x,a.y);var n=e[f],c=d.C_INFINITY;if(e.length<=f)return c;for(;;){var h=n.x-a.x,m=n.y-a.y,q=Math.sqrt(h*h+m*m),p=Math.max(b/q,g),h=d.positiveMod(Math.atan2(m/q,h/q)+w,d.C_2PI);y.push(new Q(a,
r,h,k,v,p,c));if(p<=g)return p;a=n.clone();do{f+=l;if(e.length<=f||0>f)return p;n=e[f]}while(a.isEqual(n));c=n.x-a.x;h=n.y-a.y;m=Math.sqrt(c*c+h*h);c*=q/m;h*=q/m;a.x-=c;a.y-=h;c=p}};return k}();v.PlacementEngine=I});