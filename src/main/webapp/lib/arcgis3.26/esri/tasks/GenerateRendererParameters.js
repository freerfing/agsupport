// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/tasks/GenerateRendererParameters",["dojo/_base/declare","dojo/_base/lang","dojo/_base/json","dojo/has","../kernel"],function(a,b,c,d,e){a=a(null,{declaredClass:"esri.tasks.GenerateRendererParameters",classificationDefinition:null,where:null,precision:null,prefix:null,unitLabel:null,formatLabel:null,toJson:function(){return{classificationDef:c.toJson(this.classificationDefinition.toJson()),where:this.where}}});d("extend-esri")&&b.setObject("tasks.GenerateRendererParameters",a,e);return a});