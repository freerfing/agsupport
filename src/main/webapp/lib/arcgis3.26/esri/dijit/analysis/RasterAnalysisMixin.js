// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/RasterAnalysisMixin","dojo/_base/declare dojo/_base/Deferred dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/json dojo/store/Memory dojo/promise/all dojo/when dojo/string dojo/has dojo/dom-class dojo/dom-style dojo/dom-attr ../../kernel ../../lang ../../request ../../symbols/SimpleFillSymbol ../../Color ../../renderers/ClassBreaksRenderer ../../tasks/AlgorithmicColorRamp ../../tasks/MultipartColorRamp ../RasterFunctionEditor/utils ./AnalysisBase ./_AnalysisOptions ./utils ../../layers/RasterFunction".split(" "),
function(l,u,e,k,t,g,v,w,x,n,y,z,m,A,B,C,D,E,p,F,G,H,I,J,K,h,q){l=l([K,J],{declaredClass:"esri.dijit.analysis.RasterAnalysisMixin",map:null,outputLayerName:null,resultParameter:"outputRaster",rasterGPToolName:"GenerateRaster",analysisType:"raster",i18n:null,returnProcessInfo:null,unsupportedServiceNameCharacters:/[\s~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?\.]/g,_geometryService:null,_findDeepestArgsForRerun:!1,constructor:function(a,b){this._pbConnects=[];a.containerNode&&(this.container=a.containerNode)},
destroy:function(){this.inherited(arguments);k.forEach(this._pbConnects,t.disconnect);delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments);e.mixin(this.i18n,this.toolNlsName)},postCreate:function(){this.inherited(arguments);z.add(this._form.domNode,"esriSimpleForm");this._outputLayerInput.set("validator",e.hitch(this,this.validateServiceName));this._buildUI()},startup:function(){},validateServiceName:function(a){return h.validateServiceName(a,{textInput:this._outputLayerInput})},
_getJobParameters:function(){},_getRasterFunction:function(){},_getRasterArguments:function(){},_getRasterObject:function(a){a=a||this.get("inputLayer");return I.getRasterJsonFromLayer(a)},_getOutputRasterLayerName:function(){},_getOutputItemProperties:function(){},_setDefaultInputs:function(){},_resetUI:function(){},_getDefaultOutputItemProperties:function(a,b,c){b=this._getDefaultRenderingRule(b);var f=this._getDefaultRenderer(),d=this._getDefaultPopupInfo();a={visibility:!0,opacity:a||1,interpolation:c||
"RSP_NearestNeighbor",popupInfo:d};b&&(a.renderingRule=b);f&&(a.layerDefinition={},a.layerDefinition.drawingInfo={},a.layerDefinition.drawingInfo.renderer=f.toJson());return a},_getDefaultRenderingRule:function(a){var b=new q;b.functionName="Stretch";b.functionArguments={StretchType:5,DRA:!1,Gamma:[1],UseGamma:!0};b.outputPixelType="U8";var c=new q;c.functionName="Colormap";c.functionArguments={colorRamp:a||"Aspect",Raster:b};return c},_getDefaultRenderer:function(){if(this.colorValues&&this.colorValues.length&&
this.classMaxValues&&this.classMaxValues.length&&this.labels&&this.labels.length){var a=this.colorValues.length;if(a===this.classMaxValues.length&&a===this.labels.length){var b=new F({field:"Value",showInAscendingOrder:!0,classificationMethod:"natural-breaks"}),c=new H,f,d,e,r;c.colorRamps=[];for(e=0;e<a;e++)r=this.colorValues[e],f&&(d=new G,d.algorithm="hsv",d.fromColor=new p(f),d.toColor=new p(r),c.colorRamps.push(d)),f=r;c&&(b.authoringInfo={},b.authoringInfo.colorRamp=c.toJson());c=[];f=-1;for(e=
0;e<a;e++)d=this.colorValues[e],d=new E("solid",null,new p({r:d[0],g:d[1],b:d[2],a:d[3]})),c.push({minValue:f,maxValue:this.classMaxValues[e],label:this.labels[e],symbol:d}),f=this.classMaxValues[e];b.infos=c;b.attributeField="Value";return b}}},_getDefaultPopupInfo:function(){return{title:this.get("outputLayerName"),description:null,fieldInfos:[{fieldName:"Raster.ServicePixelValue",label:"Service Pixel Value",isEditable:!1,isEditableOnLayer:!1,visible:!1,format:{places:2,digitSeparator:!0}},{fieldName:"Raster.ServicePixelValue.Raw",
label:"Pixel Value",isEditable:!1,isEditableOnLayer:!1,visible:!0,format:{places:2,digitSeparator:!0}}],showAttachments:!1,layerOptions:{showNoDataRecords:!0,returnTopmostRaster:!0},mediaInfos:[]}},_getReRunRFxArgs:function(a,b){var c={};this._findFunction(a,b,c);return c&&c.rasterFunctionArguments},_findFunction:function(a,b,c){var f=a&&a.rasterFunction,d=this._getRasterFunction();if(f&&c&&"object"===typeof c){if(f===d&&(c.rasterFunction=a.rasterFunction,c.rasterFunctionArguments=a.rasterFunctionArguments,
!b))return;this._findFunction(a.rasterFunctionArguments&&a.rasterFunctionArguments.Raster,b,c)}},_getSelectedLayerIndexFromUI:function(a,b){if(!a||!b)return-1;var c=-1;k.forEach(a,function(a,d){a&&a.label.toLowerCase()===b.toLowerCase()&&(c=d)});return c},_setAnalysisGpServerAttr:function(a){a&&(this.analysisGpServer=a,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.rasterGPToolName))},_setInputLayersAttr:function(a){this.inputLayers=a},_setInputLayerAttr:function(a){this.inputLayer=a},_getInputLayerAttr:function(){return this.inputLayer},
_getOutputLayerNameAttr:function(){this._outputLayerInput&&(this.outputLayerName=this._outputLayerInput.get("value"));return this.outputLayerName},_setOutputLayerNameAttr:function(a){this.outputLayerName=a},_setDisableRunAnalysisAttr:function(a){this._saveBtn.set("disabled",a)},_setDisableExtentAttr:function(a){this._useExtentCheck.set("checked",!a);this._useExtentCheck.set("disabled",a)},_getDisableExtentAttr:function(){this._useExtentCheck.get("disabled")},_setMapAttr:function(a){this.map=a},_getMapAttr:function(){return this.map},
_handleModeCrumbClick:function(a){a.preventDefault();this._onClose(!0)},_onClose:function(a){this._removePointLayer();a&&(this._save(),this.emit("save",{save:!0}));this.emit("close",{save:!a})},_removePointLayer:function(){this.drawnPointLayer&&(this._removeLayer(this.drawnPointLayer,this.inputLayers,this._analysisSelect),this._sourceDrawBtn.deactivate())},_removeLayer:function(a,b,c){this.map.removeLayer(a);k.forEach(b,function(e,d){e===a&&(c.removeOption({value:d+1,label:b.name}),b.splice(d,1))},
this)},_save:function(){},_handleShowCreditsClick:function(a){a.preventDefault();a={};this._form.validate()&&(a.inputLayer=g.toJson(h.constructAnalysisInputLyrObj(this.get("inputLayer"))),a[this.outputName]=g.toJson({serviceProperties:{name:this.get("outputLayerName")}}),this.secondaryOutputNames&&e.mixin(a,this.updateSecondaryOutputNames()),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=g.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,
a).then(e.hitch(this,function(a){this._usageForm.set("content",a);this._usageDialog.show()})))},updateSecondaryOutputNames:function(){var a={};k.forEach(this.secondaryOutputNames,e.hitch(this,function(b){this.get(b)&&(a[b]=g.toJson({serviceProperties:{name:this.get(b).replace(this.unsupportedServiceNameCharacters,"_")}}))}));return a},_handleSaveBtnClick:function(a){this._form.validate()&&(a=this.secondaryOutputNames?this._validateSecondaryOutputNames():"done",x(a,e.hitch(this,function(){this._saveBtn.set("disabled",
!0);var a=this._webLayerTypeSelect.get("value"),c={},f=this._getJobParameters();if(!C.isDefined(f)){var f={},d={};this._useRFT?d=this._getRasterFunction():(d.rasterFunction=this._getRasterFunction(),d.rasterFunctionArguments=this._getRasterArguments());f.rasterFunction=g.toJson(d);(d=this._getRasterObject())&&!this._useRFT&&(f.functionArguments=g.toJson({raster:d}))}f[this.outputName]=g.toJson({serviceProperties:{name:this.get("outputLayerName")}});this.secondaryOutputNames&&e.mixin(f,this.updateSecondaryOutputNames());
f.returnProcessInfo=this.returnProcessInfo;d={};this.showChooseExtent&&!this.get("disableExtent")&&this._useExtentCheck.get("checked")&&(d.extent=this.map.extent._normalize(!0));f.context=g.toJson(d);c.jobParams=f;if("permanentLayer"===a){c.itemParams={description:this.i18n.itemDescription,tags:n.substitute(this.i18n.itemTags,{layername:this.inputLayer&&this.inputLayer.name,fieldname:f.field||"",valuelayername:f.valuelayername||""}),snippet:this.i18n.itemSnippet};if(a=this._getOutputItemProperties())c.itemParams.text=
a;this.showSelectFolder&&(c.itemParams.folder=this.get("folderId"));c.analysisType=this.analysisType;this.execute(c)}else"dynamicLayer"===a&&this._handleSaveDynamicLayer(f)})))},_handleSaveDynamicLayer:function(a){this.get("inputLayer");this.analysisGpServer.replace("RasterAnalysisTools/GPServer","RasterRendering/ImageServer?viewId\x3d");g.fromJson(a[this.outputName]);a=new q;a.functionName=this._getRasterFunction();a.functionArguments=this._getRasterArguments()},_handleAnalysisLayerChange:function(a){"browse"===
a?this._createBrowseItems({tags:["point"]},this._analysisSelect):(this.inputLayer=this.inputLayers[a],this._updateAnalysisLayerUI(!0))},addPointAnalysisLayer:function(){this._sourceDrawBtn&&(this._sourceDrawBtn.set("map",this.map),this._sourceDrawBtn.on("change",e.hitch(this,this._handleAnalysisPointSelectLayer)))},_handleAnalysisPointSelectLayer:function(a){this.inputLayers&&0!==this.inputLayers.length&&-1!==this.inputLayers.indexOf(a)||(this.drawnPointLayer=a,this.inputLayers.push(a),this.inputLayer=
a,this._analysisSelect.removeOption(this._analysisSelect.getOptions()),h.populateAnalysisLayers(this,"inputLayer","inputLayers"),this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(a){"ApplyRFxTemplate"===this.toolName&&(a&&(this.outputLayerName=this._getOutputRasterLayerName()),this._outputLayerInput.set("value",this.outputLayerName));this.inputLayer&&(this._interpolateToolDescription&&A.set(this._interpolateToolDescription,"innerHTML",n.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name})),
a&&(this.outputLayerName=this._getOutputRasterLayerName()||n.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name})),this._outputLayerInput.set("value",this.outputLayerName));this._resetUI()},_handleBrowseItemsSelect:function(a,b){a&&a.selection&&h.addAnalysisReadyLayer({item:a.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:this._browsedlg,widget:this},b).always(e.hitch(this,this._updateAnalysisLayerUI,!0))},_validateSecondaryOutputNames:function(a){var b=
new u;this.getUserProfile().then(e.hitch(this,function(a){var c=[],d=!0,g=this.portalUrl+"/sharing/rest/portals/"+a.orgId+"/isServiceNameAvailable";k.forEach(this.secondaryOutputNames,e.hitch(this,function(a){this.get(a)&&(a={name:this.get(a).replace(this.unsupportedServiceNameCharacters,"_"),type:"Image Service",f:"json"},c.push(D({url:g,content:a})))}));w(c).then(e.hitch(this,function(a){k.forEach(a,e.hitch(this,function(a,c){a.available||(d=!1,this.emit("job-fail",{message:this.i18n.servNameExists,
type:"warning",messageCode:"AB_0002"}),b.reject())}));d&&b.resolve()}))}));return b.promise},_buildUI:function(){var a=!0;this._loadConnections();this.signInPromise.then(e.hitch(this,h.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer,analysisMode:"raster"}));if(this.rasterFunction){var b=this._getReRunRFxArgs(this.rasterFunction,this._findDeepestArgsForRerun);b&&e.mixin(this,b)}this.functionArguments&&this.functionArguments.Raster&&this.set("inputLayer",this.functionArguments.Raster);
this.get("showSelectAnalysisLayer")&&(this.inputLayers&&this.inputLayer&&!h.isLayerInLayers(this.inputLayer,this.inputLayers)&&this.inputLayers.push(this.inputLayer),this.get("inputLayer")||!this.get("inputLayers")||this.rerun||this.set("inputLayer",this.inputLayers[0]),h.populateAnalysisLayers(this,"inputLayer","inputLayers"));h.addReadyToUseLayerOption(this,[this._analysisSelect]);this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),a=!1);(this.inputLayer||"ApplyRFxTemplate"===
this.toolName)&&this._updateAnalysisLayerUI(a);m.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none");this.showSelectFolder&&this.getFolderStore().then(e.hitch(this,function(a){this.folderStore=a;h.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}));this._chooseLayerTypeRow&&(m.set(this._chooseLayerTypeRow,"display",!0===this.showSelectLayerType?
"block":"none"),a=new v({data:[{name:this.i18n.permanentLayer,id:"permanentLayer"},{name:this.i18n.dynamicLayer,id:"dynamicLayer"}]}),this._webLayerTypeSelect.set("store",a),this._webLayerTypeSelect.set("value","permanentLayer"));m.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none");m.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none");this.inputLayer&&this.inputLayer.drawnLayer&&this._sourceDrawBtn&&this._sourceDrawBtn.set("pointFeatureLayer",
this.inputLayer);this._setDefaultInputs()},_loadConnections:function(){this.on("start",e.hitch(this,"_onClose",!1));this._connect(this._closeBtn,"onclick",e.hitch(this,"_onClose",!0))},_connect:function(a,b,c){this._pbConnects.push(t.connect(a,b,c))}});y("extend-esri")&&e.setObject("dijit.analysis.RasterAnalysisMixin",l,B);return l});