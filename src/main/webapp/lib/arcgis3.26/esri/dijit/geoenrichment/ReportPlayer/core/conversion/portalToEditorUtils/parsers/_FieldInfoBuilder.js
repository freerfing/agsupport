// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/portalToEditorUtils/parsers/_FieldInfoBuilder",["../../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoBuilder"],function(e){return{getCalculatorOrScriptFieldInfo:function(a,d,c){if(!a)return null;if(d.variableProvider.isPlayerOnly){var b=d.variableProvider.toCalculator(a);if(!b)return console.log("Can't create a dummy calculator for \x3d\x3e "+a),null;c=c||{};c.calculatorName=b.variable.calculatorName;a=e.createFieldInfoFromCalculator(b,
d.variableProvider,c);a.name=b.variable.fieldName;a.templateName=b.variable.templateName;return a}var b=d.queryMetaDataFunc(a),f=a.substr(0,a.indexOf("."));c=c||{};c.calculatorName=f;return b?b.isScript?e.createFieldInfoFromScript(b,d.variableProvider,c):e.createFieldInfoFromCalculator(b,d.variableProvider,c):e.createFieldInfoFromMissingVariable(a)}}});