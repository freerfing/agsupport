require.config({
	waitSeconds: 0,//默认7s加载超时,0无限等待
	baseUrl: ".",// 根目录
	packages: [
		{ name:'dojo', location:'lib/arcgis3.26/dojo', main:'dojo' },
		{ name:'esri', location:'lib/arcgis3.26/esri' },
		{ name:'dijit', location:'lib/arcgis3.26/dijit' },
		{ name:'dojox', location:'lib/arcgis3.26/dojox' },
		{ name:'init', location:'lib/arcgis3.26', main:'init' },
		{ name:'moment', location:'lib/arcgis3.26/moment', main:'moment' },
		{ name:'durandal', location:'lib/Durandal/js' }
	],
	paths: {
		text: 'lib/require/text',
		jquery: 'lib/jquery/jquery.min',
		knockout: 'lib/knockout/knockout-3.4.2',
		layui: 'lib/layui/layui',
		utils: 'common/utils',
		dojoConfig: 'lib/arcgis3.26/config/dojoConfig'
	},
	shim: {
		durandal: {
			deps: ['jquery']
		},
		layui: {
			deps: ['css!lib/layui/css/layui.css'],
			init: function() {
				alert('初始化layui');
				// layui的全局化配置
				this.layui.config({
					dir: './lib/layui/',// layui.js所在路径
					version: false,// 默认值，为true表示浏览器不缓存
					debug: false,
					base: './lib/layui/extend'
				});
			}
		},
		utils: {
			deps: ['jquery']
		},
		esri: {
			deps: ['css!lib/arcgis3.26/css/esri.css']
		}
	}
});

// 全局错误处理
requirejs.onError = function (error) {
	console.error(error);
};

define(["durandal/system", "durandal/app", "durandal/viewLocator"], function(system, app, viewLocator) {
	//启动应用
	app.title = '广州水务一体化平台';
	app.start().then(function () {
		viewLocator.useConvention();
		app.setRoot("components/desktop/index", null, "app-container");
	});
});