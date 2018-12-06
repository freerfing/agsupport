// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/form/CitationDateElement","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../../../../../kernel ../../../base/etc/docUtil ../../../form/OpenElement dojo/i18n!../../../nls/i18nArcGIS dojo/i18n!../../../nls/i18nBase".split(" "),function(c,f,m,g,h,n,p,k,l){c=c([p],{postCreate:function(){this.inherited(arguments)},afterValidateValue:function(q,a,b){var d=this.gxeDocument;if("pubDate"===this.target&&!d.isAgsItemDescription&&!d.isAgsFGDC&&(b=null===
b||0===f.trim(b).length,a.isValid||b)){var c=k.citation.conditionalDate.msg,e=["createDate","pubDate","reviseDate"];d.isAgsNAP&&(c=k.citation.conditionalDate.msg_nap,e="createDate pubDate reviseDate notavailDate inforceDate adoptDate deprecDate supersDate".split(" "));var d=m.some(e,function(a){return this._hasDateValue(q,a)},this),e=l.validation.pattern,g=k.citation.conditionalDate.caption,h=l.validation.ok;d?b&&(a.message=e.replace("{label}",g).replace("{message}",h)):(a.isValid=!1,a.message=c)}},
_hasDateValue:function(c,a){var b=n.findInputWidget(this.parentElement.gxePath+"/"+a,this.domNode.parentNode).getInputValue(),d=null===b||0===f.trim(b).length;d||(a={label:a,isValid:!0},this.inputWidget.forceTime?c._checkDateTime(a,b):this.inputWidget.allowTime&&-1!==b.indexOf("T")?c._checkDateTime(a,b):c._checkDate(a,b),a.isValid||(d=!0));return!d}});g("extend-esri")&&f.setObject("dijit.metadata.types.arcgis.form.CitationDateElement",c,h);return c});