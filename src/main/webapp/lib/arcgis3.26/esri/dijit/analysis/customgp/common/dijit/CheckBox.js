// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/customgp/common/dijit/CheckBox","dojo/_base/declare dijit/_WidgetBase dojo/_base/lang dojo/_base/html dojo/dom-class dojo/on dojo/Evented".split(" "),function(f,g,c,b,d,e,h){return f([g,h],{baseClass:"jimu-checkbox",declaredClass:"esri.dijit.analysis.customgp.common.dijit.CheckBox",checked:!1,status:!0,label:"",postCreate:function(){this.checkNode=b.create("div",{"class":"checkbox jimu-float-leading"},this.domNode);this.labelNode=b.create("div",{"class":"label jimu-float-leading",
innerHTML:this.label||""},this.domNode);this.checked&&b.addClass(this.checkNode,"checked");this.status||b.addClass(this.domNode,"jimu-state-disabled");this.own(e(this.checkNode,"click",c.hitch(this,function(){this.status&&(this.checked?this.uncheck():this.check())})));this.own(e(this.labelNode,"click",c.hitch(this,function(){this.checked&&this.status?this.uncheck():this.status&&this.check()})));this._udpateLabelClass()},setLabel:function(a){this.label=a;this.labelNode.innerHTML=this.label;this._udpateLabelClass()},
_udpateLabelClass:function(){this.labelNode&&(this.labelNode.innerHTML?b.removeClass(this.labelNode,"not-visible"):b.addClass(this.labelNode,"not-visible"))},setValue:function(a){this.status&&(!0===a?this.check():this.uncheck())},getValue:function(){return this.checked},setStatus:function(a){a=!!a;var b=this.status!==a;(this.status=a)?d.remove(this.domNode,"jimu-state-disabled"):d.add(this.domNode,"jimu-state-disabled");b&&this.emit("status-change",a)},getStatus:function(){return this.status},check:function(){this.status&&
(this.checked=!0,b.addClass(this.checkNode,"checked"),this.onStateChange())},uncheck:function(a){if(this.status&&(this.checked=!1,b.removeClass(this.checkNode,"checked"),!a))this.onStateChange()},onStateChange:function(){if(this.onChange&&c.isFunction(this.onChange))this.onChange(this.checked);this.emit("change",this.checked)}})});