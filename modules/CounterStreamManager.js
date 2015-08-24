var pm = require('./pm');
var wsServer = require('./wsServer');

function startStream(){
  wsServer.startServer(8000);

  pm.streamCounter([], function (data) {
    console.log('streamCounter callback -- start');
    console.log(data);
    wsServer.sendToAll(data);
    console.log('startStream -- end');
  });
};

function stopStream() {
  pm.Stop();
}


counterStreamManager = {
  startStream : startStream,
  stopStream : stopStream
};

module.exports = counterStreamManager;
