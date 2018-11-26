define(function(){
	var stringUtils = {
		/** 省略掉多余的字符 **/
		omit: function(value, length, omitStr){
			omitStr = omitStr || "...";
			length = length || 10;
			if(value){
				return value.length <= length ? value : value.substr(0, length - 1) + omitStr;
			}else{
				return "";
			}
		},
		getValue: function(value){
			if(typeof(value) === 'string'){
				if(value && value.length > 0){
					var lower = value.toLowerCase();
					if(lower === "true"){
						return true;
					}else if(lower === "false"){
						return false;
					}else if(!isNaN(Number(lower))){
						return Number(lower);
					}else{
						return value;
					}
				}else{
					return null;
				}
			}else{
				return null;
			}
		},
		getStrLength: function(str){ 
			if(str){
				var cArr = str.match(/[^\x00-\xff]/ig);  
			    return str.length + (cArr == null ? 0 : cArr.length);  
			}
			return 0;
		},
		/**通过插入换行符将一行字符变为多行
		 * @param s 源字符串
		 * @param lineLength 每行字符长度
		 * @param breakChar 换行符号
		 * @param maxLineNum 最大行数
		 */
		breakLine:function(s,lineLength,breakChar,maxLineNum){
			maxLineNum=maxLineNum||2;
			var newString="";
			var i=0;
			while(s.length>lineLength&&(i+1)<maxLineNum){
				newString+=s.substring(0,lineLength)+breakChar;
				s=s.substring(lineLength);
				i++;
			}
			newString+=s;
			return newString;
		},
		object2UrlStr:function(param, key){
		    var paramStr="";
		    if(param instanceof String||param instanceof Number||param instanceof Boolean){
		        paramStr+="&"+key+"="+encodeURIComponent(param);
		    }else{
		        $.each(param,function(i){
		            var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
		            paramStr+='&'+stringUtils.object2UrlStr(this, k);
		        });
		    }
		    return paramStr.substr(1);
		}
	};
	return stringUtils;
});