var playlist = function () {
    var videoPlaylist = [];
    var videoIndex = 0;

    $('#video-playlist li').each(function(index) {
        videoPlaylist.push($(this).data('url'));
    });

    var audio = document.getElementsByTagName("audio")[0];
    //audio.play();

    var video = document.getElementsByTagName("video")[0];
    $('#video-mp4').prop('src', videoPlaylist[videoIndex]+'.mp4');
    $('#video-ogg').prop('src', videoPlaylist[videoIndex]+'.ogg');
    $('#video-swf').prop('src', videoPlaylist[videoIndex]+'.swf');
    //video.play();
    videoIndex++;

    video.onended = function(e) {
        if (videoPlaylist[videoIndex] != undefined) {
            $('#video-mp4').prop('src', videoPlaylist[videoIndex]+'.mp4');
            $('#video-ogg').prop('src', videoPlaylist[videoIndex]+'.ogg');
            $('#video-swf').prop('data', videoPlaylist[videoIndex]+'.swf');
            $('#video-swf').find('param').prop('value', videoPlaylist[videoIndex]+'.swf');
            video.play();
            videoIndex++;
        }
    };

    audio.onended = function(e) {
        $('#lastCreation').show();
    }

    video.onpause = function(e) {
        audio.pause();
    };

    video.onplay = function(e) {
        audio.play();
    };
}