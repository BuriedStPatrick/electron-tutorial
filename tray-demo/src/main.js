const electron = require('electron')
const path = require('path')

const { app, Tray, Menu } = electron

app.on('ready', _ => {
    const tray = new Tray(path.join('src', 'diretonelogo.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Wow',
            click: _ => console.log('Wow')
        },
        {
            label: 'Awesome',
            click: _ => console.log('awesome')
        }
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('My great app')
})
