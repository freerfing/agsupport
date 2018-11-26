var dojoConfig = {
	async: true,
	packages: [{
		"name": "layerjs",
		"location": location.pathname.replace(/\/[^/]+$/, "")+ "/custom"
	}]
};	
$(function(){
   require([
	   "esri/map",		 
	   "layerjs/MeasureTools",  			   
	   "dojo/domReady!"
	 ],function(
		Map,deMeasureTools
	  ){        
		 var m=initMap();
		 var measureTool=new deMeasureTools({
			 map:m
		 },"measureTools");
	});
});