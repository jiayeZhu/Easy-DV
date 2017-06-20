 const ipc = window.require('electron').ipcRenderer;
 const createChannel = ()=>{
    return (new Date().getTime() + Math.random() * 10e13).toString(36);
  };

module.exports = function (IPC_URI,channelArg={}) {
  let channel = createChannel();
  console.log(channel);
  channelArg.channel = channel;
  ipc.send(IPC_URI,channelArg);
  return new Promise((resolve)=>{
    ipc.once(channel,(event,args)=>{
      resolve(args);
    })
  })
}