// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/RasterFunctionEditor/RFxBandMatrix","dojo/_base/declare dojo/has ../../kernel dgrid/OnDemandGrid dgrid/Keyboard dgrid/editor dgrid/Selection dojo/store/Memory dojo/store/Observable dojo/on dojo/_base/lang dojo/Evented dojo/_base/array dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/form/NumberTextBox ./EditableGridMixin".split(" "),function(g,m,n,p,q,r,C,t,u,D,l,v,k,w,x,y,z,A){var B=g([p,q]);g=g("RFxBandMatrix",[w,x,y,v,A],{templateString:"\x3cdiv\x3e\x3cdiv data-dojo-attach-point\x3d'gridNode'\x3e\x3c/div\x3e\x3c/div\x3e",
baseClass:"esriRFxBandMatrix",nRows:0,nCols:0,displayNames:[],values:[],dataType:"string",inputArg:null,value:[],_store:null,_grid:null,postCreate:function(){this.inherited(arguments);var a={idNum:"ID"};this._initStore(a,this.nRows,this.nCols,this.displayNames,this.values);this._initGrid(this.nCols,a);this.attachGridEvents();this.on("change",l.hitch(this,this._updateValue))},_getGridColumns:function(a,d){var f=[],e=Object.keys(a),b=k.map(e,function(b){return a[b]}),c={label:b[d],field:e[d],sortable:!1};
f.push(c);for(var h=0;h<d;h++)c=r({label:b[h],field:e[h],editor:this._getEditor(this.dataType),editOn:"click",editorArgs:this._getEditorArgs(this.dataType),autoSave:!0,sortable:!1}),f.push(c);return f},_initStore:function(a,d,f,e,b){for(var c=0;c<f;c++)a[c]=e[c];for(a=0;a<d;a++)b[a].id=a+1,b[a].idNum=a+1;this._store=new t({data:b,idProperty:"id"});this._store=u(this._store);this._updateValue()},_initGrid:function(a,d){this._grid=new B({store:this._store,columns:this._getGridColumns(d,a),selectionMode:"single",
cellNavigation:!1},this.gridNode);this._setStoreData(this.value);this._addBlankObject()},_setStoreData:function(a){if(a){for(var d=Math.floor(a.length/this.nCols),f=0,e=1,b=[],c,h=this._grid.columns,g=0;g<d;g++)c={},k.forEach(Object.keys(h),function(b){b=h[b].field;"id"!==b&&"idNum"!==b?c[b]=a[f++]:(c.id=e,c.idNum=e++)},this),b.push(c);this._store.setData(b)}else this._store.setData([])},_updateValue:function(){if(this._store&&this._grid){for(var a=[],d=this._store.data,f=this._grid.columns,e=0;e<
d.length;e++)k.forEach(Object.keys(f),function(b){b=f[b].field;"id"!==b&&"idNum"!==b&&""!==d[e][b]&&a.push(d[e][b])},this);this.value=a}},_getEditor:function(a){return"stringarray"===a?"text":z},_getEditorArgs:function(a){if("longarray"===a)return{constraints:{places:0}}}});m("extend-esri")&&l.setObject("dijit.RasterFunctionEditor.RFxBandMatrix",g,n);return g});