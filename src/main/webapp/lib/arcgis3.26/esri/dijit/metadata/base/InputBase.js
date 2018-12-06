// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/base/InputBase","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/topic dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/has ./etc/docUtil ./Templated ../../../kernel".split(" "),function(b,c,f,g,d,e,h,k,l,m,n){b=b([m],{_isGxeInput:!0,_supportsMultipleValues:!1,parentXNode:null,autoSetAriaLabel:!0,hint:null,postCreate:function(){this.inherited(arguments)},applyHint:function(){var a=this.hint;this.hintNode&&"undefined"!==typeof a&&null!==a&&this.parentXNode&&
this.parentXNode.gxeDocument&&!this.parentXNode.gxeDocument.isViewOnly&&(a=c.trim(a),0!==a.length&&(this.setNodeText(this.hintNode,a),e.add(this.hintNode,"populated")))},applyViewOnly:function(){if(this.viewOnlyNode&&this.parentXNode&&this.parentXNode.gxeDocument&&this.parentXNode.gxeDocument.isViewOnly){var a=this.getDisplayValue();"undefined"!==typeof a&&null!==a&&(a.push&&1===a.length&&(a=a[0]),a.push?(this.viewOnlyNode.innerHTML="",f.forEach(a,function(a){var b=h.create("div",{"class":"gxeParagraph"},
this.viewOnlyNode);this.setNodeText(b,a)},this)):this.setNodeText(this.viewOnlyNode,a),e.add(this.viewOnlyNode,"populated"))}},connectXNode:function(a,b){b?this.focusNode&&(this.focusNode.disabled=!0):this.applyHint();this.focusNode&&a&&a.fixed&&(this.focusNode.disabled=!0);a&&a.gxePath&&(this.focusNode?d.set(this.focusNode,"data-gxe-for",a.gxePath):d.set(this.domNode,"data-gxe-for",a.gxePath));this.autoSetAriaLabel&&this.focusNode&&a&&(a=a.getLabelString(),"string"===typeof a&&0<a.length&&"No Target"!==
a&&this.focusNode.setAttribute("aria-label",a))},emitInteractionOccurred:function(a){a||(a={inputWidget:this});this.emit("interaction-occurred",a);this.parentXNode&&null!==this.parentXNode.gxePath&&g.publish("gxe/interaction-occurred",a)},ensureFocus:function(){l.ensureVisibility(this);if(this.focusNode&&this.focusNode.focus)try{this.focusNode.focus()}catch(a){}},getDisplayValue:function(){return this.getInputValue()},getInputValue:function(){return null},getXmlValue:function(){return this.getInputValue()},
importValue:function(a,b){this.setInputValue(b)},importValues:function(a,b){},setInputValue:function(a){}});k("extend-esri")&&c.setObject("dijit.metadata.base.InputBase",b,n);return b});