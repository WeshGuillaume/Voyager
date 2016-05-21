
const { ipcMain } = require('electron')
const { createWindow } = require('./main')

const createEventListener = exports.createEventListener = (event, callback) =>
  ipcMain.on(event, callback)

createEventListener('popup', (_, url) => createWindow({
  width: 600,
  height: 600,
  titleBarStyle: 'default',
}))
