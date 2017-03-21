const electron = require('electron')
const path = require('path')
const fs = require('fs')

const { desktopCapturer, ipcRenderer: ipc, screen } = electron

function getMainSource(desktopCapturer, screen, done){
    const options = 
    {
        types: ['screen'],
        thumbnailSize: screen.getPrimaryDisplay().workAreaSize
    }
    desktopCapturer.getSources(options, (err, sources) => {
        if(err) return console.log('Cannot capture screen:', err)

        const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1'
        done(sources.filter(isMainSource)[0])
    })
}

function onCapture(evt, targetPath){
    getMainSource(desktopCapturer, screen, source => {
        const png = source.thumbnail.toPng()
        const filePath = path.join(targetPath, new Date().toISOString().substring(0, 10) + '.png')
        writeScreenshot(png, filePath)
    })
}

function writeScreenshot(png, filePath){
    fs.writeFile(filePath, png, err => {
        if(err) return console.log('Failed to write screen:', err)
    })
}

ipc.on('capture', onCapture)