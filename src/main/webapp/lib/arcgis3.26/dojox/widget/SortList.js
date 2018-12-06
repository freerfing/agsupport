//>>built
define("dojox/widget/SortList",["dojo","dijit","dojox","dojo/require!dijit/layout/_LayoutWidget,dijit/_Templated"],function(b,c,e){b.provide("dojox.widget.SortList");b.experimental("dojox.widget.SortList");b.require("dijit.layout._LayoutWidget");b.require("dijit._Templated");b.declare("dojox.widget.SortList",[c.layout._LayoutWidget,c._Templated],{title:"",heading:"",descending:!0,selected:null,sortable:!0,store:"",key:"name",baseClass:"dojoxSortList",templateString:b.cache("dojox.widget","SortList/SortList.html",
'\x3cdiv class\x3d"sortList" id\x3d"${id}"\x3e\r\n\t\t\x3cdiv class\x3d"sortListTitle" dojoAttachPoint\x3d"titleNode"\x3e\r\n\t\t\x3cdiv class\x3d"dijitInline sortListIcon"\x3e\x26thinsp;\x3c/div\x3e\r\n\t\t\x3cspan dojoAttachPoint\x3d"focusNode"\x3e${title}\x3c/span\x3e\r\n\t\t\x3c/div\x3e\r\n\t\t\x3cdiv class\x3d"sortListBodyWrapper" dojoAttachEvent\x3d"onmouseover: _set, onmouseout: _unset, onclick:_handleClick" dojoAttachPoint\x3d"bodyWrapper"\x3e\r\n\t\t\x3cul dojoAttachPoint\x3d"containerNode" class\x3d"sortListBody"\x3e\x3c/ul\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e'),
_addItem:function(a){b.create("li",{innerHTML:this.store.getValue(a,this.key).replace(/</g,"\x26lt;")},this.containerNode)},postCreate:function(){if(this.store){this.store=b.getObject(this.store);var a={onItem:b.hitch(this,"_addItem"),onComplete:b.hitch(this,"onSort")};this.store.fetch(a)}else this.onSort();this.inherited(arguments)},startup:function(){this.inherited(arguments);this.heading&&(this.setTitle(this.heading),this.title=this.heading);setTimeout(b.hitch(this,"resize"),5);this.sortable&&
this.connect(this.titleNode,"onclick","onSort")},resize:function(){this.inherited(arguments);var a=this._contentBox.h-b.style(this.titleNode,"height")-10;this.bodyWrapper.style.height=Math.abs(a)+"px"},onSort:function(a){a=b.query("li",this.domNode);this.sortable&&(this.descending=!this.descending,b.addClass(this.titleNode,this.descending?"sortListDesc":"sortListAsc"),b.removeClass(this.titleNode,this.descending?"sortListAsc":"sortListDesc"),a.sort(this._sorter),this.descending&&a.reverse());var d=
0;b.forEach(a,function(a){b[0===d++%2?"addClass":"removeClass"](a,"sortListItemOdd");this.containerNode.appendChild(a)},this)},_set:function(a){a.target!==this.bodyWrapper&&b.addClass(a.target,"sortListItemHover")},_unset:function(a){b.removeClass(a.target,"sortListItemHover")},_handleClick:function(a){b.toggleClass(a.target,"sortListItemSelected");a.target.focus();this._updateValues(a.target.innerHTML)},_updateValues:function(){this._selected=b.query("li.sortListItemSelected",this.containerNode);
this.selected=[];b.forEach(this._selected,function(a){this.selected.push(a.innerHTML)},this);this.onChanged(arguments)},_sorter:function(a,b){a=a.innerHTML;b=b.innerHTML;return a>b?1:a<b?-1:0},setTitle:function(a){this.focusNode.innerHTML=this.title=a},onChanged:function(){}})});