 const ipc = window.require('electron').ipcRenderer;
 const createChannel = ()=>{
    return (new Date().getTime() + Math.random() * 10e13).toString(36);
  };

module.exports = function (channelName,channelArg={},NOT_ONCE=false) {
  let channel = createChannel();
  console.log(channel);
  channelArg.channel = channel;
  ipc.send(channelName,channelArg);
  return new Promise((resolve)=>{
    ipc.once(channel,(event,args)=>{
      resolve(args);
    })
  })
}