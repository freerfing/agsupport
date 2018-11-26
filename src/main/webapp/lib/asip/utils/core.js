define(["jquery"], function($){

	return {
		/** 生成唯一ID标识 **/
		generateId: (function() {
			var idGenerator = {};
			return function(prefix, config) {
				prefix = (prefix || "object");
				config = $.extend({}, {from: 1, prefix: true, step: 2}, config);
				idGenerator[prefix] = idGenerator[prefix] || config.from;
				if(idGenerator[prefix]<config.from) { 
					idGenerator[prefix] = config.from; 
				}
				idGenerator[prefix] = idGenerator[prefix] + config.step;
				var index = idGenerator[prefix];
				return !config.prefix ? index : prefix + "-" + (index);
			};
		})(),
		getParent: function(parent){
			if(parent){
				if(typeof parent === "string"){
					if(parent.substr(0,1) === "." || parent.substr(0,1) === "#" || parent.indexOf(" ") > -1){
						parent = $(parent);
					}else{
						parent = $("#" + parent);
					}
				}
			}
			return parent || $("body");
		}
	}
});