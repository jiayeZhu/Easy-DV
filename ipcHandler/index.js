const BLUE = '\x1b[34m';
const END = '\x1b[0m';
const log = (str)=>{
  console.log(BLUE,'~=>',END,str);
}

const ipcMain = require('electron').ipcMain;
const dialog = require('electron').dialog
const mongoOP = require('./mongoOperator');
const fs = require('fs');

const ipcRes = {
  async connectDB () {
    let [event,arg] = arguments;
    log(arg);
    const url = arg.url;
    const channel = arg.channel;
    let result = await mongoOP.connectDB('mongodb://'+url);
    event.sender.send(channel,result);
  },
  async aggTest () {
    let [event,arg] = arguments;
    // log(arg);
    let result = await mongoOP.aggregateQuery(arg.AggItems);
    log(result);
    event.sender.send(arg.channel,result);
  },
  async barData () {
    let [event,arg] = arguments;
    log(event);
    log(arg);
    let result = await mongoOP.aggregateQuery(arg.aggPipes);
    log(result);
    event.sender.send(arg.channel,result);
  },
  async airData () {
    let [event,arg] = arguments;
    let result = await mongoOP.airDataQuery(arg.aggPipes);
    event.sender.send(arg.channel,result);
  }  ,
  async save(){
    let [event,arg] = arguments;
    const options = {
        title: 'Save Data',
        // filters: [
        //   { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
        // ]
      }
    dialog.showSaveDialog(options, function (filename) {
      console.log(filename);
      fs.writeFileSync(filename,arg.data);
    })
  },
  async load(){
    let [event,arg] = arguments;
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory']
    }, function (files) {
      if (files) event.sender.send(arg.channel, fs.readFileSync(files[0],{encoding:'utf-8'}))
    })
  }
}

module.exports = {
  handleIPC (uri) {
    log(uri);
    ipcMain.on(uri,ipcRes[uri]);
  }
}