```js
/**
 * 【MediaStream】
 * MediaStream.addTrack()        向流媒体中加入不同的轨
 * MediaStream.removeTrack*()    从流媒体中移除不需要的轨
 * MediaStream.getVideoTracks()  拿到所有视频轨
 * MediaStream.getAudioTracks()  拿到所有音频轨
 * MediaStream.stop()            将流媒体关闭，调每一个媒体流中的stop
 * 
 * 【MediaStream 事件】
 * MediaStream.onaddtrack        添加轨时触发onaddtrack事件
 * MediaStream.onremovetrack     移除轨时触发onremovetrack事件
 * MediaStream.onended           当流结束时触发ended事件
 */

let videoPlayer = document.querySelector('video#player');

let gotMediaStream = (stream) => {
    // stream 流里面包含 视频轨和音频轨
    videoPlayer.srcObject = stream

    // 拿到流后 获取到视频中所有的track 取其中第一个videotrack
    let videoTrack = stream.getVideoTracks()[0]
    console.log(videoTrack)
    // 通过 videotrack 的getsettings 拿到constrants的对象
    let videoConstraints = videoTrack.getSettings()
    console.log(videoConstraints)
}
let handleError = (err) => {
    console.log(`getUserMedia errpr:${err}`)
}

if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia is not supported!');
}else {
    // 同时有视频数据和音频数据
    let constrants = {
        video: {
            width: 640,
            height: 480,
            frameRate: 5,
            facingMode: 'environment',
            resizeMode: 'none'
        },
        audio: false
    }
    navigator.mediaDevices.getUserMedia(constrants)
    .then(gotMediaStream)
    .catch(handleError)
}

```