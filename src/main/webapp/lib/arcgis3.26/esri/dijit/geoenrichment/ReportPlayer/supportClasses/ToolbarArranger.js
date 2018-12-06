// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/supportClasses/ToolbarArranger",["dojo/_base/declare","dojo/_base/lang","dojo/dom-style","esri/dijit/geoenrichment/utils/DomUtil"],function(f,g,d,b){return f(null,{showAreaTitle:!1,stretchToolbarNode:null,domNode:null,infographicsSelectDiv:null,areaTitleDiv:null,areaTitleInnerDiv:null,rightSideControlsBlock:null,areasSelectDiv:null,zoomSelectDiv:null,pageSelectDiv:null,commandButtonsContainer:null,constructor:function(a){g.mixin(this,a)},arrangeControls:function(){b[0<
this.infographicsSelectDiv.children.length?"show":"hide"](this.infographicsSelectDiv);b[this.showAreaTitle?"show":"hide"](this.areaTitleDiv);this.domNode.style.width="";this.areaTitleDiv.style.marginLeft="";this.areaTitleInnerDiv.style.maxWidth="";this.rightSideControlsBlock.style.position=this.stretchToolbarNode?"absolute":"static";this.stretchToolbarNode&&(this.domNode.style.width=this.stretchToolbarNode.clientWidth+"px",this._processStretchSpecialCases(this.stretchToolbarNode))},_processStretchSpecialCases:function(a){function c(a){return b.isHidden(a)?
0:a.clientWidth+e(a)}function e(a){return b.isHidden(a)?0:d.get(a,"marginLeft")+d.get(a,"marginRight")}this.showAreaTitle&&(a=a.clientWidth,a-=c(this.infographicsSelectDiv),a-=c(this.rightSideControlsBlock),a-=c(this.areasSelectDiv),a-=e(this.areaTitleDiv),this.areaTitleInnerDiv.style.maxWidth=a+"px",b.isHidden(this.infographicsSelectDiv)||b.isHidden(this.infographicsSelectDiv)||(this.areaTitleDiv.style.marginLeft=Math.min(a-this.areaTitleDiv.clientWidth,(this.domNode.clientWidth-this.areaTitleDiv.clientWidth)/
2-c(this.infographicsSelectDiv))+"px"))},hasVisibleControls:function(){return[this.infographicsSelectDiv,this.areaTitleDiv,this.areasSelectDiv,this.pageSelectDiv,this.zoomSelectDiv,this.commandButtonsContainer].some(b.isNodeInLayout)}})});