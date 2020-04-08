const recorderContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;


const handleVideoData = e => {
    console.log(e);
}


const startRecording = () => {
    const videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener('dataavailable', handleVideoData);
}


const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 },
        });
        videoPreview.srcObject = stream;
        videoPreview.mute = true;
        videoPreview.play();
        recordBtn.innerHTML = 'Stop recording';
        streamObject = stream;
        startRecording();
    } catch (error) {
        recordBtn.innerHTML = ":( Can't Record";
    } finally {
        recordBtn.removeEventListener('click', getVideo);
    }
}


const init = () => {
    recordBtn.addEventListener('click', getVideo);
};


if (recorderContainer) {
    init();
}