const { app } = require('electron')
const { createWindow } = require('./main')

require('./ipc')

app.on('ready', () => createWindow('http://localhost:3000'))

