// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/MapNavigationManager","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/event dojo/mouse dojo/keys dijit/focus ./kernel ./MouseEvents ./TouchEvents ./PointerEvents ./config ./sniff ./lang ./fx ./graphic ./tileUtils ./geometry/ScreenPoint ./geometry/Extent ./geometry/Rect ./geometry/mathUtils ./symbols/SimpleFillSymbol".split(" "),function(l,k,x,q,y,r,d,t,z,u,A,B,n,g,C,D,E,F,h,p,v,G,H){var e=q.connect,f=q.disconnect,w=g("chrome"),I=g("safari"),J=[d.NUMPAD_PLUS,
61,187,d.NUMPAD_MINUS,173,189,d.UP_ARROW,d.NUMPAD_8,d.RIGHT_ARROW,d.NUMPAD_6,d.DOWN_ARROW,d.NUMPAD_2,d.LEFT_ARROW,d.NUMPAD_4,d.PAGE_UP,d.NUMPAD_9,d.PAGE_DOWN,d.NUMPAD_3,d.END,d.NUMPAD_1,d.HOME,d.NUMPAD_7];l=l(null,{declaredClass:"esri.MapNavigationManager",eventModel:"",constructor:function(a,b){this.map=a;k.mixin(this,b);b=a.__container;g("esri-pointer")?(this.pointerEvents=new B(b,{map:a}),this.eventModel="pointer"):g("esri-touch")?(g("ios")||(this.mouseEvents=new u(b,{map:a})),this.touchEvents=
new A(b,{map:a,mouseEvents:this.mouseEvents}),this.eventModel="touch"):(this.mouseEvents=new u(b,{map:a}),this.eventModel="mouse");this._zoomRect=new E(null,new H(n.defaults.map.zoomSymbol));this._keyDx=this._keyDy=0;this._adjustPinch=k.hitch(this,this._adjustPinch);this._adjustPinchEnd=k.hitch(this,this._adjustPinchEnd)},_panInit:function(a){var b=this.mouseEvents;r.isLeft(a)&&this.map.isPan&&!a.shiftKey&&(this._dragOrigin=new h(0,0),k.mixin(this._dragOrigin,a.screenPoint),f(this._panStartHandle),
f(this._panHandle),f(this._panEndHandle),this._panStartHandle=e(b,"onMouseDragStart",this,this._panStart),this._panHandle=e(b,"onMouseDrag",this,this._pan),this._panEndHandle=e(b,"onMouseUp",this,this._panEnd),w||I)&&(a.preventDefault(),t.curNode&&t.curNode.blur())},_panStart:function(a){this.map.setCursor("move");this.map.__panStart(a.screenPoint.x,a.screenPoint.y)},_pan:function(a){this.map.__pan(a.screenPoint.x-this._dragOrigin.x,a.screenPoint.y-this._dragOrigin.y)},_panEnd:function(a){f(this._panStartHandle);
f(this._panHandle);f(this._panEndHandle);this._panStartHandle=this._panHandle=this._panEndHandle=null;var b=this.map;b.__panning&&(b.__panEnd(a.screenPoint.x-this._dragOrigin.x,a.screenPoint.y-this._dragOrigin.y),b.resetMapCursor())},_zoomInit:function(a){var b=this.map,c=this.pointerEvents||this.mouseEvents;(r.isLeft(a)||a.pointerType)&&b.isRubberBandZoom&&a.shiftKey&&(b.setCursor("crosshair"),this._dragOrigin=k.mixin({},a.screenPoint),this._zoomDir=a.ctrlKey||a.metaKey?-1:1,this.pointerEvents?(this._zoomHandle=
e(c,"onSwipeMove",this,this._zoom),this._zoomEndHandle=e(c,"onSwipeEnd",this,this._zoomEnd)):(this._zoomHandle=e(c,"onMouseDrag",this,this._zoom),this._zoomEndHandle=e(c,"onMouseUp",this,this._zoomEnd)),w&&a.preventDefault())},_zoom:function(a){var b=this.map,c=this._normalizeRect(a).offset(b.__visibleRect.x,b.__visibleRect.y);a=b.graphics;var d=this._zoomRect;d.geometry||b.setCursor("crosshair");d.geometry&&a.remove(d,!0);var e=b.toMap(new h(c.x,c.y)),c=b.toMap(new h(c.x+c.width,c.y+c.height)),c=
new v(e.x,e.y,c.x-e.x,e.y-c.y,b.spatialReference);c._originOnly=!0;d.setGeometry(c);a.add(d,!0)},_zoomEnd:function(a){var b=this._zoomRect,c=this.map,d=c.extent,e=c.spatialReference;f(this._zoomHandle);f(this._zoomEndHandle);this._zoomHandle=this._zoomEndHandle=null;if(c._canZoom(this._zoomDir)&&b.getDojoShape()){c.graphics.remove(b);b.geometry=null;a=this._normalizeRect(a);a.x+=c.__visibleRect.x;a.y+=c.__visibleRect.y;if(-1===this._zoomDir){var g=d.getWidth();a=(g*c.width/a.width-g)/2;e=new p(d.xmin-
a,d.ymin-a,d.xmax+a,d.ymax+a,e)}else d=c.toMap({x:a.x,y:a.y+a.height}),a=c.toMap({x:a.x+a.width,y:a.y}),e=new p(d.x,d.y,a.x,a.y,e);c._extentUtil(null,null,e)}b.getDojoShape()&&c.graphics.remove(b,!0);this._zoomDir=0;c.resetMapCursor()},_wheelZoom:function(a,b){var c=this.map;if(!b){if(c.smartNavigation&&!a.shiftKey&&!c._isPanningOrZooming()){c.disableScrollWheelZoom();this._setScrollWheelPan(!0);this._wheelPan(a);return}b=a.timeStamp;if(!C.isDefined(b)||0>=b)b=(new Date).getTime();if(100>(this._mwts?
b-this._mwts:b))return;this._mwts=b}c._canZoom(a.value)&&c._extentUtil({numLevels:a.value,mapAnchor:a.mapPoint,screenAnchor:a.screenPoint})},_wheelPan:function(a){var b=this.map;if(a.shiftKey&&!b._isPanningOrZooming())this._setScrollWheelPan(!1),b.enableScrollWheelZoom(),this._wheelZoom(a);else{var c=0,d=0;g("ff")?a.axis===a.HORIZONTAL_AXIS?c=-a.detail:d=-a.detail:(c=a.wheelDeltaX,d=a.wheelDeltaY);b.translate(c,d)}},_setScrollWheelPan:function(a){this.map.isScrollWheelPan=a;this.mouseEvents.enableMouseWheel(a);
f(this._mwMacHandle);this._mwMacHandle=null;a&&(this._mwMacHandle=e(this.mouseEvents,"onMouseWheel",this,this._wheelPan))},_recenter:function(a){a.shiftKey&&!this.map._isPanningOrZooming()&&this.map.centerAt(a.mapPoint)},_recenterZoom:function(a){a.shiftKey&&!this.map._isPanningOrZooming()&&(a.value=a.ctrlKey||a.metaKey?-1:1,this._wheelZoom(a,!0))},_dblClickZoom:function(a){this.map._isPanningOrZooming()||(a.value=1,this._wheelZoom(a,!0))},_twoFingerTap:function(a){this.map._isPanningOrZooming()||
(a.value=-1,this._wheelZoom(a,!0))},_keyDown:function(a){var b=a.keyCode,c=this.map;if(-1!==x.indexOf(J,b)){if(b===d.NUMPAD_PLUS||61===b||187===b)c._extentUtil({numLevels:1});else if(b===d.NUMPAD_MINUS||173===b||189===b)c._extentUtil({numLevels:-1});else{c.__panning||c.__panStart(0,0);switch(b){case d.UP_ARROW:case d.NUMPAD_8:this._keyDy+=10;break;case d.RIGHT_ARROW:case d.NUMPAD_6:this._keyDx-=10;break;case d.DOWN_ARROW:case d.NUMPAD_2:this._keyDy-=10;break;case d.LEFT_ARROW:case d.NUMPAD_4:this._keyDx+=
10;break;case d.PAGE_UP:case d.NUMPAD_9:this._keyDx-=10;this._keyDy+=10;break;case d.PAGE_DOWN:case d.NUMPAD_3:this._keyDx-=10;this._keyDy-=10;break;case d.END:case d.NUMPAD_1:this._keyDx+=10;this._keyDy-=10;break;case d.HOME:case d.NUMPAD_7:this._keyDx+=10;this._keyDy+=10;break;default:return}c.__pan(this._keyDx,this._keyDy)}y.stop(a)}},_keyEnd:function(a){var b=this.map;b.__panning&&a.keyCode!==d.SHIFT&&(b.__panEnd(this._keyDx,this._keyDy),this._keyDx=this._keyDy=0)},_swipeInit:function(a){var b=
this.map,b=b._zoomAnim||b._panAnim;if(a.shiftKey)return!1;b&&b._active&&(b.stop(),b._fire("onEnd",[b.node]));this._dragOrigin=new h(0,0);k.mixin(this._dragOrigin,a.screenPoint);f(this._swipeHandle);f(this._swipeEndHandle);this._swipeHandle=e(this.touchEvents||this.pointerEvents,"onSwipeMove",this,this._swipe);this._swipeEndHandle=e(this.touchEvents||this.pointerEvents,"onSwipeEnd",this,this._swipeEnd)},_swipe:function(a){var b=this.map;b.__panning?(this._panX=a.screenPoint.x,this._panY=a.screenPoint.y,
b.__pan(a.screenPoint.x-this._dragOrigin.x,a.screenPoint.y-this._dragOrigin.y)):(b.setCursor("move"),b.__panStart(a.screenPoint.x,a.screenPoint.y))},_swipeEnd:function(a){f(this._swipeHandle);f(this._swipeEndHandle);this._swipeHandle=this._swipeEndHandle=null;var b=this.map;b.__panning&&(b.resetMapCursor(),b.__panEnd(a.screenPoint.x-this._dragOrigin.x,a.screenPoint.y-this._dragOrigin.y))},_pinchInit:function(a){var b=this.map,c=b._zoomAnim||b._panAnim;c&&c._active?(c.stop(),c._fire("onEnd",[c.node])):
b.__panning&&(a.screenPoint=new h(this._panX,this._panY),a.mapPoint=b.toMap(a.screenPoint),this._swipeEnd(a));f(this._pinchHandle);f(this._pinchEndHandle);this._pinchHandle=e(this.touchEvents||this.pointerEvents,"onPinchMove",this,this._pinch);this._pinchEndHandle=e(this.touchEvents||this.pointerEvents,"onPinchEnd",this,this._pinchEnd)},_pinch:function(a){var b=this.map;if(a.screenPoints){this.currLength=G.getLength(a.screenPoints[0],a.screenPoints[1]);var c;b.__zooming?(c=this.currLength/this._length,
this._zoomStartExtent=this.__scaleExtent(b.extent,c,this._dragOrigin),b.__zoom(this._zoomStartExtent,c,this._dragOrigin)):(this._dragOrigin=new h((a.screenPoints[0].x+a.screenPoints[1].x)/2,(a.screenPoints[0].y+a.screenPoints[1].y)/2),this._length=this.currLength,b.__zoomStart(b.extent,this._dragOrigin));this._pinchScale=c;b._fireOnScale(this.currLength/this._length,this._dragOrigin,!0)}},_pinchEnd:function(a){a=this.map;f(this._pinchHandle);f(this._pinchEndHandle);this._pinchHandle=this._pinchEndHandle=
null;this._pinchScale=0;if(a.__zooming&&null===a._zoomAnim){var b=this.currLength/this._length,c=a.extent.getWidth();this._zoomAnimAnchor=a.toMap(this._dragOrigin);this._zoomStartExtent=this.__scaleExtent(a.extent,1/b,this._zoomAnimAnchor);if(a.__tileInfo){var d=F.getCandidateTileInfo(a,a.__tileInfo,this._zoomStartExtent),e=a.__getExtentForLevel(d.lod.level,this._zoomAnimAnchor),g=a.getMinZoom(),k=a.getMaxZoom(),h=e.extent,e=e.lod,l=c/h.getWidth(),m=d.lod.level;1>b?l>b&&m--:l<b&&m++;m<g?m=g:m>k&&
(m=k);m!==d.lod.level&&(e=a.__getExtentForLevel(m,this._zoomAnimAnchor),h=e.extent,e=e.lod);this._zoomEndExtent=h;this._zoomEndLod=e;a._zoomAnim=D.animateRange({range:{start:c/this._zoomStartExtent.getWidth(),end:l},duration:n.defaults.map.zoomDuration,rate:n.defaults.map.zoomRate,onAnimate:this._adjustPinch,onEnd:this._adjustPinchEnd});a._zoomAnim.play();a._fireOnScale(a.extent.getWidth()/this._zoomEndExtent.getWidth(),this._dragOrigin)}else this._zoomEndExtent=this._zoomStartExtent,a._fireOnScale(a.extent.getWidth()/
this._zoomEndExtent.getWidth(),this._dragOrigin),this._adjustPinchEnd()}},_adjustPinch:function(a){var b=this.__scaleExtent(this.map.extent,a,this._zoomAnimAnchor);this.map.__zoom(b,a,this._dragOrigin)},_adjustPinchEnd:function(){var a=this.map,b=a.extent.getWidth()/this._zoomEndExtent.getWidth(),c=this.__scaleExtent(a.extent,1/b,this._zoomAnimAnchor),d=this._dragOrigin,e=this._zoomEndLod;this._zoomStartExtent=this._zoomEndExtent=this._zoomEndLod=this._dragOrigin=a._zoomAnim=this._zoomAnimAnchor=
null;a.__zoomEnd(c,b,d,e,!0)},__scaleExtent:function(a,b,c){c=c||a.getCenter();b=a.expand(b);var d=a.xmin-(b.getWidth()-a.getWidth())*(c.x-a.xmin)/a.getWidth();c=a.ymax-(b.getHeight()-a.getHeight())*(c.y-a.ymax)/a.getHeight();return new p(d,c-b.getHeight(),d+b.getWidth(),c,a.spatialReference)},_normalizeRect:function(a){a=a.screenPoint;var b=this._dragOrigin.x,c=this._dragOrigin.y;a=new v((a.x<b?a.x:b)-this.map.__visibleRect.x,(a.y<c?a.y:c)-this.map.__visibleRect.y,Math.abs(a.x-b),Math.abs(a.y-c));
delete a.spatialReference;0===a.width&&(a.width=1);0===a.height&&(a.height=1);return a},setImmediateClick:function(a){switch(this.eventModel){case "mouse":this.mouseEvents.setImmediateClick(a);break;case "touch":this.touchEvents.setImmediateTap(a);this.mouseEvents&&this.mouseEvents.setImmediateClick(a);break;case "pointer":this.pointerEvents.setImmediateTap(a)}},enablePan:function(){this.disablePan();switch(this.eventModel){case "mouse":this._panInitHandle=e(this.mouseEvents,"onMouseDown",this,this._panInit);
break;case "touch":this._panInitHandle=e(this.mouseEvents,"onMouseDown",this,this._panInit);this._swipeInitHandle=e(this.touchEvents,"onSwipeStart",this,this._swipeInit);break;case "pointer":this._swipeInitHandle=e(this.pointerEvents,"onSwipeStart",this,this._swipeInit)}},disablePan:function(){f(this._panInitHandle);this._panInitHandle=null;f(this._swipeInitHandle);this._swipeInitHandle=null},enableRubberBandZoom:function(){this.disableRubberBandZoom();this._zoomInitHandle=this.pointerEvents?e(this.pointerEvents,
"onSwipeStart",this,this._zoomInit):e(this.mouseEvents,"onMouseDown",this,this._zoomInit)},disableRubberBandZoom:function(){f(this._zoomInitHandle);this._zoomInitHandle=null},enablePinchZoom:function(){this.disablePinchZoom();if("touch"===this.eventModel||"pointer"===this.eventModel)this._pinchInitHandle=e(this.touchEvents||this.pointerEvents,"onPinchStart",this,this._pinchInit)},disablePinchZoom:function(){f(this._pinchInitHandle);this._pinchInitHandle=null},enableScrollWheelZoom:function(){this.disableScrollWheelZoom();
this._wheelHandle=e(this.mouseEvents||this.pointerEvents,"onMouseWheel",this,this._wheelZoom)},disableScrollWheelZoom:function(){f(this._wheelHandle);this._wheelHandle=null},enableScrollWheelPan:function(){var a=this.map;a&&a.loaded&&a.smartNavigation&&(this.disableScrollWheelPan(),this._setScrollWheelPan(!0))},disableScrollWheelPan:function(){var a=this.map;a&&a.loaded&&a.smartNavigation&&this._setScrollWheelPan(!1)},enableDoubleClickZoom:function(){this.disableDoubleClickZoom();switch(this.eventModel){case "mouse":this._dblClickHandle=
e(this.mouseEvents,"onDblClick",this,this._dblClickZoom);break;case "touch":this._dblClickHandle=e(this.mouseEvents,"onDblClick",this,this._dblClickZoom);this._dblTapHandle=e(this.touchEvents,"onDoubleTap",this,this._dblClickZoom);this._zoomOutHandle=e(this.touchEvents,"onTwoFingerTap",this,this._twoFingerTap);break;case "pointer":this._dblTapHandle=e(this.pointerEvents,"onDoubleTap",this,this._dblClickZoom),this._zoomOutHandle=e(this.pointerEvents,"onTwoFingerTap",this,this._twoFingerTap)}},disableDoubleClickZoom:function(){f(this._dblClickHandle);
f(this._zoomOutHandle);this._dblTapHandle&&f(this._dblTapHandle);this._dblClickHandle=this._zoomOutHandle=this._dblTapHandle=null},enableShiftDoubleClickZoom:function(){this.disableShiftDoubleClickZoom();this._sDblClickHandle=e(this.pointerEvents||this.mouseEvents,"onDblClick",this,this._recenterZoom)},disableShiftDoubleClickZoom:function(){f(this._sDblClickHandle);this._sDblClickHandle=null},enableClickRecenter:function(){this.disableClickRecenter();this._recenterHandle=e(this.pointerEvents||this.mouseEvents,
"onClick",this,this._recenter)},disableClickRecenter:function(){f(this._recenterHandle);this._recenterHandle=null},enableKeyboardNavigation:function(){this.disableKeyboardNavigation();this._keyHandle=e(this.pointerEvents||this.mouseEvents,"onKeyDown",this,this._keyDown);this._keyEndHandle=e(this.pointerEvents||this.mouseEvents,"onKeyUp",this,this._keyEnd)},disableKeyboardNavigation:function(){f(this._keyHandle);f(this._keyEndHandle);this._keyHandle=this._keyEndHandle=null},enableScrollWheel:function(){var a=
this.map;a&&(a.smartNavigation?this.enableScrollWheelPan():a.enableScrollWheelZoom())},disableScrollWheel:function(){var a=this.map;a&&(a.disableScrollWheelZoom(),a.smartNavigation&&this.disableScrollWheelPan())},enableNavigation:function(){var a=this.map;a&&a.loaded&&(a._evalNavigationFeature("DoubleClickZoom"),a._evalNavigationFeature("ClickRecenter"),a._evalNavigationFeature("Pan"),a._evalNavigationFeature("RubberBandZoom"),a._evalNavigationFeature("PinchZoom"),a._evalNavigationFeature("KeyboardNavigation"),
a._evalNavigationFeature("ScrollWheel"))},disableNavigation:function(){var a=this.map;a&&a.loaded&&(a._evalNavigationFeature("DoubleClickZoom"),a._evalNavigationFeature("ClickRecenter"),a._evalNavigationFeature("Pan"),a._evalNavigationFeature("RubberBandZoom"),a._evalNavigationFeature("PinchZoom"),a._evalNavigationFeature("KeyboardNavigation"),a._evalNavigationFeature("ScrollWheel"))},destroy:function(){this.touchEvents&&this.touchEvents.destroy();this.mouseEvents&&this.mouseEvents.destroy();this.pointerEvents&&
this.pointerEvents.destroy();var a,b=[this._panInitHandle,this._panStartHandle,this._panHandle,this._panEndHandle,this._zoomInitHandle,this._zoomHandle,this._zoomEndHandle,this._wheelHandle,this._mwMacHandle,this._dblClickHandle,this._zoomOutHandle,this._recenterHandle,this._sDblClickHandle,this._dblTapHandle,this._keyHandle,this._keyEndHandle,this._swipeInitHandle,this._swipeHandle,this._swipeEndHandle,this._pinchInitHandle,this._pinchHandle,this._pinchEndHandle];for(a=0;a<b.length;a++)f(b[a]);this.map=
this.touchEvents=this.mouseEvents=this.eventModel=this.pointerEvents=this._zoomRect=this._dragOrigin=this._panInitHandle=this._panStartHandle=this._panHandle=this._panEndHandle=this._zoomInitHandle=this._zoomHandle=this._zoomEndHandle=this._wheelHandle=this._mwMacHandle=this._dblClickHandle=this._zoomOutHandle=this._recenterHandle=this._sDblClickHandle=this._dblTapHandle=this._keyHandle=this._keyEndHandle=this._swipeInitHandle=this._swipeHandle=this._swipeEndHandle=this._pinchInitHandle=this._pinchHandle=
this._pinchEndHandle=null}});g("extend-esri")&&(z.MapNavigationManager=l);return l});