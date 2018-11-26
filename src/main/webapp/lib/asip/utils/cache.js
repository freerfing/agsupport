define(["jquery"], function($){
     
	 /**
	  * 缓存; 在多页面中提供一个数据共享的方式，
	  * 1. 支持命名空间，
	  * 2. 目前缓存的对象自动生成hasValue的方法，从缓存的数组值中查找特定的值，以后可以根据需要添加其它的常用方法
	  * 
	  * eg:
	  * cache('a','bbb') => cache('a') = bbb; cache.a.data = bbb; cache.a = cache.get('a')
	  * cache('a','bbb',{fn1: function(){return 'fn1', fn2: function(){return 'fn2'}}}) =>
	  * cache('a') = 'bbb',cahce.a = {data:'bbb',fn1 : ...,fn2 : ...,hasValue: ...};
	  *    
	  * cache('a.b',value) => cache('a.b') = value; cache.a.b.data = value; 
	  * 
	  * cache('a',[1,2,3]) => cache('a') = [1,2,3]; cache.a.hasValue(2) = true; cache.a.hasValue(5) = false;
	  * 
	  *       
	  *       
	  * @param name: 缓存的参数名称
	  * @param value: 缓存的参数值
	  * @param methods: 缓存对象的拓展属性，一般是方法，也可以是其它的属性      
	  */
	 var cache = function(name,value,methods) {
		 var ns = namespace(name),
		     key = name.split(".").pop();
		 if ( typeof value === "undefined" ) {
			 return ns[key].data;
		 }
		 ns[key] = new creator(value);
		 if (!( typeof methods === "undefined") ) {
		     $.extend(ns[key],methods);
		 }
	 }
	 
	 function creator(value) {
		 this.data = value;
	 }
	 
	 creator.prototype = {
         hasValue: function(val) {
             if ( this.data instanceof Array ) {
            	 for ( var i = 0; i < this.data.length; i++ ) {
                     if ( this.data[i] == val ) {
                         return true;
                     } 
                 }
             }
             return false;
         } 
     };
	 
	 function namespace(string) {
		 var parts = string.split("."), 
		     parent = cache,
		     i,
		     l;
		 
		 for ( i = 0, l = parts.length - 1; i < l; i++) {
			 if ( typeof parent[parts[i]] === "undefined" ) {
				 parent[parts[i]] = {};
             }
			 parent = parent[parts[i]];
	     }
		 
		 return parent;
	 }
	 
	 /***
	  * 返回封装的缓存对象
	  */
	 cache.get = function(name) {
		 var ns = namespace(name),
	     key = name.split(".").pop();
		 return ns[key];
	 }
	 
	 /***
	  * cache 常量
	  */
	 $.extend(cache, {
		 right:       "system.humanright",
		 humanConfig: "system.humanConfig"
	 });

	 return cache;
});