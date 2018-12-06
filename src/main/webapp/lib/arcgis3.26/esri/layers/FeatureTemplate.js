// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/FeatureTemplate","dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../lang ../graphic".split(" "),function(b,c,e,f,d,g){b=b(null,{declaredClass:"esri.layers.FeatureTemplate",constructor:function(a){a&&c.isObject(a)&&(this.name=a.name,this.description=a.description,this.drawingTool=a.drawingTool,this.thumbnail=a.thumbnail,a=a.prototype,this.prototype=new g(a.geometry,null,a.attributes))},toJson:function(){return d.fixJson({name:this.name,description:this.description,drawingTool:this.drawingTool,
thumbnail:d.fixJson(c.clone(this.thumbnail)),prototype:this.prototype&&this.prototype.toJson()})}});c.mixin(b,{TOOL_AUTO_COMPLETE_POLYGON:"esriFeatureEditToolAutoCompletePolygon",TOOL_CIRCLE:"esriFeatureEditToolCircle",TOOL_ELLIPSE:"esriFeatureEditToolEllipse",TOOL_FREEHAND:"esriFeatureEditToolFreehand",TOOL_LINE:"esriFeatureEditToolLine",TOOL_NONE:"esriFeatureEditToolNone",TOOL_POINT:"esriFeatureEditToolPoint",TOOL_POLYGON:"esriFeatureEditToolPolygon",TOOL_RECTANGLE:"esriFeatureEditToolRectangle",
TOOL_ARROW:"esriFeatureEditToolArrow",TOOL_TRIANGLE:"esriFeatureEditToolTriangle",TOOL_LEFT_ARROW:"esriFeatureEditToolLeftArrow",TOOL_RIGHT_ARROW:"esriFeatureEditToolRightArrow",TOOL_UP_ARROW:"esriFeatureEditToolUpArrow",TOOL_DOWN_ARROW:"esriFeatureEditToolDownArrow"});e("extend-esri")&&c.setObject("layers.FeatureTemplate",b,f);return b});