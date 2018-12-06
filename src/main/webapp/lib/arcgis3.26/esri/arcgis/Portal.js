// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/arcgis/Portal","dojo/_base/declare dojo/_base/lang dojo/_base/kernel dojo/_base/Deferred dojo/_base/array dojo/_base/sniff require ../kernel ../lang ../request ../urlUtils ../Evented ../IdentityManager".split(" "),function(h,d,y,l,f,z,v,w,A,B,C,D){var g={options:{disableIdentityLookup:!0},requestParams:{f:"json"}},k=function(a){function b(b){a[b]||(a[b]=function(){var c=arguments;return l.when(a,function(a){Array.prototype.unshift.call(c,a.results||a);return k(f[b].apply(f,c))})})}if(!a)return a;
a.then&&(a=d.delegate(a));a.total||(a.total=l.when(a,function(a){return A.isDefined(a.total)?a.total:a.length||0}));b("forEach");b("filter");b("map");b("some");b("every");return a},e={useSSL:function(a,b){var c=g&&g.self||{};if(c&&!c.isPortal)return-1!==a.indexOf("https:")||c.allSSL?b.replace("http:","https:"):b;var d=e.getLocation(b);return-1<c.portalHostname.toLowerCase().indexOf(d.hostname.toLowerCase())&&d.port&&"80"!==d.port&&"443"!==d.port?(b=d.pathname,b=0===b.indexOf("/")?b:"/"+b,c.allSSL||
-1<a.indexOf("https:")?"https://"+d.hostname+(c.httpsPort&&"443"!==c.httpsPort?":"+c.httpsPort:"")+b+d.search:"http://"+d.hostname+(c.httpPort&&"80"!==c.httpPort?":"+c.httpPort:"")+b+d.search):-1!==a.indexOf("https:")||c.allSSL?b.replace("http:","https:"):b},formatUrl:function(a){var b=g.currentToken;return-1!==a.indexOf("null")?null:e.useSSL(window.location.protocol,b?a+(-1!==a.indexOf("?")?"\x26":"?")+("token\x3d"+b):a)},getLocation:function(a){var b=document.createElement("a");b.href=a;return{protocol:b.protocol,
hostname:b.hostname,port:b.port,pathname:b.pathname,search:b.search,hash:b.hash,host:b.host}},resultsToTypedArray:function(a,b,c){c=c?c.listings||c.notifications||c.userInvitations||c.tags||c.items||c.groups||c.comments||c.provisions||c.results||c:[];return f.map(c,function(c){c=d.mixin(c,b||{});return a?new a(c):c})},clearFieldsFromObject:function(a,b){var c,e=a.length;if(d.isArray(a))for(c=0;c<e;c++)delete b[a[c]];else for(c in a)delete b[c];return b},requestToTypedArray:function(a,b,c,f,g){return k(e.request(a,
b,c).then(d.partial(e.resultsToTypedArray,f,g)))},request:function(a,b,c){var f;b&&b.portal&&delete b.portal;b&&b.form&&(f=b.form,delete b.form);b=d.mixin(d.mixin({},b||{}),g.requestParams);c=d.mixin(c||{},g.options);return B({url:e.useSSL(window.location.protocol,a.url||a),content:b,callbackParamName:"callback",timeout:c&&c.timeout||0,form:f},c)},formatQueryParams:function(a,b,c){a=d.mixin(d.mixin({},a),d.isString(b)?{q:b}:b||{});a.q=!c&&g.extraQuery?"("+a.q+")"+g.extraQuery:a.q;return a}},n=h([],
{declaredClass:"esri.arcgis.PortalComment",constructor:function(a){d.mixin(this,a);this.url=this.item.itemUrl+"/comments/"+this.id;this.created=this.created?new Date(this.created):null}}),p=h([],{declaredClass:"esri.arcgis.PortalRating",constructor:function(a){d.mixin(this,a);this.url=this.item.itemUrl+"/rating";this.created=this.created?new Date(this.created):null}}),m=h([],{declaredClass:"esri.arcgis.PortalItem",constructor:function(a){d.mixin(this,a);this.folderId=this.ownerFolder||this.folderId;
this.itemUrl=(this.portal&&this.portal.portalUrl)+"content/items/"+this.id;this.userItemUrl=this.hasOwnProperty("ownerFolder")?this.itemUrl.replace("/content/","/content/users/"+this.owner+(this.folderId?"/"+this.folderId:"")+"/"):null;this.itemDataUrl=e.formatUrl(this.itemUrl+"/data");this.thumbnailUrl=e.formatUrl(this.itemUrl+"/info/"+this.thumbnail);this.displayName=this._getDisplayName();this.iconUrl=this._getIconUrl();this.isPremiumContent=this._getIsPremiumContent();this.created=this.created?
new Date(this.created):null;this.uploaded=this.uploaded?new Date(this.uploaded):null;this.modified=this.modified?new Date(this.modified):null},getTypeInfo:function(){var a=this.type;return{source:-1<f.indexOf(this.typeKeywords||[],"ArcGIS Server")||"Feature Collection"===a?a:null,displayName:this.displayName,iconUrl:this.iconUrl,isPremiumContent:this.isPremiumContent,premiumIconUrl:this._getPremiumIconUrl()}},addComment:function(a){var b=d.isString(a)?{comment:a}:a;return e.request(this.itemUrl+"/addComment",
b,{usePost:!0}).then(d.hitch(this,function(a){return new n(d.mixin(b,{id:a.commentId,item:this}))}))},updateComment:function(a){if(a&&a.url&&a.comment)return e.request(a.url+"/update",{comment:a.comment},{usePost:!0}).then(function(b){a.id=b.commentId;return a});throw Error();},getComments:function(){return e.requestToTypedArray(this.itemUrl+"/comments",null,null,n,{item:this})},deleteComment:function(a){if(a&&a.url)return e.request(a.url+"/delete",null,{usePost:!0});throw Error();},addRating:function(a){var b=
d.isObject(a)?a:{rating:parseFloat(a)};return e.request(this.itemUrl+"/addRating",b,{usePost:!0}).then(d.hitch(this,function(a){return new p(d.mixin(b,{id:a.ratingId,item:this}))}))},getRating:function(){return e.request(this.itemUrl+"/rating").then(d.hitch(this,function(a){return new p(d.mixin(a,{item:this}))}))},deleteRating:function(){return e.request(this.itemUrl+"/deleteRating",null,{usePost:!0})},_getDisplayName:function(){var a=this.type,b=this.typeKeywords||[],c=a;"Feature Service"===a||"Feature Collection"===
a?c=-1<f.indexOf(b,"Table")?"Table":-1<f.indexOf(b,"Route Layer")?"Route Layer":-1<f.indexOf(b,"Markup")?"Markup":"Feature Layer":"Image Service"===a?c=-1<f.indexOf(b,"Elevation 3D Layer")?"Elevation Layer":"Imagery Layer":"Scene Service"===a?c="Scene Layer":"Scene Package"===a?c="Scene Layer Package":"Stream Service"===a?c="Feature Layer":"Geoprocessing Service"===a&&this.portal&&this.portal.isPortal?c=-1<f.indexOf(b,"Web Tool")?"Tool":"Geoprocessing Service":"Geocoding Service"===a?c="Locator":
"Microsoft Powerpoint"===a?c="Microsoft PowerPoint":"GeoJson"===a?this.type=c="GeoJSON":"Globe Service"===a?c="Globe Layer":"Vector Tile Service"===a?c="Tile Layer":"netCDF"===a?c="NetCDF":"Map Service"===a?c=-1===f.indexOf(b,"Spatiotemporal")&&(-1<f.indexOf(b,"Hosted Service")||-1<f.indexOf(b,"Tiled"))?"Tile Layer":"Map Image Layer":a&&-1<a.toLowerCase().indexOf("add in")?c=a.replace(/(add in)/ig,"Add-In"):"datastore catalog service"===a&&(c="Big Data File Share");return c},_getIconUrl:function(){var a=
this.type&&this.type.toLowerCase()||"",b=this.typeKeywords||[],c=!1,d=!1,e=!1,g=!1,h=!1;0<a.indexOf("service")||"feature collection"===a||"kml"===a||"wms"===a||"wmts"===a||"wfs"===a?(c=-1<f.indexOf(b,"Hosted Service"),"feature service"===a||"feature collection"===a||"kml"===a||"wfs"===a?(g=-1<f.indexOf(b,"Table"),d=-1<f.indexOf(b,"Route Layer"),e=-1<f.indexOf(b,"Markup"),a=(h=-1!==f.indexOf(b,"Spatiotemporal"))&&g?"spatiotemporaltable":g?"table":d?"routelayer":e?"markup":h?"spatiotemporal":c?"featureshosted":
"features"):a="map service"===a||"wms"===a||"wmts"===a?c||-1<f.indexOf(b,"Tiled")||"wmts"===a?"maptiles":"mapimages":"scene service"===a?-1<f.indexOf(b,"Line")?"sceneweblayerline":-1<f.indexOf(b,"3DObject")?"sceneweblayermultipatch":-1<f.indexOf(b,"Point")?"sceneweblayerpoint":-1<f.indexOf(b,"IntegratedMesh")?"sceneweblayermesh":-1<f.indexOf(b,"PointCloud")?"sceneweblayerpointcloud":-1<f.indexOf(b,"Polygon")?"sceneweblayerpolygon":"sceneweblayer":"image service"===a?-1<f.indexOf(b,"Elevation 3D Layer")?
"elevationlayer":"imagery":"stream service"===a?"streamlayer":"vector tile service"===a?"vectortile":"datastore catalog service"===a?"datastorecollection":"geocoding service"===a?"geocodeservice":"geoprocessing service"===a?-1<f.indexOf(b,"Web Tool")&&this.portal&&this.portal.isPortal?"tool":"layers":"layers"):a="web map"===a||"cityengine web scene"===a?"maps":"web scene"===a?-1<f.indexOf(b,"ViewingMode-Local")?"webscenelocal":"websceneglobal":"web mapping application"===a||"mobile application"===
a||"application"===a||"operation view"===a||"desktop application"===a?"apps":"map document"===a||"map package"===a||"published map"===a||"scene document"===a||"globe document"===a||"basemap package"===a||"mobile basemap package"===a||"mobile map package"===a||"project package"===a||"project template"===a||"pro map"===a||"layout"===a||"layer"===a&&-1<f.indexOf(b,"ArcGIS Pro")||"explorer map"===a&&f.indexOf(b,"Explorer Document")?"mapsgray":"service definition"===a||"csv"===a||"shapefile"===a||"cad drawing"===
a||"geojson"===a||"360 vr experience"===a||"netcdf"===a?"datafiles":"explorer add in"===a||"desktop add in"===a||"windows viewer add in"===a||"windows viewer configuration"===a?"appsgray":"arcgis pro add in"===a||"arcgis pro configuration"===a?"addindesktop":"rule package"===a||"file geodatabase"===a||"sqlite geodatabase"===a||"csv collection"===a||"kml collection"===a||"windows mobile package"===a||"map template"===a||"desktop application template"===a||"arcpad package"===a||"code sample"===a||"form"===
a||"document link"===a||"operations dashboard add in"===a||"rules package"===a||"image"===a||"workflow manager package"===a||"explorer map"===a&&-1<f.indexOf(b,"Explorer Mapping Application")||-1<f.indexOf(b,"Document")?"datafilesgray":"network analysis service"===a||"geoprocessing service"===a||"geodata service"===a||"geometry service"===a||"geoprocessing package"===a||"locator package"===a||"geoprocessing sample"===a||"workflow manager service"===a?"toolsgray":"layer"===a||"layer package"===a||
"explorer layer"===a?"layersgray":"scene package"===a?"scenepackage":"mobile scene package"===a?"mobilescenepackage":"tile package"===a?"tilepackage":"task file"===a?"taskfile":"report template"===a?"report-template":"statistical data collection"===a?"statisticaldatacollection":"insights workbook"===a?"workbook":"insights model"===a?"insightsmodel":"insights page"===a?"insightspage":"insights theme"===a?"insightstheme":"hub initiative"===a?"hubinitiative":"hub page"===a?"hubpage":"hub site application"===
a?"hubsite":"relational database connection"===a?"relationaldatabaseconnection":"big data file share"===a?"datastorecollection":"image collection"===a?"imagecollection":"desktop style"===a?"desktopstyle":"style"===a?"style":"dashboard"===a?"dashboard":"raster function template"===a?"rasterprocessingtemplate":"vector tile package"===a?"vectortilepackage":"ortho mapping project"===a?"orthomappingproject":"ortho mapping template"===a?"orthomappingtemplate":"solution"===a?"solutions":"maps";return a?
v.toUrl("../css/images/item_type_icons/"+a+"16.png"):null},_getIsPremiumContent:function(){var a=this.typeKeywords,b=!1;if(-1<f.indexOf(a,"Requires Subscription")||-1<f.indexOf(a,"Requires Credits"))b=!0;return b},_getPremiumIconUrl:function(){var a=this.typeKeywords,b;this.isPremiumContent&&(b=-1<f.indexOf(a,"Requires Credits")?"premiumcredits":"premiumitem");return b?v.toUrl("../css/images/item_type_icons/"+b+"16.png"):null},getThumbnailUrl:function(a){var b=this.thumbnailUrl;b&&a&&(b+=(-1===b.indexOf("?")?
"?":"\x26")+"w\x3d"+a);return b}}),q=h([],{declaredClass:"esri.arcgis.PortalListing",constructor:function(a){d.mixin(this,a);this.id=this.itemId;this.url=(this.portal&&this.portal.portalUrl)+"content/"+(this.userItemUrl?"items/":"listings/")+this.itemId;this.commentsUrl=this.url+"/comments";this.created=this.created?new Date(this.created):null;this.banner=this.banner?e.formatUrl(this.url+"/info/"+this.banner):"";this.thumbnail=this.thumbnail?e.formatUrl(this.url+"/info/"+this.thumbnail):"";this.largeThumbnail=
this.largeThumbnail?e.formatUrl(this.url+"/info/"+this.largeThumbnail):"";this.avgRating=this.avgRating||0;this.numRatings=this.numRatings||0;this.numComments=this.numComments||0;this.listingProperties=this.listingProperties||{priceDesc:"",creditsPerTransaction:0,licenseType:"free",trialSupported:!1,trialDuration:0,listingAccess:"private"};for(var b in this.listingProperties)this[b]&&(this.listingProperties[b]=this[b]);this.properties=this.properties||{systemRequirements:"",termsAndConditions:"",
version:"1.0"};this.screenshots=f.map(this.screenshots,d.hitch(this,function(a){return e.formatUrl(this.url+"/info/"+a)}));this.vendorName=this.vendor.name;this.vendor.thumbnail=this.vendor.thumbnail?this.userItemUrl?e.formatUrl(this.portal.portalUrl+"/portals/self/resources/"+this.vendor.thumbnail):e.formatUrl(this.url+"/vendorinfo/"+this.vendor.thumbnail):""},getComments:function(){return e.requestToTypedArray(this.commentsUrl,null,null,n,{item:this})},getVendor:function(){return this.vendor}}),
r=h([],{declaredClass:"esri.arcgis.PortalProvision",constructor:function(a){d.mixin(this,a);this.created=this.created?new Date(this.created):null;this.startDate=this.startDate?new Date(this.startDate):null;this.endDate=this.endDate&&-1!==this.endDate?new Date(this.endDate):null;this.listing=a.listing?new q(d.mixin(a.listing,{portal:this.portal})):null}}),t=h([],{declaredClass:"esri.arcgis.PortalGroup",constructor:function(a){d.mixin(this,a);this.url=(this.portal&&this.portal.portalUrl)+"community/groups/"+
this.id;this.thumbnailUrl=e.formatUrl(this.url+"/info/"+this.thumbnail);this.modified=this.modified?new Date(this.modified):null;this.created=this.created?new Date(this.created):null},getMembers:function(){return e.request(this.url+"/users")},queryItems:function(a,b){a=e.formatQueryParams({},a,b);a.q="group:"+this.id+(a.q?" "+a.q:"");return this.portal.queryItems(a)},getThumbnailUrl:function(a){var b=this.thumbnailUrl;b&&a&&(b+=(-1===b.indexOf("?")?"?":"\x26")+"w\x3d"+a);return b}}),x=h([],{declaredClass:"esri.arcgis.PortalFolder",
constructor:function(a){d.mixin(this,a);this.url=(this.portal&&this.portal.portalUrl)+"content/users/"+this.username+"/"+this.id;this.created=this.created?new Date(this.created):null},getItems:function(){return e.requestToTypedArray(this.url,null,null,m,{portal:this.portal,folderId:this.id})}}),u=h([],{declaredClass:"esri.arcgis.PortalUser",constructor:function(a){d.mixin(this,a);this.url=(this.portal&&this.portal.portalUrl)+"community/users/"+this.username;this.userContentUrl=(this.portal&&this.portal.portalUrl)+
"content/users/"+this.username;this.thumbnailUrl=this.thumbnail?e.formatUrl(this.url+"/info/"+this.thumbnail):null;this.modified=this.modified?new Date(this.modified):null;this.created=this.created?new Date(this.created):null},getGroups:function(){return k(e.request(this.url).then(d.hitch(this,function(a){return e.resultsToTypedArray(t,{portal:this.portal},a.groups)})))},getNotifications:function(){return e.requestToTypedArray(this.url+"/notifications",null,null,null,{portal:this.portal})},getGroupInvitations:function(){return e.requestToTypedArray(this.url+
"/invitations",null,null,null,{portal:this.portal})},getTags:function(){return e.requestToTypedArray(this.url+"/tags",null,null,null,{portal:this.portal})},getFolders:function(){return k(this.getContent(null,{num:1}).then(function(a){return a.folders}))},getItems:function(a){return k(this.getContent(a).then(function(a){return a.items}))},getItem:function(a){return e.request(this.portal.portalUrl+"content/items/"+a).then(d.hitch(this,function(a){return new m(d.mixin(a,{portal:this.portal}))}))},getContent:function(a,
b){var c=this.url.replace("community","content")+(a?"/"+a:"");return e.request(c,b).then(d.hitch(this,function(b){b.folders=e.resultsToTypedArray(x,{portal:this.portal},b.folders);b.items=e.resultsToTypedArray(m,{portal:this.portal,folderId:a},b.items);return b}))},getThumbnailUrl:function(a){var b=this.thumbnailUrl;b&&a&&(b+=(-1===b.indexOf("?")?"?":"\x26")+"w\x3d"+a);return b}});h={Portal:h([D],{declaredClass:"esri.arcgis.Portal",onLoad:function(){},onError:function(){},constructor:function(a){a=
d.isObject(a)?a:{url:a};this.registerConnectEvents();g={options:{disableIdentityLookup:!0},requestParams:{f:"json"}};a.self?(g.self=a.self,d.mixin(this,{url:a.url||C.getProtocolForWebResource()+"//"+(a.self.urlKey?a.self.urlKey+"."+a.self.customBaseUrl:a.self.portalHostname)}),this.portalUrl=-1!==this.url.indexOf("/sharing")?this.url+"/":this.url+"/sharing/rest/",a=a.self.user?this.signIn():this.init(this.url)):(a.url&&d.mixin(this,{url:a.url}),a=this.init(this.url));a.then(d.hitch(this,function(){this.emit("ready",
this);this.onLoad(this)}))},init:function(a,b){a=(a||this.portalUrl).replace(/\/+$/,"");this.portalUrl=-1!==a.indexOf("/sharing")?a+"/":a+"/sharing/rest/";return this._getSelf(this.portalUrl).then(d.hitch(this,function(a){g.self=d.mixin({},a);(a=a.user)&&b&&(g.currentToken=b&&b.token,g.loggedInUser=new u(d.mixin(a,{portal:this,credential:b})));g.self.id&&!1===g.self.canSearchPublic&&(g.extraQuery=" AND orgid:"+g.self.id);d.mixin(this,g.self);this.thumbnailUrl=e.formatUrl(this.portalUrl+"portals/self/resources/"+
this.thumbnail);this.isOrganization=this.access&&this.access.length?!0:!1;this.created=this.created?new Date(this.created):null;this.modified=this.modified?new Date(this.modified):null;return this}),d.hitch(this,function(a){this.onError(a);throw a;}))},signIn:function(){var a=new l,b=d.hitch(this,function(){this._onSignIn().then(d.hitch(this,function(){a.resolve(g.loggedInUser)}),d.hitch(this,function(b){a.reject(b)}))});if(g&&g.self)g&&g.loggedInUser?setTimeout(function(){a.resolve(g.loggedInUser)},
0):b();else this.on("load",d.hitch(this,function(){b()}));return a},signOut:function(){g.loggedInUser.credential&&g.loggedInUser.credential.destroy();g.loggedInUser=null;g.options.disableIdentityLookup=!0;e.clearFieldsFromObject(g.self,this);g.self=null;return this.init(this.url)},getPortalUser:function(){return g.loggedInUser},addResource:function(a,b){return e.request(this.portalUrl+"portals/self/addResource",{key:a,text:b},{usePost:!0})},update:function(a){return e.request(this.portalUrl+"portals/self/update",
a,{usePost:!0})},queryGroups:function(a,b){return this._queryPortal(this.portalUrl+"community/groups",e.formatQueryParams({},a,b),t)},queryItems:function(a,b){return this._queryPortal(this.portalUrl+"search",e.formatQueryParams({},a,b),m)},queryListings:function(a){a=e.formatQueryParams({},a,!0);var b="";a.q&&-1<a.q.toLowerCase().indexOf("mylistings:true")?(a.q=a.q.toLowerCase().replace("mylistings:true",""),b="?mylistings\x3dtrue"):a.q||(a.q='""');return this._queryPortal(this.portalUrl+"content/listings"+
b,a,q)},queryCustomerList:function(a,b){a=e.formatQueryParams({},a,!0);return this._queryPortal(this.portalUrl+"portals/self/customersList",a)},getProvisions:function(){return this.getCustomers().then(d.hitch(this,function(a){return a.purchases}))},getInterests:function(){return this.getCustomers().then(d.hitch(this,function(a){return a.interests}))},getTrials:function(){return this.getCustomers().then(d.hitch(this,function(a){return a.trials}))},getCustomers:function(a){return e.request(this.portalUrl+
"portals/self/customers",{status:a||"all"})},getMyPurchases:function(){return this.getPurchases().then(function(a){return a.purchases})},getMyInterests:function(){return this.getPurchases().then(function(a){return a.interests})},getPurchases:function(){return e.request(this.portalUrl+"portals/self/purchases").then(d.hitch(this,function(a){a.interests=f.map(a.interests,function(a){return d.mixin(a.provision,{listing:a.listing})});a.purchases=f.map(a.purchases,function(a){return d.mixin(a.provision,
{listing:a.listing})});a.trials=f.map(a.trials,function(a){return d.mixin(a.provision,{listing:a.listing})});a.interests=e.resultsToTypedArray(r,{portal:this},a.interests);a.trials=e.resultsToTypedArray(r,{portal:this},a.trials);a.purchases=e.resultsToTypedArray(r,{portal:this},a.purchases);return a}))},queryUsers:function(a,b){return this._queryPortal(this.portalUrl+"community/users",e.formatQueryParams({sortField:"username"},a,b),u)},_onSignIn:function(){g.options.disableIdentityLookup=!1;g.self=
null;return w.id.getCredential(this.portalUrl).then(d.hitch(this,"init",this.url)).then(function(){return g.loggedInUser},d.hitch(this,function(a){g.options.disableIdentityLookup=!0;this.onError(a);throw a;}))},_getSelf:function(a){var b;a+="portals/self";g.self?(b=new l,setTimeout(function(){b.resolve(g.self)},0)):b=e.request(a,{culture:y.locale});return b},_queryPortal:function(a,b,c){var f=d.mixin({num:10,start:0,sortField:"title",sortOrder:"asc"},b),g=["start","query","num","nextStart"];a=e.request(a,
f).then(d.hitch(this,function(a){a.results=e.resultsToTypedArray(c,{portal:this},a);a.queryParams=d.mixin({},f);a.nextQueryParams=d.mixin(f,{start:a.nextStart});return e.clearFieldsFromObject(g,a)}));a=d.delegate(a);a.queryParams=d.mixin({},f);a.nextQueryParams=l.when(a,function(a){return a.nextQueryParams});return k(a)}}),PortalFolder:x,PortalGroup:t,PortalItem:m,PortalUser:u,PortalComment:n,PortalRating:p,PortalUtil:e,PortalResult:k,PortalListing:q};z("extend-esri")&&d.mixin(d.getObject("arcgis",
!0,w),h);return h});