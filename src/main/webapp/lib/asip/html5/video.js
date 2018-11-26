define(["jquery", "html5media"], function($){

	/**
	 * autoplay autoplay 如果出现该属性，则视频在就绪后马上播放。 
       controls controls 如果出现该属性，则向用户显示控件，比如播放按钮。 
       height pixels 设置视频播放器的高度。 
       loop loop 如果出现该属性，则当媒介文件完成播放后再次开始播放。 
       preload preload 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。
	   src url 要播放的视频的 URL。 
       width pixels 设置视频播放器的宽度。 
	 */
	var defaultSettings = {
		controls: true,
		width: 300, 
		height: 300, 
		autoplay: false,
		preload: false,
		loop: false,
		style: ''
	},
	video = [
	    "<video src='{url}' width='{width}' height='{height}' style='{style}'",
	    "controls autoplay loop preload>",
	    "此浏览器不支持 video标签",
		"</video>"
	].join("");
	return {
		getVideo: function(url, settings){
			settings = $.extend({}, defaultSettings, settings);
			var _video =  video;
			_video = _video.replace(/{url}/g, url);
			_video = _video.replace(/{width}/g, settings.width);
			_video = _video.replace(/{height}/g, settings.height);
			_video = _video.replace(/{style}/g, settings.style);
			if(!settings.controls){
				_video = _video.replace(/controls/g, "");
			}
			if(!settings.autoplay){
				_video = _video.replace(/autoplay/g, "");
			}
			if(!settings.loop){
				_video = _video.replace(/loop/g, "");
			}
			if(!settings.preload){
				_video = _video.replace(/preload/g, "");
			}
			return _video;
		}
	}
});