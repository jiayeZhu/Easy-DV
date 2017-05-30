const ipcMain = require('electron').ipcMain;
const mongoOP = require('./mongoOperator');
const BLUE = '\x1b[34m';
const END = '\x1b[0m';
const log = (str)=>{
  console.log(BLUE,'~=>',END,str);
}


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
  }  
}


module.exports = {
  handleIPC (name) {
    log(name);
    ipcMain.on(name,ipcRes[name]);
    
  }
}
