// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/base/conditionals/INSPIRE_LineageStatement","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/topic dojo/has ../../../../../../kernel dojo/i18n!../../../../nls/i18nArcGIS ../../../../base/Conditional".split(" "),function(e,f,n,g,h,k,l,m){e=e(m,{key:"INSPIRE_LineageStatement",postCreate:function(){this.inherited(arguments);var c=this;this.own(g.subscribe("gxe/interaction-occurred",function(a){try{if(c.parentXNode&&a&&a.inputWidget&&a.inputWidget.parentXNode){var d=
a.inputWidget.parentXNode.gxePath;"/metadata/dqInfo/dqScope/scpLvl/ScopeCd/@value"===d?c.emitInteractionOccurred():"/metadata/dqInfo/dataLineage/statement"===d&&c.emitInteractionOccurred()}}catch(b){console.error(b)}}))},validateConditionals:function(c){var a=this.newStatus({message:l.conditionals[this.key]}),d=!0,b=this.parentXNode.parentElement.parentElement;this.focusNode||(this.focusNode=this.parentXNode.inputWidget.focusNode);!this.isXNodeOff(this.parentXNode)&&this.isXNodeInputEmpty(this.parentXNode)&&
(b=this.findInputValue("/metadata/dqInfo/dqScope/scpLvl/ScopeCd/@value",b.domNode),"005"==b||"006"==b)&&(d=!1);a.isValid=d;this.track(a,c);return a}});h("extend-esri")&&f.setObject("dijit.metadata.types.arcgis.base.conditionals.INSPIRE_LineageStatement",e,k);return e});