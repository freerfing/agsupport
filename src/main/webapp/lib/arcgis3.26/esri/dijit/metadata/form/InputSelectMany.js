// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/form/templates/InputSelectMany.html":'\x3cdiv class\x3d"gxeInput gxeInputSelectMany"\x3e\r\n  \x3cdiv class\x3d"gxeEditOnly" data-dojo-attach-point\x3d"optionsNode"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"gxeViewOnlyText gxeViewOnly" data-dojo-attach-point\x3d"viewOnlyNode"\x3e\x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"containerNode" style\x3d"display:none;"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/form/InputSelectMany","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/dom-construct dojo/has ../base/InputBase ../base/OptionsMixin dojo/text!./templates/InputSelectMany.html ../../../kernel".split(" "),function(d,e,c,g,k,l,m,n,p){d=d([l,m],{_supportsMultipleValues:!0,checkBoxes:null,templateString:n,subTarget:null,postCreate:function(){this.inherited(arguments);this.checkBoxes=[]},startup:function(){this._started||(this.inherited(arguments),this.initializeOptions())},
addOption:function(a,b){var q=this,f=this.id+"_chk"+b,c=g.create("div",{"class":"gxeOption"},this.optionsNode);b=a.label;var h={id:f,type:"checkbox",value:a.value};a.selected&&(h.checked="checked");h.onclick=function(){q._onClick(this)};a=g.create("input",h,c);a.xtnLabel=b;this.checkBoxes.push(a);a=g.create("label",{"for":f},c);this.setNodeText(a,b)},filterOptions:function(a){if(!this.parentXNode||!this.parentXNode.optionsFilter)return a;var b=this.parentXNode.optionsFilter.split(",");return c.filter(a,
function(a){return c.some(b,function(b){return a.value===b})})},getDisplayValue:function(){var a=[];c.forEach(this.checkBoxes,function(b){b.checked&&a.push(b.xtnLabel)});return 1===a.length?a[0]:1<a.length?a:null},getInputValue:function(){var a=[];c.forEach(this.checkBoxes,function(b){b.checked&&a.push(b.value)});return 1===a.length?a[0]:1<a.length?a:null},importValues:function(a,b){c.forEach(this.checkBoxes,function(a){var f,d=c.some(b,function(b){if(null!=b)return f=e.trim(b),f===a.value});a.checked=
d});this.applyViewOnly()},initializeOptions:function(){this.fetchOptionWidgets().then(e.hitch(this,function(a){a=this.filterOptions(a);this.populateOptions(a)}),e.hitch(this,function(a){console.error(a)}),e.hitch(this,function(a){}))},_onClick:function(a){this.emitInteractionOccurred()},populateOptions:function(a){c.forEach(a,function(a,b){this.addOption(a,b)},this);var b=this.containerNode;this.destroyDescendants(!1);setTimeout(function(){g.destroy(b)},5E3)}});k("extend-esri")&&e.setObject("dijit.metadata.form.InputSelectMany",
d,p);return d});