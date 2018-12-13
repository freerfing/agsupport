require(["durandal/system", "durandal/app", "durandal/viewLocator"], function(system, app, viewLocator) {
	//启动应用
	app.title = '广州水务一体化平台';
	app.start().then(function () {
		viewLocator.useConvention();
		app.setRoot("desktop/index", null, "app-container");
	});
});