// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProvider/commands/CreatePlayerCommand","require dojo/_base/declare dojo/Deferred dojo/when dojo/promise/all ../../PlayerCommands ../supportClasses/GEUtil dojo/i18n!esri/nls/jsapi".split(" "),function(p,q,r,d,t,u,v,c){function w(){var a=new r;p(["dijit/Dialog","esri/dijit/geoenrichment/utils/FileUtil","./mapToImage/MapToImageUtil","./supportClasses/HTMLPageBuilder"],function(b,c,d,e){f=b;k=c;l=d;m=e;a.resolve()});return a.promise}c=c.geoenrichment.dijit.ReportPlayer.ReportPlayer;
var f,k,l,m;return q(null,{id:u.DYNAMIC_HTML,label:c.createDynamicHTMLCommandLabel,errorMessage:c.exportInfographicError,execute:function(a,b){b=b||{};var c=this;return w().then(function(){function f(d){var g=m.buildHTMLPageString(d,a,n);h=g;var e=a.getReportTitle()+".html";return g&&!b.returnAsHtmlText&&c._confirmSaveFile(e,function(){k.saveTextFile(g,e,"text/html")})}var e=b.printableContainer,n=e.allowDataDrilling(),h;return t({mapImageInfos:l.collectMapsAsImages(a,{saveImagesAsDataUrl:!0}),comparisonTables:a._viewModel.loadAllStdFeatures()}).then(function(c){return d(a.reportDataToJson({allowDataDrilling:n,
mapImageInfos:c.mapImageInfos}),function(a){if(b.returnReportDataJson)h=a;else return d(f(a),function(){b.creditsTaskID&&v.consumeCredits(b.creditsTaskID)})})}).otherwise(this._handleError.bind(this)).always(function(){return d(e.stop(),function(){return h})})}.bind(this))},_handleError:function(a){console.log(a);(new f({title:"Error",content:this.errorMessage})).show()},_confirmSaveFile:function(a,b){return b()}})});