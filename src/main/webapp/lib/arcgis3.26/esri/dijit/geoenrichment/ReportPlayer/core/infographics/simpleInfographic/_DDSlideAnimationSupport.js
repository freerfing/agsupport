// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/simpleInfographic/_DDSlideAnimationSupport","dojo/_base/declare dojo/dom-class dojo/dom-style ./SimpleInfographicViewModes esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/animation/AnimationUtil".split(" "),function(e,d,h,f,c,k){return e(null,{_showSlideTransition:function(b,e){function g(){b===f.VIEW_MAIN?(c.show(a.mainViewDiv),c.hide(a.dataDrillingViewDiv)):(c.show(a.dataDrillingViewDiv),c.hide(a.mainViewDiv));
a._mode=b;d[b===f.VIEW_DATA_DRILLING?"add":"remove"](a.domNode,"isDrillingData");d.remove(a.domNode,"isShowingAnimation");a.onViewModeChanged(b)}var a=this;if(this._mode!==b){d.add(this.domNode,"isShowingAnimation");d.add(this.dataDrillingViewDiv,"isSlideAnimation esriGEAbsoluteStretched");if(e)return c.show([this.mainViewDiv,this.dataDrillingViewDiv]),k.animateSlide(this.mainViewDiv,this.dataDrillingViewDiv,{leftToRight:b===f.VIEW_DATA_DRILLING,width:h.get(this.domNode,"width"),onEnd:g});g()}}})});