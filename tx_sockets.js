
var hoarder_socket = io.connect(hoarder_url, { secure: true, reconnect: true, rejectUnauthorized : false });
// http://txscl.meshbits.io/insight-api/txs/?block=00b25e955aba9c6812eeb605eb1bcb04d59a8a1cbb2c560330fe650a3b83aab2
hoarder_socket.on('connect', function () {
    conn_txt = "++++++++++++++++++  Connected to "+hoarder_url+" +++++++++++++++++++++++";
    hoarder_socket.emit('subscribe', 'block');
    hoarder_socket.emit('subscribe', 'numChainActive');
    hoarder_socket.emit('subscribe', 'numBlockSolved');
    hoarder_socket.emit('subscribe', 'tx5min');
    hoarder_socket.emit('subscribe', 'pt5min');
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
    //conn_txt = "clientCount - "+data;
    //console.log(conn_txt);
});
hoarder_socket.on('numApiConn', function (data) {
    numApiConn = data;
    updateStatusBar('numApiConn', data);
   //conn_txt = "Apis Connected - "+data;
    //console.log(conn_txt);
});
hoarder_socket.on('numChainActive', function (data) {
    numChainActive = data;
    updateStatusBar('numChainActive', data);
   //conn_txt = "Active chains - "+data;
    //console.log(conn_txt);
});
hoarder_socket.on('numBlockSolved', function (data) {
    numBlockSolved = data;
    updateStatusBar('numBlockSolved', data);
    //conn_txt = "numBlockSolved - "+data;
    //console.log(conn_txt);
});
hoarder_socket.on('peakGlobalTX', function (data) {
    peakGlobalTX = data;
    //conn_txt = "peakGlobalTXps - "+data;
    //console.log(conn_txt);
    //updateStatusBar('peakGlobalTX', data);
});

hoarder_socket.on('tx5min', function (data) {
    tx5min = data;
    updateStatusBar('tx5min', data);
  // conn_txt = "tx5min - "+data;
    //console.log("incoming tx5min = "+conn_txt+" --------------------------------------");
});
hoarder_socket.on('pt5min', function (data) {
    pt5min = data;
    updateStatusBar('pt5min', data);
    conn_txt = "pt5min - "+data;
    console.log("incoming pt5min = "+conn_txt+" --------------------------------------");
});

hashArr = [];
lastBlocktime = [];
hoarder_socket.on('block', function (data) {
  if (typeof data != "object") {
      jdata = JSON.parse(data) || 0; 
      blockHash = jdata['blockhash'];
      if (hashArr.indexOf(blockHash) < 0) {
        blockChain = jdata['chainname'];
        blockHeight = jdata['blockheight'];
        blockCount = jdata['txcount'];
        blockTime = jdata['blocktime'];
        blockSize = jdata['blocksize'];
        sm_tx = jdata['sendmany'];
        ptCount = jdata['ptcount'];
        numConn = numApiConn;
        globalTX = jdata['globaltx'];  
        globalPT = jdata['globalPT'];  
       // console.log(jdata);
        if (typeof lastBlocktime[blockChain] === 'undefined') {
          blockSolveTime = 60; 
          }
        else {
          blockSolveTime = blockTime - lastBlocktime[blockChain]; 
          //console.log("-------------------------------------------------");
          //console.log("chain "+blockChain+" solved at "+blockTime+". Last block solved at "+lastBlocktime[blockChain]+", "+blockSolveTime+"s ago.");
         // console.log("ptCount "+ptCount+" / pt5min "+pt5min+" / aveChainPT "+aveChainPT+", / pt per block "+ptPerBlock);
          //console.log("-------------------------------------------------");
        }
        block_url="http://"+blockChain+".meshbits.io/block/"+blockHash
        setBubble(blockChain, blockHeight, ptCount, blockSolveTime, block_url);
        lastBlocktime[blockChain] = blockTime;
        if (hashArr.length > 10) {
          hashArr.shift();
        }
        hashArr.push(blockHash);
      }
	    globalTX=globalTX.toFixed(3);
      // updateNeedle(globalTX);                                                                                                                   // function from tx_charts.js
    return globalTX;
  }
  else {
    // placeholder for graph data
  }
});


needle = setInterval(function() { updateNeedle(globalTX); } ,2000);
// needle = setInterval(function() { console.log("globalTX = "+globalTX); updateNeedle(globalTX); } ,3050);