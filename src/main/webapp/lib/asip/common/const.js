/**
 * 整形常量
 * @returns
 */
define(function () { 
    return {
    	//-- 比较运算符  -- 
    	"COP_NONE":           -1, //空
    	"COP_EQUALITY":        1, //等于     
    	"COP_INEQUALITY":      2, //不等于   
    	"COP_LESSTHAN":        3, //小于     
    	"COP_GREATERTHAN":     4, //大于     
    	"COP_LESSEQUALITY":    5, //小于等于 
    	"COP_GREATEREQUALITY": 6, //大于等于 
    	"COP_BETWEEN":         7, //介于     
    	"COP_ISNULL":          8, //为空     
    	"COP_ISNOTNULL":       9, //不为空   
    	"COP_LIKE":           10, //包含     
    	"COP_NOTLIKE":        11, //不包含   
    	"COP_IN":             12, //在...之中
    	"COP_TAIL":           13, //尾号等于
    	
    	//-- 数据类型  -- 
    	"DT_INT":              1, //整数
    	"DT_BIGINT":           2, //长整数
    	"DT_FLOAT":            3, //浮点数
    	"DT_DECIMAL":          4, //固定精度数
    	"DT_BOOL":             5, //布尔型
    	"DT_CHAR":             6, //定长字符串
    	"DT_VARCHAR":          7, //变长字符串
    	"DT_NVARCHAR":         8, //变长字符串
    	"DT_LONGTEXT":         9, //长文本
    	"DT_BLOB":            10, //长二进制数
    	"DT_DATETIME":        11, //日期
    	
    	//-- 菜单响应方式 --
    	"MENU_RESPONSETYPE_CUSTOM":    0, //自定义响应
    	"MENU_RESPONSETYPE_AJAX":      1, //Ajax请求
    	"MENU_RESPONSETYPE_PANAL":     2, //打开panal
        "MENU_RESPONSETYPE_HTTP":      3, //打开页面
    	"MENU_RESPONSETYPE_DOWNLOAD":  4, //下载
    	
    	//-- 菜单响应回调 -- 
    	"MENU_RESPONSECALLBACK_CUSTOM":      0, //自定义回调
    	"MENU_RESPONSECALLBACK_READROW":     1, //行字体变细
    	"MENU_RESPONSECALLBACK_DISABLEROW":  2, //行字体置灰
    	"MENU_RESPONSECALLBACK_UNREADROW":   3, //行字体变粗
    	"MENU_RESPONSECALLBACK_REFRESHLIST": 4  //刷新列表
    }
});