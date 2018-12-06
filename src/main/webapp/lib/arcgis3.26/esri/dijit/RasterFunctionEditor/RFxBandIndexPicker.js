// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/RasterFunctionEditor/RFxBandIndexPicker","dojo/_base/declare dojo/_base/lang dojo/has dojo/Deferred dijit/form/Select ../../kernel".split(" "),function(d,e,f,g,h,k){d=d([h],{postCreate:function(){this.inherited(arguments);this.value=String(this.value);this._setOptionsFromNBandsArg(this.nBandsArg);this._attachNBandsArgChangeEvent()},_attachNBandsArgChangeEvent:function(){this.nBandsArg&&this.nBandsArg.input&&this.own(this.nBandsArg.input.on("change",e.hitch(this,this._setOptionsFromNBandsArg,
this.nBandsArg)))},_setOptionsFromNBandsArg:function(a){if(a&&a.input){var b=a.input.getSelectedLayer();b&&this._getBandCount(b).then(e.hitch(this,function(a){this.set("options",this._createOptions(a))}),e.hitch(this,function(){this.set("options",this._createOptions(b.bandCount))}))}else this.set("options",this._createFallbackOptions(this.value));this.reset()},_getBandCount:function(a){var b=new g,c;a||b.reject();if(a.renderingRule&&10.3<=a.currentVersion)return a.getRenderingRuleServiceInfo(a.renderingRule).then(function(b){return b?
b.bandCount:a.bandCount});c=a.bandCount;void 0===c&&null===c||b.resolve(c);return b.promise},_createOptions:function(a){for(var b=0,c=[];b<a;)c.push({value:String(b),label:String(b+1),selected:this.value===String(b)}),b++;return c},_createFallbackOptions:function(a){return[{value:a,label:String(+a+1)}]}});f("extend-esri")&&e.setObject("dijit.RasterFunctionEditor.RFxBandIndexPicker",d,k);return d});