```
-- 菜单表
CREATE TABLE A_MENU (
	ID VARCHAR2(32),
	NAME VARCHAR2(256),
	URL VARCHAR2(512),
	HOVER_ICON_URL VARCHAR2(256),
	NORMAL_ICON_URL VARCHAR2(256),
	PATH VARCHAR2(512),
	AUTHORIZE_CODE VARCHAR2(128),
	DISP_ORDER NUMBER(6, 0),
	IS_DISPLAY VARCHAR2(1),
	REMARK VARCHAR2(512),
	PID VARCHAR2(32)
);

COMMENT ON TABLE A_MENU IS '菜单表';
COMMENT ON COLUMN A_MENU.ID IS '菜单ID';
COMMENT ON COLUMN A_MENU.NAME IS '菜单名称';
COMMENT ON COLUMN A_MENU.URL IS '菜单URL';
COMMENT ON COLUMN A_MENU.HOVER_ICON_URL IS '菜单ICON悬浮URL';
COMMENT ON COLUMN A_MENU.NORMAL_ICON_URL IS '菜单ICON默认URL';
COMMENT ON COLUMN A_MENU.PATH IS '菜单所在路径';
COMMENT ON COLUMN A_MENU.AUTHORIZE_CODE IS '授权码';
COMMENT ON COLUMN A_MENU.DISP_ORDER IS '排序';
COMMENT ON COLUMN A_MENU.IS_DISPLAY IS '是否显示';
COMMENT ON COLUMN A_MENU.REMARK IS '备注';
COMMENT ON COLUMN A_MENU.PID IS '菜单父ID';

INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('1', '首页', 'http://10.194.170.78/awater/view/app/homePage/homePage.html', null, null, '/首页', null, 1, '1', null, null);
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2', '水务一张图', 'components/map/index', null, null, '/水务一张图', null, 2, '1', null, null);
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('3', '资源服务目录', 'components/serv/index', null, null, '/资源服务目录', null, 3, '1', null, null);
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('4', '综合信息展示', 'http://10.194.170.78/awater/view/app/resourceContainer/resourceContainer.html', null, null, '/综合信息展示', null, 4, '1', null, null);
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('5', '后台管理', 'http://10.194.170.78/agsupport/', null, null, '/后台管理', null, 5, '1', null, null);

INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-1', '监测监控', null, 'http://127.0.0.1/awater/styles/common/img/map/bico01_h.png', 'http://127.0.0.1/awater/styles/common/img/map/bico01.png', '/水务一张图/监测监控', null, 6, '1', null, '2');
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-2', '工程&bull;设施', null, 'http://127.0.0.1/awater/styles/common/img/map/bico02_h.png', 'http://127.0.0.1/awater/styles/common/img/map/bico02.png', '/水务一张图/工程&bull;设施', null, 7, '1', null, '2');
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-3', '专题图层', null, 'http://127.0.0.1/awater/styles/common/img/map/bico03_h.png', 'http://127.0.0.1/awater/styles/common/img/map/bico03.png', '/水务一张图/专题图层', null, 8, '1', null, '2');
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-4', '四标四实', null, 'http://127.0.0.1/awater/styles/common/img/map/bico01_h.png', 'http://127.0.0.1/awater/styles/common/img/map/bico01.png', '/水务一张图/四标四实', null, 9, '1', null, '2');

INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-1-1', '气象信息', null, null, null, '/水务一张图/监测监控/气象信息', null, 100, '1', null, '2-1');
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-1-2', '水质信息', null, null, null, '/水务一张图/监测监控/水质信息', null, 101, '1', null, '2-1');

INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-1-1-1', '气象预报', 'http://10.194.170.2/gzsfweb/HUST/QX_TianQiYuBao.aspx', null, null, '/水务一张图/监测监控/气象信息/气象预报', null, 1000, '1', null, '2-1-1');
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-1-1-2', '卫星云图', 'http://www.gd12121.com:8080/date/FY2Gpj7/FY2Gpj7.html', null, null, '/水务一张图/监测监控/气象信息/卫星云图', null, 1001, '1', null, '2-1-1');
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-1-1-3', '雷达图', 'http://10.194.170.78/awater/view/app/watermap/topic/weatherradar/weatherradar.html', null, null, '/水务一张图/监测监控/气象信息/雷达图', null, 1002, '1', null, '2-1-1');
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-1-1-4', '台风路径', 'http://typhoon.weather.com.cn/gis/typhoon_full.shtml', null, null, '/水务一张图/监测监控/气象信息/台风路径', null, 1003, '1', null, '2-1-1');
INSERT INTO A_MENU(ID, NAME, URL, HOVER_ICON_URL, NORMAL_ICON_URL, PATH, AUTHORIZE_CODE, DISP_ORDER, IS_DISPLAY, REMARK, PID)
VALUES('2-1-2-1', '水质信息', null, null, null, '/水务一张图/监测监控/水质信息/污水处理厂进出水口', null, 1004, '1', null, '2-1-2');

```