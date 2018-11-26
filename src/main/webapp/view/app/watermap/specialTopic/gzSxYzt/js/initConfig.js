//titleField:该字段的值用于在弹出框的标题
//outFields:查询数据时，输出的字段
//displayFields:数据展示时，显示的字段名称，与outFields按顺序对应
//queryField:用于搜索框模糊查询时的字段，不要使用数字类型的字段，否则会出错
//statisticsFields:用于右侧面板中统计的字段配置
//statType:用于指定统计的类型，分为两种，一种为要素总数(count)，一种为要素某个字段总和(other)
//sumField:当统计的类型为某个字段总和时，需要配置该项，指定计算总和的字段名称
var token = '';//用于验证水务局的地图服务
var token2 = '';//用于验证国规委的地图服务
//var commandUrl = 'http://10.194.170.65:443/arcgis/rest/services/';
var commandUrl = 'http://10.194.170.68:6080/arcgis/rest/services/';//水务局的地图服务前缀
var commandUrl2 = 'http://10.194.148.18:6080/arcgis/rest/services/';//国规委的地图服务前缀
//var commandUrl = 'http://113.108.173.215:443/arcgis/rest/services/';
var layerConfiguration;
function initUrl(){
	layerConfiguration = {
    	baseMap: {
			WeiXingYingXiang: commandUrl + "Quyunyingxiangtu2000/MapServer"+token,
			WeiXingYingXiang_GGW: commandUrl2 + "guangzhoudom2016_gz/MapServer"+token2,
			//DiTu:commandUrl2 + "guangzhoumap_gz/MapServer"+token2,
			//WeiXingYingXiang_GGW:"http://172.16.49.219/proxy/52298e933d7596d0",
			DiTu:commandUrl2 + "guangzhoumap_gz/MapServer"+token2,
			//DiTu: "http://172.16.49.219/proxy/06c8f5951d1711aa",
			JiChu: commandUrl + "DaoluPOI3/MapServer?token="+token,
			DemYingXiang:commandUrl + "DEMyingxiang2000/MapServer"+token,
			PaiShui:commandUrl+ "paishui2/MapServer"+token,
			ShuiXi:commandUrl+ "shuixi4/MapServer"+token,
			ShuiXiDiMing:commandUrl2 + "PlaceName_gz/MapServer"+token2,
			Dike:commandUrl+ "dike2/MapServer"+token,
			Gate:commandUrl+ "gate/MapServer"+token,
			Pump:commandUrl+ "pump/MapServer"+token,
			Res:commandUrl+ "res/MapServer"+token,
			QJ:commandUrl+ "xzq/MapServer/0"+token
    	},
    	dissertation: {
       		shuixi: {
            	name:'河流(涌)',
           		addToMap: false,
            	url: commandUrl + "shuixi4/MapServer/2"+token,
            	type: "polygon",
            	titleField: 'HCMC',
            	outFields: ['HCMC', 'HCBM', 'HCGN', 'HCFL', 'HCCD', 'LYMJ', 'HCKD', 'SMMJ', 'XZQ', 'HZXM'],
            	displayFields: ['河涌名称', '河涌编码', '河涌功能', '河涌分类', '河涌长度（km）', '流域面积（km2）', '河涌宽度（m）', '水面面积（万m2）', '行政区', '河长'],
            	queryField: ['HCMC', 'HCBM', 'HCGN', 'XZQ', 'HZXM', 'ISHC'],
            	statisticsFields: {
                	'HCGN': "河流(涌)功能",
                	'HCFL': '河流(涌)分类',
                	'XZQ': '行政区',
                	'ISHC': '是否黑臭'
            	},
            	statType: 'count',
            	sumField: null
        	},
        	shuixidiming:{
        		name:'水系地名',
        		addToMap: false,
        		url: commandUrl2 + "PlaceName_gz/MapServer/24"+token2,
        		type: "polyline",
        		titleField: 'STDNAME',
        		outFields: ['STDNAME'],
        		displayFields:['水系地名'],
        		queryField: ['STDNAME']
        	},
        	/*
        lake: {
            name: '湖泊',
            addToMap: false,
            url: commandUrl + "ShuiLi/MapServer/5"+token,
            type: "polygon",
            titleField: 'SKMC',
            outFields: ['ID', 'SKMC', 'SKBM', 'GCDB', 'SZHL', 'SZHLBM', 'LYMJ', 'JGSW', 'CSMMJ', 'ZDMJ', 'XZQ', 'JD', 'SGNYJQ', 'SGNEJQ','SQNQSZMB', 'SJHSBZ', 'TXZGSW', 'ZCXSW', 'CSWKR', 'ZKR', 'KTXRL', 'JCSJ', 'ZXZB_X', 'ZXZB_Y', 'SZPLP', 'SZLYMC', 'XGRQ'],
            displayFields: ['序号', '调蓄湖名称', '调蓄湖编码', '工程等别', '所在河流', '所在河流编码', '流域面积（km2）', '景观水位(m)', '常水面面积（万m2）', '占地面积（万m2）', '行政区', '街镇', '水功能一级区划', '水功能二级区划', '水功能区水质目标', '设计洪水标准（年）', '调蓄最高水位(m)', '正常蓄水位（m）', '常水位库容（万m3）', '总库容（万m3）', '可调蓄容量(万m3)', '建成时间', '中心坐标X', '中心坐标Y', '所属排涝片', '所在流域名称', '修改日期'
            ],
            queryField: ['SKMC', 'SKBM', 'GCDB', 'SZHL', 'SZHLBM', 'XZQ', 'JD', 'SZPLP', 'SZLYMC'],
            statisticsFields: {
                'GCDB': '工程等别',
                'XZQ': '行政区'
            }
        },*/
        res: {
            name: '水库',
            addToMap: false,
            url: commandUrl + "res/MapServer/1"+token,
            type: "polygon",
            titleField: 'SKMC',
            outFields: ['SKMC',  'SKQN',   'SZHL',  'LYMJ', 'CSMMJ', 'XZQ', 'SKLX', 'SJHSBZ', 'SJHSW', 'JHHSBZ', 'JHHSW', 'ZCXSW', 'SSW', 'ZKR',  'SKR', 'GGMJ', ],
            displayFields: ['水库名称',  '水库功能',  '所在河流',  '流域面积（km2）', '常水面面积（万m2）', '行政区',  '水库类型',  '设计洪水标准（年）', '设计洪水位（m）', '校核洪水标准（年）', '校核洪水位（m）', '正常蓄水位（m）',  '死水位（m）', '总库容（万m3）','死库容（万m3）', '灌溉面积（万亩）'],
            queryField: ['SKMC', 'SKBM', 'SKQN', 'SKJB', 'GCDB', 'SZHL', 'SZHLBM', 'XZQ', 'JD', 'SKLX'],
            statisticsFields: {
                'SKQN': '水库功能',
                'SKJB': '水库级别',
                'GCDB': '工程等别',
                'XZQ': '行政区'
            },
            statType: 'count',
            sumField: null
        },
        gate: {
            name: '水闸',
            addToMap: false,
            url: commandUrl + "gate/MapServer/1"+token,
            type: "point",
            titleField: 'SZMC',
            outFields: ['SZMC','SZLX', 'XZQ',  'ZKSL', 'ZKZJK', 'ZDGC', 'YDGC', 'SZHL'],
            displayFields: ['水闸名称','水闸类型', '行政区', '闸孔数量（个）', '闸孔总净宽（m）', '闸底高程（m）', '堰（坝）顶高程（m）', '所在河流、湖库'],
            queryField: ['SZMC', 'SZBM', 'SZLX', 'SZJB', 'GCDB', 'XZQ', 'JD'],
            statisticsFields: {
                'SZLX': '水闸类型',
                'SZJB': '水闸级别',
                'GCDB': '工程等别',
                'XZQ': '行政区'
            },
            statType: 'count',
            sumField: null
        },
        dike: {
            name: '堤防',
            addToMap: false,
            url: commandUrl + "dike2/MapServer/1"+token,
            type: "polyline",
            titleField: 'DFMC',
            outFields: ['DFMC', 'GCRW', 'DFJB', 'SJBZ', 'CD', 'DBCD', 'QDDDGC', 'ZDDDGC', 'SJSW', 'DDKD_MAX', 'DDKD_MIN','SZHL', 'DFLX', 'DFXS'],
            displayFields: ['堤防名称', '工程任务', '堤防级别', '规划防洪(潮)标准[重现期](年)', '长度(m)', '达到规划防洪（潮）标准的长度(m)', '堤顶高程（起点高程(m)）', '堤顶高程（终点高程(m)）', '设计水（高潮）位(m)', '堤顶宽度(m)（最大值）', '堤顶宽度(m)（最小值）','所在河流','堤防类型', '堤防型式'],
            queryField: ['DFMC', 'DFBM', "DFLX", 'DFXS', 'SZHL', 'HLAB'],
            statisticsFields: {
                'DFLX': '堤防类型',
                'DFXS': '堤防型式',
                'HLAB': '河流岸别',
                'DFJB': '堤防级别',
                'SJBZ': '规划防洪标准'
            },
            statType: 'other',
            sumField:'CD'
        },
        pump: {
            name: '泵站',
            addToMap: false,
            url: commandUrl + "pump/MapServer/1"+token,
            type: "point",
            titleField: 'BZMC',
            outFields: ['BZMC', 'BZLX', 'BZJB', 'GCDB', 'XZQ','ZJLL', 'ZJGL', 'SJYC', 'SBSL', 'SZHL',  'SJPLBZ', 'SZLYMC'],
            displayFields: ['泵站名称','泵站类型', '泵站级别', '工程等别', '行政区',  '装机流量(m3/s)', '装机功率(kW)', '设计扬程(m)', '水泵数量(台)', '所在河流、湖库', '设计排涝标准（年）', '所在流域名称'],
            queryField: ['BZMC', 'BZBM', 'BZLX', 'BZJB', 'GCDB', 'XZQ', 'JD'],
            statisticsFields: {
                'BZLX': '泵站类型',
                'BZJB': '泵站级别',
                'GCDB': '工程等别',
                'XZQ': '行政区'
            },
            statType: 'count',
            sumField: null
        },
        heliuzhili187: {
            name: '187条治理河涌',
            addToMap: false,
            url: commandUrl + "ZhuanTi2/MapServer/5"+token,
            type: "polygon",
			titleField: 'HCMC',
            outFields: ['HCMC', 'HCBM', 'HCGN', 'HCFL', 'HCCD', 'LYMJ', 'HCKD', 'SMMJ', 'XZQ', 'HZXM'],
            displayFields: ['河涌名称', '河涌编码', '河涌功能', '河涌分类', '河涌长度（km）', '流域面积（km2）', '河涌宽度（m）', '水面面积（万m2）', '行政区', '河长'],
            queryField: ['HCMC', 'HCBM', 'HCGN', 'XZQ', 'HZXM', 'ISHC'],
            statisticsFields: {
                'HCGN': "河流(涌)功能",
                'HCFL': '河流(涌)分类',
                'XZQ': '行政区',
                'ISHC': '是否黑臭'
            },
            statType: 'count',
            sumField: null
        },
        heliuzhili35: {
            name: '35条治理河涌',
            addToMap: false,
            url: commandUrl + "ZhuanTi2/MapServer/4"+token,
            type: "polygon",
			titleField: 'HCMC',
            outFields: ['HCMC', 'HCBM', 'HCGN', 'HCFL', 'HCCD', 'LYMJ', 'HCKD', 'SMMJ', 'XZQ', 'HZXM'],
            displayFields: ['河涌名称', '河涌编码', '河涌功能', '河涌分类', '河涌长度（km）', '流域面积（km2）', '河涌宽度（m）', '水面面积（万m2）', '行政区', '河长'],
            queryField: ['HCMC', 'HCBM', 'HCGN', 'XZQ', 'HZXM', 'ISHC'],
            statisticsFields: {
                'HCGN': "河流(涌)功能",
                'HCFL': '河流(涌)分类',
                'XZQ': '行政区',
                'ISHC': '是否黑臭'
            },
            statType: 'count',
            sumField: null
        },
       /* chengshigengxin: {
            name: '城市更新',
            addToMap: true,
            url: commandUrl + "ZhuanTi/MapServer/3"+token,
            type: "polygon",
            titleField: '项目名称',
            outFields: ["项目名称", "更新方式", "更新类型", "行政区域", "改造主体", "更新面积"],
            displayFields: ["项目名称", "更新方式", "更新类型", "行政区域", "改造主体", "更新面积"],
            queryField: ["项目名称", "更新方式", "更新类型", "行政区域", "改造主体"],
            statisticsFields: {
                '更新类型': '更新类型',
                '更新方式': '更新方式',
                '行政区域': '行政区域'
            },
            statType: 'count',
            sumField: null
        },*/
        wurenjixunfei: {
            name: '无人机巡飞',
            addToMap: true,
            url: commandUrl + "ZhuanTi2/MapServer/2"+token,
            type: "polyline",
            titleField: 'NAME',
            outFields: ['NAME',"URL","SHAPE.LEN"],
            displayFields: ['名称'],
            queryField: [
                'NAME'
            ],
            statisticsFields: {
            },
            statType: 'count',
            sumField: null
        },
      /*  chengzhongcun: {
            name: '城中村',
            addToMap: true,
            url: commandUrl + "ZhuanTi/MapServer/1"+token,
            type: "point",
            titleField: '村',
            outFields: ["区", "街道", "村", "地址", "经度", "纬度", "其他"],
            displayFields: ["区", "街道", "村", "地址", "经度", "纬度", "其他"],
            queryField: ["区", "街道", "村", "地址"],
            statisticsFields: {
                '区': '行政区'
            },
            statType: 'count',
            sumField: null
        },*/
        quanjingtu: {
            name: '720全景',
            addToMap: true,
            url: commandUrl + "ZhuanTi2/MapServer/0"+token,
            type: "point",
            titleField: 'NAME',
            outFields: ['NAME', 'XZQ',"URL"],
            displayFields: ['名称',"行政区"],
            queryField: [
                'NAME',
                'XZQ'
            ],
            statisticsFields: {
                'XZQ':'行政区'
            },
            statType: 'count',
            sumField: null
        },
        yinjing: {
            name: '窨井',
            addToMap: false,
            url: commandUrl + "paishui2/MapServer/2"+token,
            type: "point",
            titleField: 'NAME',
            outFields: ['NAME',"SORT","SUBTYPE",'COVER_SIZE',"MATERIAL","ADDR","DISTRICT","OWNERDEPT","MANAGEDEPT"],
            displayFields: ['名称',"类型","类别","尺寸","材质","地址","行政区","权属单位","管理单位"],
            queryField: [
                'NAME',
                'DISTRICT'
            ],
            statisticsFields: {
                'DISTRICT':'行政区'
            },
            statType: 'count',
            sumField: null
        },
		yushuikou: {
            name: '雨水口',
            addToMap: false,
            url: commandUrl + "paishui2/MapServer/8"+token,
            type: "point",
            titleField: 'NAME',
            outFields: ['NAME', 'USID',"ADDR","DISTRICT","SEWAGESYST","OWNERDEPT","MANAGEDEPT"],
            displayFields: ['名称','编号',"所在道路","行政区","污水系统","权属单位","管理单位"],
            queryField: [
                'NAME',
                'DISTRICT'
            ],
            statisticsFields: {
                'DISTRICT':'行政区'
            },
            statType: 'count',
            sumField: null
        },
		paifangkou: {
            name: '排放口',
            addToMap: false,
            url: commandUrl + "paishui2/MapServer/5"+token,
            type: "point",
            titleField: 'USID',
            outFields: ['USID',"ADDR","SORT","DISTRICT","OWNERDEPT","MANAGEDEPT"],
            displayFields: ['编号',"地址","类别","行政区","权属单位","管理单位"],
            queryField: [
                'USID',
                'DISTRICT'
            ],
            statisticsFields: {
                'DISTRICT':'行政区'
            },
            statType: 'count',
            sumField: null
        },
		paimen: {
            name: '拍门',
            addToMap: false,
            url: commandUrl + "paishui2/MapServer/7"+token,
            type: "point",
            titleField: 'USID',
            outFields: ['USID',"NAME","ADDR","MATERIAL","SORT","DISTRICT","SEWAGESYST","OWNERDEPT","MANAGEDEPT"],
            displayFields: ['编号','名称',"地址","材质","类别","行政区","污水系统","权属单位","管理单位"],
            queryField: [
                'NAME',
                'DISTRICT'
            ],
            statisticsFields: {
                'DISTRICT':'行政区'
            },
            statType: 'count',
            sumField: null
        },
		wsclc: {
            name: '污水处理厂',
            addToMap: false,
            url: commandUrl + "paishui2/MapServer/13"+token,
            type: "polygon",
            titleField: 'NAME',
            outFields: ["NAME","ADDR","DISTRICT","SEWAGESYST","OWNERDEPT","MANAGEDEPT"],
            displayFields: ['名称',"地址","行政区","污水系统","权属单位","管理单位"],
            queryField: [
                'NAME',
                'DISTRICT'
            ],
            statisticsFields: {
                'DISTRICT':'行政区'
            },
            statType: 'count',
            sumField: null
        },
		paishuibengzhan: {
            name: '排水泵站',
            addToMap: false,
            url: commandUrl + "paishui2/MapServer/14"+token,
            type: "polygon",
            titleField: 'NAME',
            outFields: ["USID","NAME","BZ_SORT","ADDR","DISTRICT","SEWAGESYST","OWNERDEPT","MANAGEDEPT"],
            displayFields: ["编号",'名称',"泵站类型","地址","行政区","污水系统","权属单位","管理单位"],
            queryField: [
                'NAME',
                'DISTRICT'
            ],
            statisticsFields: {
                'DISTRICT':'行政区'
            },
            statType: 'count',
            sumField: null
        },
		paishuishuizha: {
            name: '排水水闸',
            addToMap: false,
            url: commandUrl + "paishui2/MapServer/12"+token,
            type: "polygon",
            titleField: 'NAME',
            outFields: ["NAME","SORT","SUBTYPE","DISTRICT","SEWAGESYST","OWNERDEPT","MANAGEDEPT"],
            displayFields: ["名称",'类别',"类型","行政区","污水系统","权属单位","管理单位"],
            queryField: [
                'NAME',
                'DISTRICT'
            ],
            statisticsFields: {
                'DISTRICT':'行政区'
            },
            statType: 'count',
            sumField: null
        },
        paishuiguandao:{
        	name: '排水管道',
            addToMap: false,
            url: commandUrl + "paishui2/MapServer/10"+token,
            type: "polyline",
            titleField: 'NAME',
            outFields: ["NAME","SORT","SUBTYPE","MATERIAL","D_S","LENGTH","BEG_H","END_H","BEGCEN_DEE","ENDCEN_DEE","DISTRICT"],
            displayFields: ["名称",'类别',"类型","材质","管径","长度","起点高程","终点高程","起点埋深","终点埋深","行政区"],
            queryField: [
            	'USID',
                'NAME',
                'DISTRICT'
            ],
            statisticsFields: {
                'DISTRICT':'行政区'
            },
            statType: 'count',
            sumField: null
        },
        paishuigouqu:{
        	name: '排水沟渠',
            addToMap: false,
            url: commandUrl + "paishui2/MapServer/11"+token,
            type: "polyline",
            titleField: 'NAME',
            outFields: ["NAME","SORT","SUBTYPE","STRUCT","WIDTH","HEIGHT","LENGTH","BEG_H","END_H","BEGIN_DEEP","END_DEEP","DISTRICT"],
            displayFields: ["名称",'类别',"类型","材质","宽度","高度","长度","起点高程","终点高程","起点埋深","终点埋深","行政区"],
            queryField: [
            	'USID',
                'NAME',
                'DISTRICT'
            ],
            statisticsFields: {
                'DISTRICT':'行政区'
            },
            statType: 'count',
            sumField: null
        }
    }
};
}


















/*
//35条河涌涉及城中村、农村统计表
var CZCData35 =
    [
    {
        name: '荔湾区',
        countryName: ['葵蓬村', '东漖村', '西郊村', '坑口村', '河沙村', '坦尾村', '山村村', '五眼桥村', '茶滘村'],
        alPeople: [5267, 8078, 2568, 22703, 16408, 13620, 8190, 44133, 31190],
        flPeople: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        name: '海珠区',
        countryName: ['联星村', '土华村'],
        alPeople: [5553, 10519],
        flPeople: [429, 2259]
    },
    {
        name: '天河区',
        countryName: ['林和村', '石牌村', '棠下村', '渔沙坦村', '猎德村', '新墟', '龙洞村', '长湴村', '岑村', '沐陂村', '车陂村', '柯木塱村', '凌塘村', '新塘村', '岐山社区'],
        alPeople: [0, 57160, 111581, 15960, 0, 0, 126700, 11986, 22431, 32000, 52000, 27057, 14999, 52045, 0],
        flPeople: [0, 16633, 31159, 4951, 0, 0, 0, 15761, 35732, 0, 56000, 8622, 0, 0, 0]
    },
    {
        name: '黄埔区',
        countryName: ['下沙社区', '茅岗社区', '双沙社区', '横沙社区', '姬堂社区', '黄陂社区', '暹岗社区', '禾丰社区', '贤江社区'],
        alPeople: [24989, 27470, 27452, 19696, 26449, 58300, 49380, 32000, 44240],
        flPeople: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        name: '白云区',
        countryName: ['永泰村', '东平村', '螺涌村', '槎龙村', '松北村', '松南村', '粤溪村', '横滘村', '鹅掌坦村', '上步村', '大冈村', '石马村', '清湖村', '平沙村', '夏茅村', '环滘村', '望岗村', '新科村', '长湴村（长红村）', '张村', '谭村', '聚龙村', '长岗村', '大岭村', '珠江村', '水沥村', '蓼江村', '井岗村', '罗溪村', '南浦村', '五丰村', '硖石村', '鹤岗村', '新楼村', '杨山村', '江村村', '南方村', '太成村', '和龙村', '郭塘村', '勤星村', '大田村', '沙溪村', '小塘村', '中八村', '双岗村', '茅山村', '何布村', '塘贝村', '泉溪村', '大龙头村', '叶边村', '大源村', '田心村', '园夏村', '北村村', '南村', '南岭村', '夏良村', '永兴村', '米龙村', '营溪村', '石湖村', '长沙埔村', '东凤村'],
        alPeople: [33000, 87000, 7701, 19928, 9900, 6130, 23562, 21756, 15236, 7692, 9586, 23738, 16194, 14423, 13910, 11658, 20000, 15943, 19258, 7000, 35000, 1742, 3965, 5763, 14608, 6343, 5415, 2167, 2109, 2886, 2843, 2726, 3037, 3443, 2883, 7793, 2638, 3444, 1813, 2407, 1602, 6114, 1097, 3742, 3272, 4020, 4987, 4820, 6694, 1242, 667, 2703, 40033, 1372, 4700, 1500, 3120, 13600, 10200, 33086, 5702, 2000, 10000, 3178, 4836],
        flPeople: [76000, 22000, 6501, 16816, 6921, 4355, 11658, 21543, 6629, 2286, 6485, 16885, 14023, 10955, 9066, 9606, 23000, 15781, 8864, 4342, 32411, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 132, 357, 234, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        name: '花都区',
        countryName: ['新华村', '三华村', '公益村', '乐同村', '九潭村', '马溪村', '东镜村', '广塘村', '石岗村', '雅瑶旧村', '雅瑶新村', '邝家庄村', '三向村', '赤坭村', '白坭村', '黄沙塘村', '蓝田村', '荷塘村', '横沙村', '平岭头村', '鸭一村', '水口村', '鸭湖村', '步云村', '红峰村', '社岗村', '大坳村', '石湖村', '杨二村', '新街村', '大陵村', '田美村', '横潭村', '莲塘村', '东莞村', '石塘村', '三东村', '大华村', '清布村', '民主村'],
        alPeople: [5250, 11080, 11114, 10010, 11171, 10466, 17171, 12599, 4322, 4391, 5314, 5696, 3794, 2302, 3087, 1512, 3177, 720, 820, 1344, 5002, 4759, 6745, 1418, 2581, 3563, 2819, 4796, 8119, 7405, 8182, 25560, 9783, 8764, 8359, 11954, 8329, 7324, 19048, 18911],
        flPeople: [0, 0, 4766, 0, 0, 0, 3113, 445, 15, 1368, 1278, 1195, 785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1681, 0, 0, 0, 0, 0, 3549, 2907, 5261, 3426, 2948, 0]
    },
    {
        name: '增城区',
        countryName: ['塘美村', '官湖村', '久裕村', '蒌元村', '石下村', '简村村', '章陂村', '小计', '长岗村', '瑶田村'],
        alPeople: [23200, 1464, 4504, 5350, 3049, 8844, 3065, 49476, 21500, 12478],
        flPeople: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    ];

var CZCData152 = [
    {
        name: '越秀区',
        countryName: ['沙涌南村', '瑶台村'],
        alPeople: [11296, 13915],
        flPeople: [9837, 6818]
    },
{
    name: '荔湾区',
    countryName: ['南漖村', '东塱村', '西塱村', '花地村', '鹤洞村', '海南村', '龙溪村', '增滘村'],
    alPeople: [8233, 14830, 10103, 39362, 13889, 14236, 12910, 10010],
    flPeople: [0, 0, 0, 0, 0, 0, 0, 0]
},
{
    name: '海珠区',
    countryName: ['龙潭村', '石溪村', '瑞宝村', '五凤村', '凤和村', '东风村', '沥滘村', '仑头村', '黄埔村', '红卫村'],
    alPeople: [3730, 33605, 30116, 130000, 229000, 36409, 30041, 17338, 15426, 18500],
    flPeople: [390, 0, 0, 13000, 52000, 12824, 10428, 1000, 1000, 2000]
},
{
    name: '天河区',
    countryName: ['沙东村', '黄村', '前进村', '吉山村', '石东村', '珠村', '元岗村', '银河村'],
    alPeople: [35834, 66731, 36090, 46992, 113330, 76300, 27993, 47461],
    flPeople: [3534, 46990, 27246, 10000, 30433, 10000, 11635, 48087]
},
{
    name: '黄埔区',
    countryName: ['文冲社区', '沙步社区', '深井社区', '九沙社区', '南湾社区', '夏园社区', '笔岗社区', '南岗社区', '沧联社区'],
    alPeople: [38064, 37948, 10921, 593, 7553, 34690, 27382, 27991, 50474],
    flPeople: [23547, 5001, 3000, 0, 0, 0, 23158, 2828, 0]
},
{
    name: '白云区',
    countryName: ['小坪经济联社', '棠涌经济联社', '柯子岭村', '陈田村', '江夏村', '萧岗村', '棠溪村', '沙涌村', '庆丰村', '凰岗村', '马务村', '龙湖村', '横沙村', '沙凤村', '棠下村', '鹤亭村', '秀水村', '汉塘村', '民强村', '新兴村', '高增村'],
    alPeople: [2000, 5800, 25000, 45000, 90000, 76796, 52000, 28000, 33000, 10000, 20000, 7269, 28302, 53379, 31000, 11800, 4800, 8272, 4500, 2403, 8350],
    flPeople: [12000, 80000, 25000, 150000, 0, 85912, 30000, 10000, 28348, 8165, 30000, 5106, 8800, 17661, 8000, 120, 375, 210, 518, 85, 230]
},
{
    name: '花都区',
    countryName: ['团结村', '狮民村', '花城村', '布岗村', '东方村', '两龙村', '洛场村', '东华村', '平山村', '小布村', '龙口村', '城西村', '儒林村', '红群村', '铁山村', '永明村', '平西村', '新和村', '凤凰村', '振兴村', '益群村', '合成村', '西头村', '中心村', '军田村', '前进村', '联合村'],
    alPeople: [7951, 1037, 3329, 6059, 5908, 9186, 3221, 3870, 9362, 5686, 4700, 4682, 4775, 6098, 3622, 4668, 5334, 9214, 7448, 52579, 23994, 38148, 7767, 11222, 17262, 22719, 37919],
    flPeople: [3737, 2, 15, 8, 11, 1555, 29, 324, 635, 200, 332, 31, 15, 25, 27, 34, 33, 265, 0, 2642, 4429, 15128, 646, 2183, 4276, 2781, 3990]
},
{
    name: '增城区',
    countryName: ['城丰村', '蒋村', '迳吓村', '新联村', '庆丰村', '上邵村', '白石村', '南埔村', '南安村', '新墩村', '高村村'],
    alPeople: [9109, 1250, 605, 2021, 2647, 6835, 6004, 11305, 7857, 6800, 3210],
    flPeople: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
},
{
    name: '番禺区',
    countryName: ['上漖村', '桔树村', '沙溪村', '礼村村', '大山村', '大维村', '山西村', '植村村', '官坑村', '会江村', '大兴村', '北联村', '河村村', '涌口村', '福涌村', '大涌口村', '沙北村', '南约村', '崇德村', '里仁洞村', '左边村', '大罗村', '丹山村', '罗家村', '沙圩一村', '云星村', '黄编村', '北亭村', '大龙村', '长坦村', '新桥村', '茶东村', '旧水坑村', '新水坑村', '屏一村', '屏二村', '谢村村', '诜敦村', '胜石村', '市头村', '官堂村', '板桥村', '罗边村', '傍江西村', '石岗东村', '傍江东村', '陈边村', '沙涌村', '沙头村', '南村村', '榄塘村', '石壁一村', '石壁三村', '都那村', '大洲村', '曾边村'],
    alPeople: [3500, 980, 5000, 2507, 2999, 933, 1707, 2496, 741, 2206, 1964, 858, 2095, 1159, 2666, 1925, 1834, 1538, 1400, 5501, 1380, 1278, 9388, 9000, 2950, 10380, 17026, 2400, 12388, 1453, 16757, 12006, 27187, 6171, 8828, 11150, 5847, 2290, 1502, 5459, 1703, 1269, 2046, 9353, 16204, 8213, 1435, 10221, 3079, 4458, 1256, 1955, 2500, 1300, 1955, 1500],
    flPeople: [20000, 8000, 9500, 10506, 22849, 3016, 4368, 16100, 741, 2206, 2346, 4158, 6327, 6209, 12065, 1475, 1375, 1000, 1000, 29622, 5100, 11656, 8000, 9000, 6000, 8200, 15308, 4000, 12388, 1252, 16757, 12006, 27187, 6171, 7530, 8743, 10085, 6315, , 5934, 5973, 5641, 2309, 9353, 17204, 8213, 3875, 10221, 14055, 18575, 2000, 2200, 3600, 5900, 2200, 10000]
}
];
*/