const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayButton');
const jsVolumeBtn = document.getElementById('jsVolumnBtn')

function handlePlayClick () {
    console.log('handlePlayClick Function Running');
    if (videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumeClick () {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        jsVolumeBtn.innerHTML = '<i class="fas fa-volume-up></i>';
    } else {
        videoPlayer.muted = true;
        jsVolumeBtn.innerHTML = '<i class="fas fa-volume-mute></i>';
    }
}

function init () {
    playBtn.addEventListener('click', handlePlayClick);
    jsVolumeBtn.addEventListener('click', handleVolumeClick);
}

if (videoContainer) {
    init();
}

