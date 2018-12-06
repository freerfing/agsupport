// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/PopupMobile","require dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/_base/window dojo/_base/kernel dojo/has dojo/query dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style ../InfoWindowBase ../PopupBase ./InfoView ./NavigationBar ../kernel ../domUtils dojo/i18n!../nls/jsapi dojo/NodeList-dom".split(" "),function(k,t,p,d,q,r,e,u,E,v,w,c,n,x,m,y,z,A,B,C,g,D){k=t([y,z],{declaredClass:"esri.dijit.PopupMobile",offsetX:3,
offsetY:3,zoomFactor:4,marginLeft:10,marginTop:10,highlight:!0,popupNavigationBar:null,popupInfoView:null,location:null,xIcon:k.toUrl("./images/whitex.png"),dArrowIcon:k.toUrl("./images/whitedown.png"),lArrowIcon:k.toUrl("./images/whitel.png"),rArrowIcon:k.toUrl("./images/whiter.png"),constructor:function(a,b){this.initialize();p.mixin(this,a);this.domNode=v.byId(b);this._nls=p.mixin({},D.widgets.popup);a=this.domNode;c.add(a,"esriPopupMobile");w.set(a,"innerHTML","\x3cdiv class\x3d'sizer'\x3e\x3cdiv class\x3d'titlePane'\x3e\x3cdiv class\x3d'spinner hidden'\x3e\x3c/div\x3e\x3cdiv class\x3d'title'\x3e\x3c/div\x3e\x3cdiv style\x3d'text-align:center'\x3e\x3cdiv class\x3d'titleButton prev hidden'\x3e\x3c/div\x3e\x3cdiv class\x3d'footer' style\x3d'display:inline-block;width:60px;height:15px;'\x3e\x3c/div\x3e\x3cdiv class\x3d'titleButton next hidden'\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'titleButton close'\x3e\x3c/div\x3e\x3cdiv class\x3d'titleButton arrow hidden'\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'pointer top hidden'\x3e\x3c/div\x3e\x3cdiv class\x3d'pointer bottom hidden'\x3e\x3c/div\x3e");
b=e.query(".titlePane",a)[0];this._arrowButton=e.query(".arrow",b)[0];this._pointerTop=e.query(".top",a)[0];this._pointerBottom=e.query(".bottom",a)[0];this._title=e.query(".title",b)[0];this._footer=e.query(".footer",b)[0];this._prev=e.query(".prev",b)[0];this._next=e.query(".next",b)[0];this._spinner=e.query(".spinner",b)[0];this._eventConnections=[d.connect(e.query(".close",b)[0],"onclick",this,this.hide),d.connect(this._arrowButton,"onclick",this,this._toggleView),d.connect(this._prev,"onclick",
this,function(){this.selectPrevious();this._updateUI()}),d.connect(this._next,"onclick",this,function(){this.selectNext();this._updateUI()})];this._initPopupNavigationBar();this._initPopupInfoView();g.hide(a);this.isShowing=!1},setMap:function(a){this.inherited(arguments);n.place(this.domNode,a.root);this.highlight&&this.enableHighlight(a)},unsetMap:function(){this.disableHighlight(this.map);this.inherited(arguments)},setTitle:function(a,b){this.destroyDijits(this._title);this.place(a,this._title);
this.destroyDijits(this._footer);this.place(b,this._footer);this.isShowing&&(this.startupDijits(this._title),this.startupDijits(this._footer))},setContent:function(a){this.destroyDijits(this._contentPane);this.place(a,this._contentPane);this.startupDijits(this._contentPane)},show:function(a){if(a){var b=this.map;a.spatialReference?(this.location=a,a=b.toScreen(a)):this.location=b.toMap(a);this._maximized?this.restore():this._setPosition(a);this.isShowing||(g.show(this.domNode),this.isShowing=!0,this.onShow())}else g.show(this.domNode),
this.isShowing=!0},hide:function(){this.isShowing&&(g.hide(this.domNode),this.isShowing=!1,this.onHide())},onShow:function(){this._followMap();this.startupDijits(this._title);this.showHighlight()},onHide:function(){this._unfollowMap();this.hideHighlight()},destroy:function(){this.map&&this.unsetMap();this.cleanup();this.isShowing&&this.hide();this.destroyDijits(this._title);this.destroyDijits(this._footer);q.forEach(this._eventConnections,d.disconnect);n.destroy(this.domNode)},selectNext:function(){this.select(this.selectedIndex+
1)},selectPrevious:function(){this.select(this.selectedIndex-1)},setFeatures:function(){this.inherited(arguments);this._updateUI()},onSetFeatures:function(){},onClearFeatures:function(){this.setTitle("\x26nbsp;","\x26nbsp;");c.add(this._arrowButton,"hidden");this._updateUI();this.hideHighlight()},onSelectionChange:function(){var a=this.selectedIndex;this._updateUI();0<=a&&(this.setContent(this.features[a].getContent()),this.updateHighlight(this.map,this.features[a]),this.isShowing&&this.showHighlight())},
onDfdComplete:function(){this._updateUI()},_followMap:function(){this._unfollowMap();var a=this.map;this._handles=[d.connect(a,"onPanStart",this,this._onPanStart),d.connect(a,"onPan",this,this._onPan),d.connect(a,"onZoomStart",this,this._onZoomStart),d.connect(a,"onExtentChange",this,this._onExtentChange)]},_unfollowMap:function(){var a=this._handles;a&&(q.forEach(a,d.disconnect),this._handles=null)},_onPanStart:function(){var a=this.domNode.style;this._panOrigin={left:a.left,top:a.top,right:a.right,
bottom:a.bottom}},_onPan:function(a,b){var c=this._panOrigin;a=b.x;b=b.y;var f=c.left,h=c.top,d=c.right,c=c.bottom;f&&(f=parseFloat(f)+a+"px");h&&(h=parseFloat(h)+b+"px");d&&(d=parseFloat(d)-a+"px");c&&(c=parseFloat(c)-b+"px");m.set(this.domNode,{left:f,top:h,right:d,bottom:c})},_onZoomStart:function(){g.hide(this.domNode)},_onExtentChange:function(a,b,c){c&&(g.show(this.domNode),this.show(this._targetLocation||this.location),this._targetLocation=null)},_setPosition:function(a){var b=a.x;a=a.y;var d=
x.getContentBox(this.map.container),f=d.w,d=d.h,h=0,g=a+10,e=118,l=f-18;18<b&&b<l?(h=b-130,0>h?h=0:h>f-260&&(h=f-260)):18>=b?h=b-18:b>=l&&(h=f-260+(b-l));118<b&&b<f-130?e=118:118>=b?18<b?e=b-12:18>=b&&(e=6):b>=f-130&&(b<l?e=118+b-(f-130):b>=l&&(e=118+l-(f-130)));a<=d/2?(m.set(this.domNode,{left:h+"px",top:g+"px",bottom:null}),m.set(this._pointerTop,{left:e+"px"}),c.add(this._pointerBottom,"hidden"),c.remove(this._pointerTop,"hidden")):(m.set(this.domNode,{left:h+"px",top:g-64+"px",bottom:null}),m.set(this._pointerBottom,
{left:e+"px"}),c.add(this._pointerTop,"hidden"),c.remove(this._pointerBottom,"hidden"))},_showPointer:function(a){q.forEach(["topLeft","topRight","bottomRight","bottomLeft"],function(b){b===a?e.query(".pointer."+b,this.domNode).removeClass("hidden"):e.query(".pointer."+b,this.domNode).addClass("hidden")},this)},_toggleView:function(){this.popupNavigationBar||this._initPopupNavigationBar();this.popupInfoView||this._initPopupInfoView();this.hide();g.show(this.popupNavigationBar.container);g.show(this.popupInfoView.container);
0<=this.selectedIndex&&this.setContent(this.features[this.selectedIndex].getContent())},_handleNavigationBar:function(a){this.popupInfoView.animateTo(0);switch(a.name){case "CloseButton":g.hide(this.popupNavigationBar.container);g.hide(this.popupInfoView.container);this.hide();break;case "ToggleButton":g.hide(this.popupNavigationBar.container);g.hide(this.popupInfoView.container);this.show(this.location);break;case "PreviousButton":this.selectPrevious();this._updateUI();break;case "NextButton":this.selectNext(),
this._updateUI()}},_initPopupNavigationBar:function(){var a={};a.items=[{name:"CloseButton",type:"img",src:this.xIcon,srcAlt:this.xIcon,position:"left"},{name:"Title",type:"span",text:"",position:"center"},{name:"ToggleButton",type:"img",src:this.dArrowIcon,srcAlt:this.dArrowIcon,position:"right",toggleGroup:"toggle"},{name:"PreviousButton",type:"img",src:this.lArrowIcon,srcAlt:this.lArrowIcon,position:"right2",toggleGroup:"previous"},{name:"NextButton",type:"img",src:this.rArrowIcon,srcAlt:this.rArrowIcon,
position:"right1",toggleGroup:"next"}];this.popupNavigationBar=new B(a,n.create("div",{},r.body()));d.connect(this.popupNavigationBar,"onCreate",this,function(a){this._prevFeatureButton=a[3]._node;this._nextFeatureButton=a[4]._node});d.connect(this.popupNavigationBar,"onSelect",this,this._handleNavigationBar);d.connect(this.popupNavigationBar,"onUnSelect",this,this._handleNavigationBar);this.popupNavigationBar.startup();g.hide(this.popupNavigationBar.container)},_initPopupInfoView:function(){this.popupInfoView=
new A({items:[{name:"Navigator",type:"div",text:""},{name:"content",type:"div",text:""},{name:"attachment",type:"div",text:""}]},n.create("div",{},r.body()));c.add(this.popupInfoView.container,"esriMobilePopupInfoView");this.popupInfoView.enableTouchScroll();d.connect(this.popupInfoView,"onCreate",this,function(a){this._contentPane=a[1]._node;0<=this.selectedIndex&&this.setContent(this.features[this.selectedIndex].getContent())});d.connect(this.popupInfoView,"onSwipeLeft",this,function(){});d.connect(this.popupInfoView,
"onSwipeRight",this,function(){});this.popupInfoView.startup()},_updateUI:function(){var a="\x26nbsp;",b="\x26nbsp;",d=this.selectedIndex,f=this.features,e=this.deferreds,g=this._prevFeatureButton.parentNode,k=this._nextFeatureButton.parentNode,l=this._spinner,m=this._nls;f&&1<=f.length?(a=f[d].getTitle(),b=d+1+" of "+f.length,c.remove(this._arrowButton,"hidden"),0===d?(c.add(g,"hidden"),c.add(this._prev,"hidden")):(c.remove(g,"hidden"),c.remove(this._prev,"hidden")),d===f.length-1?(c.add(k,"hidden"),
c.add(this._next,"hidden")):(c.remove(k,"hidden"),c.remove(this._next,"hidden"))):(c.add(this._arrowButton,"hidden"),c.add(g,"hidden"),c.add(k,"hidden"),c.add(this._prev,"hidden"),c.add(this._next,"hidden"));this.setTitle(a,b);this.popupNavigationBar.getItems()[1]._node.innerHTML=b;e&&e.length?(c.remove(l,"hidden"),this.setTitle(m.NLS_searching+"...","\x26nbsp;")):(c.add(l,"hidden"),f&&f.length||this.setTitle("No Information","\x26nbsp;"))}});u("extend-esri")&&p.setObject("dijit.PopupMobile",k,C);
return k});