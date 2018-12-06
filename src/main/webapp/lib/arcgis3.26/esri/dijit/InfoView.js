// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/InfoView","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/kernel dojo/has dojo/query dojo/dom dojo/dom-class dojo/dom-construct dojo/dom-geometry ../kernel ./_TouchBase".split(" "),function(h,m,n,e,p,q,v,r,k,d,l,t,u){h=h(null,{declaredClass:"esri.dijit.InfoView",_items:[],_top:null,_sections:[],_isDecelerate:!1,constructor:function(a,b){this.container=r.byId(b);this._touchBase=u(this.container,null);this._slideDiv=d.create("div",null,this.container,
"first");this.events=[];this._items=a.items;a.sections&&(this._sections=a.sections);k.add(this.container,"esriMobileInfoView");if(0===this._sections.length)d.create("div",{},this._slideDiv);else for(a=0;a<this._sections.length;a++)b=d.create("div",{"class":"esriMobileInfoViewSection"},this._slideDiv),d.create("div",{innerHTML:this._sections[a].title},b);for(a=0;a<this._items.length;a++){var c;b=0;this._items[a].section&&(b=this._items[a].section);switch(this._items[a].type){case "div":c=d.create("div",
{"class":"esriMobileInfoViewItem",style:this._items[a].style},this._slideDiv.childNodes[b]),c=d.create("div",{innerHTML:this._items[a].text},c)}this._items[a].className&&k.add(c,this._items[a].className);c._index=a;c._item=this._items[a];this._items[a]._node=c}this.startTouchY=0},startup:function(){this.onCreate(this._items);this._animateTo(0)},destroy:function(){n.forEach(this.events,e.disconnect);this._touchBase=null;p.query("img",this.container).forEach(function(a){a._index=null;a._item=null;d.destroy(a);
a=null});this._items=null;d.destroy(this._slideDiv);d.destroy(this.container);this.container=this._slideDiv=null},getItems:function(){return this._items},setPreventDefault:function(a){this._touchBase.setPreventDefault(a)},enableTouchScroll:function(){this._touchBase.setPreventDefault(!0);this.events.push(e.connect(this._touchBase,"onTouchStart",this,this._onTouchStartHandler));this.events.push(e.connect(this._touchBase,"onTouchMove",this,this._onTouchMoveHandler));this.events.push(e.connect(this._touchBase,
"onTouchEnd",this,this._onTouchEndHandler));this._slideDiv.style.webkitTransform="translate3d(0,"+this._top+"px, 0)"},disableTouchScroll:function(){e.disconnect(this.events.pop());e.disconnect(this.events.pop());e.disconnect(this.events.pop());this._touchBase.setPreventDefault(!1);this._slideDiv.style.webkitTransform="translate3d(0, 0px, 0)"},animateTo:function(){this._slideDiv.style.WebkitTransitionDuration="0s";this._animateTo(0)},onSelect:function(a){},onUnSelect:function(a){},onCreate:function(a){},
onClick:function(a){},onSwipeLeft:function(){},onSwipeRight:function(){},_onTouchStartHandler:function(a){this._slideDiv.style.WebkitTransitionDuration="0s";this._moveDirection=null;this._startTime=new Date;this.startTouchY=a.touches[0].clientY;this.contentStartOffsetY=this.contentOffsetY},_onTouchMoveHandler:function(a){this._moveDirection||(this._moveDirection=Math.abs(a.curY)>Math.abs(a.curX)?"vertical":"horizontal");"horizontal"!==this._moveDirection&&"vertical"===this._moveDirection&&this._animateTo(a.touches[0].clientY-
this.startTouchY+this.contentStartOffsetY)},_onTouchEndHandler:function(a){this._endTime=new Date;this._deltaMovement=a.curY;if("vertical"===this._moveDirection)this._shouldStartMomentum()?this._doMomentum():this._snapToBounds();else if("horizontal"===this._moveDirection)if("left"===a.swipeDirection)this.onSwipeLeft();else if("right"===a.swipeDirection)this.onSwipeRight()},_shouldStartMomentum:function(){this._diff=this._endTime-this._startTime;this._velocity=this._deltaMovement/this._diff;return.2<
Math.abs(this._velocity)&&200>this._diff?!0:!1},_doMomentum:function(){var a,b;a=l.getContentBox(this.container);var c=0>this._velocity?.001:-.001;b=-(this._velocity*this._velocity)/(2*c);var d=-this._velocity/c,c=3*.6-0,e=1-c,f=0,g=0;if(a.h>this._slideDiv.scrollHeight)this.contentOffsetY=0,g=300;else if(0<this.contentOffsetY+b){a=0;for(b=Math.floor(d/20);a<b;a++)if(f=(20*e*a^3)+(20*c*a^2)+0*a+0,f=0>this._velocity?-f:f,0<this.contentOffsetY+f){g=20*a;break}0===g&&(g=300);this.contentOffsetY=0}else if(Math.abs(this.contentOffsetY+
b)+a.h>this._slideDiv.scrollHeight)for(this.contentOffsetY=a.h-this._slideDiv.scrollHeight,a=0,b=Math.floor(d/20);a<b;a++){if(f=(20*e*a^3)+(20*c*a^2)+0*a+0,f=0>this._velocity?-f:f,Math.abs(this.contentOffsetY+f)>this._slideDiv.scrollHeight){g=20*a;break}}else g=d,this.contentOffsetY+=b;this._slideDiv.style.webkitTransition="-webkit-transform "+g+"ms cubic-bezier(0, 0.3, 0.6, 1)";this._animateTo(this.contentOffsetY)},_snapToBounds:function(){var a=l.getContentBox(this.container);a.h>this._slideDiv.scrollHeight?
this.contentOffsetY=0:0<this.contentOffsetY?this.contentOffsetY=0:Math.abs(this.contentOffsetY)+a.h>this._slideDiv.scrollHeight&&(this.contentOffsetY=a.h-this._slideDiv.scrollHeight);this._slideDiv.style.WebkitTransitionDuration="0.5s";this._animateTo(this.contentOffsetY)},_animateTo:function(a){this.contentOffsetY=a;this._slideDiv.style.webkitTransform="translate3d(0, "+a+"px, 0)"},_stopMomentum:function(){if(this._isDecelerating()){var a=document.defaultView.getComputedStyle(this._slideDiv,null),
a=new WebKitCSSMatrix(a.webkitTransform);this._slideDiv.style.webkitTransition="";this.animateTo(a.m42)}},_isDecelerating:function(){return this.isDecelerate?!0:!1},_toggleNode:function(a,b){"ON"===b.toggleState?(b.toggleState="OFF",b.src&&(a.src=b.src.toString()),this.onUnSelect(b)):(b.toggleState="ON",b.srcAlt&&(a.src=b.srcAlt),this.onSelect(b))}});q("extend-esri")&&m.setObject("dijit.InfoView",h,t);return h});