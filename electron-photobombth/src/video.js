const constraints = {
    audio: false,
    video: {
        mandatory: {
            minWidth: 853,
            minHeight: 480,
            maxWidth: 853,
            maxHeight: 480
        }
    }
}

function handleSuccess(videoElem, stream){
    videoElem.src = window.URL.createObjectURL(stream)
}

function handleError(error){
    console.log('Camera error: ', error)
}

exports.init = (nav, videoElem) => {
    nav.getUserMedia = nav.webkitGetUserMedia
    nav.getUserMedia(constraints, stream => handleSuccess(videoElem, stream), handleError)
}

exports.captureBytes = (videoElem, ctx, canvasElem) => {
    ctx.drawImage(videoElem, 0, 0)
    return canvasElem.toDataURL('image/png')
}

exports.captureBytesFromLiveCanvas = canvasElem => {
    return canvasElem.toDataURL('image/png')
}