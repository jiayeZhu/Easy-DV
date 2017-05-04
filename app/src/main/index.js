'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
// const ipc = require('electron').ipcMain;

const ipcRes = require('./MongoOperator/ipcResponse');

let mainWindow

// let db

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')


  // *** ipc related function list START *** //

  ipcMain.on('syncMsg',(event,arg)=>{
    // console.log(event);
    // console.log(arg);
    event.returnValue = arg;
    console.log()
  });

  ipcMain.on('connect-db',async (event,arg)=>{
    let db = await require('./MongoOperator').connectDB('mongodb://'+arg.url);
    if (db === null) {
      event.sender.send('db-response','Connection Failed');
    } else {
      ipcRes.initDB(db);
      event.sender.send('db-response',db);
    }
  });

  ipcMain.on('getDB', ipcRes.getDBFunction);

  ipcMain.on('aggtest', ipcRes.aggregateQuery);
  // *** ipc related function list END *** //
}

app.on('ready', createWindow);

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

