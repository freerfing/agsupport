// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/workers/Connection",["require","exports","../promiseUtils"],function(k,l,e){return function(){function b(a){this._clientIdx=0;this._clients=a}b.prototype.broadcast=function(a,g,b){for(var d=[],c=0,f=this._clients;c<f.length;c++)d.push(f[c].invoke(a,g,b));return d};b.prototype.close=function(){for(var a=0,b=this._clients;a<b.length;a++)b[a].close();this._clients=[]};b.prototype.invoke=function(a,b,h,d){var c=d&&d.client;if(!this._clients||!this._clients.length)return e.reject(Error("Connection closed"));
null!=c&&-1!==this._clients.indexOf(c)||this._clients.some(function(a){return a.isBusy()?!1:(c=a,!0)})||(this._clientIdx=(this._clientIdx+1)%this._clients.length,c=this._clients[this._clientIdx]);a=c.invoke(a,b,h);d&&(d.client=c);return a};b.prototype.openPorts=function(){return e.all(this._clients.map(function(a){return a.openPort()}))};return b}()});