
var hoarder_socket = io.connect(hoarder_url, { secure: true, reconnect: true, rejectUnauthorized : false });

hoarder_socket.on('connect', function () {
    conn_txt = "++++++++++++++++++  Connected to "+hoarder_url+" +++++++++++++++++++++++";
    hoarder_socket.emit('subscribe', 'block');
    hoarder_socket.emit('subscribe', 'numChainActive');
    hoarder_socket.emit('subscribe', 'numBlockSolved');
    hoarder_socket.emit('subscribe', 'tx5min');
    hoarder_socket.emit('subscribe', 'numApiConn');
    hoarder_socket.emit('subscribe', 'randomMode');
    hoarder_socket.emit('subscribe', 'clientCount');
   //  console.log(conn_txt);
});

hoarder_socket.on('error', function () {
    conn_txt = "error - "+hoarder_url;
  //  console.log(conn_txt);
});


hoarder_socket.on('clientCount', function (data) {
    clientCount = data;
 //   updateStatusBar('clientCount', data);
    conn_txt = "clientCount - "+data;
    console.log(conn_txt);
});
hoarder_socket.on('numApiConn', function (data) {
    numApiConn = data;
    updateStatusBar('numApiConn', data);
    //conn_txt = "Apis Connected - "+data;
  //  console.log(conn_txt);
});
hoarder_socket.on('numChainActive', function (data) {
    numChainActive = data;
    updateStatusBar('numChainActive', data);
    //conn_txt = "Active chains - "+data;
  //  console.log(conn_txt);
});
hoarder_socket.on('numBlockSolved', function (data) {
    numBlockSolved = data;
    updateStatusBar('numBlockSolved', data);
    //conn_txt = "numBlockSolved - "+data;
   // console.log(conn_txt);
});
hoarder_socket.on('peakGlobalTX', function (data) {
    peakGlobalTX = data;
    //conn_txt = "peakGlobalTXps - "+data;
    //console.log(conn_txt);
    updateStatusBar('peakGlobalTX', data);
});

hoarder_socket.on('tx5min', function (data) {
    tx5min = data;
    updateStatusBar('tx5min', data);
    //conn_txt = "tx5min - "+data;
    //console.log("incoming tx5min = "+conn_txt+" --------------------------------------");
});

hoarder_socket.on('randomMode', function (data) {
    randomMode = data;
    updateStatusBar('randomMode', data);
    conn_txt = "randomMode - "+data;
    console.log("incoming randomMode = "+conn_txt+" --------------------------------------");
});

hashArr = [];
lastBlocktime = [];
hoarder_socket.on('block', function (data) {
 // console.log("block in "+data);
  if (typeof data != "object") {
      jdata = JSON.parse(data) || 0; 
      blockHash = jdata['blockhash'];
      if (hashArr.indexOf(blockHash) < 0) {
        blockChain = jdata['chainname'];
        blockHeight = jdata['blockheight']
        blockCount = jdata['txcount'];
        blockTime = jdata['blocktime'];
        numConn = numApiConn;
        globalTX = jdata['globaltx'];                                                                                                          // function from hash_table.js
        //console.log("Recieved "+blockCount+" tx from "+blockChain+" at "+blockTime);
        // changeCell(blockHash, blockCount, blockChain, blockHeight);
        if (typeof lastBlocktime[blockChain] === 'undefined') {
          blockSolveTime = 60; 
          }
        else {
          blockSolveTime = blockTime - lastBlocktime[blockChain]; 
        }
        block_url="http://"+blockChain+".meshbits.io/block/"+blockHash
        // setBubble(blockChain, blockHeight, blockCount, blockSolveTime, block_url);
        lastBlocktime[blockChain] = blockTime;
        if (hashArr.length > 10) {
          hashArr.shift();
        }
        hashArr.push(blockHash);
      }
	    globalTX=globalTX.toFixed(3);
      updateNeedle(globalTX);                                                                                                                                                  // function from tx_charts.js
    return globalTX;
  }
  else {
    // placeholder for graph data
  }
});


needle = setInterval(function() { updateNeedle(globalTX); } ,3050);
// needle = setInterval(function() { console.log("globalTX = "+globalTX); updateNeedle(globalTX); } ,3050);