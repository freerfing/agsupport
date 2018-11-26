define(["durandal/app", "jquery", "core", "mask"], function(app, $, core, mask){
	var panalList = {}, count = 0, activePanal, init = false;
	return{
		panalEvent: function(){
			if(init){
				return;
			}
			var that = this;
			app.off("sys:panal");
			app.on("sys:panal", function(data){
				if(data.type === "active"){
					var p = that.getPanal(data.panalId);
					if(p) {
						p.active();
						p.show();
					}
				}else if(data.type === "close"){
					var p = that.getPanal(data.panalId);
					if(p) {
						p.close();
					}
				}
			});
			init = true;
		},
		/** 获取到下一个z-index **/
		getNextZIndex: function(){
			//从9000开始，一定程度上避免CKEditor层的显示问题
			return core.generateId("panal-z-index", {from: 9000, prefix: false});
		},
		/** 获取到下一个遮罩z-index **/
		getNextModalZIndex: function(){
			return mask.getMaskNextZIndex();
		},
		/** 是否存在 **/
		exist: function(panalId){
			return !!panalList[panalId];
		},
		/** 注册面板 **/
		regPanal: function(p,closeOther){
			if(!this.exist(p.panalId)){
				if(closeOther){
					for (var id in panalList){
						if(panalList.hasOwnProperty(id)) {
							var lastPanal = panalList[id];
							if(lastPanal) {
								this.unRegPanal(lastPanal);
								lastPanal.close(true);
							}
						}
					}
				}
				panalList[p.panalId] = p;
				count++;
				if(count == 1){
					app.trigger("mis:desktop:panal", {
						type: "panalBtnShow"
					});
				}
				app.trigger("mis:desktop:panal", {
					type: "panalNew",
					uniqueID: p.uniqueID,
					panalId: p.panalId,
					title: p.settings.panalListTitle || p.settings.title
				});
			}
		},
		/** 注销面板 **/
		unRegPanal: function(p){
			if(this.exist(p.panalId)){
				panalList[p.panalId] = null;
				count--;
				app.trigger("mis:desktop:panal", {
					type: "panalClose",
					uniqueID: p.uniqueID,
					panalId: p.panalId
				});
				if(count === 0){
					app.trigger("mis:desktop:panal", {
						type: "panalBtnHide"
					});
				}
				//注销的是激活面板，需要激活下一个面板
				if(activePanal && activePanal.panalId === p.panalId){
					activePanal = null;
					this.activeNextPanal();
				}
			}
		},
		/** 激活下一个面板 **/
		activeNextPanal: function(){
			var topPanal = null;
			var maxIndex = 0;
			for(var id in panalList) {
				if(panalList.hasOwnProperty(id)) {
					var p = panalList[id];
					if(p && p.zIndex > maxIndex) {
						topPanal = p;
						maxIndex = p.zIndex;
					}
				}
			}
			if(topPanal) {
				topPanal.active();
			} 
		},
		/** 注销面板，获取当前激活面板 **/
		getActivePanal: function(){
			return activePanal;
		},
		/** 获取面板 **/
		getPanal: function(panalId){
			return panalList[panalId];
		},
		/** 获取所有面板 **/
		getAllPanal: function(){
			return panalList;
		},
		/** 激活面板后的处理 **/
		activeAfter: function(p){
			activePanal = p;
			for(var id in panalList) {
				if(panalList.hasOwnProperty(id)) {
					var pan = panalList[id];
					if(pan && pan.panalId !== p.panalId){
						pan.inActive();
					}
				}
			}
		}
	};
});