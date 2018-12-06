// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/FeatureLayerQueryStore","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has dojo/promise/all dojo/Deferred ../request ../tasks/query ../tasks/RelationshipQuery ../dijit/FeatureLayerQueryResult dojo/i18n!../nls/jsapi".split(" "),function(h,k,g,p,q,r,f,t,u,v,w){var n=h(null,{layer:null,data:null,objectIds:null,idProperty:"id",totalCount:0,batchCount:25,where:null,orderByFields:null,getAttachments:!1,getRelatedRecords:!1,constructor:function(a){h.safeMixin(this,a);this.data=
[];this.idProperty=this.layer.objectIdField;this.idProperty||(a=JSON.parse(this.layer._json),a.uniqueIdField&&a.uniqueIdField.name&&(this.idProperty=a.uniqueIdField.name))},get:function(a){return this.data[a]},getIdentity:function(a){return a[this.idProperty]},query:function(a,b){var d=new r,c=new t;a=b.start||0;var l=b.count||this.batchCount,h=this.layer.relationships,f=this.layer.advancedQueryCapabilities;b=b.objectIds||this.objectIds;var e={fields:[],features:[],attachmentInfos:{},relatedRecordInfos:{},
count:0,total:this.totalCount,exceededTransferLimit:!1};b&&b.length?c.objectIds=b.length>=a+this.batchCount?b.slice(a,a+l):b.slice(a):(c.start=a,c.num=l,c.where=this.where);var n=f&&f.supportsOrderBy&&this.orderByFields&&this.orderByFields.length;n&&(c.orderByFields=this.orderByFields);c.returnGeometry=!1;c.outFields=["*"];this.layer.queryFeatures(c).then(k.hitch(this,function(a){if(a.features&&a.features.length){var b=a.objectIdFieldName;b||(g.some(a.fields,function(a,c){if("esriFieldTypeOID"===
a.type)return b=a.name,!1}),!b&&a.uniqueIdField&&(b=a.uniqueIdField.name));var f=[],m=[],l={};this.objectIds&&!n&&(g.forEach(a.features,function(a,c){l[a.attributes[b]]=a}),a.features=g.map(c.objectIds,function(a){return l[a]}));var p=g.map(a.features,function(a){var c=a.attributes,d=c[b];f.push(d);this.data[d]=a;return c},this);e.exceededTransferLimit=!!a.exceededTransferLimit;e.count=a.features.length;e.features=p;e.fields=a.fields;this.getAttachments&&this.getRelatedRecords?(m.push(this._queryAttachments(f)),
g.forEach(h,function(a){m.push(this._queryRelatedRecords(f,a))},this),q(m).then(k.hitch(this,function(a){e.attachmentInfos=this._createAttachmentInfoLookup(a.shift());e.relatedRecordInfos=this._createRelatedRecordInfoLookup(a);d.resolve(e)})).otherwise(function(){d.resolve(e)})):this.getRelatedRecords?(g.forEach(h,function(a){m.push(this._queryRelatedRecords(f,a))},this),q(m).then(k.hitch(this,function(a){e.relatedRecordInfos=this._createRelatedRecordInfoLookup(a);d.resolve(e)})).otherwise(function(){d.resolve(e)})):
this.getAttachments?this._queryAttachments(f).then(k.hitch(this,function(a){e.attachmentInfos=this._createAttachmentInfoLookup(a);d.resolve(e)})).otherwise(function(){d.resolve(e)}):d.resolve(e)}else d.resolve(e)})).otherwise(function(a){d.reject(e)});return new v(d)},_queryRelatedRecords:function(a,b){var d=this.layer,c=d.advancedQueryCapabilities;if(c&&c.supportsAdvancedQueryRelated)return this._queryRelatedRecordCount(a,b);c=new u;c.outFields=[b.keyField];c.returnGeometry=!1;c.relationshipId=b.id;
c.objectIds=a;return d.queryRelatedFeatures(c)},_queryRelatedRecordCount:function(a,b){return f({url:this.layer._url.path+"/queryRelatedRecords",content:{f:"json",objectIds:a.toString(),outFields:b.keyField,returnGeometry:!1,relationshipId:b.id,returnCountOnly:!0},handleAs:"json",callbackParamName:"callback"})},_createRelatedRecordInfoLookup:function(a){var b=this.layer.relationships,d={};g.forEach(a,function(a,f){d[b[f].id]=a});return d},_queryAttachments:function(a){return f({url:this.layer._url.path+
"/queryAttachments",content:{f:"json",objectIds:a.toString()},handleAs:"json",callbackParamName:"callback"})},_createAttachmentInfoLookup:function(a){var b={};g.forEach(a.attachmentGroups,function(a){b[a.parentObjectId]={attachments:a.attachmentInfos}});return b}});p("extend-esri")&&k.setObject("dijit.FeatureLayerQueryStore",n,w);return n});