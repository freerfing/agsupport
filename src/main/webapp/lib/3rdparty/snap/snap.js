/**
 * 办理流程页面用Snap.Svg画流程图的公共js
 * @author yangfaqiang
 */
define(function(){
	var snapSvg = {
		Nodejson:function (title,num,style,x,y,starttime,endtime,humanname) {
			this.title=title;
			this.num=num;
			this.style=style;
			this.x=x;
			this.y=y;
		},
		
		Linejson:function (color,num,head,tail) {
			this.color=color;
			this.num=num;
			this.head=head;
			this.tail=tail;
		},
		
		getMap:function(){//初始化map_，给map_对象增加方法，使map_像个Map  
		    var map_=new Object();  
		    //属性加个特殊字符，以区别方法名，统一加下划线_  
		    map_.put=function(key,value){    map_[key]=value;};
		    map_.get=function(key){    return map_[key];};
		    map_.remove=function(key){    delete map_[key];};    
		    map_.keyset=function(){  
		        var ret="";  
		        for(var p in map_){      
		            if(typeof p =='string' && p.substring(p.length-1)=="_"){   
		                ret+=",";  
		                ret+=p;  
		            }  
		        }             
		        if(ret==""){
		            return ret.split(","); //empty array  
		        }else{  
		            return ret.substring(1).split(",");   
		        }  
		    };   
		    return map_;  
		},
		
		loadData:function (data,num,width,bizID,dataJson) {
			
			$("#outDiv").css("width", width?width:835);
			$("#svgout").css("width", width?width:835);
			var snap = Snap("#svgout");
			var flowData = {};
			$.extend(true, flowData, dataJson);
			var processList = data.list;
			var nodeMap = data.nodeMap;
			var hash=data.hash;
			var nextMap = data.nextMap;
			
			var map_=this.getMap();
			if (bizID == 115) {
				map_.put('983',flowData.NodeList[0]);  map_.put('884',flowData.NodeList[1]);
				map_.put('953',flowData.NodeList[2]); map_.put('886',flowData.NodeList[3]);
				map_.put('881',flowData.NodeList[4]); map_.put('938',flowData.NodeList[5]);
				map_.put('957',flowData.NodeList[6]); map_.put('933',flowData.NodeList[7]);
				map_.put('865',flowData.NodeList[8]); map_.put('855',flowData.NodeList[9]);
				map_.put('856',flowData.NodeList[10]); map_.put('880',flowData.NodeList[11]);
				map_.put('858',flowData.NodeList[12]); map_.put('0014000',flowData.NodeList[14]);
				map_.put('0015000',flowData.NodeList[15]); map_.put('854',flowData.NodeList[16]);
				map_.put('860',flowData.NodeList[17]); map_.put('979',flowData.NodeList[18]);
				map_.put('981',flowData.NodeList[19]); map_.put('980',flowData.NodeList[20]);
				map_.put('955',flowData.NodeList[21]); map_.put('937',flowData.NodeList[22]);
				map_.put('940',flowData.NodeList[23]);map_.put('936',flowData.NodeList[13]);
			} else if (bizID == 401) {
				map_.put('4238',flowData.NodeList[0]);  map_.put('4241',flowData.NodeList[1]);
				map_.put('4250',flowData.NodeList[2]); map_.put('4261',flowData.NodeList[3]);
				map_.put('4248',flowData.NodeList[4]); map_.put('4252',flowData.NodeList[5]);
				map_.put('4246',flowData.NodeList[6]); map_.put('4245',flowData.NodeList[7]);
				map_.put('4247',flowData.NodeList[8]); map_.put('4258',flowData.NodeList[9]);
				map_.put('4256',flowData.NodeList[10]); map_.put('4259',flowData.NodeList[11]);
				map_.put('4253',flowData.NodeList[12]); map_.put('4243',flowData.NodeList[13]);
				map_.put('4257',flowData.NodeList[14]);map_.put('4260',flowData.NodeList[15]);
				map_.put('4249',flowData.NodeList[16]);map_.put('4240',flowData.NodeList[17]);
				map_.put('4239',flowData.NodeList[18]);map_.put('4263',flowData.NodeList[19]);
				map_.put('4237',flowData.NodeList[20]);map_.put('4244',flowData.NodeList[21]);
			}
			
			
			// 画点
			for ( var i = 0; i < flowData.NodeCount; i++) {
				var flag = hash[flowData.NodeList[i].id];
				this.drawNode(snap, flowData.NodeList[i],flag,bizID);
			};
			// 画线
			for ( var i = 0; i < flowData.LineCount; i++) {
				this.drawLine(snap, flowData,flowData, flowData.LineList[i],1,nextMap,1);
			};
			
			var m =1;
			for ( var i = 0; i < flowData.LineCount; i++) {
				var borderPoint;
				var lineData = flowData.LineList[i];
				var headNode = flowData.NodeList[lineData.head];
				var tailNode = flowData.NodeList[lineData.tail];
				var next = nextMap[headNode.id];//首节点的下个节点的集合；
				if (headNode.id == 856 && tailNode.id==14  && hash[856]>=1 && hash[936] >= 1) {
					this.drawLine(snap, headNode,tailNode, flowData.LineList[i],0,0,0);
					this.drawLine(snap, tailNode,map_.get(936), flowData.LineList[i+1],0,0,0);
				} else if (headNode.id == 936 && tailNode.id==15  && hash[856]>=1 && hash[936] >= 1 && processList[processList.length-1].actdefid != headNode.id) {
					this.drawLine(snap, headNode,tailNode, flowData.LineList[i],0,0,0);
					this.drawLine(snap, tailNode,map_.get(856), flowData.LineList[i+1],0,0,0);
				} else if ((tailNode.id == 4250 && hash[4250]>=1)|| (tailNode.id == 4238  && hash[4238]>=1) || (tailNode.id == 4241 && hash[4241]>=1)) {
					var count = hash[tailNode.id];
					this.drawLine(snap, map_.get(4261),headNode, flowData.LineList[i],0,0,0);
					this.drawLine(snap, headNode,tailNode, flowData.LineList[i+1],0,0,0);
					for ( var c = 1; c < count; c++) {
						borderPoint = this.getPointXY(map_.get(4261), tailNode,c, -1);
						this.dowithCommon(snap,m, map_.get(4261),tailNode,borderPoint,bizID);
						m++;
					}
				} else if ((tailNode.id == 4252 && hash[4252]>=1)|| (tailNode.id == 4259  && hash[4259]>=1) || (tailNode.id == 4249 && hash[4249]>=1)) {
					var count = hash[tailNode.id];
					this.drawLine(snap, map_.get(4247),headNode, flowData.LineList[i],0,0,0);
					this.drawLine(snap, headNode,tailNode, flowData.LineList[i+1],0,0,0);
					for ( var c = 1; c < count; c++) {
						borderPoint = this.getPointXY(map_.get(4247), tailNode,c, -1);
						this.dowithCommon(snap,m, map_.get(4247),tailNode,borderPoint,bizID);
						m++;
					}
				} else if ((tailNode.id == 4256 && hash[4256]>=1) || (tailNode.id == 4243  && hash[4243]>=1) || (tailNode.id == 4260 && hash[4260]>=1)
						|| (tailNode.id == 4240 && hash[4240]>=1) || (tailNode.id == 4263 && hash[4263]>=1)) {
					var count = hash[tailNode.id];
					this.drawLine(snap, map_.get(4245),headNode, flowData.LineList[i],0,0,0);
					this.drawLine(snap, headNode,tailNode, flowData.LineList[i+1],0,0,0);
					for ( var c = 1; c < count; c++) {
						borderPoint = this.getPointXY(map_.get(4245), tailNode,c, -1);
						this.dowithCommon(snap,m, map_.get(4245),tailNode,borderPoint,bizID);
						m++;
					}
				} else if ((headNode.id == 4239 && hash[4239]>=1) || (headNode.id == 4237  && hash[4237]>=1) || (headNode.id == 4244 && hash[4244]>=1)) {
					var count = hash[headNode.id];
					this.drawLine(snap,headNode, tailNode, flowData.LineList[i],0,0,0);
					this.drawLine(snap, tailNode,map_.get(4257), flowData.LineList[i+1],0,0,0);
					for ( var c = 1; c < count; c++) {
						borderPoint = this.getPointXY(headNode,map_.get(4257),c, -1);
						this.dowithCommon(snap,m,headNode, map_.get(4257),borderPoint,bizID);
						m++;
					}
				} else if ((headNode.id == 4248 && hash[4248]>=1) || (headNode.id == 4246  && hash[4246]>=1) || (headNode.id == 4253 && hash[4253]>=1)) {
					var count = hash[headNode.id];
//					this.drawCommon(count,snap,map_,4258,headNode,flowData,tailNode,i,-1,bizID,m);
//					m++;
					this.drawLine(snap,headNode, tailNode, flowData.LineList[i],0,0,0);
					this.drawLine(snap, tailNode,map_.get(4258), flowData.LineList[i+1],0,0,0);
					for ( var c = 1; c < count; c++) {
						borderPoint = this.getPointXY(headNode,map_.get(4258),c, 1);
						this.dowithCommon(snap,m,headNode, map_.get(4258),borderPoint,bizID);
						m++;
					}
				}
				
				if (next != null && next.indexOf(tailNode.id) != -1) {
					if (hash[headNode.id] > 1 && hash[tailNode.id] > 1 ) {
						if (next != obj && next != undefined) {
							var obj = next.split(";");
							var count = 0;
							for ( var n = 0; n < obj.length; n++) {
								if (obj[n] == tailNode.id) {
									count ++;
								}
							}
						}
						var min1 = count < hash[tailNode.id] ? count :hash[tailNode.id];
						var min = min1 < hash[headNode.id] ? min1 :hash[headNode.id];
						for ( var j = 1; j < min; j++) {
							if ((headNode.id == 938 && tailNode.id == 955)) {
								borderPoint = this.getPointXY1(headNode, tailNode,j,-1);
							} else if (headNode.id == 940 && tailNode.id == 938) {
								borderPoint = this.getPointXY2(headNode, tailNode,j,-1);
							} else {
								borderPoint = this.getPointXY(headNode, tailNode,j, -1);
							}
							this.dowithCommon(snap,m, headNode,tailNode,borderPoint,bizID);
							m++;
						}
					}
				}
			};
			
			//处理回退
			var backList = data.backList;
			var count=1;
			for ( var i = 0; i < backList.length; i++) {
				var NodeList = [];
				var LineList = [];
				var Object = backList[i];
				if (i+1 < backList.length) {
					var obj = backList[i+1];
					if (Object[0] != obj[0]) {
						count=1;
					}
				}
				var headNode = map_.get(Object[0]);
				var tailNode = map_.get(Object[1]);
				var borderPoint;
				if (bizID == 115) {
					if ((headNode.id == 955 && tailNode.id == 938)) {
						borderPoint = this.getPointXY1(headNode, tailNode,count,1);
					}else if (headNode.id == 940 && tailNode.id == 938) {
						borderPoint = this.getPointXY2(headNode, tailNode,count,1);
					}  else {
						borderPoint = this.getPointXY(headNode, tailNode,count+1, 1);
					}
				} else if (bizID = 401) {
					borderPoint = this.getPointXY(headNode, tailNode,count+1, 2);
				}
				count++;
				NodeList.push(new this.Nodejson("回退",24+m,7,borderPoint.x,borderPoint.y));
				LineList.push(new this.Linejson(1,29+m,headNode.num,24+m+1));
				LineList.push(new this.Linejson(1,29+m+1,24+m+1,tailNode.num));
				var dataList1 = {
						"NodeCount":NodeList.length,
						"LineCount":LineList.length-1,
						"NodeList":NodeList,
						"LineList":LineList,
				};
				var flowData1 = {};
				$.extend(true, flowData1, dataList1);
				this.drawNode(snap, flowData1.NodeList[0],1,bizID);
				this.drawLine(snap, headNode,NodeList[0], flowData1.LineList[0],0,1,1);
				this.drawLine(snap, NodeList[0],tailNode, flowData1.LineList[1],0,1,1);
				m++;
			}
			
		},
		
		dowithCommon : function(snap,m, headNode,tailNode,borderPoint,bizID){
			var NodeList = [];
			var LineList = [];
			NodeList.push(new this.Nodejson("",24+m,7,borderPoint.x,borderPoint.y));
			LineList.push(new this.Linejson(1,29+m,headNode.num,24+m+1));
			LineList.push(new this.Linejson(1,29+m+1,24+m+1,tailNode.num));
			var dataList1 = {
					"NodeCount":NodeList.length,
					"LineCount":LineList.length-1,
					"NodeList":NodeList,
					"LineList":LineList,
			};
			var flowData1 = {};
			$.extend(true, flowData1, dataList1);
			this.drawNode(snap, flowData1.NodeList[0],1,bizID);
			this.drawLine(snap, headNode,NodeList[0], flowData1.LineList[0],0,0,0);
			this.drawLine(snap, NodeList[0],tailNode, flowData1.LineList[1],0,0,0);
		},
		
		getPointXY : function(headNode,tailNode,j,type){
			if (headNode.x == tailNode.x) {
				x = tailNode.x+(j*10)*type;
				y = (headNode.y+tailNode.y)/2;
			}
			if (headNode.y == tailNode.y) {
				y = tailNode.y + (j*10)*type;
				x = (headNode.x+tailNode.x)/2;
				
			}
			if (headNode.x != tailNode.x && headNode.y != tailNode.y) {
				x = (headNode.x+tailNode.x)/2+(j*10)*type;
				y = (headNode.y+tailNode.y)/2+(j*10)*type;;
			}
			return {
				"x" : x,
				"y" : y
			};
		},
		getPointXY1 : function(headNode,tailNode,j,type){
			x = (headNode.x+tailNode.x)/2+(j*10)*type+10;
			y = (headNode.y+tailNode.y)/2;
			return {
				"x" : x,
				"y" : y
			};
		},
		getPointXY2 : function(headNode,tailNode,j,type){
			x = (headNode.x+tailNode.x)/2;
			y = (headNode.y+tailNode.y)/2+(j*10)*type;
			return {
				"x" : x,
				"y" : y
			};
		},
		
		drawNode:function (snap, node,flag,bizID) {
			 if(node.style!=7) {
				var src;
				if (bizID == 115) {
					if (node.num == 0) {
						src = "style/urban/common/css/images/snap/bICON0.png";
					} else if (node.num == 5) {
						src = "style/urban/common/css/images/snap/bICON1.png";
					} else if (node.num == 12) {
						src = "style/urban/common/css/images/snap/bICON2.png";
					} else {
						src = "style/urban/common/css/images/snap/bICON3.png";
					}
				} else if (bizID = 401) {
					if (node.num == 7) {
						src = "style/urban/common/css/images/snap/bICON1.png";
					} else {
						src = "style/urban/common/css/images/snap/bICON3.png";
					}
				}
		        var image = snap.image(src,node.x-8,node.y-19,33,33);
		        image.attr({
		            cursor:"pointer",
		            id:"image"+node.num,
		            
		        });
		        var text = snap.text(node.x+10,node.y+27,node.title);
		        if (flag >= 1) {
		        	text.attr({"fill": "#FF0000","font-size":"11px","text-anchor":"middle"});
		        } else {
		        	text.attr({"font-size":"11px","text-anchor":"middle"});
				}
//		        var t = Snap._.$("title");
//		        t.innerHTML = "经办人："+node.humanname+"\r\n"+"开始时间："+node.starttime+"\r\n"+"结束时间："+node.endtime+"\r\n"+"截止时间："+node.deadline;
		        var g = snap.g(image,text);
//		        g.node.appendChild(t);
		        g.attr({
		            cursor:"pointer",
		            "num":node.num,
		            "x":image.node.getAttribute("x"),
		            "y":image.node.getAttribute("y"),
		            id:"g"+node.num,
		        });
			     
			    }  else {
			    	var text1 = snap.text(node.x,node.y,node.title);
			    	if (flag == 1) {
			    		text1.attr({"fill": "#FF0000","font-size":"11px","text-anchor":"middle"});
					} else {
						text1.attr({"font-size":"11px","text-anchor":"middle"});
					}
			        var g1 = snap.g(text1);
			        g1.attr({
			            cursor:"pointer",
			            "num":node.num,
			            "x":text1.node.getAttribute("x"),
			            "y":text1.node.getAttribute("y"),
			            id:"g"+node.num
			        });
			       
			    
			    }
		},
		drawLine:function (snap, flowData,flowData1, lineData,type,nextMap,arrow) {
			var flag;
			var headNode;
			var tailNode;
			if (type == 1) {
				headNode = flowData.NodeList[lineData.head];
				tailNode = flowData.NodeList[lineData.tail];
				var hNext = nextMap[headNode.id];
				if (hNext != undefined && hNext != null && hNext.indexOf(tailNode.id) != -1) {
					flag = 1;
				}
			} else if (type == 0) {
				headNode = flowData;
				tailNode = flowData1;
				flag = 1;
			}
			
		    var x1,y1,x2,y2;
		    if(headNode.style!=7) {
		        x1 = headNode.x;
		        y1 = headNode.y;
		        var borderPoint = this.getBorderPoint(headNode.x+10,headNode.y,tailNode.x,tailNode.y,20);
		        if(borderPoint) {
		            x1 = borderPoint.x;
		            y1 = borderPoint.y;
		        }
		    } else {
		        x1 = headNode.x;
		        y1 = headNode.y;
		    }
		    var arrowPoints = null;
		    if(tailNode.style!=7) {
		        x2 = tailNode.x;
		        y2 = tailNode.y;
		        var borderPoint = this.getBorderPoint(tailNode.x+10,tailNode.y,headNode.x,headNode.y,20);
		        if(borderPoint) {
		            x2 = borderPoint.x;
		            y2 = borderPoint.y;
		            arrowPoints = this.getArrowPoints(x2,y2,x1,y1,45,10);
		        }    
		    } else {
		        x2 = tailNode.x;
		        y2 = tailNode.y;
		    }

		    var line = snap.line(x1,y1,x2,y2);
		    var lineColor = "#65a7e7";
		    var colorArr = {"1":"#FF0000","2":"#65a7e7"};
		    if (flag == 1) {
		    	lineColor = "#FF0000";
			} else {
				lineColor = colorArr[lineData.color];
			}
		    line.attr({
		            "id":"line"+lineData.num,
		            "num":lineData.num,
		            "stroke":lineColor,
		            "stroke-width":1
		        });
		    //画箭头
//		    if (arrow != 0) {
		    	if(arrowPoints) {
		    		line = snap.line(arrowPoints.p1.x,arrowPoints.p1.y,x2,y2);
		    		line.attr({
		    			"id":"lArrow"+lineData.num,
		    			"stroke":lineColor,
		    			"stroke-width":1
		    		});
		    		line = snap.line(arrowPoints.p2.x,arrowPoints.p2.y,x2,y2);
		    		line.attr({
		    			"id":"rArrow"+lineData.num,
		    			"stroke":lineColor,
		    			"stroke-width":1
		    		});
		    	}
//			}
		},
			
		getBorderPoint:function (x1, y1, x2, y2, dlen) {
			var x = x1 - x2, y = y1 - y2;
			if (!x && !y) {
				return null;
			}
			var len = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
			var dx = dlen / len * (-x), dy = dlen / len * (-y);
			var matrix = Snap.matrix(1, 0, 0, 1, dx, dy);
			return {
				"x" : matrix.x(x1, y1),
				"y" : matrix.y(x1, y1)
			};
		},
			
		getArrowPoints:function (x1, y1, x2, y2, d, dlen) {
				var dlen = dlen || 5;
				var d = d || 45;
				var x = x1 - x2, y = y1 - y2;
				if (!x && !y) {
					return null;
				}
				var len = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
				var dx = dlen / len * (-x), dy = dlen / len * (-y);
				var matrix = Snap.matrix(1, 0, 0, 1, dx, dy);
				var nx1 = matrix.x(x1, y1), ny1 = matrix.y(x1, y1);
				var matrix2 = matrix.clone();
				var nx2 = matrix2.x(x1, y1), ny2 = matrix2.y(x1, y1);
				var m3 = new Snap.Matrix().rotate(d, x1, y1);
				var m4 = new Snap.Matrix().rotate(-d, x1, y1);
				var nx11 = m3.x(nx1, ny1), ny12 = m3.y(nx1, ny1);
				var nx21 = m4.x(nx2, ny2), ny22 = m4.y(nx2, ny2);
				return {
					"p1" : {
						"x" : nx11,
						"y" : ny12
					},
					"p2" : {
						"x" : nx21,
						"y" : ny22
					}
				};
			},
		};
	return snapSvg;
});
