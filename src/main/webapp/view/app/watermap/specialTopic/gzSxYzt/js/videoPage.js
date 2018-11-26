/**
 * Created by lizzy on 2017/10/24.
 */

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

var videoUrl = GetQueryString("videoUrl");
var videoControl;

$(function(){
    $("#videoControl").attr("src",videoUrl);
    $("#videoControl").on("play",playVideo);
    $("#videoControl").on("pause",pauseVideo);
    videoControl = $("#videoControl")[0];
});

function videoProgress(){
    setTimeout(function(){
        var currentTime = videoControl.currentTime;
        var videoDuration = videoControl.duration;
        var dueLengthNow = (currentTime/videoDuration)*(parent.planelineLength);
        if(!videoControl.paused){
            parent.tourOverTheLine(dueLengthNow);
            videoProgress();
        }
    },1000);
}

function playVideo(){
    parent.map.setScale(10000);
    videoProgress();
}

function pauseVideo(){
    console.log("The video has been paused!")
}
