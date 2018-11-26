function previewMap(url) {
    layer.open({
        type: 2, content: ["./view/app/index/previewMap.html?url=" + url, 'no'], shadeClose: true,
        title: false,
        area: ['95%', '95%']
    });
}

function popupOAInfo() {
    var content =
        '  <div class="notice">											  ' +
        '	      <div class="notice_com">									  ' +
        '	        <div class="notice_tab">								  ' +
        '	          <ul>											  ' +
        '	            <li class="current"><a href="#">待办事项</a></li>					  ' +
        '	            <li><a href="#">系统通知</a></li>							  ' +
        '	          </ul>											  ' +
        '	          <a class="more">更多>></a></div>							  ' +
        '	        <div class="notice_list">								  ' +
        '	          <ul>											  ' +
        '	            <li> <a href="#">中心城区河湖库监测与预警系统<span>2017-08-10</span></a> </li>	  ' +
        '	            <li> <a href="#">广州市水文气象信息共享平台<span>2017-08-10</span></a> </li>	  ' +
        '	          </ul>											  ' +
        '	        </div>											  ' +
        '	      </div>											  ' +
        ' </div>';
    var width = 390, height = 200;
    layer.open({
        type: 1,
        content: content,
        title: '待办事项',
        shade: false,
        anim: 1,
        closeBtn: 0,
        maxmin: true,
        offset: ['75px', $('body').width() - width + 'px'],
        area: [width + 'px', height + 'px']
    });
}

function findPageContainer(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf("pageContainer") >= 0) {
            return list[i];
        }
    }
}

function showResourcePage(str) {
    require(["view/desktop/desktop"], function (desktop) {
        var mendList = desktop.menuList();
        var pageContainer = findPageContainer(mendList);
        auGurit.global.pageContainer = str;
        desktop.menuClick(pageContainer);
        var page = document.getElementById("pageFrame");
        if (page) {
            page.src = page.src.replace(/#[^#]+/, "") + "#" + auGurit.global.pageContainer;
        }
    })
}

function fullScreen() {
    var docElm = document.getElementById("resourceFrame");
    //W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    } else {
        alert("当前浏览器不支持全屏功能,请在新打开的页面中使用F11进行全屏显示");
        window.open("view/app/resourceContainer/resourceContainer_Dark.html");
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function isFullScreen() {
    if (document.body.clientHeight == window.screen.height) {
        return true;
    } else {
        return false;
    }
}

window.onresize = function () {
    // // var fullScreenDiv=document.getElementById("resourceFrameDiv");
    // var pageContainer= document.getElementById("resourceFrame");
    // //var pageFrame=getIframeById("resourceContainerFrame");
    // if(pageContainer) {
    //     // alert(isFullScreen());
    // if (isFullScreen()) {
    //         // fullScreenDiv.style.display="";
    // 	// pageContainer.style.display="";
    // } else {
    //         // fullScreenDiv.style.display="none";
    // 	//pageContainer.style.display="none";
    // }
    // }
};

function navigateTo(str) {
    exitFullScreen();
    showResourcePage(str);
}

function getIframeById(id) {
    var result = (frames[id].contentWindow) ? frames[id].contentWindow : frames[id];
    return result;
}

function getUrlValue(url, name) {
    var reg = new RegExp(name + "=([^&]*)");
    try {
        return decodeURI(reg.exec(url)[1]);
    } catch (e) {
        return "";
    }
}

var webSocket = null;
var wsPath="ws://"+location.host+"/awater/ws/loginSocket";
function connectWebSocket() {
    //判断当前浏览器是否支持webSocket
    if ('WebSocket' in window) {
        webSocket = new WebSocket(wsPath);
    }
    else {
        console.log('当前浏览器不支持webSocket');
    }
    webSocket.onerror = function () {
        console.log("webSocket连接发生错误");
    };
    //连接成功建立的回调方法
    webSocket.onopen = function () {
        console.log("webSocket连接成功");
    }
    //接收到消息的回调方法
    webSocket.onmessage = function (event) {
        if (event.data.indexOf("退出") >= 0) {
            alert("该帐号已从其他地方登录,如果这不是您的操作,请及时修改你的登录密码");
            logOutSystem();
        }
    }
    //连接关闭的回调方法
    webSocket.onclose = function () {
        console.log("webSocket连接关闭");
    }
    //监听窗口关闭事件，当窗口关闭时，主动去关闭webSocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closewebSocket();
    }
}

function closewebSocket() {
    if(webSocket!=null)
    webSocket.close();
}

function logOutSystem(){
    closewebSocket();
    var href = auGurit.global.rootPath + 'logoutByCas.do';
    location.href = href;
}

// connectWebSocket();