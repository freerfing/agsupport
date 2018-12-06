// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/DataBrowser/templates/DataCategoriesPage.html":'\x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-props\x3d"row: 0"\x3e\r\n    \x3cdiv class\x3d"DataCategoriesPage_Country" data-dojo-attach-point\x3d"divCountrySelect"\x3e\x3c/div\x3e\r\n    \x3cinput type\x3d"text"\r\n           data-dojo-type\x3d"esri/dijit/geoenrichment/DataBrowser/SearchTextBox"\r\n           data-dojo-attach-point\x3d"txbSearch"\r\n           data-dojo-props\x3d"prompt:\'${nls.search}\'"\r\n           data-dojo-attach-event\x3d"onSearch: _search"\r\n           class\x3d"DataCategoriesPage_Search" /\x3e\r\n\x3c/div\x3e\r\n\x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-props\x3d"row: 1"\x3e\r\n    \x3cdiv class\x3d"DataCategoriesPage_Pagination"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/geoenrichment/Pagination" data-dojo-attach-point\x3d"pagination" data-dojo-attach-event\x3d"onSelect: _onItemClick"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"progressDiv"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n\x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-props\x3d"row: 2"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"spnShowFavorites" class\x3d"Wizard_Link DataCategoriesPage_ShowFavorites" data-dojo-attach-event\x3d"onClick: _showFavorites"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/geoenrichment/DataBrowser/DataCategoriesPage","dojo/_base/declare dojo/string dojo/_base/lang dojo/dom-class dojo/on dojo/when dojo/i18n!../../../nls/jsapi dojo/text!./templates/DataCategoriesPage.html ./VariableUtil ./CountrySelect ../Pagination ./SearchTextBox dijit/layout/ContentPane".split(" "),function(h,k,e,l,m,d,f,n,g,p){f=f.geoenrichment.dijit.DataCategoriesPage;return h(null,{templateString:n,nls:f,baseClass:"DataCategoriesPage",manager:null,countryBox:!0,allowHierarchies:!1,
postCreate:function(){this.inherited(arguments);this.pagination.autoCenter=!0;this.pagination.scrollAnimation="fade2";this.pagination.createItemContainer=function(){return g.createCategoryNode()};var a=this;this.pagination.updateItemContainer=function(b,c){a._updateCategoryNode(b,c);b.data=c};this.countryBox&&this.manager.variables.countries&&this.divCountrySelect&&(this.countrySelect=!0===this.countryBox?new p:"object"==typeof this.countryBox&&this.countryBox.domNode?this.countryBox:null)&&(this.countrySelect.placeAt(this.divCountrySelect),
this.countrySelect.startup(),!0===this.countryBox?this.own(this.countrySelect):this.countryBox=!0);this.countrySelect||(this.countryBox=!1,this.divCountrySelect&&(this.divCountrySelect.style.display="none"))},startup:function(){this._started||(this.inherited(arguments),this.countryBox?d(this.showProgress(this._getCountries()),e.hitch(this,this._onCountriesResponse)):this._getCategories(!0))},_setPageIsActiveAttr:function(a){this._started&&(this.txbSearch.set("value",""),a&&this.changeCountry(this.manager.variableQuery.countryID))},
changeCountry:function(a){if(!this._started)return!1;var b=this;return this._changeCountryPromise=d(!this._changeCountryPromise||this._changeCountryPromise.isFulfilled()||this._changeCountryPromise).always(function(){b._updateFavorites();return b.countryBox?d(b._getCountries(),e.hitch(b,b._setCountry,a)):b._changeCountry(b._toCountryBoxID(a))})},_changeCountryPromise:null,_getCountries:function(){!this._getCountriesQuery&&this.countryBox&&(this._getCountriesQuery=this.manager.variables.countries.query({allowHierarchies:this.allowHierarchies}));
return this._getCountriesQuery},_getCountriesQuery:null,_onCountriesResponse:function(a){this.countrySelect.setCountries(a);this._setCountry(this.manager.variableQuery.countryID);m(this.countrySelect,"change",e.hitch(this,function(){this._changeCountry(this.countrySelect.get("value"))}))},_setCountry:function(a){a=this._toCountryBoxID(a);if(a!=this.countrySelect.get("value"))return this._innerChange=!0,this.countrySelect.set("value",a),this._innerChange=!1,this._changeCountry(a)},_innerChange:!1,
_changeCountry:function(a){if(!this._innerChange){var b=this._toCountryID(a);this.onCountryChange(b);var c=this.pagination.countryID===a;c||(this.pagination.countryID=a,this.manager.set("variableQuery",{countryID:b}));return this._getCategories(c)}},_toCountryBoxID:function(a){return a||this.manager.variables.globalCountryID||null},_toCountryID:function(a){return a==this.manager.variables.globalCountryID?null:a},_getCategories:function(a){var b=0;a?b=this.pagination.currentPage:this.manager.set("selection",
[]);this.manager.set("categoryPageIndex",b);var c=this;return d(this.showProgress(this.manager.getCategories()),function(b){c.set("items",b);c.pagination.countryID=c._toCountryBoxID(c.manager.variableQuery.countryID);a&&c.pagination.set("currentPage",c.manager.categoryPageIndex,!0);return d(c.manager.variables.synchronize(),function(){c._updateFavorites()})})},_updateCategoryNode:function(a,b){g.updateCategoryNode(a,b)},_updateFavorites:function(){this.spnShowFavorites&&(this.spnShowFavorites.innerHTML=
this.manager.variables.favorites&&this.manager.variables.favorites.getItemsCount()?this.nls.showFavorites:"")},_setItemsAttr:function(a){this.pagination.set("items",a);this._started&&this.resize()},resize:function(){this.inherited(arguments);this.pagination.resize()},_onItemClick:function(a){var b=a.icon.cloneNode(!0);l.remove(b,"DataCategoryItemIcon");this.manager.flyAnim.fly(a.icon,"Breadcrumb_SelectCategory",null,b);this.manager.variableQuery.categoryID=a.data.id;this.onSelect()},onSelect:function(){},
_showFavorites:function(){this.manager.variableQuery.favorites=!0;this.onSearch()},_search:function(){var a=e.trim(this.txbSearch.get("value"));if(a){this.manager.variableQuery.searchString=a;var b=this;d(this.showProgress(this.manager.queryVariables()),function(c){c.length?b._onSearch(c):(delete b.manager.variableQuery.searchString,b.txbSearch.showTooltip(k.substitute(b.nls.noResults,{seachKey:a})),b.txbSearch.textBox.focus())})}else this.txbSearch.set("value","")},_onSearch:function(a){this.onSearch(a)},
onSearch:function(a){},onCountryChange:function(a){}})});