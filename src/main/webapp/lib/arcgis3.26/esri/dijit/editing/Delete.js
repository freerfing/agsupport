// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/editing/Delete","dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ./EditOperationBase".split(" "),function(e,b,d,f,g,h){b=b(h,{declaredClass:"esri.dijit.editing.Delete",type:"edit",label:"Delete Features",constructor:function(a){a=a||{};a.featureLayer?(this._featureLayer=a.featureLayer,a.deletedGraphics?this._deletedGraphics=a.deletedGraphics:console.error("In constructor of 'esri.dijit.editing.Delete', no graphics provided")):console.error("In constructor of 'esri.dijit.editing.Delete', featureLayer is not provided")},
updateObjectIds:function(a,c){this.updateIds(this._featureLayer,this._deletedGraphics,a,c)},performUndo:function(){var a=e.map(this._deletedGraphics,function(a){return a.attributes[this._featureLayer.objectIdField]},this);return this._featureLayer.applyEdits(this._deletedGraphics,null,null).then(d.hitch(this,function(c,b,d){c=e.map(c,function(a){return a.objectId});return{oldIds:a,addedIds:c,layer:this._featureLayer,operation:this}}))},performRedo:function(){return this._featureLayer.applyEdits(null,
null,this._deletedGraphics).then(d.hitch(this,function(){return{layer:this._featureLayer,operation:this}}))}});f("extend-esri")&&d.setObject("dijit.editing.Delete",b,g);return b});