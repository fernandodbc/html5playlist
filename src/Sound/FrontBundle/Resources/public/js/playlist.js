$(document).ready(function() {

var ylelong = {};

var videoPlaylist = [];
var videoIndex = 0;
var video = [];

$('#video-playlist li').each(function(index) {
    videoPlaylist.push($(this).data('url'));
});

var audio = document.getElementById("audio");
audio.play();


ylelong.videoPlayNext = function () {

    video[videoIndex].onended = function(e) {
        if (videoPlaylist[videoIndex] != undefined) {
            video[videoIndex] = document.getElementsByTagName("video")[videoIndex];
            $(video[(videoIndex-1)]).remove();
            video[videoIndex].play();
            $(video[videoIndex]).show();
        }
    };

    video[videoIndex].onpause = function(e) {
        audio.pause();
    };

    video[videoIndex].onplay = function(e) {
        videoIndex++;
        video[videoIndex] = document.getElementsByTagName("video")[videoIndex];
        video[videoIndex].load();

        ylelong.videoPlayNext();
    };
}

ylelong.videoPlaylist = function () {
    video[videoIndex] = document.getElementsByTagName("video")[videoIndex];
    $(video[videoIndex]).show();
    video[videoIndex].load();
    video[videoIndex].play();

    video[videoIndex].onended = function(e) {
        if (videoPlaylist[videoIndex] != undefined) {
            video[videoIndex] = document.getElementsByTagName("video")[videoIndex];
            $(video[(videoIndex-1)]).remove();
            video[videoIndex].play();
            $(video[videoIndex]).show();
        }
    };

    video[videoIndex].onpause = function(e) {
        audio.pause();
    };

    video[videoIndex].onplay = function(e) {
        audio.play();
        videoIndex++;
        video[videoIndex] = document.getElementsByTagName("video")[videoIndex];
        video[videoIndex].load();

        ylelong.videoPlayNext();
    };
}

ylelong.videoPlaylist();

});