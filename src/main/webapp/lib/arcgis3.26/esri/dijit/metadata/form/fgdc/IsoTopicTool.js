// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/form/fgdc/IsoTopicTool","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/query dojo/has dijit/registry ../tools/ClickableTool ./IsoTopicDialog ../../../../kernel".split(" "),function(b,e,n,f,g,h,k,l,m){b=b([k],{thesaurus:"http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#MD_KeywordTypeCode",postCreate:function(){this.inherited(arguments)},whenToolClicked:function(a,b){if(b&&b.parentXNode){var c,d=null;a=null;(c=b.parentXNode.getParentElement())&&
(c=f("[data-gxe-path\x3d'/metadata/idinfo/keywords/theme/themekey']",c.domNode))&&1===c.length&&(c=h.byNode(c[0]))&&(d=c.inputWidget,a=d.getInputValue(),null===a||a.push||(a=[a]));d&&(a=new l({values:a,onChange:e.hitch(this,function(a){b.setInputValue(this.thesaurus);d.importValues(null,a)})}),a.show())}}});g("extend-esri")&&e.setObject("dijit.metadata.form.fgdc.IsoTopicTool",b,m);return b});