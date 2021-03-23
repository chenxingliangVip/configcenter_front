'use strict'

import { app, BrowserWindow } from 'electron'
const ipc = require('electron').ipcMain

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 800,
    frame: true,
    useContentSize: true,
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// app.on('ready', createWindow)
app.on('ready', function () {
  createWindow()
  //  打印命令行携带参数
  console.log("#############传入参数##############")
  console.log(process.argv)
  if(process.argv.length > 0){
    let param = "";
    let equal_str = process.argv.indexOf("=");
    if(equal_str > -1 && equal_str < process.argv.length -1){
      for(let i = equal_str+1;i<process.argv.length ;i++){
        param+=process.argv[i];
      }
    }
    if(param){
       let list_param = param.split("=");
       let filter_param = list_param[list_param.length -1];
        console.log(filter_param)
       // mainWindow.webContents.send('getPrinterList', filter_param);
       ipc.on('getPrinterList', (event) => {
         mainWindow.webContents.send('getPrinterList', filter_param);
      });
    }
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
