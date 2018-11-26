define(["panal","panalPop"],function(panal,panalPop){
	var curPanal=null;
	var common = {
		entranceAnimation:null,//转场动画效果
		//gisServerURL: "http://59.193.204.127:9980/eGovaGISV14/",
		gisServerURL:"http://egova-likun:9980/eGovaGISV14/",
		/**释放统计图所占内存
		 * @param chartArray
		 */
		disposeCharts:function(chartArray){
			for(var i=0;i<chartArray.length&&chartArray[i];i++){
    			chartArray[i].clear();
    			chartArray[i].dispose();
    			delete chartArray[i];
    		}
    		chartArray.length=0;
    		//CollectGarbage();
		},
		/**
    	 * 解析统计数据为哈希结构
    	 * @param {Object} list 源数据
    	 * @param {Object} filedsNum 统计字段个数
    	 * @param {Object} statValueType 统计值类型
    	 */
    	parseStatData:function(list,filedsNum,statValueType){
    		var statHash={};
    		if(filedsNum==2){
    			for(var i=0;i<list.length;i++){
    				var unitCategoryName=list[i].fieldValueNameSet.split(",")[0];
    				var punishTypeName=list[i].fieldValueNameSet.split(",")[1];
    				var unitCategoryObj=statHash[unitCategoryName];
    				if(unitCategoryObj){
    					unitCategoryObj[punishTypeName]=this.stringToOther(
    							list[i].statValue,statValueType);
    				}else{
    					var newPunishObj={};
    					newPunishObj[punishTypeName]=this.stringToOther(
    							list[i].statValue,statValueType);
    					statHash[unitCategoryName]=newPunishObj;
    				}
    			}
    		}else if(filedsNum==1){
				for (var i=0;i<list.length;i++){
					statHash[list[i].fieldValueNameSet]=this.stringToOther(
							list[i].statValue,statValueType);
    			}
    		}
			return statHash;
    	},
    	/**
    	 * 将字符数据转为其它数据类型
    	 * @param {Object} value 源数据
    	 * @param {Object} otherType 要转换的数据类型
    	 */
    	stringToOther:function(value,otherType){
    		switch(otherType){
    			case 0://不转换
    				return value;
	    		case 1://转为整型
	    			return parseInt(value);
	    		case 2://转为浮点型
	    			return parseInt(value);
	    		default:
	    			return value;
    		}
    	},
    	openApp:function(url,paramObj,method,appName){	
    		
    		//打开新窗口
    		var openNewWindow = function() {
    	        var options = 'status=no,menubar=no,scrollbars=no,resizable=yes,toolbar=no,location=no'
    	         + ',width=' + (screen.availWidth - 10).toString()
    	         + ',height=' + (screen.availHeight - 122).toString()
    	         + ',screenX=0,screenY=0,left=0,top=0';
    	        var win = window.open(url , appName, options);
    	        if(win == null || typeof(win) === "undefined") {
    	            //alert('')
    	        }
    	        try{
    	            win.focus();
        	        win.resizeTo( screen.availWidth, screen.availHeight );
        	        win.moveTo( 0, 0 );
    	        }catch(e){
    	        }
    	        return win;
    	    };
    	    var buildForm = function(){
    	    	var form='<form id="openapp-logonform" style="display:none">'
    	    			 +'</form>';
    	    	$("body").append($(form));
    	    	for(var item in paramObj){
    				var _itemValue = paramObj[item];
    				var _input = $("<input id='"+item+"' name='"+item+"' type='hidden'/>");
    				_input.val(_itemValue);
    				$("#openapp-logonform").append(_input);
    			}
    	    	$("#openapp-logonform").attr("action",url||'');
    			$("#openapp-logonform").attr("target",appName);
    	    };
    	    var submitForm = function(){
    	    	var deskWin = openNewWindow("about:blank", appName);
    	    	buildForm();
			    $("#openapp-logonform").submit(); 
    	    };
    	    if(method=="get"){
    	    	openNewWindow(url,appName);
    	    }else{
    	    	 submitForm();
    	    }
    	    $("#openapp-logonform").remove();
    	},
    	openDialogPanal:function(url,title,param,width,height,top,left,minBtn,maxBtn){
			if(curPanal){
				curPanal.close();
			}
			var settings = {
    				width: width||(screen.availWidth - 260),
    				height: height||(screen.availHeight - 138),
    				draggable: true,
    				resizable: false,
    				minBtn: minBtn||false,
    				maxBtn: maxBtn||false,
    				closeBtn: true,
    				titleShow: true,
    				title: title,
    				panalListTitle: "",   //在桌面的面板列表上显示的标题 
    				top: top,
    				left: left,
    				right: 0,
    				bottom: 0,
    				mouseoutClose: false, //鼠标移出即关闭
    				pointShow: false,     //面板是否带有指示角
    				pointBorder: "right",  //left/right/top/bottom 
    				pointPosition: 0,    //距离顶点的位置,从左边到右或者从上到下的距离
    				modal: false,         //是否模态
    		};
    		var p = panal.getInstance(url,settings,param);
			curPanal=p;
            auGurit.global.secondUtlPanal=p;
		},
		openDialogPanalPop:function(url,title,param,width,height,top,left,minBtn,maxBtn){
			if(curPanal){
				curPanal.close();
			}
			var settings = {
    				width: width||(screen.availWidth - 260),
    				height: height||(screen.availHeight - 138),
    				draggable: true,
    				resizable: false,
    				minBtn: minBtn||false,
    				maxBtn: maxBtn||false,
    				closeBtn: true,
    				titleShow: true,
    				title: title,
    				panalListTitle: "",   //在桌面的面板列表上显示的标题 
    				top: top,
    				left: left,
    				right: 0,
    				bottom: 0,
    				mouseoutClose: false, //鼠标移出即关闭
    				pointShow: false,     //面板是否带有指示角
    				pointBorder: "right",  //left/right/top/bottom 
    				pointPosition: 0,    //距离顶点的位置,从左边到右或者从上到下的距离
    				modal: false,         //是否模态
    		};
			
    		var p = panalPop.getInstance(url,settings,param);
			curPanal=p;			
            auGurit.global.secondUtlPanal=p;
            
		},
        formatDate: function (date, fmt) {
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        getPastDate:function(dateStr,past,fmt){//字符串日期,天数
            var that = this;
            var pastDate = new Date();
            pastDate.setTime(new Date(dateStr.replace(new RegExp("-","gm"),"/")).getTime()  - parseInt(past) * 24 * 60 * 60 * 1000);
            if(fmt){
                return that.formatDate(pastDate,fmt);
            }
            return that.formatDate(pastDate,'yyyy-MM-dd hh:mm:ss');
        },
        getYestday8Clock:function(dateStr){//获得前一天8点
            var tm_s = new Date();
            tm_s.setTime(new Date(dateStr.replace(new RegExp("-","gm"),"/")).getTime()  - 24 * 60 * 60 * 1000);
            //前一天八点
            return tm_s.getFullYear() +
                "-" + ((tm_s.getMonth() + 1)<10 ? "0"+(tm_s.getMonth()+1) : (tm_s.getMonth()+1)) +
                "-" + (tm_s.getDate()<10 ? ("0"+tm_s.getDate()) : tm_s.getDate()) +
                " 08:00:00";
        },
        showLoading:function ($elem){
            var loadingHtml = '<div class="loadingMask" style="position:absolute;top:0;left:0;background:rgba(0,0,0,0.5);width:100%;height:100%;z-index:9999999998;">';
            loadingHtml+='           <div style="width:110px;height:110px;background: rgba(40,40,40,.75);position: absolute;z-index: 9999999999;top: 30%;left: 45%;text-align: center;border-radius: 5px;color: #fff;">';
            loadingHtml+='               <img src="'+auGurit.global.rootPath +'style/asip/common/css/images/icon/loading.png" style="margin: 30px 0 0;width: 38px;height: 38px;vertical-align: baseline;display: inline-block;animation: loadingfun 1s steps(12) infinite;    -webkit-animation: loadingfun 1s steps(12) infinite;" />';
            loadingHtml+='               <p style="display: block;text-align: center; -webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;margin: 0 0 15px;">数据加载中</p>';
            loadingHtml+='               <style>';
            loadingHtml+='                   @keyframes loadingfun';
            loadingHtml+='                   {';
            loadingHtml+='                    0% {-webkit-transform: rotate(0deg);}';
            loadingHtml+='                   100% {-webkit-transform: rotate(1turn);}';
            loadingHtml+='                   }';
            loadingHtml+='               </style>';
            loadingHtml+='           </div>';
            loadingHtml+= '     </div>';
            $elem.append(loadingHtml);
        },
        hideLoading:function (){
            $(".loadingMask").remove();
        }
	};
	return common;
});