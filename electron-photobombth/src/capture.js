const electron = require('electron')
const countdown = require('./countdown')
const video = require('./video')
const flash = require('./flash')
const effects = require('./effects')

const { ipcRenderer: ipc, shell, remote } = electron

const images = remote.require('./images')

let canvasTarget
let seriously
let videoSrc

function formatImgTag(doc, bytes){
    const div = doc.createElement('div')
    div.classList.add('photo')
    const close = doc.createElement('div')
    close.classList.add('photoClose')
    const img = new Image()
    img.classList.add('photoImg')
    img.src = bytes
    div.appendChild(img)
    div.appendChild(close)
    return div
}

window.addEventListener('DOMContentLoaded', _ => {
    const videoElem = document.getElementById('video')
    const canvasElem = document.getElementById('canvas')
    const recordElem = document.getElementById('record')
    const counterElem = document.getElementById('counter')
    const photosElem = document.querySelector('.photosContainer')
    const flashElem = document.getElementById('flash')

    seriously = new Seriously()
    videoSrc = seriously.source('#video')
    canvasTarget = seriously.target('#canvas')
    effects.choose(seriously, videoSrc, canvasTarget)

    video.init(navigator, videoElem)

    recordElem.addEventListener('click', _ => {
        countdown.start(counterElem, 3, _ => {
            flash(flashElem)
            const bytes = video.captureBytesFromLiveCanvas(canvasElem)
            ipc.send('image-captured', bytes)
            photosElem.appendChild(formatImgTag(document, bytes))
        })
    })

    photosElem.addEventListener('click', evt => {
        const isRm = evt.target.classList.contains('photoClose')
        const selector = isRm ? '.photoClose' : '.photoImg'

        const photos = Array.from(document.querySelectorAll(selector))
        const index = photos.findIndex(elem => elem == evt.target)

        if(index > -1){
            if(isRm){
                ipc.send('image-remove', index)
            }
            else{
                shell.showItemInFolder(images.getFromCache(index))
            }
        }
    })
})

ipc.on('image-removed', (evt, index) => {
    document
        .getElementById('photos')
        .removeChild(
            Array.from(document.querySelectorAll('.photo'))[index]
        )
})

ipc.on('effect-choose', (evt, effectName) => {
    effects.choose(seriously, videoSrc, canvasTarget, effectName)
})

ipc.on('effect-cycle', evt => {
    effects.cycle(seriously, videoSrc, canvasTarget)
})