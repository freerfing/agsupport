define(function(){
 	Validate =  {
		//邮箱验证 参数：string
		isMail: function(val){
			var isEmail = RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
			if(val == null || val == undefined || isEmail.test(val)||val==''){
				return {success:true};
			} else {
				return {success:false,message:'邮箱格式不正确!'};
			}
		},
		//整数验证 参数：string
		isInteger: function(val){
			var isInteger = RegExp(/^[0-9]+$/);
			if(val == null || val == undefined || isInteger.test(val) ||val==''){
				return {success:true};
			} else {
				return {success:false,message:'格式不正确！请输入整数'};
			}
		},
		//浮点数验证 参数：string
		isFloat: function(val, len) {
			var isFloat = RegExp(/^(-?\d+)(\.\d+)?$/);
			if(isFloat.test(val) ||val==''){
				if(len != null && len != '' && len>0 ){
					var decimal = val.substring(val.indexOf(".")+1);
					if (decimal.length == len && val.indexOf(".") != -1){
						return {success:true};
					} else {
						return {success:false,message:'精度不正确！'};
					}
				}
				return {success:true};
			} else {
				return {success:false,message:'格式不正确！请输入浮点数'};
			}
		},
		//实数验证参数：string
		isNumber: function(val) {
			var isNumber = RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/);
			if(val == null || val == undefined || isNumber.test(val) || val ==''){
				return {success:true};
			} else {
				return {success:false,message:'格式不正确！请输入实数'};
			}
		},
		//金额验证 参数：string
		isMoney: function(val) {
			var isMoney = RegExp("^[0-9]+[\.][0-9]{0,2}$");//最多小数点后两位
			if(val == null || val == undefined || isMoney.test(val) ||val==''){
				return {success:true};
			} else {
				return {success:false,message:'格式不正确！请输入金额'};
			}
		},
		//字符长度验证 参数：string
		isShorter: function(str,reqlength){
			str = str || "";
			if(str.length<reqlength ){
				return {success:true};
			} else {
				return {success:false,message:'输入字符过长！'};
			}
		},
		//非空验证 参数：string
		isEmpty: function(val){
			if(val==null||val===''||val === 'null'||val === 'undefined'){
				return {success:true,message:'不能为空！'};
			} else {
				return {success:false};
			}
		},
		//非空验证 参数：string
		notEmpty: function(val){
			if(val == undefined || val==null ||val=='' || val == 'null'){
				return {success:false,message:'不能为空！'};
			} else {
				return {success:true};
			}
		},
		//特殊字符验证 参数：string
		containSpecial: function(val){
			//var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
			var containSpecial = RegExp(/[\ \~\!\@\#\$\%\^\&\*\-\_\+\=\|\\\;\:\'\"\,\.\/\<\>\?]+/);
			val = val || "";
			//全角半角校验
			if(val.length > 0) {
			    for (var i = val.length - 1; i >= 0; i--){ 
			        unicode = val.charCodeAt(i);
			        if (unicode > 65280 && unicode < 65375) {
			            return {success:false,message:'格式不正确！不能包含特殊字符'};
		            }
			    }
			} 
			
			if(containSpecial.test(val)&&!Lang.isNull(val)){
				return {success:false,message:'格式不正确！不能包含特殊字符'};
			} else {
				//var special = RegExp(/[(\【)(\】)(\、)(\‘)(\。)(\——)(\《)(\》)(\…)(\￥)(\·)]+/);
				var special = RegExp(/[\【\】\‘\。\——\《\》\…\￥\·]+/);
			    if ( special.test(val)&&!Lang.isNull(val) ){
					return {success:false,message:'格式不正确！不能包含特殊字符'};
				}
				return {success:true};
			}
		},
		/**
		 * 汉字最大输入长度
		 * @param {string}
		 * @param {Integer} 要控制的长度
		 */
		checkLength: function(val, len){
			var s = val || "";
			var totalLength = 0;
			var charCode;

			for(i=0; i<s.length;i++){
				charCode = s.charCodeAt(i);
				if (charCode < 0x007f) {//ASCII字母继续使用1字节储存，而常用的汉字就要使用2字节
					totalLength ++;
				} else if ((0x0080 <= charCode) && (charCode <= 0xffff)) {
					totalLength += 2;
				}
			}
			if(len>=totalLength ||Validate.isEmpty(val).success){
				return {success:true};
			} else {
				return {success:false,message:'输入过长，最多输入'+(len/2)+'个汉字！'};
			}
		},
		/**
		 * 汉字最小输入长度
		 * @param {string}
		 * @param {Integer} 要控制的长度
		 */
		checkMinLength: function(val, len){
			var s = val || "";
			var totalLength = 0;
			var charCode;

			for(i=0;i<s.length;i++){
				charCode = s.charCodeAt(i);
				if (charCode < 0x007f) {//ASCII字母继续使用1字节储存，而常用的汉字就要使用2字节
					totalLength ++;
				} else if ((0x0080 <= charCode) && (charCode <= 0xffff)) {
					totalLength += 2;
				}
			}
			if(Validate.isEmpty(val).success || 0 == s.length || len<=totalLength ){
				return {success:true};
			} else {
				return {success:false,message:'输入过短，最少输入'+(len/2)+'个汉字！'};
			}
		},
		/**
		 * 字符最大输入长度
		 * @param {string}
		 * @param {Integer} 要控制的长度
		 */
		checkCodeMaxLength: function(val, len){
			var s = val || "";
			var totalLength = 0;
			var charCode;

			for(i=0; i<s.length;i++){
				charCode = s.charCodeAt(i);
				if (charCode < 0x007f) {//ASCII字母继续使用1字节储存，而常用的汉字就要使用2字节
					totalLength ++;
				} else if ((0x0080 <= charCode) && (charCode <= 0xffff)) {
					totalLength += 2;
				}
			}
			if(len>=totalLength || Validate.isEmpty(val).success){
				return {success:true};
			} else {
				return {success:false,message:'输入过长，最多输入' + len + '个字符！'};
			}
		},
		/**
		 * 字符最小输入长度
		 * @param {string}
		 * @param {Integer} 要控制的长度
		 */
		checkCodeMinLength: function(val, len){
			var s = val || "";
			var totalLength = 0;
			var charCode;

			for(i=0; i<s.length;i++){
				charCode = s.charCodeAt(i);
				if (charCode < 0x007f) {//ASCII字母继续使用1字节储存，而常用的汉字就要使用2字节
					totalLength ++;
				} else if ((0x0080 <= charCode) && (charCode <= 0xffff)) {
					totalLength += 2;
				}
			}
			if(Validate.isEmpty(val).success || 0 == s.length || len<=totalLength){
				return {success:true};
			} else {
				return {success:false,message:'输入过短，最少输入' + len + '个字符！'};
			}
		},
		/**
		 *是否为规范的手机电话号码
		 *@param {string}
		 */
		isTelephone: function(val){
			if(val != null && val != undefined && val != "" && (!(Validate.isInteger(val).success)||val.length!=11)) {
				return {success:false,message:'手机号码格式不正确！'};
			}
			return {success:true};
		},
		/**
		 * 是否规范的邮编
		 * @param {string}
		 */
		isZip: function(val){
			if (val === null || val === undefined || val.length == 6&&Validate.isInteger ( val ).success ||val==''){
				return {success:true};
			}
			return {success:false,message:'邮编格式不正确！'};
		},
		/**
		 * 常用固定电话验证
		 * @param {string}
		 */
		isPhoneNumber: function(val){
			var isPhoneNumber = RegExp(/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)/);
			if (val == undefined || val == null || isPhoneNumber.test ( val )||val=='' ){
				return {success:true};
			}
			return {success:false,message:'格式不正确！格式：区号(可选)-主机号'};
		},
		/**
		 * 办公电话验证
		 * @param {string}
		 */
		isWorkPhone: function(val){
			var isWorkPhone = RegExp(/(^[0-9]{3,4}\-[0-9]{7,8}(\-[0-9]{3,4})|(\([0-9]{3,4}\))$)|(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}(\-[0-9]{3,4})|(\([0-9]{3,4}\))$)|(^[0-9]{7,8}$)/);
			if (val == null || val == undefined || isWorkPhone.test ( val ) ||val==''){
				return {success:true};
			}
			return {success:false,message:'格式不正确！格式：区号(可选)-主机号-分机号(可选)'};
		},

		isSimplePhone: function(val) {
			var isPhone = RegExp(/[0-9\-]*/);
			if (val == null || val == undefined || isPhone.test ( val ) ||val==''){
				return {success:true};
			}
			return {success:false,message:'电话号码格式不正确！'};
		},
		/**
		 * 判断输入是否相同
		 * @param {string,string}
		 */
		equalTo: function(val, oldval){
			if(val==oldval){
				return {success:true};
			}
			return {success:false,message:'输入不相同！请输入相同的值'};
		},
		notEqualTo: function(val,oldval){
			if(val != oldval){
				return {success:true};
			}
			return {success:false,message:'输入相同！请输入不相同的值'};
		},
		/*
		 * 小于等于
		 * @param {string,string}
		 */
		max: function(val, num){
			if (val <= num || val == '') {
				return {success:true};
			}
			return {success:false,message:'输入数值必须不大于'+num+'！'};
		},
		/*
		 * 小于
		 * @param {string,string}
		 */
		maxLess : function(val, num){
			if(val < num || val == ''){
				return {success:true};
			}
			return {success:false,message:'输入数值必须小于'+num+'！'};
		},
		/*
		 * 大于等于
		 * @param {string,string}
		 */
		min: function(val, num){
			if(val >= num || val == ''){
				return {success:true};
			}
			return {success:false,message:'输入数值必须不小于'+num+'！'};
		},
		/*
		 * 大于
		 * @param {string,string}
		 */
		minMore: function(val, num) {
			if(val > num || val == ''){
				return {success:true};
			}
			return {success:false,message:'输入数值必须大于'+num+'！'};
		},
		/*
		 * 身份证验证
		 */
		idCard: function(obj) {
			if (!obj)
				return {success:true};
		    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
		    var iSum = 0;
		    var strIDno = obj;
		    var idCardLength = strIDno.length;
		    if(!/^\d{17}(\d|x)$/i.test(strIDno)&&!/^\d{15}$/i.test(strIDno))
		        return {success:false,message:'输入位数错误！'};

		    if(aCity[parseInt(strIDno.substr(0,2))]==null)
		        return {success:false,message:'输入城市错误！'};

		    if(idCardLength==15){
		        sBirthday = "19" + strIDno.substr(6,2) + "-" + Number(strIDno.substr(8,2)) + "-" + Number(strIDno.substr(10,2));
			    var d = new Date(sBirthday.replace(/-/g,"/"))
				var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();
				if(sBirthday != dd)
		             return {success:false,message:'输入生日错误！'};
		        strIDno=strIDno.substring(0,6)+"19"+strIDno.substring(6,15);
		        strIDno=strIDno+GetVerifyBit(strIDno);
		    }
		    //18位身份证处理

		   //在后面的运算中x相当于数字10,所以转换成a
		    strIDno = strIDno.replace(/x$/i,"a");

			sBirthday=strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));
		    var d = new Date(sBirthday.replace(/-/g,"/"))
			if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
				return {success:false,message:'输入生日错误！'};
			for(var i = 17;i>=0;i --)
			   iSum += (Math.pow(2,i) % 11) * parseInt(strIDno.charAt(17 - i),11);
			if(iSum%11!=1)
				return {success:false,message:'输入错误！'};

		   // 判断是否屏蔽身份证
		    var words = new Array();
		    words = new Array("11111119111111111","12121219121212121");

		    for(var k=0;k<words.length;k++){
		        if (strIDno.indexOf(words[k])!=-1){
		        	return {success:false,message:'输入错误！'};
		        }
		    }

		    return {success:true};
		},
		/*
		 * 验证上传文件格式
		 */
		checkFormat : function(filepath, format) {
			var extname = filepath.substring(filepath.lastIndexOf(".")+1,filepath.length);
			extname = extname.toLowerCase();
			var formats = format.split(";");
			for(var i = 0;i<formats.length;i++) {
				if (formats[i].toLowerCase() == extname)
					return {success:true};
			}
			return {success:false,message:'上传格式不正确！'};
		}

	}
 	
 	return Validate;
});