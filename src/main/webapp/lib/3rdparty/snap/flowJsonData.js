define(function() {
	var dataJson = {
		loadData : function(bizID) {
			var dataList;
			if (bizID == 115) {
				dataList = {
					"NodeCount" : 24,
					"LineCount" : 30,
					"CurNodeID" : -1,
					"AActDefID" : 0,
					"NodeList" : [ {
						"title" : "执法登记",
						"num" : 0,
						"id" : 983,
						"style" : 9,
						"x" : 55,
						"y" : 63,
					}, {
						"title" : "法制员审核",
						"num" : 1,
						"id" : 884,
						"style" : 1,
						"x" : 195,
						"y" : 63,
					}, {
						"title" : "大队长申报立案",
						"num" : 2,
						"id" : 953,
						"style" : 2,
						"x" : 381,
						"y" : 63,
					}, {
						"title" : "法制处(科)审核立案",
						"num" : 3,
						"id" : 886,
						"style" : 2,
						"x" : 746,
						"y" : 63,
					}, {
						"title" : "执法机关审批立案",
						"num" : 4,
						"id" : 881,
						"style" : 1,
						"x" : 746,
						"y" : 320,
					}, {
						"title" : "调查取证限改",
						"num" : 5,
						"id" : 938,
						"style" : 5,
						"x" : 381,
						"y" : 320,
					}, {
						"title" : "法制员审核处罚/移送/协助",
						"num" : 6,
						"id" : 957,
						"style" : 3,
						"x" : 195,
						"y" : 320,
					}, {
						"title" : "大队长审批处罚/移送/协助",
						"num" : 7,
						"id" : 933,
						"style" : 3,
						"x" : 55,
						"y" : 320,
					}, {
						"title" : "法制处(科)审批申请",
						"num" : 8,
						"id" : 865,
						"style" : 3,
						"x" : 55,
						"y" : 400,
					}, {
						"title" : "执法机关审批申请",
						"num" : 9,
						"id" : 855,
						"style" : 3,
						"x" : 55,
						"y" : 500,
					}, {
						"title" : "大队执行",
						"num" : 10,
						"id" : 856,
						"style" : 3,
						"x" : 381,
						"y" : 500,
					}, {
						"title" : "执法机关结案/强制审批",
						"num" : 11,
						"id" : 880,
						"style" : 3,
						"x" : 746,
						"y" : 500,
					}, {
						"title" : "法制员结案",
						"num" : 12,
						"id" : 858,
						"style" : 3,
						"x" : 746,
						"y" : 600,
					}, {
						"title" : "法制处(科)受理听证",
						"num" : 13,
						"id" : 936,
						"style" : 3,
						"x" : 381,
						"y" : 600,
					}, {
						"title" : "需听证",
						"num" : 14,
						"id" : 0014000,
						"style" : 7,
						"x" : 300,
						"y" : 550,
					}, {
						"title" : "听证回执",
						"num" : 15,
						"id" : 0015000,
						"style" : 7,
						"x" : 462,
						"y" : 550,
					}, {
						"title" : "大队长提出结案/强制申请",
						"num" : 16,
						"id" : 854,
						"style" : 3,
						"x" : 569,
						"y" : 400,
					}, {
						"title" : "法制处(科)结案/强制审批",
						"num" : 17,
						"id" : 860,
						"style" : 3,
						"x" : 746,
						"y" : 400,
					}, {
						"title" : "大队长（解除）扣押/查封审批",
						"num" : 18,
						"id" : 979,
						"style" : 3,
						"x" : 696,
						"y" : 243,
					}, {
						"title" : "法制处（解除）扣押/查封审批科",
						"num" : 19,
						"id" : 981,
						"style" : 3,
						"x" : 696,
						"y" : 140,
					}, {
						"title" : "执法机关（解除）扣押/查封审批",
						"num" : 20,
						"id" : 980,
						"style" : 3,
						"x" : 521,
						"y" : 140,
					}, {
						"title" : "大队长证据先行保存审批",
						"num" : 21,
						"id" : 955,
						"style" : 3,
						"x" : 241,
						"y" : 140,
					}, {
						"title" : "法制处(科)审阅证据先行保存",
						"num" : 22,
						"id" : 937,
						"style" : 3,
						"x" : 90,
						"y" : 140,
					}, {
						"title" : "执法机关审核证据登记保存",
						"num" : 23,
						"id" : 940,
						"style" : 3,
						"x" : 90,
						"y" : 243,
					}, ],
					"LineList" : [ {
						"color" : 2,
						"num" : 0,
						"head" : 0,
						"tail" : 1
					}, {
						"color" : 2,
						"num" : 1,
						"head" : 1,
						"tail" : 2
					}, {
						"color" : 2,
						"num" : 2,
						"head" : 2,
						"tail" : 3
					}, {
						"color" : 2,
						"num" : 3,
						"head" : 3,
						"tail" : 4
					}, {
						"color" : 2,
						"num" : 4,
						"head" : 4,
						"tail" : 5
					}, {
						"color" : 2,
						"num" : 5,
						"head" : 5,
						"tail" : 6
					}, {
						"color" : 2,
						"num" : 6,
						"head" : 6,
						"tail" : 7
					}, {
						"color" : 2,
						"num" : 7,
						"head" : 7,
						"tail" : 8
					}, {
						"color" : 2,
						"num" : 8,
						"head" : 8,
						"tail" : 9
					}, {
						"color" : 2,
						"num" : 9,
						"head" : 9,
						"tail" : 10
					}, {
						"color" : 2,
						"num" : 10,
						"head" : 10,
						"tail" : 11
					}, {
						"color" : 2,
						"num" : 11,
						"head" : 11,
						"tail" : 12
					}, {
						"color" : 2,
						"num" : 12,
						"head" : 10,
						"tail" : 14
					}, {
						"color" : 2,
						"num" : 13,
						"head" : 14,
						"tail" : 13
					}, {
						"color" : 2,
						"num" : 14,
						"head" : 13,
						"tail" : 15
					}, {
						"color" : 2,
						"num" : 15,
						"head" : 15,
						"tail" : 10
					}, {
						"color" : 2,
						"num" : 16,
						"head" : 10,
						"tail" : 16
					}, {
						"color" : 2,
						"num" : 17,
						"head" : 16,
						"tail" : 17
					}, {
						"color" : 2,
						"num" : 18,
						"head" : 17,
						"tail" : 11
					}, {
						"color" : 2,
						"num" : 19,
						"head" : 5,
						"tail" : 16
					}, {
						"color" : 2,
						"num" : 20,
						"head" : 5,
						"tail" : 18
					}, {
						"color" : 2,
						"num" : 21,
						"head" : 18,
						"tail" : 19
					}, {
						"color" : 2,
						"num" : 22,
						"head" : 19,
						"tail" : 20
					}, {
						"color" : 2,
						"num" : 23,
						"head" : 20,
						"tail" : 5
					}, {
						"color" : 2,
						"num" : 24,
						"head" : 5,
						"tail" : 21
					}, {
						"color" : 2,
						"num" : 25,
						"head" : 21,
						"tail" : 22
					}, {
						"color" : 2,
						"num" : 26,
						"head" : 22,
						"tail" : 23
					}, {
						"color" : 2,
						"num" : 27,
						"head" : 23,
						"tail" : 5
					}, {
						"color" : 2,
						"num" : 28,
						"head" : 10,
						"tail" : 5
					}, {
						"color" : 2,
						"num" : 29,
						"head" : 9,
						"tail" : 5
					}, ]
				};

			} else {
				dataList = {
					"NodeCount" : 39,
					"LineCount" : 58,
					"CurNodeID" : -1,
					"AActDefID" : 0,
					"NodeList" : [ {
						"title" : "处室负责人强制措施审核",
						"num" : 0,
						"id" : 4238,
						"style" : 9,
						"x" : 423,
						"y" : 36,
					}, {
						"title" : "分管领导强制措施审批",
						"num" : 1,
						"id" : 4241,
						"style" : 1,
						"x" : 611,
						"y" : 71,
					}, {
						"title" : "法制员强制措施审核",
						"num" : 2,
						"id" : 4250,
						"style" : 2,
						"x" : 258,
						"y" : 82,
					}, {
						"title" : "行政强制措施",
						"num" : 3,
						"id" : 4261,
						"style" : 2,
						"x" : 423,
						"y" : 140,
					}, {
						"title" : "法制员结案审核",
						"num" : 4,
						"id" : 4248,
						"style" : 1,
						"x" : 785,
						"y" : 185,
					}, {
						"title" : "分管领导立案审批",
						"num" : 5,
						"id" : 4252,
						"style" : 5,
						"x" : 39,
						"y" : 180,
					}, {
						"title" : "处室负责人结案审批",
						"num" : 6,
						"id" : 4246,
						"style" : 3,
						"x" : 785,
						"y" : 287,
					}, {
						"title" : "行政处罚",
						"num" : 7,
						"id" : 4245,
						"style" : 3,
						"x" : 423,
						"y" : 287,
					}, {
						"title" : "调查立案",
						"num" : 8,
						"id" : 4247,
						"style" : 3,
						"x" : 160,
						"y" : 287,
					}, {
						"title" : "审查结案",
						"num" : 9,
						"id" : 4258,
						"style" : 3,
						"x" : 687,
						"y" : 287,
					}, {
						"title" : "行政处罚法制员审核",
						"num" : 10,
						"id" : 4256,
						"style" : 3,
						"x" : 248,
						"y" : 329,
					}, {
						"title" : "处室负责人立案审批",
						"num" : 11,
						"id" : 4259,
						"style" : 3,
						"x" : 39,
						"y" : 287,
					}, {
						"title" : "分管领导结案审批",
						"num" : 12,
						"id" : 4253,
						"style" : 3,
						"x" : 785,
						"y" : 383,
					}, {
						"title" : "行政处罚处室负责人审核",
						"num" : 13,
						"id" : 4243,
						"style" : 3,
						"x" : 248,
						"y" : 393,
					}, {
						"title" : "行政强制执行",
						"num" : 14,
						"id" : 4257,
						"style" : 3,
						"x" : 511,
						"y" : 408,
					}, {
						"title" : "行政处罚分管领导审核",
						"num" : 15,
						"id" : 4260,
						"style" : 3,
						"x" : 300,
						"y" : 445,
					}, {
						"title" : "法制员立案审核",
						"num" : 16,
						"id" : 4249,
						"style" : 3,
						"x" : 39,
						"y" : 410,
					}, {
						"title" : "行政处罚领导审核",
						"num" : 17,
						"id" : 4240,
						"style" : 3,
						"x" : 350,
						"y" : 515,
					}, {
						"title" : "分管领导强制执行审批",
						"num" : 18,
						"id" : 4239,
						"style" : 3,
						"x" : 687,
						"y" : 438,
					}, {
						"title" : "法制部门听证/发起重大处罚讨论",
						"num" : 19,
						"id" : 4263,
						"style" : 3,
						"x" : 423,
						"y" : 596,
					}, {
						"title" : "处室负责人强制执行审批",
						"num" : 20,
						"id" : 4237,
						"style" : 3,
						"x" : 625,
						"y" : 507,
					}, {
						"title" : "法制员强制执行审核",
						"num" : 21,
						"id" : 4244,
						"style" : 3,
						"x" : 610,
						"y" : 596,
					},

					{
						"title" : "",
						"num" : 22,
						"id" : 0022000,
						"style" : 7,
						"x" : 340,
						"y" : 140,
					}, {
						"title" : "",
						"num" : 23,
						"id" : 0023000,
						"style" : 7,
						"x" : 450,
						"y" : 88,
					}, {
						"title" : "",
						"num" : 24,
						"id" : 0024000,
						"style" : 7,
						"x" : 520,
						"y" : 125,
					}, {
						"title" : "",
						"num" : 25,
						"id" : 0025000,
						"style" : 7,
						"x" : 130,
						"y" : 230,
					}, {
						"title" : "",
						"num" : 26,
						"id" : 0026000,
						"style" : 7,
						"x" : 100,
						"y" : 310,
					}, {
						"title" : "",
						"num" : 27,
						"id" : 0027000,
						"style" : 7,
						"x" : 130,
						"y" : 350,
					}, {
						"title" : "",
						"num" : 28,
						"id" : 0028000,
						"style" : 7,
						"x" : 355,
						"y" : 318,
					}, {
						"title" : "",
						"num" : 29,
						"id" : 0029000,
						"style" : 7,
						"x" : 355,
						"y" : 358,
					}, {
						"title" : "",
						"num" : 30,
						"id" : 0030000,
						"style" : 7,
						"x" : 380,
						"y" : 380,
					}, {
						"title" : "",
						"num" : 31,
						"id" : 0031000,
						"style" : 7,
						"x" : 410,
						"y" : 420,
					}, {
						"title" : "",
						"num" : 32,
						"id" : 0032000,
						"style" : 7,
						"x" : 450,
						"y" : 415,
					}, {
						"title" : "",
						"num" : 33,
						"id" : 0033000,
						"style" : 7,
						"x" : 600,
						"y" : 405,
					}, {
						"title" : "",
						"num" : 34,
						"id" : 0034000,
						"style" : 7,
						"x" : 568,
						"y" : 475,
					}, {
						"title" : "",
						"num" : 35,
						"id" : 0035000,
						"style" : 7,
						"x" : 540,
						"y" : 505,
					}, {
						"title" : "",
						"num" : 36,
						"id" : 0036000,
						"style" : 7,
						"x" : 736,
						"y" : 215,
					}, {
						"title" : "",
						"num" : 37,
						"id" : 0037000,
						"style" : 7,
						"x" : 736,
						"y" : 310,
					}, {
						"title" : "",
						"num" : 38,
						"id" : 0038000,
						"style" : 7,
						"x" : 736,
						"y" : 355,
					},

					],
					"LineList" : [ {
						"color" : 2,
						"num" : 0,
						"head" : 2,
						"tail" : 3
					}, {
						"color" : 2,
						"num" : 1,
						"head" : 3,
						"tail" : 22
					}, {
						"color" : 2,
						"num" : 2,
						"head" : 22,
						"tail" : 2
					}, {
						"color" : 2,
						"num" : 3,
						"head" : 0,
						"tail" : 3
					}, {
						"color" : 2,
						"num" : 4,
						"head" : 3,
						"tail" : 23
					}, {
						"color" : 2,
						"num" : 5,
						"head" : 23,
						"tail" : 0
					}, {
						"color" : 2,
						"num" : 6,
						"head" : 1,
						"tail" : 3
					}, {
						"color" : 2,
						"num" : 7,
						"head" : 3,
						"tail" : 24
					}, {
						"color" : 2,
						"num" : 8,
						"head" : 24,
						"tail" : 1
					}, {
						"color" : 2,
						"num" : 9,
						"head" : 3,
						"tail" : 7
					}, {
						"color" : 2,
						"num" : 10,
						"head" : 7,
						"tail" : 9
					}, {
						"color" : 2,
						"num" : 11,
						"head" : 8,
						"tail" : 7
					}, {
						"color" : 2,
						"num" : 12,
						"head" : 8,
						"tail" : 3
					}, {
						"color" : 2,
						"num" : 13,
						"head" : 3,
						"tail" : 9
					}, {
						"color" : 2,
						"num" : 14,
						"head" : 5,
						"tail" : 8
					}, {
						"color" : 2,
						"num" : 15,
						"head" : 8,
						"tail" : 25
					}, {
						"color" : 2,
						"num" : 16,
						"head" : 25,
						"tail" : 5
					}, {
						"color" : 2,
						"num" : 17,
						"head" : 11,
						"tail" : 8
					}, {
						"color" : 2,
						"num" : 18,
						"head" : 8,
						"tail" : 26
					}, {
						"color" : 2,
						"num" : 19,
						"head" : 26,
						"tail" : 11
					}, {
						"color" : 2,
						"num" : 20,
						"head" : 16,
						"tail" : 8
					}, {
						"color" : 2,
						"num" : 21,
						"head" : 8,
						"tail" : 27
					}, {
						"color" : 2,
						"num" : 22,
						"head" : 27,
						"tail" : 16
					}, {
						"color" : 2,
						"num" : 23,
						"head" : 10,
						"tail" : 7
					}, {
						"color" : 2,
						"num" : 24,
						"head" : 7,
						"tail" : 28
					}, {
						"color" : 2,
						"num" : 25,
						"head" : 28,
						"tail" : 10
					}, {
						"color" : 2,
						"num" : 26,
						"head" : 13,
						"tail" : 7
					}, {
						"color" : 2,
						"num" : 27,
						"head" : 7,
						"tail" : 29
					}, {
						"color" : 2,
						"num" : 28,
						"head" : 29,
						"tail" : 13
					}, {
						"color" : 2,
						"num" : 29,
						"head" : 15,
						"tail" : 7
					}, {
						"color" : 2,
						"num" : 30,
						"head" : 7,
						"tail" : 30
					}, {
						"color" : 2,
						"num" : 31,
						"head" : 30,
						"tail" : 15
					}, {
						"color" : 2,
						"num" : 32,
						"head" : 17,
						"tail" : 7
					}, {
						"color" : 2,
						"num" : 33,
						"head" : 7,
						"tail" : 31
					}, {
						"color" : 2,
						"num" : 34,
						"head" : 31,
						"tail" : 17
					}, {
						"color" : 2,
						"num" : 35,
						"head" : 19,
						"tail" : 7
					}, {
						"color" : 2,
						"num" : 36,
						"head" : 7,
						"tail" : 32
					}, {
						"color" : 2,
						"num" : 37,
						"head" : 32,
						"tail" : 19
					}, {
						"color" : 2,
						"num" : 38,
						"head" : 7,
						"tail" : 14
					}, {
						"color" : 2,
						"num" : 39,
						"head" : 14,
						"tail" : 9
					}, {
						"color" : 2,
						"num" : 40,
						"head" : 14,
						"tail" : 18
					}, {
						"color" : 2,
						"num" : 41,
						"head" : 18,
						"tail" : 33
					}, {
						"color" : 2,
						"num" : 42,
						"head" : 33,
						"tail" : 14
					}, {
						"color" : 2,
						"num" : 43,
						"head" : 14,
						"tail" : 20
					}, {
						"color" : 2,
						"num" : 44,
						"head" : 20,
						"tail" : 34
					}, {
						"color" : 2,
						"num" : 45,
						"head" : 34,
						"tail" : 14
					}, {
						"color" : 2,
						"num" : 46,
						"head" : 14,
						"tail" : 21
					}, {
						"color" : 2,
						"num" : 47,
						"head" : 21,
						"tail" : 35
					}, {
						"color" : 2,
						"num" : 48,
						"head" : 35,
						"tail" : 14
					}, {
						"color" : 2,
						"num" : 49,
						"head" : 9,
						"tail" : 4
					}, {
						"color" : 2,
						"num" : 50,
						"head" : 4,
						"tail" : 36
					}, {
						"color" : 2,
						"num" : 51,
						"head" : 36,
						"tail" : 9
					}, {
						"color" : 2,
						"num" : 52,
						"head" : 9,
						"tail" : 6
					}, {
						"color" : 2,
						"num" : 53,
						"head" : 6,
						"tail" : 37
					}, {
						"color" : 2,
						"num" : 54,
						"head" : 37,
						"tail" : 9
					}, {
						"color" : 2,
						"num" : 55,
						"head" : 9,
						"tail" : 12
					}, {
						"color" : 2,
						"num" : 56,
						"head" : 12,
						"tail" : 38
					}, {
						"color" : 2,
						"num" : 57,
						"head" : 38,
						"tail" : 9
					},

					]
				};
			}
			return dataList;
		},
	};
	return dataJson;
});
