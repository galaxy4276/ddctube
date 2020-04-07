const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeBtn');
const fullScreen = document.getElementById('jsFullScreen');


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
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}


function exitFullScreen () {
    fullScreen.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreen.addEventListener('click', goFullScreen);
    document.webkitExitFullscreen();
}


function goFullScreen () {
    videoContainer.webkitRequestFullscreen();
    fullScreen.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreen.removeEventListener('click', goFullScreen);
    fullScreen.addEventListener('click', exitFullScreen);
}    


function init () {
    playBtn.addEventListener('click', handlePlayClick);
    volumeBtn.addEventListener('click', handleVolumeClick);
    fullScreen.addEventListener('click', goFullScreen);
}

if (videoContainer) {
    init();
}

