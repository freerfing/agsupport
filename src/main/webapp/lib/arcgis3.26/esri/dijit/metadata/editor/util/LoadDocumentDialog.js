// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/editor/util/LoadDocumentDialog","dojo/_base/declare dojo/_base/lang dojo/dom-class dojo/dom-construct dojo/has dijit/_WidgetBase dojo/i18n!../../nls/i18nBase dijit/Dialog ./OkCancelBar ./LoadDocumentPane ../../../../kernel".split(" "),function(a,b,g,d,f,h,e,k,l,m,n){a=a([h],{dialog:null,dialogTitle:e.editor.load.dialogTitle,editor:null,okCancelBar:null,prompt:null,postCreate:function(){this.inherited(arguments);this.editor&&this.editor.gxeContext.arcgisMode&&(this.dialogTitle=
e.editor.load.portalCaption)},onSelect:function(b,a,d,c){},onSelectPullItem:function(b){},show:function(){var a=d.create("div",{}),e=new m({editor:this.editor,dialogBroker:this,prompt:this.prompt,onSelect:b.hitch(this,function(a,b,c){if(this.dialog)this.onSelect(this.dialog,a,b,c)}),onSelectPullItem:b.hitch(this,function(){if(this.dialog)this.onSelectPullItem(this.dialog)})},d.create("div",{},a)),f=this.okCancelBar=new l({showOk:!1,onCancelClick:b.hitch(this,function(){this.dialog&&this.dialog.hide()})},
d.create("div",{},a)),c=this.dialog=new k({"class":"gxeDialog  gxePopupDialog",title:this.dialogTitle,content:a,autofocus:!1});this.isLeftToRight()||g.add(c.domNode,"gxeRtl");this.own(c.on("hide",b.hitch(this,function(){setTimeout(b.hitch(this,function(){e.destroyRecursive(!1);f.destroyRecursive(!1);c.destroyRecursive(!1);this.destroyRecursive(!1)}),300)})));c.show()}});f("extend-esri")&&b.setObject("dijit.metadata.editor.util.LoadDocumentDialog",a,n);return a});