const electron = require('electron')

const { app, BrowserWindow, globalShortcut } = electron

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 0,
        height: 0,
        resizable: false,
        frame: false,
        maxWidth: 0,
        maxHeight: 0
    })

    mainWindow.loadURL(`file://${__dirname}/capture.html`)

    mainWindow.on('close', _ => {
        mainWindow = null
    })

    globalShortcut.register('CommandOrControl+Alt+D', _ => {
        mainWindow.webContents.send('capture', app.getPath('pictures'))
    })
})

app.on('will-quit', _ => {
    globalShortcut.unregisterAll()
})