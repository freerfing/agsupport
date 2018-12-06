// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/tasks/NAServiceDescription",["dojo/_base/declare","dojo/json","dojo/Deferred","dojo/_base/lang","../request"],function(l,q,m,n,f){return l(null,{declaredClass:"esri.tasks._NAServiceDescription",_sd:null,getServiceDescription:function(h,k){var d=new m;if(this._sd)d.resolve(this._sd);else if(this._url&&this._url.orig){var e=this._url.orig,l=(this._url.path.match(/\/solve$/)||[]).length?"Route":(this._url.path.match(/\/solveClosestFacility$/)||[]).length?"ClosestFacility":"ServiceAreas",
c,p=function(b){f({url:b+("/"===b[b.length-1]?"":"/")+"GetTravelModes/execute",content:{f:"json",serviceName:l},callbackParamName:"callback"}).then(function(a){var b=[],e=null;if(a&&a.results&&a.results.length)for(var g=0;g<a.results.length;g++)if("supportedTravelModes"===a.results[g].paramName){if(a.results[g].value&&a.results[g].value.features)for(var f=0;f<a.results[g].value.features.length;f++)if(a.results[g].value.features[f].attributes){var h=q.parse(a.results[g].value.features[f].attributes.TravelMode);
b.push(h)}}else"defaultTravelMode"===a.results[g].paramName&&(e=a.results[g].value);c.supportedTravelModes=b;c.defaultTravelMode=e;d.resolve(c)},function(a){console.log("Could not read from the routingUtilities service.");d.reject(a)})};f({url:e,content:{f:"json"},callbackParamName:"callback"}).then(function(b){c=b;c.supportedTravelModes||(c.supportedTravelModes=[]);for(b=0;b<c.supportedTravelModes.length;b++)c.supportedTravelModes[b].id||(c.supportedTravelModes[b].id=c.supportedTravelModes[b].itemId);
k?d.resolve(c):h?p(h):10.4<=c.currentVersion?f({url:e+("/"===e[e.length-1]?"":"/")+"retrieveTravelModes",content:{f:"json"},callbackParamName:"callback"}).then(function(a){c.supportedTravelModes=a.supportedTravelModes;c.defaultTravelMode=a.defaultTravelMode;d.resolve(c)},function(a){console.log("Could not get to the NAServer's retrieveTravelModes.");d.reject(a)}):f({url:e.substring(0,e.indexOf("/rest/")+6)+"info",content:{f:"json"},callbackParamName:"callback"}).then(function(a){a.owningSystemUrl?
(e=a.owningSystemUrl,f({url:e+("/"===e[e.length-1]?"":"/")+"sharing/rest/portals/self",content:{f:"json"},callbackParamName:"callback"}).then(function(a){a&&a.helperServices&&a.helperServices.routingUtilities&&a.helperServices.routingUtilities.url?p(a.helperServices.routingUtilities.url):(console.log("Portal does not have helperServices.routingUtilities defined."),d.resolve(c))},function(a){console.log("Could not get to the portal's self.");d.reject(a)})):d.resolve(c)},function(a){console.log("Could not get to the NAServer service description.");
d.reject(a)})},function(b){d.reject(b)})}else d.reject("NA Task has no URL specified.");d.then(n.hitch(this,function(b){this._sd=b}),n.hitch(this,function(){this._sd=null}));return d.promise},getOwningSystemUrl:function(){var h=new m;if(this._url&&this._url.orig){var k=this._url.orig;f({url:k.substring(0,k.indexOf("/rest/")+6)+"info",content:{f:"json"},callbackParamName:"callback"}).promise.always(function(d){h.resolve(d.owningSystemUrl)})}else h.resolve(void 0);return h.promise}})});