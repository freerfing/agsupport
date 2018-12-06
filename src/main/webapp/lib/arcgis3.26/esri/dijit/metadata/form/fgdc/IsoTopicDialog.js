// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/form/fgdc/IsoTopicDialog","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/dom-class dojo/dom-construct dojo/has dijit/_WidgetBase dojo/i18n!../../nls/i18nBase dojo/i18n!../../nls/i18nFgdc ../../base/etc/docUtil ../IsoTopicCategoryOptions dijit/Dialog ../../editor/util/OkCancelBar ../../../../kernel".split(" "),function(d,e,g,l,f,k,m,x,n,p,q,r,t,u){d=d([m],{checkBoxes:null,dialogTitle:n.idinfo.keywords.themektIsoTopicDialog,values:null,postCreate:function(){this.inherited(arguments);
this.checkBoxes=[]},onChange:function(b){},show:function(){var b=new q;b.fetchOptionWidgets().then(e.hitch(this,function(c){this._showDialog(b,c)}))},_addOption:function(b,c,a){c=this.id+"_chk"+c;var e=f.create("div",{"class":"gxeOption"},a);a=b.label;var d=b.value;b=g.some(this.values,function(a){if(a===d)return!0});var h={id:c,type:"checkbox",value:d};b&&(h.checked="checked");b=f.create("input",h,e);this.checkBoxes.push(b);c=f.create("label",{"for":c},e);p.setNodeText(c,a)},_applySelections:function(b){var c=
[];g.forEach(this.checkBoxes,function(a){a.checked&&c.push(a.value)});this.onChange(c);b.hide()},_showDialog:function(b,c){var a=null,d=f.create("div",{}),k=f.create("div",{"class":"gxeOptions"},d);g.forEach(c,function(a,b){this._addOption(a,b,k)},this);var h=new t({onOkClick:e.hitch(this,function(){a&&this._applySelections(a)}),onCancelClick:e.hitch(this,function(){a&&a.hide()})},f.create("div",{},d)),a=new r({"class":"gxeDialog gxePopupDialog gxeIsoTopicDialog",title:this.dialogTitle,content:d});
this.isLeftToRight()||l.add(a.domNode,"gxeRtl");this.own(a.on("hide",e.hitch(this,function(){setTimeout(e.hitch(this,function(){try{b.destroyRecursive(!1),g.forEach(c,function(a){try{a.destroyRecursive(!1)}catch(w){console.error(w)}})}catch(v){console.error(v)}h.destroyRecursive(!1);a.destroyRecursive(!1);this.destroyRecursive(!1)}),300)})));a.show()}});k("extend-esri")&&e.setObject("dijit.metadata.form.fgdc.IsoTopicDialog",d,u);return d});