// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/playerSupports/_CommandSupport","dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/when esri/dijit/geoenrichment/ReportPlayer/PlayerCommands esri/dijit/geoenrichment/ReportPlayer/config esri/dijit/geoenrichment/utils/DeviceUtil".split(" "),function(k,l,h,f,g,m,n){return k(null,{_lastNonPrintCommandId:null,_executeExportCallback:null,_executePrintCallback:null,_visualStateMemo:null,_initCommands:function(){n.isMobileDevice()||!m.modules.exportCommands?
this.playerToolbar.notifyCommandButtonsAdded():f(this.dataProvider.getCommands&&this.dataProvider.getCommands(),function(a){this._createCommandButtons(a);this.playerToolbar.notifyCommandButtonsAdded()}.bind(this))},_createCommandButtons:function(a){function c(a){var c=new h,d=new h;b.onCommandSettingsShown(c.promise);b._visualStateMemo=b.getCurrentReportContainer().getVisualState&&b.getCurrentReportContainer().getVisualState();f(b._getPrintableContainer({commandId:a,showDialog:!0}),function(a){if(a){var c=
a.getSelectedCommandId();c&&c!==g.PRINT&&(b._lastNonPrintCommandId=c);f(b._executeCommand(c,{printableContainer:a}),d.resolve,d.reject)}else b.onCommandCanceled(),d.resolve()}).always(c.resolve);return d.promise}var b=this;if(a&&a.length){var d,e=a.filter(function(a){return a.id===g.PRINT?(d=a,!1):!0});e.length&&(this._executeExportCallback=function(){return c(b._lastNonPrintCommandId||e[0].id)},this._createCommandButton(e[0],this._executeExportCallback));d&&(this._executePrintCallback=function(){return c(d.id)},
this._createCommandButton(d,this._executePrintCallback))}},executeExport:function(){return this._executeExportCallback&&this._executeExportCallback()},executePrint:function(){return this._executePrintCallback&&this._executePrintCallback()},_createCommandButton:function(a,c){return this.playerToolbar.createCommandButton(a,c)},_executeCommand:function(a,c){var b=this;a!==g.PDF&&a!==g.DYNAMIC_HTML||!this._viewModel.dynamicReportInfo.fieldData.runReportTaskID||(c.creditsTaskID=this._viewModel.dynamicReportInfo.fieldData.runReportTaskID);
var d=new h;setTimeout(function(){f(b.dataProvider.executeCommand&&b.dataProvider.executeCommand(a,b,c,function(a){b.onCommandProgress(a)}),d.resolve,d.reject)});var e=d.promise.then(function(a){return f(b.isContentLoading(),function(){return f(b._visualStateMemo&&b.getCurrentReportContainer().setVisualState(b._visualStateMemo),function(){return a})})});this.onCommandStart(e,a);this._showWaiting(e);e.always(function(){b.onCommandEnd(e)});return e},executeCommand:function(a,c){var b=this;return f(this._getPrintableContainer({commandId:a,
showDialog:!1,printSettings:c&&c.printSettings}),function(d){return b._executeCommand(a,l.mixin({printableContainer:d},c))})},onCommandSettingsShown:function(a){},onCommandCanceled:function(){},onCommandStart:function(a,c){},onCommandProgress:function(a){},onCommandEnd:function(a){}})});