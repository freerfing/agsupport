// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/tasks/RelationParameters","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/has ../kernel ../geometry/jsonUtils".split(" "),function(b,f,g,d,k,l,h){b=b(null,{declaredClass:"esri.tasks.RelationParameters",geometries1:null,geometries2:null,relation:null,relationParam:null,toJson:function(){var a=g.map(this.geometries1,function(a){return a.toJson()}),b=g.map(this.geometries2,function(a){return a.toJson()}),c={},e=this.geometries1;e&&0<e.length&&(c.geometries1=d.toJson({geometryType:h.getJsonType(e[0]),
geometries:a}),a=this.geometries1[0].spatialReference,c.sr=a.wkid?a.wkid:d.toJson(a.toJson()));(a=this.geometries2)&&0<a.length&&(c.geometries2=d.toJson({geometryType:h.getJsonType(a[0]),geometries:b}));this.relation&&(c.relation=this.relation);this.relationParam&&(c.relationParam=this.relationParam);return c}});f.mixin(b,{SPATIAL_REL_CROSS:"esriGeometryRelationCross",SPATIAL_REL_DISJOINT:"esriGeometryRelationDisjoint",SPATIAL_REL_IN:"esriGeometryRelationIn",SPATIAL_REL_INTERIORINTERSECTION:"esriGeometryRelationInteriorIntersection",
SPATIAL_REL_INTERSECTION:"esriGeometryRelationIntersection",SPATIAL_REL_COINCIDENCE:"esriGeometryRelationLineCoincidence",SPATIAL_REL_LINETOUCH:"esriGeometryRelationLineTouch",SPATIAL_REL_OVERLAP:"esriGeometryRelationOverlap",SPATIAL_REL_POINTTOUCH:"esriGeometryRelationPointTouch",SPATIAL_REL_TOUCH:"esriGeometryRelationTouch",SPATIAL_REL_WITHIN:"esriGeometryRelationWithin",SPATIAL_REL_RELATION:"esriGeometryRelationRelation"});k("extend-esri")&&f.setObject("tasks.RelationParameters",b,l);return b});