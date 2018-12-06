// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/NavigationBar","dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/_base/kernel dojo/has dojo/query dojo/dom dojo/dom-class dojo/dom-construct ./_TouchBase ../kernel".split(" "),function(f,l,h,m,k,n,t,p,g,c,q,r){f=f(null,{declaredClass:"esri.dijit.NavigationBar",_items:[],constructor:function(a,b){this.container=p.byId(b);this._touchBase=q(this.container,null);this._slideDiv=c.create("div",{},this.container,"first");this.events=[h.connect(this._touchBase,
"onclick",this,this._onClickHandler)];this._items=a.items;g.add(this.container,"esriMobileNavigationBar");b=c.create("div",{},this._slideDiv);for(a=0;a<this._items.length;a++){var d,e;switch(this._items[a].type){case "img":e=c.create("div",{"class":"esriMobileNavigationItem"},b);d=c.create("img",{src:this._items[a].src.toString(),style:{width:"100%",height:"100%"}},e);break;case "span":e=c.create("div",{"class":"esriMobileNavigationItem"},b);d=c.create("span",{innerHTML:this._items[a].text},e);break;
case "div":e=c.create("div",{"class":"esriMobileNavigationInfoPanel"},b),d=c.create("div",{innerHTML:this._items[a].text},e)}g.add(e,this._items[a].position);this._items[a].className&&g.add(d,this._items[a].className);d._index=a;d._item=this._items[a];this._items[a]._node=d}},startup:function(){this.onCreate(this._items)},destroy:function(){m.forEach(this.events,h.disconnect);this._touchBase=null;k.query("img",this.container).forEach(function(a){a._index=null;a._item=null;c.destroy(a);a=null});this._items=
null;c.destroy(this._slideDiv);c.destroy(this.container);this.container=this._slideDiv=null},getItems:function(){return this._items},select:function(a){this._markSelected(a._node,a)},onSelect:function(a){},onUnSelect:function(a){},onCreate:function(a){},_onClickHandler:function(a){if("img"===a.target.tagName.toLowerCase()){var b=a.target,c=b._item;k.query("img",this.container).forEach(function(a){a!==b&&a._item.toggleGroup===c.toggleGroup&&this._markUnSelected(a,a._item)},this);this._toggleNode(b,
c)}},_toggleNode:function(a,b){"ON"===b.toggleState?(b.toggleState="OFF",b.src&&(a.src=b.src.toString()),this.onUnSelect(b)):(b.toggleState="ON",b.srcAlt&&(a.src=b.srcAlt),this.onSelect(b))},_markSelected:function(a,b){b.toggleState="ON";b.srcAlt&&(a.src=b.srcAlt);this.onSelect(b)},_markUnSelected:function(a,b){"ON"===b.toggleState&&(b.toggleState="OFF",b.src&&(a.src=b.src.toString()),this.onUnSelect(b))}});n("extend-esri")&&l.setObject("dijit.NavigationBar",f,r);return f});