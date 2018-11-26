define(["jquery", "html5media"], function($){

	var defaultSettings = {
		width: 300, 
		height: 30,
		controls: true,
		autoplay: false,
		preload: false,
		loop: false,
		muted: false,
		style: ''
	},
	audio = [
	    "<audio src='{url}' style='width:{width}px;height:{height}px;{style}'",
	    "controls autoplay muted loop preload>",
		"</audio>"
	].join("");
	return {
		getAudio: function(url, settings){
			settings = $.extend({}, defaultSettings, settings);
			var _audio = audio; 
			_audio = _audio.replace(/{url}/g, url);
			
			if (settings.width && settings.width.toString().indexOf("%") > -1) {
				_audio = _audio.replace(/{width}px/g, settings.width);
			} else {
				_audio = _audio.replace(/{width}/g, settings.width);
			}
			
			if (settings.height && settings.height.toString().indexOf("%") > -1) {
				_audio = _audio.replace(/{height}px/g, settings.height);
			} else {
				_audio = _audio.replace(/{height}/g, settings.height);
			}
			
			_audio = _audio.replace(/{style}/g, settings.style);
			if(!settings.controls){
				_audio = _audio.replace(/controls/g, "");
			}
			if(!settings.autoplay){
				_audio = _audio.replace(/autoplay/g, "");
			}
			if(!settings.loop){
				_audio = _audio.replace(/loop/g, "");
			}
			if(!settings.preload){
				_audio = _audio.replace(/preload/g, "");
			}
			if(!settings.muted){
				_audio = _audio.replace(/muted/g, "");
			}
			return _audio;
		}
	}
});